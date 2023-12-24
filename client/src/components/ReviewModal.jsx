import React, { useState } from "react";
import ReviewForm from "./ReviewForm"; // Import your ReviewForm component

const ReviewModal = ({ user, movieId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex flex-row w-[500px]">
        <p className=" text-white ml-[-10px] mr-10">Want to review Us?</p>
        <button
          onClick={openModal}
          className="bg-yellow-500 text-white px-16 py-2 ml-[-10px] mt-[-10px] rounded "
        >
          Open Form
        </button>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <button onClick={closeModal} className="mt-[-30px]">
              <text className="text-red-600 text-center ml-[500px] mt-[-30px] text-lg font-bold">
                X
              </text>
            </button>
            <ReviewForm user={user} movieId={movieId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewModal;
