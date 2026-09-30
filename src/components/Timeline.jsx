import { motion } from 'framer-motion'
import {
  FiCode, FiBook, FiAward, FiBriefcase,
  FiTarget, FiCpu
} from 'react-icons/fi'

function Timeline({ isLight }) {

  const steps = [
    {
      id:     1,
      icon:   <FiCode size={14} />,
      year:   '2022',
      type:   'Formation',
      title:  'Début en développement web',
      desc:   'Découverte du HTML, CSS et bases de la programmation. Premiers pas dans le monde du développement.',
      tags:   ['HTML', 'CSS', 'Bases'],
      active: false,
    },
    {
      id:     2,
      icon:   <FiBook size={14} />,
      year:   '2023',
      type:   'Formation',
      title:  'JavaScript, Java & PHP',
      desc:   'Apprentissage de la programmation orientée objet, du scripting front-end et du développement back-end. Premiers projets concrets.',
      tags:   ['JavaScript', 'Java', 'PHP', 'POO'],
      active: false,
    },
    {
      id:     3,
      icon:   <FiAward size={14} />,
      year:   '2024 — 2025',
      type:   'Diplôme',
      title:  'BTS Informatique — Développeur d\'Application',
      desc:   'Admissibilité BTS Informatique Développeur d\'Application à Pigier Plateau. Montée en compétences sur les frameworks modernes.',
      tags:   ['Pigier Plateau', 'BTS', 'React', 'Laravel'],
      active: false,
    },
    {
      id:     4,
      icon:   <FiBriefcase size={14} />,
      year:   'Jan — Mai 2026',
      type:   'Stage',
      title:  'Développeuse d\'Applications — SOTRA',
      desc:   'Développement front-end d\'une application mobile WinDev Mobile pour la gestion des équipements embarqués des bus de la SOTRA à Abidjan.',
      tags:   ['WinDev Mobile', 'Front-end', 'SOTRA', 'Mobile'],
      active: true,
    },
    {
      id:     5,
      icon:   <FiCpu size={14} />,
      year:   '2026 — 2027',
      type:   'Formation',
      title:  'Licence Pro — Réseau Génie Logiciel',
      desc:   'En cours de Licence Professionnelle Réseau Génie Logiciel (3e année) à Pigier Plateau. Approfondissement des compétences full-stack et réseaux.',
      tags:   ['Pigier Plateau', 'Licence Pro', 'Réseaux', 'Génie Logiciel'],
      active: true,
    },
    {
      id:     6,
      icon:   <FiTarget size={14} />,
      year:   '2027 — OBJECTIF',
      type:   'Objectif',
      title:  'Développeuse Full-Stack confirmée',
      desc:   'Obtenir mon diplôme de Licence et intégrer une entreprise ambitieuse en tant que développeuse full-stack.',
      tags:   ['Full-Stack', 'Diplôme', 'CDI'],
      active: true,
    },
  ]

  // Couleur du badge selon le type d'étape
  function getBadgeStyle(type, isLight) {
    switch(type) {
      case 'Diplôme':
        return 'bg-[#c9a84c]/15 border-[#c9a84c]/40 text-[#c9a84c]'
      case 'Stage':
        return 'bg-green-500/15 border-green-500/40 text-green-400'
      case 'Objectif':
        return isLight
          ? 'bg-[#6B1A2A]/10 border-[#6B1A2A]/30 text-[#6B1A2A]'
          : 'bg-[#8B2A3E]/20 border-[#8B2A3E]/40 text-[#f5d98b]'
      default:
        return isLight
          ? 'bg-[#6B1A2A]/08 border-[#6B1A2A]/20 text-[#6B1A2A]'
          : 'bg-white/08 border-white/20 text-white/60'
    }
  }

  return (
    <section id="timeline" className="px-6 py-14 max-w-3xl mx-auto">

      {/* TITRE DE SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 mb-10"
      >
        <span className={`text-xs uppercase tracking-[3px] font-bold whitespace-nowrap
          bg-clip-text text-transparent bg-gradient-to-r
          ${isLight
            ? 'from-[#c9a84c] to-[#8B2A3E]'
            : 'from-[#c9a84c] to-[#f5d98b]'
          }`}>
          Mon parcours
        </span>
        <div className={`flex-1 h-px bg-gradient-to-r
          ${isLight
            ? 'from-[#c9a84c]/50 to-transparent'
            : 'from-[#c9a84c]/40 to-transparent'
          }`}
        />
      </motion.div>

      {/* TIMELINE */}
      <div className="relative pl-8">

        {/* LIGNE VERTICALE */}
        <div className={`absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b
          ${isLight
            ? 'from-[#c9a84c] via-[#6B1A2A] to-[#6B1A2A]/10'
            : 'from-[#c9a84c] via-[#c9a84c]/50 to-[#c9a84c]/10'
          }`}
        />

        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative mb-8 last:mb-0"
          >

            {/* POINT avec icône */}
            <div className={`
              absolute -left-8 top-3 w-8 h-8 rounded-full
              flex items-center justify-center border-2 z-10
              transition-all duration-500
              ${step.active
                ? isLight
                  ? 'bg-gradient-to-br from-[#c9a84c] to-[#6B1A2A] border-[#c9a84c] text-white shadow-[0_0_14px_rgba(201,168,76,0.5)]'
                  : 'bg-gradient-to-br from-[#c9a84c] to-[#e2c06a] border-[#c9a84c] text-[#1a0508] shadow-[0_0_14px_rgba(201,168,76,0.6)]'
                : isLight
                  ? 'bg-white border-[#6B1A2A]/25 text-[#6B1A2A]'
                  : 'bg-[#3d0f20] border-[#c9a84c]/25 text-white/50'
              }
            `}>
              {step.icon}
            </div>

            {/* CONTENU */}
            <div className={`
              ml-2 p-4 rounded-2xl border transition-all duration-500
              hover:translate-x-1
              ${step.active
                ? isLight
                  ? 'bg-white border-[#c9a84c]/35 border-l-2 border-l-[#c9a84c] shadow-md'
                  : 'bg-[#c9a84c]/06 border-[#c9a84c]/25 border-l-2 border-l-[#c9a84c]/60'
                : isLight
                  ? 'bg-white border-[#6B1A2A]/12 shadow-sm'
                  : 'bg-white/04 border-white/08'
              }
            `}>

              {/* HEADER — année + badge type */}
              <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                <p className={`text-[11px] font-bold tracking-widest
                  ${step.active
                    ? isLight ? 'text-[#c9a84c]'   : 'text-[#c9a84c]'
                    : isLight ? 'text-[#8a4050]'   : 'text-white/35'
                  }`}>
                  {step.year}
                </p>

                {/* Badge type (Formation / Diplôme / Stage / Objectif) */}
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border
                  ${getBadgeStyle(step.type, isLight)}`}>
                  {step.type}
                </span>
              </div>

              {/* TITRE */}
              <h4 className={`text-sm font-extrabold mb-1.5 transition-colors duration-500
                ${isLight ? 'text-[#1a0508]' : 'text-white'}`}>
                {step.title}
              </h4>

              {/* DESCRIPTION */}
              <p className={`text-xs leading-relaxed mb-3 transition-colors duration-500
                ${isLight ? 'text-[#3a0810]' : 'text-white/65'}`}>
                {step.desc}
              </p>

              {/* TAGS */}
              <div className="flex flex-wrap gap-1.5">
                {step.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`px-2 py-0.5 rounded-md text-[11px] font-bold border
                      ${isLight
                        ? 'bg-[#c9a84c]/10 border-[#c9a84c]/25 text-[#7a5010]'
                        : 'bg-[#c9a84c]/10 border-[#c9a84c]/25 text-[#f5d98b]'
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