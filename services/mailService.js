import nodemailer from 'nodemailer'
import 'dotenv/config'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS
  }
})

export default async function sendMail (mailOptions) {
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error.message)
    } else {
      console.log('Correo enviado:', info.response)
    }
  })
}
