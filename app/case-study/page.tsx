import Link from 'next/link';

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
              ← Saiteo.com
            </a>
            <Link href="/" className="saiteo-demo-btn">
              Explore Live Practice Website →
            </Link>
            <a href="https://saiteo.com/#contact" className="saiteo-cta-btn" target="_blank" rel="noopener noreferrer">
              Talk to us
            </a>
          </div>
        </div>
      </header>

      {/* Editorial Hero Header */}
      <section className="saiteo-hero-section">
        <div className="saiteo-glow saiteo-glow-teal" aria-hidden="true"></div>
        <div className="saiteo-glow saiteo-glow-blue" aria-hidden="true"></div>

        <div className="saiteo-container">
          <div className="saiteo-hero-eyebrow-row">
            <span className="saiteo-eyebrow">Healthcare · Case Study</span>
            <div className="saiteo-badges">
              <span className="saiteo-concept-badge">INDEPENDENT CONCEPT</span>
              <span className="saiteo-concept-note">(Not a client project.)</span>
            </div>
          </div>

          <h1 className="saiteo-hero-title">
            A clearer digital front door for a growing physiotherapy practice.
          </h1>

          <p className="saiteo-hero-desc">
            How a specialized clinic with diverse patient groups—from acute spinal pain to postpartum recovery and infant handling—can turn search traffic into qualified, confident appointments.
          </p>

          <div className="saiteo-hero-actions">
            <Link href="/" className="saiteo-primary-cta">
              Explore Live Practice Website <span aria-hidden="true">→</span>
            </Link>
            <a href="#editorial-breakdown" className="saiteo-secondary-cta">
              Read Strategic Teardown ↓
            </a>
          </div>

          {/* Project Meta Facts Strip */}
          <div className="saiteo-meta-strip">
            <div>
              <p className="saiteo-meta-label">Industry</p>
              <p className="saiteo-meta-val">Private Healthcare & Therapy</p>
            </div>
            <div>
              <p className="saiteo-meta-label">Subject</p>
              <p className="saiteo-meta-val">KUSTĪBA Practice Concept</p>
            </div>
            <div>
              <p className="saiteo-meta-label">Key Challenge</p>
              <p className="saiteo-meta-val accent">Self-qualification & Trust</p>
            </div>
            <div>
              <p className="saiteo-meta-label">Deliverable</p>
              <p className="saiteo-meta-val">Full Interactive Web System</p>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative Section: The Real Healthcare Problem */}
      <section id="editorial-breakdown" className="saiteo-problem-section">
        <div className="saiteo-container">
          <div className="saiteo-narrative-layout">
            <div className="saiteo-narrative-intro">
              <p className="saiteo-section-eyebrow">01 · The Strategic Problem</p>
              <h2 className="saiteo-section-title">
                Patients don’t browse services.<br />They look for reassurance.
              </h2>
              <p className="saiteo-section-desc">
                When someone searches for a clinic, they are often in acute physical discomfort, anxious about a newborn’s motor development, or navigating bodily changes after pregnancy.
              </p>
              <div className="saiteo-quote-card">
                <p>
                  “Traditional clinic websites list dozens of medical procedures in a giant menu. The visitor is left guessing: ‘Is this for me, who will treat me, and what happens at the first visit?’”
                </p>
              </div>
            </div>

            <div className="saiteo-comparison-stack">
              <div className="saiteo-compare-box old-way">
                <h3>The Disconnected Clinic Experience (The Old Way)</h3>
                <ul>
                  <li>
                    <span className="icon-cross">✕</span>
                    <div><strong>Buried specialties:</strong> Women’s pelvic health and infant handling hidden behind generic "Rehabilitation" drop-downs.</div>
                  </li>
                  <li>
                    <span className="icon-cross">✕</span>
                    <div><strong>Anonymous practitioner profiles:</strong> No human faces or clinical focus areas, reducing patient trust.</div>
                  </li>
                  <li>
                    <span className="icon-cross">✕</span>
                    <div><strong>High-friction phone tag:</strong> No clear preview of available times or direct consultation entry.</div>
                  </li>
                </ul>
              </div>

              <div className="saiteo-compare-box new-way">
                <h3>The Saiteo Re-architecture (The Solution)</h3>
                <ul>
                  <li>
                    <span className="icon-check">✓</span>
                    <div><strong>Need-based self-qualification:</strong> Direct interactive tiles ("Sore back", "Postpartum health", "Infant movement") leading to dedicated pathways.</div>
                  </li>
                  <li>
                    <span className="icon-check">✓</span>
                    <div><strong>Clinician-first trust:</strong> Prominent specialist profiles with transparent clinical focus and 1-click appointment booking.</div>
                  </li>
                  <li>
                    <span className="icon-check">✓</span>
                    <div><strong>Frictionless intake:</strong> Visual time selector + instant WhatsApp outreach directly on every treatment page.</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative Section: 3 Concrete UX Interventions with Imagery */}
      <section className="saiteo-interventions-section">
        <div className="saiteo-container">
          <div className="saiteo-section-intro">
            <p className="saiteo-section-eyebrow">02 · The Design Decisions</p>
            <h2 className="saiteo-section-title">
              Three UX interventions that change conversion rates.
            </h2>
          </div>

          <div className="saiteo-interventions-list">
            {/* Intervention 01 */}
            <article className="saiteo-intervention-card">
              <div className="saiteo-intervention-text">
                <span className="saiteo-intervention-tag">Intervention 01</span>
                <h3>Guided Need Discovery ("Ar ko sākt?")</h3>
                <p>
                  Instead of forcing first-time patients to guess whether they need "kinesitherapy" or "manual therapy", we designed a 6-card guided intake that mirrors everyday human language.
                </p>
                <div className="saiteo-pill-group">
                  <span>Sore back & neck</span>
                  <span>Pregnancy & postpartum</span>
                  <span>Infant motor handling</span>
                </div>
              </div>
              <div className="saiteo-intervention-media">
                <img src="/images/service-rehab.jpg" alt="Rehabilitation therapy guided discovery" />
              </div>
            </article>

            {/* Intervention 02 */}
            <article className="saiteo-intervention-card reverse">
              <div className="saiteo-intervention-text">
                <span className="saiteo-intervention-tag">Intervention 02</span>
                <h3>Lead Practitioner Storytelling & Approach</h3>
                <p>
                  Patients book people, not brands. We elevated the lead clinician’s holistic philosophy—connecting postural habits with everyday movement—to build immediate authority and emotional comfort.
                </p>
                <div className="saiteo-intervention-footnote">
                  ✦ Verified credentials · Focus areas prominently tagged · Direct booking trigger
                </div>
              </div>
              <div className="saiteo-intervention-media">
                <img src="/images/practitioner-primary.jpg" alt="Lead physiotherapist Elīna Vītola profile" />
              </div>
            </article>

            {/* Intervention 03 */}
            <article className="saiteo-intervention-card">
              <div className="saiteo-intervention-text">
                <span className="saiteo-intervention-tag">Intervention 03</span>
                <h3>Visual Appointment Selection & Instant Chat</h3>
                <p>
                  Booking an initial consultation shouldn’t feel like filling out a tax form. We implemented a lightweight visual day/time selector paired with a direct WhatsApp consultation link.
                </p>
                <Link href="/" className="saiteo-demo-inline-btn">
                  Test interactive booking card in demo →
                </Link>
              </div>
              <div className="saiteo-intervention-media">
                <img src="/images/service-women.jpg" alt="Women's health and therapy session" />
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Live Showcase Chapter */}
      <section className="saiteo-showcase-section">
        <div className="saiteo-container">
          <div className="saiteo-showcase-header">
            <div>
              <p className="saiteo-section-eyebrow">03 · The Full Result</p>
              <h2 className="saiteo-section-title">Explore the complete live concept.</h2>
              <p className="saiteo-section-desc">Fully responsive, fast-loading, and crafted specifically for patient clarity.</p>
            </div>
            <Link href="/" className="saiteo-primary-cta">
              Open Live Practice Website <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="saiteo-browser-frame">
            <div className="saiteo-browser-bar">
              <div className="saiteo-browser-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span className="saiteo-browser-url">kustiba-demo.lv · Live Prototype</span>
              <span className="saiteo-browser-badge">100/100 Mobile Score</span>
            </div>
            <Link href="/" className="saiteo-mockup-wrapper" aria-label="Open live desktop concept">
              <img src="/images/mockup-desktop.png" alt="KUSTĪBA desktop homepage concept preview" />
              <div className="saiteo-mockup-hover">
                <span className="saiteo-hover-btn">Launch Interactive Demo →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom Conversion Section */}
      <section className="saiteo-conversion-section">
        <div className="saiteo-container">
          <div className="saiteo-conversion-box">
            <p className="saiteo-conversion-eyebrow">Next Steps</p>
            <h2 className="saiteo-conversion-title">
              Wonder what we’d change in your business customer journey?
            </h2>
            <p className="saiteo-conversion-desc">
              Send us your website URL. We’ll record a clear 5-minute video teardown showing where visitors get confused, where trust leaks occur, and how to simplify your booking path.
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
              © Saiteo · Independent strategic concept · Not an endorsed client project
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
