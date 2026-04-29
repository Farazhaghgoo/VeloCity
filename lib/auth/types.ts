export const AUTH_ROLES = ['founder', 'vc'] as const

export const SESSION_COOKIE = 'velocity_session'

export type AuthRole = (typeof AUTH_ROLES)[number]

export interface SignupInput {
  name: string
  email: string
  password: string
  role: AuthRole
  company: string
}

export interface LoginInput {
  email: string
  password: string
}

export interface UserRecord {
  id: string
  name: string
  email: string
  passwordHash: string
  role: AuthRole
  company: string
  createdAt: string
}

export interface UserStore {
  users: UserRecord[]
}

export interface SessionRecord {
  token: string
  userId: string
  createdAt: string
  expiresAt: string
}

export interface SessionStore {
  sessions: SessionRecord[]
}

export interface PublicUser {
  id: string
  name: string
  email: string
  role: AuthRole
  company: string
  createdAt: string
}

export interface AuthSuccessResponse {
  success: true
  user: PublicUser
}

export interface AuthErrorResponse {
  success: false
  error: string
}

export type AuthApiResponse = AuthSuccessResponse | AuthErrorResponse

export const AUTH_ROLE_OPTIONS: Array<{ value: AuthRole; label: string }> = [
  { value: 'founder', label: "I'm a Founder" },
  { value: 'vc', label: "I'm a VC / Angel" },
]

export function isAuthRole(value: string): value is AuthRole {
  return AUTH_ROLES.includes(value as AuthRole)
}
