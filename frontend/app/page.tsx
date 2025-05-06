'use client';

import Hero from "@/components/hero";
import NewReleases from "@/components/films/NewReleases";
import Image from "next/image";

const DEFAULT_BLUR_URL = process.env.NEXT_PUBLIC_DEFAULT_BLUR_URL || '';

// TODO: Add user profile section to protected route

export default function Home() {
    return (
        <>
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

            <Hero />
            <main className="flex-1 flex flex-col gap-4 w-full h-full">
                <NewReleases
                    queryQuantity={20}
                    displayQuantity={5}
                    variant="cards"
                />
            </main>
        </>
    );
}

