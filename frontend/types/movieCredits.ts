import { CastCredit, CrewCredit } from "./peopleDetails";

export type MovieCredits = {
    id: number;
    cast: CastCredit[];
    crew: CrewCredit[];
};
