import { business } from '../data/business'
import { SignatureWidget } from './SignatureWidget'

const base = import.meta.env.BASE_URL

function srcSet(name: string, widths: number[], ext: string) {
  return widths.map((w) => `${base}images/${name}-${w}.${ext} ${w}w`).join(', ')
}

export function Hero() {
  const desktop = [768, 1280, 1920]
  const mobile = [480, 768]

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-media" aria-hidden="true">
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
            sizes="100vw"
          />
          <source
            type="image/webp"
            srcSet={srcSet('hero', desktop, 'webp')}
            sizes="100vw"
          />
          <img
            src={`${base}images/hero-1920.jpg`}
            srcSet={srcSet('hero', desktop, 'jpg')}
            sizes="100vw"
            alt=""
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </picture>
      </div>
      <div className="hero-scrim" aria-hidden="true" />

      <SignatureWidget />

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
