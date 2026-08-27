import { useState } from 'react'
import { workAreas } from '../data/business'
import { ResponsiveImage } from './Picture'
import { Lightbox, imageUrl } from './Lightbox'
import { useReveal } from '../hooks/useReveal'
import { useSpotlight } from '../hooks/useSpotlight'

export function WorkAreas() {
  const ref = useReveal<HTMLElement>()
  const { onMove } = useSpotlight()
  const [lightbox, setLightbox] = useState<{ name: string; alt: string } | null>(
    null,
  )

  return (
    <section className="section section-dense" id="works" ref={ref}>
      <div className="wrap">
        <div className="section-head reveal">
          <p className="eyebrow mono">01 / Услуги</p>
          <h2>Что ремонтируем</h2>
          <p>
            ТО и ремонт легковых и лёгкого коммерческого. ДВС, ходовая,
            электрика — плюс проекты под автоспорт.
          </p>
        </div>

        <div className="work-grid">
          {workAreas.map((area, i) => (
            <article
              className="work-card reveal"
              key={area.id}
              style={{ transitionDelay: `${Math.min(i, 5) * 45}ms` }}
              onMouseMove={onMove}
            >
              <button
                type="button"
                className="work-card-media"
                onClick={() =>
                  setLightbox({ name: area.image, alt: area.imageAlt })
                }
                aria-label={`Открыть фото: ${area.title}`}
              >
                <ResponsiveImage
                  name={area.image}
                  alt=""
                  widths={
                    area.image.startsWith('service-')
                      ? [400, 800]
                      : area.image === 'engine-work'
                        ? [480, 960, 1440]
                        : [480, 960]
                  }
                  sizes="(min-width: 1000px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              </button>
              <div className="work-card-body">
                <span className="work-index mono">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3>{area.title}</h3>
                <p>{area.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {lightbox ? (
        <Lightbox
          src={imageUrl(
            lightbox.name,
            lightbox.name.startsWith('service-')
              ? 800
              : lightbox.name === 'engine-work'
                ? 1440
                : 960,
          )}
          alt={lightbox.alt}
          onClose={() => setLightbox(null)}
        />
      ) : null}
    </section>
  )
}
