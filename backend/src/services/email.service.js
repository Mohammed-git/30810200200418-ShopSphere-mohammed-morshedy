const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

async function sendWelcomeEmail(email, name) {
    try {
        const info = await transporter.sendMail({
            from: '"E-Commerce Store" <no-reply@ecommerce.com>',
            to: email,
            subject: "Welcome to our store!",
            html: `
                <h2>Welcome ${name} 👋</h2>
                <p>Thank you for creating an account.</p>
                <p>We hope you enjoy shopping with us.</p>
            `
        });

        console.log("✅ Welcome email sent:", info.messageId);

    } catch (error) {
        console.error("Email Error:", error.message);
    }
}

module.exports = {
    sendWelcomeEmail
};