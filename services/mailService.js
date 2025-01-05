export class mailService {
  constructor ({ sendMail }) {
    this.sendMail = sendMail
  }

  sendMail = async (req, res) => {
    const { mailOptions } = req.body

    try {
      if (!mailOptions) {
        throw new Error('Invalid request')
      }

      await this.sendMail(mailOptions)

      res.status(200).json('Mail sent')
    } catch (error) {
      res.status(400).send(error.message)
    }
  }
}
