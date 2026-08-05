import { useEffect, useRef, useState } from 'react'

// ponytail: single-file page. Content is small enough that splitting into
// component files would be more ceremony than the site is worth.

const COLLECTIONS = [
  { name: 'Signature Bouquets', desc: 'Hand-tied roses, lilies and seasonal blooms wrapped in couture paper.', icon: '💐' },
  { name: 'Wedding & Décor', desc: 'Mandap, stage and car florals designed around your theme.', icon: '🌸' },
  { name: 'Luxury Flower Boxes', desc: 'Long-lasting arrangements in keepsake hat boxes.', icon: '🎁' },
  { name: 'Exotic & Rare Stems', desc: 'Orchids, anthuriums and imported blooms — the rare of the rarest.', icon: '🌺' },
  { name: 'Fresh Garlands', desc: 'Jasmine, marigold and rose garlands for temple and tradition.', icon: '🌼' },
  { name: 'Corporate Gifting', desc: 'Bulk desk arrangements and event florals for offices.', icon: '🏵️' },
]

const OCCASIONS = [
  'Birthday', 'Anniversary', 'Wedding', 'Condolence',
  'Get Well Soon', 'Congratulations', 'Housewarming', 'Just Because',
]

const TEAMS = [
  {
    name: 'Gowthami Flowers',
    logo: '/flowers_logo.png',
    tag: 'Fresh Blooms & Gifting',
    desc: 'Everyday bouquets, arrangements and gifting — fresh, same-day, delivered across Bengaluru.',
    phone: '9449126666',
  },
  {
    name: 'Gowthami Events',
    logo: '/events_logo.png',
    tag: 'Est. 2009 · Décor & Weddings',
    desc: 'Full-service floral décor for weddings, stages and celebrations of every scale.',
    phone: '9916992276',
  },
]

const BRANCHES = [
  {
    area: 'HSR Layout',
    lines: ['No. 647, Liss Arcade, 27th Main, 13th Cross', 'Next to Samsung, HSR Layout Sector 1', 'Bengaluru — 560102'],
  },
  {
    area: 'JP Nagar 7th Phase',
    lines: ['24, Next to Chassma.com, 4th B Main', 'Dr. P Vivekananda Layout, Santhrupthi Nagar', 'Bengaluru — 560078'],
  },
]

