import React, { useCallback, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react'
import './styles.css'

const imagePath = (name) => `/images/optimized/${name}`

const img = {
  hero: imagePath('banner-img.JPG'),
  intro: imagePath('IMG_0141.JPG'),
  bowl: imagePath('IMG_8125.JPG'),
  canoa: imagePath('IMG_8122.JPG'),
  storyOne: imagePath('IMG_0142.JPG'),
  storyTwo: imagePath('IMG_9907.JPG'),
  storyThree: imagePath('IMG_5839.JPG'),
  trade: imagePath('IMG_8105.JPG'),
  edit: imagePath('IMG_3274.JPG'),
  studioPortrait: 'https://hpz.cup.mybluehost.me/wp-content/uploads/2025/11/WhatsApp-Image-2025-06-13-at-03.40.13-1152x1536.jpeg',
  studioDetail: 'https://hpz.cup.mybluehost.me/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-31-at-1.12.19-AM.jpeg',
  teamOne: 'https://hpz.cup.mybluehost.me/wp-content/uploads/2025/12/unnamed-1.png',
  teamTwo: 'https://hpz.cup.mybluehost.me/wp-content/uploads/2025/12/unnamed.png',
}

const nav = [
  { label: 'PORTFOLIO', href: '/portfolio' },
  { label: 'SHOP', href: '/shop' },
  { label: 'PRESS', href: '/press' },
  { label: 'SERVICES', href: '#' },
  { label: 'STUDIO', href: '/studio' },
  { label: 'CONTACT', href: '/contact' },
]

const pressFeatures = [
  {
    publication: 'San Carlos Life',
    title: 'Interior Design Advice For Your San Carlos Home',
    date: 'May 23, 2025',
    type: 'Interview',
    url: 'https://sancarloslife.com/interior-design-advice-for-your-san-carlos-home/',
    image: 'https://sancarloslife.com/wp-content/uploads/2025/05/Interior-Design-Advice-from-Judi-Teran-1-1080x675.png',
    excerpt:
      "San Carlos Life caught up with local interior designer Judi Teran to discuss thoughtful, modern interiors, trend direction, and how homeowners can create spaces that feel current, enduring, personal, and livable.",
  },
  {
    publication: 'San Carlos Business Networking Group',
    title: 'Judi Teran Member Profile',
    date: 'Member since 2025',
    type: 'Professional Profile',
    url: 'https://scbng.org/members/judi-teran',
    image: 'https://scbng.org/Portals/4/Images/Members/judi-teran-2025.jpg',
    excerpt:
      'Judi Teran is featured as a high-end interior designer and creative strategist working between the Bay Area, Los Angeles, and New York, known for bold aesthetics, thoughtful execution, and visionary spaces.',
  },
]

const shopProducts = [
  {
    name: 'Crescent Lounge Chair',
    slug: 'crescent-lounge-chair',
    category: 'Seating',
    price: '$2,850',
    featured: true,
    image: img.bowl,
    detail: 'Low-profile lounge chair with a sculptural seat, tailored upholstery, and warm metal base.',
    description: 'A sculptural lounge chair selected for quiet reading corners, layered living rooms, and rooms that need a softer modern silhouette.',
    dimensions: '32"W x 34"D x 30"H',
    material: 'Performance upholstery, powder-coated steel',
    leadTime: '6-8 weeks',
  },
  {
    name: 'Travertine Cocktail Table',
    slug: 'travertine-cocktail-table',
    category: 'Tables',
    price: '$3,400',
    featured: true,
    image: img.canoa,
    detail: 'Honed stone table selected for living rooms that need weight, softness, and natural variation.',
    description: 'A grounded cocktail table with natural surface movement, intended to anchor seating plans without making the room feel heavy.',
    dimensions: '48"W x 32"D x 15"H',
    material: 'Honed travertine',
    leadTime: '8-10 weeks',
  },
  {
    name: 'Linen Modular Sofa',
    slug: 'linen-modular-sofa',
    category: 'Seating',
    price: '$6,900',
    featured: true,
    image: img.intro,
    detail: 'Deep modular seating in a quiet linen blend, scaled for everyday living and hosting.',
    description: 'A flexible modular sofa with generous proportions, built for relaxed living while maintaining a clean architectural profile.',
    dimensions: '120"W x 40"D x 31"H',
    material: 'Linen blend upholstery, kiln-dried hardwood frame',
    leadTime: '10-12 weeks',
  },
  {
    name: 'Plaster Floor Lamp',
    slug: 'plaster-floor-lamp',
    category: 'Lighting',
    price: '$1,250',
    featured: true,
    image: img.storyOne,
    detail: 'Hand-finished floor lamp with a soft sculptural profile and warm ambient glow.',
    description: 'A warm floor lamp for corners, reading areas, and rooms that need height, softness, and evening atmosphere.',
    dimensions: '18"W x 18"D x 62"H',
    material: 'Hand-finished plaster, linen shade',
    leadTime: '4-6 weeks',
  },
  {
    name: 'Walnut Storage Console',
    slug: 'walnut-storage-console',
    category: 'Storage',
    price: '$4,200',
    featured: false,
    image: img.edit,
    detail: 'Refined console in walnut with generous hidden storage and a clean architectural face.',
    description: 'A tailored storage piece for entries, dining rooms, and media walls where function should stay visually quiet.',
    dimensions: '72"W x 18"D x 30"H',
    material: 'Walnut veneer, soft-close hardware',
    leadTime: '8-10 weeks',
  },
  {
    name: 'Marble Dining Table',
    slug: 'marble-dining-table',
    category: 'Tables',
    price: '$8,600',
    featured: false,
    image: img.trade,
    detail: 'Statement dining table with a grounded base and expressive marble surface.',
    description: 'A substantial dining table designed as the center of the room, pairing a strong base with expressive natural stone.',
    dimensions: '96"W x 42"D x 30"H',
    material: 'Marble slab, sealed stone base',
    leadTime: '10-14 weeks',
  },
]

const shopCategories = ['All', ...new Set(shopProducts.map((product) => product.category))]

const portfolioProjects = [
  {
    title: 'Montclair',
    slug: 'montclair',
    category: 'Residential Interior',
    location: 'Montclair',
    intro: 'A considered residential project balancing warm materiality, architectural restraint, and layered detail.',
    images: [
      imagePath('1CA4967A-AC36-498C-9900-1835213616BF.JPG'),
      imagePath('banner-img.JPG'),
      imagePath('DDP_0111-web.JPG'),
      imagePath('IMG_6163.jpg'),
      imagePath('IMG_0010.JPG'),
      imagePath('IMG_0117.JPG'),
    ],
  },
  {
    title: 'Irving St',
    slug: 'irving-st',
    category: 'Residential Interior',
    location: 'Irving St',
    intro: 'A refined home environment shaped through proportion, contrast, and an elevated approach to everyday living.',
    images: [
      imagePath('E27A665C-85E9-4D2B-BC4D-AA7B2A392E60-10602-000006895F87A220.JPG'),
      imagePath('62E82BDB-6778-474D-9BCC-A7E8E31B738C-10602-0000068945E9BF2D.JPG'),
      imagePath('AF3CF000-2A54-4B95-A053-F016F3DE1F1D-10602-000006895343DB83.JPG'),
      imagePath('98709E00-6EB0-4CE7-B926-41F10F2A2A58-10602-00000689D3AF5069.JPG'),
      imagePath('F347AEF5-8B9B-4025-88F2-3A8181046638-217-0000000159D7A284.JPG'),
      imagePath('IMG_2211.JPG'),
    ],
  },
  {
    title: 'Wildwood Ave',
    slug: 'wildwood-ave',
    category: 'Residential Interior',
    location: 'Wildwood Ave',
    intro: 'A layered project defined by natural texture, quiet composition, and construction-led design clarity.',
    images: [
      imagePath('IMG_8122.JPG'),
      imagePath('IMG_8120.JPG'),
      imagePath('IMG_8121.JPG'),
      imagePath('IMG_8124.JPG'),
      imagePath('IMG_8125.JPG'),
      imagePath('IMG_8105.JPG'),
      imagePath('IMG_0145.JPG'),
      imagePath('IMG_0142.JPG'),
      imagePath('IMG_0141.JPG'),
      imagePath('20.03.26 - 73_Irving - Test1 - OutsourcePlan UK.JPG'),
      imagePath('3d572356-a7d6-469c-8142-0c1ce368073a.JPG'),
      imagePath('IMG_0640.JPG'),
      imagePath('IMG_9904.JPG'),
      imagePath('IMG_9907.JPG'),
      imagePath('IMG_9908.JPG'),
      imagePath('IMG_9909.JPG'),
      imagePath('IMG_5841.JPG'),
      imagePath('IMG_5843.JPG'),
    ],
  },
]

function openConsultationForm() {
  window.dispatchEvent(new Event('open-consultation'))
}

function ScheduleButton({ className = '' }) {
  return (
    <button
      type="button"
      onClick={openConsultationForm}
      className={`inline-flex min-h-11 items-center justify-center border border-ink bg-ink px-5 py-3 text-[10px] font-normal uppercase tracking-[0.14em] text-porcelain hover:bg-transparent hover:text-ink sm:px-8 sm:tracking-[0.24em] ${className}`}
    >
      Schedule Consultation
      <span className="ml-3">-&gt;</span>
    </button>
  )
}

function LoadingScreen({ isVisible, progress }) {
  if (!isVisible) {
    return null
  }

  return (
    <div className="loader-screen fixed inset-0 z-[100] flex items-center justify-center bg-black text-white">
      <div className="w-[min(640px,72vw)]">
        <div className="mb-12 text-center">
          <div className="loader-logo mx-auto w-fit whitespace-nowrap font-serif text-[28px] font-normal lowercase leading-none tracking-[0.12em] text-white sm:text-[46px] md:text-[58px]">
            iconica
          </div>
          <div className="mx-auto mt-2 h-px w-[230px] max-w-full bg-white/70 sm:w-[310px]" />
          <div className="mt-2 text-[15px] font-normal uppercase tracking-[0.24em] text-white/90 sm:text-[24px] md:text-[30px]">DESIGN STUDIO</div>
        </div>
        <div className="mb-6 flex items-center justify-between text-[14px] font-normal tracking-[0.22em]">
          <span>LOADING</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-[3px] w-full bg-white/20">
          <div className="h-full bg-white transition-[width] duration-200 ease-out" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  )
}

function usePageLoader() {
  const [isVisible, setIsVisible] = useState(true)
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef(null)
  const timeoutRef = useRef(null)

  const startLoader = useCallback((duration = 650) => {
    window.clearInterval(intervalRef.current)
    window.clearTimeout(timeoutRef.current)
    setIsVisible(true)
    setProgress(0)

    const startedAt = Date.now()
    intervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - startedAt
      const nextProgress = Math.min(100, Math.round((elapsed / duration) * 100))
      setProgress(nextProgress)

      if (nextProgress >= 100) {
        window.clearInterval(intervalRef.current)
        timeoutRef.current = window.setTimeout(() => setIsVisible(false), 120)
      }
    }, 45)
  }, [])

  useEffect(() => {
    startLoader()

    return () => {
      window.clearInterval(intervalRef.current)
      window.clearTimeout(timeoutRef.current)
    }
  }, [startLoader])

  return { isVisible, progress, startLoader }
}

