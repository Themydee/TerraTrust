import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

// Load environment variables
dotenv.config();

// Create a transporter using Gmail service
const transporter = nodemailer.createTransport({
  host:'smtp-relay.brevo.com',
  port: 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})
  
// xsmtpsib-8413839dfa404431c5c019a2b4163e216e527142ba2adefe3fb59959345654f9-9F7JGkxrORSVEzqp
export default transporter;