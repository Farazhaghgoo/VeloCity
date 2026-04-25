'use client'

const FOOTER_COLS = [
  {
    heading: 'Product',
    links: [
      { label: 'How it works', href: '#how' },
      { label: 'Matching engine', href: '#engine' },
      { label: 'Data room', href: '#' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Changelog', href: '#' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Press kit', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy policy', href: '#' },
      { label: 'Terms of service', href: '#' },
      { label: 'Security', href: '#' },
      { label: 'Cookie policy', href: '#' },
    ],
  },
  {
    heading: 'Connect',
    links: [
      { label: 'LinkedIn', href: '#' },
      { label: 'Twitter / X', href: '#' },
      { label: 'GitHub', href: '#' },
    ],
  },
]

const SECURITY_BADGES = [
  { label: 'SOC 2 Type II', sub: 'Q3 2026' },
  { label: 'AES-256', sub: 'Encrypted' },
  { label: 'GDPR', sub: 'Compliant' },
  { label: 'OAuth', sub: 'Read-only' },
]

export default function Footer() {
  return (
    <footer className="pt-14 pb-6 border-t border-line bg-bg">
      <div className="max-w-[1200px] mx-auto px-7">
        <div
          className="grid pb-10 mb-8 border-b border-line gap-10"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}
        >
          {/* Brand */}
          <div className="min-w-[200px]">
            <a href="#" className="flex items-center gap-2.5 font-bold tracking-tight w-fit text-txt">
              <span
                className="w-[22px] h-[22px] rounded-md flex-shrink-0 flex items-center justify-center text-[9px] font-bold text-white tracking-widest"
                style={{
                  background: 'linear-gradient(135deg, #243B53, #3EBD93)',
                  boxShadow: '0 0 14px rgba(62,189,147,0.25)',
                }}
              >
                VC
              </span>
              <span><span className="text-accent">V</span>elo<span className="text-accent">C</span>ity</span>
            </a>
            <p className="mt-2.5 text-xs text-muted m-0">The verified deal-flow layer.</p>
            <p className="mt-1 text-xs text-ghost m-0">London · Singapore · US (Q3)</p>
          </div>

          {/* Link columns */}
          {FOOTER_COLS.map(({ heading, links }) => (
            <div key={heading}>
              <h5 className="text-xs font-semibold tracking-[0.12em] uppercase mb-3.5 m-0 text-muted">
                {heading}
              </h5>
              <div className="flex flex-col gap-0.5">
                {links.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="block text-sm py-1 text-dim hover:text-txt transition-colors duration-150"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Security badges + copyright */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap gap-2">
            {SECURITY_BADGES.map(({ label, sub }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-line-2 bg-panel"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full bg-accent-2 flex-shrink-0"
                  style={{ boxShadow: '0 0 5px rgba(62,189,147,0.4)' }}
                />
                <span className="text-[11px] font-semibold text-txt">{label}</span>
                <span className="text-[11px] text-muted">{sub}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-between items-center gap-3">
            <span className="text-xs text-muted">© 2026 VeloCity Labs Ltd. All rights reserved.</span>
            <span className="text-xs text-ghost">Registered in England &amp; Wales · FCA aligned</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
