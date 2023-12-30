import patientService from "../service/patientService";

let appointmentBooking = async (req, res) => {
    try {
        return res.status(200).json(await patientService.appointmentBooking(req.body));
    } catch (e) {
        console.log(e);

        return res.status(200).json({
            code: -1,
            message: "Error Code From Server!",
        });
    }
}

let appointmentVerify = async (req, res) => {
    try {
        return res.status(200).json(await patientService.appointmentVerify(req.body));
    } catch (e) {
        console.log(e);

        return res.status(200).json({
            code: -1,
            message: "Error Code From Server!",
        });
    }
}

module.exports = {
    appointmentBooking: appointmentBooking,
    appointmentVerify: appointmentVerify
}