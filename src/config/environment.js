import dotenv from 'dotenv'
import { readFileSync } from 'fs'
import { resolve } from 'path'

const envFilePath = resolve(__dirname, '..', '..', '.env')
const envFile = readFileSync(envFilePath)
const config = dotenv.parse(envFile)

export const basePort = config.BASE_PORT

export const jwtConfig = {
  secret: config.JWT_SECRET,
  expiresIn: config.JWT_EXPIRES_IN,
}
