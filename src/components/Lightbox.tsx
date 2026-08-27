import { useEffect, useId } from 'react'

type Props = {
  name: string
  alt: string
  width?: number
  onClose: () => void
}

const base = import.meta.env.BASE_URL

/** Prefer AVIF → WebP → JPEG at a bounded width (default 960). */
export function lightboxSources(name: string, width = 960) {
  const stem = `${base}images/${name}-${width}`
  return {
    avif: `${stem}.avif`,
    webp: `${stem}.webp`,
    jpg: `${stem}.jpg`,
    width,
  }
}

/** Accessible fullscreen viewer — loads compressed AVIF/WebP first */
export function Lightbox({ name, alt, width = 960, onClose }: Props) {
  const titleId = useId()
  const src = lightboxSources(name, width)

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
      <picture className="lightbox-picture" onClick={(e) => e.stopPropagation()}>
        <source type="image/avif" srcSet={src.avif} />
        <source type="image/webp" srcSet={src.webp} />
        <img
          className="lightbox-img"
          src={src.jpg}
          alt={alt}
          width={src.width}
          decoding="async"
          fetchPriority="high"
        />
      </picture>
    </div>
  )
}

/** @deprecated use Lightbox name+width — kept for any remaining callers */
export function imageUrl(name: string, width = 960) {
  return lightboxSources(name, width).webp
}
