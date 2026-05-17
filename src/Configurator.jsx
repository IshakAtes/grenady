import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, ArrowLeft, UploadCloud, Monitor, Type, Palette, Maximize, TrendingUp, Layout, Printer, Image as ImageIcon } from 'lucide-react';

const serviceOptions = [
  { id: 'signage', title: 'Schilder & Reklame', desc: 'Leucht- & Firmenschilder', price: 800, priceDisplay: 'ab €800', icon: <Monitor size={24} /> },
  { id: 'web', title: 'Webdesign', desc: 'Premium Websites', price: 1500, priceDisplay: 'ab €1.500', icon: <Layout size={24} /> },
  { id: 'print', title: 'Visitenkarten & Flyer', desc: 'Premium Printprodukte', price: 150, priceDisplay: 'ab €150', icon: <Printer size={24} /> },
  { id: 'seo', title: 'SEO & Sichtbarkeit', desc: 'Lokales Ranking', price: 300, priceDisplay: 'ab €300/mtl.', icon: <TrendingUp size={24} /> },
  { id: 'logo', title: 'Logo & Branding', desc: 'Markenidentität', price: 500, priceDisplay: 'ab €500', icon: <Palette size={24} /> },
  { id: 'decor', title: 'Wanddekoration', desc: 'Innenraumgestaltung', price: 300, priceDisplay: 'ab €300', icon: <ImageIcon size={24} /> },
];

const Configurator = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    services: ['signage', 'web'], // Default selected
    size: '',
    style: '',
    colors: '',
    files: null,
    name: '',
    company: '',
    email: '',
    phone: '',
    whatsapp: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleToggleService = (id) => {
    setFormData(prev => {
      const isSelected = prev.services.includes(id);
      if (isSelected) {
        return { ...prev, services: prev.services.filter(s => s !== id) };
      } else {
        return { ...prev, services: [...prev.services, id] };
      }
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  // Calculate estimated price ranges
  const getEstimate = () => {
    let min = 0;
    formData.services.forEach(serviceId => {
      const option = serviceOptions.find(o => o.id === serviceId);
      if (option) min += option.price;
    });

    if (min === 0) return '---';
    return `ab €${min.toLocaleString()}`;
  };

  // Animations
  const slideVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
  };

  return (
    <div className="configurator-overlay" style={overlayStyle}>
      <div className="glass-panel configurator-modal" style={modalStyle}>
        <button onClick={onClose} style={closeBtnStyle}>✕</button>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={successStyle}
          >
            <div style={glowCircleStyle}>
              <Check size={48} color="var(--accent-primary)" />
            </div>
            <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Vielen Dank!</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '2rem' }}>
              Ihr Projekt-Briefing ist bei uns eingegangen.<br />Wir melden uns in Kürze mit einem maßgeschneiderten Angebot.
            </p>
            <button className="btn-primary" onClick={onClose}>Zurück zur Startseite</button>
          </motion.div>
        ) : (
          <div style={layoutStyle}>
            {/* Sidebar / Progress */}
            <div style={sidebarStyle}>
              <h3 className="text-accent-glow" style={{ marginBottom: '2rem', fontSize: '1.5rem' }}>Projekt-Start</h3>

              <div style={progressContainerStyle}>
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} style={{ ...stepItemStyle, opacity: step >= num ? 1 : 0.4 }}>
                    <div style={{ ...stepCircleStyle, background: step >= num ? 'var(--accent-primary)' : 'transparent', borderColor: step >= num ? 'var(--accent-primary)' : 'var(--border-color)', color: step >= num ? 'white' : 'inherit' }}>
                      {step > num ? <Check size={12} color="white" /> : num}
                    </div>
                    <span style={{ color: step === num ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                      {num === 1 ? 'Leistungen' :
                        num === 2 ? 'Details' :
                          num === 3 ? 'Uploads' : 'Kontakt'}
                    </span>
                  </div>
                ))}
              </div>

              <div style={estimateBoxStyle}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Geschätzter Startpreis</p>
                <p className="text-gradient" style={{ fontSize: '1.8rem', fontWeight: '700' }}>{getEstimate()}</p>
                {formData.services.length > 1 && (
                  <div style={{ background: 'rgba(255,123,0,0.1)', color: 'var(--accent-primary)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold', display: 'inline-block', marginTop: '8px' }}>
                    Paket-Vorteil möglich
                  </div>
                )}
                <p style={{ color: 'rgba(255,123,0,0.7)', fontSize: '0.8rem', marginTop: '12px', fontStyle: 'italic' }}>
                  *Endgültiger Preis wird nach individuellem Aufwand berechnet.
                </p>
              </div>
            </div>

            {/* Main Content Area */}
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
                        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Was benötigen Sie?</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Wählen Sie alle gewünschten Leistungen für Ihr Projekt aus. Mehrere Auswahlen sind möglich.</p>

                        <div className="grid-cols-2" style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
                          {serviceOptions.map((service) => (
                            <RadioOption
                              key={service.id}
                              icon={service.icon}
                              title={service.title}
                              desc={service.desc}
                              priceRange={service.priceDisplay}
                              selected={formData.services.includes(service.id)}
                              onClick={() => handleToggleService(service.id)}
                            />
                          ))}
                        </div>
                      </>
                    )}

                    {step === 2 && (
                      <>
                        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Projektdetails</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Geben Sie uns eine Vorstellung davon, was Sie im Sinn haben.</p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                          <div>
                            <label style={labelStyle}><Maximize size={16} /> Abmessungen / Spezifikationen (Optional)</label>
                            <input type="text" name="size" value={formData.size} onChange={handleChange} className="form-input" placeholder="z.B. Schildergröße, Seitenanzahl der Website etc." />
                          </div>
                          <div>
                            <label style={labelStyle}><Type size={16} /> Bevorzugter Stil</label>
                            <input type="text" name="style" value={formData.style} onChange={handleChange} className="form-input" placeholder="z.B. Minimalistisch, Auffällig, Corporate" />
                          </div>
                          <div>
                            <label style={labelStyle}><Palette size={16} /> Markenfarben / CI</label>
                            <input type="text" name="colors" value={formData.colors} onChange={handleChange} className="form-input" placeholder="z.B. Schwarz & Gold, Rot & Weiß" />
                          </div>
                        </div>
                      </>
                    )}

                    {step === 3 && (
                      <>
                        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Materialien hochladen</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Haben Sie bereits ein Logo, Bilder vom Ladenlokal oder Inspirationen? Hier ablegen (Optional).</p>

                        <div style={uploadAreaStyle}>
                          <UploadCloud size={48} color="var(--accent-primary)" style={{ marginBottom: '1rem' }} />
                          <p style={{ marginBottom: '0.5rem', fontWeight: '500' }}>Zum Durchsuchen klicken oder Drag & Drop</p>
                          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>SVG, PNG, JPG, PDF (Max 10MB)</p>
                          <input type="file" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }} />
                        </div>
                      </>
                    )}

                    {step === 4 && (
                      <>
                        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Kontaktdaten</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Fast geschafft! Wie können wir Sie erreichen?</p>

                        <form id="lead-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                          <div className="grid-cols-2" style={{ gap: '16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="form-input" placeholder="Ihr Name *" />
                            <input type="text" name="company" value={formData.company} onChange={handleChange} className="form-input" placeholder="Firmenname" />
                          </div>
                          <input type="email" name="email" value={formData.email} onChange={handleChange} required className="form-input" placeholder="E-Mail-Adresse *" />
                          <div className="grid-cols-2" style={{ gap: '16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="form-input" placeholder="Telefonnummer *" />
                            <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} className="form-input" placeholder="WhatsApp (Optional)" />
                          </div>
                        </form>
                      </>
                    )}
                  </div>

                  {/* Navigation Buttons */}
                  <div style={navButtonsStyle}>
                    {step > 1 ? (
                      <button className="btn-secondary" onClick={handleBack} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <ArrowLeft size={16} /> Zurück
                      </button>
                    ) : <div></div>}

                    {step < 4 ? (
                      <button
                        className="btn-primary"
                        onClick={handleNext}
                        disabled={(step === 1 && formData.services.length === 0)}
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: (step === 1 && formData.services.length === 0) ? 0.5 : 1 }}
                      >
                        Weiter <ArrowRight size={16} />
                      </button>
                    ) : (
                      <button type="submit" form="lead-form" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        Mein Angebot anfordern <Check size={16} />
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

const RadioOption = ({ icon, title, desc, priceRange, selected, onClick, badge, badgeColor, badgeTextColor }) => (
  <div
    className={`radio-card ${selected ? 'selected' : ''}`}
    onClick={onClick}
    style={{
      border: selected ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)',
      transform: selected ? 'scale(1.02)' : 'scale(1)',
      boxShadow: selected ? '0 8px 30px rgba(255,123,0,0.15)' : 'none',
      padding: '16px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
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
        boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
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
    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '12px', flex: 1 }}>{desc}</p>
    <div style={{ textAlign: 'left', borderTop: '1px solid var(--border-color)', width: '100%', paddingTop: '8px' }}>
      <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: selected ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{priceRange}</span>
    </div>
  </div>
);

