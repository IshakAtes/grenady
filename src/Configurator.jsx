import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  Euro,
  Image as ImageIcon,
  Layout,
  Link as LinkIcon,
  MessageSquare,
  Monitor,
  Palette,
  Phone,
  Printer,
  TrendingUp,
  Type,
} from 'lucide-react';
import { getWhatsappUrl } from './config/whatsapp';

const projectOptions = [
  { id: 'signage', title: 'Schilder & Reklame', desc: 'Leuchtreklame, Firmenschilder, LED-Schilder', icon: <Monitor size={24} /> },
  { id: 'website', title: 'Webdesign', desc: 'Website, Landingpage oder Relaunch', icon: <Layout size={24} /> },
  { id: 'visibility', title: 'Komplettes Sichtbarkeitspaket', desc: 'Schilder und Website aus einer Hand', icon: <TrendingUp size={24} /> },
  { id: 'branding', title: 'Branding & Print', desc: 'Logo, Visitenkarten, Flyer oder Wandgestaltung', icon: <Palette size={24} /> },
];

const signTypeOptions = [
  { id: 'illuminated', title: 'Leuchtreklame', desc: 'Auffällig bei Tag und Nacht', icon: <ImageIcon size={24} /> },
  { id: 'company', title: 'Firmenschild', desc: 'Premium-Schild für Fassade, Praxis oder Büro', icon: <Printer size={24} /> },
  { id: 'led', title: 'LED-Schild', desc: 'Modern, hell und aufmerksamkeitsstark', icon: <Monitor size={24} /> },
  { id: 'unsure', title: 'Noch offen', desc: 'Wir beraten zur passenden Lösung', icon: <MessageSquare size={24} /> },
];

const websitePackageOptions = [
  { id: 'starter', title: 'Starter Website', desc: 'Kompakte Website für lokale Sichtbarkeit' },
  { id: 'premium', title: 'Premium Website', desc: 'Mehr Seiten, stärkere Wirkung, bessere Conversion' },
  { id: 'relaunch', title: 'Relaunch', desc: 'Bestehende Website hochwertig erneuern' },
  { id: 'unsure', title: 'Noch offen', desc: 'Wir empfehlen ein passendes Paket' },
];

const budgetOptions = [
  { id: 'under-1000', title: 'Bis 1.000 EUR', desc: 'Kleines Projekt oder Einstieg' },
  { id: '1000-3000', title: '1.000 - 3.000 EUR', desc: 'Solider Rahmen für lokale Sichtbarkeit' },
  { id: '3000-7000', title: '3.000 - 7.000 EUR', desc: 'Premium-Auftritt mit mehr Umfang' },
  { id: '7000-plus', title: 'Über 7.000 EUR', desc: 'Umfangreiches Sichtbarkeitssystem' },
  { id: 'unsure', title: 'Noch offen', desc: 'Budget gemeinsam einschätzen' },
];

const timelineOptions = [
  { id: 'asap', title: 'So schnell wie möglich', desc: 'Priorität auf zügiger Umsetzung' },
  { id: '2-4-weeks', title: 'In 2 - 4 Wochen', desc: 'Konkreter Start ist geplant' },
  { id: '1-3-months', title: 'In 1 - 3 Monaten', desc: 'Projekt wird vorbereitet' },
  { id: 'flexible', title: 'Flexibel', desc: 'Zeitraum ist noch offen' },
];

