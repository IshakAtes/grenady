import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Check,
  ChevronDown,
  Menu,
  Monitor,
  MoveHorizontal,
  Pencil,
  X,
} from 'lucide-react';
import { siShopify, siShopware } from 'simple-icons';
import Configurator from './Configurator';
import transformationBefore from './assets/lokmaReklameVorherjpg.jpg';
import transformationAfter from './assets/lokmaReklameNachher.jpg';

const services = [
  {
    icon: Monitor,
    title: 'Websites & Onlineshops',
    text: 'Maßgeschneiderte Websites und Onlineshops mit Shopify oder Shopware - technisch stark, visuell klar und auf Conversion optimiert.',
  },
  {
    icon: BarChart3,
    title: 'SEO/SEA',
    text: 'Mehr Sichtbarkeit. Mehr qualifizierte Anfragen. Strategische SEO- und SEA-Kampagnen für nachhaltiges Wachstum.',
  },
  {
    icon: Pencil,
    title: 'Branding & Design',
    text: 'Marken, die wiedererkannt und erinnert werden. Von der Positionierung über das Logo bis zum durchgängigen Auftritt.',
  },
];

const projects = [
  { image: '/grenady/projects/portfolio-naturnah.png', label: 'Naturnah', category: 'E-Commerce · Branding' },
  { image: '/grenady/projects/portfolio-kantwerk.png', label: 'Kantwerk', category: 'Website · Strategie' },
  { image: '/grenady/projects/portfolio-casa-marea.png', label: 'Casa Marea', category: 'Webdesign · Hospitality' },
];

const serviceCatalog = [
  {
    number: '01',
    title: 'Web & Commerce',
    intro: 'Digitale Auftritte und Verkaufsplattformen, die klar aussehen, schnell funktionieren und mit dem Unternehmen wachsen.',
    items: [
      { title: 'Websites & Landingpages', text: 'Strategie, UX, Design und Entwicklung.' },
      { title: 'Relaunch & Optimierung', text: 'Bestehende Auftritte technisch und visuell verbessern.' },
      { title: 'Shopify & Shopware', text: 'Onlineshops, Relaunches und Conversion-Optimierung.' },
      { title: 'Service & Wartung', text: 'Laufende Betreuung, Updates und Weiterentwicklung.' },
      { title: 'Custom Apps & Tools', text: 'Portale und interne Anwendungen für individuelle Abläufe.' },
    ],
  },
  {
    number: '02',
    title: 'Marke & Wachstum',
    intro: 'Eine klare Marke und messbare Reichweite - von der Positionierung bis zur laufenden Kundengewinnung.',
    items: [
      { title: 'SEO, SEA, GEO & AI Search', text: 'Sichtbarkeit in Suche, Ads und KI-Antworten.' },
      { title: 'Logo & Branding', text: 'Positionierung und visuelle Identität.' },
      { title: 'Copywriting', text: 'Texte für Websites, Shops und Kampagnen.' },
      { title: 'Social Media Marketing', text: 'Strategie, Content und Kampagnen.' },
      { title: 'E-Mail-Marketing', text: 'Automationen, Newsletter und Kundenbindung.' },
      { title: 'Produktfotos & AI Visuals', text: 'Produktfotografie und KI-gestützter Content.' },
    ],
  },
  {
    number: '03',
    title: 'KI & Systeme',
    intro: 'Individuelle Software, intelligente Automationen und robuste Schnittstellen für effizientere Unternehmen.',
    items: [
      { title: 'KI-Automatisierung & n8n', text: 'Workflows, Agenten und automatisierte Prozesse.' },
      { title: 'Chatbots & KI-Assistenten', text: 'Private Assistenten und individuelle Wissenssysteme.' },
      { title: 'Custom Software', text: 'Maßgeschneiderte Systeme für spezielle Anforderungen.' },
      { title: 'APIs, TYPO3 & Symfony', text: 'Schnittstellen und robuste Backends.' },
      { title: 'Consulting & Digitalstrategie', text: 'Technische Beratung von der Idee bis zur Umsetzung.' },
      { title: 'LED-Schilder & Montage', text: 'Physische Sichtbarkeit inklusive Design und Montage.' },
    ],
  },
];

