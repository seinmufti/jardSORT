/** Compact flag marks for the language menu (inline SVG, from JardCAD). */

export function FlagUs({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 16"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="24" height="16" fill="#b22234" />
      <rect y="1.23" width="24" height="1.23" fill="#fff" />
      <rect y="3.69" width="24" height="1.23" fill="#fff" />
      <rect y="6.15" width="24" height="1.23" fill="#fff" />
      <rect y="8.62" width="24" height="1.23" fill="#fff" />
      <rect y="11.08" width="24" height="1.23" fill="#fff" />
      <rect y="13.54" width="24" height="1.23" fill="#fff" />
      <rect width="9.6" height="8.62" fill="#3c3b6e" />
    </svg>
  )
}

export function FlagKurdistan({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 16"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="24" height="5.33" y="0" fill="#ed2024" />
      <rect width="24" height="5.34" y="5.33" fill="#ffffff" />
      <rect width="24" height="5.33" y="10.67" fill="#278e43" />
      <circle cx="12" cy="8" r="2.35" fill="#febd11" />
      {Array.from({ length: 21 }, (_, i) => {
        const a = ((i * 360) / 21 - 90) * (Math.PI / 180)
        const x1 = 12 + Math.cos(a) * 2.55
        const y1 = 8 + Math.sin(a) * 2.55
        const x2 = 12 + Math.cos(a) * 3.55
        const y2 = 8 + Math.sin(a) * 3.55
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#febd11"
            strokeWidth="0.55"
            strokeLinecap="round"
          />
        )
      })}
    </svg>
  )
}

export function FlagIraq({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 16"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="24" height="5.33" y="0" fill="#ce1126" />
      <rect width="24" height="5.34" y="5.33" fill="#ffffff" />
      <rect width="24" height="5.33" y="10.67" fill="#000000" />
      <text
        x="12"
        y="9.15"
        textAnchor="middle"
        fill="#007a3d"
        fontSize="3.6"
        fontFamily="Segoe UI, Tahoma, Arial, sans-serif"
        fontWeight="700"
      >
        الله أكبر
      </text>
    </svg>
  )
}
