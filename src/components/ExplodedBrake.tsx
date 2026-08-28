import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const assetBase = `${import.meta.env.BASE_URL}images/exploded-brake`

type BrakePart = 'disc' | 'caliper' | 'pad-left' | 'pad-right' | 'bolt'

function DiscFallback() {
  return (
    <svg viewBox="0 0 600 600" role="presentation">
      <defs>
        <radialGradient id="disc-metal" cx="42%" cy="36%">
          <stop offset="0" stopColor="#f3f5f7" />
          <stop offset=".55" stopColor="#aeb5bc" />
          <stop offset="1" stopColor="#626b74" />
        </radialGradient>
        <mask id="disc-cutout">
          <rect width="600" height="600" fill="white" />
          <circle cx="300" cy="300" r="76" fill="black" />
        </mask>
      </defs>
      <circle cx="300" cy="300" r="214" fill="url(#disc-metal)" mask="url(#disc-cutout)" />
      <circle cx="300" cy="300" r="165" fill="none" stroke="#717a83" strokeWidth="3" opacity=".75" />
      <circle cx="300" cy="300" r="112" fill="#89929a" stroke="#d7dadd" strokeWidth="4" />
      <circle cx="300" cy="300" r="48" fill="#272d33" />
      {[0, 72, 144, 216, 288].map((angle) => (
        <circle
          key={angle}
          cx={300 + Math.cos((angle * Math.PI) / 180) * 77}
          cy={300 + Math.sin((angle * Math.PI) / 180) * 77}
          r="12"
          fill="#30363c"
        />
      ))}
    </svg>
  )
}

function CaliperFallback() {
  return (
    <svg viewBox="0 0 600 600" role="presentation">
      <defs>
        <linearGradient id="caliper-blue" x1="0" x2="1" y1="0" y2="1">
          <stop stopColor="#4f86d7" />
          <stop offset=".55" stopColor="#1f5fbf" />
          <stop offset="1" stopColor="#123d7c" />
        </linearGradient>
      </defs>
      <path
        d="M167 168c37-62 112-91 190-71 78 20 126 78 132 148l-63 20c-19-59-57-86-110-91-51-5-91 17-117 65l-63-9c3-22 13-43 31-62Z"
        fill="url(#caliper-blue)"
        stroke="#8eb6ff"
        strokeWidth="6"
      />
      <path d="M143 226c32-16 68-9 89 15l-30 161c-7 35-40 57-75 50l-19-4 35-222Z" fill="#174b98" />
      <path d="M419 247l65-20 14 104-63 13Z" fill="#153d79" />
      <circle cx="172" cy="293" r="22" fill="#0e2e5e" stroke="#8eb6ff" strokeWidth="5" />
    </svg>
  )
}

function PadFallback({ side }: { side: 'left' | 'right' }) {
  const transform = side === 'right' ? 'translate(600 0) scale(-1 1)' : undefined
  return (
    <svg viewBox="0 0 600 600" role="presentation">
      <g transform={transform}>
        <path
          d="M205 185c42-25 82-35 123-30l18 48-17 237-36 19c-44-12-78-41-103-86l15-188Z"
          fill="#30363c"
          stroke="#858d94"
          strokeWidth="6"
        />
        <path d="M226 207c31-17 59-24 85-21l-14 225-27 12c-24-14-43-34-56-61Z" fill="#b85a1d" />
      </g>
    </svg>
  )
}

function BoltFallback() {
  return (
    <svg viewBox="0 0 600 600" role="presentation">
      <defs>
        <linearGradient id="bolt-metal" x1="0" x2="1">
          <stop stopColor="#626a72" />
          <stop offset=".5" stopColor="#e0e3e5" />
          <stop offset="1" stopColor="#737b83" />
        </linearGradient>
      </defs>
      <g transform="rotate(-18 300 300)">
        <rect x="280" y="195" width="40" height="225" rx="12" fill="url(#bolt-metal)" />
        <path d="M266 173 300 151l34 22v44l-34 22-34-22Z" fill="#aeb4ba" stroke="#e4e6e8" strokeWidth="5" />
        <path d="m284 177 16-10 16 10v20l-16 10-16-10Z" fill="#4e565e" />
      </g>
    </svg>
  )
}

const fallbacks: Record<BrakePart, ReactNode> = {
  disc: <DiscFallback />,
  caliper: <CaliperFallback />,
  'pad-left': <PadFallback side="left" />,
  'pad-right': <PadFallback side="right" />,
  bolt: <BoltFallback />,
}

function PartLayer({ part }: { part: BrakePart }) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  return (
    <div className={`brake-part brake-${part}`} data-brake-part={part}>
      {!loaded && <span className="brake-part-fallback">{fallbacks[part]}</span>}
      {!failed && (
        <img
          src={`${assetBase}/${part}.png`}
          alt=""
          draggable={false}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  )
}

export function ExplodedBrake() {
  const rootRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    const hero = root?.closest('.hero')
    if (!root || !hero) return

    const context = gsap.context(() => {
      const media = gsap.matchMedia()

      media.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })

        timeline
          .to('[data-brake-part="caliper"]', { xPercent: 11, yPercent: -27, ease: 'none' }, 0)
          .to('[data-brake-part="pad-left"]', { xPercent: -32, ease: 'none' }, 0)
          .to('[data-brake-part="pad-right"]', { xPercent: 32, ease: 'none' }, 0)
          .to('[data-brake-part="bolt"]', { scale: 1.85, opacity: 0, ease: 'none' }, 0)
          .to('[data-brake-part="disc"]', { rotation: 13, ease: 'none' }, 0)

        return () => timeline.scrollTrigger?.kill()
      })

      return () => media.revert()
    }, root)

    ScrollTrigger.refresh()
    return () => context.revert()
  }, [])

  return (
    <div className="exploded-brake" ref={rootRef} aria-hidden="true">
      <div className="exploded-brake-stage">
        <PartLayer part="disc" />
        <PartLayer part="pad-left" />
        <PartLayer part="pad-right" />
        <PartLayer part="caliper" />
        <PartLayer part="bolt" />
      </div>
    </div>
  )
}
