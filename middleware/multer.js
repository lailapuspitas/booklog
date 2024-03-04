const multer = require("multer");
const fs = require("fs");

const imgUploadDir = "img-upload";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync(imgUploadDir)) {
      fs.mkdirSync(imgUploadDir);
    }
    cb(null, imgUploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = file.originalname.split(".").pop();
    const fileName = `${uniqueSuffix}.${fileExtension}`;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];

  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only JPEG, JPG, and PNG are allowed."),
      false
    );
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
});

module.exports = { upload };
