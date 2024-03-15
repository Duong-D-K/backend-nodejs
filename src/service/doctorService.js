import db from "../models/index";
require('dotenv').config();
import _ from "lodash";
import emailService from "../service/emailService";

let getTopDoctorHome = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                where: { roleId: "R2", },
                limit: limit,
                order: [["createdAt", "DESC"]],
                attributes: { exclude: ["password"] },
                include: [
                    { model: db.Allcode, as: "positionData", attributes: ["valueEn", "valueVi"] },
                    { model: db.Allcode, as: "genderData", attributes: ["valueEn", "valueVi"] },
                ],
                raw: true,
                nest: true,
            });

            resolve({
                code: 0,
                data: users,
            });
        } catch (e) {
            reject(e);
        }
    });
}

let getAllDoctors = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                where: { roleId: "R2" },
                attributes: { exclude: ["password", "createdAt", "updatedAt", "positionId", "specialtyId", "gender", "paymentId", "priceId"] },
                include: [
                    { model: db.Allcode, as: "positionData", attributes: ["keyMap", "valueEn", "valueVi"] },
                    { model: db.Allcode, as: "genderData", attributes: ["keyMap", "valueEn", "valueVi"] },
                    { model: db.Allcode, as: "priceData", attributes: ["keyMap", "valueEn", "valueVi"] },
                    { model: db.Allcode, as: "paymentData", attributes: ["keyMap", "valueEn", "valueVi"] },
                    { model: db.Specialty, attributes: ["id", "nameVi", "nameEn"] },
                    { model: db.Clinic, attributes: ["id", "name"] },
                ],
                raw: false,
                nest: true,
            });

            resolve({
                code: 0,
                data: doctors,
            });
        } catch (e) {
            reject(e);
        }
    })
}

