import doctorService from "../service/doctorService";

let getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit;

    if (!limit) limit = 10;
    try {
        let response = await doctorService.getTopDoctorHome(+limit);

        return res.status(200).json(response);

    } catch (e) {
        console.log(e);
        return res.status(200).json({
            code: -1,
            message: "Error from Server!!",
        })
    }
}

let getAllDoctors = async (req, res) => {
    try {
        return res.status(200).json(await doctorService.getAllDoctors());
    } catch (e) {
        console.log(e);

        return res.status(200).json({
            code: -1,
            message: "Error Code From Server!",
        })
    }
}

let saveDoctorIntroduction = async (req, res) => {
    try {
        return res.status(200).json(await doctorService.saveDoctorIntroduction(req.body));
    } catch (e) {
        console.log(e);

        return res.status(200).json({
            code: -1,
            message: "Error Code From Server!",
        });
    }
}

let createDoctor = async (req, res) => {
    try {
        return res.status(200).json(await doctorService.createDoctor(req.body));
    } catch (e) {
        console.log(e);

        return res.status(200).json({
            code: -1,
            message: "Error Code From Server!",
        });
    }
}

let updateDoctor = async (req, res) => {
    try {
        return res.status(200).json(await doctorService.updateDoctor(req.body));
    } catch (e) {
        console.log(e);

        return res.status(200).json({
            code: -1,
            message: "Error Code From Server!",
        });
    }
}

let deleteDoctor = async (req, res) => {
    try {
        return res.status(200).json(await doctorService.deleteDoctor(req.params.doctorId));
    } catch (e) {
        console.log(e);

        return res.status(200).json({
            code: -1,
            message: "Error Code From Server!",
        });
    }
}

let getDoctorById = async (req, res) => {
    try {
        return res.status(200).json(await doctorService.getDoctorById(req.query.id));
    } catch (e) {
        console.log(e);

        return res.status(200).json({
            code: -1,
            message: "Error Code From Server!",
        });
    }
}

let bulkCreateSchedule = async (req, res) => {
    try {
        return res.status(200).json(await doctorService.bulkCreateSchedule(req.body));
    } catch (e) {
        console.log(e);

        return res.status(200).json({
            code: -1,
            message: "Error Code From Server!",
        });
    }
}

let getScheduleByDate = async (req, res) => {
    try {
        return res.status(200).json(await doctorService.getScheduleByDate(req.query.doctorId, req.query.date));
    } catch (e) {
        console.log(e);

        return res.status(200).json({
            code: -1,
            message: "Error Code From Server!",
        });
    }
}

let getDoctorInformationById = async (req, res) => {
    try {
        return res.status(200).json(await doctorService.getDoctorInformationById(req.query.doctorId));
    } catch (e) {
        console.log(e);

        return res.status(200).json({
            code: -1,
            message: "Error Code From Server!",
        });
    }
}

let getAllPatientsByDateAndDoctorId = async (req, res) => {
    try {
        return res.status(200).json(await doctorService.getAllPatientsByDateAndDoctorId(req.query.doctorId, req.query.date));
    } catch (e) {
        console.log(e);

        return res.status(200).json({
            code: -1,
            message: "Error Code From Server!",
        });
    }
}

let getAllSchedulesByDateAndDoctorId = async (req, res) => {
    try {
        return res.status(200).json(await doctorService.getAllSchedulesByDateAndDoctorId(req.query.doctorId, req.query.date));
    } catch (e) {
        console.log(e);

        return res.status(200).json({
            code: -1,
            message: "Error Code From Server!",
        });
    }
}

let sendPrescription = async (req, res) => {
    try {
        return res.status(200).json(await doctorService.sendPrescription(req.body));
    } catch (e) {
        console.log(e);

        return res.status(200).json({
            code: -1,
            message: "Error Code From Server!",
        });
    }
}

let getAllDoctorsBySpecialtyId = async (req, res) => {
    try {
        return res.status(200).json(await doctorService.getAllDoctorsBySpecialtyId(req.query.id, req.query.location));
    } catch (e) {
        console.log(e);

        return res.status(200).json({
            code: -1,
            message: "Error Code From Server!",
        });
    }
}
let getAllDoctorsByClinicId = async (req, res) => {
    try {
        return res.status(200).json(await doctorService.getAllDoctorsByClinicId(req.query.clinicId));
    } catch (e) {
        console.log(e);

        return res.status(200).json({
            code: -1,
            message: "Error Code From Server!",
        });
    }
}
module.exports = {
    getTopDoctorHome: getTopDoctorHome,

    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleByDate: getScheduleByDate,
    getDoctorInformationById: getDoctorInformationById,
    getAllPatientsByDateAndDoctorId,
    getAllSchedulesByDateAndDoctorId: getAllSchedulesByDateAndDoctorId,
    sendPrescription: sendPrescription,

    getAllDoctors,
    getDoctorById,
    updateDoctor,
    createDoctor,
    deleteDoctor,
    saveDoctorIntroduction,
    getAllDoctorsBySpecialtyId,
    getAllDoctorsByClinicId,
}