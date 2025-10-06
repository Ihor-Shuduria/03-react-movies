import { useState } from "react";
import css from "./App.module.css";
import { fetchMovies } from "../../services/movieService";
import SearchBar from "../SearchBar/SearchBar";
import toast, { Toaster } from "react-hot-toast";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import type { Movie } from "../../types/movie";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    setMovies([]);
    setError(false);
    setLoading(true);
    try {
      const data = await fetchMovies(query);
      if (data.length === 0) {
        setError(true);
        toast.error("No movies found for your request.");
      }
      setMovies(data);
    } catch (error) {
      setError(true);
      toast.error("Something went wrong. Try again later.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchAction = async (FormData: FormData) => {
    const rawQuery = FormData.get("query");
    const query = rawQuery?.toString().trim();
    if (!query) {
      toast.error("Please enter your search query.");
      return;
    }
    await handleSearch(query);
  };

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };
  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className={css.app}>
      <Toaster position="top-center" />
      <SearchBar action={handleSearchAction} />

      {loading && <Loader />}
      {error && <ErrorMessage />}
      {!loading && !error && (
        <MovieGrid movies={movies} onSelect={handleSelectMovie} />
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  );
}
