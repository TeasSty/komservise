import { business } from '../data/business'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="wrap inner">
        <div>
          <strong>{business.name}</strong>
          <p>{business.tagline}</p>
        </div>

        <div className="footer-links">
          <a href={`tel:${business.phoneTel}`}>{business.phoneDisplay}</a>
          <a href={business.links.vk} target="_blank" rel="noreferrer">
            VK
          </a>
          <a href={business.links.yandexMaps} target="_blank" rel="noreferrer">
            Яндекс Карты
          </a>
        </div>

        <p className="legal">
          {business.legalName}. ОГРНИП {business.ogrnip}. ИНН {business.inn}.
          <br />
          © {year} {business.name}.
        </p>
      </div>
    </footer>
  )
}
