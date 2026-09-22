// Navbar.jsx — avec menu burger responsive et icônes professionnelles

import { useState } from 'react'
import { FiMenu, FiX, FiSun, FiMoon, FiSettings } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

function Navbar({ isLight, toggleTheme }) {
  // État pour ouvrir/fermer le menu burger
  const [menuOpen, setMenuOpen] = useState(false)

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false) // ferme le menu après avoir cliqué
  }

  const links = [
    { id: 'about',    label: 'À propos'    },
    { id: 'skills',   label: 'Compétences' },
    { id: 'projects', label: 'Projets'     },
    { id: 'timeline', label: 'Parcours'    },
    { id: 'contact',  label: 'Contact'     },
  ]

  return (
    <>
      <nav className={`
        sticky top-0 z-50 px-6 py-4
        backdrop-blur-2xl border-b transition-all duration-500
        ${isLight
          ? 'bg-[#fdf5f7]/95 border-[#6B1A2A]/20'
          : 'bg-[#1a0508]/80 border-[#c9a84c]/15'
        }
      `}>
        <div className="max-w-5xl mx-auto flex items-center justify-between">

          {/* LOGO */}
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm rotate-45
              bg-gradient-to-br from-[#c9a84c] to-[#f5d98b]" />
            <span className={`font-bold text-lg tracking-widest
              transition-colors duration-500
              ${isLight ? 'text-[#1a0508]' : 'text-white'}`}>
              Eunice
            </span>
          </div>

          {/* LIENS — cachés sur mobile, visibles sur desktop */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`text-sm font-semibold cursor-none
                  transition-colors duration-200 hover:text-[#c9a84c]
                  ${isLight ? 'text-[#3a0810]' : 'text-white/75'}`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* PARTIE DROITE */}
          <div className="flex items-center gap-3">

            {/* LABEL MODE — caché sur mobile */}
            <span className={`hidden sm:block text-xs font-semibold
              transition-colors duration-500
              ${isLight ? 'text-[#3a0810]' : 'text-white/60'}`}>
              {isLight ? 'Jour' : 'Nuit'}
            </span>

            {/* TOGGLE JOUR / NUIT */}
            <button
              onClick={toggleTheme}
              aria-label="Basculer mode jour/nuit"
              className={`relative w-14 h-7 rounded-full border
                transition-all duration-300 cursor-none
                ${isLight
                  ? 'bg-[#6B1A2A]/10 border-[#6B1A2A]/25'
                  : 'bg-white/10 border-white/20'
                }`}
            >
              <div className={`absolute top-[3px] w-[22px] h-[22px] rounded-full
                flex items-center justify-center
                transition-all duration-300
                ${isLight
                  ? 'left-[27px] bg-gradient-to-br from-[#6B1A2A] to-[#8B2A3E]'
                  : 'left-[3px] bg-gradient-to-br from-[#c9a84c] to-[#f5d98b]'
                }`}
              >
                {/* Icône soleil ou lune selon le mode */}
                {isLight
                  ? <FiSun  size={12} className="text-white" />
                  : <FiMoon size={12} className="text-[#1a0508]" />
                }
              </div>
            </button>

            {/* BOUTON ADMIN — caché sur mobile */}
            <button
              onClick={() => window.location.href = '/admin'}
              className="hidden sm:flex cursor-none items-center gap-1.5
                text-xs font-bold px-4 py-1.5 rounded-full border
                bg-gradient-to-br from-[#c9a84c]/15 to-[#c9a84c]/05
                border-[#c9a84c]/40 text-[#c9a84c]
                hover:from-[#c9a84c]/25 transition-all duration-200"
            >
              <FiSettings size={12} />
              Admin
            </button>

            {/* BURGER — visible uniquement sur mobile */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`md:hidden cursor-none p-2 rounded-lg border
                transition-all duration-200
                ${isLight
                  ? 'border-[#6B1A2A]/20 text-[#1a0508]'
                  : 'border-white/20 text-white'
                }`}
            >
              {/* Icône change selon l'état du menu */}
              {menuOpen
                ? <FiX    size={20} />
                : <FiMenu size={20} />
              }
            </button>

          </div>
        </div>
      </nav>

      {/* MENU MOBILE — apparaît/disparaît avec animation */}
      {/* AnimatePresence permet d'animer la sortie d'un élément */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1,  y:   0 }}
            exit={{    opacity: 0,  y: -10 }}
            transition={{ duration: 0.2 }}
            className={`
              md:hidden fixed top-[65px] left-0 right-0 z-40
              px-6 py-4 flex flex-col gap-2
              border-b backdrop-blur-2xl
              transition-colors duration-500
              ${isLight
                ? 'bg-[#fdf5f7]/98 border-[#6B1A2A]/15'
                : 'bg-[#1a0508]/95 border-[#c9a84c]/10'
              }
            `}
          >
            {links.map((link, index) => (
              <motion.button
                key={link.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1,  x:   0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => scrollTo(link.id)}
                className={`cursor-none text-left px-4 py-3 rounded-xl
                  text-sm font-semibold border transition-all duration-200
                  hover:border-[#c9a84c]/40 hover:text-[#c9a84c]
                  ${isLight
                    ? 'text-[#1a0508] border-[#6B1A2A]/10 hover:bg-[#6B1A2A]/05'
                    : 'text-white/80 border-white/08 hover:bg-white/05'
                  }`}
              >
                {link.label}
              </motion.button>
            ))}

            {/* Bouton Admin dans le menu mobile */}
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1,  x:   0 }}
              transition={{ delay: links.length * 0.05 }}
              onClick={() => window.location.href = '/admin'}
              className="cursor-none flex items-center gap-2 px-4 py-3
                rounded-xl text-sm font-bold border mt-1
                bg-[#c9a84c]/10 border-[#c9a84c]/30 text-[#c9a84c]"
            >
              <FiSettings size={14} />
              Panneau Admin
            </motion.button>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar