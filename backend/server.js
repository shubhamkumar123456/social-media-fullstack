const express = require("express");
const app = express();
const port = 8080;
require("dotenv").config();
const cors = require("cors");
const connection = require("./config/db"); // connectToDb -->function
connection();

const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const fileUpload = require("express-fileupload");

app.use(
  cors({
    origin: "http://localhost:5173", // Specify your frontend's URL
    credentials: true, // Allow cookies and authorization headers
  })
);
app.use(express.json());

app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));

app.set("view engine", "ejs");


app.use("/users", userRoutes);
app.use("/post", postRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
