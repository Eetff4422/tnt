import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

// Nom du dépôt GitHub : le site est publié sur https://<utilisateur>.github.io/tnt/
const CHEMIN_PAGES = '/tnt/'

// GitHub Pages ne connaît pas les routes gérées côté client : pour toute adresse
// sans fichier correspondant (/services, /actualites/...), il sert 404.html en
// conservant l'URL. En y plaçant une copie d'index.html, l'application démarre
// normalement et le routeur prend le relais.
function replierVers404() {
  let dossierSortie = 'dist'

  return {
    name: 'repli-spa-404',
    apply: 'build',
    configResolved(config) {
      dossierSortie = config.build.outDir
    },
    closeBundle() {
      const source = resolve(process.cwd(), dossierSortie, 'index.html')
      const cible = resolve(process.cwd(), dossierSortie, '404.html')
      if (existsSync(source)) copyFileSync(source, cible)
    },
  }
}

export default defineConfig(({ command }) => ({
  // En développement on reste à la racine ; le sous-chemin ne concerne que la production.
  base: command === 'build' ? CHEMIN_PAGES : '/',
  plugins: [react(), replierVers404()],
}))
