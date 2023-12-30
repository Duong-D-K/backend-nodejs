require('dotenv').config();
import nodemailer from 'nodemailer';

let sendSimpleEmail = async (data) => {
    // Tạo một transporter với SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_APP_USERNAME,
            pass: process.env.GMAIL_APP_PASSWORD,
        },
    });

    // Tạo một email
    let mailOptions = {
        from: '"Yang Wei Qing 👻" <s20113138@stu.edu.tw', // sender address,
        to: data.receivedEmail,
        subject: 'Xác Nhận Thông Tin Đặt Lịch Khám Bệnh',
        html: emailBody(data),
    };

    // Gửi email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

let emailBody = (data) => {
    if (data.receivedLanguage == "vi") {
        return `
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
        `;
    } else {
        return `
        <h3>Hello ${data.receivedFullName}!</h3>
        <p>You are receiving this email because you have booked a medical appointment on the website!</p>
        <p>Appointment details:</p>
        <div>
            <p><b>Time: ${data.receivedTime}</b></p>
            <p><b>Doctor: ${data.receivedDoctorName}</b></p>
        </div>

        
        <p>If the above information is correct, please click on the link below to complete the appointment booking process!</p>

        <div>
            <a href="${data.receivedRedirectLink}" target="_blank">Click Here</a>
        </div>
        <div>
            <p>Thank you very much!!!</p>
        </div>
        `;
    }
}
module.exports = {
    sendSimpleEmail: sendSimpleEmail
}