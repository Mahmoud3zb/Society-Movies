import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaPlay, FaArrowLeft, FaCalendarAlt, FaClock, FaLanguage, FaMoneyBillWave, FaChartLine } from 'react-icons/fa';
import './MovieDetails.css';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setLoading(true);
        
        // Fetch movie details
        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=1d6fc6f436488fb9cad1ee6440edd309&language=en-US&append_to_response=credits,similar`
        );
        const movieData = await movieResponse.json();
        
        setMovie(movieData);
        
        // Extract top 10 cast members
        if (movieData.credits?.cast) {
          setCast(movieData.credits.cast.slice(0, 10));
        }
        
        // Get similar movies
        if (movieData.similar?.results) {
          setSimilarMovies(movieData.similar.results.slice(0, 6));
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie data:', error);
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600"></div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Movie not found</h2>
        <Link 
          to="/" 
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  // Format runtime to hours and minutes
  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  // Format currency
  const formatCurrency = (number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(number);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Backdrop Image */}
      <div 
        className="h-96 bg-cover bg-center relative"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full flex items-end pb-12">
          <div className="max-w-3xl">
            <Link 
              to="/movies" 
              className="inline-flex items-center text-gray-300 hover:text-white mb-6 transition-colors duration-200"
            >
              <FaArrowLeft className="mr-2" />
              Back to Movies
            </Link>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {movie.title} 
              <span className="text-gray-400 ml-2">({new Date(movie.release_date).getFullYear()})</span>
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
              <div className="flex items-center bg-red-600 px-3 py-1 rounded-full">
                <FaStar className="mr-1" />
                <span>{movie.vote_average.toFixed(1)}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <FaCalendarAlt className="mr-1" />
                <span>{new Date(movie.release_date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <FaClock className="mr-1" />
                <span>{formatRuntime(movie.runtime)}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <FaLanguage className="mr-1" />
                <span>{movie.original_language.toUpperCase()}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 mt-4">
              {movie.genres.map(genre => (
                <span 
                  key={genre.id} 
                  className="px-3 py-1 bg-gray-800 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Poster and Stats */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-auto"
              />
              
              <div className="p-4">
                <a
                  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title + ' trailer')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center transition-colors duration-200 mb-4"
                >
                  <FaPlay className="mr-2" /> Watch Trailer
                </a>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Status</span>
                    <span className="font-medium">{movie.status}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Budget</span>
                    <span className="font-medium">{formatCurrency(movie.budget)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Revenue</span>
                    <span className="font-medium">{formatCurrency(movie.revenue)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Details */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
            </div>
            
            {/* Cast Section */}
            {cast.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Top Cast</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {cast.map(person => (
                    <div key={person.id} className="text-center">
                      <div className="w-full aspect-square rounded-full overflow-hidden mb-2 mx-auto">
                        <img
                          src={
                            person.profile_path
                              ? `https://image.tmdb.org/t/p/w200${person.profile_path}`
                              : 'https://via.placeholder.com/200x200?text=No+Image'
                          }
                          alt={person.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h4 className="font-semibold">{person.name}</h4>
                      <p className="text-sm text-gray-400">{person.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Similar Movies */}
            {similarMovies.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Similar Movies</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                  {similarMovies.map(movie => (
                    <Link 
                      to={`/movies/${movie.id}`} 
                      key={movie.id}
                      className="group"
                    >
                      <div className="aspect-[2/3] rounded-lg overflow-hidden mb-2">
                        <img
                          src={
                            movie.poster_path
                              ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                              : 'https://via.placeholder.com/300x450?text=No+Poster'
                          }
                          alt={movie.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h4 className="font-semibold text-sm truncate">{movie.title}</h4>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;