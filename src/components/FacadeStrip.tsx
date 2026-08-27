import { facadeServices } from '../data/business'

/** Enough copies so one group stays wider than typical viewports */
const LOOP = [
  ...facadeServices,
  ...facadeServices,
  ...facadeServices,
  ...facadeServices,
]

function MarqueeGroup() {
  return (
    <div className="marquee-group">
      {LOOP.map((s, i) => (
        <span key={`${s}-${i}`} className="marquee-item mono">
          {s}
          <span className="marquee-sep">/</span>
        </span>
      ))}
    </div>
  )
}

/** Service directions ticker under hero — seamless infinite loop */
export function FacadeStrip() {
  return (
    <section className="facade-strip" aria-label="Направления работ">
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          <MarqueeGroup />
          <MarqueeGroup />
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
