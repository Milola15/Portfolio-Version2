// Projects.jsx — tes projets réalisés en grille de cartes

import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink } from 'react-icons/fi'

function Projects({ isLight }) {

  // Toutes tes données de projets dans un tableau
  // Plus tard ces données viendront de Firebase via le panneau admin
  const projects = [
    {
      id:      1,
      icon:    '👗',
      title:   'Milola Wigs',
      desc:    'E-commerce complet de perruques avec catalogue produits, panier, commandes et dashboard admin.',
      tags:    ['Next.js 16', 'Prisma', 'Tailwind', 'PostgreSQL'],
      github:  '#',
      live:    '#',
      status:  'wip',   // wip = work in progress (en cours)
      gold:    'Next.js 16',
    },
    {
      id:      2,
      icon:    '✅',
      title:   'Todo App Priorités',
      desc:    'Application de gestion de tâches avec niveaux de priorité et stockage local persistant.',
      tags:    ['React', 'TypeScript', 'LocalStorage'],
      github:  '#',
      live:    null,    // null = pas de lien live
      status:  'done',
      gold:    'React',
    },
    {
      id:      3,
      icon:    '📇',
      title:   'Gestionnaire Contacts',
      desc:    'Application Java orientée objet avec CRUD complet et gestion de liste de contacts.',
      tags:    ['Java', 'POO', 'Swing'],
      github:  '#',
      live:    null,
      status:  'done',
      gold:    'Java',
    },
    {
      id:      4,
      icon:    '🌐',
      title:   'Portfolio v1',
      desc:    'Premier portfolio personnel en React avec design bordeaux, compétences et projets.',
      tags:    ['React', 'CSS', 'Vite'],
      github:  '#',
      live:    '#',
      status:  'done',
      gold:    'React',
    },
  ]

  return (
    <section id="projects" className="px-6 py-14 max-w-3xl mx-auto">

      {/* TITRE DE SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 mb-8"
      >
        <span className={`text-xs uppercase tracking-[3px] font-bold whitespace-nowrap
          ${isLight ? 'text-[#6B1A2A]' : 'text-[#c9a84c]'}`}>
          Projets réalisés
        </span>
        <div className={`flex-1 h-px bg-gradient-to-r
          ${isLight
            ? 'from-[#6B1A2A]/30 to-transparent'
            : 'from-[#c9a84c]/40 to-transparent'
          }`}
        />
      </motion.div>

      {/* GRILLE DE PROJETS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

// ProjectCard — carte individuelle d'un projet
// On la sépare pour garder le code lisible
function ProjectCard({ project, isLight, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`
        group flex flex-col p-5 rounded-2xl border
        border-t-2 border-t-[#c9a84c]/40
        transition-all duration-300 cursor-none
        hover:-translate-y-1 hover:border-t-[#c9a84c]
        ${isLight
          ? 'bg-white border-[#6B1A2A]/15 shadow-sm hover:shadow-md'
          : 'bg-white/07 border-white/13'
        }
      `}
    >
      {/* HEADER : icône + liens */}
      <div className="flex items-start justify-between mb-3">
        <span className="text-2xl">{project.icon}</span>

        <div className="flex gap-2">
          {/* Lien GitHub */}
          {project.github && (
            
             <a href={project.github}
              target="_blank"
              rel="noreferrer"
              className="cursor-none flex items-center gap-1 px-2.5 py-1 rounded-lg
                text-xs font-bold border transition-all duration-200
                bg-[#c9a84c]/12 border-[#c9a84c]/30 text-[#c9a84c]
                hover:bg-[#c9a84c]/25"
            >
              <FiGithub size={12} />
              GitHub
            </a>
          )}

          {/* Lien Live — affiché seulement si project.live n'est pas null */}
          {project.live && (
            
            <a href={project.live}
              target="_blank"
              rel="noreferrer"
              className="cursor-none flex items-center gap-1 px-2.5 py-1 rounded-lg
                text-xs font-bold border transition-all duration-200
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
        ${isLight ? 'text-[#5a1825]' : 'text-white/65'}`}>
        {project.desc}
      </p>

      {/* TAGS TECHNOLOGIES */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className={`px-2 py-0.5 rounded-md text-xs font-semibold border
              transition-colors duration-500
              ${tag === project.gold
                // Le tag principal est en or
                ? 'bg-[#c9a84c]/15 border-[#c9a84c]/35 text-[#c9a84c]'
                : isLight
                  ? 'bg-[#6B1A2A]/08 border-[#6B1A2A]/18 text-[#3a0810]'
                  : 'bg-white/08 border-white/15 text-white/75'
              }
            `}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* STATUT du projet */}
      <div className={`flex items-center gap-1.5 text-xs font-bold
        ${project.status === 'done'
          ? 'text-green-500'
          : 'text-[#c9a84c]'
        }`}
      >
        <span className={`w-1.5 h-1.5 rounded-full
          ${project.status === 'done'
            ? 'bg-green-500'
            : 'bg-[#c9a84c] animate-pulse'
          }`}
        />
        {project.status === 'done' ? 'Terminé' : 'En cours'}
      </div>

    </motion.div>
  )
}

export default Projects