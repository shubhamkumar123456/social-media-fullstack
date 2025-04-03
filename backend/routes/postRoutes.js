const { Router } = require("express");
const checkToken = require("../middleware/checkToken");

const {
  createPost,
  getAllPosts,
  updatePosts,
  deletePost,
  likePost,
  commentPost,
} = require("../controllers/postController");
const router = Router();

router.post("/create", checkToken, createPost);
router.get("/allPosts", getAllPosts);
router.put("/update/:postId", checkToken, updatePosts);
router.delete("/delete/:postId", checkToken, deletePost);
router.put("/likes/:postId", checkToken, likePost);
router.post("/comment/:postId", checkToken, commentPost);

module.exports = router;
