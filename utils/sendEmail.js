import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config()

export const sendApiKeyEmail = async (userId, apiKey) => {
  try {
    const user = await User.findById(userId)
    if (!user || !user.email) {
      throw new Error("User email not found")
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    const mailOptions = {
      from: process.env.EMAIL_FROM,
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

