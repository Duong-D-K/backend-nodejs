import db from "../models/index";
require('dotenv').config();
import _ from "lodash";

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
                attributes: { exclude: ["password", "image"] },
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

let saveDoctorInfo = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let requiredFields = ["doctorId", "contentHTML", "contentMarkdown", "action", "selectedPrice", "selectedPayment", "selectedProvince", "clinicName", "clinicAddress", "description", "note", "clinicId", "specialtyId",];

            if (requiredFields.some(field => !inputData[field])) {
                let missingField = requiredFields.find(field => !inputData[field]);
                resolve({
                    code: 1,
                    message: `Missing Parameter: ${missingField}`,
                })
            } else {
                if (inputData.action === "CREATE") {
                    await db.Markdown.create({
                        contentHTML: inputData.contentHTML,
                        contentMarkdown: inputData.contentMarkdown,
                        description: inputData.description,
                        doctorId: inputData.doctorId,
                    });

                    resolve({
                        code: 0,
                        message: "Save Doctor Successfully!",
                    })
                } else if (inputData.action === "UPDATE") {
                    let markdown = await db.Markdown.findOne({
                        where: { doctorId: inputData.doctorId },
                        raw: false,
                    });

                    if (markdown) {
                        markdown.contentHTML = inputData.contentHTML;
                        markdown.contentMarkdown = inputData.contentMarkdown;
                        markdown.description = inputData.description;
                    }

                    await markdown.save();

                    resolve({
                        code: 0,
                        message: "Update Doctor Successfully!",
                    });
                }

                let doctorInfo = await db.Doctor_Information.findOne({
                    where: { doctorId: inputData.doctorId },
                    raw: false,
                })

                if (doctorInfo) {
                    //update
                    doctorInfo.priceId = inputData.selectedPrice;
                    doctorInfo.paymentId = inputData.selectedPayment;
                    doctorInfo.provinceId = inputData.selectedProvince;

                    doctorInfo.clinicName = inputData.clinicName;
                    doctorInfo.clinicAddress = inputData.clinicAddress;
                    doctorInfo.note = inputData.note;
                    doctorInfo.specialtyId = inputData.specialtyId;
                    doctorInfo.clinicId = inputData.clinicId;

                    await doctorInfo.save();
                } else {
                    //create
                    await db.Doctor_Information.create({
                        doctorId: inputData.doctorId,
                        priceId: inputData.selectedPrice,
                        paymentId: inputData.selectedPayment,
                        provinceId: inputData.selectedProvince,
                        specialtyId: inputData.specialtyId,
                        clinicId: inputData.clinicId,

                        clinicName: inputData.clinicName,
                        clinicAddress: inputData.clinicAddress,
                        note: inputData.note,
                    })
                }
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
                    include: [
                        {
                            model: db.Markdown,
                            attributes: ["description", "contentMarkdown", "contentHTML"],
                        },
                        {
                            model: db.Allcode,
                            as: "positionData", attributes: ["valueEn", "valueVi"],
                        },
                        {
                            model: db.Doctor_Information,
                            attributes: { exclude: ["id", "doctorId", "createdAt", "updatedAt"] },
                            include: [
                                { model: db.Allcode, as: "priceData", attributes: ["valueEn", "valueVi"] },
                                { model: db.Allcode, as: "paymentData", attributes: ["valueEn", "valueVi"] },
                                { model: db.Allcode, as: "provinceData", attributes: ["valueEn", "valueVi"] },
                                { model: db.Specialty, attributes: ["id", "nameVi", "nameEn"] },
                            ]
                        },
                    ],
                    raw: false,
                    nest: true,
                });

                if (data && data.image) {//change image to base 64
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

                        // item.date = item.date.toString();

                        return item;
                    })
                }
                // get all existing data
                let existing = await db.Schedule.findAll({
                    where: { doctorId: data.doctorId, date: data.formattedDate },
                    attributes: ["timeType", "date", "doctorId", "maxNumber"],
                    raw: true,
                })

                //compare diffrence
                let toCreate = _.differenceWith(schedule, existing, (a, b) => {
                    return a.timeType === b.timeType && a.date.toString() === b.date;
                })

                //create data
                if (toCreate && toCreate.length > 0) {
                    await db.Schedule.bulkCreate(toCreate);
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

module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors: getAllDoctors,
    saveDoctorInfo: saveDoctorInfo,
    getDoctorById: getDoctorById,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleByDate: getScheduleByDate,
    getDoctorInformationById: getDoctorInformationById,
    getAllPatientsByDateAndDoctorId: getAllPatientsByDateAndDoctorId,
}