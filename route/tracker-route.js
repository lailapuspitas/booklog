const express = require("express");
const multer = require("multer");
const { upload } = require("../middleware/multer");
const trackerController = require("../controller/tracker-controller");
const trackerRoute = express.Router();

trackerRoute.get("/", trackerController.getTracker);
trackerRoute.post("/", upload.single("cover"), async (req, res) => {
  try {
    const tracker = req.body;

    tracker.cover = req.file.filename;
    const createdTracker = await trackerController.createTracker(tracker);
    res.status(201).json({
      message: "New tracker succesfully added",
      data: createdTracker,
    });
  } catch (error) {
    console.error("Error creating data: " + error);
    res.status(500).json({
      message: "Error creating data",
    });
  }
});
trackerRoute.put("/:id", trackerController.updateTracker);
trackerRoute.delete("/:id", trackerController.deleteTracker);

module.exports = { trackerRoute };
