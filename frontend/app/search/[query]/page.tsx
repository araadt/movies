// Server Component
import { searchMovies, searchTV } from "@/lib/tmdb";
import SearchResults from "@/components/search/SearchResults";

interface SearchPageProps {
    params: Promise<{ query: string }>;
    searchParams: Promise<{ page?: string; sort?: string; type?: string }>;
}

export default async function SearchPage({ params, searchParams }: SearchPageProps) {
    // Await both params and searchParams
    const { query } = await params;
    const { page: pageStr, sort, type } = await searchParams;

    const decodedQuery = decodeURIComponent(query);
    const page = parseInt(pageStr || '1', 10);
    const sortBy = sort || 'popularity';
    const mediaType = type || 'all';

    // Fetch results on the server
    const [moviesResult, tvResult] = await Promise.all([
        searchMovies(decodedQuery, page),
        searchTV(decodedQuery, page)
    ]);

    if (moviesResult.error || tvResult.error) {
        throw new Error(moviesResult.error || tvResult.error || 'Unknown error occurred');
    }

    const movies = moviesResult.data?.results || [];
    const tv = tvResult.data?.results || [];

    return (
        <SearchResults
            query={decodedQuery}
            initialMovies={movies}
            initialTV={tv}
            page={page}
            sortBy={sortBy}
            mediaType={mediaType}
        />
    );
}