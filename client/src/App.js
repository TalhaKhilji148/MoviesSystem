import Footer from "./screens/MoviePortal/footer/Footer.jsx";
import Hero from "./screens/MoviePortal/hero/Hero.jsx";

import { useSelector } from "react-redux";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
import Login from "./screens/MoviePortal/Login/Login.js";
import SignUp from "./screens/MoviePortal/SignUp/SignUp.js";
import Movie from "./screens/MoviePortal/Movie/Movie.jsx";
import ScrollToTop from "./screens/MoviePortal/ScrollToTop/ScrollToTop.jsx";
import MovieDetailsPage from "./screens/MoviePortal/movie-details/MovieDetailsPage.jsx";
import ListMovie from "./screens/MoviePortal/ListMovie/ListMovie.jsx";
import MyMovies from "./screens/MoviePortal/MyMovies.jsx";
import Profile from "./screens/MoviePortal/Profile.jsx";
import MovieSearch from "./screens/MoviePortal/MovieSearch/MovieSearch.jsx";
import ErrorPage from "./screens/MoviePortal/ErrorPage.jsx";
import HeaderMovie from "./screens/MoviePortal/HeaderMovie/HeaderMovie.jsx";
function App() {
  const { user } = useSelector((state) => state.auth);
  const url = useLocation().pathname;

  useEffect(() => {
    url && window.scrollTo(0, 0);
  }, [url]);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <ScrollToTop />

              <HeaderMovie />
              <Hero />

              <Movie />

              <Footer />
            </>
          }
        />
        <Route
          path="*"
          element={
            <>
              <ErrorPage />
            </>
          }
        />
        <Route
          path="/moviehome"
          element={
            <>
              <ScrollToTop />

              <HeaderMovie />
              <Hero />

              <Movie />

              <Footer />
            </>
          }
        />
        <Route
          path="/moviesearch/:id"
          element={
            user ? (
              <>
                <ScrollToTop />

                <HeaderMovie />

                <MovieSearch />

                <Footer />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/listmovie"
          element={
            user ? (
              <>
                <HeaderMovie />
                <ListMovie />

                <Footer />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/movie/:id"
          element={
            <>
              <HeaderMovie />
              <MovieDetailsPage />
              <Footer />
            </>
          }
        />

        <Route
          path="/mymovies/:id"
          element={
            user ? (
              <>
                <HeaderMovie />
                <MyMovies />
                <Footer />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/moviehome" />}
        />
        <Route
          path="/signup"
          element={!user ? <SignUp /> : <Navigate to="/moviehome" />}
        />

        <Route
          path="/profile"
          element={
            user ? (
              <>
                <HeaderMovie />
                <Profile />
                <Footer />
              </>
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
