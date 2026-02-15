
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { initializeSettings } from "./Slices/settingsSlice";
import { loadFavorites } from "./Slices/favoriteSlice";
import settingsReducer from "./Slices/settingsSlice";
import favoriteReducer from "./Slices/favoriteSlice";
import movieReducer from "./Slices/movieSlice";

const rootReducer = combineReducers({
  settings: settingsReducer,
  favorites: favoriteReducer,
  movies: movieReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: import.meta.env.MODE !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});


store.dispatch(initializeSettings());
store.dispatch(loadFavorites());

export default store;
