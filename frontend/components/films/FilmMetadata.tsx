"use client";

// VDR

// NOTE: THIS IS A PLACEHOLDER SCAFFOLD AT BEST
// TODO: Add metadata to the film

import { useEffect, useState } from "react";

// NOTE: The /movie/{movie_id} (movie details) API returns a JSON object with the following metadata for a given film:
// {
//   "adult": false,
//   "backdrop_path": "/oXs8kp1oX5N0Mte6U8UUAwmLwt6.jpg",
//   "belongs_to_collection": {
//     "id": 151,
//     "name": "Star Trek: The Original Series Collection",
//     "poster_path": "/vNrbrsHOpXS3whk9DLuBNcjJy1s.jpg",
//     "backdrop_path": "/qM8q2gWAeQF0XUpZ4XZc4CMX87a.jpg"
//   },
//   "budget": 12000000,
//   "genres": [
//     {
//       "id": 28,
//       "name": "Action"
//     },
//     {
//       "id": 12,
//       "name": "Adventure"
//     },
//     {
//       "id": 878,
//       "name": "Science Fiction"
//     },
//     {
//       "id": 53,
//       "name": "Thriller"
//     }
//   ],
//   "homepage": "https://www.paramountmovies.com/movies/star-trek-ii-the-wrath-of-khan",
//   "id": 154,
//   "imdb_id": "tt0084726",
//   "origin_country": [
//     "US"
//   ],
//   "original_language": "en",
//   "original_title": "Star Trek II: The Wrath of Khan",
//   "overview": "The starship Enterprise and its crew is pulled back into action when old nemesis, Khan, steals a top secret device called Project Genesis.",
//   "popularity": 3.7356,
//   "poster_path": "/uPyLsKl8Z0LOoxeaFXsY5MxhR5s.jpg",
//   "production_companies": [
//     {
//       "id": 4,
//       "logo_path": "/gz66EfNoYPqHTYI4q9UEN4CbHRc.png",
//       "name": "Paramount Pictures",
//       "origin_country": "US"
//     }
//   ],
//   "production_countries": [
//     {
//       "iso_3166_1": "US",
//       "name": "United States of America"
//     }
//   ],
//   "release_date": "1982-06-04",
//   "revenue": 96594943,
//   "runtime": 112,
//   "spoken_languages": [
//     {
//       "english_name": "English",
//       "iso_639_1": "en",
//       "name": "English"
//     }
//   ],
//   "status": "Released",
//   "tagline": "At the end of the universe lies the beginning of vengeance.",
//   "title": "Star Trek II: The Wrath of Khan",
//   "video": false,
//   "vote_average": 7.5,
//   "vote_count": 1960
//}

// REFERENCE: https://developer.themoviedb.org/reference/movie-details

