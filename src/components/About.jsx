import { useFadeInOnScroll } from '../hooks/useFadeInOnScroll'

const About = () => {
  const [ref, isVisible] = useFadeInOnScroll({ threshold: 0.1 })

  return (
    <section 
      id="about" 
      ref={ref}
      className={`section-padding bg-white dark:bg-gray-900 transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          About Me
        </h2>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
            I'm currently building at Thri5, an early stage startup, as an AI Engineer. I specialize in business intelligence, developing and deploying ML models, AI Agents, and data analysis.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg mt-4">
            My main interest areas are agentic workflows and reinforcement learning. I'm constantly expanding my knowledge by reading the latest research papers in AI.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg mt-4">
            Throughout my early career, I've achieved real business outcomes. This includes a causal inference analysis that proved <b>millions ($) in annual profit</b> and an ML pipeline serving hundreds of users.
          </p>
        </div>
      </div>
    </section>
  )
}

export default About

