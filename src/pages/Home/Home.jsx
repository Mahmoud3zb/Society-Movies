import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlay, FaInfoCircle, FaStar, FaChevronRight } from 'react-icons/fa';
import './Home.css';

function Home() {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featured, setFeatured] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Fetch trending movies
        const trendingRes = await fetch(
          'https://api.themoviedb.org/3/trending/movie/day?api_key=1d6fc6f436488fb9cad1ee6440edd309'
        );
        const trendingData = await trendingRes.json();
        setTrending(trendingData.results.slice(0, 14));
        
        // Set a random featured movie from trending
        if (trendingData.results.length > 0) {
          const randomIndex = Math.floor(Math.random() * trendingData.results.length);
          setFeatured(trendingData.results[randomIndex]);
        }

        // Fetch popular movies
        const popularRes = await fetch(
          'https://api.themoviedb.org/3/movie/popular?api_key=1d6fc6f436488fb9cad1ee6440edd309&language=en-US&page=1'
        );
        const popularData = await popularRes.json();
        setPopular(popularData.results.slice(0, 14));
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  };

  return (
    <div className="bg-gradient-to-r from-black to-gray-900 home">
      {/* Hero Section with Featured Movie */}
      <div className="hero" style={{
        backgroundImage: `url(${featured ? `https://image.tmdb.org/t/p/original${featured.backdrop_path}` : ''})`,
      }}>
        <div className="hero-content">
          <h1>{featured?.title}</h1>
          <p className="overview">{truncate(featured?.overview, 200)}</p>
          <div className="hero-buttons">
            <Link to={`/movies/${featured?.id}`} className="play-button">
              <FaPlay /> Play
            </Link>
            <button className="info-button">
              <FaInfoCircle /> More Info
            </button>
          </div>
        </div>
        <div className="hero-fadeBottom"></div>
      </div>

      {/* Trending Now Section */}
      <div className="movies-section">
        <div className="section-header">
          <h2>Trending Now</h2>
          <Link to="/movies" className="see-all">
            See All <FaChevronRight />
          </Link>
        </div>
        <div className="movies-row">
          {trending.map((movie) => (
            <Link to={`/movies/${movie.id}`} key={movie.id} className="movie-card">
              <div className="movie-poster">
                <img 
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} 
                  alt={movie.title} 
                />
                <div className="movie-rating">
                  <FaStar className="star-icon" />
                  {movie.vote_average.toFixed(1)}
                </div>
              </div>
              <h3 className="movie-title">{movie.title}</h3>
              <p className="movie-year">
                {new Date(movie.release_date).getFullYear()}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Movies Section */}
      <div className="movies-section">
        <div className="section-header">
          <h2>Popular</h2>
          <Link to="/movies" className="see-all">
            See All <FaChevronRight />
          </Link>
        </div>
        <div className="movies-row">
          {popular.map((movie) => (
            <Link to={`/movies/${movie.id}`} key={movie.id} className="movie-card">
              <div className="movie-poster">
                <img 
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} 
                  alt={movie.title} 
                />
                <div className="movie-rating">
                  <FaStar className="star-icon" />
                  {movie.vote_average.toFixed(1)}
                </div>
              </div>
              <h3 className="movie-title">{movie.title}</h3>
              <p className="movie-year">
                {new Date(movie.release_date).getFullYear()}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;