import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email, role } = await request.json()

    if (!email || !role) {
      return NextResponse.json({ error: 'Email and role are required.' }, { status: 400 })
    }

    // Simulate async DB/CRM write
    await new Promise((resolve) => setTimeout(resolve, 650))

    // In production: insert into Supabase / Resend / HubSpot here
    console.log('[waitlist]', { email, role, at: new Date().toISOString() })

    return NextResponse.json({
      success: true,
      message: "You're on the list. We'll be in touch within 72 hours.",
    })
  } catch {
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
