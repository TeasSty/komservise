type Props = {
  name: string
  alt: string
  widths: number[]
  sizes: string
  className?: string
  loading?: 'lazy' | 'eager'
  fetchPriority?: 'high' | 'low' | 'auto'
}

const base = import.meta.env.BASE_URL

/** Responsive picture with AVIF → WebP → JPEG fallback */
export function ResponsiveImage({
  name,
  alt,
  widths,
  sizes,
  className,
  loading = 'lazy',
  fetchPriority,
}: Props) {
  const sorted = [...widths].sort((a, b) => a - b)
  const largest = sorted[sorted.length - 1]

  const srcSet = (ext: string) =>
    sorted.map((w) => `${base}images/${name}-${w}.${ext} ${w}w`).join(', ')

  return (
    <picture className={className}>
      <source type="image/avif" srcSet={srcSet('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet('webp')} sizes={sizes} />
      <img
        src={`${base}images/${name}-${largest}.jpg`}
        srcSet={srcSet('jpg')}
        sizes={sizes}
        alt={alt}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
      />
    </picture>
  )
}
