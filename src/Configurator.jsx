import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Check,
  CheckCircle2,
  Code2,
  ExternalLink,
  LayoutTemplate,
  Link2,
  LoaderCircle,
  Megaphone,
  MessageCircle,
  Monitor,
  Palette,
  Search,
  ShoppingBag,
  Sparkles,
  Wrench,
  X,
} from 'lucide-react';
import { getWhatsappUrl } from './config/whatsapp';

const projectOptions = [
  { id: 'website', title: 'Website erstellen', desc: 'Neue Website, Landingpage oder Webdesign-Projekt', icon: LayoutTemplate },
  { id: 'relaunch', title: 'Website Relaunch', desc: 'Bestehenden Auftritt technisch und visuell verbessern', icon: Sparkles },
  { id: 'shop', title: 'Onlineshop', desc: 'Shopify, Shopware, Relaunch oder Optimierung', icon: ShoppingBag },
  { id: 'seo', title: 'SEO / SEA / GEO', desc: 'Mehr Nachfrage über Suche, Ads und AI Search', icon: Search },
  { id: 'branding', title: 'Logo & Branding', desc: 'Markenauftritt, Designsystem und Copywriting', icon: Palette },
  { id: 'marketing', title: 'Digitales Marketing', desc: 'Social Media, E-Mail und Kampagnen', icon: Megaphone },
  { id: 'ai-automation', title: 'KI-Automatisierung', desc: 'n8n-Workflows, KI-Agenten und Prozessautomation', icon: Bot },
  { id: 'ai-assistant', title: 'Chatbot & KI-Assistent', desc: 'Eigener privater Clawbot, Chatbot oder Jarvis-Assistent', icon: MessageCircle },
  { id: 'software', title: 'Software & APIs', desc: 'Apps, interne Tools, Schnittstellen und Symfony APIs', icon: Code2 },
  { id: 'retainer', title: 'Retainer & Wartung', desc: 'Laufende Betreuung und Weiterentwicklung', icon: Wrench },
];

const signOptions = [
  { id: 'led', title: 'LED-Schrift & Leuchtreklame', desc: 'Design, Produktion und Montage am Standort', icon: Monitor },
  { id: 'company-sign', title: 'Firmen- & Fassadenschild', desc: 'Hochwertiges Schild passend zum Markenauftritt', icon: LayoutTemplate },
  { id: 'sign-consulting', title: 'Beratung zur Schildart', desc: 'Physische Sichtbarkeit gewünscht, Ausführung noch offen', icon: MessageCircle },
];

const packageOptions = [
  { id: 'landingpage', title: 'Landingpage / Onepager', desc: 'Kompakter Auftritt für ein klares Angebot' },
  { id: 'business', title: 'Business Website', desc: 'Mehrseitige Website für Unternehmen' },
  { id: 'shop', title: 'Onlineshop', desc: 'Shopify oder Shopware' },
  { id: 'custom', title: 'Individuelle Plattform', desc: 'Besondere Funktionen oder Systemanbindungen' },
  { id: 'unsure', title: 'Noch offen', desc: 'Wir empfehlen das passende Paket' },
];

const budgetOptions = [
  { id: 'under-3000', title: 'Bis 3.000 EUR', desc: 'Kompakter Einstieg' },
  { id: '3000-7000', title: '3.000 - 7.000 EUR', desc: 'Professioneller Auftritt' },
  { id: '7000-15000', title: '7.000 - 15.000 EUR', desc: 'Umfangreiches Projekt' },
  { id: '15000-plus', title: 'Über 15.000 EUR', desc: 'Individuelles System' },
  { id: 'unsure', title: 'Noch offen', desc: 'Gemeinsam einordnen' },
];

const timelineOptions = [
  { id: 'asap', title: 'So bald wie möglich', desc: 'Schneller Projektstart' },
  { id: '2-4-weeks', title: 'In 2 - 4 Wochen', desc: 'Start ist konkret geplant' },
  { id: '1-3-months', title: 'In 1 - 3 Monaten', desc: 'Projekt wird vorbereitet' },
  { id: 'flexible', title: 'Flexibel', desc: 'Zeitraum noch offen' },
];

const inquiryEndpoint = import.meta.env.VITE_INQUIRY_API_URL || '/api/send-inquiry';
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getLabel = (options, value, fallback = 'Noch offen') => options.find((option) => option.id === value)?.title || fallback;
const getLabels = (options, values) => values.map((value) => getLabel(options, value)).join(', ');

function OptionCard({ option, selected, multiple, onSelect }) {
  const Icon = option.icon;
  return (
    <button
      type="button"
      className={`config-option ${multiple ? 'is-multiple' : ''} ${selected ? 'is-selected' : ''}`}
      aria-pressed={selected}
      onClick={onSelect}
    >
      {Icon && <Icon size={22} strokeWidth={1.8} />}
      <span><strong>{option.title}</strong><small>{option.desc}</small></span>
      <span className="option-check"><Check size={13} /></span>
    </button>
  );
}

