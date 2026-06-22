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
  Globe2,
  LayoutTemplate,
  Link2,
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
  { id: 'software', title: 'Software & APIs', desc: 'Apps, interne Tools, Schnittstellen und Symfony APIs', icon: Code2 },
  { id: 'retainer', title: 'Retainer & Wartung', desc: 'Laufende Betreuung und Weiterentwicklung', icon: Wrench },
  { id: 'marketing', title: 'Marketing & Automation', desc: 'Social, E-Mail, n8n und AI Automation', icon: Megaphone },
];

const visibilityOptions = [
  { id: 'digital', title: 'Rein digital', desc: 'Website, Shop, Branding oder Marketing', icon: Globe2 },
  { id: 'led', title: 'LED-Schild ergänzen', desc: 'Design, Produktion und Montage am Standort', icon: Monitor },
  { id: 'unsure', title: 'Noch offen', desc: 'Wir beraten zur passenden Kombination', icon: MessageCircle },
];

const packageOptions = [
  { id: 'website', title: 'Website', desc: 'Strategie, Design und Entwicklung' },
  { id: 'shop', title: 'Onlineshop', desc: 'Shopify oder Shopware' },
  { id: 'branding', title: 'Branding', desc: 'Logo, Designsystem und Texte' },
  { id: 'growth', title: 'Growth', desc: 'SEO, SEA, GEO und AI Search' },
  { id: 'software', title: 'Custom System', desc: 'App, API oder internes Tool' },
  { id: 'retainer', title: 'Retainer', desc: 'Wartung und laufende Optimierung' },
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

const getLabel = (options, value) => options.find((option) => option.id === value)?.title || 'Noch offen';

function OptionCard({ option, selected, onSelect }) {
  const Icon = option.icon;
  return (
    <button type="button" className={`config-option ${selected ? 'is-selected' : ''}`} onClick={onSelect}>
      {Icon && <Icon size={22} strokeWidth={1.8} />}
      <span><strong>{option.title}</strong><small>{option.desc}</small></span>
      <span className="option-check"><Check size={13} /></span>
    </button>
  );
}

function OptionGroup({ label, options, value, onSelect }) {
  return (
    <fieldset className="config-fieldset">
      <legend>{label}</legend>
      <div className="config-options">
        {options.map((option) => (
          <OptionCard key={option.id} option={option} selected={value === option.id} onSelect={() => onSelect(option.id)} />
        ))}
      </div>
    </fieldset>
  );
}

function Configurator({ onClose }) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    projectType: '',
    visibility: '',
    websitePackage: '',
    budget: '',
    timeline: '',
    inspirationWebsites: '',
    name: '',
    company: '',
    email: '',
    phone: '',
    notes: '',
  });

  const canProceed = step === 1 ? Boolean(formData.projectType) : step === 3 ? Boolean(formData.name && formData.email && formData.phone) : true;
  const select = (name, value) => setFormData((current) => ({ ...current, [name]: value }));
  const change = (event) => setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  const submit = (event) => { event?.preventDefault(); setSubmitted(true); };

  return (
    <div className="configurator-overlay" role="dialog" aria-modal="true" aria-label="Projektanfrage">
      <div className="configurator-modal">
        <button className="config-close" onClick={onClose} aria-label="Konfigurator schließen"><X size={20} /></button>

        {submitted ? (
          <motion.div className="config-success" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
            <div className="success-icon"><CheckCircle2 size={40} /></div>
            <span className="config-kicker">Anfrage eingegangen</span>
            <h2>Vielen Dank für Ihre Anfrage.</h2>
            <p>Wir prüfen Ihre Angaben und melden uns schnellstmöglich bei Ihnen.</p>
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
                <strong>{getLabel(projectOptions, formData.projectType)}</strong>
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
                      <p className="config-intro">Wählen Sie den Schwerpunkt. Weitere Leistungen können wir später kombinieren.</p>
                      <OptionGroup label="Projektart" options={projectOptions} value={formData.projectType} onSelect={(value) => select('projectType', value)} />
                      <OptionGroup label="Physische Sichtbarkeit" options={visibilityOptions} value={formData.visibility} onSelect={(value) => select('visibility', value)} />
                      <OptionGroup label="Website-Paket" options={packageOptions} value={formData.websitePackage} onSelect={(value) => select('websitePackage', value)} />
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
                      <form id="lead-form" className="config-form" onSubmit={submit}>
                        <div className="config-input-row">
                          <input className="config-input" name="name" value={formData.name} onChange={change} required placeholder="Ihr Name *" />
                          <input className="config-input" name="company" value={formData.company} onChange={change} placeholder="Unternehmen" />
                        </div>
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
                          ['Projektart', getLabel(projectOptions, formData.projectType)],
                          ['Physische Sichtbarkeit', getLabel(visibilityOptions, formData.visibility)],
                          ['Website-Paket', getLabel(packageOptions, formData.websitePackage)],
                          ['Budgetrahmen', getLabel(budgetOptions, formData.budget)],
                          ['Zeitraum', getLabel(timelineOptions, formData.timeline)],
                          ['Kontakt', `${formData.name}${formData.company ? `, ${formData.company}` : ''}`],
                        ].map(([label, value]) => <div key={label}><small>{label}</small><strong>{value}</strong></div>)}
                      </div>
                      <div className="config-whatsapp-note"><Bot size={22} /><p><strong>Keine Uploads nötig.</strong><br />Fotos, Logos, Videos und Inspirationen können Sie nach dem Absenden per WhatsApp teilen.</p></div>
                    </>
                  )}

                  <div className="config-navigation">
                    {step > 1 ? <button className="config-button secondary" onClick={() => setStep((current) => current - 1)}><ArrowLeft size={17} /> Zurück</button> : <span />}
                    {step < 4 ? (
                      <button className="config-button primary" disabled={!canProceed} onClick={() => canProceed && setStep((current) => current + 1)}>Weiter <ArrowRight size={17} /></button>
                    ) : (
                      <button className="config-button primary" onClick={submit}>Anfrage absenden <Check size={17} /></button>
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
