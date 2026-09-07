// SparkLink Technologies — "Blue Hour Glass" redesign.
// One continuous midnight scene with liquid-glass functional layers:
// fixed glass navigation, glass cards and forms, restrained motion, and
// a telemetry panel rendered with the @bklit/area-chart component.
// Motion honours prefers-reduced-motion via CSS.

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Cloud,
  Eye,
  House,
  Laptop,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Network,
  Phone,
  Router,
  Satellite,
  ShieldCheck,
  Sparkles,
  Timer,
  Wifi,
  X,
  Zap,
} from "lucide-react";
import { AreaChart } from "@/components/ui/area-chart";

const whatsappHref =
  "https://wa.me/263773791578?text=Hi%20SparkLink%20Technologies%2C%20I'm%20interested%20in%20getting%20a%20quote%20for%20your%20services.";
const phoneHref = "tel:+263773791578";

const navItems = [
  { label: "Services", href: "#services" },
  { label: "Telemetry", href: "#telemetry" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const tickerItems = ["STARLINK", "CCTV", "FIBRE", "NETWORKING", "SMART HOMES", "WI-FI", "GPON / FTTH"];

const heroStats: Array<[string, string]> = [
  ["99.9%", "UPTIME TARGET"],
  ["42ms", "AVG. RESPONSE"],
  ["24/7", "SUPPORT LINE"],
];


const systemChain = [
  { label: "SATELLITE", icon: Satellite },
  { label: "ROUTER", icon: Router },
  { label: "NETWORK", icon: Network },
  { label: "DEVICES", icon: Laptop },
  { label: "SECURITY", icon: ShieldCheck },
  { label: "SMART HOME", icon: Sparkles },
];

const services = [
  { id: "01", name: "Starlink installation & support", description: "Professional mounting, positioning, routing, configuration, and optimisation for dependable satellite connectivity.", icon: Satellite, accent: "signal" },
  { id: "02", name: "CCTV surveillance", description: "Camera systems planned for homes, offices, retail spaces, and commercial properties.", icon: Eye, accent: "bright" },
  { id: "03", name: "Smart home automation", description: "Connect lighting, security, and smart devices into one convenient environment.", icon: Sparkles, accent: "cyan" },
  { id: "04", name: "Wi-Fi coverage", description: "Eliminate dead zones and extend reliable Wi-Fi across homes, offices, and large properties.", icon: Wifi, accent: "signal" },
  { id: "05", name: "Fibre internet", description: "Professional fibre cabling and internet infrastructure for fast, stable connectivity.", icon: Zap, accent: "bright" },
  { id: "06", name: "GPON / FTTH", description: "Modern fibre-to-the-home and GPON infrastructure solutions.", icon: Network, accent: "cyan" },
  { id: "07", name: "Network design", description: "Structured planning, installation, and configuration for homes and organisations.", icon: Router, accent: "signal" },
  { id: "08", name: "ICT solutions", description: "Complete technology support and infrastructure tailored to each property.", icon: Laptop, accent: "bright" },
];

// Representative figures for a healthy SparkLink installation — used to
// communicate the standard we install to, not live measurements.
const telemetryStats = [
  { value: "99.9%", label: "Uptime", note: "Representative first-week uptime after a professional install.", icon: Activity },
  { value: "42ms", label: "Latency", note: "Typical satellite-to-router response on a tuned system.", icon: Timer },
  { value: "3", label: "Coverage zones", note: "Internet, security, and automation mapped on one system.", icon: Cloud },
];

const chartData = [
  { day: "Mon", uptime: 99.1 },
  { day: "Tue", uptime: 99.4 },
  { day: "Wed", uptime: 98.7 },
  { day: "Thu", uptime: 99.8 },
  { day: "Fri", uptime: 100 },
  { day: "Sat", uptime: 99.6 },
  { day: "Sun", uptime: 100 },
];

const starlinkSteps = [
  ["01", "Site assessment"],
  ["02", "Best mounting position"],
  ["03", "Professional installation"],
  ["04", "Cable routing"],
  ["05", "Testing & handover"],
];

const cctvFeatures = ["Indoor & outdoor coverage", "Property monitoring", "Camera placement planning", "Remote viewing setup", "Professional cabling", "System configuration"];


const processSteps = [
  ["01", "Tell us what you need", "A quick conversation about the property, priorities, and the problem to solve."],
  ["02", "Property / site assessment", "We look at layout, signal paths, mounting points, and the environment around them."],
  ["03", "Recommended solution", "You receive a clear route forward, with the right combination of systems for the site."],
  ["04", "Professional installation", "Our team installs, configures, and labels the infrastructure with care."],
  ["05", "Testing & handover", "We test the system, walk you through it, and leave the next steps clear."],
];

const faqs = [
  ["Do you install Starlink?", "Yes. SparkLink provides Starlink mounting, positioning, cable routing, router setup, and coverage optimisation. We are an independent installation and support provider, not Starlink itself."],
  ["Can you improve Wi-Fi coverage in a large house?", "Yes. We can assess dead zones and design a practical multi-point Wi-Fi setup for the size and structure of your property."],
  ["Do you install CCTV for businesses?", "Yes. We plan and install CCTV systems for homes, offices, retail spaces, and commercial properties, including cabling and system configuration."],
  ["Can you design an office network?", "Yes. We design, install, and configure structured networks around the people, rooms, devices, and demands of your organisation."],
  ["Do you install fibre networks?", "Yes. We provide fibre cabling, FTTH, and GPON infrastructure solutions where they are suitable for the property."],
  ["Do you provide smart home installations?", "Yes. We connect compatible lighting, security, and smart devices into a more convenient, integrated environment."],
  ["How do I request a quotation?", "Use the quote form below, call +263 77 379 1578, or send us a WhatsApp message with a short description of what you need."],
];

const serviceOptions = ["Starlink", "CCTV", "Smart Home", "Wi-Fi", "Fibre", "GPON / FTTH", "Network Installation", "Other"];

/* ---------- shared primitives ---------- */

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function Reveal({ children, className = "", delay = 0, style }: { children: React.ReactNode; className?: string; delay?: number; style?: React.CSSProperties }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal ${visible ? "reveal-visible" : ""} ${className}`} style={{ transitionDelay: `${delay}ms`, ...style }}>
      {children}
    </div>
  );
}

function Wordmark() {
  return (
    <a className="wordmark" href="#top" aria-label="SparkLink Technologies home">
      <svg className="wordmark-mark" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M4 17V9a1 1 0 0 1 1-1h7" stroke="#3EA6FF" strokeWidth="2" strokeLinecap="round" />
        <path d="M24 11v8a1 1 0 0 1-1 1h-7" stroke="#3EA6FF" strokeWidth="2" strokeLinecap="round" />
        <path d="M8 20L20 8" stroke="url(#spark-link-grad)" strokeWidth="2.4" strokeLinecap="round" />
        <defs>
          <linearGradient id="spark-link-grad" x1="8" y1="20" x2="20" y2="8">
            <stop stopColor="#146CFF" />
            <stop offset="1" stopColor="#5FD0FF" />
          </linearGradient>
        </defs>
      </svg>
      <span>
        <strong>SparkLink</strong>
        <small>Technologies</small>
      </span>
    </a>
  );
}


/* ---------- header ---------- */
function Header({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (open: boolean) => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-shell">
        <div className="nav-pill glass-pill">
          <Wordmark />
          <nav className="main-nav" aria-label="Main navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
            <a className="btn btn-primary btn-sm header-cta" href="#contact">
              Get a quote <ArrowUpRight size={16} />
            </a>
          </nav>
          <button
            className="menu-btn"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <div className={`mobile-sheet glass-panel ${menuOpen ? "open" : ""}`}>
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
          <a className="btn btn-primary header-cta" href="#contact" onClick={() => setMenuOpen(false)}>
            Get a quote <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
    </header>
  );
}

/* ---------- hero ---------- */
function HeroConsole() {
  return (
    <div className="hero-console glass-panel" aria-label="Illustration of a monitored SparkLink network">
      <div className="console-top mono">
        <span className="status-dot" /> SPARKLINK GRID / ONLINE <span className="console-loc">HARARE · ZW</span>
      </div>
      <div className="console-stage" aria-hidden="true">
        <span className="orbit orbit-a" />
        <span className="orbit orbit-b" />
        <span className="orbit orbit-c" />
        <span className="orbit-sat" />
        <span className="console-core">
          <Router size={22} strokeWidth={1.5} />
        </span>
        <span className="console-tag tag-a mono">STARLINK</span>
        <span className="console-tag tag-b mono">FIBRE</span>
        <span className="console-tag tag-c mono">CCTV</span>
      </div>
      <div className="console-stats">
        {heroStats.map(([value, label]) => (
          <div key={label}>
            <strong>{value}</strong>
            <span className="mono">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}


/* ---------- ticker ---------- */
function Ticker() {
  return (
    <div className="ticker" aria-label="SparkLink service areas">
      <div className="ticker-track">
        {[0, 1].map((group) => (
          <div className="ticker-group" key={group} aria-hidden={group === 1}>
            {tickerItems.map((item, index) => (
              <span key={`${group}-${item}`}>
                <i>{String(index + 1).padStart(2, "0")}</i>
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- solutions ---------- */
function Solutions() {
  return (
    <section id="solutions" className="section">
      <div className="aurora aurora-b" aria-hidden="true" />
      <div className="container solutions-grid">
        <Reveal className="solutions-copy">
          <p className="eyebrow"><span className="eyebrow-rule" /> ONE TECHNOLOGY PARTNER</p>
          <h2 className="split-head">
            From the satellite above your roof to the <em>network behind your walls.</em>
          </h2>
          <p className="body-copy">
            SparkLink brings connectivity, security, networking, and automation into one coherent
            system, designed around the property you actually have.
          </p>
          <a href="#contact" className="text-link" style={{ marginTop: "1.6rem" }}>
            Talk to a technical partner <ArrowRight size={16} />
          </a>
        </Reveal>
        <Reveal delay={120}>
          <div className="system-map glass-panel">
            <div className="system-map-head mono">
              <span>SIGNAL CHAIN</span>
              <span className="status-dot" />
            </div>
            <div className="system-chain">
              <span className="chain-line" aria-hidden="true" />
              {systemChain.map((node, index) => {
                const Icon = node.icon;
                return (
                  <div className="chain-node" key={node.label} style={{ transitionDelay: `${index * 60}ms` }}>
                    <span className="chain-dot" />
                    <span className="mono chain-index">0{index + 1}</span>
                    <strong>{node.label}</strong>
                    <Icon size={16} strokeWidth={1.6} />
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- services ---------- */
function Services() {
  return (
    <section id="services" className="section">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow"><span className="eyebrow-rule" /> THE SPARKLINK SYSTEM</p>
          <h2>Everything your property needs to stay <em>connected.</em></h2>
          <p className="body-copy" style={{ marginTop: "1.2rem" }}>
            One team to map the signal, secure the site, and make the whole system work together.
          </p>
        </Reveal>
        <div className="services-grid">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Reveal
                key={service.id}
                className={`service-card glass-card accent-${service.accent} ${index < 2 ? "service-feature" : ""}`}
                delay={(index % 4) * 50}
              >
                <div className="service-top">
                  <span className="mono">{service.id}</span>
                  <span className="service-icon">
                    <Icon size={index < 2 ? 22 : 19} strokeWidth={1.5} />
                  </span>
                </div>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                <a href="#contact" className="service-link">
                  Request a quote <ArrowUpRight size={15} />
                </a>
                {service.id === "01" && <span className="service-decor decor-orbit" aria-hidden="true" />}
                {service.id === "02" && <span className="service-decor decor-reticle" aria-hidden="true" />}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}


/* ---------- telemetry ---------- */
function Telemetry() {
  return (
    <section id="telemetry" className="section">
      <div className="aurora aurora-a" style={{ top: "10%", right: "-140px" }} aria-hidden="true" />
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow"><span className="eyebrow-rule" /> INSTALLED TO A STANDARD</p>
          <h2>The standard we install to, <em>measured.</em></h2>
          <p className="body-copy" style={{ marginTop: "1.2rem" }}>
            A SparkLink system is not finished at handover — it is tuned, tested, and documented.
            These are the representative numbers a healthy installation runs at.
          </p>
        </Reveal>
        <div className="telemetry-grid">
          <div className="telemetry-stats">
            {telemetryStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Reveal key={stat.label} delay={index * 70} style={{ display: "flex", flex: 1 }}>
                  <div className="stat-card glass-card">
                    <div className="stat-value">
                      <span className="stat-icon"><Icon size={17} strokeWidth={1.7} /></span>
                      <strong>{stat.value}</strong>
                    </div>
                    <span className="mono">{stat.label}</span>
                    <p>{stat.note}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <Reveal delay={140} style={{ display: "flex" }}>
            <div className="chart-panel glass-panel">
              <div className="chart-head">
                <div>
                  <h3>Network uptime</h3>
                  <span className="mono">REPRESENTATIVE / FIRST WEEK</span>
                </div>
                <span className="chart-legend"><i /> Daily uptime %</span>
              </div>
              <AreaChart data={chartData} dataKey="uptime" xKey="day" color="#3EA6FF" height={280} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- feature duo (Starlink / CCTV) ---------- */
function Features() {
  return (
    <section className="section" aria-label="Featured services">
      <div className="container feature-duo">
        <Reveal>
          <article className="feature-card glass-panel">
            <div className="feature-icon"><Satellite size={22} strokeWidth={1.5} /></div>
            <p className="eyebrow mono">SATELLITE CONNECTIVITY</p>
            <h3>Get more from your Starlink.</h3>
            <p className="feature-copy">
              Installation quality affects positioning, cable routing, stability, Wi-Fi
              distribution, and the overall quality of the setup. SparkLink makes the route from
              dish to device work harder.
            </p>
            <ul className="step-list">
              {starlinkSteps.map(([number, label]) => (
                <li key={number}>
                  <span className="mono">{number}</span>
                  {label}
                </li>
              ))}
            </ul>
            <a href="#contact" className="btn btn-glass">
              Book a Starlink installation <ArrowUpRight size={17} />
            </a>
          </article>
        </Reveal>
        <Reveal delay={120}>
          <article className="feature-card glass-panel">
            <div className="feature-icon"><ShieldCheck size={22} strokeWidth={1.5} /></div>
            <p className="eyebrow mono">SECURITY / SURVEILLANCE</p>
            <h3>See everything that matters.</h3>
            <p className="feature-copy">
              We plan CCTV installations for residential and commercial environments, with camera
              placement, cabling, and system configuration designed around your site.
            </p>
            <div className="feature-chips">
              {cctvFeatures.map((item) => (
                <span key={item}>
                  <Check size={13} />
                  {item}
                </span>
              ))}
            </div>
            <a href="#contact" className="text-link">
              Plan your security system <ArrowRight size={16} />
            </a>
          </article>
        </Reveal>
      </div>
    </section>
  );
}


/* ---------- about / why ---------- */
function About() {
  const items = [
    ["Professional installation", "Thoughtful mounting, cabling, configuration, and handover."],
    ["Solutions built around your property", "We start with the site, not a one-size-fits-all package."],
    ["Residential & commercial expertise", "Clear technical thinking for the spaces people live and work in."],
    ["Support after installation", "A system is only complete when you know how to use it."],
  ];
  return (
    <section id="about" className="section">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow"><span className="eyebrow-rule" /> WHY SPARKLINK</p>
          <h2>Technology is only useful when it works <em>reliably.</em></h2>
        </Reveal>
        <div className="why-list">
          {items.map(([title, copy], index) => (
            <Reveal key={title} delay={index * 60}>
              <div className="why-card glass-card">
                <span className="why-index">
                  <Check size={16} />
                  <span className="mono">0{index + 1}</span>
                </span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- process ---------- */
function Process() {
  return (
    <section id="process" className="section">
      <div className="aurora aurora-b" style={{ left: "-140px", top: "20%" }} aria-hidden="true" />
      <div className="container process-grid">
        <Reveal className="process-head">
          <p className="eyebrow"><span className="eyebrow-rule" /> A CLEARER ROUTE</p>
          <h2>From enquiry to <em>installation.</em></h2>
          <p className="body-copy" style={{ marginTop: "1.2rem" }}>
            No black box. You always know what happens next.
          </p>
        </Reveal>
        <div className="process-list">
          {processSteps.map(([number, title, copy], index) => (
            <Reveal key={number} delay={index * 70}>
              <div className="process-step glass-card">
                <span className="step-number mono">{number}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- faq ---------- */
function Faq({ openFaq, setOpenFaq }: { openFaq: number | null; setOpenFaq: (value: number | null) => void }) {
  return (
    <section id="faq" className="section">
      <div className="container faq-grid">
        <Reveal className="faq-head">
          <p className="eyebrow"><span className="eyebrow-rule" /> QUESTIONS, ANSWERED</p>
          <h2>Start with what you need to <em>know.</em></h2>
          <p className="body-copy" style={{ marginTop: "1.2rem" }}>
            Still unsure where to start? Send a WhatsApp message and describe the property in your
            own words.
          </p>
          <a href={whatsappHref} target="_blank" rel="noreferrer" className="text-link" style={{ marginTop: "1.4rem" }}>
            Message SparkLink <MessageCircle size={16} />
          </a>
        </Reveal>
        <div className="faq-list">
          {faqs.map(([question, answer], index) => (
            <Reveal key={question} delay={index * 35}>
              <div className={`faq-item glass-card ${openFaq === index ? "faq-open" : ""}`}>
                <button onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}>
                  <span>{question}</span>
                  <ChevronDown size={18} />
                </button>
                <div className="faq-answer">
                  <div className="faq-answer-inner">
                    <p>{answer}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ---------- final cta ---------- */
function FinalCta() {
  return (
    <section className="final-cta">
      <div className="container">
        <Reveal>
          <p className="eyebrow"><span className="eyebrow-rule" /> READY TO UPGRADE YOUR CONNECTION?</p>
          <h2>
            Let’s build a better
            <br />
            <em>connected property.</em>
          </h2>
          <p className="cta-copy">
            Tell us what you need and we’ll recommend a solution for your home, office, or
            commercial property.
          </p>
          <div className="final-actions">
            <a href={whatsappHref} target="_blank" rel="noreferrer" className="btn btn-primary">
              <MessageCircle size={17} /> WhatsApp SparkLink
            </a>
            <a href={phoneHref} className="btn btn-glass">
              <Phone size={17} /> Call us
            </a>
            <a href="#contact" className="btn btn-ghost">
              Request a quote <ArrowUpRight size={17} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- contact ---------- */
function Contact() {
  const [formSent, setFormSent] = useState(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSent(true);
  };

  return (
    <section id="contact" className="section">
      <div className="container contact-grid">
        <Reveal className="contact-intro">
          <p className="eyebrow"><span className="eyebrow-rule" /> CONTACT SPARKLINK</p>
          <h2>Tell us what the property needs.</h2>
          <p className="body-copy" style={{ marginTop: "1.2rem" }}>
            A short brief is enough to start. We’ll come back with the right next step.
          </p>
          <div className="contact-details">
            <a href={phoneHref}>
              <Phone size={17} />
              <span>
                <small className="mono">PHONE / WHATSAPP</small>
                +263 77 379 1578
              </span>
            </a>
            <a href="mailto:nicodimusmlambo@gmail.com">
              <Mail size={17} />
              <span>
                <small className="mono">EMAIL</small>
                nicodimusmlambo@gmail.com
              </span>
            </a>
            <div>
              <MapPin size={17} />
              <span>
                <small className="mono">LOCATION</small>
                Jason Moyo Avenue, Harare
              </span>
            </div>
          </div>
        </Reveal>
        <Reveal className="quote-form-wrap" delay={120}>
          {formSent ? (
            <div className="form-success glass-panel">
              <div className="success-icon"><Check size={24} /></div>
              <p className="eyebrow mono">MESSAGE READY</p>
              <h3>Thanks for reaching out.</h3>
              <p>
                We’ve captured your request in this demo experience. For a live quotation, message
                SparkLink directly on WhatsApp or call the number below.
              </p>
              <div className="form-success-actions">
                <a href={whatsappHref} target="_blank" rel="noreferrer" className="btn btn-primary">
                  Open WhatsApp <ArrowUpRight size={17} />
                </a>
                <a href={phoneHref} className="text-link">
                  Call +263 77 379 1578 <ArrowRight size={16} />
                </a>
              </div>
            </div>
          ) : (
            <form className="quote-form glass-panel" onSubmit={handleSubmit}>
              <div className="form-heading">
                <span className="mono">QUOTE REQUEST / 001</span>
                <span className="status-dot" />
              </div>
              <div className="form-row">
                <label>
                  Name
                  <input required name="name" autoComplete="name" />
                </label>
                <label>
                  Phone
                  <input required name="phone" type="tel" autoComplete="tel" />
                </label>
              </div>
              <div className="form-row">
                <label>
                  Email
                  <input name="email" type="email" autoComplete="email" />
                </label>
                <label>
                  Service interested in
                  <select name="service" defaultValue="">
                    <option value="" disabled>
                      Select a service
                    </option>
                    {serviceOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <label>
                Message
                <textarea name="message" placeholder="Tell us about the property and what you need." />
              </label>
              <button type="submit" className="btn btn-primary">
                Send request <ArrowUpRight size={17} />
              </button>
            </form>
          )}
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
          <Wordmark />
          <p>ICT · Connectivity · Security · Automation</p>
        </div>
        <div className="footer-col">
          <span className="mono">EXPLORE</span>
          <a href="#services">Services</a>
          <a href="#telemetry">Telemetry</a>
          <a href="#process">Process</a>
          <a href="#faq">FAQ</a>
        </div>
        <div className="footer-col">
          <span className="mono">CONTACT</span>
          <a href={phoneHref}>+263 77 379 1578</a>
          <a href="mailto:nicodimusmlambo@gmail.com">Email SparkLink</a>
          <span>Harare, Zimbabwe</span>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 SparkLink Technologies</span>
        <span className="mono">CONNECTED / SECURED / BUILT FOR SPEED</span>
      </div>
    </footer>
  );
}

/* ---------- page ---------- */
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const sectionIds = useMemo(() => navItems.map((item) => item.href), []);

  return (
    <div id="top" className="site-shell">
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-bg" aria-hidden="true" />
          <div className="hero-grid-lines" aria-hidden="true" />
          <div className="aurora aurora-a" aria-hidden="true" />
          <div className="aurora aurora-b" aria-hidden="true" />
          <div className="hero-content container">
            <div className="hero-copy">
              <p className="eyebrow"><span className="eyebrow-rule" /> ICT · CONNECTIVITY · SECURITY</p>
              <h1 id="hero-title">
                Connected.
                <em>Secured.</em>
                Built for speed.
              </h1>
              <p className="hero-description">
                Professional connectivity, networking, surveillance, and smart technology solutions
                for homes and businesses across Zimbabwe.
              </p>
              <div className="hero-actions">
                <a href="#contact" className="btn btn-primary">
                  Get a free quote <ArrowUpRight size={17} />
                </a>
                <a href="#services" className="btn btn-glass">
                  Explore services <ArrowRight size={17} />
                </a>
              </div>
              <p className="hero-trust mono">
                HARARE <i /> RESIDENTIAL <i /> COMMERCIAL
              </p>
            </div>
            <HeroConsole />
          </div>
        </section>

        <Ticker />
        <Solutions />
        <Services />
        <Telemetry />
        <Features />
        <About />
        <Process />
        <Faq openFaq={openFaq} setOpenFaq={setOpenFaq} />
        <FinalCta />
        <Contact />
      </main>

      <Footer />

      <a className="float-wa" href={whatsappHref} target="_blank" rel="noreferrer" aria-label="Chat with SparkLink on WhatsApp">
        <MessageCircle size={21} />
      </a>
      {/* sectionIds kept for potential scroll-spy navigation */}
      <span hidden data-sections={sectionIds.join(",")} />
    </div>
  );
}








