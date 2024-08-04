// utils/email.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT, 10),
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * Sends a welcome email to the specified recipient.
 * 
 * This function uses Nodemailer to send an email with a customizable subject and HTML body.
 * 
 * @param {string} to - The recipient's email address. This can be a single email address, a comma-separated string, or an array of email addresses.
 * @param {string} title - The subject line of the email. This is what appears as the email's subject.
 * @param {string} body - The HTML content of the email. This is the main content displayed in the email body.
 * 
 * @returns {Promise<void>} - A promise that resolves when the email has been sent successfully.
 * 
 * @throws {Error} - Throws an error if there is an issue sending the email, such as connection issues or invalid email addresses.
 */

export async function sendWelcomeEmail(to, subject, body) {
  const mailOptions = {
    from: process.env.SMTP_FROM, // sender address
    to, // list of receivers
    subject: 'Welcome to Our Service!', // Subject line
    html: body, // HTML body content
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Welcome email sent successfully');
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
}
