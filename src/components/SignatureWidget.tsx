import { useEffect, useRef } from 'react'

/**
 * Signature micro-interaction: brake disc with orbiting gear, bolt,
 * approval stamp (GIBDD) and a welding spark. Vanilla CSS animation +
 * rAF-lerped pointer parallax / scroll drift. No external assets.
 */
export function SignatureWidget() {
  const parallaxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = parallaxRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const finePointer = window.matchMedia('(pointer: fine)')
    const hero = el.closest('.hero')
    if (!hero) return

    let targetX = 0
    let targetY = 0
    let scrollDrift = 0
    let x = 0
    let y = 0
    let s = 0
    let raf = 0
    let running = false
    let visible = true

    const tick = () => {
      x += (targetX - x) * 0.075
      y += (targetY - y) * 0.075
      s += (scrollDrift - s) * 0.12
      el.style.transform = `translate3d(${x.toFixed(2)}px, ${(y + s).toFixed(2)}px, 0)`
      const settled =
        Math.abs(targetX - x) < 0.05 &&
        Math.abs(targetY - y) < 0.05 &&
        Math.abs(scrollDrift - s) < 0.05
      if (settled) {
        running = false
        return
      }
      raf = requestAnimationFrame(tick)
    }

    const wake = () => {
      if (!running && visible) {
        running = true
        raf = requestAnimationFrame(tick)
      }
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!finePointer.matches) return
      const r = hero.getBoundingClientRect()
      if (r.bottom < 0 || r.top > window.innerHeight) return
      const dx = (e.clientX - (r.left + r.width * 0.74)) / r.width
      const dy = (e.clientY - (r.top + r.height * 0.5)) / r.height
      targetX = Math.max(-1, Math.min(1, dx)) * -26
      targetY = Math.max(-1, Math.min(1, dy)) * -18
      wake()
    }

    const onScroll = () => {
      scrollDrift = Math.max(-56, Math.min(0, window.scrollY * -0.055))
      wake()
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible) wake()
      },
      { threshold: 0 }
    )
    io.observe(hero)

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      io.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  const holes = Array.from({ length: 8 }, (_, i) => {
    const a = (i * Math.PI) / 4 + Math.PI / 8
    return [120 + 31 * Math.cos(a), 120 + 31 * Math.sin(a)] as const
  })
  const lugs = Array.from({ length: 5 }, (_, i) => {
    const a = (i * 2 * Math.PI) / 5 - Math.PI / 2
    return [120 + 8 * Math.cos(a), 120 + 8 * Math.sin(a)] as const
  })
  const teeth = Array.from({ length: 8 }, (_, i) => i * 45)
  const hex = Array.from({ length: 6 }, (_, i) => {
    const a = (i * Math.PI) / 3 - Math.PI / 6
    return `${(8.5 * Math.cos(a)).toFixed(2)},${(8.5 * Math.sin(a)).toFixed(2)}`
  }).join(' ')

  return (
    <div className="signature-widget" aria-hidden="true">
      <div className="sig-parallax" ref={parallaxRef}>
        <div className="sig-float">
          <svg
            viewBox="0 0 240 240"
            width="232"
            height="232"
            role="presentation"
            focusable="false"
          >
            {/* orbit guide */}
            <circle
              cx="120"
              cy="120"
              r="86"
              fill="none"
              className="sig-orbit"
            />

            {/* central: drilled brake disc */}
            <g className="sig-disc">
              <circle cx="120" cy="120" r="52" className="sig-disc-body" />
              <circle cx="120" cy="120" r="44" className="sig-disc-ring" />
              {holes.map(([hx, hy], i) => (
                <circle key={i} cx={hx} cy={hy} r="3.1" className="sig-hole" />
              ))}
              <circle cx="120" cy="120" r="15" className="sig-hub" />
              {lugs.map(([lx, ly], i) => (
                <circle key={i} cx={lx} cy={ly} r="2.3" className="sig-lug" />
              ))}
            </g>

            {/* gear, top-right */}
            <g transform="translate(186 64)">
              <g className="sig-gear">
                {teeth.map((deg) => (
                  <rect
                    key={deg}
                    x="-1.9"
                    y="-13.2"
                    width="3.8"
                    height="5"
                    className="sig-gear-tooth"
                    transform={`rotate(${deg})`}
                  />
                ))}
                <circle r="9.4" className="sig-gear-body" />
                <circle r="3.4" className="sig-gear-bore" />
              </g>
            </g>

            {/* hex bolt, bottom-right */}
            <g transform="translate(169 190)">
              <g className="sig-bolt">
                <polygon points={hex} className="sig-bolt-head" />
                <circle r="2.7" className="sig-bolt-bore" />
              </g>
            </g>

            {/* approval stamp (GIBDD), bottom-left */}
            <g transform="translate(65 186)">
              <g className="sig-stamp">
                <circle r="11.5" className="sig-stamp-body" />
                <path
                  d="M -4.6 0.2 L -1.2 3.7 L 5.2 -3.6"
                  className="sig-stamp-check"
                />
              </g>
            </g>

            {/* welding spark, top-left */}
            <g transform="translate(54 65)">
              <path
                className="sig-spark"
                d="M 0 -7.5 C 1.1 -2.4 2.4 -1.1 7.5 0 C 2.4 1.1 1.1 2.4 0 7.5 C -1.1 2.4 -2.4 1.1 -7.5 0 C -2.4 -1.1 -1.1 -2.4 0 -7.5 Z"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  )
}
