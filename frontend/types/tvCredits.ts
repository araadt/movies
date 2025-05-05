import { CastCredit, CrewCredit } from "./peopleDetails";

export type TVCredits = {
    id: number;
    cast: Array<CastCredit & {
        roles: Array<{
            credit_id: string;
            character: string;
            episode_count: number;
        }>;
        total_episode_count: number;
    }>;
    crew: Array<CrewCredit & {
        jobs: Array<{
            credit_id: string;
            job: string;
            episode_count: number;
        }>;
        total_episode_count: number;
    }>;
}; 