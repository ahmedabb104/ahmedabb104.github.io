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
            I'm currently working at Thri5, an early stage startup, as a Data Scientist. I specialize in developing and deploying ML models, and building scalable data pipelines.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg mt-4">
            My main interest areas are reinforcement learning, data analytics, and MLOps. I continually expand my knowledge by keeping on top of the latest research in ANI and AGI.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg mt-4">
            Throughout my early career, I have successfully deployed several features end-to-end, from ML models to data pipelines serving hundreds of users. I thrive in fast-paced collaborative 
            environments and enjoy building scalable solutions to challenging problems.
          </p>
        </div>
      </div>
    </section>
  )
}

export default About

