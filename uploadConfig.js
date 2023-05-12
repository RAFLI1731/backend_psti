const multer = require("multer");
const path = require("path");
const MAX_SIZE = 200000000;
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./assets/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      return callback(null, false);
    }
    callback(null, true);
  },
  limits: {
    fileSize: MAX_SIZE,
  },
});

const cekNull = (fileUpload) => {
  if (fileUpload === undefined || fileUpload === null) {
    return null;
  } else {
    return fileUpload[0].filename;
  }
};

module.exports = { multer, upload, cekNull };
