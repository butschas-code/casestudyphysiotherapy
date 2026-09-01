"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function PhysiotherapyConceptPage() {
  // Booking state
  const [selectedSpecialist, setSelectedSpecialist] = useState<string>("elina");
  const [selectedDate, setSelectedDate] = useState<number>(2);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("11:30");
  const [selectedService, setSelectedService] = useState<string>("rehab");
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientNotes, setPatientNotes] = useState("");
  const [isBooked, setIsBooked] = useState(false);

  // Inquiries state
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const specialists = [
    {
      id: "elina",
      name: "Elīna Vītola",
      role: "Vadošā fizioterapeite & dibinātāja",
      experience: "12 gadu klīniskā pieredze",
      focus: "Mugurkaula biomehānika, sieviešu veselība un pēcdzemdību rehabilitācija",
      quote: "“Mana vēlme ir palīdzēt Jums sajust savu ķermeni droši — bez bailēm no kustības un bez pastāvīgām sāpēm.”",
      image: "/concept-physio/practitioner-primary.jpg",
      availability: "Pieejama rīt",
    },
    {
      id: "marta",
      name: "Marta Liepa",
      role: "Sertificēta fizioterapeite",
      experience: "8 gadu pieredze",
      focus: "Akūtas muguras sāpes, saišu bojājumi un pēctraumu atjaunošanās",
      quote: "“Skaidra kustību tehnika un saudzīga slodzes dozēšana dod ķermenim iespēju dabiski atjaunoties.”",
      image: "/concept-physio/practitioner-2.jpg",
      availability: "Pieejama šodien",
    },
    {
      id: "anna",
      name: "Anna Ozola",
      role: "Bērnu fizioterapeite & hendlinga speciāliste",
      experience: "7 gadu pieredze",
      focus: "Zīdaiņu motorā attīstība, muskuļu tonusa harmonizācija un bērnu stāja",
      quote: "“Mierīga, sirsnīga gaisotne kabinetā ļauj mazulim atvērties kustībai dabiskā, priecīgā veidā.”",
      image: "/concept-physio/practitioner-3.jpg",
      availability: "Pieejama 3. septembrī",
    },
  ];

  const calendarDays = [
    { num: 1, weekday: "Pirmdiena", dateStr: "1. septembris", count: 3 },
    { num: 2, weekday: "Otrdiena", dateStr: "2. septembris", count: 5 },
    { num: 3, weekday: "Trešdiena", dateStr: "3. septembris", count: 4 },
    { num: 4, weekday: "Ceturtdiena", dateStr: "4. septembris", count: 2 },
    { num: 5, weekday: "Piektdiena", dateStr: "5. septembris", count: 3 },
    { num: 7, weekday: "Pirmdiena", dateStr: "7. septembris", count: 6 },
    { num: 8, weekday: "Otrdiena", dateStr: "8. septembris", count: 4 },
  ];

  const availableSlots = {
    morning: ["08:30", "09:45", "11:00", "11:30"],
    afternoon: ["13:15", "14:30", "15:45", "16:30"],
    evening: ["17:45", "18:30", "19:15"],
  };

  const stories = [
    {
      quote: "Pēc sešu mēnešu ilgām muguras sāpēm pie datora Elīna palīdzēja saprast, kā pareizi sēdēt, elpot un atbrīvot sprandu. Pēc trim nodarbībām sāpes pilnībā atkāpās, un es beidzot atkal varu ar prieku sportot.",
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
      a: "Ērts, mīksts apģērbs, kas neierobežo kustības (t-krekls, legingi vai mīkstas bikses). Ja Jums ir iepriekš veiktie izmeklējumu slēdzieni (rentgens, magnētiskā rezonanse, USG), ņemiet tos līdzi.",
    },
    {
      q: "Vai nepieciešams ārsta nosūtījums?",
      a: "Nē, privātai fizioterapeita konsultācijai ārsta nosūtījums nav obligāts. Mūsu speciālistes ir sertificētas ārstniecības personas un pašas veic padziļinātu funkcionālo novērtējumu.",
    },
    {
      q: "Vai pieņemat veselības apdrošināšanas polises?",
      a: "Jā, pēc katras vizītes mēs izsniedzam oficiālu čeku un ārstniecības personas izrakstu ar visiem nepieciešamajiem kodiem, ko apmaksā Balta, BTA, Compensa, Ergo, Gjensidige un citas kompānijas.",
    },
    {
      q: "Kā nokļūt praksē un vai ēkā pieejams lifts?",
      a: "Prakse atrodas Rīgā, Miera ielā 24, klusā pagalma ēkas 2. stāvā. Ēkā ir ērts un plašs lifts — pie mums var ērti ierasties gan ar bērnu ratiņiem, gan personām ar kustību ierobežojumiem.",
    },
  ];

  const currentSpecialist = specialists.find((s) => s.id === selectedSpecialist) || specialists[0];
  const currentDateObj = calendarDays.find((d) => d.num === selectedDate) || calendarDays[0];

  const schemaJsonLd = {
    "@context": "https://schema.org",
    "@type": ["Physiotherapy", "MedicalBusiness", "LocalBusiness"],
    name: "KUSTĪBA — Fizioterapijas un Rehabilitācijas Prakse",
    description: "Fizioterapija, rehabilitācija, sieviešu veselība un zīdaiņu hendlings Rīgā, Miera ielā 24.",
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
    <div style={{ backgroundColor: "#FBF9F5", color: "#1A2824" }} className="min-h-screen w-full antialiased selection:bg-[#C86248]/20 selection:text-[#1A2824]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />

      {/* Subtle Studio Concept Bar */}
      <div style={{ backgroundColor: "#1A2824", color: "#FBF9F5" }} className="px-4 py-2 text-xs flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-bold text-[#00C9A7]">
            saiteo
          </Link>
          <span className="opacity-40">/</span>
          <span className="opacity-80">Neatkarīgs veselības aprūpes koncepts · KUSTĪBA</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/case-studies/physiotherapy" className="opacity-80 hover:opacity-100 underline decoration-white/30">
            Stratēģijas analīze →
          </Link>
        </div>
      </div>

      {/* Warm Restorative Clinic Header */}
      <header style={{ borderColor: "rgba(26, 40, 36, 0.08)" }} className="sticky top-0 z-40 border-b bg-[#FBF9F5]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 lg:px-8">
          <Link href="#top" className="group">
            <span className="font-serif text-2xl font-normal tracking-tight text-[#1A2824]">
              Kustība
            </span>
            <span className="block text-[11px] font-medium text-[#556862]">
              Fizioterapijas & rehabilitācijas prakse
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium text-[#556862] md:flex">
            <a href="#par-pieeju" className="transition-colors hover:text-[#1A2824]">Par pieeju</a>
            <a href="#virzieni" className="transition-colors hover:text-[#1A2824]">Virzieni</a>
            <a href="#specialistes" className="transition-colors hover:text-[#1A2824]">Speciālistes</a>
            <a href="#cenas" className="transition-colors hover:text-[#1A2824]">Cenas</a>
            <a href="#atsauksmes" className="transition-colors hover:text-[#1A2824]">Pieredze</a>
            <a href="#kontakti" className="transition-colors hover:text-[#1A2824]">Kontakti</a>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="tel:+37167000000"
              className="hidden font-medium text-xs text-[#556862] hover:text-[#1A2824] sm:inline-block"
            >
              +371 67 000 000
            </a>
            <a
              href="#pieraksts"
              style={{ backgroundColor: "#1A2824", color: "#FBF9F5" }}
              className="rounded-full px-5 py-2.5 text-xs font-semibold shadow-xs transition-colors hover:bg-[#2C3E39]"
            >
              Pieteikt vizīti
            </a>
          </div>
        </div>
      </header>

      {/* Serene Sunlit Hero Section */}
      <section id="top" className="py-16 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-xs font-medium tracking-wide text-[#556862]">
                Miera iela 24, Rīga · Pieņemšana 2–3 dienu laikā
              </p>

              <h1 className="mt-4 font-serif text-4xl font-normal leading-[1.18] tracking-tight text-[#1A2824] sm:text-5xl lg:text-[3.4rem]">
                Droša vieta, kur atgūt kustību brīvību un uzticību savam ķermenim.
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-[#556862] sm:text-lg">
                Fizioterapija un saudzīga rehabilitācija pieaugušajiem, sievietēm gaidību un pēcdzemdību laikā, kā arī zīdaiņiem pirmajos dzīves mēnešos. Rūpīga iedziļināšanās cēloņos — mājīgā vidē, bez steigas un bez virspusējiem šabloniem.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href="#pieraksts"
                  style={{ backgroundColor: "#C86248", color: "#FFFFFF" }}
                  className="rounded-full px-7 py-3.5 text-sm font-semibold shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-[#B7533A]"
                >
                  Pieteikt pirmo vizīti (60 min)
                </a>
                <a
                  href="https://wa.me/37120000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ borderColor: "rgba(26, 40, 36, 0.15)", backgroundColor: "#FFFFFF", color: "#1A2824" }}
                  className="inline-flex items-center gap-2 rounded-full border px-6 py-3.5 text-sm font-medium transition-colors hover:bg-[#F3ECE2]"
                >
                  <span>Jautāt WhatsApp</span>
                </a>
              </div>

              <div style={{ borderColor: "rgba(26, 40, 36, 0.08)" }} className="mt-12 border-t pt-6 text-xs text-[#556862] leading-relaxed">
                Klusa vide Miera ielas pagalmā · 1-pret-1 darbs kabinetā bez steigas · Pieņemam visas veselības apdrošināšanas polises
              </div>
            </div>

            <div className="relative">
              <div style={{ position: "relative", height: "420px", width: "100%", overflow: "hidden", borderRadius: "2rem", backgroundColor: "#F3ECE2" }}>
                <Image
                  src="/concept-physio/hero-treatment.jpg"
                  alt="Fizioterapijas nodarbība KUSTĪBA mājīgajā praksē"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practitioner's Personal Voice ("Kāpēc mēs strādājam citādi") */}
      <section id="par-pieeju" style={{ backgroundColor: "#F3ECE2", borderColor: "rgba(26, 40, 36, 0.08)" }} className="border-t py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div style={{ position: "relative", height: "440px", width: "100%", overflow: "hidden", borderRadius: "2rem", backgroundColor: "#E6DCCE" }}>
              <Image
                src="/concept-physio/practitioner-primary.jpg"
                alt="Elīna Vītola, prakses vadītāja un fizioterapeite"
                fill
                sizes="(max-width: 1024px) 100vw, 440px"
                className="object-cover object-top"
              />
            </div>

            <div>
              <p className="text-xs font-medium text-[#C86248]">Prakses pieeja</p>
              <h2 className="mt-2 font-serif text-3xl font-normal leading-tight text-[#1A2824] sm:text-4xl">
                Mēs nesteidzinām. Mēs uzklausām un meklējam cēloni.
              </h2>

              <p className="mt-6 text-sm leading-relaxed text-[#556862] sm:text-base">
                Lielākā daļa cilvēku pie mums vēršas brīdī, kad muguras sāpes, spranda stīvums vai nogurums jau mēnešiem ir kļuvis par ikdienas fonu. Cilvēks bieži vien ir mēģinājis pretsāpju medikamentus vai vispārīgus vingrojumus no interneta, taču sāpes atgriežas.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#556862] sm:text-base">
                Mūsu pieejas pamatā ir izpratne par ķermeni kā vienotu sistēmu. Mēs nesteidzamies uzreiz likt vingrot — mēs vispirms analizējam, kā Jūs elpojat, kā sēžat pie sava darba galda un kādas ikdienas kustības rada pārmērīgu slodzi.
              </p>

              <blockquote style={{ borderLeftColor: "#C86248" }} className="mt-8 border-l-2 pl-5">
                <p className="font-serif text-base italic text-[#1A2824]">
                  “Fizioterapija nav tikai vingrošana — tā ir atbrīvošanās no bailēm par savu ķermeni un atgriešanās pie dzīvesprieka.”
                </p>
                <cite className="mt-2 block text-xs not-italic font-medium text-[#556862]">
                  — Elīna Vītola, prakses vadītāja
                </cite>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Considered Care Pathways */}
      <section id="virzieni" className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl font-normal text-[#1A2824] sm:text-4xl">
              Kam mēs varam palīdzēt
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#556862] sm:text-base">
              Trīs specializētas aprūpes programmas, kas pielāgotas konkrētām dzīves situācijām:
            </p>
          </div>

          <div className="mt-14 space-y-12">
            {/* 1. Spine & Joint Rehab */}
            <div style={{ backgroundColor: "#FFFFFF", borderColor: "rgba(26, 40, 36, 0.08)" }} className="grid gap-8 overflow-hidden rounded-3xl border p-8 sm:p-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <span className="text-xs font-medium text-[#C86248]">Pieaugušajiem · Sēdošs darbs · Rehabilitācija</span>
                <h3 className="mt-2 font-serif text-2xl font-normal text-[#1A2824] sm:text-3xl">
                  Muguras, kakla un locītavu sāpes
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[#556862]">
                  Padziļināta kustību un stājas diagnostika, saudzīga manuālā terapija un mērķtiecīgi koriģējošie vingrojumi, lai novērstu sāpju patieso cēloni.
                </p>
                <ul className="mt-6 space-y-2 text-xs sm:text-sm text-[#1A2824]">
                  <li className="flex items-center gap-2.5">
                    <span className="text-[#C86248] font-bold">―</span>
                    <span>Pilna 60 minūšu primārā funkcionālā apskate un testēšana</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="text-[#C86248] font-bold">―</span>
                    <span>Saudzīgs manuāls darbs un sasprindzināto audu atbrīvošana</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="text-[#C86248] font-bold">―</span>
                    <span>3 vienkārši vingrojumi mājas videi (5 minūtes dienā)</span>
                  </li>
                </ul>

                <div style={{ borderColor: "rgba(26, 40, 36, 0.08)" }} className="mt-8 flex items-center justify-between border-t pt-6">
                  <span className="font-serif text-lg text-[#1A2824]">50 € / 60 min</span>
                  <a
                    href="#pieraksts"
                    onClick={() => setSelectedService("rehab")}
                    style={{ backgroundColor: "#1A2824", color: "#FBF9F5" }}
                    className="rounded-full px-6 py-2.5 text-xs font-semibold hover:bg-[#C86248]"
                  >
                    Pieteikt šo vizīti →
                  </a>
                </div>
              </div>

              <div style={{ position: "relative", height: "340px", width: "100%", overflow: "hidden", borderRadius: "1.5rem", backgroundColor: "#F3ECE2" }}>
                <Image
                  src="/concept-physio/service-rehab.jpg"
                  alt="Muguras un locītavu terapija"
                  fill
                  sizes="(max-width: 1024px) 100vw, 450px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* 2. Women's Health & Postpartum */}
            <div style={{ backgroundColor: "#FFFFFF", borderColor: "rgba(26, 40, 36, 0.08)" }} className="grid gap-8 overflow-hidden rounded-3xl border p-8 sm:p-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div className="order-2 lg:order-1" style={{ position: "relative", height: "340px", width: "100%", overflow: "hidden", borderRadius: "1.5rem", backgroundColor: "#F3ECE2" }}>
                <Image
                  src="/concept-physio/service-women.jpg"
                  alt="Sieviešu veselība un pēcdzemdību atjaunošanās"
                  fill
                  sizes="(max-width: 1024px) 100vw, 450px"
                  className="object-cover"
                />
              </div>

              <div className="order-1 lg:order-2">
                <span className="text-xs font-medium text-[#C86248]">Gaidību laiks · Diastāze · Iegurņa veselība</span>
                <h3 className="mt-2 font-serif text-2xl font-normal text-[#1A2824] sm:text-3xl">
                  Sieviešu veselība un pēcdzemdību aprūpe
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[#556862]">
                  Maigs, zinātniski pamatots atbalsts sievietes ķermenim pirms un pēc bērniņa piedzimšanas. Vēdera taisnā muskuļa diastāzes pārbaude un iegurņa pamatnes muskulatūras saudzīga nostiprināšana.
                </p>
                <ul className="mt-6 space-y-2 text-xs sm:text-sm text-[#1A2824]">
                  <li className="flex items-center gap-2.5">
                    <span className="text-[#C86248] font-bold">―</span>
                    <span>Pēcdzemdību funkcionālā pārbaude no 6. nedēļas pēc dzemdībām</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="text-[#C86248] font-bold">―</span>
                    <span>Diastāzes un iegurņa pamatnes muskuļu saudzīga korekcija</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="text-[#C86248] font-bold">―</span>
                    <span>Droša, pakāpeniska atgriešanās pie fiziskajām aktivitātēm</span>
                  </li>
                </ul>

                <div style={{ borderColor: "rgba(26, 40, 36, 0.08)" }} className="mt-8 flex items-center justify-between border-t pt-6">
                  <span className="font-serif text-lg text-[#1A2824]">50 € / 60 min</span>
                  <a
                    href="#pieraksts"
                    onClick={() => setSelectedService("women")}
                    style={{ backgroundColor: "#1A2824", color: "#FBF9F5" }}
                    className="rounded-full px-6 py-2.5 text-xs font-semibold hover:bg-[#C86248]"
                  >
                    Pieteikt šo vizīti →
                  </a>
                </div>
              </div>
            </div>

            {/* 3. Infant Handling & Development */}
            <div style={{ backgroundColor: "#FFFFFF", borderColor: "rgba(26, 40, 36, 0.08)" }} className="grid gap-8 overflow-hidden rounded-3xl border p-8 sm:p-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <span className="text-xs font-medium text-[#C86248]">Zīdaiņiem no 1 mēneša · Bērniem · Hendlings</span>
                <h3 className="mt-2 font-serif text-2xl font-normal text-[#1A2824] sm:text-3xl">
                  Zīdaiņu motorā attīstība un hendlings
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[#556862]">
                  Praktiska apmācība pareizā hendlingā — kā mazuli celt, turēt un ģērbt, lai dabiski veicinātu velšanos, rāpošanu un simetrisku kustību attīstību bez asarām.
                </p>
                <ul className="mt-6 space-y-2 text-xs sm:text-sm text-[#1A2824]">
                  <li className="flex items-center gap-2.5">
                    <span className="text-[#C86248] font-bold">―</span>
                    <span>Zīdaiņa motorās attīstības un muskuļu tonusa novērtēšana</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="text-[#C86248] font-bold">―</span>
                    <span>Praktiska hendlinga apmācība vecākiem ikdienas aprūpei</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="text-[#C86248] font-bold">―</span>
                    <span>Stājas un pēdu asimetriju profilakse pirmsskolas vecuma bērniem</span>
                  </li>
                </ul>

                <div style={{ borderColor: "rgba(26, 40, 36, 0.08)" }} className="mt-8 flex items-center justify-between border-t pt-6">
                  <span className="font-serif text-lg text-[#1A2824]">40 € – 45 € / 45 min</span>
                  <a
                    href="#pieraksts"
                    onClick={() => setSelectedService("children")}
                    style={{ backgroundColor: "#1A2824", color: "#FBF9F5" }}
                    className="rounded-full px-6 py-2.5 text-xs font-semibold hover:bg-[#C86248]"
                  >
                    Pieteikt šo vizīti →
                  </a>
                </div>
              </div>

              <div style={{ position: "relative", height: "340px", width: "100%", overflow: "hidden", borderRadius: "1.5rem", backgroundColor: "#F3ECE2" }}>
                <Image
                  src="/concept-physio/service-children.jpg"
                  alt="Zīdaiņu hendlings un attīstība"
                  fill
                  sizes="(max-width: 1024px) 100vw, 450px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialist Team (Warm Dignified Portraits) */}
      <section id="specialistes" style={{ backgroundColor: "#F3ECE2", borderColor: "rgba(26, 40, 36, 0.08)" }} className="border-t py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl font-normal text-[#1A2824] sm:text-4xl">
              Mūsu speciālistes
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#556862] sm:text-base">
              Sertificētas ārstniecības personas ar regulāru starptautisku tālākizglītību un patiesu mīlestību pret savu darbu:
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {specialists.map((person) => (
              <div
                key={person.id}
                style={{ backgroundColor: "#FBF9F5", borderColor: "rgba(26, 40, 36, 0.08)" }}
                className="flex flex-col justify-between overflow-hidden rounded-3xl border p-7 shadow-xs"
              >
                <div>
                  <div style={{ position: "relative", height: "320px", width: "100%", overflow: "hidden", borderRadius: "1.25rem", backgroundColor: "#E6DCCE" }}>
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-top"
                    />
                  </div>

                  <h3 className="mt-5 font-serif text-xl font-normal text-[#1A2824]">
                    {person.name}
                  </h3>
                  <p className="text-xs font-medium text-[#C86248]">{person.role}</p>
                  <p className="mt-0.5 text-[11px] text-[#556862]">{person.experience}</p>

                  <p className="mt-3 text-xs leading-relaxed text-[#556862]">
                    {person.focus}
                  </p>

                  <blockquote className="mt-4 border-t border-[#1A2824]/08 pt-3 text-xs italic text-[#1A2824]/80">
                    {person.quote}
                  </blockquote>
                </div>

                <a
                  href="#pieraksts"
                  onClick={() => setSelectedSpecialist(person.id)}
                  style={{ borderColor: "rgba(26, 40, 36, 0.15)", backgroundColor: "#FFFFFF", color: "#1A2824" }}
                  className="mt-6 block text-center rounded-full border py-2.5 text-xs font-semibold transition-colors hover:bg-[#1A2824] hover:text-[#FBF9F5]"
                >
                  Pieteikt vizīti pie {person.name.split(" ")[0]}s →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Patient Experience Stories */}
      <section id="atsauksmes" className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl font-normal text-[#1A2824] sm:text-4xl">
              Cilvēki, kuri atguvuši kustību brīvību
            </h2>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {stories.map((item, idx) => (
              <div
                key={idx}
                style={{ backgroundColor: "#FFFFFF", borderColor: "rgba(26, 40, 36, 0.08)" }}
                className="flex flex-col justify-between rounded-3xl border p-8 shadow-xs"
              >
                <blockquote className="font-serif text-sm leading-relaxed text-[#1A2824] italic">
                  “{item.quote}”
                </blockquote>
                <div style={{ borderColor: "rgba(26, 40, 36, 0.08)" }} className="mt-6 border-t pt-4">
                  <strong className="block text-xs font-semibold text-[#1A2824]">{item.author}</strong>
                  <span className="text-[11px] text-[#556862]">{item.meta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transparent Pricing Table */}
      <section id="cenas" style={{ backgroundColor: "#F3ECE2", borderColor: "rgba(26, 40, 36, 0.08)" }} className="border-t py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-serif text-3xl font-normal text-[#1A2824] sm:text-4xl">
              Caurspīdīgs cenrādis
            </h2>
            <p className="mt-2 text-xs text-[#556862]">
              Visi vizītei nepieciešamie materiāli (teipi, inventārs) ir iekļauti cenā.
            </p>
          </div>

          <div style={{ backgroundColor: "#FBF9F5", borderColor: "rgba(26, 40, 36, 0.08)" }} className="mt-10 overflow-hidden rounded-3xl border shadow-xs">
            <div className="divide-y divide-[#1A2824]/08 text-sm">
              <div className="flex items-center justify-between p-6">
                <div>
                  <p className="font-medium text-[#1A2824]">Pirmreizēja fizioterapeita konsultācija & diagnostika</p>
                  <p className="text-xs text-[#556862]">Pilna kustību pārbaude, testi, pirmā terapija un mājas plāns (60 min)</p>
                </div>
                <span className="font-serif text-lg text-[#1A2824]">50 €</span>
              </div>

              <div className="flex items-center justify-between p-6">
                <div>
                  <p className="font-medium text-[#1A2824]">Atkārtota individuālā fizioterapijas nodarbība</p>
                  <p className="text-xs text-[#556862]">Manuāla terapija un koriģējošie vingrojumi ar speciālisti (60 min)</p>
                </div>
                <span className="font-serif text-lg text-[#1A2824]">45 €</span>
              </div>

              <div className="flex items-center justify-between p-6">
                <div>
                  <p className="font-medium text-[#1A2824]">Sieviešu veselības un pēcdzemdību vizīte</p>
                  <p className="text-xs text-[#556862]">Diastāzes pārbaude, iegurņa pamatnes muskuļu atjaunošana (60 min)</p>
                </div>
                <span className="font-serif text-lg text-[#1A2824]">50 €</span>
              </div>

              <div className="flex items-center justify-between p-6">
                <div>
                  <p className="font-medium text-[#1A2824]">Zīdaiņu motorā attīstība & hendlinga apmācība</p>
                  <p className="text-xs text-[#556862]">Praktiska vecāku apmācība un mazuļa kustību harmonizācija (45 min)</p>
                </div>
                <span className="font-serif text-lg text-[#1A2824]">40 €</span>
              </div>

              <div style={{ backgroundColor: "#FFFFFF" }} className="flex items-center justify-between p-6">
                <div>
                  <p className="font-medium text-[#C86248]">5 nodarbību kurss (abonements)</p>
                  <p className="text-xs text-[#556862]">Derīgs 3 mēnešus no iegādes brīža (ietaupījums 25 €)</p>
                </div>
                <span className="font-serif text-lg font-bold text-[#C86248]">200 €</span>
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: "#FFFFFF", borderColor: "rgba(26, 40, 36, 0.08)" }} className="mt-8 rounded-2xl border p-5 text-center text-xs text-[#556862]">
            Pēc katras vizītes izsniedzam čeku un ārstniecības personas izrakstu, ko pieņem <strong>Balta</strong>, <strong>BTA</strong>, <strong>Compensa</strong>, <strong>Ergo</strong>, <strong>Gjensidige</strong> un citas apdrošināšanas kompānijas.
          </div>
        </div>
      </section>

      {/* Online Booking & Direct Question Intake (High-Craft Dual Conversion) */}
      <section id="pieraksts" className="py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl font-normal text-[#1A2824] sm:text-4xl">
              Rezervējiet vizīti tiešsaistē
            </h2>
            <p className="mt-3 text-sm text-[#556862]">
              Izvēlieties sev ērtāko laiku un speciālisti. Apstiprinājums tiks nosūtīts uz Jūsu tālruni.
            </p>
          </div>

          <div style={{ backgroundColor: "#FFFFFF", borderColor: "rgba(26, 40, 36, 0.08)" }} className="mt-12 rounded-3xl border p-7 sm:p-12 shadow-sm">
            {isBooked ? (
              <div style={{ backgroundColor: "#F3ECE2" }} className="rounded-2xl p-8 text-center">
                <span className="font-serif text-3xl text-[#C86248]">✓</span>
                <h3 className="mt-3 font-serif text-2xl text-[#1A2824]">
                  Paldies, {patientName || "cien. pacient"}!
                </h3>
                <p className="mt-3 text-sm text-[#556862] max-w-md mx-auto leading-relaxed">
                  Jūsu pieteikums ir saņemts. Gaidīsim Jūs <strong>{currentDateObj.weekday}, {currentDateObj.dateStr} plkst. {selectedTimeSlot}</strong> pie speciālistes <strong>{currentSpecialist.name}</strong>.
                </p>
                <div style={{ backgroundColor: "#FFFFFF", borderColor: "rgba(26, 40, 36, 0.08)" }} className="mt-6 inline-block rounded-xl border p-4 text-xs text-left max-w-sm">
                  <p>📍 Miera iela 24, Rīga (2. stāvs, pieejams lifts)</p>
                  <p className="mt-1">📞 Tālrunis saziņai: +371 67 000 000</p>
                </div>
                <div className="mt-8 flex justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsBooked(false);
                      setPatientName("");
                      setPatientPhone("");
                    }}
                    style={{ backgroundColor: "#1A2824", color: "#FBF9F5" }}
                    className="rounded-full px-6 py-2.5 text-xs font-semibold"
                  >
                    Pieteikt citu vizīti
                  </button>
                  <a
                    href="https://wa.me/37120000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ backgroundColor: "#C86248", color: "#FFFFFF" }}
                    className="rounded-full px-6 py-2.5 text-xs font-semibold"
                  >
                    Rakstīt WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              <div>
                {/* 1. Specialist Selection */}
                <div>
                  <p className="text-xs font-medium text-[#1A2824]">Izvēlieties speciālisti</p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    {specialists.map((spec) => (
                      <button
                        key={spec.id}
                        type="button"
                        onClick={() => setSelectedSpecialist(spec.id)}
                        style={
                          selectedSpecialist === spec.id
                            ? { backgroundColor: "#F3ECE2", borderColor: "#C86248" }
                            : { backgroundColor: "#FBF9F5", borderColor: "rgba(26, 40, 36, 0.08)" }
                        }
                        className="flex items-center gap-3 rounded-2xl border p-3 text-left transition-colors"
                      >
                        <div style={{ position: "relative", height: "46px", width: "46px", overflow: "hidden", borderRadius: "9999px", flexShrink: 0, backgroundColor: "#E6DCCE" }}>
                          <Image src={spec.image} alt={spec.name} fill sizes="46px" className="object-cover" />
                        </div>
                        <div>
                          <p className="font-serif text-xs font-normal text-[#1A2824]">{spec.name}</p>
                          <p className="text-[11px] text-[#556862]">{spec.experience}</p>
                          <span className="text-[10px] text-[#C86248] font-medium block mt-0.5">{spec.availability}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Date Picker */}
                <div className="mt-8 border-t border-[#1A2824]/08 pt-6">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-[#1A2824]">Izvēlieties datumu (Septembris 2026)</p>
                    <span className="text-xs text-[#556862]">{currentDateObj.weekday}, {currentDateObj.dateStr}</span>
                  </div>

                  <div className="mt-3 grid grid-cols-4 sm:grid-cols-7 gap-2">
                    {calendarDays.map((calDay) => (
                      <button
                        key={calDay.num}
                        type="button"
                        onClick={() => setSelectedDate(calDay.num)}
                        style={
                          selectedDate === calDay.num
                            ? { backgroundColor: "#C86248", color: "#FFFFFF", borderColor: "#C86248" }
                            : { backgroundColor: "#FBF9F5", color: "#1A2824", borderColor: "rgba(26, 40, 36, 0.08)" }
                        }
                        className="rounded-2xl p-3 text-center border transition-colors"
                      >
                        <p className="text-[10px] opacity-75">{calDay.weekday.slice(0, 3)}</p>
                        <p className="font-serif text-lg font-normal mt-0.5">{calDay.num}</p>
                        <p className="text-[10px] opacity-75 mt-0.5">{calDay.count} laiki</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Time Slots */}
                <div className="mt-8 border-t border-[#1A2824]/08 pt-6">
                  <p className="text-xs font-medium text-[#1A2824]">Izvēlieties pulksteņa laiku</p>

                  <div className="mt-3 space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs text-[#556862] w-16">Rīts:</span>
                      {availableSlots.morning.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTimeSlot(slot)}
                          style={
                            selectedTimeSlot === slot
                              ? { backgroundColor: "#1A2824", color: "#FBF9F5", borderColor: "#1A2824" }
                              : { backgroundColor: "#FBF9F5", color: "#1A2824", borderColor: "rgba(26, 40, 36, 0.08)" }
                          }
                          className="rounded-xl border px-3.5 py-1.5 text-xs font-medium"
                        >
                          {slot}
                        </button>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs text-[#556862] w-16">Diena:</span>
                      {availableSlots.afternoon.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTimeSlot(slot)}
                          style={
                            selectedTimeSlot === slot
                              ? { backgroundColor: "#1A2824", color: "#FBF9F5", borderColor: "#1A2824" }
                              : { backgroundColor: "#FBF9F5", color: "#1A2824", borderColor: "rgba(26, 40, 36, 0.08)" }
                          }
                          className="rounded-xl border px-3.5 py-1.5 text-xs font-medium"
                        >
                          {slot}
                        </button>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs text-[#556862] w-16">Vakars:</span>
                      {availableSlots.evening.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTimeSlot(slot)}
                          style={
                            selectedTimeSlot === slot
                              ? { backgroundColor: "#1A2824", color: "#FBF9F5", borderColor: "#1A2824" }
                              : { backgroundColor: "#FBF9F5", color: "#1A2824", borderColor: "rgba(26, 40, 36, 0.08)" }
                          }
                          className="rounded-xl border px-3.5 py-1.5 text-xs font-medium"
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 4. Patient Info Form */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setIsBooked(true);
                  }}
                  className="mt-8 border-t border-[#1A2824]/08 pt-6"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-medium text-[#1A2824]">Vārds, Uzvārds *</label>
                      <input
                        type="text"
                        required
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        placeholder="Anna Bērziņa"
                        style={{ borderColor: "rgba(26, 40, 36, 0.12)", backgroundColor: "#FBF9F5", color: "#1A2824" }}
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
                        style={{ borderColor: "rgba(26, 40, 36, 0.12)", backgroundColor: "#FBF9F5", color: "#1A2824" }}
                        className="mt-1.5 w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-medium text-[#1A2824]">Vizītes virziens</label>
                      <select
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        style={{ borderColor: "rgba(26, 40, 36, 0.12)", backgroundColor: "#FBF9F5", color: "#1A2824" }}
                        className="mt-1.5 w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-hidden"
                      >
                        <option value="rehab">Muguras, kakla vai locītavu sāpes (50 €)</option>
                        <option value="women">Sieviešu veselība & pēcdzemdību aprūpe (50 €)</option>
                        <option value="children">Zīdaiņu attīstība & hendlings (40 €)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#1A2824]">E-pasts (atgādinājumam)</label>
                      <input
                        type="email"
                        value={patientEmail}
                        onChange={(e) => setPatientEmail(e.target.value)}
                        placeholder="anna@piemers.lv"
                        style={{ borderColor: "rgba(26, 40, 36, 0.12)", backgroundColor: "#FBF9F5", color: "#1A2824" }}
                        className="mt-1.5 w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-xs font-medium text-[#1A2824]">Sūdzības vai piezīmes (pēc izvēles)</label>
                    <input
                      type="text"
                      value={patientNotes}
                      onChange={(e) => setPatientNotes(e.target.value)}
                      placeholder="Kas šobrīd sagādā vislielākās grūtības?"
                      style={{ borderColor: "rgba(26, 40, 36, 0.12)", backgroundColor: "#FBF9F5", color: "#1A2824" }}
                      className="mt-1.5 w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-hidden"
                    />
                  </div>

                  <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#1A2824]/08 pt-6">
                    <span className="text-xs text-[#556862]">
                      Izvēlēts: <strong>{currentDateObj.weekday}, {currentDateObj.dateStr} plkst. {selectedTimeSlot}</strong> ({currentSpecialist.name})
                    </span>
                    <button
                      type="submit"
                      style={{ backgroundColor: "#C86248", color: "#FFFFFF" }}
                      className="rounded-full px-8 py-3.5 text-sm font-semibold shadow-sm hover:bg-[#B7533A]"
                    >
                      Apstiprināt vizītes pieteikumu →
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Direct Human Question & Inquiry Box */}
      <section style={{ backgroundColor: "#F3ECE2", borderColor: "rgba(26, 40, 36, 0.08)" }} className="border-t py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <h2 className="font-serif text-3xl font-normal text-[#1A2824]">
                Neesat pārliecināti, ar ko sākt?
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#556862]">
                Uzdodiet savu jautājumu šeit vai uzrakstiet mums WhatsApp. Mūsu fizioterapeite iepazīsies ar Jūsu situāciju un ieteiks piemērotāko speciālisti un rīcības virzienu.
              </p>

              <div style={{ borderColor: "rgba(26, 40, 36, 0.08)" }} className="mt-8 space-y-2 border-t pt-6 text-xs text-[#556862]">
                <p>📞 Tālrunis: <a href="tel:+37167000000" className="text-[#1A2824] font-medium underline decoration-black/20">+371 67 000 000</a></p>
                <p>💬 WhatsApp: <a href="https://wa.me/37120000000" target="_blank" rel="noopener noreferrer" className="text-[#C86248] font-medium underline decoration-[#C86248]/30">+371 20 000 000</a></p>
                <p>📍 Miera iela 24, Rīga (2. stāvs, pieejams lifts)</p>
              </div>
            </div>

            <div style={{ backgroundColor: "#FBF9F5", borderColor: "rgba(26, 40, 36, 0.08)" }} className="rounded-3xl border p-7 shadow-xs">
              {inquirySubmitted ? (
                <div className="p-6 text-center">
                  <span className="font-serif text-3xl text-[#C86248]">✓</span>
                  <h3 className="mt-2 font-serif text-xl text-[#1A2824]">Paldies par ziņu!</h3>
                  <p className="mt-2 text-xs text-[#556862]">Mūsu speciāliste sazināsies ar Jums darba laikā 15–30 minūšu laikā.</p>
                  <button
                    type="button"
                    onClick={() => setInquirySubmitted(false)}
                    style={{ backgroundColor: "#1A2824", color: "#FBF9F5" }}
                    className="mt-4 rounded-full px-5 py-2 text-xs font-semibold"
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
                      placeholder="Anna"
                      style={{ borderColor: "rgba(26, 40, 36, 0.12)", backgroundColor: "#FFFFFF", color: "#1A2824" }}
                      className="mt-1 w-full rounded-xl border px-3.5 py-2 text-sm focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#1A2824]">Tālrunis vai WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+371 20 000 000"
                      style={{ borderColor: "rgba(26, 40, 36, 0.12)", backgroundColor: "#FFFFFF", color: "#1A2824" }}
                      className="mt-1 w-full rounded-xl border px-3.5 py-2 text-sm focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#1A2824]">Kas Jums sagādā vislielākās grūtības?</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Kas sāp, cik ilgi, vai ir bijusi trauma vai izmeklējumi?"
                      style={{ borderColor: "rgba(26, 40, 36, 0.12)", backgroundColor: "#FFFFFF", color: "#1A2824" }}
                      className="mt-1 w-full rounded-xl border px-3.5 py-2 text-sm focus:outline-hidden"
                    />
                  </div>

                  <button
                    type="submit"
                    style={{ backgroundColor: "#C86248", color: "#FFFFFF" }}
                    className="w-full rounded-full py-3 text-xs font-semibold shadow-xs hover:bg-[#B7533A]"
                  >
                    Nosūtīt jautājumu fizioterapeitei
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordions */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-serif text-3xl font-normal text-[#1A2824]">
              Biežāk uzdotie jautājumi
            </h2>
          </div>

          <div className="mt-10 space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                style={{ backgroundColor: "#FFFFFF", borderColor: "rgba(26, 40, 36, 0.08)" }}
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

      {/* Warm Clinic Footer */}
      <footer style={{ backgroundColor: "#F3ECE2", borderColor: "rgba(26, 40, 36, 0.08)" }} className="border-t py-16 text-[#556862]">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <span className="font-serif text-xl text-[#1A2824]">Kustība</span>
              <p className="mt-1 text-xs text-[#556862]">Fizioterapijas & rehabilitācijas prakse</p>
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
                WhatsApp: <a href="https://wa.me/37120000000" className="text-[#C86248] font-medium underline decoration-[#C86248]/30">+371 20 000 000</a>
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
