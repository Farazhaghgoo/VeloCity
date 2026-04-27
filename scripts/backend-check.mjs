import assert from 'node:assert/strict'
import path from 'node:path'
import { readFile } from 'node:fs/promises'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const WAITLIST_ROLES = ['founder', 'vc', 'lp']
const WAITLIST_ROLE_SET = new Set(WAITLIST_ROLES)

function parseWaitlistSubmission(payload) {
  if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) {
    return { ok: false, error: 'Request body must be a JSON object.' }
  }

  const rawEmail = payload.email
  const rawRole = payload.role

  if (typeof rawEmail !== 'string' || typeof rawRole !== 'string') {
    return { ok: false, error: 'Email and role are required.' }
  }

  const email = rawEmail.trim().toLowerCase()
  const role = rawRole.trim().toLowerCase()

  if (!EMAIL_PATTERN.test(email)) {
    return { ok: false, error: 'Please enter a valid email address.' }
  }

  if (!WAITLIST_ROLE_SET.has(role)) {
    return { ok: false, error: 'Role is invalid.' }
  }

  return { ok: true, value: { email, role } }
}

const valid = parseWaitlistSubmission({ email: '  FOUNDER@Example.com  ', role: 'founder' })
assert.equal(valid.ok, true)
if (valid.ok) {
  assert.equal(valid.value.email, 'founder@example.com')
  assert.equal(valid.value.role, 'founder')
}

const invalidEmail = parseWaitlistSubmission({ email: 'not-an-email', role: 'founder' })
assert.equal(invalidEmail.ok, false)

const invalidRole = parseWaitlistSubmission({ email: 'a@b.com', role: 'cto' })
assert.equal(invalidRole.ok, false)

const dataPath = path.join(process.cwd(), 'data', 'waitlist.json')
const rawStore = await readFile(dataPath, 'utf8')
const parsedStore = JSON.parse(rawStore)

assert.equal(typeof parsedStore, 'object')
assert.equal(Array.isArray(parsedStore.submissions), true)

console.log('backend-check: validation + storage contract passed')
