import sendMail from '../services/mailService.js'

export class AppController {
  constructor ({ appModel, mailService }) {
    this.appModel = appModel
    this.mailService = mailService
  }

  questions = async (req, res) => {
    const categoryId = req.params.categoryId

    try {
      const questions = await this.appModel.getQuestions(categoryId)
      const options = await this.appModel.getOptions(categoryId)
      const answer = await this.appModel.getAnswer(categoryId)

      const data = questions.map((question, index) => ({
        ...question,
        ...options[index],
        ...answer[index]
      }))

      const randomQuestions = data.sort(() => Math.random() - 0.5)

      res.status(200).json(randomQuestions)
    } catch (error) {
      res.status(400).send(error.message)
    }
  }

  rankings = async (req, res) => {
    const categoryId = req.params.categoryId

    try {
      const ranking = await this.appModel.getRanking(categoryId)

      res.status(200).json(ranking)
    } catch (error) {
      res.status(400).send(error.message)
    }
  }

  topRankings = async (req, res) => {
    const categoryId = req.params.categoryId

    try {
      const topRanking = await this.appModel.getTopRanking(categoryId)

      res.status(200).json(topRanking)
    } catch (error) {
      res.status(400).send(error.message)
    }
  }

  registerScore = async (req, res) => {
    const { categoryId, userName, score } = req.body

    const mailOptions = {
      from: 'cozzanifacundo@gmail.com',
      to: 'cozzanifacundo@gmail.com',
      subject: 'Nuevo puntaje en devquiz',
      text: `El usuario ${userName} ha obtenido ${score} puntos en la categoría ${categoryId}`
    }

    try {
      if (!categoryId || !score || !userName) {
        throw new Error('Invalid request')
      }

      await this.appModel.addScore({ categoryId, userName, score })
      await sendMail(mailOptions)

      res.status(200).json('Registered score')
    } catch (error) {
      res.status(400).send(error.message)
    }
  }

  sendMail = async (req, res) => {
    const { name, email, message } = req.body

    const mailOptions = {
      from: 'cozzanifacundo@gmail.com',
      to: 'cozzanifacundo@gmail.com',
      subject: 'Mensaje de devquiz',
      text: `
          Nombre Completo: ${name}
          mail: ${email}
          Mensaje: ${message}`
    }

    try {
      await sendMail(mailOptions)
      res.status(200).json('Mail sent')
    } catch (error) {
      res.status(400).send(error.message)
    }
  }
}