// Inline Styles
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
  padding: '20px'
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
  boxShadow: '0 25px 50px -12px rgba(255, 123, 0, 0.15)'
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
  transition: 'all 0.2s ease'
};

const layoutStyle = {
  display: 'flex',
  height: '100%',
  flexDirection: 'row',
  '@media (maxWidth: 768px)': {
    flexDirection: 'column'
  }
};

const sidebarStyle = {
  width: '320px',
  background: 'var(--bg-sidebar)',
  borderRight: '1px solid var(--border-color)',
  padding: '40px 30px',
  display: 'flex',
  flexDirection: 'column',
  '@media (maxWidth: 768px)': {
    width: '100%',
    padding: '20px',
    height: 'auto',
    borderRight: 'none',
    borderBottom: '1px solid var(--border-color)'
  }
};

const contentStyle = {
  flex: 1,
  padding: '60px 80px',
  overflowY: 'auto',
  '@media (maxWidth: 768px)': {
    padding: '30px 20px'
  }
};

const progressContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  marginBottom: 'auto'
};

const stepItemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  transition: 'opacity 0.3s ease'
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
  transition: 'all 0.3s ease'
};

const estimateBoxStyle = {
  background: 'rgba(255, 123, 0, 0.05)',
  border: '1px solid var(--border-accent)',
  borderRadius: '12px',
  padding: '20px',
  marginTop: '40px'
};

const navButtonsStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '40px',
  paddingTop: '20px',
  borderTop: '1px solid var(--border-color)'
};

const labelStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '8px',
  color: 'var(--text-secondary)'
};

const uploadAreaStyle = {
  border: '2px dashed var(--border-color)',
  borderRadius: '12px',
  padding: '40px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'var(--upload-bg)',
  position: 'relative',
  transition: 'all 0.3s ease',
  cursor: 'pointer'
};

const successStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  textAlign: 'center',
  padding: '40px'
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
  boxShadow: '0 0 50px var(--accent-muted)'
};

export default Configurator;
