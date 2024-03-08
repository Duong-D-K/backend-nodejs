require('dotenv').config();
import nodemailer from 'nodemailer';

let sendSimpleEmail = async (data) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_APP_USERNAME,
            pass: process.env.GMAIL_APP_PASSWORD,
        },
    });

    let mailOptions = {
        from: '"Yang Wei Qing 👻" <s20113138@stu.edu.tw', // sender address,
        to: data.receivedEmail,
        subject: 'Xác Nhận Thông Tin Đặt Lịch Khám Bệnh',
        html: data.receivedLanguage === 'vi' ?
            `
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
        `
            :
            `
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
        `
        ,
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

let sendAttachment = async (data) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_APP_USERNAME,
            pass: process.env.GMAIL_APP_PASSWORD,
        },
    });

    let mailOptions = {
        from: '"Yang Wei Qing 👻" <s20113138@stu.edu.tw', // sender address,
        to: data.email,
        subject: 'Xác Nhận Kết Quả Đặt Lịch Khám Bệnh!',
        attachments: {
            filename: `prescription-${data.patientName}-${new Date().getTime()}.jpg`,
            content: data.image.split("base64,")[1],
            encoding: 'base64',
        },
        html: data.receivedLanguage === 'vi' ?
            `
                <h3>Xin Chào ${data.patientName}!</h3>
                <p>Bạn nhận được Email này vì đã đặt lịch khám bệnh trên Website!</p>
                <p>Thông tin đặt lịch khám bệnh: </p>
                
                <p>Nếu Các Thông Tin Trên Là Chính Xác, Vui Lòng Bấm Vào Đường Link Bên Dưới Để Hoàn Tất Thủ Tục Đặt Lịch Khám Bệnh!</p>

            
                <div>
                    Xin Chân Thành Cảm Ơn!!!
                </div>
                `
            :
            `
                <h3>Hello ${data.patientName}!</h3>
                <p>You are receiving this email because you have booked a medical appointment on the website!</p>

                <p>Thank you very much!!!</p>
                </div>
            `
        ,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = {
    sendSimpleEmail: sendSimpleEmail,
    sendAttachment: sendAttachment,
}