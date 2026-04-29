import { scrypt, randomBytes, timingSafeEqual } from 'node:crypto'
import { promisify } from 'node:util'

const scryptAsync = promisify(scrypt)

const SALT_BYTES = 16
const KEY_LEN = 64

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(SALT_BYTES).toString('hex')
  const derivedKey = (await scryptAsync(password, salt, KEY_LEN)) as Buffer
  return `${salt}:${derivedKey.toString('hex')}`
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const [salt, storedKey] = hash.split(':')
  if (!salt || !storedKey) return false

  try {
    const derivedKey = (await scryptAsync(password, salt, KEY_LEN)) as Buffer
    const storedBuffer = Buffer.from(storedKey, 'hex')
    if (derivedKey.length !== storedBuffer.length) return false
    return timingSafeEqual(derivedKey, storedBuffer)
  } catch {
    return false
  }
}
