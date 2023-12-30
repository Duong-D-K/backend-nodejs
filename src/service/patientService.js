import db from "../models/index";
require('dotenv').config();
import _ from "lodash";
import emailService from "./emailService";

let appointmentBooking = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("data", data);

            const requiredFields = [
                'fullName',
                'phoneNumber',
                'email',
                'address',
                'reason',
                'birthday',
                'selectedGender',
                'doctorId',
                'appointmentTime'];

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
                    receivedTime: data.timeString,
                    receivedDoctorName: data.doctorString,
                    receivedRedirectLink: "https://www.msn.com/en-us/money/markets/china-fires-back-at-u-s-sanctions/ar-AA1mc3kH?ocid=msedgntp&cvid=cf28241c1a554e48bd5db4f3352e1fe0&ei=7",
                    receivedLanguage: data.language,
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
                            appointmentTime: data.appointmentTime,
                            doctorId: data.doctorId,
                        },
                        defaults: {
                            statusId: "S1",
                            doctorId: data.doctorId,
                            patientId: user.id,
                            appointmentDate: data.appointmentDate,
                            appointmentTime: data.appointmentTime,
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