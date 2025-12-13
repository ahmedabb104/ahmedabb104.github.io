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
            I'm currently working at Thri5, an early stage startup, as a Data Scientist. I specialize in developing ML models, and building scalable data pipelines and ML infrastructure. I am a passionate AI Engineer and Data Scientist with a strong background in ML, 
            deep learning, and data analytics.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg mt-4">
            My expertise spans across deep learning, MLOps practices 
            for model deployment and monitoring, and NLP. I am passionate about 
            solving complex problems using data-driven approaches and building AI systems that make a 
            meaningful impact.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg mt-4">
            Throughout my early career, I have successfully deployed several features end-to-end, from ML models to AI Agents serving hundreds of users. I thrive in fast-paced collaborative 
            environments and enjoy keeping up to date with the latest tech.
          </p>
        </div>
      </div>
    </section>
  )
}

export default About

