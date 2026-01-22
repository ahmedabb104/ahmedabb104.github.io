import React from 'react'
import { useFadeInOnScroll } from '../hooks/useFadeInOnScroll'
import TwinklingStars from './TwinklingStars'

const ExperienceItem = ({ exp, index, isEven, isVisible, onVisibilityChange }) => {
  const [ref, itemIsVisible] = useFadeInOnScroll({ threshold: 0.2 })
  const [hasAnimated, setHasAnimated] = React.useState(false)

  // Notify parent when visibility changes
  React.useEffect(() => {
    if (itemIsVisible && onVisibilityChange) {
      onVisibilityChange(index, itemIsVisible)
      if (!hasAnimated) {
        setHasAnimated(true)
      }
    }
  }, [itemIsVisible, index, onVisibilityChange, hasAnimated])

  return (
    <div
      ref={ref}
      className={`relative flex items-center transition-all duration-700 ease-out ${
        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
      } ${
        itemIsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
    >
      {/* Content Card */}
      <div
        className={`w-full md:w-5/12 ${
          isEven ? 'md:pr-8' : 'md:pl-8'
        }`}
      >
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300 border-t-4 border-primary-500 dark:border-primary-400">
          <div className="flex flex-col items-start">
            <p className="text-sm text-primary-600 dark:text-primary-400 font-semibold mb-2">
              {exp.period}
            </p>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">
              {exp.role}
            </h3>
            <p className="text-xl text-primary-600 dark:text-primary-400 font-medium mb-4">
              {exp.company}
            </p>
            <div className="text-gray-700 dark:text-gray-300 text-left leading-relaxed space-y-3">
              {Array.isArray(exp.description) ? (
                exp.description.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))
              ) : (
                <p>{exp.description}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Dot */}
      <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 z-10 items-center justify-center">
        {/* Outer circle outline */}
        <div 
          className={`absolute rounded-full transition-all duration-500 ${
            isVisible 
              ? 'w-10 h-10 border-2 border-primary-400 dark:border-primary-500 opacity-60' 
              : 'w-10 h-10 border-2 border-gray-400 dark:border-gray-600 opacity-40'
          } ${!hasAnimated && isVisible ? 'animate-bounce-activate' : ''}`}
        ></div>
        {/* Inner circle with glow */}
        <div 
          className={`relative w-6 h-6 rounded-full border-4 border-white dark:border-gray-800 transition-all duration-500 ${
            isVisible 
              ? `bg-primary-500 dark:bg-primary-400 shadow-[0_0_20px_rgba(14,165,233,0.8),0_0_40px_rgba(14,165,233,0.4)] ${!hasAnimated ? 'animate-bounce-activate' : ''}` 
              : 'bg-gray-400 dark:bg-gray-600'
          }`}
        ></div>
      </div>

      {/* Spacer for opposite side */}
      <div className="hidden md:block w-5/12"></div>
    </div>
  )
}

const Experience = () => {
  const [visibleItems, setVisibleItems] = React.useState(new Set())
  const [highestVisibleIndex, setHighestVisibleIndex] = React.useState(-1)
  const timelineContainerRef = React.useRef(null)

  const handleVisibilityChange = (index, isVisible) => {
    setVisibleItems(prev => {
      const newSet = new Set(prev)
      if (isVisible) {
        newSet.add(index)
        // Update highest visible index
        setHighestVisibleIndex(prevHighest => Math.max(prevHighest, index))
      }
      return newSet
    })
  }

  // Replace with your actual experience data
  const experiences = [
    {
      company: 'Thri5',
      role: 'AI/ML Engineer',
      period: 'April 2026 – ',
      description: 'Excited to be returning to Thri5 this April as an AI/ML Engineer :)'
    },
    {
      company: 'Thri5',
      role: 'Data Scientist',
      period: 'May 2025 – Dec 2025',
      description: ['\"Data Scientist\" would be a bit of an understatement.', 'At this startup, I did a little bit of everything as an intern. I designed and built dozens of weekly data detections (rules + ML, scoring), analyzed large datasets to extract actionable insights for non-technical stakeholders, designed and built a scalable ML pipeline, explored building AI agents, and took  ownership of analyzing the impact of our first customer pilot (thus securing the startup\'s first commercial deal).',
      'It was a busy 8 months, but I learned a lot and had a lot of fun building a product from the ground up!'
      ]
    },
    {
      company: 'Nokia',
      role: 'Deep Packet Inspection QA Engineer',
      period: 'May 2024 – Aug 2024',
      description: ['This was the first time I made some useful software for a company!',
      'I developed an internal visualization tool to analyze network traffic stats over time, which aided in identifying the root-cause of at least 3 customer-reported router issues.']
    },
    {
      company: 'Nokia',
      role: 'Service Router Platform Test Developer',
      period: 'May 2023 – Aug 2023',
      description: ['I tested dozens of router network features, writing test cases and automation scripts to validate functionality and performance.']
    },
    {
      company: 'TD Bank',
      role: 'Software Engineer',
      period: 'May 2022 – Aug 2022',
      description: ['A full-stack web development internship.', 'I did UI/UX wireframing for an internal KPI dashboard, and developed the front-end to improve data visualization. I also developed a scraper to pull and store tool health data, allowing the KPI dashboard to display health statuses of internal software.']
    }
  ]

  // Calculate timeline progress percentage
  const getTimelineProgress = () => {
    if (highestVisibleIndex < 0) return 0
    // Calculate based on item positions
    // Each item takes up space, and we want to color up to the center of the highest visible item's dot
    const totalItems = experiences.length
    if (totalItems === 0) return 0
    
    // Progress up to the center of the highest visible item
    // Add 0.5 to go to the center of that item
    const progress = ((highestVisibleIndex + 0.5) / totalItems) * 100
    return Math.min(progress, 100)
  }

  return (
    <section 
      id="experience" 
      className="relative section-padding bg-gray-50 dark:bg-gray-800 overflow-hidden"
    >
      <TwinklingStars />
      <div className="relative max-w-6xl mx-auto z-10">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Work Experience
        </h2>
        <div className="relative" ref={timelineContainerRef}>
          {/* Vertical Timeline Line - Gray background */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-300 dark:bg-gray-600 hidden md:block"></div>
          
          {/* Progressive colored timeline line */}
          <div 
            className="absolute left-1/2 transform -translate-x-1/2 w-1 hidden md:block bg-primary-300 dark:bg-primary-700 transition-all duration-700 ease-out"
            style={{
              height: `${getTimelineProgress()}%`,
              top: 0,
            }}
          ></div>
          
          {/* Timeline Items */}
          <div className="space-y-12 md:space-y-16">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0
              const isVisible = visibleItems.has(index)
              return (
                <ExperienceItem
                  key={index}
                  exp={exp}
                  index={index}
                  isEven={isEven}
                  isVisible={isVisible}
                  onVisibilityChange={handleVisibilityChange}
                />
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience

