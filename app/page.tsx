"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function PhysiotherapyConceptPage() {
  // Active journey / situation state
  const [activeSituation, setActiveSituation] = useState<"mugura" | "sieviete" | "berns">("mugura");
  
  // Interactive booking state
  const [bookingSpecialist, setBookingSpecialist] = useState<string>("elina");
  const [bookingDate, setBookingDate] = useState<number>(2);
  const [bookingTime, setBookingTime] = useState<string>("11:30");
  const [patientName, setPatientName] = useState<string>("");
  const [patientPhone, setPatientPhone] = useState<string>("");
  const [patientEmail, setPatientEmail] = useState<string>("");
  const [patientMessage, setPatientMessage] = useState<string>("");
  const [bookingComplete, setBookingComplete] = useState<boolean>(false);

  // Quick inquiry state
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryContact, setInquiryContact] = useState("");
  const [inquiryText, setInquiryText] = useState("");
  const [inquirySent, setInquirySent] = useState(false);

  const dates = [
    { num: 1, day: "Pirmd.", full: "1. septembris" },
    { num: 2, day: "Otrd.", full: "2. septembris", active: true },
    { num: 3, day: "Trešd.", full: "3. septembris" },
    { num: 4, day: "Ceturtd.", full: "4. septembris" },
    { num: 5, day: "Piektd.", full: "5. septembris" },
  ];

  const times = ["09:00", "10:30", "11:30", "14:00", "15:30", "17:00", "18:30"];

  const situations = {
    mugura: {
      title: "Muguras, spranda un locītavu sāpes",
      subtitle: "Pieaugušajiem ar sēdošu darbu, akūtām sāpēm vai pēc traumām",
      lead: "Kad muguras sāpes vai spranda stīvums no rīta traucē strādāt, vadīt auto un baudīt ikdienu, parasti pie vainas nav viena 'slima vieta', bet gan ilgstošs kustību disbalanss un sēdēšanas paradumi.",
      quote: "“Mēs neatbrīvojam tikai muskuļu sasprindzinājumu kabinetā — mēs parādām, kā ikdienā kustēties tā, lai sāpes neatgrieztos.”",
      author: "Elīna Vītola, vadošā fizioterapeite",
      image: "/concept-physio/service-rehab.jpg",
      details: [
        { label: "Primārā diagnostika", text: "Padziļināta stājas, elpošanas modeļa un kustību biomehānikas analīze (60 min)" },
        { label: "Manuālais darbs", text: "Saudzīga locītavu mobilizācija, fasciju un dziļo muskuļu atbrīvošana" },
        { label: "Mājas rituāls", text: "3 konkrēti mikrokoriģējoši vingrojumi 5 minūtēm dienā pie darba galda vai mājās" },
      ],
      price: "50 € / 60 min",
      specialist: "Elīna Vītola vai Marta Liepa",
    },
    sieviete: {
      title: "Sievietes ķermeņa aprūpe pirms un pēc dzemdībām",
      subtitle: "Gaidību laika atslogošana, diastāzes pārbaude un iegurņa pamatnes atjaunošana",
      lead: "Bērniņa gaidīšana un dzemdības ir milzīgs pārbaudījums sievietes ķermenim. Mēs sniedzam maigu, drošu un zinātniski pamatotu aprūpi, lai Jūs atgūtu stabilitāti, spēku un mieru par savu veselību.",
      quote: "“Pēcdzemdību posmā nedrīkst steigties ar intensīviem treniņiem. Vispirms ir jāatjauno iegurņa pamatnes un dziļās korsetes koordinācija.”",
      author: "Elīna Vītola, sieviešu veselības speciāliste",
      image: "/concept-physio/service-women.jpg",
      details: [
        { label: "Pēcdzemdību novērtējums", text: "Vēdera taisnā muskuļa šķirtnes (diastāzes) un iegurņa stabilitātes pārbaude no 6. nedēļas" },
        { label: "Gaidību laika atbalsts", text: "Muguras jostas daļas un iegurņa saudzīga atslogošana grūtniecības laikā" },
        { label: "Droša atgriešanās", text: "Pakāpenisks plāns spēka un aktīvas dzīves atgūšanai bez pārmērīga spiediena" },
      ],
      price: "50 € / 60 min",
      specialist: "Elīna Vītola",
    },
    berns: {
      title: "Zīdaiņu motorā attīstība un hendlings",
      subtitle: "Mazuļiem no 1 mēneša vecuma, vecāku apmācība un bērnu stājas harmonizācija",
      lead: "Pirmajos dzīves mēnešos kustības veido pamatu visai turpmākajai bērna attīstībai. Mūsu mērķis ir mierīgā, mājīgā vidē palīdzēt mazulim atvērties kustībai un iemācīt vecākiem pareizu bērna celšanu, turēšanu un ģērbšanu.",
      quote: "“Pareizs hendlings nav medicīniska procedūra — tas ir veids, kā ikdienā rotaļājoties dot mazulim drošības sajūtu un simetriju.”",
      author: "Anna Ozola, sertificēta bērnu fizioterapeite",
      image: "/concept-physio/service-children.jpg",
      details: [
        { label: "Motorā diagnostika", text: "Muskuļu tonusa (saspringuma vai vājuma) un simetrijas saudzīga pārbaude" },
        { label: "Vecāku apmācība", text: "Praktiska hendlinga iemaņu apguve bērna celšanai, nēsāšanai un mierināšanai" },
        { label: "Rotaļīga vide", text: "Nodarbības norit siltā, bērnam draudzīgā telpā bez stresa un asarām" },
      ],
      price: "40 € – 45 € / 45 min",
      specialist: "Anna Ozola",
    },
  };

  const specialists = [
    {
      id: "elina",
      name: "Elīna Vītola",
      title: "Vadošā fizioterapeite & prakses dibinātāja",
      creds: "12 gadu klīniskā pieredze · Latvijas Fizioterapeitu asociācijas biedre",
      bio: "Elīnas pieeja apvieno augsta līmeņa funkcionālo biomehāniku ar patiesu cilvēcisku empātiju. Viņa specializējas sarežģītu hronisku muguras sāpju ārstēšanā un sieviešu veselības atjaunošanā pēc dzemdībām.",
      image: "/concept-physio/practitioner-primary.jpg",
      highlight: "Pieņem pirmdienās, trešdienās, piektdienās",
    },
    {
      id: "marta",
      name: "Marta Liepa",
      title: "Sertificēta fizioterapeite",
      creds: "8 gadu pieredze · Sporta un pēctraumu rehabilitācijas virziens",
      bio: "Marta palīdz cilvēkiem atgūt drošību un brīvību pēc akūtām muguras sāpēm, locītavu traumām vai operācijām. Viņas stiprā puse ir precīza kustību korekcija un praktiski ikdienas vingrojumi.",
      image: "/concept-physio/practitioner-2.jpg",
      highlight: "Pieņem otrdienās, ceturtdienās, sestdienās",
    },
    {
      id: "anna",
      name: "Anna Ozola",
      title: "Bērnu fizioterapeite & hendlinga pasniedzēja",
      creds: "7 gadu pieredze · Bērnu motorās attīstības speciāliste",
      bio: "Anna prot radīt mierīgu, uzticamu kontaktu ar katru mazuli. Viņas nodarbībās jaunie vecāki gūst mieru, skaidrību un praktiskas iemaņas, kā ikdienā rūpēties par bērna harmonisku attīstību.",
      image: "/concept-physio/practitioner-3.jpg",
      highlight: "Pieņem darba dienās pēc iepriekšēja pieraksta",
    },
  ];

  const curSit = situations[activeSituation];

  return (
    <div style={{ backgroundColor: "#FAF7F2", color: "#1C2723" }} className="min-h-screen w-full font-sans antialiased selection:bg-[#C86248]/20 selection:text-[#1C2723]">
      
      {/* Editorial Topstrip */}
      <div style={{ backgroundColor: "#1C2723", color: "#FAF7F2" }} className="px-6 py-2.5 text-xs flex flex-wrap items-center justify-between border-b border-white/10 gap-2">
        <div className="flex items-center gap-3">
          <Link href="/" className="font-bold text-[#00C9A7] tracking-tight">saiteo</Link>
          <span className="opacity-40">|</span>
          <span className="opacity-80">Konceptuālā etalona prakse: <strong>KUSTĪBA</strong> (Miera iela 24, Rīga)</span>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <Link href="/case-studies/physiotherapy" className="opacity-70 hover:opacity-100 underline decoration-white/30">
            Kāpēc mēs šo izveidojām? (Stratēģijas analīze) →
          </Link>
        </div>
      </div>

      {/* Atmospheric Studio Header */}
      <header style={{ borderColor: "rgba(28, 39, 35, 0.08)" }} className="sticky top-0 z-40 border-b bg-[#FAF7F2]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-12">
          <Link href="#top" className="group">
            <span className="font-serif text-3xl font-normal tracking-tight text-[#1C2723] block leading-none">
              Kustība
            </span>
            <span className="text-[11px] font-medium tracking-wide text-[#5C6F68] block mt-1">
              Fizioterapijas, sieviešu veselības un bērnu attīstības telpa
            </span>
          </Link>

          <nav className="hidden items-center gap-10 text-sm font-medium text-[#5C6F68] md:flex">
            <a href="#situacijas" className="transition-colors hover:text-[#1C2723]">Kam mēs palīdzam</a>
            <a href="#pieeja" className="transition-colors hover:text-[#1C2723]">Mūsu pieeja</a>
            <a href="#specialistes" className="transition-colors hover:text-[#1C2723]">Speciālistes</a>
            <a href="#telpa" className="transition-colors hover:text-[#1C2723]">Par telpu</a>
            <a href="#cenas" className="transition-colors hover:text-[#1C2723]">Cenas</a>
            <a href="#kontakti" className="transition-colors hover:text-[#1C2723]">Kontakti</a>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/37120000000"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 text-xs font-semibold text-[#5C6F68] hover:text-[#1C2723]"
            >
              <span>WhatsApp saziņa</span>
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

      {/* Hero: The Sanctuary Arrival (Full Viewport Editorial Pacing) */}
      <section id="top" className="py-20 lg:py-28 border-b border-[#1C2723]/08">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-[#C86248]">
                Miera iela 24, Rīga · Klusa pagalma telpa ar liftu
              </p>

              <h1 className="mt-5 font-serif text-4xl sm:text-6xl lg:text-[4rem] font-normal leading-[1.12] tracking-tight text-[#1C2723]">
                Ķermenis atceras visu.<br />
                Mēs palīdzam tam atkal sajusties brīvi un mierīgi.
              </h1>

              <p className="mt-8 max-w-2xl text-lg sm:text-xl font-normal leading-relaxed text-[#5C6F68]">
                Privāta, rūpīga fizioterapijas prakse Rīgā. Mēs neaprobežojamies ar īslaicīgu masāžu vai formālu vingrošanu — mēs veltām laiku, lai saprastu Jūsu sāpju cēloni, sakārtotu kustību modeli un atgrieztu drošības sajūtu par savu ķermeni.
              </p>

              {/* Primary Conversational Direct Triggers */}
              <div className="mt-10 flex flex-wrap items-center gap-5">
                <a
                  href="#pieraksts"
                  style={{ backgroundColor: "#1C2723", color: "#FAF7F2" }}
                  className="rounded-full px-8 py-4 text-sm font-semibold shadow-sm transition-all hover:bg-[#2C3E39]"
                >
                  Izvēlēties laiku kalendārā (60 min)
                </a>
                <a
                  href="#saruna"
                  style={{ borderColor: "rgba(28, 39, 35, 0.2)", backgroundColor: "#FFFFFF", color: "#1C2723" }}
                  className="rounded-full border px-7 py-4 text-sm font-medium transition-colors hover:bg-[#F2ECE1]"
                >
                  Uzdodiet jautājumu ārstei
                </a>
              </div>

              {/* Dignified Reassurance Strip */}
              <div style={{ borderColor: "rgba(28, 39, 35, 0.08)" }} className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t pt-8 text-xs text-[#5C6F68]">
                <div>
                  <strong className="block text-[#1C2723] font-medium text-sm">60 minūtes</strong>
                  <span className="mt-0.5 block">Pilna 1-pret-1 uzmanība</span>
                </div>
                <div>
                  <strong className="block text-[#1C2723] font-medium text-sm">2–3 dienu laikā</strong>
                  <span className="mt-0.5 block">Ātra pieņemšana bez rindas</span>
                </div>
                <div>
                  <strong className="block text-[#1C2723] font-medium text-sm">Apdrošināšana</strong>
                  <span className="mt-0.5 block">Pieņemam visas polises</span>
                </div>
                <div>
                  <strong className="block text-[#1C2723] font-medium text-sm">Ērta vide</strong>
                  <span className="mt-0.5 block">Lifts bērnu ratiņiem</span>
                </div>
              </div>
            </div>

            {/* Hero Visual Harmony */}
            <div className="relative">
              <div style={{ position: "relative", height: "480px", width: "100%", overflow: "hidden", borderRadius: "2.5rem", backgroundColor: "#F2ECE1" }} className="shadow-lg">
                <Image
                  src="/concept-physio/hero-treatment.jpg"
                  alt="Saudzīga un mierīga fizioterapijas nodarbība KUSTĪBA telpā"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover"
                />
              </div>
              <div style={{ backgroundColor: "#FFFFFF", borderColor: "rgba(28, 39, 35, 0.08)" }} className="absolute -bottom-6 -left-6 hidden sm:block max-w-[280px] rounded-3xl border p-6 shadow-md">
                <p className="font-serif text-sm italic text-[#1C2723]">
                  “Sāpes nav jāpacieš un pie tām nav jāpierod.”
                </p>
                <p className="mt-2 text-xs text-[#5C6F68]">
                  Mēs atrodam patieso iemeslu un saudzīgi atjaunojam muskuļu un locītavu sadarbību.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experiential Situational Navigation ("Kam mēs palīdzam?") */}
      <section id="situacijas" className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <p className="text-xs font-medium uppercase tracking-widest text-[#C86248]">
                Aprūpes virzieni
              </p>
              <h2 className="mt-3 font-serif text-3xl sm:text-5xl font-normal text-[#1C2723] leading-tight">
                Kāda ir Jūsu pašreizējā situācija?
              </h2>
            </div>

            {/* Interactive Situation Tabs */}
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActiveSituation("mugura")}
                style={
                  activeSituation === "mugura"
                    ? { backgroundColor: "#1C2723", color: "#FAF7F2" }
                    : { backgroundColor: "#F2ECE1", color: "#5C6F68" }
                }
                className="rounded-full px-6 py-3 text-xs font-semibold transition-all"
              >
                Mugura & locītavas
              </button>
              <button
                type="button"
                onClick={() => setActiveSituation("sieviete")}
                style={
                  activeSituation === "sieviete"
                    ? { backgroundColor: "#1C2723", color: "#FAF7F2" }
                    : { backgroundColor: "#F2ECE1", color: "#5C6F68" }
                }
                className="rounded-full px-6 py-3 text-xs font-semibold transition-all"
              >
                Sievietes veselība & pēcdzemdības
              </button>
              <button
                type="button"
                onClick={() => setActiveSituation("berns")}
                style={
                  activeSituation === "berns"
                    ? { backgroundColor: "#1C2723", color: "#FAF7F2" }
                    : { backgroundColor: "#F2ECE1", color: "#5C6F68" }
                }
                className="rounded-full px-6 py-3 text-xs font-semibold transition-all"
              >
                Zīdaiņi & hendlings
              </button>
            </div>
          </div>

          {/* Deep Situation Story Container */}
          <div style={{ backgroundColor: "#FFFFFF", borderColor: "rgba(28, 39, 35, 0.08)" }} className="mt-12 rounded-[2.5rem] border p-8 sm:p-14 shadow-sm">
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <span className="text-xs font-medium text-[#C86248] uppercase tracking-wider">
                  {curSit.subtitle}
                </span>
                <h3 className="mt-2 font-serif text-3xl sm:text-4xl font-normal text-[#1C2723]">
                  {curSit.title}
                </h3>

                <p className="mt-6 text-base leading-relaxed text-[#5C6F68]">
                  {curSit.lead}
                </p>

                <blockquote style={{ borderLeftColor: "#C86248" }} className="mt-6 border-l-2 pl-5">
                  <p className="font-serif text-sm italic text-[#1C2723]">
                    {curSit.quote}
                  </p>
                  <cite className="mt-1 block text-xs not-italic font-medium text-[#5C6F68]">
                    — {curSit.author}
                  </cite>
                </blockquote>

                {/* 3 Step Breakdown */}
                <div className="mt-8 space-y-4 border-t border-[#1C2723]/08 pt-6">
                  {curSit.details.map((d, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <span className="text-[#C86248] font-serif text-base font-semibold mt-0.5">0{i + 1}</span>
                      <div>
                        <strong className="block text-xs font-semibold text-[#1C2723]">{d.label}</strong>
                        <p className="text-xs leading-relaxed text-[#5C6F68] mt-0.5">{d.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ borderColor: "rgba(28, 39, 35, 0.08)" }} className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t pt-6">
                  <div>
                    <span className="font-serif text-2xl font-normal text-[#1C2723]">{curSit.price}</span>
                    <span className="block text-xs text-[#5C6F68] mt-0.5">Speciāliste: {curSit.specialist}</span>
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

              {/* Photo */}
              <div style={{ position: "relative", height: "460px", width: "100%", overflow: "hidden", borderRadius: "2rem", backgroundColor: "#F2ECE1" }}>
                <Image
                  src={curSit.image}
                  alt={curSit.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clinical Philosophy: "Kāpēc mēs strādājam citādi" */}
      <section id="pieeja" style={{ backgroundColor: "#F2ECE1" }} className="py-20 lg:py-28 border-t border-[#1C2723]/08">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-widest text-[#C86248]">
              Filozofija un metode
            </p>
            <h2 className="mt-3 font-serif text-3xl sm:text-5xl font-normal text-[#1C2723] leading-tight">
              Mēs neārstējam tikai rentgena bildi.<br />
              Mēs atjaunojam Jūsu ķermeņa brīvību.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-[#5C6F68] sm:text-lg">
              Bieži vien sāpes ceļgalā rodas no nestabilas pēdas vai vāja iegurņa. Sāpes kakla daļā rodas no elpošanas modeļa un sēdēšanas ieradumiem. Nodarbībā mēs atrodam patieso cēloni un palīdzam ķermenim atgūt dabisko līdzsvaru.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div style={{ backgroundColor: "#FAF7F2", borderColor: "rgba(28, 39, 35, 0.08)" }} className="rounded-3xl border p-8 shadow-xs">
              <span className="font-serif text-3xl text-[#C86248]">01</span>
              <h3 className="mt-4 font-serif text-2xl font-normal text-[#1C2723]">
                Padziļināta diagnostika (20 min)
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-[#5C6F68] sm:text-sm">
                Mēs uzklausām Jūsu slimības vēsturi, izvērtējam stāju, mugurkaula mobilitāti, fasciju sasprindzinājumu un elpošanu.
              </p>
            </div>

            <div style={{ backgroundColor: "#FAF7F2", borderColor: "rgba(28, 39, 35, 0.08)" }} className="rounded-3xl border p-8 shadow-xs">
              <span className="font-serif text-3xl text-[#C86248]">02</span>
              <h3 className="mt-4 font-serif text-2xl font-normal text-[#1C2723]">
                Saudzīga terapija (30 min)
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-[#5C6F68] sm:text-sm">
                Manuālais darbs pie audu atbrīvošanas, locītavu mobilizācija un precīzi koriģējošie vingrojumi kabinetā ārstes vadībā.
              </p>
            </div>

            <div style={{ backgroundColor: "#FAF7F2", borderColor: "rgba(28, 39, 35, 0.08)" }} className="rounded-3xl border p-8 shadow-xs">
              <span className="font-serif text-3xl text-[#C86248]">03</span>
              <h3 className="mt-4 font-serif text-2xl font-normal text-[#1C2723]">
                Mājas rituāls 5 minūtēm (10 min)
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-[#5C6F68] sm:text-sm">
                Jūs saņemat 2–3 vienkāršus vingrojumus mājas videi, lai nostiprinātu sasniegto atvieglojumu ilgtermiņā.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Specialist Team Showcase */}
      <section id="specialistes" className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-widest text-[#C86248]">
              Speciālistes
            </p>
            <h2 className="mt-3 font-serif text-3xl sm:text-5xl font-normal text-[#1C2723]">
              Fizioterapeites, kuras iedziļinās
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#5C6F68]">
              Sertificētas ārstniecības personas ar regulāru starptautisku tālākizglītību un patiesu mīlestību pret savu darbu:
            </p>
          </div>

          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {specialists.map((person) => (
              <div
                key={person.id}
                style={{ backgroundColor: "#FFFFFF", borderColor: "rgba(28, 39, 35, 0.08)" }}
                className="flex flex-col justify-between rounded-[2rem] border p-8 shadow-xs"
              >
                <div>
                  <div style={{ position: "relative", height: "360px", width: "100%", overflow: "hidden", borderRadius: "1.5rem", backgroundColor: "#F2ECE1" }}>
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-top"
                    />
                  </div>

                  <h3 className="mt-6 font-serif text-2xl font-normal text-[#1C2723]">
                    {person.name}
                  </h3>
                  <p className="text-xs font-medium text-[#C86248] mt-0.5">{person.title}</p>
                  <p className="text-[11px] text-[#5C6F68] mt-0.5">{person.creds}</p>

                  <p className="mt-4 text-xs sm:text-sm leading-relaxed text-[#5C6F68]">
                    {person.bio}
                  </p>

                  <div style={{ backgroundColor: "#FAF7F2", borderColor: "rgba(28, 39, 35, 0.06)" }} className="mt-5 rounded-xl border p-3 text-[11px] font-medium text-[#1C2723]">
                    ✦ {person.highlight}
                  </div>
                </div>

                <a
                  href="#pieraksts"
                  onClick={() => setBookingSpecialist(person.id)}
                  style={{ borderColor: "rgba(28, 39, 35, 0.15)", backgroundColor: "#FAF7F2", color: "#1C2723" }}
                  className="mt-8 block text-center rounded-full border py-3 text-xs font-semibold transition-colors hover:bg-[#1C2723] hover:text-[#FAF7F2]"
                >
                  Izvēlēties pieņemšanas laiku →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Real Patient Recovery Experiences */}
      <section className="py-20 lg:py-28 bg-[#F2ECE1] border-t border-[#1C2723]/08">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-widest text-[#C86248]">
              Pieredze un rezultāti
            </p>
            <h2 className="mt-3 font-serif text-3xl sm:text-5xl font-normal text-[#1C2723]">
              Ko saka mūsu pacienti
            </h2>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {stories.map((story, i) => (
              <div
                key={i}
                style={{ backgroundColor: "#FAF7F2", borderColor: "rgba(28, 39, 35, 0.08)" }}
                className="flex flex-col justify-between rounded-3xl border p-8 shadow-xs"
              >
                <p className="font-serif text-base leading-relaxed italic text-[#1C2723]">
                  “{story.quote}”
                </p>
                <div style={{ borderColor: "rgba(28, 39, 35, 0.08)" }} className="mt-6 border-t pt-4">
                  <strong className="block text-xs font-semibold text-[#1C2723]">{story.author}</strong>
                  <span className="text-[11px] text-[#5C6F68]">{story.meta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dignified Pricing Section */}
      <section id="cenas" className="py-20 lg:py-28 border-t border-[#1C2723]/08">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="text-center">
            <p className="text-xs font-medium uppercase tracking-widest text-[#C86248]">
              Cenrādis
            </p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-normal text-[#1C2723]">
              Caurspīdīgas pakalpojumu cenas
            </h2>
            <p className="mt-2 text-xs text-[#5C6F68]">
              Visi nodarbībai nepieciešamie materiāli (kinezioloģiskā teipošana, inventārs) ir iekļauti vizītes cenā.
            </p>
          </div>

          <div style={{ backgroundColor: "#FFFFFF", borderColor: "rgba(28, 39, 35, 0.08)" }} className="mt-12 overflow-hidden rounded-3xl border shadow-sm">
            <div className="divide-y divide-[#1C2723]/08 text-sm">
              <div className="flex items-center justify-between p-6 sm:p-7">
                <div>
                  <p className="font-medium text-[#1C2723]">Pirmreizēja fizioterapeita konsultācija & diagnostika</p>
                  <p className="text-xs text-[#5C6F68] mt-0.5">Pilna kustību pārbaude, manuālie testi, pirmā terapija un mājas plāns (60 min)</p>
                </div>
                <span className="font-serif text-xl text-[#1C2723]">50 €</span>
              </div>

              <div className="flex items-center justify-between p-6 sm:p-7">
                <div>
                  <p className="font-medium text-[#1C2723]">Atkārtota individuālā fizioterapijas nodarbība</p>
                  <p className="text-xs text-[#5C6F68] mt-0.5">Manuāla terapija un koriģējošie vingrojumi ar speciālisti (60 min)</p>
                </div>
                <span className="font-serif text-xl text-[#1C2723]">45 €</span>
              </div>

              <div className="flex items-center justify-between p-6 sm:p-7">
                <div>
                  <p className="font-medium text-[#1C2723]">Sieviešu veselības un pēcdzemdību vizīte</p>
                  <p className="text-xs text-[#5C6F68] mt-0.5">Diastāzes pārbaude, iegurņa pamatnes muskuļu atjaunošana (60 min)</p>
                </div>
                <span className="font-serif text-xl text-[#1C2723]">50 €</span>
              </div>

              <div className="flex items-center justify-between p-6 sm:p-7">
                <div>
                  <p className="font-medium text-[#1C2723]">Zīdaiņu motorā attīstība & hendlinga apmācība</p>
                  <p className="text-xs text-[#5C6F68] mt-0.5">Praktiska vecāku apmācība un mazuļa kustību harmonizācija (45 min)</p>
                </div>
                <span className="font-serif text-xl text-[#1C2723]">40 €</span>
              </div>

              <div style={{ backgroundColor: "#F2ECE1" }} className="flex items-center justify-between p-6 sm:p-7">
                <div>
                  <p className="font-medium text-[#C86248]">5 nodarbību kurss (abonements)</p>
                  <p className="text-xs text-[#5C6F68] mt-0.5">Derīgs 3 mēnešus no iegādes brīža (ietaupījums 25 €)</p>
                </div>
                <span className="font-serif text-xl font-bold text-[#C86248]">200 €</span>
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: "#FFFFFF", borderColor: "rgba(28, 39, 35, 0.08)" }} className="mt-8 rounded-2xl border p-5 text-center text-xs text-[#5C6F68]">
            Pēc katras vizītes izsniedzam čeku un ārstniecības personas izrakstu, ko pieņem <strong>Balta</strong>, <strong>BTA</strong>, <strong>Compensa</strong>, <strong>Ergo</strong>, <strong>Gjensidige</strong> un citas apdrošināšanas kompānijas.
          </div>
        </div>
      </section>

      {/* Reinvented Conversational Booking Experience */}
      <section id="pieraksts" className="py-20 lg:py-28 bg-[#F2ECE1] border-t border-[#1C2723]/08">
        <div className="mx-auto max-w-5xl px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-medium uppercase tracking-widest text-[#C86248]">
              Tiešsaistes rezervācija
            </p>
            <h2 className="mt-3 font-serif text-3xl sm:text-5xl font-normal text-[#1C2723]">
              Piesakiet vizīti sev ērtā laikā
            </h2>
            <p className="mt-3 text-sm text-[#5C6F68]">
              Izvēlieties speciālisti un sev piemērotāko laiku. Apstiprinājums uzreiz tiks nosūtīts uz Jūsu tālruni.
            </p>
          </div>

          <div style={{ backgroundColor: "#FAF7F2", borderColor: "rgba(28, 39, 35, 0.08)" }} className="mt-14 rounded-[2.5rem] border p-8 sm:p-14 shadow-sm">
            {bookingComplete ? (
              <div className="p-8 text-center max-w-lg mx-auto">
                <span className="font-serif text-4xl text-[#C86248]">✓</span>
                <h3 className="mt-4 font-serif text-3xl font-normal text-[#1C2723]">
                  Paldies, {patientName || "cien. pacient"}!
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[#5C6F68]">
                  Jūsu pieteikums ir veiksmīgi reģistrēts uz <strong>{dates.find(d => d.num === bookingDate)?.full} plkst. {bookingTime}</strong> pie speciālistes <strong>{specialists.find(s => s.id === bookingSpecialist)?.name}</strong>.
                </p>
                <div style={{ backgroundColor: "#FFFFFF", borderColor: "rgba(28, 39, 35, 0.08)" }} className="mt-6 rounded-2xl border p-5 text-xs text-left">
                  <p>📍 <strong>Adrese:</strong> Rīga, Miera iela 24, 2. stāvs (pieejams ērts lifts)</p>
                  <p className="mt-1">📞 <strong>Tālrunis:</strong> +371 67 000 000</p>
                </div>
                <button
                  type="button"
                  onClick={() => setBookingComplete(false)}
                  style={{ backgroundColor: "#1C2723", color: "#FAF7F2" }}
                  className="mt-8 rounded-full px-7 py-3 text-xs font-semibold"
                >
                  Pieteikt citu laiku
                </button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setBookingComplete(true); }}>
                {/* 1. Specialist Selector */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#1C2723]">
                    1. Izvēlieties speciālisti
                  </p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {specialists.map((spec) => (
                      <button
                        key={spec.id}
                        type="button"
                        onClick={() => setBookingSpecialist(spec.id)}
                        style={
                          bookingSpecialist === spec.id
                            ? { backgroundColor: "#FFFFFF", borderColor: "#C86248", boxShadow: "0 4px 16px rgba(200,98,72,0.12)" }
                            : { backgroundColor: "#F2ECE1", borderColor: "rgba(28, 39, 35, 0.08)" }
                        }
                        className="flex items-center gap-3.5 rounded-2xl border p-4 text-left transition-all"
                      >
                        <div style={{ position: "relative", height: "48px", width: "48px", overflow: "hidden", borderRadius: "9999px", flexShrink: 0 }}>
                          <Image src={spec.image} alt={spec.name} fill sizes="48px" className="object-cover" />
                        </div>
                        <div>
                          <p className="font-serif text-sm text-[#1C2723]">{spec.name}</p>
                          <span className="text-[11px] text-[#C86248] font-medium block">{spec.highlight.split(" ")[0]} {spec.highlight.split(" ")[1]}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Date & Time Selection */}
                <div className="mt-10 border-t border-[#1C2723]/08 pt-8">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#1C2723]">
                    2. Izvēlieties datumu un sākuma laiku (Septembris 2026)
                  </p>
                  
                  {/* Days */}
                  <div className="mt-4 grid grid-cols-5 gap-2">
                    {dates.map((d) => (
                      <button
                        key={d.num}
                        type="button"
                        onClick={() => setBookingDate(d.num)}
                        style={
                          bookingDate === d.num
                            ? { backgroundColor: "#C86248", color: "#FFFFFF", borderColor: "#C86248" }
                            : { backgroundColor: "#FFFFFF", color: "#1C2723", borderColor: "rgba(28, 39, 35, 0.08)" }
                        }
                        className="rounded-2xl p-3.5 text-center border transition-all"
                      >
                        <p className="text-[11px] opacity-75">{d.day}</p>
                        <p className="font-serif text-xl font-normal mt-0.5">{d.num}</p>
                      </button>
                    ))}
                  </div>

                  {/* Time Chips */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {times.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setBookingTime(t)}
                        style={
                          bookingTime === t
                            ? { backgroundColor: "#1C2723", color: "#FAF7F2", borderColor: "#1C2723" }
                            : { backgroundColor: "#FFFFFF", color: "#1C2723", borderColor: "rgba(28, 39, 35, 0.08)" }
                        }
                        className="rounded-xl border px-4 py-2 font-mono text-xs font-medium transition-all"
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Patient Information */}
                <div className="mt-10 border-t border-[#1C2723]/08 pt-8">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#1C2723] mb-4">
                    3. Jūsu dati pieraksta apstiprināšanai
                  </p>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-medium text-[#1C2723]">Vārds, Uzvārds *</label>
                      <input
                        type="text"
                        required
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        placeholder="Anna Bērziņa"
                        style={{ borderColor: "rgba(28, 39, 35, 0.12)", backgroundColor: "#FFFFFF", color: "#1C2723" }}
                        className="mt-1.5 w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#1C2723]">Tālruņa numurs *</label>
                      <input
                        type="tel"
                        required
                        value={patientPhone}
                        onChange={(e) => setPatientPhone(e.target.value)}
                        placeholder="+371 20 000 000"
                        style={{ borderColor: "rgba(28, 39, 35, 0.12)", backgroundColor: "#FFFFFF", color: "#1C2723" }}
                        className="mt-1.5 w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-medium text-[#1C2723]">E-pasts (atgādinājumam)</label>
                      <input
                        type="email"
                        value={patientEmail}
                        onChange={(e) => setPatientEmail(e.target.value)}
                        placeholder="anna@piemers.lv"
                        style={{ borderColor: "rgba(28, 39, 35, 0.12)", backgroundColor: "#FFFFFF", color: "#1C2723" }}
                        className="mt-1.5 w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#1C2723]">Kas šobrīd sagādā vislielākās grūtības?</label>
                      <input
                        type="text"
                        value={patientMessage}
                        onChange={(e) => setPatientMessage(e.target.value)}
                        placeholder="Piem., muguras jostas daļa, pēcdzemdības"
                        style={{ borderColor: "rgba(28, 39, 35, 0.12)", backgroundColor: "#FFFFFF", color: "#1C2723" }}
                        className="mt-1.5 w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[#1C2723]/08 pt-6">
                    <span className="text-xs text-[#5C6F68]">
                      Izvēlēts: <strong>{dates.find(d => d.num === bookingDate)?.full} plkst. {bookingTime}</strong> ({specialists.find(s => s.id === bookingSpecialist)?.name})
                    </span>
                    <button
                      type="submit"
                      style={{ backgroundColor: "#C86248", color: "#FFFFFF" }}
                      className="rounded-full px-9 py-3.5 text-sm font-semibold shadow-md transition-transform hover:-translate-y-0.5 hover:bg-[#B7533A]"
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

      {/* Empathetic Direct Question & Inquiry Channel */}
      <section id="saruna" className="py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-6 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-[#C86248]">
                Saziņa un jautājumi
              </p>
              <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-normal text-[#1C2723]">
                Neesat pārliecināti, ar kuru speciālisti sākt?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#5C6F68]">
                Uzdodiet savu jautājumu šeit vai uzrakstiet mums WhatsApp. Mūsu fizioterapeite iepazīsies ar Jūsu situāciju un ieteiks piemērotāko speciālisti un pirmo soli.
              </p>

              <div style={{ borderColor: "rgba(28, 39, 35, 0.08)" }} className="mt-8 space-y-3 border-t pt-6 text-xs text-[#5C6F68]">
                <p>📞 <strong>Tālrunis:</strong> <a href="tel:+37167000000" className="text-[#1C2723] font-medium underline">+371 67 000 000</a></p>
                <p>💬 <strong>WhatsApp tiešā saziņa:</strong> <a href="https://wa.me/37120000000" target="_blank" rel="noopener noreferrer" className="text-[#C86248] font-medium underline">+371 20 000 000</a></p>
                <p>📍 <strong>Adrese:</strong> Miera iela 24, Rīga (2. stāvs, pieejams lifts)</p>
              </div>
            </div>

            <div style={{ backgroundColor: "#FFFFFF", borderColor: "rgba(28, 39, 35, 0.08)" }} className="rounded-3xl border p-8 shadow-sm">
              {inquirySent ? (
                <div className="p-6 text-center">
                  <span className="font-serif text-3xl text-[#C86248]">✓</span>
                  <h3 className="mt-3 font-serif text-2xl font-normal text-[#1C2723]">Paldies par ziņu!</h3>
                  <p className="mt-2 text-xs text-[#5C6F68]">Fizioterapeite sazināsies ar Jums darba laikā 15–30 minūšu laikā.</p>
                  <button
                    type="button"
                    onClick={() => setInquirySent(false)}
                    style={{ backgroundColor: "#1C2723", color: "#FAF7F2" }}
                    className="mt-6 rounded-full px-6 py-2 text-xs font-semibold"
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
                    <label className="block text-xs font-medium text-[#1C2723]">Jūsu vārds *</label>
                    <input
                      type="text"
                      required
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      placeholder="Anna"
                      style={{ borderColor: "rgba(28, 39, 35, 0.12)", backgroundColor: "#FAF7F2", color: "#1C2723" }}
                      className="mt-1 w-full rounded-xl border px-3.5 py-2.5 text-sm focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#1C2723]">Tālrunis vai WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={inquiryContact}
                      onChange={(e) => setInquiryContact(e.target.value)}
                      placeholder="+371 20 000 000"
                      style={{ borderColor: "rgba(28, 39, 35, 0.12)", backgroundColor: "#FAF7F2", color: "#1C2723" }}
                      className="mt-1 w-full rounded-xl border px-3.5 py-2.5 text-sm focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#1C2723]">Jautājums vai situācijas apraksts</label>
                    <textarea
                      rows={3}
                      required
                      value={inquiryText}
                      onChange={(e) => setInquiryText(e.target.value)}
                      placeholder="Kas Jums rada diskomfortu, vai ir bijusi trauma vai izmeklējumi?"
                      style={{ borderColor: "rgba(28, 39, 35, 0.12)", backgroundColor: "#FAF7F2", color: "#1C2723" }}
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

      {/* Atmospheric Studio Footer */}
      <footer id="kontakti" style={{ backgroundColor: "#F2ECE1", borderColor: "rgba(28, 39, 35, 0.08)" }} className="border-t py-16 text-[#5C6F68]">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid gap-12 md:grid-cols-3">
            <div>
              <span className="font-serif text-2xl text-[#1C2723]">Kustība</span>
              <p className="mt-1 text-xs text-[#5C6F68]">Fizioterapijas, sieviešu veselības un bērnu attīstības telpa</p>
              <p className="mt-4 text-xs leading-relaxed text-[#5C6F68]">
                Miera iela 24, Rīga, LV-1001.<br />
                Ieeja no Miera ielas pagalma, 2. stāvs, pieejams ērts lifts bērnu ratiņiem un personām ar kustību ierobežojumiem.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#1C2723]">Darba laiks</p>
              <ul className="mt-3 space-y-1.5 text-xs font-mono text-[#5C6F68]">
                <li>Pirmdiena – Piektdiena: 08:00 – 20:00</li>
                <li>Sestdiena: 09:00 – 15:00 (pēc pieraksta)</li>
                <li>Svētdiena: Slēgts</li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#1C2723]">Saziņa</p>
              <p className="mt-3 text-xs">
                Tālrunis: <a href="tel:+37167000000" className="text-[#1C2723] font-medium underline">+371 67 000 000</a>
              </p>
              <p className="mt-1 text-xs">
                E-pasts: <a href="mailto:sveiki@kustiba-demo.lv" className="text-[#1C2723] font-medium underline">sveiki@kustiba-demo.lv</a>
              </p>
              <p className="mt-1 text-xs">
                WhatsApp: <a href="https://wa.me/37120000000" className="text-[#C86248] font-medium underline">+371 20 000 000</a>
              </p>
            </div>
          </div>

          <div style={{ borderColor: "rgba(28, 39, 35, 0.08)" }} className="mt-12 border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5C6F68]/70">
            <p>© {new Date().getFullYear()} KUSTĪBA. Demonstrācijas koncepts.</p>
            <div className="flex items-center gap-4">
              <Link href="/case-studies/physiotherapy" className="text-[#1C2723] hover:underline font-medium">
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
