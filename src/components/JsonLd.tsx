import { business } from '../data/business'

export function JsonLd() {
  const image = `${import.meta.env.BASE_URL}images/engine-work-960.jpg`
  const data = {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    name: business.name,
    description: business.description,
    telephone: business.phoneTel,
    image,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'ул. Октябрьская, 60',
      addressLocality: 'Саратов',
      postalCode: business.address.postal,
      addressCountry: 'RU',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: business.address.lat,
      longitude: business.address.lng,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '10:00',
        closes: '19:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: String(business.rating.value),
      reviewCount: String(business.rating.reviewsCount),
      ratingCount: String(business.rating.ratingsCount),
      bestRating: '5',
      worstRating: '1',
    },
    sameAs: [business.links.vk, business.links.yandexMaps],
    priceRange: '₽₽',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
