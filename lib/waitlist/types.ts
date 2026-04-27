export const WAITLIST_ROLES = ['founder', 'vc', 'lp'] as const

export type WaitlistRole = (typeof WAITLIST_ROLES)[number]

export interface WaitlistSubmissionInput {
  email: string
  role: WaitlistRole
}

export interface WaitlistSubmissionRecord extends WaitlistSubmissionInput {
  submittedAt: string
}

export interface WaitlistStoreFile {
  submissions: WaitlistSubmissionRecord[]
}

export interface WaitlistApiSuccessResponse {
  success: true
  message: string
}

export interface WaitlistApiErrorResponse {
  success?: false
  error: string
}

export type WaitlistApiResponse = WaitlistApiSuccessResponse | WaitlistApiErrorResponse
