"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const easePremium = [0.22, 1, 0.36, 1] as const;

export default function PhysiotherapyCallingCardPage() {
  // Situational Recognition State
  const [activeSituation, setActiveSituation] = useState<"spine" | "women" | "infant" | "injury">("spine");

  // Booking State
  const [selectedSpecialist, setSelectedSpecialist] = useState<string>("elina");
  const [selectedDate, setSelectedDate] = useState<string>("2026-09-02");
  const [selectedTime, setSelectedTime] = useState<string>("11:30");
  const [selectedService, setSelectedService] = useState<string>("first");
  const [patientName, setPatientName] = useState<string>("");
  const [patientPhone, setPatientPhone] = useState<string>("");
  const [patientEmail, setPatientEmail] = useState<string>("");
  const [patientNote, setPatientNote] = useState<string>("");
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);

  // Direct Inquiry State
  const [inquiryName, setInquiryName] = useState<string>("");
  const [inquiryPhone, setInquiryPhone] = useState<string>("");
  const [inquiryText, setInquiryText] = useState<string>("");
  const [inquirySent, setInquirySent] = useState<boolean>(false);

  // FAQ State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Insurance Calculator State
  const [selectedInsurance, setSelectedInsurance] = useState<string>("balta");

  const specialists = [
    {
      id: "elina",
      name: "Elīna Vītola",
      role: "Vadošā fizioterapeite & prakses dibinātāja",
      experience: "12 gadu klīniskā pieredze",
      specialty: "Mugurkaula biomehānika, sieviešu veselība un pēcdzemdību aprūpe",
      education: "RSU Rehabilitācijas fakultāte · Starptautiskie DNS un Mulligan kursi",
      image: "/concept-physio/practitioner-primary.jpg",
      badge: "Pieņem Pirmd., Trešd., Piektd.",
      personalNote: "“Lielākā daļa cilvēku pie mums ienāk brīdī, kad sāpes vai nogurums jau mēnešiem ir kļuvis par ikdienas fonu. Mūsu pieeja nav ātra 15 minūšu procedūra. Mēs vispirms uzklausām, saprotam, kā Jūs elpojat un kustaties, un tikai tad saudzīgi palīdzam ķermenim atgūt dabisko balansu.”",
    },
    {
      id: "marta",
      name: "Marta Liepa",
      role: "Sertificēta fizioterapeite",
      experience: "8 gadu klīniskā pieredze",
      specialty: "Akūtas muguras sāpes, sporta un pēctraumu rehabilitācija",
      education: "RSU bakalaurs · K-Active funkcionālās teipošanas sertifikāts",
      image: "/concept-physio/practitioner-2.jpg",
      badge: "Pieņem Otrd., Ceturtd., Sestd.",
      personalNote: "“Skaidra kustību tehnika un saudzīga slodzes dozēšana ļauj locītavām un saitēm dabiski un droši atjaunoties bez bailēm par atkārtotu traumu.”",
    },
    {
      id: "anna",
      name: "Anna Ozola",
      role: "Bērnu fizioterapeite & hendlinga speciāliste",
      experience: "7 gadu pieredze mazuļu aprūpē",
      specialty: "Zīdaiņu motorā attīstība, muskuļu tonusa harmonizācija un bērnu stāja",
      education: "RSU fizioterapija · Bobath un Emmi Pikleres metodes sertifikācija",
      image: "/concept-physio/practitioner-3.jpg",
      badge: "Pieņem darba dienās pēc pieraksta",
      personalNote: "“Mierīga, silta un mīloša vide nodarbībā ļauj mazulim atvērties kustībai dabiskā, priecīgā veidā — bez stresa un bez asarām.”",
    },
  ];

  const situations = {
    spine: {
      tag: "Pieaugušajiem · Sēdošs darbs · Mugurkaula slodze",
      title: "Muguras, kakla un locītavu sāpes",
      subtitle: "Kad sēdošs darbs pie datora, diska trūce vai spranda stīvums no rīta traucē baudīt ikdienu.",
      description: "Mēs neaprobežojamies ar īslaicīgu masāžu. Nodarbībā rūpīgi novērtējam mugurkaula mobilitāti, iegurņa stabilitāti un dziļo muskuļu koordināciju, lai novērstu sāpju patieso cēloni.",
      timeline: "Atvieglojums parasti jūtams jau pēc 1.–2. nodarbības. Ilgstošam rezultātam: 3–5 nodarbības apvienojumā ar 5 minūšu ikdienas mājas rituālu.",
      price: "50 € / 60 min (pirmreizēja padziļināta diagnostika un terapija)",
      image: "/concept-physio/service-rehab.jpg",
      specialistName: "Elīna Vītola vai Marta Liepa",
    },
    women: {
      tag: "Gaidību laiks · Pēcdzemdību periods · Diastāze",
      title: "Sievietes ķermeņa aprūpe pirms un pēc dzemdībām",
      subtitle: "Maigs un zinātnisks atbalsts sievietes ķermenim pirms un pēc bērniņa nākšanas pasaulē.",
      description: "Vēdera taisnā muskuļa šķirtnes (diastāzes) izvērtēšana, iegurņa pamatnes muskuļu saudzīga nostiprināšana, elpošanas modeļa korekcija un muguras jostas daļas atslogošana.",
      timeline: "Pēcdzemdību pārbaudi ieteicams veikt no 6. nedēļas pēc dzemdībām. Vidēji nepieciešamas 3–4 vizītes stabilitātes atgūšanai.",
      price: "50 € / 60 min",
      image: "/concept-physio/service-women.jpg",
      specialistName: "Elīna Vītola",
    },
    infant: {
      tag: "Zīdaiņiem no 1 mēneša · Vecāku hendlings · Motorika",
      title: "Zīdaiņu motorā attīstība & hendlings",
      subtitle: "Praktiska un mierīga vecāku apmācība pareizā mazuļa ikdienas aprūpē.",
      description: "Kā bērnu celt, turēt, nēsāt un ģērbt, lai dabiski veicinātu velšanos, rāpošanu un simetrisku kustību koordināciju. Siltā, rotaļīgā vidē bez stresa un asarām.",
      timeline: "Parasti pietiek ar 1–2 praktiskām nodarbībām vecākiem, lai iegūtu drošību un mieru ikdienā.",
      price: "40 € / 45 min",
      image: "/concept-physio/service-children.jpg",
      specialistName: "Anna Ozola",
    },
    injury: {
      tag: "Pēc traumām · Operācijām · Saišu bojājumiem",
      title: "Pēctraumu un pēcoperāciju rehabilitācija",
      subtitle: "Mērķtiecīga kustību apjoma, spēka un stabilitātes atjaunošana.",
      description: "Soli pa solim virzīts atjaunošanās protokols pēc locītavu traumām, saišu plīsumiem, meniska vai mugurkaula operācijām ar locītavu mobilizāciju un kinezioloģisko teipošanu.",
      timeline: "Pakāpenisks 4–8 nodarbību kurss atbilstoši ārstējošā ārsta rekomendācijām.",
      price: "50 € / 60 min",
      image: "/concept-physio/service-movement.jpg",
      specialistName: "Marta Liepa",
    },
  };

  const dates = [
    { value: "2026-09-02", day: "Trešd.", full: "Trešdiena, 2. septembris", slots: 5 },
    { value: "2026-09-03", day: "Ceturtd.", full: "Ceturtdiena, 3. septembris", slots: 4 },
    { value: "2026-09-04", day: "Piektd.", full: "Piektdiena, 4. septembris", slots: 2 },
    { value: "2026-09-07", day: "Pirmd.", full: "Pirmdiena, 7. septembris", slots: 6 },
    { value: "2026-09-08", day: "Otrd.", full: "Otrdiena, 8. septembris", slots: 3 },
  ];

  const timeSlots = ["08:30", "09:45", "11:00", "11:30", "14:00", "15:30", "17:00", "18:30"];

  const stories = [
    {
      name: "Jānis Krūmiņš",
      role: "IT projektu vadītājs (38 gadi)",
      condition: "Muguras jostas daļas sāpes & sēdošs darbs",
      text: "Pēc sešu mēnešu ilgām muguras sāpēm Elīna pirmajā vizītē parādīja, ka problēma bija manā elpošanā un sēdēšanas pozā. Pēc 3 nodarbībām sāpes pilnībā atkāpās, un es atkal varu bez bailēm sportot.",
    },
    {
      name: "Laura Bērziņa",
      role: "Jaunā māmiņa (31 gads)",
      condition: "Pēcdzemdību diastāze un iegurņa nestabilitāte",
      text: "Pēcdzemdību vizīte pie Elīnas man deva milzīgu mieru un pārliecību. Saudzīgie vingrojumi palīdzēja atjaunot vēdera dziļo korseti bez lieka stresa un noguruma.",
    },
    {
      name: "Kristaps un Madara",
      role: "Vecāki",
      condition: "Zīdaiņa plecu asimetrija un hendlings",
      text: "Anna mūsu trīs mēnešus vecajam dēliņam palīdzēja novērst asimetriju un iemācīja mums praktisku hendlingu. Nodarbības noritēja tik mierīgi un maigi, bez nevienas asaras.",
    },
  ];

  const insuranceCompanies: Record<string, { name: string; coverage: string; details: string }> = {
    balta: {
      name: "Balta",
      coverage: "Līdz 100% no vizītes cenas",
      details: "Apmaksā fizikālās un rehabilitācijas medicīnas pakalpojumus, fizioterapiju un teipošanu atbilstoši Jūsu polises limitam.",
    },
    bta: {
      name: "BTA",
      coverage: "Līdz 100% no vizītes cenas",
      details: "Apmaksā sertificēta fizioterapeita konsultācijas un individuālās nodarbības pēc mūsu izsniegtā čeka un ārstniecības izraksta.",
    },
    compensa: {
      name: "Compensa Life",
      coverage: "Līdz 100% no vizītes cenas",
      details: "Pilna vai daļēja atmaksa atbilstoši ambulatorās rehabilitācijas un maksas medicīnas programmai.",
    },
    ergo: {
      name: "ERGO",
      coverage: "Līdz 100% no vizītes cenas",
      details: "Apmaksā fizioterapeita pakalpojumus un ārstniecisko vingrošanu pēc pievienotā čeka.",
    },
    gjensidige: {
      name: "Gjensidige",
      coverage: "Līdz 100% no vizītes cenas",
      details: "Apmaksā rehabilitācijas pakalpojumus un funkcionālo diagnostiku.",
    },
  };

  const faqs = [
    {
      q: "Kas man jāņem līdzi uz pirmo vizīti?",
      a: "Ērts, elastīgs apģērbs (t-krekls, legingi vai mīkstas bikses). Ja Jums ir iepriekš veiktie izmeklējumu slēdzieni (rentgens, magnētiskā rezonanse, USG), ņemiet tos līdzi vai nosūtiet pirms vizītes.",
    },
    {
      q: "Vai nepieciešams ārsta nosūtījums?",
      a: "Nē, privātai fizioterapeita konsultācijai ārsta nosūtījums nav obligāts. Mūsu speciālistes ir sertificētas ārstniecības personas un pašas veic padziļinātu funkcionālo novērtējumu.",
    },
    {
      q: "Kā notiek norēķināšanās ar veselības apdrošināšanu?",
      a: "Pēc katras vizītes mēs izsniedzam oficiālu čeku un ārstniecības personas izrakstu ar visiem nepieciešamajiem kodiem, ko Jūs iesniedzat savai apdrošināšanas kompānijai lietotnē vai e-pastā.",
    },
    {
      q: "Kā nokļūt praksē un vai ēkā pieejams lifts?",
      a: "Prakse atrodas Rīgā, Miera ielā 24, klusā pagalma ēkas 2. stāvā. Ēkā ir ērts un plašs lifts — pie mums var ērti ierasties gan ar bērnu ratiņiem, gan personām ar kustību ierobežojumiem. Pagalmā pieejama bezmaksas stāvvieta klientiem.",
    },
  ];

  const currentSituationObj = situations[activeSituation];
  const currentSpecialistObj = specialists.find((s) => s.id === selectedSpecialist) || specialists[0];
  const currentDateObj = dates.find((d) => d.value === selectedDate) || dates[0];

  const schemaJsonLd = {
    "@context": "https://schema.org",
    "@type": ["Physiotherapy", "MedicalBusiness", "LocalBusiness"],
    name: "KUSTĪBA — Fizioterapijas, Sieviešu Veselības un Bērnu Attīstības Prakse",
    description: "Specializēta fizioterapija, sieviešu veselība un zīdaiņu hendlings Rīgā, Miera ielā 24.",
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
  };

  return (
    <div
      style={{
        backgroundColor: "#FFF9F4",
        color: "#24302D",
        backgroundImage: `
          radial-gradient(circle at 15% 15%, rgba(216, 121, 103, 0.10), transparent 45%),
          radial-gradient(circle at 85% 10%, rgba(159, 184, 166, 0.16), transparent 45%),
          radial-gradient(circle at 50% 65%, rgba(244, 215, 208, 0.12), transparent 55%)
        `,
      }}
      className="min-h-screen w-full font-sans antialiased selection:bg-[#D87967]/20 selection:text-[#24302D]"
    >
      {/* Schema.org Medical Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />

      {/* Discrete Studio Calling Card Strip */}
      <div
        style={{ backgroundColor: "#24302D", color: "#FFF9F4" }}
        className="px-6 py-2 text-xs flex flex-wrap items-center justify-between gap-3 border-b border-white/10"
      >
        <div className="flex items-center gap-2.5">
          <Link href="/" className="font-bold text-[#00C9A7] tracking-tight">
            saiteo
          </Link>
          <span className="opacity-40">|</span>
          <span className="opacity-80">
            Prakses etalons: <strong>KUSTĪBA</strong> · Miera iela 24, Rīga
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <Link
            href="/case-studies/physiotherapy"
            className="opacity-75 hover:opacity-100 underline decoration-white/30"
          >
            Kāpēc šī lapa konvertē? (Stratēģijas analīze) →
          </Link>
        </div>
      </div>

      {/* Warm Ambient Header */}
      <header
        style={{ borderColor: "rgba(36, 48, 45, 0.07)" }}
        className="sticky top-0 z-40 bg-[#FFF9F4]/90 backdrop-blur-md border-b"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
          <Link href="#top" className="flex flex-col group">
            <span className="font-sans text-2xl lg:text-3xl font-medium tracking-tight text-[#24302D]">
              Kustība
            </span>
            <span className="text-[11px] font-normal text-[#5A6D67] block">
              Fizioterapijas, sieviešu veselības un bērnu attīstības telpa
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#5A6D67]">
            <a href="#atpazisana" className="transition-colors hover:text-[#24302D]">
              Kam mēs palīdzam
            </a>
            <a href="#arste" className="transition-colors hover:text-[#24302D]">
              Par pieeju
            </a>
            <a href="#vizite" className="transition-colors hover:text-[#24302D]">
              Vizītes gaita
            </a>
            <a href="#cenas" className="transition-colors hover:text-[#24302D]">
              Cenas & Apdrošināšana
            </a>
            <a href="#atsauksmes" className="transition-colors hover:text-[#24302D]">
              Pieredze
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="tel:+37167000000"
              className="hidden sm:inline-block text-xs font-medium text-[#5A6D67] hover:text-[#24302D]"
            >
              +371 67 000 000
            </a>
            <a
              href="#pieraksts"
              style={{ backgroundColor: "#D87967", color: "#FFFFFF" }}
              className="rounded-full px-5 py-2.5 text-xs font-semibold shadow-sm transition-all hover:bg-[#C26553] hover:-translate-y-0.5"
            >
              Pieteikt vizīti
            </a>
          </div>
        </div>
      </header>

      {/* 1. RECOGNITION & SANCTUARY ARRIVAL (Hero) */}
      <section id="top" className="relative pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easePremium }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-[#9FB8A6]/40 bg-[#9FB8A6]/15 px-3.5 py-1 text-xs font-medium text-[#24302D]">
                <span>📍 Miera iela 24, Rīga</span>
                <span className="opacity-40">•</span>
                <span>Pieņemšana 2–3 dienu laikā</span>
              </div>

              <h1 className="mt-5 font-sans text-4xl sm:text-5xl lg:text-[3.8rem] font-medium leading-[1.14] tracking-tight text-[#24302D]">
                Ķermenis atceras visu.<br />
                Mēs palīdzam tam atkal kustēties viegli un mierīgi.
              </h1>

              <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-[#5A6D67]">
                Privāta, rūpīga fizioterapijas prakse Rīgā. Mēs neaprobežojamies ar īslaicīgu masāžu vai formālu vingrošanu — mēs veltām laiku, lai saprastu Jūsu sāpju cēloni, sakārtotu kustību modeli un atgrieztu drošības sajūtu par savu ķermeni.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href="#pieraksts"
                  style={{ backgroundColor: "#D87967", color: "#FFFFFF" }}
                  className="rounded-full px-7 py-3.5 text-sm font-semibold shadow-sm transition-all hover:bg-[#C26553] hover:shadow-md hover:-translate-y-0.5"
                >
                  Izvēlēties brīvo laiku kalendārā (60 min)
                </a>
                <a
                  href="https://wa.me/37120000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    borderColor: "rgba(36, 48, 45, 0.15)",
                    backgroundColor: "#FFFFFF",
                    color: "#24302D",
                  }}
                  className="inline-flex items-center gap-2 rounded-full border px-6 py-3.5 text-sm font-medium transition-colors hover:bg-[#F8E9E3]/50"
                >
                  <span>Jautāt WhatsApp</span>
                </a>
              </div>

              <div
                style={{ borderColor: "rgba(36, 48, 45, 0.08)" }}
                className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t pt-6 text-xs text-[#5A6D67]"
              >
                <div>
                  <strong className="block text-[#24302D] font-semibold text-sm">60 minūtes</strong>
                  <span className="text-[11px]">1-pret-1 darbs kabinetā</span>
                </div>
                <div>
                  <strong className="block text-[#24302D] font-semibold text-sm">2–3 dienas</strong>
                  <span className="text-[11px]">Ātra pieņemšana bez rindas</span>
                </div>
                <div>
                  <strong className="block text-[#24302D] font-semibold text-sm">Apdrošināšana</strong>
                  <span className="text-[11px]">Pieņemam visas polises</span>
                </div>
                <div>
                  <strong className="block text-[#24302D] font-semibold text-sm">Ērta vide</strong>
                  <span className="text-[11px]">Lifts & stāvvieta pagalmā</span>
                </div>
              </div>
            </motion.div>

            {/* Hero Daylight Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: easePremium, delay: 0.1 }}
              className="relative"
            >
              <div
                style={{
                  borderRadius: "2.5rem 1.5rem 2.5rem 1.5rem",
                  boxShadow: "0 20px 40px -15px rgba(216, 121, 103, 0.15)",
                }}
                className="relative h-[440px] sm:h-[480px] w-full overflow-hidden bg-[#F4D7D0]/30 border border-white/80"
              >
                <Image
                  src="/concept-physio/hero-treatment.jpg"
                  alt="Mājīga un gaiša fizioterapijas nodarbība KUSTĪBA telpā"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover"
                />
              </div>

              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "rgba(36, 48, 45, 0.08)",
                  boxShadow: "0 12px 28px -8px rgba(36, 48, 45, 0.08)",
                }}
                className="absolute -bottom-6 -left-6 hidden sm:block max-w-[280px] rounded-3xl border p-5"
              >
                <p className="font-serif italic text-sm text-[#24302D]">
                  “Sāpes nav jāpacieš — pareizi izvēlēta, saudzīga kustība atgriež ķermenim dabisko spēku.”
                </p>
                <p className="mt-2 text-[11px] font-medium text-[#5A6D67]">
                  — Elīna Vītola, vadošā fizioterapeite
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. RECOGNITION: "This sounds like my situation" (Care Pathways) */}
      <section id="atpazisana" className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#D87967]">
              Kam mēs varam palīdzēt
            </span>
            <h2 className="mt-2 font-sans text-3xl sm:text-5xl font-medium text-[#24302D] leading-tight">
              Ar kādu jautājumu Jūs pie mums vēršaties?
            </h2>
            <p className="mt-3 text-base text-[#5A6D67]">
              Izvēlieties situāciju, lai uzzinātu, kā mēs varam Jums palīdzēt:
            </p>
          </div>

          {/* Organic Situation Selector Tabs */}
          <div className="mt-10 flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => setActiveSituation("spine")}
              className={`rounded-full px-6 py-3 text-xs font-semibold transition-all ${
                activeSituation === "spine"
                  ? "bg-[#24302D] text-[#FFF9F4] shadow-sm"
                  : "bg-white text-[#5A6D67] hover:bg-[#F8E9E3]/40 border border-[#24302D]/08"
              }`}
            >
              Mugura, kakls & locītavas
            </button>
            <button
              type="button"
              onClick={() => setActiveSituation("women")}
              className={`rounded-full px-6 py-3 text-xs font-semibold transition-all ${
                activeSituation === "women"
                  ? "bg-[#24302D] text-[#FFF9F4] shadow-sm"
                  : "bg-white text-[#5A6D67] hover:bg-[#F8E9E3]/40 border border-[#24302D]/08"
              }`}
            >
              Sievietes veselība & pēcdzemdības
            </button>
            <button
              type="button"
              onClick={() => setActiveSituation("infant")}
              className={`rounded-full px-6 py-3 text-xs font-semibold transition-all ${
                activeSituation === "infant"
                  ? "bg-[#24302D] text-[#FFF9F4] shadow-sm"
                  : "bg-white text-[#5A6D67] hover:bg-[#F8E9E3]/40 border border-[#24302D]/08"
              }`}
            >
              Zīdaiņu attīstība & hendlings
            </button>
            <button
              type="button"
              onClick={() => setActiveSituation("injury")}
              className={`rounded-full px-6 py-3 text-xs font-semibold transition-all ${
                activeSituation === "injury"
                  ? "bg-[#24302D] text-[#FFF9F4] shadow-sm"
                  : "bg-white text-[#5A6D67] hover:bg-[#F8E9E3]/40 border border-[#24302D]/08"
              }`}
            >
              Pēctraumu rehabilitācija
            </button>
          </div>

          {/* Active Situation Narrative */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSituation}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: easePremium }}
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "rgba(36, 48, 45, 0.08)",
                boxShadow: "0 10px 30px -10px rgba(36, 48, 45, 0.06)",
                borderRadius: "2rem",
              }}
              className="mt-8 border p-8 sm:p-12"
            >
              <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div>
                  <span className="text-xs font-semibold text-[#D87967]">
                    {currentSituationObj.tag}
                  </span>
                  <h3 className="mt-2 font-sans text-3xl sm:text-4xl font-medium text-[#24302D]">
                    {currentSituationObj.title}
                  </h3>
                  <p className="mt-2 text-base font-medium text-[#24302D]/80">
                    {currentSituationObj.subtitle}
                  </p>

                  <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#5A6D67]">
                    {currentSituationObj.description}
                  </p>

                  <div
                    style={{ backgroundColor: "#FFF9F4", borderColor: "rgba(36, 48, 45, 0.06)" }}
                    className="mt-6 space-y-2.5 rounded-2xl p-5 border text-xs sm:text-sm text-[#24302D]"
                  >
                    <p>
                      <strong>⏱️ Rezultātu dinamika:</strong> {currentSituationObj.timeline}
                    </p>
                    <p>
                      <strong>👩‍⚕️ Vadošā speciāliste:</strong> {currentSituationObj.specialistName}
                    </p>
                  </div>

                  <div
                    style={{ borderColor: "rgba(36, 48, 45, 0.08)" }}
                    className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t pt-6"
                  >
                    <div>
                      <span className="font-sans text-2xl font-semibold text-[#24302D]">
                        {currentSituationObj.price}
                      </span>
                      <span className="block text-xs text-[#5A6D67]">
                        Visi materiāli un teipošana iekļauti vizītes cenā
                      </span>
                    </div>
                    <a
                      href="#pieraksts"
                      style={{ backgroundColor: "#D87967", color: "#FFFFFF" }}
                      className="rounded-full px-7 py-3 text-xs font-semibold shadow-xs hover:bg-[#C26553]"
                    >
                      Pieteikt šo vizīti →
                    </a>
                  </div>
                </div>

                <div
                  style={{
                    borderRadius: "1.5rem",
                    overflow: "hidden",
                    backgroundColor: "#F8E9E3",
                  }}
                  className="relative h-[360px] sm:h-[400px] w-full border border-black/[0.06]"
                >
                  <Image
                    src={currentSituationObj.image}
                    alt={currentSituationObj.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 500px"
                    className="object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 3. HUMAN CONNECTION: Personal Monologue from Founder */}
      <section
        id="arste"
        style={{
          backgroundColor: "#F8E9E3",
          borderColor: "rgba(36, 48, 45, 0.08)",
        }}
        className="py-20 lg:py-28 border-y"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div
              style={{
                borderRadius: "2.5rem 1.5rem 2.5rem 1.5rem",
                overflow: "hidden",
                boxShadow: "0 16px 36px -12px rgba(216, 121, 103, 0.2)",
              }}
              className="relative h-[440px] sm:h-[500px] w-full bg-[#FFF9F4]"
            >
              <Image
                src="/concept-physio/practitioner-primary.jpg"
                alt="Elīna Vītola, prakses vadītāja un vadošā fizioterapeite"
                fill
                sizes="(max-width: 1024px) 100vw, 450px"
                className="object-cover object-top"
              />
            </div>

            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#D87967]">
                Cilvēks aiz prakses
              </span>
              <h2 className="mt-2 font-sans text-3xl sm:text-5xl font-medium text-[#24302D] leading-tight">
                Mēs nesteidzinām. Mēs uzklausām un meklējam cēloni.
              </h2>

              <p className="mt-6 text-sm sm:text-base leading-relaxed text-[#5A6D67]">
                Lielākā daļa cilvēku pie mums vēršas brīdī, kad muguras sāpes, spranda stīvums vai nogurums jau mēnešiem ir kļuvis par ikdienas fonu. Cilvēks bieži vien ir mēģinājis pretsāpju medikamentus vai vispārīgus vingrojumus no interneta, taču sāpes atgriežas.
              </p>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#5A6D67]">
                Mūsu pieejas pamatā ir izpratne par ķermeni kā vienotu sistēmu. Mēs nesteidzamies uzreiz likt vingrot — mēs vispirms analizējam, kā Jūs elpojat, kā sēžat pie sava darba galda un kādas ikdienas kustības rada pārmērīgu slodzi.
              </p>

              <blockquote
                style={{ borderLeftColor: "#D87967" }}
                className="mt-8 border-l-2 pl-5"
              >
                <p className="font-serif italic text-base sm:text-lg text-[#24302D]">
                  “Fizioterapija nav tikai vingrošana — tā ir atbrīvošanās no bailēm par savu ķermeni un atgriešanās pie kustību brīvības.”
                </p>
                <cite className="mt-2 block text-xs not-italic font-medium text-[#5A6D67]">
                  — Elīna Vītola, vadošā fizioterapeite & dibinātāja
                </cite>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* 4. REASSURANCE: Specialist Team */}
      <section id="specialistes" className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#D87967]">
              Mūsu speciālistes
            </span>
            <h2 className="mt-2 font-sans text-3xl sm:text-5xl font-medium text-[#24302D] leading-tight">
              Sertificētas ārstniecības personas, kurām var uzticēties
            </h2>
            <p className="mt-3 text-base text-[#5A6D67]">
              Katrai mūsu speciālistei ir sava padziļinātā specializācija un patiesa mīlestība pret savu darbu:
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {specialists.map((person) => (
              <div
                key={person.id}
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "rgba(36, 48, 45, 0.08)",
                  boxShadow: "0 10px 25px -8px rgba(36, 48, 45, 0.05)",
                  borderRadius: "1.75rem",
                }}
                className="flex flex-col justify-between border p-7 transition-shadow hover:shadow-md"
              >
                <div>
                  <div
                    style={{
                      borderRadius: "1.25rem",
                      overflow: "hidden",
                      backgroundColor: "#F8E9E3",
                    }}
                    className="relative h-[340px] w-full border border-black/[0.04]"
                  >
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-top"
                    />
                  </div>

                  <h3 className="mt-5 font-sans text-2xl font-medium text-[#24302D]">
                    {person.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#D87967] mt-0.5">{person.role}</p>
                  <p className="text-[11px] text-[#5A6D67] mt-0.5">{person.experience}</p>

                  <p className="mt-3 text-xs leading-relaxed text-[#5A6D67]">
                    {person.specialty}
                  </p>

                  <div
                    style={{ backgroundColor: "#FFF9F4" }}
                    className="mt-4 rounded-xl p-3 text-[11px] text-[#24302D] border border-black/[0.04]"
                  >
                    <strong>Izglītība:</strong> {person.education}
                  </div>

                  <blockquote className="mt-4 border-t border-black/[0.06] pt-3 text-xs italic text-[#24302D]/80 font-serif">
                    {person.personalNote}
                  </blockquote>
                </div>

                <a
                  href="#pieraksts"
                  onClick={() => setSelectedSpecialist(person.id)}
                  style={{
                    borderColor: "rgba(36, 48, 45, 0.15)",
                    backgroundColor: "#FFF9F4",
                    color: "#24302D",
                  }}
                  className="mt-6 block text-center rounded-full border py-2.5 text-xs font-semibold transition-colors hover:bg-[#24302D] hover:text-[#FFF9F4]"
                >
                  Izvēlēties laiku pie {person.name.split(" ")[0]}s →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CLARITY: "Ko sagaidīt pirmajā 60 minūšu vizītē?" */}
      <section
        id="vizite"
        style={{
          backgroundColor: "#E5ECE5",
          borderColor: "rgba(36, 48, 45, 0.08)",
        }}
        className="py-20 lg:py-28 border-y"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#24302D]">
              Vizītes gaita
            </span>
            <h2 className="mt-2 font-sans text-3xl sm:text-5xl font-medium text-[#24302D] leading-tight">
              Ko sagaidīt pirmajā 60 minūšu vizītē?
            </h2>
            <p className="mt-3 text-base text-[#5A6D67]">
              Ja nekad iepriekš neesat apmeklējis fizioterapeitu, ir dabiski just nelielu satraukumu. Mūsu nodarbība norit mierīgi, soli pa solim:
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "1.5rem",
                boxShadow: "0 8px 20px -6px rgba(36, 48, 45, 0.06)",
              }}
              className="p-7 border border-black/[0.04]"
            >
              <span className="font-sans text-2xl font-semibold text-[#D87967]">01</span>
              <h3 className="mt-3 font-sans text-lg font-medium text-[#24302D]">Uzklausīšana (15 min)</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#5A6D67]">
                Mēs uzklausām Jūsu sūdzības, izpētām ikdienas slodzi, izskatām iepriekšējos izmeklējumu slēdzienus un definējam Jūsu labsajūtas mērķi.
              </p>
            </div>

            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "1.5rem",
                boxShadow: "0 8px 20px -6px rgba(36, 48, 45, 0.06)",
              }}
              className="p-7 border border-black/[0.04]"
            >
              <span className="font-sans text-2xl font-semibold text-[#D87967]">02</span>
              <h3 className="mt-3 font-sans text-lg font-medium text-[#24302D]">Kustību analīze (15 min)</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#5A6D67]">
                Veicam funkcionālos testus stājai, locītavu mobilitātei, muskuļu tonusam un elpošanas modelim, lai atrastu sāpju patieso cēloni.
              </p>
            </div>

            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "1.5rem",
                boxShadow: "0 8px 20px -6px rgba(36, 48, 45, 0.06)",
              }}
              className="p-7 border border-black/[0.04]"
            >
              <span className="font-sans text-2xl font-semibold text-[#D87967]">03</span>
              <h3 className="mt-3 font-sans text-lg font-medium text-[#24302D]">Saudzīga terapija (20 min)</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#5A6D67]">
                Manuālā terapija sasprindzināto audu atbrīvošanai, locītavu mobilizācija un pirmie koriģējošie vingrojumi kabinetā speciālistes vadībā.
              </p>
            </div>

            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "1.5rem",
                boxShadow: "0 8px 20px -6px rgba(36, 48, 45, 0.06)",
              }}
              className="p-7 border border-black/[0.04]"
            >
              <span className="font-sans text-2xl font-semibold text-[#D87967]">04</span>
              <h3 className="mt-3 font-sans text-lg font-medium text-[#24302D]">Mājas plāns (10 min)</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#5A6D67]">
                Jūs saņemat 2–3 vienkāršus vingrojumus mājas videi un skaidru izpratni, kā novērst sāpju atgriešanos ikdienā.
              </p>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "rgba(36, 48, 45, 0.08)",
              borderRadius: "1.5rem",
            }}
            className="mt-10 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border"
          >
            <div className="text-xs sm:text-sm text-[#5A6D67]">
              👕 <strong>Ko vilkt mugurā?</strong> Ērtu sporta vai brīvā laika apģērbu (t-kreklu un legingus/šortus), kas neierobežo kustības.
            </div>
            <a
              href="#pieraksts"
              style={{ backgroundColor: "#24302D", color: "#FFF9F4" }}
              className="rounded-full px-6 py-2.5 text-xs font-semibold whitespace-nowrap hover:bg-[#D87967]"
            >
              Pieteikt pirmo vizīti →
            </a>
          </div>
        </div>
      </section>

      {/* 6. TRANSPARENCY: Pricing & Insurance Reimbursement */}
      <section id="cenas" className="py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#D87967]">
              Cenrādis & Apdrošināšana
            </span>
            <h2 className="mt-2 font-sans text-3xl sm:text-4xl font-medium text-[#24302D]">
              Caurspīdīgas pakalpojumu cenas
            </h2>
            <p className="mt-2 text-xs text-[#5A6D67]">
              Visi nodarbībai nepieciešamie materiāli (kinezioloģiskā teipošana, inventārs) ir iekļauti vizītes cenā.
            </p>
          </div>

          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "rgba(36, 48, 45, 0.08)",
              boxShadow: "0 10px 28px -10px rgba(36, 48, 45, 0.06)",
              borderRadius: "2rem",
            }}
            className="mt-10 overflow-hidden border"
          >
            <div className="divide-y divide-black/[0.06] text-sm">
              <div className="flex items-center justify-between p-6 sm:p-7">
                <div>
                  <p className="font-semibold text-[#24302D]">Pirmreizēja fizioterapeita konsultācija & diagnostika</p>
                  <p className="text-xs text-[#5A6D67] mt-0.5">Pilna kustību pārbaude, manuālie testi, pirmā terapija un mājas plāns (60 min)</p>
                </div>
                <span className="font-sans text-xl font-medium text-[#24302D]">50 €</span>
              </div>

              <div className="flex items-center justify-between p-6 sm:p-7">
                <div>
                  <p className="font-semibold text-[#24302D]">Atkārtota individuālā fizioterapijas nodarbība</p>
                  <p className="text-xs text-[#5A6D67] mt-0.5">Manuāla terapija un koriģējošie vingrojumi ar speciālisti (60 min)</p>
                </div>
                <span className="font-sans text-xl font-medium text-[#24302D]">45 €</span>
              </div>

              <div className="flex items-center justify-between p-6 sm:p-7">
                <div>
                  <p className="font-semibold text-[#24302D]">Sieviešu veselības un pēcdzemdību vizīte</p>
                  <p className="text-xs text-[#5A6D67] mt-0.5">Diastāzes pārbaude, iegurņa pamatnes muskuļu atjaunošana (60 min)</p>
                </div>
                <span className="font-sans text-xl font-medium text-[#24302D]">50 €</span>
              </div>

              <div className="flex items-center justify-between p-6 sm:p-7">
                <div>
                  <p className="font-semibold text-[#24302D]">Zīdaiņu motorā attīstība & hendlinga apmācība</p>
                  <p className="text-xs text-[#5A6D67] mt-0.5">Praktiska vecāku apmācība un mazuļa kustību harmonizācija (45 min)</p>
                </div>
                <span className="font-sans text-xl font-medium text-[#24302D]">40 €</span>
              </div>

              <div
                style={{ backgroundColor: "#F8E9E3" }}
                className="flex items-center justify-between p-6 sm:p-7"
              >
                <div>
                  <p className="font-semibold text-[#D87967]">5 nodarbību kurss (abonements)</p>
                  <p className="text-xs text-[#5A6D67] mt-0.5">Derīgs 3 mēnešus no iegādes brīža (ietaupījums 25 €)</p>
                </div>
                <span className="font-sans text-xl font-bold text-[#D87967]">200 €</span>
              </div>
            </div>
          </div>

          {/* Insurance Information Selector */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "rgba(36, 48, 45, 0.08)",
              borderRadius: "1.5rem",
            }}
            className="mt-8 border p-6 sm:p-8"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-[#24302D]">
              Apdrošināšanas atlīdzības saņemšana:
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {Object.keys(insuranceCompanies).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedInsurance(key)}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                    selectedInsurance === key
                      ? "bg-[#24302D] text-white"
                      : "bg-[#FFF9F4] text-[#5A6D67] border border-black/[0.08]"
                  }`}
                >
                  {insuranceCompanies[key].name}
                </button>
              ))}
            </div>

            <div
              style={{ backgroundColor: "#FFF9F4" }}
              className="mt-4 rounded-xl p-4 text-xs text-[#24302D] border border-black/[0.04]"
            >
              <p>
                <strong>{insuranceCompanies[selectedInsurance].name}:</strong> {insuranceCompanies[selectedInsurance].coverage}. {insuranceCompanies[selectedInsurance].details}
              </p>
              <p className="mt-2 text-[11px] text-[#5A6D67]">
                Pēc katras vizītes izsniedzam oficiālu čeku un ārstniecības personas izrakstu (forma 027/u).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PATIENT PROOF: Real Case Chronicles */}
      <section
        id="atsauksmes"
        style={{
          backgroundColor: "#FFF7EF",
          borderColor: "rgba(36, 48, 45, 0.08)",
        }}
        className="py-20 lg:py-28 border-y"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#D87967]">
              Pacientu pieredze
            </span>
            <h2 className="mt-2 font-sans text-3xl sm:text-5xl font-medium text-[#24302D]">
              Cilvēki, kuri atguvuši kustību brīvību
            </h2>
            <p className="mt-3 text-base text-[#5A6D67]">
              Reāli stāsti par atveseļošanos, pašsajūtas uzlabošanu un atgriešanos pie aktīvas dzīves:
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {stories.map((story, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "rgba(36, 48, 45, 0.08)",
                  boxShadow: "0 10px 24px -8px rgba(36, 48, 45, 0.05)",
                  borderRadius: "1.75rem",
                }}
                className="flex flex-col justify-between border p-8"
              >
                <p className="font-serif italic text-base leading-relaxed text-[#24302D]">
                  “{story.text}”
                </p>
                <div className="mt-6 border-t border-black/[0.06] pt-4">
                  <strong className="block text-sm font-semibold text-[#24302D]">{story.name}</strong>
                  <span className="text-xs text-[#D87967] font-medium block mt-0.5">{story.condition}</span>
                  <span className="text-[11px] text-[#5A6D67] block">{story.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. ACTION: Interactive Online Booking Engine */}
      <section id="pieraksts" className="py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#D87967]">
              Tiešsaistes pieraksts
            </span>
            <h2 className="mt-2 font-sans text-3xl sm:text-5xl font-medium text-[#24302D]">
              Rezervējiet vizīti tiešsaistē
            </h2>
            <p className="mt-2 text-sm text-[#5A6D67]">
              Izvēlieties vēlamo speciālisti, datumu un pulksteņa laiku. Apstiprinājums uzreiz tiks nosūtīts uz Jūsu tālruni.
            </p>
          </div>

          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "rgba(36, 48, 45, 0.08)",
              boxShadow: "0 16px 40px -12px rgba(36, 48, 45, 0.08)",
              borderRadius: "2rem",
            }}
            className="mt-12 border p-8 sm:p-12"
          >
            {bookingConfirmed ? (
              <div className="p-8 text-center max-w-lg mx-auto">
                <span
                  style={{ backgroundColor: "#F8E9E3", color: "#D87967" }}
                  className="inline-flex h-16 w-16 items-center justify-center rounded-full text-3xl font-serif"
                >
                  ✓
                </span>
                <h3 className="mt-4 font-sans text-3xl font-medium text-[#24302D]">
                  Paldies, {patientName || "cien. pacient"}!
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#5A6D67]">
                  Jūsu pieteikums ir veiksmīgi reģistrēts uz <strong>{currentDateObj.full} plkst. {selectedTime}</strong> pie speciālistes <strong>{currentSpecialistObj.name}</strong>.
                </p>
                <div
                  style={{ backgroundColor: "#FFF9F4", borderColor: "rgba(36, 48, 45, 0.06)" }}
                  className="mt-6 rounded-2xl p-5 text-xs text-left border"
                >
                  <p>📍 <strong>Adrese:</strong> Rīga, Miera iela 24, 2. stāvs (pieejams ērts lifts)</p>
                  <p className="mt-1">📞 <strong>Tālrunis saziņai:</strong> +371 67 000 000</p>
                  <p className="mt-1">🔔 <strong>Atgādinājums:</strong> SMS tiks nosūtīta 24h pirms vizītes.</p>
                </div>
                <div className="mt-8 flex justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setBookingConfirmed(false);
                      setPatientName("");
                      setPatientPhone("");
                    }}
                    style={{ backgroundColor: "#24302D", color: "#FFF9F4" }}
                    className="rounded-full px-7 py-3 text-xs font-semibold hover:bg-[#D87967]"
                  >
                    Pieteikt citu laiku
                  </button>
                  <a
                    href="https://wa.me/37120000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ backgroundColor: "#D87967", color: "#FFFFFF" }}
                    className="rounded-full px-7 py-3 text-xs font-semibold"
                  >
                    Rakstīt WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setBookingConfirmed(true); }}>
                {/* 1. Specialist Selector */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#24302D]">
                    1. Izvēlieties speciālisti
                  </label>
                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    {specialists.map((spec) => (
                      <button
                        key={spec.id}
                        type="button"
                        onClick={() => setSelectedSpecialist(spec.id)}
                        className={`flex items-center gap-3.5 rounded-2xl border p-4 text-left transition-all ${
                          selectedSpecialist === spec.id
                            ? "border-[#D87967] bg-[#F8E9E3]/50 shadow-xs"
                            : "border-black/[0.08] bg-[#FFF9F4] hover:bg-white"
                        }`}
                      >
                        <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-black/[0.08] bg-[#F8E9E3]">
                          <Image src={spec.image} alt={spec.name} fill sizes="48px" className="object-cover" />
                        </div>
                        <div>
                          <p className="font-sans text-sm font-medium text-[#24302D]">{spec.name}</p>
                          <span className="text-[11px] font-medium text-[#D87967] block">{spec.badge.split(" ")[0]} {spec.badge.split(" ")[1]}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Date & Time */}
                <div className="mt-8 border-t border-black/[0.06] pt-8">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#24302D]">
                      2. Izvēlieties datumu un laiku (Septembris 2026)
                    </label>
                    <span className="text-xs text-[#5A6D67]">{currentDateObj.full}</span>
                  </div>

                  <div className="mt-3 grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                    {dates.map((d) => (
                      <button
                        key={d.value}
                        type="button"
                        onClick={() => setSelectedDate(d.value)}
                        className={`rounded-2xl border p-3.5 text-center transition-all ${
                          selectedDate === d.value
                            ? "border-[#D87967] bg-[#D87967] text-white shadow-xs"
                            : "border-black/[0.08] bg-[#FFF9F4] text-[#24302D] hover:bg-white"
                        }`}
                      >
                        <p className="text-[11px] opacity-80">{d.day}</p>
                        <p className="font-sans text-lg font-medium mt-0.5">{d.full.split(" ")[1]}</p>
                        <p className="text-[10px] opacity-80 mt-0.5">{d.slots} brīvi laiki</p>
                      </button>
                    ))}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {timeSlots.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setSelectedTime(t)}
                        className={`rounded-xl border px-4 py-2 font-mono text-xs font-medium transition-all ${
                          selectedTime === t
                            ? "border-[#24302D] bg-[#24302D] text-white"
                            : "border-black/[0.08] bg-[#FFF9F4] text-[#24302D] hover:bg-white"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Patient Details Form */}
                <div className="mt-8 border-t border-black/[0.06] pt-8">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#24302D] mb-4">
                    3. Jūsu kontaktinformācija
                  </label>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-medium text-[#24302D]">Vārds, Uzvārds *</label>
                      <input
                        type="text"
                        required
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        placeholder="Anna Bērziņa"
                        className="mt-1.5 w-full rounded-xl border border-black/15 bg-[#FFF9F4] px-4 py-2.5 text-sm text-[#24302D] focus:border-[#D87967] focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#24302D]">Tālruņa numurs *</label>
                      <input
                        type="tel"
                        required
                        value={patientPhone}
                        onChange={(e) => setPatientPhone(e.target.value)}
                        placeholder="+371 20 000 000"
                        className="mt-1.5 w-full rounded-xl border border-black/15 bg-[#FFF9F4] px-4 py-2.5 text-sm text-[#24302D] focus:border-[#D87967] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-medium text-[#24302D]">Vizītes veids</label>
                      <select
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className="mt-1.5 w-full rounded-xl border border-black/15 bg-[#FFF9F4] px-4 py-2.5 text-sm text-[#24302D] focus:border-[#D87967] focus:outline-hidden"
                      >
                        <option value="first">Pirmreizēja diagnostika & terapija (50 € / 60 min)</option>
                        <option value="rehab">Atkārtota individuālā nodarbība (45 € / 60 min)</option>
                        <option value="women">Sieviešu veselība & pēcdzemdības (50 € / 60 min)</option>
                        <option value="infant">Zīdaiņu attīstība & hendlings (40 € / 45 min)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#24302D]">E-pasts (atgādinājumam)</label>
                      <input
                        type="email"
                        value={patientEmail}
                        onChange={(e) => setPatientEmail(e.target.value)}
                        placeholder="anna@piemers.lv"
                        className="mt-1.5 w-full rounded-xl border border-black/15 bg-[#FFF9F4] px-4 py-2.5 text-sm text-[#24302D] focus:border-[#D87967] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-xs font-medium text-[#24302D]">Sūdzības vai piezīmes (pēc izvēles)</label>
                    <input
                      type="text"
                      value={patientNote}
                      onChange={(e) => setPatientNote(e.target.value)}
                      placeholder="Kas šobrīd sagādā vislielākās grūtības?"
                      className="mt-1.5 w-full rounded-xl border border-black/15 bg-[#FFF9F4] px-4 py-2.5 text-sm text-[#24302D] focus:border-[#D87967] focus:outline-hidden"
                    />
                  </div>

                  <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-black/[0.06] pt-6">
                    <span className="text-xs text-[#5A6D67]">
                      Izvēlēts: <strong>{currentDateObj.full} plkst. {selectedTime}</strong> ({currentSpecialistObj.name})
                    </span>
                    <button
                      type="submit"
                      style={{ backgroundColor: "#D87967", color: "#FFFFFF" }}
                      className="rounded-full px-9 py-3.5 text-sm font-semibold shadow-md transition-all hover:bg-[#C26553] hover:shadow-lg hover:-translate-y-0.5"
                    >
                      Apstiprināt vizītes pieteikumu →
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 9. DIRECT HUMAN QUESTION: For Undecided Patients */}
      <section
        style={{
          backgroundColor: "#F4D7D0",
          borderColor: "rgba(36, 48, 45, 0.08)",
        }}
        className="py-20 lg:py-28 border-y"
      >
        <div className="mx-auto max-w-5xl px-6 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#24302D]">
                Tiešā saziņa
              </span>
              <h2 className="mt-2 font-sans text-3xl sm:text-4xl font-medium text-[#24302D]">
                Neesat pārliecināti, ar ko sākt?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#5A6D67]">
                Uzdodiet savu jautājumu šeit vai uzrakstiet mums WhatsApp. Mūsu fizioterapeite iepazīsies ar Jūsu situāciju un ieteiks piemērotāko speciālisti un pirmo soli.
              </p>

              <div className="mt-8 space-y-3 border-t border-black/[0.06] pt-6 text-xs text-[#5A6D67]">
                <p>
                  📞 <strong>Tālrunis:</strong>{" "}
                  <a href="tel:+37167000000" className="text-[#24302D] font-semibold underline">
                    +371 67 000 000
                  </a>
                </p>
                <p>
                  💬 <strong>WhatsApp saziņa:</strong>{" "}
                  <a
                    href="https://wa.me/37120000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D87967] font-semibold underline"
                  >
                    +371 20 000 000
                  </a>
                </p>
                <p>
                  📍 <strong>Adrese:</strong> Miera iela 24, Rīga (2. stāvs, pieejams lifts)
                </p>
              </div>
            </div>

            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "1.75rem",
                boxShadow: "0 10px 30px -10px rgba(36, 48, 45, 0.08)",
              }}
              className="p-8 border border-black/[0.06]"
            >
              {inquirySent ? (
                <div className="p-6 text-center">
                  <span
                    style={{ backgroundColor: "#F8E9E3", color: "#D87967" }}
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full text-2xl"
                  >
                    ✓
                  </span>
                  <h3 className="mt-3 font-sans text-2xl text-[#24302D]">Paldies par ziņu!</h3>
                  <p className="mt-2 text-xs text-[#5A6D67]">Fizioterapeite sazināsies ar Jums darba laikā 15–30 minūšu laikā.</p>
                  <button
                    type="button"
                    onClick={() => setInquirySent(false)}
                    style={{ backgroundColor: "#24302D", color: "#FFF9F4" }}
                    className="mt-5 rounded-full px-6 py-2 text-xs font-semibold"
                  >
                    Nosūtīt vēl vienu ziņu
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setInquirySent(true);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs font-medium text-[#24302D]">Jūsu vārds *</label>
                    <input
                      type="text"
                      required
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      placeholder="Anna"
                      className="mt-1 w-full rounded-xl border border-black/15 bg-[#FFF9F4] px-4 py-2.5 text-sm text-[#24302D] focus:border-[#D87967] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#24302D]">Tālrunis vai WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={inquiryPhone}
                      onChange={(e) => setInquiryPhone(e.target.value)}
                      placeholder="+371 20 000 000"
                      className="mt-1 w-full rounded-xl border border-black/15 bg-[#FFF9F4] px-4 py-2.5 text-sm text-[#24302D] focus:border-[#D87967] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#24302D]">Jautājums vai situācijas apraksts</label>
                    <textarea
                      rows={3}
                      required
                      value={inquiryText}
                      onChange={(e) => setInquiryText(e.target.value)}
                      placeholder="Kas Jums rada diskomfortu, cik ilgi, vai ir bijusi trauma vai izmeklējumi?"
                      className="mt-1 w-full rounded-xl border border-black/15 bg-[#FFF9F4] px-4 py-2.5 text-sm text-[#24302D] focus:border-[#D87967] focus:outline-hidden"
                    />
                  </div>

                  <button
                    type="submit"
                    style={{ backgroundColor: "#D87967", color: "#FFFFFF" }}
                    className="w-full rounded-full py-3.5 text-xs font-semibold shadow-xs hover:bg-[#C26553]"
                  >
                    Nosūtīt jautājumu ārstei
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 10. FAQ ACCORDIONS */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-12">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#D87967]">
              Biežāk uzdotie jautājumi
            </span>
            <h2 className="mt-2 font-sans text-3xl sm:text-4xl font-medium text-[#24302D]">
              Viss, kas jāzina pirms apmeklējuma
            </h2>
          </div>

          <div className="mt-10 space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "rgba(36, 48, 45, 0.08)",
                  borderRadius: "1.25rem",
                }}
                className="overflow-hidden border"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="flex w-full items-center justify-between p-5 text-left font-sans text-base font-medium text-[#24302D]"
                >
                  <span>{faq.q}</span>
                  <span className="text-[#D87967] text-lg font-mono ml-4">{openFaq === idx ? "−" : "+"}</span>
                </button>
                {openFaq === idx && (
                  <div className="border-t border-black/[0.06] px-5 py-4 text-xs sm:text-sm leading-relaxed text-[#5A6D67]">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WARM INTIMATE PRACTICE FOOTER */}
      <footer
        id="kontakti"
        style={{
          backgroundColor: "#FFF7EF",
          borderColor: "rgba(36, 48, 45, 0.08)",
        }}
        className="border-t py-16 text-[#5A6D67]"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid gap-12 md:grid-cols-3">
            <div>
              <span className="font-sans text-2xl font-medium text-[#24302D]">Kustība</span>
              <p className="mt-1 text-xs text-[#5A6D67]">Fizioterapijas, sieviešu veselības un bērnu attīstības telpa</p>
              <p className="mt-4 text-xs leading-relaxed text-[#5A6D67]">
                Miera iela 24, Rīga, LV-1001.<br />
                Ieeja no Miera ielas pagalma, 2. stāvs, pieejams ērts lifts bērnu ratiņiem un bezmaksas stāvvieta klientiem.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#24302D]">Darba laiks</p>
              <ul className="mt-3 space-y-1.5 text-xs font-mono text-[#5A6D67]">
                <li>Pirmdiena – Piektdiena: 08:00 – 20:00</li>
                <li>Sestdiena: 09:00 – 15:00 (pēc pieraksta)</li>
                <li>Svētdiena: Slēgts</li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#24302D]">Saziņa</p>
              <p className="mt-3 text-xs">
                Tālrunis: <a href="tel:+37167000000" className="text-[#24302D] font-semibold underline">+371 67 000 000</a>
              </p>
              <p className="mt-1 text-xs">
                E-pasts: <a href="mailto:sveiki@kustiba-demo.lv" className="text-[#24302D] font-semibold underline">sveiki@kustiba-demo.lv</a>
              </p>
              <p className="mt-1 text-xs">
                WhatsApp: <a href="https://wa.me/37120000000" target="_blank" rel="noopener noreferrer" className="text-[#D87967] font-semibold underline">+371 20 000 000</a>
              </p>
            </div>
          </div>

          <div className="mt-12 border-t border-black/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5A6D67]/70">
            <p>© {new Date().getFullYear()} KUSTĪBA. Demonstrācijas koncepts.</p>
            <div className="flex items-center gap-4">
              <Link href="/case-studies/physiotherapy" className="text-[#24302D] hover:underline font-semibold">
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
