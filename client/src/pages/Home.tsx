// SparkLink Technologies — "Clean Signal" redesign.
// Light, corporate layout in the spirit of modern IT-services templates:
// info topbar + sticky frosted-glass header, a hero pairing copy with the
// technician photo and three core service cards, a stats band, about split,
// a services grid with gradient hover reveals, a telemetry panel rendered
// with the @bklit/area-chart component, process steps, FAQ and CTA.
// Motion honours prefers-reduced-motion via CSS.

import {
  Activity, ArrowRight, ArrowUpRight, ChevronDown, Clock, Eye, Facebook,
  Instagram, Laptop, Linkedin, Mail, MapPin, Menu, MessageCircle, Network,
  Phone, Router, Satellite, ShieldCheck, Sparkles, Timer, Twitter, Wifi, X, Zap,
} from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AreaChart } from "@/components/ui/area-chart";

const whatsappHref =
  "https://wa.me/263773791578?text=Hi%20SparkLink%20Technologies%2C%20I'm%20interested%20in%20getting%20a%20quote%20for%20your%20services.";
const phoneHref = "tel:+263773791578";
const phoneDisplay = "+263 77 379 1578";
const emailHref = "mailto:nicodimusmlambo@gmail.com";

const navItems = [
  { label: "Home", href: "#top" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

/* Three core offers surfaced as cards inside the hero. */
const coreCards = [
  { icon: Satellite, title: "Starlink Installation", text: "Expert mounting, alignment and setup for dependable satellite internet.", href: "#services" },
  { icon: Eye, title: "CCTV & Security", text: "Surveillance systems planned for homes, offices and retail spaces.", href: "#services" },
  { icon: Wifi, title: "Networking & Wi-Fi", text: "Dead-zone-free coverage and structured networking for every property.", href: "#services" },
];

const stats = [
  { icon: Activity, value: "99.9%", label: "Uptime target on every install" },
  { icon: Timer, value: "42ms", label: "Typical latency, tuned systems" },
  { icon: ShieldCheck, value: "5+ yrs", label: "Hands-on field experience" },
  { icon: Phone, value: "24/7", label: "Support line for our clients" },
];

const aboutPoints = [
  { icon: ShieldCheck, title: "Certified workmanship", text: "Neat cabling, correct mounting and tested configurations on every job." },
  { icon: Sparkles, title: "Smart-home ready", text: "Infrastructure installed today that scales with tomorrow's automation." },
];

const services = [
  { name: "Starlink installation & support", description: "Professional mounting, positioning, routing and optimisation for dependable satellite connectivity.", icon: Satellite },
  { name: "CCTV surveillance", description: "Camera systems planned for homes, offices, retail spaces and commercial properties.", icon: Eye },
  { name: "Smart home automation", description: "Lighting, security and smart devices connected into one convenient environment.", icon: Sparkles },
  { name: "Wi-Fi coverage", description: "Eliminate dead zones and extend reliable Wi-Fi across homes, offices and large properties.", icon: Wifi },
  { name: "Fibre internet", description: "Professional fibre cabling and internet infrastructure for fast, stable connectivity.", icon: Zap },
  { name: "GPON / FTTH", description: "Modern fibre-to-the-home and GPON infrastructure for estates and apartment blocks.", icon: Network },
  { name: "Network design", description: "Structured planning, installation and configuration for homes and organisations.", icon: Router },
  { name: "ICT solutions", description: "Complete technology support and infrastructure tailored to each property.", icon: Laptop },
];

/* Representative figures for a healthy SparkLink installation — used to
   communicate the standard we install to, not live measurements. */
const chartData = [
  { day: "Mon", uptime: 99.6 },
  { day: "Tue", uptime: 99.9 },
  { day: "Wed", uptime: 99.8 },
  { day: "Thu", uptime: 100 },
  { day: "Fri", uptime: 99.9 },
  { day: "Sat", uptime: 99.7 },
  { day: "Sun", uptime: 99.9 },
];

const processSteps = [
  { title: "Consultation", text: "We visit your site, discuss your needs and assess connectivity, power and mounting options." },
  { title: "Design & quote", text: "You receive a clear proposal — equipment, timeline and pricing — with no hidden costs." },
  { title: "Installation", text: "Certified technicians mount, route and configure everything neatly, safely and tested." },
  { title: "Support", text: "After handover we stay reachable — monitoring advice, maintenance and upgrades." },
];

const faqs = [
  { q: "Do you install Starlink anywhere in Zimbabwe?", a: "Yes — we cover Harare and surrounding areas, and travel further for estate and commercial projects. Site assessments confirm the best mounting position before any hardware goes up." },
  { q: "Can you fix Wi-Fi dead zones in a big house or office?", a: "Absolutely. We survey the property, then design a mesh or access-point layout so every room, patio and outbuilding gets a strong, stable signal." },
  { q: "Do your CCTV systems allow phone viewing?", a: "Yes. Every system we install is configured for secure remote viewing on your phone or computer, with motion alerts and safe recording storage." },
  { q: "How long does a typical installation take?", a: "Most residential Starlink or CCTV installs are completed in a single day. Larger networking, fibre or multi-building projects are scheduled with a clear timeline upfront." },
  { q: "Do you offer support after installation?", a: "Yes — every installation includes after-sales support. If anything needs attention, our team is one call or WhatsApp message away." },
];

/* ---------- hooks & helpers ---------- */
function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("reveal-visible");
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  );
}

