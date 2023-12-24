import React, { useEffect, useState } from "react";
import SingleMovie from "../Movie/SingleMovie";
import { request } from "../../../util/fetchAPI";
import { useParams } from "react-router-dom";

const MovieSearch = () => {
  const [movieData, setMovieData] = useState([]);
  const { id } = useParams();
  console.log("Movie name", id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await request("/movies/getAllMovies", "GET");
        console.log("Data>>>> ", data);

        // Filter movies based on the id (case-insensitive)
        const filteredMovies = data.filter(
          (movie) => movie.title.toLowerCase() === id.toLowerCase()
        );
        setMovieData(filteredMovies);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]); // Make sure to include 'id' as a dependency to fetch data when the id changes

  return (
    <section  className="bg-primary/5 mt-[1%] py-16 md:py-20 lg:pt-4">
      <div className="ml-20 container">
        <h3 className="text-black text-3xl text-center my-2 font-bold mb-20">
          Searched Movie
        </h3>
        {movieData.length > 0 ? (
          <div className="ml-[10%] grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-3">
            {movieData.map((movie) => (
              <div key={movie._id} className="w-full">
                <SingleMovie movie={movie} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-red-500 text-xl text-center">
            No movies found for "{id}".
          </div>
        )}
      </div>
    </section>
  );
};

export default MovieSearch;
