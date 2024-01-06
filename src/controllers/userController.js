import userService from "../service/userService";

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    //thay the [email==="" || email===null || email ==="undefined"] bang !email
    if (!email || !password) {
        return res.status(500).json({
            code: 1,
            message: "Missing inputs parameters",
        });
    }
    let userData = await userService.handleUserLogin(email, password);

    return res.status(200).json({
        code: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {},
    });
};

let handleGetAllUsers = async (req, res) => {
    try {
        return res.status(200).json(await userService.getAllUsers());
    } catch (e) {
        console.log(e);

        return res.status(200).json({
            code: -1,
            message: "Error Code From Server!",
        })
    }
};

let handleCreateNewUser = async (req, res) => {
    return res.status(200).json(await userService.createNewUser(req.body));
};

let handleEditUser = async (req, res) => {
    return res.status(200).json(await userService.updateUserData(req.body));
};

let handleDeleteUser = async (req, res) => {
    return res.status(200).json(await userService.deleteUser(req.body.id));
};

let getAllCodes = async (req, res) => {
    try {
        return res.status(200).json(await userService.getAllCodesService(req.query.type));
    } catch (e) {
        console.log("Get all codes error: ", e);

        return res.status(200).json({
            code: -1,
            message: "Error From Server",
        });
    }
};

let getAllProvinces = async (req, res) => {
    try {
        return res.status(200).json(await userService.getAllProvinces());
    } catch (e) {
        console.log("Get All Provinces Error: ", e);

        return res.status(200).json({
            code: -1,
            message: "Error From Server",
        });
    }
};

let getDistricByProvinceId = async (req, res) => {
    try {
        return res.status(200).json(await userService.getDistricByProvinceId(req.query.provinceId));
    } catch (e) {
        console.log(e);

        return res.status(200).json({
            code: -1,
            message: "Error Code From Server!",
        });
    }
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
    getAllCodes: getAllCodes,
    getAllProvinces: getAllProvinces,
    getDistricByProvinceId,
};
