import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";

let router = express.Router();

let initWebRouters = (app) => {
    router.get("/", homeController.getHomePage); //rest api

    router.get("/about", homeController.getAboutPage);

    router.get("/crud", homeController.getCRUD);

    router.post("/post-crud", homeController.postCRUD);

    router.get("/get-crud", homeController.displayGetCRUD);

    router.get("/edit-crud", homeController.getEditCRUD);

    router.post("/put-crud", homeController.putCRUD);

    router.get("/delete-crud", homeController.deleteCRUD);


    router.post("/api/login", userController.handleLogin);
    router.get("/api/get-All-Users", userController.handleGetAllUsers);
    router.post("/api/create-New-User", userController.handleCreateNewUser);
    router.put("/api/edit-User", userController.handleEditUser);
    router.delete("/api/delete-User", userController.handleDeleteUser);

    router.get("/api/allcodes", userController.getAllCodes);

    router.get("/api/top-doctors-home", doctorController.getTopDoctorHome);
    router.get("/api/get-all-doctors", doctorController.getAllDoctors);
    router.post("/api/save-doctor-info", doctorController.saveDoctorInfo);
    router.get("/api/get-doctor-by-id", doctorController.getDoctorById);

    return app.use("/", router);
};

module.exports = initWebRouters;
