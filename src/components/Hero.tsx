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
      <div className="hero-grain" aria-hidden="true" />
      <div className="hero-scrim" aria-hidden="true" />

      <div className="wrap hero-content">
        <p className="hero-tag mono">
          [ {business.address.city.toUpperCase()} / АВТОТЕХЦЕНТ ]
        </p>

        <p className="hero-brand">{business.name}</p>

        <h1 id="hero-title">
          <span className="hero-line">Капремонт ДВС.</span>
          <span className="hero-line">Ремонт по согласованию.</span>
        </h1>

        <p className="hero-lead">
          Легковые и лёгкий коммерческий транспорт: двигатели, КПП, ходовая,
          электрика. Без дилерского лоска — с конкретным ремонтом.
        </p>

        <div className="hero-cta">
          <a className="btn btn-primary btn-magnetic" href={`tel:${business.phoneTel}`}>
            Позвонить
          </a>
          <a
            className="btn btn-ghost btn-magnetic"
            href={business.links.vk}
            target="_blank"
            rel="noreferrer"
          >
            Написать в VK
          </a>
        </div>
      </div>

      <div className="hero-hud" aria-label="Ключевые факты">
        <div className="wrap hero-hud-inner">
          <div className="hud-item">
            <span className="hud-label mono">Рейтинг</span>
            <span className="hud-value">
              <span className="hud-accent">{business.rating.value}</span>
              <span className="hud-sub">
                {business.rating.source} · {business.rating.ratingsCount} оценки
              </span>
            </span>
          </div>
          <div className="hud-item">
            <span className="hud-label mono">Адрес</span>
            <span className="hud-value">{business.address.street}</span>
          </div>
          <div className="hud-item">
            <span className="hud-label mono">Режим</span>
            <span className="hud-value">{business.hours.short}</span>
          </div>
          <a className="hud-cta btn btn-primary" href={`tel:${business.phoneTel}`}>
            {business.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  )
}
