import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe, toHaveNoViolations } from "jest-axe";
import { useState } from "react";
import { FooterCol } from "../Footer";

expect.extend(toHaveNoViolations);

// Force mobile viewport so the accordion behavior is active.
function setMobile() {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as typeof window.matchMedia;
}

beforeEach(() => {
  setMobile();
  Object.defineProperty(HTMLElement.prototype, "scrollHeight", {
    configurable: true,
    get() {
      return 200;
    },
  });
});

function Harness() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <nav aria-label="Footer">
      <FooterCol id="explore" title="Explore" openId={open} onToggle={setOpen}>
        <a href="#a">Link A</a>
        <a href="#b">Link B</a>
      </FooterCol>
      <FooterCol id="company" title="Company" openId={open} onToggle={setOpen}>
        <a href="#c">Link C</a>
      </FooterCol>
      <FooterCol id="contact" title="Contact" openId={open} onToggle={setOpen}>
        <a href="#d">Link D</a>
      </FooterCol>
    </nav>
  );
}

describe("Footer accordion — automated a11y audit", () => {
  it("has no axe violations when all sections are collapsed", async () => {
    const { container } = render(<Harness />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("has no axe violations after opening a section", async () => {
    const user = userEvent.setup();
    const { container } = render(<Harness />);
    await user.click(screen.getByRole("button", { name: /explore/i }));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("exposes valid aria-expanded / aria-controls linkage on every trigger", () => {
    render(<Harness />);
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThanOrEqual(3);

    for (const btn of buttons) {
      // aria-expanded is a required boolean
      const expanded = btn.getAttribute("aria-expanded");
      expect(expanded === "true" || expanded === "false").toBe(true);

      // aria-controls must point to an existing panel with role=region
      const panelId = btn.getAttribute("aria-controls");
      expect(panelId).toBeTruthy();
      const panel = document.getElementById(panelId!);
      expect(panel).not.toBeNull();
      expect(panel).toHaveAttribute("role", "region");
      expect(panel!.getAttribute("aria-labelledby")).toBe(btn.id);
    }
  });

  it("supports Enter/Space toggle and Arrow/Home/End header navigation", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    const [explore, company, contact] = screen.getAllByRole("button");

    explore.focus();
    await user.keyboard("{Enter}");
    expect(explore).toHaveAttribute("aria-expanded", "true");

    await user.keyboard("{ArrowDown}");
    expect(document.activeElement).toBe(company);

    await user.keyboard(" ");
    expect(company).toHaveAttribute("aria-expanded", "true");
    // single-open: previously open section collapses
    expect(explore).toHaveAttribute("aria-expanded", "false");

    // Home/End move focus between headers
    company.focus();
    await user.keyboard("{End}");
    expect(document.activeElement).toBe(contact);
    await user.keyboard("{Home}");
    expect(document.activeElement).toBe(explore);

    // ArrowUp wraps from first to last
    await user.keyboard("{ArrowUp}");
    expect(document.activeElement).toBe(contact);
  });

  it("Escape on an open panel closes it and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    const [, company] = screen.getAllByRole("button");
    company.focus();
    await user.keyboard("{Enter}");
    expect(company).toHaveAttribute("aria-expanded", "true");
    await user.keyboard("{Escape}");
    expect(company).toHaveAttribute("aria-expanded", "false");
    expect(document.activeElement).toBe(company);
  });

  it("under prefers-reduced-motion: sets transitionDuration=0ms, keeps aria + Escape focus working", async () => {

    // Override matchMedia so PRM query returns true; mobile viewport also true.
    window.matchMedia = ((query: string) => ({
      matches: query.includes("prefers-reduced-motion"),
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    })) as typeof window.matchMedia;

    const user = userEvent.setup();
    render(<Harness />);
    const [explore] = screen.getAllByRole("button");
    const panel = document.getElementById(explore.getAttribute("aria-controls")!)!;

    // Collapsed: transitionDuration inline override = 0ms
    expect(panel.style.transitionDuration).toBe("0ms");
    expect(explore).toHaveAttribute("aria-expanded", "false");

    // Open via keyboard — aria flips immediately, no motion required
    explore.focus();
    await user.keyboard("{Enter}");
    expect(explore).toHaveAttribute("aria-expanded", "true");
    expect(panel.style.transitionDuration).toBe("0ms");

    // Escape still closes + returns focus even without transition events
    await user.keyboard("{Escape}");
    expect(explore).toHaveAttribute("aria-expanded", "false");
    expect(document.activeElement).toBe(explore);
  });
});



describe("Footer live region — SR announcements for accordion state", () => {
  it("renders aria-live=polite status region and announces open/close (Bengali)", async () => {
    const { Footer } = await import("../Footer");
    // Router-linkless render: Footer uses <Link>, so we mount inside a memory router.
    const { createRootRoute, createRouter, createMemoryHistory, RouterProvider } =
      await import("@tanstack/react-router");
    const rootRoute = createRootRoute({ component: () => <Footer /> });
    const router = createRouter({
      routeTree: rootRoute,
      history: createMemoryHistory({ initialEntries: ["/"] }),
    });
    const { findByRole, getAllByRole } = render(<RouterProvider router={router} />);

    const status = await findByRole("status");
    expect(status).toHaveAttribute("aria-live", "polite");
    expect(status).toHaveAttribute("aria-atomic", "true");
    expect(status.textContent).toBe("");

    const user = userEvent.setup();
    const triggers = getAllByRole("button").filter(
      (b) => b.getAttribute("data-footer-accordion-trigger") === "true",
    );
    // Open first column → announces "খোলা হয়েছে"
    await user.click(triggers[0]);
    await new Promise((r) => setTimeout(r, 60));
    expect(status.textContent).toMatch(/খোলা হয়েছে/);

    // Close it → announces "বন্ধ হয়েছে"
    await user.click(triggers[0]);
    await new Promise((r) => setTimeout(r, 60));
    expect(status.textContent).toMatch(/বন্ধ হয়েছে/);
  });
});


