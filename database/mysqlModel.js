import mysql from 'mysql2/promise'
import 'dotenv/config'

const CONFIG = {
  host: process.env.HOST_DB,
  port: process.env.PORT_DB,
  user: process.env.USER_DB,
  password: process.env.PASS_DB,
  database: process.env.NAME_DB
}

const connection = await mysql.createConnection(CONFIG)

export class MysqlConnection {
  static async getQuestions (categoryId) {
    try {
      const [rows] = await connection.query('CALL ManageQuiz(?, ?, ?, ?)', ['getQuestions', categoryId, null, null])
      return rows[0]
    } catch (error) {
      throw new Error(`Error en la conexión a la base de datos: ${error.message}`)
    }
  }

  static async getOptions (categoryId) {
    try {
      const [rows] = await connection.query('CALL ManageQuiz(?, ?, ?, ?)', ['getOptions', categoryId, null, null])

      const data = rows[0]

      const options = Object.values(
        data.reduce((acc, { id, options }) => {
          if (!acc[id]) {
            acc[id] = { options: [] }
          }
          acc[id].options.push(options)
          return acc
        }, {})
      )

      const randomOptions = options.map(option => {
        option.options = option.options.sort(() => Math.random() - 0.5)
        return option
      })

      return randomOptions
    } catch (error) {
      throw new Error(`Error en la conexión a la base de datos: ${error.message}`)
    }
  }

  static async getAnswer (categoryId) {
    try {
      const [rows] = await connection.query('CALL ManageQuiz(?, ?, ?, ?)', ['getAnswer', categoryId, null, null])
      return rows[0]
    } catch (error) {
      throw new Error(`Error en la conexión a la base de datos: ${error.message}`)
    }
  }

  static async getRanking (categoryId) {
    try {
      const [rows] = await connection.query('CALL ManageQuiz(?, ?, ?, ?)', ['getRanking', categoryId, null, null])
      return rows[0]
    } catch (error) {
      throw new Error(`Error en la conexión a la base de datos: ${error.message}`)
    }
  }

  static async addScore ({ categoryId, score, name }) {
    try {
      const [rows] = await connection.query('CALL ManageQuiz(?, ?, ?, ?)', ['addScore', categoryId, name, score])
      return rows[0]
    } catch (error) {
      throw new Error(`Error en la conexión a la base de datos: ${error.message}`)
    }
  }
}
