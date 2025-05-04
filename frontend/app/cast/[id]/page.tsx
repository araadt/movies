import { getCastCredits } from "@/lib/tmdb";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const credits = await getCastCredits(id)

    return (
        <div className="flex flex-col items-center justify-center w-full h-full flex-1">
            <div className="flex flex-col items-baseline justify-start gap-2">
                <h1 className="text-3xl font-noto-sans-display font-stretch-ultra-condensed text-foreground/80 uppercase">{credits.name}</h1>
                <p>Cast pages for have not yet been implemented. This page intentionally left blank.</p>
            </div>
        </div>
    )
}

