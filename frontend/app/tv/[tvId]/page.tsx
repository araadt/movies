import { getTVDetails, getTVCredits } from "@/lib/tmdb";
import FilmCard from "@/components/films/FilmCard";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export async function generateMetadata({ params }: { params: Promise<{ tvId: string }> }) {
    const tv = await getTVDetails((await params).tvId);
    return {
        title: `${tv?.name} | ${process.env.NEXT_PUBLIC_SITE_NAME_TV}`,
        description: tv?.overview,
    }
}

export default async function Page({ params }: { params: { tvId: string } }) {
    const tvId = parseInt(params.tvId, 10);
    const tv = await getTVDetails(tvId);

    if (!tv) {
        return (
            <div className="flex items-center justify-center w-full h-full flex-1">
                <Card className="w-full h-full">
                    <CardHeader>
                        <CardTitle>
                            <h1 className="text-3xl font-noto-sans-display font-stretch-ultra-condensed text-foreground/80 uppercase">TV Show Not Found</h1>
                        </CardTitle>
                        <CardDescription>
                            <p className="text-foreground/60">No TV show found with ID: {params.tvId}</p>
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        )
    }

    return (
        <FilmCard film={params.tvId} variant="details" mediaType="tv" />
    )
} 