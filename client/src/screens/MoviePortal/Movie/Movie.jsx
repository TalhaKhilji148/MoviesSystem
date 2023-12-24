import React, { useEffect, useState } from "react";
import SingleMovie from "./SingleMovie";
import { Link } from "react-router-dom";
import { request } from "../../../util/fetchAPI";

const Movie = () => {
  const [allMovies, setAllMovies] = useState([]);
  const [moviesWithRank, setMoviesWithRank] = useState([]);

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const data = await request("/movies/getAllMovies", "GET");
        setAllMovies(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchMoviesWithRank = async () => {
      try {
        const data = await request("/movies/moviewithrank", "GET");
        setMoviesWithRank(data);
        console.log("Movies with rank", data)
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllMovies();
    fetchMoviesWithRank();
  }, []);

  return (
    <section className="bg-primary/5 mt-[250px]  md:py-20 lg:pt-1">
      <div className="container mx-auto">
        <h3 className="text-black text-3xl text-center my-2 font-bold mb-20">
          All Movies
        </h3>
        <div className="grid grid-cols-1 gap-x-1 gap-y-4 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-3">
          {allMovies.map((movie) => (
            <div key={movie._id} className="w-full">
              <Link to={`/movies/${movie._id}`}>
                <SingleMovie movie={movie} />
              </Link>
            </div>
          ))}
        </div>
        <h3 className="text-black text-3xl text-center my-2 mt-20 font-bold mb-20">
          Popular Movies
        </h3>
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-3">
          {moviesWithRank.map((movie) => (
            <div key={movie._id} className="w-full">
              <Link to={`/movies/${movie._id}`}>
                <SingleMovie movie={movie} />
              </Link>
              <p className="text-yellow-500 text-lg mt-1 ">
                Total Reviews:{" "}
                <span className="text-black font-bold">
                  {movie.reviewCount}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Movie;
