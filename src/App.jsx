import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Phone, ArrowRight, Monitor, Layout, Printer, TrendingUp, Palette, Image as ImageIcon, Zap, Menu, X, Sun, Moon, CheckCircle2 } from 'lucide-react';
import Configurator from './Configurator';

import cafeDeLokmaNeon from './assets/cafe-de-lokma-neon.jpg';
import seebarSchild from './assets/seebar-schild.jpeg';
import seebarSchild2 from './assets/seebar-shild2.jpg';
import lokmaVorher from './assets/lokmaReklameVorherjpg.jpg';
import lokmaNachher from './assets/lokmaReklameNachher.jpg';
import wanddekoTeddy from './assets/wanddeko-teddy.jpg';
import wcNeon from './assets/wc-neon.jpg';

function App() {
  const [isConfiguratorOpen, setIsConfiguratorOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Reusable components
  const ServiceCard = ({ icon, title, desc }) => (
    <div className="glass-card" style={{ padding: '40px 30px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ color: 'var(--accent-primary)', marginBottom: '24px', background: 'var(--accent-muted)', width: '60px', height: '60px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
      <h3 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>{title}</h3>
      <p style={{ color: 'var(--text-secondary)', flex: 1 }}>{desc}</p>
      <button style={{ marginTop: '24px', background: 'none', border: 'none', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: '600', padding: 0 }}>
        Mehr erfahren <ArrowRight size={16} />
      </button>
    </div>
  );

  const TrustItem = ({ title, desc }) => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
      <div style={{ color: 'var(--accent-primary)', marginTop: '4px' }}><CheckCircle2 size={24} /></div>
      <div>
        <h4 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{title}</h4>
        <p style={{ color: 'var(--text-secondary)' }}>{desc}</p>
      </div>
    </div>
  );

  // Animation Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <div className="ambient-glow" style={{ top: '-10%', left: '-10%' }}></div>
      <div className="ambient-glow" style={{ top: '40%', right: '-10%' }}></div>

      {/* Navigation */}
      <nav style={{ 
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, 
        background: scrolled ? 'var(--nav-bg)' : 'transparent', 
        backdropFilter: scrolled ? 'blur(16px)' : 'none', 
        borderBottom: scrolled ? '1px solid var(--border-color)' : 'none',
        transition: 'all 0.3s ease',
        padding: scrolled ? '16px 0' : '24px 0'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', background: 'var(--accent-primary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={24} color="white" />
            </div>
            <span style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '-0.02em' }}>Skyline Vision</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="desktop-only" style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
            <a href="#leistungen" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: '500', transition: 'color 0.2s ease' }} onMouseOver={e => e.target.style.color = 'var(--accent-primary)'} onMouseOut={e => e.target.style.color = 'var(--text-primary)'}>Leistungen</a>
            <a href="#portfolio" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: '500', transition: 'color 0.2s ease' }} onMouseOver={e => e.target.style.color = 'var(--accent-primary)'} onMouseOut={e => e.target.style.color = 'var(--text-primary)'}>Projekte</a>
            <a href="#kontakt" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: '500', transition: 'color 0.2s ease' }} onMouseOver={e => e.target.style.color = 'var(--accent-primary)'} onMouseOut={e => e.target.style.color = 'var(--text-primary)'}>Kontakt</a>
            <button onClick={toggleTheme} style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', padding: '8px' }}>
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="btn-primary" onClick={() => setIsConfiguratorOpen(true)}>Angebot anfragen</button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="mobile-only" style={{ display: 'none' }}>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}>
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      <main>
        {/* New Premium Split Hero Section */}
        <section className="hero" style={{ paddingTop: '160px', paddingBottom: '120px', minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
          <div className="container" style={{ position: 'relative', zIndex: 10 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '60px' }}>
              
              {/* Left Column: Text & CTAs */}
              <motion.div 
                style={{ flex: '1 1 500px' }}
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                <motion.div variants={fadeUp} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--bg-surface)', padding: '8px 16px', borderRadius: '50px', border: '1px solid var(--border-color)', marginBottom: '32px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-primary)', display: 'inline-block' }}></span>
                  <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>Premium Full-Service Agentur</span>
                </motion.div>
                
                <motion.h1 variants={fadeUp} style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', marginBottom: '24px', lineHeight: '1.1' }}>
                  Make your business visible – <span className="text-gradient">offline & online.</span>
                </motion.h1>
                
                <motion.p variants={fadeUp} style={{ fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', color: 'var(--text-secondary)', marginBottom: '40px', maxWidth: '600px', lineHeight: '1.6' }}>
                  Premium Schilder & Webdesign für Unternehmen, die mehr Kunden gewinnen wollen.
                </motion.p>
                
                <motion.div variants={fadeUp} style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                  <button className="btn-primary" onClick={() => setIsConfiguratorOpen(true)}>
                    Kostenloses Angebot anfragen
                  </button>
                  <button className="btn-secondary" onClick={() => setIsConfiguratorOpen(true)}>
                    Projekt konfigurieren
                  </button>
                </motion.div>
              </motion.div>

              {/* Right Column: Animated Graphic */}
              <motion.div 
                style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                {/* Abstract CSS/SVG Visual representing Glowing Signage / Skyline */}
                <div className="floating-element" style={{ width: '100%', maxWidth: '500px', aspectRatio: '1', position: 'relative' }}>
                  {/* Glow Backdrop */}
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '300px', height: '300px', background: 'var(--accent-muted)', borderRadius: '50%', filter: 'blur(80px)', zIndex: 0 }}></div>
                  
                  {/* Glass Panel Frame */}
                  <div className="glass-panel" style={{ position: 'absolute', top: '10%', left: '10%', right: '10%', bottom: '10%', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                     <svg viewBox="0 0 200 200" width="100%" height="100%">
                        <defs>
                          <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="var(--accent-primary)" />
                            <stop offset="100%" stopColor="#ff3d00" />
                          </linearGradient>
                        </defs>
                        {/* Skyline Silhouette */}
                        <path d="M20,150 L20,100 L50,100 L50,60 L80,60 L80,80 L110,80 L110,40 L140,40 L140,90 L170,90 L170,150 Z" fill="var(--bg-card)" stroke="var(--border-color)" strokeWidth="2" />
                        {/* Animated Neon Line */}
                        <path className="svg-glow-path svg-pulse" d="M20,150 L20,100 L50,100 L50,60 L80,60 L80,80 L110,80 L110,40 L140,40 L140,90 L170,90 L170,150" fill="none" stroke="url(#glowGrad)" strokeWidth="4" strokeLinejoin="round" />
                        {/* Web Node Dots representing digital */}
                        <circle cx="50" cy="60" r="4" fill="white" className="svg-pulse" />
                        <circle cx="110" cy="40" r="4" fill="white" className="svg-pulse" />
                        <circle cx="140" cy="90" r="4" fill="white" className="svg-pulse" />
                     </svg>
                  </div>
                  {/* Decorative Elements */}
                  <div className="glass-panel" style={{ position: 'absolute', bottom: '20px', left: '-20px', padding: '16px', zIndex: 2 }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <TrendingUp size={20} color="var(--accent-primary)" />
                        </div>
                        <div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Performance</div>
                          <div style={{ fontWeight: 'bold' }}>+300% Sichtbarkeit</div>
                        </div>
                     </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="leistungen" className="section-padding" style={{ background: 'var(--bg-services)', position: 'relative' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '80px' }}>
              <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem' }}>Unsere Expertise</span>
              <h2 className="section-title">Rundum-Sorglos-Paket für <br/><span className="text-gradient">Ihre Sichtbarkeit</span></h2>
              <p className="section-subtitle" style={{ margin: '0 auto' }}>Von der Leuchtreklame über der Tür bis zur Website auf dem Smartphone. Wir bieten alles aus einer Hand.</p>
            </div>

            <div className="grid-cols-3">
              <ServiceCard icon={<Monitor size={32} />} title="Schilder & Reklame" desc="Auffällige Leuchtschilder, 3D-Buchstaben und Firmenschilder, die Kunden schon von weitem anziehen." />
              <ServiceCard icon={<Layout size={32} />} title="Webdesign" desc="Hochmoderne, Conversion-optimierte Websites, die nicht nur extrem gut aussehen, sondern auch verkaufen." />
              <ServiceCard icon={<Printer size={32} />} title="Visitenkarten & Flyer" desc="Premium Printprodukte, die einen bleibenden, haptischen Eindruck bei Ihren Kunden hinterlassen." />
              <ServiceCard icon={<TrendingUp size={32} />} title="SEO & Sichtbarkeit" desc="Top-Platzierungen bei Google, damit Sie genau dann gefunden werden, wenn Kunden nach Ihnen suchen." />
              <ServiceCard icon={<Palette size={32} />} title="Logo & Branding" desc="Einzigartige Markenidentitäten, die Vertrauen schaffen und Ihre Unternehmenswerte perfekt kommunizieren." />
              <ServiceCard icon={<ImageIcon size={32} />} title="Wanddekoration" desc="Individuelle Raumgestaltung mit Acryl, Moos oder Neon, die Ihr Geschäft auch innen unverwechselbar macht." />
            </div>
          </div>
        </section>

        {/* Transformation Section */}
        <section className="section-padding">
          <div className="container">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '80px' }}>
              <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem' }}>Der Unterschied</span>
              <h2 className="section-title">Vom unsichtbaren Geschäft <br/><span className="text-gradient">zum lokalen Magneten</span></h2>
              <p className="section-subtitle" style={{ margin: '0 auto' }}>Der erste Eindruck zählt. Sehen Sie, wie wir die Präsenz unserer Kunden revolutionieren.</p>
            </div>
            
            <div className="glass-panel" style={{ padding: '24px', position: 'relative', zIndex: 2 }}>
              <div style={{ width: '100%', height: '500px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
                <img src={lokmaNachher} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} alt="Nachher" />
                <div style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%' }}>
                  <span style={{ position: 'absolute', bottom: '24px', right: '24px', background: 'var(--accent-primary)', color: 'white', padding: '6px 16px', borderRadius: '50px', zIndex: 10, fontWeight: 'bold', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>Nachher (Mit LED)</span>
                </div>

                <div style={{ position: 'absolute', top: 0, left: 0, width: '50%', height: '100%', overflow: 'hidden', borderRight: '2px solid var(--accent-primary)', zIndex: 2 }}>
                  <img src={lokmaVorher} style={{ width: '200%', height: '100%', objectFit: 'cover', maxWidth: 'none' }} alt="Vorher" />
                  <span style={{ position: 'absolute', bottom: '24px', left: '24px', background: 'rgba(0,0,0,0.8)', color: 'white', padding: '6px 16px', borderRadius: '50px', fontWeight: 'bold', backdropFilter: 'blur(4px)' }}>Vorher (Ohne LED)</span>
                </div>

                <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '48px', height: '48px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3, boxShadow: '0 0 20px rgba(0,0,0,0.4)', cursor: 'ew-resize' }}>
                  <div style={{ width: '2px', height: '24px', background: 'var(--bg-main)', borderRadius: '2px' }}></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="section-padding" style={{ background: 'var(--bg-trust)' }}>
          <div className="container">
            <div className="grid-cols-2" style={{ alignItems: 'center', gap: '80px' }}>
              <div>
                <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem' }}>Warum Wir?</span>
                <h2 className="section-title" style={{ fontSize: '3rem', marginTop: '16px' }}>Wir bauen <span className="text-gradient">Ihre Marke</span> auf.</h2>
                <p className="section-subtitle" style={{ marginBottom: '40px' }}>
                  Von der Außenreklame bis zur fertigen Website. Ein Ansprechpartner für das gesamte Erscheinungsbild Ihres Unternehmens.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                  <TrustItem title="Premium-Materialien" desc="Nur die hochwertigsten Acrylgläser, Metalle und LEDs, die jahrelang halten." />
                  <TrustItem title="Individuelles Design" desc="Speziell auf Ihre Markenidentität zugeschnitten, niemals von der Stange." />
                  <TrustItem title="Moderne Sichtbarkeit" desc="Modernste Webtechnologie kombiniert mit markanter physischer Präsenz." />
                  <TrustItem title="Komplettservice" desc="Vom Konzept über die Installation bis zum Launch übernehmen wir alles." />
                </div>
              </div>
              <div style={{ position: 'relative' }}>
                 <div className="glass-panel" style={{ height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px', textAlign: 'center', flexDirection: 'column' }}>
                    <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'var(--accent-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px' }}>
                      <CheckCircle2 size={64} color="var(--accent-primary)" />
                    </div>
                    <h3 style={{ fontSize: '2rem', marginBottom: '16px' }}>100% Kundenzufriedenheit</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>Zahlreiche Restaurants, Kliniken und Agenturen vertrauen bereits auf unsere Expertise für ihren perfekten Auftritt.</p>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="section-padding">
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '80px' }}>
              <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem' }}>Referenzen</span>
              <h2 className="section-title">Ausgewählte <span className="text-gradient">Projekte</span></h2>
            </div>

            <div className="grid-cols-3">
              {[
                { img: cafeDeLokmaNeon, title: 'Cafe de Lokma', tag: 'LED-Reklame' },
                { img: wanddekoTeddy, title: 'Teddy Wand', tag: 'Wanddekoration' },
                { img: wcNeon, title: 'Restroom Neon', tag: 'LED-Reklame' },
                { img: seebarSchild2, title: 'Cafe & See Bar (Nacht)', tag: 'Außenwerbung' },
                { img: seebarSchild, title: 'Cafe & See Bar (Tag)', tag: 'Firmenschild' },
                { img: '/hero-bg.png', title: 'Ihre Marke', tag: 'Webdesign & Mehr' }
              ].map((project, i) => (
                <div key={i} className="glass-card" style={{ height: '350px', display: 'flex', alignItems: 'flex-end', padding: '30px', position: 'relative', overflow: 'hidden' }}>
                  <img src={project.img} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0, transition: 'transform 0.5s ease' }} alt={project.title} onMouseOver={e => e.target.style.transform = 'scale(1.05)'} onMouseOut={e => e.target.style.transform = 'scale(1)'} />
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 60%)', zIndex: 1 }}></div>
                  <div style={{ position: 'relative', zIndex: 2, width: '100%' }}>
                    <span style={{ background: 'var(--accent-primary)', color: 'white', padding: '6px 14px', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '12px', display: 'inline-block', textTransform: 'uppercase', letterSpacing: '1px' }}>{project.tag}</span>
                    <h3 style={{ fontSize: '1.75rem', margin: 0, color: 'white' }}>{project.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="kontakt" className="section-padding" style={{ background: 'var(--bg-cta)' }}>
          <div className="container">
            <div className="glass-panel" style={{ padding: '80px 40px', textAlign: 'center', background: 'var(--bg-gradient-soft)' }}>
              <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', marginBottom: '24px' }}>Bereit für den <span className="text-gradient">nächsten Schritt?</span></h2>
              <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '48px', maxWidth: '600px', margin: '0 auto 48px auto' }}>
                Erzählen Sie uns von Ihrem Projekt. Wir erstellen Ihnen ein unverbindliches Angebot für Ihre neue Premium-Präsenz.
              </p>
              <button className="btn-primary" style={{ padding: '20px 40px', fontSize: '1.1rem' }} onClick={() => setIsConfiguratorOpen(true)}>
                Projekt starten <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer style={{ background: 'var(--footer-bg)', padding: '80px 0 40px 0', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="grid-cols-4" style={{ marginBottom: '60px' }}>
            <div style={{ gridColumn: 'span 2' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <div style={{ width: '32px', height: '32px', background: 'var(--accent-primary)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Zap size={16} color="white" />
                </div>
                <span style={{ fontSize: '1.5rem', fontWeight: '800' }}>Skyline Vision</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', marginBottom: '32px', lineHeight: '1.6' }}>
                Ihre Premium-Agentur für maßgeschneiderte Schilder, Leuchtreklamen, Webdesign und Corporate Identity.
              </p>
            </div>
            <div>
              <h4 style={{ marginBottom: '24px', fontSize: '1.2rem' }}>Leistungen</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = 'var(--accent-primary)'} onMouseOut={e => e.target.style.color = 'var(--text-secondary)'}>Schilder & Reklame</a></li>
                <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = 'var(--accent-primary)'} onMouseOut={e => e.target.style.color = 'var(--text-secondary)'}>Webdesign</a></li>
                <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = 'var(--accent-primary)'} onMouseOut={e => e.target.style.color = 'var(--text-secondary)'}>SEO & Sichtbarkeit</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: '24px', fontSize: '1.2rem' }}>Kontakt</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}><Phone size={16} /> 0123 456789</li>
                <li style={{ color: 'var(--text-secondary)' }}>info@skyline-vision.de</li>
                <li style={{ color: 'var(--text-secondary)' }}>Musterstraße 123<br/>12345 Berlin</li>
              </ul>
            </div>
          </div>
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            <p>&copy; 2026 Skyline Vision. Alle Rechte vorbehalten.</p>
            <div style={{ display: 'flex', gap: '24px' }}>
              <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Impressum</a>
              <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Datenschutz</a>
            </div>
          </div>
        </div>
      </footer>

      {isConfiguratorOpen && (
        <Configurator onClose={() => setIsConfiguratorOpen(false)} />
      )}
    </div>
  );
}

export default App;
