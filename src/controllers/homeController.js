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

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
};
