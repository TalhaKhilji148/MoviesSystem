import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import classes from "./hero.module.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { gsap } from "gsap";

const Hero = () => {
  const [search, setSearch] = useState("rental");
  const navigate = useNavigate();
  const carouselImages = [
    "https://media.istockphoto.com/id/1093915698/photo/rows-of-red-seats-in-a-theater.jpg?s=170667a&w=0&k=20&c=_xSsykjSRPPWoliFBmcyTxGOorPOCUCdtGCSh2QgpnE=",
    "https://wallpapercave.com/wp/wp5223134.jpg",
    "https://images6.alphacoders.com/801/801025.jpg",
  ];


  const handleSearch = () => {
    navigate(`/moviesearch/${search}`);
  };

  return (
    <div>
      <div className="carousel-container">
        <Carousel
          dynamicHeight={false}
          showArrows={false}
          showStatus={false}
          showThumbs={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={5000}
          transitionTime={3000}
          swipeable={true}
          emulateTouch={true}
          useKeyboardArrows={true}
          stopOnHover={true}
          centerMode={false}
          centerSlidePercentage={100}
        >
          {carouselImages.map((image, index) => (
            <div key={index} className="carousel-image">
              <img
                src={image}
                className="w-full h-[900px] carousel-image"
                alt={`Carousel Image ${index + 1}`}
              />
            </div>
          ))}
        </Carousel>
      </div>

      <div className={classes.container}>
        <div className={classes.wrapper}>
          <p className="w-[120%] text-white text-center text-5xl font-bold">
            Let's find your Favourite movies
          </p>
          <p className="w-[100%] text-center text-white text-3xl my-10">
            Search the best selection of Movies with us
          </p>
          <div className={classes.options}>
            <input
              placeholder="Enter the name of movie to Search ..."
              onChange={(e) => setSearch(e.target.value)}
            ></input>

            <AiOutlineSearch
              className={classes.searchIcon}
              onClick={handleSearch}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
