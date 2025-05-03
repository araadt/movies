import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Films",
  description: "A quick demonstration of API queries. We love movies.",
};

// TODO: This is a temporary font implementation. Refactor to use font from the Figma wireframes (Work Sans and SF Mono)
const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col gap-4 items-center">
              <nav id="nav-bar" className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 gap-5 text-sm">
                  <div id="nav-bar-left" className="flex gap-10 items-center font-semibold">
                    <Link href={"/"}>Films</Link>
                  </div>
                  <div className="flex flex-1 justify-end items-center gap-5 me-5">
                    <p>Foo</p>
                    <p>Bar</p>
                    <p>Baz</p>
                  </div>

                  <div id="nav-bar-right" className="flex gap-5 items-center">
                    {/* TODO: Saving this for later; requires heavy refactor */}
                    <HeaderAuth />
                    <ThemeSwitcher />
                  </div>
                </div>

              </nav>
              <section id="content" className="flex flex-col gap-16 w-full p-5">
                {children}
              </section>

              <footer id="footer" className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
                <p>
                  Footer ipsum
                </p>
              </footer>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
