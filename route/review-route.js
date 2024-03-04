const express = require("express");
const multer = require("multer");
const { upload } = require("../middleware/multer");
const reviewController = require("../controller//review-controller");
const reviewRoute = express.Router();

reviewRoute.get("/", reviewController.getReview);
reviewRoute.post("/", upload.single("cover"), async (req, res) => {
  try {
    const review = req.body;

    review.cover = req.file.filename;
    const createdReview = await reviewController.createReview(review);
    res.status(201).json({
      message: "New review succesfully added",
      data: createdReview,
    });
  } catch (error) {
    console.error("Error creating data: " + error);
    res.status(500).json({
      message: "Error creating data",
    });
  }
});
reviewRoute.put("/:id", reviewController.updateReview);
reviewRoute.delete("/:id", reviewController.deleteReview);

module.exports = { reviewRoute };
