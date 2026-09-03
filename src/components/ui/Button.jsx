const VARIANTS = {
  primary: 'bg-primary-700 text-white hover:bg-primary-800 shadow-sm dark:bg-primary-600 dark:hover:bg-primary-500',
  secondary:
    'bg-white text-primary-700 border border-primary-200 hover:bg-primary-50 shadow-sm dark:bg-slate-900 dark:text-primary-200 dark:border-slate-700 dark:hover:bg-slate-800',
  ghost: 'text-primary-700 hover:bg-primary-50 dark:text-primary-200 dark:hover:bg-slate-800',
  light: 'bg-white text-primary-800 hover:bg-primary-50 shadow-sm',
  outline: 'border border-white/40 text-white hover:bg-white/10',
}

export default function Button({
  children,
  variant = 'primary',
  icon: Icon,
  className = '',
  as: Component = 'button',
  ...props
}) {
  return (
    <Component
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </Component>
  )
}
