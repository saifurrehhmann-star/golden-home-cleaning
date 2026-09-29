import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CalendarDays, Check, Clock3, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { Link, useSearchParams } from 'react-router';
import { business, services } from '../data/site.js';
import { Breadcrumbs, ButtonLink, Eyebrow, GoogleMapPanel, PageHero, QuoteForm, photoSrcSet, photoUrl } from '../components/UI.jsx';

const timeOptions = ['Morning · 8 am–12 pm', 'Afternoon · 12 pm–4 pm', 'Late afternoon · 4 pm–7 pm', 'Flexible'];

export function BookingPage() {
  const [params] = useSearchParams();
  const serviceFromQuery = services.find((item) => item.slug === params.get('service'))?.title || '';
  const areaFromQuery = params.get('area') || '';
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ service: serviceFromQuery, date: '', time: '', name: '', phone: '', email: '', address: areaFromQuery, notes: '' });
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = `${tomorrow.getFullYear()}-${String(tomorrow.getMonth()+1).padStart(2,'0')}-${String(tomorrow.getDate()).padStart(2,'0')}`;
  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  function continueStep(event) {
    event.preventDefault();
    setError('');
    if (step === 1 && (!form.service || !form.date || !form.time)) return setError('Choose a service, date, and preferred time to continue.');
    if (step === 2 && (!form.name.trim() || !form.phone.trim() || !form.email.trim() || !form.address.trim())) return setError('Please complete your name, phone, email, and address.');
    setStep((value) => Math.min(value + 1, 3));
  }

  function sendRequest() {
    const subject = encodeURIComponent(`Golden Home booking request — ${form.service}`);
    const body = encodeURIComponent(`Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nAddress: ${form.address}\nService: ${form.service}\nPreferred date: ${form.date}\nPreferred time: ${form.time}\n\nNotes: ${form.notes || 'None'}\n\nPlease confirm availability and scope.`);
    setSent(true);
    window.location.href = `mailto:${business.email}?subject=${subject}&body=${body}`;
  }

  return <main id="page-top"><PageHero eyebrow="YOUR FRESH START, STEP BY STEP" title="Let’s find a time" emphasis="that works." text="Share what you need. We’ll confirm the service scope and appointment availability with you directly." image="photo-1600607687920-4e2a09cf159d" alt="Fresh and welcoming living room" compact/>
    <div className="section-wrap"><Breadcrumbs items={[{ label: 'Book a cleaning' }]}/><section className="booking-layout" data-reveal><div className="booking-main"><div className="booking-heading"><Eyebrow>BOOKING REQUEST</Eyebrow><h2>{sent ? 'Thank you for reaching out.' : 'A few details, then we’ll take it from here.'}</h2><p>{sent ? 'Your email app should open with the request details. Your appointment is not confirmed until we reply.' : 'Your preferred date and time are requests. We’ll confirm an available appointment before it is booked.'}</p></div>
      {sent ? <div className="booking-confirmation" role="status"><span><Check size={22}/></span><h3>Your request is ready to send</h3><p>Complete the message in your email app and we’ll get back to you about availability.</p><a href={`mailto:${business.email}`}>{business.email}</a><ButtonLink to="/">Return home</ButtonLink></div> : <>
        <div className="booking-progress" aria-label={`Step ${step} of 3`}>{['Service & timing','Your details','Review'].map((title,index)=><div className={step >= index+1 ? 'progress-step progress-step-active' : 'progress-step'} key={title}><span>{step > index+1 ? <Check size={13}/> : `0${index+1}`}</span><small>{title}</small></div>)}</div>
        <form className="booking-form" onSubmit={continueStep}>
          {step === 1 && <div className="booking-fields"><label>Which service do you need?<select name="service" value={form.service} onChange={update} required><option value="">Choose a cleaning service</option>{services.map((item)=><option key={item.slug}>{item.title}</option>)}</select></label><div className="form-row"><label>Preferred date<input type="date" name="date" min={minDate} value={form.date} onChange={update} required/></label><label>Preferred time<select name="time" value={form.time} onChange={update} required><option value="">Select a time</option>{timeOptions.map((time)=><option key={time}>{time}</option>)}</select></label></div><div className="booking-inline-note"><CalendarDays size={17}/><p>Your selected time is a preference. We’ll check the schedule and confirm by email or phone.</p></div></div>}
          {step === 2 && <div className="booking-fields"><div className="form-row"><label>Full name<input name="name" autoComplete="name" value={form.name} onChange={update} placeholder="Your name" required/></label><label>Phone number<input name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={update} placeholder="UAE phone number" required/></label></div><div className="form-row"><label>Email address<input name="email" type="email" autoComplete="email" value={form.email} onChange={update} placeholder="you@example.com" required/></label><label>Cleaning address<input name="address" autoComplete="street-address" value={form.address} onChange={update} placeholder="Building, community, street, or Makani number" required/></label></div><label>Additional notes <span>(optional)</span><textarea name="notes" rows="4" value={form.notes} onChange={update} placeholder="Access details, priorities, or anything else we should know"/></label></div>}
          {step === 3 && <div className="booking-review"><h3>Review your request</h3><dl><div><dt>Service</dt><dd>{form.service}</dd></div><div><dt>Preferred date</dt><dd>{form.date}</dd></div><div><dt>Preferred time</dt><dd>{form.time}</dd></div><div><dt>Name</dt><dd>{form.name}</dd></div><div><dt>Phone</dt><dd>{form.phone}</dd></div><div><dt>Email</dt><dd>{form.email}</dd></div><div><dt>Address</dt><dd>{form.address}</dd></div>{form.notes && <div><dt>Notes</dt><dd>{form.notes}</dd></div>}</dl><p className="booking-inline-note"><ShieldCheck size={17}/> Sending this request does not confirm a booking. We’ll reply to confirm availability and scope.</p></div>}
          {error && <p className="form-error" role="alert">{error}</p>}
          <div className="booking-controls">{step > 1 && <button type="button" className="button button-outline" onClick={() => { setError(''); setStep((value)=>value-1); }}><ArrowLeft size={16}/> Back</button>}{step < 3 ? <button type="submit" className="button button-green">Continue <ArrowRight size={16}/></button> : <button type="button" className="button button-green" onClick={sendRequest}>Send booking request <ArrowRight size={16}/></button>}</div>
        </form>
      </>}</div>
      <aside className="booking-aside"><img src={photoUrl('photo-1600210492486-724fe5c67fb0',800)} srcSet={photoSrcSet('photo-1600210492486-724fe5c67fb0',800)} sizes="(max-width: 850px) calc(100vw - 46px), 35vw" alt="Calm, bright home interior" loading="lazy" width="800" height="1050"/><div className="booking-summary"><Eyebrow>YOUR REQUEST</Eyebrow><div className="summary-row"><span>Service</span><b>{form.service || 'Choose a service'}</b></div><div className="summary-row"><span>Preferred date</span><b>{form.date || 'Not selected'}</b></div><div className="summary-row"><span>Preferred time</span><b>{form.time || 'Not selected'}</b></div><div className="summary-foot"><Clock3 size={16}/><span>Appointment confirmed after we reply.</span></div></div></aside>
    </section></div>
  </main>;
}

