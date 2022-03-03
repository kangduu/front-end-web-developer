const cors = require("cors");
const express = require("express");
const app = express();

// CORS：允许跨域 （跨域资源共享(Cross Origin Resource Sharing)）
app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);

// app.all("*", function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//   res.header("X-Powered-By", " 3.2.1");
//   res.header("Content-Type", "application/json;charset=utf-8");
//   next();
// });

app.get("/user", function (req, res) {
  setTimeout(() => {
    const response = {
      code: 200,
      data: {
        id: 123,
        name: "duk",
      },
      message: "success",
    };
    res.send(response);
  }, 3 * 1000);
});

const port = 3008;

app.listen(port, () => {
  console.log(`Server running at port http://localhost:3008...`);
});
