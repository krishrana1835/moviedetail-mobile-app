const API_KEY = "48da79f9f8cd8d6018fcde5c7b825179";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchPopularMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    );
    const data = await response.json();

    if (!response.ok)
      throw new Error(data.status_message || "Failed to fetch movies");

    return data.results; // Array of popular movies
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
};

export const searchMovies = async ({ query }: any) => {
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
