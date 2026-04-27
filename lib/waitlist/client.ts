import { WAITLIST_ROLES, type WaitlistRole } from './types'

export const WAITLIST_ROLE_OPTIONS: Array<{ value: WaitlistRole; label: string }> = [
  { value: 'founder', label: "I'm a Founder" },
  { value: 'vc', label: "I'm a VC / Angel" },
  { value: 'lp', label: "I'm an LP" },
]

export function isWaitlistRole(value: string): value is WaitlistRole {
  return WAITLIST_ROLES.includes(value as WaitlistRole)
}
