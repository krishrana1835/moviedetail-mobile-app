const API_KEY = "48da79f9f8cd8d6018fcde5c7b825179";
const BASE_URL = "https://api.themoviedb.org/3";

interface searchQuery {
  query: string;
}

// Fetch latest movies (now playing)
export const fetchLatestMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
    );
    const data = await response.json();

    if (!response.ok)
      throw new Error(data.status_message || "Failed to fetch latest movies");

    return data.results;
  } catch (error) {
    console.error("Error fetching latest movies:", error);
    return [];
  }
};

// Fetch popular movies
export const fetchPopularMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    );
    const data = await response.json();

    if (!response.ok)
      throw new Error(data.status_message || "Failed to fetch popular movies");

    return data.results;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
};

// Fetch movies by genre
const fetchMoviesByGenre = async (genreId: number) => {
  try {
    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&page=1&with_genres=${genreId}`
    );
    const data = await response.json();

    if (!response.ok)
      throw new Error(data.status_message || "Failed to fetch genre movies");

    return data.results;
  } catch (error) {
    console.error("Error fetching genre movies:", error);
    return [];
  }
};

// Genre-specific functions
export const fetchActionMovies = () => fetchMoviesByGenre(28);
export const fetchDramaMovies = () => fetchMoviesByGenre(18);
export const fetchRomanceMovies = () => fetchMoviesByGenre(10749);

// Search movies by text
export const searchMovies = async ({ query }: searchQuery) => {
  const url = query
    ? `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
        query
      )}&page=1&include_adult=false`
    : `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&page=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) throw new Error(data.status_message || "Search failed");

    return data.results;
  } catch (error) {
    console.error("Error searching movies:", error);
    return [];
  }
};

// Daily Trending
export const loadTrending = async () => {
  const url = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`

  try{
    const response = await fetch(url);
    const data = await response.json();

    if(!response.ok) throw new Error(data.status_message || "Traedning Movies Loading Faild")

    return data.results.slice(0,8);
  }catch(error){
    console.error("error loading movies", error)
    return [];
  }
}

// Fetch movie details
export const fetchMovieDetails = async (movieId: string) : Promise<MovieDetails> => {
  try{
    const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`)
    const data = await response.json()

    if(!response.ok) throw new Error(data.status_message || "Unable to fetch details of movie" )
    
      return data;
  }catch(error){
    console.log(error)
    throw error;
  }
}

// Fetch Movie trailers
export const fetchMovieTrailers = async (movieId: string) => {
  try{
    const response = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`)
    const data = await response.json()

    if(!response.ok) throw new Error(data.status_message || "Unable to fetch details of movie" )
    
      return data.results;
  }catch(error){
    console.log(error)
    throw error;
  }
}