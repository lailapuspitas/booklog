const { prisma } = require("../config/prisma");
const reviewService = require("../service/review-service");

const getReview = async (req, res) => {
  try {
    const review = await reviewService.getReview();
    res.status(200).json({
      message: "Success in retrieving data!",
      data: review,
    });
  } catch (error) {
    console.error("Error fetching data: " + error);
    res.status(500).json({
      message: "Error fetching data",
    });
  }
};

const createReview = async (review) => {
  try {
    review.no_pages = parseInt(review.no_pages);
    review.rate = parseInt(review.rate);
    const createdReview = await prisma.review.create({
      data: {
        cover: review.cover,
        title: review.title,
        no_pages: review.no_pages,
        rate: review.rate,
        review: review.review,
      },
    });
    return createdReview;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add new book review");
  }
};

const updateReview = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const review = req.body;
    const updatedReview = await catatanReview.updateReview(id, review);

    res.status(200).json({
      message: "Success in updating data!",
      data: updatedReview,
    });
  } catch (error) {
    console.error("Error updating data: " + error);
    res.status(500).json({
      message: "Error updating data",
    });
  }
};

const deleteReview = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deletedReview = await reviewService.deleteReview(id);
    res.status(200).json(deletedReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getReview, createReview, updateReview, deleteReview };
