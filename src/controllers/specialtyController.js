import specialtyService from "../service/specialtyService";

let createSpecialty = async (req, res) => {
    try {
        return res.status(200).json(await specialtyService.createSpecialty(req.body));
    } catch (e) {
        console.log(e);

        return res.status(200).json({
            code: -1,
            message: "Error Code From Server!",
        });
    }
}

let getAllSpecialties = async (req, res) => {
    try {
        return res.status(200).json(await specialtyService.getAllSpecialties());
    } catch (e) {
        console.log(e);

        return res.status(200).json({
            code: -1,
            message: "Error Code From Server!",
        });
    }
}

let updateSpecialty = async (req, res) => {
    try {
        return res.status(200).json(await specialtyService.updateSpecialty(req.body));
    } catch (e) {
        console.log(e);

        return res.status(200).json({
            code: -1,
            message: "Error Code From Server!",
        });
    }
}

let deleteSpecialty = async (req, res) => {
    try {
        return res.status(200).json(await specialtyService.deleteSpecialty(req.params.specialtyId));
    } catch (e) {
        console.log(e);

        return res.status(200).json({
            code: -1,
            message: "Error Code From Server!",
        });
    }
}

let getAllDoctorsInSpecialty = async (req, res) => {
    try {
        return res.status(200).json(await specialtyService.getAllDoctorsInSpecialty(req.query.id, req.query.location));
    } catch (e) {
        console.log(e);

        return res.status(200).json({
            code: -1,
            message: "Error Code From Server!",
        });
    }
}

let getSpecialtyById = async (req, res) => {
    try {
        return res.status(200).json(await specialtyService.getSpecialtyById(req.query.id));
    } catch (e) {
        console.log(e);

        return res.status(200).json({
            code: -1,
            message: "Error Code From Server!",
        });
    }
}

module.exports = {
    createSpecialty,
    getAllSpecialties,
    getSpecialtyById,
    updateSpecialty,
    deleteSpecialty,

}