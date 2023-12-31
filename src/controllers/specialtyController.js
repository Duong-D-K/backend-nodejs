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
module.exports = {
    createSpecialty: createSpecialty,
    getAllSpecialties: getAllSpecialties

}