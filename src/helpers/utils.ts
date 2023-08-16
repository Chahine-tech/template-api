import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

export const prisma = new PrismaClient()

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 10)
}

export const comparePassword = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash)
}
