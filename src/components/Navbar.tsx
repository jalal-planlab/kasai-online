import { motion } from 'framer-motion'
import { Menu, Moon, X } from 'lucide-react'
import { useEffect, useState } from 'react'

const links = [
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#packages', label: 'Packages' },
  { href: '#book', label: 'Book Now' },
]

type NavbarProps = {
  onBookClick: () => void
}

export function Navbar({ onBookClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-border/60 bg-bg/80 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 lg:px-8">
        <a href="#" className="flex items-center gap-2 group">
          <Moon className="h-5 w-5 text-gold transition-transform group-hover:-rotate-12" />
          <span className="text-lg font-bold tracking-tight">
            Kasai<span className="text-gold">OnCall</span>
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-muted transition-colors hover:text-text"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={onBookClick}
          className="hidden rounded-full border border-gold px-5 py-2 text-sm font-semibold text-gold transition-all hover:bg-gold/10 md:block"
        >
          Book Now
        </button>

        <button
          type="button"
          className="rounded-lg p-2 text-muted md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="border-t border-border bg-bg/95 backdrop-blur-xl md:hidden"
        >
          <ul className="flex flex-col gap-1 px-5 py-4">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-sm font-medium text-muted hover:bg-card hover:text-text"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={() => {
                  setOpen(false)
                  onBookClick()
                }}
                className="mt-2 w-full rounded-full border border-gold py-3 text-sm font-semibold text-gold"
              >
                Book Now
              </button>
            </li>
          </ul>
        </motion.div>
      )}
    </motion.header>
  )
}
