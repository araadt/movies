import { CrewCredit } from "@/types/peopleDetails";
import Link from "next/link";

type CrewMemberProps = {
    crew: CrewCredit[];
    creditTitle: string;
    className?: string;
    topLevel?: boolean;
};

const CrewMember = ({ crew, creditTitle, className, topLevel }: CrewMemberProps) => {
    // Filter crew members by job title and limit to 3
    const members = crew
        .filter(member => member.job.toLowerCase() === creditTitle.toLowerCase())
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
        <div className={`flex ${columns}  p-0 m-0 mb-1 me-2 items-baseline justify-start ${className}`}>
            <h3 className={`${creditTitleSize} font-noto-sans-display font-stretch-ultra-condensed font-semibold uppercase self-baseline m-0 me-2 p-0`}>
                {creditTitle}
            </h3>
            <div className="flex flex-col gap-1 items-baseline">
                {members.map((member, index) => (
                    <p key={member.id} className={`${nameSize} font-sans text-foreground font-medium uppercase self-baseline me-2 ${index < members.length - 1 ? 'mr-2' : ''}`}>
                        <Link href={`/people/${member.id}`} className="hover:underline">
                            {member.name}
                        </Link>
                        {index < members.length - 1 && ','}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default CrewMember; 