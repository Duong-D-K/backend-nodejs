import { where } from "sequelize";
import db from "../models/index";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

let HashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);

            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    });
};

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};

            if (await checkUserEmail(email)) {
                //check email exist
                let user = await db.User.findOne({
                    attributes: ["email", "roleId", "password", "firstName", "lastName"],
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
                    attributes: { exclude: ["password"] },
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

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if ((await checkUserEmail(data.email)) === true) {
                //check email exist
                resolve({
                    code: 1,
                    message: "Email is Exist, Please Use Another",
                });
            } else {
                await db.User.create({
                    email: data.email,
                    password: await HashUserPassword(data.password),
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender,
                    roleId: data.role,
                    positionId: data.position,
                    image: data.avatar,
                });

                resolve({ code: 0, message: "OK" });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let deleteUser = (id) => {
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
                resolve({ code: 2, message: "User is not exist" });
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

            resolve({ code: 0, message: "Delete User Successfully!!" });
        } catch (e) {
            reject(e);
        }
    });
};

let updateUserData = (data) => {
    return new Promise(async (resolve, rejcect) => {
        try {
            if (!data.id || !data.role || !data.position || !data.gender) {
                resolve({
                    code: 2,
                    message: "Missing Required Parameter",
                });
            }

            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false,
            });

            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.phoneNumber = data.phoneNumber;
                user.gender = data.gender;
                user.roleId = data.role;
                user.positionId = data.position;
                if (data.avatar) {
                    user.image = data.avatar;
                }

                await user.save();

                resolve({ code: 0, message: "Update User Successfully!!" });
            } else {
                resolve({ code: 1, message: "User Not Found!" });
            }
        } catch (e) {
            rejcect(e);
        }
    });
};

let getAllCodesService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    code: 1,
                    message: "Missing required parameter!",
                });
            } else {
                resolve({
                    code: 0,
                    message: "",
                    data: await db.Allcode.findAll({ where: { type: typeInput } }),
                });
            }

        } catch (e) {
            reject(e);
        }
    });
}
module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    updateUserData: updateUserData,
    deleteUser: deleteUser,
    getAllCodesService: getAllCodesService,
};
