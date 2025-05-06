import React, { useEffect, useState } from "react";
import { fetchMovies, fetchGenres } from "../services/api";
import MovieCard from "../components/MovieCard";
import FilterDropdown from "../components/FilterDropdown";
import { useNavigate } from "react-router-dom";

const MovieList: React.FC<{ darkMode?: boolean }> = ({ darkMode }) => {
  const [movies, setMovies] = useState<any[]>([]);
  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | undefined>();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const data = await fetchGenres();
        setGenres(data);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    loadGenres();
  }, []);

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true); // Start loading
      try {
        const data = await fetchMovies(selectedGenre, searchQuery, currentPage);
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, [selectedGenre, searchQuery, currentPage]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (direction: "prev" | "next") => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else if (direction === "next" && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div
      className={
        darkMode
          ? "bg-gray-900 text-white min-h-screen px-4 py-6"
          : "bg-white text-black min-h-screen px-4 py-6"
      }
    >
      <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchQuery}
          onChange={handleSearch}
          className="p-3 border rounded-md w-full md:w-1/2 shadow-sm"
          style={{
            color: darkMode ? "#fff" : "#000",
            background: darkMode ? "#1a202c" : "#fff",
          }}
        />
        <FilterDropdown genres={genres} onSelectGenre={setSelectedGenre} />
      </div>

      {loading ? (
        <div className="flex justify-center items-center mt-16">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-4">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                darkMode={darkMode}
                onClick={() => navigate(`/movie/${movie.id}`)}
              />
            ))}
          </div>

          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              onClick={() => handlePageChange("prev")}
              disabled={currentPage === 1 || loading}
              className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            <span className={darkMode ? "text-white" : "text-black"}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange("next")}
              disabled={currentPage === totalPages || loading}
              className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieList;
