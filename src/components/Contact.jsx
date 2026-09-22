// Contact.jsx — formulaire de contact
// Les messages envoyés seront sauvegardés dans Firebase
// et visibles dans le panneau admin

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiSend, FiMail, FiGithub, FiLinkedin } from 'react-icons/fi'

function Contact({ isLight }) {

  // useState gère les valeurs du formulaire
  // Chaque champ a sa propre valeur dans l'objet "form"
  const [form, setForm] = useState({
    name:    '',
    email:   '',
    message: '',
  })

  // État pour afficher un message de succès ou d'erreur
  const [status, setStatus] = useState(null) // null | 'success' | 'error'
  const [loading, setLoading] = useState(false)

  // Mise à jour d'un champ quand l'utilisateur tape
  // e.target.name = le nom du champ (name, email, message)
  // e.target.value = ce que l'utilisateur a tapé
  function handleChange(e) {
    setForm(prev => ({
      ...prev,                    // garde les autres champs intacts
      [e.target.name]: e.target.value  // met à jour uniquement ce champ
    }))
  }

  // Envoi du formulaire vers Firebase
  async function handleSubmit(e) {
    e.preventDefault() // empêche le rechargement de la page

    // Vérifie que tous les champs sont remplis
    if (!form.name || !form.email || !form.message) {
      setStatus('error')
      return
    }

    setLoading(true)

    try {
      // Pour l'instant on simule l'envoi
      // On remplacera ça par Firebase dans le panneau admin
      await new Promise(resolve => setTimeout(resolve, 1500))

      setStatus('success')
      // Vide le formulaire après envoi
      setForm({ name: '', email: '', message: '' })

    } catch (err) {
      setStatus('error')
    } finally {
      setLoading(false)
      // Remet le status à null après 4 secondes
      setTimeout(() => setStatus(null), 4000)
    }
  }

  // Styles partagés pour les champs de saisie
  const inputClass = `
    w-full px-4 py-3 rounded-xl border text-sm font-medium
    outline-none transition-all duration-300
    placeholder:font-normal cursor-none
    focus:border-[#c9a84c]/60 focus:ring-2 focus:ring-[#c9a84c]/15
    ${isLight
      ? 'bg-white border-[#6B1A2A]/18 text-[#1a0508] placeholder:text-[#8a4050]'
      : 'bg-white/07 border-white/13 text-white placeholder:text-white/35'
    }
  `

  return (
    <section id="contact" className="px-6 py-14 max-w-3xl mx-auto">

      {/* TITRE DE SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 mb-8"
      >
        <span className={`text-xs uppercase tracking-[3px] font-bold whitespace-nowrap
          ${isLight ? 'text-[#6B1A2A]' : 'text-[#c9a84c]'}`}>
          Contact
        </span>
        <div className={`flex-1 h-px bg-gradient-to-r
          ${isLight
            ? 'from-[#6B1A2A]/30 to-transparent'
            : 'from-[#c9a84c]/40 to-transparent'
          }`}
        />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* COLONNE GAUCHE — texte + liens sociaux */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x:  0  }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3 className={`text-xl font-extrabold mb-3 transition-colors duration-500
            ${isLight ? 'text-[#1a0508]' : 'text-white'}`}>
            Travaillons ensemble !
          </h3>

          <p className={`text-sm leading-relaxed mb-6 transition-colors duration-500
            ${isLight ? 'text-[#5a1825]' : 'text-white/70'}`}>
            Tu as un projet ou une opportunité de stage ?
            N'hésite pas à me contacter, je réponds sous 24h.
          </p>

          {/* LIENS SOCIAUX */}
          <div className="flex flex-col gap-3">
            {[
              {
                icon:  <FiMail size={16} />,
                label: 'euniceogunemi@gmail.com',
                href:  'mailto:euniceogunemi@gmail.com',
              },
              {
                icon:  <FiGithub size={16} />,
                label: 'github.com/Milola15',
                href:  'https://github.com/Milola15',
              },
              {
                icon:  <FiLinkedin size={16} />,
                label: 'linkedin.com/in/EuniceOgunemi',
                href:  'https://www.linkedin.com/in/EuniceOgunemi',
              },
            ].map((link) => (
              
               <a key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className={`cursor-none flex items-center gap-3 px-4 py-3 rounded-xl border
                  text-sm font-semibold transition-all duration-300
                  hover:border-[#c9a84c]/50 hover:bg-[#c9a84c]/08
                  ${isLight
                    ? 'bg-[#6B1A2A]/05 border-[#6B1A2A]/15 text-[#2d0a10]'
                    : 'bg-white/05 border-white/12 text-white/80'
                  }`}
              >
                <span className="text-[#c9a84c]">{link.icon}</span>
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>

        {/* COLONNE DROITE — formulaire */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x:  0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">

            {/* CHAMP NOM */}
            <div>
              <label className={`text-xs font-bold mb-1.5 block transition-colors duration-500
                ${isLight ? 'text-[#2d0a10]' : 'text-white/70'}`}>
                Nom complet
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Eunice Ogunemi"
                className={inputClass}
              />
            </div>

            {/* CHAMP EMAIL */}
            <div>
              <label className={`text-xs font-bold mb-1.5 block transition-colors duration-500
                ${isLight ? 'text-[#2d0a10]' : 'text-white/70'}`}>
                Adresse email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="euniceogunemi@gmail.com"
                className={inputClass}
              />
            </div>

            {/* CHAMP MESSAGE */}
            <div>
              <label className={`text-xs font-bold mb-1.5 block transition-colors duration-500
                ${isLight ? 'text-[#2d0a10]' : 'text-white/70'}`}>
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Bonjour Eunice, j'aimerais..."
                rows={4}
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* MESSAGE DE STATUT */}
            {status === 'success' && (
              <p className="text-green-500 text-xs font-bold text-center py-2">
                ✅ Message envoyé avec succès !
              </p>
            )}
            {status === 'error' && (
              <p className="text-red-400 text-xs font-bold text-center py-2">
                ❌ Veuillez remplir tous les champs.
              </p>
            )}

            {/* BOUTON ENVOYER */}
            <button
              type="submit"
              disabled={loading}
              className="cursor-none flex items-center justify-center gap-2
                px-6 py-3 rounded-xl text-sm font-extrabold
                bg-gradient-to-r from-[#c9a84c] to-[#e2c06a] text-[#1a0508]
                hover:opacity-90 transition-opacity duration-200
                disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                // Spinner pendant l'envoi
                <span className="w-4 h-4 border-2 border-[#1a0508]/30
                  border-t-[#1a0508] rounded-full animate-spin" />
              ) : (
                <>
                  <FiSend size={15} />
                  Envoyer le message
                </>
              )}
            </button>

          </form>
        </motion.div>
      </div>

    </section>
  )
}

export default Contact