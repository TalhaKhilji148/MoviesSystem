const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const app = require("../index"); // Adjust the path to your Express app file
const cloudinary = require("cloudinary"); // Mocked Cloudinary module
const Movie = require("../models/Movie"); // Adjust the path to your Movie model
const Review = require("../models/Review"); // Adjust the path to your Review model

chai.use(chaiHttp);
const { expect } = chai;

// Function to wait for the specified time
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let authToken;
let movieId ;

describe("Movie Controller", () => {
  // Mock the cloudinary.uploader.upload function
  before(() => {
    sinon.stub(cloudinary.uploader, "upload").resolves({
      secure_url: "mocked_cloudinary_url",
    });
  });

  // Restore the original cloudinary.uploader.upload function
  after(() => {
    sinon.restore();
  });
  

  before(async function () {
    // Increase the timeout for this hook, adjust as needed
    this.timeout(10000);

    // Wait for the database connection
    await wait(5000); // Adjust the time as needed

    // Perform login and get the authentication token
    const loginResponse = await chai.request(app).post("/auth/login").send({
      email: "movieuser@gmail.com",
      password: "111111",
    });

    expect(loginResponse).to.have.status(200);
    expect(loginResponse.body).to.have.property("token");
    authToken = loginResponse.body.token;
  });

  describe("GET /getAllMovies", () => {

    it("should return all movies with current owners (200 OK)", async () => {
      const res = await chai
        .request(app)
        .get("/movies/getAllMovies")
        .set("Authorization", `Bearer ${authToken}`);
       movieId = res.body[0]._id;
       console.log("Movie Id", res.body[0]._id)
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("array");
      // Add more assertions based on your data structure
    });
  });



  describe("POST /movie/", () => {
    it("should create a new movie with a review and return 201 status", async () => {
      const Random = Math.random(1,10);
      const sampleRequestData = {
        title: `simple ${Random}`,
        category: "Action",
        genre: "Adventure",
        img: "sample_image_url",
        link: "sample_link",
        desc: "Sample movie description",
        directorinfo: "Sample director info",
        subtitle: "Sample subtitle",
        subdescription: "Sample subdescription",
        reviewDetails: "Sample review details",
        reviewStar: 5,
      };

      // Make a request to the endpoint with the authentication token
      const res = await chai
        .request(app)
        .post("/movies/movie")
        .set("Authorization", `Bearer ${authToken}`)
        .send(sampleRequestData);

      // Assertions
      expect(res).to.have.status(201);
      expect(res.body).to.be.an("object");
      expect(res.body.title).to.equal(sampleRequestData.title);

      // Check if a movie document with the specified title exists in the database
      const createdMovie = await Movie.findOne({
        title: sampleRequestData.title,
      });
      expect(createdMovie).to.exist;
      expect(createdMovie.category).to.equal(sampleRequestData.category);

      // Check if a review document is associated with the created movie
      expect(createdMovie.reviews).to.have.lengthOf(1);
      const createdReview = await Review.findById(createdMovie.reviews[0]);
      expect(createdReview).to.exist;
      expect(createdReview.details).to.equal(sampleRequestData.reviewDetails);
    });
  });


  describe("PUT /review/:id", () => {
    it("should update the movie's review and return 201 status", async () => {
      const sampleRequestData = {
        name: "Updated Review Author",
        address: "Updated Review Author's Address",
        details: "Updated review details",
        img: "updated_sample_image_url",
        star: 4,
      };

      // Make a request to the endpoint with the authentication token
      const res = await chai
        .request(app)
        .put(`/movies/review/${movieId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .send(sampleRequestData);
      console.log("1111",res)
      // Assertions
      expect(res).to.have.status(201);
      expect(res.body).to.be.an("object");
      console.log("Enterd")

      // Check if the movie document has been updated with the new review
      const updatedMovie = await Movie.findById(movieId);
      const updatedReview = await Review.findById(updatedMovie.reviews.pop());

      expect(updatedReview).to.exist;
      expect(updatedReview.details).to.equal(sampleRequestData.details);
    });
  });
  let rand = Math.random(0, 100);
  // Must Replace the movie name that is already in the database!

  const sampleMovie = {
    title: `simple 0.793792894081838`,
  };



  describe("GET /checkMovieByTitle", () => {
    it("should return exists true if the movie title already exists", async () => {
      const res = await chai
        .request(app)
        .get("/movies/checkMovieByTitle")
        .query({ title: sampleMovie.title });

      expect(res).to.have.status(200);
      expect(res.body).to.be.an("object");
      expect(res.body.exists).to.be.true;
    });

    it("should return exists false if the movie title doesn't exist", async () => {
      const res = await chai
        .request(app)
        .get("/movies/checkMovieByTitle")
        .query({ title: "Nonexistent Movie" });

      expect(res).to.have.status(200);
      expect(res.body).to.be.an("object");
      expect(res.body.exists).to.be.false;
    });

    it("should return 400 status if title parameter is missing", async () => {
      const res = await chai.request(app).get("/movies/checkMovieByTitle");
      expect(res).to.have.status(400);
      expect(res.body).to.be.an("object");
      expect(res.body.error).to.equal("Title parameter is required");
    });

    it("should handle errors and return 500 status", async () => {
      // Mock the Movie.findOne method to throw an error
      const originalFindOne = Movie.findOne;
      Movie.findOne = () => {
        throw new Error("Mocked error");
      };

      const res = await chai
        .request(app)
        .get("/movies/checkMovieByTitle")
        .query({ title: sampleMovie.title });

      expect(res).to.have.status(500);

      // Restore the original Movie.findOne method
      Movie.findOne = originalFindOne;
    });
  });



  describe("GET /moviewithrank", () => {
    it("should return movies with rank sorted by review count (200 OK)", async () => {
      const res = await chai.request(app).get("/movies/moviewithrank");
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("array");

      // Add assertions based on the expected structure of the response
      // You may want to check the order of movies based on the review count

      // For example, assuming there are two sample movies with the same review count
    });

    it("should handle errors and return 500 status", async () => {
      // Mock the Movie.aggregate method to throw an error
      const originalAggregate = Movie.aggregate;
      Movie.aggregate = () => {
        throw new Error("Mocked error");
      };

      const res = await chai.request(app).get("/movies/moviewithrank");
      expect(res).to.have.status(500);

      // Restore the original Movie.aggregate method
      Movie.aggregate = originalAggregate;
    });
  });



  describe("DELETE /:id", () => {
    it("should delete a movie and return 200 status with deleted movie data", async () => {
      // Get the ID of the sample movie created in the before hook
      const { _id } = await Movie.findOne({ title: sampleMovie.title });

      const res = await chai.request(app).delete(`/movies/${_id}`);
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("object");
      expect(res.body.title).to.equal(sampleMovie.title);

      // Check if the movie with the specified ID no longer exists in the database
      const deletedMovie = await Movie.findById(_id);
      expect(deletedMovie).to.be.null;
    });

  

  });

});
