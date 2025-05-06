import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getPerson, getPersonCredits } from "@/lib/tmdb";
import { PosterOrBioPhoto, HeroTitle, CastAndCrewTitle } from "@/components/films/FilmCard";
import FluidColumn from "@/components/layout/column-wrapper";

import type { Metadata } from 'next'

import { env } from "process";
import React from "react";
import { TruncatedBio } from "@/components/films/TruncatedBio";
import { Badge } from "@/components/ui/badge";
import { StarIcon } from "lucide-react";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const person = await getPerson(id);

    if (!person) {
        return {
            title: `Person Not Found | ${env.NEXT_PUBLIC_SITE_NAME}`,
        }
    }

    return {
        title: `${person?.name} | Cast & Crew | ${env.NEXT_PUBLIC_SITE_NAME}`,
        description: `Cast & Crew for ${person?.name}`,
    }
}

const BioDetail = ({ label, value, person, className }: { label: string, value: any | null, person?: any, className?: string }) => {
    if (!value) {
        return null;
    }

    if (label === "Adult") {
        if (value === true || value === 1 || value === "true" || value === "1") {
            label = "";
            value = "🍆";
        } else {
            label = "";
            value = "";
        }
    }

    if (label === "Born") {
        if (person?.place_of_birth) {
            value = `${value} in ${person.place_of_birth}`;
        } else {
            value = `${value}`;
        }
    }

    if (label === "Gender") {
        if (value === 1) {
            label = "";
            value = "Female";
        } else if (value === 2) {
            label = "";
            value = "Male";
        } else if (value === 3) {
            label = "";
            value = "Non-binary";
        } else {
            if (process.env.NODE_ENV === 'development') {
                console.info(`Unknown gender: ${value}, ${person?.gender}, person:`, person);
            }
            label = "Gender";
            value = "Unknown";
        }
    }

    if (label === "Also Known As") {
        const maxNames = 3;
        const names = value.map((name: string) => name.trim());
        value = names.length > maxNames
            ? names.slice(0, maxNames).join(", ") + "..."
            : names.join(", ");
    }

    return (
        <p className={`font-noto-sans-display font-stretch-condensed uppercase font-medium text-foreground/80 text-base pe-2 ${className}`}>
            {label}{value ? " " : ""}<span className="text-xl px-2 me-2 text-pretty whitespace-pre-wrap">{value}</span>
        </p >
    )
}

const RatingBadge = ({ value }: { value: number }) => {
    let bgColor

    if (value === null) {
        return null;
    }

    if (value < 5) {
        bgColor = "bg-transparent border border-foreground/10 hover:border-red-500";
    } else if (value < 7) {
        bgColor = "bg-transparent border border-foreground/10 hover:border-amber-200";
    } else {
        bgColor = "bg-transparent border border-foreground/10 hover:border-green-500";
    }

    return (
        <Badge className={`${bgColor} text-foreground/80 rounded-full hover:bg-transparent flex flex-row items-center gap-1`}>
            <StarIcon className="w-4 h-4" />
            <p className="text-sm font-noto-sans-display font-stretch-ultra-condensed font-bold uppercase">{value.toFixed(1)}</p>
        </Badge>
    )
}

