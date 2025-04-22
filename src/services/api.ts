import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY; // Replace with your TMDB API key
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async (
  genreId?: number,
  query?: string,
  page: number = 1
) => {
  const endpoint = query
    ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
    : `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${
        genreId || ""
      }&page=${page}`;
  const response = await axios.get(endpoint);
  return response.data;
};

export const fetchMovieDetails = async (movieId: number) => {
  const endpoint = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos,credits`;
  const response = await axios.get(endpoint);
  return response.data;
};

export const fetchGenres = async () => {
  const endpoint = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`;
  const response = await axios.get(endpoint);
  return response.data.genres;
};
