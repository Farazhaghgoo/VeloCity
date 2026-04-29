import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

import { deleteSession, SESSION_COOKIE } from '@/lib/auth/sessions'

export const runtime = 'nodejs'

export async function POST() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get(SESSION_COOKIE)?.value

    if (token) {
      await deleteSession(token)
    }

    const response = NextResponse.json({ success: true }, { status: 200 })
    response.cookies.set(SESSION_COOKIE, '', {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 0,
    })
    return response
  } catch (error) {
    console.error('[auth][logout] Failed to sign out', error)
    return NextResponse.json({ success: false, error: 'Unable to sign out.' }, { status: 500 })
  }
}
