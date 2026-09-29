import React, { useState } from 'react';
import { ArrowRight, Check, Clock3, Leaf, ShieldCheck, Sparkles } from 'lucide-react';
import { Link, useParams } from 'react-router';
import { services } from '../data/site.js';
import { Accordion, Breadcrumbs, ButtonLink, CtaBand, Eyebrow, PageHero, photoSrcSet, photoUrl, ServiceCard } from '../components/UI.jsx';

const categories = ['All services', ...new Set(services.map((service) => service.category))];

export function ServicesPage() {
  const [category, setCategory] = useState('All services');
  const shown = category === 'All services' ? services : services.filter((service) => service.category === category);
  return <main id="page-top" className="services-page">
    <PageHero eyebrow="A CLEAN THAT FITS YOUR SPACE" title="Thoughtful care for" emphasis="every kind of home." text="Explore the services we offer, then tell us what matters most in your space." image="photo-1600210492486-724fe5c67fb0" alt="A bright, carefully kept home interior"/>
    <div className="page-content section-wrap"><Breadcrumbs items={[{ label: 'Services' }]}/><section className="services-intro" data-reveal><Eyebrow>OUR CLEANING SERVICES</Eyebrow><h2>Good things start<br/>with <em>a little help.</em></h2><p>Every home has its own routine. Choose a service to see the details, then request a quote based on your home and priorities.</p></section>
      <div className="service-filters" role="group" aria-label="Filter services by category">{categories.map((item) => <button className={category === item ? 'filter-active' : ''} type="button" key={item} onClick={() => setCategory(item)}>{item}</button>)}</div>
      <div className="service-grid service-directory-grid">{shown.map((service, index) => <ServiceCard service={service} index={index} key={service.slug}/>)}</div>
      <section className="service-directory-note"><span><ShieldCheck size={21}/></span><div><h3>Not sure which service is right?</h3><p>Share a little about your space and we’ll help you choose an appropriate starting point.</p></div><ButtonLink to="/contact" tone="outline">Talk with us</ButtonLink></section>
    </div><CtaBand title="Let’s find the right clean."/>
  </main>;
}

export function ServiceDetailPage() {
  const { slug } = useParams();
  const service = services.find((item) => item.slug === slug);
  if (!service) return <NotFoundService />;
  const related = services.filter((item) => item.slug !== service.slug && item.category === service.category).slice(0, 3);
  const recommendations = related.length ? related : services.filter((item) => item.slug !== service.slug).slice(0, 3);
  return <main id="page-top" className={`service-detail service-theme-${service.theme}`}>
    <PageHero eyebrow={`${service.category.toUpperCase()} · GOLDEN HOME`} title="A more considered clean for" emphasis={service.title.toLowerCase()} text={service.short} image={service.image} alt={service.alt}/>
    <div className="section-wrap detail-wrap"><Breadcrumbs items={[{ label: 'Services', to: '/services' }, { label: service.title }]}/>
      <section className="service-detail-intro" data-reveal><div><Eyebrow>MADE TO FIT YOUR HOME</Eyebrow><h2>{service.title},<br/><em>with care.</em></h2></div><div><p>{service.intro}</p><ButtonLink to={`/book?service=${service.slug}`}>Request this service</ButtonLink></div></section>
      <section className="service-includes" data-reveal><div className="included-copy"><Eyebrow>THE DETAILS</Eyebrow><h2>What we can<br/><em>take care of.</em></h2><p>The final scope is confirmed with you before your appointment, so the visit is planned around your home and expectations.</p><ul className="detail-check-list">{service.included.map((item) => <li key={item}><Check size={17}/>{item}</li>)}</ul></div><div className="included-image"><img src={photoUrl(service.image, 1300)} srcSet={photoSrcSet(service.image, 1300)} sizes="(max-width: 600px) calc(100vw - 46px), 50vw" alt={service.alt} loading="lazy" width="1300" height="1150"/><span>{service.category.toUpperCase()} · GOLDEN HOME</span></div></section>
      <section className="benefits-section" data-reveal><div className="section-heading"><div><Eyebrow>WHY PEOPLE CHOOSE THIS SERVICE</Eyebrow><h2>Care that feels<br/><em>considered.</em></h2></div><p>We keep the process clear and talk through your priorities before the work begins.</p></div><div className="benefit-grid">{service.benefits.map((benefit, index) => <article key={benefit}><span>0{index + 1}</span><h3>{benefit}</h3></article>)}</div></section>
      <section className="detail-process" data-reveal><div className="detail-process-photo"><img src={photoUrl('photo-1584820927498-cfe5211fd8bf', 1150)} srcSet={photoSrcSet('photo-1584820927498-cfe5211fd8bf', 1150)} sizes="(max-width: 600px) calc(100vw - 46px), 50vw" alt="A cleaning professional preparing gloves before a home visit" loading="lazy" width="1150" height="950"/></div><div className="detail-process-copy"><Eyebrow>YOUR VISIT, STEP BY STEP</Eyebrow><h2>A simple plan<br/>for a <em>fresh start.</em></h2><ol><li><span>01</span><div><b>Tell us about your space</b><p>Share the size, priorities, and any details we should know.</p></div></li><li><span>02</span><div><b>Confirm a time and scope</b><p>We’ll reply with availability and confirm what the service includes.</p></div></li><li><span>03</span><div><b>We arrive ready to care</b><p>Your cleaning professional follows the agreed priorities for the visit.</p></div></li></ol><ButtonLink to={`/book?service=${service.slug}`} tone="green">Request a booking</ButtonLink></div></section>
      <section className="detail-why section-wrap" data-reveal><div className="detail-why-heading"><Eyebrow>THE GOLDEN HOME STANDARD</Eyebrow><h2>Respect for your<br/><em>space and time.</em></h2></div><div className="detail-why-items"><p><ShieldCheck/> We discuss the scope before the appointment.</p><p><Sparkles/> We make your priorities part of the plan.</p><p><Clock3/> We confirm timing and availability with you.</p><p><Leaf/> We talk through product or material considerations.</p></div></section>
      {service.faqs.length > 0 && <section className="detail-faq section-wrap" data-reveal><div><Eyebrow>SERVICE QUESTIONS</Eyebrow><h2>Before we<br/><em>get started.</em></h2></div><Accordion items={service.faqs}/></section>}
      <section className="related-services section-wrap"><div className="section-heading"><div><Eyebrow>MORE WAYS WE CAN HELP</Eyebrow><h2>Related <em>services.</em></h2></div><Link className="underlined-link" to="/services">All services <ArrowRight size={15}/></Link></div><div className="service-grid">{recommendations.map((item, index) => <ServiceCard service={item} index={index} key={item.slug}/>)}</div></section>
    </div><CtaBand title={`Ready to talk ${service.title.toLowerCase()}?`} image={service.image}/>
  </main>;
}

function NotFoundService() {
  return <main className="simple-message section-wrap"><Eyebrow>SERVICE NOT FOUND</Eyebrow><h1>Let’s find the right <em>clean.</em></h1><p>That service page may have moved. Browse the full service list to find what you need.</p><ButtonLink to="/services">Browse all services</ButtonLink></main>;
}
