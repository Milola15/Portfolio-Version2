import { motion } from 'framer-motion'
import photo from '../assets/img2.png'

function About({ isLight }) {

  const fadeUp = (delay = 0) => ({
    initial:    { opacity: 0, y: 20 },
    animate:    { opacity: 1, y: 0  },
    transition: { duration: 0.5, delay }
  })

  const infos = [
    { icon: '📍', label: 'Abidjan, CI'  },
    { icon: '🎓', label: 'En formation' },
    { icon: '💼', label: 'Open to work' },
    { icon: '🌐', label: 'FR / EN'      },
  ]

  return (
    <section id="about" className="px-6 py-14 max-w-5xl mx-auto">

      {/* TITRE */}
      <motion.div {...fadeUp(0)}
        className="flex items-center gap-3 mb-8">
        <span className={`text-xs uppercase tracking-[3px] font-bold whitespace-nowrap
          bg-clip-text text-transparent bg-gradient-to-r
          ${isLight
            ? 'from-[#c9a84c] to-[#8B2A3E]'
            : 'from-[#c9a84c] to-[#f5d98b]'
          }`}>
          À propos
        </span>
        <div className={`flex-1 h-px bg-gradient-to-r
          ${isLight
            ? 'from-[#c9a84c]/50 to-transparent'
            : 'from-[#c9a84c]/40 to-transparent'
          }`}
        />
      </motion.div>

      {/* LAYOUT 2 COLONNES */}
      <div className="flex flex-col md:flex-row gap-8 items-stretch">

        {/* ===== COLONNE GAUCHE — PHOTO AVEC TEXTE PAR DESSUS ===== */}
        <motion.div {...fadeUp(0.1)}
          className="relative w-full md:w-[45%] flex-shrink-0 rounded-2xl overflow-hidden min-h-[360px]">

          {/* Bordure dégradée */}
          <div className="absolute inset-0 p-[2px] rounded-2xl
            bg-gradient-to-br from-[#c9a84c] via-[#6B1A2A] to-[#e2c06a] z-0">
            <div className="w-full h-full rounded-2xl bg-[#1a0508]" />
          </div>

          {/* PHOTO */}
          <img
            src={photo}
            alt="Eunice Ogunemi"
            className="absolute inset-0 w-full h-full object-cover object-top rounded-2xl z-10"
            onError={(e) => {
              e.target.style.display = 'none'
            }}
          />

          {/* Dégradé sombre en bas pour lire le texte */}
          <div className="absolute inset-0 z-20 rounded-2xl
            bg-gradient-to-t from-[#0d0306]/90 via-[#0d0306]/30 to-transparent" />

          {/* TEXTE PAR DESSUS LA PHOTO */}
          <div className="absolute bottom-0 left-0 right-0 z-30 p-5">

            {/* Badge disponible */}
            <div className="inline-flex items-center gap-2 mb-3
              px-3 py-1 rounded-full border text-xs font-bold
              bg-[#0d0306]/60 border-[#c9a84c]/40 text-[#c9a84c]
              backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Disponible pour un stage
            </div>

            {/* Nom */}
            <h3 className="text-white text-xl font-extrabold mb-1 drop-shadow-lg">
              Eunice{' '}
              <span className="bg-gradient-to-r from-[#c9a84c] to-[#f5d98b]
                bg-clip-text text-transparent">
                Ogunemi
              </span>
            </h3>

            {/* Titre */}
            <p className="text-white/80 text-xs font-semibold">
              Développeuse Web & Mobile Junior
            </p>

          </div>
        </motion.div>

        {/* ===== COLONNE DROITE — TEXTE ===== */}
        <motion.div {...fadeUp(0.2)}
          className="flex-1 flex flex-col justify-center gap-5">

          {/* Texte de présentation */}
          <div className={`p-5 rounded-2xl border transition-all duration-500
            ${isLight
              ? 'bg-white border-[#c9a84c]/30 shadow-md border-t-2 border-t-[#c9a84c]'
              : 'bg-white/06 border-white/12 border-t-2 border-t-[#c9a84c]/50'
            }`}>
            <p className={`text-sm leading-relaxed transition-colors duration-500
              ${isLight ? 'text-[#1a0508]' : 'text-white/85'}`}>
              Développeuse Web & Mobile junior passionnée, basée à Abidjan.
              Je crée des interfaces modernes et des applications full-stack robustes.
              Toujours en apprentissage, je cherche un stage pour mettre mes compétences
              au service d'une équipe ambitieuse.
            </p>
          </div>

          {/* Info pills */}
          <div className="grid grid-cols-2 gap-3">
            {infos.map((info, i) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0  }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border
                  transition-all duration-500
                  ${isLight
                    ? 'bg-white border-[#c9a84c]/30 shadow-sm'
                    : 'bg-white/06 border-white/12'
                  }`}
              >
                <span className="text-lg">{info.icon}</span>
                <span className={`text-sm font-semibold transition-colors duration-500
                  ${isLight ? 'text-[#1a0508]' : 'text-white/85'}`}>
                  {info.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About