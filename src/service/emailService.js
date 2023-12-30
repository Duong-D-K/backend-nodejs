require('dotenv').config();
import nodemailer from 'nodemailer';

let sendSimpleEmail = async (data) => {
    // Tạo một transporter với SMTP transport
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_APP_USERNAME,
            pass: process.env.GMAIL_APP_PASSWORD,
        },
    });

    // Tạo một email
    const mailOptions = {
        from: '"Yang Wei Qing 👻" <s20113138@stu.edu.tw', // sender address,
        to: data.receivedEmail,
        subject: 'Xác Nhận Thông Tin Đặt Lịch Khám Bệnh',
        html: `
        <h3>Xin Chào ${data.receivedFullName}!</h3>
        <p>Bạn nhận được Email này vì đã đặt lịch khám bệnh trên Website!</p>
        <p>Thông tin đặt lịch khám bệnh: </p>
        <div>
            <p><b>Thời Gian: ${data.receivedTime}</b></p>
            <p><b>Bác Sĩ: ${data.receivedDoctorName}</b></p>
        </div>
        
        <p>Nếu Các Thông Tin Trên Là Chính Xác, Vui Lòng Bấm Vào Đường Link Bên Dưới Để Hoàn Tất Thủ Tục Đặt Lịch Khám Bệnh!</p>

        <div>
            <a href="${data.receivedRedirectLink}" target="_blank">Click Here</a>
        </div>
        <div>
            Xin Chân Thành Cảm Ơn!!!
        </div>
        `,

    };

    // Gửi email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    // const info = await transporter.sendMail({
    //     from: '"Yang Wei Qing 👻" <s20113138@stu.edu.tw', // sender address
    //     to: receivedEmail, // list of receivers
    //     subject: "Hello ✔", // Subject line
    //     text: "Hello world?", // plain text body
    //     html: "<b>Hello world?</b>", // html body
    // });
}

module.exports = {
    sendSimpleEmail: sendSimpleEmail
}