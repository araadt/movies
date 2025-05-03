// VDR

// ENV REQUIREMENTS:
// - TMDB_API_KEY

// TMDB BASIC GET REQUEST OPTIONS
export const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`
    }
};

