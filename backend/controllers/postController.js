const PostCollection = require("../models/postCollection");
const cloudinary = require('./Cloudinary')
exports.createPost = async (req, res) => {
  const { _id } = req.user;
  const { title } = req.body;
  let file = req.files || '';

  console.log("Received files:", file);

  try {
    let newArray = [];

    if (file && file.file) {
      // Normalize to array
      const fileArray = Array.isArray(file.file) ? file.file : [file.file];

      // Upload each file to Cloudinary
      const uploadPromises = fileArray.map((f) =>
        cloudinary.uploader.upload(f.tempFilePath, {
          folder: "uploads",
          resource_type: "auto",
        })
      );

      const results = await Promise.all(uploadPromises);

      newArray = results.map((ele) => ({
        public_id: ele.public_id,
        url: ele.secure_url,
      }));
    }

    // Save post with or without files
    const post = await PostCollection.create({
      title,
      file: newArray,
      userId: _id,
    });

    return res.status(201).json({ message: "Post created", post });

  } catch (error) {
    console.error("Upload Error:", error);
    return res.status(500).json({ error: error.message });
  }
};


exports.getAllPosts = async (req, res) => {
  try {
    let allPosts = await PostCollection.find().populate({
      path: "userId",
      select: [ "profilePic", "firstName" ,"lastName"]
    }).populate({path:'comments',populate:{path:'user',select:'firstName lastName profilePic'}});
    res.status(200).json(allPosts);
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, msg: "error in getting all post" });
  }
};

exports.updatePosts = async (req, res) => {
  try {
    let { postId } = req.params;
    let { title } = req.body;
    let { _id } = req.user;

    console.log(_id);
    console.log(title);
    console.log(postId);

    // let post = await PostCollection.findById(postId);
    let post = await PostCollection.findOne({ _id: postId, userId: _id });

    if (!post) {
      return res.status(404).json({ msg: "post not found" });
    }

    post.title = title;
    await post.save();
    res.status(200).json({ msg: "post updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, msg: "error in getting all post" });
  }
};

exports.deletePost = async (req, res) => {
  let { postId } = req.params;
  let { _id } = req.user;
  try {
    let post = await PostCollection.findOne({ _id: postId, userId: _id });
    if (post) {
      post = await PostCollection.findByIdAndDelete(postId);
      res.status(200).json({ msg: "post deleted successfully" });
    } else {
      return res.status(404).json({ msg: "post not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, msg: "error in deleting post" });
  }
};

exports.likePost = async (req, res) => {
  const { postId } = req.params;
  const { _id } = req.user;

  try {
    let post = await PostCollection.findById(postId);

    if (post) {
      if (post.likes.includes(_id)) {
        post.likes.pull(_id);
        await post.save();
        res.status(200).json({ msg: "post disliked successfully" });
      } else {
        post.likes.push(_id);
        await post.save();
        res.status(200).json({ msg: "post liked successfully" });
      }
    } else {
      res.status(400).json({ msg: "post not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message, msg: "error in like post" });
  }
};

exports.commentPost = async (req, res) => {
  try {
    const { text } = req.body;
    const { postId } = req.params;
    const { _id } = req.user;

    let post = await PostCollection.findById(postId);
    post.comments.push({ user: _id, text: text });
    await post.save();

    res.status(200).json({ msg: "comment added successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "error in adding comment", error: error.messsage });
  }
};

exports.userPosts = async(req,res)=>{
  try {
    const {_id} = req.user;
  let posts = await PostCollection.find({userId:_id}).populate({
    path: "userId",
    select: [ "profilePic", "firstName" ,"lastName"]
  }).populate({path:'comments',populate:{path:'user',select:'firstName lastName profilePic'}});
  res.status(200).json({posts})
  } catch (error) {
    res.status(500).json({msg:"error in user posts",error:error.message})
  }
}
