const express = require('express');
const app = express();

// app.all("*", function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By", ' 3.2.1')
//     res.header("Content-Type", "application/json;charset=utf-8");
//     next();
// });

app.get("/user", function (res, res) {
    console.log(res)
    res.send("Axios")
})

const port = 3000;

app.listen(port, () => {
    console.log(`Server running...`)
});