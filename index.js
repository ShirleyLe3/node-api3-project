// code away!
// - Write and implement four custom `middleware` functions, detailed below.
// - Build an API to let clients perform CRUD operations on `users`.
// - Add endpoints to retrieve the list of `posts` for a `user` and to store a new `post` for a `user`.
require('dotenv').config();
const server = require("./server");
const port = 5000;



server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
