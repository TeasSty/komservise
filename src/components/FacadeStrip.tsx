import { business, facadeServices } from '../data/business'

/** Rating + service directions — clean ink strip under hero */
export function FacadeStrip() {
  return (
    <section className="facade-strip" aria-label="Рейтинг и направления работ">
      <div className="wrap facade-strip-inner">
        <p className="facade-rating">
          <strong>{business.rating.value}</strong>
          <span>
            {business.rating.source} · {business.rating.ratingsCount} оценки
          </span>
        </p>
        <ul className="facade-list">
          {facadeServices.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
