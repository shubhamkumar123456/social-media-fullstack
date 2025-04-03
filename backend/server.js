const express = require("express");
const app = express();
const port = 8080;
require("dotenv").config();
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");

const connection = require("./config/db"); // connectToDb -->function
connection();

const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

app.use(
  cors({
    origin: "http://localhost:5173", // Specify your frontend's URL
    credentials: true, // Allow cookies and authorization headers
  })
);
app.use(express.json());

const upload = multer({ dest: 'uploads/' })// Use storage

app.set("view engine", "ejs");


app.post("/uploads", upload.array("files", 10), function (req, res) {
 

  console.log(req.files);
  console.log(req.body);
  res.json({ message: "Files uploaded successfully.", files: req.files });
});

app.use("/users", userRoutes);
app.use("/post", postRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
