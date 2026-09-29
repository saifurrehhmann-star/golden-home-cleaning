import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router';
import { business } from '../data/site.js';

export const photoUrl = (id, width = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;
export const photoSrcSet = (id, maxWidth = 1600) => [360, 480, 640, 800, 960, 1200, 1600, 1900, 2100].filter((width) => width < maxWidth).concat(maxWidth).map((width) => `${photoUrl(id, width)} ${width}w`).join(', ');

export function Eyebrow({ children, light = false }) {
  return <p className={`eyebrow ${light ? 'eyebrow-light' : ''}`}><span aria-hidden="true"/>{children}</p>;
}

export function ButtonLink({ to, children, tone = 'gold', arrow = true, className = '' }) {
  return <Link className={`button button-${tone} ${className}`} to={to}>{children}{arrow && <ArrowRight size={16} aria-hidden="true"/>}</Link>;
}

export function Breadcrumbs({ items = [] }) {
  return <nav className="breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link>{items.map((item) => <span key={item.label}>/ {item.to ? <Link to={item.to}>{item.label}</Link> : item.label}</span>)}</nav>;
}

export function PageHero({ eyebrow, title, emphasis, text, image, alt, compact = false }) {
  return <section className={`page-hero ${compact ? 'page-hero-compact' : ''}`}>
    <img src={photoUrl(image, 1900)} srcSet={photoSrcSet(image, 1900)} sizes="100vw" alt={alt} className="page-hero-image" fetchPriority="high" width="1900" height="1050"/>
    <div className="page-hero-shade"/>
    <div className="page-hero-content"><Eyebrow light>{eyebrow}</Eyebrow><h1>{title} {emphasis && <em>{emphasis}</em>}</h1>{text && <p>{text}</p>}</div>
  </section>;
}

export function ServiceCard({ service, index = 0 }) {
  return <Link className="service-card" to={`/services/${service.slug}`} data-reveal style={{ '--card-delay': `${(index % 3) * 70}ms` }}>
    <div className="service-card-photo"><img src={photoUrl(service.image, 800)} srcSet={photoSrcSet(service.image, 800)} sizes="(max-width: 600px) calc(100vw - 46px), (max-width: 850px) 45vw, 33vw" alt={service.alt} loading="lazy" width="800" height="610"/><span className="service-card-number">{String(index + 1).padStart(2, '0')}</span><span className="service-card-open"><ArrowUpRight size={17}/></span></div>
    <div className="service-card-info"><span className="card-category">{service.category}</span><h3>{service.title}</h3><p>{service.short}</p><span className="card-more">Explore this service <ArrowRight size={14}/></span></div>
  </Link>;
}

export function CtaBand({ title = 'A little more room for life.', text = 'Tell us about your home and the kind of clean you need. We’ll help with the next step.', image = 'photo-1600607687939-ce8a6c25118c' }) {
  return <section className="cta-band" data-reveal><img src={photoUrl(image, 1600)} srcSet={photoSrcSet(image, 1600)} sizes="100vw" alt="Calm, welcoming home interior" loading="lazy" width="1600" height="850"/><div className="cta-band-shade"/><div className="cta-band-copy"><Eyebrow light>GOLDEN HOME · THOUGHTFUL CLEANING</Eyebrow><h2>{title}</h2><p>{text}</p><ButtonLink to="/book/">Request a booking</ButtonLink></div></section>;
}

export function Accordion({ items }) {
  const [open, setOpen] = useState(0);
  return <div className="accordion-list">{items.map(([question, answer], index) => <div className={`accordion-item ${open === index ? 'accordion-open' : ''}`} key={question}>
    <button type="button" aria-expanded={open === index} onClick={() => setOpen(open === index ? -1 : index)}><span>{question}</span><ChevronDown size={18}/></button>
    <div className="accordion-answer"><div><p>{answer}</p></div></div>
  </div>)}</div>;
}

export function QuoteForm({ defaultService = '', booking = false }) {
  const [submitted, setSubmitted] = useState(false);
  const [dateMin] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date.toISOString().slice(0, 10);
  });

  function handleSubmit(event) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Golden Home ${booking ? 'booking request' : 'enquiry'} — ${fields.get('service') || 'Home cleaning'}`);
    const body = encodeURIComponent([
      `Name: ${fields.get('name')}`,
      `Phone: ${fields.get('phone')}`,
      `Email: ${fields.get('email')}`,
      `Address: ${fields.get('address') || 'Not provided'}`,
      `Service: ${fields.get('service') || 'Please advise'}`,
      `Preferred date: ${fields.get('date') || 'Flexible'}`,
      `Preferred time: ${fields.get('time') || 'Flexible'}`,
      '',
      `Notes: ${fields.get('notes') || 'None'}`,
    ].join('\n'));
    setSubmitted(true);
    window.location.href = `mailto:${business.email}?subject=${subject}&body=${body}`;
  }

  if (submitted) return <div className="form-confirmation" role="status"><span>✓</span><h2>Your request is ready</h2><p>Your email app should open with the details filled in. We’ll confirm availability and your appointment by replying. Your booking is not confirmed until we get back to you.</p><a href={`mailto:${business.email}`}>{business.email}</a></div>;

  return <form className="quote-form" onSubmit={handleSubmit}>
    <div className="form-row"><label>Full name<input name="name" autoComplete="name" placeholder="Your name" required/></label><label>Email address<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required/></label></div>
    <div className="form-row"><label>Phone number<input name="phone" type="tel" autoComplete="tel" placeholder="Best number to reach you" required/></label><label>Address<input name="address" autoComplete="street-address" placeholder="Street and neighbourhood" required/></label></div>
    <div className="form-row"><label>Service <span>{booking ? '' : '(optional)'}</span><select name="service" defaultValue={defaultService} required={booking}><option value="">{booking ? 'Select a service' : 'Please advise'}</option><option>Home Cleaning</option><option>Deep Cleaning</option><option>Villa Cleaning</option><option>Apartment Cleaning</option><option>Kitchen Cleaning</option><option>Office Cleaning</option><option>Move In / Move Out Cleaning</option><option>Post Construction Cleaning</option><option>Sofa Cleaning</option><option>Carpet Cleaning</option><option>Mattress Cleaning</option><option>Commercial Cleaning</option><option>Holiday Home Cleaning</option></select></label><label>Preferred date <span>{booking ? '' : '(optional)'}</span><input name="date" type="date" min={dateMin} required={booking}/></label></div>
    {booking && <div className="form-row"><label>Preferred time<select name="time" defaultValue="" required><option value="" disabled>Select a preferred time</option><option>Morning · 8 am–12 pm</option><option>Afternoon · 12 pm–4 pm</option><option>Late afternoon · 4 pm–7 pm</option><option>Flexible</option></select></label><label>Home or business size <span>(optional)</span><input name="size" placeholder="For example, 2 bedrooms"/></label></div>}
    {!booking && <label>Preferred time <span>(optional)</span><input name="time" placeholder="A time that usually works for you"/></label>}
    <label>Additional notes <span>(optional)</span><textarea name="notes" rows="4" placeholder="Access details, priorities, or anything else we should know"/></label>
    <button className="button button-green" type="submit">{booking ? 'Review booking request' : 'Send enquiry'} <ArrowRight size={16}/></button>
    <p className="form-note">This request opens in your email app. We’ll confirm availability before your appointment is booked.</p>
  </form>;
}

export function MapPanel({ label = 'Service availability is confirmed by address' }) {
  return <div className="map-panel" role="img" aria-label={label}><div className="map-lines"><i/><i/><i/><i/><i/><i/></div><div className="map-map-marker"><span>⌂</span></div><span className="map-panel-label">GOLDEN HOME · LOCAL SERVICE</span><p>{label}</p></div>;
}

export function GoogleMapPanel() {
  return <div className="google-map-panel"><iframe title="Google Map showing Dubai, United Arab Emirates" src="https://maps.google.com/maps?q=Dubai%2C%20United%20Arab%20Emirates&z=11&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen/></div>;
}
