import React, { useCallback, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react'
import './styles.css'

const img = {
  hero: 'https://www.inkandporcelain.com/cdn/shop/files/Canoa_Homepage.jpg?v=1720457893',
  intro: 'https://www.inkandporcelain.com/cdn/shop/files/ink_porcelain-homepage_f03dddca-fb24-41fe-b137-42094d193298_1512x.jpg?v=1722369111',
  bowl: 'https://www.inkandporcelain.com/cdn/shop/files/Wedding_Blog_DP_600x600@2x.jpg?v=1720201824',
  canoa: 'https://www.inkandporcelain.com/cdn/shop/files/Canoa_Lab_x_Ink_Porcelain6_734551c5-85c2-4343-8d9c-fb9f9232f2bb_2048x.jpg?v=1720456100',
  storyOne: 'https://www.inkandporcelain.com/cdn/shop/articles/Lamps_ca917124-9730-4897-a1f8-da21923a4c30_345x345@2x.jpg?v=1774542773',
  storyTwo: 'https://www.inkandporcelain.com/cdn/shop/articles/Ink_Porcelain_7_b2efe95c-7375-4ca6-b2ef-64c1d9cc46ab_345x345@2x.png?v=1741811330',
  storyThree: 'https://www.inkandporcelain.com/cdn/shop/articles/Ink_Porcelain_Container_757e7ef7-9dd2-4f5d-b988-3097daf22d5c_345x345@2x.png?v=1740150593',
  trade: 'https://www.inkandporcelain.com/cdn/shop/files/Lauren_Nelson_Design_Large_b2b985fb-c9dd-4ea3-9147-2bd616ee7f7a_1080x.jpg?v=1774381026',
  press: 'https://cdn.shopify.com/s/files/1/0574/8834/3196/files/homepage-as-seen-in-v2.png?v=1670614311',
  edit: 'https://www.inkandporcelain.com/cdn/shop/files/homeedit-homepage_1512x.jpg?v=1722369186',
}

const nav = ['ABOUT', 'PORTFOLIO', 'SERVICES', 'STUDIO', 'CONTACT']

function openConsultationForm() {
  window.dispatchEvent(new Event('open-consultation'))
}

function ScheduleButton({ className = '' }) {
  return (
    <button
      type="button"
      onClick={openConsultationForm}
      className={`inline-flex items-center justify-center bg-ink px-8 py-3 text-[10px] font-normal uppercase tracking-[0.24em] text-porcelain hover:bg-ink/80 ${className}`}
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

  const startLoader = useCallback((duration = 1550) => {
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
        timeoutRef.current = window.setTimeout(() => setIsVisible(false), 350)
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
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    function handleOpenConsultation() {
      setSubmitted(false)
      setIsOpen(true)
    }

    window.addEventListener('open-consultation', handleOpenConsultation)

    if (isOpen) {
      document.body.classList.add('overflow-hidden')
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.body.classList.remove('overflow-hidden')
      window.removeEventListener('open-consultation', handleOpenConsultation)
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
        className="fixed left-1 top-1/2 z-40 origin-left -translate-y-1/2 text-[9px] font-medium tracking-[0.18em] text-black hover:opacity-60 sm:left-3 sm:text-[10px]"
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
                <img src={img.intro} alt="Interior styling with ceramic objects" className="h-full min-h-[640px] w-full object-cover" />
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
      <div className="mx-auto flex max-w-[1480px] items-center gap-3 px-3 py-4 sm:px-4 md:px-7 xl:gap-5">
        <a href="#" className="shrink-0 font-serif text-[14px] tracking-[0.08em] sm:text-[18px] sm:tracking-[0.12em] md:text-[24px] xl:text-[26px]">
          ICONICA DESIGN STUDIO
        </a>
        <nav className="hidden flex-1 flex-wrap gap-x-5 gap-y-2 text-[11px] tracking-[0.18em] xl:flex">
          {nav.map((item) => (
            <a key={item} href="#" className="hover:underline">
              {item}
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
        <div className="flex shrink-0 items-center justify-end gap-3 sm:gap-4">
          <button aria-label="Search">
            <Search size={18} strokeWidth={1.5} />
          </button>
          <button className="hidden md:block" aria-label="Account">
            <UserRound size={18} strokeWidth={1.5} />
          </button>
          <button aria-label="Cart">
            <ShoppingBag size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <nav className="grid border-t border-ink px-4 py-4 text-[11px] tracking-[0.18em] xl:hidden">
          {nav.map((item) => (
            <a key={item} href="#" className="border-b border-ink/15 py-3 last:border-b-0" onClick={() => setMobileMenuOpen(false)}>
              {item}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}

function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-66px)] overflow-hidden border-b border-ink">
      <img src={img.hero} alt="Iconica Design Studio interior project placeholder" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative mx-auto flex min-h-[calc(100vh-66px)] max-w-[1480px] items-end px-5 pb-10 pl-9 sm:px-6 md:px-7 md:pb-16">
        <div className="max-w-[680px] text-white">
          <p className="mb-5 text-[11px] tracking-[0.24em]">WELCOME</p>
          <h1 className="font-serif text-[17px] font-normal leading-[1.45] tracking-normal">
            We create environments that tell a story crafted with purpose, artistry, and soul. Each space is designed to evoke feeling and endure, balancing architecture, material, and light to shape how people live, work, and connect.
          </h1>
          <ScheduleButton className="mt-8" />
        </div>
      </div>
    </section>
  )
}

function FeatureRow() {
  return (
    <section className="grid border-b border-ink md:grid-cols-2">
      <div className="min-h-[420px] border-b border-ink md:border-b-0 md:border-r">
        <img src={img.bowl} alt="Interior design detail placeholder" className="h-full w-full object-cover" />
      </div>
      <div className="flex items-center bg-porcelain px-6 py-16 md:px-14">
        <div className="max-w-[540px]">
          <p className="mb-5 text-[11px] tracking-[0.22em] text-olive">DESIGN + BUILD</p>
          <h2 className="font-serif text-[17px] font-normal leading-[1.45]">
            A full-service design-build studio crafting timeless spaces with architectural depth and refined detail.
          </h2>
          <p className="mt-7 max-w-[460px] text-[14px] font-normal leading-6">
            We bring vision to life from the earliest concept to the final layer of finish.
          </p>
          <a href="#" className="mt-8 inline-flex text-[10px] uppercase tracking-[0.24em] underline underline-offset-4">
            View Our Work
          </a>
        </div>
      </div>
    </section>
  )
}

function ImageCallout({ image, title, text, align = 'left' }) {
  return (
    <section className="relative min-h-[420px] border-b border-ink md:min-h-[520px]">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/28" />
      <div className={`relative mx-auto flex min-h-[420px] max-w-[1480px] items-end px-5 py-12 pl-9 sm:px-6 md:min-h-[520px] md:px-7 ${align === 'right' ? 'justify-end' : ''}`}>
        <a href="#" className="max-w-[520px] text-white">
          <p className="mb-3 text-[11px] tracking-[0.24em]">{title}</p>
          <h3 className="font-serif text-[17px] font-normal leading-[1.45]">{text}</h3>
        </a>
      </div>
    </section>
  )
}

const stories = [
  {
    title: 'DESIGN NOTES',
    body: 'Ideas on material, light, architecture, and the details that shape meaningful interiors.',
    image: img.storyOne,
  },
  {
    title: 'STUDIO JOURNAL',
    body: 'Behind the scenes of our design process, from early concept direction to the final layer of finish.',
    image: img.storyTwo,
  },
  {
    title: 'CURATED LIVING',
    body: 'Stories on residential and commercial spaces created for modern luxury and intentional living.',
    image: img.storyThree,
  },
]

function PortfolioSection() {
  return (
    <section className="relative min-h-[420px] border-b border-ink md:min-h-[520px]">
      <img src={img.intro} alt="Portfolio project placeholder" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative mx-auto flex min-h-[420px] max-w-[1480px] items-end px-5 py-12 pl-9 text-white sm:px-6 md:min-h-[520px] md:px-7">
        <div className="max-w-[560px]">
          <p className="mb-3 text-[11px] uppercase tracking-[0.24em]">PORTFOLIO</p>
          <h2 className="font-serif text-[17px] font-normal leading-[1.45]">
          A selection of recent residential and commercial projects that reflect our integrated approach to design and build.
          </h2>
          <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a href="#" className="inline-flex text-[10px] uppercase tracking-[0.2em] underline underline-offset-4">
              Explore the Portfolio
            </a>
            <ScheduleButton />
          </div>
        </div>
      </div>
    </section>
  )
}

function Stories() {
  return (
    <section className="border-b border-ink bg-porcelain px-4 py-16 md:px-7 md:py-20">
      <div className="mx-auto max-w-[1480px]">
        <div className="mb-10 flex flex-col items-start justify-between gap-5 md:flex-row md:items-end md:gap-6">
          <h2 className="font-serif text-[17px] font-normal leading-[1.35]">READ THE LATEST STORIES</h2>
          <a href="#" className="hidden border border-ink px-6 py-3 text-[11px] tracking-[0.2em] hover:bg-ink hover:text-white md:inline-flex">
            VIEW ALL STORIES
          </a>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {stories.map((story) => (
            <article key={story.title} className="group">
              <div className="aspect-square overflow-hidden border border-ink/20">
                <img src={story.image} alt={story.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
              </div>
              <h3 className="mt-5 min-h-12 text-[13px] font-medium leading-5 tracking-[0.16em]">{story.title}</h3>
              <p className="mt-4 text-[14px] leading-6 text-ink/75">{story.body}</p>
              <a href="#" className="mt-5 inline-flex text-[11px] tracking-[0.2em] underline underline-offset-4">
                READ MORE
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Press() {
  return (
    <section className="border-b border-ink bg-bone px-4 py-12 md:px-7 md:py-16">
      <div className="mx-auto max-w-[980px] text-center">
        <p className="mb-8 text-[11px] tracking-[0.24em]">AS SEEN IN</p>
        <img src={img.press} alt="Press features" className="mx-auto max-h-[92px] w-full object-contain" />
      </div>
    </section>
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
    <section className="border-b border-ink bg-porcelain px-4 py-14 md:px-7 md:py-18">
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
              <img src={post} alt={`Iconica Design Studio Instagram placeholder ${index + 1}`} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]" />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const links = ['SHOP', 'About', 'Privacy Policy', 'Contact', 'Sitemap']
  return (
    <footer className="bg-ink px-4 py-12 text-porcelain md:px-7">
      <div className="mx-auto grid max-w-[1480px] gap-10 md:grid-cols-[1fr_1.2fr]">
        <div>
          <h2 className="font-serif text-[22px] tracking-[0.1em] sm:text-[31px] sm:tracking-[0.14em]">ICONICA DESIGN STUDIO</h2>
          <p className="mt-5 max-w-[420px] text-[14px] leading-6 text-porcelain/75">
            Timeless interiors. Tailored construction. Curated living.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <p className="mb-4 text-[11px] tracking-[0.22em]">INFORMATION</p>
            <div className="grid grid-cols-2 gap-3 text-[11px] tracking-[0.14em]">
              {links.map((link) => (
                <a key={link} href="#" className="hover:underline">
                  {link}
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
        (C) 2025 Iconica Design Studio | Design + Build + Curate | info@iconicainteriordesign.com | Instagram @iconicadesignstudio | IDCO
      </div>
    </footer>
  )
}

function App() {
  const { isVisible, progress, startLoader } = usePageLoader()
  useSmoothReveals()

  useEffect(() => {
    function handleInternalLink(event) {
      const link = event.target.closest('a[href="#"]')

      if (!link) {
        return
      }

      event.preventDefault()
      startLoader(900)
      window.setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 120)
    }

    document.addEventListener('click', handleInternalLink)

    return () => document.removeEventListener('click', handleInternalLink)
  }, [startLoader])

  return (
    <>
      <LoadingScreen isVisible={isVisible} progress={progress} />
      <main className="min-h-screen bg-porcelain text-ink">
        <ConsultationWidget />
        <Header />
        <Hero />
        <FeatureRow />
        <ImageCallout image={img.canoa} title="ABOUT THE STUDIO" text="A multidisciplinary studio creating spaces that embody modern luxury and intentional living. Our residential and commercial work balances artistry with structure, blending design, architecture, and craft into environments that tell a story." />
        <PortfolioSection />
        <Stories />
        <ImageCallout image={img.trade} title="READY TO START YOUR PROJECT?" text="Let's talk about what you have in mind." align="right" />
        <Press />
        <ImageCallout image={img.edit} title="CURATED LIVING" text="Every project is a reflection of lifestyle curated, elevated, and built to endure." />
        <InstagramSection />
        <Footer />
      </main>
    </>
  )
}

createRoot(document.getElementById('root')).render(<App />)
