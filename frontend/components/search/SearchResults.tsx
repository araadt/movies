'use client';

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import FilmCardWrapper from '@/components/films/FilmCardWrapper';
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import SearchBar from "@/components/search/SearchBar";
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
    const [filterText, setFilterText] = useState("");

    // Filter results based on the filter text
    const filteredMovies = useMemo(() => {
        if (!filterText) return initialMovies;
        const searchTerm = filterText.toLowerCase();
        return initialMovies.filter(movie =>
            movie.title.toLowerCase().includes(searchTerm)
        );
    }, [initialMovies, filterText]);

    const filteredTV = useMemo(() => {
        if (!filterText) return initialTV;
        const searchTerm = filterText.toLowerCase();
        return initialTV.filter(tv =>
            tv.name.toLowerCase().includes(searchTerm)
        );
    }, [initialTV, filterText]);

    // Sort filtered results based on the selected sort order
    const sortedMovies = useMemo(() => {
        return [...filteredMovies].sort((a, b) => {
            if (sortBy === 'popularity') {
                return b.popularity - a.popularity;
            } else {
                if (!a.release_date) return 1;
                if (!b.release_date) return -1;
                return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
            }
        });
    }, [filteredMovies, sortBy]);

    const sortedTV = useMemo(() => {
        return [...filteredTV].sort((a, b) => {
            if (sortBy === 'popularity') {
                return b.popularity - a.popularity;
            } else {
                if (!a.first_air_date) return 1;
                if (!b.first_air_date) return -1;
                return new Date(b.first_air_date).getTime() - new Date(a.first_air_date).getTime();
            }
        });
    }, [filteredTV, sortBy]);

    const handleSortChange = (newSort: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('sort', newSort);
        router.push(`?${params.toString()}`);
    };

    const totalInitialResults = initialMovies.length + initialTV.length;
    const totalFilteredResults = sortedMovies.length + sortedTV.length;
    const hasMoreMovies = initialMovies.length === 20;
    const hasMoreTV = initialTV.length === 20;
    const canGoNext = hasMoreMovies || hasMoreTV;

    if (totalInitialResults === 0) {
        return (
            <div className="flex flex-col items-center justify-center w-full h-full min-h-[80vh]">
                <p className="text-xl text-pretty text-center mt-[10svh] lg:mt-[20svh]">Oof! No results found for <span className="font-noto-sans-display font-stretch-ultra-condensed">{query.toLocaleUpperCase("en-US")}</span>. Bummer.</p>

                <div className="flex flex-col gap-6 mt-[10svh] lg:mt-[20svh] pt-4 w-full max-w-sm">
                    <p className="text-sm text-foreground/65 text-pretty text-center">Would you like to try something new?</p>
                    <SearchBar variant="standard" />
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 w-full h-full">
            <h1 className="sr-only" data-testid="search-results-title">Search Results</h1>
            <h2 className="text-3xl lg:text-2xl text-pretty text-center leading-6 w-full" data-testid="search-results-header">I think <span className="font-noto-sans-display col-span-1 font-stretch-ultra-condensed text-4xl lg:text-3xl  font-semibold" data-testid="search-results-title-query">{query.toLocaleUpperCase("en-US")}</span> is a great idea</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-8 items-center lg:items-baseline justify-between">
                <div className="col-span-1 flex justify-center lg:justify-start items-center gap-2 lg:min-h-[100px]">

                    <p className="text-sm text-foreground/65 text-center lg:text-left">
                        <span className="hidden sm:inline">We found</span> <strong><a href="#movie-results">{sortedMovies.length} movies</a>, and <a href="#tv-results">{sortedTV.length} TV shows</a></strong><span className="hidden sm:inline"> for <span className="font-noto-sans-display font-stretch-ultra-condensed">{query.toLocaleUpperCase("en-US")} {totalFilteredResults === 0 ? `and ${filterText.toLocaleUpperCase("en-US")}.` : "."}</span></span>
                    </p>
                </div>


                <div className={`col-span-1 flex justify-center items-center flex-1 gap-2 mt-2 lg:mt-0 ${totalFilteredResults === 0 ? 'invisible' : ''}`}>
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

                {/* Add filter input */}
                <div className="col-span-1 flex justify-center lg:justify-end items-center gap-2">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground " />
                        <Input
                            type="text"
                            placeholder="Search within results…"
                            value={filterText}
                            onChange={(e) => setFilterText(e.target.value)}
                            className="pl-9"
                        />
                    </div>
                </div>

            </div>


            {totalFilteredResults === 0 ? (
                <div className="flex flex-col gap-4 items-center justify-center w-full h-full min-h-[40vh]">
                    <p className="text-xl text-pretty text-center mt-[10svh] lg:mt-[20svh]">Huh! That's a bummer! No matches were found for <span className="font-noto-sans-display font-stretch-ultra-condensed">{filterText.toLocaleUpperCase("en-US")}</span> within these {totalInitialResults} <span className="font-noto-sans-display font-stretch-ultra-condensed">{query.toLocaleUpperCase("en-US")}</span> results</p>
                    <div className="flex flex-col gap-2 border-t mt-[10svh] lg:mt-[20svh] pt-4">
                        <p className="text-sm text-foreground/65 text-pretty text-center">Would you like to search for <span className="font-noto-sans-display font-stretch-ultra-condensed">{query.toLocaleUpperCase("en-US")}</span> + <span className="font-noto-sans-display font-stretch-ultra-condensed">{filterText.toLocaleUpperCase("en-US")}</span> in the entire database?</p>
                        <div className="flex gap-2 justify-center mt-4">
                            <Button variant="outline" onClick={() => setFilterText("")}>Clear Filter</Button>
                            <Link href={`/search/${query}%20${filterText}`}>
                                <Button variant="default">Search</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4" data-testid="search-results-list">
                    {/* Movie Results */}
                    {sortedMovies.length > 0 && (
                        <>
                            <h2 id="movie-results" className="col-span-full text-xl font-semibold" data-testid="movie-results-heading">Movies</h2>
                            {sortedMovies.map((result: MovieResult) => (
                                <Link
                                    href={`/film/${result.id}`}
                                    key={result.id}
                                    prefetch={false}
                                    data-testid={`movie-result-${result.id}`}
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
                            <h2 id="tv-results" className="col-span-full text-xl font-semibold" data-testid="tv-results-heading">TV Shows</h2>
                            {sortedTV.map((result: TVResult) => (
                                <Link
                                    href={`/tv/${result.id}`}
                                    key={result.id}
                                    prefetch={false}
                                    data-testid={`tv-result-${result.id}`}
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
            )}

            <div className={`flex justify-center gap-2 ${totalFilteredResults === 0 ? 'hidden' : ''}`}>
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