let saveDoctorIntroduction = (doctor) => {
    return new Promise(async (resolve, reject) => {
        try {
            let requiredFields = ["doctorId", "contentHTML", "contentMarkdown", "introduction", "note"];

            if (requiredFields.some(field => !doctor[field])) {
                let missingField = requiredFields.find(field => !doctor[field]);
                resolve({
                    code: 1,
                    message: `Missing Parameter: ${missingField}`,
                })
            } else {
                let data = await db.User.findOne({
                    where: { id: doctor.doctorId },
                    attributes: ["contentHTML", "contentMarkdown", "introduction", "note", "id"],
                    raw: false,
                });

                if (data) {
                    data.contentHTML = doctor.contentHTML;
                    data.contentMarkdown = doctor.contentMarkdown;
                    data.introduction = doctor.introduction;
                    data.note = doctor.note;
                }

                await data.save();

                resolve({
                    code: 0,
                    message: "Save Doctor Introduction Successfully!",
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getDoctorById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    code: 1,
                    message: "Missing required parameter!!",
                });
            } else {
                let data = await db.User.findOne({
                    where: { id: id },
                    attributes: { exclude: ["password", "createdAt", "updatedAt"] },
                    raw: false,
                    nest: true,
                });

                if (data && data.image) {
                    data.image = new Buffer(data.image, "base64").toString("binary");
                }

                resolve({
                    code: 0,
                    data: data ? data : {},
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let bulkCreateSchedule = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.arrSchedule || !data.doctorId || !data.formattedDate) {
                resolve({
                    code: 1,
                    message: "Missing Parameter!",
                })
            } else {
                let schedule = data.arrSchedule;

                if (schedule && schedule.length > 0) {
                    schedule = schedule.map(item => {
                        item.maxNumber = process.env.MAX_NUMBER_SCHEDULE;

                        return item;
                    })
                }
                // get all existing data
                let existing = await db.Schedule.findAll({
                    where: {
                        doctorId: data.doctorId,
                        date: data.formattedDate
                    },
                    attributes: ["timeType", "date", "doctorId", "maxNumber"],
                    raw: true,
                })

                const bulkCreate = schedule.filter(scheduleItem =>
                    !existing.some(existingItem =>
                        existingItem.timeType === scheduleItem.timeType && existingItem.date === scheduleItem.date.toString()
                    )
                );

                const bulkDestroy = existing.filter(existingItem =>
                    !schedule.some(scheduleItem =>
                        scheduleItem.timeType === existingItem.timeType && scheduleItem.date.toString() === existingItem.date
                    )
                );

                if (bulkCreate && bulkCreate.length > 0) {
                    await db.Schedule.bulkCreate(bulkCreate);
                }

                if (bulkDestroy && bulkDestroy.length > 0) {
                    bulkDestroy.forEach(async (item) => {
                        await db.Schedule.destroy({
                            where: {
                                timeType: item.timeType,
                                date: item.date,
                                doctorId: item.doctorId,
                            }
                        })

                    });
                }

                resolve({
                    code: 0,
                    message: "Create Schedule Successfully!",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
}

let createDoctor = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let requiredFields = ["email", "password", "firstName", "lastName", "address", "phoneNumber", "gender", "position", "specialty", "clinic", "image", "price", "payment"];

            if (requiredFields.some(field => !data[field])) {
                let missingField = requiredFields.find(field => !data[field]);
                resolve({
                    code: 1,
                    message: `Missing Parameter: ${missingField}`,
                })
            } else {
                let [, created] = await db.User.findOrCreate({
                    where: {
                        email: data.email,
                    },
                    defaults: {
                        email: data.email,
                        password: data.password,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        address: data.address,
                        phoneNumber: data.phoneNumber,
                        gender: data.gender,
                        roleId: "R2",
                        positionId: data.position,
                        clinicId: data.clinic,
                        specialtyId: data.specialty,
                        image: data.image,
                        priceId: data.price,
                        paymentId: data.payment,
                    }
                });

                if (created === true) {
                    resolve({
                        code: 0,
                        message: "Create New Doctor Sucessful!"
                    })
                } else {
                    resolve({
                        code: 2,
                        message: "Email Already Exists!"
                    })
                }
            }
        } catch (e) {
            reject(e);
        }
    })
};

let updateDoctor = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let requiredFields = ["id", "email", "firstName", "lastName", "address", "phoneNumber", "gender", "position", "specialty", "clinic", "avatar", "price", "payment"];

            if (requiredFields.some(field => !data[field])) {
                let missingField = requiredFields.find(field => !data[field]);
                resolve({
                    code: 1,
                    message: `Missing Parameter: ${missingField}`,
                })
            } else {
                let doctor = await db.User.findOne({
                    where: { id: data.id },
                    raw: false,
                    attributes: { exclude: ["createdAt", "updatedAt", "password"] },
                });

                if (doctor) {
                    doctor.email = data.email;
                    doctor.firstName = data.firstName;
                    doctor.lastName = data.lastName
                    doctor.address = data.address;
                    doctor.phoneNumber = data.phoneNumber;
                    doctor.gender = data.gender;
                    doctor.image = data.avatar;
                    doctor.positionId = data.position;
                    doctor.specialtyId = data.specialty;
                    doctor.clinicId = data.clinic;
                    doctor.priceId = data.price;
                    doctor.paymentId = data.payment;
                }

                await doctor.save();

                resolve({
                    code: 0,
                    message: "Update Doctor Successfully!",
                });
            }
        } catch (e) {
            reject(e);
        }
    })
};

let deleteDoctor = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    code: 1,
                    message: "Missing required paremeter!",
                });
            }

            let user = await db.User.findOne({ where: { id: id } });

            if (!user) {
                resolve({ code: 2, message: "Doctor is not exist" });
            }

            //await user.destroy();

            await db.User.destroy({
                //xung đột giữa biến instant của sequelize
                //khi dùng raw: true thì kết quả trả về là một object

                //cách dùng await db.User.destroy() sẽ kết nối xuống dưới db rồi xóa ở dưới db
                //còn cách dùng await user.destroy(); là lấy data từ db lên nodejs xong mới gọi đến hàm destroy() của sequelize
                //cách này khi gọi đến hàm của sequelize, nó chỉ hiểu được khi đối tượng gọi nó là một instant "user"
                //hay là kiểu follow form chuẩn của sequelize thì nói mới hiểu được
                //khi ta dùng raw:true thì data lấy lên từ db không còn là instant của sequelize nữa mà là kiểu object
                //nên khi gọi hàm destroy() sẽ bị lỗi
                where: { id: id },
            });

            resolve({ code: 0, message: "Delete Doctor Successfully!!" });
        } catch (e) {
            reject(e);
        }
    });
};

