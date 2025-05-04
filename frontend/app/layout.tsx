import { ThemeSwitcher } from "@/components/theme-switcher";
import { Geist, Inter, Noto_Sans, Noto_Sans_Display, Work_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";

import Link from "next/link";
import Image from "next/image";

import HeaderAuth from "@/components/header-auth";
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
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const WorkSans = Work_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-work',
})

const NotoSans = Noto_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans',
})

const NotoSansDisplay = Noto_Sans_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans-display',
  axes: ['wdth'],
})

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
  variable: '--font-geist',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${WorkSans.variable} ${NotoSans.variable} ${NotoSansDisplay.variable} ${geistSans.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground h-full w-full whitespace-pre-wrap">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >

          {/* TODO: */}
          {/* This grid setup is a bit bonkers and needs to be centralized somewhere. */}
          {/* The goal is to create space for metadata on the sides at larger breakpoints. */}

          <main className="min-h-screen h-full w-full flex flex-col items-center justify-center">
            <nav id="nav-bar" className="w-full flex items-center justify-center border-b border-b-foreground/10 min-h-48 sm:min-h-24 m-0 p-0">
              <div className="w-full text-sm md:text-base
              grid grid-cols-1 sm:grid-cols-2 grid-flow-row lg:grid-cols-6 3xl:grid-cols-12 gap-4 m-0 p-0">
                <div className="flex justify-center sm:justify-start items-center gap-4
                    col-span-full sm:col-span-1 lg:col-span-2 col-start-1 lg:col-start-2
                    m-0 p-0 mx-5">
                  <Link className="text-lg" href={"/"}>Andy's Films</Link>
                </div>

                <div className="
                      flex justify-center sm:justify-end items-center gap-4 
                      col-span-full sm:col-span-1 lg:col-span-2 -col-end-1 lg:-col-end-2
                    mx-5 p-0 ">
                  {/* <p>Foo</p>
                  <p>Bar</p>
                  <p>Baz</p> */}
                  <HeaderAuth />
                  <ThemeSwitcher />
                </div>
              </div>

            </nav>

            <div className="flex-1 w-full h-full flex flex-col gap-4 items-center p-5 py-0 sm:py-5">
              {children}
            </div>

            <footer id="footer" className="w-full flex items-baseline justify-between border-t text-xs p-5 text-muted-foreground/50">
              <div className="flex flex-col gap-1">
                <p>
                  Made by Andy | May 2025
                </p>
              </div>
              <div className="flex gap-4 items-center ">
                <p>
                  API provided by <Link href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">The Movie DB</Link>
                </p>
                <Link href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">
                  <Image src="/assets/logos/tmdb-logo.svg" alt="The Movie DB" width={100} height={100} />
                </Link>
              </div>
            </footer>
          </main>
        </ThemeProvider>
      </body>
    </html >
  );
}
