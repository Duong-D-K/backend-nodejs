import db from "../models/index";
require('dotenv').config();
import _ from "lodash";

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