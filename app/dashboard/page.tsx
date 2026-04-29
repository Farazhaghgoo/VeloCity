import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import type { Metadata } from 'next'

import { validateSession, SESSION_COOKIE } from '@/lib/auth/sessions'
import { findUserById, toPublicUser } from '@/lib/auth/store'
import type { PublicUser } from '@/lib/auth/types'
import DashboardClient from '@/components/DashboardClient'

export const metadata: Metadata = {
  title: 'Dashboard — VeloCity',
  description: 'Your VeloCity deal-flow dashboard.',
}

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value

  if (!token) redirect('/login')

  const session = await validateSession(token)
  if (!session) redirect('/login')

  const userRecord = await findUserById(session.userId)
  if (!userRecord) redirect('/login')

  const user: PublicUser = toPublicUser(userRecord)

  return <DashboardClient user={user} />
}
