import FilmCard from "@/components/films/FilmCard";
import { Card, CardTitle, CardDescription, CardHeader } from "@/components/ui/card";
import { getFilmDetails } from "@/lib/tmdb";

export async function generateMetadata({ params }: { params: { filmId: string } }) {
    const filmId = parseInt(params.filmId, 10);
    const film = await getFilmDetails(filmId);
    return {
        title: `${film?.title} | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
        description: film?.overview,
    }
}

export default async function Page({ params }: { params: { filmId: string } }) {
    const filmId = parseInt(params.filmId, 10);
    const film = await getFilmDetails(filmId);

    if (!film) {
        return (
            <div className="flex items-center justify-center w-full h-full flex-1">
                <Card className="w-full h-full">
                    <CardHeader>
                        <CardTitle>
                            <h1 className="text-3xl font-noto-sans-display font-stretch-ultra-condensed text-foreground/80 uppercase">Film Not Found</h1>
                        </CardTitle>
                        <CardDescription>
                            <p className="text-foreground/60">No film found with ID: {filmId}</p>
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        )
    }       
    // {/* 
    // <div className="
    //                           flex justify-center sm:justify-end items-center gap-4
    //                           col-span-full sm:col-span-1 lg:col-span-2 -col-end-1 lg:-col-end-2
    //                           bg-red-300
    //                        m-0 p-0 ">
    // </div> */}

    return (
        <FilmCard film={filmId} variant="details" mediaType="movie" />
    )
}

