const PostCollection = require("../models/postCollection");

exports.createPost = async (req, res) => {
  try {
    const { title } = req.body;
    const { _id } = req.user;
    // req.files --> gives and array of objects
    // const {file} = req.files


    console.log(req.body);
    console.log(req.files)
    // let post = await PostCollection.create({
    //     title,
    //     file,
    //     userId:_id
    // })

    res.status(201).json({ msg: "post created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, msg: "error in post controller" });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    let allPosts = await PostCollection.find().populate({
      path: "userId",
      select: "-password",
    });
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
