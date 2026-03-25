import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-white/5 bg-dark-500/50">
      <div className="page-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg mb-4">
              <span className="text-2xl">🤖</span>
              <span className="gradient-text">My AI Agency</span>
            </Link>
            <p className="text-dark-300 text-sm max-w-sm leading-relaxed">
              An AI-powered agency with one human leader and seven AI team members,
              delivering exceptional digital solutions across all industries.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-dark-200 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { href: '/services', label: 'Services' },
                { href: '/team', label: 'Team' },
                { href: '/case-studies', label: 'Case Studies' },
                { href: '/blog', label: 'Blog' },
                { href: '/testimonials', label: 'Testimonials' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-dark-300 hover:text-accent-cyan transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-dark-200 mb-4">
              Get in Touch
            </h3>
            <p className="text-dark-300 text-sm leading-relaxed">
              Ready to supercharge your project with AI?
            </p>
            <p className="text-accent-cyan text-sm mt-2">hello@myaiagency.com</p>
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-dark-400 text-xs">
            © {currentYear} My AI Agency. All rights reserved.
          </p>
          <p className="text-dark-400 text-xs">
            Powered by humans & AI
          </p>
        </div>
      </div>
    </footer>
  )
}
