// code away!
// - Write and implement four custom `middleware` functions, detailed below.
// - Build an API to let clients perform CRUD operations on `users`.
// - Add endpoints to retrieve the list of `posts` for a `user` and to store a new `post` for a `user`.
const express = require("express");
const userRouter = require("../users/userRouter");

const server = express();
const port = 4000;

server.use(express.json());
server.use(userRouter);

server.use((req, res, next) => {
  const time = new Date().toISOString();
  console.log(`[${time}] ${req.ip} ${req.method} ${req.url}`);

  next();
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