function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" className="wordmark" aria-label="SparkLink Technologies home">
      <span className="wordmark-badge" aria-hidden="true">
        <Satellite size={16} strokeWidth={2.2} />
      </span>
      <span className="wordmark-text" style={light ? { color: "#fff" } : undefined}>
        Spark<span>Link</span>
      </span>
    </a>
  );
}

/* ---------- topbar & header ---------- */
function Topbar() {
  return (
    <div className="topbar">
      <div className="container topbar-inner">
        <div className="topbar-group">
          <span className="topbar-item">
            <MapPin size={13} /> Harare, Zimbabwe
          </span>
          <a className="topbar-item" href={emailHref}>
            <Mail size={13} /> nicodimusmlambo@gmail.com
          </a>
          <span className="topbar-item">
            <Clock size={13} /> Mon – Sat: 8:00 AM – 6:00 PM
          </span>
        </div>
        <div className="topbar-socials">
          <a href="#top" aria-label="Facebook"><Facebook size={14} /></a>
          <a href="#top" aria-label="Twitter"><Twitter size={14} /></a>
          <a href="#top" aria-label="LinkedIn"><Linkedin size={14} /></a>
          <a href="#top" aria-label="Instagram"><Instagram size={14} /></a>
        </div>
      </div>
    </div>
  );
}

function Header({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (v: boolean) => void }) {
  return (
    <header className="site-header">
      <div className="glass header-shell">
        <div className="container header-bar">
          <Wordmark />
          <nav className="main-nav" aria-label="Primary">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>{item.label}</a>
            ))}
          </nav>
          <div className="header-cta">
            <a href={phoneHref} className="header-call">
              <span className="call-icon"><Phone size={16} /></span>
              <span>
                <small>Call us today</small>
                <strong>{phoneDisplay}</strong>
              </span>
            </a>
            <a href="#contact" className="btn btn-primary header-btn">
              Get a quote <ArrowUpRight size={16} />
            </a>
            <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle menu">
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="mobile-nav container" aria-label="Mobile">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>
            ))}
            <a href={phoneHref} onClick={() => setMenuOpen(false)}>Call {phoneDisplay}</a>
          </nav>
        )}
      </div>
    </header>
  );
}

