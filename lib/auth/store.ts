import { promises as fs } from 'node:fs'
import { randomUUID } from 'node:crypto'
import path from 'node:path'

import type { UserRecord, UserStore, SignupInput, PublicUser } from './types'
import { hashPassword } from './password'

const DATA_DIR = path.join(process.cwd(), 'data')
const USERS_FILE = path.join(DATA_DIR, 'users.json')

const EMPTY_STORE: UserStore = { users: [] }

async function ensureFile(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true })
  try {
    await fs.access(USERS_FILE)
  } catch {
    await fs.writeFile(USERS_FILE, `${JSON.stringify(EMPTY_STORE, null, 2)}\n`, 'utf8')
  }
}

async function readStore(): Promise<UserStore> {
  await ensureFile()
  const contents = await fs.readFile(USERS_FILE, 'utf8')
  const parsed: unknown = JSON.parse(contents)
  if (
    typeof parsed !== 'object' ||
    parsed === null ||
    !('users' in parsed) ||
    !Array.isArray((parsed as UserStore).users)
  ) {
    throw new Error('User store is malformed.')
  }
  return parsed as UserStore
}

async function writeStore(store: UserStore): Promise<void> {
  await fs.writeFile(USERS_FILE, `${JSON.stringify(store, null, 2)}\n`, 'utf8')
}

export function toPublicUser(user: UserRecord): PublicUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    company: user.company,
    createdAt: user.createdAt,
  }
}

export async function createUser(
  input: SignupInput,
): Promise<{ duplicate: boolean; user: UserRecord | null }> {
  const store = await readStore()
  const existing = store.users.find((u) => u.email === input.email)
  if (existing) return { duplicate: true, user: null }

  const passwordHash = await hashPassword(input.password)
  const user: UserRecord = {
    id: randomUUID(),
    name: input.name.trim(),
    email: input.email,
    passwordHash,
    role: input.role,
    company: input.company.trim(),
    createdAt: new Date().toISOString(),
  }

  store.users.push(user)
  await writeStore(store)
  return { duplicate: false, user }
}

export async function findUserByEmail(email: string): Promise<UserRecord | null> {
  const store = await readStore()
  return store.users.find((u) => u.email === email) ?? null
}

export async function findUserById(id: string): Promise<UserRecord | null> {
  const store = await readStore()
  return store.users.find((u) => u.id === id) ?? null
}
