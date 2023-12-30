import db from "../models/index";
require('dotenv').config();
import _ from "lodash";
import emailService from "./emailService";

let appointmentBooking = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const requiredFields = ['fullName', 'phoneNumber', 'email', 'address', 'reason', 'birthday', 'selectedGender', 'doctorId', 'timeType'];

            if (requiredFields.some(field => !data[field])) {
                // 'some' method is used to check if at least one required field is missing
                // It returns true if any of the conditions is true
                resolve({
                    code: 1,
                    message: "Missing required parameter!!",
                });
            } else {
                await emailService.sendSimpleEmail({
                    receivedFullName: data.fullName,
                    receivedEmail: data.email,
                    receivedTime: "8:00 - 9:00, Chủ Nhật 1/8/2022",
                    receivedDoctorName: "Nguyễn Duy Hưng",
                    receivedRedirectLink: "https://www.msn.com/en-us/money/markets/china-fires-back-at-u-s-sanctions/ar-AA1mc0QA?ocid=msedgntp&cvid=4ec6fbfaa98f446e99fd3fdf8d86500f&ei=6",
                });

                let [user,] = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: "R3",
                    }
                });

                if (user) {
                    let [, created] = await db.Booking.findOrCreate({
                        where: {
                            timeType: data.timeType,
                            doctorId: data.doctorId,
                        },
                        defaults: {
                            statusId: "S1",
                            doctorId: data.doctorId,
                            patientId: user.id,
                            date: String(data.birthday),
                            timeType: data.timeType,
                            reason: data.reason,
                        }
                    });

                    if (created === true) {
                        resolve({
                            code: 0,
                            message: 'Booking Appointment Successfully!',
                        })
                    } else {
                        resolve({
                            code: 2,
                            message: 'Booking Unsuccessfully!',
                        })
                    }
                }
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    appointmentBooking: appointmentBooking,
}