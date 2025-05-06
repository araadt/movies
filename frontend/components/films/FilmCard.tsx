'use client';

// We are specifcally keeping this page as a server-side component for the time being, as it will maintain the request memoization from the `NewReleases` component.
// See the documentation for more information in-memory request caching:
// ! DOCS: https://nextjs.org/docs/app/building-your-application/data-fetching/fetching#server-components

import { FilmDetails } from "@/types/movieDetails";
import { TVDetails } from "@/types/tvDetails";
import { CastCredit, CrewCredit } from "@/types/peopleDetails";
import FluidColumn from "@/components/layout/column-wrapper";
import CrewMember from "./CrewMember";
import { CastMember } from "./CastMember";
import { Badge } from "../ui/badge";
import { Clock, Star, ArrowUpRight } from 'lucide-react';
import Link from "next/link";
import React from "react";
import Image from "next/image";

// Default blur placeholder for images
const DEFAULT_BLUR_URL = 'https://image.tmdb.org/t/p/w1280/ve72VxNqjGM69Uky4WTo2bK6rfq.jpg';

type FilmCardProps = {
    media: FilmDetails;
    credits: {
        cast: CastCredit[];
        crew: CrewCredit[];
    };
    variant: 'poster' | 'details' | string;
    mediaType: 'movie' | 'tv';
};

export const HeroTitle = ({ title, className }: { title: string, className?: string }) => {
    return (
        <h1
            className={`font-noto-sans-display font-stretch-ultra-condensed uppercase text-6xl leading-[3.625rem] md:text-8xl lg:text-9xl font-light text-foreground me-[1.5em] p-0 m-0 mb-8 lg:ms-[-1.5em] text-balance ${className}`}
            data-title={title}
        >
            {title}
        </h1>
    )
}

