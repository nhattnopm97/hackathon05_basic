const express = require("express");
const router = express.Router();
const database = require("../utils/database");

const checkIsEmpty = (field) => {
  if (field === undefined || field === null || field === "") return true;
  else return false;
};

const validateData = (req, res, next) => {
  const { Content, Due_date, Status, User_name } = req.body;
  if (
    checkIsEmpty(Content) ||
    checkIsEmpty(Due_date) ||
    checkIsEmpty(Status) ||
    checkIsEmpty(User_name)
  ) {
    return res.status(404).json({
      message: "Input blank",
    });
  }
  next();
};

router.get("/", async (req, res) => {
  //sử dụng database lấy về toàn bộ user
  try {
    let data = await database.execute("SELECT * FROM course.tbl_courses");
    let [courses] = data;
    // let users = data[0];
    res.json({
      status: "success",
      courses,
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
  console.log("aaaaaa", req.body);
  const { content, due_date, status, name } = req.body;
  try {
    await database.execute(
      `INSERT INTO course.tbl_courses (due_date, status, name, content) VALUES ('${due_date}', '${status}', '${name}', '${content}')`
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

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  let { content, due_date, status, name } = req.body;
  console.log(due_date);
  due_date = due_date.split("T")[0];
  console.log(due_date);
  try {
    await database.execute(
      `UPDATE course.tbl_courses SET due_date = '${due_date}', status = '${status}', name = '${name}', content = '${content}' WHERE (id ='${id}')`
    );
    // let users = data[0];
    res.json({
      status: "update oke success",
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "post error",
    });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  console.log("aaaaaaaaaaaaaaaaaaaa", id);
  try {
    await database.execute(
      `DELETE FROM course.tbl_courses WHERE (id = ${id});`
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
