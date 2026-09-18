// About.jsx — section "À propos" avec ta photo et ta présentation

import { motion } from 'framer-motion'

// Importe ta photo ici — place-la dans src/assets/
// Pour l'instant on met un placeholder
// ✅ Remplace par cette seule ligne
const photo = 'https://placehold.co/150x150/3d0f20/c9a84c?text=E'

function About({ isLight }) {

  const fadeUp = (delay = 0) => ({
    initial:    { opacity: 0, y: 30 },
    animate:    { opacity: 1, y: 0  },
    transition: { duration: 0.6, delay }
  })

  const infos = [
    { icon: '📍', label: 'Abidjan, CI'    },
    { icon: '🎓', label: 'En formation'   },
    { icon: '💼', label: 'Open to work'   },
    { icon: '🌐', label: 'FR / EN'        },
  ]

  return (
    <section id="about" className="px-6 py-14 max-w-3xl mx-auto">

      {/* TITRE DE SECTION */}
      <motion.div {...fadeUp(0)} className="flex items-center gap-3 mb-8">
        <span className={`text-xs uppercase tracking-[3px] font-bold whitespace-nowrap
          ${isLight ? 'text-[#6B1A2A]' : 'text-[#c9a84c]'}`}>
          À propos
        </span>
        {/* Ligne décorative */}
        <div className={`flex-1 h-px bg-gradient-to-r
          ${isLight
            ? 'from-[#6B1A2A]/30 to-transparent'
            : 'from-[#c9a84c]/40 to-transparent'
          }`}
        />
      </motion.div>

      {/* CARTE GLASSMORPHISM */}
      <motion.div {...fadeUp(0.15)} className={`
        flex gap-6 items-start p-6 rounded-2xl border transition-all duration-500
        ${isLight
          ? 'bg-[#6B1A2A]/05 border-[#6B1A2A]/18'
          : 'bg-white/07 border-white/13'
        }
      `}>

        {/* PHOTO RONDE avec bordure dégradée */}
        <div className="flex-shrink-0">
          <div className="w-24 h-24 p-[3px] rounded-full
            bg-gradient-to-br from-[#c9a84c] via-[#6B1A2A] to-[#e2c06a]">
            <div className="w-full h-full rounded-full overflow-hidden">
              <img
                src={photo}
                alt="Photo de Eunice"
                className="w-full h-full object-cover"
                
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.parentElement.innerHTML =
                    '<div class="w-full h-full rounded-full bg-[#3d0f20] flex items-center justify-center text-white text-2xl font-bold">E</div>'
                }}
              />
            </div>
          </div>
        </div>

        {/* TEXTE */}
        <div className="flex-1 min-w-0">

          {/* Nom */}
          <motion.h3 {...fadeUp(0.2)}
            className={`text-base font-extrabold mb-2 transition-colors duration-500
              ${isLight ? 'text-[#1a0508]' : 'text-white'}`}>
            Eunice{' '}
            <span className="bg-gradient-to-r from-[#c9a84c] to-[#f5d98b]
              bg-clip-text text-transparent">
              Ogunemi
            </span>
          </motion.h3>

          {/* Description */}
          <motion.p {...fadeUp(0.25)}
            className={`text-sm leading-relaxed mb-4 transition-colors duration-500
              ${isLight ? 'text-[#2d0a10]' : 'text-white/80'}`}>
            Développeuse web junior passionnée, basée à Abidjan.
            Je crée des interfaces modernes et des applications full-stack robustes.
            Toujours en apprentissage, je cherche un stage pour mettre mes compétences
            au service d'une équipe ambitieuse.
          </motion.p>

          {/* Infos pills */}
          <motion.div {...fadeUp(0.3)} className="flex flex-wrap gap-2">
            {infos.map((info) => (
              <span key={info.label} className={`
                flex items-center gap-1.5 px-3 py-1 rounded-lg border
                text-xs font-bold transition-all duration-500
                ${isLight
                  ? 'bg-[#c9a84c]/12 border-[#c9a84c]/28 text-[#7a5010]'
                  : 'bg-[#c9a84c]/12 border-[#c9a84c]/28 text-[#f5d98b]'
                }
              `}>
                {info.icon} {info.label}
              </span>
            ))}
          </motion.div>

        </div>
      </motion.div>

    </section>
  )
}

export default About