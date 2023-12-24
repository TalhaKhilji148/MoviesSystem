import React, { useState } from "react";
import ReviewModal from "../../../components/ReviewModal";
import {
  FaFacebookF,
  FaDribbble,
  FaLinkedinIn,
  FaInstagram,
  FaBehance,
} from "react-icons/fa";

const Footer = () => {
  const [showReviewModal, setShowReviewModal] = useState(false);

  const handleReviewClick = () => {
    setShowReviewModal(true);
  };

  return (
    <div className="w-full bg-black py-24">
      <div className="md:max-w-[1480px] mx-auto grid md:grid-cols-5 max-w-[600px] md:grid-cols-2 gap-8 px-4 md:px-0">
        <div className="col-span-2">
          <h3 className="text-2xl font-bold text-white mb-8">Contact Us</h3>
          <h3 className="py-2 text-white">Call: +123 400 123</h3>
          <h3 className="py-2 text-white">
            this is my random text <br /> Movies.
          </h3>
          <h3 className="py-2 text-[#f5fbff]">Email: example@gmail.com</h3>
          <div className="flex gap-4 py-4">
            <div className="p-4 bg-white rounded-xl">
              <FaFacebookF size={25} style={{ color: "blue" }} />
            </div>
            <div className="p-4 bg-white rounded-xl">
              <FaDribbble size={25} style={{ color: "red" }} />
            </div>
            <div className="p-4 bg-white rounded-xl">
              <FaLinkedinIn size={25} style={{ color: "darkblue" }} />
            </div>
            <div className="p-4 bg-white rounded-xl">
              <FaInstagram size={25} style={{ color: "orange" }} />
            </div>
            <div className="p-4 bg-white rounded-xl">
              <FaBehance size={25} style={{ color: "purple" }} />
            </div>
          </div>
        </div>

        <div className="mt-[-60px]">
          <ul className="py-6 text-white">
            <li className="py-2">Home</li>
            <li className="py-2">My Movies</li>
          </ul>
        </div>

        <div className="md:mt-0 flex flex-row ">
          <div className="mt-[-60px]">
            <ul className="py-6 text-white">
              <li className="py-2">Movies</li>
              <li className="py-2">Listing</li>
              <li className="py-2">About us</li>
              <li className="py-2">Search</li>
              <li className="py-2">Activity</li>
              <li className="py-2">Reviews</li>
            </ul>
          </div>
          <div className="ml-20 max-w-full md:max-w-[780px] md:col-span-2">
            <h3 className="py-2 text-white ml-0">
              My random values, footer Movies.
            </h3>
            <form className="py-2 flex flex-col md:flex-col md:ml-0">
              <input
                className="bg-[#F2F3F4] p-3 mb-4 md:mb-0 rounded w-full md:w-64"
                placeholder="Email here"
              />
              <div >
                <button className="max-w-full md:w-32 my-4 md:my-0 md:mt-0 px-3 md:ml-4 py-3 rounded-md bg-sky-700 text-white font-medium">
                  <p className="w-full ">Contact Now</p>
                </button>
                {/* Render the ReviewModal conditionally based on state */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
