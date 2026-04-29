import { promises as fs } from 'node:fs'
import { randomBytes } from 'node:crypto'
import path from 'node:path'

import type { SessionRecord, SessionStore } from './types'
export { SESSION_COOKIE } from './types'

const DATA_DIR = path.join(process.cwd(), 'data')
const SESSIONS_FILE = path.join(DATA_DIR, 'sessions.json')

const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000 // 7 days
const EMPTY_STORE: SessionStore = { sessions: [] }

async function ensureFile(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true })
  try {
    await fs.access(SESSIONS_FILE)
  } catch {
    await fs.writeFile(SESSIONS_FILE, `${JSON.stringify(EMPTY_STORE, null, 2)}\n`, 'utf8')
  }
}

async function readStore(): Promise<SessionStore> {
  await ensureFile()
  const contents = await fs.readFile(SESSIONS_FILE, 'utf8')
  const parsed: unknown = JSON.parse(contents)
  if (
    typeof parsed !== 'object' ||
    parsed === null ||
    !('sessions' in parsed) ||
    !Array.isArray((parsed as SessionStore).sessions)
  ) {
    throw new Error('Session store is malformed.')
  }
  return parsed as SessionStore
}

async function writeStore(store: SessionStore): Promise<void> {
  await fs.writeFile(SESSIONS_FILE, `${JSON.stringify(store, null, 2)}\n`, 'utf8')
}

export async function createSession(userId: string): Promise<SessionRecord> {
  const store = await readStore()

  // Prune expired sessions
  const now = Date.now()
  store.sessions = store.sessions.filter((s) => new Date(s.expiresAt).getTime() > now)

  const token = randomBytes(32).toString('hex')
  const createdAt = new Date().toISOString()
  const expiresAt = new Date(now + SESSION_DURATION_MS).toISOString()

  const session: SessionRecord = { token, userId, createdAt, expiresAt }
  store.sessions.push(session)
  await writeStore(store)
  return session
}

export async function validateSession(token: string): Promise<SessionRecord | null> {
  const store = await readStore()
  const session = store.sessions.find((s) => s.token === token)
  if (!session) return null
  if (new Date(session.expiresAt).getTime() <= Date.now()) return null
  return session
}

export async function deleteSession(token: string): Promise<void> {
  const store = await readStore()
  store.sessions = store.sessions.filter((s) => s.token !== token)
  await writeStore(store)
}
