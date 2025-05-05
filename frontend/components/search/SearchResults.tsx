'use client';

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import FilmCardWrapper from '@/components/films/FilmCardWrapper';
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

interface MovieResult {
    id: number;
    title: string;
    poster_path: string | null;
    release_date: string;
    popularity: number;
}

interface TVResult {
    id: number;
    name: string;
    poster_path: string | null;
    first_air_date: string;
    popularity: number;
}

interface SearchResultsProps {
    query: string;
    initialMovies: MovieResult[];
    initialTV: TVResult[];
    page: number;
    sortBy: string;
    mediaType: string;
}

export default function SearchResults({
    query,
    initialMovies,
    initialTV,
    page,
    sortBy,
    mediaType
}: SearchResultsProps) {
    const searchParams = useSearchParams();
    const router = useRouter();

    // Sort results based on the selected sort order
    const sortedMovies = [...initialMovies].sort((a, b) => {
        if (sortBy === 'popularity') {
            return b.popularity - a.popularity;
        } else {
            if (!a.release_date) return 1;
            if (!b.release_date) return -1;
            return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
        }
    });

    const sortedTV = [...initialTV].sort((a, b) => {
        if (sortBy === 'popularity') {
            return b.popularity - a.popularity;
        } else {
            if (!a.first_air_date) return 1;
            if (!b.first_air_date) return -1;
            return new Date(b.first_air_date).getTime() - new Date(a.first_air_date).getTime();
        }
    });

    const handleSortChange = (newSort: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('sort', newSort);
        router.push(`?${params.toString()}`);
    };

    const totalResults = sortedMovies.length + sortedTV.length;
    const hasMoreMovies = sortedMovies.length === 20;
    const hasMoreTV = sortedTV.length === 20;
    const canGoNext = hasMoreMovies || hasMoreTV;

    if (totalResults === 0) {
        return (
            <div className="flex items-center justify-center w-full h-full min-h-[80vh]">
                <p>Oof! No results found for "{query}"</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 w-full h-full">
            <div className="flex flex-col flex-wrap lg:flex-row gap-4 my-8 items-center lg:items-baseline justify-between">
                <h1 className="text-3xl lg:text-2xl text-pretty text-center lg:text-left leading-6" >I think <span className="font-noto-sans-display col-span-1 font-stretch-ultra-condensed text-4xl lg:text-3xl font-semibold uppercase">{query}</span> is a great idea</h1>
                <div className="flex items-center gap-2">
                    <p className="text-sm text-foreground/65 text-pretty text-center lg:text-left">
                        <span className="hidden lg:inline">We found</span> <strong><a href="#movie-results">{sortedMovies.length} Movies</a>, and <a href="#tv-results">{sortedTV.length} TV Shows</a></strong><span className="hidden lg:inline"> for {query}.</span>
                    </p>
                </div>
                <div className="flex items-center gap-2 mt-2 lg:mt-0">
                    <Label htmlFor="sort-mode" className={`text-sm self-stretch font-medium ${sortBy === 'popularity' ? 'text-primary' : 'text-foreground/65'}`}>
                        Popularity
                    </Label>
                    <Switch
                        id="sort-mode"
                        checked={sortBy === 'release_date'}
                        onCheckedChange={(checked) => handleSortChange(checked ? 'release_date' : 'popularity')}
                        className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-primary"
                    />
                    <Label htmlFor="sort-mode" className={`text-sm self-stretch font-medium ${sortBy === 'release_date' ? 'text-primary' : 'text-foreground/65'}`}>
                        Release Date
                    </Label>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {/* Movie Results */}
                {sortedMovies.length > 0 && (
                    <>
                        <h2 id="movie-results" className="col-span-full text-xl font-semibold">Movies</h2>
                        {sortedMovies.map((result: MovieResult) => (
                            <Link
                                href={`/film/${result.id}`}
                                key={result.id}
                                prefetch={false}
                            >
                                <FilmCardWrapper
                                    film={result.id}
                                    variant="poster"
                                    mediaType="movie"
                                />
                            </Link>
                        ))}
                    </>
                )}

                {/* TV Show Results */}
                {sortedTV.length > 0 && (
                    <>
                        <h2 id="tv-results" className="col-span-full text-xl font-semibold">TV Shows</h2>
                        {sortedTV.map((result: TVResult) => (
                            <Link
                                href={`/tv/${result.id}`}
                                key={result.id}
                                prefetch={false}
                            >
                                <FilmCardWrapper
                                    film={result.id}
                                    variant="poster"
                                    mediaType="tv"
                                />
                            </Link>
                        ))}
                    </>
                )}
            </div>
            <div className="flex justify-center gap-2">
                <Button
                    variant="outline"
                    disabled={page <= 1}
                    onClick={() => {
                        const params = new URLSearchParams(searchParams.toString());
                        params.set('page', (page - 1).toString());
                        router.push(`?${params.toString()}`);
                    }}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    disabled={!canGoNext}
                    onClick={() => {
                        const params = new URLSearchParams(searchParams.toString());
                        params.set('page', (page + 1).toString());
                        router.push(`?${params.toString()}`);
                    }}
                >
                    Next
                </Button>
            </div>
        </div>
    );
} 