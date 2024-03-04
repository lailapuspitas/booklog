const { prisma } = require("../config/prisma");
const fs = require("fs").promises;

const getReview = async () => {
  try {
    const review = await prisma.review.findMany();
    return review;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrieve book review");
  }
};

const createReview = async (review) => {
  try {
    const createReview = await prisma.review.create({
      data: {
        cover: review.cover,
        title: review.title,
        no_pages: review.no_pages,
        rate: review.rate,
        review: review.review,
      },
    });
    return createReview;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add new book review");
  }
};

const updateReview = async (id, newReview) => {
  try {
    const { cover, title, no_pages, rate, review } = newReview;

    const updateReview = await prisma.review.update({
      where: { id: id },
      data: {
        cover: cover !== undefined ? cover : undefined,
        title: title !== undefined ? title : undefined,
        no_pages: no_pages !== undefined ? no_pages : undefined,
        rate: rate !== undefined ? rate : undefined,
        review: review !== undefined ? review : undefined,
      },
    });
    return updateReview;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update book review");
  }
};

const deleteReview = async (id) => {
  try {
    const reviewToDelete = await prisma.review.findUnique({
      where: { id: id },
    });

    if (!reviewToDelete) {
      throw new Error("Book at review status not found");
    }

    const filePath = `img-upload/${reviewToDelete.cover}`;
    await fs.unlink(filePath);

    const deleteReview = await prisma.review.delete({
      where: { id: id },
    });

    return deleteReview;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete book review");
  }
};

module.exports = { getReview, createReview, updateReview, deleteReview };
