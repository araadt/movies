// VDR

// ENV REQUIREMENTS:
// - TMDB_API_KEY

import { MovieCredits } from "@/types/movieCredits";
import { CastCredit, CrewCredit } from "@/types/peopleDetails";

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

export const getCastCredits = async (castId: string | number): Promise<CastCredit> => {
    const numericCastId = typeof castId === 'string' ? parseInt(castId, 10) : castId;

    const response = await fetch(`https://api.themoviedb.org/3/person/${numericCastId}?language=en-US`, options);
    const data = await response.json();

    console.log(data);

    return data;
}

export const getCrewCredits = async (crewId: string | number): Promise<CrewCredit> => {
    const numericCrewId = typeof crewId === 'string' ? parseInt(crewId, 10) : crewId;

    const response = await fetch(`https://api.themoviedb.org/3/person/${numericCrewId}/credits?language=en-US`, options);
    const data = await response.json();

    return data;
}