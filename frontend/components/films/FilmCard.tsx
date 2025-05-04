// We are specifcally keeping this page as a server-side component for the time being, as it will maintain the request memoization from the `NewReleases` component.
// See the documentation for more information in-memory request caching:
// ! DOCS: https://nextjs.org/docs/app/building-your-application/data-fetching/fetching#server-components


import { getFilmCredits, getFilmDetails, options } from "@/lib/tmdb";
import { FilmDetails } from "@/types/movieDetails";
import { CastCredit, CrewCredit } from "@/types/peopleDetails";
import FluidColumn from "@/components/layout/column-wrapper";
import CrewMember from "./CrewMember";
import CastMember from "./CastMember";
import { Badge } from "../ui/badge";
import { Clock, Star, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import Link from "next/link";

type FilmCardProps = {
    film: string | number;
    variant: 'poster' | 'details' | string;
};

const FilmTitle = ({ title }: { title: string }) => {
    return (
        <h1
            className="font-noto-sans-display font-stretch-ultra-condensed uppercase text-6xl md:text-8xl lg:text-9xl font-light text-foreground  me-[1.5em] p-0 m-0 mb-8 lg:ms-[-1.5em]"
            data-title={title}
        >
            {title}
        </h1>
    )
}

const FilmPoster = ({ film }: { film: string }) => {
    return (
        <article
            className="aspect-[2/3] justify-end bg-cover bg-center relative p-0 m-0 my-10 w-full max-w-[300px] min-w-[100px] shadow-sm border border-foreground/10 rounded-md"
            style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w500${film})`
            }}
        >
        </article>)
}

const CastAndCrewTitle = ({ title, className }: { title: string, className?: string }) => {
    return (
        <div className={`flex gap-[.5em] items-baseline me-[1.125em] ${className}`}>
            <h2
                className={`text-2xl font-noto-sans-display font-stretch-ultra-condensed text-foreground/80 font-semibold uppercase self-baseline ${className}`}
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
            <p data-id="genres" data-title={data.genres.map(genre => genre.name).join(', ')}>{data.genres.map(genre => genre.name).join(', ')}</p>
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

const FilmCard = async ({ film: film, variant }: FilmCardProps) => {
    // Ensure film is a number
    const filmId = typeof film === 'string' ? parseInt(film, 10) : film;
    const credits = await getFilmCredits(filmId);

    if (!credits) {
        // TODO: Migrate the error display to a generic component
        // SEE ALSO /people/[id]/page.tsx and migrate that one as well

        return (
            <div className="flex items-center justify-center w-full h-full flex-1">
                <Card className="w-full h-full">
                    <CardHeader>
                        <CardTitle>
                            <h1 className="text-3xl font-noto-sans-display font-stretch-ultra-condensed text-foreground/80 uppercase">Film Not Found</h1>
                        </CardTitle>
                        <CardDescription>
                            <p className="text-foreground/60">No film found with ID: {filmId}</p>
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        )
    }

    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${filmId}?language=en-US`, options);

        // dump the response if we fail
        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            console.error('API Error:', {
                status: response.status,
                statusText: response.statusText,
                statusMessage: errorData?.status_message,
                error: errorData
            });
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // parse the response 
        const filmData: FilmDetails = await response.json();

        if (!filmData) {
            throw new Error('Invalid API response format');
        }

        // return detailed result in development only
        if (process.env.NODE_ENV === 'development') {
            console.info(`Fetched film:`, filmData);
        }

        switch (variant) {
            case 'poster':
                return (
                    <article
                        className="group flex flex-col gap-2 p-4 aspect-[2/3] justify-end bg-cover bg-center relative transition-transform duration-300"
                        style={{
                            backgroundImage: `url(https://image.tmdb.org/t/p/w500${filmData.poster_path})`
                        }}
                    >
                        {/* gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-xs group-hover:opacity-100 opacity-20 transition-opacity duration-300" />

                        <div className="flex items-baseline justify-between gap-2">
                            {/* title */}
                            <h3 className="text-2xl font-medium text-white z-10 opacity-10 group-hover:opacity-100 transition-opacity duration-300 text-pretty">{filmData.title}</h3>

                            {/* flag icon -- where it was made */}
                            <p className="text-sm text-white z-10 opacity-10 group-hover:opacity-100 transition-opacity duration-300" data-title={filmData.origin_country?.[0] || 'Unknown'} data-alt="country of origin">{filmData.origin_country?.[0] || 'Unknown'}</p>
                        </div>
                    </article>
                )
            case 'details':
                return (
                    <div className="flex flex-col gap-4">
                        <FluidColumn
                            id={`film-details-${filmId}`}
                            data-film-id={filmId}
                            data-film-title={filmData.title}
                            backgroundImage={`https://image.tmdb.org/t/p/w500${filmData.poster_path}`}
                        >
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
                                    {filmData.poster_path && <FilmPoster film={filmData.poster_path} />}

                                    <FilmTitle title={filmData.title} />

                                    {/* <p data-id="tagline" data-title={filmData.tagline}>Tagline: {filmData.tagline}</p> */}

                                    {/* film metadata */}
                                    <div className="flex flex-col mb-4">
                                        <div className="flex gap-4 font-[500] font-noto-sans-display font-stretch-ultra-condensed uppercase items-center justify-start text-xl">
                                            <GenreList data={filmData} />
                                        </div>
                                        <div className="flex gap-4 font-[450] font-noto-sans-display font-stretch-ultra-condensed uppercase items-center justify-start">
                                            <Runtime data={filmData} />
                                            <SpokenLanguages data={filmData} />
                                            <AgeRating data={filmData} />
                                            <OriginCountry data={filmData} />
                                            <Rating data={filmData} />
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
                                    <div className="flex flex-wrap w-full max-w-[110ch]">
                                        {credits?.crew && (
                                            <>
                                                <CrewMember crew={credits.crew} creditTitle="Director" className="w-full pb-4" topLevel />
                                                {credits.crew.some(crew => crew.job === 'Director of Photography') && (
                                                    <CrewMember crew={credits.crew} creditTitle="Director of Photography" topLevel />
                                                )}
                                                {credits.crew.some(crew => crew.job === 'Executive Producer') && (
                                                    <CrewMember crew={credits.crew} creditTitle="Executive Producer" topLevel />
                                                )}
                                                {credits.crew.some(crew => crew.job === 'Screenplay') && (
                                                    <CrewMember crew={credits.crew} creditTitle="Screenplay" topLevel />
                                                )}
                                            </>
                                        )}
                                    </div>

                                    {/* overview */}
                                    <div className="my-12">
                                        <label
                                            htmlFor="overview"
                                            className="font-noto-sans-display font-stretch-ultra-condensed text-foreground/80 font-semibold uppercase">Overview</label>
                                        <h2 id="overview" className="text-xl md:text-3xl max-w-prose">{filmData.overview}</h2>
                                    </div>
                                </div>
                            </div>
                        </FluidColumn>

                        {/* TOP-LEVEL CAST DETAILS */}
                        <FluidColumn
                            id={`cast-details-${filmId}`}
                            data-film-id={filmId}
                            data-film-title={filmData.title}
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
                                {credits?.cast && credits.cast.slice(0, 12).map((castMember: CastCredit) => (
                                    <CastMember
                                        key={castMember.id}
                                        cast={credits.cast}
                                        creditTitle={castMember.character}
                                    />
                                ))}
                                <ViewMoreLink href={`#full-cast`} text="View full cast" />
                            </div>
                        </FluidColumn>

                        {/* TOP-LEVEL CREW DETAILS */}
                        <FluidColumn
                            id={`crew-details-${filmId}`}
                            data-film-id={filmId}
                            data-film-title={filmData.title}
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
                                col-start-1 lg:col-start-2
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
                    </div>
                )
            default:
                return (
                    <article>
                        <h3>{filmData.title}</h3>
                    </article>
                )
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

