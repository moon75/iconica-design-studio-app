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
  jogie: '/images/jogie%20picture.jpg',
}

const nav = [
  { label: 'PORTFOLIO', href: '/portfolio' },
  { label: 'SHOP', href: '/shop' },
  { label: 'PRESS', href: '/press' },
  { label: 'BLOG', href: '/blog' },
  { label: 'SERVICES', href: '/services' },
  { label: 'STUDIO', href: '/studio' },
  { label: 'CONTACT', href: '/contact' },
]

const studioServices = [
  {
    slug: 'residential',
    name: 'Residential Interior Design',
    category: 'Residential',
    image: '/images/optimized/IMG_8125.JPG',
    summary:
      'Full-scope interiors for primary homes, secondary residences, and pied-à-terres. We shape layouts, finishes, and furnishings around how the home is actually lived in.',
    deliverables: ['Concept direction', 'Floor plans + elevations', 'Finishes + material specification', 'Furniture + lighting plan', 'On-site coordination'],
  },
  {
    slug: 'commercial',
    name: 'Commercial & Hospitality',
    category: 'Commercial',
    image: '/images/optimized/IMG_0141.JPG',
    summary:
      'Boutique commercial interiors for hospitality, retail, and creative office. Built to hold daily use while maintaining a strong material and experiential point of view.',
    deliverables: ['Brand-led concept', 'Tenant + landlord coordination', 'FF&E specification', 'Construction documentation', 'Install + styling'],
  },
  {
    slug: 'design-build',
    name: 'Design + Build Coordination',
    category: 'Design + Build',
    image: '/images/optimized/IMG_8122.JPG',
    summary:
      'A single point of accountability across design and construction. We bridge architects, contractors, and trades so the built result matches the drawn intent.',
    deliverables: ['Trade vetting + onboarding', 'Construction administration', 'Site walks + punch lists', 'Schedule + budget tracking', 'Final closeout'],
  },
  {
    slug: 'renovation-planning',
    name: 'Renovation Planning',
    category: 'Renovation',
    image: '/images/optimized/IMG_3274.JPG',
    summary:
      'For owners of older homes who want a clear plan before opening walls. We translate ambitions into a phased, costed scope you can move forward on with confidence.',
    deliverables: ['Existing conditions review', 'Scope definition + phasing', 'Permit pathway guidance', 'Preliminary budget framing', 'Trade introductions'],
  },
  {
    slug: 'furniture-sourcing',
    name: 'Furniture + Lighting Sourcing',
    category: 'Sourcing',
    image: '/images/optimized/IMG_0142.JPG',
    summary:
      'Curated sourcing for clients who have the architecture handled and need the layered, livable pieces that finish the room. Trade pricing where available.',
    deliverables: ['Room-by-room edits', 'Vendor + lead-time research', 'Trade pricing pass-through', 'Procurement + tracking', 'White-glove install'],
  },
  {
    slug: 'styling',
    name: 'Styling + Photo Preparation',
    category: 'Styling',
    image: '/images/optimized/IMG_9907.JPG',
    summary:
      'Final-layer styling for completed homes, listings, and editorial features. Objects, art, greenery, and arrangement decisions that let the architecture read clearly.',
    deliverables: ['Pre-shoot walkthrough', 'Objects + art sourcing', 'On-day styling team', 'Photographer coordination', 'Reset to live-in state'],
  },
]

const serviceProcess = [
  {
    step: '01',
    title: 'Discovery',
    text: 'We start with a focused conversation about the space, the people in it, and the constraints around the project. No deliverables yet — just shared understanding.',
  },
  {
    step: '02',
    title: 'Proposal',
    text: 'A written scope of work outlining phases, deliverables, fees, and what each side is responsible for. Nothing begins until this is mutually signed.',
  },
  {
    step: '03',
    title: 'Design',
    text: 'Concept, layout, and material direction developed in rounds. We present in person where possible, and document everything for downstream trades.',
  },
  {
    step: '04',
    title: 'Delivery',
    text: 'Procurement, construction administration, site coordination, and install. The studio stays involved through final closeout and styling.',
  },
]

