import FilmCardWrapper from "@/components/films/FilmCardWrapper";
import { getTVDetails } from "@/lib/tmdb";

type Props = {
    params: Promise<{ tvId: string }>;
};

export async function generateMetadata({ params }: Props) {
    const { tvId } = await params;
    const id = parseInt(tvId, 10);
    const tv = await getTVDetails(id);
    return {
        title: `${tv?.name} | ${process.env.NEXT_PUBLIC_SITE_NAME_TV}`,
        description: tv?.overview,
    }
}

export default async function TVPage({ params }: Props) {
    const { tvId } = await params;
    const id = parseInt(tvId, 10);
    
    return (
        <FilmCardWrapper
            film={id}
            variant="details"
            mediaType="tv"
        />
    );
} 