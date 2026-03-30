'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './page.module.css'

/* ─── Chapter divider ─── */
function ChapterDivider({ num, title }: { num: string; title: string }) {
  return (
    <div className={styles.chapterDivider} data-reveal="fade">
      <div className={styles.chapterLine} />
      <div className={styles.chapterLabel}>
        <span className={styles.chapterNumLabel}>Chapter {num}</span>
        <span className={styles.chapterDot} aria-hidden="true">·</span>
        <span className={styles.chapterTitleLabel}>{title}</span>
      </div>
      <div className={styles.chapterLine} />
    </div>
  )
}

/* ─── Teacup SVG ─── */
function TeacupSVG() {
  return (
    <svg
      className={styles.teacupSvg}
      viewBox="0 0 220 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Steam wisps */}
      <path className={`${styles.steam} ${styles.steam1}`} d="M80 62 C76 48 84 36 78 22" stroke="var(--saffron)" strokeWidth="1.8" strokeLinecap="round"/>
      <path className={`${styles.steam} ${styles.steam2}`} d="M110 56 C106 42 114 30 108 16" stroke="var(--saffron)" strokeWidth="1.8" strokeLinecap="round"/>
      <path className={`${styles.steam} ${styles.steam3}`} d="M140 62 C144 48 136 36 142 22" stroke="var(--saffron)" strokeWidth="1.8" strokeLinecap="round"/>
      {/* Cup body */}
      <path
        d="M45 75 L35 185 Q33 202 50 202 L170 202 Q187 202 185 185 L175 75 Z"
        stroke="var(--espresso)" strokeWidth="2" fill="rgba(168,121,40,0.05)"
      />
      {/* Tea surface */}
      <path d="M55 95 Q110 112 165 95" stroke="var(--gold)" strokeWidth="1.5" opacity="0.5"/>
      {/* Handle */}
      <path
        d="M175 105 Q215 105 215 145 Q215 185 175 178"
        stroke="var(--espresso)" strokeWidth="2" fill="none"
      />
      {/* Saucer */}
      <ellipse cx="110" cy="210" rx="90" ry="14" stroke="var(--espresso)" strokeWidth="2" fill="rgba(168,121,40,0.04)"/>
      <ellipse cx="110" cy="210" rx="68" ry="9" stroke="var(--espresso)" strokeWidth="1" strokeDasharray="3 3" fill="none" opacity="0.4"/>
      {/* Floating petals */}
      <ellipse className={`${styles.petal} ${styles.petal1}`} cx="58" cy="80" rx="7" ry="4" fill="var(--bougainvillea)" opacity="0.5" transform="rotate(-25 58 80)"/>
      <ellipse className={`${styles.petal} ${styles.petal2}`} cx="162" cy="88" rx="6" ry="3.5" fill="var(--bougainvillea)" opacity="0.4" transform="rotate(20 162 88)"/>
      <ellipse className={`${styles.petal} ${styles.petal3}`} cx="95" cy="50" rx="5" ry="3" fill="var(--bougainvillea-light)" opacity="0.35" transform="rotate(-10 95 50)"/>
    </svg>
  )
}