const pressFeatures = [
  {
    publication: 'San Carlos Life',
    title: 'Interior Design Advice For Your San Carlos Home',
    date: 'May 23, 2025',
    type: 'Interview',
    url: 'https://sancarloslife.com/interior-design-advice-for-your-san-carlos-home/',
    image: '/images/press/sanscarlos life .png',
    excerpt:
      "San Carlos Life caught up with local interior designer Judi Teran to discuss thoughtful, modern interiors, trend direction, and how homeowners can create spaces that feel current, enduring, personal, and livable.",
  },
  {
    publication: 'San Carlos Business Networking Group',
    title: 'Judi Teran Member Profile',
    date: 'Member since 2025',
    type: 'Professional Profile',
    url: 'https://scbng.org/members/judi-teran',
    image: '/images/press/sanscarlos business .png',
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
      className={`inline-flex border-0 bg-transparent p-0 text-[11px] font-normal uppercase tracking-[0.18em] text-ink underline underline-offset-4 hover:text-ink/65 ${className}`}
    >
      Schedule Consultation
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

function useSmoothReveals(path) {
  useEffect(() => {
    const animatedElements = document.querySelectorAll('section, footer, article, .reveal-item')
    animatedElements.forEach((element) => {
      element.classList.remove('reveal-visible')
      element.classList.add('reveal-ready')
    })

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
  }, [path])
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
        className="schedule-consult schedule-consult--side fixed left-0 top-1/2 z-40 hidden origin-left -translate-y-1/2 border-0 bg-transparent px-2 py-4 sm:block sm:px-3 sm:py-5"
        aria-label="Schedule a consultation"
      >
        <span className="[writing-mode:vertical-rl] rotate-180">Schedule Consultation</span>
      </button>
      <button
        type="button"
        onClick={openConsultationForm}
        className="schedule-consult schedule-consult--bottom fixed bottom-4 left-4 right-4 z-40 border-0 bg-transparent px-4 py-3 sm:hidden"
        aria-label="Schedule a consultation"
      >
        Schedule Consultation
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 px-4 py-6 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="consultation-title">
          <div className="relative max-h-[92vh] w-full max-w-[780px] overflow-y-auto bg-porcelain shadow-2xl">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-3 top-3 z-10 border border-ink bg-porcelain p-2 text-ink hover:bg-bone sm:right-4 sm:top-4"
              aria-label="Close consultation form"
            >
              <X size={18} strokeWidth={1.5} />
            </button>
            <h2 id="consultation-title" className="sr-only">Consultation Request</h2>

            <div className="grid md:grid-cols-[0.74fr_1fr]">
              <div className="hidden min-h-[520px] bg-ink px-10 py-12 text-porcelain md:flex md:flex-col md:justify-between">
                <div>
                  <p className="text-[11px] uppercase leading-5 tracking-[0.42em] text-porcelain/45">ICONICA DESIGN STUDIO</p>
                  <h2 className="mt-10 font-serif text-[34px] font-normal leading-[1.2] tracking-normal">
                    Let's shape <span className="italic text-porcelain/55">your vision</span>
                  </h2>
                  <p className="mt-8 max-w-[230px] text-[14px] font-normal leading-7 text-porcelain/55">
                    Tell us about your project and we'll be in touch within 24 hours to arrange a call.
                  </p>
                </div>
                <p className="text-[11px] uppercase leading-5 tracking-[0.24em] text-porcelain/35">Complimentary. No obligation.</p>
              </div>
              <div className="px-6 py-8 pt-14 sm:px-10 sm:py-12">
                <div className="md:hidden">
                  <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-olive">Consultation Request</p>
                  <h2 className="font-serif text-[24px] font-normal leading-[1.25]">
                    Let's shape your vision
                  </h2>
                  <p className="mt-4 text-[14px] leading-6 text-ink/65">
                    Tell us about your project and we'll be in touch within 24 hours.
                  </p>
                </div>
                <p className="mb-7 hidden text-[11px] uppercase tracking-[0.32em] text-ink/55 md:block">Consultation Request</p>

                {submitted ? (
                  <div className="mt-8 border border-ink/15 bg-bone p-6 md:mt-0">
                    <p className="text-[11px] uppercase tracking-[0.22em]">Request Received</p>
                    <p className="mt-4 text-[14px] font-normal leading-6 text-ink/70">
                      Thank you. We will review your consultation request and contact you with scheduling options.
                    </p>
                    <button type="button" onClick={() => setIsOpen(false)} className="mt-6 border border-ink px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-ink hover:bg-bone">
                      Close
                    </button>
                  </div>
                ) : (
                  <form className="mt-8 grid gap-6 md:mt-0" onSubmit={handleSubmit}>
                    <label className="text-[11px] uppercase tracking-[0.24em] text-ink/55">
                      Your Name
                      <input required type="text" placeholder="Full name" className="mt-3 w-full border-0 border-b border-ink/20 bg-transparent px-0 py-2 text-[15px] font-normal normal-case tracking-normal text-ink outline-none placeholder:text-ink/30 focus:border-ink" />
                    </label>
                    <label className="text-[11px] uppercase tracking-[0.24em] text-ink/55">
                      Email Address
                      <input required type="email" placeholder="you@email.com" className="mt-3 w-full border-0 border-b border-ink/20 bg-transparent px-0 py-2 text-[15px] font-normal normal-case tracking-normal text-ink outline-none placeholder:text-ink/30 focus:border-ink" />
                    </label>
                    <label className="text-[11px] uppercase tracking-[0.24em] text-ink/55">
                      Phone <span className="tracking-[0.18em]">(Optional)</span>
                      <input type="tel" placeholder="+1 000 000 0000" className="mt-3 w-full border-0 border-b border-ink/20 bg-transparent px-0 py-2 text-[15px] font-normal normal-case tracking-normal text-ink outline-none placeholder:text-ink/30 focus:border-ink" />
                    </label>
                    <label className="text-[11px] uppercase tracking-[0.24em] text-ink/55">
                      Project Type
                      <select required className="mt-3 w-full border-0 border-b border-ink/20 bg-transparent px-0 py-2 text-[15px] font-normal normal-case tracking-normal text-ink outline-none focus:border-ink">
                        <option value="">Select a service</option>
                        <option>Residential design</option>
                        <option>Commercial design</option>
                        <option>Design-build consultation</option>
                        <option>Renovation planning</option>
                      </select>
                    </label>
                    <button type="submit" className="mt-2 border border-ink px-7 py-5 text-[11px] uppercase tracking-[0.32em] text-ink hover:bg-bone">
                      Send Request <span className="ml-4 text-[16px] leading-none">-&gt;</span>
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
    <header className="fixed left-0 right-0 top-0 z-30 bg-[#fbfaf7]/95 text-[#2b2a26] backdrop-blur">
      <div className="flex h-[62px] w-full items-center gap-4 px-5 sm:px-7 lg:px-10">
        <a href="/" className="min-w-0 flex-1 truncate font-serif text-[17px] font-normal uppercase tracking-[0.1em] text-ink lg:flex-none">
          ICONICA DESIGN STUDIO
        </a>
        <nav className="hidden flex-1 flex-wrap justify-center gap-x-6 gap-y-2 text-[12px] font-normal uppercase tracking-[0.14em] text-ink/65 xl:flex">
          {nav.map((item) => (
            <a key={item.label} href={item.href} className="hover:text-ink hover:underline hover:underline-offset-4">
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
        <div className="flex shrink-0 items-center justify-end gap-4 text-ink/75">
          <a href="/shop" className="hidden sm:block" aria-label="Search">
            <Search size={19} strokeWidth={1.6} />
          </a>
          <a href="/contact" className="hidden md:block" aria-label="Account">
            <UserRound size={19} strokeWidth={1.6} />
          </a>
          <a href="/shop" aria-label="Shop">
            <ShoppingBag size={19} strokeWidth={1.6} />
          </a>
        </div>
      </div>
      {mobileMenuOpen && (
        <nav className="grid border-t border-ink/10 px-5 py-4 text-[11px] uppercase tracking-[0.16em] xl:hidden">
          {nav.map((item) => (
            <a key={item.label} href={item.href} className="border-b border-ink/10 py-3 last:border-b-0" onClick={() => setMobileMenuOpen(false)}>
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
    <section className="relative min-h-[610px] overflow-hidden bg-bone md:min-h-[760px]">
      <img src={img.hero} alt="Iconica Design Studio interior project" decoding="async" fetchPriority="high" className="hero-image absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative mx-auto flex min-h-[610px] max-w-[1480px] items-center justify-center px-6 text-center text-white md:min-h-[760px] md:px-10">
        <div className="image-copy max-w-[760px]">
          <div className="hero-rise">
            <h1 className="font-serif text-[17px] font-normal uppercase leading-[1.45] tracking-[0.08em]">
              WELCOME TO ICONICA DESIGN
            </h1>
            <p className="mt-3 text-[14px] font-normal uppercase leading-[1.5] tracking-[0.08em]">
              COMMERCIAL & RESIDENTIAL INTERIOR DESIGN STUDIO
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function FeatureRow() {
  return (
    <section className="bg-[#fbfaf7] px-6 py-10 sm:px-10 md:py-12 lg:px-7">
      <div className="mx-auto grid max-w-[1100px] gap-8 md:grid-cols-[minmax(0,0.98fr)_minmax(280px,0.82fr)] md:items-center md:gap-9">
        <div className="overflow-hidden bg-bone">
          <img src={img.bowl} alt="Iconica Design Studio project detail" loading="lazy" decoding="async" className="aspect-square h-full w-full object-cover" />
        </div>
        <div className="flex items-center bg-[#fbfaf7] md:min-h-[510px]">
          <div className="max-w-[560px]">
            <p className="mb-4 !font-serif !text-[16px] !leading-[1.35] font-normal uppercase tracking-[0.12em] text-ink/75">DESIGN + BUILD</p>
            <h2 className="!font-serif !text-[16px] !leading-[1.45] font-normal tracking-[0.02em] text-ink/75">
              Residential and boutique commercial interiors rooted in atmosphere, materiality, and experience.
            </h2>
            <a href="/studio" className="mt-6 inline-block text-[11px] uppercase tracking-[0.16em] text-ink underline underline-offset-4 decoration-1">
              About the studio
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function ImageCallout({ image, title, text, align = 'left', href = '#', height = 'tall', cta }) {
  const heightClass =
    height === 'short'
      ? 'min-h-[200px] md:min-h-[260px]'
      : height === 'medium'
        ? 'min-h-[360px] md:min-h-[480px]'
        : 'min-h-[520px] md:min-h-[760px]'
  const copyAlign = 'items-center justify-center text-center'
  const copyPadding =
    height === 'short' ? 'px-6 py-6 md:py-8' : height === 'medium' ? 'px-6 py-10 md:py-12' : 'px-6 py-12 md:py-16'

  return (
    <section className={`relative overflow-hidden bg-bone ${heightClass}`}>
      <img src={image} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/55" />
      <div className={`relative mx-auto flex max-w-[1440px] ${heightClass} ${copyAlign} ${copyPadding}`}>
        <a href={href} className="image-copy max-w-[440px] text-white">
          <h3 className="mb-3 uppercase tracking-[0.12em]">{title}</h3>
          <p className="text-[14px] leading-6">{text}</p>
          {cta && (
            <span className="mt-5 inline-flex text-[11px] uppercase tracking-[0.2em] text-white underline underline-offset-4">
              {cta}
            </span>
          )}
        </a>
      </div>
    </section>
  )
}

function FeaturedProducts() {
  const featuredProducts = shopProducts.filter((product) => product.featured).slice(0, 4)
  const editorialItems = featuredProducts.slice(0, 3)

  return (
    <section className="bg-[#fbfaf7] px-6 py-12 sm:px-10 md:py-14 lg:px-7">
      <div className="mx-auto max-w-[1100px]">
        <div>
          <h2 className="mb-9 text-center font-serif text-[20px] font-normal uppercase leading-[1.35] tracking-[0.12em] text-ink/70">Featured Furniture + Objects</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {editorialItems.map((product) => (
              <article key={product.name} className="group">
                <a href={`/shop/${product.slug}`} className="block aspect-[1.05] overflow-hidden bg-bone">
                  <img src={product.image} alt={product.name} loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
                </a>
                <div className="pt-5">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-olive">{product.category}</p>
                  <h3 className="mt-3 font-serif text-[20px] font-normal uppercase leading-[1.35]">{product.name}</h3>
                  <p className="mt-3 text-[14px] font-normal leading-6 text-ink/65">{product.detail}</p>
                  <a href={`/shop/${product.slug}`} className="mt-4 inline-flex text-[10px] uppercase tracking-[0.16em] underline underline-offset-4">
                    View
                  </a>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href="/shop" className="text-[10px] uppercase tracking-[0.2em] underline underline-offset-4">
              Shop Collection
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Press() {
  const logos = ['AD', 'Palo Alto Daily', 'apartment therapy', 'design milk']

  return (
    <section className="bg-[#fbfaf7] px-6 py-14 sm:px-10 md:py-16 lg:px-7">
      <div className="mx-auto max-w-[1100px] text-center">
        <p className="mb-10 text-[11px] font-normal uppercase tracking-[0.22em] text-ink/55">AS SEEN IN</p>
        <div className="grid items-center gap-8 text-ink/80 sm:grid-cols-4">
          {logos.map((logo, index) => (
            <a key={logo} href={pressFeatures[index % pressFeatures.length].url} target="_blank" rel="noreferrer" className="font-serif text-[24px] font-normal leading-none sm:text-[30px]">
              {logo}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function HomeEditSection() {
  return (
    <section className="relative min-h-[300px] overflow-hidden bg-bone md:min-h-[420px]">
      <img src={img.edit} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/25" />
      <div className="relative mx-auto flex min-h-[300px] max-w-[1440px] items-center justify-center px-6 py-10 text-center text-white sm:px-9 md:min-h-[420px] md:px-14 md:py-14">
        <a href="/portfolio" className="image-copy max-w-[640px]">
          <p className="mb-3 font-serif text-[20px] font-normal uppercase leading-[1.35] tracking-[0.12em]">CURATED LIVING</p>
          <h3 className="text-[14px] font-normal leading-6">
            Every project is a reflection of lifestyle curated, elevated, and built to endure.
          </h3>
        </a>
      </div>
    </section>
  )
}

function InstagramSection() {
  return (
    <section className="border-b border-ink bg-porcelain px-4 py-12 md:px-7 md:py-16">
      <div className="mx-auto max-w-[1480px]">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-olive">INSTAGRAM</p>
            <h2 className="font-serif text-[16px] font-normal uppercase tracking-[0.04em] leading-[1.35]">@ICONICADESIGNSTUDIO</h2>
          </div>
          <a href="https://www.instagram.com/iconicadesignstudio/" target="_blank" rel="noreferrer" className="text-[10px] uppercase tracking-[0.2em] underline underline-offset-4">
            Follow on Instagram
          </a>
        </div>
        <div className="-mx-4 flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:snap-none sm:grid-cols-6 sm:gap-2 sm:overflow-visible sm:px-0 sm:pb-0">
          {instagramPosts.map((post, index) => (
            <a
              key={post}
              href="https://www.instagram.com/iconicadesignstudio/"
              target="_blank"
              rel="noreferrer"
              className="group aspect-square w-[70%] min-w-[70%] shrink-0 snap-start overflow-hidden border border-ink/10 bg-bone sm:w-auto sm:min-w-0 sm:shrink"
            >
              <img src={post} alt={`Iconica Design Studio Instagram post ${index + 1}`} loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]" />
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
      <section className="bg-[#fbfaf7] px-6 pt-16 pb-12 text-center sm:px-10 md:px-14 md:pt-24 md:pb-16">
        <div className="mx-auto max-w-[1220px]">
          <p className="font-serif text-[20px] font-normal uppercase leading-[1.35] tracking-[0.18em] text-ink">AS SEEN IN</p>
        </div>
      </section>

      <section className="bg-[#fbfaf7] px-6 pb-20 sm:px-10 md:px-14 md:pb-28">
        <div className="mx-auto flex max-w-[1220px] flex-wrap justify-center gap-x-20 gap-y-20 lg:gap-x-28">
          {pressFeatures.map((feature, index) => (
            <article key={feature.url} className="group w-[min(270px,100%)]">
              <a href={feature.url} target="_blank" rel="noreferrer" className="block h-[390px] overflow-hidden bg-[#fbfaf7]">
                <img src={feature.image} alt={feature.publication} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.02]" />
              </a>
              <div className="mt-9 text-left">
                <h2 className="text-[15px] font-semibold uppercase leading-5 tracking-[0.03em] text-ink">{feature.publication}</h2>
                <p className="mt-2 text-[14px] font-normal uppercase leading-5 tracking-normal text-ink/70">{feature.date}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="hidden border-b border-ink bg-porcelain md:grid-cols-[0.9fr_1.1fr]">
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
              Iconica Design Studioâ€™s press presence reflects Judi Teranâ€™s perspective on timeless interiors, thoughtful execution, and residential spaces designed with clarity, beauty, and purpose.
            </p>
          </div>
        </div>
      </section>

      <section className="hidden border-b border-ink bg-porcelain md:grid-cols-2">
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

      <section className="hidden border-b border-ink bg-bone px-4 py-12 md:px-7 md:py-20">
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

      <ImageCallout image={img.trade} title="PRESS INQUIRIES" text="For interviews, features, and media requests, contact Iconica Design Studio." align="right" height="short" href="/contact" cta="Contact Studio" />
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
      <section className="border-b border-ink bg-porcelain px-6 py-8 md:px-14 md:py-9">
        <div className="mx-auto max-w-[1480px]">
          <p className="mb-5 text-[11px] uppercase tracking-[0.24em] text-olive">SHOP</p>
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
              <p className="text-[11px] uppercase tracking-[0.24em] text-olive">FEATURED STUDIO PICKS</p>
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
                  <h3 className="mt-3 font-serif text-[17px] font-normal uppercase leading-[1.35]">{product.name}</h3>
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
          <div className="mb-8 flex flex-col justify-end gap-5 lg:flex-row lg:items-end">
            <div className="grid w-full grid-cols-2 border border-ink/20 sm:flex sm:w-auto sm:flex-wrap">
              {shopCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`border-r border-t border-ink/20 px-3 py-3 text-[10px] uppercase tracking-[0.12em] first:border-t-0 sm:border-t-0 sm:px-4 sm:tracking-[0.18em] sm:last:border-r-0 ${activeCategory === category ? 'bg-bone text-ink' : 'bg-porcelain text-ink hover:bg-bone'}`}
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
                    <h3 className="mt-3 font-serif text-[17px] font-normal uppercase leading-[1.35]">{product.name}</h3>
                    <p className="mt-4 text-[14px] leading-6 text-ink/75">{product.detail}</p>
                  </div>
                  <div className="mt-6 flex items-center justify-between gap-4 border-t border-ink/15 pt-4">
                    <span className="text-[12px] tracking-[0.16em]">{product.price}</span>
                    <a href={`/shop/${product.slug}`} className="border border-ink px-4 py-2 text-[10px] uppercase tracking-[0.16em] hover:bg-bone">
                      View
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ImageCallout image={img.edit} title="SOURCING SUPPORT" text="Looking for a specific piece? Our studio can source furniture, lighting, and materials for your project." align="right" height="short" href="/contact" cta="Request Sourcing" />
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
            <h1 className="font-serif text-[22px] font-normal uppercase leading-[1.25] md:text-[34px]">{product.name}</h1>
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
              <button type="button" onClick={openConsultationForm} className="border border-ink px-5 py-3 text-[10px] uppercase tracking-[0.14em] text-ink hover:bg-bone sm:px-7 sm:tracking-[0.2em]">
                Request This Piece
              </button>
              <a href="/shop" className="border border-ink px-5 py-3 text-center text-[10px] uppercase tracking-[0.14em] hover:bg-bone sm:px-7 sm:tracking-[0.2em]">
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
                  <h3 className="mt-3 font-serif text-[17px] font-normal uppercase leading-[1.35]">{item.name}</h3>
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

const blogPosts = [
  {
    slug: 'introducing-the-latch-key',
    title: 'Introducing The Latch Key: Forms That Hold Presence',
    category: 'Objects',
    date: 'May 2026',
    author: 'Iconica Design Studio',
    readTime: '4 min read',
    excerpt:
      'A quiet study in sculptural objects, natural branches, and the kind of forms that bring structure and presence to a room.',
    image: img.storyOne,
    body: [
      'Objects are often the smallest pieces in a room, but they can hold the clearest point of view. Shape, patina, scale, and negative space all affect how a composition settles.',
      'We look for pieces that feel grounded without feeling heavy: vessels with irregular surfaces, greenery with natural movement, and materials that contrast clean architecture.',
      'The result is a room that feels collected over time, with enough restraint for the strongest pieces to breathe.',
    ],
  },
  {
    slug: 'vesta-ceramic-lamp',
    title: 'The Vesta Ceramic Lamp - Lighting By Canoa Lab',
    category: 'Lighting',
    date: 'April 2026',
    author: 'Iconica Design Studio',
    readTime: '5 min read',
    excerpt:
      'A behind-the-scenes look at sculptural ceramic lamps, soft illumination, and lighting choices that add warmth without visual noise.',
    image: img.storyTwo,
    body: [
      'Lighting is one of the fastest ways to change the emotional temperature of a space. A ceramic base, a linen shade, and a low glow can make a room feel settled immediately.',
      'We prefer lamps that act like quiet sculpture: useful, tactile, and strong enough to stand alone on a shelf, console, or bedside table.',
      'When layered with architectural lighting, these smaller pieces soften the edges of a room and make the design feel more personal.',
    ],
  },
  {
    slug: 'year-of-the-horse',
    title: 'The Year Of The Horse',
    category: 'Studio Notes',
    date: 'March 2026',
    author: 'Iconica Design Studio',
    readTime: '3 min read',
    excerpt:
      'A sculptural arrangement celebrating movement, renewal, and natural elements woven into an interior gesture.',
    image: img.storyThree,
    body: [
      'Seasonal arrangements do not need to feel temporary or decorative. With the right materials, they can become part of the architecture of a room.',
      'Branches, seed pods, vessels, and weathered surfaces create movement without relying on color alone. The effect is restrained, but still expressive.',
      'These compositions are a reminder that interiors can hold ritual, memory, and a sense of time passing.',
    ],
  },
  {
    slug: 'material-notes-travertine',
    title: 'Material Notes: Travertine, Grain, And Quiet Weight',
    category: 'Materials',
    date: 'February 2026',
    author: 'Iconica Design Studio',
    readTime: '4 min read',
    excerpt:
      'A look at stone, wood, and tonal restraint as tools for building rooms that feel calm, grounded, and lasting.',
    image: img.canoa,
    body: [
      'Material selection begins with feeling. Before a finish is specified, we look at how it will hold light, age with use, and sit next to the other textures in the room.',
      'Travertine, walnut, linen, plaster, and aged metal each carry a different kind of weight. The work is in balancing them so no single note overwhelms the room.',
      'When the palette is restrained, proportion and surface become more important. Small decisions start to carry the design.',
    ],
  },
  {
    slug: 'how-we-layer-a-room',
    title: 'How We Layer A Room Without Overworking It',
    category: 'Process',
    date: 'January 2026',
    author: 'Iconica Design Studio',
    readTime: '5 min read',
    excerpt:
      'Layering is less about adding more and more about choosing the right contrast between structure, softness, objects, and light.',
    image: img.trade,
    body: [
      'A finished room should feel complete, but not crowded. We start with architectural clarity, then add softness, texture, art, lighting, and objects in measured passes.',
      'Each layer has a role. Some pieces anchor the composition. Others soften it. The best rooms let both kinds of pieces work without competing.',
      'Editing is as important as sourcing. Removing one object can make the strongest material or silhouette easier to see.',
    ],
  },
  {
    slug: 'console-styling-study',
    title: 'A Quiet Guide To Console Styling',
    category: 'Styling',
    date: 'December 2025',
    author: 'Iconica Design Studio',
    readTime: '3 min read',
    excerpt:
      'Vessels, books, branches, and negative space can turn a simple console into a composed architectural moment.',
    image: img.edit,
    body: [
      'Console styling works best when it responds to the wall, the floor, and the sightline around it. It is not a separate decorative exercise.',
      'We like a mix of vertical movement, low grounded pieces, and a little empty space. That breathing room keeps the composition from feeling staged.',
      'A single branch, a heavy vessel, or a stack of books can be enough when the scale is right.',
    ],
  },
]

function BlogSection() {
  return (
    <section className="border-b border-ink bg-[#fbfaf7] px-4 py-12 md:px-7 md:py-16">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-9 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-olive">FROM THE STUDIO</p>
          </div>
          <a href="/blog" className="text-[10px] uppercase tracking-[0.2em] underline underline-offset-4">
            Read the Blog
          </a>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {blogPosts.map((post) => (
            <article key={post.slug} className="group">
              <a href={`/blog/${post.slug}`} className="block aspect-[4/3] overflow-hidden border border-ink/15 bg-bone">
                <img src={post.image} alt={post.title} loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
              </a>
              <div className="pt-5">
                <p className="text-[10px] uppercase tracking-[0.2em] text-olive">{post.category} / {post.date}</p>
                <h3 className="mt-3 font-serif text-[18px] font-normal leading-[1.35]">{post.title}</h3>
                <p className="mt-3 text-[14px] font-normal leading-6 text-ink/70">{post.excerpt}</p>
                <a href={`/blog/${post.slug}`} className="mt-4 inline-flex text-[10px] uppercase tracking-[0.18em] underline underline-offset-4">
                  Read More
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function BlogPage() {
  return (
    <>
      <section className="blog-page bg-[#fbfaf7] px-6 py-14 sm:px-10 md:px-14 md:py-20">
        <div className="mx-auto max-w-[980px] text-center">
          <p className="mb-3 text-[11px] font-normal uppercase tracking-[0.22em] text-ink/55">BLOG</p>
          <h1 className="font-serif text-[16px] font-normal leading-[1.45] tracking-[0.04em] text-ink">STORIES</h1>
          <div className="blog-intro mx-auto mt-6 max-w-[640px] space-y-4 text-[14px] font-normal leading-6 text-ink/70">
            <p>
              ICONICA DESIGN STUDIO collects notes on interiors, objects, materiality, and the quiet details that shape how a room feels. These stories trace the studio's approach to balance, contrast, atmosphere, and enduring design.
            </p>
            <p>
              Browse our <a href="/shop" className="underline underline-offset-4">shop collection</a> and <a href="/portfolio" className="underline underline-offset-4">selected project work</a>.
            </p>
          </div>
        </div>
      </section>

      <section className="blog-page bg-[#fbfaf7] px-6 pb-16 sm:px-12 md:px-20 md:pb-24 lg:px-32">
        <div className="mx-auto max-w-[860px]">
          <div className="grid gap-x-6 gap-y-12 md:grid-cols-3">
            {blogPosts.map((post) => (
              <article key={post.slug} className="group">
                <a href={`/blog/${post.slug}`} className="block aspect-[1.04] overflow-hidden bg-bone">
                  <img src={post.image} alt={post.title} loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
                </a>
                <div className="pt-5">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-olive">{post.category} / {post.date}</p>
                  <h2 className="mt-3 font-serif text-[16px] font-normal leading-[1.4] tracking-[0.02em] text-ink">{post.title}</h2>
                  <p className="mt-3 text-[14px] font-normal leading-6 text-ink/70">{post.excerpt}</p>
                  <a href={`/blog/${post.slug}`} className="mt-4 inline-flex text-[11px] uppercase tracking-[0.2em] text-ink underline underline-offset-4">
                    Read More
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function BlogPostPage({ post }) {
  if (!post) {
    return (
      <section className="bg-[#fbfaf7] px-5 py-20 md:px-7">
        <div className="mx-auto max-w-[900px]">
          <p className="mb-5 text-[11px] uppercase tracking-[0.22em] text-olive">BLOG</p>
          <h1 className="font-serif text-[16px] font-normal leading-[1.45] text-ink">Article not found.</h1>
          <a href="/blog" className="mt-7 inline-flex text-[11px] uppercase tracking-[0.2em] text-ink underline underline-offset-4">
            Back to Blog
          </a>
        </div>
      </section>
    )
  }

  const relatedPosts = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 2)

  return (
    <>
      <section className="relative min-h-[320px] bg-bone md:min-h-[440px]">
        <img src={post.image} alt={post.title} decoding="async" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/45 to-black/20" />
        <div className="relative mx-auto flex min-h-[320px] max-w-[1100px] items-center justify-center px-5 py-10 text-center text-white sm:px-6 md:min-h-[440px] md:px-14 md:py-14">
          <div className="image-copy max-w-[640px]">
            <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-white/85">{post.category} / {post.date}</p>
            <h1 className="font-serif text-[16px] font-normal leading-[1.45] tracking-[0.04em]">{post.title}</h1>
          </div>
        </div>
      </section>

      <section className="bg-[#fbfaf7] px-6 py-12 md:px-14 md:py-16">
        <div className="mx-auto grid max-w-[1100px] gap-10 md:grid-cols-[0.32fr_0.68fr]">
          <aside className="text-[11px] uppercase tracking-[0.22em] text-ink/55">
            <p>{post.author}</p>
            <p className="mt-3">{post.readTime}</p>
            <a href="/blog" className="mt-8 inline-flex text-[11px] tracking-[0.2em] text-ink underline underline-offset-4">
              Back to Blog
            </a>
          </aside>
          <div className="max-w-[640px] space-y-5 text-[14px] font-normal leading-6 text-ink/70">
            {post.body.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {relatedPosts.length > 0 && (
        <section className="bg-[#fbfaf7] px-4 py-12 md:px-7 md:py-16">
          <div className="mx-auto max-w-[1100px]">
            <div className="mb-9 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
              <h2 className="font-serif text-[16px] font-normal leading-[1.45] tracking-[0.04em] text-ink">CONTINUE READING</h2>
              <a href="/blog" className="text-[11px] uppercase tracking-[0.2em] text-ink underline underline-offset-4">
                View All Posts
              </a>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {relatedPosts.map((item) => (
                <article key={item.slug} className="group">
                  <a href={`/blog/${item.slug}`} className="block aspect-[16/10] overflow-hidden bg-bone">
                    <img src={item.image} alt={item.title} loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
                  </a>
                  <div className="pt-5">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-olive">{item.category} / {item.date}</p>
                    <h3 className="mt-3 font-serif text-[16px] font-normal leading-[1.4] tracking-[0.02em] text-ink">{item.title}</h3>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
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

function InstagramGridSection() {
  return (
    <section className="border-b border-ink bg-porcelain px-4 py-12 md:px-7 md:py-16">
      <div className="mx-auto max-w-[1480px]">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-olive">INSTAGRAM</p>
            <h2 className="font-serif text-[16px] font-normal uppercase tracking-[0.04em] leading-[1.35]">@ICONICADESIGNSTUDIO</h2>
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
      <section className="bg-porcelain px-5 py-8 md:px-7 md:py-10">
        <div className="mx-auto grid max-w-[1480px] items-start gap-4 md:grid-cols-[0.4fr_1fr]">
          <p className="text-[11px] uppercase tracking-[0.24em] text-olive">PORTFOLIO</p>
          <p className="text-[11px] uppercase tracking-[0.24em] text-olive">
            Selected residential and commercial projects.
          </p>
        </div>
      </section>

      <section className="bg-porcelain px-4 pb-10 md:px-7 md:pb-14">
        <div className="mx-auto max-w-[1480px]">
          <div className="grid gap-x-3 gap-y-6 md:grid-cols-3 md:gap-x-4">
            {portfolioProjects.map((project) => (
              <article key={project.title} className="group">
                <a href={`/portfolio/${project.slug}`} className="block overflow-hidden bg-bone">
                  <img src={project.images[0]} alt={project.title} loading="lazy" decoding="async" className="aspect-[4/5] h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
                </a>
                <a href={`/portfolio/${project.slug}`} className="mt-3 block font-serif text-[15px] font-normal leading-[1.35] text-ink">
                  {project.title}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative min-h-[200px] border-b border-ink md:min-h-[260px]">
        <img src={portfolioProjects[2].images[0]} alt="Portfolio closing project" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/55 to-black/30" />
        <div className="relative mx-auto flex min-h-[200px] max-w-[1480px] items-center justify-center px-5 py-6 text-center text-white sm:px-6 md:min-h-[260px] md:px-7 md:py-8">
          <div className="image-copy max-w-[420px]">
            <p className="mb-2 text-[11px] uppercase tracking-[0.24em]">START A PROJECT</p>
            <h2 className="font-serif text-[14px] font-normal leading-6">Tell us about your project and we'll be in touch within 24 hours to arrange a call.</h2>
            <ScheduleButton className="mt-4 text-white hover:text-white/75" />
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
      <section className="relative min-h-[320px] border-b border-ink md:min-h-[440px]">
        <img src={project.images[0]} alt={project.title} decoding="async" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/45 to-black/20" />
        <div className="relative mx-auto flex min-h-[320px] max-w-[1480px] items-center justify-center px-5 py-8 text-center text-white sm:px-6 md:min-h-[440px] md:px-7 md:py-10">
          <div className="image-copy max-w-[620px]">
            <h1 className="font-serif text-[20px] font-normal leading-[1.35] md:text-[26px]">{project.title}</h1>
            <p className="mx-auto mt-3 max-w-[520px] text-[14px] font-normal leading-6 text-white/85">{project.intro}</p>
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

      <section className="border-b border-ink bg-porcelain px-4 py-8 md:px-7 md:py-10">
        <div className="mx-auto max-w-[1480px]">
          <div className="mb-6 flex flex-col items-start justify-between gap-3 md:flex-row md:items-end">
            <h2 className="font-serif text-[15px] font-normal leading-[1.35]">PROJECT GALLERY</h2>
            <a href="/portfolio" className="text-[10px] uppercase tracking-[0.2em] underline underline-offset-4">
              Back to Portfolio
            </a>
          </div>
          <div className="grid gap-2 md:grid-cols-2 md:gap-3">
            {project.images.map((image, index) => (
              <a key={image} href={image} target="_blank" rel="noreferrer" className={`group block overflow-hidden bg-bone ${index === 0 ? 'md:col-span-2' : ''}`}>
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
    image: img.jogie,
    text: '',
  },
  {
    name: 'Nazia',
    role: 'Junior Designer + Architectural Drafter',
    image: img.teamOne,
    text: "Nazia brings technical expertise and creative support to the design team. She prepares detailed drawings, elevations, and permit-ready documents, while assisting in space planning, material boards, and design development.",
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
      <section className="border-b border-ink bg-porcelain px-6 py-8 md:px-14 md:py-9">
        <div className="mx-auto grid max-w-[1480px] gap-8 md:grid-cols-[0.9fr_1.1fr]">
          <div className="max-w-[560px]">
            <p className="text-[11px] uppercase tracking-[0.24em] text-olive">THE STUDIO</p>
          </div>
          <div className="max-w-[640px] space-y-5 text-[14px] font-normal leading-6 text-ink/75">
            <p>
              Our work is rooted in craftsmanship, balance, and narrative. Every environment is composed with warmth and contrasting natural texture against architectural clarity, restraint paired with expression. We collaborate with a trusted network of artisans, builders, and makers who share our dedication to excellence and authenticity.
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
          <div className="mb-10">
            <h2 className="font-serif text-[16px] font-normal leading-[1.35]">THE TEAM</h2>
          </div>
          <div className="grid gap-10 md:grid-cols-2 md:gap-16 md:justify-items-center">
            {studioTeam.map((member) => (
              <article key={member.name} className="group text-center transition duration-300">
                <div className="mx-auto aspect-square w-[min(240px,70vw)] overflow-hidden rounded-full border border-ink/20 bg-bone shadow-sm md:w-[260px]">
                  <img src={member.image} alt={member.name} loading="lazy" decoding="async" className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.03]" />
                </div>
                <div className="mx-auto max-w-[380px] pt-6">
                  <p className="text-[11px] uppercase leading-5 tracking-[0.2em] text-olive">{member.role}</p>
                  <h3 className="mt-2 font-serif text-[16px] font-normal leading-[1.35]">{member.name}</h3>
                  {member.text && (
                    <p className="mt-4 text-[14px] font-normal leading-6 text-ink/75">{member.text}</p>
                  )}
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

      <ImageCallout image={img.edit} title="START A PROJECT" text="Tell us about your project and we'll be in touch within 24 hours to arrange a call." align="right" height="short" href="/contact" cta="Start a Project" />
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
      <section className="border-b border-ink bg-porcelain px-6 py-8 md:px-14 md:py-9">
        <div className="mx-auto max-w-[1480px]">
          <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-olive">CONTACT</p>
          <h1 className="font-serif text-[16px] font-normal leading-[1.45]">
            Tell us about the space you want to create.
          </h1>
        </div>
      </section>

      <section className="grid border-b border-ink bg-porcelain lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative min-h-[360px] border-b border-ink lg:min-h-[760px] lg:border-b-0 lg:border-r">
          <img src={img.hero} alt="Iconica Design Studio contact interior" decoding="async" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/55 to-black/30" />
          <div className="image-copy relative flex min-h-[360px] items-center justify-center px-6 py-10 text-center text-white md:px-14 lg:min-h-[760px]">
            <div className="max-w-[380px]">
              <p className="mb-3 text-[11px] uppercase tracking-[0.24em]">ICONICA DESIGN STUDIO</p>
              <p className="font-serif text-[16px] font-normal leading-[1.45]">
                Interior design, renovation planning, and design-build support.
              </p>
              <div className="mt-6 grid gap-3 text-[12px] uppercase tracking-[0.16em] text-white/85">
                <a href="mailto:hello@iconicadesignstudio.com" className="hover:underline">hello@iconicadesignstudio.com</a>
                <a href="https://www.instagram.com/iconicadesignstudio/" target="_blank" rel="noreferrer" className="hover:underline">@ICONICADESIGNSTUDIO</a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center px-6 py-12 md:px-14 md:py-16">
          <div className="w-full max-w-[720px]">
            <p className="mb-5 text-[11px] uppercase leading-5 tracking-[0.22em] text-olive">Let's connect to my calendar so that people can schedule a time for a call</p>
            {submitted ? (
              <div className="border border-ink bg-bone p-7">
                <p className="text-[11px] uppercase tracking-[0.22em]">REQUEST RECEIVED</p>
                <p className="mt-4 text-[14px] font-normal leading-6 text-ink/75">
                  Thank you. We will review your message and contact you with next steps.
                </p>
                <button type="button" onClick={() => setSubmitted(false)} className="mt-7 border border-ink px-6 py-3 text-[11px] uppercase tracking-[0.2em] hover:bg-bone">
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
                <button type="submit" className="mt-2 border border-ink px-7 py-3 text-[11px] uppercase tracking-[0.2em] text-ink hover:bg-bone">
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

function ServicesPage() {
  return (
    <>
      <section className="border-b border-ink bg-porcelain px-6 py-8 sm:px-12 md:px-20 md:py-9 lg:px-32">
        <div className="mx-auto grid max-w-[1100px] items-start gap-4 md:grid-cols-[0.4fr_1fr]">
          <p className="text-[11px] uppercase tracking-[0.24em] text-olive">SERVICES</p>
          <p className="text-[11px] uppercase tracking-[0.24em] text-olive">
            Residential and commercial design, sourcing, and project delivery from a single studio.
          </p>
        </div>
      </section>

      <section className="grid border-b border-ink bg-porcelain lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative min-h-[320px] border-b border-ink lg:min-h-[560px] lg:border-b-0 lg:border-r">
          <img src={img.hero} alt="Iconica Design Studio services" decoding="async" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/35" />
        </div>
        <div className="flex items-center px-6 py-12 md:px-14 md:py-16">
          <div className="max-w-[520px]">
            <p className="mb-5 text-[11px] uppercase tracking-[0.24em] text-olive">HOW WE WORK</p>
            <h2 className="font-serif text-[16px] font-normal leading-[1.5] text-ink">
              Each engagement is scoped to the project, not the studio's template. We pair the right level of involvement with what the space, the timeline, and the team actually require.
            </h2>
            <p className="mt-5 text-[14px] font-normal leading-6 text-ink/70">
              Below is a working overview of the services we offer most often. Most clients combine more than one. Tell us about the project and we'll suggest the right pairing.
            </p>
            <ScheduleButton className="mt-7" />
          </div>
        </div>
      </section>

      <section className="border-b border-ink bg-porcelain px-6 py-12 sm:px-12 md:px-20 md:py-16 lg:px-32">
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-10">
            <h2 className="font-serif text-[16px] font-normal leading-[1.35] text-ink">WHAT WE OFFER</h2>
          </div>
          <div className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {studioServices.map((service) => (
              <article key={service.slug} className="group">
                <a href="/contact" className="block aspect-[4/5] overflow-hidden bg-bone">
                  <img src={service.image} alt={service.name} loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
                </a>
                <div className="pt-5">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-olive">{service.category}</p>
                  <h3 className="mt-3 font-serif text-[16px] font-normal leading-[1.4] tracking-[0.02em] text-ink">{service.name}</h3>
                  <p className="mt-3 text-[14px] font-normal leading-6 text-ink/70">{service.summary}</p>
                  <ul className="mt-4 space-y-1 text-[12px] uppercase tracking-[0.14em] text-ink/55">
                    {service.deliverables.map((item) => (
                      <li key={item} className="border-b border-ink/10 pb-1 last:border-b-0">{item}</li>
                    ))}
                  </ul>
                  <a href="/contact" className="mt-5 inline-flex text-[11px] uppercase tracking-[0.2em] text-ink underline underline-offset-4">
                    Inquire
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ImageCallout
        image={img.trade}
        title="ENGAGEMENT MODELS"
        text="Full-service, hourly consulting, and per-room scopes — chosen to match the project."
        align="right"
        height="short"
        href="/contact"
        cta="DISCUSS YOUR PROJECT"
      />

      <section className="border-b border-ink bg-bone px-6 py-12 sm:px-12 md:px-20 md:py-16 lg:px-32">
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-10">
            <h2 className="font-serif text-[16px] font-normal leading-[1.35] text-ink">PROCESS</h2>
          </div>
          <div className="grid gap-0 border border-ink/20 md:grid-cols-4">
            {serviceProcess.map((item) => (
              <article key={item.step} className="border-b border-ink/20 bg-porcelain p-6 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
                <p className="text-[11px] uppercase tracking-[0.24em] text-olive">{item.step}</p>
                <h3 className="mt-4 font-serif text-[16px] font-normal leading-[1.35] text-ink">{item.title}</h3>
                <p className="mt-3 text-[14px] font-normal leading-6 text-ink/70">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-ink bg-porcelain px-6 py-12 sm:px-12 md:px-20 md:py-16 lg:px-32">
        <div className="mx-auto grid max-w-[1100px] gap-10 md:grid-cols-[0.4fr_1fr] md:items-start">
          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-olive">QUESTIONS</p>
          </div>
          <div className="divide-y divide-ink/15 border-y border-ink/15">
            {[
              {
                q: 'Do you take on out-of-state projects?',
                a: 'Yes. Selected residential and commercial work across the Bay Area, Los Angeles, New York, and a small number of project-fit destinations.',
              },
              {
                q: 'Can you work with our existing architect or contractor?',
                a: 'Often, yes. We can plug into an existing team or assemble one from our trusted network, depending on where the project is.',
              },
              {
                q: 'Is there a minimum project size?',
                a: 'Full-service residential typically starts at a single primary room or full home. Per-room, hourly, and sourcing engagements have lower entry points.',
              },
              {
                q: 'How do fees work?',
                a: 'Most engagements are a fixed design fee plus procurement, with construction administration billed hourly. Detailed in the written proposal before any work begins.',
              },
            ].map((item) => (
              <div key={item.q} className="py-5">
                <p className="font-serif text-[14px] font-normal leading-[1.45] tracking-[0.02em] text-ink">{item.q}</p>
                <p className="mt-2 text-[14px] font-normal leading-6 text-ink/70">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ImageCallout
        image={img.edit}
        title="START A PROJECT"
        text="Tell us about your space and we'll respond within 24 hours with next steps."
        align="left"
        height="short"
        href="/contact"
        cta="CONTACT THE STUDIO"
      />
    </>
  )
}

function Footer() {
  const links = [
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Shop', href: '/shop' },
    { label: 'Blog', href: '/blog' },
    { label: 'Studio', href: '/studio' },
    { label: 'Press', href: '/press' },
    { label: 'Contact', href: '/contact' },
    { label: 'Instagram', href: 'https://www.instagram.com/iconicadesignstudio/' },
  ]
  return (
    <footer className="bg-[#f1eee5] text-ink/75">
      <div className="mx-auto grid max-w-[1480px] gap-10 px-6 py-10 sm:px-10 md:grid-cols-3 md:gap-12 md:px-14 md:py-12">
        <div className="max-w-[320px]">
          <a href="/" className="font-serif text-[17px] font-normal uppercase leading-none tracking-[0.1em] text-ink">
            ICONICA DESIGN STUDIO
          </a>
          <p className="mt-3 text-[13px] leading-6">
            Commercial & residential interior design studio crafting refined, enduring spaces.
          </p>
          <div className="mt-4 flex flex-col gap-1 text-[12px] uppercase tracking-[0.14em]">
            <a href="mailto:hello@iconicadesignstudio.com" className="hover:text-ink">hello@iconicadesignstudio.com</a>
            <a href="https://www.instagram.com/iconicadesignstudio/" target="_blank" rel="noreferrer" className="hover:text-ink">@ICONICADESIGNSTUDIO</a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-y-2 text-[13px] font-normal uppercase leading-6 tracking-[0.06em] md:max-w-[280px]">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="hover:text-ink">
              {link.label}
            </a>
          ))}
        </div>
        <form onSubmit={(event) => event.preventDefault()} className="w-full max-w-[360px]">
          <label className="block text-[13px] font-normal uppercase leading-6 tracking-[0.1em] text-ink/80" htmlFor="footer-email">
            Join Our Newsletter
          </label>
          <p className="mt-2 text-[12px] leading-5">
            Receive studio updates, project releases, and editorial notes.
          </p>
          <div className="mt-4 flex border-b border-ink/25">
            <input id="footer-email" type="email" placeholder="Enter your email" className="min-w-0 flex-1 bg-transparent px-0 py-2 text-[13px] font-normal outline-none placeholder:text-ink/45" />
            <button className="px-0 py-2 text-[12px] font-normal uppercase tracking-[0.16em] hover:text-ink">Subscribe</button>
          </div>
        </form>
      </div>
      <div className="border-t border-ink/10 px-6 py-4 sm:px-10 md:px-14">
        <div className="mx-auto flex max-w-[1480px] flex-col gap-2 text-[12px] uppercase tracking-[0.1em] text-ink/65 sm:flex-row sm:items-center sm:justify-between">
          <span>(C) 2021 Iconica Design Studio</span>
          <span>All Rights Reserved</span>
        </div>
      </div>
    </footer>
  )
}

function App() {
  const { isVisible, progress, startLoader } = usePageLoader()
  const [path, setPath] = useState(window.location.pathname)
  useSmoothReveals(path)

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
  const isServicesPage = path.replace(/\/$/, '') === '/services'
  const isBlogPage = ['/blog', '/journal'].includes(path.replace(/\/$/, ''))
  const projectSlug = path.match(/^\/portfolio\/([^/]+)\/?$/)?.[1]
  const productSlug = path.match(/^\/shop\/([^/]+)\/?$/)?.[1]
  const blogSlug = path.match(/^\/(?:blog|journal)\/([^/]+)\/?$/)?.[1]
  const activeProject = portfolioProjects.find((project) => project.slug === projectSlug)
  const activeProduct = shopProducts.find((product) => product.slug === productSlug)
  const activeBlogPost = blogPosts.find((post) => post.slug === blogSlug)

  return (
    <>
      <LoadingScreen isVisible={isVisible} progress={progress} />
      <ConsultationWidget />
      <main className="min-h-screen bg-porcelain pt-[62px] text-ink">
        <Header />
        <div key={path} className="page-enter">
          {projectSlug ? (
            <ProjectPage project={activeProject} />
          ) : productSlug ? (
            <ProductPage product={activeProduct} />
          ) : blogSlug ? (
            <BlogPostPage post={activeBlogPost} />
          ) : isBlogPage ? (
            <BlogPage />
          ) : isPortfolioPage ? (
            <PortfolioPage />
          ) : isPressPage ? (
            <PressPage />
          ) : isShopPage ? (
            <ShopPage />
          ) : isContactPage ? (
            <ContactPage />
          ) : isServicesPage ? (
            <ServicesPage />
          ) : isStudioPage ? (
            <StudioPage />
          ) : (
            <>
              <Hero />
              <FeatureRow />
              <ImageCallout
                image={img.canoa}
                title="PORTFOLIO"
                text="A selection of residential and commercial projects shaped through refined materials, thoughtful construction, and layered interior detail."
                href="/portfolio"
                cta="View Our Work"
                height="medium"
                align="right"
              />
              <FeaturedProducts />
              <ImageCallout image={img.trade} title="READY TO START YOUR PROJECT?" text="Let's talk about what you have in mind." align="left" height="short" href="/contact" cta="CONTACT" />
              <BlogSection />
              <HomeEditSection />
              <InstagramSection />
            </>
          )}
        </div>
        <Footer />
      </main>
    </>
  )
}

createRoot(document.getElementById('root')).render(<App />)
