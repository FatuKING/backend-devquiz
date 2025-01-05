import { appController } from './controllers/appControllers.js'
import { mysqlConnection } from './database/mysqlModel.js'

// async function testQuestions () {
//   try {
//     const data = await mysqlConnection.getQuestions(2)
//     return data
//   } catch (error) {
//     console.error(error.message)
//   }
// }

// async function testOptions () {
//   try {
//     const data = await mysqlConnection.getOptions(2)

//     const options = Object.values(
//       data.reduce((acc, { id, options }) => {
//         if (!acc[id]) {
//           acc[id] = { options: [] }
//         }
//         acc[id].options.push(options)
//         return acc
//       }, {})
//     )
//     return options
//   } catch (error) {
//     console.error(error.message)
//   }
// }

// async function testAnswer () {
//   try {
//     const data = await mysqlConnection.getAnswer(2)
//     return data
//   } catch (error) {
//     console.error(error.message)
//   }
// }

// async function testRanking () {
//   try {
//     const data = await mysqlConnection.getRanking(1)
//     return data
//   } catch (error) {
//     console.error(error.message)
//   }
// }

// async function testAddScore () {
//   try {
//     const data = await mysqlConnection.addScore(3, 100, 'Jhon Doe')
//     console.log(data)
//   } catch (error) {
//     console.error(error.message)
//   }
// }

// async function runTests () {
//   const questions = await testQuestions()
//   const answer = await testAnswer()
//   const options = await testOptions()

//   const combined = questions.map((question, index) => ({
//     ...question,
//     ...options[index],
//     ...answer[index]
//   }))

//   console.log(combined)
// }

// runTests()

console.log(appController.questions)
