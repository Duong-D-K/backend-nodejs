import db from "../models/index";
import CRUDService from "../service/CRUDService";

let getHomePage = async (req, res) => {
    // async và await là hàm bất đồng bộ do khi lấy thông tin từ db sẽ mất nhiều thời gian hơn
    try {
        let data = await db.User.findAll(); //db.user tham chiếu trực tiếp đén bảng user, finđAll() sẽ tìm hết dữ liệu trong bảng user

        return res.render("homepage.ejs", {
            data: JSON.stringify(data), //chuyển chuỗi JSON thành chuỗi data
        });
    } catch (e) {
        console.log(e);
    }
};

let getAboutPage = (req, res) => {
    return res.render("test/about.ejs");
};

let getCRUD = (req, res) => {
    return res.render("crud.ejs");
};

let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);

    console.log(message);

    return res.send("post CRUD from server");
};

let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();

    // console.log(data);

    return res.render("displayCRUD.ejs", {
        dataTable: data,
    });
};

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;

    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId);

        return res.render("editCRUD.ejs", {
            user: userData,
        });
    } else {
        return res.send("User not found");
    }
};

let putCRUD = async (req, res) => {
    let data = req.body;

    let allUses = await CRUDService.updateUserData(data);

    return res.render("displayCRUD.ejs", {
        dataTable: allUses,
    });
};

let deleteCRUD = async (req, res) => {
    let id = req.query.id;

    if (id) {
        await CRUDService.deleteUserById(id);
    } else {
        return res.send("User not found");
    }

    let allUsers = await CRUDService.getAllUser();

    return res.render("displayCRUD.ejs", {
        dataTable: allUsers,
    });
};
module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
};
