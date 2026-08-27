import { useState } from 'react'
import { gallery } from '../data/business'
import { ResponsiveImage } from './Picture'
import { Lightbox } from './Lightbox'
import { useReveal } from '../hooks/useReveal'

export function Gallery() {
  const ref = useReveal<HTMLElement>()
  const [lightbox, setLightbox] = useState<{
    name: string
    alt: string
    width: number
  } | null>(null)

  return (
    <section className="section section-gallery" id="gallery" ref={ref}>
      <div className="wrap">
        <div className="section-head reveal">
          <p className="eyebrow mono">04 / Галерея</p>
          <h2>Как выглядит сервис</h2>
          <p>Кадры с работ: бокс, подъёмники, моторный отсек. Нажмите — открыть.</p>
        </div>

        <div className="gallery-grid">
          {gallery.map((item, index) => (
            <figure
              className="gallery-item reveal"
              key={item.id}
              style={{ transitionDelay: `${Math.min(index, 5) * 40}ms` }}
            >
              <button
                type="button"
                className="gallery-open"
                onClick={() =>
                  setLightbox({
                    name: item.id,
                    alt: item.alt,
                    width: 960,
                  })
                }
                aria-label={`Открыть фото: ${item.caption}`}
              >
                <ResponsiveImage
                  name={item.id}
                  alt={item.alt}
                  widths={
                    item.id === 'engine-work'
                      ? [480, 960, 1440]
                      : [480, 960]
                  }
                  sizes="(min-width: 900px) 33vw, (min-width: 600px) 50vw, 100vw"
                />
              </button>
              <figcaption>{item.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>

      {lightbox ? (
        <Lightbox
          name={lightbox.name}
          alt={lightbox.alt}
          width={lightbox.width}
          onClose={() => setLightbox(null)}
        />
      ) : null}
    </section>
  )
}
