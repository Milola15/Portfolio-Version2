import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink, FiShoppingBag, FiCheckSquare, FiUsers, FiGlobe, FiBarChart2, FiActivity } from 'react-icons/fi'

// Imports des captures d'écran
// Place tes images dans src/assets/projects/
import imgMilola    from '../assets/projects/Wigs.png'
import imgTodo      from '../assets/projects/caplanding.png'
import imgContacts  from '../assets/projects/Caportfolio.png'
import imgTableau   from '../assets/projects/dashboard.png'
import imgSondage   from '../assets/projects/cap-challenge.png'

function Projects({ isLight }) {

  const projects = [
    {
      id:     1,
      icon:   <FiShoppingBag size={20} />,
      title:  'Milola Wigs',
      desc:   'E-commerce complet de perruques avec catalogue produits, panier, commandes et dashboard admin.',
      tags:   ['Next.js 16', 'Prisma', 'Tailwind', 'PostgreSQL'],
      github: 'https://github.com/Milola15/Milola-wigs',
      live:   '#',
      status: 'wip',
      gold:   'Next.js 16',
      image:  imgMilola,
    },
    {
      id:     2,
      icon:   <FiCheckSquare size={20} />,
      title:  'Todo App Priorités',
      desc:   'Application de gestion de tâches avec niveaux de priorité et stockage local persistant.',
      tags:   ['React', 'TypeScript', 'LocalStorage'],
      github: '#',
      live:   null,
      status: 'done',
      gold:   'React',
      image:  imgTodo,
    },
    {
      id:     3,
      icon:   <FiUsers size={20} />,
      title:  'Gestionnaire Contacts',
      desc:   'Application Java orientée objet avec CRUD complet et gestion de liste de contacts.',
      tags:   ['Java', 'POO', 'Swing'],
      github: '#',
      live:   null,
      status: 'done',
      gold:   'Java',
      image:  imgContacts,
    },
    {
      id:     4,
      icon:   <FiGlobe size={20} />,
      title:  'Portfolio v1',
      desc:   'Premier portfolio personnel en React avec design bordeaux, compétences et projets.',
      tags:   ['React', 'CSS', 'Vite'],
      github: 'https://github.com/Milola15/Portfolio-react',
      live:   '#',
      status: 'done',
      gold:   'React',

    },
    {
      id:     5,
      icon:   <FiBarChart2 size={20} />,
      title:  'Tableau de Bord',
      desc:   "Application web de gestion d'inscription pour un établissement scolaire : interface intuitive, base de données MySQL et logique PHP côté serveur.",
      tags:   ['PHP', 'MySQL', 'HTML/CSS'],
      github: 'https://github.com/Milola15/Application-d-inscription-scolaire',
      live:   '#',
      status: 'done',
      gold:   'PHP',
      image:  imgTableau,
    },
    {
      id:     6,
      icon:   <FiActivity size={20} />,
      title:  'App Sondage & Vote',
      desc:   "Les utilisateurs peuvent créer un compte, participer aux sondages et consulter les résultats sous forme de pourcentages et barres de progression.",
      tags:   ['React', 'Express.js', 'MySQL', 'REST API'],
      github: 'https://github.com/Milola15/Application-Sondage',
      live:   '#',
      status: 'done',
      gold:   'React',
      image:  imgSondage,
    },
  ]

  return (
    <section id="projects" className="px-6 py-14 max-w-5xl mx-auto">

      {/* TITRE DE SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 mb-8"
      >
        <span className={`text-xs uppercase tracking-[3px] font-bold whitespace-nowrap
          bg-clip-text text-transparent bg-gradient-to-r
          ${isLight
            ? 'from-[#c9a84c] to-[#8B2A3E]'
            : 'from-[#c9a84c] to-[#f5d98b]'
          }`}>
          Projets réalisés
        </span>
        <div className={`flex-1 h-px bg-gradient-to-r
          ${isLight
            ? 'from-[#c9a84c]/50 to-transparent'
            : 'from-[#c9a84c]/40 to-transparent'
          }`}
        />
      </motion.div>

      {/* GRILLE */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            isLight={isLight}
            index={index}
          />
        ))}
      </div>

    </section>
  )
}

