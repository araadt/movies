'use client';

import { CastCredit } from "@/types/peopleDetails";

// Module-level variable to track if we've logged
let hasLogged = false;

type CastMemberProps = {
    cast: CastCredit[];
    creditTitle: string;
    className?: string;
    topLevel?: boolean;
};

const CastMember = ({ cast, creditTitle, className, topLevel }: CastMemberProps) => {
    // Get the first four cast members before filtering
    // This is kind of an opinionated choice to limit four, but that's on the basis of the number of columns in the grid and nothing more
    const topBilledCastIds = cast.slice(0, 4).map(member => member.id);

    if (!hasLogged && cast.length > 0) {
        console.log('=== Top 4 Billed Cast Members ===');
        console.log('Total cast members:', cast.length);

        // Get the first 4 cast members by order
        const topBilledCast = cast.slice(0, 4);
        console.log('Top billed cast members:');
        topBilledCast.forEach(member => {
            console.log(`- ${member.name} as ${member.character} (ID: ${member.id})`);
        });
        console.log('===============================');
        hasLogged = true;
    }

    // Filter cast members by character and limit to 3
    const members = cast
        .filter(member => member.character.toLowerCase() === creditTitle.toLowerCase())
        .slice(0, 3);

    if (members.length === 0) return null;

    let columns = 'flex-row sm:flex-col';
    let creditTitleSize = 'text-md';
    let nameSize = 'text-lg';

    if (topLevel) {
        columns = 'flex-col';
        creditTitleSize = 'text-lg';
        nameSize = 'text-xl';
    }

    return (
        <div className={`flex ${columns} gap-2 p-0 m-0 items-baseline ${className}`}>
            <h3 className={`${creditTitleSize} font-noto-sans-display font-stretch-ultra-condensed text-foreground/80 font-semibold uppercase m-0 p-0 text-right sm:text-left flex-1 sm:flex-initial`}>
                {creditTitle}
            </h3>
            {members.map((member, index) => {
                const isTopBilled = topBilledCastIds.includes(member.id);
                return (
                    <p key={member.id} className={`${isTopBilled ? 'text-2xl' : nameSize} font-sans text-foreground font-medium uppercase flex-1  ${index < members.length - 1 ? 'mr-2' : ''}`}>
                        {member.name}
                        {index < members.length - 1 && ','}
                    </p>
                );
            })}
        </div>
    );
};

export default CastMember; 