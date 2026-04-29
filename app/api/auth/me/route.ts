import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

import { validateSession, SESSION_COOKIE } from '@/lib/auth/sessions'
import { findUserById, toPublicUser } from '@/lib/auth/store'

export const runtime = 'nodejs'

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get(SESSION_COOKIE)?.value

    if (!token) {
      return NextResponse.json({ success: false, error: 'Not authenticated.' }, { status: 401 })
    }

    const session = await validateSession(token)
    if (!session) {
      return NextResponse.json({ success: false, error: 'Session expired or invalid.' }, { status: 401 })
    }

    const user = await findUserById(session.userId)
    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found.' }, { status: 404 })
    }

    return NextResponse.json({ success: true, user: toPublicUser(user) }, { status: 200 })
  } catch (error) {
    console.error('[auth][me] Failed to get current user', error)
    return NextResponse.json({ success: false, error: 'Unable to fetch user.' }, { status: 500 })
  }
}
