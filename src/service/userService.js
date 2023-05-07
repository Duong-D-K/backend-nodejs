import db from "../models/index";
import bcrypt from "bcryptjs";

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};

            if (await checkUserEmail(email)) {
                //check email exist
                let user = await db.User.findOne({
                    attributes: ["email", "roleId", "password"],
                    // include: ["xxx", "xxx"], // define columns that you want to show
                    // exclude: ["xxx"], // define columns that you don't want
                    where: { email: email },
                    raw: true,
                });

                if (user) {
                    if (await bcrypt.compareSync(password, user.password)) {
                        delete user.password; //delete passwrord

                        userData.errCode = 0;
                        userData.errMessage = "OK";
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = "Wrong Password";
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User is not exist`;
                }
            } else {
                userData.errCode = 1;
                userData.errMessage = `Your email isn't exist in our system. Try again `;
            }
            resolve(userData);
        } catch (e) {
            reject(e);
        }
    });
};

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (await db.User.findOne({ where: { email: userEmail } })) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    });
};

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = "";
            if (userId == "ALL") {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ["password"],
                    },
                });
            }
            if (userId && userId !== "ALL") {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: { exclude: ["password"] },
                });
            }
            resolve(users);
        } catch (error) {
            reject(error);
        }
    });
};
module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
};
