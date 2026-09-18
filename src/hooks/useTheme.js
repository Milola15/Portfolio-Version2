// useTheme.js — un "hook" personnalisé pour gérer le mode jour/nuit
// Un hook = une fonction réutilisable qui contient de la logique React

import { useState, useEffect } from 'react'

export function useTheme() {

  // useState stocke l'état actuel du thème
  // false = nuit (par défaut), true = jour
  const [isLight, setIsLight] = useState(false)

  // useEffect s'exécute quand isLight change
  // Il ajoute/retire la classe "light" sur <html>
  // pour qu'on puisse changer les couleurs depuis Tailwind
  useEffect(() => {
    if (isLight) {
      document.documentElement.classList.add('light')
    } else {
      document.documentElement.classList.remove('light')
    }
  }, [isLight])

  // La fonction qui bascule entre jour et nuit
  function toggleTheme() {
    setIsLight(prev => !prev)
  }

  // On retourne ce dont les composants ont besoin
  return { isLight, toggleTheme }
}