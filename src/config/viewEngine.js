import express from "express";

let configViewEngine = (app) => {
    //arrow function
    app.use(express.static("./src/public"));//sau này nếu muốn lấy ảnh trên server thì ta phải nói cho Express rằng cái ảnh trên server chỉ được lấy trong thư mục 'public'
    app.set("view engine", "ejs");// ejs tương tự như jsp trong java
    app.set("views", "./src/views");//config tất cả file đưa ra phải nằm trong folder /scr/views

}

module.exports = configViewEngine;