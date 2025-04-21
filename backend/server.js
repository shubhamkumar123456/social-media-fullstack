// server.js

const express = require("express");
const http = require("http");
const cors = require("cors");
const fileUpload = require("express-fileupload");
require("dotenv").config();

const connection = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const messageRoutes = require("./routes/messageRoutes");

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 8080;

// Connect to DB
connection();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.set("view engine", "ejs");

// Routes
app.use("/users", userRoutes);
app.use("/post", postRoutes);
app.use("/message", messageRoutes);

// Setup socket
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  }
});
const socketHandler = require("./socket");
socketHandler(io);

// Start server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
