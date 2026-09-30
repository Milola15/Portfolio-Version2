import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { FiSend, FiMail, FiGithub, FiLinkedin, FiMessageCircle } from 'react-icons/fi'
import emailjs from '@emailjs/browser'

//  Remplace ces valeurs par les tiennes depuis emailjs.com
// Les variables d'environnement Vite sont accessibles via import.meta.env
const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
//  Ton numéro WhatsApp avec indicatif pays (sans + ni espaces)
const WHATSAPP_NUMBER = '2250798719750'  // ex: 225XXXXXXXXX pour Côte d'Ivoire

function Contact({ isLight }) {

  const formRef = useRef(null)

 const [form, setForm] = useState({
  from_name:  '',
  from_email: '',
  message:    '',
})

  const [status,  setStatus]  = useState(null)
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (!form.from_name || !form.from_email || !form.message) {
      setStatus('error')
      return
    }

    setLoading(true)

    try {
      //  Envoi réel via EmailJS
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      )

      setStatus('success')
      setForm({ from_name: '', from_email: '', message: '' })

    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
    } finally {
      setLoading(false)
      setTimeout(() => setStatus(null), 5000)
    }
  }

  const inputClass = `
  w-full px-4 py-3 rounded-xl border text-sm font-medium
  outline-none transition-all duration-300
  placeholder:font-normal cursor-text
  focus:border-[#c9a84c]/60 focus:ring-2 focus:ring-[#c9a84c]/15
  ${isLight
    ? 'bg-white border-[#6B1A2A]/20 text-[#1a0508] placeholder:text-[#8a4050]/60'
    : 'bg-white/07 border-white/13 text-white placeholder:text-white/30'
  }
`

  return (
    <>
      <section id="contact" className="px-6 py-14 max-w-3xl mx-auto">

        {/* TITRE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className={`text-xs uppercase tracking-[3px] font-bold whitespace-nowrap
            bg-clip-text text-transparent bg-gradient-to-r
            ${isLight
              ? 'from-[#c9a84c] to-[#8B2A3E]'
              : 'from-[#c9a84c] to-[#f5d98b]'
            }`}>
            Contact
          </span>
          <div className={`flex-1 h-px bg-gradient-to-r
            ${isLight
              ? 'from-[#c9a84c]/50 to-transparent'
              : 'from-[#c9a84c]/40 to-transparent'
            }`}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* COLONNE GAUCHE */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            {/* Texte d'accroche amélioré */}
            <div className={`p-5 rounded-2xl border transition-all duration-500
              ${isLight
                ? 'bg-white border-[#c9a84c]/30 border-t-2 border-t-[#c9a84c] shadow-md'
                : 'bg-white/06 border-white/12 border-t-2 border-t-[#c9a84c]/50'
              }`}>
              <h3 className={`text-lg font-extrabold mb-2 transition-colors duration-500
                ${isLight ? 'text-[#1a0508]' : 'text-white'}`}>
                Travaillons ensemble !
              </h3>
              <p className={`text-sm leading-relaxed transition-colors duration-500
                ${isLight ? 'text-[#3a0810]' : 'text-white/75'}`}>
                Vous avez un projet ou une idée en tête ?
                N'hésitez pas à me contacter — que ce soit pour
                une opportunité de stage, une collaboration ou
                simplement échanger. Je réponds sous 24h.
              </p>
            </div>

            {/* LIENS SOCIAUX */}
            <div className="flex flex-col gap-2">
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
              ].map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.2 + i * 0.08 }}
                  whileHover={{ x: 4, transition: { duration: 0.2 } }}
                  className={`cursor-none flex items-center gap-3 px-4 py-3
                    rounded-xl border text-sm font-semibold
                    transition-colors duration-300
                    hover:border-[#c9a84c]/50
                    ${isLight
                      ? 'bg-white border-[#6B1A2A]/15 text-[#1a0508] shadow-sm'
                      : 'bg-white/05 border-white/12 text-white/85'
                    }`}
                >
                  <span className="text-[#c9a84c] flex-shrink-0">{link.icon}</span>
                  <span className="text-xs truncate">{link.label}</span>
                </motion.a>
              ))}
            </div>

            {/* BOUTON WHATSAPP */}
            <motion.a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Bonjour%20Eunice%2C%20j'aimerais%20discuter%20d'un%20projet%20avec%20vous%20!`}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="cursor-none flex items-center justify-center gap-3
                px-4 py-3 rounded-xl border-2 text-sm font-bold
                bg-[#25D366]/10 border-[#25D366]/40 text-[#25D366]
                hover:bg-[#25D366]/15 transition-colors duration-200"
            >
              {/* Icône WhatsApp SVG */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Me contacter sur WhatsApp
            </motion.a>

          </motion.div>

          {/* COLONNE DROITE — FORMULAIRE */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* ✅ ref={formRef} nécessaire pour EmailJS */}
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-3">

              <div>
                <label className={`text-xs font-bold mb-1.5 block
                  ${isLight ? 'text-[#1a0508]' : 'text-white/80'}`}>
                  Nom complet
                </label>
                <input
                  type="text"
                  name="from_name"
                  value={form.from_name}
                  onChange={handleChange}
                  placeholder="Eunice Ogunemi"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={`text-xs font-bold mb-1.5 block
                  ${isLight ? 'text-[#1a0508]' : 'text-white/80'}`}>
                  Adresse email
                </label>
                <input
                  type="email"
                  name="from_email"
                  value={form.from_email}
                  onChange={handleChange}
                  placeholder="exemple@gmail.com"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={`text-xs font-bold mb-1.5 block
                  ${isLight ? 'text-[#1a0508]' : 'text-white/80'}`}>
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Bonjour Eunice, j'ai un projet à vous proposer..."
                  rows={5}
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* MESSAGES DE STATUT */}
              {status === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-green-500
                    text-xs font-bold text-center py-2 px-3
                    bg-green-500/10 border border-green-500/30 rounded-xl"
                >
                  <span>✓</span> Message envoyé avec succès ! Je vous répondrai sous 24h.
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-red-400
                    text-xs font-bold text-center py-2 px-3
                    bg-red-500/10 border border-red-500/30 rounded-xl"
                >
                  <span>✕</span> Veuillez remplir tous les champs.
                </motion.p>
              )}

              {/* BOUTON ENVOYER */}
              <button
                type="submit"
                disabled={loading}
                className="cursor-none flex items-center justify-center gap-2
                  px-6 py-3 rounded-xl text-sm font-extrabold text-white
                  bg-gradient-to-r from-[#6B1A2A] to-[#c9a84c]
                  hover:opacity-90 transition-opacity duration-200
                  disabled:opacity-60 shadow-lg"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white/30
                    border-t-white rounded-full animate-spin" />
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

      {/* ===== BULLE WHATSAPP FLOTTANTE ===== */}
      <motion.a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=Bonjour%20Eunice%2C%20j'aimerais%20discuter%20d'un%20projet%20avec%20vous%20!`}
        target="_blank"
        rel="noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 cursor-none
          w-14 h-14 rounded-full flex items-center justify-center
          bg-[#25D366] shadow-[0_4px_20px_rgba(37,211,102,0.4)]
          hover:shadow-[0_4px_28px_rgba(37,211,102,0.6)]
          transition-shadow duration-300"
        aria-label="Contacter sur WhatsApp"
      >
        {/* Icône WhatsApp */}
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>

        {/* Bulle animée autour */}
        <span className="absolute w-full h-full rounded-full
          bg-[#25D366] animate-ping opacity-20" />
      </motion.a>
    </>
  )
}

export default Contact