function ProjectCard({ project, isLight, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`
        flex flex-col rounded-2xl border overflow-hidden
        border-t-2 border-t-[#c9a84c]/50
        transition-all duration-300 cursor-none
        ${isLight
          ? 'bg-white border-[#6B1A2A]/15 shadow-md hover:shadow-xl'
          : 'bg-white/07 border-white/13 hover:bg-white/10'
        }
      `}
    >
      {/* IMAGE DU PROJET */}
      <div className="relative w-full h-44 overflow-hidden bg-[#1a0508]">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-top
            transition-transform duration-500 hover:scale-105"
          onError={(e) => {
            // Si l'image ne charge pas, affiche un placeholder
            e.target.style.display = 'none'
            e.target.parentElement.innerHTML = `
              <div style="width:100%;height:100%;
                background:linear-gradient(135deg,#3d0f20,#6B1A2A);
                display:flex;align-items:center;justify-content:center">
              </div>
            `
          }}
        />

        {/* Badge statut sur l'image */}
        <div className={`absolute top-3 right-3 flex items-center gap-1.5
          px-2.5 py-1 rounded-full text-xs font-bold backdrop-blur-md
          ${project.status === 'done'
            ? 'bg-green-500/20 border border-green-500/40 text-green-400'
            : 'bg-[#c9a84c]/20 border border-[#c9a84c]/40 text-[#c9a84c]'
          }`}>
          <span className={`w-1.5 h-1.5 rounded-full
            ${project.status === 'done'
              ? 'bg-green-400'
              : 'bg-[#c9a84c] animate-pulse'
            }`}
          />
          {project.status === 'done' ? 'Terminé' : 'En cours'}
        </div>
      </div>

      {/* CONTENU */}
      <div className="flex flex-col flex-1 p-5">

        {/* HEADER icône + liens */}
        <div className="flex items-start justify-between mb-3">

          {/* Icône react-icons */}
          <span className="text-[#c9a84c]">
            {project.icon}
          </span>

          {/* Liens GitHub et Live */}
          <div className="flex gap-2">
            {project.github && (
              
              <a  href={project.github}
                target="_blank"
                rel="noreferrer"
                className="cursor-none flex items-center gap-1 px-2.5 py-1
                  rounded-lg text-xs font-bold border transition-all duration-200
                  bg-[#c9a84c]/12 border-[#c9a84c]/30 text-[#c9a84c]
                  hover:bg-[#c9a84c]/25"
              >
                <FiGithub size={12} />
                GitHub
              </a>
            )}
            {project.live && (
              
              < a href={project.live}
                target="_blank"
                rel="noreferrer"
                className="cursor-none flex items-center gap-1 px-2.5 py-1
                  rounded-lg text-xs font-bold border transition-all duration-200
                  bg-[#c9a84c]/12 border-[#c9a84c]/30 text-[#c9a84c]
                  hover:bg-[#c9a84c]/25"
              >
                <FiExternalLink size={12} />
                Live
              </a>
            )}
          </div>
        </div>

        {/* TITRE */}
        <h3 className={`text-base font-extrabold mb-2 transition-colors duration-500
          ${isLight ? 'text-[#1a0508]' : 'text-white'}`}>
          {project.title}
        </h3>

        {/* DESCRIPTION */}
        <p className={`text-xs leading-relaxed mb-4 flex-1 transition-colors duration-500
          ${isLight ? 'text-[#3a0810]' : 'text-white/65'}`}>
          {project.desc}
        </p>

        {/* TAGS */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={`px-2 py-0.5 rounded-md text-xs font-semibold border
                transition-colors duration-500
                ${tag === project.gold
                  ? 'bg-[#c9a84c]/15 border-[#c9a84c]/35 text-[#c9a84c]'
                  : isLight
                    ? 'bg-[#6B1A2A]/08 border-[#6B1A2A]/18 text-[#1a0508]'
                    : 'bg-white/08 border-white/15 text-white/75'
                }`}
            >
              {tag}
            </span>
          ))}
        </div>

      </div>
    </motion.div>
  )
}

export default Projects