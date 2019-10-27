const dotenv = require('dotenv')
const { readFileSync } = require('fs')

const config = dotenv.parse(readFileSync('.env'))

module.exports = {
  dialect: config.DB_DIALECT,
  host: config.DB_HOST,
  username: config.DB_USER,
  password: config.DB_PASS,
  database: config.DB_NAME,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
}
