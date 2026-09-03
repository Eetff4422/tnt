import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { ACTUALITES, formatDateArticle } from '../data/actualites.js'
import Card from '../components/ui/Card.jsx'
import SectionTitle from '../components/ui/SectionTitle.jsx'

export default function Actualites() {
  return (
    <div>
      <section className="bg-gradient-to-b from-primary-900 to-primary-800 py-16 text-white dark:from-slate-950 dark:to-primary-900 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary-200">Actualités</p>
          <h1 className="mt-3 max-w-2xl text-3xl font-extrabold sm:text-4xl">
            Conseils, réglementation et actualités du centre
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle title="Dernières publications" />
        <div className="grid gap-6 sm:grid-cols-2">
          {ACTUALITES.map((article) => (
            <Link key={article.slug} to={`/actualites/${article.slug}`} className="group">
              <Card className="h-full p-6 transition-colors group-hover:border-primary-300">
                <span className="text-xs font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-300">
                  {article.categorie}
                </span>
                <h2 className="mt-2 text-lg font-bold text-slate-900 group-hover:text-primary-700 dark:text-white dark:group-hover:text-primary-300">
                  {article.titre}
                </h2>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{article.extrait}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
                  <span>{formatDateArticle(article.date)}</span>
                  <span className="flex items-center gap-1 font-medium text-primary-700 dark:text-primary-300">
                    Lire l'article <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
