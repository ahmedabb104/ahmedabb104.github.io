import { useState, useEffect, useRef } from 'react'

const GLITCH_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&!?'

function GlitchWord({ text }) {
  const [chars, setChars] = useState(() =>
    text.split('').map(() => GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)])
  )
  const [resolved, setResolved] = useState(0)
  const frameRef = useRef(0)

  useEffect(() => {
    const FRAMES_PER_CHAR = 5
    const INTERVAL_MS = 40

    const id = setInterval(() => {
      frameRef.current++
      const newResolved = Math.min(Math.floor(frameRef.current / FRAMES_PER_CHAR), text.length)
      setResolved(newResolved)
      setChars(
        text.split('').map((ch, i) =>
          i < newResolved
            ? ch
            : GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
        )
      )
      if (newResolved >= text.length) clearInterval(id)
    }, INTERVAL_MS)

    return () => clearInterval(id)
  }, [text])

  return (
    <>
      {chars.map((ch, i) => (
        <span key={i} className={i >= resolved ? 'text-primary' : 'inherit'}>
          {ch}
        </span>
      ))}
    </>
  )
}

function timeAgo(dateStr) {
  const seconds = Math.floor((Date.now() - new Date(dateStr)) / 1000)
  if (seconds < 60) return `${seconds}s ago`
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months}mo ago`
  return `${Math.floor(months / 12)}y ago`
}

function useLastCommit() {
  const [state, setState] = useState({ time: null, loading: true })

  useEffect(() => {
    fetch('https://api.github.com/users/ahmedabb104/events/public')
      .then((r) => r.json())
      .then((events) => {
        const push = events.find((e) => e.type === 'PushEvent')
        setState({ time: push?.created_at ?? null, loading: false })
      })
      .catch(() => setState({ time: null, loading: false }))
  }, [])

  return state
}

export default function Home() {
  const { time, loading } = useLastCommit()

  return (
    <main className="pt-32 px-8 max-w-6xl mx-auto pb-24">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-16 items-start">

        {/* Left column */}
        <section className="space-y-12">
          <div className="fade-up space-y-4" style={{ animationDelay: '0ms' }}>
            <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight text-on-background">
              Hey, I'm <GlitchWord text="Ahmed" />
            </h1>
            <p className="font-label text-primary uppercase tracking-[0.2em] text-sm">
              ML Engineer + Data Scientist | UWaterloo
            </p>
          </div>

          <div className="fade-up space-y-6" style={{ animationDelay: '150ms' }}>
            <h2 className="font-headline text-2xl font-bold text-on-background tracking-tight">
              Who I Am
            </h2>
            <div className="space-y-4 text-xl text-on-surface-variant font-light leading-relaxed">
              <p>
                At Thri5, an early-stage AI startup, as a <span className="text-on-surface font-semibold">Data Scientist</span>, I built the ML pipeline
                and also proved <span className="text-on-surface font-semibold">millions ($) in annual profit</span> via a causal inference analysis.
              </p>
              <p>Previous experience at Nokia and TD Bank.</p>
              <p>Finishing off my Master in Data Science/AI @ UWaterloo this April.</p>
              <p>
                You can reach me via{' '}
                <a
                  href="https://linkedin.com/in/ahmedabbascs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline underline-offset-4 decoration-primary transition-colors"
                >
                  LinkedIn
                </a>
                {' '}or at{' '}
                <a
                  href="mailto:ahmedabb101@gmail.com"
                  className="text-primary hover:underline underline-offset-4 decoration-primary transition-colors"
                >
                  ahmedabb101@gmail.com
                </a>
              </p>
            </div>
          </div>

          <div className="fade-up space-y-6" style={{ animationDelay: '300ms' }}>
            <div className="flex flex-wrap gap-3">
              {['Business Intelligence', 'Data Analysis', 'AI Agents', 'Reinforcement Learning'].map(
                (skill) => (
                  <span
                    key={skill}
                    className="bg-surface-container-highest px-4 py-1.5 rounded-full font-label text-[0.65rem] uppercase tracking-widest text-on-surface-variant border border-outline-variant/20"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </div>
        </section>

        {/* Right column */}
        <aside className="fade-up flex flex-col gap-6 md:w-64" style={{ animationDelay: '200ms' }}>
          <div className="relative w-40 md:w-full mx-auto">
            <div className="absolute inset-0 translate-x-2.5 translate-y-2.5 border border-primary/40 rounded-lg" />
            <img
              src="/headshot.jpg"
              alt="Ahmed Abbas"
              className="relative w-full rounded-lg object-cover object-top aspect-[3/4]"
            />
          </div>
          <div className="bg-surface-container-low p-4 rounded-lg border-l-2 border-primary/30">
            <div className="flex items-center gap-2">
              <span
                className="material-symbols-outlined text-primary text-sm"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                commit
              </span>
              <span className="font-label text-[0.65rem] uppercase tracking-widest text-on-surface-variant">
                Last Commit
              </span>
              <span className="font-label text-[0.65rem] uppercase tracking-widest text-primary ml-1">
                {loading ? '...' : time ? `— ${timeAgo(time)}` : '— unavailable'}
              </span>
            </div>
          </div>
        </aside>

      </div>
    </main>
  )
}
