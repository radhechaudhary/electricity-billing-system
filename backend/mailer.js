import nodemailer from 'nodemailer';

// Create a transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',  // You can use other email services
    auth: {
        user: 'radhechaudhary6398@gmail.com',  // Replace with your email
        pass: process.env.app_password || 'dbzr keir amzi ywtg'  // Replace with your generated app password
    }
});

// Send Mail Function
const sendMail = async (to, subject, text) => {
    try {
        const mailOptions = {
            from: 'radhechaudhary6398@gmail.com',
            to,
            subject,
            text
        };

        const info = await transporter.sendMail(mailOptions);
    } catch (error) {
        
    }
};

export default sendMail;
