import Hero from "@/components/hero";
import Image from "next/image";

const DEFAULT_BLUR_URL = process.env.NEXT_PUBLIC_DEFAULT_BLUR_URL || '';

export default function SearchPage() {
    return (
        <main className="flex-1 flex flex-col gap-4 w-full h-full min-h-[50svh] items-center justify-center">
            <div className="fixed inset-0 z-[-1]">
                <Image
                    src={DEFAULT_BLUR_URL}
                    alt=""
                    aria-hidden
                    fill
                    className="object-cover opacity-20 blur-3xl"
                    priority
                    placeholder="blur"
                    blurDataURL={DEFAULT_BLUR_URL}
                />
            </div>

            <h1 className="sr-only">Search</h1>

            <div className="flex flex-col items-center justify-center">
                <Hero />
            </div>

        </main>
    );
}