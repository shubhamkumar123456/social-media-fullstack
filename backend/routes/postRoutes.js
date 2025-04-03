const { Router } = require("express");
const checkToken = require("../middleware/checkToken");
const multer = require("multer");
const path = require("path");
const {
  createPost,
  getAllPosts,
  updatePosts,
  deletePost,
  likePost,
  commentPost,
} = require("../controllers/postController");


const router = Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads")); // Ensure correct path
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/create", checkToken, createPost);
router.get("/allPosts", getAllPosts);
router.put("/update/:postId", checkToken, updatePosts);
router.delete("/delete/:postId", checkToken, deletePost);
router.put("/likes/:postId", checkToken, likePost);
router.post("/comment/:postId", checkToken, commentPost);

module.exports = router;
