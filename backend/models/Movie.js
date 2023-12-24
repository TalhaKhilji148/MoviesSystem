const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    currentOwner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    title: {
      unique: true,
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    genre: {
      type: String,
    },
    img: {
      type: String,
    },
    link: {
      type: String,
    },
    desc: {
      type: String,
    },
    directorinfo: {
      type: String,
    },
    subtitle: {
      type: String,
    },
    subdescription: {
      type: String,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    rank: {
      type: Number,
      default: 0, // Default rank is 0
    },
  },
  { timestamps: true }
);

// Middleware to update rank when reviews are added or removed
movieSchema.post("save", async function (doc, next) {
  const reviewCount = doc.reviews.length;
  if (doc.rank !== reviewCount) {
    // Update rank only if it has changed
    doc.rank = reviewCount;
    await doc.save();
  }
  next();
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
