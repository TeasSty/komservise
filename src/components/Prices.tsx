import { useState } from 'react'
import { prices } from '../data/business'
import { ResponsiveImage } from './Picture'
import { Lightbox, imageUrl } from './Lightbox'
import { useReveal } from '../hooks/useReveal'

export function Prices() {
  const ref = useReveal<HTMLElement>()
  const [lightbox, setLightbox] = useState<{ name: string; alt: string } | null>(
    null,
  )

  return (
    <section className="section section-ink" id="prices" ref={ref}>
      <div className="wrap">
        <div className="section-head reveal">
          <p className="eyebrow mono">02 / Прайс</p>
          <h2>Частые работы</h2>
          <p>Точную сумму скажем после осмотра — зависит от авто и объёма.</p>
        </div>

        <div className="price-list">
          {prices.map((item, i) => (
            <article
              className="price-row reveal"
              key={item.name}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <button
                type="button"
                className="price-thumb"
                onClick={() =>
                  setLightbox({ name: item.image, alt: item.name })
                }
                aria-label={`Открыть фото: ${item.name}`}
              >
                <ResponsiveImage
                  name={item.image}
                  alt=""
                  widths={[400, 800]}
                  sizes="96px"
                />
              </button>
              <div className="price-info">
                <h3>{item.name}</h3>
                {item.note ? <p className="price-row-note">{item.note}</p> : null}
              </div>
              <p className="amount">{item.price}</p>
            </article>
          ))}
        </div>
      </div>

      {lightbox ? (
        <Lightbox
          src={imageUrl(lightbox.name, 800)}
          alt={lightbox.alt}
          onClose={() => setLightbox(null)}
        />
      ) : null}
    </section>
  )
}
