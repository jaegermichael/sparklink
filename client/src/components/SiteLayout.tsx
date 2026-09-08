import { ArrowUpRight, Menu, MessageCircle, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";

const links = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Our work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const mobileLinks = [
  { href: "/#services", label: "Services" },
  { href: "/work", label: "Our work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function SiteLayout({ children, variant = "default" }: { children: ReactNode; variant?: "default" | "showcase" }) {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const scrollToTop = () => window.scrollTo({ top: 0, left: 0, behavior: "auto" });

  useEffect(() => {
    const targetId = window.location.hash.slice(1);
    if (location === "/" && targetId) {
      requestAnimationFrame(() => document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" }));
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location]);

  return (
    <div className={`atlas-site atlas-site-${variant}`}>
      <a className="atlas-skip-link" href="#main-content">Skip to content</a>
      <header className="atlas-header">
        <Link href="/" onClick={scrollToTop} className="atlas-logo"><img src="/logo.png" alt="SparkLink Technologies" /></Link>
        <nav>{links.map((link) => <Link onClick={scrollToTop} key={link.href} href={link.href} className={location === link.href ? "is-active" : ""}>{link.label}</Link>)}</nav>
        <a className="atlas-header-cta" href="https://wa.me/263773791578" target="_blank" rel="noreferrer">Let’s talk <ArrowUpRight size={15} /></a>
        <button className="atlas-menu" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
        {open && <div className="atlas-mobile-nav">{mobileLinks.map((link) => <a onClick={() => setOpen(false)} key={link.href} href={link.href}>{link.label}</a>)}</div>}
      </header>
      <main id="main-content">{children}</main>
      <a className="atlas-whatsapp-float" href="https://wa.me/263773791578" target="_blank" rel="noreferrer" aria-label="Chat with SparkLink on WhatsApp">
        <MessageCircle size={22} />
        <span>WhatsApp</span>
      </a>
      <footer className="atlas-footer">
        <div className="atlas-wrap">
          <div className="atlas-footer-top"><div><img className="atlas-footer-logo" src="/logo.png" alt="SparkLink Technologies" /><p className="atlas-eyebrow"><span />SparkLink Technologies</p><h2>Let’s make your<br /><em>property work.</em></h2></div><div className="atlas-footer-details"><p>Connectivity, security, Wi-Fi and VoIP systems installed with care across Zimbabwe.</p><nav>{links.map((link) => <Link onClick={scrollToTop} key={link.href} href={link.href}>{link.label}</Link>)}</nav><a href="tel:+263773791578">+263 77 379 1578</a><a href="mailto:nicodimusmlambo@gmail.com">nicodimusmlambo@gmail.com</a></div><a className="atlas-button" href="https://wa.me/263773791578" target="_blank" rel="noreferrer"><MessageCircle size={17} /> Message us</a></div>
          <div className="atlas-footer-bottom"><span>Harare, Zimbabwe</span><span>© {new Date().getFullYear()} SparkLink</span><span>Internet · Security · Wi-Fi · VoIP</span></div>
        </div>
      </footer>
    </div>
  );
}
