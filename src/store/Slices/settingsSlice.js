
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return savedTheme || (prefersDark ? 'dark' : 'light');
  }
  return 'light';
};

export const initializeSettings = createAsyncThunk(
  "settings/initialize",
  async () => {
    return {
      theme: getInitialTheme(),
      language: localStorage.getItem("language") || "en"
    };
  }
);

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    theme: "light",
    language: "en",
    loading: false,
    error: null,
  },
  reducers: {
    toggleTheme: (state) => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      state.theme = newTheme;
      if (typeof window !== 'undefined') {
        localStorage.setItem("theme", newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
      }
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem("language", action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeSettings.pending, (state) => {
        state.loading = true;
      })
      .addCase(initializeSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.theme = action.payload.theme;
        state.language = action.payload.language;
        if (typeof window !== 'undefined') {
          document.documentElement.setAttribute("data-theme", action.payload.theme);
        }
      })
      .addCase(initializeSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { toggleTheme, setLanguage } = settingsSlice.actions;
export default settingsSlice.reducer;