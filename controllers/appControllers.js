export class AppController {
  constructor ({ appModel }) {
    this.appModel = appModel
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

  registerScore = async (req, res) => {
    const { categoryId, score, name } = req.body

    try {
      if (!categoryId || !score || !name) {
        throw new Error('Invalid request')
      }

      await this.appModel.registerScore(categoryId, score, name)

      res.status(200).json('Registered score')
    } catch (error) {
      res.status(400).send(error.message)
    }
  }

  home = async (req, res) => {
    res.status(200).json('Welcome to the Quiz API')
  }
}