const CastAndCrewCredits = ({ person, credits }: { person: any, credits: any }) => {
    // Filter out 'id' and any other non-credit types
    const creditTypes = Object.keys(credits).filter(type => type !== 'id');

    const renderCreditCards = (type: string) => {
        const creditList = credits[type]
            .filter((credit: any) => credit.release_date && credit.release_date !== 'N/A')
            .sort((a: any, b: any) => {
                const dateA = a.release_date ? new Date(a.release_date).getTime() : 0;
                const dateB = b.release_date ? new Date(b.release_date).getTime() : 0;
                return dateB - dateA;
            });

        // For crew, group by job
        if (type === 'crew') {
            // Group credits by job
            const groupedCredits = creditList.reduce((acc: { [key: string]: any[] }, credit: any) => {
                const job = credit.job || 'Other';
                if (!acc[job]) {
                    acc[job] = [];
                }
                acc[job].push(credit);
                return acc;
            }, {});

            // Sort jobs alphabetically
            const sortedJobs = Object.keys(groupedCredits).sort();

            return sortedJobs.map((job, jobIndex) => (
                <React.Fragment key={`job-${jobIndex}`}>
                    <div className="
                        col-span-full
                        col-start-0 lg:col-start-1
                        col-end-1 lg:col-end-2
                        flex lg:justify-end items-baseline"
                    >
                        <h2 className="font-noto-sans-display font-stretch-ultra-condensed text-foreground/80 font-semibold uppercase text-xl">
                            {job}
                        </h2>
                    </div>
                    {groupedCredits[job].map((credit: any, index: number) => {
                        const releaseYear = credit.release_date
                            ? new Date(credit.release_date).toLocaleDateString('en-US', { year: 'numeric' })
                            : 'N/A';

                        const uniqueKey = `${type}-${job}-${credit.id}-${index}`;
                        const isLastInGroup = index === groupedCredits[job].length - 1;
                        const creditLink = credit.media_type === 'movie' ? `/film/${credit.id}` : `/tv/${credit.id}`;

                        return (
                            <React.Fragment key={uniqueKey}>
                                <div
                                    data-id={`credit-${credit.id}`}
                                    data-type={type}
                                    className="
                                        col-span-full
                                        col-start-1 lg:col-start-2
                                        -col-end-1
                                        flex flex-row flex-wrap gap-4 sm:gap-8 items-baseline"
                                >
                                    <div
                                        className={`grid grid-cols-[3fr_12fr_1fr] w-full gap-4 p-0 m-0 items-baseline`}
                                        data-id={`credit-${credit.id}`}
                                        data-type={type}
                                        data-title={credit.title}
                                        data-job={credit.job}
                                        data-cast-id={credit.cast_id}
                                    >
                                        {/* first column */}
                                        <h3 className={`font-noto-sans-display col-span-1 font-stretch-ultra-condensed text-foreground/80 font-semibold uppercase m-0 p-0 text-right invisible`}
                                            data-id={`credit-${credit.id}`}
                                            data-type={type}
                                            data-title={credit.title}
                                            data-job={credit.job}
                                        >
                                            {credit.job}
                                        </h3>

                                        {/* second column */}
                                        <div className="col-span-1">
                                            <p className="font-sans text-2xl text-foreground font-medium uppercase col-span-1"
                                                data-id={`credit-${credit.id}`}
                                                data-type={type}
                                                data-title={credit.title}
                                                data-job={credit.job}
                                            >
                                                <Link className="hover:underline" href={creditLink}>{credit.title}{" "}</Link>
                                                <span className={`font-noto-sans-display text-xl font-stretch-ultra-condensed text-foreground/80 font-semibold uppercase`}>
                                                    {releaseYear} {credit.media_type}
                                                </span>
                                            </p>
                                        </div>

                                        {/* third column */}
                                        <div className="col-span-1">
                                            <div className="flex flex-row items-center justify-end">
                                                <RatingBadge value={credit.vote_average} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {isLastInGroup && <div className="mb-10" data-id="spacer"><p>&nbsp;</p></div>}
                            </React.Fragment>
                        );
                    })}
                </React.Fragment>
            ));
        }

        // For cast, render as before
        return creditList.map((credit: any, index: number) => {
            const releaseYear = credit.release_date
                ? new Date(credit.release_date).toLocaleDateString('en-US', { year: 'numeric' })
                : 'N/A';

            const uniqueKey = `${type}-${credit.id}-${index}`;
            const isLastInGroup = index === creditList.length - 1;
            const creditLink = credit.media_type === 'movie' ? `/film/${credit.id}` : `/tv/${credit.id}`;

            return (
                <React.Fragment key={uniqueKey}>
                    <div
                        data-id={`credit-${credit.id}`}
                        data-type={type}
                        className="
                            col-span-full
                            col-start-1 lg:col-start-2
                            -col-end-1
                            flex flex-row flex-wrap gap-4 sm:gap-8 items-baseline"
                    >
                        <div
                            className={`grid grid-cols-[3fr_8fr_1fr] sm:grid-cols-[3fr_12fr_1fr] w-full gap-4 p-0 m-0 items-baseline`}
                            data-id={`credit-${credit.id}`}
                            data-type={type}
                            data-title={credit.title}
                            data-job={credit.job}
                            data-cast-id={credit.cast_id}
                        >
                            {/* first column */}
                            <h3 className={`font-noto-sans-display col-span-1 font-stretch-ultra-condensed text-foreground/80 font-semibold uppercase m-0 p-0 text-lg text-right`}>
                                {credit.character}
                            </h3>

                            {/* second column */}
                            <div className="col-span-1">
                                <p className="font-sans text-2xl text-foreground font-medium uppercase col-span-1">
                                    <Link className="hover:underline" href={creditLink}>{credit.title}{" "}</Link>
                                    <span className={`font-noto-sans-display text-base font-stretch-ultra-condensed text-foreground/80 font-semibold uppercase`}>
                                        {releaseYear} {credit.media_type === 'movie' ? '' : 'TV'}
                                    </span>
                                </p>
                            </div>

                            {/* third column */}
                            <div className="col-span-1">
                                <div className="flex flex-row items-center justify-end">
                                    <RatingBadge value={credit.vote_average} />
                                </div>
                            </div>
                        </div>
                    </div>
                    {isLastInGroup && <div className="mb-10" data-id="spacer"><p>&nbsp;</p></div>}
                </React.Fragment>
            );
        });
    };

    return (
        <FluidColumn
            id={`credits-${person.id}`}
            data-person-id={person.id}
            data-person-name={person.name}
        >
            {creditTypes.map(type => (
                <React.Fragment key={type}>
                    {type === 'cast' && (
                        <div className="
                            col-span-full
                            col-start-0 lg:col-start-1
                            col-end-1 lg:col-end-2
                            flex lg:justify-end items-baseline"
                        >
                            <CastAndCrewTitle title={type.charAt(0).toUpperCase() + type.slice(1)} />
                        </div>
                    )}
                    {renderCreditCards(type)}
                </React.Fragment>
            ))}
        </FluidColumn>
    );
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const person = await getPerson(id);
    const credits = await getPersonCredits(id);

    const biography = person?.biography;

    if (!person) {
        // TODO: Migrate the error display to a generic component
        // SEE ALSO /film/[id]/page.tsx and migrate that one as well

        return (
            <div className="flex items-center justify-center w-full h-full flex-1">
                <Card className="w-full h-full">
                    <CardHeader>
                        <CardTitle>
                            <h1 className="text-3xl font-noto-sans-display font-stretch-ultra-condensed text-foreground/80 uppercase">Person Not Found</h1>
                        </CardTitle>
                        <CardDescription>
                            <p className="text-foreground/60">No person found with ID: {id}</p>
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        );
    }

    if (process.env.NODE_ENV === 'development' && person) {
        console.info(`Fetched person:`);
        console.info(person);
    }

    if (process.env.NODE_ENV === 'development' && credits && process.env.VERBOSE) {
        console.info(`Fetched credits:`);
        console.info(credits);
    }

    return (
        <>
            <FluidColumn
                id={`person-details-${id}`}
                data-person-id={id}
                data-person-name={person.name}>

                {/* content area */}
                <div className="
                col-span-full
                col-start-1 lg:col-start-2
                -col-end-1
                p-0 m-0 
                mt-0 sm:mt-[10svh]    
                lg:aspect-video
                relative
                flex flex-col"
                >

                    {/* Content section */}
                    <div className="relative z-10 flex flex-col">
                        <HeroTitle title={person.name} className="mb-0 ms-0" />

                        {/* bio poster */}
                        <div className="max-w-[300px] lg:relative lg:right-[16.25svw] lg:mb-[-20svw] lg:max-w-[15svw]">
                            {person.profile_path && <PosterOrBioPhoto film={person.profile_path} />}
                        </div>

                        {/* film metadata */}
                        <div className="flex flex-col my-2">
                            <BioDetail label="Known for" value={person.known_for_department} />
                            <div id="person-details" className="flex flex-col sm:flex-row flex-wrap gap-2">
                                <BioDetail label="Adult" value={person.adult} />
                                <BioDetail label="Born" value={person.birthday} person={person} />
                                <BioDetail label="Died" value={person.deathday} />
                                <BioDetail label="Gender" value={person.gender} />
                            </div>
                            <BioDetail label="Also Known As" value={person.also_known_as} className="text-muted-foreground text-sm" />
                        </div>

                        {/* bio overview */}
                        <div className="my-12">
                            <h2
                                className="font-noto-sans-display font-stretch-ultra-condensed text-foreground/80 font-semibold uppercase">Biography</h2>
                            <div id="overview">
                                {biography ? <TruncatedBio text={biography} className="text-xl md:text-2xl" /> : null}
                            </div>
                        </div>
                    </div>
                </div>
            </FluidColumn>
            <CastAndCrewCredits person={person} credits={credits} />
        </>
    )
}

