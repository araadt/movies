'use client';

import { useEffect, useState } from "react";
import { FilmDetails } from "@/types/movieDetails";
import { TVDetails } from "@/types/tvDetails";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { fetchMediaData } from "@/lib/tmdb/fetchMediaData";
import FilmCard from "./FilmCard";
import { Skeleton } from "../ui/skeleton";

type FilmCardWrapperProps = {
    film: string | number;
    variant: 'poster' | 'details' | string;
    mediaType: 'movie' | 'tv';
};

export default function FilmCardWrapper({ film, variant, mediaType }: FilmCardWrapperProps) {
    const [filmData, setFilmData] = useState<FilmDetails | TVDetails | null>(null);
    const [credits, setCredits] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const filmId = typeof film === 'string' ? parseInt(film, 10) : film;
                const result = await fetchMediaData(filmId, mediaType);

                if (result.error) {
                    setError(result.error);
                } else if (result.data) {
                    setFilmData(result.data);
                    setCredits(result.creditData);

                    if (process.env.NODE_ENV === 'development') {
                        const title = mediaType === 'movie'
                            ? (result.data as FilmDetails).title
                            : (result.data as TVDetails).name;
                        console.log('Loaded data for:', title);
                    }
                }
            } catch (err) {
                console.error('Error fetching film data:', err);
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [film, mediaType]);

    if (error) {
        return (
            <div className="flex items-center justify-center w-full h-full flex-1">
                <Card className="w-full h-full">
                    <CardHeader>
                        <CardTitle>
                            <h1 className="text-3xl font-noto-sans-display font-stretch-ultra-condensed text-foreground/80 uppercase">Error Loading {mediaType === 'movie' ? 'Film' : 'TV Show'}</h1>
                        </CardTitle>
                        <CardDescription>
                            <p className="text-foreground/60">{error}</p>
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        );
    }

    if (isLoading || !filmData || !credits) {
        if (variant === 'poster') {
            return <Skeleton className="aspect-[2/3] w-full" />;
        }
        return null;
    }

    // Transform TV data to match film data structure if needed
    const media = mediaType === 'tv' ? {
        ...filmData,
        id: filmData.id,
        title: (filmData as TVDetails).name,
        release_date: (filmData as TVDetails).first_air_date,
        runtime: (filmData as TVDetails).episode_run_time?.[0] || 0,
        adult: false,
        belongs_to_collection: null,
        budget: 0,
        homepage: (filmData as TVDetails).homepage,
        imdb_id: '',
        original_language: (filmData as TVDetails).original_language,
        original_title: (filmData as TVDetails).original_name,
        popularity: (filmData as TVDetails).popularity,
        production_companies: (filmData as TVDetails).production_companies,
        production_countries: (filmData as TVDetails).production_countries,
        revenue: 0,
        spoken_languages: (filmData as TVDetails).spoken_languages,
        status: (filmData as TVDetails).status,
        tagline: (filmData as TVDetails).tagline || '',
        video: false,
        vote_average: (filmData as TVDetails).vote_average,
        vote_count: (filmData as TVDetails).vote_count,
        videos: (filmData as TVDetails).videos,
        overview: (filmData as TVDetails).overview,
        poster_path: (filmData as TVDetails).poster_path,
        backdrop_path: (filmData as TVDetails).backdrop_path,
        genres: (filmData as TVDetails).genres,
        origin_country: (filmData as TVDetails).origin_country || [],

        // Add TV-specific fields
        number_of_episodes: (filmData as TVDetails).number_of_episodes,
        number_of_seasons: (filmData as TVDetails).number_of_seasons,
        seasons: (filmData as TVDetails).seasons,
        type: (filmData as TVDetails).type,
        in_production: (filmData as TVDetails).in_production,
        networks: (filmData as TVDetails).networks,
        created_by: (filmData as TVDetails).created_by,
    } as FilmDetails & TVDetails : filmData as FilmDetails;

    return (
        <FilmCard
            media={media}
            credits={credits}
            variant={variant}
            mediaType={mediaType}
        />
    );
} 