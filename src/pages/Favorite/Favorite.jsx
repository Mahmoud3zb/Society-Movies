import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaTrash } from 'react-icons/fa';
import MovieCard from '../../component/MovieCard/MovieCard';
import './Favorite.css';

function Favorite() {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load favorite movies from localStorage on component mount
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    setFavoriteMovies(favorites);
    setLoading(false);
  }, []);

  // Function to remove a movie from favorites
  const removeFromFavorites = (movieId) => {
    const updatedFavorites = favoriteMovies.filter(movie => movie.id !== movieId);
    setFavoriteMovies(updatedFavorites);
    localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-black to-gray-900 favorite-page min-h-screen pt-24 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 md:mb-0">
            My Favorite Movies
            <span className="text-red-500 ml-2">
              <FaHeart className="inline-block" />
            </span>
          </h1>
          
          <div className="flex items-center text-gray-400">
            <span className="mr-2">{favoriteMovies.length} movies</span>
            <FaHeart className="text-red-500" />
          </div>
        </div>

        {/* Favorite Movies Grid */}
        {favoriteMovies.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-gray-400 text-6xl mb-4">
              <FaRegHeart className="mx-auto" />
            </div>
            <h2 className="text-2xl text-white font-semibold mb-2">No Favorite Movies Yet</h2>
            <p className="text-gray-400 mb-6">Browse movies and add your favorites to see them here!</p>
            <Link 
              to="/movies" 
              className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors duration-200"
            >
              Browse Movies
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {favoriteMovies.map((movie) => (
                <div key={movie.id} className="relative group">
                  <MovieCard movie={movie} />
                  <button
                    onClick={() => removeFromFavorites(movie.id)}
                    className="absolute top-2 left-2 bg-black bg-opacity-70 text-red-500 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                    title="Remove from favorites"
                  >
                    <FaTrash className="text-lg" />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Favorite;