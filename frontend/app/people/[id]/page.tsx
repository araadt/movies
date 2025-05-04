import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getPerson, getPersonCredits } from "@/lib/tmdb";
import Image from "next/image";
import { PosterOrBioPhoto, HeroTitle } from "@/components/films/FilmCard";
import FluidColumn from "@/components/layout/column-wrapper";

import type { Metadata } from 'next'

import { env } from "process";
import React from "react";
import { TruncatedBio } from "@/components/films/TruncatedBio";

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

const BioDetail = ({ label, value, person }: { label: string, value: any | null, person?: any }) => {
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

    return (
        <p className="font-noto-sans-display font-stretch-condensed uppercase font-medium text-foreground/80 text-base">
            {label}{value ? " " : ""}<span className="text-xl">{value}</span>
        </p >
    )
}

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
        console.info(`Fetched person:`, person);
    }

    if (process.env.NODE_ENV === 'development' && credits && process.env.VERBOSE) {
        console.info(`Fetched credits:`, credits);
    }

    return (
        <>
            <FluidColumn
                id={`person-details-${id}`}
                data-person-id={id}
                data-person-name={person.name}>

                {/* bio poster */}
                <div className="m-0 p-0 mt-0 sm:mt-[10svh]">
                    {person.profile_path && <PosterOrBioPhoto film={person.profile_path} className="m-0 p-0 mt-5 mb-10" />}
                </div>


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

                        <HeroTitle title={person.name} className="mb-0 ms-0 lg:ms-0" />

                        {/* film metadata */}
                        <div className="flex flex-col my-2">
                            <div id="person-details" className="flex flex-col sm:flex-row flex-wrap gap-2">
                                <BioDetail label="Adult" value={person.adult} />
                                <BioDetail label="Known for" value={person.known_for_department} />
                                <BioDetail label="Born" value={person.birthday} person={person} />
                                <BioDetail label="Died" value={person.deathday} />
                                <BioDetail label="Gender" value={person.gender} />
                            </div>
                            <BioDetail label="Also Known As" value={person.also_known_as} />
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
        </>
    )
}

