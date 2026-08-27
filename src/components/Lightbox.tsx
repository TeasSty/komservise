import { useEffect, useId } from 'react'

type Props = {
  src: string
  alt: string
  onClose: () => void
}

/** Accessible fullscreen image viewer — Escape / backdrop / close button */
export function Lightbox({ src, alt, onClose }: Props) {
  const titleId = useId()

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
    >
      <button type="button" className="lightbox-close" aria-label="Закрыть" onClick={onClose}>
        ×
      </button>
      <p id={titleId} className="visually-hidden">
        {alt || 'Просмотр фото'}
      </p>
      <img
        className="lightbox-img"
        src={src}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  )
}

export function imageUrl(name: string, width = 960) {
  const base = import.meta.env.BASE_URL
  return `${base}images/${name}-${width}.jpg`
}
