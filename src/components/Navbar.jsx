import { useState } from 'react'
import { FiMenu, FiX, FiSun, FiMoon, FiSettings } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

function Navbar({ isLight, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false)

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
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
      {/* ✅ fixed au lieu de sticky — reste visible en scrollant */}
      <nav className={`
        fixed top-0 left-0 right-0 z-50 px-6 py-3
        backdrop-blur-2xl border-b transition-all duration-500
        ${isLight
          ? 'bg-[#f0dde1]/95 border-[#6B1A2A]/20'
          : 'bg-[#1a0508]/90 border-[#c9a84c]/15'
        }
      `}>
        <div className="max-w-5xl mx-auto flex items-center justify-between">

          {/* LOGO */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-sm rotate-45
              bg-gradient-to-br from-[#c9a84c] to-[#f5d98b]" />
            <span className={`font-bold text-base tracking-widest
              transition-colors duration-500
              ${isLight ? 'text-[#1a0508]' : 'text-white'}`}>
              Eunice
            </span>
          </div>

          {/* LIENS DESKTOP */}
          <div className="hidden md:flex items-center gap-5">
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
          <div className="flex items-center gap-2">

            {/* Label mode — caché sur mobile */}
            <span className={`hidden sm:block text-xs font-semibold
              ${isLight ? 'text-[#3a0810]' : 'text-white/60'}`}>
              {isLight ? 'Jour' : 'Nuit'}
            </span>

            {/* TOGGLE */}
            <button
              onClick={toggleTheme}
              aria-label="Basculer mode jour/nuit"
              className={`relative w-12 h-6 rounded-full border
                transition-all duration-300 cursor-none
                ${isLight
                  ? 'bg-[#6B1A2A]/10 border-[#6B1A2A]/25'
                  : 'bg-white/10 border-white/20'
                }`}
            >
              <div className={`absolute top-[2px] w-5 h-5 rounded-full
                flex items-center justify-center
                transition-all duration-300
                ${isLight
                  ? 'left-[24px] bg-gradient-to-br from-[#6B1A2A] to-[#8B2A3E]'
                  : 'left-[2px] bg-gradient-to-br from-[#c9a84c] to-[#f5d98b]'
                }`}
              >
                {isLight
                  ? <FiSun  size={11} className="text-white" />
                  : <FiMoon size={11} className="text-[#1a0508]" />
                }
              </div>
            </button>

            {/* BOUTON ADMIN — caché sur mobile */}
            <button
              onClick={() => window.location.href = '/admin'}
              className="hidden sm:flex cursor-none items-center gap-1.5
                text-xs font-bold px-3 py-1.5 rounded-full border
                bg-gradient-to-br from-[#c9a84c]/15 to-[#c9a84c]/05
                border-[#c9a84c]/40 text-[#c9a84c]
                hover:from-[#c9a84c]/25 transition-all duration-200"
            >
              <FiSettings size={11} />
              Admin
            </button>

            {/* BURGER MOBILE */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`md:hidden cursor-none p-1.5 rounded-lg border
                transition-all duration-200
                ${isLight
                  ? 'border-[#6B1A2A]/20 text-[#1a0508]'
                  : 'border-white/20 text-white'
                }`}
            >
              {menuOpen
                ? <FiX    size={18} />
                : <FiMenu size={18} />
              }
            </button>

          </div>
        </div>
      </nav>

      {/* ✅ Espace pour compenser la navbar fixed */}
      <div className="h-[57px]" />

      {/* MENU MOBILE — plus compact */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1,  y:  0 }}
            exit={{    opacity: 0,  y: -8 }}
            transition={{ duration: 0.2 }}
            className={`
              md:hidden fixed top-[57px] left-0 right-0 z-40
              px-4 py-3 flex flex-col gap-1
              border-b backdrop-blur-2xl shadow-lg
              ${isLight
                ? 'bg-[#f0dde1]/98 border-[#6B1A2A]/15'
                : 'bg-[#1a0508]/97 border-[#c9a84c]/10'
              }
            `}
          >
            {/* Liens en ligne compacte */}
            <div className="grid grid-cols-2 gap-1">
              {links.map((link, index) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1,  y:  0 }}
                  transition={{ delay: index * 0.04 }}
                  onClick={() => scrollTo(link.id)}
                  className={`cursor-none text-left px-3 py-2 rounded-lg
                    text-xs font-semibold border transition-all duration-200
                    hover:border-[#c9a84c]/40 hover:text-[#c9a84c]
                    ${isLight
                      ? 'text-[#1a0508] border-[#6B1A2A]/10 hover:bg-[#6B1A2A]/05'
                      : 'text-white/80 border-white/08 hover:bg-white/05'
                    }`}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>

            {/* Bouton Admin compact */}
            <motion.button
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1,  y:  0 }}
              transition={{ delay: 0.25 }}
              onClick={() => window.location.href = '/admin'}
              className="cursor-none flex items-center justify-center gap-2
                px-3 py-2 rounded-lg text-xs font-bold border mt-1
                bg-[#c9a84c]/10 border-[#c9a84c]/30 text-[#c9a84c]"
            >
              <FiSettings size={12} />
              Panneau Admin
            </motion.button>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar