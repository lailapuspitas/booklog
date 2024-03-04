const { prisma } = require("../config/prisma");
const fs = require("fs").promises;

const getTracker = async () => {
  try {
    const tracker = await prisma.tracker.findMany();
    return tracker;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrieve book tracker");
  }
};

const createTracker = async (tracker) => {
  try {
    const createTracker = await prisma.tracker.create({
      data: {
        cover: tracker.cover,
        title: tracker.title,
        no_pages: tracker.no_pages,
        start_date: tracker.start_date,
        progress: tracker.progress,
      },
    });
    return createTracker;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add new book tracker");
  }
};

const updateTracker = async (id, tracker) => {
  try {
    const { cover, title, no_pages, start_date, progress } = tracker;

    const updateTracker = await prisma.tracker.update({
      where: { id: id },
      data: {
        cover: cover !== undefined ? cover : undefined,
        title: title !== undefined ? title : undefined,
        no_pages: no_pages !== undefined ? no_pages : undefined,
        start_date: start_date !== undefined ? start_date : undefined,
        progress: progress !== undefined ? progress : undefined,
      },
    });
    return updateTracker;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update book tracker");
  }
};

const deleteTracker = async (id) => {
  try {
    const trackerToDelete = await prisma.tracker.findUnique({
      where: { id: id },
    });

    if (!trackerToDelete) {
      throw new Error("Book at tracker status not found");
    }

    const filePath = `img-upload/${trackerToDelete.cover}`;
    await fs.unlink(filePath);

    const deleteTracker = await prisma.tracker.delete({
      where: { id: id },
    });

    return deleteTracker;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete book tracker");
  }
};

module.exports = { getTracker, createTracker, updateTracker, deleteTracker };
