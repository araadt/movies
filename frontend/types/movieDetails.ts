import { MovieCredits } from './movieCredits';

export type FilmDetails = {
    adult: boolean;
    backdrop_path: string | null;
    belongs_to_collection: FilmCollection | null;
    budget: number;
    genres: FilmGenre[];
    homepage: string;
    id: number;
    imdb_id: string;
    origin_country: string[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: SpokenLanguage[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    // Additional fields available through append_to_response
    alternative_titles?: {
        titles: AlternativeTitle[];
    };
    credits?: MovieCredits;
    release_dates?: ReleaseDatesResponse;
    videos?: VideoResponse;
};



// Simplified type for film cards and lists that matches TMDB API response
export type FilmSummary = {
    id: number;
    title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    release_date: string;
    vote_average: number;
    vote_count: number;
    origin_country: string[];
    original_language: string;
    genres: FilmGenre[];
    adult?: boolean;
    backdrop_path?: string | null;
    video?: boolean;
    original_title?: string;
};

export type FilmGenre = {
    id: number;
    name: string;
};

export type ProductionCompany = {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
};

export type ProductionCountry = {
    iso_3166_1: string;
    name: string;
};

export type SpokenLanguage = {
    english_name: string;
    iso_639_1: string;
    name: string;
};

export type FilmCollection = {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
};

export type AlternativeTitle = {
    iso_3166_1: string;
    title: string;
    type: string;
};

export type Video = {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
    id: string;
};

export type VideoResponse = {
    id: number;
    results: Video[];
};

export type ReleaseType = 1 | 2 | 3 | 4 | 5 | 6; // Premiere | Theatrical (limited) | Theatrical | Digital | Physical | TV

export type ReleaseDate = {
    certification: string;
    descriptors: string[];
    iso_639_1: string;
    note: string;
    release_date: string;
    type: ReleaseType;
};

export type ReleaseDatesResult = {
    iso_3166_1: string;
    release_dates: ReleaseDate[];
};

export type ReleaseDatesResponse = {
    id: number;
    results: ReleaseDatesResult[];
};

export type CastMember = {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
};