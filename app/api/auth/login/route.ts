import { NextResponse } from 'next/server'

import { findUserByEmail, toPublicUser } from '@/lib/auth/store'
import { verifyPassword } from '@/lib/auth/password'
import { createSession, SESSION_COOKIE } from '@/lib/auth/sessions'
import { parseLoginInput } from '@/lib/auth/validation'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  let payload: unknown

  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Request body must be valid JSON.' }, { status: 400 })
  }

  const parsed = parseLoginInput(payload)
  if (!parsed.ok) {
    return NextResponse.json({ success: false, error: parsed.error }, { status: 400 })
  }

  try {
    const user = await findUserByEmail(parsed.value.email)

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password.' },
        { status: 401 },
      )
    }

    const passwordOk = await verifyPassword(parsed.value.password, user.passwordHash)
    if (!passwordOk) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password.' },
        { status: 401 },
      )
    }

    const session = await createSession(user.id)

    const response = NextResponse.json({ success: true, user: toPublicUser(user) }, { status: 200 })
    response.cookies.set(SESSION_COOKIE, session.token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    })
    return response
  } catch (error) {
    console.error('[auth][login] Failed to authenticate user', error)
    return NextResponse.json(
      { success: false, error: 'Unable to sign in right now. Please try again.' },
      { status: 500 },
    )
  }
}
