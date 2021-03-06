const nodemailer = require('nodemailer');

const sendPasswordResetLink = ({ sendToEmail, token, id }) => {
   
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: myEmail || process.env.MY_EMAIL,
            pass: myPassword || process.env.MY_PASSWORD
        }
    });

    const mailOptions = {
        from: myEmail || process.env.MY_EMAIL,
        to: sendToEmail,
        subject: 'Link to Reset Password',
        html: `<h3>Please follow this link to reset your password</h3><p> <a href="http://localhost:5000/api/user/resetpassword/${id}/${token}">Click Here</a>`
    };
    console.log(mailOptions.html);
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = sendPasswordResetLink