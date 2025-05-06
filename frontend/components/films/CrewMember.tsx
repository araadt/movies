import { CrewCredit } from "@/types/peopleDetails";
import Link from "next/link";

interface CrewMemberProps {
    crew: CrewCredit[];
    creditTitle: string;
    className?: string;
    topLevel?: boolean;
}

export default function CrewMember({ crew, creditTitle, className, topLevel }: CrewMemberProps) {
    // Filter crew members by job title and limit to 3
    const members = crew
        .filter(member => {
            // Check both direct job property and jobs array
            const hasJob = member.job?.toLowerCase() === creditTitle.toLowerCase();
            const hasJobInArray = member.jobs?.some(job => job.job.toLowerCase() === creditTitle.toLowerCase());
            return hasJob || hasJobInArray;
        })
        .slice(0, 3);

    if (members.length === 0) return null;

    let columns = 'flex-row sm:flex-col';
    let creditTitleSize = 'text-md';
    let nameSize = 'text-lg';

    if (topLevel) {
        columns = 'flex-col gap-2';
        creditTitleSize = 'text-lg';
        nameSize = 'text-xl';
    }

    return (
        <div className={`flex gap-2 p-0 m-0 items-baseline ${className} ${columns} `} data-testid={`credit-crew-role-${creditTitle.toLowerCase().replace(/\s+/g, '-')}`}>
            <h3 className={`${creditTitleSize} font-noto-sans-display font-stretch-ultra-condensed text-foreground/80 font-semibold uppercase m-0 p-0 sm:text-left sm:flex-initial ${topLevel ? 'text-center sm:text-left w-full ' : 'flex-1 sm:flex-initial text-right'}`}>
                {creditTitle}
            </h3>
            <div className={`flex flex-col gap-2 flex-1 me-12 ${topLevel ? 'w-full text-center sm:text-left' : ''}`}>
                {members.map((member, index) => (
                    <p key={`${member.credit_id}-${member.id}`} className={`${nameSize} font-sans text-foreground font-medium uppercase ${index < members.length - 1 ? 'mr-2' : ''} ${topLevel ? 'w-full' : 'text-left sm:text-initial'}`}>
                        <Link href={`/people/${member.id}`} className="hover:underline">
                            {member.name}
                        </Link>
                        {index < members.length - 1 && ','}
                        {member.total_episode_count && (
                            <span className="invisible sm:visible text-xs text-foreground/40 ps-2">
                                ({member.total_episode_count} episodes)
                            </span>
                        )}
                    </p>
                ))}
            </div>
        </div>
    );
} 