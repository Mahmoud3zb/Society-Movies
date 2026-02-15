# Movie Web Site 🎬

A modern, responsive movie discovery web application built with React, Redux, and Vite. Browse popular movies, save favorites, and get in touch through the contact form.

![Movie Web Site Screenshot](public/screenshot.png)

## Features ✨

- 🎥 Browse popular and trending movies
- ❤️ Add/remove movies to/from favorites
- 🔍 Search functionality
- 📱 Fully responsive design
- ⚡ Fast and optimized performance

## Tech Stack 🛠️

- ⚛️ React 18
- 🎨 Tailwind CSS for styling
- 🔄 Redux Toolkit for state management
- ⚡ Vite for fast development and building
- 📱 React Icons for beautiful icons
- 🎬 The Movie Database (TMDB) API for movie data

## Getting Started 🚀

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- TMDB API key (get it from [TMDB](https://www.themoviedb.org/settings/api))

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/Mahmoud3zb/Movie-Web-Site.git
   cd Movie-Web-Site
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn
   ```

3. Create a `.env` file in the root directory and add your TMDB API key:

   ```
   VITE_TMDB_API_KEY=your_tmdb_api_key_here
   ```

4. Start the development server

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure 📁

```
src/
├── assets/           # Static assets
├── components/       # Reusable UI components
├── pages/            # Page components
├── store/            # Redux store and slices
│   ├── Slices/       # Redux slices
│   └── store.js      # Redux store configuration
└── App.jsx           # Main App component
```

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact 📬

Mahmoud Azab - [@Mahmoud3zb](https://github.com/Mahmoud3zb)

Project Link: [https://github.com/Mahmoud3zb/Movie-Web-Site](https://github.com/Mahmoud3zb/Movie-Web-Site)
