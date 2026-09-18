// Skills.jsx — carrousel de compétences en défilement automatique
// Deux rangées : une vers la gauche, une vers la droite

import { motion } from 'framer-motion'
import {
  FaHtml5, FaCss3Alt, FaJs, FaReact,
  FaJava, FaPhp, FaGitAlt
} from 'react-icons/fa'
import {
  SiLaravel, SiMysql, SiFirebase,
  SiTailwindcss, SiNextdotjs, SiC
} from 'react-icons/si'

function Skills({ isLight }) {

  // Rangée 1 — défile vers la gauche
  const row1 = [
    { icon: <FaHtml5    className="text-[#e34f26]" />, name: 'HTML'       },
    { icon: <FaCss3Alt  className="text-[#264de4]" />, name: 'CSS'        },
    { icon: <FaJs       className="text-[#f7df1e]" />, name: 'JavaScript' },
    { icon: <FaReact    className="text-[#61dafb]" />, name: 'React'      },
    { icon: <FaJava     className="text-[#f89820]" />, name: 'Java'       },
    { icon: <FaPhp      className="text-[#8892be]" />, name: 'PHP'        },
    { icon: <SiLaravel  className="text-[#ff2d20]" />, name: 'Laravel'    },
    { icon: <SiMysql    className="text-[#4479a1]" />, name: 'MySQL'      },
  ]

  // Rangée 2 — défile vers la droite
  const row2 = [
    { icon: <SiC            className="text-[#a8b9cc]" />, name: 'C'         },
    { icon: <SiNextdotjs    className={isLight ? 'text-[#1a0508]' : 'text-white'} />, name: 'Next.js'   },
    { icon: <SiFirebase     className="text-[#ffca28]" />, name: 'Firebase'  },
    { icon: <SiTailwindcss  className="text-[#38bdf8]" />, name: 'Tailwind'  },
    { icon: <FaGitAlt       className="text-[#f05032]" />, name: 'Git/GitHub'},
  ]

  return (
    <section id="skills" className="py-14 overflow-hidden">

      {/* TITRE DE SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 mb-8 px-6 max-w-3xl mx-auto"
      >
        <span className={`text-xs uppercase tracking-[3px] font-bold whitespace-nowrap
          ${isLight ? 'text-[#6B1A2A]' : 'text-[#c9a84c]'}`}>
          Compétences
        </span>
        <div className={`flex-1 h-px bg-gradient-to-r
          ${isLight
            ? 'from-[#6B1A2A]/30 to-transparent'
            : 'from-[#c9a84c]/40 to-transparent'
          }`}
        />
      </motion.div>

      {/* RANGÉE 1 — défile vers la gauche */}
      <TrackRow
        skills={row1}
        direction="left"
        isLight={isLight}
      />

      {/* RANGÉE 2 — défile vers la droite */}
      <div className="mt-3">
        <TrackRow
          skills={row2}
          direction="right"
          isLight={isLight}
        />
      </div>

    </section>
  )
}

// TrackRow — composant pour une rangée du carrousel
// On le sépare pour ne pas répéter le code deux fois
function TrackRow({ skills, direction, isLight }) {

  // On duplique les skills pour que le défilement soit infini
  // [A, B, C] → [A, B, C, A, B, C]
  // Quand la première moitié est passée, la deuxième prend le relai
  const doubled = [...skills, ...skills]

  return (
    // overflow-hidden cache ce qui dépasse des bords
    // relative permet de placer les fondus en absolute à l'intérieur
    <div className="relative overflow-hidden py-1">

      {/* Fondu gauche — cache le début du carrousel */}
      <div className={`absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none
        bg-gradient-to-r
        ${isLight
          ? 'from-[#fdf5f7] to-transparent'
          : 'from-[#0d0306] to-transparent'
        }`}
      />

      {/* Fondu droite */}
      <div className={`absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none
        bg-gradient-to-l
        ${isLight
          ? 'from-[#fdf5f7] to-transparent'
          : 'from-[#0d0306] to-transparent'
        }`}
      />

      {/* La piste qui défile */}
      {/* animate-scroll-left et animate-scroll-right viennent de index.css */}
      <div className={`flex gap-3 w-max
        ${direction === 'left'
          ? 'animate-scroll-left'
          : 'animate-scroll-right'
        }`}
      >
        {doubled.map((skill, index) => (
          <div
            key={index}
            className={`
              flex items-center gap-2.5 px-4 py-2.5 rounded-xl border
              text-sm font-semibold whitespace-nowrap
              transition-all duration-300 cursor-none
              hover:scale-105 hover:border-[#c9a84c]/50
              ${isLight
                ? 'bg-[#6B1A2A]/05 border-[#6B1A2A]/15 text-[#2d0a10]'
                : 'bg-white/07 border-white/13 text-white/85'
              }
            `}
          >
            {/* Icône — text-xl pour la taille */}
            <span className="text-xl">{skill.icon}</span>
            {skill.name}
          </div>
        ))}
      </div>

    </div>
  )
}

export default Skills