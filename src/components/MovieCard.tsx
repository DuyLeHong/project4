import React from "react";

interface MovieCardProps {
  title: string;
  posterPath: string;
  onClick: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  title,
  posterPath,
  onClick,
}) => {
  return (
    <div className="movie-card cursor-pointer" onClick={onClick}>
      <img
        src={`https://image.tmdb.org/t/p/w500${posterPath}`}
        alt={title}
        className="rounded-lg shadow-md"
      />
      <h3 className="text-center text-lg font-semibold mt-2">{title}</h3>
    </div>
  );
};

export default MovieCard;