export function ContactPage() {
  return <main id="page-top"><PageHero eyebrow="HERE WHEN YOU NEED US" title="Let’s talk about" emphasis="your home." text="Tell us what you’re looking for and we’ll point you in the right direction." image="photo-1600607687939-ce8a6c25118c" alt="A welcoming home interior" compact/>
    <div className="section-wrap"><Breadcrumbs items={[{ label: 'Contact' }]}/><section className="contact-layout" data-reveal><div className="contact-intro"><Eyebrow>GET IN TOUCH</Eyebrow><h2>A good clean<br/>starts with <em>hello.</em></h2><p>Have a question about a service, timing, or your neighbourhood? Send us a note. We’ll follow up with availability and next steps.</p><div className="contact-methods"><a href={`tel:${business.phoneLink}`}><span><Phone size={18}/></span><div><small>CALL THE TEAM</small><b>{business.phone}</b></div></a><a href={`mailto:${business.email}`}><span><Mail size={18}/></span><div><small>EMAIL</small><b>{business.email}</b></div></a><div><span><Clock3 size={18}/></span><div><small>HOURS</small><b>{business.hours}</b></div></div><div><span><MapPin size={18}/></span><div><small>LOCATION</small><b>{business.serviceRegion}</b></div></div></div></div><div className="contact-form-panel"><Eyebrow>SEND A MESSAGE</Eyebrow><QuoteForm/></div></section><section className="contact-map-row" data-reveal><GoogleMapPanel/><div><Eyebrow>NOT SURE IF WE REACH YOU?</Eyebrow><h2>Tell us your<br/><em>neighbourhood.</em></h2><p>Service locations can change. Send your address and requested date and we’ll check availability before confirming a visit.</p><ButtonLink to="/service-areas" tone="outline">Browse service areas</ButtonLink></div></section></div>
  </main>;
}