export default function FilmMetadata({ id }: { id: number }) {
    // NOTE: Typically I would define a proper type for our metadata values here; 
    // but we're rolling fast-and-loose right now; types are commented
    // Consider this a TODO

    let placeholderMetadata =
    {
        "adult": false, // Boolean
        "backdrop_path": "", // URL partial,
        "belongs_to_collection": {
            "id": 0, // Int
            "name": "", // String
            "poster_path": "", // URL partial
            "backdrop_path": "" // URL partial
        },
        "budget": 0, // Int
        "genres": [
            {
                "id": 0, // Int
                "name": "Foo" // String
            },
            {
                "id": 1, // Int
                "name": "Bar" // String
            },
            {
                "id": 2, // Int
                "name": "Baz" // String
            },
        ],
        "homepage": "", // String, URL
        "id": 0, // Int
        "imdb_id": "tt2221420", // String
        "origin_country": [
            "US" // String
        ],
        "original_language": "en", // String, ISO 639-1
        "original_title": "Sallie Gardner at a Gallop", // String
        "overview": "The clip shows a jockey, Gilbert Domm, riding a horse, Sallie Gardner. The clip is not filmed; instead, it consists of 24 individual photographs shot in rapid succession, making a moving picture when using a zoopraxiscope.", // String
        "popularity": 0.0, // Float, scale TBD from API docs (TODO)
        "poster_path": "", // URL partial
        "production_companies": [
            {
                "id": 0, // Int
                "logo_path": "", // URL partial
                "name": "Leland Stanford", // String
                "origin_country": "US" // String
            }
        ],
        "production_countries": [
            {
                "iso_3166_1": "", // String
                "name": "" // String
            }
        ],
        "release_date": "1879-05-19", // String, ISO 8601
        "revenue": 0, // Int
        "runtime": 1, // Int
        "spoken_languages": [
            {
                "english_name": "English", // String
                "iso_639_1": "en", // String
                "name": "English" // String
            }
        ],
        "status": "Released", // String
        "tagline": "", // String
        "title": "The Horse in Motion", // String
        "video": false, // Boolean
        "vote_average": 0.0, // Float
        "vote_count": 0 // Int
    }

    // placeholderMetadata = {
    //     "adult": false,
    //     "backdrop_path": "/oXs8kp1oX5N0Mte6U8UUAwmLwt6.jpg",
    //     "belongs_to_collection": {
    //         "id": 151,
    //         "name": "Star Trek: The Original Series Collection",
    //         "poster_path": "/vNrbrsHOpXS3whk9DLuBNcjJy1s.jpg",
    //         "backdrop_path": "/qM8q2gWAeQF0XUpZ4XZc4CMX87a.jpg"
    //     },
    //     "budget": 12000000,
    //     "genres": [
    //         {
    //             "id": 28,
    //             "name": "Action"
    //         },
    //         {
    //             "id": 12,
    //             "name": "Adventure"
    //         },
    //         {
    //             "id": 878,
    //             "name": "Science Fiction"
    //         },
    //         {
    //             "id": 53,
    //             "name": "Thriller"
    //         }
    //     ],
    //     "homepage": "https://www.paramountmovies.com/movies/star-trek-ii-the-wrath-of-khan",
    //     "id": 154,
    //     "imdb_id": "tt0084726",
    //     "origin_country": [
    //         "US"
    //     ],
    //     "original_language": "en",
    //     "original_title": "Star Trek II: The Wrath of Khan",
    //     "overview": "The starship Enterprise and its crew is pulled back into action when old nemesis, Khan, steals a top secret device called Project Genesis.",
    //     "popularity": 3.7356,
    //     "poster_path": "/uPyLsKl8Z0LOoxeaFXsY5MxhR5s.jpg",
    //     "production_companies": [
    //         {
    //             "id": 4,
    //             "logo_path": "/gz66EfNoYPqHTYI4q9UEN4CbHRc.png",
    //             "name": "Paramount Pictures",
    //             "origin_country": "US"
    //         }
    //     ],
    //     "production_countries": [
    //         {
    //             "iso_3166_1": "US",
    //             "name": "United States of America"
    //         }
    //     ],
    //     "release_date": "1982-06-04",
    //     "revenue": 96594943,
    //     "runtime": 112,
    //     "spoken_languages": [
    //         {
    //             "english_name": "English",
    //             "iso_639_1": "en",
    //             "name": "English"
    //         }
    //     ],
    //     "status": "Released",
    //     "tagline": "At the end of the universe lies the beginning of vengeance.",
    //     "title": "Star Trek II: The Wrath of Khan",
    //     "video": false,
    //     "vote_average": 7.5,
    //     "vote_count": 1960
    // }

    const [metadata, setMetadata] = useState<any>(placeholderMetadata);

    useEffect(() => {
        const fetchMetadata = async () => {
            const response = await fetch(`/api/movie/${id}`);
            const data = await response.json();
            setMetadata(data);
        }
        fetchMetadata();
    }, [id]);

    if (!metadata) {
        // TODO: Add loading state, and use a skeleton loader for the metadata
        return (
            <div className="flex flex-col gap-2 w-full max-w-screen-sm bg-foreground p-4 rounded-lg text-background">
                <h3 className="text-lg font-medium">{metadata.title}</h3>
                <div className="grid grid-cols-[1fr_3fr] gap-2">
                    <h4 className="font-medium">Release Date</h4>
                    <p></p>
                    <h4 className="font-medium">Runtime</h4>
                    <p></p>
                    <h4 className="font-medium">Genre</h4>
                    <p></p>
                    <h4 className="font-medium">Rating</h4>
                    <p></p>
                    <h4 className="font-medium">Votes</h4>
                    <p></p>
                    <h4 className="font-medium">Budget</h4>
                    <p></p>
                </div>
            </div>
        )
    }


    return (
        <div className="flex flex-col gap-4 w-full max-w-screen bg-foreground p-4 rounded-xl text-background">
            <div className="grid grid-cols-[1fr_3fr] grid-auto-rows gap-2 mb-4">
                <div className="bg-gray-200 border border-gray-400 rounded p-2 m-1 ms-0 me-3 row-span-5 aspect-[2/3] flex items-center justify-center">
                    <p>Poster Image TBD</p>
                </div>
                <h3 className="text-5xl font-medium col-start-2 row-start-1">
                    {metadata.title}
                </h3>
                <p className="text-2xl font-normal italic text-muted-foreground col-start-2 row-start-2">
                    {metadata.original_title && `(${metadata.original_title})`}
                </p>
                <div className="col-start-2 max-w-[62ch] text-balance row-start-3">
                    <p className="font-light text-muted italic">{metadata.overview}</p>
                </div>
            </div>

            <div className="grid grid-cols-[1fr_3fr] gap-2">
                <h4 className="font-medium">Release Date</h4>
                <p>
                    {new Date(metadata.release_date).
                        toLocaleDateString("en-US",
                            {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                timeZone: "UTC"
                            })
                    }
                </p>
                <h4 className="font-medium">Runtime</h4>
                <p>{metadata.runtime}</p>
                <h4 className="font-medium">Genre</h4>
                <p>{metadata.genres.map((genre: any) => genre.name).join(", ")}</p>
                <h4 className="font-medium">Rating</h4>
                <p>{metadata.vote_average.toFixed(1)}</p>
                <h4 className="font-medium">Votes</h4>
                <p>{metadata.vote_count.toLocaleString()}</p>
                <h4 className="font-medium">Budget</h4>
                <p>{metadata.budget.
                    toLocaleString(
                        "en-US",
                        {
                            style: "currency",
                            currency: "USD",
                            maximumFractionDigits: 0
                        })}
                </p>
            </div>
            <div className="grid grid-cols-[1fr_3fr] gap-2">
                <h4 className="font-medium">Production Companies</h4>
                <p>{metadata.production_companies.map((company: any) => company.name).join(", ")}</p>
            </div>
        </div >
    )
}