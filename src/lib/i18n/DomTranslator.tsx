import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "@/i18n/config";

/**
 * Runtime DOM translator that survives React reconciliation.
 *
 * Strategy:
 * - When language is "en", walk the DOM, collect every Bengali text node and
 *   translatable attribute, batch-translate via /api/translate, cache in
 *   localStorage, then replace values.
 * - Watch the DOM with a MutationObserver on childList AND characterData.
 *   When React re-renders a component, it either creates new text nodes
 *   (childList) or resets the text to Bengali (characterData). We detect both
 *   and immediately re-apply the cached English value — no network hit after
 *   the first pass.
 * - When language flips back to "bn", we simply stop translating; the next
 *   React render already restores the originals. For static/idle nodes we
 *   restore from the original map.
 */

const CACHE_KEY = "lumen-translate-cache-v1";
const SKIP_TAGS = new Set([
  "SCRIPT", "STYLE", "NOSCRIPT", "CODE", "PRE",
  "TEXTAREA", "INPUT", "SVG", "PATH", "IFRAME",
]);
const ATTR_KEYS = ["placeholder", "aria-label", "title", "alt"] as const;
const BN_RE = /[\u0980-\u09FF]/;

type Cache = Record<string, string>;

function loadCache(): Cache {
  if (typeof localStorage === "undefined") return {};
  try { return JSON.parse(localStorage.getItem(CACHE_KEY) || "{}") as Cache; }
  catch { return {}; }
}
function saveCache(c: Cache) {
  try { localStorage.setItem(CACHE_KEY, JSON.stringify(c)); } catch {}
}

let cache: Cache = {};
const pendingKeys = new Set<string>();
let flushTimer: ReturnType<typeof setTimeout> | null = null;
let active = false;

// Track the last value we WROTE to each text node — so when React overwrites
// it back to Bengali, characterData mutation shows a different value and we
// know to re-translate. Also remember the original Bengali so we can restore.
const lastWritten = new WeakMap<Text, string>();
const originalText = new WeakMap<Text, string>();
const originalAttr = new WeakMap<Element, Map<string, string>>();

function shouldSkip(el: Element | null): boolean {
  let cur: Element | null = el;
  while (cur) {
    if (SKIP_TAGS.has(cur.tagName)) return true;
    if (cur.hasAttribute?.("data-no-translate")) return true;
    cur = cur.parentElement;
  }
  return false;
}

function scheduleFlush() {
  if (flushTimer) return;
  flushTimer = setTimeout(() => {
    flushTimer = null;
    void flush();
  }, 120);
}

async function flush() {
  if (pendingKeys.size === 0) return;
  const batch = [...pendingKeys];
  pendingKeys.clear();
  const CHUNK = 50;
  for (let i = 0; i < batch.length; i += CHUNK) {
    const slice = batch.slice(i, i + CHUNK);
    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ texts: slice, target: "en" }),
      });
      if (!res.ok) throw new Error(String(res.status));
      const data = (await res.json()) as { translations: string[] };
      slice.forEach((k, idx) => { cache[k] = data.translations[idx] ?? k; });
      saveCache(cache);
    } catch {
      // On failure, cache identity so we don't retry forever this session
      slice.forEach((k) => { if (!cache[k]) cache[k] = k; });
    }
  }
  // After new translations arrive, sweep the DOM to apply them
  if (active) sweep(document.body);
}

function translateTextNode(t: Text) {
  const raw = t.nodeValue ?? "";
  if (!BN_RE.test(raw)) return;
  const trimmed = raw.trim();
  if (!trimmed) return;
  if (shouldSkip(t.parentElement)) return;

  if (!originalText.has(t)) originalText.set(t, raw);

  const key = trimmed;
  const en = cache[key];
  if (en === undefined) {
    pendingKeys.add(key);
    scheduleFlush();
    return;
  }
  const leading = raw.match(/^\s*/)?.[0] ?? "";
  const trailing = raw.match(/\s*$/)?.[0] ?? "";
  const next = leading + en + trailing;
  if (t.nodeValue !== next) {
    t.nodeValue = next;
    lastWritten.set(t, next);
  }
}

function translateAttr(el: Element, attr: string) {
  const raw = el.getAttribute(attr);
  if (!raw || !BN_RE.test(raw)) return;
  const trimmed = raw.trim();
  if (!trimmed) return;

  let map = originalAttr.get(el);
  if (!map) { map = new Map(); originalAttr.set(el, map); }
  if (!map.has(attr)) map.set(attr, raw);

  const en = cache[trimmed];
  if (en === undefined) {
    pendingKeys.add(trimmed);
    scheduleFlush();
    return;
  }
  if (raw !== en) el.setAttribute(attr, en);
}

function sweep(root: Node) {
  if (!active) return;
  if (root.nodeType === Node.TEXT_NODE) {
    translateTextNode(root as Text);
    return;
  }
  if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_NODE) return;
  if (root.nodeType === Node.ELEMENT_NODE && shouldSkip(root as Element)) return;

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
  const visit = (n: Node) => {
    if (n.nodeType === Node.TEXT_NODE) translateTextNode(n as Text);
    else if (n.nodeType === Node.ELEMENT_NODE) {
      const el = n as Element;
      if (shouldSkip(el)) return;
      for (const a of ATTR_KEYS) translateAttr(el, a);
    }
  };
  visit(root);
  let n: Node | null;
  while ((n = walker.nextNode())) visit(n);
}

function restore(root: Node) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
  const visit = (n: Node) => {
    if (n.nodeType === Node.TEXT_NODE) {
      const t = n as Text;
      const orig = originalText.get(t);
      if (orig !== undefined && t.nodeValue !== orig) {
        t.nodeValue = orig;
        lastWritten.delete(t);
      }
    } else if (n.nodeType === Node.ELEMENT_NODE) {
      const el = n as Element;
      const map = originalAttr.get(el);
      if (map) for (const [attr, val] of map) {
        if (el.getAttribute(attr) !== val) el.setAttribute(attr, val);
      }
    }
  };
  visit(root);
  let n: Node | null;
  while ((n = walker.nextNode())) visit(n);
}

export function DomTranslator() {
  const { i18n } = useTranslation();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!i18n || typeof i18n.on !== "function") return;
    cache = loadCache();

    const isEn = () =>
      (i18n.resolvedLanguage || i18n.language || "bn").startsWith("en");

    let observer: MutationObserver | null = null;

    const start = () => {
      active = true;
      sweep(document.body);
      if (observer) return;
      observer = new MutationObserver((mutations) => {
        if (!active) return;
        for (const m of mutations) {
          if (m.type === "characterData") {
            translateTextNode(m.target as Text);
          } else if (m.type === "childList") {
            m.addedNodes.forEach((n) => sweep(n));
          } else if (m.type === "attributes" && m.target.nodeType === Node.ELEMENT_NODE) {
            const el = m.target as Element;
            if (m.attributeName && (ATTR_KEYS as readonly string[]).includes(m.attributeName)) {
              translateAttr(el, m.attributeName);
            }
          }
        }
      });
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true,
        attributeFilter: [...ATTR_KEYS],
      });
    };

    const stop = () => {
      active = false;
      if (observer) { observer.disconnect(); observer = null; }
      restore(document.body);
    };

    if (isEn()) start();

    const onLang = () => { if (isEn()) start(); else stop(); };
    i18n.on("languageChanged", onLang);

    return () => {
      if (typeof i18n.off === "function") i18n.off("languageChanged", onLang);
      if (observer) { observer.disconnect(); observer = null; }
      active = false;
    };
  }, [i18n]);

  return null;
}
