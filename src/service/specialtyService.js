import db from "../models/index";
require('dotenv').config();
import _ from "lodash";
import emailService from "./emailService";
import { v4 as uuidv4 } from 'uuid';

let createSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let requiredFields = ["nameVi", "nameEn", "image", "contentMarkdown", "contentHTML"];

            if (requiredFields.some(field => !data[field])) {
                let missingField = requiredFields.find(field => !data[field]);
                resolve({
                    code: 1,
                    message: `Missing Parameter: ${missingField}`,
                })
            } else {
                let [, created] = await db.Specialty.findOrCreate({
                    where: {
                        nameVi: data.nameVi,
                        nameEn: data.nameEn,
                    },
                    defaults: {
                        nameVi: data.nameVi,
                        nameEn: data.nameEn,
                        image: data.image,
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
                        message: "The Specialty already exists!"
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
            let data = await db.Specialty.findAll({
                attributes: { exclude: ["createdAt", "updatedAt"] },
            }
            );

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

let updateSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let requiredFields = ["id", "nameVi", "nameEn", "image", "contentMarkdown", "contentHTML"];

            if (requiredFields.some(field => !data[field])) {
                let missingField = requiredFields.find(field => !data[field]);
                resolve({
                    code: 1,
                    message: `Missing Parameter: ${missingField}`,
                })
            } else {
                let specialty = await db.Specialty.findOne({
                    where: { id: data.id },
                    raw: false,
                    attributes: { exclude: ["createdAt", "updatedAt"] },
                })


                if (specialty) {
                    specialty.nameVi = data.nameVi;
                    specialty.nameEn = data.nameEn;
                    specialty.contentHTML = data.contentHTML;
                    specialty.contentMarkdown = data.contentMarkdown;
                    specialty.image = data.image;
                }

                await specialty.save();

                resolve({
                    code: 0,
                    message: "Update Specialty Successfully!"
                })
            }

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

let deleteSpecialty = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    code: 1,
                    message: "Missing required paremeter!",
                });
            }

            let specialty = await db.Specialty.findOne({ where: { id: id } });

            if (!specialty) {
                resolve({ code: 2, message: "Specialty is not exist" });
            }

            //await user.destroy();

            await db.Specialty.destroy({
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

            resolve({ code: 0, message: "Delete Specialty Successfully!!" });
        } catch (e) {
            reject(e);
        }
    });
};
module.exports = {
    createSpecialty,
    getAllSpecialties,
    getAllDoctorsInSpecialty: getAllDoctorsInSpecialty,
    updateSpecialty,
    deleteSpecialty,
}