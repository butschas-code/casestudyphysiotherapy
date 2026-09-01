"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function PhysiotherapyConceptPage() {
  // Calendar state
  const [selectedMonth] = useState("Septembris 2026");
  const [selectedDate, setSelectedDate] = useState<number>(2);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("11:30");
  const [selectedSpecialist, setSelectedSpecialist] = useState<string>("elina");
  const [selectedServiceType, setSelectedServiceType] = useState<string>("mugura");
  const [bookingStep, setBookingStep] = useState<1 | 2 | 3>(1);

  // Form states
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientNotes, setPatientNotes] = useState("");

  // Contact form state
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const calendarDays = [
    { dayNumber: 1, dayName: "P", fullDate: "Otrdiena, 1. septembris", slotsAvailable: 3 },
    { dayNumber: 2, dayName: "O", fullDate: "Trešdiena, 2. septembris", slotsAvailable: 5, popular: true },
    { dayNumber: 3, dayName: "T", fullDate: "Ceturtdiena, 3. septembris", slotsAvailable: 4 },
    { dayNumber: 4, dayName: "C", fullDate: "Piektdiena, 4. septembris", slotsAvailable: 2 },
    { dayNumber: 5, dayName: "P", fullDate: "Sestdiena, 5. septembris", slotsAvailable: 3 },
    { dayNumber: 7, dayName: "P", fullDate: "Pirmdiena, 7. septembris", slotsAvailable: 6 },
    { dayNumber: 8, dayName: "O", fullDate: "Otrdiena, 8. septembris", slotsAvailable: 4 },
  ];

  const timeSlots = {
    morning: ["08:30", "09:45", "11:00", "11:30"],
    afternoon: ["13:15", "14:30", "15:45", "16:30"],
    evening: ["17:45", "18:30", "19:15"],
  };

  const specialists = [
    {
      id: "elina",
      name: "Elīna Vītola",
      role: "Vadošā fizioterapeite · Dibinātāja",
      experience: "12 gadu klīniskā pieredze",
      specialty: "Muguras sāpes, sieviešu veselība & diastāze",
      avatar: "/concept-physio/practitioner-primary.jpg",
      badge: "Pieejama rīt",
    },
    {
      id: "marta",
      name: "Marta Liepa",
      role: "Sertificēta fizioterapeite",
      experience: "8 gadu pieredze",
      specialty: "Pēctraumu atjaunošana & sporta rehabilitācija",
      avatar: "/concept-physio/practitioner-2.jpg",
      badge: "Pieejama šodien",
    },
    {
      id: "anna",
      name: "Anna Ozola",
      role: "Bērnu & zīdaiņu fizioterapeite",
      experience: "7 gadu pieredze",
      specialty: "Zīdaiņu motorā attīstība & hendlings",
      avatar: "/concept-physio/practitioner-3.jpg",
      badge: "Pieejama 3. septembrī",
    },
  ];

  const carePaths = [
    {
      id: "rehab",
      title: "Muguras, kakla un locītavu sāpes",
      subtitle: "Pieaugušajiem · Sēdošs darbs · Pēctraumu atveseļošanās",
      image: "/concept-physio/service-rehab.jpg",
      quote: "Kad muguras sāpes vai spranda stīvums traucē strādāt un baudīt dienu.",
      description:
        "Mēs veltām laiku, lai rūpīgi pārbaudītu mugurkaula mobilitāti, iegurņa stabilitāti un elpošanas modeli. Terapija apvieno saudzīgu manuālu darbu ar mērķtiecīgiem vingrojumiem ilgstošam atvieglojumam.",
      points: [
        "Padziļināta primārā kustību un stājas diagnostika (60 min)",
        "Saudzīga manuālā terapija un sasprindzināto audu atbrīvošana",
        "3 vienkārši vingrojumi mājas videi, kas aizņem 5 minūtes dienā",
      ],
      price: "50 € / 60 min",
    },
    {
      id: "women",
      title: "Sieviešu veselība & pēcdzemdību periods",
      subtitle: "Gaidību laiks · Diastāze · Iegurņa pamatnes muskulatūra",
      image: "/concept-physio/service-women.jpg",
      quote: "Mierīgs, zinātniski pamatots atbalsts sievietes ķermenim pirms un pēc bērniņa piedzimšanas.",
      description:
        "Grūtniecības laikā palīdzam atslogot muguru un sagatavot iegurni dzemdībām. Pēcdzemdību vizītē pārbaudām vēdera taisnā muskuļa diastāzi, iegurņa pamatni un atgriežam ķermenim spēku bez pārmērīgas slodzes.",
      points: [
        "Pēcdzemdību funkcionālā pārbaude no 6. nedēļas pēc dzemdībām",
        "Diastāzes (vēdera taisnā muskuļa šķirtnes) saudzīga korekcija",
        "Iegurņa pamatnes muskuļu apzināšanās un nostiprināšana",
      ],
      price: "50 € / 60 min",
    },
    {
      id: "children",
      title: "Zīdaiņu motorā attīstība & hendlings",
      subtitle: "No 1 mēneša vecuma · Bērnu stāja · Vecāku apmācība",
      image: "/concept-physio/service-children.jpg",
      quote: "Mierīga vide, kur mazulis jūtas droši un vecāki gūst skaidru pārliecību par bērna attīstību.",
      description:
        "Praktiska apmācība pareizā hendlingā — kā mazuli celt, turēt un ģērbt, lai dabiski veicinātu velšanos, rāpošanu un simetrisku kustību kvalitāti bez asarām un lieka stresa.",
      points: [
        "Zīdaiņa motorās attīstības un muskuļu tonusa novērtēšana",
        "Praktiska hendlinga apmācība vecākiem ikdienas aprūpei",
        "Stājas un pēdu asimetriju profilakse pirmsskolas vecuma bērniem",
      ],
      price: "40 € – 45 € / 45 min",
    },
  ];

  const patientStories = [
    {
      author: "Jānis Krūmiņš",
      role: "IT projektu vadītājs (38 gadi)",
      condition: "Hroniskas muguras jostas daļas sāpes",
      text: "“Pēc 6 mēnešu nesekmīgiem mēģinājumiem vingrot pašam Elīna 1. vizītē parādīja, ka problēma bija manā elpošanā un sēdēšanas pozā. Pēc 3 nodarbībām sāpes pazuda, un es beidzot varu atkal brīvi skriet.”",
    },
    {
      author: "Laura Bērziņa",
      role: "Jaunā māmiņa (31 gads)",
      condition: "Pēcdzemdību diastāze un iegurņa diskomforts",
      text: "“Ļoti maiga, iejūtīga un profesionāla attieksme. Ieguvu skaidrus, drošus vingrojumus, ko viegli pildīt mājās, kamēr mazulis guļ. Sajūta, ka atkal kontrolēju savu ķermeni.”",
    },
    {
      author: "Kristaps un Madara",
      role: "Vecāki 3 mēnešus vecam dēliņam",
      condition: "Zīdaiņa plecu asimetrija un muskuļu sasprindzinājums",
      text: "“Anna ar hendlinga nodarbību iemācīja mūs pareizi celt un turēt dēliņu. Mierīga gaisotne, bez asarām — pēc divām nedēļām mazulis sāka brīvi velties uz abām pusēm.”",
    },
  ];

  const faqs = [
    {
      q: "Kas man jāņem līdzi uz pirmo vizīti?",
      a: "Ērts, mīksts apģērbs, kas neierobežo kustības (t-krekls, legingi vai mīkstas bikses). Ja Jums ir veikti iepriekšēji izmeklējumi (rentgens, magnētiskā rezonanse vai USG), ņemiet tos līdzi vai nosūtiet pirms vizītes.",
    },
    {
      q: "Vai vizītei nepieciešams ārsta nosūtījums?",
      a: "Nē, privātai fizioterapeita konsultācijai ārsta nosūtījums nav obligāts. Mūsu speciālistes ir sertificētas ārstniecības personas un pašas veic pilnu funkcionālo novērtējumu.",
    },
    {
      q: "Vai pieņemat veselības apdrošināšanas polises?",
      a: "Jā, mēs sadarbojamies ar visām lielākajām apdrošināšanas kompānijām (Balta, BTA, Compensa, Ergo, Gjensidige u.c.). Pēc vizītes izsniedzam oficiālu čeku un atskaiti ar ārstniecības personas kodu.",
    },
    {
      q: "Kā nokļūt praksē un vai ēkā pieejams lifts?",
      a: "Atrodamies Rīgā, Miera ielā 24 (klusā pagalma ēkā, 2. stāvā). Ēkā ir ērts, plašs lifts — pie mums var ērti ierasties gan ar bērnu ratiņiem, gan personām ar kustību ierobežojumiem.",
    },
  ];

  // Schema.org MedicalBusiness JSON-LD
  const schemaJsonLd = {
    "@context": "https://schema.org",
    "@type": ["Physiotherapy", "MedicalBusiness", "LocalBusiness"],
    name: "KUSTĪBA — Fizioterapijas & Kustību Prakse",
    description: "Specializēta fizioterapija, sieviešu veselība pēc dzemdībām un zīdaiņu hendlings Rīgā, Miera ielā 24.",
    image: "https://saiteo.com/concept-physio/hero-treatment.jpg",
    telephone: "+37167000000",
    email: "sveiki@kustiba-demo.lv",
    priceRange: "€40 - €60",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Miera iela 24",
      addressLocality: "Rīga",
      postalCode: "LV-1001",
      addressCountry: "LV",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 56.9631,
      longitude: 24.1352,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "09:00",
        closes: "15:00",
      },
    ],
    medicalSpecialty: [
      "Physiotherapy",
      "Obstetric",
      "Pediatric",
    ],
    availableService: [
      {
        "@type": "MedicalProcedure",
        name: "Primārā fizioterapeita konsultācija & kustību diagnostika",
      },
      {
        "@type": "MedicalProcedure",
        name: "Pēcdzemdību sieviešu veselība & diastāzes korekcija",
      },
      {
        "@type": "MedicalProcedure",
        name: "Zīdaiņu motorā attīstība & hendlings",
      },
    ],
  };

  const selectedDateObj = calendarDays.find((d) => d.dayNumber === selectedDate) || calendarDays[0];
  const activeSpecialistObj = specialists.find((s) => s.id === selectedSpecialist) || specialists[0];

  return (
    <div style={{ backgroundColor: "#FAF7F2", color: "#232D29" }} className="min-h-screen w-full font-sans antialiased selection:bg-[#C86D51]/20">
      {/* Structured Data (Schema.org JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />

      {/* Top Persistent Saiteo Concept Context Bar */}
      <aside style={{ backgroundColor: "#2D3732", color: "#FAF7F2" }} className="sticky top-0 z-50 flex items-center justify-between border-b border-white/10 px-4 py-2 text-xs shadow-sm">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-heading font-bold text-[#00C9A7]">
            saiteo
          </Link>
          <span className="text-white/30">/</span>
          <span className="rounded bg-[#00C9A7]/20 px-2 py-0.5 font-mono text-[10px] font-bold text-[#00C9A7]">
            NEATKARĪGS KONCEPTS
          </span>
          <span className="hidden text-white/70 sm:inline">
            Fizioterapijas prakses mājaslapas & konversijas etalons
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/case-studies/physiotherapy"
            className="rounded bg-white/10 px-3 py-1 font-medium text-white transition-colors hover:bg-white/20"
          >
            Lasīt stratēģijas analīzi →
          </Link>
          <Link
            href="/#contact"
            className="hidden rounded bg-[#00C9A7] px-3 py-1 font-bold text-[#081020] transition-transform hover:scale-105 min-[540px]:inline-block"
          >
            Pieteikt savu mājaslapu
          </Link>
        </div>
      </aside>

      {/* Warm Sunlit Clinic Header */}
      <header style={{ backgroundColor: "rgba(250, 247, 242, 0.95)", borderColor: "rgba(35, 45, 41, 0.08)" }} className="sticky top-[37px] z-40 border-b backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
          <Link href="#top" className="group">
            <span style={{ color: "#232D29" }} className="font-heading text-2xl font-bold tracking-tight">
              KUSTĪBA
            </span>
            <span style={{ color: "#6E8B82" }} className="block text-[11px] font-semibold tracking-wider uppercase">
              Fizioterapijas & Kustību Prakse
            </span>
          </Link>

          <nav style={{ color: "rgba(35, 45, 41, 0.75)" }} className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a href="#stasts" className="transition-colors hover:text-[#232D29]">Par praksi</a>
            <a href="#virzieni" className="transition-colors hover:text-[#232D29]">Pakalpojumi</a>
            <a href="#specialisti" className="transition-colors hover:text-[#232D29]">Speciālisti</a>
            <a href="#pieraksts" className="transition-colors hover:text-[#232D29]">Pieraksts</a>
            <a href="#atsauksmes" className="transition-colors hover:text-[#232D29]">Atsauksmes</a>
            <a href="#cenas" className="transition-colors hover:text-[#232D29]">Cenrādis</a>
            <a href="#kontakti" className="transition-colors hover:text-[#232D29]">Kontakti</a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="tel:+37167000000"
              style={{ color: "rgba(35, 45, 41, 0.75)" }}
              className="hidden font-mono text-xs font-semibold sm:inline-block hover:text-[#C86D51]"
            >
              +371 67 000 000
            </a>
            <a
              href="#pieraksts"
              style={{ backgroundColor: "#232D29", color: "#FAF7F2" }}
              className="rounded-full px-5 py-2.5 text-xs font-bold shadow-xs transition-all hover:bg-[#384842]"
            >
              Pieteikt vizīti
            </a>
          </div>
        </div>
      </header>

      {/* Sunlit Warm Organic Hero */}
      <section id="top" style={{ backgroundColor: "#FAF7F2" }} className="relative overflow-hidden py-14 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div style={{ backgroundColor: "#EAE3D9", color: "#3B4D46" }} className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-semibold">
                <span style={{ backgroundColor: "#C86D51" }} className="h-2 w-2 rounded-full" />
                <span>Miera iela 24, Rīga · Pieņemšana 2–3 dienu laikā</span>
              </div>

              <h1 style={{ color: "#232D29" }} className="mt-6 font-heading text-4xl font-extrabold leading-[1.12] tracking-tight sm:text-5xl lg:text-[3.4rem]">
                Atgūstiet kustību brīvību<br />
                bez bailēm un sāpēm.
              </h1>

              <p style={{ color: "rgba(35, 45, 41, 0.78)" }} className="mt-6 max-w-xl text-base leading-relaxed sm:text-lg">
                Fizioterapija un saudzīga rehabilitācija pieaugušajiem, sievietēm gaidību un pēcdzemdību periodā, kā arī zīdaiņu attīstība. Rūpīga iedziļināšanās cēloņos — mājīgā vidē, bez steigas un bez virspusējiem šabloniem.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#pieraksts"
                  style={{ backgroundColor: "#C86D51", color: "#FFFFFF" }}
                  className="rounded-full px-7 py-3.5 text-sm font-bold shadow-md transition-transform hover:-translate-y-0.5 hover:bg-[#B85C42]"
                >
                  Izvēlēties brīvo laiku kalendārā ↓
                </a>
                <a
                  href="https://wa.me/37120000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ borderColor: "rgba(35, 45, 41, 0.2)", backgroundColor: "#FFFFFF", color: "#232D29" }}
                  className="inline-flex items-center gap-2 rounded-full border px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-[#F4EFEB]"
                >
                  <span>💬</span>
                  <span>Jautāt WhatsApp</span>
                </a>
              </div>

              {/* Ambient Reassurance Strip */}
              <div style={{ borderColor: "rgba(35, 45, 41, 0.1)", color: "rgba(35, 45, 41, 0.75)" }} className="mt-12 grid grid-cols-2 gap-4 border-t pt-6 sm:grid-cols-4 text-xs font-medium">
                <div className="flex items-center gap-2">
                  <span style={{ color: "#C86D51" }} className="font-bold">🌿</span>
                  <span>1-pret-1 darbs kabinetā</span>
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ color: "#C86D51" }} className="font-bold">🩺</span>
                  <span>Sertificētas speciālistes</span>
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ color: "#C86D51" }} className="font-bold">☕</span>
                  <span>Klusa, mājīga vide</span>
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ color: "#C86D51" }} className="font-bold">🛡️</span>
                  <span>Visas apdrošināšanas</span>
                </div>
              </div>
            </div>

            {/* Warm Studio Photography */}
            <div className="relative">
              <div style={{ backgroundColor: "#EAE3D9", position: "relative", height: "380px", width: "100%", overflow: "hidden", borderRadius: "1.5rem" }} className="shadow-[0_16px_40px_-12px_rgba(35,45,41,0.12)]">
                <Image
                  src="/concept-physio/hero-treatment.jpg"
                  alt="Fizioterapijas nodarbība KUSTĪBA mājīgajā praksē"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover object-center"
                />
              </div>
              <div style={{ backgroundColor: "#FFFFFF", borderColor: "rgba(35, 45, 41, 0.08)" }} className="absolute -bottom-6 -left-6 hidden sm:block rounded-2xl border p-5 shadow-lg max-w-[260px]">
                <p style={{ color: "#232D29" }} className="font-heading text-xs font-bold">
                  “Sāpes nav jāpacieš.”
                </p>
                <p style={{ color: "rgba(35, 45, 41, 0.65)" }} className="mt-1 text-[11px] leading-relaxed">
                  Pareizi izvēlētas saudzīgas kustības palīdz ķermenim atgūt dabisko balansu.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Calendar Booking System */}
      <section id="pieraksts" style={{ backgroundColor: "#FFFFFF", borderColor: "rgba(35, 45, 41, 0.08)" }} className="border-t py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span style={{ color: "#C86D51" }} className="text-xs font-bold uppercase tracking-[0.18em]">
              Tiešsaistes pieraksts
            </span>
            <h2 style={{ color: "#232D29" }} className="mt-2 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
              Rezervējiet vizīti 60 sekundēs
            </h2>
            <p style={{ color: "rgba(35, 45, 41, 0.75)" }} className="mt-3 text-sm sm:text-base">
              Izvēlieties vēlamo speciālisti, datumu un pulksteņa laiku. Apstiprinājums uzreiz tiek nosūtīts uz Jūsu tālruni.
            </p>
          </div>

          <div style={{ backgroundColor: "#FAF7F2", borderColor: "rgba(35, 45, 41, 0.1)" }} className="mt-12 rounded-3xl border p-6 sm:p-10 shadow-sm">
            {bookingStep === 3 ? (
              <div style={{ backgroundColor: "#EAE3D9" }} className="rounded-2xl p-8 text-center">
                <span style={{ color: "#C86D51" }} className="text-5xl">✓</span>
                <h3 style={{ color: "#232D29" }} className="mt-4 font-heading text-2xl font-bold">
                  Vizīte veiksmīgi pieteikta!
                </h3>
                <p style={{ color: "rgba(35, 45, 41, 0.85)" }} className="mt-3 text-sm max-w-md mx-auto leading-relaxed">
                  Paldies, <strong>{patientName || "cien. pacient"}</strong>! Gaidīsim Jūs <strong>{selectedDateObj.fullDate} plkst. {selectedTimeSlot}</strong> pie speciālistes <strong>{activeSpecialistObj.name}</strong>.
                </p>
                <div style={{ backgroundColor: "#FFFFFF", borderColor: "rgba(35, 45, 41, 0.08)" }} className="mt-6 inline-block rounded-xl border p-4 text-xs text-left max-w-sm">
                  <p>📍 <strong>Adrese:</strong> Rīga, Miera iela 24, 2. stāvs (pieejams lifts)</p>
                  <p className="mt-1">📞 <strong>Tālrunis saziņai:</strong> +371 67 000 000</p>
                  <p className="mt-1">🔔 Atgādinājuma SMS tiks nosūtīta 24h pirms vizītes.</p>
                </div>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setBookingStep(1);
                      setPatientName("");
                      setPatientPhone("");
                    }}
                    style={{ backgroundColor: "#232D29", color: "#FAF7F2" }}
                    className="rounded-full px-6 py-2.5 text-xs font-bold"
                  >
                    Pieteikt vēl vienu vizīti
                  </button>
                  <a
                    href="https://wa.me/37120000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ backgroundColor: "#C86D51", color: "#FFFFFF" }}
                    className="rounded-full px-6 py-2.5 text-xs font-bold"
                  >
                    Sazināties WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              <div>
                {/* Specialist Selection */}
                <div>
                  <label style={{ color: "#232D29" }} className="block text-xs font-bold uppercase tracking-wider">
                    1. Izvēlieties speciālisti
                  </label>
                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    {specialists.map((spec) => (
                      <button
                        key={spec.id}
                        type="button"
                        onClick={() => setSelectedSpecialist(spec.id)}
                        style={
                          selectedSpecialist === spec.id
                            ? { backgroundColor: "#FFFFFF", borderColor: "#C86D51", boxShadow: "0 4px 14px rgba(200, 109, 81, 0.15)" }
                            : { backgroundColor: "#FAF7F2", borderColor: "rgba(35, 45, 41, 0.1)" }
                        }
                        className="flex items-center gap-3.5 rounded-2xl border p-3.5 text-left transition-all"
                      >
                        <div style={{ position: "relative", height: "48px", width: "48px", overflow: "hidden", borderRadius: "9999px", flexShrink: 0, backgroundColor: "#EAE3D9" }}>
                          <Image
                            src={spec.avatar}
                            alt={spec.name}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p style={{ color: "#232D29" }} className="font-heading text-xs font-bold">{spec.name}</p>
                          <p style={{ color: "#6E8B82" }} className="text-[11px] font-medium">{spec.experience}</p>
                          <span style={{ color: "#C86D51" }} className="text-[10px] font-bold block mt-0.5">● {spec.badge}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Calendar Day Picker */}
                <div className="mt-8 border-t border-[#232D29]/08 pt-6">
                  <div className="flex items-center justify-between">
                    <label style={{ color: "#232D29" }} className="block text-xs font-bold uppercase tracking-wider">
                      2. Izvēlieties datumu ({selectedMonth})
                    </label>
                    <span style={{ color: "#6E8B82" }} className="text-xs font-semibold">
                      {selectedDateObj.fullDate}
                    </span>
                  </div>

                  <div className="mt-3 grid grid-cols-4 sm:grid-cols-7 gap-2">
                    {calendarDays.map((calDay) => (
                      <button
                        key={calDay.dayNumber}
                        type="button"
                        onClick={() => setSelectedDate(calDay.dayNumber)}
                        style={
                          selectedDate === calDay.dayNumber
                            ? { backgroundColor: "#C86D51", color: "#FFFFFF", borderColor: "#C86D51" }
                            : { backgroundColor: "#FFFFFF", color: "#232D29", borderColor: "rgba(35, 45, 41, 0.1)" }
                        }
                        className="rounded-2xl p-3 text-center border transition-all"
                      >
                        <p className="text-[11px] opacity-70 font-semibold">{calDay.dayName}</p>
                        <p className="font-heading text-lg font-bold mt-0.5">{calDay.dayNumber}</p>
                        <p className="text-[10px] mt-1 opacity-80">{calDay.slotsAvailable} laiki</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Slot Picker */}
                <div className="mt-8 border-t border-[#232D29]/08 pt-6">
                  <label style={{ color: "#232D29" }} className="block text-xs font-bold uppercase tracking-wider">
                    3. Izvēlieties pulksteņa laiku
                  </label>

                  <div className="mt-3 space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span style={{ color: "#6E8B82" }} className="text-xs font-semibold w-20">Rīts:</span>
                      {timeSlots.morning.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTimeSlot(slot)}
                          style={
                            selectedTimeSlot === slot
                              ? { backgroundColor: "#232D29", color: "#FAF7F2", borderColor: "#232D29" }
                              : { backgroundColor: "#FFFFFF", color: "#232D29", borderColor: "rgba(35, 45, 41, 0.1)" }
                          }
                          className="rounded-xl border px-3.5 py-1.5 font-mono text-xs font-bold transition-all"
                        >
                          {slot}
                        </button>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <span style={{ color: "#6E8B82" }} className="text-xs font-semibold w-20">Diena:</span>
                      {timeSlots.afternoon.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTimeSlot(slot)}
                          style={
                            selectedTimeSlot === slot
                              ? { backgroundColor: "#232D29", color: "#FAF7F2", borderColor: "#232D29" }
                              : { backgroundColor: "#FFFFFF", color: "#232D29", borderColor: "rgba(35, 45, 41, 0.1)" }
                          }
                          className="rounded-xl border px-3.5 py-1.5 font-mono text-xs font-bold transition-all"
                        >
                          {slot}
                        </button>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <span style={{ color: "#6E8B82" }} className="text-xs font-semibold w-20">Vakars:</span>
                      {timeSlots.evening.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTimeSlot(slot)}
                          style={
                            selectedTimeSlot === slot
                              ? { backgroundColor: "#232D29", color: "#FAF7F2", borderColor: "#232D29" }
                              : { backgroundColor: "#FFFFFF", color: "#232D29", borderColor: "rgba(35, 45, 41, 0.1)" }
                          }
                          className="rounded-xl border px-3.5 py-1.5 font-mono text-xs font-bold transition-all"
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Patient Information Form */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setBookingStep(3);
                  }}
                  className="mt-8 border-t border-[#232D29]/08 pt-6"
                >
                  <label style={{ color: "#232D29" }} className="block text-xs font-bold uppercase tracking-wider mb-3">
                    4. Jūsu kontaktinformācija
                  </label>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label style={{ color: "#232D29" }} className="block text-xs font-semibold">
                        Vārds, Uzvārds *
                      </label>
                      <input
                        type="text"
                        required
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        placeholder="Anna Bērziņa"
                        style={{ borderColor: "rgba(35, 45, 41, 0.15)", backgroundColor: "#FFFFFF", color: "#232D29" }}
                        className="mt-1.5 w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label style={{ color: "#232D29" }} className="block text-xs font-semibold">
                        Tālruņa numurs *
                      </label>
                      <input
                        type="tel"
                        required
                        value={patientPhone}
                        onChange={(e) => setPatientPhone(e.target.value)}
                        placeholder="+371 20 000 000"
                        style={{ borderColor: "rgba(35, 45, 41, 0.15)", backgroundColor: "#FFFFFF", color: "#232D29" }}
                        className="mt-1.5 w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <label style={{ color: "#232D29" }} className="block text-xs font-semibold">
                        Vizītes virziens
                      </label>
                      <select
                        value={selectedServiceType}
                        onChange={(e) => setSelectedServiceType(e.target.value)}
                        style={{ borderColor: "rgba(35, 45, 41, 0.15)", backgroundColor: "#FFFFFF", color: "#232D29" }}
                        className="mt-1.5 w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-hidden"
                      >
                        <option value="mugura">Muguras, kakla vai locītavu sāpes (50 €)</option>
                        <option value="sieviete">Sieviešu veselība & pēcdzemdību aprūpe (50 €)</option>
                        <option value="berns">Zīdaiņu attīstība & hendlings (40 €)</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ color: "#232D29" }} className="block text-xs font-semibold">
                        E-pasts (atgādinājuma saņemšanai)
                      </label>
                      <input
                        type="email"
                        value={patientEmail}
                        onChange={(e) => setPatientEmail(e.target.value)}
                        placeholder="anna@piemers.lv"
                        style={{ borderColor: "rgba(35, 45, 41, 0.15)", backgroundColor: "#FFFFFF", color: "#232D29" }}
                        className="mt-1.5 w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label style={{ color: "#232D29" }} className="block text-xs font-semibold">
                      Vizītes mērķis vai sūdzības (pēc izvēles)
                    </label>
                    <input
                      type="text"
                      value={patientNotes}
                      onChange={(e) => setPatientNotes(e.target.value)}
                      placeholder="Piem., spranda stīvums pēc darba pie datora, pēcdzemdību pārbaude"
                      style={{ borderColor: "rgba(35, 45, 41, 0.15)", backgroundColor: "#FFFFFF", color: "#232D29" }}
                      className="mt-1.5 w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-hidden"
                    />
                  </div>

                  <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                    <div className="text-xs text-[#232D29]/70">
                      Izvēlēts: <strong>{selectedDateObj.fullDate} plkst. {selectedTimeSlot}</strong> ({activeSpecialistObj.name})
                    </div>
                    <button
                      type="submit"
                      style={{ backgroundColor: "#C86D51", color: "#FFFFFF" }}
                      className="rounded-full px-8 py-3.5 text-sm font-bold shadow-md transition-transform hover:-translate-y-0.5 hover:bg-[#B85C42]"
                    >
                      Apstiprināt pierakstu →
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Human Philosophy Section ("Mūsu Filozofija") */}
      <section id="stasts" style={{ backgroundColor: "#FAF7F2", borderColor: "rgba(35, 45, 41, 0.08)" }} className="border-t py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div style={{ backgroundColor: "#F4EFEB", position: "relative", height: "420px", width: "100%", overflow: "hidden", borderRadius: "1.5rem" }} className="shadow-sm">
              <Image
                src="/concept-physio/practitioner-primary.jpg"
                alt="Elīna Vītola, vadošā fizioterapeite"
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover object-top"
              />
            </div>

            <div>
              <span style={{ color: "#C86D51" }} className="text-xs font-bold uppercase tracking-[0.18em]">
                Prakses filozofija
              </span>
              <h2 style={{ color: "#232D29" }} className="mt-2 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
                Mēs nesteidzinām.<br />
                Mēs uzklausām un meklējam cēloni.
              </h2>

              <p style={{ color: "rgba(35, 45, 41, 0.78)" }} className="mt-5 text-sm leading-relaxed sm:text-base">
                Lielākā daļa cilvēku pie mums vēršas brīdī, kad muguras sāpes, spranda stīvums vai nogurums jau kļuvis par ikdienas fonu. Bieži vien cilvēks ir izmēģinājis pretsāpju zāles vai vispārīgus vingrojumus no interneta, taču sāpes atgriežas.
              </p>
              <p style={{ color: "rgba(35, 45, 41, 0.78)" }} className="mt-3 text-sm leading-relaxed sm:text-base">
                Mūsu pieejas pamatā ir izpratne par ķermeni kā vienotu biomehānisku sistēmu. Mēs analizējam, kā Jūs elpojat, kā sēžat pie datora un kādas ikdienas kustības rada slodzi.
              </p>

              <div style={{ borderLeftColor: "#C86D51" }} className="mt-8 border-l-3 pl-5">
                <p style={{ color: "#232D29" }} className="font-heading text-sm font-semibold italic">
                  “Fizioterapija nav tikai vingrošana — tā ir atbrīvošanās no bailēm par savu ķermeni un atgriešanās pie dzīvesprieka.”
                </p>
                <span style={{ color: "#6E8B82" }} className="mt-2 block text-xs font-bold">
                  — Elīna Vītola, prakses vadītāja
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Core Care Pathways */}
      <section id="virzieni" style={{ backgroundColor: "#F4EFEB", borderColor: "rgba(35, 45, 41, 0.08)" }} className="border-t py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="max-w-xl">
            <span style={{ color: "#C86D51" }} className="text-xs font-bold uppercase tracking-[0.18em]">
              Aprūpes virzieni
            </span>
            <h2 style={{ color: "#232D29" }} className="mt-2 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
              Kam mēs varam palīdzēt?
            </h2>
            <p style={{ color: "rgba(35, 45, 41, 0.75)" }} className="mt-3 text-sm sm:text-base">
              Trīs specializētas programmas, kas pielāgotas konkrētām dzīves situācijām:
            </p>
          </div>

          <div className="mt-12 space-y-10">
            {carePaths.map((path, idx) => (
              <article
                key={path.id}
                id={path.id}
                style={{ backgroundColor: "#FFFFFF", borderColor: "rgba(35, 45, 41, 0.08)" }}
                className={`grid gap-8 overflow-hidden rounded-3xl border p-6 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center shadow-xs ${
                  idx % 2 === 1 ? "lg:grid-cols-[0.9fr_1.1fr]" : ""
                }`}
              >
                <div className={idx % 2 === 1 ? "order-1 lg:order-2" : ""}>
                  <span style={{ color: "#C86D51" }} className="text-xs font-bold uppercase tracking-wider">
                    {path.subtitle}
                  </span>
                  <h3 style={{ color: "#232D29" }} className="mt-2 font-heading text-2xl font-bold sm:text-3xl">
                    {path.title}
                  </h3>
                  <p style={{ color: "#6E8B82" }} className="mt-3 font-heading text-sm font-semibold italic">
                    “{path.quote}”
                  </p>
                  <p style={{ color: "rgba(35, 45, 41, 0.78)" }} className="mt-4 text-sm leading-relaxed">
                    {path.description}
                  </p>

                  <ul style={{ borderColor: "rgba(35, 45, 41, 0.08)" }} className="mt-6 space-y-2 border-t pt-5">
                    {path.points.map((pt, pIdx) => (
                      <li key={pIdx} style={{ color: "#232D29" }} className="flex items-start gap-3 text-xs sm:text-sm font-medium">
                        <span style={{ color: "#C86D51" }} className="font-bold">✓</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  <div style={{ borderColor: "rgba(35, 45, 41, 0.08)" }} className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t pt-6">
                    <span style={{ color: "#232D29" }} className="font-mono text-sm font-bold">
                      {path.price}
                    </span>
                    <a
                      href="#pieraksts"
                      style={{ backgroundColor: "#232D29", color: "#FAF7F2" }}
                      className="rounded-full px-6 py-2.5 text-xs font-bold transition-colors hover:bg-[#C86D51]"
                    >
                      Pieteikt šo vizīti →
                    </a>
                  </div>
                </div>

                <div style={{ position: "relative", height: "320px", width: "100%", overflow: "hidden", borderRadius: "1.25rem", backgroundColor: "#EAE3D9" }} className={idx % 2 === 1 ? "order-2 lg:order-1" : ""}>
                  <Image
                    src={path.image}
                    alt={path.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 450px"
                    className="object-cover"
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Specialist Team */}
      <section id="specialisti" style={{ backgroundColor: "#FFFFFF", borderColor: "rgba(35, 45, 41, 0.08)" }} className="border-t py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="max-w-xl">
            <span style={{ color: "#C86D51" }} className="text-xs font-bold uppercase tracking-[0.18em]">
              Speciālisti
            </span>
            <h2 style={{ color: "#232D29" }} className="mt-2 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
              Cilvēki, kuru rokās Jūs varat justies droši
            </h2>
            <p style={{ color: "rgba(35, 45, 41, 0.75)" }} className="mt-3 text-sm sm:text-base">
              Mūsu komandā ir sertificētas ārstniecības personas ar regulāru starptautisku tālākizglītību un patiesu mīlestību pret savu darbu.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {specialists.map((person, idx) => (
              <div
                key={idx}
                style={{ backgroundColor: "#FAF7F2", borderColor: "rgba(35, 45, 41, 0.08)" }}
                className="flex flex-col justify-between overflow-hidden rounded-3xl border p-6 shadow-xs"
              >
                <div>
                  <div style={{ position: "relative", height: "300px", width: "100%", overflow: "hidden", borderRadius: "1rem", backgroundColor: "#EAE3D9" }}>
                    <Image
                      src={person.avatar}
                      alt={person.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 300px"
                      className="object-cover object-top"
                    />
                  </div>

                  <h3 style={{ color: "#232D29" }} className="mt-5 font-heading text-xl font-bold">
                    {person.name}
                  </h3>
                  <p style={{ color: "#C86D51" }} className="text-xs font-bold">{person.role}</p>
                  <p style={{ color: "#6E8B82" }} className="mt-1 font-mono text-[11px]">
                    {person.experience}
                  </p>

                  <div style={{ backgroundColor: "#FFFFFF", borderColor: "rgba(35, 45, 41, 0.06)", color: "#232D29" }} className="mt-4 rounded-xl border p-3.5 text-[11px] font-medium">
                    ✦ {person.specialty}
                  </div>
                </div>

                <a
                  href="#pieraksts"
                  onClick={() => setSelectedSpecialist(person.id)}
                  style={{ borderColor: "rgba(35, 45, 41, 0.2)", backgroundColor: "#FFFFFF", color: "#232D29" }}
                  className="mt-6 block text-center rounded-full border py-2.5 text-xs font-bold transition-colors hover:bg-[#232D29] hover:text-white"
                >
                  Izvēlēties laiku kalendārā →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Patient Stories & Real Condition Proof */}
      <section id="atsauksmes" style={{ backgroundColor: "#EAE3D9", borderColor: "rgba(35, 45, 41, 0.08)" }} className="border-t py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span style={{ color: "#C86D51" }} className="text-xs font-bold uppercase tracking-[0.18em]">
              Pacientu pieredze
            </span>
            <h2 style={{ color: "#232D29" }} className="mt-2 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
              Cilvēki, kuri atguvuši ikdienas kustību prieku
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {patientStories.map((story, idx) => (
              <div
                key={idx}
                style={{ backgroundColor: "#FFFFFF", borderColor: "rgba(35, 45, 41, 0.08)" }}
                className="flex flex-col justify-between rounded-3xl border p-7 shadow-xs"
              >
                <div>
                  <span style={{ color: "#C86D51" }} className="text-xs font-bold uppercase tracking-wider block">
                    {story.condition}
                  </span>
                  <p style={{ color: "rgba(35, 45, 41, 0.85)" }} className="mt-4 text-xs sm:text-sm leading-relaxed italic">
                    {story.text}
                  </p>
                </div>
                <div style={{ borderColor: "rgba(35, 45, 41, 0.08)" }} className="mt-6 border-t pt-4">
                  <strong style={{ color: "#232D29" }} className="block font-heading text-xs font-bold">
                    {story.author}
                  </strong>
                  <span style={{ color: "#6E8B82" }} className="text-[11px]">
                    {story.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Human Contact & Direct Question Form */}
      <section id="jautajumi-forma" style={{ backgroundColor: "#FFFFFF", borderColor: "rgba(35, 45, 41, 0.08)" }} className="border-t py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div>
              <span style={{ color: "#C86D51" }} className="text-xs font-bold uppercase tracking-[0.18em]">
                Saziņa un jautājumi
              </span>
              <h2 style={{ color: "#232D29" }} className="mt-2 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
                Neesat pārliecināti, ar ko sākt?
              </h2>
              <p style={{ color: "rgba(35, 45, 41, 0.78)" }} className="mt-4 text-sm leading-relaxed">
                Uzdodiet savu jautājumu šeit vai atsūtiet izmeklējuma slēdzienu. Mūsu fizioterapeite iepazīsies ar Jūsu situāciju un ieteiks piemērotāko speciālisti un rīcības virzienu.
              </p>

              <div style={{ borderColor: "rgba(35, 45, 41, 0.08)" }} className="mt-8 space-y-3 border-t pt-6 text-xs">
                <p>📞 <strong>Tālrunis:</strong> <a href="tel:+37167000000" className="hover:underline font-bold text-[#C86D51]">+371 67 000 000</a></p>
                <p>💬 <strong>WhatsApp ātrā saziņa:</strong> <a href="https://wa.me/37120000000" target="_blank" rel="noopener noreferrer" className="hover:underline font-bold text-[#C86D51]">+371 20 000 000</a></p>
                <p>📍 <strong>Adrese:</strong> Miera iela 24, Rīga (2. stāvs, pieejams lifts)</p>
              </div>
            </div>

            {/* Warm Contact Form */}
            <div style={{ backgroundColor: "#FAF7F2", borderColor: "rgba(35, 45, 41, 0.1)" }} className="rounded-3xl border p-6 sm:p-8 shadow-xs">
              {contactSubmitted ? (
                <div style={{ backgroundColor: "#EAE3D9" }} className="rounded-2xl p-6 text-center">
                  <span style={{ color: "#C86D51" }} className="text-4xl">✓</span>
                  <h3 style={{ color: "#232D29" }} className="mt-3 font-heading text-lg font-bold">
                    Paldies par Jūsu ziņu!
                  </h3>
                  <p style={{ color: "rgba(35, 45, 41, 0.8)" }} className="mt-2 text-xs">
                    Mūsu speciāliste atbildēs Jums darba laikā 15–30 minūšu laikā.
                  </p>
                  <button
                    type="button"
                    onClick={() => setContactSubmitted(false)}
                    style={{ backgroundColor: "#232D29", color: "#FAF7F2" }}
                    className="mt-4 rounded-full px-5 py-2 text-xs font-bold"
                  >
                    Nosūtīt vēl vienu ziņu
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setContactSubmitted(true);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label style={{ color: "#232D29" }} className="block text-xs font-semibold">
                      Jūsu vārds *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Anna"
                      style={{ borderColor: "rgba(35, 45, 41, 0.15)", backgroundColor: "#FFFFFF", color: "#232D29" }}
                      className="mt-1 w-full rounded-xl border px-3.5 py-2 text-sm focus:outline-hidden"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label style={{ color: "#232D29" }} className="block text-xs font-semibold">
                        Tālrunis / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+371 20 000 000"
                        style={{ borderColor: "rgba(35, 45, 41, 0.15)", backgroundColor: "#FFFFFF", color: "#232D29" }}
                        className="mt-1 w-full rounded-xl border px-3.5 py-2 text-sm focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label style={{ color: "#232D29" }} className="block text-xs font-semibold">
                        E-pasts (pēc vēlēšanās)
                      </label>
                      <input
                        type="email"
                        placeholder="anna@piemers.lv"
                        style={{ borderColor: "rgba(35, 45, 41, 0.15)", backgroundColor: "#FFFFFF", color: "#232D29" }}
                        className="mt-1 w-full rounded-xl border px-3.5 py-2 text-sm focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ color: "#232D29" }} className="block text-xs font-semibold">
                      Kas Jums sagādā vislielākās grūtības?
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Kas sāp, cik ilgi, vai ir bijusi trauma vai izmeklējumi?"
                      style={{ borderColor: "rgba(35, 45, 41, 0.15)", backgroundColor: "#FFFFFF", color: "#232D29" }}
                      className="mt-1 w-full rounded-xl border px-3.5 py-2 text-sm focus:outline-hidden"
                    />
                  </div>

                  <button
                    type="submit"
                    style={{ backgroundColor: "#C86D51", color: "#FFFFFF" }}
                    className="w-full rounded-full py-3 text-xs font-bold shadow-md transition-transform hover:-translate-y-0.5 hover:bg-[#B85C42]"
                  >
                    Nosūtīt jautājumu fizioterapeitei →
                  </button>
                  <p style={{ color: "rgba(35, 45, 41, 0.5)" }} className="text-[10px] text-center">
                    Mēs cienām Jūsu privātumu. Dati netiek nodoti trešajām personām.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Transparent Pricing Table & Insurance */}
      <section id="cenas" style={{ backgroundColor: "#F4EFEB", borderColor: "rgba(35, 45, 41, 0.08)" }} className="border-t py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center">
            <span style={{ color: "#C86D51" }} className="text-xs font-bold uppercase tracking-[0.18em]">
              Cenrādis
            </span>
            <h2 style={{ color: "#232D29" }} className="mt-2 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
              Caurspīdīgas pakalpojumu cenas
            </h2>
            <p style={{ color: "rgba(35, 45, 41, 0.75)" }} className="mt-2 text-xs">
              Visi nodarbībai nepieciešamie materiāli (teipošana, palīglīdzekļi) ir iekļauti vizītes cenā.
            </p>
          </div>

          <div style={{ backgroundColor: "#FFFFFF", borderColor: "rgba(35, 45, 41, 0.1)" }} className="mt-10 overflow-hidden rounded-3xl border shadow-xs">
            <div style={{ borderColor: "rgba(35, 45, 41, 0.08)" }} className="divide-y text-sm">
              <div className="flex items-center justify-between p-5 sm:p-6">
                <div>
                  <p style={{ color: "#232D29" }} className="font-heading font-bold">Pirmreizēja fizioterapeita konsultācija & diagnostika</p>
                  <p style={{ color: "rgba(35, 45, 41, 0.65)" }} className="text-xs">Pilna kustību pārbaude, manuālie testi, pirmā terapija un mājas plāns (60 min)</p>
                </div>
                <span style={{ color: "#232D29" }} className="font-mono text-base font-bold">50 €</span>
              </div>

              <div className="flex items-center justify-between p-5 sm:p-6">
                <div>
                  <p style={{ color: "#232D29" }} className="font-heading font-bold">Atkārtota individuālā fizioterapijas nodarbība</p>
                  <p style={{ color: "rgba(35, 45, 41, 0.65)" }} className="text-xs">Manuāla terapija un koriģējošie vingrojumi ar speciālisti (60 min)</p>
                </div>
                <span style={{ color: "#232D29" }} className="font-mono text-base font-bold">45 €</span>
              </div>

              <div className="flex items-center justify-between p-5 sm:p-6">
                <div>
                  <p style={{ color: "#232D29" }} className="font-heading font-bold">Sieviešu veselības un pēcdzemdību vizīte</p>
                  <p style={{ color: "rgba(35, 45, 41, 0.65)" }} className="text-xs">Diastāzes pārbaude, iegurņa pamatnes muskuļu atjaunošana (60 min)</p>
                </div>
                <span style={{ color: "#232D29" }} className="font-mono text-base font-bold">50 €</span>
              </div>

              <div className="flex items-center justify-between p-5 sm:p-6">
                <div>
                  <p style={{ color: "#232D29" }} className="font-heading font-bold">Zīdaiņu motorā attīstība & hendlinga apmācība</p>
                  <p style={{ color: "rgba(35, 45, 41, 0.65)" }} className="text-xs">Praktiska vecāku apmācība un mazuļa kustību harmonizācija (45 min)</p>
                </div>
                <span style={{ color: "#232D29" }} className="font-mono text-base font-bold">40 €</span>
              </div>

              <div style={{ backgroundColor: "#FAF7F2" }} className="flex items-center justify-between p-5 sm:p-6">
                <div>
                  <p style={{ color: "#C86D51" }} className="font-heading font-bold">5 nodarbību kurss (abonements)</p>
                  <p style={{ color: "rgba(35, 45, 41, 0.65)" }} className="text-xs">Derīgs 3 mēnešus no iegādes brīža (ietaupījums 25 €)</p>
                </div>
                <span style={{ color: "#C86D51" }} className="font-mono text-base font-bold">200 €</span>
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: "#FFFFFF", borderColor: "rgba(35, 45, 41, 0.08)", color: "rgba(35, 45, 41, 0.8)" }} className="mt-8 rounded-2xl border p-5 text-center text-xs">
            🛡️ <strong>Veselības apdrošināšana:</strong> Pēc vizītes izsniedzam čeku un ārstniecības personas izrakstu, ko pieņem <strong>Balta</strong>, <strong>BTA</strong>, <strong>Compensa</strong>, <strong>Ergo</strong>, <strong>Gjensidige</strong> un citas apdrošināšanas kompānijas.
          </div>
        </div>
      </section>

      {/* FAQ Accordions */}
      <section style={{ backgroundColor: "#FFFFFF", borderColor: "rgba(35, 45, 41, 0.08)" }} className="border-t py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="text-center">
            <span style={{ color: "#C86D51" }} className="text-xs font-bold uppercase tracking-[0.18em]">
              Jautājumi
            </span>
            <h2 style={{ color: "#232D29" }} className="mt-2 font-heading text-3xl font-extrabold tracking-tight">
              Biežāk uzdotie jautājumi
            </h2>
          </div>

          <div className="mt-10 space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                style={{ backgroundColor: "#FAF7F2", borderColor: "rgba(35, 45, 41, 0.08)" }}
                className="overflow-hidden rounded-2xl border"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  style={{ color: "#232D29" }}
                  className="flex w-full items-center justify-between p-5 text-left font-heading text-sm font-bold"
                >
                  <span>{faq.q}</span>
                  <span style={{ color: "#C86D51" }} className="ml-2 font-mono text-base">
                    {activeFaq === idx ? "−" : "+"}
                  </span>
                </button>
                {activeFaq === idx && (
                  <div style={{ borderColor: "rgba(35, 45, 41, 0.08)", color: "rgba(35, 45, 41, 0.78)" }} className="border-t px-5 py-4 text-xs sm:text-sm leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Contacts */}
      <footer id="kontakti" style={{ backgroundColor: "#FAF7F2", borderColor: "rgba(35, 45, 41, 0.1)", color: "#232D29" }} className="border-t py-16">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <strong style={{ color: "#232D29" }} className="font-heading text-xl font-bold">KUSTĪBA</strong>
              <p style={{ color: "#6E8B82" }} className="mt-1 text-xs">Fizioterapijas un kustību prakse</p>
              <p style={{ color: "rgba(35, 45, 41, 0.75)" }} className="mt-4 text-xs leading-relaxed">
                Miera iela 24, Rīga, LV-1001.<br />
                Ieeja no Miera ielas pagalma, 2. stāvs, pieejams ērts lifts bērnu ratiņiem un personām ar kustību ierobežojumiem.
              </p>
            </div>

            <div>
              <p style={{ color: "#6E8B82" }} className="text-xs font-bold uppercase tracking-wider">Darba laiks</p>
              <ul style={{ color: "rgba(35, 45, 41, 0.85)" }} className="mt-3 space-y-1.5 text-xs font-mono">
                <li>Pirmdiena – Piektdiena: 08:00 – 20:00</li>
                <li>Sestdiena: 09:00 – 15:00 (pēc pieraksta)</li>
                <li>Svētdiena: Slēgts</li>
              </ul>
            </div>

            <div>
              <p style={{ color: "#6E8B82" }} className="text-xs font-bold uppercase tracking-wider">Saziņa</p>
              <p className="mt-3 text-xs">
                Tālrunis: <a href="tel:+37167000000" style={{ color: "#C86D51" }} className="font-mono hover:underline font-bold">+371 67 000 000</a>
              </p>
              <p className="mt-1 text-xs">
                E-pasts: <a href="mailto:sveiki@kustiba-demo.lv" style={{ color: "#C86D51" }} className="hover:underline font-bold">sveiki@kustiba-demo.lv</a>
              </p>
              <p className="mt-1 text-xs">
                WhatsApp: <a href="https://wa.me/37120000000" style={{ color: "#C86D51" }} className="hover:underline font-bold">+371 20 000 000</a>
              </p>
            </div>
          </div>

          <div style={{ borderColor: "rgba(35, 45, 41, 0.08)", color: "rgba(35, 45, 41, 0.5)" }} className="mt-12 border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <p>© {new Date().getFullYear()} KUSTĪBA. Demonstrācijas koncepts.</p>
            <div className="flex items-center gap-4">
              <Link href="/case-studies/physiotherapy" style={{ color: "#C86D51" }} className="hover:underline font-bold">
                Lasīt Saiteo stratēģijas analīzi →
              </Link>
              <Link href="/" className="hover:underline">
                Saiteo.com
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
