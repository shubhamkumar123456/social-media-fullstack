// socket/index.js
let users = new Map();

function socketHandler(io) {
  io.on('connection', (socket) => {
    console.log('New connection established:', socket.id);

    socket.on('newUser', (userId) => {
      console.log(userId);
      users.set(userId, socket.id);
      console.log(users);
    });

    socket.on('sendMessage', (ans) => {
      console.log(ans);
      if (users.has(ans.friendId)) {
        console.log("User exists in map");
        let friendSocketId = users.get(ans.friendId);
        console.log("friendSocketId = ", friendSocketId);
        if (friendSocketId) {
          socket.to(friendSocketId).emit('replyMessage', ans);
        }
      } else {
        console.log("User not found in map");
      }
    });

    socket.emit('fire', { msg: "My friend is injured, need backup" });
  });
}

module.exports = socketHandler;
