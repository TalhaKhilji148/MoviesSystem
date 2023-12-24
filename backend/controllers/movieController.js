const Movie = require("../models/Movie");
const movieController = require("express").Router();
const verifyToken = require("../middlewares/verifyToken");
const cloudinary = require("../utils/cloudinary");
const Review = require("../models/Review");
// Get all Movies
movieController.get("/getAllMovies", async (req, res) => {
  try {
    const Movies = await Movie.find().populate(
      "currentOwner",
      "-password"
    );
    return res.status(200).json(Movies);
  } catch (error) {
    console.error(error);
  }
});


movieController.post("/movie/", verifyToken, async (req, res) => {
  const {
    title,
    category,
    genre,
    img,
    link,
    desc,
    directorinfo,
    subtitle,
    subdescription,
    reviewDetails, // Assuming you have a field for review details in the request body
    reviewStar, // Assuming you have a field for review star in the request body
  } = req.body;

  try {
    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(img, {
      resource_type: "image",
    });

    const cloudinaryUrl = result.secure_url;

    // Create a new Movie document
    const newMovie = await Movie.create({
      title,
      category,
      genre,
      img: cloudinaryUrl,
      link,
      desc,
      directorinfo,
      subtitle,
      subdescription,
      currentOwner: req.user.id,
    });

    // Create a new Review document
    const newReview = await Review.create({
      img: cloudinaryUrl, // You may want to use a different image for the review
      name: "Review Author", // Provide a name for the review author
      address: "Review Author's Address", // Provide an address for the review author
      details: reviewDetails,
      star: reviewStar,
    });

    // Add the review's ObjectId to the new movie's reviews array
    newMovie.reviews.push(newReview._id);

    // Save the updated movie with the new review
    await newMovie.save();

    return res.status(201).json(newMovie);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

movieController.put("/review/:id", verifyToken, async (req, res) => {
  const movieId = req.params.id;
  console.log("Backend Movie", movieId);
  const { name, address, details, img, star } = req.body;

  try {
    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(img, {
      resource_type: "image",
    });

    const cloudinaryUrl = result.secure_url;

    // Create a new Review document
    const newReview = await Review.create({
      name,
      address,
      details,
      star,
      img: cloudinaryUrl,
    });

    // Update the Movie document to include the new review ID
    await Movie.findByIdAndUpdate(
      movieId,
      { $push: { reviews: newReview._id } },
      { new: true }
    );

    return res.status(201).json(newReview);
  } catch (error) {
    console.error("Error:", error);

    // Return JSON error response
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

movieController.post("/review", verifyToken, async (req, res) => {
  const { name, address, details, img, star } = req.body;
  console.log("name", name);

  try {
    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(img, {
      resource_type: "image",
    });

    const cloudinaryUrl = result.secure_url;

    // Create a new Review document
    const newReview = await Review.create({
      name,
      address,
      details,
      star,
      img: cloudinaryUrl,
    });

    return res.status(201).json(newReview);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

movieController.get("/getAllReviews", async (req, res) => {
  try {
    const reviews = await Review.find();
    return res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
  }
});
movieController.get("/checkMovieByTitle", async (req, res) => {
  try {
    const { title } = req.query;

    if (!title) {
      return res.status(400).json({ error: "Title parameter is required" });
    }

    const existingMovie = await Movie.findOne({ title });

    if (existingMovie) {
      // Movie with the same title already exists
      return res.status(200).json({ exists: true });
    } else {
      // Movie with the title doesn't exist
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a specific Movie by ID
movieController.get("/detail/:id", async (req, res) => {
  try {
    const Movies = await Movie.findById(req.params.id)
      .populate("currentOwner", "-password")
      .populate("reviews"); // Populate the 'reviews' field
    if (!Movies) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.status(200).json(Movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add other routes as needed

movieController.put("/update/:id", verifyToken, async (req, res) => {
  console.log("Backend image >>>>>>>>.", req.body.img);

  try {
    const Movied = await Movie.findById(req.params.id);

    if (!Movied) {
      return res.status(404).json({ error: "Movie not found" });
    }

    console.log("Backend 22222222222222222222", Movied);

    // Upload the new image to Cloudinary
    if (req.body.img) {
      const cloudinaryResponse = await cloudinary.uploader.upload(
        req.body.img,
        {
          resource_type: "image",
        }
      );

      const cloudinaryUrl = cloudinaryResponse.secure_url;
      console.log("Cloudinary URL:", cloudinaryUrl);

      Movied.img = cloudinaryUrl;
    }

    // Update other fields if present in the request
    if (req.body.title) {
      Movied.title = req.body.title;
    }
    if (req.body.category) {
      Movied.category = req.body.category;
    }
    if (req.body.genre) {
      Movied.genre = req.body.genre;
    }
    if (req.body.link) {
      Movied.link = req.body.link;
    }
    if (req.body.desc) {
      Movied.desc = req.body.desc;
    }
    if (req.body.directorinfo) {
      Movied.directorinfo = req.body.directorinfo;
    }
    if (req.body.subtitle) {
      Movied.subtitle = req.body.subtitle;
    }
    if (req.body.subdescription) {
      Movied.subdescription = req.body.subdescription;
    }

    // Save the updated Movie
    const updatedMovie = await Movied.save();
    console.log("Backend 333333333333333", updatedMovie);

    return res.status(200).json(updatedMovie);
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json(error);
  }
});
movieController.get("/moviewithrank", async (req, res) => {
  try {
    const moviesWithRank = await Movie.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "currentOwner",
          foreignField: "_id",
          as: "ownerInfo",
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          category: 1,
          genre: 1,
          link: 1,
          desc: 1,
          directorinfo: 1,
          subtitle: 1,
          subdescription: 1,
          img: 1,
          reviewCount: { $size: "$reviews" },
          rank: "$rank",
          createdAt: 1, // Include createdAt field
          updatedAt: 1, // Include updatedAt field
          currentOwner: {
            _id: "$currentOwner",
            username: { $arrayElemAt: ["$ownerInfo.username", 0] },
            profileImg: { $arrayElemAt: ["$ownerInfo.profileImg", 0] },
          },
        },
      },
      {
        $sort: { reviewCount: -1 }, // Sort by reviewCount in descending order
      },
    ]);

    console.log("Movies with Rank backend", moviesWithRank);

    return res.status(200).json(moviesWithRank);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});











movieController.delete("/:id", async (req, res) => {
  try {
    const Movied = await Movie.findByIdAndDelete(req.params.id);

    if (!Movied) {
      return res.status(404).json({ error: "Movie not found" });
    }

    return res.status(200).json(Movied);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});





module.exports = movieController;
