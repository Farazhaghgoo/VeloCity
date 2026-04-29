import type { Metadata } from 'next'
import SignupForm from '@/components/SignupForm'

export const metadata: Metadata = {
  title: 'Create Account — VeloCity',
  description: 'Join VeloCity as a verified founder or VC.',
}

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-bg">
      <div className="w-full max-w-[420px]">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 mb-10 font-bold tracking-tight text-[15px] text-txt">
          <span
            className="w-[22px] h-[22px] rounded-md flex-shrink-0 flex items-center justify-center text-[9px] font-bold text-white tracking-widest"
            style={{
              background: 'linear-gradient(135deg, #243B53, #3EBD93)',
              boxShadow: '0 0 14px rgba(62,189,147,0.25)',
            }}
          >
            VC
          </span>
          <span>
            <span className="text-accent">V</span>elo<span className="text-accent">C</span>ity
          </span>
        </a>

        {/* Card */}
        <div className="bg-panel rounded-2xl border border-line p-8 card-shadow">
          <div className="mb-7">
            <h1 className="text-xl font-bold text-txt mb-1">Create your account</h1>
            <p className="text-sm text-muted">Join as a verified founder or VC investor.</p>
          </div>

          <SignupForm />
        </div>
      </div>
    </div>
  )
}
