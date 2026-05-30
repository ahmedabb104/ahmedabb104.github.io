import { useState, useEffect, useRef } from 'react'

const roles = [
  {
    period: 'Apr 2026 — Present',
    title: 'AI/ML Engineer',
    company: 'Thri5',
    description:
      'Thri5 is a seed stage AI startup that is the AI layer for retail execution. \n We are rapidly expanding to new large scale customers.',
    tags: ['AI Agents', 'Business Intelligence', 'PostgreSQL', 'Snowflake SQL', 'Airflow', 'Data Analysis'],
    logo: '/thri5.jpg',
  },
  {
    period: 'May 2025 — Dec 2025',
    title: 'Data Scientist',
    company: 'Thri5',
    description:
      "At this startup, I did a little bit of everything as an intern. \nDesigned and built dozens of weekly data detections (rules + ML, scoring) \nDesigned and built a scalable ML pipeline and explored building AI agents \nAnalyzed large datasets to extract actionable insights for non-technical stakeholders  \nLed a causal inference analysis on our first customer pilot, helping secure the startup's first commercial deal.",
    tags: ['Snowflake SQL', 'Airflow', 'Data Analysis', 'ML', 'MLOps', 'Causal Inference', 'AI Agents'],
    logo: '/thri5.jpg',
  },
  {
    period: 'May 2024 — Aug 2024',
    title: 'Deep Packet Inspection QA Engineer',
    company: 'Nokia',
    description:
      'Developed an internal dashboard with clean visualizations to analyze network traffic stats over time, which aided in identifying the root-cause of at least 5 customer-reported router bugs.',
    tags: ['Wireshark', 'Scapy', 'pytest', 'Data Analysis', 'Data Visualization'],
    logo: '/nokia.jpg',
  },
  {
    period: 'May 2023 — Aug 2023',
    title: 'Service Router Platform Test Developer',
    company: 'Nokia',
    description:
      'Tested dozens of router network features, writing test cases and automation scripts to validate functionality and performance',
    tags: ['Test Automation', 'pytest', 'Network Protocols'],
    logo: '/nokia.jpg',
  },
  {    period: 'May 2022 — Aug 2022',
    title: 'Software Engineer',
    company: 'TD Bank',
    description:
      'Developed scrapers to pull and store tool health data, allowing the KPI dashboard to display health statuses of internal software \nFront-end development to improve data visualization \nUI/UX wireframing for an internal KPI dashboard',
    tags: ['Flask', 'React', 'Figma'],
    logo: '/td.jpg',}
]

const academics = [
  {
    type: 'DEGREE',
    title: 'M.S. Data Science and AI',
    subtitle: 'University of Waterloo',
    accent: true,
  },
  {
    type: 'DEGREE',
    title: 'B.S. Computer Science',
    subtitle: "McMaster University",
  },
]

function RoleCard({ role }) {
  return (
    <article className="group relative bg-surface-container-low p-8 md:p-12 transition-all duration-300 hover:bg-surface-container-high hover:-translate-y-1">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className="w-16 h-16 bg-surface-container-highest flex items-center justify-center overflow-hidden shrink-0">
          <img
            className="w-12 h-12 transition-all duration-500"
            src={role.logo}
            alt={`${role.company} logo`}
          />
        </div>
        <div className="flex-1">
          <header className="mb-6">
            <div className="md:hidden font-label text-[10px] tracking-widest text-primary mb-2">
              {role.period}
            </div>
            <h3 className="font-headline text-3xl font-bold tracking-tight text-on-surface mb-1">
              {role.title}
            </h3>
            <p className="font-body text-xl text-primary font-light">{role.company}</p>
          </header>
          <div className="font-body text-on-surface-variant leading-relaxed mb-8 max-w-2xl space-y-4">
            {role.description.split('\n').map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {role.tags.map((tag) => (
              <span
                key={tag}
                className="bg-surface-container-highest px-4 py-1.5 rounded-full font-label text-[10px] uppercase tracking-wider text-on-surface-variant"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}

export default function Experience() {
  const [railHeight, setRailHeight] = useState(0)
  const timelineRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return
      const rect = timelineRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const totalHeight = rect.height

      if (rect.top > windowHeight) {
        setRailHeight(0)
      } else if (rect.bottom < 0) {
        setRailHeight(100)
      } else {
        const scrolled = windowHeight - rect.top
        const pct = Math.min(100, Math.max(0, (scrolled / totalHeight) * 100))
        setRailHeight(pct)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className="pt-32 pb-24 px-8 max-w-7xl mx-auto min-h-screen">
      {/* Hero Section */}
      <section className="fade-up mb-24" style={{ animationDelay: '0ms' }}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8">
            <h1 className="font-headline text-6xl md:text-8xl font-extrabold tracking-tighter text-on-surface mb-4">
              Experience<span className="text-primary">.</span>
            </h1>
            <p className="font-label text-sm uppercase tracking-[0.3em] text-on-surface-variant">
              The Professional Arc
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="fade-up relative" style={{ animationDelay: '200ms' }} ref={timelineRef}>
        {/* Central Rail (absolute, spans full height) */}
        <div className="hidden md:block absolute left-[calc(2/12*100%+3rem)] top-0 bottom-0 w-px">
          <div className="progress-rail opacity-20" />
          <div
            className="progress-rail-fill"
            style={{ height: `${railHeight}%` }}
          />
        </div>

        <div className="flex flex-col gap-24">
          {roles.map((role) => (
            <div key={role.title} className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24">
              {/* Date */}
              <div className="hidden md:flex md:col-span-2 text-right pt-10 justify-end">
                <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
                  {role.period}
                </span>
              </div>
              {/* Spacer for rail */}
              <div className="hidden md:block md:col-span-1" />
              {/* Card */}
              <div className="md:col-span-9">
                <RoleCard role={role} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Academic / Certs Mini Bento */}
      <section className="fade-up mt-40" style={{ animationDelay: '400ms' }}>
        <h2 className="font-headline text-4xl font-bold tracking-tighter mb-12">
          Academics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {academics.map((item) => (
            <div
              key={item.title}
              className={`bg-surface-container-low p-8 ${
                item.accent ? 'border-l-2 border-primary' : ''
              }`}
            >
              <p className="font-label text-[10px] text-primary mb-4">{item.type}</p>
              <h4 className="font-headline text-xl font-bold mb-2">{item.title}</h4>
              <p className="font-body text-sm text-on-surface-variant">{item.subtitle}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
