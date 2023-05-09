import userService from "../service/userService";

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    //thay the [email==="" || email===null || email ==="undefined"] bang !email
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: "Missing inputs parameters",
        });
    }
    let userData = await userService.handleUserLogin(email, password);

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {},
    });
};

let handleGetAllUsers = async (req, res) => {
    let id = req.query.id; //ALL. SINGLE

    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing Required Parameters",
            users: [],
        });
    }

    let users = await userService.getAllUsers(id);

    return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        users,
    });

    console.log(users);
};

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
};
