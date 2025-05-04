// VDR

// ENV REQUIREMENTS:
// - TMDB_API_KEY

import { FilmDetails } from "@/types/movieDetails";
import { MovieCredits } from "@/types/movieCredits";

// TMDB BASIC GET REQUEST OPTIONS
export const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`
    }
};

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

    return data;
}

export const getFilmCredits = async (filmId: string | number): Promise<MovieCredits> => {
    const numericFilmId = typeof filmId === 'string' ? parseInt(filmId, 10) : filmId;

    const response = await fetch(`https://api.themoviedb.org/3/movie/${numericFilmId}/credits?language=en-US`, options);
    const data = await response.json();

    return data;
}