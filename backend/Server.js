
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

const fs = require('fs');
const uploadDir = './upload';

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Store uploaded photos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Photo upload API
app.post("/upload", upload.single("file"), (req, res) => {
  res.json({
    message: "Photo uploaded successfully!",
    file: req.file.filename
  });
});

// Start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
