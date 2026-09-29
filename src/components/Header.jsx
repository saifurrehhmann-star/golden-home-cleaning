import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import Brand from './Brand.jsx';
import { locations, navServices } from '../data/site.js';

const navItems = [
  { label: 'Home', to: '/', end: true },
  { label: 'About', to: '/about' },
  { label: 'Why Golden Home', to: '/why-us' },
  { label: 'How it works', to: '/how-it-works' },
  { label: 'Service areas', to: '/service-areas' },
  { label: 'FAQs', to: '/faqs' },
  { label: 'Contact', to: '/contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => { setOpen(false); }, [location.pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return <>
    <div className="utility-bar"><div className="utility-inner"><span>Thoughtful care for the place you call home</span><span>Serving Dubai · By appointment</span></div></div>
    <header className={`site-header ${scrolled ? 'site-header-scrolled' : ''}`}>
      <div className="header-inner">
        <Brand />
        <button className="mobile-menu-toggle" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'}>{open ? <X/> : <Menu/>}</button>
        <nav className={`primary-nav ${open ? 'primary-nav-open' : ''}`} aria-label="Main navigation">
          {navItems.slice(0, 1).map((item) => <NavLink key={item.to} to={item.to} end={item.end}>{item.label}</NavLink>)}
          <details className="nav-services"><summary>Services <ChevronDown size={14}/></summary><div className="nav-dropdown"><Link className="nav-dropdown-all" to="/services">All services <ArrowUpRight size={15}/></Link>{navServices.map((service) => <Link key={service.to} to={service.to}>{service.label}</Link>)}</div></details>
          {navItems.slice(1).map((item) => <NavLink key={item.to} to={item.to}>{item.label}</NavLink>)}
          <Link className="button button-gold nav-book" to="/book">Book now <ArrowUpRight size={15}/></Link>
          {open && <div className="mobile-service-links"><span>Popular services</span>{navServices.map((service) => <Link key={service.to} to={service.to}>{service.label}</Link>)}<span>Neighbourhoods</span>{locations.map((area) => <Link key={area.slug} to={`/service-areas/${area.slug}`}>{area.name}</Link>)}</div>}
        </nav>
      </div>
    </header>
  </>;
}
