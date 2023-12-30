import db from "../models/index";
require('dotenv').config();
import _ from "lodash";
import emailService from "./emailService";
import { v4 as uuidv4 } from 'uuid';

let appointmentBooking = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let requiredFields = [
                'fullName',
                'phoneNumber',
                'email',
                'address',
                'reason',
                'birthday',
                'selectedGender',
                'doctorId',
                'appointmentTime',
                'language',
                'appointmentDate',
                'timeString',
                'doctorString',
            ];

            if (requiredFields.some(field => !data[field])) {
                // 'some' method is used to check if at least one required field is missing
                // It returns true if any of the conditions is true
                resolve({
                    code: 1,
                    message: "Missing required parameter!!",
                });
            } else {
                let token = uuidv4();

                let [user,] = await db.Patient.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        password: "",
                        fullName: data.fullName,
                        address: data.address,
                        phoneNumber: data.phoneNumber,
                        gender: data.selectedGender,
                        image: "",
                        birthday: data.birthday,
                        active: false,
                    }
                });

                if (user) {
                    let [, created] = await db.Booking.findOrCreate({
                        where: {
                            appointmentDate: data.appointmentDate,
                            doctorId: data.doctorId,
                            patientId: user.id,
                        },
                        defaults: {
                            statusId: "S1",
                            doctorId: data.doctorId,
                            patientId: user.id,
                            appointmentDate: data.appointmentDate,
                            appointmentTime: data.appointmentTime,
                            reason: data.reason,
                            token: token,
                        }
                    });

                    if (created === true) {
                        await emailService.sendSimpleEmail({
                            receivedFullName: data.fullName,
                            receivedEmail: data.email,
                            receivedTime: data.timeString,
                            receivedDoctorName: data.doctorString,
                            receivedRedirectLink: `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${data.doctorId}&patientId=${user.id}`,

                            receivedLanguage: data.language,
                        });

                        resolve({
                            code: 0,
                            message: 'Booking Appointment Successfully!',
                        })
                    } else {
                        resolve({
                            code: 2,
                            message: 'Vui Lòng Thay Đổi Bác Sĩ Hoặc Chọn Ngày Khác!',
                        })
                    }
                }
            }
        } catch (e) {
            reject(e);
        }
    })
}

let appointmentVerify = (data) => {
    return new Promise(async (resolve, reject) => {
        console.log("data", data);
        try {
            let requiredFields = ["token", "doctorId", "patientId"];

            if (requiredFields.some(field => !data[field])) {
                resolve({
                    code: 1,
                    message: "Missing required parameter!!",
                });
            } else {
                let appointment = await db.Booking.findOne({
                    where: {
                        token: data.token,
                        doctorId: data.doctorId,
                        patientId: data.patientId,
                        statusId: "S1"
                    },
                    raw: false,
                });

                if (appointment) {
                    appointment.statusId = "S2";
                    await appointment.save();

                    resolve({
                        code: 0,
                        message: "Verify Appointment Successful!"
                    })
                } else {
                    resolve({
                        code: 2,
                        message: "Appointment hasn't been activated of doesn't exsit!"
                    })
                }
            }
        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    appointmentBooking: appointmentBooking,
    appointmentVerify: appointmentVerify,
}