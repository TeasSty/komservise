import { facadeServices } from '../data/business'

/** Service directions ticker under hero HUD */
export function FacadeStrip() {
  return (
    <section className="facade-strip" aria-label="Направления работ">
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...facadeServices, ...facadeServices].map((s, i) => (
            <span key={`${s}-${i}`} className="marquee-item mono">
              {s}
              <span className="marquee-sep">/</span>
            </span>
          ))}
        </div>
      </div>
      <ul className="visually-hidden">
        {facadeServices.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    </section>
  )
}
