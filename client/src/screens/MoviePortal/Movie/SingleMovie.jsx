import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const SingleMovie = ({ movie }) => {
  const { user } = useSelector((state) => state.auth);
  console.log("User Id:", user?._id)
  const {
    title,
    img,
    desc,
    directorInfo,
    createdAt,
    subtitle,
    subdescription,
    currentOwner,
  } = movie;

  return (
    <>
      <div
        className="wow fadeInUp  relative overflow-hidden rounded-md bg-white shadow-one"
        data-wow-delay=".1s"
      >
        <Link
          to={`/movie/${movie?._id}`}
          className="relative block h-[220px] w-full"
        >
          {/* Assuming the first tag is the primary tag */}
          <span className="absolute top-6 right-6 z-20 inline-flex items-center justify-center rounded-full bg-primary py-2 px-4 text-sm font-semibold capitalize text-white">
            {/* Display the first tag, modify as needed */}
            {/* {movie.tags && movie.tags.length > 0 ? movie.tags[0] : ""} */}
          </span>
          <img
            className="h-[130%] w-full rounded-md"
            src={img}
            alt="image"
            fill
          />
        </Link>
        <div className="p-6 sm:p-8 md:py-8 md:px-8 lg:p-8 xl:py-8 xl:px-1 2xl:px-1 2xl:p-8">
          <h3>
            <Link
              to={`/movie/${movie?._id}`}
              className="mb-[-50px] mt-10 block text-xl font-bold text-black hover:text-primary sm:text-2xl"
            >
              {title}
            </Link>
          </h3>
          <p className="mb-6 mt-16 border-b border-body-color border-opacity-10 pb-6 text-base font-medium text-body-color">
            {desc ? desc.substring(0, 200) : ""}
          </p>
          <div className="flex flex-col sm:flex-row items-center">
            <div className="mb-4 sm:mb-0 sm:mr-5 flex items-center border-b sm:border-b-0 border-body-color border-opacity-10 pb-5 sm:pb-0 pr-5 xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5">
              <div className="mr-4">
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  {/* Display author image, modify as needed */}
                  <img src={currentOwner?.profileImg} alt="author" fill />
                </div>
              </div>
              <div className="w-full">
                <h4 className="mb-1 text-sm font-medium">
                  By {currentOwner?.username}
                </h4>
                <p className="text-xs text-body-color">{currentOwner?.email}</p>
              </div>
            </div>
            <div className="inline-block mt-4 sm:mt-0">
              <h4 className="mb-1 text-sm font-medium">
                Date {createdAt ? createdAt.substring(0, 10) : ""}
              </h4>
              <p className="text-xs text-body-color">
                {createdAt ? createdAt.substring(11, 19) : ""}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <h4 className="mb-1 text-sm font-medium">Subtitle</h4>
            <p className="text-xs text-body-color">{subtitle}</p>
            <h4 className="mb-1 mt-2 text-sm font-medium">
              SubTitle Description
            </h4>
            <p className="text-xs text-body-color">
              {subdescription ? subdescription.substring(0, 100) : ""}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleMovie;
