"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function PhysiotherapyConceptPage() {
  // Triage state
  const [activeTab, setActiveTab] = useState<"mugura" | "sievietes" | "zidaini" | "traumas">("mugura");
  
  // Insurance calculator state
  const [selectedInsurance, setSelectedInsurance] = useState<string>("balta");
  const [hasReferral, setHasReferral] = useState<boolean>(false);

  // Booking engine state
  const [specialist, setSpecialist] = useState<string>("elina");
  const [selectedDate, setSelectedDate] = useState<string>("2026-09-02");
  const [selectedTime, setSelectedTime] = useState<string>("11:30");
  const [serviceType, setServiceType] = useState<string>("first");
  const [patientName, setPatientName] = useState<string>("");
  const [patientPhone, setPatientPhone] = useState<string>("");
  const [patientEmail, setPatientEmail] = useState<string>("");
  const [patientNotes, setPatientNotes] = useState<string>("");
  const [isBooked, setIsBooked] = useState<boolean>(false);

  // Quick inquiry state
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryPhone, setInquiryPhone] = useState("");
  const [inquiryMsg, setInquiryMsg] = useState("");
  const [inquirySent, setInquirySent] = useState(false);

  // FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const specialists = [
    {
      id: "elina",
      name: "Elīna Vītola",
      title: "Vadošā fizioterapeite & dibinātāja",
      experience: "12 gadi klīniskajā praksē",
      specialty: "Mugurkaula biomehānika, sieviešu veselība & pēcdzemdību rehabilitācija",
      education: "RSU Rehabilitācijas fakultāte · Starptautiskie DNS un Mulligan kursi",
      image: "/concept-physio/practitioner-primary.jpg",
      days: "Pirmdiena, Trešdiena, Piektdiena",
      quote: "Mūsu mērķis nav īslaicīgi noņemt simptomu, bet iemācīt Jūsu ķermenim kustēties tā, lai sāpes neatgrieztos.",
    },
    {
      id: "marta",
      name: "Marta Liepa",
      title: "Sertificēta fizioterapeite",
      experience: "8 gadi klīniskajā praksē",
      specialty: "Akūtas muguras sāpes, sporta un pēctraumu rehabilitācija",
      education: "RSU bakalaurs · K-Active teipošanas un manuālās terapijas sertifikāti",
      image: "/concept-physio/practitioner-2.jpg",
      days: "Otrdiena, Ceturtdiena, Sestdiena",
      quote: "Skaidra kustību tehnika un precīza slodzes dozēšana ļauj ķermenim dabiski un droši atjaunoties.",
    },
    {
      id: "anna",
      name: "Anna Ozola",
      title: "Bērnu fizioterapeite & hendlinga speciāliste",
      experience: "7 gadi bērnu veselības aprūpē",
      specialty: "Zīdaiņu motorā attīstība, muskuļu tonuss & hendlinga apmācība vecākiem",
      education: "RSU fizioterapija · Bobath un Emmi Pikleres metodes sertifikācija",
      image: "/concept-physio/practitioner-3.jpg",
      days: "Pirmdiena līdz Piektdiena (pēc pieraksta)",
      quote: "Mierīga un mīloša vide kabinetā ļauj mazulim atvērties kustībai priecīgā, dabiskā veidā.",
    },
  ];

  const triageData = {
    mugura: {
      tag: "Pieaugušajiem · Sēdošs darbs · Mugurkaula slodze",
      title: "Muguras, kakla un locītavu sāpes",
      desc: "Kad sēdošs darbs pie datora, diska trūce vai spranda stīvums no rīta traucē baudīt ikdienu. Mēs atrodam patieso sāpju iemeslu un atbrīvojam sasprindzinājumu.",
      firstVisit: "60 minūšu padziļināta stājas un kustību diagnostika, saudzīga manuālā terapija un individuāls 5 minūšu mājas plāns.",
      timeline: "Atvieglojums parasti jūtams jau 1. vizītē. Ilgstošam rezultātam: 3–5 nodarbības.",
      price: "50 € / 60 min",
      specialist: "Elīna Vītola vai Marta Liepa",
      image: "/concept-physio/service-rehab.jpg",
    },
    sievietes: {
      tag: "Gaidību laiks · Pēcdzemdību periods · Diastāze",
      title: "Sievietes ķermeņa aprūpe pirms un pēc dzemdībām",
      desc: "Maigs un zinātnisks atbalsts sievietes ķermenim. Vēdera taisnā muskuļa šķirtnes (diastāzes) izvērtēšana, iegurņa pamatnes muskuļu nostiprināšana un muguras atslogošana.",
      firstVisit: "Diastāzes pārbaude no 6. pēcdzemdību nedēļas, elpošanas modeļa korekcija un saudzīga dziļās muskulatūras aktivizēšana.",
      timeline: "3–4 vizītes apvienojumā ar vienkāršiem ikdienas vingrojumiem mājās pie mazuļa.",
      price: "50 € / 60 min",
      specialist: "Elīna Vītola",
      image: "/concept-physio/service-women.jpg",
    },
    zidaini: {
      tag: "Zīdaiņiem no 1 mēneša · Vecāku hendlings · Motorika",
      title: "Zīdaiņu motorā attīstība & hendlings",
      desc: "Praktiska un mierīga vecāku apmācība pareizā hendlingā. Kā mazuli celt, nēsāt un ģērbt, lai dabiski veicinātu velšanos, rāpošanu un simetrisku kustību koordināciju bez asarām.",
      firstVisit: "Muskuļu tonusa un simetrijas pārbaude, praktiska nodarbība vecākiem siltā, mierīgā vidē.",
      timeline: "Parasti pietiek ar 1–2 vizītēm praktisko iemaņu apguvei.",
      price: "40 € / 45 min",
      specialist: "Anna Ozola",
      image: "/concept-physio/service-children.jpg",
    },
    traumas: {
      tag: "Pēc traumām · Operācijām · Saišu bojājumiem",
      title: "Pēctraumu un pēcoperāciju rehabilitācija",
      desc: "Mērķtiecīga kustību apjoma, spēka un stabilitātes atjaunošana pēc locītavu traumām, saišu plīsumiem, meniska vai mugurkaula operācijām.",
      firstVisit: "Kustību amplitūdas mērījumi, rētaudu apstrāde, kinezioloģiskā teipošana un saudzīga mobilizācija.",
      timeline: "Pakāpenisks 4–8 nodarbību kurss atbilstoši ārstējošā ārsta rekomendācijām.",
      price: "50 € / 60 min",
      specialist: "Marta Liepa",
      image: "/concept-physio/service-movement.jpg",
    },
  };

  const currentTriage = triageData[activeTab];

  const insuranceInfo: Record<string, { name: string; coverage: string; desc: string }> = {
    balta: {
      name: "Balta",
      coverage: "Līdz 100% no vizītes cenas",
      desc: "Apmaksā fizikālās un rehabilitācijas medicīnas pakalpojumus, fizioterapiju un teipošanu atbilstoši Jūsu polises limitam.",
    },
    bta: {
      name: "BTA",
      coverage: "Līdz 100% no vizītes cenas",
      desc: "Apmaksā sertificēta fizioterapeita konsultācijas un individuālās nodarbības, iesniedzot mūsu izsniegto čeku un ārstniecības izrakstu.",
    },
    compensa: {
      name: "Compensa Life",
      coverage: "Līdz 100% no vizītes cenas",
      desc: "Pilna vai daļēja atmaksa atbilstoši ambulatorās rehabilitācijas un maksas pakalpojumu programmai.",
    },
    ergo: {
      name: "ERGO",
      coverage: "Līdz 100% no vizītes cenas",
      desc: "Apmaksā fizioterapeita pakalpojumus un ārstniecisko vingrošanu pēc pievienotā čeka.",
    },
    gjensidige: {
      name: "Gjensidige",
      coverage: "Līdz 100% no vizītes cenas",
      desc: "Apmaksā rehabilitācijas pakalpojumus un funkcionālo diagnostiku.",
    },
  };

  const dates = [
    { value: "2026-09-02", label: "Trešdiena, 2. septembris", slots: 5 },
    { value: "2026-09-03", label: "Ceturtdiena, 3. septembris", slots: 4 },
    { value: "2026-09-04", label: "Piektdiena, 4. septembris", slots: 2 },
    { value: "2026-09-07", label: "Pirmdiena, 7. septembris", slots: 6 },
    { value: "2026-09-08", label: "Otrdiena, 8. septembris", slots: 3 },
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

  const faqs = [
    {
      q: "Kas man jāņem līdzi uz pirmo vizīti?",
      a: "Ērts, elastīgs apģērbs (t-krekls, legingi vai mīkstas bikses). Ja Jums ir iepriekš veiktie izmeklējumu slēdzieni (rentgens, magnētiskā rezonanse, USG), ņemiet tos līdzi.",
    },
    {
      q: "Vai nepieciešams ārsta nosūtījums?",
      a: "Nē, privātai fizioterapeita konsultācijai ārsta nosūtījums nav obligāts. Mūsu speciālistes ir sertificētas ārstniecības personas un pašas veic padziļinātu funkcionālo novērtējumu.",
    },
    {
      q: "Kā notiek norēķināšanās ar apdrošināšanu?",
      a: "Pēc katras vizītes mēs izsniedzam oficiālu čeku un ārstniecības personas izrakstu ar visiem nepieciešamajiem kodiem, ko Jūs iesniedzat savai apdrošināšanas kompānijai lietotnē vai e-pastā.",
    },
    {
      q: "Kā nokļūt praksē un vai ēkā pieejams lifts?",
      a: "Prakse atrodas Rīgā, Miera ielā 24, klusā pagalma ēkas 2. stāvā. Ēkā ir ērts un plašs lifts — pie mums var ērti ierasties gan ar bērnu ratiņiem, gan personām ar kustību ierobežojumiem. Pagalmā pieejama bezmaksas stāvvieta klientiem.",
    },
  ];

  const selectedSpecialistObj = specialists.find((s) => s.id === specialist) || specialists[0];
  const selectedDateObj = dates.find((d) => d.value === selectedDate) || dates[0];

  return (
    <div className="min-h-screen w-full bg-[#FFFFFF] text-[#0F1715] font-sans antialiased selection:bg-[#166534]/15 selection:text-[#0F1715]">
      
      {/* Studio Top Announcement Bar */}
      <div className="bg-[#0F1715] text-[#FFFFFF] px-6 py-2.5 text-xs flex flex-wrap items-center justify-between gap-3 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Link href="/" className="font-bold text-[#00C9A7] tracking-tight">saiteo</Link>
          <span className="text-white/30">|</span>
          <span className="text-white/80">KUSTĪBA · Fizioterapijas, sieviešu veselības un bērnu attīstības prakse (Miera iela 24, Rīga)</span>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <Link href="/case-studies/physiotherapy" className="text-white/70 hover:text-white underline decoration-white/30">
            Kāpēc šis etalons konvertē? (Stratēģijas analīze) →
          </Link>
        </div>
      </div>

      {/* Main Crisp Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-black/[0.06]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
          <Link href="#top" className="flex flex-col">
            <span className="font-serif text-2xl lg:text-3xl font-medium tracking-tight text-[#0F1715]">
              Kustība
            </span>
            <span className="text-[11px] font-medium text-[#4B5854] tracking-normal">
              Fizioterapijas & rehabilitācijas telpa
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#4B5854]">
            <a href="#triage" className="transition-colors hover:text-[#0F1715]">Virzieni</a>
            <a href="#soli" className="transition-colors hover:text-[#0F1715]">Vizītes gaita</a>
            <a href="#specialistes" className="transition-colors hover:text-[#0F1715]">Speciālistes</a>
            <a href="#apdrosinasana" className="transition-colors hover:text-[#0F1715]">Apdrošināšana</a>
            <a href="#cenas" className="transition-colors hover:text-[#0F1715]">Cenas</a>
            <a href="#atsauksmes" className="transition-colors hover:text-[#0F1715]">Pieredze</a>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="tel:+37167000000"
              className="hidden sm:inline-block text-xs font-semibold text-[#4B5854] hover:text-[#0F1715]"
            >
              +371 67 000 000
            </a>
            <a
              href="#pieraksts"
              className="rounded-full bg-[#166534] px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition-all hover:bg-[#14532D] hover:shadow-md"
            >
              Pieteikt vizīti
            </a>
          </div>
        </div>
      </header>

      {/* Hero: Daylight, Spacious, Human & Reassuring */}
      <section id="top" className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-black/[0.06] bg-gradient-to-b from-[#F8FAF9] to-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#166534]/20 bg-[#166534]/5 px-3.5 py-1 text-xs font-medium text-[#166534]">
                <span>📍 Miera iela 24, Rīga</span>
                <span className="opacity-40">•</span>
                <span>Pieņemšana 2–3 dienu laikā</span>
              </div>

              <h1 className="mt-5 font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.14] tracking-tight text-[#0F1715]">
                Ķermenis atceras visu.<br />
                Mēs palīdzam tam atkal kustēties viegli un brīvi.
              </h1>

              <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-[#4B5854]">
                Fizioterapija un saudzīga rehabilitācija pieaugušajiem ar muguras un locītavu sāpēm, sievietēm gaidību un pēcdzemdību laikā, kā arī zīdaiņu hendlings. Rūpīga iedziļināšanās cēloņos — mājīgā vidē, bez steigas un bez virspusējiem šabloniem.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href="#pieraksts"
                  className="rounded-full bg-[#166534] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#14532D] hover:shadow-md hover:-translate-y-0.5"
                >
                  Pieteikt pirmo vizīti (60 min)
                </a>
                <a
                  href="https://wa.me/37120000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-6 py-3.5 text-sm font-medium text-[#0F1715] transition-colors hover:bg-black/[0.03]"
                >
                  <span>Jautāt WhatsApp</span>
                </a>
              </div>

              <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-black/[0.06] pt-6 text-xs text-[#4B5854]">
                <div>
                  <strong className="block text-[#0F1715] font-semibold text-sm">60 minūtes</strong>
                  <span className="text-[11px]">1-pret-1 darbs kabinetā</span>
                </div>
                <div>
                  <strong className="block text-[#0F1715] font-semibold text-sm">2–3 dienas</strong>
                  <span className="text-[11px]">Ātra pieņemšana bez rindas</span>
                </div>
                <div>
                  <strong className="block text-[#0F1715] font-semibold text-sm">Apdrošināšana</strong>
                  <span className="text-[11px]">Pieņemam visas polises</span>
                </div>
                <div>
                  <strong className="block text-[#0F1715] font-semibold text-sm">Ērta piekļuve</strong>
                  <span className="text-[11px]">Lifts & stāvvieta pagalmā</span>
                </div>
              </div>
            </div>

            {/* Hero Image Container */}
            <div className="relative">
              <div className="relative h-[440px] sm:h-[500px] w-full overflow-hidden rounded-3xl bg-[#F0F3F1] shadow-xl border border-black/[0.06]">
                <Image
                  src="/concept-physio/hero-treatment.jpg"
                  alt="Mājīga un gaiša fizioterapijas nodarbība KUSTĪBA telpā"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -left-5 hidden sm:block max-w-xs rounded-2xl bg-white p-5 shadow-lg border border-black/[0.08]">
                <p className="font-serif text-sm italic text-[#0F1715]">
                  “Sāpes nav jāpacieš — pareizi izvēlēta kustība atgriež ķermenim dabisko spēku.”
                </p>
                <p className="mt-1.5 text-[11px] text-[#4B5854]">
                  — Elīna Vītola, vadošā fizioterapeite
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Condition Triage / Treatment Pathways */}
      <section id="triage" className="py-20 lg:py-28 border-b border-black/[0.06]">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#166534]">
              Aprūpes virzieni
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-5xl font-normal text-[#0F1715] leading-tight">
              Ar kādu jautājumu Jūs pie mums vēršaties?
            </h2>
            <p className="mt-3 text-base text-[#4B5854]">
              Izvēlieties virzienu, lai uzzinātu, kā mēs varam Jums palīdzēt:
            </p>
          </div>

          {/* Clean Segmented Tabs */}
          <div className="mt-10 flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => setActiveTab("mugura")}
              className={`rounded-full px-6 py-3 text-xs font-semibold transition-all ${
                activeTab === "mugura"
                  ? "bg-[#0F1715] text-white shadow-md"
                  : "bg-[#F3F6F4] text-[#4B5854] hover:bg-[#E7ECE9]"
              }`}
            >
              Mugura, kakls & locītavas
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("sievietes")}
              className={`rounded-full px-6 py-3 text-xs font-semibold transition-all ${
                activeTab === "sievietes"
                  ? "bg-[#0F1715] text-white shadow-md"
                  : "bg-[#F3F6F4] text-[#4B5854] hover:bg-[#E7ECE9]"
              }`}
            >
              Sievietes veselība & pēcdzemdības
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("zidaini")}
              className={`rounded-full px-6 py-3 text-xs font-semibold transition-all ${
                activeTab === "zidaini"
                  ? "bg-[#0F1715] text-white shadow-md"
                  : "bg-[#F3F6F4] text-[#4B5854] hover:bg-[#E7ECE9]"
              }`}
            >
              Zīdaiņu attīstība & hendlings
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("traumas")}
              className={`rounded-full px-6 py-3 text-xs font-semibold transition-all ${
                activeTab === "traumas"
                  ? "bg-[#0F1715] text-white shadow-md"
                  : "bg-[#F3F6F4] text-[#4B5854] hover:bg-[#E7ECE9]"
              }`}
            >
              Pēctraumu rehabilitācija
            </button>
          </div>

          {/* Active Condition Details */}
          <div className="mt-8 rounded-3xl border border-black/[0.08] bg-white p-8 sm:p-12 shadow-sm">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <span className="text-xs font-semibold text-[#166534]">
                  {currentTriage.tag}
                </span>
                <h3 className="mt-2 font-serif text-3xl sm:text-4xl font-normal text-[#0F1715]">
                  {currentTriage.title}
                </h3>

                <p className="mt-4 text-base leading-relaxed text-[#4B5854]">
                  {currentTriage.desc}
                </p>

                <div className="mt-6 space-y-3 rounded-2xl bg-[#F8FAF9] p-5 border border-black/[0.04] text-xs sm:text-sm text-[#0F1715]">
                  <p><strong>🩺 Pirmā vizīte:</strong> {currentTriage.firstVisit}</p>
                  <p><strong>⏱️ Rezultātu dinamika:</strong> {currentTriage.timeline}</p>
                  <p><strong>👩‍⚕️ Vadošā speciāliste:</strong> {currentTriage.specialist}</p>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-black/[0.06] pt-6">
                  <div>
                    <span className="font-serif text-2xl font-medium text-[#0F1715]">{currentTriage.price}</span>
                    <span className="block text-xs text-[#4B5854]">Visi materiāli un teipošana iekļauta cenā</span>
                  </div>
                  <a
                    href="#pieraksts"
                    className="rounded-full bg-[#166534] px-7 py-3 text-xs font-semibold text-white shadow-xs transition-all hover:bg-[#14532D]"
                  >
                    Pieteikties šim virzienam →
                  </a>
                </div>
              </div>

              <div className="relative h-[380px] w-full overflow-hidden rounded-2xl bg-[#F0F3F1] border border-black/[0.06]">
                <Image
                  src={currentTriage.image}
                  alt={currentTriage.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Steps: "Ko sagaidīt pirmajā vizītē?" */}
      <section id="soli" className="py-20 lg:py-28 bg-[#F8FAF9] border-b border-black/[0.06]">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#166534]">
              Vizītes anatomija
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-5xl font-normal text-[#0F1715] leading-tight">
              Ko sagaidīt pirmajā 60 minūšu vizītē?
            </h2>
            <p className="mt-3 text-base text-[#4B5854]">
              Ja nekad iepriekš neesat apmeklējis fizioterapeitu, ir dabiski just nelielu satraukumu. Mūsu nodarbība norit mierīgi, soli pa solim:
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-black/[0.06] bg-white p-7 shadow-xs">
              <span className="font-serif text-2xl font-normal text-[#166534]">01</span>
              <h3 className="mt-3 font-serif text-lg font-medium text-[#0F1715]">Uzklausīšana (15 min)</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#4B5854]">
                Mēs uzklausām Jūsu sūdzības, izpētām darba slodzi, izskatām iepriekšējos izmeklējumu slēdzienus un definējam Jūsu mērķi.
              </p>
            </div>

            <div className="rounded-2xl border border-black/[0.06] bg-white p-7 shadow-xs">
              <span className="font-serif text-2xl font-normal text-[#166534]">02</span>
              <h3 className="mt-3 font-serif text-lg font-medium text-[#0F1715]">Kustību analīze (15 min)</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#4B5854]">
                Veicam funkcionālos testus stājai, mugurkaula mobilitātei, muskuļu tonusam un elpošanas modelim, lai atrastu sāpju patieso cēloni.
              </p>
            </div>

            <div className="rounded-2xl border border-black/[0.06] bg-white p-7 shadow-xs">
              <span className="font-serif text-2xl font-normal text-[#166534]">03</span>
              <h3 className="mt-3 font-serif text-lg font-medium text-[#0F1715]">Saudzīga terapija (20 min)</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#4B5854]">
                Manuālā terapija sasprindzināto audu atbrīvošanai, locītavu mobilizācija un pirmie koriģējošie vingrojumi kabinetā speciālistes vadībā.
              </p>
            </div>

            <div className="rounded-2xl border border-black/[0.06] bg-white p-7 shadow-xs">
              <span className="font-serif text-2xl font-normal text-[#166534]">04</span>
              <h3 className="mt-3 font-serif text-lg font-medium text-[#0F1715]">Mājas plāns (10 min)</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#4B5854]">
                Jūs saņemat 2–3 vienkāršus vingrojumus mājas videi un skaidru izpratni, kā novērst sāpju atgriešanos ikdienā.
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-black/[0.06] bg-white p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs sm:text-sm text-[#4B5854]">
              👕 <strong>Ko vilkt mugurā?</strong> Ērtu sporta vai brīvā laika apģērbu (t-kreklu un legingus/šortus), kas neierobežo kustības.
            </div>
            <a
              href="#pieraksts"
              className="rounded-full bg-[#0F1715] px-6 py-2.5 text-xs font-semibold text-white whitespace-nowrap hover:bg-[#166534]"
            >
              Pieteikt pirmo vizīti →
            </a>
          </div>
        </div>
      </section>

      {/* Specialist Team Showcase */}
      <section id="specialistes" className="py-20 lg:py-28 border-b border-black/[0.06]">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#166534]">
              Mūsu komanda
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-5xl font-normal text-[#0F1715] leading-tight">
              Sertificētas fizioterapeites, kuras iedziļinās
            </h2>
            <p className="mt-3 text-base text-[#4B5854]">
              Mūsu speciālistes regulāri papildina zināšanas starptautiskos semināros un pieiet katram pacientam ar patiesu empātiju un rūpību:
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {specialists.map((person) => (
              <div
                key={person.id}
                className="flex flex-col justify-between rounded-3xl border border-black/[0.08] bg-white p-7 shadow-xs transition-shadow hover:shadow-md"
              >
                <div>
                  <div className="relative h-[340px] w-full overflow-hidden rounded-2xl bg-[#F0F3F1] border border-black/[0.06]">
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-top"
                    />
                  </div>

                  <h3 className="mt-5 font-serif text-2xl font-medium text-[#0F1715]">
                    {person.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#166534] mt-0.5">{person.title}</p>
                  <p className="text-[11px] text-[#4B5854] mt-0.5">{person.experience}</p>

                  <p className="mt-3 text-xs leading-relaxed text-[#4B5854]">
                    {person.specialty}
                  </p>

                  <div className="mt-4 rounded-xl bg-[#F8FAF9] p-3 text-[11px] text-[#0F1715] border border-black/[0.04]">
                    <strong>Izglītība:</strong> {person.education}
                  </div>

                  <blockquote className="mt-4 border-t border-black/[0.06] pt-3 text-xs italic text-[#0F1715]/80 font-serif">
                    “{person.quote}”
                  </blockquote>
                </div>

                <a
                  href="#pieraksts"
                  onClick={() => setSpecialist(person.id)}
                  className="mt-6 block text-center rounded-full border border-black/15 bg-white py-2.5 text-xs font-semibold text-[#0F1715] transition-colors hover:bg-[#0F1715] hover:text-white"
                >
                  Izvēlēties laiku pie {person.name.split(" ")[0]}s →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance Reimbursement Interactive Calculator */}
      <section id="apdrosinasana" className="py-20 lg:py-28 bg-[#F8FAF9] border-b border-black/[0.06]">
        <div className="mx-auto max-w-5xl px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#166534]">
              Veselības apdrošināšana
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-normal text-[#0F1715]">
              Kā saņemt apdrošināšanas atlīdzību?
            </h2>
            <p className="mt-2 text-sm text-[#4B5854]">
              Pēc katras vizītes mēs izsniedzam oficiālu čeku un ārstniecības personas izrakstu ar visiem nepieciešamajiem kodiem.
            </p>
          </div>

          <div className="mt-10 rounded-3xl border border-black/[0.08] bg-white p-8 sm:p-10 shadow-sm">
            <p className="text-xs font-semibold text-[#0F1715] uppercase tracking-wider">
              Izvēlieties savu apdrošināšanas kompāniju:
            </p>

            <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {Object.keys(insuranceInfo).map((insKey) => (
                <button
                  key={insKey}
                  type="button"
                  onClick={() => setSelectedInsurance(insKey)}
                  className={`rounded-2xl border p-4 text-center font-medium text-xs transition-all ${
                    selectedInsurance === insKey
                      ? "border-[#166534] bg-[#166534]/10 text-[#166534] font-semibold"
                      : "border-black/[0.08] bg-white text-[#4B5854] hover:bg-black/[0.02]"
                  }`}
                >
                  {insuranceInfo[insKey].name}
                </button>
              ))}
            </div>

            {/* Insurance Info Card */}
            <div className="mt-6 rounded-2xl bg-[#F8FAF9] p-6 border border-black/[0.04]">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm font-semibold text-[#0F1715]">
                  {insuranceInfo[selectedInsurance]?.name} polises segums
                </span>
                <span className="rounded-full bg-[#166534] px-3 py-1 text-xs font-semibold text-white">
                  {insuranceInfo[selectedInsurance]?.coverage}
                </span>
              </div>
              <p className="mt-2 text-xs sm:text-sm text-[#4B5854] leading-relaxed">
                {insuranceInfo[selectedInsurance]?.desc}
              </p>
              <div className="mt-4 border-t border-black/[0.06] pt-4 text-xs text-[#0F1715] flex items-center gap-2">
                <span>📋</span>
                <span>Nepieciešamie dokumenti: Mūsu izsniegts čeks ar personas kodu + ārstniecības personas izraksts (forma 027/u).</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transparent Pricing Overview */}
      <section id="cenas" className="py-20 lg:py-28 border-b border-black/[0.06]">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#166534]">
              Cenrādis
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-normal text-[#0F1715]">
              Caurspīdīgas pakalpojumu cenas
            </h2>
            <p className="mt-2 text-xs text-[#4B5854]">
              Visi nodarbībai nepieciešamie materiāli (kinezioloģiskā teipošana, inventārs) ir iekļauti vizītes cenā.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-3xl border border-black/[0.08] bg-white shadow-sm">
            <div className="divide-y divide-black/[0.06] text-sm">
              <div className="flex items-center justify-between p-6 sm:p-7">
                <div>
                  <p className="font-semibold text-[#0F1715]">Pirmreizēja fizioterapeita konsultācija & diagnostika</p>
                  <p className="text-xs text-[#4B5854] mt-0.5">Pilna kustību pārbaude, manuālie testi, pirmā terapija un mājas plāns (60 min)</p>
                </div>
                <span className="font-serif text-xl text-[#0F1715]">50 €</span>
              </div>

              <div className="flex items-center justify-between p-6 sm:p-7">
                <div>
                  <p className="font-semibold text-[#0F1715]">Atkārtota individuālā fizioterapijas nodarbība</p>
                  <p className="text-xs text-[#4B5854] mt-0.5">Manuāla terapija un koriģējošie vingrojumi ar speciālisti (60 min)</p>
                </div>
                <span className="font-serif text-xl text-[#0F1715]">45 €</span>
              </div>

              <div className="flex items-center justify-between p-6 sm:p-7">
                <div>
                  <p className="font-semibold text-[#0F1715]">Sieviešu veselības un pēcdzemdību vizīte</p>
                  <p className="text-xs text-[#4B5854] mt-0.5">Diastāzes pārbaude, iegurņa pamatnes muskuļu atjaunošana (60 min)</p>
                </div>
                <span className="font-serif text-xl text-[#0F1715]">50 €</span>
              </div>

              <div className="flex items-center justify-between p-6 sm:p-7">
                <div>
                  <p className="font-semibold text-[#0F1715]">Zīdaiņu motorā attīstība & hendlinga apmācība</p>
                  <p className="text-xs text-[#4B5854] mt-0.5">Praktiska vecāku apmācība un mazuļa kustību harmonizācija (45 min)</p>
                </div>
                <span className="font-serif text-xl text-[#0F1715]">40 €</span>
              </div>

              <div className="flex items-center justify-between p-6 sm:p-7 bg-[#166534]/5">
                <div>
                  <p className="font-semibold text-[#166534]">5 nodarbību kurss (abonements)</p>
                  <p className="text-xs text-[#4B5854] mt-0.5">Derīgs 3 mēnešus no iegādes brīža (ietaupījums 25 €)</p>
                </div>
                <span className="font-serif text-xl font-bold text-[#166534]">200 €</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Online Booking Engine */}
      <section id="pieraksts" className="py-20 lg:py-28 bg-[#F8FAF9] border-b border-black/[0.06]">
        <div className="mx-auto max-w-5xl px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#166534]">
              Tiešsaistes rezervācija
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-5xl font-normal text-[#0F1715]">
              Rezervējiet vizīti tiešsaistē
            </h2>
            <p className="mt-2 text-sm text-[#4B5854]">
              Izvēlieties vēlamo speciālisti, datumu un pulksteņa laiku. Apstiprinājums uzreiz tiks nosūtīts uz Jūsu tālruni.
            </p>
          </div>

          <div className="mt-12 rounded-3xl border border-black/[0.08] bg-white p-8 sm:p-12 shadow-md">
            {isBooked ? (
              <div className="p-8 text-center max-w-lg mx-auto">
                <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#166534]/10 text-3xl text-[#166534]">
                  ✓
                </span>
                <h3 className="mt-4 font-serif text-3xl font-normal text-[#0F1715]">
                  Paldies, {patientName || "cien. pacient"}!
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#4B5854]">
                  Jūsu pieteikums ir veiksmīgi reģistrēts uz <strong>{selectedDateObj.label} plkst. {selectedTime}</strong> pie speciālistes <strong>{selectedSpecialistObj.name}</strong>.
                </p>
                <div className="mt-6 rounded-2xl bg-[#F8FAF9] p-5 text-xs text-left border border-black/[0.04]">
                  <p>📍 <strong>Adrese:</strong> Rīga, Miera iela 24, 2. stāvs (pieejams ērts lifts)</p>
                  <p className="mt-1">📞 <strong>Tālrunis saziņai:</strong> +371 67 000 000</p>
                  <p className="mt-1">🔔 <strong>Atgādinājums:</strong> SMS tiks nosūtīta 24h pirms vizītes.</p>
                </div>
                <div className="mt-8 flex justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsBooked(false);
                      setPatientName("");
                      setPatientPhone("");
                    }}
                    className="rounded-full bg-[#0F1715] px-7 py-3 text-xs font-semibold text-white hover:bg-[#166534]"
                  >
                    Pieteikt citu laiku
                  </button>
                  <a
                    href="https://wa.me/37120000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-[#166534] px-7 py-3 text-xs font-semibold text-white"
                  >
                    Rakstīt WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setIsBooked(true); }}>
                {/* 1. Specialist Selector */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#0F1715]">
                    1. Izvēlieties speciālisti
                  </label>
                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    {specialists.map((spec) => (
                      <button
                        key={spec.id}
                        type="button"
                        onClick={() => setSpecialist(spec.id)}
                        className={`flex items-center gap-3.5 rounded-2xl border p-4 text-left transition-all ${
                          specialist === spec.id
                            ? "border-[#166534] bg-[#166534]/5 shadow-xs"
                            : "border-black/[0.08] bg-white hover:bg-black/[0.02]"
                        }`}
                      >
                        <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-black/[0.08]">
                          <Image src={spec.image} alt={spec.name} fill sizes="48px" className="object-cover" />
                        </div>
                        <div>
                          <p className="font-serif text-sm font-medium text-[#0F1715]">{spec.name}</p>
                          <span className="text-[11px] font-medium text-[#166534] block">{spec.days.split(" ")[0]} {spec.days.split(" ")[1]}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Date & Time */}
                <div className="mt-8 border-t border-black/[0.06] pt-8">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#0F1715]">
                      2. Izvēlieties datumu un laiku (Septembris 2026)
                    </label>
                    <span className="text-xs text-[#4B5854]">{selectedDateObj.label}</span>
                  </div>

                  <div className="mt-3 grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                    {dates.map((d) => (
                      <button
                        key={d.value}
                        type="button"
                        onClick={() => setSelectedDate(d.value)}
                        className={`rounded-2xl border p-3.5 text-center transition-all ${
                          selectedDate === d.value
                            ? "border-[#166534] bg-[#166534] text-white shadow-xs"
                            : "border-black/[0.08] bg-white text-[#0F1715] hover:bg-black/[0.02]"
                        }`}
                      >
                        <p className="text-[11px] opacity-80">{d.label.split(",")[0]}</p>
                        <p className="font-serif text-lg font-medium mt-0.5">{d.label.split(" ")[1]}</p>
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
                            ? "border-[#0F1715] bg-[#0F1715] text-white"
                            : "border-black/[0.08] bg-white text-[#0F1715] hover:bg-black/[0.02]"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Patient Details */}
                <div className="mt-8 border-t border-black/[0.06] pt-8">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#0F1715] mb-4">
                    3. Jūsu kontaktinformācija
                  </label>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-medium text-[#0F1715]">Vārds, Uzvārds *</label>
                      <input
                        type="text"
                        required
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        placeholder="Anna Bērziņa"
                        className="mt-1.5 w-full rounded-xl border border-black/15 bg-white px-4 py-2.5 text-sm text-[#0F1715] focus:border-[#166534] focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#0F1715]">Tālruņa numurs *</label>
                      <input
                        type="tel"
                        required
                        value={patientPhone}
                        onChange={(e) => setPatientPhone(e.target.value)}
                        placeholder="+371 20 000 000"
                        className="mt-1.5 w-full rounded-xl border border-black/15 bg-white px-4 py-2.5 text-sm text-[#0F1715] focus:border-[#166534] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-medium text-[#0F1715]">Vizītes veids</label>
                      <select
                        value={serviceType}
                        onChange={(e) => setServiceType(e.target.value)}
                        className="mt-1.5 w-full rounded-xl border border-black/15 bg-white px-4 py-2.5 text-sm text-[#0F1715] focus:border-[#166534] focus:outline-hidden"
                      >
                        <option value="first">Pirmreizēja diagnostika & terapija (50 € / 60 min)</option>
                        <option value="rehab">Atkārtota individuālā nodarbība (45 € / 60 min)</option>
                        <option value="women">Sieviešu veselība & pēcdzemdības (50 € / 60 min)</option>
                        <option value="infant">Zīdaiņu attīstība & hendlings (40 € / 45 min)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#0F1715]">E-pasts (atgādinājumam)</label>
                      <input
                        type="email"
                        value={patientEmail}
                        onChange={(e) => setPatientEmail(e.target.value)}
                        placeholder="anna@piemers.lv"
                        className="mt-1.5 w-full rounded-xl border border-black/15 bg-white px-4 py-2.5 text-sm text-[#0F1715] focus:border-[#166534] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-xs font-medium text-[#0F1715]">Sūdzības vai piezīmes (pēc izvēles)</label>
                    <input
                      type="text"
                      value={patientNotes}
                      onChange={(e) => setPatientNotes(e.target.value)}
                      placeholder="Kas šobrīd sagādā vislielākās grūtības?"
                      className="mt-1.5 w-full rounded-xl border border-black/15 bg-white px-4 py-2.5 text-sm text-[#0F1715] focus:border-[#166534] focus:outline-hidden"
                    />
                  </div>

                  <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-black/[0.06] pt-6">
                    <span className="text-xs text-[#4B5854]">
                      Izvēlēts: <strong>{selectedDateObj.label} plkst. {selectedTime}</strong> ({selectedSpecialistObj.name})
                    </span>
                    <button
                      type="submit"
                      className="rounded-full bg-[#166534] px-9 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#14532D] hover:shadow-lg hover:-translate-y-0.5"
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

      {/* Direct Human Question & Inquiry Box */}
      <section className="py-20 lg:py-28 border-b border-black/[0.06]">
        <div className="mx-auto max-w-5xl px-6 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#166534]">
                Saziņa ar speciālisti
              </span>
              <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-normal text-[#0F1715]">
                Neesat pārliecināti, ar ko sākt?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#4B5854]">
                Uzdodiet savu jautājumu šeit vai uzrakstiet mums WhatsApp. Mūsu fizioterapeite iepazīsies ar Jūsu situāciju un ieteiks piemērotāko speciālisti un rīcības virzienu.
              </p>

              <div className="mt-8 space-y-3 border-t border-black/[0.06] pt-6 text-xs text-[#4B5854]">
                <p>📞 <strong>Tālrunis:</strong> <a href="tel:+37167000000" className="text-[#0F1715] font-semibold underline">+371 67 000 000</a></p>
                <p>💬 <strong>WhatsApp saziņa:</strong> <a href="https://wa.me/37120000000" target="_blank" rel="noopener noreferrer" className="text-[#166534] font-semibold underline">+371 20 000 000</a></p>
                <p>📍 <strong>Adrese:</strong> Miera iela 24, Rīga (2. stāvs, pieejams lifts)</p>
              </div>
            </div>

            <div className="rounded-3xl border border-black/[0.08] bg-[#F8FAF9] p-8 shadow-sm">
              {inquirySent ? (
                <div className="p-6 text-center">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#166534]/10 text-2xl text-[#166534]">✓</span>
                  <h3 className="mt-3 font-serif text-2xl text-[#0F1715]">Paldies par ziņu!</h3>
                  <p className="mt-2 text-xs text-[#4B5854]">Fizioterapeite sazināsies ar Jums darba laikā 15–30 minūšu laikā.</p>
                  <button
                    type="button"
                    onClick={() => setInquirySent(false)}
                    className="mt-5 rounded-full bg-[#0F1715] px-6 py-2 text-xs font-semibold text-white"
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
                    <label className="block text-xs font-medium text-[#0F1715]">Jūsu vārds *</label>
                    <input
                      type="text"
                      required
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      placeholder="Anna"
                      className="mt-1 w-full rounded-xl border border-black/15 bg-white px-4 py-2.5 text-sm text-[#0F1715] focus:border-[#166534] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#0F1715]">Tālrunis vai WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={inquiryPhone}
                      onChange={(e) => setInquiryPhone(e.target.value)}
                      placeholder="+371 20 000 000"
                      className="mt-1 w-full rounded-xl border border-black/15 bg-white px-4 py-2.5 text-sm text-[#0F1715] focus:border-[#166534] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#0F1715]">Jautājums vai situācijas apraksts</label>
                    <textarea
                      rows={3}
                      required
                      value={inquiryMsg}
                      onChange={(e) => setInquiryMsg(e.target.value)}
                      placeholder="Kas Jums rada diskomfortu, cik ilgi, vai ir bijusi trauma vai izmeklējumi?"
                      className="mt-1 w-full rounded-xl border border-black/15 bg-white px-4 py-2.5 text-sm text-[#0F1715] focus:border-[#166534] focus:outline-hidden"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-full bg-[#166534] py-3.5 text-xs font-semibold text-white shadow-xs hover:bg-[#14532D]"
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
      <section className="py-20 lg:py-28 bg-[#F8FAF9] border-b border-black/[0.06]">
        <div className="mx-auto max-w-3xl px-6 lg:px-12">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#166534]">
              Biežāk uzdotie jautājumi
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-normal text-[#0F1715]">
              Viss, kas jāzina pirms apmeklējuma
            </h2>
          </div>

          <div className="mt-10 space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="flex w-full items-center justify-between p-5 text-left font-serif text-base text-[#0F1715]"
                >
                  <span>{faq.q}</span>
                  <span className="text-[#166534] text-lg font-mono ml-4">{openFaq === idx ? "−" : "+"}</span>
                </button>
                {openFaq === idx && (
                  <div className="border-t border-black/[0.06] px-5 py-4 text-xs sm:text-sm leading-relaxed text-[#4B5854]">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Atmospheric Footer */}
      <footer id="kontakti" className="py-16 text-[#4B5854] bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid gap-12 md:grid-cols-3">
            <div>
              <span className="font-serif text-2xl font-medium text-[#0F1715]">Kustība</span>
              <p className="mt-1 text-xs text-[#4B5854]">Fizioterapijas, sieviešu veselības un bērnu attīstības prakse</p>
              <p className="mt-4 text-xs leading-relaxed text-[#4B5854]">
                Miera iela 24, Rīga, LV-1001.<br />
                Ieeja no Miera ielas pagalma, 2. stāvs, pieejams ērts lifts bērnu ratiņiem un bezmaksas stāvvieta klientiem.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#0F1715]">Darba laiks</p>
              <ul className="mt-3 space-y-1.5 text-xs font-mono text-[#4B5854]">
                <li>Pirmdiena – Piektdiena: 08:00 – 20:00</li>
                <li>Sestdiena: 09:00 – 15:00 (pēc pieraksta)</li>
                <li>Svētdiena: Slēgts</li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#0F1715]">Saziņa</p>
              <p className="mt-3 text-xs">
                Tālrunis: <a href="tel:+37167000000" className="text-[#0F1715] font-semibold underline">+371 67 000 000</a>
              </p>
              <p className="mt-1 text-xs">
                E-pasts: <a href="mailto:sveiki@kustiba-demo.lv" className="text-[#0F1715] font-semibold underline">sveiki@kustiba-demo.lv</a>
              </p>
              <p className="mt-1 text-xs">
                WhatsApp: <a href="https://wa.me/37120000000" target="_blank" rel="noopener noreferrer" className="text-[#166534] font-semibold underline">+371 20 000 000</a>
              </p>
            </div>
          </div>

          <div className="mt-12 border-t border-black/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#4B5854]/70">
            <p>© {new Date().getFullYear()} KUSTĪBA. Demonstrācijas koncepts.</p>
            <div className="flex items-center gap-4">
              <Link href="/case-studies/physiotherapy" className="text-[#0F1715] hover:underline font-semibold">
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
