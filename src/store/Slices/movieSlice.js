
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = '1d6fc6f436488fb9cad1ee6440edd309'; 

export const fetchMovies = createAsyncThunk(
  'movies/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json();
      return data.results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchMovieDetails = createAsyncThunk(
  'movies/fetchDetails',
  async (movieId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_URL}/movie/${movieId}?api_key=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch movie details');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    items: [],
    currentMovie: null,
    searchQuery: '',
    loading: false,
    error: null
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    clearCurrentMovie: (state) => {
      state.currentMovie = null;
    }
  },
  extraReducers: (builder) => {
    
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      .addCase(fetchMovieDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentMovie = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setSearchQuery, clearCurrentMovie } = movieSlice.actions;
export default movieSlice;