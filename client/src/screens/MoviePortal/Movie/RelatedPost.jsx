import { Link, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

const RelatedPost = ({
  image,
  slug,
  title,
  date,
}) => {
  return (
    <div className="flex items-center lg:block xl:flex">
      <div className="mr-5  lg:mb-3 xl:mb-0">
        <div className="relative overflow-hidden rounded-md sm:h-[80%] sm:w-[185px]">
          <img src={image} alt={title} fill />
        </div>
      </div>
      <div className="w-full">
        <h5>
          <Link
            to={slug}
            className=" mt-[-10px] mb-[2px] block text-base font-medium leading-snug text-black hover:text-primary  "
          >
            {title}
          </Link>
        </h5>
        <p className="text-xs font-medium text-body-color">{date}</p>
      </div>
    </div>
  );
};

export default RelatedPost;
