'use client';
import { useState, useEffect, Suspense } from "react";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import FilmCardWrapper from '@/components/films/FilmCardWrapper';
import { FilmSummary } from '@/types/movieDetails';
import { fetchNowPlayingMovies } from '@/app/actions';
import { FilmCardSkeleton } from "./FilmCard";

interface NewReleasesProps {
    queryQuantity: number;
    displayQuantity: number;
    variant: string;
}

export default function NewReleases({ queryQuantity, displayQuantity, variant }: NewReleasesProps) {
    const [index, setIndex] = useState(0);
    const [films, setFilms] = useState<FilmSummary[]>([]);
    const [error, setError] = useState<string | null>(null);

    // Fetch all films once on mount
    useEffect(() => {
        const fetchFilms = async () => {
            try {
                console.log('Fetching films...');
                const { data, error } = await fetchNowPlayingMovies(1);

                if (error) {
                    throw new Error(error);
                }

                if (!data?.results) {
                    throw new Error('Invalid API response format');
                }

                const fetchedFilms = data.results.slice(0, queryQuantity);
                console.log('Sliced films:', fetchedFilms);
                setFilms(fetchedFilms);
            } catch (err) {
                console.error('Error fetching films:', err);
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            }
        };
        fetchFilms();
    }, [queryQuantity]);

    const handleLoadMore = () => {
        const newIndex = index + displayQuantity;
        // If we've reached the end, start over
        const finalIndex = newIndex >= queryQuantity ? 0 : newIndex;
        setIndex(finalIndex);
    };

    if (error) {
        return (
            <div className="flex items-baseline justify-start gap-2 p-4 bg-destructive/20 text-destructive-foreground border border-destructive rounded-xs max-w-lg mx-auto">
                <p>Unfortunately, we had an issue loading your films.</p>
                <p className="text-xs uppercase">{error}</p>
            </div>
        );
    }

    if (films.length === 0) {
        setTimeout(() => {
            return (
                <div className="flex items-center justify-center w-full h-full flex-1 bg-background/50 bg-gradient-to-t from-background/50 to-background/0">
                    <p>That's odd: no films were found.</p>
                </div>
            );
        }, 10000);
    }

    // Get the current batch of films to display
    const currentFilms = films
        .sort((a, b) => b.popularity - a.popularity)
        .slice(index, index + displayQuantity);
    console.log('Current films to display:', currentFilms);

    return (
        <div className="flex flex-col gap-4 w-full min-h-[500px] h-full justify-between items-center">
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 justify-between items-center w-full">
                <Suspense fallback={<FilmCardSkeleton />}>
                    {currentFilms.map((film) => (
                        <Link href={`/film/${film.id}`} key={film.id}>
                            <FilmCardWrapper film={film.id} variant="poster" mediaType="movie" />
                        </Link>
                    ))}
                </Suspense>
                <div onClick={handleLoadMore} className="flex lg:hidden my-auto w-full h-full bg-background/50 border border-foreground/20 items-center justify-center ">
                    <p className="text-lg">Load More</p>
                </div>
            </div>
            {films.length > 0 && (
                <Button
                    onClick={handleLoadMore}
                    variant="outline"
                    className="w-fit hidden lg:block mb-auto mt-8"
                >
                    Load More
                </Button>
            )}
        </div>
    );
}