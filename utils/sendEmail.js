import nodemailer from "nodemailer"
import dotenv from "dotenv"
import User from "../models/user.js"

dotenv.config()

export const sendApiKeyEmail = async (userId, apiKey) => {
  try {
    const user = await User.findById(userId)
    if (!user || !user.emailConfig.user || !user.emailConfig.pass) {
      throw new Error("User email configuration not found")
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: user.emailConfig.user,
        pass: user.emailConfig.pass,
      },
    })

    const mailOptions = {
      from: user.emailConfig.user,
      to: user.email,
      subject: "Your API Key",
      text: `Your API key is: ${apiKey}. Please keep this key secure and do not share it with others.`,
      html: `<p>Your API key is: <strong>${apiKey}</strong></p><p>Please keep this key secure and do not share it with others.</p>`,
    }

    await transporter.sendMail(mailOptions)
    console.log("API key email sent successfully")
  } catch (error) {
    console.error("Error sending API key email:", error)
    throw error
  }
}

