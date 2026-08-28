import {
  business,
  legalizationModifications,
  legalizationProblems,
  legalizationSteps,
} from '../data/business'
import { ResponsiveImage } from './Picture'
import { useReveal } from '../hooks/useReveal'

export function Legalization() {
  const ref = useReveal<HTMLElement>()

  return (
    <section className="section section-legalization" id="legalization" ref={ref}>
      <div className="wrap">
        <div className="section-head reveal">
          <p className="eyebrow mono">04 / Узаконивание</p>
          <h2>Регистрация изменений в ГИБДД</h2>
          <p>
            Сделали тюнинг, поставили ГБО или переоборудовали фургон — без
            документов это штрафы и риск снятия с учёта. Поможем пройти путь от
            лаборатории до ГИБДД под ключ.
          </p>
        </div>

        <div className="legalization-layout">
          <div className="legalization-media-column reveal">
            <div className="legalization-media">
              <ResponsiveImage
                name="offroad-uaz"
                alt="Лифтованный УАЗ с внедорожной подготовкой в цехе Комсервис"
                widths={[480, 960]}
                sizes="(min-width: 960px) 42vw, 100vw"
              />
            </div>
            <p className="legalization-caption">
              Оформление изменений — отдельное направление сервиса.
            </p>
          </div>

          <div className="legalization-body">
            <div className="legalization-block reveal">
              <h3 className="legalization-subhead">Что узаконяем</h3>
              <ul className="legalization-types">
                {legalizationModifications.map((item) => (
                  <li key={item.title} className="legalization-type">
                    <span className="legalization-type-mark" aria-hidden="true" />
                    <div>
                      <strong>{item.title}</strong>
                      <p>{item.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="legalization-block legalization-risks reveal">
              <h3 className="legalization-subhead">Зачем оформлять</h3>
              <ul className="legalization-problems">
                {legalizationProblems.map((item) => (
                  <li key={item.title} className="legalization-problem">
                    <strong>{item.title}</strong>
                    <p>{item.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="legalization-process reveal">
          <h3 className="legalization-subhead">Как проходит работа</h3>
          <div className="process-track legalization-steps">
            {legalizationSteps.map((step, i) => (
              <article className="process-step" key={step.title}>
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

        <div className="legalization-cta reveal">
          <p>
            Опишите авто и переделку — подскажем, что нужно для вашего случая.
            Стоимость зависит от объёма работ и типа изменений.
          </p>
          <div className="legalization-cta-actions">
            <a className="btn btn-primary" href={`tel:${business.phoneTel}`}>
              Позвонить
            </a>
            <a
              className="btn btn-dark"
              href={business.links.vk}
              target="_blank"
              rel="noreferrer"
            >
              Написать в VK
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
