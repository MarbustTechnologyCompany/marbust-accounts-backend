const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    secure: process.env.NODEMAILER_SECURE,
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000
});

const sendEmail = async (emailTo, emailSubject, emailBody) => {
    try {
        const mailOptions = {
            from: process.env.NODEMAILER_USER,
            to: emailTo,
            subject: `${emailSubject} | ${process.env.APP_NAME} System`,
            html: `
                <h1 style='text-align: center;'>${emailSubject}</h1>
                <hr />
                ${emailBody}
                <hr />
                <p style='text-align: center;'><strong>${process.env.APP_NAME}&reg;</strong> System </br>&copy; ${new Date().getFullYear()} <a href="https://marbust.com" style="font-weight: bold;">Marbust Technology Company</a> - All Rights Reserved</p>
            `
        };
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email was sent to: ${emailTo} with Id: ${info.response}`);
    } catch (error) {
        console.log(error);
    }
}

module.exports = sendEmail;