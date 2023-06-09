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

module.exports = {
    getTopDoctorHome: getTopDoctorHome,
}