const Configurator = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    projectType: '',
    signType: '',
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
  const [submitted, setSubmitted] = useState(false);

  const canProceed =
    (step === 1 && formData.projectType) ||
    step === 2 ||
    (step === 3 && formData.name && formData.email && formData.phone);

  const handleSelect = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (!canProceed) return;
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const getSelectedLabel = (options, value) => options.find((option) => option.id === value)?.title || 'Noch offen';

  const slideVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } },
  };

  return (
    <div className="configurator-overlay" style={overlayStyle}>
      <div className="glass-panel configurator-modal" style={modalStyle}>
        <button onClick={onClose} style={closeBtnStyle}>×</button>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={successStyle}
          >
            <div style={glowCircleStyle}>
              <Check size={48} color="var(--accent-primary)" />
            </div>
            <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
              Vielen Dank für Ihre Anfrage.
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '2rem' }}>
              Wir prüfen Ihre Angaben und melden uns schnellstmöglich bei Ihnen.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '560px', marginBottom: '2rem' }}>
              Senden Sie uns gerne Fotos, Logos, Videos, Screenshots oder Inspirationen direkt per WhatsApp.
            </p>
            <a
              className="btn-primary"
              href={getWhatsappUrl()}
              target="_blank"
              rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}
            >
              📱 Dateien per WhatsApp senden
            </a>
            <button className="btn-secondary" onClick={onClose}>Zurück zur Startseite</button>
          </motion.div>
        ) : (
          <div style={layoutStyle}>
            <div style={sidebarStyle}>
              <h3 className="text-accent-glow" style={{ marginBottom: '2rem', fontSize: '1.5rem' }}>Projekt-Start</h3>

              <div style={progressContainerStyle}>
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} style={{ ...stepItemStyle, opacity: step >= num ? 1 : 0.4 }}>
                    <div style={{ ...stepCircleStyle, background: step >= num ? 'var(--accent-primary)' : 'transparent', borderColor: step >= num ? 'var(--accent-primary)' : 'var(--border-color)', color: step >= num ? 'white' : 'inherit' }}>
                      {step > num ? <Check size={12} color="white" /> : num}
                    </div>
                    <span style={{ color: step === num ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                      {num === 1 ? 'Projekt' : num === 2 ? 'Rahmen' : num === 3 ? 'Kontakt' : 'Absenden'}
                    </span>
                  </div>
                ))}
              </div>

              <div style={estimateBoxStyle}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Aktuelle Auswahl</p>
                <p className="text-gradient" style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '12px' }}>
                  {getSelectedLabel(projectOptions, formData.projectType)}
                </p>
                <p style={{ color: 'rgba(255,123,0,0.8)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                  Je genauer die Angaben, desto schneller können wir ein passendes Angebot vorbereiten.
                </p>
              </div>
            </div>

            <div style={contentStyle}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  variants={slideVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <div style={{ flex: 1 }}>
                    {step === 1 && (
                      <>
                        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Welche Sichtbarkeit brauchen Sie?</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                          Wählen Sie die passende Projektart und, falls relevant, die Schildart oder das Website-Paket.
                        </p>

                        <div className="grid-cols-2" style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
                          {projectOptions.map((option) => (
                            <RadioOption
                              key={option.id}
                              icon={option.icon}
                              title={option.title}
                              desc={option.desc}
                              selected={formData.projectType === option.id}
                              onClick={() => handleSelect('projectType', option.id)}
                            />
                          ))}
                        </div>

                        <div style={{ display: 'grid', gap: '20px', marginTop: '28px' }}>
                          <OptionGroup label="Schildart" icon={<Monitor size={16} />} options={signTypeOptions} value={formData.signType} onSelect={(value) => handleSelect('signType', value)} />
                          <OptionGroup label="Website-Paket" icon={<Layout size={16} />} options={websitePackageOptions} value={formData.websitePackage} onSelect={(value) => handleSelect('websitePackage', value)} />
                        </div>
                      </>
                    )}

                    {step === 2 && (
                      <>
                        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Budget, Zeitraum & Inspiration</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                          Diese Angaben helfen uns, Ihr Projekt realistisch einzuordnen.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                          <OptionGroup label="Budgetrahmen" icon={<Euro size={16} />} options={budgetOptions} value={formData.budget} onSelect={(value) => handleSelect('budget', value)} />
                          <OptionGroup label="Zeitraum" icon={<Clock size={16} />} options={timelineOptions} value={formData.timeline} onSelect={(value) => handleSelect('timeline', value)} />

                          <div>
                            <label style={labelStyle}><LinkIcon size={16} /> Inspirations-Websites</label>
                            <textarea
                              name="inspirationWebsites"
                              value={formData.inspirationWebsites}
                              onChange={handleChange}
                              className="form-input"
                              rows="3"
                              placeholder="Links zu Websites, Stilen oder Marken, die Ihnen gefallen"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {step === 3 && (
                      <>
                        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Kontaktdaten & Notizen</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                          Wie können wir Sie erreichen und was sollten wir vorab wissen?
                        </p>

                        <form id="lead-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                          <div className="grid-cols-2" style={{ gap: '16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="form-input" placeholder="Ihr Name *" />
                            <input type="text" name="company" value={formData.company} onChange={handleChange} className="form-input" placeholder="Firma / Geschäft" />
                          </div>
                          <input type="email" name="email" value={formData.email} onChange={handleChange} required className="form-input" placeholder="E-Mail-Adresse *" />
                          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="form-input" placeholder="Telefonnummer *" />
                          <div>
                            <label style={labelStyle}><Type size={16} /> Notizen</label>
                            <textarea
                              name="notes"
                              value={formData.notes}
                              onChange={handleChange}
                              className="form-input"
                              rows="5"
                              placeholder="Wünsche, Standort, vorhandene Website oder besondere Anforderungen"
                            />
                          </div>
                        </form>
                      </>
                    )}

                    {step === 4 && (
                      <>
                        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Anfrage prüfen</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                          Senden Sie die Anfrage ab. Dateien schicken Sie danach bequem per WhatsApp.
                        </p>

                        <div style={summaryGridStyle}>
                          <SummaryItem label="Projektart" value={getSelectedLabel(projectOptions, formData.projectType)} />
                          <SummaryItem label="Schildart" value={getSelectedLabel(signTypeOptions, formData.signType)} />
                          <SummaryItem label="Website-Paket" value={getSelectedLabel(websitePackageOptions, formData.websitePackage)} />
                          <SummaryItem label="Budgetrahmen" value={getSelectedLabel(budgetOptions, formData.budget)} />
                          <SummaryItem label="Zeitraum" value={getSelectedLabel(timelineOptions, formData.timeline)} />
                          <SummaryItem label="Kontakt" value={formData.name ? `${formData.name}${formData.company ? `, ${formData.company}` : ''}` : 'Noch offen'} />
                        </div>

                        <div style={whatsappHintStyle}>
                          <Phone size={22} color="var(--accent-primary)" />
                          <div>
                            <strong>Dateien nach dem Absenden per WhatsApp senden</strong>
                            <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
                              Fotos, Logos, Videos, Screenshots und Inspirationen werden nicht hochgeladen, sondern direkt per WhatsApp geteilt.
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div style={navButtonsStyle}>
                    {step > 1 ? (
                      <button className="btn-secondary" onClick={handleBack} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <ArrowLeft size={16} /> Zurück
                      </button>
                    ) : <div />}

                    {step < 4 ? (
                      <button
                        className="btn-primary"
                        onClick={handleNext}
                        disabled={!canProceed}
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: canProceed ? 1 : 0.5 }}
                      >
                        Weiter <ArrowRight size={16} />
                      </button>
                    ) : (
                      <button onClick={handleSubmit} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        Anfrage absenden <Check size={16} />
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
};

const OptionGroup = ({ label, icon, options, value, onSelect }) => (
  <div>
    <label style={labelStyle}>{icon} {label}</label>
    <div className="grid-cols-2" style={{ display: 'grid', gap: '12px', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
      {options.map((option) => (
        <RadioOption
          key={option.id}
          icon={option.icon}
          title={option.title}
          desc={option.desc}
          compact
          selected={value === option.id}
          onClick={() => onSelect(option.id)}
        />
      ))}
    </div>
  </div>
);

const RadioOption = ({ icon, title, desc, selected, onClick, badge, badgeColor, badgeTextColor, compact }) => (
  <div
    className={`radio-card ${selected ? 'selected' : ''}`}
    onClick={onClick}
    style={{
      border: selected ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)',
      transform: selected ? 'scale(1.02)' : 'scale(1)',
      boxShadow: selected ? '0 8px 30px rgba(255,123,0,0.15)' : 'none',
      padding: compact ? '14px' : '16px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    {badge && (
      <div style={{
        position: 'absolute',
        top: '-12px',
        right: '20px',
        background: badgeColor || 'var(--accent-primary)',
        color: badgeTextColor || 'white',
        fontSize: '0.75rem',
        fontWeight: 'bold',
        padding: '4px 12px',
        borderRadius: '12px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
      }}>
        {badge}
      </div>
    )}
    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '8px' }}>
      {icon && <div style={{ color: selected ? 'var(--accent-primary)' : 'var(--text-secondary)' }}>{icon}</div>}
      <div>
        <h4 style={{ fontSize: '1.1rem', marginBottom: '4px', lineHeight: '1.2' }}>
          {title}
        </h4>
      </div>
    </div>
    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: 0, flex: 1 }}>{desc}</p>
  </div>
);

const SummaryItem = ({ label, value }) => (
  <div style={summaryItemStyle}>
    <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{label}</span>
    <strong style={{ color: 'var(--text-primary)', fontSize: '1rem' }}>{value}</strong>
  </div>
);

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'var(--bg-overlay)',
  backdropFilter: 'blur(10px)',
  zIndex: 1000,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px',
};

const modalStyle = {
  width: '100%',
  maxWidth: '1000px',
  height: '85vh',
  maxHeight: '800px',
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0 25px 50px -12px rgba(255, 123, 0, 0.15)',
};

const closeBtnStyle = {
  position: 'absolute',
  top: '20px',
  right: '20px',
  background: 'var(--close-btn-bg)',
  borderRadius: '50%',
  width: '36px',
  height: '36px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  color: 'var(--text-primary)',
  fontSize: '1.2rem',
  cursor: 'pointer',
  zIndex: 10,
  transition: 'all 0.2s ease',
};

const layoutStyle = {
  display: 'flex',
  height: '100%',
  flexDirection: 'row',
};

const sidebarStyle = {
  width: '320px',
  background: 'var(--bg-sidebar)',
  borderRight: '1px solid var(--border-color)',
  padding: '40px 30px',
  display: 'flex',
  flexDirection: 'column',
};

const contentStyle = {
  flex: 1,
  padding: '60px 80px',
  overflowY: 'auto',
};

const progressContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  marginBottom: 'auto',
};

const stepItemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  transition: 'opacity 0.3s ease',
};

