import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, ArrowLeft, Monitor, Layout, Star, Palette, Image as ImageIcon, CheckCircle2, DollarSign, Clock, MessageCircle, Home, Link as LinkIcon } from 'lucide-react';

const WHATSAPP_NUMBER = '+491234567890'; // CONFIGURABLE WHATSAPP NUMBER

const Configurator = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    projectType: '',
    packageType: '',
    upsellWeb: 'none',
    colors: '',
    existingLogo: '',
    inspiration: '',
    timeframe: '',
    budget: '',
    name: '',
    company: '',
    email: '',
    phone: '',
    whatsapp: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const getNextStep = (current) => {
    if (current === 1) return 2;
    if (current === 2) return formData.projectType === 'signage' ? 3 : 4;
    if (current === 3) return 4;
    if (current === 4) return 5;
    if (current === 5) return 6;
    if (current === 6) return 7;
    return current + 1;
  };

  const getPrevStep = (current) => {
    if (current === 7) return 6;
    if (current === 6) return 5;
    if (current === 5) return 4;
    if (current === 4) return formData.projectType === 'signage' ? 3 : 2;
    if (current === 3) return 2;
    if (current === 2) return 1;
    return current - 1;
  };

  const handleNext = () => setStep(getNextStep(step));
  const handleBack = () => setStep(getPrevStep(step));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const isStepValid = () => {
    if (step === 1) return formData.projectType !== '';
    if (step === 2) return formData.packageType !== '';
    if (step === 3) return formData.upsellWeb !== '';
    if (step === 5) return formData.timeframe !== '' && formData.budget !== '';
    if (step === 6) return formData.name !== '' && formData.email !== '' && formData.phone !== '';
    return true;
  };

  const getEstimate = () => {
    let estimate = '';
    let savings = 0;

    if (formData.projectType === 'signage') {
      if (formData.packageType === 'premium') estimate = '€3.500 – €6.500';
      if (formData.packageType === 'pro') estimate = '€2.000 – €3.500';
      if (formData.packageType === 'basic') estimate = '€1.200 – €2.000';
      if (formData.upsellWeb === 'premium') { estimate = 'ab €6.500'; savings = 800; }
      if (formData.upsellWeb === 'business') { estimate = 'ab €4.000'; savings = 500; }
      if (formData.upsellWeb === 'essential') { estimate = 'ab €2.500'; savings = 300; }
    } else if (formData.projectType === 'web') {
      if (formData.packageType === 'premium') estimate = '€4.000 – €8.000';
      if (formData.packageType === 'business') estimate = '€2.000 – €4.000';
      if (formData.packageType === 'essential') estimate = '€1.000 – €2.000';
    } else if (formData.projectType === 'complete') {
      if (formData.packageType === 'premium') { estimate = '€6.500 – €12.000'; savings = 1000; }
      if (formData.packageType === 'business') { estimate = '€3.500 – €6.500'; savings = 600; }
      if (formData.packageType === 'essential') { estimate = '€2.000 – €3.500'; savings = 400; }
    }

    return { estimate, savings };
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent("Hallo Skyline Vision, ich habe gerade eine Anfrage über eure Website gestellt. Hier sind meine Fotos und Inspirationen zum Projekt.");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  const slideVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
  };

  return (
    <div className="cfg-overlay">
      <div className="glass-panel cfg-modal">
        <button onClick={onClose} className="cfg-close">✕</button>

        {submitted ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="cfg-success">
            <div className="cfg-success-glow">
              <Check size={48} color="var(--accent-primary)" />
            </div>
            <h2 className="text-gradient">Vielen Dank für Ihre Anfrage.</h2>
            <p className="cfg-success-text">
              Wir prüfen Ihre Angaben und melden uns schnellstmöglich bei Ihnen.
            </p>

            <div className="cfg-success-card">
              <h4><MessageCircle size={20} color="#25D366" /> Nächster Schritt</h4>
              <p>
                Damit wir Ihr Projekt schneller vorbereiten können, senden Sie uns gerne zusätzlich Fotos, Logos, Videos, Screenshots oder Inspirationen direkt per WhatsApp.
              </p>
              <button className="btn-primary cfg-wa-btn" onClick={openWhatsApp}>
                <MessageCircle size={20} /> 📱 Dateien per WhatsApp senden
              </button>
            </div>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button className="btn-secondary" style={{ background: 'transparent' }} onClick={onClose}>
                <Home size={18} /> Zurück zur Startseite
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="cfg-layout">
            {/* Header / Progress */}
            <div className="cfg-header">
              <h3 className="text-accent-glow cfg-header-title">Projekt konfigurieren</h3>
              <p className="cfg-header-subtitle">Teilen Sie uns Ihre Wünsche mit und erhalten Sie eine maßgeschneiderte Einschätzung.</p>

              <div className="cfg-progress">
                <div className="cfg-progress-track">
                  <div className="cfg-progress-fill" style={{ width: `${(step / 7) * 100}%` }}></div>
                </div>
                <span className="cfg-progress-label">Schritt {step} von 7</span>
              </div>
            </div>

            {/* Content Area */}
            <div className="cfg-content">
              <AnimatePresence mode="wait">
                <motion.div key={step} variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="cfg-step-container">
                  <div className="cfg-step-body">

                    {/* STEP 1: Project Type */}
                    {step === 1 && (
                      <>
                        <h2 className="cfg-step-headline">Was benötigen Sie?</h2>
                        <div className="cfg-options-grid">
                          <RadioOption
                            icon={<Monitor size={28} />}
                            title="Premium Signage"
                            desc="Auffällige Leuchtschilder & Reklame für Ihr Geschäft."
                            selected={formData.projectType === 'signage'}
                            onClick={() => handleChange('projectType', 'signage')}
                          />
                          <RadioOption
                            icon={<Layout size={28} />}
                            title="Web Design"
                            desc="Conversion-optimierte professionelle Websites."
                            selected={formData.projectType === 'web'}
                            onClick={() => handleChange('projectType', 'web')}
                          />
                          <RadioOption
                            icon={<Star size={28} />}
                            title="Complete Visibility Package"
                            desc="Schilder und Website passend zu Ihrer Markenidentität."
                            badge="EMPFEHLUNG"
                            selected={formData.projectType === 'complete'}
                            onClick={() => handleChange('projectType', 'complete')}
                          />
                        </div>
                      </>
                    )}

                    {/* STEP 2: Package Selection */}
                    {step === 2 && (
                      <>
                        <h2 className="cfg-step-headline">Wählen Sie Ihr Paket</h2>
                        <p className="cfg-step-desc">Wir bieten maßgeschneiderte Lösungen für jeden Anspruch.</p>
                        <div className="cfg-options-grid">
                          {(formData.projectType === 'signage' || formData.projectType === 'complete') ? (
                            <>
                              <RadioOption
                                title="PREMIUM (Signage)"
                                desc="Premium-Materialien, komplettes Design, LED-Beleuchtung, priorisierte Produktion und Montageplanung."
                                price="€3.500 – €6.500"
                                badge="✓ BEST VALUE"
                                selected={formData.packageType === 'premium'}
                                onClick={() => handleChange('packageType', 'premium')}
                              />
                              <RadioOption
                                title="PRO (Signage)"
                                desc="Hochwertige Materialien, professionelle Beratung, LED-Optionen verfügbar, verbesserte Langlebigkeit."
                                price="€2.000 – €3.500"
                                badge="⭐ MOST POPULAR"
                                badgeColor="#2a2a2e"
                                selected={formData.packageType === 'pro'}
                                onClick={() => handleChange('packageType', 'pro')}
                              />
                              <RadioOption
                                title="BASIC (Signage)"
                                desc="Standardmaterialien, einfache Produktion, ohne Beleuchtung, Basisberatung."
                                price="€1.200 – €2.000"
                                selected={formData.packageType === 'basic'}
                                onClick={() => handleChange('packageType', 'basic')}
                              />
                            </>
                          ) : (
                            <>
                              <RadioOption
                                title="PREMIUM (Website)"
                                desc="Individuelles Premium-Design, fortgeschrittene Animationen, Lead-Generierung und Performance-Optimierung."
                                price="ab €4.000"
                                badge="✓ BEST VALUE"
                                selected={formData.packageType === 'premium'}
                                onClick={() => handleChange('packageType', 'premium')}
                              />
                              <RadioOption
                                title="BUSINESS (Website)"
                                desc="Multi-Page Website, conversion-optimiertes Layout, Kontaktformulare, lokales Basis-SEO."
                                price="€2.000 – €4.000"
                                badge="⭐ MOST CHOSEN"
                                badgeColor="#2a2a2e"
                                selected={formData.packageType === 'business'}
                                onClick={() => handleChange('packageType', 'business')}
                              />
                              <RadioOption
                                title="ESSENTIAL (Website)"
                                desc="Moderne One-Page Website, mobil responsiv, cleanes Design."
                                price="€1.000 – €2.000"
                                selected={formData.packageType === 'basic'}
                                onClick={() => handleChange('packageType', 'basic')}
                              />
                            </>
                          )}
                        </div>
                        <p className="cfg-microcopy">
                          <Check size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
                          Die meisten Kunden wählen die PRO oder BUSINESS Option für maximale Sichtbarkeit.
                        </p>
                      </>
                    )}

                    {/* STEP 3: Upsell (Signage only) */}
                    {step === 3 && formData.projectType === 'signage' && (
                      <>
                        <h2 className="cfg-step-headline">Maximieren Sie Ihre Sichtbarkeit</h2>
                        <p className="cfg-step-desc">Möchten Sie zusätzlich eine professionelle Website, die perfekt zu Ihrem neuen Branding passt?</p>
                        <div className="cfg-options-grid">
                          <RadioOption
                            title="Premium Website hinzufügen"
                            desc="Individuelle Web-Erfahrung für maximale Conversions."
                            selected={formData.upsellWeb === 'premium'}
                            onClick={() => handleChange('upsellWeb', 'premium')}
                          />
                          <RadioOption
                            title="Business Website hinzufügen"
                            desc="Multi-Page Setup, um lokal neue Kunden zu gewinnen."
                            badge="⭐ EMPFEHLUNG"
                            selected={formData.upsellWeb === 'business'}
                            onClick={() => handleChange('upsellWeb', 'business')}
                          />
                          <RadioOption
                            title="Essential Website hinzufügen"
                            desc="Ein moderner One-Pager für Ihre digitale Präsenz."
                            selected={formData.upsellWeb === 'essential'}
                            onClick={() => handleChange('upsellWeb', 'essential')}
                          />
                          <RadioOption
                            title="Nein danke"
                            desc="Ich benötige aktuell nur Schilder & Reklame."
                            selected={formData.upsellWeb === 'none'}
                            onClick={() => handleChange('upsellWeb', 'none')}
                          />
                        </div>
                        {formData.upsellWeb !== 'none' && formData.upsellWeb !== '' && (
                          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="cfg-bundle-banner">
                            <Star color="var(--accent-primary)" size={20} />
                            <span>
                              Bundle-Vorteil aktiv: Sie sparen ca. €{formData.upsellWeb === 'premium' ? 800 : formData.upsellWeb === 'business' ? 500 : 300} durch die Kombination von Schilder- & Webdesign.
                            </span>
                          </motion.div>
                        )}
                      </>
                    )}

                    {/* STEP 4: Details & Inspiration */}
                    {step === 4 && (
                      <>
                        <h2 className="cfg-step-headline">Details & Inspiration</h2>
                        <div className="cfg-form-grid">
                          <div>
                            <label className="cfg-label"><Palette size={18} /> Bevorzugte Farben / CI</label>
                            <input type="text" value={formData.colors} onChange={e => handleChange('colors', e.target.value)} className="form-input" placeholder="z.B. Schwarz & Gold" />
                          </div>
                          <div>
                            <label className="cfg-label"><ImageIcon size={18} /> Haben Sie bereits ein Logo?</label>
                            <div className="cfg-logo-btns">
                              <button type="button" className={`btn-select ${formData.existingLogo === 'Ja' ? 'active' : ''}`} onClick={() => handleChange('existingLogo', 'Ja')}>Ja</button>
                              <button type="button" className={`btn-select ${formData.existingLogo === 'Nein, bitte gestalten' ? 'active' : ''}`} onClick={() => handleChange('existingLogo', 'Nein, bitte gestalten')}>Nein, ich benötige eins</button>
                            </div>
                          </div>
                          <div>
                            <label className="cfg-label"><LinkIcon size={18} /> Inspiration (Optional)</label>
                            <textarea
                              value={formData.inspiration}
                              onChange={e => handleChange('inspiration', e.target.value)}
                              className="form-input cfg-textarea"
                              placeholder="Haben Sie Websites oder Schilder gesehen, die Ihnen gefallen? Fügen Sie hier Links ein."
                            ></textarea>

                            <div className="cfg-whatsapp-hint">
                              <div style={{ marginTop: '2px', flexShrink: 0 }}><MessageCircle size={20} color="#25D366" /></div>
                              <div>
                                {formData.projectType === 'signage' || formData.projectType === 'complete' ? (
                                  <p>💡 Haben Sie bereits Fotos Ihres Geschäfts, Ihr Logo oder Beispiele, die Ihnen gefallen? Sie können uns diese später ganz unkompliziert per WhatsApp senden.</p>
                                ) : (
                                  <p>🌐 Haben Sie Websites gesehen, die Ihnen gefallen? Fügen Sie die Links hier ein oder schicken Sie uns Screenshots später per WhatsApp.</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {/* STEP 5: Lead Quality Filter */}
                    {step === 5 && (
                      <>
                        <h2 className="cfg-step-headline">Lassen Sie uns Erwartungen klären</h2>
                        <p className="cfg-step-desc">Für die bestmögliche Empfehlung benötigen wir Ihren groben Zeitrahmen und das Budget.</p>
                        <div className="cfg-form-grid">
                          <div>
                            <label className="cfg-label"><Clock size={18} /> Geschätzter Zeitrahmen?</label>
                            <div className="cfg-btn-grid">
                              {['So schnell wie möglich', 'Innerhalb 1 Monats', 'Innerhalb 3 Monaten', 'Sammle nur Ideen'].map(tf => (
                                <button key={tf} type="button" className={`btn-select ${formData.timeframe === tf ? 'active' : ''}`} onClick={() => handleChange('timeframe', tf)}>{tf}</button>
                              ))}
                            </div>
                          </div>
                          <div>
                            <label className="cfg-label"><DollarSign size={18} /> Ungefähres Budget?</label>
                            <div className="cfg-btn-grid">
                              {['Unter €1.500', '€1.500 – €3.000', '€3.000 – €6.000', 'Über €6.000'].map(bg => (
                                <button key={bg} type="button" className={`btn-select ${formData.budget === bg ? 'active' : ''}`} onClick={() => handleChange('budget', bg)}>{bg}</button>
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="cfg-microcopy">
                          „Viele Kunden upgraden später, aber Ihr Start-Budget hilft uns, das perfekte Basispaket zu finden."
                        </p>
                      </>
                    )}

                    {/* STEP 6: Contact Details */}
                    {step === 6 && (
                      <>
                        <h2 className="cfg-step-headline">Ihre Kontaktdaten</h2>
                        <p className="cfg-step-desc">Fast geschafft! Wohin sollen wir die Projekt-Einschätzung senden?</p>
                        <form id="lead-form" className="cfg-form-grid">
                          <div className="cfg-form-row">
                            <input type="text" value={formData.name} onChange={e => handleChange('name', e.target.value)} required className="form-input" placeholder="Ihr Name *" />
                            <input type="text" value={formData.company} onChange={e => handleChange('company', e.target.value)} className="form-input" placeholder="Firmenname" />
                          </div>
                          <input type="email" value={formData.email} onChange={e => handleChange('email', e.target.value)} required className="form-input" placeholder="E-Mail-Adresse *" />
                          <div className="cfg-form-row">
                            <input type="tel" value={formData.phone} onChange={e => handleChange('phone', e.target.value)} required className="form-input" placeholder="Telefonnummer *" />
                            <input type="tel" value={formData.whatsapp} onChange={e => handleChange('whatsapp', e.target.value)} className="form-input" placeholder="WhatsApp Nummer (Optional)" />
                          </div>
                        </form>

                        <p className="cfg-wa-footer">
                          <MessageCircle size={16} color="#25D366" /> 📱 Nach dem Absenden können Sie uns Fotos, Logos, Videos oder Inspirationen direkt per WhatsApp senden.
                        </p>
                      </>
                    )}

                    {/* STEP 7: Estimate */}
                    {step === 7 && (
                      <>
                        <h2 className="cfg-step-headline">Ihre Projekteinschätzung</h2>
                        <div className="glass-panel cfg-estimate-card">
                          <p className="cfg-estimate-label">Voraussichtlicher Investitionsrahmen</p>
                          <h3 className="text-gradient cfg-estimate-value">{getEstimate().estimate}</h3>

                          <div className="cfg-estimate-details">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} color="var(--accent-primary)" /> Projekt: {formData.projectType.toUpperCase()}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} color="var(--accent-primary)" /> Paket: {formData.packageType.toUpperCase()}</div>
                            {getEstimate().savings > 0 && (
                              <div style={{ color: 'var(--accent-primary)', fontWeight: 'bold', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Star size={16} /> Inklusive ~€{getEstimate().savings} Bundle-Ersparnis
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="cfg-trust-text">
                          Wir werden Ihre Anfrage persönlich prüfen und Ihnen eine maßgeschneiderte Empfehlung aussprechen.
                        </p>
                      </>
                    )}

                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Navigation */}
            <div className="cfg-nav">
              {step > 1 ? (
                <button className="btn-secondary" onClick={handleBack} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ArrowLeft size={18} /> Zurück
                </button>
              ) : <div className="cfg-nav-spacer"></div>}

              {step < 7 ? (
                <button
                  className="btn-primary"
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: isStepValid() ? 1 : 0.5 }}
                >
                  Weiter <ArrowRight size={18} />
                </button>
              ) : (
                <button onClick={handleSubmit} disabled={!isStepValid()} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: isStepValid() ? 1 : 0.5 }}>
                  Anfrage absenden <Check size={18} />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const RadioOption = ({ icon, title, desc, price, selected, onClick, badge, badgeColor }) => (
  <div
    className={`radio-card ${selected ? 'selected' : ''}`}
    onClick={onClick}
  >
    {badge && (
      <div className="radio-card-badge" style={{ background: badgeColor || 'var(--accent-primary)' }}>
        {badge}
      </div>
    )}
    {icon && <div style={{ color: selected ? 'var(--accent-primary)' : 'var(--text-secondary)', flexShrink: 0 }}>{icon}</div>}
    <div style={{ flex: 1, minWidth: 0 }}>
      <div className="radio-card-header">
        <h4 className="radio-card-title">{title}</h4>
        {price && <span className="radio-card-price">{price}</span>}
      </div>
      {desc && <p className="radio-card-desc">{desc}</p>}
    </div>
  </div>
);

export default Configurator;
