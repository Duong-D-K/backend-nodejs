import db from "../models/index";
require('dotenv').config();
import _ from "lodash";
import emailService from "./emailService";
import { v4 as uuidv4 } from 'uuid';

let createSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let requiredFields = ["name", "imageBase64", "contentMarkdown", "contentHTML"];

            if (requiredFields.some(field => !data[field])) {
                resolve({
                    code: 1,
                    message: "Missing required parameter!!",
                });
            } else {
                let [, created] = await db.Specialty.findOrCreate({
                    where: {
                        name: data.name,
                    },
                    defaults: {
                        name: data.name,
                        image: data.imageBase64,
                        contentMarkdown: data.contentMarkdown,
                        contentHTML: data.contentHTML,
                    }
                });
                if (created === true) {
                    resolve({
                        code: 0,
                        message: "Create New Specialty Sucessful!"
                    })
                } else {
                    resolve({
                        code: 2,
                        message: "The specialty already exists!"
                    })
                }
            }

        } catch (e) {
            reject(e);
        }
    })
}

let getAllSpecialties = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Specialty.findAll();

            if (data?.length > 0) {//change image to base 64
                data.map(item => {
                    item.image = new Buffer(item.image, "base64").toString("binary");
                    return item;
                })
            }

            resolve({
                code: 0,
                data: data?.length > 0 ? data : "",
            });
        } catch (e) {
            reject(e);
        }
    })
}

let getAllDoctorsInSpecialty = (id, location) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id || !location) {
                resolve({
                    code: 1,
                    message: "Missing required parameter!!",
                });
            } else {
                let specialty = await db.Specialty.findOne({
                    where: { id: id },
                    attributes: { exclude: ["createdAt", "updatedAt"] },
                });

                let doctors = [];

                if (location === "ALL") {
                    doctors = await db.Doctor_Information.findAll({
                        where: { specialtyId: id },
                        attributes: { exclude: [""] },
                        raw: false,
                        nest: true,
                    });
                } else {
                    //find by location
                    doctors = await db.Doctor_Information.findAll({
                        where: {
                            specialtyId: id,
                            provinceId: location,
                        },
                        attributes: { exclude: [""] },
                        raw: false,
                        nest: true,
                    });
                }


                const updatedDoctors = await Promise.all(doctors.map(async (item, index) => {
                    let markdown = await db.Markdown.findOne({
                        where: {
                            doctorId: item.doctorId,
                        },
                        attributes: ["description"],
                        raw: false,
                        nest: true,
                    });

                    let user = await db.User.findOne({
                        where: {
                            id: item.doctorId,
                        },
                        attributes: ["image", "firstName", "lastName"],
                        include: [
                            { model: db.Allcode, as: "positionData", attributes: ["valueEn", "valueVi"] },
                        ],
                        raw: false,
                        nest: true,
                    });

                    if (user && user.image) {//change image to base 64
                        user.image = new Buffer(user.image, "base64").toString("binary");
                    }

                    // Thêm giá trị markdown vào mỗi thành phần con của doctors
                    return {
                        ...item.toJSON(),
                        Markdown: markdown ? markdown.get({ plain: true }) : null,
                        User: user ? user.get({ plain: true }) : null,
                    };
                }));

                resolve({
                    code: 0,
                    data: updatedDoctors && specialty ? { updatedDoctors: updatedDoctors, specialty: specialty } : "",
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createSpecialty: createSpecialty,
    getAllSpecialties: getAllSpecialties,
    getAllDoctorsInSpecialty: getAllDoctorsInSpecialty,
}