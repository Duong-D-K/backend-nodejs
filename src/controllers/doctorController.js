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
        let doctors = await doctorService.getAllDoctors();

        return res.status(200).json(doctors);
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
        let response = await doctorService.saveDoctorInfo(req.body);

        return res.status(200).json(response);
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
module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors: getAllDoctors,
    saveDoctorInfo: saveDoctorInfo,
    getDoctorById: getDoctorById,
}