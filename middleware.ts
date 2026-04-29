import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { SESSION_COOKIE } from '@/lib/auth/types'

export function middleware(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value

  // Cookie presence check only — the Edge Runtime cannot access the file system.
  // Full session cryptographic validation is done inside the server component at
  // app/dashboard/page.tsx, which will redirect to /login if the token is invalid.
  if (!token) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('from', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
