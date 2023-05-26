const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const cors = require("cors");

//import
const coursesRouter = require("./routes/courses.routes");

server.use(express.static("./public"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static("./public"));
server.use(cors());
server.use("/api/v1/courses", coursesRouter);

// server.get("/", (req, res) => {
//   res.json({ message: "heloo World!" });
// });

// server.get("/api/v1/notes", (req, res) => {});

server.listen(3456, () => {
  console.log("server listening at http://localhost:3456");
});
