"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function PhysiotherapyConceptPage() {
  // Condition triage state
  const [selectedCondition, setSelectedCondition] = useState<"spine" | "women" | "infant" | "injury">("spine");

  // Booking system state
  const [bookingSpecialist, setBookingSpecialist] = useState<string>("elina");
  const [bookingDate, setBookingDate] = useState<number>(2);
  const [bookingTime, setBookingTime] = useState<string>("11:30");
  const [bookingService, setBookingService] = useState<string>("rehab");
  const [patientName, setPatientName] = useState<string>("");
  const [patientPhone, setPatientPhone] = useState<string>("");
  const [patientEmail, setPatientEmail] = useState<string>("");
  const [patientNotes, setPatientNotes] = useState<string>("");
  const [bookingSubmitted, setBookingSubmitted] = useState<boolean>(false);

  // Direct inquiry form state
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryPhone, setInquiryPhone] = useState("");
  const [inquiryText, setInquiryText] = useState("");
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  // FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const conditions = {
    spine: {
      title: "Muguras, spranda un locītavu sāpes",
      subtitle: "Pieaugušajiem ar sēdošu darbu, diska trūcēm vai hronisku stīvumu",
      lead: "Muguras un kakla sāpes reti rodas pēkšņi — visbiežāk tās ir sekas ilgstošai sēdēšanai pie datora, nepareizai slodzes sadalei vai asimetriskam elpošanas modelim.",
      approach: "Mēs neaprobežojamies ar īslaicīgu masāžu. Nodarbībā rūpīgi novērtējam mugurkaula mobilitāti, iegurņa stabilitāti un dziļo muskuļu koordināciju, lai novērstu sāpju patieso cēloni.",
      timeline: "Ievērojams atvieglojums parasti jūtams jau pēc 1.–2. nodarbības. Ilgstošam rezultātam: 4–6 vizītes apvienojumā ar 5 minūšu mājas rituālu.",
      price: "50 € / 60 min (pirmreizēja padziļināta diagnostika un terapija)",
      image: "/concept-physio/service-rehab.jpg",
      leadSpecialist: "Elīna Vītola vai Marta Liepa",
      steps: [
        "Pilna stājas un kustību diagnostika ar funkcionālajiem testiem (20 min)",
        "Saudzīga manuālā terapija, fasciju un dziļo muskuļu atbrīvošana (30 min)",
        "Individuāls 5 minūšu koriģējošais vingrojumu plāns darba vietai un mājām (10 min)",
      ],
    },
    women: {
      title: "Sievietes ķermeņa aprūpe pirms un pēc dzemdībām",
      subtitle: "Gaidību laika atslogošana, diastāzes pārbaude un iegurņa pamatnes atjaunošana",
      lead: "Grūtniecība un dzemdības ir milzīgs pārbaudījums ķermenim. Mēs sniedzam maigu, drošu un zinātniski pamatotu atbalstu, lai Jūs justos spēcīga, stabila un mierīga par savu veselību.",
      approach: "Pēcdzemdību vizītē rūpīgi izvērtējam vēdera taisnā muskuļa šķirtni (diastāzi), iegurņa pamatnes muskulatūru un elpošanu. Palīdzam pakāpeniski atgriezties pie aktīvas ikdienas bez pārmērīga spiediena.",
      timeline: "Pēcdzemdību pārbaudi ieteicams veikt no 6. nedēļas pēc dzemdībām. Vidēji nepieciešamas 3–5 nodarbības stabilam rezultātam.",
      price: "50 € / 60 min",
      image: "/concept-physio/service-women.jpg",
      leadSpecialist: "Elīna Vītola",
      steps: [
        "Diastāzes un iegurņa pamatnes saudzīga funkcionālā novērtēšana",
        "Muguras jostas daļas atslogošana un iegurņa stabilitātes atjaunošana",
        "Droši vingrojumi mājām, ko viegli integrēt ikdienas ritmā pie mazuļa",
      ],
    },
    infant: {
      title: "Zīdaiņu motorā attīstība un hendlings",
      subtitle: "Mazuļiem no 1 mēneša vecuma, vecāku apmācība un stājas asimetriju harmonizācija",
      lead: "Pirmajos dzīves mēnešos kustību ieradumi veido pamatu visai turpmākajai attīstībai. Mūsu mērķis ir mierīgā, rotaļīgā vidē palīdzēt mazulim atvērties kustībai un iemācīt vecākiem pareizu bērna celšanu, turēšanu un ģērbšanu.",
      approach: "Nodarbības norit siltā, drošā un nesteidzīgā vidē. Mēs parādām, kā ikdienā rotaļājoties veicināt velšanos, rāpošanu un simetrisku kustību kvalitāti bez stresa un bez asarām.",
      timeline: "Bieži pietiek ar 1–2 praktiskām hendlinga nodarbībām vecākiem, lai novērstu asimetriju un iegūtu mieru.",
      price: "40 € – 45 € / 45 min",
      image: "/concept-physio/service-children.jpg",
      leadSpecialist: "Anna Ozola",
      steps: [
        "Mazuļa motorās attīstības un muskuļu tonusa saudzīgs novērtējums",
        "Praktiska hendlinga apmācība vecākiem (pareiza celšana, turēšana, ģērbšana)",
        "Ieteikumi rotaļu videi mājās, kas dabiski veicina velšanos un rāpošanu",
      ],
    },
    injury: {
      title: "Pēctraumu un pēcoperāciju rehabilitācija",
      subtitle: "Saišu plīsumi, locītavu traumas, meniska vai mugurkaula operāciju atjaunošanās",
      lead: "Pēc traumas vai operācijas ķermenim ir nepieciešams skaidrs, soli pa solim virzīts atjaunošanās ceļvedis, lai atgūtu pilnu kustību apjomu un novērstu atkārtotu traumu risku.",
      approach: "Izstrādājam individuālu rehabilitācijas protokolu, kombinējot locītavu mobilizāciju, rētaudu apstrādi, funkcionālo teipošanu un mērķtiecīgus spēka un stabilitātes vingrojumus.",
      timeline: "Atkarīgs no traumas smaguma un ārstējošā ārsta norādījumiem (parasti 4–8 nodarbību kurss).",
      price: "50 € / 60 min",
      image: "/concept-physio/service-movement.jpg",
      leadSpecialist: "Marta Liepa",
      steps: [
        "Kustību apjoma, muskuļu spēka un rētaudu novērtēšana",
        "Pakāpeniska locītavu mobilizācija un funkcionālā teipošana",
        "Progresīvs spēka un koordinācijas treniņš drošai atgriešanās gaitai",
      ],
    },
  };

  const specialists = [
    {
      id: "elina",
      name: "Elīna Vītola",
      role: "Vadošā fizioterapeite & dibinātāja",
      experience: "12 gadu klīniskā pieredze · LFA biedre",
      bio: "Elīnas pieeja apvieno padziļinātu biomehāniku ar patiesu cilvēcisku empātiju. Viņa specializējas sarežģītu muguras sāpju risināšanā un sieviešu veselības atjaunošanā pēc dzemdībām.",
      quote: "“Mans mērķis ir palīdzēt Jums atgūt uzticību savam ķermenim — bez bailēm no kustības un bez pastāvīgām sāpēm.”",
      image: "/concept-physio/practitioner-primary.jpg",
      badge: "Pieņem Pirmd., Trešd., Piektd.",
    },
    {
      id: "marta",
      name: "Marta Liepa",
      role: "Sertificēta fizioterapeite",
      experience: "8 gadu pieredze · Sporta medicīna & rehabilitācija",
      bio: "Marta palīdz cilvēkiem atgūt drošību un brīvību pēc akūtām muguras sāpēm, locītavu traumām vai operācijām. Viņas stiprā puse ir precīza kustību korekcija un praktiski vingrojumi ikdienai.",
      quote: "“Skaidra kustību tehnika un saudzīga slodzes dozēšana ļauj ķermenim ātrāk un drošāk atjaunoties.”",
      image: "/concept-physio/practitioner-2.jpg",
      badge: "Pieņem Otrd., Ceturtd., Sestd.",
    },
    {
      id: "anna",
      name: "Anna Ozola",
      role: "Bērnu fizioterapeite & hendlinga pasniedzēja",
      experience: "7 gadu pieredze · Zīdaiņu motorā attīstība",
      bio: "Anna prot radīt mierīgu, uzticamu kontaktu ar katru mazuli. Viņas nodarbībās jaunie vecāki gūst mieru, skaidrību un praktiskas iemaņas, kā ikdienā rotaļājoties veicināt mazuļa harmonisku attīstību.",
      quote: "“Mierīga, sirsnīga gaisotne nodarbībā ļauj mazulim atvērties kustībai dabiskā, drošā veidā.”",
      image: "/concept-physio/practitioner-3.jpg",
      badge: "Pieņem darba dienās pēc pieraksta",
    },
  ];

  const calendarDays = [
    { num: 1, day: "Pirmd.", full: "Pirmdiena, 1. septembris", slots: 3 },
    { num: 2, day: "Otrd.", full: "Otrdiena, 2. septembris", slots: 5 },
    { num: 3, day: "Trešd.", full: "Trešdiena, 3. septembris", slots: 4 },
    { num: 4, day: "Ceturtd.", full: "Ceturtdiena, 4. septembris", slots: 2 },
    { num: 5, day: "Piektd.", full: "Piektdiena, 5. septembris", slots: 3 },
    { num: 7, day: "Pirmd.", full: "Pirmdiena, 7. septembris", slots: 6 },
    { num: 8, day: "Otrd.", full: "Otrdiena, 8. septembris", slots: 4 },
  ];

  const times = ["08:30", "09:45", "11:00", "11:30", "14:00", "15:30", "17:00", "18:30"];

  const stories = [
    {
      quote: "Pēc sešu mēnešu ilgām muguras sāpēm pie datora Elīna 1. vizītē parādīja, ka problēma bija manā elpošanā un sēdēšanas pozā. Pēc 3 nodarbībām sāpes pilnībā atkāpās, un es beidzot atkal varu ar prieku sportot.",
      author: "Jānis Krūmiņš",
      meta: "IT projektu vadītājs (38 gadi) · Muguras jostas daļas sāpes",
    },
    {
      quote: "Pēcdzemdību vizīte pie Elīnas man deva milzīgu mieru un skaidrību. Diastāzes pārbaude un saudzīgie vingrojumi palīdzēja man atgūt stabilitātes sajūtu iegurnī bez lieka stresa pie mazā bērniņa.",
      author: "Laura Bērziņa",
      meta: "Jaunā māmiņa (31 gads) · Diastāzes un iegurņa pēcdzemdību aprūpe",
    },
    {
      quote: "Anna mūsu trīs mēnešus vecajam dēliņam palīdzēja harmonizēt plecu asimetriju un iemācīja mums hendlinga pamatprincipus. Nodarbības noritēja tik mierīgi un maigi, bez nevienas asaras.",
      author: "Kristaps un Madara",
      meta: "Vecāki · Zīdaiņa hendlings un motorā attīstība",
    },
  ];

  const faqs = [
    {
      q: "Kas man jāņem līdzi uz pirmo vizīti?",
      a: "Ērts, mīksts apģērbs, kas neierobežo kustības (t-krekls, legingi vai mīkstas bikses). Ja Jums ir iepriekš veiktie izmeklējumu slēdzieni (rentgens, magnētiskā rezonanse, USG), ņemiet tos līdzi vai nosūtiet pirms vizītes.",
    },
    {
      q: "Vai vizītei nepieciešams ārsta nosūtījums?",
      a: "Nē, privātai fizioterapeita konsultācijai ārsta nosūtījums nav obligāts. Mūsu speciālistes ir sertificētas ārstniecības personas un pašas veic padziļinātu funkcionālo novērtējumu.",
    },
    {
      q: "Vai pieņemat veselības apdrošināšanas polises?",
      a: "Jā, pēc katras vizītes izsniedzam oficiālu čeku un ārstniecības personas izrakstu ar visiem nepieciešamajiem kodiem, ko apmaksā Balta, BTA, Compensa, Ergo, Gjensidige un citas kompānijas.",
    },
    {
      q: "Kā nokļūt praksē un vai ēkā pieejams lifts?",
      a: "Prakse atrodas Rīgā, Miera ielā 24, klusā pagalma ēkas 2. stāvā. Ēkā ir ērts un plašs lifts — pie mums var ērti ierasties gan ar bērnu ratiņiem, gan personām ar kustību ierobežojumiem.",
    },
  ];

  const curCondition = conditions[selectedCondition];
  const curSpecialistObj = specialists.find((s) => s.id === bookingSpecialist) || specialists[0];
  const curDateObj = calendarDays.find((d) => d.num === bookingDate) || calendarDays[0];

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
  };

  return (
    <div style={{ backgroundColor: "#FAF7F2", color: "#1A2824" }} className="min-h-screen w-full antialiased selection:bg-[#C86248]/20 selection:text-[#1A2824]">
      {/* Schema.org Medical Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />

      {/* Top Subtle Concept Meta Bar */}
      <div style={{ backgroundColor: "#1A2824", color: "#FAF7F2" }} className="px-6 py-2.5 text-xs flex flex-wrap items-center justify-between border-b border-white/10 gap-2">
        <div className="flex items-center gap-2.5">
          <Link href="/" className="font-bold text-[#00C9A7]">saiteo</Link>
          <span className="opacity-40">|</span>
          <span className="opacity-80">Veselības aprūpes etalons: <strong>KUSTĪBA Fizioterapijas Telpa</strong> (Miera iela 24, Rīga)</span>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <Link href="/case-studies/physiotherapy" className="opacity-75 hover:opacity-100 underline decoration-white/30">
            Kāpēc šis koncepts konvertē? (Stratēģijas analīze) →
          </Link>
        </div>
      </div>

      {/* Atmospheric Studio Header */}
      <header style={{ borderColor: "rgba(26, 40, 36, 0.08)" }} className="sticky top-0 z-40 border-b bg-[#FAF7F2]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-12">
          <Link href="#top" className="group">
            <span className="font-serif text-3xl font-normal tracking-tight text-[#1A2824] block leading-none">
              Kustība
            </span>
            <span className="text-[11px] font-medium text-[#556862] block mt-1">
              Fizioterapijas, sieviešu veselības un bērnu attīstības telpa
            </span>
          </Link>

          <nav className="hidden items-center gap-9 text-sm font-medium text-[#556862] md:flex">
            <a href="#triage" className="transition-colors hover:text-[#1A2824]">Ar ko Jūs nākat?</a>
            <a href="#vizite" className="transition-colors hover:text-[#1A2824]">Vizītes gaita</a>
            <a href="#specialistes" className="transition-colors hover:text-[#1A2824]">Speciālistes</a>
            <a href="#cenas" className="transition-colors hover:text-[#1A2824]">Cenas & Apdrošināšana</a>
            <a href="#pieraksts" className="transition-colors hover:text-[#1A2824]">Pieraksts</a>
            <a href="#kontakti" className="transition-colors hover:text-[#1A2824]">Kontakti</a>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="tel:+37167000000"
              className="hidden lg:inline-block text-xs font-semibold text-[#556862] hover:text-[#1A2824]"
            >
              +371 67 000 000
            </a>
            <a
              href="#pieraksts"
              style={{ backgroundColor: "#C86248", color: "#FFFFFF" }}
              className="rounded-full px-6 py-2.5 text-xs font-semibold shadow-xs transition-transform hover:-translate-y-0.5 hover:bg-[#B7533A]"
            >
              Pieteikt vizīti
            </a>
          </div>
        </div>
      </header>

      {/* Sanctuary Hero (Empathy, Location Certainty & Direct Triage) */}
      <section id="top" className="py-20 lg:py-28 border-b border-[#1A2824]/08">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium text-[#C86248]">
                Miera iela 24, Rīga · Klusa pagalma ēka · Pieņemšana 2–3 dienu laikā
              </p>

              <h1 className="mt-4 font-serif text-4xl sm:text-6xl lg:text-[4rem] font-normal leading-[1.12] tracking-tight text-[#1A2824]">
                Ķermenis atceras visu.<br />
                Mēs palīdzam tam atkal sajusties brīvi un mierīgi.
              </h1>

              <p className="mt-7 max-w-2xl text-lg sm:text-xl font-normal leading-relaxed text-[#556862]">
                Privāta, rūpīga fizioterapijas prakse Rīgā. Mēs neaprobežojamies ar īslaicīgu masāžu — mēs veltām laiku, lai saprastu Jūsu sāpju cēloni, sakārtotu kustību modeli un atgrieztu drošības sajūtu par savu ķermeni.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-5">
                <a
                  href="#pieraksts"
                  style={{ backgroundColor: "#1A2824", color: "#FAF7F2" }}
                  className="rounded-full px-8 py-4 text-sm font-semibold shadow-sm transition-all hover:bg-[#2C3E39]"
                >
                  Izvēlēties brīvo laiku kalendārā (60 min)
                </a>
                <a
                  href="#jautajums"
                  style={{ borderColor: "rgba(26, 40, 36, 0.2)", backgroundColor: "#FFFFFF", color: "#1A2824" }}
                  className="rounded-full border px-7 py-4 text-sm font-medium transition-colors hover:bg-[#F3ECE2]"
                >
                  Uzdot jautājumu fizioterapeitei
                </a>
              </div>

              {/* Reassurance Strip */}
              <div style={{ borderColor: "rgba(26, 40, 36, 0.08)" }} className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t pt-8 text-xs text-[#556862]">
                <div>
                  <strong className="block text-[#1A2824] font-medium text-sm">60 minūtes</strong>
                  <span className="mt-0.5 block">Pilna 1-pret-1 uzmanība</span>
                </div>
                <div>
                  <strong className="block text-[#1A2824] font-medium text-sm">2–3 dienas</strong>
                  <span className="mt-0.5 block">Ātra pieņemšana bez rindas</span>
                </div>
                <div>
                  <strong className="block text-[#1A2824] font-medium text-sm">Apdrošināšana</strong>
                  <span className="mt-0.5 block">Pieņemam visas polises</span>
                </div>
                <div>
                  <strong className="block text-[#1A2824] font-medium text-sm">Ērta vide</strong>
                  <span className="mt-0.5 block">Lifts bērnu ratiņiem</span>
                </div>
              </div>
            </div>

            {/* Visual */}
            <div className="relative">
              <div style={{ position: "relative", height: "480px", width: "100%", overflow: "hidden", borderRadius: "2.5rem", backgroundColor: "#F3ECE2" }} className="shadow-md">
                <Image
                  src="/concept-physio/hero-treatment.jpg"
                  alt="Saudzīga fizioterapijas nodarbība KUSTĪBA telpā"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover"
                />
              </div>
              <div style={{ backgroundColor: "#FFFFFF", borderColor: "rgba(26, 40, 36, 0.08)" }} className="absolute -bottom-6 -left-6 hidden sm:block max-w-[280px] rounded-3xl border p-6 shadow-md">
                <p className="font-serif text-sm italic text-[#1A2824]">
                  “Sāpes nav jāpacieš un pie tām nav jāpierod.”
                </p>
                <p className="mt-2 text-xs text-[#556862]">
                  Mēs atrodam patieso iemeslu un saudzīgi atjaunojam muskuļu un locītavu sadarbību.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Condition & Symptom Triage */}
      <section id="triage" className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <p className="text-xs font-medium text-[#C86248]">
                Pašnovērtējuma ceļvedis
              </p>
              <h2 className="mt-3 font-serif text-3xl sm:text-5xl font-normal text-[#1A2824] leading-tight">
                Ar kādu jautājumu Jūs pie mums vēršaties?
              </h2>
            </div>

            {/* Dynamic Condition Selector */}
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedCondition("spine")}
                style={
                  selectedCondition === "spine"
                    ? { backgroundColor: "#1A2824", color: "#FAF7F2" }
                    : { backgroundColor: "#F3ECE2", color: "#556862" }
                }
                className="rounded-full px-6 py-3 text-xs font-semibold transition-all"
              >
                Muguras & locītavu sāpes
              </button>
              <button
                type="button"
                onClick={() => setSelectedCondition("women")}
                style={
                  selectedCondition === "women"
                    ? { backgroundColor: "#1A2824", color: "#FAF7F2" }
                    : { backgroundColor: "#F3ECE2", color: "#556862" }
                }
                className="rounded-full px-6 py-3 text-xs font-semibold transition-all"
              >
                Sievietes veselība & pēcdzemdības
              </button>
              <button
                type="button"
                onClick={() => setSelectedCondition("infant")}
                style={
                  selectedCondition === "infant"
                    ? { backgroundColor: "#1A2824", color: "#FAF7F2" }
                    : { backgroundColor: "#F3ECE2", color: "#556862" }
                }
                className="rounded-full px-6 py-3 text-xs font-semibold transition-all"
              >
                Zīdaiņi & hendlings
              </button>
              <button
                type="button"
                onClick={() => setSelectedCondition("injury")}
                style={
                  selectedCondition === "injury"
                    ? { backgroundColor: "#1A2824", color: "#FAF7F2" }
                    : { backgroundColor: "#F3ECE2", color: "#556862" }
                }
                className="rounded-full px-6 py-3 text-xs font-semibold transition-all"
              >
                Pēctraumu atjaunošanās
              </button>
            </div>
          </div>

          {/* Condition Detail Showcase */}
          <div style={{ backgroundColor: "#FFFFFF", borderColor: "rgba(26, 40, 36, 0.08)" }} className="mt-12 rounded-[2.5rem] border p-8 sm:p-14 shadow-sm">
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <span className="text-xs font-medium text-[#C86248] uppercase tracking-wider">
                  {curCondition.subtitle}
                </span>
                <h3 className="mt-2 font-serif text-3xl sm:text-4xl font-normal text-[#1A2824]">
                  {curCondition.title}
                </h3>

                <p className="mt-6 text-base leading-relaxed text-[#556862]">
                  {curCondition.lead}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-[#556862]">
                  {curCondition.approach}
                </p>

                {/* 3 Step Protocol */}
                <div className="mt-8 space-y-4 border-t border-[#1A2824]/08 pt-6">
                  {curCondition.steps.map((st, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <span className="text-[#C86248] font-serif text-base font-semibold mt-0.5">0{idx + 1}</span>
                      <p className="text-xs sm:text-sm text-[#1A2824] leading-relaxed">{st}</p>
                    </div>
                  ))}
                </div>

                <div style={{ borderColor: "rgba(26, 40, 36, 0.08)" }} className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t pt-6">
                  <div>
                    <span className="font-serif text-2xl font-normal text-[#1A2824]">{curCondition.price}</span>
                    <span className="block text-xs text-[#556862] mt-0.5">Vadošā speciāliste: {curCondition.leadSpecialist}</span>
                  </div>
                  <a
                    href="#pieraksts"
                    style={{ backgroundColor: "#C86248", color: "#FFFFFF" }}
                    className="rounded-full px-7 py-3 text-xs font-semibold shadow-xs hover:bg-[#B7533A]"
                  >
                    Pieteikties šim virzienam →
                  </a>
                </div>
              </div>

              {/* Real Daylight Photo */}
              <div style={{ position: "relative", height: "460px", width: "100%", overflow: "hidden", borderRadius: "2rem", backgroundColor: "#F3ECE2" }}>
                <Image
                  src={curCondition.image}
                  alt={curCondition.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* "Ko sagaidīt pirmajā vizītē?" (Anxiety Reducer / 60 Min Anatomy) */}
      <section id="vizite" style={{ backgroundColor: "#F3ECE2" }} className="py-20 lg:py-28 border-t border-[#1A2824]/08">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-xs font-medium text-[#C86248]">
              Pirmās vizītes ceļvedis
            </p>
            <h2 className="mt-3 font-serif text-3xl sm:text-5xl font-normal text-[#1A2824] leading-tight">
              Ko sagaidīt pirmajā 60 minūšu vizītē?
            </h2>
            <p className="mt-6 text-base leading-relaxed text-[#556862] sm:text-lg">
              Ja nekad iepriekš neesat apmeklējis fizioterapeitu, ir dabiski just nelielu satraukumu. Mūsu pieeja ir mierīga, delikāta un vērsta uz Jūsu labsajūtu no pirmās minūtes:
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-4">
            <div style={{ backgroundColor: "#FAF7F2", borderColor: "rgba(26, 40, 36, 0.08)" }} className="rounded-3xl border p-7 shadow-xs">
              <span className="font-serif text-3xl text-[#C86248]">01</span>
              <h3 className="mt-4 font-serif text-xl font-normal text-[#1A2824]">Uzklausīšana (15 min)</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#556862]">
                Izpētām slimības vēsturi, ikdienas darba slodzi, iepriekšējos izmeklējumu slēdzienus un Jūsu mērķus.
              </p>
            </div>

            <div style={{ backgroundColor: "#FAF7F2", borderColor: "rgba(26, 40, 36, 0.08)" }} className="rounded-3xl border p-7 shadow-xs">
              <span className="font-serif text-3xl text-[#C86248]">02</span>
              <h3 className="mt-4 font-serif text-xl font-normal text-[#1A2824]">Kustību analīze (15 min)</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#556862]">
                Veicam funkcionālos testus stājai, locītavu mobilitātei, muskuļu tonusam un elpošanas modelim.
              </p>
            </div>

            <div style={{ backgroundColor: "#FAF7F2", borderColor: "rgba(26, 40, 36, 0.08)" }} className="rounded-3xl border p-7 shadow-xs">
              <span className="font-serif text-3xl text-[#C86248]">03</span>
              <h3 className="mt-4 font-serif text-xl font-normal text-[#1A2824]">Manuālā terapija (20 min)</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#556862]">
                Saudzīga locītavu mobilizācija, sasprindzināto fasciju atbrīvošana un pirmie koriģējošie vingrojumi.
              </p>
            </div>

            <div style={{ backgroundColor: "#FAF7F2", borderColor: "rgba(26, 40, 36, 0.08)" }} className="rounded-3xl border p-7 shadow-xs">
              <span className="font-serif text-3xl text-[#C86248]">04</span>
              <h3 className="mt-4 font-serif text-xl font-normal text-[#1A2824]">Mājas plāns (10 min)</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#556862]">
                Jūs saņemat 2–3 konkrētus vingrojumus ikdienai un skaidru izpratni, kā novērst sāpju atgriešanos.
              </p>
            </div>
          </div>

          <div style={{ backgroundColor: "#FFFFFF", borderColor: "rgba(26, 40, 36, 0.08)" }} className="mt-12 rounded-3xl border p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-xs sm:text-sm text-[#556862]">
              👕 <strong>Ko vilkt mugurā?</strong> Ērtu sporta vai brīvā laika apģērbu (t-kreklu un legingus/šortus), kas neierobežo kustības.
            </div>
            <a
              href="#pieraksts"
              style={{ backgroundColor: "#1A2824", color: "#FAF7F2" }}
              className="rounded-full px-6 py-2.5 text-xs font-semibold whitespace-nowrap"
            >
              Pieteikt pirmo vizīti →
            </a>
          </div>
        </div>
      </section>

      {/* Specialist Team Showcase */}
      <section id="specialistes" className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-[#C86248]">
              Mūsu speciālistes
            </p>
            <h2 className="mt-3 font-serif text-3xl sm:text-5xl font-normal text-[#1A2824]">
              Ārstniecības personas, kuras iedziļinās
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#556862]">
              Sertificētas fizioterapeites ar regulāru starptautisku tālākizglītību un patiesu empātiju:
            </p>
          </div>

          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {specialists.map((person) => (
              <div
                key={person.id}
                style={{ backgroundColor: "#FFFFFF", borderColor: "rgba(26, 40, 36, 0.08)" }}
                className="flex flex-col justify-between rounded-[2rem] border p-8 shadow-xs"
              >
                <div>
                  <div style={{ position: "relative", height: "360px", width: "100%", overflow: "hidden", borderRadius: "1.5rem", backgroundColor: "#F3ECE2" }}>
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-top"
                    />
                  </div>

                  <h3 className="mt-6 font-serif text-2xl font-normal text-[#1A2824]">
                    {person.name}
                  </h3>
                  <p className="text-xs font-medium text-[#C86248] mt-0.5">{person.role}</p>
                  <p className="text-[11px] text-[#556862] mt-0.5">{person.experience}</p>

                  <p className="mt-4 text-xs sm:text-sm leading-relaxed text-[#556862]">
                    {person.bio}
                  </p>

                  <blockquote className="mt-5 border-t border-[#1A2824]/08 pt-4 text-xs italic text-[#1A2824]/85 font-serif">
                    {person.quote}
                  </blockquote>
                </div>

                <a
                  href="#pieraksts"
                  onClick={() => setBookingSpecialist(person.id)}
                  style={{ borderColor: "rgba(26, 40, 36, 0.15)", backgroundColor: "#FAF7F2", color: "#1A2824" }}
                  className="mt-8 block text-center rounded-full border py-3 text-xs font-semibold transition-colors hover:bg-[#1A2824] hover:text-[#FAF7F2]"
                >
                  Izvēlēties pieņemšanas laiku pie {person.name.split(" ")[0]}s →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Patient Recovery Case Chronicles */}
      <section className="py-20 lg:py-28 bg-[#F3ECE2] border-t border-[#1A2824]/08">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-[#C86248]">
              Pacientu pieredze
            </p>
            <h2 className="mt-3 font-serif text-3xl sm:text-5xl font-normal text-[#1A2824]">
              Cilvēki, kuri atguvuši ikdienas kustību prieku
            </h2>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {stories.map((story, idx) => (
              <div
                key={idx}
                style={{ backgroundColor: "#FAF7F2", borderColor: "rgba(26, 40, 36, 0.08)" }}
                className="flex flex-col justify-between rounded-3xl border p-8 shadow-xs"
              >
                <p className="font-serif text-base leading-relaxed italic text-[#1A2824]">
                  “{story.quote}”
                </p>
                <div style={{ borderColor: "rgba(26, 40, 36, 0.08)" }} className="mt-6 border-t pt-4">
                  <strong className="block text-xs font-semibold text-[#1A2824]">{story.author}</strong>
                  <span className="text-[11px] text-[#556862]">{story.meta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transparent Pricing & Insurance Table */}
      <section id="cenas" className="py-20 lg:py-28 border-t border-[#1A2824]/08">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="text-center">
            <p className="text-xs font-medium text-[#C86248]">
              Cenrādis
            </p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-normal text-[#1A2824]">
              Caurspīdīgas pakalpojumu cenas
            </h2>
            <p className="mt-2 text-xs text-[#556862]">
              Visi nodarbībai nepieciešamie materiāli (kinezioloģiskā teipošana, inventārs) ir iekļauti vizītes cenā.
            </p>
          </div>

          <div style={{ backgroundColor: "#FFFFFF", borderColor: "rgba(26, 40, 36, 0.08)" }} className="mt-12 overflow-hidden rounded-3xl border shadow-sm">
            <div className="divide-y divide-[#1A2824]/08 text-sm">
              <div className="flex items-center justify-between p-6 sm:p-7">
                <div>
                  <p className="font-medium text-[#1A2824]">Pirmreizēja fizioterapeita konsultācija & diagnostika</p>
                  <p className="text-xs text-[#556862] mt-0.5">Pilna kustību pārbaude, manuālie testi, pirmā terapija un mājas plāns (60 min)</p>
                </div>
                <span className="font-serif text-xl text-[#1A2824]">50 €</span>
              </div>

              <div className="flex items-center justify-between p-6 sm:p-7">
                <div>
                  <p className="font-medium text-[#1A2824]">Atkārtota individuālā fizioterapijas nodarbība</p>
                  <p className="text-xs text-[#556862] mt-0.5">Manuāla terapija un koriģējošie vingrojumi ar speciālisti (60 min)</p>
                </div>
                <span className="font-serif text-xl text-[#1A2824]">45 €</span>
              </div>

              <div className="flex items-center justify-between p-6 sm:p-7">
                <div>
                  <p className="font-medium text-[#1A2824]">Sieviešu veselības un pēcdzemdību vizīte</p>
                  <p className="text-xs text-[#556862] mt-0.5">Diastāzes pārbaude, iegurņa pamatnes muskuļu atjaunošana (60 min)</p>
                </div>
                <span className="font-serif text-xl text-[#1A2824]">50 €</span>
              </div>

              <div className="flex items-center justify-between p-6 sm:p-7">
                <div>
                  <p className="font-medium text-[#1A2824]">Zīdaiņu motorā attīstība & hendlinga apmācība</p>
                  <p className="text-xs text-[#556862] mt-0.5">Praktiska vecāku apmācība un mazuļa kustību harmonizācija (45 min)</p>
                </div>
                <span className="font-serif text-xl text-[#1A2824]">40 €</span>
              </div>

              <div style={{ backgroundColor: "#F3ECE2" }} className="flex items-center justify-between p-6 sm:p-7">
                <div>
                  <p className="font-medium text-[#C86248]">5 nodarbību kurss (abonements)</p>
                  <p className="text-xs text-[#556862] mt-0.5">Derīgs 3 mēnešus no iegādes brīža (ietaupījums 25 €)</p>
                </div>
                <span className="font-serif text-xl font-bold text-[#C86248]">200 €</span>
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: "#FFFFFF", borderColor: "rgba(26, 40, 36, 0.08)" }} className="mt-8 rounded-2xl border p-5 text-center text-xs text-[#556862]">
            Pēc katras vizītes izsniedzam čeku un ārstniecības personas izrakstu, ko pieņem <strong>Balta</strong>, <strong>BTA</strong>, <strong>Compensa</strong>, <strong>Ergo</strong>, <strong>Gjensidige</strong> un citas apdrošināšanas kompānijas.
          </div>
        </div>
      </section>

      {/* Real-Time Calendar Booking Engine */}
      <section id="pieraksts" className="py-20 lg:py-28 bg-[#F3ECE2] border-t border-[#1A2824]/08">
        <div className="mx-auto max-w-5xl px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-medium text-[#C86248]">
              Tiešsaistes pieraksts
            </p>
            <h2 className="mt-3 font-serif text-3xl sm:text-5xl font-normal text-[#1A2824]">
              Rezervējiet vizīti tiešsaistē
            </h2>
            <p className="mt-3 text-sm text-[#556862]">
              Izvēlieties speciālisti, datumu un pulksteņa laiku. Apstiprinājums uzreiz tiks nosūtīts uz Jūsu tālruni.
            </p>
          </div>

          <div style={{ backgroundColor: "#FAF7F2", borderColor: "rgba(26, 40, 36, 0.08)" }} className="mt-14 rounded-[2.5rem] border p-8 sm:p-14 shadow-sm">
            {bookingSubmitted ? (
              <div className="p-8 text-center max-w-lg mx-auto">
                <span className="font-serif text-4xl text-[#C86248]">✓</span>
                <h3 className="mt-4 font-serif text-3xl font-normal text-[#1A2824]">
                  Paldies, {patientName || "cien. pacient"}!
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[#556862]">
                  Jūsu vizīte ir veiksmīgi reģistrēta uz <strong>{curDateObj.full} plkst. {bookingTime}</strong> pie speciālistes <strong>{curSpecialistObj.name}</strong>.
                </p>
                <div style={{ backgroundColor: "#FFFFFF", borderColor: "rgba(26, 40, 36, 0.08)" }} className="mt-6 rounded-2xl border p-5 text-xs text-left">
                  <p>📍 <strong>Adrese:</strong> Rīga, Miera iela 24, 2. stāvs (pieejams ērts lifts)</p>
                  <p className="mt-1">📞 <strong>Tālrunis:</strong> +371 67 000 000</p>
                  <p className="mt-1">🔔 Atgādinājuma SMS tiks nosūtīta 24h pirms vizītes.</p>
                </div>
                <div className="mt-8 flex justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setBookingSubmitted(false);
                      setPatientName("");
                      setPatientPhone("");
                    }}
                    style={{ backgroundColor: "#1A2824", color: "#FAF7F2" }}
                    className="rounded-full px-7 py-3 text-xs font-semibold"
                  >
                    Pieteikt citu laiku
                  </button>
                  <a
                    href="https://wa.me/37120000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ backgroundColor: "#C86248", color: "#FFFFFF" }}
                    className="rounded-full px-7 py-3 text-xs font-semibold"
                  >
                    Rakstīt WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setBookingSubmitted(true); }}>
                {/* 1. Specialist Selector */}
                <div>
                  <p className="text-xs font-semibold text-[#1A2824]">1. Izvēlieties speciālisti</p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    {specialists.map((spec) => (
                      <button
                        key={spec.id}
                        type="button"
                        onClick={() => setBookingSpecialist(spec.id)}
                        style={
                          bookingSpecialist === spec.id
                            ? { backgroundColor: "#FFFFFF", borderColor: "#C86248", boxShadow: "0 4px 16px rgba(200,98,72,0.12)" }
                            : { backgroundColor: "#F3ECE2", borderColor: "rgba(26, 40, 36, 0.08)" }
                        }
                        className="flex items-center gap-3.5 rounded-2xl border p-4 text-left transition-all"
                      >
                        <div style={{ position: "relative", height: "48px", width: "48px", overflow: "hidden", borderRadius: "9999px", flexShrink: 0 }}>
                          <Image src={spec.image} alt={spec.name} fill sizes="48px" className="object-cover" />
                        </div>
                        <div>
                          <p className="font-serif text-sm text-[#1A2824]">{spec.name}</p>
                          <span className="text-[11px] text-[#C86248] font-medium block mt-0.5">{spec.badge}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Date & Time */}
                <div className="mt-10 border-t border-[#1A2824]/08 pt-8">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-[#1A2824]">2. Izvēlieties datumu un sākuma laiku (Septembris 2026)</p>
                    <span className="text-xs text-[#556862]">{curDateObj.full}</span>
                  </div>

                  <div className="mt-4 grid grid-cols-4 sm:grid-cols-7 gap-2">
                    {calendarDays.map((d) => (
                      <button
                        key={d.num}
                        type="button"
                        onClick={() => setBookingDate(d.num)}
                        style={
                          bookingDate === d.num
                            ? { backgroundColor: "#C86248", color: "#FFFFFF", borderColor: "#C86248" }
                            : { backgroundColor: "#FFFFFF", color: "#1A2824", borderColor: "rgba(26, 40, 36, 0.08)" }
                        }
                        className="rounded-2xl p-3.5 text-center border transition-all"
                      >
                        <p className="text-[11px] opacity-75">{d.day}</p>
                        <p className="font-serif text-xl font-normal mt-0.5">{d.num}</p>
                        <p className="text-[10px] opacity-75 mt-0.5">{d.slots} laiki</p>
                      </button>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {times.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setBookingTime(t)}
                        style={
                          bookingTime === t
                            ? { backgroundColor: "#1A2824", color: "#FAF7F2", borderColor: "#1A2824" }
                            : { backgroundColor: "#FFFFFF", color: "#1A2824", borderColor: "rgba(26, 40, 36, 0.08)" }
                        }
                        className="rounded-xl border px-4 py-2 font-mono text-xs font-medium transition-all"
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Patient Details Form */}
                <div className="mt-10 border-t border-[#1A2824]/08 pt-8">
                  <p className="text-xs font-semibold text-[#1A2824] mb-4">3. Jūsu kontaktinformācija</p>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-medium text-[#1A2824]">Vārds, Uzvārds *</label>
                      <input
                        type="text"
                        required
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        placeholder="Anna Bērziņa"
                        style={{ borderColor: "rgba(26, 40, 36, 0.12)", backgroundColor: "#FFFFFF", color: "#1A2824" }}
                        className="mt-1.5 w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#1A2824]">Tālruņa numurs *</label>
                      <input
                        type="tel"
                        required
                        value={patientPhone}
                        onChange={(e) => setPatientPhone(e.target.value)}
                        placeholder="+371 20 000 000"
                        style={{ borderColor: "rgba(26, 40, 36, 0.12)", backgroundColor: "#FFFFFF", color: "#1A2824" }}
                        className="mt-1.5 w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-medium text-[#1A2824]">Vizītes virziens</label>
                      <select
                        value={bookingService}
                        onChange={(e) => setBookingService(e.target.value)}
                        style={{ borderColor: "rgba(26, 40, 36, 0.12)", backgroundColor: "#FFFFFF", color: "#1A2824" }}
                        className="mt-1.5 w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-hidden"
                      >
                        <option value="rehab">Muguras, kakla vai locītavu sāpes (50 €)</option>
                        <option value="women">Sieviešu veselība & pēcdzemdību aprūpe (50 €)</option>
                        <option value="infant">Zīdaiņu attīstība & hendlings (40 €)</option>
                        <option value="injury">Pēctraumu rehabilitācija (50 €)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#1A2824]">E-pasts (atgādinājumam)</label>
                      <input
                        type="email"
                        value={patientEmail}
                        onChange={(e) => setPatientEmail(e.target.value)}
                        placeholder="anna@piemers.lv"
                        style={{ borderColor: "rgba(26, 40, 36, 0.12)", backgroundColor: "#FFFFFF", color: "#1A2824" }}
                        className="mt-1.5 w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-xs font-medium text-[#1A2824]">Kas šobrīd sagādā vislielākās grūtības? (pēc izvēles)</label>
                    <input
                      type="text"
                      value={patientNotes}
                      onChange={(e) => setPatientNotes(e.target.value)}
                      placeholder="Piem., muguras jostas daļa pēc sēdoša darba, pēcdzemdību pārbaude"
                      style={{ borderColor: "rgba(26, 40, 36, 0.12)", backgroundColor: "#FFFFFF", color: "#1A2824" }}
                      className="mt-1.5 w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-hidden"
                    />
                  </div>

                  <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[#1A2824]/08 pt-6">
                    <span className="text-xs text-[#556862]">
                      Izvēlēts: <strong>{curDateObj.full} plkst. {bookingTime}</strong> ({curSpecialistObj.name})
                    </span>
                    <button
                      type="submit"
                      style={{ backgroundColor: "#C86248", color: "#FFFFFF" }}
                      className="rounded-full px-9 py-3.5 text-sm font-semibold shadow-md transition-transform hover:-translate-y-0.5 hover:bg-[#B7533A]"
                    >
                      Apstiprināt vizītes pieteikumu →
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Direct Human Question & Inquiry Channel */}
      <section id="jautajums" className="py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-6 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <p className="text-xs font-medium text-[#C86248]">
                Saziņa un jautājumi
              </p>
              <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-normal text-[#1A2824]">
                Neesat pārliecināti, ar ko sākt?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#556862]">
                Uzdodiet savu jautājumu šeit vai uzrakstiet mums WhatsApp. Mūsu fizioterapeite iepazīsies ar Jūsu situāciju un ieteiks piemērotāko speciālisti un pirmo soli.
              </p>

              <div style={{ borderColor: "rgba(26, 40, 36, 0.08)" }} className="mt-8 space-y-3 border-t pt-6 text-xs text-[#556862]">
                <p>📞 <strong>Tālrunis:</strong> <a href="tel:+37167000000" className="text-[#1A2824] font-medium underline">+371 67 000 000</a></p>
                <p>💬 <strong>WhatsApp tiešā saziņa:</strong> <a href="https://wa.me/37120000000" target="_blank" rel="noopener noreferrer" className="text-[#C86248] font-medium underline">+371 20 000 000</a></p>
                <p>📍 <strong>Adrese:</strong> Miera iela 24, Rīga (2. stāvs, pieejams lifts)</p>
              </div>
            </div>

            <div style={{ backgroundColor: "#FFFFFF", borderColor: "rgba(26, 40, 36, 0.08)" }} className="rounded-3xl border p-8 shadow-sm">
              {inquirySubmitted ? (
                <div className="p-6 text-center">
                  <span className="font-serif text-3xl text-[#C86248]">✓</span>
                  <h3 className="mt-3 font-serif text-2xl font-normal text-[#1A2824]">Paldies par ziņu!</h3>
                  <p className="mt-2 text-xs text-[#556862]">Fizioterapeite sazināsies ar Jums darba laikā 15–30 minūšu laikā.</p>
                  <button
                    type="button"
                    onClick={() => setInquirySubmitted(false)}
                    style={{ backgroundColor: "#1A2824", color: "#FAF7F2" }}
                    className="mt-6 rounded-full px-6 py-2 text-xs font-semibold"
                  >
                    Nosūtīt vēl vienu ziņu
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setInquirySubmitted(true);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs font-medium text-[#1A2824]">Jūsu vārds *</label>
                    <input
                      type="text"
                      required
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      placeholder="Anna"
                      style={{ borderColor: "rgba(26, 40, 36, 0.12)", backgroundColor: "#FAF7F2", color: "#1A2824" }}
                      className="mt-1 w-full rounded-xl border px-3.5 py-2.5 text-sm focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#1A2824]">Tālrunis vai WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={inquiryPhone}
                      onChange={(e) => setInquiryPhone(e.target.value)}
                      placeholder="+371 20 000 000"
                      style={{ borderColor: "rgba(26, 40, 36, 0.12)", backgroundColor: "#FAF7F2", color: "#1A2824" }}
                      className="mt-1 w-full rounded-xl border px-3.5 py-2.5 text-sm focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#1A2824]">Jautājums vai situācijas apraksts</label>
                    <textarea
                      rows={3}
                      required
                      value={inquiryText}
                      onChange={(e) => setInquiryText(e.target.value)}
                      placeholder="Kas Jums rada diskomfortu, vai ir bijusi trauma vai izmeklējumi?"
                      style={{ borderColor: "rgba(26, 40, 36, 0.12)", backgroundColor: "#FAF7F2", color: "#1A2824" }}
                      className="mt-1 w-full rounded-xl border px-3.5 py-2.5 text-sm focus:outline-hidden"
                    />
                  </div>

                  <button
                    type="submit"
                    style={{ backgroundColor: "#C86248", color: "#FFFFFF" }}
                    className="w-full rounded-full py-3.5 text-xs font-semibold shadow-xs hover:bg-[#B7533A]"
                  >
                    Nosūtīt jautājumu ārstei
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordions */}
      <section className="py-20 lg:py-28 bg-[#F3ECE2] border-t border-[#1A2824]/08">
        <div className="mx-auto max-w-3xl px-6 lg:px-12">
          <div className="text-center">
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1A2824]">
              Biežāk uzdotie jautājumi
            </h2>
          </div>

          <div className="mt-12 space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                style={{ backgroundColor: "#FAF7F2", borderColor: "rgba(26, 40, 36, 0.08)" }}
                className="overflow-hidden rounded-2xl border"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="flex w-full items-center justify-between p-5 text-left font-serif text-base text-[#1A2824]"
                >
                  <span>{faq.q}</span>
                  <span className="text-[#C86248] text-lg font-mono ml-4">{openFaq === idx ? "−" : "+"}</span>
                </button>
                {openFaq === idx && (
                  <div style={{ borderColor: "rgba(26, 40, 36, 0.06)" }} className="border-t px-5 py-4 text-xs sm:text-sm leading-relaxed text-[#556862]">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Atmospheric Clinic Footer */}
      <footer id="kontakti" style={{ backgroundColor: "#FAF7F2", borderColor: "rgba(26, 40, 36, 0.08)" }} className="border-t py-16 text-[#556862]">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid gap-12 md:grid-cols-3">
            <div>
              <span className="font-serif text-2xl text-[#1A2824]">Kustība</span>
              <p className="mt-1 text-xs text-[#556862]">Fizioterapijas, sieviešu veselības un bērnu attīstības telpa</p>
              <p className="mt-4 text-xs leading-relaxed text-[#556862]">
                Miera iela 24, Rīga, LV-1001.<br />
                Ieeja no Miera ielas pagalma, 2. stāvs, pieejams ērts lifts bērnu ratiņiem un personām ar kustību ierobežojumiem.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#1A2824]">Darba laiks</p>
              <ul className="mt-3 space-y-1.5 text-xs font-mono text-[#556862]">
                <li>Pirmdiena – Piektdiena: 08:00 – 20:00</li>
                <li>Sestdiena: 09:00 – 15:00 (pēc pieraksta)</li>
                <li>Svētdiena: Slēgts</li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#1A2824]">Saziņa</p>
              <p className="mt-3 text-xs">
                Tālrunis: <a href="tel:+37167000000" className="text-[#1A2824] font-medium underline decoration-black/20">+371 67 000 000</a>
              </p>
              <p className="mt-1 text-xs">
                E-pasts: <a href="mailto:sveiki@kustiba-demo.lv" className="text-[#1A2824] font-medium underline decoration-black/20">sveiki@kustiba-demo.lv</a>
              </p>
              <p className="mt-1 text-xs">
                WhatsApp: <a href="https://wa.me/37120000000" target="_blank" rel="noopener noreferrer" className="text-[#C86248] font-medium underline decoration-[#C86248]/30">+371 20 000 000</a>
              </p>
            </div>
          </div>

          <div style={{ borderColor: "rgba(26, 40, 36, 0.08)" }} className="mt-12 border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#556862]/70">
            <p>© {new Date().getFullYear()} KUSTĪBA. Demonstrācijas koncepts.</p>
            <div className="flex items-center gap-4">
              <Link href="/case-studies/physiotherapy" className="text-[#1A2824] hover:underline font-medium">
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
