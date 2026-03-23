const projects = [
  {
    category: 'Creative Tech',
    title: 'MiroFishRL',
    description:
      'Working on a reinforcement learning extension of MiroFish (an AI prediction engine using agent swarm simulation to predict the future in a digital world)',
    link: 'https://github.com/ahmedabb104/MiroFishRL',
    tags: ['Reinforcement Learning', 'GraphRAG', 'Multi-Agent'],
    image:
      '/mirofishRL.jpg',
    imageAlt: '',
    imagePosition: 'left',
  },
  {
    category: 'Creative Tech',
    title: 'Parameterized Brushstrokes',
    description:
      'Image style transfer. A reimplementation of the paper by Kotovenko et al. (2021): "Rethinking Style Transfer: From Pixels to Parameterized Brushstrokes" (in progress)',
    link: 'https://github.com/ahmedabb104/brushstroke-parameterized-style-transfer',
    tags: ['PyTorch', 'VGG19', 'Gradio'],
    image:
      'https://raw.githubusercontent.com/justanhduc/brushstroke-parameterized-style-transfer/refs/heads/master/assets/golden-gate-bridge-starry_night_1000_0.jpg',
    imageAlt: '',
    imagePosition: 'right',
  },
  {
    category: 'Systems Design',
    title: 'Personal OpenClaw Agent',
    description:
      'An OpenClaw agent that contributes to open-source projects on GitHub. (abandoned)',
    link: 'https://github.com/ahmedabbas104',
    tags: ['OpenClaw', 'Tailscale'],
    image:
      '/openclaw.png',
    imageAlt: '',
    imagePosition: 'left',
  },
  {
    category: 'Cybersecurity',
    title: 'Bystander',
    description:
      'Winner at HackCanada 2026. AI emergency handoff via an 8-second video. Pitched to security guards at SPUR, validating product-market fit.',
    link: 'https://devpost.com/software/bystander',
    tags: ['Gemini', 'Cloudinary', 'Docker', 'ElevenLabs', 'C++ SDK', 'Node.js', 'React'],
    image:
      'https://d112y698adiu2z.cloudfront.net/photos/production/software_thumbnail_photos/004/406/767/datas/medium.png',
    imageAlt: '',
    imagePosition: 'right',
  },
  {
    category: 'Cybersecurity',
    title: 'Predicting NHL Concussions',
    description:
      'Predicting the likelihood of NHL players getting concussions next season using an imbalanced dataset.',
    link: 'https://github.com/ahmedabb104/NHLConcussionPredictions/blob/main/docs/report.pdf',
    tags: ['ML', 'SHAP', 'Imbalanced Data', 'SMOTE'],
    image:
      'https://images.pexels.com/photos/6557336/pexels-photo-6557336.jpeg',
    imageAlt: '',
    imagePosition: 'left',
  },
]

function ProjectCard({ project }) {
  const isRight = project.imagePosition === 'right'

  const content = (
    <div
      className={`flex flex-col ${
        isRight ? 'md:flex-row-reverse' : 'md:flex-row'
      } min-h-[260px]`}
    >
      <div className="w-full md:w-1/2 relative overflow-hidden h-48 md:h-auto">
        <img
          alt={project.imageAlt}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={project.image}
        />
        <div className="absolute inset-0 bg-surface-container-lowest/20" />
      </div>
      <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
        {/* <span className="font-label text-xs uppercase tracking-widest text-primary mb-4">
          {project.category}
        </span> */}
        <h2 className="font-headline text-3xl font-bold mb-4 tracking-tight">
          {project.title}
        </h2>
        <p className="font-body text-on-surface-variant mb-8 leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-label text-[10px] bg-surface-container-highest px-3 py-1.5 rounded-full text-on-surface"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <article className="group relative bg-surface-container-low overflow-hidden transition-all duration-300 hover:bg-surface-container-high translate-y-0 hover:-translate-y-1">
      {project.link ? (
        <a href={project.link} target="_blank" rel="noopener noreferrer" className="block">
          {content}
        </a>
      ) : (
        content
      )}
    </article>
  )
}

export default function Projects() {
  return (
    <main className="pt-32 pb-24 px-6 md:px-12 max-w-5xl mx-auto">
      {/* Hero Section */}
      <section className="fade-up mb-20 text-left" style={{ animationDelay: '0ms' }}>
        <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tighter text-on-background mb-4">
          Projects<span className="text-primary">.</span>
        </h1>
        <p className="font-body text-xl text-on-surface-variant max-w-2xl">
          Things I build for fun.{' '}
          <span className="text-primary font-medium">
            Experiments across computer vision, ML, AI agents, and reinforcement learning (soon).
          </span>
        </p>
      </section>

      {/* Projects Feed */}
      <div className="fade-up flex flex-col gap-12" style={{ animationDelay: '200ms' }}>
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>

    </main>
  )
}
