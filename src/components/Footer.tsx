import { Moon } from 'lucide-react'
import { CITIES } from '../lib/constants'

const quickLinks = [
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#packages', label: 'Packages' },
  { href: '#book', label: 'Book Now' },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface px-5 py-16">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-3">
        <div>
          <a href="#" className="flex items-center gap-2">
            <Moon className="h-5 w-5 text-gold" />
            <span className="text-lg font-bold">
              Kasai<span className="text-gold">OnCall</span>
            </span>
          </a>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Verified Kasai at your doorstep. Fixed price, on-time, hygienic Qurbani for Eid Ul
            Adha across Pakistan.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-gold">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-muted transition-colors hover:text-text"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-gold">
            Cities We Cover
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {CITIES.filter((c) => c !== 'Other').join(' · ')} & more
          </p>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-6xl border-t border-border pt-8 text-center text-xs text-muted">
        © 2026 KasaiOnCall — Eid Mubarak 🌙
      </div>
    </footer>
  )
}