const stepCircleStyle = {
  width: '28px',
  height: '28px',
  borderRadius: '50%',
  border: '2px solid',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '0.8rem',
  fontWeight: 'bold',
  transition: 'all 0.3s ease',
};

const estimateBoxStyle = {
  background: 'rgba(255, 123, 0, 0.05)',
  border: '1px solid var(--border-accent)',
  borderRadius: '12px',
  padding: '20px',
  marginTop: '40px',
};

const navButtonsStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '40px',
  paddingTop: '20px',
  borderTop: '1px solid var(--border-color)',
};

const labelStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '8px',
  color: 'var(--text-secondary)',
};

const successStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  textAlign: 'center',
  padding: '40px',
};

const glowCircleStyle = {
  width: '100px',
  height: '100px',
  borderRadius: '50%',
  background: 'var(--accent-muted)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '2rem',
  boxShadow: '0 0 50px var(--accent-muted)',
};

const summaryGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '14px',
  marginBottom: '28px',
};

const summaryItemStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  background: 'var(--bg-card)',
  border: '1px solid var(--border-color)',
  borderRadius: '12px',
  padding: '16px',
};

const whatsappHintStyle = {
  display: 'flex',
  gap: '14px',
  alignItems: 'flex-start',
  background: 'rgba(255, 123, 0, 0.06)',
  border: '1px solid var(--border-accent)',
  borderRadius: '12px',
  padding: '18px',
};

export default Configurator;
