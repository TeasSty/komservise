import { useCallback, type MouseEvent } from 'react'

/** Tracks pointer inside a card for CSS spotlight border (--mx, --my) */
export function useSpotlight() {
  const onMove = useCallback((e: MouseEvent<HTMLElement>) => {
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width) * 100
    const y = ((e.clientY - r.top) / r.height) * 100
    el.style.setProperty('--mx', `${x}%`)
    el.style.setProperty('--my', `${y}%`)
  }, [])

  return { onMove }
}
