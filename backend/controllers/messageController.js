const ConversationCollection = require("../models/ConversationCollection");
const Message = require("../models/MessagesCollection");

const sendMessage = async (req, res) => {
  try {
    const { friendId } = req.params;
    const { _id } = req.user;
    const { text } = req.body;
    // const file = req.files

    let message = await Message.create({
      userId: _id,
      friendId,
      text,
    });
    let conversation = await ConversationCollection.findOne({
      members: { $all: [_id, friendId] },
    });
    if (!conversation) {
      conversation = await ConversationCollection.create({
        members: [_id, friendId],
      });
    }

    conversation.message.push(message._id);
    await conversation.save();

    res.status(201).json({ msg: "message send successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "error in send message ", error: error.message });
  }
};

const getMessage = async (req, res) => {
  const { _id } = req.user; //67f65bca4d9b19ab343c6b0c
  const { friendId } = req.params; //67dd1849870660033720e08b

  let conversation = await ConversationCollection.findOne({
    members: { $all: [_id, friendId] },
  })
    .populate({ path: "members", select: "-password" })
    .populate({path:"message"});

  res.json(conversation);
};

module.exports = {
  sendMessage,
  getMessage,
};
