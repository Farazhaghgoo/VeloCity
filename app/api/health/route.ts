import { NextResponse } from 'next/server'

import { getWaitlistStats } from '@/lib/waitlist/store'

export const runtime = 'nodejs'

export async function GET() {
  try {
    const waitlist = await getWaitlistStats()

    return NextResponse.json(
      {
        status: 'ok',
        service: 'velocity-backend',
        now: new Date().toISOString(),
        waitlist,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('[health][GET] Health probe failed', error)

    return NextResponse.json(
      {
        status: 'error',
        service: 'velocity-backend',
        now: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
