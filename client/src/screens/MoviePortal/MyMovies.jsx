import React, { useState, useEffect, useContext } from "react";
import { request } from "../../util/fetchAPI";
import classes from "../MoviePortal/navbar/navbar.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { BsHouseDoor } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose, AiOutlineFileImage } from "react-icons/ai";
import { useParams } from "react-router-dom";
const arr = [];
export default function MyMovies() {
  const { id } = useParams();
  const [state, setState] = useState({});
  const [photo, setPhoto] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { user, token } = useSelector((state) => state.auth);

  // mobile
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [movieEdit, setMovieEdit] = useState("");

    const handleState = (e) => {
      setState((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });

      // Reset error messages on input change
      setTitleError("");
      setDescError("");
      setSubDescError("");
    };
  const [titleError, setTitleError] = useState("");
  const [descError, setDescError] = useState("");
  const [subDescError, setSubDescError] = useState("");

  const [base64Image, setBase64Image] = useState("");
  const [file, setFile] = useState(null);
  useEffect(() => {
    console.log(" Edit >>>>>", movieEdit);
  }, [movieEdit]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
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

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (e) => {
        // The result attribute contains the data URL as a base64 encoded string
        const base64String = e.target.result;
        setBase64Image(base64String);
      };

      reader.readAsDataURL(selectedFile);
      setFile(selectedFile);
      console.log("Base64Image>>>>>", base64Image);
    }
  };

  const handleMovie = async (e) => {
    e.preventDefault();

    try {
      // Define the request options, including the Authorization header
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      // Construct the request data, including the state and base64Image
      const requestData = {
        ...state,
        img: base64Image,
      };
      console.log("334", requestData);

      const response = await fetch(
        `http://localhost:5000/movies/update/${movieEdit}`,
        {
          method: "PUT", // Use "PUT" to update the resource
          headers: options.headers,
          body: JSON.stringify(requestData),
        }
      );

      // Log the entire response for debugging
      console.log("Full Response:", response);

      // Check if the response status code indicates success (e.g., 200 for OK)
      if (response.status === 200) {
        const responseData = await response.json();
        console.log("MoviesDataa", responseData);
        setShowForm(false);
      } else {
        console.log("Server returned an error status code:", response.status);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setPhoto(null);
    setState({});
  };

  const [MoviesData, setMoviesData] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await request("/movies/getAllMovies", "GET");
        setMoviesData(data);
        console.log("Movies data>>>>", data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovies();
  }, [clicked]);

  return (
    <div className="flex w-full justify-center  items-center 2xl:px-20">
      <div className="flex flex-col md:p-12 px-4">
        {MoviesData && MoviesData.length > 0 ? (
          <h3 className="text-black font-semibold text-3xl text-center my-2">
            My Movies
          </h3>
        ) : (
          <h3 className=" text-3xl mt-32 text-center my-2 text-red-600">
            You don't have any Movies yet!
          </h3>
        )}
        <div className="flex flex-wrap justify-center items-centre mt-20 mb-40">
          {MoviesData.filter((myitem) => myitem?.currentOwner._id === id).map(
            (item, i) => (
              <div className="bg-[#fdfbfb] m-4    2xl:min-w-[480px] 2xl:max-w-[600px] sm:min-w-[470px] sm:max-w-[300px] flex-col p-3 rounded-md hover:shadow-2xl">
                <div className=" w-full mt-3">
                  <div className="  p-2 flex ml-5">
                    <Link to={`/movie/${item?._id}`}>
                      <img
                        className="w-[64]   rounded-lg h-[250px]"
                        src={item.img}
                      ></img>
                    </Link>

                    <div className="ml-10 h-16">
                      <p className="text-black text-base w-40 font-body ">
                        <span className="font-bold">Title:</span> {item.title}
                      </p>

                      <p className="text-black text-base font-body ">
                        <span className="font-bold">Category:</span>{" "}
                        {item.category}
                      </p>
                      <p className="text-black text-base font-body ">
                        <span className="font-bold">Director info:</span>{" "}
                        {item.directorinfo}
                      </p>

                      <p className="text-black text-base w-40 font-body">
                        <span className="font-bold">Genre:</span> {item.genre}{" "}
                      </p>
                      <p className="text-black text-base w-60 font-body">
                        <span className="font-bold">Description:</span>
                        <span className="ml-1"> </span>{" "}
                        {item?.desc ? item.desc.substring(0, 100) : ""}...
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row ml-72  h-10">
                    <Link
                      onClick={() => {
                        setShowForm(true);
                        setMovieEdit(item._id);
                      }}
                      className="  bg-sky-700 w-32 rounded-lg text-white"
                    >
                      <div className=" text-center  mt-2 h-10">Edit</div>
                    </Link>
                    {!showMobileNav && showForm && (
                      <div
                        className={classes.listMovieForm}
                        onClick={handleCloseForm}
                      >
                        <div
                          className={classes.listMovieWrapper}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <h2 className="text-xl mb-10">Update Movie</h2>
                          <form onSubmit={handleMovie}>
                            <div>
                              <textarea
                                className="border border-gray-400 w-96 px-10 py-2 rounded-md mr-4"
                                type="text"
                                placeholder="Title"
                                name="title"
                                rows={1}
                                cols={50}
                                onChange={handleState}
                              />
                              {titleError && (
                                <p className="text-red-500">{titleError}</p>
                              )}

                              <textarea
                                className="border border-gray-400 px-3 py-2 rounded-md mr-4"
                                type="text"
                                placeholder="Category"
                                name="category"
                                onChange={handleState}
                                rows={1}
                                cols={40}
                              />
                              <textarea
                                className="border border-gray-400 px-3 py-2 rounded-md mr-4"
                                type="text"
                                placeholder="Genre"
                                name="genre"
                                onChange={handleState}
                                rows={1}
                                cols={40}
                              />

                              <label htmlFor="photo">
                                Select Movie picture <AiOutlineFileImage />
                              </label>
                              <input
                                type="file"
                                id="photo"
                                style={{ display: "none" }}
                                accept="image/*"
                                onChange={handleFileChange}
                              />
                              {photo && <p>{photo.name}</p>}
                            </div>

                            <div className="flex flex-row w-[100%]">
                              <textarea
                                className="border border-gray-400 ml-64 w-[25%] px-5 py-2 pb-32 rounded-md mr-4"
                                type="text"
                                placeholder="Description"
                                name="desc"
                                onChange={handleState}
                                rows={4}
                                cols={50}
                              />
                              {descError && (
                                <p className="text-red-500">{descError}</p>
                              )}

                              <textarea
                                className="border border-gray-400 px-5 w-[43%] py-2 pb-32 rounded-md mr-4"
                                type="text"
                                placeholder="Subtitle Description"
                                name="subdescription"
                                onChange={handleState}
                                rows={4}
                                cols={50}
                              />
                              {subDescError && (
                                <p className="text-red-500">{subDescError}</p>
                              )}
                            </div>

                            <div>
                              <textarea
                                className="border border-gray-400 w-96 px-10 py-2 rounded-md mr-4"
                                type="text"
                                placeholder="Subtitle"
                                name="subtitle"
                                rows={1}
                                cols={50}
                                onChange={handleState}
                              />
                              <textarea
                                className="border border-gray-400 px-3 py-2 rounded-md mr-4"
                                type="text"
                                placeholder="Link"
                                name="link"
                                onChange={handleState}
                                rows={1}
                                cols={40}
                              />
                              <textarea
                                className="border border-gray-400 ml-10 w-[25%] px-5 py-2 rounded-md mr-4"
                                type="text"
                                placeholder="Director Info"
                                name="directorinfo"
                                onChange={handleState}
                                rows={1}
                                cols={40}
                              />
                            </div>

                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                width: "50%",
                              }}
                            ></div>

                            <button className="bg-sky-700 hover:rgb(3 105 161)">
                              Update Movie
                            </button>
                          </form>
                          <AiOutlineClose
                            className={classes.removeIcon}
                            onClick={handleCloseForm}
                          />
                        </div>
                      </div>
                    )}
                    <button
                      onClick={() => {
                        setClicked(!clicked);
                        fetch(`http://localhost:5000/movies/${item._id}`, {
                          method: "DELETE",
                        })
                          .then((response) => {
                            console.log("Response>>>>>", response);
                          })
                          .catch((error) => {
                            console.error("An error occurred:", error);
                          });
                      }}
                      className="  ml-4  bg-red-600 w-32 rounded-lg text-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
        <div className="flex flex-wrap justify-center items-centre h-32 mb-14 "></div>
      </div>
    </div>
  );
}
