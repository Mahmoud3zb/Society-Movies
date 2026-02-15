import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa";

function MovieCard({ movie }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
    setIsFavorite(favorites.some((fav) => fav.id === movie.id));
  }, [movie.id]);

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const favorites = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = favorites.filter((fav) => fav.id !== movie.id);
    } else {
      updatedFavorites = [...favorites, movie];
    }

    localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "";

  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

  return (
    <div className="movie-card relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-102 bg-gray-800">
      {/* Movie Poster with Link */}
      <div className="relative group cursor-pointer overflow-hidden aspect-[2/3] bg-gray-700">
        <Link
          to={`/movies/${movie.id}`}
          className="block w-full h-full"
          aria-label={`View details for ${movie.title}`}
        >
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                : "https://via.placeholder.com/500x750?text=No+Image"
            }
            alt={movie.title}
            className="w-full h-full object-cover transition-all duration-300 hover:opacity-90"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/500x750?text=No+Image";
            }}
          />
        </Link>

        {/* Favorite Button */}
        <button
          onClick={toggleFavorite}
          className="absolute top-2 left-2 bg-black bg-opacity-70 p-2 rounded-full z-10 group-hover:opacity-100 transition-opacity duration-200"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? (
            <FaHeart className="text-red-500 text-xl" />
          ) : (
            <FaRegHeart className="text-white text-xl hover:text-red-500 transition-colors" />
          )}
        </button>

        {/* Rating Badge */}
        <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-yellow-400 px-2 py-1 rounded-full text-sm font-semibold flex items-center">
          <FaStar className="mr-1" /> {rating}
        </div>
      </div>

      {/* Movie Info */}
      <div className="p-4">
        <h3
          className="text-white font-semibold text-lg mb-1 truncate"
          title={movie.title}
        >
          {movie.title}
        </h3>
        <div className="flex justify-between items-center text-gray-400 text-sm">
          <span>{releaseYear}</span>
          <span className="px-2 py-1 bg-gray-700 rounded-md text-xs">
            {movie.original_language?.toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;