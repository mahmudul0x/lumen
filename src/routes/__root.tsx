import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportError } from "../lib/error-reporting";
import "@/i18n/config";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি সরানো হয়েছে অথবা কখনো ছিল না।
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            হোম পেজে ফিরুন
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#0B2D6B" },
      { title: "Lumen Builders Ltd. — স্বপ্নের বাড়ি, নিজেই গড়ি" },
      {
        name: "description",
        content:
          "Lumen Builders Ltd. — রংপুরের প্রিমিয়াম রিয়েল এস্টেট ও নির্মাণ প্রতিষ্ঠান। ফ্ল্যাট, জমি শেয়ার ও চলমান প্রকল্পের নির্ভরযোগ্য অংশীদার।",
      },
      { name: "author", content: "Lumen Builders Ltd." },
      { property: "og:title", content: "Lumen Builders Ltd. — We Build Trust, We Build Dreams" },
      {
        property: "og:description",
        content:
          "প্রিমিয়াম ফ্ল্যাট, জমি শেয়ার প্রকল্প ও কর্পোরেট নির্মাণ — Lumen Builders Ltd., রংপুর।",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Lumen Builders Ltd." },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "apple-touch-icon", href: "/favicon.ico" },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700;800&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              name: "Lumen Builders Ltd.",
              url: "/",
              logo: "/favicon.ico",
              slogan: "We Build Trust, We Build Dreams.",
              telephone: "+8801711381422",
              email: "hrlumenbuilders@gmail.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "House 106/2, 2nd Floor, Shantidhara Road, Ideal Mor, R.K. Road",
                addressLocality: "Rangpur",
                addressCountry: "BD",
              },
            },
            {
              "@type": "WebSite",
              name: "Lumen Builders Ltd.",
              url: "/",
              inLanguage: "bn-BD",
            },
            {
              "@type": "RealEstateAgent",
              name: "Lumen Builders Ltd.",
              areaServed: "Rangpur, Bangladesh",
              url: "/",
            },
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="bn">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
