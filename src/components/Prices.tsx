import { prices } from '../data/business'
import { ResponsiveImage } from './Picture'
import { useReveal } from '../hooks/useReveal'

export function Prices() {
  const ref = useReveal<HTMLElement>()

  return (
    <section className="section section-ink" id="prices" ref={ref}>
      <div className="wrap">
        <div className="section-head reveal">
          <p className="eyebrow mono">02 / Прайс</p>
          <h2>Частые работы</h2>
          <p>
            Точную сумму скажем после осмотра — зависит от авто и объёма.
          </p>
        </div>

        <div className="price-list">
          {prices.map((item, i) => (
            <article
              className="price-row reveal"
              key={item.name}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <ResponsiveImage
                name={item.image}
                alt=""
                widths={[400, 800]}
                sizes="88px"
              />
              <div>
                <h3>{item.name}</h3>
                {item.note ? <p className="price-row-note">{item.note}</p> : null}
              </div>
              <p className="amount">{item.price}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
