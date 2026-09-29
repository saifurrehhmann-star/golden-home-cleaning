import React, { useEffect } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import { ButtonLink, Eyebrow } from './components/UI.jsx';
import HomePage from './pages/HomePage.jsx';
import { ServiceDetailPage, ServicesPage } from './pages/ServicePages.jsx';
import { AboutPage, FaqPage, HowItWorksPage, LocationPage, ServiceAreasPage, WhyPage } from './pages/InfoPages.jsx';
import { BookingPage, ContactPage } from './pages/BookingContactPages.jsx';

function RouteEffects() {
  const location = useLocation();
  useEffect(() => {
    const titles = {
      '/': 'Golden Home | Home Cleaning in Dubai, UAE',
      '/services': 'Cleaning Services | Golden Home',
      '/about': 'About Golden Home | Considered Cleaning',
      '/why-us': 'Why Golden Home | Home Cleaning with Care',
      '/how-it-works': 'How It Works | Golden Home',
      '/service-areas': 'Dubai Service Areas | Golden Home Cleaning',
      '/faqs': 'Frequently Asked Questions | Golden Home',
      '/contact': 'Contact Golden Home | Cleaning Enquiries',
      '/book': 'Book a Cleaning | Golden Home',
    };
    document.title = titles[location.pathname.replace(/\/$/, '') || '/'] || 'Golden Home | Cleaning Services';
    if (!location.hash) window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname, location.hash]);
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) {
      root.classList.remove('has-reveal');
      return undefined;
    }
    root.classList.add('has-reveal');
    document.querySelectorAll('main section:not(.page-hero):not(.home-hero):not([data-reveal])').forEach((element) => element.setAttribute('data-reveal', ''));
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [location.pathname]);
  return null;
}

function NotFoundPage() {
  return <main id="page-top" className="not-found-page"><div><Eyebrow>THAT PAGE HAS MOVED</Eyebrow><h1>Let’s get you<br/><em>back home.</em></h1><p>The page you’re looking for isn’t here. Browse our services or return to the homepage.</p><div className="not-found-actions"><ButtonLink to="/services">Browse services</ButtonLink><Link to="/" className="underlined-link"><ArrowLeft size={15}/> Go to homepage</Link></div></div></main>;
}

export default function App() {
  return <>
    <RouteEffects/>
    <Header/>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/services" element={<ServicesPage/>}/>
      <Route path="/services/:slug" element={<ServiceDetailPage/>}/>
      <Route path="/service-areas" element={<ServiceAreasPage/>}/>
      <Route path="/service-areas/:slug" element={<LocationPage/>}/>
      <Route path="/about" element={<AboutPage/>}/>
      <Route path="/why-us" element={<WhyPage/>}/>
      <Route path="/how-it-works" element={<HowItWorksPage/>}/>
      <Route path="/faqs" element={<FaqPage/>}/>
      <Route path="/contact" element={<ContactPage/>}/>
      <Route path="/book" element={<BookingPage/>}/>
      <Route path="*" element={<NotFoundPage/>}/>
    </Routes>
    <Footer/>
  </>;
}
