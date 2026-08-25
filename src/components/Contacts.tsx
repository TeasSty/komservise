import { business } from '../data/business'

const mapSrc = `https://yandex.ru/map-widget/v1/?ll=${business.address.lng}%2C${business.address.lat}&z=16&pt=${business.address.lng}%2C${business.address.lat}%2Cpm2rdm`

export function Contacts() {
  return (
    <section className="section contacts" id="contacts">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">Контакты</p>
          <h2>Приезжайте на Октябрьскую, 60</h2>
          <p>
            Волжский район, 1 этаж. Ближайшие остановки — Вознесенская и
            Весёлая. Есть парковка.
          </p>
        </div>

        <div className="contacts-layout">
          <div className="contact-card">
            <div className="contact-row">
              <span className="label">Телефон</span>
              <a href={`tel:${business.phoneTel}`}>{business.phoneDisplay}</a>
            </div>
            <div className="contact-row">
              <span className="label">Адрес</span>
              <span className="value">{business.address.full}</span>
            </div>
            <div className="contact-row">
              <span className="label">Режим</span>
              <span className="value">
                {business.hours.weekdays}
                <br />
                {business.hours.weekend}
              </span>
            </div>
            <div className="contact-row">
              <span className="label">Соцсети</span>
              <span className="value">
                <a href={business.links.vk} target="_blank" rel="noreferrer">
                  VK
                </a>
              </span>
            </div>

            <div className="contact-actions">
              <a className="btn btn-primary" href={`tel:${business.phoneTel}`}>
                Позвонить
              </a>
              <a
                className="btn btn-ghost"
                href={business.links.yandexMaps}
                target="_blank"
                rel="noreferrer"
              >
                Открыть на карте
              </a>
              <a
                className="btn btn-ghost"
                href={business.links.twoGis}
                target="_blank"
                rel="noreferrer"
              >
                2ГИС
              </a>
            </div>
          </div>

          <iframe
            className="map-frame"
            title="Карта: Комсервис, Октябрьская, 60"
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  )
}
