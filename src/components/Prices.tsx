import type { ReactNode } from 'react'
import { prices } from '../data/business'
import { useReveal } from '../hooks/useReveal'

const icons: Record<string, ReactNode> = {
  oil: (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <path
        d="M20 6c0 0-8 10-8 16a8 8 0 0016 0c0-6-8-16-8-16z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M17 24h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  diag: (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <rect
        x="7"
        y="10"
        width="26"
        height="16"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M12 18h6l2 4 4-8 2 4h4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  chassis: (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="12" cy="26" r="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="28" cy="26" r="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M7 20h6l3-6h10l3 6h4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  ),
  ac: (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <path
        d="M20 8v24M8 20h24M12 12l16 16M28 12L12 28"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ),
}

function iconKey(name: string) {
  if (name.includes('масл')) return 'oil'
  if (name.includes('диагност')) return 'diag'
  if (name.includes('ходов')) return 'chassis'
  return 'ac'
}

export function Prices() {
  const ref = useReveal<HTMLElement>()

  return (
    <section className="section section-ink" id="prices" ref={ref}>
      <div className="wrap">
        <div className="section-head reveal">
          <p className="eyebrow mono">02 / Прайс</p>
          <h2>Частые работы</h2>
          <p>Точную сумму скажем после осмотра — зависит от авто и объёма.</p>
        </div>

        <div className="price-cards">
          {prices.map((item, i) => (
            <article
              className="price-card reveal"
              key={item.name}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <div className="price-card-top">
                <div className="price-card-icon" aria-hidden="true">
                  {icons[iconKey(item.name)]}
                </div>
                <p className="amount">{item.price}</p>
              </div>
              <h3>{item.name}</h3>
              {item.note ? <p className="price-row-note">{item.note}</p> : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
