import clinicService from "../service/clinicService";

let createClinic = async (req, res) => {
    try {
        return res.status(200).json(await clinicService.createClinic(req.body));
    } catch (e) {
        console.log(e);

        return res.status(200).json({
            code: -1,
            message: "Error Code From Server!",
        });
    }
}

let getAllClinics = async (req, res) => {
    try {
        return res.status(200).json(await clinicService.getAllClinics());
    } catch (e) {
        console.log(e);

        return res.status(200).json({
            code: -1,
            message: "Error Code From Server!",
        });
    }
}

let getClinicById = async (req, res) => {
    try {
        return res.status(200).json(await clinicService.getClinicById(req.query.id));
    } catch (e) {
        console.log(e);

        return res.status(200).json({
            code: -1,
            message: "Error Code From Server!",
        });
    }
}

let updateClinic = async (req, res) => {
    try {
        return res.status(200).json(await clinicService.updateClinic(req.body));
    } catch (e) {
        console.log(e);

        return res.status(200).json({
            code: -1,
            message: "Error Code From Server!",
        });
    }
}

let deleteClinic = async (req, res) => {
    try {
        return res.status(200).json(await clinicService.deleteClinic(req.params.clinicId));
    } catch (e) {
        console.log(e);

        return res.status(200).json({
            code: -1,
            message: "Error Code From Server!",
        });
    }
}
module.exports = {
    createClinic,
    getAllClinics,
    updateClinic,
    getClinicById: getClinicById,
    deleteClinic,
}