let getScheduleByDate = (doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId || !date) {
                resolve({
                    code: 1,
                    message: "Missing Parameter!",
                })
            } else {
                let data = await db.Schedule.findAll({
                    where: {
                        doctorId: doctorId, date: date,
                    },
                    include: [
                        { model: db.Allcode, as: "timeTypeData", attributes: ["valueEn", "valueVi"] },
                    ],
                    raw: true,
                    nest: true,
                })

                if (!data) data = [];

                resolve({
                    code: 0,
                    data: data,
                })
            }
        } catch (e) {
            reject(e);
        }
    });
}

let getDoctorInformationById = (doctorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId) {
                resolve({
                    code: 1,
                    message: "Missing required parameter!!",
                });
            } else {
                let data = await db.Doctor_Information.findOne({
                    where: { doctorId: doctorId },
                    attributes: { exclude: ["id", "doctorId", "createdAt", "updatedAt"] },
                    include: [
                        { model: db.Allcode, as: "priceData", attributes: ["valueEn", "valueVi"] },
                        { model: db.Allcode, as: "paymentData", attributes: ["valueEn", "valueVi"] },
                        { model: db.Allcode, as: "provinceData", attributes: ["valueEn", "valueVi"] },
                    ],
                    raw: false,
                    nest: true,
                });

                resolve({
                    code: 0,
                    data: data ? data : {},
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllPatientsByDateAndDoctorId = (doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId || !date) {
                resolve({
                    code: 1,
                    message: "Missing required parameter!!",
                });
            } else {
                let data = await db.Booking.findAll({
                    where: {
                        doctorId: doctorId,
                        appointmentDate: date,
                        statusId: "S2"
                    },
                    attributes: { exclude: ["createdAt", "updatedAt"] },
                    include: [
                        {
                            model: db.Patient,
                            attributes: ["email", "fullName", "birthday", "address"],
                            include: [
                                {
                                    model: db.Allcode,
                                    attributes: ["valueEn", "valueVi"],
                                },
                            ],
                        },
                        {
                            model: db.Allcode,
                            attributes: ["valueEn", "valueVi"],
                        },

                    ],
                    raw: false,
                    nest: false,
                });

                resolve({
                    code: 0,
                    data: data ? data : {},
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllSchedulesByDateAndDoctorId = (doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId || !date) {
                resolve({
                    code: 1,
                    message: "Missing required parameter!!",
                });
            } else {
                let data = await db.Schedule.findAll({
                    where: {
                        doctorId: doctorId,
                        date: date,
                    },
                    attributes: { exclude: ["currentNumber", "maxNumber", "createdAt", "updatedAt"] },

                    raw: false,
                    nest: true,
                });

                resolve({
                    code: 0,
                    data: data ? data : {},
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let sendPrescription = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.patientId || !data.timeType) {
                resolve({
                    code: 1,
                    message: "Missing required parameter!!",
                });
            } else {
                //update booking status
                let appointment = await db.Booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        patientId: data.patientId,
                        appointmentTime: data.timeType,
                        statusId: "S2",
                    },
                    raw: false,
                })

                if (appointment) {
                    appointment.statusId = "S3";
                    await appointment.save();
                }

                //send prescription mail
                await emailService.sendAttachment(data);

                resolve({
                    code: 0,
                    message: "Gửi đơn thuốc cho bệnh nhân thành công!"
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    saveDoctorIntroduction,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleByDate: getScheduleByDate,
    getDoctorInformationById: getDoctorInformationById,
    getAllPatientsByDateAndDoctorId: getAllPatientsByDateAndDoctorId,
    getAllSchedulesByDateAndDoctorId: getAllSchedulesByDateAndDoctorId,
    sendPrescription: sendPrescription,


    getAllDoctors,
    getDoctorById,
    updateDoctor,
    createDoctor,
    deleteDoctor,
}