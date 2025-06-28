const API_KEY = "48da79f9f8cd8d6018fcde5c7b825179";
const BASE_URL = "https://api.themoviedb.org/3";

const User_URL = "https://moviedetailapi.onrender.com";

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
  const url = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok)
      throw new Error(data.status_message || "Traedning Movies Loading Faild");

    return data.results.slice(0, 8);
  } catch (error) {
    console.error("error loading movies", error);
    return [];
  }
};

// Fetch movie details
export const fetchMovieDetails = async (
  movieId: string
): Promise<MovieDetails> => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
    );
    const data = await response.json();

    if (!response.ok)
      throw new Error(
        data.status_message || "Unable to fetch details of movie"
      );

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Fetch Movie trailers
export const fetchMovieTrailers = async (movieId: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`
    );
    const data = await response.json();

    if (!response.ok)
      throw new Error(
        data.status_message || "Unable to fetch details of movie"
      );

    return data.results;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const checkPassword = async (email: string, password: string) => {
  try {
    const response = await fetch(`${User_URL}/api/password/check`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const contentType = response.headers.get("Content-Type");

    // Safely try to parse JSON only if correct content type
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();

      if (response.ok) {
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.error || "Password check failed" };
      }
    } else {
      const text = await response.text(); // fallback to raw text
      console.warn("Non-JSON response:", text);

      return {
        success: false,
        message: "Unexpected response from server. Check backend or URL.",
      };
    }
  } catch (error: any) {
    console.error("Fetch error:", error);
    return { success: false, message: error.message };
  }
};


export const getUserByEmail = async (email: string) => {
  try {
    const response = await fetch(
      `${User_URL}/api/user?email=${encodeURIComponent(email)}`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch user");
    }

    return data;
  } catch (error) {
    console.error("Fetch user error:", error);
    throw error;
  }
};

export const addUser = async (user: any) => {
  try {
    const response = await fetch(`${User_URL}/api/user/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, message: data.message };
    } else {
      return { success: false, message: data.error || "User creation failed" };
    }
  } catch (error: any) {
    console.error("Error in adding user:", error);
    return { success: false, message: error.message || "Network error" };
  }
};

export const changePassword = async (email: string, password: string) => {
  try{
    const response = await fetch(`${User_URL}/api/password/change`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email, password}),
    })
    if(response.ok){
      return true
    }else{
      return false
    }
  }catch(error){
    console.log('error in changing password', error)
    return false;
  }
}