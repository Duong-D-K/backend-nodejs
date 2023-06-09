import { where } from "sequelize";
import db from "../models/index";
import bcrypt from "bcryptjs";

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

module.exports = {
    getTopDoctorHome: getTopDoctorHome,
}