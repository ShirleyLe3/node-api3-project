//-------------------------------------------------------
//              Index.js
//-------------------------------------------------------

// const express = require("express");
// const welcomeRouter = require("./welcome/welcome-router");
// const usersRouter = require("./users/users-router");

// const server = express();
// const port = 4000;

// server.use(express.json());
// server.use(welcomeRouter);
// server.use(useRouter);

// server.get("/", (req, res) => {
//   res.json({
//     message: "Welcome to our API",
//   });
// });

// server.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });

//--------------------------------------------------------------
//              userRouter.js
//--------------------------------------------------------------
// const express = require('express');
// const users = require('./usersDb');
// const router = express.Router();

// router.post('/', (req, res) => {
//   // do your magic!
// });

// router.post('/:id/posts', (req, res) => {
//   // do your magic!
// });

// router.get('/', (req, res) => {
//   // do your magic!
// });

// router.get('/:id', (req, res) => {
//   // do your magic!
// });

// router.get('/:id/posts', (req, res) => {
//   // do your magic!
// });

// router.delete('/:id', (req, res) => {
//   // do your magic!
// });

// router.put('/:id', (req, res) => {
//   // do your magic!
// });

// // CUSTOM MIDDLEWARE

//   // all endpoints that include an `id` parameter in the url (ex: `/api/users/:id`)

// function validateUserId(req, res, next) {
//   //  if the `id` parameter is valid, store that user object as `req.user`
//   //  if the `id` parameter does not match any user id in the database, cancel the request and respond with status `400` and `{ message: "invalid user id" }`
// }

// function validateUser(req, res, next) {
//   //  if the request `body` is missing, cancel the request and respond with status `400` and `{ message: "missing user data" }`
//   //  if the request `body` is missing the required `name` field, cancel the request and respond with status `400` and `{ message: "missing required name field" }`
// }

// function validatePost(req, res, next) {
//   // if the request `body` is missing, cancel the request and respond with status `400` and `{ message: "missing post data" }`
//   //  if the request `body` is missing the required `text` field, cancel the request and respond with status `400` and `{ message: "missing required text field" }
// }

// module.exports = router;

// - `logger` logs to the console the following information about each request: request method, request url, and a timestamp
// this middleware runs on every request made to the API

// function logger(req, res, next) {
//     console.log(
//       `[${new Date().toISOString()}]
//       ${req.method} to ${req.url} from ${req.get(
//         'Origin'
//       )}`
//     );

//     next();
//   }
