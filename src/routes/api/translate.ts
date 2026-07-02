import { createFileRoute } from "@tanstack/react-router";

/**
 * Batch Bengali → English translator for runtime DOM translation.
 * POST { texts: string[], target: "en" } → { translations: string[] }
 */
export const Route = createFileRoute("/api/translate")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        let body: { texts?: string[]; target?: string };
        try {
          body = await request.json();
        } catch {
          return new Response("Invalid JSON", { status: 400 });
        }

        const texts = Array.isArray(body.texts) ? body.texts.slice(0, 200) : [];
        const target = body.target === "bn" ? "Bengali" : "English";
        if (texts.length === 0) {
          return Response.json({ translations: [] });
        }

        const sys = `You are a professional translator for a luxury Bangladeshi real estate website (Lumen Builders Ltd.).
Translate each item to ${target}. Rules:
- Keep brand names, product names, and proper nouns as-is (Lumen Builders, Lumen Galaxy, Lumen Jolchaya, Lumen Horizon, Rangpur, etc.)
- Keep numbers, phone numbers, emails, URLs, currency symbols (৳), and units unchanged.
- Do NOT add explanations. Preserve punctuation and casing style.
- Output ONLY a JSON array of strings in the same order and length as input.`;

        const user = JSON.stringify(texts);

        const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${key}`,
          },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash",
            messages: [
              { role: "system", content: sys },
              { role: "user", content: user },
            ],
            temperature: 0.2,
          }),
        });

        if (!res.ok) {
          const t = await res.text();
          return new Response(`Gateway error: ${t}`, { status: 502 });
        }

        const data = (await res.json()) as {
          choices?: { message?: { content?: string } }[];
        };
        const raw = data.choices?.[0]?.message?.content?.trim() ?? "[]";
        const cleaned = raw
          .replace(/^```(?:json)?\s*/i, "")
          .replace(/```\s*$/i, "")
          .trim();

        let translations: string[] = [];
        try {
          const parsed = JSON.parse(cleaned);
          if (Array.isArray(parsed)) translations = parsed.map((v) => String(v ?? ""));
        } catch {
          translations = texts;
        }
        // Pad/truncate to match input length
        if (translations.length < texts.length) {
          translations = translations.concat(texts.slice(translations.length));
        } else if (translations.length > texts.length) {
          translations = translations.slice(0, texts.length);
        }

        return Response.json({ translations });
      },
    },
  },
});
