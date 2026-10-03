// Login.jsx — page de connexion sécurisée pour le panneau admin
// Seule toi avec ton email/mot de passe Firebase peut y accéder

import { useState } from 'react'
import { motion }   from 'framer-motion'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { FiMail, FiLock, FiEye, FiEyeOff, FiLogIn } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()

  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.email || !form.password) {
      setError('Veuillez remplir tous les champs.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Connexion avec Firebase Auth
      await signInWithEmailAndPassword(auth, form.email, form.password)
      // Redirige vers le dashboard si connexion réussie
      navigate('/dashboard')
    } catch (err) {
      setError('Email ou mot de passe incorrect.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const inputClass = `
    w-full px-4 py-3 rounded-xl border text-sm font-medium
    outline-none transition-all duration-300 cursor-text
    bg-white/06 border-white/13 text-white
    placeholder:text-white/30
    focus:border-[#c9a84c]/60 focus:ring-2 focus:ring-[#c9a84c]/15
  `

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d0306] via-[#2a0810] to-[#1a0a04]
      flex items-center justify-center px-4">

      {/* Blobs décoratifs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20
          bg-[radial-gradient(circle,#6B1A2A,transparent)]" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-20
          bg-[radial-gradient(circle,#c9a84c,transparent)]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md"
      >
        {/* CARTE DE CONNEXION */}
        <div className="bg-white/05 backdrop-blur-2xl border border-white/12
          rounded-3xl p-8 shadow-2xl">

          {/* LOGO */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <span className="w-3 h-3 rounded-sm rotate-45
              bg-gradient-to-br from-[#c9a84c] to-[#f5d98b]" />
            <span className="font-bold text-xl tracking-widest text-white">
              Eunice
            </span>
          </div>

          {/* TITRE */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-extrabold text-white mb-2">
              Panneau{' '}
              <span className="bg-gradient-to-r from-[#c9a84c] to-[#f5d98b]
                bg-clip-text text-transparent">
                Admin
              </span>
            </h1>
            <p className="text-white/50 text-sm">
              Connectez-vous pour gérer votre portfolio
            </p>
          </div>

          {/* FORMULAIRE */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Email */}
            <div>
              <label className="text-xs font-bold text-white/70 mb-1.5 block">
                Adresse email
              </label>
              <div className="relative">
                <FiMail
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c9a84c]"
                />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="euniceogunemi@gmail.com"
                  className={`${inputClass} pl-10`}
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div>
              <label className="text-xs font-bold text-white/70 mb-1.5 block">
                Mot de passe
              </label>
              <div className="relative">
                <FiLock
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c9a84c]"
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`${inputClass} pl-10 pr-10`}
                />
                {/* Bouton afficher/cacher mot de passe */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2
                    text-white/40 hover:text-white/70 transition-colors cursor-pointer"
                >
                  {showPassword
                    ? <FiEyeOff size={16} />
                    : <FiEye    size={16} />
                  }
                </button>
              </div>
            </div>

            {/* Message d'erreur */}
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1,  y:  0 }}
                className="text-red-400 text-xs font-bold text-center
                  py-2 px-3 bg-red-500/10 border border-red-500/30 rounded-xl"
              >
                {error}
              </motion.p>
            )}

            {/* Bouton connexion */}
            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer flex items-center justify-center gap-2
                px-6 py-3 rounded-xl text-sm font-extrabold text-white
                bg-gradient-to-r from-[#6B1A2A] to-[#c9a84c]
                hover:opacity-90 transition-opacity duration-200
                disabled:opacity-60 shadow-lg mt-2"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30
                  border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <FiLogIn size={16} />
                  Se connecter
                </>
              )}
            </button>

          </form>

          {/* Lien retour */}
          <div className="text-center mt-6">
            <button
              onClick={() => navigate('/')}
              className="cursor-pointer text-xs text-white/40
                hover:text-white/70 transition-colors"
            >
              ← Retour au portfolio
            </button>
          </div>

        </div>
      </motion.div>
    </div>
  )
}

export default Login