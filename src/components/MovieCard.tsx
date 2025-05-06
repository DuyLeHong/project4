import React from "react";

interface MovieCardProps {
  movie: any;
  darkMode?: boolean;
  onClick?: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, darkMode, onClick }) => {
  return (
    <div
      className={`rounded-2xl shadow-xl p-4 flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer
        ${darkMode ? "bg-gray-800" : "bg-white"}
      `}
      onClick={onClick}
    >
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/300x450?text=No+Image"
        }
        alt={movie.title}
        className="rounded-xl w-full h-72 object-cover mb-4 shadow-md transition-all duration-300 hover:brightness-90"
      />
      <div className="w-full flex flex-col flex-1">
        <h3
          className={`font-bold text-lg mb-1 text-center truncate ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {movie.title}
        </h3>
        <p
          className={`text-xs text-center line-clamp-3 mb-2 ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {movie.overview || "No description available."}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
