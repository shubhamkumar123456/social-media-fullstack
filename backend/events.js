const { EventEmitter } = require("events");

const myEmitter = new EventEmitter();

let snakeSize = 2;

myEmitter.on("eat", () => {
  snakeSize = snakeSize + 2;
  console.log(snakeSize);
});

myEmitter.on("wall", () => {
  snakeSize = 0;
  console.log(snakeSize)
  console.log("crashed !, game over");
});

myEmitter.emit("eat");
myEmitter.emit("eat");
myEmitter.emit("eat");
myEmitter.emit("eat");

myEmitter.emit('wall')
