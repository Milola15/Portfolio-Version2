// Dashboard.jsx — panneau admin pour gérer projets, compétences et messages

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../firebase'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import {
  collection, addDoc, getDocs,
  deleteDoc, doc, updateDoc, orderBy, query
} from 'firebase/firestore'
import {
  FiLogOut, FiPlus, FiTrash2, FiEdit3,
  FiX, FiCheck, FiMail, FiCode, FiBriefcase
} from 'react-icons/fi'

function Dashboard() {
  const navigate = useNavigate()

  // État de l'onglet actif
  const [activeTab, setActiveTab] = useState('messages')

  // Données depuis Firebase
  const [messages,  setMessages]  = useState([])
  const [projects,  setProjects]  = useState([])
  const [skills,    setSkills]    = useState([])

  // États de chargement
  const [loading, setLoading] = useState(true)

  // Modal d'ajout/modification
  const [modal,    setModal]    = useState(null) // null | 'project' | 'skill'
  const [editItem, setEditItem] = useState(null) // null | objet à modifier

  // Formulaires
  const [projectForm, setProjectForm] = useState({
    title: '', desc: '', tags: '', github: '', live: '', status: 'done'
  })
  const [skillForm, setSkillForm] = useState({
    name: '', category: 'Front-end'
  })

  // Vérifie que l'utilisateur est connecté
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) navigate('/admin')
    })
    return () => unsubscribe()
  }, [navigate])

  // Charge les données au démarrage
  useEffect(() => {
    fetchAll()
  }, [])

  async function fetchAll() {
    setLoading(true)
    try {
      await Promise.all([fetchMessages(), fetchProjects(), fetchSkills()])
    } finally {
      setLoading(false)
    }
  }

  // Récupère les messages
  async function fetchMessages() {
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'))
    const snap = await getDocs(q)
    setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() })))
  }

  // Récupère les projets
  async function fetchProjects() {
    const snap = await getDocs(collection(db, 'projects'))
    setProjects(snap.docs.map(d => ({ id: d.id, ...d.data() })))
  }

  // Récupère les compétences
  async function fetchSkills() {
    const snap = await getDocs(collection(db, 'skills'))
    setSkills(snap.docs.map(d => ({ id: d.id, ...d.data() })))
  }

  // Déconnexion
  async function handleLogout() {
    await signOut(auth)
    navigate('/admin')
  }

  // Supprimer un document
  async function handleDelete(collectionName, id) {
    if (!confirm('Confirmer la suppression ?')) return
    await deleteDoc(doc(db, collectionName, id))
    fetchAll()
  }

  // Marquer message comme lu
  async function markAsRead(id) {
    await updateDoc(doc(db, 'messages', id), { read: true })
    fetchMessages()
  }

  // Ouvrir modal ajout projet
  function openAddProject() {
    setEditItem(null)
    setProjectForm({ title: '', desc: '', tags: '', github: '', live: '', status: 'done' })
    setModal('project')
  }

  // Ouvrir modal modification projet
  function openEditProject(project) {
    setEditItem(project)
    setProjectForm({
      title:  project.title  || '',
      desc:   project.desc   || '',
      tags:   Array.isArray(project.tags) ? project.tags.join(', ') : '',
      github: project.github || '',
      live:   project.live   || '',
      status: project.status || 'done',
    })
    setModal('project')
  }

  // Sauvegarder projet (ajout ou modification)
  async function saveProject() {
    const data = {
      title:  projectForm.title,
      desc:   projectForm.desc,
      tags:   projectForm.tags.split(',').map(t => t.trim()),
      github: projectForm.github,
      live:   projectForm.live,
      status: projectForm.status,
    }

    if (editItem) {
      await updateDoc(doc(db, 'projects', editItem.id), data)
    } else {
      await addDoc(collection(db, 'projects'), data)
    }

    setModal(null)
    fetchProjects()
  }

  // Sauvegarder compétence
  async function saveSkill() {
    const data = { name: skillForm.name, category: skillForm.category }

    if (editItem) {
      await updateDoc(doc(db, 'skills', editItem.id), data)
    } else {
      await addDoc(collection(db, 'skills'), data)
    }

    setModal(null)
    fetchSkills()
  }

  const tabs = [
    { id: 'messages', label: 'Messages',    icon: <FiMail size={16} />,      count: messages.filter(m => !m.read).length },
    { id: 'projects', label: 'Projets',     icon: <FiBriefcase size={16} />, count: projects.length },
    { id: 'skills',   label: 'Compétences', icon: <FiCode size={16} />,      count: skills.length   },
  ]

  const inputClass = `
    w-full px-3 py-2.5 rounded-xl border text-sm
    outline-none transition-all duration-200 cursor-text
    bg-white/06 border-white/15 text-white
    placeholder:text-white/30
    focus:border-[#c9a84c]/50 focus:ring-1 focus:ring-[#c9a84c]/20
  `

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d0306] via-[#2a0810] to-[#1a0a04]
      flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#c9a84c]/30 border-t-[#c9a84c]
        rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d0306] via-[#2a0810] to-[#1a0a04]">

      {/* NAVBAR ADMIN */}
      <nav className="sticky top-0 z-50 px-6 py-4
        bg-[#0d0306]/80 backdrop-blur-xl
        border-b border-[#c9a84c]/15">
        <div className="max-w-5xl mx-auto flex items-center justify-between">

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm rotate-45
              bg-gradient-to-br from-[#c9a84c] to-[#f5d98b]" />
            <span className="font-bold text-white tracking-widest">
              Admin
            </span>
            <span className="text-white/30 text-xs ml-2">
              — Eunice Ogunemi
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="cursor-pointer text-xs text-white/50
                hover:text-white/80 transition-colors px-3 py-1.5
                rounded-lg border border-white/10 hover:border-white/25"
            >
              Voir le portfolio
            </button>
            <button
              onClick={handleLogout}
              className="cursor-pointer flex items-center gap-2
                text-xs font-bold px-3 py-1.5 rounded-lg
                bg-red-500/10 border border-red-500/30 text-red-400
                hover:bg-red-500/20 transition-colors"
            >
              <FiLogOut size={13} />
              Déconnexion
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* ONGLETS */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`cursor-pointer flex items-center gap-2
                px-4 py-2.5 rounded-xl text-sm font-bold border
                transition-all duration-200
                ${activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#6B1A2A] to-[#c9a84c] text-white border-transparent'
                  : 'bg-white/05 border-white/12 text-white/60 hover:text-white hover:bg-white/10'
                }`}
            >
              {tab.icon}
              {tab.label}
              {/* Badge compteur */}
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold
                ${activeTab === tab.id
                  ? 'bg-white/20 text-white'
                  : 'bg-white/10 text-white/50'
                }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* ===== ONGLET MESSAGES ===== */}
        {activeTab === 'messages' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-white font-extrabold text-lg mb-4">
              Messages reçus
              {messages.filter(m => !m.read).length > 0 && (
                <span className="ml-2 text-xs text-[#c9a84c] font-bold">
                  ({messages.filter(m => !m.read).length} non lus)
                </span>
              )}
            </h2>

            {messages.length === 0 ? (
              <div className="text-center py-16 text-white/30">
                <FiMail size={40} className="mx-auto mb-3 opacity-30" />
                <p className="text-sm">Aucun message pour l'instant</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {messages.map((msg) => (
                  <div key={msg.id} className={`
                    p-4 rounded-2xl border transition-all duration-300
                    ${msg.read
                      ? 'bg-white/04 border-white/08'
                      : 'bg-[#c9a84c]/06 border-[#c9a84c]/25'
                    }
                  `}>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-white font-bold text-sm">
                          {msg.from_name}
                          {!msg.read && (
                            <span className="ml-2 text-[10px] bg-[#c9a84c]/20
                              text-[#c9a84c] px-2 py-0.5 rounded-full font-bold">
                              Nouveau
                            </span>
                          )}
                        </p>
                        <p className="text-white/50 text-xs">{msg.from_email}</p>
                      </div>

                      <div className="flex gap-2">
                        {/* Marquer comme lu */}
                        {!msg.read && (
                          <button
                            onClick={() => markAsRead(msg.id)}
                            className="cursor-pointer p-1.5 rounded-lg
                              bg-green-500/10 border border-green-500/30
                              text-green-400 hover:bg-green-500/20
                              transition-colors"
                            title="Marquer comme lu"
                          >
                            <FiCheck size={13} />
                          </button>
                        )}
                        {/* Supprimer */}
                        <button
                          onClick={() => handleDelete('messages', msg.id)}
                          className="cursor-pointer p-1.5 rounded-lg
                            bg-red-500/10 border border-red-500/30
                            text-red-400 hover:bg-red-500/20
                            transition-colors"
                          title="Supprimer"
                        >
                          <FiTrash2 size={13} />
                        </button>
                      </div>
                    </div>

                    <p className="text-white/70 text-xs leading-relaxed">
                      {msg.message}
                    </p>

                    {msg.createdAt && (
                      <p className="text-white/25 text-[11px] mt-2">
                        {new Date(msg.createdAt.toDate()).toLocaleDateString('fr-FR', {
                          day: 'numeric', month: 'long', year: 'numeric',
                          hour: '2-digit', minute: '2-digit'
                        })}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* ===== ONGLET PROJETS ===== */}
        {activeTab === 'projects' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-extrabold text-lg">Projets</h2>
              <button
                onClick={openAddProject}
                className="cursor-pointer flex items-center gap-2
                  px-4 py-2 rounded-xl text-xs font-bold
                  bg-gradient-to-r from-[#6B1A2A] to-[#c9a84c]
                  text-white transition-opacity hover:opacity-90"
              >
                <FiPlus size={14} />
                Ajouter un projet
              </button>
            </div>

            {projects.length === 0 ? (
              <div className="text-center py-16 text-white/30">
                <FiBriefcase size={40} className="mx-auto mb-3 opacity-30" />
                <p className="text-sm">Aucun projet — ajoutez-en un !</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {projects.map((project) => (
                  <div key={project.id} className="p-4 rounded-2xl border
                    bg-white/05 border-white/12 border-t-2 border-t-[#c9a84c]/40">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-white font-bold text-sm">
                        {project.title}
                      </h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditProject(project)}
                          className="cursor-pointer p-1.5 rounded-lg
                            bg-[#c9a84c]/10 border border-[#c9a84c]/30
                            text-[#c9a84c] hover:bg-[#c9a84c]/20 transition-colors"
                        >
                          <FiEdit3 size={12} />
                        </button>
                        <button
                          onClick={() => handleDelete('projects', project.id)}
                          className="cursor-pointer p-1.5 rounded-lg
                            bg-red-500/10 border border-red-500/30
                            text-red-400 hover:bg-red-500/20 transition-colors"
                        >
                          <FiTrash2 size={12} />
                        </button>
                      </div>
                    </div>
                    <p className="text-white/55 text-xs leading-relaxed mb-2">
                      {project.desc}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {Array.isArray(project.tags) && project.tags.map(tag => (
                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md
                          bg-[#c9a84c]/12 border border-[#c9a84c]/25 text-[#c9a84c]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* ===== ONGLET COMPÉTENCES ===== */}
        {activeTab === 'skills' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-extrabold text-lg">Compétences</h2>
              <button
                onClick={() => {
                  setEditItem(null)
                  setSkillForm({ name: '', category: 'Front-end' })
                  setModal('skill')
                }}
                className="cursor-pointer flex items-center gap-2
                  px-4 py-2 rounded-xl text-xs font-bold
                  bg-gradient-to-r from-[#6B1A2A] to-[#c9a84c]
                  text-white transition-opacity hover:opacity-90"
              >
                <FiPlus size={14} />
                Ajouter une compétence
              </button>
            </div>

            {skills.length === 0 ? (
              <div className="text-center py-16 text-white/30">
                <FiCode size={40} className="mx-auto mb-3 opacity-30" />
                <p className="text-sm">Aucune compétence — ajoutez-en une !</p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <div key={skill.id} className="flex items-center gap-2
                    px-3 py-2 rounded-xl border
                    bg-white/06 border-white/12">
                    <span className="text-white/85 text-sm font-semibold">
                      {skill.name}
                    </span>
                    <span className="text-[10px] text-white/35">
                      {skill.category}
                    </span>
                    <button
                      onClick={() => handleDelete('skills', skill.id)}
                      className="cursor-pointer text-red-400/60
                        hover:text-red-400 transition-colors ml-1"
                    >
                      <FiX size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* ===== MODALS ===== */}
      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm
              flex items-center justify-center px-4"
            onClick={(e) => e.target === e.currentTarget && setModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-md bg-[#1a0508] border border-white/12
                rounded-3xl p-6 shadow-2xl"
            >
              {/* MODAL PROJET */}
              {modal === 'project' && (
                <>
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-white font-extrabold">
                      {editItem ? 'Modifier le projet' : 'Ajouter un projet'}
                    </h3>
                    <button onClick={() => setModal(null)}
                      className="cursor-pointer text-white/40 hover:text-white">
                      <FiX size={20} />
                    </button>
                  </div>

                  <div className="flex flex-col gap-3">
                    <input className={inputClass} placeholder="Titre du projet"
                      value={projectForm.title}
                      onChange={e => setProjectForm(p => ({...p, title: e.target.value}))} />
                    <textarea className={`${inputClass} resize-none`} placeholder="Description"
                      rows={3} value={projectForm.desc}
                      onChange={e => setProjectForm(p => ({...p, desc: e.target.value}))} />
                    <input className={inputClass} placeholder="Tags (séparés par des virgules)"
                      value={projectForm.tags}
                      onChange={e => setProjectForm(p => ({...p, tags: e.target.value}))} />
                    <input className={inputClass} placeholder="Lien GitHub"
                      value={projectForm.github}
                      onChange={e => setProjectForm(p => ({...p, github: e.target.value}))} />
                    <input className={inputClass} placeholder="Lien Live (optionnel)"
                      value={projectForm.live}
                      onChange={e => setProjectForm(p => ({...p, live: e.target.value}))} />
                    <select className={inputClass}
                      value={projectForm.status}
                      onChange={e => setProjectForm(p => ({...p, status: e.target.value}))}>
                      <option value="done">Terminé</option>
                      <option value="wip">En cours</option>
                    </select>
                  </div>

                  <div className="flex gap-3 mt-5">
                    <button onClick={() => setModal(null)}
                      className="cursor-pointer flex-1 py-2.5 rounded-xl text-sm
                        font-bold border border-white/15 text-white/60
                        hover:text-white hover:border-white/30 transition-colors">
                      Annuler
                    </button>
                    <button onClick={saveProject}
                      className="cursor-pointer flex-1 py-2.5 rounded-xl text-sm
                        font-bold text-white
                        bg-gradient-to-r from-[#6B1A2A] to-[#c9a84c]
                        hover:opacity-90 transition-opacity">
                      {editItem ? 'Modifier' : 'Ajouter'}
                    </button>
                  </div>
                </>
              )}

              {/* MODAL COMPÉTENCE */}
              {modal === 'skill' && (
                <>
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-white font-extrabold">
                      Ajouter une compétence
                    </h3>
                    <button onClick={() => setModal(null)}
                      className="cursor-pointer text-white/40 hover:text-white">
                      <FiX size={20} />
                    </button>
                  </div>

                  <div className="flex flex-col gap-3">
                    <input className={inputClass} placeholder="Nom (ex: React)"
                      value={skillForm.name}
                      onChange={e => setSkillForm(p => ({...p, name: e.target.value}))} />
                    <select className={inputClass}
                      value={skillForm.category}
                      onChange={e => setSkillForm(p => ({...p, category: e.target.value}))}>
                      <option>Front-end</option>
                      <option>Back-end</option>
                      <option>Outils</option>
                      <option>Outils IA</option>
                    </select>
                  </div>

                  <div className="flex gap-3 mt-5">
                    <button onClick={() => setModal(null)}
                      className="cursor-pointer flex-1 py-2.5 rounded-xl text-sm
                        font-bold border border-white/15 text-white/60
                        hover:text-white hover:border-white/30 transition-colors">
                      Annuler
                    </button>
                    <button onClick={saveSkill}
                      className="cursor-pointer flex-1 py-2.5 rounded-xl text-sm
                        font-bold text-white
                        bg-gradient-to-r from-[#6B1A2A] to-[#c9a84c]
                        hover:opacity-90 transition-opacity">
                      Ajouter
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}

export default Dashboard