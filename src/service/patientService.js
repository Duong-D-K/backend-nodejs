import db from "../models/index";
require('dotenv').config();
import _ from "lodash";

let appointmentBooking = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.timeType || !data.date) {
                resolve({
                    code: 1,
                    message: "Missing required parameter!!",
                });
            } else {
                let [user, created] = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: "R3",
                    }
                });

                if (user) {
                    let [, result] = await db.Booking.findOrCreate({
                        where: {
                            timeType: data.timeType,
                            doctorId: data.doctorId,
                        },
                        defaults: {
                            statusId: "S1",
                            doctorId: data.doctorId,
                            patientId: user.id,
                            date: data.date,
                            timeType: data.timeType,
                        }
                    });

                    if (result === true) {
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