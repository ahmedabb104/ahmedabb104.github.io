import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/experience', label: 'Experience' },
  { to: '/projects', label: 'Projects' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem('theme')
    return stored ? stored === 'dark' : true
  })

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  return (
    <header className="fixed top-0 w-full z-50 glass-header font-headline tracking-tighter antialiased">
      <nav className="relative flex items-center px-8 py-6 max-w-7xl mx-auto">
        {/* Logo - left */}
        <NavLink to="/" className="text-xl font-bold tracking-tighter text-primary">
          <img src="/favicon.svg" alt="Ahmed Abbas" className="w-12 h-12" />
        </NavLink>

        {/* Nav links - centered */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                isActive
                  ? 'text-primary border-b border-primary pb-1 transition-all duration-300 ease-out'
                  : 'dark:text-white/70 text-black/60 hover:text-primary transition-all duration-300 ease-out'
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-2">
          {/* Theme toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="hidden md:flex items-center justify-center w-9 h-9 rounded-full text-primary hover:bg-primary/10 transition-all duration-300"
            aria-label="Toggle theme"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
              {isDark ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-primary">
              {mobileOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass-header border-t border-outline-variant/15 px-8 py-6 space-y-4">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block font-headline tracking-tighter ${
                  isActive
                    ? 'text-primary'
                    : 'dark:text-white/70 text-black/60 hover:text-primary'
                } transition-all duration-300`
              }
            >
              {label}
            </NavLink>
          ))}
          <button
            onClick={() => setIsDark(!isDark)}
            className="flex items-center gap-2 dark:text-white/70 text-black/60 hover:text-primary transition-all duration-300"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
              {isDark ? 'light_mode' : 'dark_mode'}
            </span>
            <span>{isDark ? 'Light mode' : 'Dark mode'}</span>
          </button>
        </div>
      )}
    </header>
  )
}
