import { Dialect, Sequelize } from 'sequelize'

const dbName = "TransactionDB" 
const dbUser = "root"
const dbHost = "localhost"
const dbDriver = "mysql"
const dbPassword = ""

const connection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDriver
})

export default connection