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

let saveDoctorInfo = async (req, res) => {
    try {
        return res.status(200).json(await doctorService.saveDoctorInfo(req.body));
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

module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors: getAllDoctors,
    saveDoctorInfo: saveDoctorInfo,
    getDoctorById: getDoctorById,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleByDate: getScheduleByDate,
    getDoctorInformationById: getDoctorInformationById,
    getAllPatientsByDateAndDoctorId,
}