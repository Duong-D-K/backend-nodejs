import express from "express";
import homeController from "../controllers/homeController";

let router = express.Router();

let initWebRouters= (app) => {
    router.get("/", homeController.getHomePage);//rest api

    router.get("/about", homeController.getAboutPage);

    return app.use("/", router);
}

module.exports = initWebRouters;