import { useFadeInOnScroll } from '../hooks/useFadeInOnScroll'

const Projects = () => {
  const [ref, isVisible] = useFadeInOnScroll({ threshold: 0.1 })

  // Replace with your actual project data
  const projects = [
    {
      title: 'OpenClaw Github Contributor',
      description: 'An OpenClaw agent that contributes to open source projects. In progress...',
      image: '/image_style_transfer.png'
      // link: ''
    },
    {
      title: 'Image Style Transfer: Parameterized Brushstrokes',
      description: 'In progress...',
      image: '/image_style_transfer.png',
      link: 'https://github.com/ahmedabb104/brushstroke-parameterized-style-transfer'
    },
    {
      title: 'Predicting NHL Concussions',
      description: 'Likelihood of players getting concussions in the next NHL season using ML on an imbalanced dataset',
      image: '/nhl_concussions.png',
      link: 'https://github.com/ahmedabb104/NHLConcussionRiskPredictor/blob/main/docs/report.pdf'
    }
  ]

  return (
    <section 
      id="projects" 
      ref={ref}
      className={`section-padding bg-white dark:bg-gray-900 transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Projects
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-12">
          Stay tuned, some exciting projects are coming very soon!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="h-48 bg-gradient-to-br from-primary-400 to-primary-600 dark:from-primary-600 dark:to-primary-800 flex items-center justify-center overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    // Fallback to gradient if image doesn't exist
                    e.target.style.display = 'none'
                    e.target.parentElement.classList.add('bg-gradient-to-br', 'from-primary-400', 'to-primary-600')
                  }}
                />
                {!project.image && (
                  <div className="text-white text-4xl font-bold opacity-50">
                    {project.title.charAt(0)}
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {project.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects

