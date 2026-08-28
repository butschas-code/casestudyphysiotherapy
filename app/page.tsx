const needs = [
  ['Sāp mugura, kakls vai locītavas', '#sapes'],
  ['Atveseļojos pēc traumas vai operācijas', '#sapes'],
  ['Esmu grūtniece vai pēcdzemdību periodā', '#sievietem'],
  ['Man ir jautājumi par iegurņa veselību', '#sievietem'],
  ['Uztraucos par mazuļa attīstību vai kustībām', '#berniem'],
  ['Vēlos, lai mans bērns kustas droši un pārliecinoši', '#berniem'],
];

const serviceGroups = [
  {
    id: 'sapes',
    title: 'Sāpes un rehabilitācija',
    image: '/images/service-rehab.jpg',
    intro: 'Kad sāpes vai ierobežota kustība traucē ikdienai, mērķis ir saprast cēloni un atgriezt drošu kustību.',
    items: [
      'Fizioterapeita konsultācija',
      'Muguras un kakla sāpes',
      'Locītavu problēmas',
      'Rehabilitācija pēc traumām',
      'Rehabilitācija pēc operācijām',
      'Teipošana',
    ],
  },
  {
    id: 'sievietem',
    title: 'Sievietēm',
    image: '/images/service-women.jpg',
    intro: 'Atbalsts grūtniecības laikā, pēc dzemdībām un jautājumos, kas saistīti ar iegurni, stāju un ķermeņa pārmaiņām.',
    items: [
      'Fizioterapija grūtniecības laikā',
      'Pēcdzemdību atjaunošanās',
      'Diastāze',
      'Iegurņa veselība',
      'Masāža grūtniecēm',
    ],
  },
  {
    id: 'berniem',
    title: 'Zīdaiņiem un bērniem',
    image: '/images/service-children.jpg',
    intro: 'Novērtējam kustību attīstību, palīdzam vecākiem saprast bērna vajadzības un veicinām drošu kustību kvalitāti.',
    items: ['Hendlings', 'Motorā attīstība', 'Bērnu fizioterapija', 'Stāja', 'Kustību kvalitāte'],
  },
  {
    id: 'kustiba',
    title: 'Kustība un ķermeņa terapija',
    image: '/images/service-movement.jpg',
    intro: 'Funkcionāls darbs ar ķermeni, kustību un apzināšanos, lai terapija palīdzētu reālai ikdienas kustībai.',
    items: ['Kustību terapija', 'Funkcionāla kustība', 'Ķermeņa apzināšanās', 'Manuālās pieejas'],
  },
];

const qualifications = [
  'Fizioterapija',
  'Kustību izvērtēšana',
  'Darbs ar sievietēm',
  'Darbs ar bērniem',
  'Rehabilitācija',
  'Funkcionāla pieeja',
];

const overviewServices = [
  ['Sāpes un rehabilitācija', '#sapes'],
  ['Sievietēm', '#sievietem'],
  ['Zīdaiņiem un bērniem', '#berniem'],
  ['Kustība un ķermeņa terapija', '#kustiba'],
];

const team = [
  {
    name: 'Elīna Vītola',
    role: 'Fizioterapeite · kustību terapeite',
    image: '/images/practitioner-primary.jpg',
    specialities: 'Fokuss: kustību izvērtēšana · sievietes · rehabilitācija',
  },
  {
    name: 'Marta Liepa',
    role: 'Fizioterapeite',
    image: '/images/practitioner-2.jpg',
    specialities: 'Fokuss: rehabilitācija · muguras sāpes · kustību kvalitāte',
  },
  {
    name: 'Anna Ozola',
    role: 'Fizioterapeite',
    image: '/images/practitioner-3.jpg',
    specialities: 'Fokuss: bērni · zīdaiņi · stāja · motorā attīstība',
  },
];

const whyPoints = [
  ['Plašāks skatījums', 'Ne tikai simptoms, bet cilvēka kustība un ikdiena kopumā.'],
  ['Dažādi dzīves posmi', 'Pieaugušie, grūtnieces, zīdaiņi un bērni.'],
  ['Individuāls plāns', 'Terapija tiek pielāgota konkrētajai situācijai un mērķiem.'],
];

const visitSteps = [
  'Izrunājam situāciju',
  'Izvērtējam kustību un funkcionālo stāvokli',
  'Vienojamies par mērķiem',
  'Izveidojam individuālu plānu',
];

const calendarDays = ['Pirmdiena', 'Trešdiena', 'Piektdiena'];
const calendarTimes = ['09:30', '12:00', '15:30', '17:00'];

