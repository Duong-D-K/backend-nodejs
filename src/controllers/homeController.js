import db from "../models/index";

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

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
};
