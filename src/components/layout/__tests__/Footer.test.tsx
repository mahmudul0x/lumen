import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { FooterCol } from "../Footer";

// Force mobile viewport (accordion behavior is mobile-only; md+ is always-open)
function setMobile() {
  window.matchMedia = ((query: string) => ({
    matches: false, // (min-width: 768px) => false, (prefers-reduced-motion) => false
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as typeof window.matchMedia;
}

// Give the collapsed content a measurable height so we can assert the measurement branch.
beforeEach(() => {
  setMobile();
  Object.defineProperty(HTMLElement.prototype, "scrollHeight", {
    configurable: true,
    get() {
      return 240;
    },
  });
});

function Harness({ initial = null as string | null }) {
  const [open, setOpen] = useState<string | null>(initial);
  return (
    <>
      <FooterCol id="explore" title="Explore" openId={open} onToggle={setOpen}>
        <a href="#a">Link A</a>
        <a href="#b">Link B</a>
      </FooterCol>
      <FooterCol id="company" title="Company" openId={open} onToggle={setOpen}>
        <a href="#c">Link C</a>
      </FooterCol>
    </>
  );
}

describe("FooterCol (mobile accordion)", () => {
  it("starts collapsed with aria-expanded=false and max-height 0", () => {
    render(<Harness />);
    const btn = screen.getByRole("button", { name: /explore/i });
    expect(btn).toHaveAttribute("aria-expanded", "false");

    const panel = document.getElementById(btn.getAttribute("aria-controls")!)!;
    expect(panel.style.maxHeight).toBe("0px");
    expect(panel.style.opacity).toBe("0");
  });

  it("opens on click and applies the measured content height", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    const btn = screen.getByRole("button", { name: /explore/i });

    await user.click(btn);

    expect(btn).toHaveAttribute("aria-expanded", "true");
    const panel = document.getElementById(btn.getAttribute("aria-controls")!)!;
    expect(panel.style.maxHeight).toBe("240px");
    expect(panel.style.opacity).toBe("1");
  });

  it("toggles closed on second click", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    const btn = screen.getByRole("button", { name: /explore/i });

    await user.click(btn);
    await user.click(btn);

    expect(btn).toHaveAttribute("aria-expanded", "false");
  });

  it("opens with Enter and Space keys", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    const btn = screen.getByRole("button", { name: /explore/i });

    btn.focus();
    await user.keyboard("{Enter}");
    expect(btn).toHaveAttribute("aria-expanded", "true");

    await user.keyboard(" ");
    expect(btn).toHaveAttribute("aria-expanded", "false");
  });

  it("closes on Escape and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    const btn = screen.getByRole("button", { name: /explore/i });

    await user.click(btn);
    expect(btn).toHaveAttribute("aria-expanded", "true");

    // Focus a link inside the open panel, then Escape.
    const link = screen.getByRole("link", { name: /link a/i });
    link.focus();
    await user.keyboard("{Escape}");

    expect(btn).toHaveAttribute("aria-expanded", "false");
    expect(document.activeElement).toBe(btn);
  });

  it("is single-open: opening a second column closes the first", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    const explore = screen.getByRole("button", { name: /explore/i });
    const company = screen.getByRole("button", { name: /company/i });

    await user.click(explore);
    expect(explore).toHaveAttribute("aria-expanded", "true");

    await user.click(company);
    expect(company).toHaveAttribute("aria-expanded", "true");
    expect(explore).toHaveAttribute("aria-expanded", "false");
  });

  it("navigates between headers with Arrow / Home / End keys (wrapping)", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    const explore = screen.getByRole("button", { name: /explore/i });
    const company = screen.getByRole("button", { name: /company/i });

    explore.focus();
    await user.keyboard("{ArrowDown}");
    expect(document.activeElement).toBe(company);

    await user.keyboard("{ArrowDown}"); // wraps to first
    expect(document.activeElement).toBe(explore);

    await user.keyboard("{ArrowUp}"); // wraps to last
    expect(document.activeElement).toBe(company);

    await user.keyboard("{Home}");
    expect(document.activeElement).toBe(explore);

    await user.keyboard("{End}");
    expect(document.activeElement).toBe(company);
  });

  it("wires aria-controls to a region labelled by the trigger", () => {
    render(<Harness />);
    const btn = screen.getByRole("button", { name: /explore/i });
    const panelId = btn.getAttribute("aria-controls")!;
    const panel = document.getElementById(panelId)!;

    expect(panel).toHaveAttribute("role", "region");
    expect(panel.getAttribute("aria-labelledby")).toBe(btn.id);
  });

  it("re-measures content height when children resize (rAF-batched)", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    const btn = screen.getByRole("button", { name: /explore/i });
    await user.click(btn);
    const panel = document.getElementById(btn.getAttribute("aria-controls")!)!;
    expect(panel.style.maxHeight).toBe("240px");

    // Simulate content growth + a resize; height should update via rAF.
    Object.defineProperty(HTMLElement.prototype, "scrollHeight", {
      configurable: true,
      get() {
        return 480;
      },
    });
    await act(async () => {
      window.dispatchEvent(new Event("resize"));
      await new Promise((r) => requestAnimationFrame(() => r(null)));
    });

    expect(panel.style.maxHeight).toBe("480px");
  });

  describe("without ResizeObserver (fallback path)", () => {
    let originalRO: typeof globalThis.ResizeObserver | undefined;

    beforeEach(() => {
      originalRO = globalThis.ResizeObserver;
      // Simulate a browser that lacks ResizeObserver entirely
      // @ts-expect-error — intentionally removing to test fallback
      delete globalThis.ResizeObserver;
      // @ts-expect-error
      delete window.ResizeObserver;
    });

    afterEach(() => {
      if (originalRO) {
        globalThis.ResizeObserver = originalRO;
        window.ResizeObserver = originalRO;
      }
    });

    it("updates height on window `resize` when RO is unavailable", async () => {
      const user = userEvent.setup();
      render(<Harness />);
      const btn = screen.getByRole("button", { name: /explore/i });
      await user.click(btn);
      const panel = document.getElementById(btn.getAttribute("aria-controls")!)!;
      expect(panel.style.maxHeight).toBe("240px");

      Object.defineProperty(HTMLElement.prototype, "scrollHeight", {
        configurable: true,
        get() {
          return 360;
        },
      });
      await act(async () => {
        window.dispatchEvent(new Event("resize"));
        await new Promise((r) => requestAnimationFrame(() => r(null)));
      });

      expect(panel.style.maxHeight).toBe("360px");
    });

    it("updates height on `orientationchange` when RO is unavailable", async () => {
      const user = userEvent.setup();
      render(<Harness />);
      const btn = screen.getByRole("button", { name: /explore/i });
      await user.click(btn);
      const panel = document.getElementById(btn.getAttribute("aria-controls")!)!;
      expect(panel.style.maxHeight).toBe("240px");

      Object.defineProperty(HTMLElement.prototype, "scrollHeight", {
        configurable: true,
        get() {
          return 600;
        },
      });
      await act(async () => {
        window.dispatchEvent(new Event("orientationchange"));
        await new Promise((r) => requestAnimationFrame(() => r(null)));
      });

      expect(panel.style.maxHeight).toBe("600px");
    });
  });
});

// Guard: silence "not wrapped in act" noise from async state during rAF batching
vi.spyOn(console, "error").mockImplementation((msg, ...rest) => {
  if (typeof msg === "string" && msg.includes("not wrapped in act")) return;
  console.warn(msg, ...rest);
});
