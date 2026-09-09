import { ArrowDownRight, ArrowRight, ArrowUpRight, Check, Minus, Network, PhoneCall, Plus, Satellite, ShieldCheck, ShoppingCart, Trash2, Wifi } from "lucide-react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { Link } from "wouter";
import SiteLayout from "@/components/SiteLayout";

const services = [
  { number: "01", label: "Satellite connectivity", title: "Starlink systems", text: "Gen 3, Mini and high-performance kits installed with secure mounting, clean routes and tested handover.", image: "/Starlink High Performance Kit Gen 2.jpeg", icon: Satellite, className: "infra-service-wide" },
  { number: "02", label: "Property intelligence", title: "CCTV & security", text: "Camera coverage, recording and secure remote access designed around the way your site operates.", image: "/Advanced CCTV SURVEILLANCE SYSTEMS.jpeg", icon: ShieldCheck, className: "infra-service-tall" },
  { number: "03", label: "Connected environments", title: "Networks & Wi-Fi", text: "Structured cabling and indoor coverage that keeps homes, offices and industrial sites reliably online.", image: "/Indoor Wifi Coverage Router.jpeg", icon: Wifi, className: "infra-service-compact" },
  { number: "04", label: "Business voice", title: "VoIP services", text: "Internet-based calling, office handsets and voice systems configured for clearer business communication.", image: "/VoIP Sevices.jpeg", icon: PhoneCall, className: "infra-service-compact" },
];


const accessories = [
  { image: "/accessory-ptz-wifi-camera.jpeg", title: "PTZ Wi-Fi cameras", price: "$100", amount: 100, meta: "Motion detection · Alarm integration" },
  { image: "/accessory-tplink-omada-eap750.jpeg", title: "TP-Link Omada EAP750", price: "$150", amount: 150, meta: "Hotspot systems access point" },
  { image: "/accessory-tplink-8-port-switch.jpeg", title: "8-port network switch", price: "$20", amount: 20, meta: "Compact wired network expansion" },
  { image: "/accessory-starlink-gen3-cable-15m.jpeg", title: "Starlink Gen 3 cable", price: "$80", amount: 80, meta: "15m replacement cable" },
  { image: "/accessory-flexible-conduit-pipe.jpeg", title: "Flexible conduit pipe", price: "$3", amount: 3, meta: "Per metre cable protection" },
  { image: "/accessory-starlink-pole-mount.jpeg", title: "Starlink pole mount", price: "$15", amount: 15, meta: "Compatible with Gen 3 and Mini dish" },
  { image: "/accessory-starlink-gen3-pole-adapter.jpeg", title: "Starlink Gen 3 pole adapter", price: "$70", amount: 70, meta: "Mounting adapter" },
  { image: "/accessory-starlink-gen2-ethernet-adapter.jpeg", title: "Starlink Gen 2 ethernet adapter", price: "$50", amount: 50, meta: "Wired Starlink connection" },
  { image: "/accessory-starlink-mini-v5-power-adapter.jpeg", title: "Starlink Mini V5 power adapter", price: "$50", amount: 50, meta: "Replacement power adapter" },
];

const process = [
  ["01", "Consultation", "We establish the outcome, site constraints and budget."],
  ["02", "Site assessment", "We inspect coverage, routes, power and equipment positions."],
  ["03", "System design", "You receive a practical solution built for the property."],
  ["04", "Installation", "Our team installs, configures and tests every component."],
  ["05", "Support", "We remain available after handover when the site needs us."],
];

const projects = [
  { image: "/WhatsApp Image 2026-09-08 at 07.04.30 (1).jpeg", title: "Industrial security deployment", meta: "Solar facility · Zimbabwe", className: "infra-proof-lead" },
  { image: "/Starlink Gen3 V4.jpeg", title: "Starlink Gen 3 deployment", meta: "Residential connectivity", className: "infra-proof-top" },
  { image: "/Speed Dome PTZ  CCTV.jpeg", title: "PTZ camera coverage", meta: "Active site monitoring", className: "infra-proof-bottom" },
  { image: "/CCTV Footages for IP Systems.jpeg", title: "IP CCTV footage review", meta: "Network video system", className: "infra-proof-bottom" },
  { image: "/security system.jpeg", title: "Security control point", meta: "Site protection", className: "infra-proof-top" },
];

