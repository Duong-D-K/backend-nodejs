import db from "../models/index";
require('dotenv').config();
import _ from "lodash";
import emailService from "./emailService";
import { v4 as uuidv4 } from 'uuid';

let createClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let requiredFields = ["name", "address", "imageBase64", "descriptionMarkdown", "descriptionHTML", "districtId", "provinceId"];

            if (requiredFields.some(field => !data[field])) {
                let missingField = requiredFields.find(field => !data[field]);

                resolve({
                    code: 1,
                    message: `Missing Parameter: ${missingField}`,
                })
            } else {
                let [, created] = await db.Clinic.findOrCreate({
                    where: {
                        name: data.name,
                    },
                    defaults: {
                        name: data.name,
                        address: data.address,
                        provinceId: data.provinceId,
                        districtId: data.districtId,
                        descriptionMarkdown: data.descriptionMarkdown,
                        descriptionHTML: data.descriptionHTML,
                        image: data.imageBase64,
                    }
                });

                if (created === true) {
                    resolve({
                        code: 0,
                        message: "Create New Clinic Sucessful!"
                    })
                } else {
                    resolve({
                        code: 2,
                        message: "The Clinic already exists!"
                    })
                }
            }

        } catch (e) {
            reject(e);
        }
    })
}

let getAllClinics = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let clinics = await db.Clinic.findAll({
                attributes: { exclude: ["createdAt", "updatedAt"] },
                include: [
                    { model: db.District, as: "district", attributes: ["nameEn", "nameVi"] },
                    { model: db.Province, as: "province", attributes: ["nameEn", "nameVi"] },
                ],
                raw: true,
                nest: true,
            });

            if (clinics?.length > 0) {//change image to base 64
                clinics.map(item => {
                    item.image = new Buffer(item.image, "base64").toString("binary");
                    return item;
                })
            }

            resolve({
                code: 0,
                data: clinics?.length > 0 ? clinics : "",
            });
        } catch (e) {
            reject(e);
        }
    })
}

let getClinicById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    code: 1,
                    message: "Missing required parameter!!",
                });
            } else {
                let clinic = await db.Clinic.findOne({
                    where: { id: id },
                    attributes: { exclude: ["createdAt", "updatedAt"] },
                    include: [
                        { model: db.District, as: "district", attributes: ["nameEn", "nameVi"] },
                        { model: db.Province, as: "province", attributes: ["nameEn", "nameVi"] },
                    ],
                    raw: true,
                    nest: true,
                });

                if (clinic && clinic.image) {//change image to base 64
                    clinic.image = new Buffer(clinic.image, "base64").toString("binary");
                }


                if (clinic) {
                    let doctor_info = await db.Doctor_Information.findAll({
                        where: { clinicId: clinic.id },
                        attributes: ["doctorId"],
                    })

                    clinic.doctor_info = doctor_info;
                }

                await Promise.all(clinic.doctor_info.map(async (item) => {
                    try {
                        let users = await db.User.findOne({
                            where: { id: item.doctorId },
                            attributes: ["firstName", "lastName", "image"],
                            include: [
                                { model: db.Allcode, as: "positionData", attributes: ["valueEn", "valueVi"] },
                            ],
                            raw: false,
                            nest: true,
                        });

                        if (users && users.image) {//change image to base 64
                            users.image = new Buffer(users.image, "base64").toString("binary");
                        }

                        let markdown = await db.Markdown.findOne({
                            where: { doctorId: item.doctorId },
                            attributes: ["description"],
                        })

                        item.extraInfo = { users: users, markdown: markdown };


                    } catch (error) {
                        console.error("Error in db.User.findOne:", error);
                    }
                }));

                resolve({
                    code: 0,
                    data: clinic ? clinic : "",
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createClinic: createClinic,
    getAllClinics: getAllClinics,
    getClinicById: getClinicById,
}