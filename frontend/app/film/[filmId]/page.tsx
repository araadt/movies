import FilmCardWrapper from "@/components/films/FilmCardWrapper";
import { getFilmDetails } from "@/lib/tmdb";

type Props = {
    params: Promise<{ filmId: string }>;
};

export async function generateMetadata({ params }: Props) {
    const { filmId } = await params;
    const id = parseInt(filmId, 10);
    const film = await getFilmDetails(id);
    return {
        title: `${film?.title} | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
        description: film?.overview,
    }
}

export default async function FilmPage({ params }: Props) {
    const { filmId } = await params;
    const id = parseInt(filmId, 10);
    
    return (
        <FilmCardWrapper
            film={id}
            variant="details"
            mediaType="movie"
        />
    );
}

