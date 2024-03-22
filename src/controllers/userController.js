import userService from "../service/userService";

let handleLogin = async (req, res) => {
    try {
        return res.status(200).json(await userService.handleUserLogin(req.body.email, req.body.password));
    } catch (e) {
        console.log(e);

        return res.status(200).json({
            code: -1,
            message: "Error Code From Server!",
        })
    }
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
    return res.status(200).json(await userService.deleteUser(req.params.userId));
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