function OptionGroup({ label, options, value, multiple = false, allowEmpty = false, onSelect }) {
  return (
    <fieldset className="config-fieldset">
      <legend>{label}</legend>
      <div className="config-options">
        {options.map((option) => {
          const selected = multiple ? value.includes(option.id) : value === option.id;
          return (
            <OptionCard
              key={option.id}
              option={option}
              selected={selected}
              multiple={multiple}
              onSelect={() => onSelect(allowEmpty && selected ? '' : option.id)}
            />
          );
        })}
      </div>
    </fieldset>
  );
}

function Configurator({ onClose }) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState({
    projectTypes: [],
    signType: '',
    websitePackage: '',
    budget: '',
    timeline: '',
    inspirationWebsites: '',
    name: '',
    company: '',
    companyWebsite: '',
    email: '',
    phone: '',
    notes: '',
  });

  const hasValidContactData = Boolean(formData.name.trim() && emailRegex.test(formData.email.trim()) && formData.phone.trim());
  const canProceed = step === 1 ? formData.projectTypes.length > 0 : step === 3 ? hasValidContactData : true;
  const needsWebsitePackage = formData.projectTypes.some((value) => ['website', 'relaunch', 'shop'].includes(value));
  const select = (name, value) => {
    setFormError('');
    setFormData((current) => ({ ...current, [name]: value }));
  };
  const toggleProjectType = (value) => setFormData((current) => {
    setFormError('');
    const projectTypes = current.projectTypes.includes(value)
      ? current.projectTypes.filter((item) => item !== value)
      : [...current.projectTypes, value];
    const includesWebsiteProject = projectTypes.some((item) => ['website', 'relaunch', 'shop'].includes(item));
    return { ...current, projectTypes, websitePackage: includesWebsiteProject ? current.websitePackage : '' };
  });
  const change = (event) => {
    setFormError('');
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };
  const validateForm = () => {
    if (!formData.name.trim()) return 'Bitte geben Sie Ihren Namen ein.';
    if (!emailRegex.test(formData.email.trim())) return 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
    if (!formData.phone.trim()) return 'Bitte geben Sie eine Telefonnummer ein.';
    if (!formData.projectTypes.length) return 'Bitte wählen Sie mindestens eine Projektart aus.';
    return '';
  };
  const buildInquiryPayload = () => ({
    ...formData,
    email: formData.email.trim(),
    meta: {
      pageUrl: window.location.href,
      submittedAt: new Date().toISOString(),
      userAgent: window.navigator.userAgent,
    },
  });
  const submit = async (event) => {
    event?.preventDefault();
    if (isSubmitting) return;

    const validationError = validateForm();
    if (validationError) {
      setFormError(validationError);
      return;
    }

    setIsSubmitting(true);
    setFormError('');

    try {
      const response = await fetch(inquiryEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildInquiryPayload()),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || 'Inquiry request failed');
      }

      setSubmitted(true);
    } catch (error) {
      console.error(error);
      setFormError('Die Anfrage konnte leider nicht gesendet werden. Bitte versuche es erneut oder kontaktiere uns direkt.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="configurator-overlay" role="dialog" aria-modal="true" aria-label="Projektanfrage">
      <div className="configurator-modal">
        <button className="config-close" onClick={onClose} aria-label="Konfigurator schließen"><X size={20} /></button>

        {submitted ? (
          <motion.div className="config-success" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
            <div className="success-icon"><CheckCircle2 size={40} /></div>
            <span className="config-kicker">Anfrage eingegangen</span>
            <h2>Vielen Dank!</h2>
            <p>Deine Anfrage wurde erfolgreich gesendet. Wir melden uns zeitnah bei dir.</p>
            <p className="success-note">Senden Sie uns gerne Fotos, Logos, Videos, Screenshots oder Inspirationen direkt per WhatsApp.</p>
            <div className="success-actions">
              <a className="config-button whatsapp-button" href={getWhatsappUrl()} target="_blank" rel="noreferrer">
                <MessageCircle size={19} /> Dateien per WhatsApp senden <ExternalLink size={15} />
              </a>
              <button className="config-button secondary" onClick={onClose}>Zurück zur Startseite</button>
            </div>
          </motion.div>
        ) : (
          <div className="config-layout">
            <aside className="config-sidebar">
              <div>
                <span className="config-kicker">Grenady</span>
                <h2>Projekt starten</h2>
              </div>
              <ol className="config-progress">
                {['Projekt', 'Rahmen', 'Kontakt', 'Prüfen'].map((label, index) => {
                  const number = index + 1;
                  return (
                    <li className={step >= number ? 'is-active' : ''} key={label}>
                      <span>{step > number ? <Check size={13} /> : number}</span>{label}
                    </li>
                  );
                })}
              </ol>
              <div className="config-selection">
                <small>Aktuelle Auswahl</small>
                <strong>{formData.projectTypes.length ? `${formData.projectTypes.length} Projektarten ausgewählt` : 'Noch keine Leistung gewählt'}</strong>
                <p>Je genauer Ihre Angaben, desto konkreter können wir antworten.</p>
              </div>
            </aside>

            <div className="config-content">
              <AnimatePresence mode="wait">
                <motion.div key={step} className="config-step" initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -15 }}>
                  {step === 1 && (
                    <>
                      <span className="config-kicker">Schritt 1 von 4</span>
                      <h2>Was dürfen wir für Sie entwickeln?</h2>
                      <p className="config-intro">Mehrfachauswahl ist möglich. Wählen Sie alles, was für Ihr Projekt relevant ist.</p>
                      <OptionGroup label="Projektarten (Mehrfachauswahl)" options={projectOptions} value={formData.projectTypes} multiple onSelect={toggleProjectType} />
                      <OptionGroup label="Physische Sichtbarkeit" options={signOptions} value={formData.signType} allowEmpty onSelect={(value) => select('signType', value)} />
                      {needsWebsitePackage && <OptionGroup label="Website-Paket (optional)" options={packageOptions} value={formData.websitePackage} allowEmpty onSelect={(value) => select('websitePackage', value)} />}
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <span className="config-kicker">Schritt 2 von 4</span>
                      <h2>Budget, Zeitraum & Inspiration</h2>
                      <p className="config-intro">Damit wir Umfang und nächsten Schritt realistisch einschätzen können.</p>
                      <OptionGroup label="Budgetrahmen" options={budgetOptions} value={formData.budget} onSelect={(value) => select('budget', value)} />
                      <OptionGroup label="Zeitraum" options={timelineOptions} value={formData.timeline} onSelect={(value) => select('timeline', value)} />
                      <label className="config-label"><Link2 size={17} /> Inspirations-Websites</label>
                      <textarea className="config-input" name="inspirationWebsites" value={formData.inspirationWebsites} onChange={change} rows="3" placeholder="Links zu Websites, Marken oder Stilen" />
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <span className="config-kicker">Schritt 3 von 4</span>
                      <h2>Wie können wir Sie erreichen?</h2>
                      <p className="config-intro">Drei Pflichtfelder, damit Ihre Anfrage nicht im digitalen Nirgendwo landet.</p>
                      <form id="lead-form" className="config-form" onSubmit={(event) => { event.preventDefault(); if (canProceed) setStep(4); }}>
                        <div className="config-input-row">
                          <input className="config-input" name="name" value={formData.name} onChange={change} required placeholder="Ihr Name *" />
                          <input className="config-input" name="company" value={formData.company} onChange={change} placeholder="Unternehmen" />
                        </div>
                        <input
                          className="config-honeypot"
                          name="companyWebsite"
                          value={formData.companyWebsite}
                          onChange={change}
                          tabIndex="-1"
                          autoComplete="off"
                          aria-hidden="true"
                          placeholder="Website"
                        />
                        <input className="config-input" type="email" name="email" value={formData.email} onChange={change} required placeholder="E-Mail-Adresse *" />
                        <input className="config-input" type="tel" name="phone" value={formData.phone} onChange={change} required placeholder="Telefonnummer *" />
                        <label className="config-label"><MessageCircle size={17} /> Notizen</label>
                        <textarea className="config-input" name="notes" value={formData.notes} onChange={change} rows="5" placeholder="Wünsche, vorhandene Website oder besondere Anforderungen" />
                      </form>
                    </>
                  )}

                  {step === 4 && (
                    <>
                      <span className="config-kicker">Schritt 4 von 4</span>
                      <h2>Anfrage prüfen</h2>
                      <p className="config-intro">Passt alles? Dateien senden Sie anschließend bequem per WhatsApp.</p>
                      <div className="config-summary">
                        {[
                          ['Projektarten', getLabels(projectOptions, formData.projectTypes)],
                          ['Schildart', getLabel(signOptions, formData.signType, 'Nicht ausgewählt')],
                          ['Website-Paket', getLabel(packageOptions, formData.websitePackage, 'Nicht ausgewählt')],
                          ['Budgetrahmen', getLabel(budgetOptions, formData.budget)],
                          ['Zeitraum', getLabel(timelineOptions, formData.timeline)],
                          ['Kontakt', `${formData.name}${formData.company ? `, ${formData.company}` : ''}`],
                        ].map(([label, value]) => <div key={label}><small>{label}</small><strong>{value}</strong></div>)}
                      </div>
                      <div className="config-whatsapp-note"><Bot size={22} /><p><strong>Keine Uploads nötig.</strong><br />Fotos, Logos, Videos und Inspirationen können Sie nach dem Absenden per WhatsApp teilen.</p></div>
                    </>
                  )}

                  {formError && <p className="config-error" role="alert">{formError}</p>}

                  <div className="config-navigation">
                    {step > 1 ? <button className="config-button secondary" disabled={isSubmitting} onClick={() => setStep((current) => current - 1)}><ArrowLeft size={17} /> Zurück</button> : <span />}
                    {step < 4 ? (
                      <button className="config-button primary" disabled={!canProceed || isSubmitting} onClick={() => canProceed && setStep((current) => current + 1)}>Weiter <ArrowRight size={17} /></button>
                    ) : (
                      <button className="config-button primary" disabled={isSubmitting} onClick={submit}>
                        {isSubmitting ? <><LoaderCircle className="config-spinner" size={17} /> Wird gesendet</> : <>Anfrage absenden <Check size={17} /></>}
                      </button>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Configurator;
