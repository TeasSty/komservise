import { gallery } from '../data/business'
import { ResponsiveImage } from './Picture'
import { useReveal } from '../hooks/useReveal'

export function Gallery() {
  const ref = useReveal<HTMLElement>()

  return (
    <section className="section section-gallery" id="gallery" ref={ref}>
      <div className="wrap">
        <div className="section-head reveal">
          <p className="eyebrow">Внутри</p>
          <h2>Как выглядит сервис изнутри</h2>
          <p>Подъёмники, сварка, моторный отсек — кадры с места работ.</p>
        </div>

        <div className="gallery-grid">
          {gallery.map((item, index) => (
            <figure
              className="gallery-item reveal"
              key={item.id}
              style={{ transitionDelay: `${Math.min(index, 5) * 45}ms` }}
            >
              <ResponsiveImage
                name={item.id}
                alt={item.alt}
                widths={[480, 960]}
                sizes="(min-width: 900px) 33vw, (min-width: 600px) 50vw, 100vw"
              />
              <figcaption>{item.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
