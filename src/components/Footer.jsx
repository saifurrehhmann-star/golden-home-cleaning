import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import Brand from './Brand.jsx';
import { business, locations, services } from '../data/site.js';

export default function Footer() {
  return <footer className="site-footer">
    <div className="footer-main">
      <div className="footer-brand-col"><Brand footer/><p>Considered cleaning for the spaces you love. A little more room for life.</p><a href={`mailto:${business.email}`}>{business.email}</a><a className="footer-phone" href={`tel:${business.phoneLink}`}>{business.phone}</a></div>
      <div className="footer-links"><h2>Explore</h2><Link to="/about">About us</Link><Link to="/why-us">Why Golden Home</Link><Link to="/how-it-works">How it works</Link><Link to="/faqs">Frequently asked questions</Link><Link to="/contact">Contact</Link></div>
      <div className="footer-links"><h2>Services</h2>{services.slice(0, 6).map((service) => <Link key={service.slug} to={`/services/${service.slug}`}>{service.title}</Link>)}<Link className="footer-all-link" to="/services">All services <ArrowRight size={14}/></Link></div>
      <div className="footer-links"><h2>Service areas</h2>{locations.map((area) => <Link key={area.slug} to={`/service-areas/${area.slug}`}>{area.name}</Link>)}<Link className="footer-all-link" to="/service-areas">Check your area <ArrowRight size={14}/></Link></div>
    </div>
    <div className="footer-lower"><span>© {new Date().getFullYear()} Golden Home Cleaning</span><span>Service area and availability confirmed when you enquire.</span><a href="#page-top">Back to top ↑</a></div>
  </footer>;
}