function GrenadyMark() {
  return (
    <svg className="grenady-mark" viewBox="0 0 42 42" aria-hidden="true">
      <path d="M31 10.5 21 5 7.5 12.5v17L21 37l13.5-7.5v-9H21v6h7.5" />
    </svg>
  );
}

function BrandIcon({ icon }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={icon.path} />
    </svg>
  );
}

function Brand() {
  return (
    <a className="brand" href="#top" aria-label="Grenady Startseite">
      <GrenadyMark />
      <span>Grenady</span>
    </a>
  );
}

function BeforeAfterComparison() {
  const [position, setPosition] = useState(53);

  return (
    <div className="comparison" style={{ '--comparison-position': `${position}%` }}>
      <img className="comparison-before" src={transformationBefore} alt="Unternehmensauftritt vor der Transformation" />
      <div className="comparison-after"><img src={transformationAfter} alt="Unternehmensauftritt nach der Transformation" /></div>
      <span className="comparison-label label-before">Vorher</span>
      <span className="comparison-label label-after">Nachher</span>
      <div className="comparison-divider"><span><MoveHorizontal size={19} /></span></div>
      <input
        type="range"
        min="12"
        max="88"
        value={position}
        onChange={(event) => setPosition(event.target.value)}
        aria-label="Vorher-Nachher-Vergleich"
      />
    </div>
  );
}

const legalPages = {
  impressum: {
    title: 'Impressum',
    eyebrow: 'Rechtliches',
    sections: [
      ['Angaben gemäß § 5 DDG', 'Grenady Web Agency\nDie vollständigen Unternehmens- und Adressdaten werden vor der Veröffentlichung ergänzt.'],
      ['Kontakt', 'E-Mail: kontakt@grenady.de'],
      ['Verantwortlich für den Inhalt', 'Verantwortliche Person und ladungsfähige Anschrift werden vor der Veröffentlichung ergänzt.'],
      ['Hinweis', 'Diese Seite ist bereits technisch vorbereitet. Bitte ergänzen Sie vor dem Livegang die vollständigen Pflichtangaben Ihres Unternehmens.'],
    ],
  },
  datenschutz: {
    title: 'Datenschutz',
    eyebrow: 'Ihre Daten',
    sections: [
      ['Datenschutz auf einen Blick', 'Wir behandeln personenbezogene Daten vertraulich und ausschließlich im Rahmen der geltenden Datenschutzvorschriften.'],
      ['Projektanfragen', 'Die im Konfigurator eingegebenen Daten dienen ausschließlich der Bearbeitung Ihrer Anfrage. Aktuell werden keine Dateien über die Website hochgeladen.'],
      ['WhatsApp', 'Wenn Sie den WhatsApp-Link nutzen, verlassen Sie diese Website. Für die Verarbeitung durch WhatsApp gelten die Datenschutzbestimmungen des jeweiligen Anbieters.'],
      ['Ihre Rechte', 'Sie haben insbesondere das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung und Datenübertragbarkeit. Die vollständigen Angaben zum Verantwortlichen und zu eingesetzten Diensten werden vor dem Livegang ergänzt.'],
    ],
  },
};

function LegalPage({ type }) {
  const page = legalPages[type];
  return (
    <div className="legal-page">
      <nav className="site-nav"><div className="nav-inner legal-nav"><Brand /><a className="legal-back" href="/grenady/"><ArrowLeft size={17} /> Zurück zur Startseite</a></div></nav>
      <main className="legal-main">
        <header className="legal-hero"><span>{page.eyebrow}</span><h1>{page.title}</h1><p>Transparent, verständlich und im Grenady Design.</p></header>
        <div className="legal-content">
          {page.sections.map(([title, text]) => <section key={title}><h2>{title}</h2><p>{text}</p></section>)}
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div><Brand /><p>Websites, SEO und digitale Systeme für Unternehmen, die messbar wachsen.</p></div>
        <div className="footer-links"><span>Rechtliches</span><a href="/grenady/impressum">Impressum</a><a href="/grenady/datenschutz">Datenschutz</a></div>
        <div className="footer-links"><span>Navigation</span><a href="/grenady/#services">Leistungen</a><a href="/grenady/#projects">Projekte</a></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Grenady</span><span>Web Agency für digitale Sichtbarkeit</span></div>
    </footer>
  );
}

