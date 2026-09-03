import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { getActualiteBySlug, formatDateArticle } from '../data/actualites.js'
import Card from '../components/ui/Card.jsx'

export default function ActualiteDetail() {
  const { slug } = useParams()
  const article = getActualiteBySlug(slug)

  if (!article) return <Navigate to="/actualites" replace />

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <Link
        to="/actualites"
        className="flex items-center gap-1.5 text-sm font-medium text-primary-700 hover:text-primary-800 dark:text-primary-300"
      >
        <ArrowLeft className="h-4 w-4" /> Retour aux actualités
      </Link>

      <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-300">
        {article.categorie}
      </p>
      <h1 className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white">{article.titre}</h1>
      <p className="mt-2 text-sm text-slate-400 dark:text-slate-500">{formatDateArticle(article.date)}</p>

      <Card className="mt-8 space-y-4 p-6 sm:p-8">
        {article.contenu.map((paragraphe) => (
          <p key={paragraphe.slice(0, 40)} className="text-slate-700 dark:text-slate-300">
            {paragraphe}
          </p>
        ))}
      </Card>
    </article>
  )
}
