import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
import patientController from "../controllers/patientController";
import specialtyController from "../controllers/specialtyController";
import clinicController from "../controllers/clinicController";

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
    router.delete('/api/delete-User/:userId', userController.handleDeleteUser);


    router.get("/api/allcodes", userController.getAllCodes);

    router.get("/api/get-All-Provinces", userController.getAllProvinces);
    router.get("/api/get-District-By-ProvinceId", userController.getDistricByProvinceId);

    router.get("/api/top-doctors-home", doctorController.getTopDoctorHome);


    router.get("/api/get-doctor-by-id", doctorController.getDoctorById);
    router.get("/api/get-all-doctors", doctorController.getAllDoctors);
    router.post("/api/create-doctor", doctorController.createDoctor);
    router.post("/api/save-doctor-introduction", doctorController.saveDoctorIntroduction);
    router.put("/api/update-doctor", doctorController.updateDoctor);
    router.delete('/api/delete-doctor/:doctorId', doctorController.deleteDoctor);
    router.get("/api/get-all-doctors-by-specialtyId", doctorController.getAllDoctorsBySpecialtyId);
    router.get("/api/get-all-doctors-by-clinicId", doctorController.getAllDoctorsByClinicId);

    router.get("/api/get-schedule-by-date", doctorController.getScheduleByDate);
    router.get("/api/get-all-patients-by-date-and-doctorId", doctorController.getAllPatientsByDateAndDoctorId);
    router.get("/api/get-all-schedules-by-date-and-doctorId", doctorController.getAllSchedulesByDateAndDoctorId);


    router.post("/api/send-prescription", doctorController.sendPrescription);

    router.post("/api/bulk-create-schedule", doctorController.bulkCreateSchedule);

    router.get("/api/get-doctor-infomation-by-id", doctorController.getDoctorInformationById);

    router.post("/api/appointment-booking", patientController.appointmentBooking);

    router.post("/api/examination-verification", patientController.examinationVerification);


    router.get("/api/get-specialty-by-id", specialtyController.getSpecialtyById);
    router.get("/api/get-all-specialties", specialtyController.getAllSpecialties);
    router.post("/api/create-specialty", specialtyController.createSpecialty);
    router.put("/api/update-specialty", specialtyController.updateSpecialty);
    router.delete('/api/delete-specialty/:specialtyId', specialtyController.deleteSpecialty);

    // router.get("/api/get-specialty-by-id", specialtyController.getSpecialtyById); 

    router.get("/api/get-all-clinics", clinicController.getAllClinics);
    router.get("/api/get-clinic-by-id", clinicController.getClinicById);
    router.post("/api/create-clinic", clinicController.createClinic);
    router.put("/api/update-clinic", clinicController.updateClinic);
    router.delete('/api/delete-clinic/:clinicId', clinicController.deleteClinic);

    return app.use("/", router);
};

module.exports = initWebRouters;
