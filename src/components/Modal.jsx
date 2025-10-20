import { useEffect } from 'react'

export default function Modal({ open, onOpenChange, title, children }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onOpenChange(false)
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onOpenChange])

  if (!open) return null

  return (
    <div
      id="confirmation"
      className="modal"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={() => onOpenChange(false)}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,.45)',
        display: 'grid',
        placeItems: 'center',
        zIndex: 50,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#fff',
          borderRadius: 12,
          padding: 16,
          minWidth: 280,
          boxShadow: '0 8px 30px rgba(0,0,0,.2)',
        }}
      >
        <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <strong>{title}</strong>
          <button onClick={() => onOpenChange(false)} aria-label="close">×</button>
        </header>
        <div>{children}</div>
      </div>
    </div>
  )
}
