const express = require("express");
const app = express();
const server = require('http').createServer(app);
const port = 8080;
require("dotenv").config();
const cors = require("cors");
const connection = require("./config/db"); // connectToDb -->function
connection();

const io = require('socket.io')(server);

const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const messageRoutes = require("./routes/messageRoutes");
const fileUpload = require("express-fileupload");

app.use(
  cors({
    origin: "http://localhost:5173", // Specify your frontend's URL
    credentials: true, // Allow cookies and authorization headers
  })
);
app.use(express.json());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/", // or any dir like "./uploads"
  })
);
app.set("view engine", "ejs");


io.on('connection', (socket) => {
  console.log('new connection stablished', socket.id)

  socket.on('msg',(ans)=>{
    console.log(ans)
  })

  socket.emit('fire', {msg:"my friend is injured need backup"})

});



app.use("/users", userRoutes);
app.use("/post", postRoutes);
app.use("/message", messageRoutes);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
