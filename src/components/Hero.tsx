import { useEffect, useRef } from 'react'
import { business } from '../data/business'
import { ResponsiveImage } from './Picture'

export function Hero() {
  const stageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return

    const onMove = (e: MouseEvent) => {
      const r = stage.getBoundingClientRect()
      const x = ((e.clientX - r.left) / r.width) * 100
      const y = ((e.clientY - r.top) / r.height) * 100
      stage.style.setProperty('--hx', `${x}%`)
      stage.style.setProperty('--hy', `${y}%`)
    }

    stage.addEventListener('mousemove', onMove)
    return () => stage.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-stage" ref={stageRef}>
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

        {/* Cinematic ignition — soft beams from headlight area */}
        <div className="hero-lights" aria-hidden="true">
          <span className="headlight-glow" />
          <span className="headlight-beam beam-a" />
          <span className="headlight-beam beam-b" />
          <span className="hero-sweep" />
          <span className="hero-inspect" />
        </div>

        <div className="hero-grain" aria-hidden="true" />
        <div className="hero-scrim" aria-hidden="true" />
      </div>

      <div className="wrap hero-content">
        <p className="hero-tag mono">
          [ {business.address.city.toUpperCase()} / АВТОТЕХЦЕНТР ]
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
