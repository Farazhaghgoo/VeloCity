import { promises as fs } from 'node:fs'
import path from 'node:path'

import type { WaitlistStoreFile, WaitlistSubmissionInput, WaitlistSubmissionRecord } from './types'

const WAITLIST_DATA_DIR = path.join(process.cwd(), 'data')
const WAITLIST_FILE_PATH = path.join(WAITLIST_DATA_DIR, 'waitlist.json')

const EMPTY_STORE: WaitlistStoreFile = {
  submissions: [],
}

async function ensureStoreFile(): Promise<void> {
  await fs.mkdir(WAITLIST_DATA_DIR, { recursive: true })

  try {
    await fs.access(WAITLIST_FILE_PATH)
  } catch {
    await fs.writeFile(WAITLIST_FILE_PATH, `${JSON.stringify(EMPTY_STORE, null, 2)}\n`, 'utf8')
  }
}

async function readStore(): Promise<WaitlistStoreFile> {
  await ensureStoreFile()

  const contents = await fs.readFile(WAITLIST_FILE_PATH, 'utf8')
  const parsed: unknown = JSON.parse(contents)

  if (
    typeof parsed !== 'object' ||
    parsed === null ||
    !('submissions' in parsed) ||
    !Array.isArray((parsed as WaitlistStoreFile).submissions)
  ) {
    throw new Error('Waitlist store is malformed.')
  }

  return parsed as WaitlistStoreFile
}

async function writeStore(store: WaitlistStoreFile): Promise<void> {
  await fs.writeFile(WAITLIST_FILE_PATH, `${JSON.stringify(store, null, 2)}\n`, 'utf8')
}

export async function addWaitlistSubmission(
  input: WaitlistSubmissionInput,
): Promise<{ duplicate: boolean; record: WaitlistSubmissionRecord }> {
  const store = await readStore()

  const existing = store.submissions.find((submission) => submission.email === input.email)
  if (existing) {
    return { duplicate: true, record: existing }
  }

  const record: WaitlistSubmissionRecord = {
    ...input,
    submittedAt: new Date().toISOString(),
  }

  store.submissions.push(record)
  await writeStore(store)

  return { duplicate: false, record }
}

export async function getWaitlistStats(): Promise<{ total: number; byRole: Record<string, number> }> {
  const store = await readStore()
  const byRole = store.submissions.reduce<Record<string, number>>((acc, submission) => {
    acc[submission.role] = (acc[submission.role] ?? 0) + 1
    return acc
  }, {})

  return {
    total: store.submissions.length,
    byRole,
  }
}
