import { processSteps } from '../data/business'
import { useReveal } from '../hooks/useReveal'

export function Process() {
  const ref = useReveal<HTMLElement>()

  return (
    <section className="section section-air" id="process" ref={ref}>
      <div className="wrap">
        <div className="section-head reveal">
          <p className="eyebrow mono">04 / Как заехать</p>
          <h2>От звонка до чека</h2>
          <p>
            Короткая схема без «менеджер перезвонит через час». Удобно, если
            машина уже не едет или нужно попасть в окно Пн–Пт.
          </p>
        </div>

        <div className="process-track">
          {processSteps.map((step, i) => (
            <article
              className="process-step reveal"
              key={step.title}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <span className="n" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
