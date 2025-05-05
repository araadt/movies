// VDR

import { MovieCredits } from "@/types/movieCredits";
import { Person, PersonCredits } from "@/types/peopleDetails";
import { FilmDetails } from "@/types/movieDetails";
import { TVDetails } from "@/types/tvDetails";
import { TVCredits } from "@/types/tvCredits";

// TMDB BASIC GET REQUEST OPTIONS
export const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`
    }
};

export const getNowPlayingMovies = async (page: number = 1) => {
    try {
        if (!process.env.TMDB_API_KEY) {
            throw new Error('TMDB_API_KEY is not set in environment variables');
        }

        const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${process.env.TMDB_API_KEY}`
            }
        });

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

        const data = await response.json();

        if (!data.results) {
            throw new Error('Invalid API response format');
        }

        if (process.env.NODE_ENV === 'development') {
            console.info(`Fetched ${data.results.length} films:`, data.results);
        }

        return data;
    } catch (error) {
        console.error('Error fetching now playing movies:', error);
        throw error;
    }
};

export const getFilmDetails = async (filmId: number): Promise<FilmDetails | null> => {
// ENV REQUIREMENTS:
// - TMDB_API_KEY

    if (!process.env.TMDB_API_KEY) {
        throw new Error('TMDB_API_KEY is not set');
    }

    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${filmId}?language=en-US`, {
            ...options,
            cache: 'no-store',
            next: { revalidate: 0 }
        });
        const data = await response.json();

        if (!response.ok) {
            console.warn('Film not found:', {
                id: filmId,
                status: response.status,
                statusText: response.statusText
            });
            return null;
        }

        return data;
    } catch (error) {
        console.error('Error fetching film details:', error);
        return null;
    }
}

export const getFilmCredits = async (filmId: string | number): Promise<MovieCredits | null> => {
    const numericFilmId = typeof filmId === 'string' ? parseInt(filmId, 10) : filmId;

    if (!process.env.TMDB_API_KEY) {
        throw new Error('TMDB_API_KEY is not set');
    }

    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${numericFilmId}/credits?language=en-US`, {
            ...options,
            cache: 'no-store',
            next: { revalidate: 0 }
        });
        const data = await response.json();

        if (!response.ok) {
            console.warn('Film credits not found:', {
                id: numericFilmId,
                status: response.status,
                statusText: response.statusText
            });
            return null;
        }

        return data;
    } catch (error) {
        console.error('Error fetching film credits:', error);
        return null;
    }
}

export const getTVDetails = async (tvId: string | number): Promise<TVDetails | null> => {
    const numericTvId = typeof tvId === 'string' ? parseInt(tvId, 10) : tvId;

    if (!process.env.TMDB_API_KEY) {
        throw new Error('TMDB_API_KEY is not set');
    }

    try {
        const response = await fetch(`https://api.themoviedb.org/3/tv/${numericTvId}?language=en-US`, {
            ...options,
            cache: 'no-store',
            next: { revalidate: 0 }
        });
        const data = await response.json();

        if (!response.ok) {
            console.warn('TV show not found:', {
                id: numericTvId,
                status: response.status,
                statusText: response.statusText
            });
            return null;
        }

        return data;
    } catch (error) {
        console.error('Error fetching TV show details:', error);
        return null;
    }
}

export async function getTVCredits(tvId: number): Promise<TVCredits | null> {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/tv/${tvId}/aggregate_credits?language=en-US`, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching TV credits:', error);
        return null;
    }
}

export const getPerson = async (personId: string | number): Promise<Person | null> => {
    const numericPersonId = typeof personId === 'string' ? parseInt(personId, 10) : personId;

    if (!process.env.TMDB_API_KEY) {
        throw new Error('TMDB_API_KEY is not set');
    }

    try {
        const response = await fetch(`https://api.themoviedb.org/3/person/${numericPersonId}?language=en-US`, {
            ...options,
            cache: 'no-store',
            next: { revalidate: 0 }
        });
        const data = await response.json();

        if (!response.ok) {
            console.warn('Person not found:', {
                id: numericPersonId,
                status: response.status,
                statusText: response.statusText
            });
            return null;
        }

        return data;
    } catch (error) {
        console.error('Error fetching person:', error);
        return null;
    }
}

export const getPersonCredits = async (personId: string | number): Promise<PersonCredits | null> => {
    const numericPersonId = typeof personId === 'string' ? parseInt(personId, 10) : personId;

    if (!process.env.TMDB_API_KEY) {
        throw new Error('TMDB_API_KEY is not set');
    }

    try {
        const response = await fetch(`https://api.themoviedb.org/3/person/${numericPersonId}/combined_credits?language=en-US`, {
            ...options,
            cache: 'no-store',
            next: { revalidate: 0 }
        });
        const data = await response.json();

        if (!response.ok) {
            console.warn('Person credits not found:', {
                id: numericPersonId,
                status: response.status,
                statusText: response.statusText
            });
            return null;
        }

        return data;
    } catch (error) {
        console.error('Error fetching person credits:', error);
        return null;
    }
}