// Hero.jsx — la grande section d'accueil
// C'est la première chose que voit le visiteur

import { motion } from 'framer-motion'

// motion = framer-motion, ça permet de faire des animations simples
// motion.div = une div normale MAIS avec des animations en plus

function Hero({ isLight }) {

  // Les animations : chaque élément apparaît en glissant vers le haut
  // initial = état de départ, animate = état final, transition = durée
  const fadeUp = (delay = 0) => ({
    initial:    { opacity: 0, y: 30 },
    animate:    { opacity: 1, y: 0  },
    transition: { duration: 0.6, delay }
  })

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const tags = [
    { label: 'React',      gold: true  },
    { label: 'JavaScript', gold: false },
    { label: 'Laravel',    gold: true  },
    { label: 'Java',       gold: false },
    { label: 'PHP',        gold: false },
    { label: 'Firebase',   gold: true  },
    { label: 'MySQL',      gold: false },
  ]

  return (
    <section id="hero" className="relative px-6 pt-16 pb-12 text-center overflow-hidden">

      {/* BLOBS — les cercles flous en arrière-plan */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-drift absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-25
          bg-[radial-gradient(circle,#6B1A2A,transparent)]" />
        <div className="animate-drift absolute top-48 -right-24 w-72 h-72 rounded-full opacity-25
          bg-[radial-gradient(circle,#c9a84c,transparent)]"
          style={{ animationDelay: '2s' }} />
        <div className="animate-drift absolute -bottom-20 left-1/3 w-64 h-64 rounded-full opacity-20
          bg-[radial-gradient(circle,#8B2A3E,transparent)]"
          style={{ animationDelay: '4s' }} />
      </div>

      {/* PARTICULES flottantes */}
      <Particles />

      {/* CONTENU HERO */}
      <div className="relative z-10 max-w-2xl mx-auto">

        {/* Badge "disponible" */}
        <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 mb-6
          px-4 py-1.5 rounded-full border text-xs font-bold
          bg-[#c9a84c]/13 border-[#c9a84c]/35
          text-[#c9a84c]">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          Disponible pour un stage
        </motion.div>

        {/* AVATAR */}
        <motion.div {...fadeUp(0.1)} className="mx-auto mb-5 w-24 h-24 p-[3px] rounded-full
          bg-gradient-to-br from-[#c9a84c] via-[#6B1A2A] to-[#e2c06a]">
          <div className={`w-full h-full rounded-full flex items-center justify-center
            text-3xl font-bold text-white transition-colors duration-500
            ${isLight ? 'bg-[#3d0f20]' : 'bg-[#1a0508]'}`}>
            E
          </div>
        </motion.div>

        {/* NOM */}
        <motion.h1 {...fadeUp(0.2)}
          className={`text-4xl font-extrabold mb-2 tracking-tight transition-colors duration-500
            ${isLight ? 'text-[#1a0508]' : 'text-white'}`}>
          Eunice{' '}
          {/* Le prénom en dégradé or */}
          <span className="bg-gradient-to-r from-[#c9a84c] to-[#f5d98b]
            bg-clip-text text-transparent">
            Ogunemi
          </span>
        </motion.h1>

        {/* SOUS-TITRE */}
        <motion.p {...fadeUp(0.3)}
          className={`text-sm font-semibold mb-6 transition-colors duration-500
            ${isLight ? 'text-[#5a1825]' : 'text-white/70'}`}>
          Développeuse Web Junior · Abidjan, Côte d'Ivoire
        </motion.p>

        {/* TAGS TECHNOLOGIES */}
        <motion.div {...fadeUp(0.4)} className="flex flex-wrap justify-center gap-2 mb-8">
          {tags.map((tag) => (
            <span key={tag.label} className={`
              px-3 py-1 rounded-full text-xs font-semibold border transition-colors duration-500
              ${tag.gold
                ? 'bg-[#c9a84c]/15 border-[#c9a84c]/40 text-[#c9a84c]'
                : isLight
                  ? 'bg-[#6B1A2A]/08 border-[#6B1A2A]/20 text-[#3a0810]'
                  : 'bg-white/08 border-white/18 text-white/85'
              }
            `}>
              {tag.label}
            </span>
          ))}
        </motion.div>

        {/* BOUTONS */}
        <motion.div {...fadeUp(0.5)} className="flex justify-center gap-3 flex-wrap">

          {/* Bouton principal doré */}
          <button
            onClick={() => scrollTo('projects')}
            className="cursor-none px-6 py-2.5 rounded-lg text-sm font-extrabold
              bg-gradient-to-r from-[#c9a84c] to-[#e2c06a] text-[#1a0508]
              hover:opacity-90 transition-opacity duration-200">
            Voir mes projets
          </button>

          {/* Bouton télécharger CV */}
          
           <a href="/cv-eunice.pdf"
            download
            className={`cursor-none px-6 py-2.5 rounded-lg text-sm font-bold border
              bg-transparent transition-all duration-200
              border-[#c9a84c]/40 text-[#c9a84c]
              hover:bg-[#c9a84c]/10
              ${isLight ? '' : ''}`}>
            Télécharger CV
          </a>

        </motion.div>
      </div>

      {/* STATS en bas du hero */}
      <motion.div {...fadeUp(0.6)}
        className="relative z-10 grid grid-cols-3 gap-3 max-w-lg mx-auto mt-12">
        {[
          { n: '7+', label: 'Langages maîtrisés' },
          { n: '3+', label: 'Projets réalisés'   },
          { n: '2+', label: 'Ans de formation'   },
        ].map((stat) => (
          <div key={stat.label} className={`
            rounded-2xl border px-3 py-4 text-center transition-all duration-500
            ${isLight
              ? 'bg-[#6B1A2A]/06 border-[#6B1A2A]/18'
              : 'bg-white/07 border-white/13'
            }
          `}>
            {/* Chiffre en dégradé */}
            <div className={`text-2xl font-extrabold bg-clip-text text-transparent
              bg-gradient-to-r
              ${isLight
                ? 'from-[#6B1A2A] to-[#8B2A3E]'
                : 'from-[#c9a84c] to-[#f5d98b]'
              }`}>
              {stat.n}
            </div>
            <div className={`text-xs font-semibold mt-1 transition-colors duration-500
              ${isLight ? 'text-[#5a1825]' : 'text-white/65'}`}>
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>

    </section>
  )
}

// PARTICULES — composant séparé pour garder Hero propre
function Particles() {
  // On crée 18 particules avec des positions et durées aléatoires
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id:       i,
    left:     `${Math.random() * 100}%`,
    size:     Math.random() > 0.6 ? 3 : 2,
    gold:     Math.random() > 0.6,
    duration: `${7 + Math.random() * 8}s`,
    delay:    `${Math.random() * 7}s`,
  }))

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full animate-float"
          style={{
            left:            p.left,
            width:           p.size + 'px',
            height:          p.size + 'px',
            background:      p.gold
              ? 'rgba(201,168,76,0.5)'
              : 'rgba(255,255,255,0.25)',
            animationDuration: p.duration,
            animationDelay:    p.delay,
            bottom:            0,
          }}
        />
      ))}
    </div>
  )
}

export default Hero