function useSmoothReveals() {
  useEffect(() => {
    const animatedElements = document.querySelectorAll('section, footer, article, .reveal-item')
    animatedElements.forEach((element) => element.classList.add('reveal-ready'))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    animatedElements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])
}

function ConsultationWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    function handleOpenConsultation() {
      setSubmitted(false)
      setIsOpen(true)
    }

    window.addEventListener('open-consultation', handleOpenConsultation)

    return () => {
      window.removeEventListener('open-consultation', handleOpenConsultation)
    }
  }, [])

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.documentElement.classList.add('scroll-locked')
      document.body.classList.add('scroll-locked')
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.documentElement.classList.remove('scroll-locked')
      document.body.classList.remove('scroll-locked')
    }

    return () => {
      document.documentElement.classList.remove('scroll-locked')
      document.body.classList.remove('scroll-locked')
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <button
        type="button"
        onClick={openConsultationForm}
        className="fixed left-0 top-1/2 z-40 hidden origin-left -translate-y-1/2 border border-l-0 border-ink bg-porcelain px-2 py-4 text-[10px] font-medium tracking-[0.2em] text-ink shadow-md hover:bg-ink hover:text-porcelain sm:block sm:px-3 sm:py-5 sm:text-[11px]"
        aria-label="Schedule a consultation"
      >
        <span className="[writing-mode:vertical-rl] rotate-180">SCHEDULE CONSULTATION</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/55 px-4 py-6 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="consultation-title">
          <div className="relative max-h-[92vh] w-full max-w-[760px] overflow-y-auto border border-ink bg-porcelain shadow-2xl">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-3 top-3 z-10 border border-ink bg-porcelain p-2 hover:bg-ink hover:text-porcelain sm:right-4 sm:top-4"
              aria-label="Close consultation form"
            >
              <X size={18} strokeWidth={1.5} />
            </button>

            <div className="grid md:grid-cols-[0.8fr_1.2fr]">
              <div className="hidden border-r border-ink md:block">
                <img src={img.intro} alt="Interior styling with ceramic objects" loading="lazy" decoding="async" className="h-full min-h-[640px] w-full object-cover" />
              </div>
              <div className="px-5 py-8 pt-14 sm:px-8 sm:pt-8">
                <p className="mb-4 text-[11px] tracking-[0.24em] text-olive">DESIGN CONCIERGE</p>
                <h2 id="consultation-title" className="font-serif text-[17px] font-normal leading-[1.35]">
                  SCHEDULE A CONSULTATION
                </h2>
                <p className="mt-4 text-[14px] leading-6 text-ink/75">
                  Tell us about your space, timeline, and project goals. Our studio will follow up with availability and next steps.
                </p>

                {submitted ? (
                  <div className="mt-8 border border-ink bg-bone p-6">
                    <p className="text-[11px] tracking-[0.22em]">REQUEST RECEIVED</p>
                    <p className="mt-4 text-[14px] font-normal leading-6">
                      Thank you. We will review your consultation request and contact you with scheduling options.
                    </p>
                    <button type="button" onClick={() => setIsOpen(false)} className="mt-6 border border-ink px-6 py-3 text-[11px] tracking-[0.2em] hover:bg-ink hover:text-porcelain">
                      CLOSE
                    </button>
                  </div>
                ) : (
                  <form className="mt-7 grid gap-4" onSubmit={handleSubmit}>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="text-[11px] tracking-[0.18em]">
                        NAME
                        <input required type="text" className="mt-2 w-full border border-ink bg-transparent px-3 py-3 text-[14px] font-normal tracking-normal outline-none focus:bg-white" />
                      </label>
                      <label className="text-[11px] tracking-[0.18em]">
                        EMAIL
                        <input required type="email" className="mt-2 w-full border border-ink bg-transparent px-3 py-3 text-[14px] font-normal tracking-normal outline-none focus:bg-white" />
                      </label>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="text-[11px] tracking-[0.18em]">
                        PHONE
                        <input type="tel" className="mt-2 w-full border border-ink bg-transparent px-3 py-3 text-[14px] font-normal tracking-normal outline-none focus:bg-white" />
                      </label>
                      <label className="text-[11px] tracking-[0.18em]">
                        CONSULTATION TYPE
                        <select required className="mt-2 w-full border border-ink bg-porcelain px-3 py-3 text-[14px] font-normal tracking-normal outline-none focus:bg-white">
                          <option value="">Select one</option>
                          <option>Residential design</option>
                          <option>Commercial design</option>
                          <option>Design-build consultation</option>
                          <option>Renovation planning</option>
                        </select>
                      </label>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="text-[11px] tracking-[0.18em]">
                        PREFERRED DATE
                        <input type="date" className="mt-2 w-full border border-ink bg-transparent px-3 py-3 text-[14px] font-normal tracking-normal outline-none focus:bg-white" />
                      </label>
                      <label className="text-[11px] tracking-[0.18em]">
                        PREFERRED TIME
                        <input type="time" className="mt-2 w-full border border-ink bg-transparent px-3 py-3 text-[14px] font-normal tracking-normal outline-none focus:bg-white" />
                      </label>
                    </div>
                    <label className="text-[11px] tracking-[0.18em]">
                      PROJECT NOTES
                      <textarea rows="4" className="mt-2 w-full resize-none border border-ink bg-transparent px-3 py-3 text-[14px] font-normal tracking-normal outline-none focus:bg-white" placeholder="Project type, location, timeline, scope, budget range..." />
                    </label>
                    <button type="submit" className="mt-2 border border-ink bg-ink px-7 py-3 text-[11px] tracking-[0.2em] text-porcelain hover:bg-transparent hover:text-ink">
                      REQUEST CONSULTATION
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 border-b border-ink bg-porcelain/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1480px] items-center gap-2 px-3 py-3 sm:gap-3 sm:px-4 sm:py-4 md:px-7 xl:gap-5">
        <a href="/" className="min-w-0 flex-1 truncate font-serif text-[12px] tracking-[0.06em] sm:shrink-0 sm:text-[18px] sm:tracking-[0.12em] md:text-[24px] xl:flex-none xl:text-[26px]">
          ICONICA DESIGN STUDIO
        </a>
        <nav className="hidden flex-1 flex-wrap gap-x-5 gap-y-2 text-[11px] tracking-[0.18em] xl:flex">
          {nav.map((item) => (
            <a key={item.label} href={item.href} className="hover:underline">
              {item.label}
            </a>
          ))}
        </nav>
        <button
          className="ml-auto xl:hidden"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          {mobileMenuOpen ? <X size={21} strokeWidth={1.5} /> : <Menu size={21} strokeWidth={1.5} />}
        </button>
        <div className="flex shrink-0 items-center justify-end gap-2 sm:gap-4">
          <button className="hidden sm:block" aria-label="Search">
            <Search size={18} strokeWidth={1.5} />
          </button>
          <button className="hidden md:block" aria-label="Account">
            <UserRound size={18} strokeWidth={1.5} />
          </button>
          <a href="/shop" aria-label="Shop">
            <ShoppingBag size={18} strokeWidth={1.5} />
          </a>
        </div>
      </div>
      {mobileMenuOpen && (
        <nav className="grid border-t border-ink px-4 py-4 text-[11px] tracking-[0.18em] xl:hidden">
          {nav.map((item) => (
            <a key={item.label} href={item.href} className="border-b border-ink/15 py-3 last:border-b-0" onClick={() => setMobileMenuOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}

function Hero() {
  return (
    <section className="relative min-h-[calc(100svh-57px)] overflow-hidden border-b border-ink sm:min-h-[calc(100svh-66px)]">
      <img src={img.hero} alt="Iconica Design Studio interior project" decoding="async" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/20" />
      <div className="relative mx-auto flex min-h-[calc(100svh-57px)] max-w-[1480px] items-end px-5 pb-9 pl-7 sm:min-h-[calc(100svh-66px)] sm:px-6 sm:pl-9 md:px-7 md:pb-16">
        <div className="image-copy max-w-[680px] text-white">
          <p className="mb-5 text-[11px] tracking-[0.24em]">WELCOME</p>
          <h1 className="font-serif text-[17px] font-normal leading-[1.45] tracking-normal">
            We create environments that tell a story crafted with purpose, artistry, and soul. Each space is designed to evoke feeling and endure, balancing architecture, material, and light to shape how people live, work, and connect.
          </h1>
          <ScheduleButton className="mt-8 border-white bg-ink/90 text-white hover:bg-white hover:text-ink" />
        </div>
      </div>
    </section>
  )
}

function FeatureRow() {
  return (
    <section className="grid border-b border-ink md:grid-cols-2">
      <div className="min-h-[320px] border-b border-ink md:min-h-[420px] md:border-b-0 md:border-r">
        <img src={img.bowl} alt="Iconica Design Studio project detail" loading="lazy" decoding="async" className="h-full w-full object-cover" />
      </div>
      <div className="flex items-center bg-porcelain px-5 py-12 sm:px-6 md:px-14 md:py-16">
        <div className="max-w-[540px]">
          <p className="mb-5 text-[11px] tracking-[0.22em] text-olive">DESIGN + BUILD</p>
          <h2 className="font-serif text-[17px] font-normal leading-[1.45]">
            A full-service design-build studio crafting timeless spaces with architectural depth and refined detail.
          </h2>
          <p className="mt-7 max-w-[460px] text-[14px] font-normal leading-6">
            We bring vision to life from the earliest concept to the final layer of finish.
          </p>
          <a href="/portfolio" className="mt-8 inline-flex text-[10px] uppercase tracking-[0.24em] underline underline-offset-4">
            View Our Work
          </a>
        </div>
      </div>
    </section>
  )
}

function ImageCallout({ image, title, text, align = 'left', href = '#' }) {
  return (
    <section className="relative min-h-[340px] border-b border-ink md:min-h-[520px]">
      <img src={image} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/25" />
      <div className={`relative mx-auto flex min-h-[340px] max-w-[1480px] items-end px-5 py-10 pl-7 sm:px-6 sm:pl-9 md:min-h-[520px] md:px-7 md:py-12 ${align === 'right' ? 'justify-end' : ''}`}>
        <a href={href} className="image-copy max-w-[520px] text-white">
          <p className="mb-3 text-[11px] tracking-[0.24em]">{title}</p>
          <h3 className="font-serif text-[17px] font-normal leading-[1.45]">{text}</h3>
        </a>
      </div>
    </section>
  )
}

function FeaturedProducts() {
  const featuredProducts = shopProducts.filter((product) => product.featured).slice(0, 4)

  return (
    <section className="border-b border-ink bg-porcelain px-4 py-12 md:px-7 md:py-20">
      <div className="mx-auto max-w-[1480px]">
        <div className="mb-10 flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-[560px]">
            <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-olive">SHOP</p>
            <h2 className="font-serif text-[17px] font-normal leading-[1.35]">Featured Furniture + Objects</h2>
          </div>
          <a href="/shop" className="border border-ink px-6 py-3 text-[10px] uppercase tracking-[0.2em] hover:bg-ink hover:text-porcelain">
            Shop Collection
          </a>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <article key={product.name} className="group">
              <a href={`/shop/${product.slug}`} className="block aspect-[4/5] overflow-hidden border border-ink/15 bg-bone">
                <img src={product.image} alt={product.name} loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
              </a>
              <div className="pt-5">
                <p className="text-[10px] uppercase tracking-[0.2em] text-olive">{product.category}</p>
                <h3 className="mt-3 font-serif text-[17px] font-normal leading-[1.35]">{product.name}</h3>
                <div className="mt-4 flex items-center justify-between gap-4">
                  <span className="text-[12px] tracking-[0.16em]">{product.price}</span>
                  <a href={`/shop/${product.slug}`} className="text-[10px] uppercase tracking-[0.18em] underline underline-offset-4">
                    View
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Press() {
  return (
    <section className="border-b border-ink bg-bone px-4 py-10 md:px-7 md:py-16">
      <div className="mx-auto max-w-[1180px] text-center">
        <p className="mb-8 text-[11px] tracking-[0.24em]">AS SEEN IN</p>
        <div className="grid gap-5 sm:grid-cols-2">
          {pressFeatures.map((feature) => (
            <a
              key={feature.publication}
              href={feature.url}
              target="_blank"
              rel="noreferrer"
              className="group grid overflow-hidden border border-ink/15 bg-porcelain text-left transition duration-300 hover:bg-ink hover:text-porcelain sm:grid-cols-[0.48fr_0.52fr]"
            >
              <span className="block aspect-[4/3] overflow-hidden bg-white sm:aspect-auto">
                <img src={feature.image} alt={feature.publication} loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
              </span>
              <span className="flex min-h-[150px] flex-col justify-center p-5">
                <span className="block text-[10px] uppercase tracking-[0.18em] text-olive transition duration-300 group-hover:text-porcelain/70">{feature.type}</span>
                <span className="mt-3 block font-serif text-[17px] font-normal leading-[1.35]">{feature.publication}</span>
                <span className="mt-4 block text-[10px] uppercase tracking-[0.18em] opacity-70">Read Feature</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function PressPage() {
  const leadFeature = pressFeatures[0]

  return (
    <>
      <section className="grid border-b border-ink bg-porcelain md:grid-cols-[0.9fr_1.1fr]">
        <div className="flex items-start px-6 py-8 md:border-r md:px-14 md:py-9">
          <div className="max-w-[560px]">
            <p className="mb-5 text-[11px] uppercase tracking-[0.24em] text-olive">PRESS</p>
            <h1 className="font-serif text-[17px] font-normal leading-[1.45]">
              Recognition, interviews, and community features from publications and professional networks.
            </h1>
          </div>
        </div>
        <div className="flex items-start px-6 py-8 md:px-14 md:py-9">
          <div className="max-w-[640px] text-[14px] font-normal leading-6 text-ink/75">
            <p>
              Iconica Design Studio’s press presence reflects Judi Teran’s perspective on timeless interiors, thoughtful execution, and residential spaces designed with clarity, beauty, and purpose.
            </p>
          </div>
        </div>
      </section>

      <section className="grid border-b border-ink bg-porcelain md:grid-cols-2">
        <a href={leadFeature.url} target="_blank" rel="noreferrer" className="group min-h-[320px] overflow-hidden border-b border-ink sm:min-h-[420px] md:min-h-[620px] md:border-b-0 md:border-r">
          <img src={leadFeature.image} alt={leadFeature.title} decoding="async" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
        </a>
        <div className="flex items-center px-6 py-16 md:px-14">
          <div className="max-w-[560px]">
            <p className="mb-5 text-[11px] uppercase tracking-[0.24em] text-olive">FEATURED PRESS</p>
            <h2 className="font-serif text-[17px] font-normal leading-[1.45] md:text-[25px]">{leadFeature.title}</h2>
            <p className="mt-5 text-[11px] uppercase tracking-[0.18em] text-ink/50">
              {leadFeature.publication} / {leadFeature.date}
            </p>
            <p className="mt-7 text-[14px] font-normal leading-6 text-ink/75">{leadFeature.excerpt}</p>
            <a href={leadFeature.url} target="_blank" rel="noreferrer" className="mt-8 inline-flex text-[10px] uppercase tracking-[0.2em] underline underline-offset-4">
              Read Feature
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-ink bg-bone px-4 py-12 md:px-7 md:py-20">
        <div className="mx-auto max-w-[1480px]">
          <div className="mb-10 flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
            <h2 className="font-serif text-[17px] font-normal leading-[1.35]">AS SEEN IN</h2>
            <p className="max-w-[520px] text-[14px] font-normal leading-6 text-ink/65">
              Press mentions and profiles connected to Judi Teran and Iconica Design Studio.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {pressFeatures.map((feature) => (
              <article key={feature.url} className="group grid border border-ink/15 bg-porcelain md:grid-cols-[0.85fr_1.15fr]">
                <a href={feature.url} target="_blank" rel="noreferrer" className="flex min-h-[260px] items-center justify-center overflow-hidden border-b border-ink/15 bg-white md:border-b-0 md:border-r">
                  <img src={feature.image} alt={feature.publication} loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
                </a>
                <div className="flex flex-col justify-between p-7">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-olive">{feature.type}</p>
                    <h3 className="mt-4 font-serif text-[17px] font-normal leading-[1.45]">{feature.title}</h3>
                    <p className="mt-4 text-[11px] uppercase tracking-[0.16em] text-ink/50">
                      {feature.publication} / {feature.date}
                    </p>
                    <p className="mt-5 text-[14px] font-normal leading-6 text-ink/75">{feature.excerpt}</p>
                  </div>
                  <a href={feature.url} target="_blank" rel="noreferrer" className="mt-7 inline-flex text-[10px] uppercase tracking-[0.2em] underline underline-offset-4">
                    Open Press Link
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ImageCallout image={img.trade} title="PRESS INQUIRIES" text="For interviews, features, and media requests, contact Iconica Design Studio." align="right" />
    </>
  )
}

function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const featuredProducts = shopProducts.filter((product) => product.featured)
  const visibleProducts =
    activeCategory === 'All' ? shopProducts : shopProducts.filter((product) => product.category === activeCategory)

  return (
    <>
      <section className="grid border-b border-ink bg-porcelain md:grid-cols-[0.85fr_1.15fr]">
        <div className="flex items-start px-6 py-8 md:border-r md:px-14 md:py-9">
          <div className="max-w-[560px]">
            <p className="mb-5 text-[11px] uppercase tracking-[0.24em] text-olive">SHOP</p>
            <h1 className="font-serif text-[17px] font-normal leading-[1.45]">
              Furniture, lighting, and finishing pieces selected for considered interiors.
            </h1>
          </div>
        </div>
        <div className="flex items-start px-6 py-8 md:px-14 md:py-9">
          <div className="max-w-[640px] text-[14px] font-normal leading-6 text-ink/75">
            <p>
              A curated shop for Iconica Design Studio, organized around the pieces clients most often need: seating, tables, lighting, and storage with a refined residential point of view.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-ink bg-bone px-4 py-12 md:px-7 md:py-16">
        <div className="mx-auto max-w-[1480px]">
          <div className="mb-9 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-olive">FEATURED</p>
              <h2 className="font-serif text-[17px] font-normal leading-[1.35]">Studio Picks</h2>
            </div>
            <a href="#shop-catalog" className="text-[10px] uppercase tracking-[0.2em] underline underline-offset-4">
              View Catalog
            </a>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <article key={product.name} className="group bg-porcelain">
                <a href={`/shop/${product.slug}`} className="block aspect-[4/5] overflow-hidden border border-ink/15 bg-bone">
                  <img src={product.image} alt={product.name} loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
                </a>
                <div className="border-x border-b border-ink/15 p-5">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-olive">{product.category}</p>
                  <h3 className="mt-3 font-serif text-[17px] font-normal leading-[1.35]">{product.name}</h3>
                  <p className="mt-3 text-[13px] leading-6 text-ink/70">{product.detail}</p>
                  <div className="mt-5 flex items-center justify-between gap-4">
                    <span className="text-[12px] tracking-[0.16em]">{product.price}</span>
                    <a href={`/shop/${product.slug}`} className="text-[10px] uppercase tracking-[0.18em] underline underline-offset-4">
                      View
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="shop-catalog" className="border-b border-ink bg-porcelain px-4 py-12 md:px-7 md:py-20">
        <div className="mx-auto max-w-[1480px]">
          <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div className="max-w-[560px]">
              <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-olive">CATALOG</p>
              <h2 className="font-serif text-[17px] font-normal leading-[1.35]">Browse By Category</h2>
            </div>
            <div className="grid w-full grid-cols-2 border border-ink/20 sm:flex sm:w-auto sm:flex-wrap">
              {shopCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`border-r border-t border-ink/20 px-3 py-3 text-[10px] uppercase tracking-[0.12em] first:border-t-0 sm:border-t-0 sm:px-4 sm:tracking-[0.18em] sm:last:border-r-0 ${activeCategory === category ? 'bg-ink text-porcelain' : 'bg-porcelain text-ink hover:bg-bone'}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {visibleProducts.map((product) => (
              <article key={product.name} className="group grid border border-ink/15 bg-bone sm:grid-cols-[0.9fr_1.1fr]">
                <a href={`/shop/${product.slug}`} className="block aspect-square overflow-hidden border-b border-ink/15 bg-porcelain sm:border-b-0 sm:border-r">
                  <img src={product.image} alt={product.name} loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
                </a>
                <div className="flex flex-col justify-between p-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-olive">{product.category}</p>
                    <h3 className="mt-3 font-serif text-[17px] font-normal leading-[1.35]">{product.name}</h3>
                    <p className="mt-4 text-[14px] leading-6 text-ink/75">{product.detail}</p>
                  </div>
                  <div className="mt-6 flex items-center justify-between gap-4 border-t border-ink/15 pt-4">
                    <span className="text-[12px] tracking-[0.16em]">{product.price}</span>
                    <a href={`/shop/${product.slug}`} className="border border-ink px-4 py-2 text-[10px] uppercase tracking-[0.16em] hover:bg-ink hover:text-porcelain">
                      View
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ImageCallout image={img.edit} title="SOURCING SUPPORT" text="Looking for a specific piece? Our studio can source furniture, lighting, and materials for your project." align="right" />
    </>
  )
}

function ProductPage({ product }) {
  if (!product) {
    return (
      <section className="border-b border-ink bg-porcelain px-5 py-20 md:px-7">
        <div className="mx-auto max-w-[900px]">
          <p className="mb-5 text-[11px] uppercase tracking-[0.24em] text-olive">SHOP</p>
          <h1 className="font-serif text-[17px] font-normal leading-[1.45]">Product not found.</h1>
          <a href="/shop" className="mt-7 inline-flex text-[10px] uppercase tracking-[0.2em] underline underline-offset-4">
            Back to Shop
          </a>
        </div>
      </section>
    )
  }

  const relatedProducts = shopProducts
    .filter((item) => item.slug !== product.slug && item.category === product.category)
    .concat(shopProducts.filter((item) => item.slug !== product.slug && item.category !== product.category))
    .slice(0, 3)

  return (
    <>
      <section className="grid border-b border-ink bg-porcelain lg:grid-cols-[1.05fr_0.95fr]">
        <div className="min-h-[320px] border-b border-ink bg-bone sm:min-h-[420px] lg:min-h-[720px] lg:border-b-0 lg:border-r">
          <img src={product.image} alt={product.name} decoding="async" fetchPriority="high" className="h-full w-full object-cover" />
        </div>
        <div className="flex items-center px-5 py-10 sm:px-6 md:px-14 lg:py-16">
          <div className="max-w-[620px]">
            <a href="/shop" className="mb-8 inline-flex text-[10px] uppercase tracking-[0.2em] underline underline-offset-4">
              Back to Shop
            </a>
            <p className="mb-5 text-[11px] uppercase tracking-[0.24em] text-olive">{product.category}</p>
            <h1 className="font-serif text-[22px] font-normal leading-[1.25] md:text-[34px]">{product.name}</h1>
            <p className="mt-5 text-[13px] uppercase tracking-[0.18em] text-ink/55">{product.price}</p>
            <p className="mt-7 text-[15px] font-normal leading-7 text-ink/75">{product.description}</p>
            <div className="mt-9 grid border border-ink/20 text-[13px] leading-6 sm:grid-cols-3">
              <div className="border-b border-ink/20 p-4 sm:border-b-0 sm:border-r">
                <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-olive">Dimensions</p>
                <p>{product.dimensions}</p>
              </div>
              <div className="border-b border-ink/20 p-4 sm:border-b-0 sm:border-r">
                <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-olive">Material</p>
                <p>{product.material}</p>
              </div>
              <div className="p-4">
                <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-olive">Lead Time</p>
                <p>{product.leadTime}</p>
              </div>
            </div>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <button type="button" onClick={openConsultationForm} className="border border-ink bg-ink px-5 py-3 text-[10px] uppercase tracking-[0.14em] text-porcelain hover:bg-transparent hover:text-ink sm:px-7 sm:tracking-[0.2em]">
                Request This Piece
              </button>
              <a href="/shop" className="border border-ink px-5 py-3 text-center text-[10px] uppercase tracking-[0.14em] hover:bg-ink hover:text-porcelain sm:px-7 sm:tracking-[0.2em]">
                Browse More
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-ink bg-bone px-4 py-12 md:px-7 md:py-16">
        <div className="mx-auto max-w-[1480px]">
          <div className="mb-9 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-olive">RELATED</p>
              <h2 className="font-serif text-[17px] font-normal leading-[1.35]">More From The Collection</h2>
            </div>
            <a href="/shop" className="text-[10px] uppercase tracking-[0.2em] underline underline-offset-4">
              View All Products
            </a>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {relatedProducts.map((item) => (
              <article key={item.slug} className="group">
                <a href={`/shop/${item.slug}`} className="block aspect-[4/5] overflow-hidden border border-ink/15 bg-porcelain">
                  <img src={item.image} alt={item.name} loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
                </a>
                <div className="pt-5">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-olive">{item.category}</p>
                  <h3 className="mt-3 font-serif text-[17px] font-normal leading-[1.35]">{item.name}</h3>
                  <p className="mt-3 text-[12px] tracking-[0.16em]">{item.price}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ImageCallout image={img.trade} title="CUSTOM SOURCING" text="Need sizing, finish options, or a full furniture package? Our studio can source and specify pieces for your space." align="right" />
    </>
  )
}

const instagramPosts = [
  img.hero,
  img.intro,
  img.bowl,
  img.canoa,
  img.trade,
  img.edit,
]

function InstagramSection() {
  return (
    <section className="border-b border-ink bg-porcelain px-4 py-12 md:px-7 md:py-16">
      <div className="mx-auto max-w-[1480px]">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-olive">INSTAGRAM</p>
            <h2 className="font-serif text-[17px] font-normal leading-[1.35]">@iconicadesignstudio</h2>
          </div>
          <a href="https://www.instagram.com/iconicadesignstudio/" target="_blank" rel="noreferrer" className="text-[10px] uppercase tracking-[0.2em] underline underline-offset-4">
            Follow on Instagram
          </a>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {instagramPosts.map((post, index) => (
            <a key={post} href="https://www.instagram.com/iconicadesignstudio/" target="_blank" rel="noreferrer" className="group aspect-square overflow-hidden border border-ink/10 bg-bone">
              <img src={post} alt={`Iconica Design Studio Instagram post ${index + 1}`} loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]" />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function PortfolioPage() {
  return (
    <>
      <section className="border-b border-ink bg-porcelain px-5 py-8 md:px-7 md:py-9">
        <div className="mx-auto grid max-w-[1480px] gap-7 md:grid-cols-[0.9fr_1.1fr] md:items-start md:gap-10">
          <div className="max-w-[560px]">
            <p className="mb-5 text-[11px] uppercase tracking-[0.24em] text-olive">PORTFOLIO</p>
            <h1 className="font-serif text-[17px] font-normal leading-[1.45]">
              A selection of recent residential and commercial projects that reflect our integrated approach to design and build.
            </h1>
          </div>
          <div className="max-w-[640px] text-[14px] font-normal leading-6 text-ink/75">
            <p>
              Each project is composed through material honesty, refined construction, and a clear sense of atmosphere. Explore selected work from Iconica Design Studio below.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-ink bg-porcelain px-4 py-10 md:px-7 md:py-16">
        <div className="mx-auto max-w-[1480px]">
          <div className="mb-10 flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
            <h2 className="font-serif text-[17px] font-normal leading-[1.35]">SELECTED PROJECTS</h2>
            <p className="max-w-[520px] text-[14px] font-normal leading-6 text-ink/65">
              Image-led project previews sourced from the current Iconica image library.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {portfolioProjects.map((project) => (
              <article key={project.title} className="group">
                <a href={`/portfolio/${project.slug}`} className="block overflow-hidden border border-ink/20 bg-bone">
                  <img src={project.images[0]} alt={project.title} loading="lazy" decoding="async" className="aspect-[4/5] h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
                </a>
                <div className="pt-5">
                  <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-olive">{project.category}</p>
                  <h3 className="font-serif text-[17px] font-normal leading-[1.35]">{project.title}</h3>
                  <p className="mt-4 text-[14px] font-normal leading-6 text-ink/75">{project.intro}</p>
                  <a href={`/portfolio/${project.slug}`} className="mt-6 inline-flex text-[10px] uppercase tracking-[0.2em] underline underline-offset-4">
                    View Project
                  </a>
                  <div className="mt-6 grid grid-cols-3 gap-2">
                    {project.images.slice(1, 4).map((image) => (
                      <div key={image} className="aspect-square overflow-hidden border border-ink/10 bg-bone">
                        <img src={image} alt={`${project.title} detail`} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative min-h-[340px] border-b border-ink md:min-h-[520px]">
        <img src={portfolioProjects[2].images[0]} alt="Portfolio closing project" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/25" />
        <div className="relative mx-auto flex min-h-[340px] max-w-[1480px] items-end justify-end px-5 py-10 pl-7 text-white sm:px-6 sm:pl-9 md:min-h-[520px] md:px-7 md:py-12">
          <div className="image-copy max-w-[520px]">
            <p className="mb-3 text-[11px] uppercase tracking-[0.24em]">START A PROJECT</p>
            <h2 className="font-serif text-[17px] font-normal leading-[1.45]">Tell us about your project and we'll be in touch within 24 hours to arrange a call.</h2>
            <ScheduleButton className="mt-8 border-white bg-ink/90 text-white hover:bg-white hover:text-ink" />
          </div>
        </div>
      </section>
    </>
  )
}

function ProjectPage({ project }) {
  if (!project) {
    return (
      <section className="border-b border-ink bg-porcelain px-5 py-20 md:px-7">
        <div className="mx-auto max-w-[900px]">
          <p className="mb-5 text-[11px] uppercase tracking-[0.24em] text-olive">PORTFOLIO</p>
          <h1 className="font-serif text-[17px] font-normal leading-[1.45]">Project not found.</h1>
          <a href="/portfolio" className="mt-7 inline-flex text-[10px] uppercase tracking-[0.2em] underline underline-offset-4">
            Back to Portfolio
          </a>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="relative min-h-[420px] border-b border-ink md:min-h-[720px]">
        <img src={project.images[0]} alt={project.title} decoding="async" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/25" />
        <div className="relative mx-auto flex min-h-[420px] max-w-[1480px] items-end px-5 py-10 pl-7 text-white sm:px-6 sm:pl-9 md:min-h-[720px] md:px-7 md:py-12">
          <div className="image-copy max-w-[620px]">
            <p className="mb-3 text-[11px] uppercase tracking-[0.24em]">{project.category}</p>
            <h1 className="font-serif text-[17px] font-normal leading-[1.45] md:text-[25px]">{project.title}</h1>
            <p className="mt-5 max-w-[520px] text-[14px] font-normal leading-6 text-white/80">{project.intro}</p>
          </div>
        </div>
      </section>

      <section className="border-b border-ink bg-porcelain px-4 py-12 md:px-7 md:py-20">
        <div className="mx-auto grid max-w-[1480px] gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-end">
          <div>
            <p className="mb-5 text-[11px] uppercase tracking-[0.24em] text-olive">PROJECT</p>
            <h2 className="font-serif text-[17px] font-normal leading-[1.45]">{project.title}</h2>
          </div>
          <div className="max-w-[680px] text-[14px] font-normal leading-6 text-ink/75">
            <p>{project.intro}</p>
            <p className="mt-5">
              This portfolio page is built inside the React site, so visitors stay on Iconica Design Studio instead of being sent to the old Bluehost project pages.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-ink bg-porcelain px-4 py-10 md:px-7 md:py-16">
        <div className="mx-auto max-w-[1480px]">
          <div className="mb-10 flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
            <h2 className="font-serif text-[17px] font-normal leading-[1.35]">PROJECT GALLERY</h2>
            <a href="/portfolio" className="text-[10px] uppercase tracking-[0.2em] underline underline-offset-4">
              Back to Portfolio
            </a>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {project.images.map((image, index) => (
              <a key={image} href={image} target="_blank" rel="noreferrer" className={`group block overflow-hidden border border-ink/20 bg-bone ${index === 0 ? 'md:col-span-2' : ''}`}>
                <img src={image} alt={`${project.title} gallery ${index + 1}`} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" className={`${index === 0 ? 'aspect-[16/9]' : 'aspect-[4/3]'} h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]`} />
              </a>
            ))}
          </div>
        </div>
      </section>

      <ImageCallout image={project.images[0]} title="START A PROJECT" text="Tell us about your project and we'll be in touch within 24 hours to arrange a call." align="right" />
    </>
  )
}

const studioTeam = [
  {
    name: 'Jogie',
    role: 'Executive Assistant to Judi Teran',
    image: img.studioDetail,
    text: "Jogie operates as a strategic partner to Judi Teran, driving alignment across the studio's priorities, operations, and client engagements. He oversees high-level coordination of schedules, communications, and project workflows, ensuring seamless execution and continuity across all touchpoints.",
  },
  {
    name: 'Nazia',
    role: 'Junior Designer + Architectural Drafter',
    image: img.teamOne,
    text: "Nazia brings technical expertise and creative support to the design team. She prepares detailed drawings, elevations, and permit-ready documents, while assisting in space planning, material boards, and design development.",
  },
  {
    name: 'Maja',
    role: 'Director of Finance & Business Operations',
    image: img.teamTwo,
    text: "Maja oversees the financial backbone of Iconica, managing bookkeeping, invoicing, procurement accounting, reconciliations, and internal systems. She ensures the business runs with clarity, accuracy, and efficiency.",
  },
]

const studioProcess = [
  {
    step: '01',
    title: 'Concept',
    text: 'Our process merges creativity and construction into one cohesive experience, blending artistry, organization, and trust at every stage.',
  },
  {
    step: '02',
    title: 'Development',
    text: 'Concept becomes form. Layouts evolve, materials are refined, and every decision is made to create balance, proportion, and atmosphere.',
  },
  {
    step: '03',
    title: 'Execution',
    text: 'We bring the design to life through precise coordination, project management, and craftsmanship, ensuring the result is as intentional as the vision.',
  },
]

function StudioPage() {
  return (
    <>
      <section className="grid border-b border-ink bg-porcelain md:grid-cols-[0.9fr_1.1fr]">
        <div className="flex items-start px-6 py-8 md:border-r md:px-14 md:py-9">
          <div className="max-w-[560px]">
            <p className="mb-5 text-[11px] uppercase tracking-[0.24em] text-olive">THE STUDIO</p>
            <h1 className="font-serif text-[17px] font-normal leading-[1.45]">
              Our work is rooted in craftsmanship, balance, and narrative.
            </h1>
          </div>
        </div>
        <div className="flex items-start px-6 py-8 md:px-14 md:py-9">
          <div className="max-w-[640px] space-y-5 text-[14px] font-normal leading-6 text-ink/75">
            <p>
              Every environment is composed with warmth and contrasting natural texture against architectural clarity, restraint paired with expression. We collaborate with a trusted network of artisans, builders, and makers who share our dedication to excellence and authenticity.
            </p>
            <p>Each space tells a story of material honesty, considered detail, and enduring design.</p>
          </div>
        </div>
      </section>

      <section className="grid border-b border-ink bg-porcelain md:grid-cols-[0.9fr_1.1fr]">
        <div className="flex items-center justify-center border-b border-ink px-6 py-14 md:min-h-[560px] md:border-b-0 md:border-r md:px-14">
          <div className="aspect-square w-[min(360px,72vw)] overflow-hidden rounded-full border border-ink/20 bg-bone shadow-sm md:w-[420px]">
            <img src={img.studioPortrait} alt="Judi Teran portrait" loading="lazy" decoding="async" className="h-full w-full object-cover object-top" />
          </div>
        </div>
        <div className="flex items-center px-6 py-14 md:px-14">
          <div className="max-w-[560px]">
            <p className="mb-5 text-[11px] uppercase tracking-[0.24em] text-olive">FOUNDER</p>
            <h2 className="font-serif text-[17px] font-normal leading-[1.45]">Judi Teran</h2>
            <p className="mt-7 text-[14px] font-normal leading-6 text-ink/75">
              With over a decade of experience, Judi Teran is known for creating bold, high-impact spaces that balance beauty, function, and meaning.
            </p>
            <p className="mt-5 text-[14px] font-normal leading-6 text-ink/75">
              Her work spans residential, commercial, and hospitality environments, each informed by her background in art, global travel, and a deep understanding of material composition. Respected for her refined aesthetic and structured approach, she leads projects with clarity and intention, ensuring every space feels both elevated and deeply personal.
            </p>
            <ScheduleButton className="mt-8" />
          </div>
        </div>
      </section>

      <section className="border-b border-ink bg-porcelain px-4 py-12 md:px-7 md:py-20">
        <div className="mx-auto max-w-[1480px]">
          <div className="mb-10 flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
            <h2 className="font-serif text-[17px] font-normal leading-[1.35]">THE TEAM</h2>
            <p className="max-w-[520px] text-[14px] font-normal leading-6 text-ink/65">
              A focused studio team supporting the creative, technical, and operational sides of each project.
            </p>
          </div>
          <div className="grid gap-10 md:grid-cols-3">
            {studioTeam.map((member) => (
              <article key={member.name} className="group text-center transition duration-300">
                <div className="mx-auto aspect-square w-[min(240px,70vw)] overflow-hidden rounded-full border border-ink/20 bg-bone shadow-sm md:w-[260px]">
                  <img src={member.image} alt={member.name} loading="lazy" decoding="async" className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.03]" />
                </div>
                <div className="mx-auto max-w-[380px] pt-6">
                  <p className="text-[11px] uppercase leading-5 tracking-[0.2em] text-olive">{member.role}</p>
                  <h3 className="mt-2 font-serif text-[17px] font-normal leading-[1.35]">{member.name}</h3>
                  <p className="mt-4 text-[14px] font-normal leading-6 text-ink/75">{member.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-ink bg-bone px-4 py-12 md:px-7 md:py-20">
        <div className="mx-auto max-w-[1480px]">
          <div className="mb-10 flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
            <h2 className="font-serif text-[17px] font-normal leading-[1.35]">OUR PROCESS</h2>
            <p className="max-w-[520px] text-[14px] font-normal leading-6 text-ink/65">
              Creativity and construction move together through a clear, considered process.
            </p>
          </div>
          <div className="grid gap-0 border border-ink/20 md:grid-cols-3">
            {studioProcess.map((item) => (
              <article key={item.step} className="border-b border-ink/20 bg-porcelain p-7 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
                <p className="text-[11px] uppercase tracking-[0.24em] text-olive">{item.step}</p>
                <h3 className="mt-5 font-serif text-[17px] font-normal leading-[1.35]">{item.title}</h3>
                <p className="mt-4 text-[14px] font-normal leading-6 text-ink/75">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ImageCallout image={img.edit} title="START A PROJECT" text="Tell us about your project and we'll be in touch within 24 hours to arrange a call." align="right" />
    </>
  )
}

function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <section className="grid border-b border-ink bg-porcelain md:grid-cols-[0.82fr_1.18fr]">
        <div className="flex items-start px-6 py-8 md:border-r md:px-14 md:py-9">
          <div className="max-w-[560px]">
            <p className="mb-5 text-[11px] uppercase tracking-[0.24em] text-olive">CONTACT</p>
            <h1 className="font-serif text-[17px] font-normal leading-[1.45]">
              Tell us about the space you want to create.
            </h1>
          </div>
        </div>
        <div className="flex items-start px-6 py-8 md:px-14 md:py-9">
          <div className="max-w-[640px] text-[14px] font-normal leading-6 text-ink/75">
            <p>
              Share a few project details and the studio will follow up with availability, next steps, and scheduling options.
            </p>
          </div>
        </div>
      </section>

      <section className="grid border-b border-ink bg-porcelain lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative min-h-[360px] border-b border-ink lg:min-h-[760px] lg:border-b-0 lg:border-r">
          <img src={img.hero} alt="Iconica Design Studio contact interior" decoding="async" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10" />
          <div className="image-copy relative flex min-h-[360px] items-end px-6 py-10 text-white md:px-14 lg:min-h-[760px]">
            <div className="max-w-[520px]">
              <p className="mb-4 text-[11px] uppercase tracking-[0.24em]">ICONICA DESIGN STUDIO</p>
              <p className="font-serif text-[17px] font-normal leading-[1.45] md:text-[25px]">
                Interior design, renovation planning, and design-build support.
              </p>
              <div className="mt-8 grid gap-3 text-[12px] uppercase tracking-[0.16em] text-white/85">
                <a href="mailto:info@iconicainteriordesign.com" className="hover:underline">info@iconicainteriordesign.com</a>
                <a href="https://www.instagram.com/iconicadesignstudio/" target="_blank" rel="noreferrer" className="hover:underline">@iconicadesignstudio</a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center px-6 py-12 md:px-14 md:py-16">
          <div className="w-full max-w-[720px]">
            <p className="mb-5 text-[11px] uppercase tracking-[0.24em] text-olive">PROJECT INQUIRY</p>
            {submitted ? (
              <div className="border border-ink bg-bone p-7">
                <p className="text-[11px] uppercase tracking-[0.22em]">REQUEST RECEIVED</p>
                <p className="mt-4 text-[14px] font-normal leading-6 text-ink/75">
                  Thank you. We will review your message and contact you with next steps.
                </p>
                <button type="button" onClick={() => setSubmitted(false)} className="mt-7 border border-ink px-6 py-3 text-[11px] uppercase tracking-[0.2em] hover:bg-ink hover:text-porcelain">
                  Send Another
                </button>
              </div>
            ) : (
              <form className="grid gap-4" onSubmit={handleSubmit}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="text-[11px] uppercase tracking-[0.18em]">
                    Name
                    <input required type="text" className="mt-2 w-full border border-ink bg-transparent px-3 py-3 text-[14px] font-normal normal-case tracking-normal outline-none focus:bg-white" />
                  </label>
                  <label className="text-[11px] uppercase tracking-[0.18em]">
                    Email
                    <input required type="email" className="mt-2 w-full border border-ink bg-transparent px-3 py-3 text-[14px] font-normal normal-case tracking-normal outline-none focus:bg-white" />
                  </label>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="text-[11px] uppercase tracking-[0.18em]">
                    Phone
                    <input type="tel" className="mt-2 w-full border border-ink bg-transparent px-3 py-3 text-[14px] font-normal normal-case tracking-normal outline-none focus:bg-white" />
                  </label>
                  <label className="text-[11px] uppercase tracking-[0.18em]">
                    Location
                    <input type="text" className="mt-2 w-full border border-ink bg-transparent px-3 py-3 text-[14px] font-normal normal-case tracking-normal outline-none focus:bg-white" />
                  </label>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="text-[11px] uppercase tracking-[0.18em]">
                    Project Type
                    <select required className="mt-2 w-full border border-ink bg-porcelain px-3 py-3 text-[14px] font-normal normal-case tracking-normal outline-none focus:bg-white">
                      <option value="">Select one</option>
                      <option>Residential design</option>
                      <option>Commercial design</option>
                      <option>Design-build</option>
                      <option>Renovation planning</option>
                      <option>Furniture sourcing</option>
                    </select>
                  </label>
                  <label className="text-[11px] uppercase tracking-[0.18em]">
                    Timeline
                    <select className="mt-2 w-full border border-ink bg-porcelain px-3 py-3 text-[14px] font-normal normal-case tracking-normal outline-none focus:bg-white">
                      <option>Flexible</option>
                      <option>Immediately</option>
                      <option>1-3 months</option>
                      <option>3-6 months</option>
                      <option>6+ months</option>
                    </select>
                  </label>
                </div>
                <label className="text-[11px] uppercase tracking-[0.18em]">
                  Message
                  <textarea required rows="6" className="mt-2 w-full resize-none border border-ink bg-transparent px-3 py-3 text-[14px] font-normal normal-case tracking-normal outline-none focus:bg-white" placeholder="Scope, goals, budget range, and anything useful to know..." />
                </label>
                <button type="submit" className="mt-2 border border-ink bg-ink px-7 py-3 text-[11px] uppercase tracking-[0.2em] text-porcelain hover:bg-transparent hover:text-ink">
                  Send Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

function Footer() {
  const links = [
    { label: 'Shop', href: '/shop' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Press', href: '/press' },
    { label: 'Studio', href: '/studio' },
    { label: 'Contact', href: '/contact' },
  ]
  return (
    <footer className="bg-ink px-4 py-12 text-porcelain md:px-7">
      <div className="mx-auto grid max-w-[1480px] gap-10 md:grid-cols-[1fr_1.2fr]">
        <div>
          <h2 className="font-serif text-[18px] tracking-[0.08em] sm:text-[31px] sm:tracking-[0.14em]">ICONICA DESIGN STUDIO</h2>
          <p className="mt-5 max-w-[420px] text-[14px] leading-6 text-porcelain/75">
            Timeless interiors. Tailored construction. Curated living.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <p className="mb-4 text-[11px] tracking-[0.22em]">INFORMATION</p>
            <div className="grid grid-cols-2 gap-3 text-[11px] tracking-[0.14em]">
              {links.map((link) => (
                <a key={link.label} href={link.href} className="hover:underline">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <form>
            <label className="block text-[11px] tracking-[0.22em]" htmlFor="footer-email">
              JOIN OUR NEWSLETTER
            </label>
            <div className="mt-5 flex flex-col border border-porcelain sm:flex-row">
              <input id="footer-email" type="email" placeholder="Email" className="min-w-0 flex-1 bg-transparent px-4 py-3 text-[14px] font-normal outline-none placeholder:text-porcelain/60" />
              <button className="border-t border-porcelain px-5 py-3 text-[11px] tracking-[0.16em] hover:bg-porcelain hover:text-ink sm:border-l sm:border-t-0">SUBSCRIBE</button>
            </div>
          </form>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-[1480px] border-t border-porcelain/30 pt-6 text-[11px] tracking-[0.14em] text-porcelain/70">
        (C) 2026 Iconica Design Studio | Design + Build + Curate | info@iconicainteriordesign.com | Instagram @iconicadesignstudio | IDCO
      </div>
    </footer>
  )
}

function App() {
  const { isVisible, progress, startLoader } = usePageLoader()
  const [path, setPath] = useState(window.location.pathname)
  useSmoothReveals()

  useEffect(() => {
    function handleInternalLink(event) {
      const link = event.target.closest('a[href]')

      if (!link) {
        return
      }

      const href = link.getAttribute('href')
      const target = link.getAttribute('target')

      if (target || !href) {
        return
      }

      if (href === '#') {
        event.preventDefault()
        startLoader(400)
        window.setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }, 120)
        return
      }

      if (href.startsWith('/') && href !== window.location.pathname) {
        event.preventDefault()
        startLoader(350)
        window.history.pushState({}, '', href)
        setPath(window.location.pathname)
        window.setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }, 80)
      }
    }

    document.addEventListener('click', handleInternalLink)

    return () => document.removeEventListener('click', handleInternalLink)
  }, [startLoader])

  useEffect(() => {
    function handlePopState() {
      setPath(window.location.pathname)
    }

    window.addEventListener('popstate', handlePopState)

    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const isStudioPage = path.replace(/\/$/, '') === '/studio'
  const isPortfolioPage = path.replace(/\/$/, '') === '/portfolio'
  const isPressPage = path.replace(/\/$/, '') === '/press'
  const isShopPage = path.replace(/\/$/, '') === '/shop'
  const isContactPage = path.replace(/\/$/, '') === '/contact'
  const projectSlug = path.match(/^\/portfolio\/([^/]+)\/?$/)?.[1]
  const productSlug = path.match(/^\/shop\/([^/]+)\/?$/)?.[1]
  const activeProject = portfolioProjects.find((project) => project.slug === projectSlug)
  const activeProduct = shopProducts.find((product) => product.slug === productSlug)

  return (
    <>
      <LoadingScreen isVisible={isVisible} progress={progress} />
      <main className="min-h-screen bg-porcelain text-ink">
        <ConsultationWidget />
        <Header />
        {projectSlug ? (
          <ProjectPage project={activeProject} />
        ) : productSlug ? (
          <ProductPage product={activeProduct} />
        ) : isPortfolioPage ? (
          <PortfolioPage />
        ) : isPressPage ? (
          <PressPage />
        ) : isShopPage ? (
          <ShopPage />
        ) : isContactPage ? (
          <ContactPage />
        ) : isStudioPage ? (
          <StudioPage />
        ) : (
          <>
            <Hero />
            <FeatureRow />
            <ImageCallout
              image={img.canoa}
              title="THE STUDIO"
              text="A multidisciplinary studio creating spaces that embody modern luxury and intentional living. Explore the residential and commercial work that reflects our integrated approach to design and build."
              href="/portfolio"
            />
            <FeaturedProducts />
            <ImageCallout image={img.trade} title="READY TO START YOUR PROJECT?" text="Let's talk about what you have in mind." align="right" />
            <Press />
            <ImageCallout image={img.edit} title="CURATED LIVING" text="Every project is a reflection of lifestyle curated, elevated, and built to endure." />
            <InstagramSection />
          </>
        )}
        <Footer />
      </main>
    </>
  )
}

createRoot(document.getElementById('root')).render(<App />)
