import Link from 'next/link';

const bottlenecks = [
  {
    tag: 'Bottleneck 01',
    title: 'Broad, complex service mix',
    desc: 'Treatments spanned adults, pregnant women, infants, and post-surgery patients with vastly different questions and emotional states.',
  },
  {
    tag: 'Bottleneck 02',
    title: 'Self-qualification barrier',
    desc: 'Patients did not know which category they belonged to or whether their symptom required a specialist or general physiotherapy.',
  },
  {
    tag: 'Bottleneck 03',
    title: 'Buried practitioner trust',
    desc: 'Healthcare decisions depend heavily on personal empathy and clinician specialization, which were buried in long text paragraphs.',
  },
  {
    tag: 'Bottleneck 04',
    title: 'High-friction booking path',
    desc: 'Patients had to click through multiple tabs and read complex tables just to figure out how to schedule their first consultation.',
  },
];

const solutions = [
  {
    tag: 'Saiteo Solution 01',
    title: 'Need-based guided intake',
    desc: 'Organized navigation around real patient situations ("Sore back", "Postpartum", "Infant movement") instead of medical jargon.',
  },
  {
    tag: 'Saiteo Solution 02',
    title: 'Practitioner-first credibility',
    desc: 'Clear specialization badges, photos, and clinician focuses so visitors immediately find the right expert they feel comfortable with.',
  },
  {
    tag: 'Saiteo Solution 03',
    title: 'Dedicated patient pathways',
    desc: 'Focused landing experiences for women\'s health, pediatric development, and sports injury rehabilitation.',
  },
  {
    tag: 'Saiteo Solution 04',
    title: 'Instant consultation booking',
    desc: 'A visual time-slot selector and direct WhatsApp outreach option accessible from every key service page.',
  },
];

const outcomes = [
  {
    title: 'Clearer positioning',
    desc: 'Visitors understand what the practice specializes in within 5 seconds.',
  },
  {
    title: 'Patient-first navigation',
    desc: 'Services organized around real human needs rather than clinical codes.',
  },
  {
    title: 'Shorter booking path',
    desc: 'Frictionless step-by-step path from Google search to confirmed appointment.',
  },
];

