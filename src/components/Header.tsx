import { useEffect, useRef, useState } from 'react'
import { business } from '../data/business'

const links = [
  { href: '#works', label: 'Услуги' },
  { href: '#prices', label: 'Прайс' },
  { href: '#gallery', label: 'Галерея' },
  { href: '#reviews', label: 'Отзывы' },
  { href: '#contacts', label: 'Контакты' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const [overHero, setOverHero] = useState(true)
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const hero = document.getElementById('top')
    if (!hero) return

    const update = () => {
      const threshold = Math.max(0, hero.offsetHeight - 80)
      setOverHero(window.scrollY < threshold)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const close = () => setOpen(false)

  return (
    <header className={`site-header${overHero ? ' on-hero' : ''}${open ? ' nav-open' : ''}`}>
      <div className="wrap inner">
        <a className="brand" href="#top" onClick={close}>
          <span className="brand-name">{business.name}</span>
          <span className="brand-sub mono">AUTO · SARATOV</span>
        </a>

        <nav className="nav-pill" aria-label="Основная навигация">
          <ul className="nav-desktop">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <span className="header-status mono" aria-hidden="true">
            <span className="status-dot" />
            {business.hours.short}
          </span>
          <a className="btn btn-primary header-call btn-magnetic" href={`tel:${business.phoneTel}`}>
            Позвонить
          </a>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`nav-mobile${open ? ' open' : ''}`}
        ref={navRef}
        hidden={!open}
      >
        <ul>
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={close}>
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a href={`tel:${business.phoneTel}`} onClick={close}>
              {business.phoneDisplay}
            </a>
          </li>
          <li>
            <a href={business.links.vk} onClick={close} target="_blank" rel="noreferrer">
              VK
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
