const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'hend.chaouch@esprit.tn',
      pass: 'cfuq cqhe fadf bhha',
    },
  });
const sendResetPasswordEmail = async (email, resetToken) => {
  const resetLink = `${process.env.RESET_URL}/${resetToken}`;

  
    const emailContent = `
      <h2>Reset Your Password</h2>
      <p>Click the following link to reset your password:</p>
      <a href="${resetLink}">${resetLink}</a>
    `;
  
    await transporter.sendMail({
      from: 'chaouchhend55@gmail.com',
      to: email,
      subject: 'Reset Password',
      html: emailContent,
    });
  };
  
const sendActivationEmail = async (email, activationToken) => {
  const activationLink = `${process.env.ACTIVATE_URL}?token=${activationToken}`;

  
    const emailContent = `
      <h2>Activate Your Account</h2>
      <p>Click the following link to activate your account:</p>
      <a href="${activationLink}">${activationLink}</a>
    `;
  

    await transporter.sendMail({
      from: 'chaouchhend55@gmail.com',
      to: email,
      subject: 'Account Activation',
      html: emailContent,
    });
  };

  async function sendEmailNotification(email) {
    try {
      const mailOptions = {
        from: 'chaouchhend55@gmail.com',
        to: email,
        subject: 'New Coupon Available',
        html: `
          <p>Dear User,</p>
          <p>A new coupon is available.</p>
          <p>Enjoy your savings!</p>
        `,
      };
  
      const info = await transporter.sendMail(mailOptions);
      console.log('Recipient Email:', email);
      console.log('Email sent:', info.response);
    } catch (error) {
      console.log('Recipient Email:', email);
      console.error('Email sending error:', error);
    }
  }
  
  



  module.exports = {
    sendResetPasswordEmail,sendActivationEmail,sendEmailNotification
  };
  