import useInView from '../../hooks/useInView.js'

// Enveloppe un bloc pour le faire apparaître en douceur lorsqu'il entre dans le viewport.
export default function Reveal({ children, delay = 0, className = '' }) {
  const [ref, visible] = useInView()

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  )
}
