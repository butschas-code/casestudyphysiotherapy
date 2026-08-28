import Link from 'next/link';

const challenge = [
  'Broad service mix across adults, women, babies and children',
  'Different patient groups with different levels of urgency and confidence',
  'Unclear path from symptom to the right service',
  'Trust depends heavily on practitioner positioning',
  'Booking must feel simple and low-friction',
];

const approach = [
  'Patient-need-based navigation',
  'Clearer practitioner positioning',
  'Stronger women, children and rehabilitation pathways',
  'Simplified booking flow',
  'Warmer, more distinctive visual identity',
];

export default function CaseStudy() {
  return (
    <main className="case-study-page">
      <header className="case-header">
        <Link href="/" className="case-logo">Saiteo × KUSTĪBA</Link>
        <a href="https://saiteo.com" className="button primary">Talk to Saiteo</a>
      </header>

      <section className="case-hero">
        <p className="eyebrow">Website concept</p>
        <h1>A clearer digital front door for a growing physiotherapy practice</h1>
        <p>Independent concept by Saiteo — not a client project.</p>
      </section>

      <section className="case-section">
        <div>
          <p className="eyebrow">The challenge</p>
          <h2>Expertise was broad. The path for patients needed to feel simpler.</h2>
        </div>
        <ul>
          {challenge.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="case-section">
        <div>
          <p className="eyebrow">Our approach</p>
          <h2>Make the first decision about the patient’s situation, not the service menu.</h2>
        </div>
        <ul>
          {approach.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="case-concept">
        <p className="eyebrow">The concept</p>
        <h2>Warm, credible and easier to act on.</h2>
        <div>
          <figure>
            <img src="/images/mockup-desktop.png" alt="KUSTĪBA desktop homepage concept preview" />
          </figure>
          <figure>
            <img src="/images/mockup-mobile.png" alt="KUSTĪBA mobile homepage concept preview" />
          </figure>
        </div>
      </section>

      <section className="case-result">
        <p>From “What service do I need?”</p>
        <h2>to “This feels right for my situation — I know what to do next.”</h2>
        <a className="button primary" href="https://saiteo.com">
          See what Saiteo could improve in your customer journey
        </a>
      </section>
    </main>
  );
}
