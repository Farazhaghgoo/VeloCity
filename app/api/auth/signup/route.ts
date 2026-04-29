import { NextResponse } from 'next/server'

import { createUser, toPublicUser } from '@/lib/auth/store'
import { createSession, SESSION_COOKIE } from '@/lib/auth/sessions'
import { parseSignupInput } from '@/lib/auth/validation'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  let payload: unknown

  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Request body must be valid JSON.' }, { status: 400 })
  }

  const parsed = parseSignupInput(payload)
  if (!parsed.ok) {
    return NextResponse.json({ success: false, error: parsed.error }, { status: 400 })
  }

  try {
    const { duplicate, user } = await createUser(parsed.value)

    if (duplicate) {
      return NextResponse.json(
        { success: false, error: 'An account with this email already exists.' },
        { status: 409 },
      )
    }

    if (!user) {
      throw new Error('User creation returned null unexpectedly.')
    }

    const session = await createSession(user.id)

    const response = NextResponse.json({ success: true, user: toPublicUser(user) }, { status: 201 })
    response.cookies.set(SESSION_COOKIE, session.token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    })
    return response
  } catch (error) {
    console.error('[auth][signup] Failed to create user', error)
    return NextResponse.json(
      { success: false, error: 'Unable to create your account right now. Please try again.' },
      { status: 500 },
    )
  }
}
