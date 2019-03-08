const express = require("express");
const router = express.Router();
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const database = require("../config/database");
const UpLoadController = require("../controllers/upload");

const storage = new GridFsStorage({
  url: database.connection,

  file: (req, file) => {
    if (file.mimetype === "image/jpeg") {
      return {
        bucketName: "productImg",
        filename: file.originalname
      };
    } else {
      return null;
    }
  }
});

const upload = multer({ storage });

router.post("/uploadProduct", upload.single("file"), UpLoadController.upLoad);

module.exports = router;
