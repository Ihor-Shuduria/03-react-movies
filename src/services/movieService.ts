import axiosInstance from "./axiosInstance";
import type { AxiosResponse } from "axios";
import type { Movie } from "../types/movie";

interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const response: AxiosResponse<MoviesResponse> = await axiosInstance.get(
    "/search/movie",
    {
      params: {
        query,
        language: "uk-UA",
        page: 1,
        include_adult: false,
      },
    }
  );

  return response.data.results;
};
