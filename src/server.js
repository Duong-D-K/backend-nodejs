import express from "express";
import bodyParser from "body-parser"; //thư viện này hỗ trợ lấy được các param mà client sử dụng cho chúng ta
import viewEngine from "./config/viewEngine";
import initWebRouters from "./route/web";
import connectDB from "./config/connectDB";
require("dotenv").config(); //giúp chạy được dòng let port = process.env.PORT || 6969

let app = express();

//config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRouters(app);

connectDB();

let port = process.env.PORT || 6969; //lấy tham số PORT ở trong thư mục envv
app.listen(port, () => {
    //callback
    console.log("Backend Nodejs is running on the port: " + port);
});
