import { AUTH_ROLES, type AuthRole, type SignupInput, type LoginInput } from './types'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const AUTH_ROLE_SET = new Set<string>(AUTH_ROLES)

type ParseResult<T> = { ok: true; value: T } | { ok: false; error: string }

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export function parseSignupInput(payload: unknown): ParseResult<SignupInput> {
  if (!isPlainObject(payload)) {
    return { ok: false, error: 'Request body must be a JSON object.' }
  }

  const { name, email, password, role, company } = payload as Record<string, unknown>

  if (typeof name !== 'string' || name.trim().length < 2) {
    return { ok: false, error: 'Name must be at least 2 characters.' }
  }

  if (typeof email !== 'string') {
    return { ok: false, error: 'Email is required.' }
  }
  const normalizedEmail = email.trim().toLowerCase()
  if (!EMAIL_PATTERN.test(normalizedEmail)) {
    return { ok: false, error: 'Please enter a valid email address.' }
  }

  if (typeof password !== 'string' || password.length < 8) {
    return { ok: false, error: 'Password must be at least 8 characters.' }
  }

  if (typeof role !== 'string' || !AUTH_ROLE_SET.has(role)) {
    return { ok: false, error: 'Role must be founder or vc.' }
  }

  if (typeof company !== 'string' || company.trim().length < 1) {
    return { ok: false, error: 'Company name is required.' }
  }

  return {
    ok: true,
    value: {
      name: name.trim(),
      email: normalizedEmail,
      password,
      role: role as AuthRole,
      company: company.trim(),
    },
  }
}

export function parseLoginInput(payload: unknown): ParseResult<LoginInput> {
  if (!isPlainObject(payload)) {
    return { ok: false, error: 'Request body must be a JSON object.' }
  }

  const { email, password } = payload as Record<string, unknown>

  if (typeof email !== 'string') {
    return { ok: false, error: 'Email is required.' }
  }
  const normalizedEmail = email.trim().toLowerCase()
  if (!EMAIL_PATTERN.test(normalizedEmail)) {
    return { ok: false, error: 'Please enter a valid email address.' }
  }

  if (typeof password !== 'string' || password.length === 0) {
    return { ok: false, error: 'Password is required.' }
  }

  return { ok: true, value: { email: normalizedEmail, password } }
}
