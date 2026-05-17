import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, ArrowLeft, UploadCloud, Monitor, Type, Palette, Maximize, Zap, Star, TrendingUp, ShieldCheck, Layout } from 'lucide-react';

const Configurator = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    signageTier: 'pro', // Default to Pro
    websiteTier: '',
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

  const handleSelect = (key, value) => {
    setFormData({ ...formData, [key]: value });
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
    let max = 0;
    
    // Signage estimate
    if (formData.signageTier === 'premium') { min += 3500; max += 6000; }
    else if (formData.signageTier === 'pro') { min += 1500; max += 3500; }
    else if (formData.signageTier === 'basic') { min += 800; max += 1500; }
    
    // Website estimate
    if (formData.websiteTier === 'premium') { min += 3500; max += 6000; }
    else if (formData.websiteTier === 'basic') { min += 1500; max += 2500; }
    
    // Combined bundle discount (15% off total if both are selected)
    if (formData.signageTier && formData.websiteTier && formData.websiteTier !== 'none') {
      min = Math.floor(min * 0.85);
      max = Math.floor(max * 0.85);
    }

    if (min === 0) return '---';
    return `€${min.toLocaleString()} - €${max.toLocaleString()}`;
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
            <h2 className="text-gradient" style={{fontSize: '2.5rem', marginBottom: '1rem'}}>Vielen Dank!</h2>
            <p style={{color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '2rem'}}>
              Ihre Sichtbarkeitsreise beginnt jetzt.<br/>Wir werden uns in Kürze mit Ihrem individuellen Angebot bei Ihnen melden.
            </p>
            <button className="btn-primary" onClick={onClose}>Zurück zur Startseite</button>
          </motion.div>
        ) : (
          <div style={layoutStyle}>
            {/* Sidebar / Progress */}
            <div style={sidebarStyle}>
              <h3 className="text-accent-glow" style={{marginBottom: '2rem', fontSize: '1.5rem'}}>Projekt-Konfigurator</h3>
              
              <div style={progressContainerStyle}>
                {[1, 2, 3, 4, 5].map((num) => (
                  <div key={num} style={{...stepItemStyle, opacity: step >= num ? 1 : 0.4}}>
                    <div style={{...stepCircleStyle, background: step >= num ? 'var(--accent-primary)' : 'transparent', borderColor: step >= num ? 'var(--accent-primary)' : 'var(--border-color)', color: step >= num ? 'white' : 'inherit'}}>
                      {step > num ? <Check size={12} color="white" /> : num}
                    </div>
                    <span style={{color: step === num ? 'var(--text-primary)' : 'var(--text-secondary)'}}>
                      {num === 1 ? 'Schilderart' : 
                       num === 2 ? 'Website-Upgrade' : 
                       num === 3 ? 'Details' : 
                       num === 4 ? 'Uploads' : 'Kontakt'}
                    </span>
                  </div>
                ))}
              </div>
              
              <div style={estimateBoxStyle}>
                <p style={{color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem'}}>Geschätzter Preisrahmen</p>
                <p className="text-gradient" style={{fontSize: '1.8rem', fontWeight: '700'}}>{getEstimate()}</p>
                {formData.signageTier && formData.websiteTier && formData.websiteTier !== 'none' && (
                  <div style={{ background: 'rgba(255,123,0,0.1)', color: 'var(--accent-primary)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold', display: 'inline-block', marginTop: '8px' }}>
                    Paket-Rabatt angewendet
                  </div>
                )}
                <p style={{color: 'rgba(255,123,0,0.7)', fontSize: '0.8rem', marginTop: '12px', fontStyle: 'italic'}}>
                  *Endgültiger Preis kann je nach genauen Anforderungen variieren.
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
                  <div style={{flex: 1}}>
                  {step === 1 && (
                    <>
                      <h2 style={{fontSize: '2rem', marginBottom: '1rem'}}>Wählen Sie Ihre Beschilderung</h2>
                      <p style={{color: 'var(--text-secondary)', marginBottom: '2rem'}}>Wählen Sie das gewünschte Maß an Sichtbarkeit für Ihren physischen Standort.</p>
                      
                      <div className="grid-cols-1" style={{display: 'grid', gap: '16px'}}>
                        {/* Premium - Shown First */}
                        <RadioOption 
                          icon={<Star size={24} />}
                          title="Premium LED-Schild"
                          desc="Dynamische, vollständig anpassbare LED-Technologie für maximale Sichtbarkeit bei Tag und Nacht."
                          priceRange="€3.500 - €6.000"
                          selected={formData.signageTier === 'premium'}
                          onClick={() => handleSelect('signageTier', 'premium')}
                          badge="Preis-Leistungs-Sieger"
                          badgeColor="linear-gradient(90deg, #FFD700, #FFA500)"
                        />
                        {/* Pro - Recommended Default */}
                        <RadioOption 
                          icon={<Zap size={24} />}
                          title="Pro Leuchtschild"
                          desc="Hochwertige hinterleuchtete Buchstaben für eine moderne, professionelle Unternehmensästhetik."
                          priceRange="€1.500 - €3.500"
                          selected={formData.signageTier === 'pro'}
                          onClick={() => handleSelect('signageTier', 'pro')}
                          badge="Empfohlen von Skyline Vision"
                          badgeColor="var(--accent-primary)"
                        />
                        {/* Basic - Shown Last */}
                        <RadioOption 
                          icon={<ShieldCheck size={24} />}
                          title="Basis Werbeschild"
                          desc="Standardmäßige, langlebige Außenschilder für wesentliche lokale Präsenz."
                          priceRange="€800 - €1.500"
                          selected={formData.signageTier === 'basic'}
                          onClick={() => handleSelect('signageTier', 'basic')}
                        />
                      </div>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                        <TrendingUp size={32} color="var(--accent-primary)" />
                        <h2 style={{fontSize: '2rem', margin: 0}}>Beschleunigen Sie Ihr Wachstum</h2>
                      </div>
                      <p style={{color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '1.1rem'}}>
                        Möchten Sie eine professionelle Website hinzufügen, um Kundenanfragen zu steigern?
                      </p>
                      
                      <div style={{ background: 'rgba(255,123,0,0.1)', border: '1px solid var(--border-accent)', padding: '16px', borderRadius: '8px', marginBottom: '2rem' }}>
                        <p style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-primary)', fontWeight: '500' }}>
                          <Zap size={18} /> Kombinieren Sie Schilder + Website für einen <strong>speziellen Paket-Rabatt!</strong>
                        </p>
                      </div>

                      <div className="grid-cols-1" style={{display: 'grid', gap: '16px'}}>
                        <RadioOption 
                          icon={<Monitor size={24} />}
                          title="Premium Website-Paket"
                          desc="Individuelles Design, fortschrittliches SEO und konversionsstarke Animationen. Dominieren Sie Ihren lokalen Markt."
                          priceRange="+ €3.500 - €6.000"
                          selected={formData.websiteTier === 'premium'}
                          onClick={() => handleSelect('websiteTier', 'premium')}
                          badge="Steigert die Kundensichtbarkeit um 300%"
                          badgeColor="linear-gradient(90deg, var(--accent-primary), #ff3300)"
                        />
                        <RadioOption 
                          icon={<Layout size={24} />}
                          title="Basis Website-Paket"
                          desc="Saubere, wesentliche digitale Präsenz, um Ihre Marke online zu legitimieren."
                          priceRange="+ €1.500 - €2.500"
                          selected={formData.websiteTier === 'basic'}
                          onClick={() => handleSelect('websiteTier', 'basic')}
                          badge="Meistgewählte Option"
                          badgeColor="var(--text-primary)"
                          badgeTextColor="var(--bg-main)"
                        />
                        <div 
                          className={`radio-card ${formData.websiteTier === 'none' ? 'selected' : ''}`} 
                          onClick={() => handleSelect('websiteTier', 'none')}
                          style={{ opacity: 0.7, borderStyle: 'dashed' }}
                        >
                           <div style={{display: 'flex', gap: '16px', alignItems: 'center'}}>
                              <div style={{color: 'var(--text-secondary)'}}><ArrowRight size={24} /></div>
                              <div>
                                <h4 style={{fontSize: '1.1rem', marginBottom: '4px'}}>Nein danke, vorerst nur Schilder</h4>
                                <p style={{color: 'var(--text-secondary)', fontSize: '0.9rem'}}>Ich verzichte auf den Paket-Rabatt.</p>
                              </div>
                           </div>
                        </div>
                      </div>
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <h2 style={{fontSize: '2rem', marginBottom: '1rem'}}>Projektdetails</h2>
                      <p style={{color: 'var(--text-secondary)', marginBottom: '2rem'}}>Geben Sie uns eine Vorstellung davon, was Sie im Sinn haben.</p>
                      
                      <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                        <div>
                          <label style={labelStyle}><Maximize size={16} /> Abmessungen / Größe (Optional)</label>
                          <input type="text" name="size" value={formData.size} onChange={handleChange} className="form-input" placeholder="z.B. 2m x 1m, oder 'Noch unsicher'" />
                        </div>
                        <div>
                          <label style={labelStyle}><Type size={16} /> Bevorzugter Stil</label>
                          <input type="text" name="style" value={formData.style} onChange={handleChange} className="form-input" placeholder="z.B. Minimalistisch, Auffällig, Corporate" />
                        </div>
                        <div>
                          <label style={labelStyle}><Palette size={16} /> Markenfarben</label>
                          <input type="text" name="colors" value={formData.colors} onChange={handleChange} className="form-input" placeholder="z.B. Schwarz & Gold, Rot & Weiß" />
                        </div>
                      </div>
                    </>
                  )}

                  {step === 4 && (
                    <>
                      <h2 style={{fontSize: '2rem', marginBottom: '1rem'}}>Materialien hochladen</h2>
                      <p style={{color: 'var(--text-secondary)', marginBottom: '2rem'}}>Haben Sie ein Logo oder Inspirationen? Hier ablegen (Optional).</p>
                      
                      <div style={uploadAreaStyle}>
                        <UploadCloud size={48} color="var(--accent-primary)" style={{marginBottom: '1rem'}} />
                        <p style={{marginBottom: '0.5rem', fontWeight: '500'}}>Zum Durchsuchen klicken oder Drag & Drop</p>
                        <p style={{color: 'var(--text-secondary)', fontSize: '0.9rem'}}>SVG, PNG, JPG, PDF (Max 10MB)</p>
                        <input type="file" style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer'}} />
                      </div>
                    </>
                  )}

                  {step === 5 && (
                    <>
                      <h2 style={{fontSize: '2rem', marginBottom: '1rem'}}>Kontaktdaten</h2>
                      <p style={{color: 'var(--text-secondary)', marginBottom: '2rem'}}>Fast geschafft! Wie können wir Sie erreichen?</p>
                      
                      <form id="lead-form" onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                        <div className="grid-cols-2" style={{gap: '16px'}}>
                          <input type="text" name="name" value={formData.name} onChange={handleChange} required className="form-input" placeholder="Ihr Name *" />
                          <input type="text" name="company" value={formData.company} onChange={handleChange} className="form-input" placeholder="Firmenname" />
                        </div>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required className="form-input" placeholder="E-Mail-Adresse *" />
                        <div className="grid-cols-2" style={{gap: '16px'}}>
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
                      <button className="btn-secondary" onClick={handleBack} style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <ArrowLeft size={16} /> Zurück
                      </button>
                    ) : <div></div>}
                    
                    {step < 5 ? (
                      <button 
                        className="btn-primary" 
                        onClick={handleNext} 
                        disabled={(step === 1 && !formData.signageTier) || (step === 2 && !formData.websiteTier)}
                        style={{display: 'flex', alignItems: 'center', gap: '8px', opacity: ((step === 1 && !formData.signageTier) || (step === 2 && !formData.websiteTier)) ? 0.5 : 1}}
                      >
                        Weiter <ArrowRight size={16} />
                      </button>
                    ) : (
                      <button type="submit" form="lead-form" className="btn-primary" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        Mein individuelles Angebot erhalten <Check size={16} />
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
      boxShadow: selected ? '0 8px 30px rgba(255,123,0,0.15)' : 'none'
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
    <div style={{display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center'}}>
      <div style={{display: 'flex', gap: '16px', alignItems: 'center'}}>
        {icon && <div style={{color: selected ? 'var(--accent-primary)' : 'var(--text-secondary)'}}>{icon}</div>}
        <div>
          <h4 style={{fontSize: '1.2rem', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px'}}>
            {title}
          </h4>
          <p style={{color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '350px'}}>{desc}</p>
        </div>
      </div>
      <div style={{textAlign: 'right'}}>
         <span style={{fontSize: '1.1rem', fontWeight: 'bold', color: selected ? 'var(--text-primary)' : 'var(--text-secondary)'}}>{priceRange}</span>
      </div>
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
