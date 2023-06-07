import express from "express";
import bodyParser from "body-parser"; //thư viện này hỗ trợ lấy được các param mà client sử dụng cho chúng ta
import viewEngine from "./config/viewEngine";
import initWebRouters from "./route/web";
import connectDB from "./config/connectDB";
import cors from "cors";
require("dotenv").config(); //giúp chạy được dòng let port = process.env.PORT || 6969

let app = express();

app.use(cors({ credentials: true, origin: true }));

//config app
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

viewEngine(app);
initWebRouters(app);

connectDB();

let port = process.env.PORT || 6969; //lấy tham số PORT ở trong thư mục envv
app.listen(port, () => {
    //callback
    console.log("Backend Nodejs is running on the port: " + port);
});