export const PosterOrBioPhoto = ({ film, className }: { film: string, className?: string }) => {
    return (
        <article
            className={`aspect-[2/3] justify-end bg-cover bg-center relative p-0 m-0 my-0 mb-4 sm:mb-8 sm:mt-8 w-full max-w-[600px] sm:max-w-[300px] min-w-[100px] shadow-sm border border-foreground/10  ${className}`}
            style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w500${film})`
            }}
        >
        </article>)
}

export const CastAndCrewTitle = ({ title, className }: { title: string, className?: string }) => {
    return (
        <div className={`flex gap-[.5em] relative bottom-[0.25em] self-baseline items-baseline me-[1rem] ${className}`}>
            <h2
                className={`text-2xl font-noto-sans-display font-stretch-ultra-condensed text-foreground/80 font-semibold m-0 p-0 self-baseline uppercase ${className}`}
                data-id={`credit-title-${title}`}
                data-testid={`credit-title`}
                data-title={title}
                data-type={title}
            >
                {title}
            </h2>
        </div>
    )
}

// TODO: THIS IS A LONG LIST OF FILM METADATA COMPONENTS THAT WILL NEED TO BE MOVED ELSEWHERE
const Runtime = ({ data }: { data: FilmDetails }) => {
    return (
        <div className="flex gap-1">
            <Clock className="w-4 h-4 self-center " />
            <p data-id="runtime" data-title={data.runtime}>{data.runtime}</p>
        </div>
    )
}

const SpokenLanguages = ({ data }: { data: FilmDetails }) => {
    return (
        <div className="flex gap-1">
            <p data-id="spoken-languages" data-title={data.spoken_languages.map(language => language.name).join(', ')}>{data.spoken_languages.map(language => language.name).join(', ')}</p>
        </div>
    )
}

const AgeRating = ({ data }: { data: FilmDetails }) => {
    if (data.adult) {
        return (
            <Badge variant="outline" className=" text-foreground border-foreground rounded-sm uppercase"><p data-id="adult" data-title="Mature">Mature</p></Badge>
        )
    }
    return null;
}

const GenreList = ({ data }: { data: FilmDetails }) => {
    return (
        <div className="flex gap-1">
            <p data-id="genres" data-testid="media-genres" data-title={data.genres.map(genre => genre.name).join(', ')}>{data.genres.map(genre => genre.name).join(', ')}</p>
        </div>
    )
}

const OriginalLanguage = ({ data }: { data: FilmDetails }) => {
    return (
        <div className="flex gap-1">
            <p data-id="original-language" data-title={data.original_language}>{data.original_language}</p>
        </div>
    )
}

const OriginCountry = ({ data }: { data: FilmDetails }) => {
    return (
        <div className="flex gap-1">
            <p data-id="origin-country" data-title={data.origin_country.map(origin_country => origin_country).join(', ')}>{data.origin_country.map(origin_country => origin_country).join(', ')}</p>
        </div>
    )
}

const ProductionCompanies = ({ data }: { data: FilmDetails }) => {
    return (
        <div className="flex gap-1">
            <p data-id="production-companies" data-title={data.production_companies.map(company => company.name).join(', ')}>{data.production_companies.map(company => company.name).join(', ')}</p>
        </div>
    )
}

const ReleaseStatus = ({ data }: { data: FilmDetails }) => {

    const getFilmStatus = (status: string) => {
        if (status === 'Released') return 'Released';
        if (status === 'Post Production') return 'Post Production';
        if (status === 'Production') return 'Production';
        if (status === 'Pre Production') return 'Pre Production';
        if (status === 'Rumored') return 'Rumored';
        if (status === 'In Production') return 'In Production';
        if (status === 'Post Production') return 'Post Production';
        if (status === 'Released') return 'Released';
        if (status === 'Rumored') return 'Rumored';
        return status;
    }

    if (data.status !== 'Released') {
        return (
            <p data-id="status" data-title={getFilmStatus(data.status)}>{getFilmStatus(data.status)}</p>
        )
    }

    return (
        <p data-id="release-date" data-title={data.release_date}>Released {new Date(data.release_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
    )
}

const Rating = ({ data }: { data: FilmDetails }) => {
    // TODO: Add a click-to-rate feature

    return (
        <div className="flex gap-1">
            <Star className="w-4 h-4 self-center hover:text-yellow-500" />
            <p data-id="rating" data-title={data.vote_average}>{data.vote_average.toFixed(1)}</p>
        </div>

    )
}

const Budget = ({ data }: { data: FilmDetails }) => {
    return (
        <div className="flex gap-1">
            <p data-id="budget" data-title={data.budget}>Budget: ${data.budget.toLocaleString()} <span className="text-xs text-foreground/90">USD</span></p>
        </div>
    )
}

const Revenue = ({ data }: { data: FilmDetails }) => {
    return (
        <div className="flex gap-1">
            <p data-id="revenue" data-title={data.revenue}>Revenue: ${data.revenue.toLocaleString()} <span className="text-xs text-foreground/90">USD</span></p>
        </div>
    )
}

const Votes = ({ data }: { data: FilmDetails }) => {
    return (
        <div className="flex gap-1">
            <p data-id="votes" data-title={data.vote_count}>{data.vote_count} <span className="text-xs text-foreground/90">votes</span></p>
        </div>
    )
}

const ViewMoreLink = ({ href, text, className }: { href: string, text: string, className?: string }) => {
    return (
        <div className="col-span-full gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 3xl:grid-cols-6">
            <div className="col-start-1 sm:-col-start-1 md:-col-start-2 mt-4 flex items-center gap-1 font-noto-sans-display font-stretch-ultra-condensed text-foreground/80 hover:text-foreground transition-all duration-300 uppercase">
                <ArrowUpRight className="w-fit h-fit" />
                <Link href={href} className="flex items-center gap-2">
                    {text}
                </Link>
            </div>
        </div>
    )
}

const FilmCard = ({ media, credits, variant, mediaType }: FilmCardProps) => {
    try {
        switch (variant) {
            case 'poster':
                return (
                    <article
                        className="group flex flex-col gap-2 p-4 aspect-[2/3] justify-end bg-cover bg-center relative transition-transform duration-300 border border-foreground/10 rounded-xs"
                    >
                        {media.poster_path && (
                            <Image
                                src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
                                alt={media.title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover rounded-xs"
                                priority
                                placeholder="blur"
                                blurDataURL={DEFAULT_BLUR_URL}
                            />
                        )}

                        {/* gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-xs group-hover:opacity-100 opacity-20 transition-opacity duration-300" />

                        <div className="flex items-baseline justify-between gap-2">
                            {/* title */}
                            <h3 className="text-2xl font-medium text-white z-10 opacity-10 group-hover:opacity-100 transition-opacity duration-300 text-pretty" data-testid="media-title">{media.title} <span className="text-xs text-foreground/90" data-testid="media-release-date">{media.release_date ? `(${media.release_date.split('-')[0]})` : ''}</span></h3>

                            {/* flag icon -- where it was made */}
                            <p className="text-sm text-white z-10 opacity-10 group-hover:opacity-100 transition-opacity duration-300" data-title={media.origin_country?.[0] || 'Unknown'} data-alt="country of origin" data-testid="media-origin-country">{media.origin_country?.[0] || 'Unknown'}</p>
                        </div>
                    </article>
                )
            case 'details':
                return (
                    <div className="flex flex-col gap-4">
                        <FluidColumn
                            id={`film-details-${media.id}`}
                            data-film-id={media.id}
                            data-film-title={media.title}
                        >
                            {/* Background image */}
                            <Image
                                src={`https://image.tmdb.org/t/p/w1280${media.backdrop_path}`}
                                alt={media.title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover"
                                priority
                                placeholder="blur"
                                blurDataURL={DEFAULT_BLUR_URL}
                            />

                            {/* Semi-transparent overlay */}
                            <div className="absolute inset-0 bg-background/50 backdrop-blur-xl" />

                            <div className="
                                col-span-full
                                col-start-1 lg:col-start-2
                                -col-end-1
                                p-0 m-0
                                lg:aspect-video
                                relative
                                flex flex-col"
                            >
                                {/* Content section */}
                                <div className="relative z-10 flex flex-col">
                                    {media.poster_path && <PosterOrBioPhoto film={media.poster_path} />}

                                    <HeroTitle title={media.title} />

                                    {/* <p data-id="tagline" data-title={filmData.tagline}>Tagline: {filmData.tagline}</p> */}

                                    {/* film metadata */}
                                    <div className="flex flex-col mb-4">
                                        <div className="flex gap-4 font-[500] font-noto-sans-display font-stretch-ultra-condensed uppercase items-center justify-start text-xl">
                                            <GenreList data={media} />
                                        </div>
                                        <div className="flex gap-4 font-[450] font-noto-sans-display font-stretch-ultra-condensed uppercase items-center justify-start">
                                            <Runtime data={media} />
                                            <SpokenLanguages data={media} />
                                            <AgeRating data={media} />
                                            <OriginCountry data={media} />
                                            <Rating data={media} />
                                        </div>
                                        <div className="flex gap-4 font-[550] font-noto-sans-display font-stretch-ultra-condensed uppercase items-center justify-start">
                                            {/* <ProductionCompanies data={filmData} /> */}
                                            {/* <OriginalLanguage data={filmData} /> */}
                                            {/* <ReleaseStatus data={filmData} /> */}
                                            {/* <Budget data={filmData} /> */}
                                            {/* <Revenue data={filmData} /> */}
                                            {/* <Votes data={filmData} /> */}
                                        </div>
                                    </div>

                                    {/* top-level crew details */}
                                    <div className="flex flex-wrap w-full max-w-[110ch]" data-testid="top-level-crew-details">
                                        {credits?.crew && (
                                            <>
                                                <CrewMember crew={credits.crew} creditTitle="Director" className="w-full pb-4" topLevel />
                                                {credits.crew.some((crew) =>
                                                    crew.job?.toLowerCase() === 'director of photography' ||
                                                    crew.jobs?.some(job => job.job.toLowerCase() === 'director of photography')
                                                ) && (
                                                        <CrewMember crew={credits.crew} creditTitle="Director of Photography" topLevel />
                                                    )}
                                                {credits.crew.some((crew) =>
                                                    crew.job?.toLowerCase() === 'executive producer' ||
                                                    crew.jobs?.some(job => job.job.toLowerCase() === 'executive producer')
                                                ) && (
                                                        <CrewMember crew={credits.crew} creditTitle="Executive Producer" topLevel />
                                                    )}
                                                {credits.crew.some((crew) =>
                                                    crew.job?.toLowerCase() === 'screenplay' ||
                                                    crew.jobs?.some(job => job.job.toLowerCase() === 'screenplay')
                                                ) && (
                                                        <CrewMember crew={credits.crew} creditTitle="Screenplay" topLevel />
                                                    )}
                                                {credits.crew.some((crew) =>
                                                    crew.job?.toLowerCase() === 'creator' ||
                                                    crew.jobs?.some(job => job.job.toLowerCase() === 'creator')
                                                ) && (
                                                        <CrewMember crew={credits.crew} creditTitle="Creator" topLevel />
                                                    )}
                                            </>
                                        )}
                                    </div>

                                    {/* overview */}
                                    <div className="my-12">
                                        <h2 className="font-noto-sans-display font-stretch-ultra-condensed text-foreground/80 font-semibold uppercase">Overview</h2>
                                        <p id="overview" className="text-xl md:text-3xl max-w-prose whitespace-pre-wrap">{media.overview}</p>
                                    </div>
                                </div>
                            </div>
                        </FluidColumn>

                        {/* TOP-LEVEL CAST DETAILS */}
                        <FluidColumn
                            id={`cast-details-${media.id}`}
                            data-film-id={media.id}
                            data-film-title={media.title}
                        >
                            <div className="
                                col-span-full
                                col-start-0 lg:col-start-1
                                col-end-1 lg:col-end-2
                                flex lg:justify-end items-baseline"
                            >
                                <CastAndCrewTitle title="Cast" />
                            </div>

                            <div className="
                                col-span-full
                                col-start-1 lg:col-start-2
                                -col-end-1
                                flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 3xl:grid-cols-6 gap-4 sm:gap-8"
                            >
                                {/* cast members - show first 12 cast members */}
                                {credits?.cast && credits.cast
                                    .filter((member, index, self) => {
                                        // For TV shows, only show named characters in the top cast
                                        if (mediaType === 'tv') {
                                            const firstRole = member.roles?.[0];
                                            // Only include if it's a named character (not "Self" or "Himself" etc.)
                                            const isNamedCharacter = firstRole?.character &&
                                                !firstRole.character.toLowerCase().includes('self') &&
                                                !firstRole.character.toLowerCase().includes('himself') &&
                                                !firstRole.character.toLowerCase().includes('herself');

                                            // Calculate 10% of total episodes
                                            const totalEpisodes = member.roles?.reduce((sum, role) => sum + role.episode_count, 0) || 0;
                                            const tvDetails = media as unknown as TVDetails;
                                            const tenPercentOfEpisodes = Math.ceil(tvDetails.number_of_episodes * 0.1);

                                            // Only include if this is the first occurrence of this actor and they've appeared in more than 10% of episodes
                                            return isNamedCharacter &&
                                                totalEpisodes >= tenPercentOfEpisodes &&
                                                index === self.findIndex((m) => m.id === member.id);
                                        }
                                        // For movies, just use the id
                                        return index === self.findIndex((m) => m.id === member.id);
                                    })
                                    .sort((a, b) => {
                                        // Sort by total episode count for TV shows
                                        if (mediaType === 'tv') {
                                            const aEpisodes = a.roles?.reduce((sum, role) => sum + role.episode_count, 0) || 0;
                                            const bEpisodes = b.roles?.reduce((sum, role) => sum + role.episode_count, 0) || 0;
                                            return bEpisodes - aEpisodes;
                                        }
                                        // For movies, sort by order
                                        return (a.order || 0) - (b.order || 0);
                                    })
                                    .slice(0, 8)
                                    .map((castMember) => {
                                        // For TV shows, use the first role's character name
                                        const character = mediaType === 'tv'
                                            ? castMember.roles?.[0]?.character || castMember.character
                                            : castMember.character;

                                        return (
                                            <CastMember
                                                key={`${castMember.id}-${castMember.credit_id}-${character}`}
                                                cast={credits.cast}
                                                creditTitle={character}
                                            />
                                        );
                                    })}
                                <ViewMoreLink href={`#full-cast`} text="View full cast" />
                            </div>
                        </FluidColumn>

                        {/* TOP-LEVEL CREW DETAILS */}
                        <FluidColumn
                            id={`crew-details-${media.id}`}
                            data-film-id={media.id}
                            data-film-title={media.title}
                        >
                            <div className="
                                col-span-full
                                col-start-0 lg:col-start-1
                                col-end-1 lg:col-end-2
                                flex lg:justify-end items-baseline"
                            >
                                <CastAndCrewTitle title="Crew" />
                            </div>

                            <div className="
                                col-span-full
                                col-start-0 lg:col-start-2
                                -col-end-1
                                flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 3xl:grid-cols-6 gap-4 sm:gap-8"
                            >
                                {credits?.crew && (
                                    <>
                                        <CrewMember crew={credits.crew} creditTitle="Director" className="w-full pb-4" topLevel />
                                        <CrewMember crew={credits.crew} creditTitle="Director of Photography" topLevel />
                                        <CrewMember crew={credits.crew} creditTitle="Executive Producer" topLevel />
                                        <CrewMember crew={credits.crew} creditTitle="Writer" topLevel />
                                        <CrewMember crew={credits.crew} creditTitle="Production Design" />
                                        <CrewMember crew={credits.crew} creditTitle="Art Direction" />
                                        <CrewMember crew={credits.crew} creditTitle="Producer" />
                                        <CrewMember crew={credits.crew} creditTitle="Costume Design" />
                                        <CrewMember crew={credits.crew} creditTitle="Screenplay" />
                                        <CrewMember crew={credits.crew} creditTitle="Novel" />
                                        <CrewMember crew={credits.crew} creditTitle="Assistant Editor" />
                                        <CrewMember crew={credits.crew} creditTitle="Casting" />
                                    </>
                                )}
                                <ViewMoreLink href={`#full-crew`} text="View full crew" />
                            </div>
                        </FluidColumn>

                        {/* Full cast section for both movies and TV shows */}
                        <FluidColumn
                            id={`full-cast`}
                            data-film-id={media.id}
                            data-film-title={media.title}
                        >
                            <div className="
                                col-span-full
                                col-start-0 lg:col-start-1
                                col-end-1 lg:col-end-2
                                flex lg:justify-end items-baseline"
                            >
                                <CastAndCrewTitle title="Full Cast" />
                            </div>

                            <div className="
                                col-span-full
                                col-start-1 lg:col-start-2
                                -col-end-1
                                flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 3xl:grid-cols-6 gap-4 sm:gap-8"
                            >
                                {credits.cast
                                    .filter((member: CastCredit, index: number, self: CastCredit[]) =>
                                        // Only include if this is the first occurrence of this actor
                                        index === self.findIndex((m: CastCredit) => m.id === member.id)
                                    )
                                    .sort((a: CastCredit, b: CastCredit) => {
                                        if (mediaType === 'tv') {
                                            const aEpisodes = a.roles?.reduce((sum, role) => sum + role.episode_count, 0) || 0;
                                            const bEpisodes = b.roles?.reduce((sum, role) => sum + role.episode_count, 0) || 0;
                                            return bEpisodes - aEpisodes;
                                        }
                                        // For movies, sort by order
                                        return (a.order || 0) - (b.order || 0);
                                    })
                                    .map((castMember: CastCredit) => {
                                        const character = mediaType === 'tv'
                                            ? castMember.roles?.[0]?.character || castMember.character
                                            : castMember.character;
                                        return (
                                            <CastMember
                                                key={`full-${castMember.id}-${castMember.credit_id}-${character}`}
                                                cast={credits.cast as CastCredit[]}
                                                creditTitle={character}
                                            />
                                        );
                                    })}
                            </div>
                        </FluidColumn>

                        {/* Full crew section */}
                        <FluidColumn
                            id={`full-crew`}
                            data-film-id={media.id}
                            data-film-title={media.title}
                        >
                            <div className="
                                col-span-full
                                col-start-0 lg:col-start-1
                                col-end-1 lg:col-end-2
                                flex lg:justify-end items-baseline"
                            >
                                <CastAndCrewTitle title="Full Crew" />
                            </div>

                            <div className="
                                col-span-full
                                col-start-0 lg:col-start-2
                                -col-end-1
                                flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 3xl:grid-cols-6 gap-4 sm:gap-8 "
                            >
                                {credits?.crew && (
                                    <>
                                        {/* Group crew by department */}
                                        {(() => {
                                            const groupedCrew = credits.crew.reduce((acc: { [key: string]: CrewCredit[] }, member: CrewCredit) => {
                                                const department = member.department || 'Other';
                                                if (!acc[department]) {
                                                    acc[department] = [];
                                                }
                                                acc[department].push(member);
                                                return acc;
                                            }, {});

                                            return Object.entries(groupedCrew)
                                                .sort(([a], [b]) => a.localeCompare(b))
                                                .map(([department, members]) => (
                                                    <React.Fragment key={department}>
                                                        <div className="col-span-full">
                                                            <h3 className="text-xl font-noto-sans-display font-stretch-ultra-condensed text-foreground/80 self-baseline font-semibold uppercase m-0 p-0 text-center sm:text-left w-full mt-8 sm:mt-0 mb-0 sm:mb-2">
                                                                {department}
                                                            </h3>
                                                        </div>
                                                        {(() => {
                                                            // Get unique jobs in this department
                                                            const uniqueJobs = Array.from(new Set(
                                                                (members as CrewCredit[]).map((member: CrewCredit) =>
                                                                    mediaType === 'tv'
                                                                        ? member.jobs?.map((job: { job: string }) => job.job) || []
                                                                        : [member.job]
                                                                ).flat()
                                                            )).sort();

                                                            return uniqueJobs.map((job: string) => (
                                                                <CrewMember
                                                                    key={job}
                                                                    crew={members as CrewCredit[]}
                                                                    creditTitle={job}
                                                                    className="w-full"
                                                                />
                                                            ));
                                                        })()}
                                                    </React.Fragment>
                                                ));
                                        })()}
                                    </>
                                )}
                            </div>
                        </FluidColumn>
                    </div>
                )
            default:
                return null;
        }
    } catch (error) {
        // TODO: Migrate the error display to a generic component
        console.error('Error fetching film details:', error);

        return (
            <div className="flex flex-col items-baseline justify-start gap-2 p-4 bg-destructive/20 text-destructive-foreground border border-destructive rounded-xs max-w-lg mx-auto">
                <p>Unfortunately, we had an issue loading your film.</p>
                <p className="text-xs uppercase">{error instanceof Error ? error.message : 'An unknown error occurred'}</p>
            </div>
        )
    }
}

export default FilmCard;

