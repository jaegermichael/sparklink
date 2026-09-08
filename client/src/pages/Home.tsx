
import { ArrowDownRight, ArrowRight, ArrowUpRight, Check, Satellite, ShieldCheck, Wifi } from "lucide-react";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { Link } from "wouter";
import SiteLayout from "@/components/SiteLayout";

const cards = [
  { label: "Satellite internet", title: "Starlink", text: "Clear-sky positioning, secure mounting and a clean, tested handover.", image: "/WhatsApp Image 2026-09-08 at 07.05.34.jpeg", icon: Satellite },
  { label: "Property security", title: "CCTV", text: "Camera systems that let you see your site clearly, wherever you are.", image: "/WhatsApp Image 2026-09-08 at 07.04.31.jpeg", icon: ShieldCheck },
  { label: "Connected spaces", title: "Wi-Fi", text: "Coverage and cabling planned for the way your building is actually used.", image: "/WhatsApp Image 2026-09-08 at 07.05.35 (1).jpeg", icon: Wifi },
];

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const workRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const pageProgress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: .2 });
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const copyY = useTransform(heroProgress, [0, .78], [0, -76]);
  const visualY = useTransform(heroProgress, [0, 1], [0, -132]);
  const visualRotate = useTransform(heroProgress, [0, 1], [0, 4]);
  const railOpacity = useTransform(heroProgress, [0, .72], [1, 0]);
  const techX = useTransform(heroProgress, [0, 1], [0, -90]);
  const { scrollYProgress: workProgress } = useScroll({ target: workRef, offset: ["start end", "end start"] });
  const workImageY = useTransform(workProgress, [0, 1], [-48, 46]);

  return (
    <SiteLayout variant="showcase">
      <motion.div className="atlas-scroll-progress" style={{ scaleX: pageProgress }} aria-hidden="true" />
      <section ref={heroRef} className="atlas-hero atlas-reference-hero">
        <div className="atlas-reference-panel">
          <div className="atlas-reference-haze" />
          <motion.img className="atlas-reference-tech-still" src="/WhatsApp Image 2026-09-08 at 07.05.34.jpeg" alt="" aria-hidden="true" style={reduceMotion ? undefined : { x: techX }} />
          <motion.div className="atlas-reference-copy" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, ease: [0.22, 1, 0.36, 1] }} style={reduceMotion ? undefined : { y: copyY }}>
            <p className="atlas-reference-tag"><span /> SparkLink Technologies</p>
            <h1>Reliable internet.<br /><em>Real peace of mind.</em></h1>
            <p>Starlink, Wi-Fi and CCTV systems installed neatly for homes and businesses across Zimbabwe.</p>
            <a className="atlas-reference-button" href="https://wa.me/263773791578" target="_blank" rel="noreferrer">Get your quote <ArrowRight size={15} /></a>
          </motion.div>
          <motion.div className="atlas-reference-visual" initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .85, delay: .16, ease: [0.22, 1, 0.36, 1] }} style={reduceMotion ? undefined : { y: visualY, rotate: visualRotate }}>
            <div className="atlas-reference-orbit"><i /><i /></div>
            <div className="atlas-reference-disc" />
            <img src="/african woman.png" alt="SparkLink technology consultant holding a tablet" fetchPriority="high" />
            <div className="atlas-reference-device"><Satellite size={18} /><span>Site signal<br /><b>Connected</b></span></div>
          </motion.div>
          <motion.div className="atlas-reference-rail" style={reduceMotion ? undefined : { opacity: railOpacity }}>
            <div><b>5+</b><span>Years of<br />field work</span></div>
            <div><b>Harare</b><span>Based in Zimbabwe</span></div>
            <Link href="/services">Explore services <ArrowDownRight size={17} /></Link>
          </motion.div>
        </div>
      </section>
      <section className="atlas-intro"><motion.div className="atlas-wrap atlas-intro-grid" initial={{ opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .35 }} transition={{ duration: .75, ease: [0.22, 1, 0.36, 1] }}><p className="atlas-index">01 / Why SparkLink</p><h2>Your connection should feel <em>invisible.</em><br />Until you need it.</h2><p>We take responsibility for the practical details: the right equipment, the cable route, the view to the sky and the configuration that makes it all behave as one.</p></motion.div></section>
      <section className="atlas-services-preview"><div className="atlas-wrap"><div className="atlas-section-top"><p className="atlas-eyebrow"><span />Core systems</p><Link href="/services" className="atlas-link">All services <ArrowUpRight size={17} /></Link></div><div className="atlas-service-rail">{cards.map((card, index) => <motion.article className="atlas-service-card" key={card.title} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ delay: index * .08, duration: .6 }}><div className="atlas-card-image"><img src={card.image} alt={card.title} loading="lazy" /><span>0{index + 1}</span></div><div className="atlas-card-copy"><card.icon size={20} /><p>{card.label}</p><h3>{card.title}</h3><span>{card.text}</span></div></motion.article>)}</div></div></section>
      <section className="atlas-signal"><div className="atlas-wrap atlas-signal-grid"><div><p className="atlas-eyebrow"><span />The handover standard</p><h2>Installed with care.<br /><em>Ready for real life.</em></h2></div><div className="atlas-checks">{["A site-aware installation plan", "Neat, protected cable runs", "Systems fully configured before handover", "One team to call after installation"].map((item, index) => <motion.p key={item} initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * .08 }}><Check size={17} />{item}</motion.p>)}</div></div></section>
      <section ref={workRef} className="atlas-work-tease"><div className="atlas-wrap atlas-work-grid"><motion.div className="atlas-work-portrait" style={reduceMotion ? undefined : { y: workImageY }}><img src="/WhatsApp Image 2026-09-08 at 07.04.30 (1).jpeg" alt="SparkLink installation team working on site" loading="lazy" /><span>Field notes / 2026</span></motion.div><motion.div initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .3 }} transition={{ duration: .65, ease: [0.22, 1, 0.36, 1] }}><p className="atlas-eyebrow"><span />Our work</p><h2>Technical work that respects the building it lives in.</h2><p>From a single Starlink dish to a multi-building network, the details have to stand up long after the tools are packed away.</p><Link href="/work" className="atlas-button atlas-button-dark">Explore our approach <ArrowUpRight size={17} /></Link></motion.div></div></section>
    </SiteLayout>
  );
}
