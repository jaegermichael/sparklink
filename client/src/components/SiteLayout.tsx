import { ArrowUpRight, Menu, MessageCircle, Satellite, X } from "lucide-react";
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

  useEffect(() => {
    const targetId = window.location.hash.slice(1);
    if (location === "/" && targetId) {
      requestAnimationFrame(() => document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" }));
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);

  return (
    <div className={`atlas-site atlas-site-${variant}`}>
      <header className="atlas-header">
        <Link href="/" className="atlas-logo"><span><Satellite size={16} /></span><b>Spark<em>Link</em></b><small>Technologies</small></Link>
        <nav>{links.map((link) => <Link key={link.href} href={link.href} className={location === link.href ? "is-active" : ""}>{link.label}</Link>)}</nav>
        <a className="atlas-header-cta" href="https://wa.me/263773791578" target="_blank" rel="noreferrer">Let’s talk <ArrowUpRight size={15} /></a>
        <button className="atlas-menu" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
        {open && <div className="atlas-mobile-nav">{mobileLinks.map((link) => <a onClick={() => setOpen(false)} key={link.href} href={link.href}>{link.label}</a>)}</div>}
      </header>
      {children}
      <a className="atlas-whatsapp-float" href="https://wa.me/263773791578" target="_blank" rel="noreferrer" aria-label="Chat with SparkLink on WhatsApp">
        <MessageCircle size={22} />
        <span>WhatsApp</span>
      </a>
      <footer className="atlas-footer">
        <div className="atlas-wrap">
          <div className="atlas-footer-top"><div><p className="atlas-eyebrow"><span />SparkLink Technologies</p><h2>Let’s make your<br /><em>property work.</em></h2></div><a className="atlas-button" href="https://wa.me/263773791578" target="_blank" rel="noreferrer"><MessageCircle size={17} /> Message us</a></div>
          <div className="atlas-footer-bottom"><span>Harare, Zimbabwe</span><span>© {new Date().getFullYear()} SparkLink</span><span>Internet · Security · Wi-Fi</span></div>
        </div>
      </footer>
    </div>
  );
}