function MovementLine({ className = '' }: { className?: string }) {
  return (
    <svg className={`movement-line ${className}`} viewBox="0 0 760 190" aria-hidden="true">
      <path d="M8 116C88 48 166 26 244 86c88 68 156 92 250 15 89-73 166-82 258-24" />
    </svg>
  );
}

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top">
          KUSTĪBA
          <small>Fizioterapijas prakse</small>
        </a>
        <nav aria-label="Galvenā navigācija">
          <a href="#pakalpojumi">Pakalpojumi</a>
          <a href="#specialisti">Speciālisti</a>
          <a href="#prakse">Par praksi</a>
          <a href="#sievietem">Sievietēm</a>
          <a href="#berniem">Bērniem</a>
          <a href="#kontakti">Kontakti</a>
          <a href="/case-study">Saiteo case study →</a>
        </nav>
        <details className="mobile-menu">
          <summary>Izvēlne</summary>
          <div>
            <a href="#pakalpojumi">Pakalpojumi</a>
            <a href="#specialisti">Speciālisti</a>
            <a href="#prakse">Par praksi</a>
            <a href="#sievietem">Sievietēm</a>
            <a href="#berniem">Bērniem</a>
            <a href="#kontakti">Kontakti</a>
            <a href="/case-study">Saiteo case study →</a>
          </div>
        </details>
        <a className="header-cta" href="#kontakti">Pieteikt vizīti</a>
      </header>

      <section id="top" className="hero">
        <figure className="hero-bg">
          <img src="/images/hero-treatment.jpg" alt="Terapeits palīdz pacientam kustību terapijas laikā" />
        </figure>
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">FIZIOTERAPIJA · RĪGA</p>
            <h1>Kustība sākas ar izpratni par visu ķermeni.</h1>
            <p>
              Fizioterapija pieaugušajiem, sievietēm, zīdaiņiem un bērniem —
              no sāpēm un rehabilitācijas līdz grūtniecībai, pēcdzemdību
              atjaunošanai un kustību attīstībai.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#kontakti">Pieteikt vizīti</a>
              <a className="button secondary" href="#vajadzibas">Atrast sev piemērotu pakalpojumu</a>
            </div>
          </div>
          <MovementLine className="hero-line" />
          <div className="trust-strip" aria-label="Prakses fokusa virzieni">
            <span>Fizioterapija</span>
            <span>Kustību terapija</span>
            <span>Darbs ar bērniem</span>
            <span>Rīga</span>
          </div>
        </div>
      </section>

      <section className="overview section">
        <div className="section-heading">
          <p className="eyebrow">Īsais pārskats</p>
          <h2>Ko prakse dara, kam palīdz un kā pieteikties.</h2>
          <figure className="overview-photo">
            <img src="/images/practitioner-primary.jpg" alt="Fizioterapijas prakses noskaņas attēls" />
          </figure>
        </div>
        <div className="overview-grid">
          <article className="qualification-flow">
            <h3>Pieeja</h3>
            <ul>
              {qualifications.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="service-flow">
            <h3>Pakalpojumi</h3>
            <ul>
              {overviewServices.map(([label, href]) => (
                <li key={label}>
                  <a href={href}>{label} →</a>
                </li>
              ))}
            </ul>
          </article>
          <article className="where">
            <h3>Kur atrast</h3>
            <p>Miera iela 24, Rīga</p>
            <a className="button primary" href="#kontakti">Pieteikt vizīti</a>
          </article>
          <p className="concept-note">Independent concept by Saiteo. Not a client project.</p>
        </div>
      </section>

      <section className="brand-pulse" aria-label="Prakses virziens">
        <p>Fizioterapija ar plašāku skatījumu uz cilvēku un kustību.</p>
        <div>
          <img src="/images/service-rehab.jpg" alt="Kustību izvērtēšana fizioterapijā" />
          <img src="/images/service-women.jpg" alt="Grūtniecības aprūpes noskaņas attēls" />
          <img src="/images/service-children.jpg" alt="Vecāka un bērna kustību attīstības noskaņa" />
        </div>
      </section>

      <section id="vajadzibas" className="needs section">
        <div className="section-heading">
          <p className="eyebrow">Ar ko sākt</p>
          <h2>Ar ko Jūs atnācāt pie mums?</h2>
        </div>
        <div className="need-grid">
          {needs.map(([need, href]) => (
            <a href={href} className="need-item" key={need}>
              <strong>{need}</strong>
            </a>
          ))}
        </div>
      </section>

      <section id="prakse" className="practice section dark">
        <figure>
          <img src="/images/practitioner-primary.jpg" alt="Elīnas Vītolas demonstrācijas portrets" />
        </figure>
        <div className="practice-copy">
          <p className="eyebrow">Elīna Vītola</p>
          <h2>Elīna Vītola</h2>
          <p className="subhead">Fizioterapeite · kustību terapeite</p>
          <h3>Ne tikai “kur sāp”, bet kā ķermenis darbojas kopumā.</h3>
          <p>
            Elīnas pieeja apvieno fizioterapiju, kustību analīzi un individuālu
            darbu ar cilvēka ikdienas paradumiem. Mērķis ir ne tikai mazināt
            simptomus, bet palīdzēt cilvēkam drošāk un brīvāk kustēties ikdienā.
          </p>
          <ul>
            {qualifications.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <a className="text-link" href="#kontakti">Pieteikt vizīti →</a>
        </div>
      </section>

      <section id="pakalpojumi" className="services section">
        <div className="section-heading">
          <p className="eyebrow">Pakalpojumi</p>
          <h2>Pakalpojumi</h2>
        </div>
        <div className="service-groups">
          {serviceGroups.map((group) => (
            <article className="service-group" id={group.id} key={group.id}>
              <figure>
                <img src={group.image} alt="" aria-hidden="true" />
              </figure>
              <div>
                <h3>{group.title}</h3>
                <p>{group.intro}</p>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <a className="text-link" href="#kontakti">Kā pieteikties →</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="specialisti" className="team section soft">
        <div className="section-heading">
          <p className="eyebrow">Speciālisti</p>
          <h2>Speciālisti, kuri skatās uz cilvēku kopumā.</h2>
          <p className="concept-note">Demonstrācijas saturs</p>
        </div>
        <div className="team-grid">
          {team.map((person, index) => (
            <article className={`person ${index === 0 ? 'lead' : ''}`} key={person.name}>
              <img src={person.image} alt={`${person.name} demonstrācijas portrets`} />
              <div>
                <h3>{person.name}</h3>
                <p>{person.role}</p>
                <span>{person.specialities}</span>
                <a className="text-link" href="#kontakti">Pieteikt vizīti →</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="why section">
        <div className="section-heading">
          <p className="eyebrow">Pieeja</p>
          <h2>Kāpēc izvēlēties šo pieeju?</h2>
        </div>
        <div className="why-grid">
          {whyPoints.map(([title, text]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="first-visit section soft">
        <div className="section-heading">
          <p className="eyebrow">Pirmā vizīte</p>
          <h2>Kā notiek pirmā vizīte?</h2>
        </div>
        <ol>
          {visitSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section id="kontakti" className="booking section dark">
        <div>
          <p className="eyebrow">Pieraksts</p>
          <h2>Nezināt, ar ko sākt?</h2>
          <p>
            Aprakstiet īsi savu situāciju, un palīdzēsim saprast, kurš
            pakalpojums vai speciālists būtu piemērotākais.
          </p>
        </div>
        <form id="booking-calendar" className="booking-card">
          <div className="booking-card-head">
            <span>Vizītes pieteikums</span>
            <strong>Izvēlieties aptuvenu laiku</strong>
          </div>
          <div className="calendar-grid" aria-label="Pieejamo laiku piemēri">
            {calendarDays.map((day) => (
              <div key={day}>
                <h3>{day}</h3>
                {calendarTimes.map((time) => (
                  <label key={`${day}-${time}`}>
                    <input name="time" type="radio" />
                    <span>{time}</span>
                  </label>
                ))}
              </div>
            ))}
          </div>
          <div className="form-grid">
            <label>
              Vārds, uzvārds
              <input name="name" type="text" placeholder="Jūsu vārds" />
            </label>
            <label>
              Tālrunis
              <input name="phone" type="tel" placeholder="+371 20 000 000" />
            </label>
            <label>
              E-pasts
              <input name="email" type="email" placeholder="epasts@piemers.lv" />
            </label>
            <label>
              Pakalpojuma virziens
              <select name="service" defaultValue="">
                <option value="" disabled>Izvēlieties virzienu</option>
                {overviewServices.map(([label]) => (
                  <option value={label} key={label}>{label}</option>
                ))}
              </select>
            </label>
            <label className="full">
              Īsi aprakstiet situāciju
              <textarea name="message" rows={4} placeholder="Kas sāp, cik ilgi, vai pieteikums ir pieaugušajam, bērnam vai pēcdzemdību periodam?" />
            </label>
          </div>
          <button className="button primary coral" type="button">Pieteikt vizīti</button>
          <a className="button secondary demo-secondary" href="https://wa.me/37120000000">Rakstīt WhatsApp</a>
          <p className="booking-note">Demo koncepts: forma nerada īstu pierakstu un nenosūta datus.</p>
          <p className="booking-location">Miera iela 24, Rīga · <a href="mailto:sveiki@kustiba-demo.lv">sveiki@kustiba-demo.lv</a> · <a href="tel:+37120000000">+371 20 000 000</a></p>
        </form>
      </section>

      <footer className="footer">
        <div>
          <strong>KUSTĪBA</strong>
          <p>Fizioterapijas prakses koncepts</p>
        </div>
        <nav aria-label="Kājenes navigācija">
          <a href="#pakalpojumi">Pakalpojumi</a>
          <a href="#specialisti">Speciālisti</a>
          <a href="#kontakti">Kontakti</a>
          <a href="mailto:sveiki@kustiba-demo.lv">sveiki@kustiba-demo.lv</a>
          <a href="/case-study">Saiteo case study →</a>
        </nav>
        <p>Independent concept by Saiteo. Not a client project.</p>
      </footer>
    </main>
  );
}
