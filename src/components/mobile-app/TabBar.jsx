export default function TabBar({ tabs, active, onChange }) {
  return (
    <div className="flex border-t border-slate-200 bg-white px-2 py-2">
      {tabs.map((tab) => {
        const Icon = tab.icon
        const isActive = tab.id === active
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex flex-1 flex-col items-center gap-1 rounded-xl py-1.5 text-[11px] font-medium transition-colors ${
              isActive ? 'text-primary-700' : 'text-slate-400'
            }`}
          >
            <span className={`flex h-8 w-8 items-center justify-center rounded-full ${isActive ? 'bg-primary-100' : ''}`}>
              <Icon className="h-4 w-4" />
            </span>
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
