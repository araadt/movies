// VDR

import { options } from '@/lib/tmdb';
import Link from 'next/link';
import FilmCard from '@/components/films/FilmCard';
import { FilmSummary } from '@/types/movieDetails';

const gridColsMap = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
} as const;

export const getFilmDetails = async (filmId: number) => {
    // quickly get all details for now until I create the flag-component

    const response = await fetch(`https://api.themoviedb.org/3/movie/${filmId}?language=en-US`, options);
    const data = await response.json();

    // dump the response if we fail
    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('API Error:', {
            status: response.status,
            statusText: response.statusText,
            statusMessage: errorData?.status_message,
            error: errorData
        });
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (process.env.NODE_ENV === 'development') {
        console.info(`Fetched film details for ${filmId}:`, data);
    }

    if (!data.origin_country) {
        return null;
    }

    // TODO: Add a flag-component 
    // then refactor this as a generic details hook instead
    // for now we're just returning the first origin country
    return data.origin_country[0];
}

const ShowReleases = async ({ displayQuantity, variant }: { displayQuantity: number, variant: string }) => {
    let films: FilmSummary[] = [];
    let error = null;

    try {
        const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&region=CA', options);

        // dump the response if we fail
        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            console.error('API Error:', {
                status: response.status,
                statusText: response.statusText,
                statusMessage: errorData?.status_message,
                error: errorData
            });
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // parse the response
        const data = await response.json();

        if (!data.results) {
            throw new Error('Invalid API response format');
        }

        // The API default pagination return is 20 items.
        // We're just grabbing the first 5 because who
        // has time to watch 20 movies?
        films = data.results.slice(0, displayQuantity) as FilmSummary[];

        // return detailed result in development only
        if (process.env.NODE_ENV === 'development') {
            console.info(`Fetched ${displayQuantity} films:`, films);
        }
    } catch (error) {
        console.error('Error fetching films:', error);
        error = error instanceof Error ? error.message : 'An unknown error occurred';
    }

    if (error) {
        // TODO: Migrate the error display to a generic component
        console.error('Error fetching film details:', error);

        return (
            <div className="flex items-baseline justify-start gap-2 p-4 bg-destructive/20 text-destructive-foreground border border-destructive rounded-xs max-w-lg mx-auto">
                <p>Unfortunately, we had an issue loading your films.</p>
                <p className="text-xs uppercase">{error}</p>
            </div>
        );
    }

    if (films.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-4 text-gray-500">
                <p className="text-sm">No films available</p>
            </div>
        );
    }

    switch (variant) {
        case 'cards':
            // we're returning our results and applying a
            // biased sort in the UI (by TBDB's popularity metric)
            // ! DOCS: https://developer.themoviedb.org/docs/popularity-and-trending

            // admittedly, this is probably a bit of a hack
            const gridCols = gridColsMap[displayQuantity as keyof typeof gridColsMap] || 'grid-cols-1';

            return (
                <div className={`grid ${gridCols} gap-2`}>
                    {films.sort((a, b) => b.popularity - a.popularity).map((film) => (
                        <Link href={`/film/${film.id}`} key={film.id}>
                            <FilmCard film={film.id} variant="poster" mediaType="movie" />
                        </Link>
                    ))}
                </div>
            );
        default:
            return (
                <ol className="list-inside">
                    {films.sort((a, b) => a.title.localeCompare(b.title)).map((film) => (
                        <li key={film.id} className="text-sm font-medium">{film.title}</li>
                    ))}
                </ol>
            );
    }
}

export default async function NewReleases({ displayQuantity, variant }: { displayQuantity: number, variant: string }) {
    return (
        <section id="new-releases" className="w-full border p-4 rounded-lg flex flex-col gap-4">
            <h2 className="text-lg font-medium">Now Playing</h2>

            <ShowReleases displayQuantity={displayQuantity} variant={variant} />
        </section>
    );
}