function App() {
  const [isConfiguratorOpen, setIsConfiguratorOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeServiceGroup, setActiveServiceGroup] = useState(0);

  const openConfigurator = () => {
    setIsConfiguratorOpen(true);
    setIsMenuOpen(false);
  };

  const legalType = window.location.pathname.endsWith('/impressum')
    ? 'impressum'
    : window.location.pathname.endsWith('/datenschutz')
      ? 'datenschutz'
      : null;

  if (legalType) return <LegalPage type={legalType} />;

  return (
    <div className="app-shell">
      <nav className="site-nav">
        <div className="nav-inner">
          <Brand />

          <div className="nav-links">
            <a href="#all-services">Leistungen <ChevronDown size={14} /></a>
            <a href="#projects">Projekte</a>
            <a href="#about">Über uns</a>
            <a href="#knowledge">Wissen</a>
            <a href="#careers">Careers</a>
          </div>

          <div className="nav-actions">
            <button className="button button-small" onClick={openConfigurator}>Projekt starten</button>
            <button className="menu-button" onClick={() => setIsMenuOpen((open) => !open)} aria-label="Menü öffnen">
              {isMenuOpen ? <X size={23} /> : <Menu size={23} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="mobile-menu">
            <a href="#all-services" onClick={() => setIsMenuOpen(false)}>Leistungen</a>
            <a href="#projects" onClick={() => setIsMenuOpen(false)}>Projekte</a>
            <a href="#about" onClick={() => setIsMenuOpen(false)}>Über uns</a>
            <a href="#knowledge" onClick={() => setIsMenuOpen(false)}>Wissen</a>
            <button className="button" onClick={openConfigurator}>Projekt starten</button>
          </div>
        )}
      </nav>

      <main id="top">
        <section className="hero">
          <div className="hero-inner">
            <div className="hero-copy">
              <h1>
                <span className="hero-line">Websites,</span>
                <span className="hero-line"><em>SEO <span className="hero-ampersand">&amp;</span> digitale</em> Systeme</span>
              </h1>
              <p>Grenady ist deine Webagentur für Websites, SEO/SEA,<br className="desktop-break" /> Branding und digitale Systeme, die messbar wachsen.</p>
              <button className="button hero-button" onClick={openConfigurator}>
                Projekt starten <ArrowRight size={20} />
              </button>

              <div className="partner-row" aria-label="Technologiepartner">
                <span className="partner shopify"><BrandIcon icon={siShopify} /><b>shopify</b></span>
                <span className="partner shopware"><BrandIcon icon={siShopware} /><b>shopware</b></span>
                <span className="partner google"><span className="google-mark"><i /><i /><i /><i /></span><b>Google <em>Partner</em></b></span>
              </div>
            </div>

          </div>

          <div className="hero-art" aria-hidden="true">
            <picture>
              <source media="(max-width: 1100px)" srcSet="/grenady/hero-laptop-platform-narrow.png" />
              <img src="/grenady/hero-laptop-platform-fullwidth.png" alt="" />
            </picture>
          </div>

          <div id="services" className="service-grid">
            {services.map(({ icon: Icon, title, text }) => (
              <article className="service-card" key={title}>
                <Icon className="service-icon" size={42} strokeWidth={1.8} />
                <div>
                  <h2>{title}</h2>
                  <p>{text}</p>
                  <a href="#all-services">Mehr erfahren <ArrowRight size={16} /></a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="projects-section">
          <div className="projects-inner">
            <div className="projects-heading">
              <span>Projekte</span>
              <h2>Digitale Lösungen,<br />die Ergebnisse liefern.</h2>
            </div>
            <div className="project-rail">
              {projects.map((project) => (
                <article className="project-card" key={project.label}>
                  <img src={project.image} alt={`${project.label} Projektvorschau`} />
                  <div className="project-meta">
                    <span>{project.category}</span>
                    <strong>{project.label}</strong>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="all-services" className="service-catalog-section">
          <div className="service-catalog-inner">
            <header className="catalog-heading">
              <span>Leistungen</span>
              <h2>Eine Agentur.<br />Alle Hebel für Wachstum.</h2>
              <p>Von der ersten Idee bis zum laufenden Betrieb verbinden wir Strategie, Gestaltung, Technologie und Vermarktung.</p>
              <button className="catalog-cta" onClick={openConfigurator}>Projekt besprechen <ArrowRight size={17} /></button>
            </header>

            <div className="catalog-tabs" role="tablist" aria-label="Leistungskategorien">
              {serviceCatalog.map((group, index) => (
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeServiceGroup === index}
                  aria-controls="catalog-panel"
                  className={activeServiceGroup === index ? 'is-active' : ''}
                  onClick={() => setActiveServiceGroup(index)}
                  key={group.title}
                >
                  <span>{group.number}</span>{group.title}
                </button>
              ))}
            </div>

            <section id="catalog-panel" className="catalog-panel" role="tabpanel">
              <div className="catalog-panel-intro">
                <span>{serviceCatalog[activeServiceGroup].number}</span>
                <h3>{serviceCatalog[activeServiceGroup].title}</h3>
                <p>{serviceCatalog[activeServiceGroup].intro}</p>
              </div>
              <div className="catalog-items">
                {serviceCatalog[activeServiceGroup].items.map(({ title, text }, index) => (
                  <article className="catalog-item" key={title}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <div><h4>{title}</h4><p>{text}</p></div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </section>

        <section id="about" className="intro-section">
          <span>Grenady</span>
          <h2>Strategie, Design und Technologie aus einer Hand.</h2>
          <p>Wir entwickeln digitale Auftritte und Systeme, die Marken schärfen, Prozesse vereinfachen und Wachstum messbar machen.</p>
        </section>

        <section className="transformation-section">
          <div className="transformation-inner">
            <div className="transformation-copy">
              <span>Vorher. Nachher. Grenady.</span>
              <h2>Die Transformation</h2>
              <p>Erleben Sie, wie wir unsichtbare Unternehmen in lokale Wahrzeichen und digitale Autoritäten verwandeln. Unser kombinierter Ansatz garantiert, dass Kunden Sie finden, Ihnen vertrauen und sich für Sie entscheiden.</p>
              <ul>
                {[
                  'Bis zu 40% mehr Laufkundschaft',
                  'Höhere digitale Konversionsraten',
                  'Premium-Markenwahrnehmung',
                  'Einheitliche Offline- und Online-Identität',
                ].map((item) => <li key={item}><Check size={17} /> {item}</li>)}
              </ul>
            </div>
            <BeforeAfterComparison />
          </div>
        </section>

        <section className="closing-cta">
          <div className="closing-cta-inner">
            <span>Bereit für den nächsten Schritt?</span>
            <h2>Machen Sie Ihr Unternehmen<br /><em>unübersehbar.</em></h2>
            <p>Verlieren Sie keine Kunden mehr an Konkurrenten, die einfach besser aussehen. Verbessern Sie noch heute Ihre Sichtbarkeit.</p>
            <button className="button" onClick={openConfigurator}>Jetzt Projekt starten <ArrowRight size={19} /></button>
          </div>
        </section>

        <section id="knowledge" className="sr-only" aria-label="Wissen" />
        <section id="careers" className="sr-only" aria-label="Careers" />
      </main>

      <Footer />

      {isConfiguratorOpen && <Configurator onClose={() => setIsConfiguratorOpen(false)} />}
    </div>
  );
}

export default App;