/* ---------- hero ---------- */
function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-content container">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="eyebrow-rule" /> Optimize your connectivity
          </p>
          <h1 id="hero-title">
            Reliable <em>ICT &amp; internet</em> solutions
          </h1>
          <p className="hero-description">
            SparkLink Technologies installs and supports Starlink, CCTV, networking and smart
            technology for homes and businesses across Zimbabwe — engineered neatly, configured
            properly, supported consistently.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn btn-primary">
              Start now <ArrowUpRight size={17} />
            </a>
            <a href="#services" className="btn btn-outline">
              Explore services <ArrowRight size={17} />
            </a>
          </div>
        </div>
        <div className="hero-figure">
          <div className="hero-glow" aria-hidden="true" />
          <img src="/woman.png" alt="SparkLink technician holding a tablet during a site assessment" fetchPriority="high" />
        </div>
      </div>

      <div className="hero-cards container">
        <div className="hero-cards-grid">
          {coreCards.map((card, i) => (
            <Reveal key={card.title} delay={i * 90}>
              <a href={card.href} className="hero-card">
                <span className="hero-card-icon">
                  <card.icon size={22} strokeWidth={1.9} />
                </span>
                <span>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </span>
                <span className="card-link" aria-hidden="true">
                  <ArrowUpRight size={15} />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- stats band ---------- */
function StatsBand() {
  return (
    <section className="stats-band" aria-label="Company statistics">
      <div className="container stats-grid">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 80}>
            <div className="stat">
              <span className="stat-icon"><stat.icon size={19} strokeWidth={1.9} /></span>
              <span>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- about ---------- */
function About() {
  return (
    <section className="section" id="about">
      <div className="container about-grid">
        <Reveal className="about-collage">
          <img className="about-img-main" src="/service-starlink.jpg" alt="Technician aligning a Starlink dish on a rooftop" loading="lazy" />
          <img className="about-img-back" src="/service-network.jpg" alt="Networking equipment — router, NAS and switch — laid out before an install" loading="lazy" />
          <div className="about-badge">
            <span className="big">5+</span>
            <small>
              Years of
              <br />
              field experience
            </small>
          </div>
        </Reveal>
        <Reveal className="about-copy" delay={120}>
          <p className="eyebrow">
            <span className="eyebrow-rule" /> About SparkLink
          </p>
          <h2>We help homes and businesses stay connected, secured and smart</h2>
          <p>
            From Starlink installations to full networking and surveillance builds, we handle the
            technology so you never think about it. Every cable routed, every device configured,
            every system handed over tested and ready.
          </p>
          <div className="about-points">
            {aboutPoints.map((point) => (
              <div className="about-point" key={point.title}>
                <span className="about-point-icon"><point.icon size={18} strokeWidth={1.9} /></span>
                <div>
                  <h4>{point.title}</h4>
                  <p>{point.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="hero-actions">
            <a href="#contact" className="btn btn-primary">
              Talk to us <ArrowUpRight size={16} />
            </a>
            <a href={phoneHref} className="btn btn-outline">
              <Phone size={15} /> {phoneDisplay}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- services ---------- */
function Services() {
  const firstSix = services.slice(0, 6);
  const lastTwo = services.slice(6);
  return (
    <section className="section section-mist" id="services">
      <div className="container">
        <Reveal>
          <div className="section-head center">
            <p className="eyebrow" style={{ justifyContent: "center" }}>
              <span className="eyebrow-rule" /> Our services <span className="eyebrow-rule" />
            </p>
            <h2>Quality connectivity services you can trust</h2>
            <p>
              Professional installation and support for satellite internet, security, networking
              and smart technology — for homes, offices and commercial properties.
            </p>
          </div>
        </Reveal>
        <div className="services-grid">
          {firstSix.map((service, i) => (
            <Reveal key={service.name} delay={(i % 3) * 90}>
              <article className="service-card">
                <span className="service-icon"><service.icon size={22} strokeWidth={1.8} /></span>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                <a href="#contact" className="service-link">
                  Get started <ArrowUpRight size={14} />
                </a>
              </article>
            </Reveal>
          ))}
          {lastTwo.map((service) => (
            <article className="service-card" key={service.name}>
              <span className="service-icon"><service.icon size={22} strokeWidth={1.8} /></span>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <a href="#contact" className="service-link">
                Get started <ArrowUpRight size={14} />
              </a>
            </article>
          ))}
          <article className="service-card feature">
            <div className="feature-copy">
              <span className="service-icon"><Laptop size={22} strokeWidth={1.8} /></span>
              <h3>Complete ICT solutions for your property</h3>
              <p>
                One team for connectivity, security and automation. We plan the infrastructure,
                install the hardware and stay on for support — so your technology simply works.
              </p>
              <a href="#contact" className="service-link">
                Request a site visit <ArrowUpRight size={14} />
              </a>
            </div>
            <div className="feature-media">
              <img src="/service-ict.jpg" alt="ICT infrastructure work in progress" loading="lazy" />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

/* ---------- telemetry ---------- */
function Telemetry() {
  return (
    <section className="section" id="telemetry">
      <div className="container telemetry-grid">
        <Reveal>
          <p className="eyebrow">
            <span className="eyebrow-rule" /> The standard we install to
          </p>
          <h2 style={{ fontSize: "clamp(1.9rem, 4vw, 2.6rem)", lineHeight: 1.12, marginBottom: "1.1rem" }}>
            Engineered for uptime, tuned for speed
          </h2>
          <p style={{ color: "var(--slate)", lineHeight: 1.75, margin: 0 }}>
            A SparkLink installation is measured, not guessed. We align, mount and configure for a
            stable link, then verify real-world performance before handover.
          </p>
          <p className="telemetry-note">
            <ShieldCheck size={15} />
            Representative first-week figures for a healthy, professionally installed system —
            your results depend on location, weather and equipment.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <div className="chart-panel">
            <div className="chart-head">
              <h3>Weekly uptime — healthy install</h3>
              <span className="chart-badge">
                <span className="status-dot" aria-hidden="true" /> Stable link
              </span>
            </div>
            <AreaChart data={chartData} dataKey="uptime" xKey="day" color="#9ec2ff" height={260} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- process ---------- */
function Process() {
  return (
    <section className="section section-mist" id="process">
      <div className="container">
        <Reveal>
          <div className="section-head center">
            <p className="eyebrow" style={{ justifyContent: "center" }}>
              <span className="eyebrow-rule" /> Process <span className="eyebrow-rule" />
            </p>
            <h2>How we work</h2>
            <p>A simple, transparent path from first contact to a fully supported installation.</p>
          </div>
        </Reveal>
        <div className="process-grid">
          {processSteps.map((step, i) => (
            <Reveal key={step.title} delay={i * 90}>
              <article className="process-card">
                <span className="process-step">{String(i + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- faq ---------- */
function Faq({ openFaq, setOpenFaq }: { openFaq: number | null; setOpenFaq: (v: number | null) => void }) {
  return (
    <section className="section" id="faq">
      <div className="container faq-grid">
        <Reveal>
          <p className="eyebrow">
            <span className="eyebrow-rule" /> FAQ
          </p>
          <h2 style={{ fontSize: "clamp(1.9rem, 4vw, 2.6rem)", lineHeight: 1.12, marginBottom: "1.1rem" }}>
            Questions, answered
          </h2>
          <p style={{ color: "var(--slate)", lineHeight: 1.75, margin: 0 }}>
            Can't find what you're looking for? Message us on WhatsApp — we reply fast.
          </p>
        </Reveal>
        <Reveal delay={120} className="faq-list">
          {faqs.map((faq, i) => {
            const open = openFaq === i;
            return (
              <div className={`faq-item${open ? " open" : ""}`} key={faq.q}>
                <button className="faq-question" onClick={() => setOpenFaq(open ? null : i)} aria-expanded={open}>
                  {faq.q}
                  <ChevronDown size={17} />
                </button>
                {open && <p className="faq-answer">{faq.a}</p>}
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- final CTA / contact ---------- */
function FinalCta() {
  return (
    <section className="section" id="contact" style={{ paddingTop: 0 }}>
      <div className="container">
        <Reveal>
          <div className="final-cta">
            <p className="eyebrow" style={{ justifyContent: "center", color: "#9ec2ff" }}>
              Get connected
            </p>
            <h2>Ready for reliable internet, security and smart tech?</h2>
            <p>
              Tell us about your home or business and we'll recommend the right setup — with a
              clear quote and a timeline you can plan around.
            </p>
            <div className="final-actions">
              <a href={whatsappHref} target="_blank" rel="noreferrer" className="btn btn-light">
                <MessageCircle size={16} /> WhatsApp us
              </a>
              <a href={phoneHref} className="btn btn-ghost">
                <Phone size={16} /> {phoneDisplay}
              </a>
              <a href={emailHref} className="btn btn-ghost">
                <Mail size={16} /> Email us
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- footer ---------- */
function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Wordmark light />
          <p>ICT · Connectivity · Security · Automation — proudly serving homes and businesses across Zimbabwe.</p>
        </div>
        <div className="footer-col">
          <span className="mono">Explore</span>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#process">Process</a>
          <a href="#faq">FAQ</a>
        </div>
        <div className="footer-col">
          <span className="mono">Contact</span>
          <a href={phoneHref}>{phoneDisplay}</a>
          <a href={emailHref}>nicodimusmlambo@gmail.com</a>
          <span>Harare, Zimbabwe</span>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} SparkLink Technologies</span>
        <span className="mono">Connected / Secured / Built for speed</span>
      </div>
    </footer>
  );
}

/* ---------- page ---------- */
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div id="top">
      <Topbar />
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        <Hero />
        <StatsBand />
        <About />
        <Services />
        <Telemetry />
        <Process />
        <Faq openFaq={openFaq} setOpenFaq={setOpenFaq} />
        <FinalCta />
      </main>
      <Footer />
      <a className="float-wa" href={whatsappHref} target="_blank" rel="noreferrer" aria-label="Chat with SparkLink on WhatsApp">
        <MessageCircle size={21} />
      </a>
    </div>
  );
}




