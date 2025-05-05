export type Person = {
    adult: boolean; // defaults to true
    also_known_as: string[];
    biography: string;
    birthday: string | null;
    deathday: string | null;
    gender: number; // defaults to 0
    homepage: string | null;
    id: number; // defaults to 0
    imdb_id: string | null;
    known_for_department: string;
    name: string;
    place_of_birth: string | null;
    popularity: number; // defaults to 0
    profile_path: string | null;
};

export type CastCredit = Person & {
    character: string;
    credit_id: string;
    order: number;
    roles?: Array<{
        credit_id: string;
        character: string;
        episode_count: number;
    }>;
    total_episode_count?: number;
};

export type CrewCredit = Person & {
    credit_id: string;
    department: string;
    job: string;
    jobs?: Array<{
        credit_id: string;
        job: string;
        episode_count: number;
    }>;
    total_episode_count?: number;
};

export type PersonCredits = {
    cast: CastCredit[];
    crew: CrewCredit[];
    id: number;
};
