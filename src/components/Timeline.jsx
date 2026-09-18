// Timeline.jsx — ton parcours de formation affiché en ligne verticale
// Chaque étape est une carte avec une date, un titre et des tags

import { motion } from 'framer-motion'

function Timeline({ isLight }) {

  // Tes étapes de parcours dans un tableau
  const steps = [
    {
      id:     1,
      year:   '2022',
      title:  'Début en développement web',
      desc:   'Découverte du HTML, CSS et bases de la programmation.',
      tags:   ['HTML', 'CSS'],
      active: false,  // étape passée
    },
    {
      id:     2,
      year:   '2023',
      title:  'JavaScript, Java & PHP',
      desc:   'Apprentissage de la POO et du scripting front-end. Premiers projets concrets.',
      tags:   ['JavaScript', 'Java', 'PHP'],
      active: false,
    },
    {
      id:     3,
      year:   '2024 — EN COURS',
      title:  'React, Laravel & Next.js',
      desc:   'Montée en compétences sur les frameworks modernes. Réalisation de Milola Wigs.',
      tags:   ['React', 'Laravel', 'Next.js', 'Firebase'],
      active: true,   // étape actuelle — point doré lumineux
    },
    {
      id:     4,
      year:   '2025 — OBJECTIF 🎯',
      title:  'Stage développeur full-stack',
      desc:   'Recherche active d\'un stage pour mettre mes compétences en pratique en entreprise.',
      tags:   ['Full-Stack', 'Open to work'],
      active: true,
    },
  ]

  return (
    <section id="timeline" className="px-6 py-14 max-w-3xl mx-auto">

      {/* TITRE DE SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 mb-10"
      >
        <span className={`text-xs uppercase tracking-[3px] font-bold whitespace-nowrap
          ${isLight ? 'text-[#6B1A2A]' : 'text-[#c9a84c]'}`}>
          Mon parcours
        </span>
        <div className={`flex-1 h-px bg-gradient-to-r
          ${isLight
            ? 'from-[#6B1A2A]/30 to-transparent'
            : 'from-[#c9a84c]/40 to-transparent'
          }`}
        />
      </motion.div>

      {/* LISTE DES ÉTAPES */}
      {/* relative + padding-left pour laisser la place à la ligne verticale */}
      <div className="relative pl-6">

        {/* LIGNE VERTICALE qui relie toutes les étapes */}
        <div className={`absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b
          ${isLight
            ? 'from-[#6B1A2A] to-[#6B1A2A]/10'
            : 'from-[#c9a84c] to-[#c9a84c]/10'
          }`}
        />

        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x:  0  }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="relative mb-8 last:mb-0"
            // last:mb-0 = pas de marge en bas pour le dernier élément
          >

            {/* POINT sur la ligne verticale */}
            <div className={`
              absolute -left-6 top-1 w-[15px] h-[15px] rounded-full border-2 z-10
              transition-all duration-500
              ${step.active
                ? isLight
                  // Actif en mode jour : bordeaux lumineux
                  ? 'bg-gradient-to-br from-[#6B1A2A] to-[#8B2A3E] border-[#6B1A2A] shadow-[0_0_12px_rgba(107,26,42,0.5)]'
                  // Actif en mode nuit : or lumineux
                  : 'bg-gradient-to-br from-[#c9a84c] to-[#e2c06a] border-[#c9a84c] shadow-[0_0_12px_rgba(201,168,76,0.6)]'
                : isLight
                  // Inactif en mode jour
                  ? 'bg-[#e8c4ca] border-[#6B1A2A]/25'
                  // Inactif en mode nuit
                  : 'bg-[#3d0f20] border-[#c9a84c]/25'
              }
            `} />

            {/* ANNÉE */}
            <p className={`text-[11px] font-bold tracking-widest mb-1.5
              transition-colors duration-500
              ${step.active
                ? isLight ? 'text-[#6B1A2A]' : 'text-[#c9a84c]'
                : isLight ? 'text-[#8a4050]'  : 'text-white/40'
              }`}
            >
              {step.year}
            </p>

            {/* CARTE */}
            <div className={`
              p-4 rounded-xl border transition-all duration-500
              hover:translate-x-1
              ${step.active
                ? isLight
                  ? 'bg-[#6B1A2A]/06 border-[#6B1A2A]/20'
                  : 'bg-[#c9a84c]/08 border-[#c9a84c]/25'
                : isLight
                  ? 'bg-[#6B1A2A]/04 border-[#6B1A2A]/12'
                  : 'bg-white/05 border-white/10'
              }
            `}>

              {/* TITRE de l'étape */}
              <h4 className={`text-sm font-extrabold mb-1.5 transition-colors duration-500
                ${isLight ? 'text-[#1a0508]' : 'text-white'}`}>
                {step.title}
              </h4>

              {/* DESCRIPTION */}
              <p className={`text-xs leading-relaxed mb-3 transition-colors duration-500
                ${isLight ? 'text-[#5a1825]' : 'text-white/65'}`}>
                {step.desc}
              </p>

              {/* TAGS */}
              <div className="flex flex-wrap gap-1.5">
                {step.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`px-2 py-0.5 rounded-md text-[11px] font-bold border
                      transition-colors duration-500
                      ${isLight
                        ? 'bg-[#c9a84c]/12 border-[#c9a84c]/28 text-[#7a5010]'
                        : 'bg-[#c9a84c]/12 border-[#c9a84c]/28 text-[#f5d98b]'
                      }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

            </div>
          </motion.div>
        ))}
      </div>

    </section>
  )
}

export default Timeline