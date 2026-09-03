export default function Badge({ children, className = '', icon: Icon, dotClassName }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${className}`}>
      {dotClassName && <span className={`h-1.5 w-1.5 rounded-full ${dotClassName}`} />}
      {Icon && <Icon className="h-3.5 w-3.5" />}
      {children}
    </span>
  )
}
