import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../services/api";

const MovieDetail: React.FC<{ darkMode?: boolean }> = ({ darkMode }) => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<any>(null);

  useEffect(() => {
    const loadMovie = async () => {
      if (id) {
        const data = await fetchMovieDetails(Number(id));
        setMovie(data);
      }
    };
    loadMovie();
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  const trailer = movie.videos.results.find(
    (video: any) => video.type === "Trailer"
  );

  return (
    <div
      className={
        darkMode
          ? "bg-gray-900 text-white min-h-screen"
          : "bg-white text-black min-h-screen"
      }
    >
      <div className="p-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Movie Poster */}
          <div className="flex-shrink-0">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded-lg shadow-lg"
            />
          </div>

          {/* Movie Details */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold">{movie.title}</h1>
            <p className="text-gray-400 text-sm mt-1">
              {movie.release_date} | {movie.runtime} mins |{" "}
              {movie.genres.map((genre: any) => genre.name).join(", ")}
            </p>

            {/* User Score */}
            <div className="flex items-center mt-4">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-xl font-bold">
                {Math.round(movie.vote_average * 10)}%
              </div>
              <span className="ml-4 text-lg">User Score</span>
            </div>

            {/* Overview */}
            <h2 className="text-2xl font-semibold mt-6">Overview</h2>
            <p className="mt-2 text-gray-300">{movie.overview}</p>

            {/* Trailer */}
            {trailer && (
              <div className="mt-6">
                <h2 className="text-2xl font-semibold">Trailer</h2>
                <iframe
                  width="100%"
                  height="400"
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title="Trailer"
                  allowFullScreen
                  className="mt-4 rounded-lg shadow-lg"
                ></iframe>
              </div>
            )}
          </div>
        </div>

        {/* Cast Section */}
        {movie.credits && movie.credits.cast && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Series Cast</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {movie.credits.cast.slice(0, 8).map((cast: any) => (
                <div key={cast.id} className="text-center">
                  <img
                    src={`https://image.tmdb.org/t/p/w200${cast.profile_path}`}
                    alt={cast.name}
                    className="rounded-lg shadow-md"
                  />
                  <p className="mt-2 font-semibold">{cast.name}</p>
                  <p className="text-gray-400 text-sm">{cast.character}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
