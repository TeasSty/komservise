import { workAreas } from '../data/business'
import { useReveal } from '../hooks/useReveal'

export function WorkAreas() {
  const ref = useReveal<HTMLElement>()

  return (
    <section className="section section-dense" id="works" ref={ref}>
      <div className="wrap">
        <div className="section-head reveal">
          <p className="eyebrow">Услуги</p>
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
              style={{ transitionDelay: `${Math.min(i, 5) * 55}ms` }}
            >
              <h3>{area.title}</h3>
              <p>{area.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
