import { CastMember as CastMemberType } from "@/types/movieDetails";

type CastMemberProps = {
    cast: CastMemberType[];
    creditTitle: string;
    className?: string;
    topLevel?: boolean;
};

const CastMember = ({ cast, creditTitle, className, topLevel }: CastMemberProps) => {
    // Get the first four cast members before filtering
    // This is kind of an opinionated choice to limit four, but that's on the basis of the number of columns in the grid and nothing more
    const topBilledCastIds = cast.slice(0, 4).map(member => member.id);

    // Filter cast members by character and limit to 3
    const members = cast
        .filter(member => member.character.toLowerCase().includes(creditTitle.toLowerCase()))
        .slice(0, 3);

    if (members.length === 0) return null;

    let columns = 'flex';
    let creditTitleSize = 'text-md';
    let nameSize = 'text-lg';

    if (topLevel) {
        columns = 'flex-col';
        creditTitleSize = 'text-lg';
        nameSize = 'text-xl';
    }

    return (
        <div className={`flex ${columns} gap-2 p-0 m-0 mb-1 me-2 items-baseline justify-start ${className}`}>
            <h3 className={`${creditTitleSize} font-noto-sans-display font-stretch-ultra-condensed text-foreground/80 font-semibold uppercase self-baseline m-0 me-2 p-0`}>
                {creditTitle}
            </h3>
            <div className="flex flex-col gap-1 items-baseline">
                {members.map((member, index) => {
                    const isTopBilled = topBilledCastIds.includes(member.id);
                    return (
                        <p key={member.id} className={`${isTopBilled ? 'text-2xl' : nameSize} font-sans text-foreground font-medium uppercase self-baseline me-2 ${index < members.length - 1 ? 'mr-2' : ''}`}>
                            {member.name}
                            {index < members.length - 1 && ','}
                        </p>
                    );
                })}
            </div>
        </div>
    );
};

export default CastMember; 