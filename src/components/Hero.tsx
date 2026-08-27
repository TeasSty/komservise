import { business } from '../data/business'
import { ResponsiveImage } from './Picture'

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-media" aria-hidden="true">
        <ResponsiveImage
          name="hero"
          alt=""
          widths={[768, 1280, 1920]}
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
        />
      </div>
      <div className="hero-scrim" aria-hidden="true" />

      <div className="wrap hero-content">
        <p className="hero-brand">{business.name}</p>
        <h1 id="hero-title">Капремонт ДВС и ремонт по согласованию</h1>
        <p className="hero-lead">
          Легковые и лёгкий коммерческий транспорт: двигатели, КПП, ходовая,
          электрика. Без дилерского лоска — с конкретным ремонтом в Саратове.
        </p>

        <div className="hero-cta">
          <a className="btn btn-primary" href={`tel:${business.phoneTel}`}>
            Позвонить
          </a>
          <a
            className="btn btn-ghost"
            href={business.links.vk}
            target="_blank"
            rel="noreferrer"
          >
            Написать в VK
          </a>
        </div>

        <p className="hero-meta">
          <span>{business.address.full}</span>
          <span aria-hidden="true">·</span>
          <span>{business.hours.short}</span>
          <span aria-hidden="true">·</span>
          <span>
            {business.rating.value} · {business.rating.source}
          </span>
        </p>
      </div>
    </section>
  )
}
