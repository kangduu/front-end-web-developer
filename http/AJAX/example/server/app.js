const express = require("express");
// const ejs = require("ejs");
const cors = require("cors");
const url = require("url");
const qs = require('qs')
const app = express();

// app.set("view engine", "html");
// app.engine(".html", ejs.__express);

// app.set("views", __dirname + "/views");

// app.use(express.static(__dirname + "public"));

app.use(require("body-parser").urlencoded({ extended: false }));


// CORS：允许跨域 （跨域资源共享(Cross Origin Resource Sharing)）
app.use(cors({
    credentials: true,
    origin: "*"
}))
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:8080");
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });

app.get("/*", function (req, res) {
    var pathname = url.parse(req.url).pathname;
    let resData = null;
    switch (pathname) {
        case '/ajax':
            resData = {
                code: 200,
                data: {
                    info: 'success'
                }
            }
            setTimeout(() => {
                res.end(JSON.stringify(resData))
            }, 1000);
            break;
        default:
            // res.end(`{code:1000,message:"error"}`)
            break;
    }
})

app.listen(3000, function () {
    console.log("In the Listening...")
})