interface QuickPromptsProps {
  prompts: string[]
  onSelect: (prompt: string) => void
  disabled?: boolean
}

export function QuickPrompts({ prompts, onSelect, disabled }: QuickPromptsProps) {
  if (!prompts || prompts.length === 0) return null

  return (
    <div className="flex flex-wrap gap-1.5 py-1">
      {prompts.map((p, i) => (
        <button
          key={i}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(p)}
          className="border border-champagne/45 bg-ivory-deep/80 px-2.5 py-1 text-[0.6875rem] font-medium text-obsidian transition-all duration-200 hover:border-bronze hover:bg-white hover:text-bronze disabled:opacity-50"
        >
          {p}
        </button>
      ))}
    </div>
  )
}
