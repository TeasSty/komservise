import { workAreas } from '../data/business'
import { useReveal } from '../hooks/useReveal'
import { useSpotlight } from '../hooks/useSpotlight'

export function WorkAreas() {
  const ref = useReveal<HTMLElement>()
  const { onMove } = useSpotlight()

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

        <div className="bento-grid">
          {workAreas.map((area, i) => (
            <article
              className={`bento-card reveal${i === 0 ? ' bento-wide' : ''}`}
              key={area.id}
              style={{ transitionDelay: `${Math.min(i, 5) * 55}ms` }}
              onMouseMove={onMove}
            >
              <span className="bento-index mono">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3>{area.title}</h3>
              <p>{area.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
