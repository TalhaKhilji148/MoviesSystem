// ReviewForm.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {  AiOutlineFileImage } from "react-icons/ai";

import { request } from "../util/fetchAPI";

const ReviewForm = ({movieId}) => {
  const [isFormVisible, setIsFormVisible] = useState(true); // New state variable

  const [state, setState] = useState({});
  const [photo, setPhoto] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const handleState = (e) => {
    setState((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const [base64Image, setBase64Image] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (e) => {
        // The result attribute contains the data URL as a base64 encoded string
        const base64String = e.target.result;
        setBase64Image(base64String);
      };

      reader.readAsDataURL(selectedFile);
      setFile(selectedFile);
    }
  };

const handleListReview = async (e) => {
  e.preventDefault();

  try {
    const options = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    // Assuming state.movieId contains the movie ID
    const data = await request(`/movies/review/${movieId}`, "PUT", options, {
      ...state,
      img: base64Image,
    });

    console.log("data", data);
    setIsFormVisible(false); // Close the form after successful submission
  } catch (error) {
    console.log("error");
  }
};

  // You can use the 'user' prop to get details like user name, address, etc.

  return (
    <div className="review-form">
      {isFormVisible ? (
        <>
          <h2 className="text-sky-700">Write a Review</h2>
          {/* Include form fields for user review */}
          <div className="flex flex-col mt-4">
            <label htmlFor="name" className="text-white mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="bg-gray-100 px-4 py-2 rounded"
              placeholder="Enter your name"
              onChange={handleState}
            />
          </div>

          <div className="flex flex-col mt-4">
            <label htmlFor="address" className="text-white mb-2">
              Your Email address
            </label>
            <input
              name="address"
              type="text"
              id="address"
              className="bg-gray-100 px-4 py-2 rounded"
              placeholder="Enter your email address"
              onChange={handleState}
            />
          </div>

          <div className="flex flex-col mt-4">
            <label htmlFor="details" className="text-white mb-2">
              Your Review
            </label>
            <textarea
              name="details"
              id="details"
              className="bg-gray-100 px-4 py-2 rounded mb-5"
              placeholder="Write your review"
              onChange={handleState}
              rows="4"
            ></textarea>
          </div>
          <label className="mt-16" htmlFor="photo">
            Select Your picture{" "}
            <span>
              <AiOutlineFileImage />
            </span>
          </label>
          <input
            type="file"
            id="photo"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleFileChange}
          />
          {photo && <p>{photo.name}</p>}

          <div className="flex flex-col mt-4">
            <label htmlFor="star" className="text-white mb-2">
              Rating (out of 5)
            </label>
            <input
              name="star"
              type="number"
              id="star"
              className="bg-gray-100 px-4 py-2 rounded"
              placeholder="Enter your rating"
              min="1"
              max="5"
              onChange={handleState}
            />
          </div>

          <button
            onClick={handleListReview}
            className="bg-sky-700  text-white px-4 py-2 rounded mt-10"
          >
            Submit Review
          </button>
        </>
      ) : (
        <p className="text-center font-bold text-xl mt-32">Review submitted successfully! The form is now closed.</p>
      )}
    </div>
  );
};

export default ReviewForm;