function Reveal({ children, as: Tag = 'div', className = '', delay = 0 }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) { setShown(true); io.disconnect() }
      },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <Tag ref={ref} className={`reveal ${shown ? 'is-visible' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  )
}

function TeamLogo({ src, alt }) {
  const [ok, setOk] = useState(true)
  if (!ok) return null
  return <img className="team-logo" src={src} alt={alt} onError={() => setOk(false)} />
}

function Logo({ onFallback }) {
  const [broken, setBroken] = useState(false)
  if (!broken) {
    return (
      <img
        className="logo-img"
        src="/logo.jpg"
        alt="Gowthami Florist — The Rare Of The Rarest"
        onError={() => { setBroken(true); onFallback() }}
      />
    )
  }
  // Fallback monogram in the brand palette if /logo.png isn't present yet.
  return (
    <div className="logo-fallback" aria-label="Gowthami Florist">
      <span className="mono">G</span><span className="mono t">T</span>
    </div>
  )
}

function Petals() {
  // ponytail: 9 CSS-animated petals, positions/timings seeded inline. No lib.
  const petals = Array.from({ length: 9 })
  return (
    <div className="petals" aria-hidden="true">
      {petals.map((_, i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: `${(i * 11 + 4) % 100}%`,
            animationDelay: `${(i * 2.3) % 12}s`,
            animationDuration: `${11 + (i % 5) * 2}s`,
            fontSize: `${12 + (i % 4) * 5}px`,
          }}
        >
          ❀
        </span>
      ))}
    </div>
  )
}

export default function App() {
  // The real logo badge already carries the name + tagline; only show the
  // standalone script tagline when we fall back to the monogram.
  const [showTagline, setShowTagline] = useState(false)
  return (
    <>
      <Petals />

      <header className="nav">
        <a className="nav-brand" href="#top">
          <img className="nav-logo" src="/logo.jpg" alt="" />
          <span className="nav-word">Gowthami<span> Florist</span></span>
        </a>
        <nav className="nav-links">
          <a href="#collections">Collections</a>
          <a href="#teams">Our Teams</a>
          <a href="#occasions">Occasions</a>
          <a href="#visit">Visit</a>
          <a className="nav-cta" href="tel:+919449126666">Order Now</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-inner">
            <Logo onFallback={() => setShowTagline(true)} />
            {showTagline && <p className="script tagline">The Rare Of The Rarest</p>}
            <h1>Blooms for every occasion, <em>crafted by hand.</em></h1>
            <p className="hero-sub">
              A boutique florist in Bengaluru creating fresh, elegant arrangements —
              open 24 hours, delivered across the city.
            </p>
            <div className="hero-actions">
              <a className="btn" href="#collections">Explore Collections</a>
              <a className="btn btn-ghost" href="https://wa.me/919449126666" target="_blank" rel="noopener noreferrer">WhatsApp Us</a>
            </div>
          </div>
        </section>

        <section className="about">
          <Reveal className="about-grid">
            <div>
              <p className="eyebrow">Our Story</p>
              <h2>Flowers chosen the way you'd choose them yourself.</h2>
            </div>
            <div className="about-copy">
              <p>
                Every stem at Gowthami Florist is sourced fresh and arranged the same day.
                From a single rose to a full wedding mandap, we treat each order as if it were
                for someone we love.
              </p>
              <p>
                Two boutiques across Bengaluru, one promise — the rare of the rarest,
                delivered with care, any hour of the day.
              </p>
            </div>
          </Reveal>
        </section>

        <section id="teams" className="teams">
          <Reveal><p className="eyebrow center">One Family</p></Reveal>
          <Reveal as="h2" className="center-h2">Two Specialities</Reveal>
          <div className="team-grid">
            {TEAMS.map((t, i) => (
              <Reveal key={t.name} className="team" delay={i * 90}>
                <TeamLogo src={t.logo} alt={t.name} />
                <h3>{t.name}</h3>
                <p className="team-tag">{t.tag}</p>
                <p className="team-desc">{t.desc}</p>
                <div className="team-actions">
                  <a className="btn" href={`tel:+91${t.phone}`}>Call</a>
                  <a className="btn btn-ghost" href={`https://wa.me/91${t.phone}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="collections" className="collections">
          <Reveal><p className="eyebrow center">What We Create</p></Reveal>
          <Reveal as="h2" className="center-h2">Our Collections</Reveal>
          <div className="card-grid">
            {COLLECTIONS.map((c, i) => (
              <Reveal key={c.name} className="card" delay={i * 60}>
                <span className="card-icon">{c.icon}</span>
                <h3>{c.name}</h3>
                <p>{c.desc}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="occasions" className="occasions">
          <Reveal><p className="eyebrow center">Send Flowers For</p></Reveal>
          <Reveal as="h2" className="center-h2">Every Occasion</Reveal>
          <div className="occ-list">
            {OCCASIONS.map((o, i) => (
              <Reveal key={o} className="occ-chip" delay={i * 40}>{o}</Reveal>
            ))}
          </div>
        </section>

        <section id="visit" className="visit">
          <Reveal><p className="eyebrow center">Come Say Hello</p></Reveal>
          <Reveal as="h2" className="center-h2">Visit Our Boutiques</Reveal>
          <div className="branch-grid">
            {BRANCHES.map((b, i) => (
              <Reveal key={b.area} className="branch" delay={i * 80}>
                <h3>{b.area}</h3>
                {b.lines.map((l) => <p key={l}>{l}</p>)}
                <p className="hours">Open 24 Hours · All Days</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="contact-row">
            <a className="btn" href="tel:+919449126666">Call to Order</a>
            <a className="btn btn-ghost" href="https://www.instagram.com/gowthamiflorist/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a className="btn btn-ghost" href="https://www.facebook.com/gowthamiflorist/" target="_blank" rel="noopener noreferrer">Facebook</a>
          </Reveal>
        </section>
      </main>

      <footer className="footer">
        <p className="script">Gowthami Florist</p>
        <p className="foot-tag">The Rare Of The Rarest</p>
        <p className="foot-small">© {new Date().getFullYear()} Gowthami Florist · Bengaluru · All Rights Reserved</p>
      </footer>
    </>
  )
}
