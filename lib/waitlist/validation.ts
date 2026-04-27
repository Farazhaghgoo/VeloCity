import { WAITLIST_ROLES, type WaitlistRole, type WaitlistSubmissionInput } from './types'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const WAITLIST_ROLE_SET = new Set<string>(WAITLIST_ROLES)

type ParseWaitlistSubmissionResult =
  | { ok: true; value: WaitlistSubmissionInput }
  | { ok: false; error: string }

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export function parseWaitlistSubmission(payload: unknown): ParseWaitlistSubmissionResult {
  if (!isPlainObject(payload)) {
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

  return {
    ok: true,
    value: {
      email,
      role: role as WaitlistRole,
    },
  }
}
