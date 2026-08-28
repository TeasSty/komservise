import { prices } from '../data/business'
import { useReveal } from '../hooks/useReveal'

export function Prices() {
  const ref = useReveal<HTMLElement>()

  return (
    <section className="section section-air" id="prices" ref={ref}>
      <div className="wrap">
        <div className="section-head reveal">
          <p className="eyebrow">Прайс</p>
          <h2>Частые работы</h2>
          <p>Точную сумму скажем после осмотра — зависит от авто и объёма.</p>
        </div>

        <div className="price-list">
          {prices.map((item, i) => (
            <div
              className="price-row reveal"
              key={item.name}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <span className="price-index mono" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="price-service">
                <h3>{item.name}</h3>
                {item.note ? <p className="price-row-note">{item.note}</p> : null}
              </div>
              <p className="amount">{item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
