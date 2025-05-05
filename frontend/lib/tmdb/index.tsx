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
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${filmId}?language=en-US`, {
            ...options,
            next: { revalidate: 300 }
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
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${numericFilmId}/credits?language=en-US`, {
            ...options,
            next: { revalidate: 300 }
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
    try {
        const response = await fetch(`https://api.themoviedb.org/3/tv/${numericTvId}?language=en-US`, {
            ...options,
            next: { revalidate: 300 }
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
    try {
        const response = await fetch(`https://api.themoviedb.org/3/person/${numericPersonId}?language=en-US`, {
            ...options,
            next: { revalidate: 300 }
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
    try {
        const response = await fetch(`https://api.themoviedb.org/3/person/${numericPersonId}/combined_credits?language=en-US`, {
            ...options,
            next: { revalidate: 300 }
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

export const searchMovies = async (query: string, page: number = 1) => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=${page}`, {
            ...options,
            next: { revalidate: 300 }
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
            console.info(`Fetched ${data.results.length} movie results for query "${query}" on page ${page}`);
        }

        return {
            data,
            error: null
        };
    } catch (error) {
        console.error('Error searching movies:', error);
        return {
            data: null,
            error: error instanceof Error ? error.message : 'An unknown error occurred'
        };
    }
}

export const searchTV = async (query: string, page: number = 1) => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(query)}&language=en-US&page=${page}`, {
            ...options,
            next: { revalidate: 300 }
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
            console.info(`Fetched ${data.results.length} TV results for query "${query}" on page ${page}`);
        }

        return {
            data,
            error: null
        };
    } catch (error) {
        console.error('Error searching TV:', error);
        return {
            data: null,
            error: error instanceof Error ? error.message : 'An unknown error occurred'
        };
    }
}

export const fetchSearchResults = async (
    query: string,
    page: number = 1,
    mediaType: 'movie' | 'tv' = 'movie'
) => {
    try {
        // Validate page number
        if (page < 1) {
            page = 1;
        }

        // Validate media type
        if (mediaType !== 'movie' && mediaType !== 'tv') {
            throw new Error('Invalid media type. Must be either "movie" or "tv"');
        }

        // Fetch results based on media type
        const response = await fetch(
            `https://api.themoviedb.org/3/search/${mediaType}?query=${encodeURIComponent(query)}&language=en-US&page=${page}`,
            {
                ...options,
                next: { revalidate: 300 }
            }
        );

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
            console.info(`Fetched ${data.results.length} ${mediaType} results for query "${query}" on page ${page}`);
        }

        return {
            data,
            error: null
        };
    } catch (error) {
        console.error('Error fetching search results:', error);
        return {
            data: null,
            error: error instanceof Error ? error.message : 'An unknown error occurred'
        };
    }
}
