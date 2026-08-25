import { business, reviews } from '../data/business'
import { useReveal } from '../hooks/useReveal'

export function Reviews() {
  const ref = useReveal<HTMLElement>()

  return (
    <section className="section section-reviews" id="reviews" ref={ref}>
      <div className="wrap">
        <div className="section-head reveal">
          <p className="eyebrow">Отзывы</p>
          <h2>Что пишут на Яндекс Картах</h2>
          <p>
            Фрагменты отзывов клиентов. Полная лента — на Яндекс Картах,
            включая критику: мы её не прячем.
          </p>
        </div>

        <div className="rating-line reveal">
          <span className="score">{business.rating.value}</span>
          <span className="meta">
            {business.rating.ratingsCount} оценки · {business.rating.reviewsCount}{' '}
            отзывов · {business.rating.source}
          </span>
        </div>

        <div className="reviews-grid">
          {reviews.map((r, i) => (
            <blockquote
              className="review-card reveal"
              key={`${r.author}-${r.date}`}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <p>«{r.text}»</p>
              <footer>
                {r.author} · {r.date}
              </footer>
            </blockquote>
          ))}
        </div>

        <p className="reviews-more reveal">
          <a
            className="btn btn-dark"
            href={business.links.yandexReviews}
            target="_blank"
            rel="noreferrer"
          >
            Все отзывы на Яндекс Картах
          </a>
        </p>
      </div>
    </section>
  )
}
