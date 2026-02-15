import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaFilter } from 'react-icons/fa';
import MovieCard from '../../component/MovieCard/MovieCard';
import './Movie.css';

function Movie() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('popular');
  const [page, setPage] = useState(1);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      let url = '';
      
      if (searchTerm) {
        url = `https://api.themoviedb.org/3/search/movie?api_key=1d6fc6f436488fb9cad1ee6440edd309&query=${searchTerm}&page=${page}`;
      } else {
        url = `https://api.themoviedb.org/3/movie/${filter}?api_key=1d6fc6f436488fb9cad1ee6440edd309&page=${page}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      
      if (page > 1) {
        setMovies(prev => [...prev, ...data.results]);
      } else {
        setMovies(data.results);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [filter, page, searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchMovies();
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <div className="bg-gradient-to-r from-black to-gray-900 movie-page bg-gray-900 min-h-screen pt-20 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4 md:mb-0">
            {searchTerm ? 'Search Results' : filter === 'popular' ? 'Popular Movies' : 'Top Rated Movies'}
          </h1>
          
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <form onSubmit={handleSearch} className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </form>
            
            <div className="relative w-full md:w-48">
              <select
                value={filter}
                onChange={(e) => {
                  setFilter(e.target.value);
                  setPage(1);
                }}
                className="w-full px-4 py-2 pr-10 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none"
              >
                <option value="popular">Popular</option>
                <option value="top_rated">Top Rated</option>
                <option value="now_playing">Now Playing</option>
                <option value="upcoming">Upcoming</option>
              </select>
              <FaFilter className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Movie Grid */}
        {loading && movies.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
            
            {movies.length > 0 && (
              <div className="mt-10 text-center">
                <button
                  onClick={loadMore}
                  disabled={loading}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors duration-200 disabled:opacity-50"
                >
                  {loading ? 'Loading...' : 'Load More'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Movie;