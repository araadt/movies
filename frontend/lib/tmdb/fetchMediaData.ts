'use server';

import { getFilmCredits, getFilmDetails, getTVDetails, getTVCredits } from "@/lib/tmdb";
import { FilmDetails } from "@/types/movieDetails";
import { TVDetails } from "@/types/tvDetails";

export type MediaData = {
    data: FilmDetails | TVDetails | null;
    creditData: any;
    error?: string;
};

export async function fetchMediaData(filmId: number, mediaType: 'movie' | 'tv'): Promise<MediaData> {
    try {
        let data: FilmDetails | TVDetails | null = null;
        let creditData: any = null;

        if (mediaType === 'movie') {
            [data, creditData] = await Promise.all([
                getFilmDetails(filmId),
                getFilmCredits(filmId)
            ]);
        } else {
            [data, creditData] = await Promise.all([
                getTVDetails(filmId),
                getTVCredits(filmId)
            ]);
        }

        return { data, creditData };
    } catch (error) {
        console.error('Error fetching media data:', error);
        return {
            data: null,
            creditData: null,
            error: error instanceof Error ? error.message : 'An unknown error occurred'
        };
    }
} 