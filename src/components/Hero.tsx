import { business } from '../data/business'

const base = import.meta.env.BASE_URL

function srcSet(name: string, widths: number[], ext: string) {
  return widths.map((w) => `${base}images/${name}-${w}.${ext} ${w}w`).join(', ')
}

export function Hero() {
  const desktop = [768, 1280, 1920]
  const mobile = [480, 768]

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="wrap hero-layout">
        <div className="hero-content">
          <p className="hero-brand">{business.name} · автосервис в Саратове</p>
          <h1 id="hero-title">Капремонт ДВС. Ремонт&nbsp;без сюрпризов.</h1>
          <p className="hero-lead">
            Диагностируем, согласовываем объём и стоимость, затем ремонтируем
            легковые и лёгкий коммерческий транспорт.
          </p>

          <div className="hero-cta">
            <a className="btn btn-primary" href={`tel:${business.phoneTel}`}>
              Позвонить {business.phoneDisplay}
            </a>
            <a
              className="hero-vk-link"
              href={business.links.vk}
              target="_blank"
              rel="noreferrer"
            >
              Написать в VK <span aria-hidden="true">↗</span>
            </a>
          </div>

          <dl className="hero-meta">
            <div>
              <dt>Рейтинг</dt>
              <dd>{business.rating.value} · {business.rating.source}</dd>
            </div>
            <div>
              <dt>Адрес</dt>
              <dd>{business.address.full}</dd>
            </div>
            <div>
              <dt>Часы работы</dt>
              <dd>{business.hours.short}</dd>
            </div>
          </dl>
        </div>

        <div className="hero-media">
          <picture>
            <source
              media="(max-width: 640px)"
              type="image/avif"
              srcSet={srcSet('hero-mobile', mobile, 'avif')}
              sizes="100vw"
            />
            <source
              media="(max-width: 640px)"
              type="image/webp"
              srcSet={srcSet('hero-mobile', mobile, 'webp')}
              sizes="100vw"
            />
            <source
              media="(max-width: 640px)"
              type="image/jpeg"
              srcSet={srcSet('hero-mobile', mobile, 'jpg')}
              sizes="100vw"
            />
            <source
              type="image/avif"
              srcSet={srcSet('hero', desktop, 'avif')}
              sizes="(min-width: 900px) 52vw, 100vw"
            />
            <source
              type="image/webp"
              srcSet={srcSet('hero', desktop, 'webp')}
              sizes="(min-width: 900px) 52vw, 100vw"
            />
            <img
              src={`${base}images/hero-1920.jpg`}
              srcSet={srcSet('hero', desktop, 'jpg')}
              sizes="(min-width: 900px) 52vw, 100vw"
              alt="Механик Комсервис ремонтирует тормозной узел автомобиля"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </picture>
        </div>
      </div>
    </section>
  )
}
