// Cursor.jsx — le curseur losange personnalisé
// Il suit la souris et change de couleur selon le mode

import { useEffect, useRef } from 'react'

function Cursor({ isLight }) {
  // useRef pointe directement vers les éléments HTML du curseur
  const cursorRef = useRef(null)
  const trailRef  = useRef(null)

  useEffect(() => {
    function onMouseMove(e) {
      const x = e.clientX
      const y = e.clientY

      // Le losange principal suit la souris immédiatement
      if (cursorRef.current) {
        cursorRef.current.style.left = x + 'px'
        cursorRef.current.style.top  = y + 'px'
      }

      // Le carré pointillé suit avec un léger délai (effet de traînée)
      setTimeout(() => {
        if (trailRef.current) {
          trailRef.current.style.left = x + 'px'
          trailRef.current.style.top  = y + 'px'
        }
      }, 80)
    }

    // Rétrécit au clic
    function onMouseDown() {
      cursorRef.current.style.transform = 'translate(-50%,-50%) rotate(45deg) scale(0.7)'
    }
    function onMouseUp() {
      cursorRef.current.style.transform = 'translate(-50%,-50%) rotate(45deg) scale(1)'
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup',   onMouseUp)

    // Nettoyage : on retire les écouteurs quand le composant disparaît
    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup',   onMouseUp)
    }
  }, [])

  // Couleurs selon le mode
  const cursorColor = isLight
    ? 'bg-gradient-to-br from-[#6B1A2A] to-[#8B2A3E] shadow-[0_0_10px_rgba(107,26,42,0.6)]'
    : 'bg-gradient-to-br from-[#c9a84c] to-[#f5d98b] shadow-[0_0_10px_rgba(201,168,76,0.7)]'

  const trailColor = isLight
    ? 'border-[rgba(107,26,42,0.4)]'
    : 'border-[rgba(201,168,76,0.5)]'

  return (
    <>
      {/* Losange principal */}
      <div
        ref={cursorRef}
        className={`fixed w-3.5 h-3.5 pointer-events-none z-[9999]
          rotate-45 -translate-x-1/2 -translate-y-1/2
          transition-[background,box-shadow] duration-300
          ${cursorColor}`}
      />

      {/* Carré pointillé qui suit avec délai */}
      <div
        ref={trailRef}
        className={`fixed w-8 h-8 pointer-events-none z-[9998]
          rotate-45 -translate-x-1/2 -translate-y-1/2
          border transition-[border-color] duration-300
          ${trailColor}`}
      />
    </>
  )
}

export default Cursor