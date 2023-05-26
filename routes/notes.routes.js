const express = require("express");
const router = express.Router();
const database = require("../utils/database");

router.get("/", async (req, res) => {
  //sử dụng database lấy về toàn bộ user
  try {
    let data = await database.execute("SELECT * FROM keepnote.notes;");
    let [title] = data;
    console.log(title);
    // let users = data[0];
    res.json({
      status: "success",
      title,
    });
  } catch (error) {
    console.log(error);
  }
  // response về cho client
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const query = "";
  res.json({ message: "1 user" });
});

router.post("/", async (req, res) => {
  console.log(req.body);
  let title = req.body.title;
  try {
    await database.execute(
      `INSERT INTO keepnote.notes (title) VALUES ('${title}')`
    );
    console.log("post oke");
    // let users = data[0];
    res.json({
      status: "post success",
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "post error",
    });
  }
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const query = "";
  res.json({ message: "update sucessfully!" });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await database.execute(
      `DELETE FROM keepnote.notes WHERE (noteId = ${id});`
    );
    console.log("delete oke");
    // let users = data[0];
    res.json({
      status: "delete success",
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "delete error",
      error,
    });
  }
});

module.exports = router;
