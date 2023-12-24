import React from "react";
import { FaStar } from "react-icons/fa";
import { IoIosStarOutline } from "react-icons/io";

const FeedbackCard = ({ img, name, details, address, star }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`text-yellow-400 mt-[-32px] text-2xl w-10 ${i <= star ? "filled" : "unfilled"}`}
        >
          {i <= star ? <FaStar /> : <IoIosStarOutline />}
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="bg-white w-[500px] p-12 pt-10 rounded-3xl shadow-xl my-8 mx-6">
      <div className="flex justify-between flex-row">
        <div className="flex w-[400px]  pr-32 gap-4">
          <img
            className="rounded-md w-[83%] h-[200px]"
            src={img}
            alt={`${name}'s avatar`}
          />
          <div className="w-20 mt-2">
            <h1 className="text-[#08165d] w-40 mr-32">{name}</h1>
            <p className="text-[#08165d] w-[50%] text-sm ">{address}</p>
          </div>
        </div>
      </div>

      <div className="py-8">
        <h3 className="text-lg text-[#08165d]">{details}</h3>
      </div>
      <div className="py-8">
        <div className="flex items-center">{renderStars()}</div>
      </div>
    </div>
  );
};

export default FeedbackCard;
