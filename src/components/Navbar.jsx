// Navbar.jsx — barre de navigation fixe en haut
// Elle reçoit isLight et toggleTheme depuis App.jsx via les "props"
// Les props = des paramètres qu'un composant parent passe à un enfant

function Navbar({ isLight, toggleTheme }) {

  // Fonction pour défiler vers une section quand on clique sur un lien
  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`
      sticky top-0 z-50 flex items-center justify-between px-8 py-4
      backdrop-blur-2xl border-b transition-all duration-500
      ${isLight
        ? 'bg-[#fdf5f7]/95 border-[#6B1A2A]/20'
        : 'bg-[#0d0306]/65 border-[#c9a84c]/15'
      }
    `}>

      {/* LOGO */}
      <div className="flex items-center gap-2">
        {/* Le petit losange doré */}
        <span className="w-2.5 h-2.5 rounded-sm rotate-45 bg-gradient-to-br from-[#c9a84c] to-[#f5d98b]" />
        <span className={`font-bold text-lg tracking-widest transition-colors duration-500
          ${isLight ? 'text-[#1a0508]' : 'text-white'}`}>
          Eunice
        </span>
      </div>

      {/* LIENS DE NAVIGATION */}
      {/* On fait une liste des liens pour éviter de répéter le code */}
      <div className="hidden md:flex items-center gap-6">
        {['about', 'skills', 'projects', 'timeline', 'contact'].map((section) => (
          <button
            key={section}
            onClick={() => scrollTo(section)}
            className={`text-sm font-semibold capitalize transition-colors duration-200 cursor-none
              hover:text-[#c9a84c]
              ${isLight ? 'text-[#5a1825]' : 'text-white/70'}`}
          >
            {/* Traduit les ids anglais en français */}
            {{
              about:    'À propos',
              skills:   'Compétences',
              projects: 'Projets',
              timeline: 'Parcours',
              contact:  'Contact',
            }[section]}
          </button>
        ))}
      </div>

      {/* PARTIE DROITE : toggle + bouton admin */}
      <div className="flex items-center gap-3">

        {/* Label du mode */}
        <span className={`text-xs font-semibold hidden sm:block transition-colors duration-500
          ${isLight ? 'text-[#5a1825]' : 'text-white/60'}`}>
          {isLight ? '☀️ Jour' : '🌙 Nuit'}
        </span>

        {/* BOUTON TOGGLE JOUR / NUIT */}
        <button
          onClick={toggleTheme}
          aria-label="Basculer mode jour/nuit"
          className={`
            relative w-14 h-7 rounded-full border transition-all duration-300 cursor-none
            ${isLight
              ? 'bg-[#6B1A2A]/10 border-[#6B1A2A]/25'
              : 'bg-white/10 border-white/20'
            }
          `}
        >
          {/* Le cercle qui glisse dans le toggle */}
          <div className={`
            absolute top-[3px] w-[22px] h-[22px] rounded-full
            flex items-center justify-center text-xs
            transition-all duration-300
            ${isLight
              ? 'left-[27px] bg-gradient-to-br from-[#6B1A2A] to-[#8B2A3E]'
              : 'left-[3px]  bg-gradient-to-br from-[#c9a84c] to-[#f5d98b]'
            }
          `}>
            {isLight ? '☀️' : '🌙'}
          </div>
        </button>

        {/* BOUTON ADMIN */}
        <button
          onClick={() => window.location.href = '/admin'}
          className="cursor-none text-xs font-bold px-4 py-1.5 rounded-full border
            bg-gradient-to-br from-[#c9a84c]/15 to-[#c9a84c]/5
            border-[#c9a84c]/40 text-[#c9a84c]
            hover:from-[#c9a84c]/25 transition-all duration-200"
        >
          ⚙ Admin
        </button>

      </div>
    </nav>
  )
}

export default Navbar