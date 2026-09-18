// Footer.jsx — pied de page simple et élégant

import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

function Footer({ isLight }) {

  const currentYear = new Date().getFullYear()

  const socials = [
    {
      icon:  <FiGithub size={18} />,
      href:  'https://github.com',
      label: 'GitHub',
    },
    {
      icon:  <FiLinkedin size={18} />,
      href:  'https://linkedin.com',
      label: 'LinkedIn',
    },
    {
      icon:  <FiMail size={18} />,
      href:  'mailto:eunice@email.com',
      label: 'Email',
    },
  ]

  return (
    <footer className={`relative mt-8 border-t transition-colors duration-500
      ${isLight
        ? 'border-[#6B1A2A]/12'
        : 'border-[#c9a84c]/10'
      }`}
    >
      <div className="max-w-3xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0  }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-5"
        >

          {/* LOGO */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-sm rotate-45
              bg-gradient-to-br from-[#c9a84c] to-[#f5d98b]" />
            <span className={`font-extrabold text-lg tracking-widest
              transition-colors duration-500
              ${isLight ? 'text-[#1a0508]' : 'text-white'}`}>
              Eunice
            </span>
          </div>

          {/* LIENS SOCIAUX */}
          <div className="flex items-center gap-3">
            {socials.map((s) => (
              
              <a key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className={`cursor-none p-2.5 rounded-xl border
                  transition-all duration-300
                  hover:border-[#c9a84c]/50 hover:text-[#c9a84c]
                  hover:-translate-y-0.5
                  ${isLight
                    ? 'bg-[#6B1A2A]/05 border-[#6B1A2A]/15 text-[#5a1825]'
                    : 'bg-white/07 border-white/12 text-white/70'
                  }`}
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* SÉPARATEUR */}
          <div className={`w-24 h-px bg-gradient-to-r from-transparent
            via-[#c9a84c]/40 to-transparent`}
          />

          {/* COPYRIGHT */}
          <div className="text-center">
            <p className={`text-xs font-semibold transition-colors duration-500
              ${isLight ? 'text-[#8a4050]' : 'text-white/40'}`}>
              © {currentYear}{' '}
              <span className={`font-extrabold
                ${isLight ? 'text-[#6B1A2A]' : 'text-[#c9a84c]'}`}>
                Eunice Ogunemi
              </span>
              {' '}· Abidjan, Côte d'Ivoire
            </p>
            <p className={`text-[11px] mt-1 transition-colors duration-500
              ${isLight ? 'text-[#8a4050]/70' : 'text-white/25'}`}>
              Fait avec ♥ en React + Tailwind + Firebase
            </p>
          </div>

        </motion.div>
      </div>
    </footer>
  )
}

export default Footer