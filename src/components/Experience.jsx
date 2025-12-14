import { useFadeInOnScroll } from '../hooks/useFadeInOnScroll'
import NetworkAnimation from './NetworkAnimation'

const ExperienceItem = ({ exp, index, isEven }) => {
  const [ref, isVisible] = useFadeInOnScroll({ threshold: 0.2 })

  return (
    <div
      ref={ref}
      className={`relative flex items-center transition-all duration-700 ease-out ${
        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
      } ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
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
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-inside text-left">
              {exp.description.map((item, idx) => (
                <li key={idx} className="list-disc">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Timeline Dot */}
      <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-500 dark:bg-primary-400 rounded-full border-4 border-white dark:border-gray-800 shadow-lg z-10"></div>

      {/* Spacer for opposite side */}
      <div className="hidden md:block w-5/12"></div>
    </div>
  )
}

const Experience = () => {
  // Replace with your actual experience data
  const experiences = [
    {
      company: 'Thri5',
      role: 'AI/ML Engineer',
      period: 'May 2026 – ',
      description: [
        'Excited to be returning to Thri5 as an AI/ML Engineer, where I will be working on the platform\'s AI Agents.'
      ]
    },
    {
      company: 'Thri5',
      role: 'Data Scientist',
      period: 'May 2025 – Dec 2025',
      description: [
        'Built and deployed 10+ predictive models using advanced statistical methods and machine learning algorithms for a major retail client, uplifting profit by 3.6% and cycle count performance by 138%',
        'Analyzed large-scale datasets to extract actionable insights for non-technical stakeholders',
        'Planned and implemented a scalable ML pipeline in Snowflake, orchestrating with an Airflow DAG',
        'Conducted a causal inference analysis on our first customer pilot, using statistical significance testing to validate sales impact, securing the startup’s first commercial deal'
      ]
    },
    {
      company: 'Nokia',
      role: 'Deep Packet Inspection QA Engineer',
      period: 'May 2024 – Aug 2024',
      description: [
        'Developed a visualization tool using data from unstructured text documents to analyze network traffic stats over time, aiding in identifying the root-cause of at least 3 customer-reported issues',
        'Generated artificial network traffic using Scapy for 12 feature tests, enhancing test coverage and robustness'
      ]
    },
    {
      company: 'TD Bank',
      role: 'Software Engineer',
      period: 'May 2022 – Aug 2022',
      description: [
        'Redesigned and developed the front-end of a KPI dashboard to improve data visualization and user experience',
        'Developed a scraper to pull and store health data from 25 monitors on Datadog, allowing the KPI dashboard to display health statuses of internal software using cron and MongoDB'
      ]
    }
  ]

  return (
    <section 
      id="experience" 
      className="relative section-padding bg-gray-50 dark:bg-gray-800 overflow-hidden"
    >
      <NetworkAnimation />
      <div className="relative max-w-6xl mx-auto z-10">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Work Experience
        </h2>
        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary-300 dark:bg-primary-700 hidden md:block"></div>
          
          {/* Timeline Items */}
          <div className="space-y-12 md:space-y-16">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0
              return (
                <ExperienceItem
                  key={index}
                  exp={exp}
                  index={index}
                  isEven={isEven}
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

