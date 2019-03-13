const express = require("express");
const router = express.Router();
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const database = require("../config/database");
const UpLoadController = require("../controllers/upload");
const FileController = require("../controllers/file");

const storage = new GridFsStorage({
  url: database.connection,

  file: (req, file) => {
    //console.log(req);
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      return {
        bucketName: "product",
        filename: file.originalname
      };
    } else {
      return null;
    }
  }
});

const upload = multer({ storage });

router.post("/uploadProduct", upload.single("file"), UpLoadController.upLoad);
router
  .get("/fetchProducts", FileController.fetchProducts)
  .get("/image/:id", FileController.getImage);

module.exports = router;