export default function CaseStudy() {
  return (
    <main className="saiteo-case-study">
      {/* Top Header */}
      <header className="saiteo-header">
        <div className="saiteo-header-inner">
          <div className="saiteo-brand">
            <a href="https://saiteo.com" className="saiteo-logo" target="_blank" rel="noopener noreferrer">
              <span className="saiteo-wordmark">saiteo</span>
              <span className="saiteo-logo-dot"></span>
            </a>
            <span className="saiteo-slash">/</span>
            <span className="saiteo-pill-tag">Case Study</span>
          </div>

          <div className="saiteo-nav-actions">
            <a href="https://saiteo.com" className="saiteo-back-link" target="_blank" rel="noopener noreferrer">
              ← Back to Saiteo
            </a>
            <Link href="/" className="saiteo-demo-btn">
              Explore Live Practice Concept <span aria-hidden="true">→</span>
            </Link>
            <a href="https://saiteo.com/#contact" className="saiteo-cta-btn" target="_blank" rel="noopener noreferrer">
              Talk to us
            </a>
          </div>
        </div>
      </header>

      {/* Hero Chapter (Dark Navy Saiteo Theme) */}
      <section className="saiteo-hero-section">
        <div className="saiteo-glow saiteo-glow-teal" aria-hidden="true"></div>
        <div className="saiteo-glow saiteo-glow-blue" aria-hidden="true"></div>

        <div className="saiteo-container">
          <div className="saiteo-hero-eyebrow-row">
            <span className="saiteo-eyebrow">Healthcare · Physiotherapy</span>
            <div className="saiteo-badges">
              <span className="saiteo-concept-badge">INDEPENDENT CONCEPT</span>
              <span className="saiteo-concept-note">(Not a client project.)</span>
            </div>
          </div>

          <h1 className="saiteo-hero-title">
            A clearer digital front door for a growing physiotherapy practice.
          </h1>

          <p className="saiteo-hero-desc">
            A strategic website concept demonstrating how a practice with several patient groups and services can simplify service discovery, establish deep practitioner trust, and accelerate appointments.
          </p>

          <div className="saiteo-hero-actions">
            <Link href="/" className="saiteo-primary-cta">
              Explore live website concept <span aria-hidden="true">→</span>
            </Link>
            <a href="#breakdown" className="saiteo-secondary-cta">
              View Strategy Breakdown ↓
            </a>
          </div>

          {/* 3 Outcome Pillars */}
          <div className="saiteo-outcomes-grid">
            {outcomes.map((item, idx) => (
              <div key={idx} className="saiteo-outcome-card">
                <div className="saiteo-check-icon">✓</div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Breakdown Chapter (Light Surface) */}
      <section id="breakdown" className="saiteo-breakdown-section">
        <div className="saiteo-container">
          <div className="saiteo-section-intro">
            <p className="saiteo-section-eyebrow">The Strategy</p>
            <h2 className="saiteo-section-title">
              We don’t start with a template.<br />We start with the business problem.
            </h2>
            <p className="saiteo-section-desc">
              Patients seeking medical care are often anxious, in pain, or looking for specific reassurances. Here is how we restructured the digital experience.
            </p>
          </div>

          {/* Bottlenecks vs Solutions Grid */}
          <div className="saiteo-comparison-grid">
            {/* The Bottlenecks */}
            <div className="saiteo-col">
              <div className="saiteo-col-header">
                <span className="saiteo-col-badge error">The Bottlenecks</span>
                <h3>Where patients got lost</h3>
              </div>

              <div className="saiteo-cards-stack">
                {bottlenecks.map((item, idx) => (
                  <div key={idx} className="saiteo-card error-card">
                    <span className="saiteo-card-tag error">{item.tag}</span>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* The Saiteo Solutions */}
            <div className="saiteo-col">
              <div className="saiteo-col-header">
                <span className="saiteo-col-badge success">The Saiteo Fix</span>
                <h3>How we solved the friction</h3>
              </div>

              <div className="saiteo-cards-stack">
                {solutions.map((item, idx) => (
                  <div key={idx} className="saiteo-card success-card">
                    <span className="saiteo-card-tag success">{item.tag}</span>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Concept Showcase Chapter */}
      <section className="saiteo-showcase-section">
        <div className="saiteo-container">
          <div className="saiteo-showcase-header">
            <div>
              <p className="saiteo-section-eyebrow">The Delivered Concept</p>
              <h2 className="saiteo-section-title">Warm, credible & designed to convert.</h2>
            </div>
            <Link href="/" className="saiteo-primary-cta">
              Open Live Practice Demo <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="saiteo-mockups-layout">
            {/* Desktop Mockup */}
            <div className="saiteo-browser-frame">
              <div className="saiteo-browser-bar">
                <div className="saiteo-browser-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span className="saiteo-browser-url">kustiba-demo.lv · Desktop Concept</span>
                <span className="saiteo-browser-badge">Live Interactive</span>
              </div>
              <Link href="/" className="saiteo-mockup-wrapper" aria-label="Open live desktop concept">
                <img src="/images/mockup-desktop.png" alt="KUSTĪBA desktop homepage concept preview" />
                <div className="saiteo-mockup-hover">
                  <span className="saiteo-hover-btn">Open Live Concept Demo →</span>
                </div>
              </Link>
            </div>

            {/* Mobile Mockup */}
            <div className="saiteo-mobile-frame">
              <div className="saiteo-browser-bar">
                <div className="saiteo-browser-dots">
                  <span></span>
                </div>
                <span className="saiteo-browser-url">Mobile Layout</span>
              </div>
              <Link href="/" className="saiteo-mockup-wrapper" aria-label="Open live mobile concept">
                <img src="/images/mockup-mobile.png" alt="KUSTĪBA mobile homepage concept preview" />
                <div className="saiteo-mockup-hover">
                  <span className="saiteo-hover-btn">Open Mobile Demo →</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Conversion Chapter (Dark Navy Saiteo Theme) */}
      <section className="saiteo-conversion-section">
        <div className="saiteo-container">
          <div className="saiteo-conversion-box">
            <p className="saiteo-conversion-eyebrow">Next Steps</p>
            <h2 className="saiteo-conversion-title">
              Wonder what we’d change in your business?
            </h2>
            <p className="saiteo-conversion-desc">
              Send us your website. We’ll analyze the customer journey, identify where visitors get stuck, and show you where the biggest opportunities are.
            </p>

            <div className="saiteo-conversion-buttons">
              <a href="https://saiteo.com/#contact" className="saiteo-primary-cta accent-glow" target="_blank" rel="noopener noreferrer">
                Talk to us <span aria-hidden="true">→</span>
              </a>
              <a href="https://saiteo.com/#website-review" className="saiteo-ghost-link" target="_blank" rel="noopener noreferrer">
                Get a free website review <span aria-hidden="true">→</span>
              </a>
            </div>

            <p className="saiteo-disclaimer">
              © Saiteo · Independent concept study · Not an endorsed client project
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