/* ─── Mountain SVG ─── */
function MountainSVG() {
  return (
    <svg
      className={styles.mountainSvg}
      viewBox="0 0 680 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Distant mountains */}
      <path
        d="M0 280 L70 160 L130 200 L220 90 L320 160 L410 100 L510 170 L580 110 L680 160 L680 400 L0 400Z"
        fill="var(--parchment-deep)" opacity="0.55"
      />
      {/* Nearer mountains */}
      <path
        d="M0 320 L90 190 L180 240 L290 115 L390 195 L490 135 L590 200 L680 155 L680 400 L0 400Z"
        fill="var(--parchment)" opacity="0.8"
      />
      {/* Mist band */}
      <rect x="0" y="210" width="680" height="40" fill="white" opacity="0.18"/>
      {/* Tea rows (stylised arcs) */}
      {[0,1,2,3].map((row) =>
        Array(7).fill(0).map((_, col) => (
          <path
            key={`${row}-${col}`}
            d={`M${80 + col * 78 + row * 12} ${310 - row * 18} Q${80 + col * 78 + row * 12 + 12} ${296 - row * 18} ${80 + col * 78 + row * 12 + 24} ${310 - row * 18}`}
            stroke="var(--sage)" strokeWidth="1.6" opacity={0.5 + row * 0.1}
          />
        ))
      )}
      {/* Altitude marker line */}
      <line x1="548" y1="118" x2="640" y2="118" stroke="var(--gold)" strokeWidth="1" strokeDasharray="4 3" opacity="0.8"/>
      <line x1="548" y1="118" x2="548" y2="315" stroke="var(--gold)" strokeWidth="1" strokeDasharray="4 3" opacity="0.3"/>
      <text x="647" y="122" fill="var(--gold)" fontSize="11" fontFamily="Spectral,Georgia,serif" fontStyle="italic">4,500 ft</text>
      {/* Sun circle */}
      <circle cx="590" cy="78" r="24" fill="none" stroke="var(--saffron)" strokeWidth="1.5" opacity="0.45"/>
      <circle cx="590" cy="78" r="16" fill="var(--saffron)" opacity="0.12"/>
    </svg>
  )
}

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  /* Scroll-based nav */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /* IntersectionObserver scroll reveals */
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    if (!els.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-visible', 'true')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  /* Parallax on hero video frame */
  useEffect(() => {
    const frame = document.querySelector<HTMLElement>(`.${styles.heroVideoFrame}`)
    if (!frame) return
    const onScroll = () => {
      const y = window.scrollY
      frame.style.transform = `translateY(${y * 0.08}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <main className={styles.main}>

      {/* ─── NAV ─── */}
      <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
        <div className={styles.navInner}>
          <a href="#" className={styles.navLogo} aria-label="Meghamalai Tea home">
            <span className={styles.navLogoScript}>ஸ்</span>
            <span className={styles.navLogoWord}>tory</span>
          </a>
          <button
            className={styles.menuToggle}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            <span className={`${styles.menuLine} ${menuOpen ? styles.menuLineOpen1 : ''}`} />
            <span className={`${styles.menuLine} ${menuOpen ? styles.menuLineOpen2 : ''}`} />
            <span className={`${styles.menuLine} ${menuOpen ? styles.menuLineOpen3 : ''}`} />
          </button>
          <ul className={`${styles.navLinks} ${menuOpen ? styles.navLinksOpen : ''}`}>
            {['The Estate', 'Our Teas', 'Origin', 'Craft', 'Shop'].map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase().replace(' ', '-')}`} className={styles.navLink} onClick={() => setMenuOpen(false)}>
                  {item}
                </a>
              </li>
            ))}
            <li>
              <a href="#shop" className={styles.navCta} onClick={() => setMenuOpen(false)}>
                Order Now
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className={styles.hero} id="home">
        {/* Left: editorial text */}
        <div className={styles.heroLeft}>
          <div className={styles.heroTeacupWrap} aria-hidden="true">
            <TeacupSVG />
          </div>
          <p className={styles.heroEstate}>Meghamalai Estate — Est. 1927</p>
          <h1 className={styles.heroTitle}>
            <span className={styles.heroTitleScript}>Where mist</span>
            <span className={styles.heroTitleMain}>meets leaf</span>
          </h1>
          <p className={styles.heroTagline}>Sourced Traditionally &amp; Offered Real to You</p>
          <p className={styles.heroSub}>
            Single-origin teas from 4,500 feet above the Western Ghats.
            Hand-plucked. Artisan-crafted. Singular.
          </p>
          <div className={styles.heroCtas}>
            <a href="#collection" className={styles.heroCta}>Discover the Collection</a>
            <a href="#origin" className={styles.heroCtaGhost}>Our Story</a>
          </div>
          <div className={styles.heroMeta}>
            {[
              { val: '4,500', unit: 'ft elevation' },
              { val: '1927', unit: 'Est.' },
              { val: '100%', unit: 'hand-plucked' },
            ].map(({ val, unit }) => (
              <div key={unit} className={styles.heroMetaItem}>
                <span className={styles.heroMetaVal}>{val}</span>
                <span className={styles.heroMetaUnit}>{unit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: framed video */}
        <div className={styles.heroRight}>
          <div className={styles.heroVideoFrame}>
            <div className={styles.heroVideoFrameCorner} data-pos="tl" aria-hidden="true" />
            <div className={styles.heroVideoFrameCorner} data-pos="tr" aria-hidden="true" />
            <div className={styles.heroVideoFrameCorner} data-pos="bl" aria-hidden="true" />
            <div className={styles.heroVideoFrameCorner} data-pos="br" aria-hidden="true" />
            <video
              ref={videoRef}
              className={styles.heroVideo}
              autoPlay
              muted
              loop
              playsInline
              poster="/tea-packet.png"
            >
              <source src="/hero-video.mp4" type="video/mp4" />
            </video>
            <div className={styles.heroVideoLabel} aria-hidden="true">
              <span className={styles.heroVideoDot} />
              Live from the garden
            </div>
          </div>
          <div className={styles.heroVideoCaption}>
            Western Ghats, Tamil Nadu · 4,500 ft
          </div>
        </div>

        <div className={styles.heroScroll} aria-hidden="true">
          <span className={styles.heroScrollLine} />
          <span className={styles.heroScrollText}>Scroll</span>
        </div>
      </section>

      {/* ─── MARQUEE ─── */}
      <div className={styles.marqueeBar} aria-hidden="true">
        <div className={styles.marqueeTrack}>
          {Array(3).fill([
            'Single Origin', '·', 'High Grown', '·', 'Hand Plucked', '·',
            'Artisan Crafted', '·', 'Sourced Traditionally', '·', 'Estate Direct', '·',
            'Western Ghats', '·', 'Real Tea', '·',
          ]).flat().map((t, i) => (
            <span key={i} className={t === '·' ? styles.marqueeDot : styles.marqueeItem}>{t}</span>
          ))}
        </div>
      </div>

      {/* ─── CHAPTER I · THE ORIGIN ─── */}
      <ChapterDivider num="I" title="The Origin" />

      <section className={styles.originSection} id="origin">
        <div className={styles.originGrid}>
          <div className={styles.originIllustration} data-reveal="left">
            <MountainSVG />
            <div className={styles.originImageCaption}>
              <span>Meghamalai Hills, Tamil Nadu</span>
              <span>Elevation: 4,500 ft</span>
            </div>
          </div>
          <div className={styles.originText}>
            <p className={styles.sectionLabel} data-reveal data-delay="100">The Estate</p>
            <h2 className={styles.sectionTitle} data-reveal data-delay="200">
              A garden born<br />
              <em>in the clouds</em>
            </h2>
            <div className={styles.estateDivider} data-reveal="fade" data-delay="300" />
            <p data-reveal data-delay="300">
              In 1927, Mr. Napier Ford trekked into the mist-shrouded heights of the Western Ghats,
              following the scent of wild tea on the mountain air. What he found at 4,500 feet changed
              his life — and, eventually, yours.
            </p>
            <p data-reveal data-delay="400">
              Meghamalai — meaning <em>misty mountains</em> in Tamil — rises where perpetual cloud
              rolls through rows of ancient tea bushes. The cool highland air, mineral-rich laterite
              soil, and slow, unhurried growth create a complexity you can taste: floral, muscatel,
              with a lingering sweetness no lowland garden can replicate.
            </p>
            <div className={styles.estateStats}>
              {[
                { num: '1927', label: 'Founded' },
                { num: '4,500', label: 'Feet elevation' },
                { num: '3', label: 'Flushes yearly' },
                { num: '100%', label: 'Hand-plucked' },
              ].map(({ num, label }, i) => (
                <div key={label} className={styles.estateStat} data-reveal data-delay={`${200 + i * 100}`}>
                  <span className={styles.estateStatNum}>{num}</span>
                  <span className={styles.estateStatLabel}>{label}</span>
                </div>
              ))}
            </div>
            <a href="#collection" className={styles.textLink} data-reveal data-delay="600">
              Explore our teas
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ─── CHAPTER II · THE LAND ─── */}
      <ChapterDivider num="II" title="The Land" />

      <section className={styles.landSection} id="the-estate">
        <div className={styles.landInner}>
          <p className={styles.landLabel} data-reveal="fade">Western Ghats · Tamil Nadu</p>
          <h2 className={styles.landTitle} data-reveal data-delay="100">
            Cloud Mountain.<br />
            <em>Real Tea.</em>
          </h2>
          <p className={styles.landSubtitle} data-reveal data-delay="200">
            Where altitude shapes character and mist shapes flavour.
          </p>
          <div className={styles.landStats}>
            {[
              { num: '1,500', unit: 'm', label: 'Above Sea Level' },
              { num: '97+', unit: ' yrs', label: 'Unbroken Legacy' },
              { num: '3', unit: '', label: 'Harvests a Year' },
            ].map(({ num, unit, label }, i) => (
              <div key={label} className={styles.landStat} data-reveal data-delay={`${200 + i * 150}`}>
                <div className={styles.landStatNum}>
                  {num}<span className={styles.landStatUnit}>{unit}</span>
                </div>
                <div className={styles.landStatLabel}>{label}</div>
              </div>
            ))}
          </div>
          <p className={styles.landTagline} data-reveal="fade" data-delay="700">
            Sourced Traditionally &amp; Offered Real to You
          </p>
        </div>
      </section>

      {/* ─── CHAPTER III · THE COLLECTION ─── */}
      <ChapterDivider num="III" title="The Collection" />

      <section className={styles.collectionSection} id="collection">
        <div className={styles.sectionHeader}>
          <p className={styles.sectionLabel} data-reveal="fade">Each flush, a different story</p>
          <h2 className={styles.sectionTitle} data-reveal data-delay="100">
            The Season's<br />
            <em>finest offerings</em>
          </h2>
          <p className={styles.sectionSubtitle} data-reveal data-delay="200">
            From the delicate spring First Flush to the bold Saffron Chai of winter evenings,
            every harvest tells the story of its season.
          </p>
        </div>
        <div className={styles.collectionGrid}>
          {TEAS.map((tea, i) => (
            <article
              key={tea.name}
              className={styles.collectionCard}
              data-reveal
              data-delay={`${i * 150}`}
            >
              <div className={styles.collectionCardTop} style={{ '--card-accent': tea.accent } as React.CSSProperties}>
                <div className={styles.collectionCardBadge}>{tea.flush}</div>
                <div className={styles.collectionCardIcon} aria-hidden="true">{tea.icon}</div>
              </div>
              <div className={styles.collectionCardBody}>
                <h3 className={styles.collectionCardName}>{tea.name}</h3>
                <p className={styles.collectionCardOrigin}>{tea.origin}</p>
                <p className={styles.collectionCardDesc}>{tea.description}</p>
                <div className={styles.collectionCardNotes}>
                  {tea.notes.map((note) => (
                    <span key={note} className={styles.collectionCardNote}>{note}</span>
                  ))}
                </div>
                <div className={styles.collectionCardFooter}>
                  <span className={styles.collectionCardPrice}>{tea.price}</span>
                  <button className={styles.collectionCardBtn} type="button">
                    Add to cart
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ─── ORIGIN PULL QUOTE ─── */}
      <section className={styles.quoteSection} aria-label="Brand philosophy quote">
        <div className={styles.quoteInner} data-reveal="fade">
          <div className={styles.quoteMark} aria-hidden="true">"</div>
          <blockquote className={styles.quoteText}>
            Tea is not a product. It is a place, a season, and the hands
            that plucked the leaf at dawn.
          </blockquote>
          <cite className={styles.quoteCite}>— From the Meghamalai Estate Chronicle</cite>
        </div>
      </section>

      {/* ─── CRAFT / PROCESS ─── */}
      <section className={styles.craftSection} id="craft">
        <div className={styles.sectionHeader}>
          <p className={styles.sectionLabel} data-reveal="fade">The Craft</p>
          <h2 className={styles.sectionTitle} data-reveal data-delay="100">
            From leaf to <em>cup</em>
          </h2>
        </div>
        <div className={styles.craftSteps}>
          {PROCESS.map((step, i) => (
            <div key={step.title} className={styles.craftStep} data-reveal data-delay={`${i * 100}`}>
              <div className={styles.craftStepNum} aria-hidden="true">0{i + 1}</div>
              <div className={styles.craftStepIcon} aria-hidden="true">{step.icon}</div>
              <h3 className={styles.craftStepTitle}>{step.title}</h3>
              <p className={styles.craftStepDesc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── PRODUCT HIGHLIGHT ─── */}
      <section className={styles.highlightSection} id="featured">
        <div className={styles.highlightGrid}>
          <div className={styles.highlightText} data-reveal="left">
            <p className={styles.sectionLabel}>Featured</p>
            <h2 className={styles.sectionTitle}>
              Meghamalai<br />
              <em>Silver Tips</em>
            </h2>
            <p>
              Harvested only in the cool pre-dawn hours when dew still rests on unopened buds,
              our Silver Tips White Tea is the rarest expression of Meghamalai.
              Each gram requires the plucking of over 200 individual tips.
            </p>
            <ul className={styles.highlightFeatures}>
              {['Pre-dawn harvest only', 'Under 50kg produced yearly', 'Naturally air-dried', 'No oxidation, pure flavour'].map(f => (
                <li key={f} className={styles.highlightFeature}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2 7l3.5 3.5L12 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            <div className={styles.highlightPrice}>
              <span className={styles.highlightPriceLabel}>From</span>
              <span className={styles.highlightPriceAmount}>₹2,800</span>
              <span className={styles.highlightPricePer}>/ 50g</span>
            </div>
            <a href="#shop" className={styles.heroCta}>Reserve Your Tin</a>
          </div>
          <div className={styles.highlightImageWrap} data-reveal="right">
            <img
              src="/tea-packet.png"
              alt="Meghamalai Silver Tips White Tea in elegant packaging"
              className={styles.highlightImage}
              loading="lazy"
              width={480}
              height={560}
            />
            <div className={styles.highlightImageDeco} aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* ─── CTA BAND ─── */}
      <section className={styles.ctaSection} id="shop">
        <div className={styles.ctaInner} data-reveal="fade">
          <p className={styles.sectionLabel} style={{ color: 'var(--gold-light)' }}>Begin Your Journey</p>
          <h2 className={styles.ctaTitle}>
            Taste what grows<br />
            <em>above the clouds</em>
          </h2>
          <p className={styles.ctaSubtitle}>
            Free shipping on orders above ₹1,500 · Estate-direct · Freshness guaranteed
          </p>
          <div className={styles.ctaCtas}>
            <a href="#collection" className={styles.ctaBtn}>Shop All Teas</a>
            <a href="#origin" className={styles.ctaBtnGhost}>Read the Story</a>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className={styles.footer}>
        <div className={styles.footerGrid}>
          <div className={styles.footerBrand}>
            <div className={styles.footerLogo}>
              <span className={styles.navLogoScript}>ஸ்</span>
              <span className={styles.navLogoWord}>tory</span>
            </div>
            <p className={styles.footerTagline}>Meghamalai Estate Tea</p>
            <p className={styles.footerBrandDesc}>
              Single-origin teas from the mist-covered hills of Tamil Nadu.
              Est. 1927.
            </p>
          </div>
          <div className={styles.footerLinks}>
            <h4 className={styles.footerHeading}>The Tea</h4>
            <ul>
              {['Bougainvillea First Flush', 'Golden Estate Reserve', 'Saffron Chai Blend', 'Silver Tips', 'Gift Sets'].map(l => (
                <li key={l}><a href="#" className={styles.footerLink}>{l}</a></li>
              ))}
            </ul>
          </div>
          <div className={styles.footerLinks}>
            <h4 className={styles.footerHeading}>The Estate</h4>
            <ul>
              {['Our Story', 'Sustainability', 'Visit Us', 'Press', 'Contact'].map(l => (
                <li key={l}><a href="#" className={styles.footerLink}>{l}</a></li>
              ))}
            </ul>
          </div>
          <div className={styles.footerNewsletter}>
            <h4 className={styles.footerHeading}>Harvest Notes</h4>
            <p className={styles.footerNewsletterDesc}>
              Seasonal letters from the estate — harvest updates, brewing guides, estate stories.
            </p>
            <form className={styles.footerForm} onSubmit={e => e.preventDefault()}>
              <label htmlFor="newsletter-email" className={styles.srOnly}>Email address</label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="your@email.com"
                className={styles.footerInput}
                autoComplete="email"
                required
              />
              <button type="submit" className={styles.footerSubmit} aria-label="Subscribe to newsletter">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </form>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>© {new Date().getFullYear()} Meghamalai Estate Tea. All rights reserved.</p>
          <div className={styles.footerBottomLinks}>
            <a href="#" className={styles.footerLink}>Privacy</a>
            <a href="#" className={styles.footerLink}>Terms</a>
            <a href="#" className={styles.footerLink}>Shipping</a>
          </div>
        </div>
      </footer>

    </main>
  )
}

const TEAS = [
  {
    name: 'Bougainvillea First Flush',
    origin: 'Spring · March–April',
    flush: 'First Flush',
    accent: '#C8405C',
    icon: '🌸',
    description: 'The most anticipated harvest — light, alive with floral muscatel notes that bloom like bougainvillea across the Meghamalai slopes at spring\'s first awakening.',
    notes: ['Muscatel', 'Jasmine', 'Pink Honey'],
    price: '₹1,200 / 50g',
  },
  {
    name: 'Golden Estate Reserve',
    origin: 'Summer · June–July',
    flush: 'Second Flush',
    accent: '#A87928',
    icon: '✦',
    description: 'Richer and more complex — the signature golden amber liquor with characteristic muscatel sweetness that defines the Meghamalai estate at its most expressive.',
    notes: ['Muscatel', 'Honey', 'Apricot'],
    price: '₹1,600 / 50g',
  },
  {
    name: 'Saffron Chai Blend',
    origin: 'Year-round · Masala Blend',
    flush: 'Estate Blend',
    accent: '#D4742A',
    icon: '☀',
    description: 'Estate black tea meets hand-ground saffron from the Nilgiris. A warming, golden chai that carries the soul of the mountains in every steep.',
    notes: ['Saffron', 'Cardamom', 'Black Pepper'],
    price: '₹980 / 100g',
  },
]

const PROCESS = [
  {
    title: 'The Pluck',
    icon: '☀',
    desc: 'At sunrise, skilled pluckers harvest only the finest two leaves and a bud — the golden standard for quality tea.',
  },
  {
    title: 'Withering',
    icon: '🌬',
    desc: 'Fresh leaves rest on raised bamboo trays as highland air gently draws away moisture, preparing them for the next stage.',
  },
  {
    title: 'Rolling',
    icon: '⚙',
    desc: 'Traditional rolling breaks the leaf cells, initiating oxidation and shaping the tea. This step releases the essential oils that define flavour.',
  },
  {
    title: 'Firing',
    icon: '🔥',
    desc: 'Precise heat application arrests oxidation at exactly the right moment, locking in colour, aroma, and taste.',
  },
  {
    title: 'Grading',
    icon: '⚖',
    desc: 'Each batch is hand-sorted and graded by our tea master, who has spent decades learning to read the leaves.',
  },
  {
    title: 'Sealed Fresh',
    icon: '◈',
    desc: 'Within 48 hours of firing, your tea is sealed in nitrogen-flushed tins and shipped directly from the estate to your door.',
  },
]
