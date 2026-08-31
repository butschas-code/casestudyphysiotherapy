"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function PhysiotherapyConceptPage() {
  const [selectedDay, setSelectedDay] = useState("Otrdiena, 2. septembris");
  const [selectedTime, setSelectedTime] = useState("11:30");
  const [selectedCategory, setSelectedCategory] = useState("sapes");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const days = [
    { label: "Pirmdiena", date: "1. sept.", full: "Pirmdiena, 1. septembris" },
    { label: "Otrdiena", date: "2. sept.", full: "Otrdiena, 2. septembris" },
    { label: "Trešdiena", date: "3. sept.", full: "Trešdiena, 3. septembris" },
    { label: "Ceturtdiena", date: "4. sept.", full: "Ceturtdiena, 4. septembris" },
    { label: "Piektdiena", date: "5. sept.", full: "Piektdiena, 5. septembris" },
  ];

  const times = ["09:00", "10:30", "11:30", "14:00", "16:00", "17:30", "18:30"];

  const needs = [
    {
      icon: "⚡",
      title: "Muguras, kakla vai locītavu sāpes",
      desc: "Akūtas sāpes, hronisks diskomforts, sēdoša darba sekas vai stājas asimetrija.",
      targetService: "Rehabilitācijas fizioterapija",
      targetId: "sapes",
    },
    {
      icon: "🩹",
      title: "Pēc traumas vai operācijas",
      desc: "Saišu plīsumi, lūzumi, meniska vai mugurkaula operācijas atjaunošanās posmā.",
      targetService: "Pēctraumu rehabilitācija",
      targetId: "sapes",
    },
    {
      icon: "🌸",
      title: "Grūtniecība & pēcdzemdību veselība",
      desc: "Iegurņa pamatnes muskuļi, muguras atslogošana, diastāzes pārbaude un atjaunošanās.",
      targetService: "Sieviešu veselības programma",
      targetId: "sievietem",
    },
    {
      icon: "👶",
      title: "Zīdaiņu motorā attīstība & hendlings",
      desc: "Muskuļu tonuss, velšanās, rāpošana un droša, pareiza bērna celšana ikdienā.",
      targetService: "Bērnu fizioterapija",
      targetId: "berniem",
    },
    {
      icon: "💻",
      title: "Sēdošs darbs & stājas sasprindzinājums",
      desc: "Savelkas pleci, sprands, periodiskas galvassāpes un enerģijas trūkums darba dienas beigās.",
      targetService: "Kustību un ergonomikas terapija",
      targetId: "kustiba",
    },
    {
      icon: "🏃",
      title: "Sporta traumas & kustību uzlabošana",
      desc: "Skriešanas tehnika, pārslodzes sindromi, traumu profilakse un sagatavošanās slodzei.",
      targetService: "Funkcionālā sagatavotība",
      targetId: "kustiba",
    },
  ];

  const services = [
    {
      id: "sapes",
      tag: "Pieaugušajiem · Rehabilitācija",
      title: "Sāpju mazināšana un rehabilitācija",
      price: "45 € – 60 € / 60 min",
      intro: "Mēs neaprobežojamies ar pasīvu masāžu. Mūsu mērķis ir identificēt kustību deficītu, atbrīvot sasprindzinājumu un atgriezt muskuļu līdzsvaru.",
      image: "/concept-physio/service-rehab.jpg",
      items: [
        "Padziļināta fizioterapeita apskate un kustību testi",
        "Muguras, kakla un jostas daļas sāpju terapija",
        "Pēctraumu un pēcoperāciju rehabilitācijas kursi",
        "Locītavu mobilizācija un funkcionālā teipošana",
        "Individuāla mājas vingrojumu programma ar video materiāliem",
      ],
    },
    {
      id: "sievietem",
      tag: "Sievietēm · Grūtniecība · Pēcdzemdības",
      title: "Sieviešu veselība un atjaunošanās",
      price: "50 € / 60 min",
      intro: "Ķermenis piedzīvo milzīgas pārmaiņas. Mēs sniedzam maigu, zinātniski pamatotu atbalstu gan gaidību laikā, gan atgūstoties pēc dzemdībām.",
      image: "/concept-physio/service-women.jpg",
      items: [
        "Fizioterapija grūtniecības laikā (muguras un iegurņa atslogošana)",
        "Pēcdzemdību apskate un vēdera taisnā muskuļa (diastāzes) izvērtēšana",
        "Iegurņa pamatnes muskulatūras saudzīga stiprināšana",
        "Rētu mobilizācija un audu elastības atjaunošana",
        "Droša atgriešanās pie sportiskām aktivitātēm",
      ],
    },
    {
      id: "berniem",
      tag: "Zīdaiņiem · Bērniem · Pusaudžiem",
      title: "Bērnu fizioterapija un hendlings",
      price: "40 € – 45 € / 45 min",
      intro: "Kustību ieradumi veidojas no pirmajām dzīves dienām. Mēs mācām vecākiem kļūt par labākajiem atbalstītājiem bērna motorajā attīstībā.",
      image: "/concept-physio/service-children.jpg",
      items: [
        "Zīdaiņu motorās attīstības diagnostika no 1 mēneša vecuma",
        "Vecāku apmācība pareizā hendlingā (bērna celšana, turēšana, ģērbšana)",
        "Muskuļu tonusa (hipertonuss/hipotonuss) harmonizācija",
        "Stājas un pēdu asimetriju korekcija pirmsskolas un skolas vecumā",
        "Nodarbības mierīgā, bērnam draudzīgā un rotaļīgā vidē",
      ],
    },
    {
      id: "kustiba",
      tag: "Profilakse · Treniņi · Ergonomika",
      title: "Kustību terapija un funkcionālā sagatavotība",
      price: "40 € / 50 min",
      intro: "Ilgtspējīga veselība nozīmē spēju brīvi un ar prieku kustēties ikdienā. Funkcionāls darbs pie muskuļu spēka, mobilitātes un elpošanas.",
      image: "/concept-physio/service-movement.jpg",
      items: [
        "Kustību un elpošanas koordinācijas attīstība",
        "Mugurkaula mobilitātes un korsetes muskuļu nostiprināšana",
        "Ergonomikas konsultācijas darba vietai pie datora",
        "Individuāli fiziskās sagatavotības treniņi mazās grupās vai 1-pret-1",
      ],
    },
  ];

  const team = [
    {
      name: "Elīna Vītola",
      role: "Vadošā fizioterapeite · Prakses vadītāja",
      experience: "12 gadu klīniskā pieredze · LFA sertificēta",
      specialities: "Sieviešu iegurņa veselība · Pēcdzemdību rehabilitācija · Holistiskā kustību analīze",
      image: "/concept-physio/practitioner-primary.jpg",
      bio: "Elīnas pieeja apvieno precīzu biomehāniku ar empātiju. Viņa uzskata, ka ķermenis vienmēr jāskata kā vienota sistēma, kur viena sāpoša vieta parasti ir citas zonas disbalansa sekas.",
    },
    {
      name: "Marta Liepa",
      role: "Sertificēta fizioterapeite",
      experience: "8 gadu pieredze · Sporta medicīnas specializācija",
      specialities: "Akūtas muguras sāpes · Traumu un operāciju rehabilitācija · Kustību testi",
      image: "/concept-physio/practitioner-2.jpg",
      bio: "Marta specializējas pēctraumu atjaunošanā un palīdz atgūt pārliecību par savu ķermeni pēc nopietniem saišu bojājumiem vai locītavu pārslodzēm.",
    },
    {
      name: "Anna Ozola",
      role: "Bērnu fizioterapeite · Hendlings",
      experience: "7 gadu pieredze · Bērnu slimnīcas pieredze",
      specialities: "Zīdaiņu motorā attīstība · Hendlings · Bērnu stājas korekcija",
      image: "/concept-physio/practitioner-3.jpg",
      bio: "Anna prot atrast kontaktu ar katru mazuli. Viņas nodarbībās vecāki iegūst mieru un praktiskas iemaņas, kā ikdienā rotaļājoties veicināt pareizu bērna kustību koordināciju.",
    },
  ];

  const steps = [
    {
      num: "01",
      title: "Uzklausīšana un detalizēta diagnostika (20 min)",
      desc: "Mēs nesteidzinām. Izpētām slimības vēsturi, analizējam Jūsu ikdienas kustības, stāju un veicam funkcionālos testus.",
    },
    {
      num: "02",
      title: "Terapija un manuāls darbs (30 min)",
      desc: "Mērķtiecīga manuālā terapija, audu atbrīvošana, locītavu mobilizācija un aktīvi koriģējošie vingrojumi kabinetā.",
    },
    {
      num: "03",
      title: "Skaidrs rīcības plāns un mājas uzdevumi (10 min)",
      desc: "Jūs saņemat 2–3 konkrētus vingrojumus ikdienai un skaidru izpratni, kā novērst sāpju atgriešanos ilgtermiņā.",
    },
  ];

  const faqs = [
    {
      q: "Kas man jāņem līdzi uz pirmo vizīti?",
      a: "Ērts sporta vai brīvā laika apģērbs, kas neierobežo kustības (t-krekls, legingi vai šorti). Ja Jums ir iepriekš veikti izmeklējumu slēdzieni (rentgens, magnētiskā rezonanse, USG), ņemiet tos līdzi vai nosūtiet pirms vizītes.",
    },
    {
      q: "Vai nepieciešams ārsta nosūtījums?",
      a: "Nē, privātai fizioterapeita vizītei ārsta nosūtījums nav obligāts. Mūsu speciālisti ir sertificētas ārstniecības personas un paši veic pilnu funkcionālo novērtēšanu.",
    },
    {
      q: "Vai Jūs pieņemat veselības apdrošināšanas polises?",
      a: "Jā, mēs sadarbojamies ar lielākajām apdrošināšanas kompānijām (Balta, BTA, Compensa, Ergo, Gjensidige u.c.). Pēc vizītes izsniedzam oficiālu čeku ar ārstniecības personas kodu un pakalpojuma atšifrējumu.",
    },
    {
      q: "Cik vizītes parasti ir nepieciešamas?",
      a: "Akūtu sāpju gadījumā ievērojams atvieglojums bieži jūtams jau pēc 1.–2. reizes. Ilgstošam rezultātam vidējais kurss ir 4–6 nodarbības, apvienojumā ar individuāliem vingrojumiem mājas apstākļos.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#142826] font-sans antialiased selection:bg-[#E06B52]/20 selection:text-[#142826]">
      {/* Top Persistent Saiteo Concept Context Bar */}
      <aside className="sticky top-0 z-50 flex items-center justify-between border-b border-[#081020]/20 bg-[#081020] px-4 py-2 text-xs text-white shadow-md">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-heading font-extrabold tracking-tight text-[#00C9A7]">
            saiteo
          </Link>
          <span className="text-white/40">/</span>
          <span className="rounded bg-[#00C9A7]/20 px-2 py-0.5 font-mono text-[10px] font-bold text-[#00C9A7]">
            NEATKARĪGS KONCEPTS
          </span>
          <span className="hidden text-white/70 sm:inline">
            Fizioterapijas prakses digitālais standarts
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/case-studies/physiotherapy"
            className="rounded bg-white/10 px-3 py-1 font-semibold text-white transition-colors hover:bg-white/20"
          >
            Lasīt stratēģijas analīzi →
          </Link>
          <Link
            href="/#contact"
            className="hidden rounded bg-[#00C9A7] px-3 py-1 font-bold text-[#081020] transition-transform hover:scale-105 min-[520px]:inline-block"
          >
            Pieteikt savu mājaslapu
          </Link>
        </div>
      </aside>

      {/* Practice Navigation */}
      <header className="sticky top-[37px] z-40 border-b border-[#142826]/10 bg-[#FBF9F5]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
          <Link href="#top" className="group">
            <span className="font-heading text-xl font-extrabold tracking-tight text-[#142826]">
              KUSTĪBA
            </span>
            <span className="block text-[11px] font-medium tracking-wide text-[#142826]/60">
              Fizioterapijas & Kustību Prakse
            </span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-semibold text-[#142826]/75 md:flex">
            <a href="#vajadzibas" className="transition-colors hover:text-[#142826]">Kur sākt</a>
            <a href="#pieeja" className="transition-colors hover:text-[#142826]">Mūsu pieeja</a>
            <a href="#pakalpojumi" className="transition-colors hover:text-[#142826]">Pakalpojumi</a>
            <a href="#specialisti" className="transition-colors hover:text-[#142826]">Speciālisti</a>
            <a href="#cenradis" className="transition-colors hover:text-[#142826]">Cenrādis</a>
            <a href="#kontakti" className="transition-colors hover:text-[#142826]">Kontakti</a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="tel:+37167000000"
              className="hidden font-mono text-xs font-semibold text-[#142826]/80 hover:text-[#E06B52] lg:inline-block"
            >
              +371 67 000 000
            </a>
            <a
              href="#pieteikums"
              className="rounded-md bg-[#142826] px-4 py-2 text-xs font-bold text-white shadow-sm transition-all hover:bg-[#1B3634] hover:shadow"
            >
              Pieteikt vizīti
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="top" className="relative overflow-hidden bg-[#142826] py-20 text-[#FBF9F5] sm:py-28 lg:py-32">
        <div className="absolute inset-0 opacity-25">
          <Image
            src="/concept-physio/hero-treatment.jpg"
            alt="Fizioterapijas nodarbība KUSTĪBA praksē"
            fill
            priority
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#142826] via-[#142826]/90 to-transparent" />

        <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold tracking-wide text-[#A9D8D5] backdrop-blur-xs">
              <span>📍 Miera iela 24, Rīga</span>
              <span className="text-white/30">·</span>
              <span>Pieņemšana 2–3 dienu laikā</span>
            </div>

            <h1 className="mt-5 font-heading text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.5rem]">
              Ķermenis ir radīts kustībai.<br />
              Mēs palīdzam atgūt brīvību un drošību.
            </h1>

            <p className="mt-6 text-base leading-relaxed text-[#FBF9F5]/80 sm:text-lg">
              Specializēta fizioterapija un rehabilitācija pieaugušajiem, sievietēm un zīdaiņiem. Mēs neapstājamies pie īslaicīgas simptomu noņemšanas, bet meklējam un risinām patieso cēloni.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#pieteikums"
                className="rounded-md bg-[#E06B52] px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-[#D95D43]"
              >
                Pieteikt pirmo konsultāciju →
              </a>
              <a
                href="#vajadzibas"
                className="rounded-md border border-white/25 bg-white/5 px-5 py-3.5 text-sm font-semibold text-white backdrop-blur-xs transition-colors hover:bg-white/15"
              >
                Atrast savu situāciju ↓
              </a>
            </div>

            {/* Credibility Badges */}
            <div className="mt-14 grid grid-cols-2 gap-4 border-t border-white/15 pt-8 sm:grid-cols-4">
              <div>
                <p className="font-heading text-xl font-bold text-white">60 min</p>
                <p className="text-xs text-white/60">Pilna primārā apskate</p>
              </div>
              <div>
                <p className="font-heading text-xl font-bold text-white">100%</p>
                <p className="text-xs text-white/60">Sertificēti speciālisti</p>
              </div>
              <div>
                <p className="font-heading text-xl font-bold text-white">Apdrošināšana</p>
                <p className="text-xs text-white/60">Pieņemam visas polises</p>
              </div>
              <div>
                <p className="font-heading text-xl font-bold text-white">Ērta vieta</p>
                <p className="text-xs text-white/60">Klusa ieeja, lifts</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Need-Based Guided Intake ("Ar ko Jūs atnācāt?") */}
      <section id="vajadzibas" className="border-b border-[#142826]/10 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#E06B52]">
              Kur sākt
            </span>
            <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight text-[#142826] sm:text-4xl">
              Ar kādu jautājumu Jūs pie mums vēršaties?
            </h2>
            <p className="mt-3 text-sm text-[#142826]/70 sm:text-base">
              Izvēlieties situāciju, kas visprecīzāk raksturo Jūsu pašreizējās sajūtas:
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {needs.map((item, idx) => (
              <a
                key={idx}
                href={`#${item.targetId}`}
                onClick={() => setSelectedCategory(item.targetId)}
                className="group flex flex-col justify-between rounded-2xl border border-[#142826]/10 bg-white p-6 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-[#E06B52] hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="font-mono text-xs font-semibold text-[#142826]/40">
                      0{idx + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 font-heading text-base font-bold text-[#142826] group-hover:text-[#E06B52]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#142826]/70">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 border-t border-[#142826]/08 pt-4 flex items-center justify-between text-xs font-bold text-[#142826]/80 group-hover:text-[#E06B52]">
                  <span>{item.targetService}</span>
                  <span>→</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Clinical Approach ("Ne tikai kur sāp, bet kāpēc") */}
      <section id="pieeja" className="bg-[#1B3634] py-16 text-[#FBF9F5] sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#A9D8D5]">
                Mūsu pieeja
              </span>
              <h2 className="mt-3 font-heading text-2xl font-bold tracking-tight text-white sm:text-4xl">
                Kāpēc simptomu apspiešana nedod ilgtermiņa rezultātu?
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/80 sm:text-base">
                Bieži vien sāpes ceļgalā rodas no nestabilas pēdas vai vāja iegurņa. Sāpes kakla daļā rodas no elpošanas modeļa un sēdēšanas paradumiem.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-base">
                Mēs nesteidzamies uzreiz likt veikt vispārīgus vingrojumus. Mēs vispirms atrodam funkcionālo deficītu un palīdzam Jūsu nervu sistēmai un muskuļiem atgūt pareizu sadarbību.
              </p>

              <div className="mt-8 rounded-xl border border-white/15 bg-white/5 p-5 backdrop-blur-xs">
                <p className="font-heading text-sm font-bold text-[#A9D8D5]">
                  ✓ 100% individuāla uzmanība
                </p>
                <p className="mt-1 text-xs text-white/70">
                  Nodarbības laikā speciālists strādā tikai ar Jums — bez paralēliem pacientiem un bez steigas.
                </p>
              </div>
            </div>

            {/* 3 Step Sequence */}
            <div className="space-y-4">
              {steps.map((step) => (
                <div
                  key={step.num}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E06B52] font-mono text-xs font-bold text-white">
                      {step.num}
                    </span>
                    <h3 className="font-heading text-base font-bold text-white sm:text-lg">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-white/70 sm:text-sm pl-11">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section with Interactive Category Filter */}
      <section id="pakalpojumi" className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#E06B52]">
                Pakalpojumi
              </span>
              <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight text-[#142826] sm:text-4xl">
                Strukturēti aprūpes virzieni
              </h2>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {services.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelectedCategory(s.id)}
                  className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                    selectedCategory === s.id
                      ? "bg-[#142826] text-white shadow-sm"
                      : "bg-white border border-[#142826]/15 text-[#142826]/70 hover:bg-[#142826]/5"
                  }`}
                >
                  {s.title.split(" un ")[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-12 space-y-12">
            {services
              .filter((s) => selectedCategory === "all" || s.id === selectedCategory)
              .map((service) => (
                <article
                  key={service.id}
                  id={service.id}
                  className="grid gap-8 overflow-hidden rounded-3xl border border-[#142826]/12 bg-white p-6 shadow-sm sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
                >
                  <div>
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#E06B52]">
                      {service.tag}
                    </span>
                    <h3 className="mt-2 font-heading text-2xl font-bold text-[#142826] sm:text-3xl">
                      {service.title}
                    </h3>
                    <p className="mt-2 font-mono text-sm font-semibold text-[#487B75]">
                      {service.price}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-[#142826]/75 sm:text-base">
                      {service.intro}
                    </p>

                    <ul className="mt-6 space-y-2.5 border-t border-[#142826]/10 pt-5">
                      {service.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs font-semibold text-[#142826]/85 sm:text-sm">
                          <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#E06B52]/15 text-[10px] font-bold text-[#E06B52]">
                            ✓
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 flex flex-wrap items-center gap-4">
                      <a
                        href="#pieteikums"
                        className="rounded-md bg-[#142826] px-5 py-3 text-xs font-bold text-white shadow-sm hover:bg-[#1B3634]"
                      >
                        Pieteikties šim virzienam →
                      </a>
                      <a
                        href="https://wa.me/37120000000"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-md border border-[#142826]/20 px-4 py-3 text-xs font-semibold text-[#142826] hover:bg-[#142826]/5"
                      >
                        Jautāt WhatsApp
                      </a>
                    </div>
                  </div>

                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#142826] shadow-inner">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="object-cover"
                    />
                  </div>
                </article>
              ))}
          </div>
        </div>
      </section>

      {/* Specialist Credibility Showcase */}
      <section id="specialisti" className="border-t border-[#142826]/10 bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#E06B52]">
              Speciālisti
            </span>
            <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight text-[#142826] sm:text-4xl">
              Fizioterapeiti, kuri iedziļinās Jūsu situācijā
            </h2>
            <p className="mt-3 text-sm text-[#142826]/70 sm:text-base">
              Visi mūsu speciālisti ir sertificētas ārstniecības personas ar regulāru starptautisku tālākizglītību.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {team.map((person, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between overflow-hidden rounded-2xl border border-[#142826]/10 bg-[#FBF9F5] p-6 shadow-xs"
              >
                <div>
                  <div className="relative aspect-[4/4.2] overflow-hidden rounded-xl bg-[#142826]">
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-top"
                    />
                  </div>

                  <h3 className="mt-5 font-heading text-xl font-bold text-[#142826]">
                    {person.name}
                  </h3>
                  <p className="text-xs font-bold text-[#E06B52]">{person.role}</p>
                  <p className="mt-1 font-mono text-[11px] text-[#487B75]">
                    {person.experience}
                  </p>

                  <p className="mt-3 text-xs leading-relaxed text-[#142826]/75">
                    {person.bio}
                  </p>

                  <div className="mt-4 rounded-lg bg-white p-3 text-[11px] font-semibold text-[#142826]/80 border border-[#142826]/06">
                    ✦ {person.specialities}
                  </div>
                </div>

                <a
                  href="#pieteikums"
                  className="mt-6 block text-center rounded-md border border-[#142826]/20 bg-white py-2.5 text-xs font-bold text-[#142826] transition-colors hover:bg-[#142826] hover:text-white"
                >
                  Pieteikt vizīti pie speciālista →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing & Insurance Section */}
      <section id="cenradis" className="border-t border-[#142826]/10 py-16 sm:py-20 bg-[#F3EFE6]/60">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#E06B52]">
              Cenrādis
            </span>
            <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight text-[#142826] sm:text-3xl">
              Caurspīdīgas pakalpojumu cenas
            </h2>
            <p className="mt-2 text-xs text-[#142826]/70">
              Bez slēptiem papildu maksājumiem. Visi nepieciešamie materiāli (teipi, inventārs) iekļauti cenā.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-[#142826]/10 bg-white shadow-xs">
            <div className="divide-y divide-[#142826]/08 text-sm">
              <div className="flex items-center justify-between p-4 sm:p-5">
                <div>
                  <p className="font-heading font-bold text-[#142826]">Pirmreizēja fizioterapeita konsultācija & diagnostika</p>
                  <p className="text-xs text-[#142826]/60">Pilna kustību analīze, manuālie testi, pirmā terapija un mājas plāns (60 min)</p>
                </div>
                <span className="font-mono text-base font-bold text-[#142826]">50 €</span>
              </div>

              <div className="flex items-center justify-between p-4 sm:p-5">
                <div>
                  <p className="font-heading font-bold text-[#142826]">Atkārtota individuālā fizioterapijas nodarbība</p>
                  <p className="text-xs text-[#142826]/60">Manuāla terapija un koriģējošie vingrojumi ar speciālistu (60 min)</p>
                </div>
                <span className="font-mono text-base font-bold text-[#142826]">45 €</span>
              </div>

              <div className="flex items-center justify-between p-4 sm:p-5">
                <div>
                  <p className="font-heading font-bold text-[#142826]">Sieviešu veselības un pēcdzemdību vizīte</p>
                  <p className="text-xs text-[#142826]/60">Diastāzes pārbaude, iegurņa pamatnes muskuļu atjaunošana (60 min)</p>
                </div>
                <span className="font-mono text-base font-bold text-[#142826]">50 €</span>
              </div>

              <div className="flex items-center justify-between p-4 sm:p-5">
                <div>
                  <p className="font-heading font-bold text-[#142826]">Zīdaiņu motorā attīstība & hendlinga apmācība</p>
                  <p className="text-xs text-[#142826]/60">Praktiska vecāku apmācība un mazuļa kustību harmonizācija (45 min)</p>
                </div>
                <span className="font-mono text-base font-bold text-[#142826]">40 €</span>
              </div>

              <div className="flex items-center justify-between p-4 sm:p-5">
                <div>
                  <p className="font-heading font-bold text-[#142826]">5 nodarbību abonements</p>
                  <p className="text-xs text-[#142826]/60">Derīgs 3 mēnešus no iegādes brīža (ietaupījums 25 €)</p>
                </div>
                <span className="font-mono text-base font-bold text-[#E06B52]">200 €</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-[#142826]/70">
            <span>🛡️ Sadarbojamies ar <strong>Balta</strong>, <strong>BTA</strong>, <strong>Compensa</strong>, <strong>Ergo</strong>, <strong>Gjensidige</strong></span>
            <span>💳 Norēķini ar karti vai pārskaitījumu</span>
          </div>
        </div>
      </section>

      {/* Interactive Appointment Selector Card */}
      <section id="pieteikums" className="bg-[#142826] py-16 text-[#FBF9F5] sm:py-24">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#A9D8D5]">
              Pieraksts tiešsaistē
            </span>
            <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight text-white sm:text-4xl">
              Izvēlieties ērtāko laiku un piesakiet vizīti
            </h2>
            <p className="mt-3 text-sm text-[#FBF9F5]/75">
              Mēs sazināsimies ar Jums 2 stundu laikā, lai apstiprinātu pierakstu.
            </p>
          </div>

          <div className="mt-10 rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-md sm:p-10">
            {submitted ? (
              <div className="rounded-2xl border border-[#00C9A7]/40 bg-[#00C9A7]/10 p-8 text-center">
                <span className="text-4xl">✓</span>
                <h3 className="mt-3 font-heading text-xl font-bold text-white">
                  Paldies! Jūsu pieteikums ir saņemts.
                </h3>
                <p className="mt-2 text-sm text-[#FBF9F5]/80">
                  Mēs sazināsimies pa norādīto tālruni, lai apstiprinātu vizītes laiku: <strong>{selectedDay} plkst. {selectedTime}</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 rounded-md bg-white/15 px-4 py-2 text-xs font-bold text-white hover:bg-white/25"
                >
                  Pieteikt citu vizīti
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
              >
                {/* 1. Day Selector */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#A9D8D5]">
                    1. Izvēlieties vēlamo dienu
                  </label>
                  <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
                    {days.map((day) => (
                      <button
                        key={day.full}
                        type="button"
                        onClick={() => setSelectedDay(day.full)}
                        className={`rounded-xl p-3 text-center border transition-all ${
                          selectedDay === day.full
                            ? "border-[#E06B52] bg-[#E06B52] text-white shadow-md"
                            : "border-white/15 bg-white/5 text-white/80 hover:bg-white/10"
                        }`}
                      >
                        <p className="text-[11px] font-semibold">{day.label}</p>
                        <p className="mt-0.5 font-heading text-xs font-bold">{day.date}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Time Selector */}
                <div className="mt-6">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#A9D8D5]">
                    2. Izvēlieties vēlamo sākuma laiku
                  </label>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {times.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setSelectedTime(t)}
                        className={`rounded-lg px-3.5 py-2 font-mono text-xs font-bold transition-all ${
                          selectedTime === t
                            ? "bg-[#00C9A7] text-[#081020] shadow-sm scale-105"
                            : "border border-white/15 bg-white/5 text-white/80 hover:bg-white/10"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Patient Details Form */}
                <div className="mt-8 border-t border-white/10 pt-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-white/80">
                        Vārds, Uzvārds *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Anna Bērziņa"
                        className="mt-1.5 w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/35 focus:border-[#00C9A7] focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/80">
                        Tālruņa numurs *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+371 20 000 000"
                        className="mt-1.5 w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/35 focus:border-[#00C9A7] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-white/80">
                        Pakalpojuma virziens
                      </label>
                      <select
                        defaultValue={selectedCategory}
                        className="mt-1.5 w-full rounded-lg border border-white/20 bg-[#142826] px-4 py-2.5 text-sm text-white focus:border-[#00C9A7] focus:outline-hidden"
                      >
                        <option value="sapes">Sāpes un rehabilitācija</option>
                        <option value="sievietem">Sieviešu veselība & pēcdzemdības</option>
                        <option value="berniem">Zīdaiņu motorā attīstība & bērni</option>
                        <option value="kustiba">Kustību terapija & profilakse</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/80">
                        Vēlamais speciālists (pēc izvēles)
                      </label>
                      <select className="mt-1.5 w-full rounded-lg border border-white/20 bg-[#142826] px-4 py-2.5 text-sm text-white focus:border-[#00C9A7] focus:outline-hidden">
                        <option value="">Jebkurš pieejamais speciālists</option>
                        <option value="elina">Elīna Vītola (vadošā fizioterapeite)</option>
                        <option value="marta">Marta Liepa (rehabilitācija, sports)</option>
                        <option value="anna">Anna Ozola (bērni, hendlings)</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-xs font-semibold text-white/80">
                      Īss situācijas apraksts
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Kas sāp, cik ilgi, vai ir bijusi trauma vai izmeklējumi?"
                      className="mt-1.5 w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/35 focus:border-[#00C9A7] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button
                    type="submit"
                    className="rounded-md bg-[#E06B52] px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-[#D95D43]"
                  >
                    Pieteikt vizīti ({selectedDay.split(",")[0]}, {selectedTime})
                  </button>
                  <a
                    href="https://wa.me/37120000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md border border-white/25 px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    💬 Rakstīt uzreiz WhatsApp
                  </a>
                </div>

                <p className="mt-4 text-[11px] text-white/50">
                  Demo koncepts: forma simulē pieraksta procesu. Jūsu dati netiek saglabāti vai nosūtīti trešajām personām.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Patient Reviews */}
      <section className="py-16 sm:py-24 border-b border-[#142826]/10">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#E06B52]">
              Atsauksmes
            </span>
            <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight text-[#142826] sm:text-3xl">
              Ko saka cilvēki, kuri atgriezušies pie kustības
            </h2>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#142826]/10 bg-white p-6 shadow-xs">
              <div className="flex text-amber-500 text-sm">★★★★★</div>
              <p className="mt-3 text-xs leading-relaxed text-[#142826]/80 italic">
                “Pēc 8 mēnešu muguras sāpēm pie datora Elīna palīdzēja ne tikai ar vingrojumiem, bet parādīja, kā pareizi sēdēt un elpot. Pēc 3 nodarbībām sāpes pilnībā atkāpās.”
              </p>
              <div className="mt-4 border-t border-[#142826]/08 pt-3">
                <strong className="block text-xs font-bold text-[#142826]">Jānis K.</strong>
                <span className="text-[11px] text-[#142826]/60">IT projektu vadītājs, Rīga</span>
              </div>
            </div>

            <div className="rounded-2xl border border-[#142826]/10 bg-white p-6 shadow-xs">
              <div className="flex text-amber-500 text-sm">★★★★★</div>
              <p className="mt-3 text-xs leading-relaxed text-[#142826]/80 italic">
                “Nācu uz pēcdzemdību pārbaudi. Ļoti delikāta, profesionāla un iejūtīga attieksme. Ieguvu skaidrus vingrojumus diastāzei, ko viegli izpildīt mājās pie mazuļa.”
              </p>
              <div className="mt-4 border-t border-[#142826]/08 pt-3">
                <strong className="block text-xs font-bold text-[#142826]">Laura M.</strong>
                <span className="text-[11px] text-[#142826]/60">Jaunā māmiņa</span>
              </div>
            </div>

            <div className="rounded-2xl border border-[#142826]/10 bg-white p-6 shadow-xs">
              <div className="flex text-amber-500 text-sm">★★★★★</div>
              <p className="mt-3 text-xs leading-relaxed text-[#142826]/80 italic">
                “Anna ar hendlinga nodarbību palīdzēja mūsu 3 mēnešus vecajam dēlam harmonizēt plecu asimetriju. Mierīga gaisotne, bez asarām un ar lielisku rezultātu.”
              </p>
              <div className="mt-4 border-t border-[#142826]/08 pt-3">
                <strong className="block text-xs font-bold text-[#142826]">Kristaps & Zane</strong>
                <span className="text-[11px] text-[#142826]/60">Vecāki</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#E06B52]">
              Jautājumi
            </span>
            <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight text-[#142826] sm:text-3xl">
              Biežāk uzdotie jautājumi
            </h2>
          </div>

          <div className="mt-10 space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-xl border border-[#142826]/10 bg-[#FBF9F5]"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="flex w-full items-center justify-between p-4 sm:p-5 text-left font-heading text-sm font-bold text-[#142826]"
                >
                  <span>{faq.q}</span>
                  <span className="ml-2 font-mono text-base text-[#E06B52]">
                    {activeFaq === idx ? "−" : "+"}
                  </span>
                </button>
                {activeFaq === idx && (
                  <div className="border-t border-[#142826]/08 px-4 py-4 sm:px-5 text-xs sm:text-sm leading-relaxed text-[#142826]/75">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Contacts */}
      <section id="kontakti" className="border-t border-[#142826]/10 bg-[#142826] py-16 text-[#FBF9F5] sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <strong className="font-heading text-xl font-bold text-white">KUSTĪBA</strong>
              <p className="mt-1 text-xs text-[#A9D8D5]">Fizioterapijas un kustību prakse</p>
              <p className="mt-4 text-xs leading-relaxed text-white/70">
                Miera iela 24, Centra rajons, Rīga, LV-1001.<br />
                Ieeja no Miera ielas pagalma, 2. stāvs, pieejams lifts ratiņkrēsliem un bērnu ratiem.
              </p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#A9D8D5]">Darba laiks</p>
              <ul className="mt-3 space-y-1.5 text-xs text-white/80 font-mono">
                <li>Pirmdiena – Piektdiena: 08:00 – 20:00</li>
                <li>Sestdiena: 09:00 – 15:00 (pēc pieraksta)</li>
                <li>Svētdiena: Slēgts</li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#A9D8D5]">Saziņa</p>
              <p className="mt-3 text-xs text-white/80">
                Tālrunis: <a href="tel:+37167000000" className="text-[#00C9A7] font-mono hover:underline">+371 67 000 000</a>
              </p>
              <p className="mt-1 text-xs text-white/80">
                E-pasts: <a href="mailto:sveiki@kustiba-demo.lv" className="text-[#00C9A7] hover:underline">sveiki@kustiba-demo.lv</a>
              </p>
              <p className="mt-1 text-xs text-white/80">
                WhatsApp: <a href="https://wa.me/37120000000" className="text-[#00C9A7] hover:underline">+371 20 000 000</a>
              </p>
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
            <p>© {new Date().getFullYear()} KUSTĪBA. Demonstrācijas koncepts.</p>
            <div className="flex items-center gap-4">
              <Link href="/case-studies/physiotherapy" className="text-[#00C9A7] hover:underline">
                Lasīt Saiteo stratēģijas analīzi →
              </Link>
              <Link href="/" className="text-white/70 hover:underline">
                Saiteo.com
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
