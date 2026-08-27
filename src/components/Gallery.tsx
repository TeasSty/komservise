import { useState } from 'react'
import { gallery } from '../data/business'
import { ResponsiveImage } from './Picture'
import { Lightbox, imageUrl } from './Lightbox'
import { useReveal } from '../hooks/useReveal'

export function Gallery() {
  const ref = useReveal<HTMLElement>()
  const [lightbox, setLightbox] = useState<{
    name: string
    alt: string
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
                  setLightbox({ name: item.id, alt: item.alt })
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
          src={imageUrl(
            lightbox.name,
            lightbox.name === 'engine-work' ? 1440 : 960,
          )}
          alt={lightbox.alt}
          onClose={() => setLightbox(null)}
        />
      ) : null}
    </section>
  )
}
