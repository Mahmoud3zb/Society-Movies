import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./component/ErrorPage/ErrorPage";
import Layout from "./component/Layout/Layout";
import ContactMe from "./pages/ContactMe/ContactMe";
import Favorite from "./pages/Favorite/Favorite";
import Home from "./pages/Home/Home";
import Movie from "./pages/Movie/Movie";
import MovieDetails from "./pages/MovieDetails/MovieDetails";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Home />,
          index: true,
        },
        {
          path: "/movies",
          element: <Movie />,
        },
        {
          path: "/movies/:id",
          element: <MovieDetails />,
        },
        {
          path: "/contact",
          element: <ContactMe />,
        },
        {
          path: "/favorite",
          element: <Favorite />,
        },
      ],
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ],
  // {
  //   basename: "/Movie-Web-Site",
  // },
);

export default router;
