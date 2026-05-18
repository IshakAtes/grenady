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
import heroBg from './assets/hero-bg.png';

function App() {
  const [isConfiguratorOpen, setIsConfiguratorOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="app-container">
      <div className="ambient-glow" style={{ top: '-10%', left: '-10%' }}></div>

      {/* Navbar */}
      <nav style={navStyle}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '80px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', background: 'var(--accent-primary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={24} color="white" />
            </div>
            <span style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '1px' }}>SKYLINE VISION</span>
          </div>

          <div className="desktop-menu" style={desktopMenu}>
            <a href="#services" style={navLink}>Leistungen</a>
            <a href="#portfolio" style={navLink}>Referenzen</a>
            <a href="#trust" style={navLink}>Warum Wir</a>
            <button onClick={toggleTheme} style={themeBtnStyle}>
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="btn-primary" onClick={() => setIsConfiguratorOpen(true)}>Projekt starten</button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }} className="mobile-menu-wrapper">
            <button onClick={toggleTheme} style={{ ...themeBtnStyle, display: 'block' }} className="mobile-only-btn">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} style={mobileMenuBtn}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="section-padding" style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        backgroundImage: `var(--hero-gradient), url('${heroBg}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center right',
        backgroundRepeat: 'no-repeat',
        borderBottom: '1px solid var(--border-color)',
        paddingTop: '80px'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '800px' }}>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', marginBottom: '16px', letterSpacing: '-1px' }}
            >
              Sichtbar – <span className="text-gradient">offline & online.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ fontSize: '1.3rem', color: 'var(--text-secondary)', marginBottom: '32px', maxWidth: '600px' }}
            >
              Von Schildern über Webdesign bis SEO – wir sorgen dafür, dass Kunden Sie sehen und wählen.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '40px' }}
            >
              {['Website', 'Schilder & Reklame', 'Visitenkarten', 'SEO', 'Logo', 'Wanddekoration'].map((tag, i) => (
                <span key={i} style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  padding: '8px 18px',
                  borderRadius: '30px',
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  color: 'var(--text-primary)',
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                }}>
                  {tag}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}
            >
              <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem', padding: '16px 32px' }} onClick={() => setIsConfiguratorOpen(true)}>
                Projekt starten <ArrowRight size={20} />
              </button>
              <a href="#portfolio" className="btn-secondary" style={{ display: 'flex', alignItems: 'center', fontSize: '1.1rem', padding: '16px 32px' }}>
                Projekte ansehen
              </a>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Services Overview */}
      <section id="services" className="section-padding" style={{ background: 'var(--bg-services)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '16px' }}>Unsere <span className="text-accent">Leistungen</span></h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
              Umfassende Sichtbarkeitslösungen für Wachstum und Markenpräsenz.
            </p>
          </div>

          <div className="grid-cols-3">
            <ServiceCard
              icon={<Monitor size={32} />}
              title="Schilder & Reklame"
              desc="Hochwertige physische Schilder und Leuchtreklame für maximale lokale Sichtbarkeit."
            />
            <ServiceCard
              icon={<Layout size={32} />}
              title="Webdesign"
              desc="Konversionsstarke, digitale Premium-Erlebnisse, die verkaufen und überzeugen."
              highlight
            />
            <ServiceCard
              icon={<Printer size={32} />}
              title="Visitenkarten & Flyer"
              desc="Haptisches Marketingmaterial in Premium-Qualität für einen bleibenden Eindruck."
            />
            <ServiceCard
              icon={<TrendingUp size={32} />}
              title="SEO & Sichtbarkeit"
              desc="Dominieren Sie die lokalen Suchergebnisse und werden Sie von neuen Kunden gefunden."
            />
            <ServiceCard
              icon={<Palette size={32} />}
              title="Logo & Branding"
              desc="Einzigartige Markenidentitäten, die Vertrauen schaffen und im Gedächtnis bleiben."
            />
            <ServiceCard
              icon={<ImageIcon size={32} />}
              title="Wanddekoration"
              desc="Eindrucksvolle Gestaltung Ihrer Geschäftsräume, die Ihre Marke erlebbar macht."
            />
          </div>
        </div>
      </section>

      {/* Before / After Section */}
      <section className="section-padding">
        <div className="container">
          <div className="grid-cols-2" style={{ alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '3rem', marginBottom: '24px' }}>Die <span className="text-gradient">Transformation</span></h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '32px' }}>
                Erleben Sie, wie wir unsichtbare Unternehmen in lokale Wahrzeichen und digitale Autoritäten verwandeln. Unser kombinierter Ansatz garantiert, dass Kunden Sie finden, Ihnen vertrauen und sich für Sie entscheiden.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
                {['Bis zu 40% mehr Laufkundschaft', 'Höhere digitale Konversionsraten', 'Premium-Markenwahrnehmung', 'Einheitliche Offline- und Online-Identität'].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.1rem' }}>
                    <CheckCircle2 size={20} className="text-accent" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ position: 'relative' }}>
              <div className="glass-panel" style={{ padding: '8px', position: 'relative', zIndex: 2 }}>
                {/* Placeholder for Before/After Image */}
                <div style={{ width: '100%', height: '400px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
                  <img src={lokmaNachher} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '114%', objectFit: 'cover' }} alt="Nachher" />
                  <div style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%' }}>
                    <span style={{ position: 'absolute', bottom: '20px', right: '20px', background: 'var(--accent-primary)', color: 'white', padding: '4px 12px', borderRadius: '4px', zIndex: 10 }}>Nachher</span>
                  </div>

                  <div style={{ position: 'absolute', top: -32, left: 0, width: '50%', height: '108%', overflow: 'hidden', borderRight: '2px solid var(--accent-primary)', zIndex: 2 }}>
                    <img src={lokmaVorher} style={{ width: '200%', height: '100%', objectFit: 'cover', maxWidth: 'none' }} alt="Vorher" />
                    <span style={{ position: 'absolute', bottom: '20px', left: '20px', background: 'rgba(0,0,0,0.6)', color: 'white', padding: '4px 12px', borderRadius: '4px' }}>Vorher</span>
                  </div>

                  <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '40px', height: '40px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3, boxShadow: '0 0 10px rgba(0,0,0,0.5)' }}>
                    <div style={{ width: '2px', height: '20px', background: '#050505' }}></div>
                  </div>
                </div>
              </div>
              <div className="ambient-glow" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '80%' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section id="trust" className="section-padding" style={{ background: 'var(--bg-trust)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '16px' }}>Warum <span className="text-accent">Skyline Vision</span></h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
              Wir bauen nicht nur Schilder oder Websites; wir entwickeln Sichtbarkeitssysteme.
            </p>
          </div>

          <div className="grid-cols-4">
            <TrustItem title="Premium-Materialien" desc="Nur die hochwertigsten Acrylgläser, Metalle und LEDs, die jahrelang halten." />
            <TrustItem title="Individuelles Design" desc="Speziell auf Ihre Markenidentität zugeschnitten, niemals von der Stange." />
            <TrustItem title="Moderne Sichtbarkeit" desc="Modernste Webtechnologie kombiniert mit markanter physischer Präsenz." />
            <TrustItem title="Komplettservice" desc="Vom Konzept über die Installation bis zum Launch übernehmen wir alles." />
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="section-padding">
        <div className="container">
          <h2 style={{ fontSize: '3rem', marginBottom: '40px' }}>Ausgewählte <span className="text-gradient">Projekte</span></h2>

          <div className="grid-cols-3">
            {[
              { img: cafeDeLokmaNeon, title: 'Cafe de Lokma', tag: 'LED-Reklame' },
              { img: wanddekoTeddy, title: 'Teddy Wand', tag: 'Wanddekoration' },
              { img: wcNeon, title: 'Restroom Neon', tag: 'LED-Reklame' },
              { img: seebarSchild2, title: 'Cafe & See Bar (Nacht)', tag: 'Außenwerbung' },
              { img: seebarSchild, title: 'Cafe & See Bar (Tag)', tag: 'Firmenschild' },
              { img: heroBg, title: 'Ihre Marke', tag: 'Webdesign & Mehr' }
            ].map((project, i) => (
              <div key={i} className="glass-card" style={{ height: '300px', display: 'flex', alignItems: 'flex-end', padding: '20px', position: 'relative', overflow: 'hidden' }}>
                <img src={project.img} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} alt={project.title} />
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 60%)', zIndex: 1 }}></div>
                <div style={{ position: 'relative', zIndex: 2, width: '100%' }}>
                  <span style={{ background: 'var(--accent-primary)', color: 'white', padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '8px', display: 'inline-block' }}>{project.tag}</span>
                  <h3 style={{ fontSize: '1.5rem', margin: 0, color: 'white' }}>{project.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding" style={{ textAlign: 'center', position: 'relative' }}>
        <div className="ambient-glow" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}></div>
        <div className="container">
          <div className="glass-panel" style={{ padding: '80px 40px', maxWidth: '800px', margin: '0 auto', background: 'var(--bg-cta)' }}>
            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '24px' }}>Machen Sie Ihr Unternehmen <br /><span className="text-accent-glow">unübersehbar.</span></h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '40px' }}>
              Verlieren Sie keine Kunden mehr an Konkurrenten, die einfach besser aussehen. Verbessern Sie noch heute Ihre Sichtbarkeit.
            </p>
            <button className="btn-primary" style={{ fontSize: '1.2rem', padding: '16px 40px' }} onClick={() => setIsConfiguratorOpen(true)}>
              Jetzt Projekt starten
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border-color)', padding: '40px 0', background: 'var(--footer-bg)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Zap size={20} className="text-accent" />
              <span style={{ fontSize: '1.2rem', fontWeight: '800' }}>SKYLINE VISION</span>
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              &copy; {new Date().getFullYear()} Skyline Vision. Premium Schilder & Webdesign.
            </div>
          </div>
        </div>
      </footer>

      {/* Configurator Overlay */}
      {isConfiguratorOpen && (
        <Configurator onClose={() => setIsConfiguratorOpen(false)} />
      )}
    </div>
  );
}

// Sub-components
const ServiceCard = ({ icon, title, desc, highlight }) => (
  <div className={`glass-card`} style={{ padding: '30px', border: highlight ? '1px solid var(--border-accent)' : undefined, background: highlight ? 'rgba(255,123,0,0.05)' : undefined }}>
    <div style={{ color: highlight ? 'var(--accent-primary)' : 'var(--text-primary)', marginBottom: '20px' }}>
      {icon}
    </div>
    <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>{title}</h3>
    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{desc}</p>
  </div>
);

const TrustItem = ({ title, desc }) => (
  <div style={{ padding: '20px', borderLeft: '2px solid var(--border-color)' }}>
    <h4 style={{ fontSize: '1.2rem', marginBottom: '12px' }}>{title}</h4>
    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{desc}</p>
  </div>
);

// Styles
const navStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  zIndex: 100,
  background: 'var(--nav-bg)',
  backdropFilter: 'blur(12px)',
  borderBottom: '1px solid var(--border-color)'
};

const desktopMenu = {
  display: 'flex',
  alignItems: 'center',
  gap: '30px',
  '@media (maxWidth: 768px)': {
    display: 'none'
  }
};

const navLink = {
  color: 'var(--text-secondary)',
  fontWeight: '500',
  transition: 'color 0.3s ease',
  cursor: 'pointer'
};

const themeBtnStyle = {
  background: 'transparent',
  border: 'none',
  color: 'var(--text-primary)',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '8px',
  borderRadius: '50%',
  transition: 'background 0.3s ease'
};

const mobileMenuBtn = {
  background: 'transparent',
  color: 'var(--text-primary)',
  border: 'none',
  display: 'none',
  '@media (maxWidth: 768px)': {
    display: 'block'
  }
};

export default App;