const gallery = [
  { image: "/starlink-mini-indoor-wifi-access-point.jpeg", title: "Starlink Mini plus indoor Wi-Fi" },
  { image: "/Starlink Gen3 V4.jpeg", title: "Starlink Gen 3 kit" },
  { image: "/CCTV Footages for IP Systems 2.jpeg", title: "IP CCTV monitoring" },
  { image: "/VoIP Sevices 2.jpeg", title: "VoIP desk phones" },
  { image: "/VoIP Sevices3.jpeg", title: "Business voice setup" },
];

const reveal = {
  hidden: { opacity: 0, y: 42 },
  visible: { opacity: 1, y: 0, transition: { duration: .78, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const proofRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const pageProgress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: .2 });
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroCopyY = useTransform(heroProgress, [0, 1], [0, -82]);
  const heroVisualY = useTransform(heroProgress, [0, 1], [0, 118]);
  const heroOrbitRotate = useTransform(heroProgress, [0, 1], [0, 9]);
  const heroRailY = useTransform(heroProgress, [0, 1], [0, 46]);
  const { scrollYProgress: proofProgress } = useScroll({ target: proofRef, offset: ["start end", "end start"] });
  const proofY = useTransform(proofProgress, [0, 1], [-28, 40]);
  const [cart, setCart] = useState<Record<string, number>>({});
  const cartItems = useMemo(() => accessories.filter((item) => cart[item.title]).map((item) => ({ ...item, quantity: cart[item.title] })), [cart]);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + item.amount * item.quantity, 0);
  const orderMessage = encodeURIComponent(`Hi SparkLink, I would like to order:\n\n${cartItems.map((item) => `- ${item.quantity} x ${item.title} (${item.price} each)`).join("\n")}\n\nEstimated total: $${cartTotal}\n\nPlease confirm availability and delivery/installation details.`);
  const orderUrl = `https://wa.me/263773791578?text=${orderMessage}`;
  const updateCart = (title: string, change: number) => setCart((current) => {
    const nextQuantity = Math.max((current[title] ?? 0) + change, 0);
    const next = { ...current };
    if (nextQuantity === 0) delete next[title];
    else next[title] = nextQuantity;
    return next;
  });
  const removeFromCart = (title: string) => setCart((current) => {
    const next = { ...current };
    delete next[title];
    return next;
  });

  return (
    <SiteLayout variant="showcase">
      <motion.div className="atlas-scroll-progress" style={{ scaleX: pageProgress }} aria-hidden="true" />

      <section ref={heroRef} className="spark-hero">
        <div className="spark-hero-grid" aria-hidden="true" />
        <div className="spark-hero-glow spark-hero-glow-one" aria-hidden="true" />
        <div className="spark-hero-glow spark-hero-glow-two" aria-hidden="true" />
        <motion.img className="spark-hero-tech" src="/hero-tech-still-life.png" alt="" aria-hidden="true" style={reduceMotion ? undefined : { y: heroVisualY }} />

        <motion.div className="spark-hero-copy infra-shell" style={reduceMotion ? undefined : { y: heroCopyY }} initial="hidden" animate="visible" variants={reveal}>
          <p className="spark-hero-tag"><span /> SparkLink Technologies</p>
          <h1>Reliable internet.<br /><em>Real peace of mind.</em></h1>
          <p className="spark-hero-lede">Starlink, Wi-Fi, CCTV and VoIP systems installed neatly for homes and businesses across Zimbabwe.</p>
          <div className="infra-actions spark-hero-actions">
            <Link href="/contact" className="infra-button infra-button-primary">Request a site assessment <span><ArrowUpRight size={16} strokeWidth={1.5} /></span></Link>
            <a href="https://wa.me/263773791578" target="_blank" rel="noreferrer" className="infra-text-link">Talk on WhatsApp <ArrowRight size={15} /></a>
          </div>
        </motion.div>

        <motion.div className="spark-hero-visual" style={reduceMotion ? undefined : { y: heroVisualY }}>
          <motion.div className="spark-hero-orbit" style={reduceMotion ? undefined : { rotate: heroOrbitRotate }} aria-hidden="true"><i /><i /></motion.div>
          <div className="spark-hero-disc" aria-hidden="true" />
          <img src="/african woman.png" alt="SparkLink technology consultant holding a tablet" fetchPriority="high" />
          <motion.aside className="spark-hero-card" initial={{ opacity: 0, y: 24, rotate: -2 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ delay: .55, duration: .74, ease: [0.22, 1, 0.36, 1] }}>
            <span><Network size={16} strokeWidth={1.5} /></span>
            <div><small>Site signal</small><strong>Connected</strong></div>
          </motion.aside>
        </motion.div>

        <motion.div className="spark-hero-rail" style={reduceMotion ? undefined : { y: heroRailY }}>
          <div><strong>5+</strong><span>Years of field work</span></div>
          <div><strong>Harare</strong><span>Based in Zimbabwe</span></div>
          <a href="#services"><span>Explore services</span><ArrowDownRight size={17} /></a>
        </motion.div>
      </section>

      <section id="services" className="infra-services">
        <div className="infra-shell">
          <motion.div className="infra-section-head" initial="hidden" whileInView="visible" viewport={{ once: true, amount: .4 }} variants={reveal}>
            <p className="infra-index">01 / Integrated systems</p>
            <h2>One accountable team.<br /><em>Four critical layers.</em></h2>
            <p>Connectivity, security, local networks and business voice planned as one environment, then installed with care.</p>
          </motion.div>
          <div className="infra-service-grid">
            {services.map((service, index) => (
              <motion.article className={`infra-service-card ${service.className}`} key={service.title} initial={{ opacity: 0, y: 48 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .24 }} transition={{ delay: index * .1, duration: .72, ease: [0.22, 1, 0.36, 1] }} whileHover={reduceMotion ? undefined : { y: -8 }} whileTap={{ scale: .985 }}>
                <div className="infra-service-image"><img src={service.image} alt={service.title} loading="lazy" /><div className="infra-service-wash" /></div>
                <div className="infra-service-copy"><span className="infra-service-number">{service.number}</span><service.icon size={22} strokeWidth={1.35} /><p>{service.label}</p><h3>{service.title}</h3><span>{service.text}</span><Link href="/services" aria-label={`Learn about ${service.title}`}><ArrowUpRight size={17} /></Link></div>
              </motion.article>
            ))}
          </div>
          <p className="infra-swipe-hint">Swipe to explore services <ArrowRight size={15} /></p>

          <motion.div className="infra-accessories" initial={{ opacity: 0, y: 38 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .72, ease: [0.22, 1, 0.36, 1] }}>
            <div className="infra-accessories-head">
              <p className="infra-index">Accessories / Add-ons</p>
              <h3>Hardware ready for cleaner installs.</h3>
              <p>Starlink mounts, cables, adapters, access points and network accessories available with your installation.</p>
            </div>
            <div className="infra-accessory-grid">
              {accessories.map((item, index) => (
                <motion.article className="infra-accessory-card" key={item.title} whileHover={reduceMotion ? undefined : { y: -6, rotate: index % 2 === 0 ? -.35 : .35 }} whileTap={{ scale: .985 }}>
                  <img src={item.image} alt={item.title} loading="lazy" />
                  <div>
                    <span>{item.price}</span>
                    <h4>{item.title}</h4>
                    <p>{item.meta}</p>
                    <button type="button" onClick={() => updateCart(item.title, 1)} aria-label={`Add ${item.title} to order`}>
                      <ShoppingCart size={15} strokeWidth={1.6} /> Order
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
            <p className="infra-swipe-hint infra-accessory-swipe">Swipe accessories <ArrowRight size={15} /></p>
            <motion.aside className="infra-order-cart" initial={{ opacity: 0, y: 24 }} animate={{ opacity: cartCount ? 1 : .86, y: 0 }} transition={{ duration: .45, ease: [0.22, 1, 0.36, 1] }}>
              <div className="infra-order-cart-head">
                <span><ShoppingCart size={17} strokeWidth={1.6} /></span>
                <div><small>Accessory order</small><strong>{cartCount ? `${cartCount} item${cartCount === 1 ? "" : "s"}` : "Cart is empty"}</strong></div>
                <b>${cartTotal}</b>
              </div>
              {cartItems.length > 0 ? (
                <>
                  <div className="infra-order-cart-list">
                    {cartItems.map((item) => (
                      <div className="infra-order-line" key={item.title}>
                        <img src={item.image} alt="" aria-hidden="true" />
                        <p><strong>{item.title}</strong><span>{item.price} each</span></p>
                        <div className="infra-order-qty" aria-label={`${item.title} quantity`}>
                          <button type="button" onClick={() => updateCart(item.title, -1)} aria-label={`Remove one ${item.title}`}><Minus size={13} /></button>
                          <span>{item.quantity}</span>
                          <button type="button" onClick={() => updateCart(item.title, 1)} aria-label={`Add one ${item.title}`}><Plus size={13} /></button>
                        </div>
                        <button type="button" className="infra-order-remove" onClick={() => removeFromCart(item.title)} aria-label={`Remove ${item.title} from order`}><Trash2 size={14} /></button>
                      </div>
                    ))}
                  </div>
                  <a className="infra-order-submit" href={orderUrl} target="_blank" rel="noreferrer">Send order on WhatsApp <ArrowUpRight size={16} strokeWidth={1.6} /></a>
                </>
              ) : <p className="infra-order-empty">Choose accessories above and we’ll prepare a WhatsApp order message for you.</p>}
            </motion.aside>
          </motion.div>
        </div>
      </section>

      <section ref={proofRef} className="infra-proof">
        <div className="infra-shell infra-proof-layout">
          <motion.div className="infra-proof-copy" initial="hidden" whileInView="visible" viewport={{ once: true, amount: .35 }} variants={reveal}>
            <p className="infra-index">02 / Infrastructure we’ve deployed</p>
            <h2>Visible work.<br /><em>Proven in the field.</em></h2>
            <p>Real installations, real sites and systems commissioned by the SparkLink team.</p>
            <div className="infra-proof-stats"><div><strong>End-to-end</strong><span>Assessment to handover</span></div><div><strong>On site</strong><span>Across Zimbabwe</span></div></div>
            <Link href="/work" className="infra-text-link">See how we work <ArrowUpRight size={16} /></Link>
          </motion.div>
          <motion.div className="infra-proof-grid" style={reduceMotion ? undefined : { y: proofY }}>
            {projects.map((project) => <figure className={project.className} key={project.title}><img src={project.image} alt={project.title} loading="lazy" /><figcaption><strong>{project.title}</strong><span>{project.meta}</span></figcaption></figure>)}
          </motion.div>
          <motion.div className="infra-gallery-strip" initial={{ opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .72, ease: [0.22, 1, 0.36, 1] }}>
            {gallery.map((item, index) => <figure key={item.title}><img src={item.image} alt={item.title} loading={index === 0 ? "eager" : "lazy"} /><figcaption>{item.title}</figcaption></figure>)}
          </motion.div>
        </div>
      </section>

      <section className="infra-process">
        <div className="infra-shell">
          <motion.div className="infra-section-head infra-process-head" initial="hidden" whileInView="visible" viewport={{ once: true, amount: .45 }} variants={reveal}>
            <p className="infra-index">03 / From brief to support</p>
            <h2>A clear route from<br /><em>problem to working system.</em></h2>
          </motion.div>
          <div className="infra-process-track">
            <motion.div className="infra-process-line infra-process-line-desktop" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, amount: .55 }} transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }} />
            <div className="infra-process-line infra-process-line-mobile"><motion.i initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true, amount: .3 }} transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }} /></div>
            {process.map(([number, title, text], index) => <motion.article key={title} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .55 }} transition={{ delay: .14 + index * .1, duration: .6, ease: [0.22, 1, 0.36, 1] }}><span>{number}</span><i /><h3>{title}</h3><p>{text}</p></motion.article>)}
          </div>
        </div>
      </section>

      <section className="infra-standard">
        <div className="infra-shell infra-standard-layout">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: .4 }} variants={reveal}><p className="infra-index">04 / The installation standard</p><h2>Technical work that respects the building it lives in.</h2></motion.div>
          <div className="infra-standard-list">{["A site-aware installation plan", "Neat, protected cable runs", "Every system configured before handover", "One team to call after installation"].map((item, index) => <motion.p key={item} initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * .08 }}><Check size={17} strokeWidth={1.5} />{item}</motion.p>)}</div>
        </div>
      </section>

      <section className="infra-closing">
        <div className="infra-grid infra-grid-closing" aria-hidden="true" />
        <div className="infra-closing-orbit" aria-hidden="true"><i /><i /><i /></div>
        <motion.div className="infra-shell infra-closing-copy" initial="hidden" whileInView="visible" viewport={{ once: true, amount: .4 }} variants={reveal}>
          <p className="infra-kicker"><span className="infra-live-dot" /> Site assessments available</p>
          <h2>What does your property<br /><em>need to do better?</em></h2>
          <p>Tell us what is unreliable, uncovered or disconnected. We’ll help you plan the right next move.</p>
          <div className="infra-actions"><Link href="/contact" className="infra-button infra-button-primary">Request a site assessment <span><ArrowUpRight size={16} /></span></Link><a className="infra-text-link" href="tel:+263773791578">+263 77 379 1578</a></div>
        </motion.div>
      </section>
    </SiteLayout>
  );
}

