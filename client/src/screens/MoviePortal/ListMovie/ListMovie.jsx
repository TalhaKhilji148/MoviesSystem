import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose, AiOutlineFileImage } from "react-icons/ai";
import { BsHouseDoor } from "react-icons/bs";
import { logout } from "../../../redux/authSlice";
import { request } from "../../../util/fetchAPI";

export default function ListMovie() {
  const [showForm, setShowForm] = useState(false);
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [state, setState] = useState({});
  const [photo, setPhoto] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setPhoto(null);
    setState({});
  };

  const [base64Image, setBase64Image] = useState("");
  const [file, setFile] = useState(null);
  const [titleError, setTitleError] = useState("");
  const [descError, setDescError] = useState("");
  const [subDescError, setSubDescError] = useState("");
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const base64String = e.target.result;
        setBase64Image(base64String);
        setPhoto(base64String); // Set photo for display
      };

      reader.readAsDataURL(selectedFile);
      setFile(selectedFile);
    }
  };

   const handleState = (e) => {
     setState((prev) => {
       return { ...prev, [e.target.name]: e.target.value };
     });

     // Reset error messages on input change
     setTitleError("");
     setDescError("");
     setSubDescError("");
   };

const handleListMovie = async (e) => {
  e.preventDefault();

  // Validate required fields
  if (!state.title) {
    setTitleError("Title is required");
    return;
  }

  if (!state.desc) {
    setDescError("Movie Description is required");
    return;
  }

  if (!state.subdescription) {
    setSubDescError("Sub Description is required");
    return;
  }

  try {
    const existingMovie = await request(
      `/movies/checkMovieByTitle?title=${state.title}`,
      "GET",
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (existingMovie.exists) {
      alert(
        "Movie with the same title already exists. Please choose a different title."
      );
      return;
    }


    // Proceed with form submission if the movie doesn't exist

    // Your existing code for submitting the form

    const options = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const data = await request("/movies/movie", "POST", options, {
      ...state,
      img: photo, // Use the photo state directly
    });

    console.log("data", data);

    navigate("/moviehome");
  } catch (error) {
    console.error(error);
  }
};


  return (
    <div className="w-full mb-44">
      <div onClick={(e) => e.stopPropagation()}>
        <h2 className="text-3xl mb-10 mt-20 font-bold text-center">List Movie</h2>
        <form onSubmit={handleListMovie}>
          <div className="mb-4 flex">
            <textarea
              className="border w-1/3 px-4 py-2 rounded-md mr-2"
              type="text"
              placeholder="Movie Title"
              name="title"
              rows={1}
              onChange={handleState}
            />
            {titleError && <p className="text-red-500">{titleError}</p>}

            <textarea
              className="border w-1/3 px-4 py-2 rounded-md mx-2"
              type="text"
              placeholder="Category"
              name="category"
              onChange={handleState}
              rows={1}
            />
            <textarea
              className="border w-1/3 px-4 py-2 rounded-md ml-2"
              type="text"
              placeholder="Genre"
              name="genre"
              onChange={handleState}
              rows={1}
            />
          </div>
          <div className="flex mb-4">
            <label
              htmlFor="photo"
              className="flex items-center font-size-18 mr-4"
            >
              Select Movie picture <AiOutlineFileImage />
            </label>
            <input
              type="file"
              id="photo"
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleFileChange}
            />
            {photo && (
              <div className="mt-2">
                <img
                  src={photo}
                  alt="Selected Movie"
                  className=" ml-3 mt-[-20px] w-24 h-20 rounded-md"
                />
              </div>
            )}
          </div>

          <div className="mb-4 flex w-[50%]">
            <textarea
              className="border w-3/4 px-5 py-2 rounded-md mr-2"
              type="text"
              placeholder="Movie Description"
              name="desc"
              onChange={handleState}
              rows={6}
            />
            {descError && <p className="text-red-500">{descError}</p>}

            <textarea
              className="border w-3/4 px-5 py-2 rounded-md ml-2"
              type="text"
              placeholder="Sub Description"
              name="subdescription"
              onChange={handleState}
              rows={6}
            />
          </div>
          {subDescError && <p className="text-red-500">{subDescError}</p>}

          <div className="mb-4 flex">
            <input
              className="border w-1/3 px-4 py-2 rounded-md mr-2"
              type="text"
              placeholder="Director Info"
              name="directorinfo"
              onChange={handleState}
            />

            <input
              className="border w-1/3 px-4 py-2 rounded-md mx-2"
              type="text"
              placeholder="Subtitle"
              name="subtitle"
              onChange={handleState}
            />
            <input
              type="text"
              className="border w-1/3 px-4 py-2 rounded-md ml-2"
              placeholder="Trailer Youtube Link"
              name="link"
              onChange={handleState}
            />
          </div>

          <button className="bg-sky-700 hover:bg-blue-800 text-white py-2 px-4 rounded-md">
            List Movie
          </button>
        </form>
        <AiOutlineClose className="removeIcon" />
      </div>
    </div>
  );
}
