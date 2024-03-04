const { prisma } = require("../config/prisma");
const trackerService = require("../service/tracker-service");

const getTracker = async (req, res) => {
  try {
    const tracker = await trackerService.getTracker();
    res.status(200).json({
      message: "Success in retrieving data!",
      data: tracker,
    });
  } catch (error) {
    console.error("Error fetching data: " + error);
    res.status(500).json({
      message: "Error fetching data",
    });
  }
};

const createTracker = async (tracker) => {
  try {
    tracker.no_pages = parseInt(tracker.no_pages);
    const createdTracker = await prisma.tracker.create({
      data: {
        cover: tracker.cover,
        title: tracker.title,
        no_pages: tracker.no_pages,
        start_date: tracker.start_date,
        progress: tracker.progress,
      },
    });
    return createdTracker;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add new book tracker");
  }
};

const updateTracker = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const tracker = req.body;
    const updatedTracker = await catatanTracker.updateTracker(id, tracker);

    res.status(200).json({
      message: "Success in updating data!",
      data: updatedTracker,
    });
  } catch (error) {
    console.error("Error updating data: " + error);
    res.status(500).json({
      message: "Error updating data",
    });
  }
};

const deleteTracker = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deletedTracker = await trackerService.deleteTracker(id);
    res.status(200).json(deletedTracker);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getTracker, createTracker, updateTracker, deleteTracker };
