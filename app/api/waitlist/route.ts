import { NextResponse } from 'next/server'

import { addWaitlistSubmission, getWaitlistStats } from '@/lib/waitlist/store'
import { parseWaitlistSubmission } from '@/lib/waitlist/validation'

export const runtime = 'nodejs'

export async function GET() {
  try {
    const stats = await getWaitlistStats()
    return NextResponse.json({ success: true, waitlist: stats }, { status: 200 })
  } catch (error) {
    console.error('[waitlist][GET] Failed to load waitlist stats', error)
    return NextResponse.json({ error: 'Unable to load waitlist stats.' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  let payload: unknown

  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Request body must be valid JSON.' }, { status: 400 })
  }

  const parsed = parseWaitlistSubmission(payload)

  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 })
  }

  try {
    const { duplicate } = await addWaitlistSubmission(parsed.value)

    if (duplicate) {
      return NextResponse.json(
        {
          success: true,
          message: "You're already on the waitlist. We'll be in touch soon.",
        },
        { status: 200 },
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: "You're on the list. We'll be in touch within 72 hours.",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error('[waitlist][POST] Failed to save submission', error)
    return NextResponse.json({ error: 'Unable to save your request right now. Please try again.' }, { status: 500 })
  }
}
