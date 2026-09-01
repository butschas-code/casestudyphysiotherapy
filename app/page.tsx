"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
  Variants,
} from "framer-motion";

const easeOrganic = [0.22, 1, 0.36, 1] as const;

export default function PhysiotherapyCallingCardPage() {
  const shouldReduceMotion = useReducedMotion();

  // Scroll Tracking for Hero & Therapist Story
  const { scrollY } = useScroll();
  
  // Parallax transforms (gracefully disabled when reduced motion is preferred)
  const heroImageY = useTransform(scrollY, [0, 700], shouldReduceMotion ? [0, 0] : [0, 45]);
  const heroCardY = useTransform(scrollY, [0, 700], shouldReduceMotion ? [0, 0] : [0, 25]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.3]);
  const storyImageY = useTransform(scrollY, [700, 1600], shouldReduceMotion ? [0, 0] : [-15, 25]);
  const storyDetailY = useTransform(scrollY, [700, 1600], shouldReduceMotion ? [0, 0] : [10, -20]);

  // Header scroll state & mobile bottom bar visibility
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [showMobileBottomBar, setShowMobileBottomBar] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Recognition / Situations State
  const [hoveredSituation, setHoveredSituation] = useState<number>(0);

  // Chapter Navigation State
  const [activeChapter, setActiveChapter] = useState<string>("sapes");

  // Testimonial Stories State (User Controlled)
  const [activeStoryIdx, setActiveStoryIdx] = useState<number>(0);

  // Booking State
  const [bookingStep, setBookingStep] = useState<1 | 2 | 3>(3);
  const [prevStep, setPrevStep] = useState<number>(3);
  const [selectedService, setSelectedService] = useState<string>("first");
  const [selectedSpecialist, setSelectedSpecialist] = useState<string>("elina");
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(1); // Otrdiena
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("13:00");
  const [patientName, setPatientName] = useState<string>("");
  const [patientPhone, setPatientPhone] = useState<string>("");
  const [patientNote, setPatientNote] = useState<string>("");
  const [bookingCompleted, setBookingCompleted] = useState<boolean>(false);
  const [showIntakeForm, setShowIntakeForm] = useState<boolean>(false);

  // Direct Inquiry State
  const [inquiryName, setInquiryName] = useState<string>("");
  const [inquiryPhone, setInquiryPhone] = useState<string>("");
  const [inquiryText, setInquiryText] = useState<string>("");
  const [inquirySent, setInquirySent] = useState<boolean>(false);

  // FAQ State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Insurance Calculator State
  const [selectedInsurance, setSelectedInsurance] = useState<string>("balta");

  const changeBookingStep = (newStep: 1 | 2 | 3) => {
    setPrevStep(bookingStep);
    setBookingStep(newStep);
    setShowIntakeForm(false);
  };

  // Track header scroll and active chapter
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setIsScrolled(currentScroll > 60);
      setShowMobileBottomBar(currentScroll > 520);

      const chapterIds = ["sapes", "grutnieciba", "pecdzemdibam", "berniem"];
      const scrollPos = currentScroll + 250;
      for (const id of chapterIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveChapter(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const recognitionItems = [
    {
      id: 0,
      statement: "“Man sāp mugura vai kakls.”",
      solution: "Sākam ar kustību un ikdienas slodzes izvērtēšanu, nevis tikai masējam sāpīgo punktu.",
      specialist: "Elīna Vītola vai Marta Liepa",
      image: "/concept-physio/service-rehab.jpg",
      badge: "Pieaugušajiem · Sēdošs darbs",
    },
    {
      id: 1,
      statement: "“Pēc traumas ķermenis vairs nejūtas kā agrāk.”",
      solution: "Izstrādājam drošu plānu, lai pakāpeniski atgūtu spēku, kustību brīvību un pārliecību.",
      specialist: "Marta Liepa",
      image: "/concept-physio/service-movement.jpg",
      badge: "Rehabilitācija & locītavu veselība",
    },
    {
      id: 2,
      statement: "“Esmu stāvoklī un gribu kustēties droši.”",
      solution: "Atslogojam muguru un iegurni, sagatavojot ķermeni vieglākām dzemdībām bez lieka stresa.",
      specialist: "Elīna Vītola",
      image: "/concept-physio/service-women.jpg",
      badge: "Gaidību laika aprūpe",
    },
    {
      id: 3,
      statement: "“Pēc dzemdībām nejūtos savā ķermenī kā iepriekš.”",
      solution: "Pārbaudām diastāzi, atjaunojam iegurņa pamatni un atgriežam stabilitāti soli pa solim.",
      specialist: "Elīna Vītola",
      image: "/concept-physio/service-women.jpg",
      badge: "Pēcdzemdību atjaunošanās",
    },
    {
      id: 4,
      statement: "“Nezinu, vai mana mazuļa kustību attīstība ir tāda, kādai tai jābūt.”",
      solution: "Mierīgi novērtējam mazuļa motoriku un iemācām vecākiem pareizu hendlingu ikdienas aprūpē.",
      specialist: "Anna Ozola",
      image: "/concept-physio/service-children.jpg",
      badge: "Zīdaiņiem no 1 mēneša",
    },
    {
      id: 5,
      statement: "“Mans bērns kustas citādi, un es gribu saprast, kā viņam palīdzēt.”",
      solution: "Līdzsvarojam muskuļu tonusu un stāju caur mierīgu, bērnam draudzīgu pieeju bez asarām.",
      specialist: "Anna Ozola",
      image: "/concept-physio/service-children.jpg",
      badge: "Bērnu stāja & attīstība",
    },
  ];

  const firstVisitSteps = [
    {
      number: "01",
      title: "Parunāsim.",
      copy: "Pastāstiet, kas Jūs atveda un ko gribētu mainīt. Mēs nesteidzamies pie “vingrojumu saraksta”, bet vispirms mierīgi uzklausām Jūsu situāciju.",
      tag: "Uzklausīšana · 15 min",
    },
    {
      number: "02",
      title: "Paskatīsimies, kā ķermenis kustas.",
      copy: "Nesteidzīga kustību pārbaude: kā Jūs elpojat, stāvat, apsēžaties un kā slodze sadalās visā ķermenī.",
      tag: "Kustību pārbaude · 15 min",
    },
    {
      number: "03",
      title: "Izskaidrosim.",
      copy: "Jums būs skaidrs, ko redzam un kā tas saistīts ar Jūsu sāpēm. Saudzīga manuāla atbrīvošana un pirmās terapijas kustības.",
      tag: "Terapija & skaidrība · 20 min",
    },
    {
      number: "04",
      title: "Vienosimies par nākamo soli.",
      copy: "Plāns, kas ir reāli izpildāms Jūsu ikdienā. 2–3 vienkārši paradumi vai vingrojumi mājas videi bez pārslodzes.",
      tag: "Mājas plāns · 10 min",
    },
  ];

  const demoStories = [
    {
      id: 0,
      quote: "“Pirmo reizi nejutos tā, it kā man būtu tikai jāizpilda vingrojumi. Es sapratu, kas notiek ar manu ķermeni un kāpēc mēs darām tieši to, ko darām.”",
      label: "Pacienta pieredze · Muguras sāpju atvieglošana",
      situation: "6 mēneši ar sēdoša darba izraisītām muguras sāpēm",
      image: "/concept-physio/service-movement.jpg",
      imageAlt: "Dabiska kustība un terapeita vadība telpā",
    },
    {
      id: 1,
      quote: "“Pēc dzemdībām man bija grūti saprast, kas ir ‘normāli’ un vai drīkstu atkal sportot. Saruna pati par sevi jau deva milzīgu mieru un skaidru ceļu uz priekšu.”",
      label: "Pacientes pieredze · Pēcdzemdību aprūpe",
      situation: "Diastāzes pārbaude un iegurņa stabilitātes atjaunošana",
      image: "/concept-physio/service-women.jpg",
      imageAlt: "Saudzīgs pieskāriens un sievietes veselības aprūpe",
    },
    {
      id: 2,
      quote: "“Mēs atnācām ar satraukumu par mazuļa motoriku, bet nodarbība noritēja tik mierīgā, rotaļīgā un mīlošā atmosfērā, ka viss satraukums izzuda. Mēs ieguvām drošību ikdienā.”",
      label: "Vecāku pieredze · Zīdaiņu hendlings",
      situation: "Mazuļa muskuļu tonuss un ikdienas hendlinga apmācība",
      image: "/concept-physio/service-children.jpg",
      imageAlt: "Mazuļa dabiskā motorā attīstība un atbalsts",
    },
  ];

  const servicesList = [
    { id: "first", title: "Pirmreizēja fizioterapeita konsultācija & diagnostika", duration: "60 min", price: "50 €" },
    { id: "rehab", title: "Atkārtota individuālā fizioterapijas nodarbība", duration: "60 min", price: "45 €" },
    { id: "women", title: "Sieviešu veselības un pēcdzemdību vizīte", duration: "60 min", price: "50 €" },
    { id: "infant", title: "Zīdaiņu motorā attīstība & hendlinga apmācība", duration: "45 min", price: "40 €" },
  ];

  const specialists = [
    {
      id: "elina",
      name: "Elīna Vītola",
      role: "Vadošā fizioterapeite · prakses dibinātāja",
      experience: "12 gadu klīniskā pieredze",
      specialty: "Mugurkaula biomehānika, sieviešu veselība un pēcdzemdību aprūpe",
      education: "RSU Rehabilitācijas fakultāte · Starptautiskie DNS un Mulligan kursi",
      image: "/concept-physio/practitioner-primary.jpg",
      badge: "Pirmd., Trešd., Piektd.",
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
      badge: "Otrd., Ceturtd., Sestd.",
      personalNote: "“Skaidra kustību tehnika un saudzīga slodzes dozēšana ļauj locītavām un saitēm dabiski un droši atjaunoties bez bailēm par atkārtotu traumu.”",
    },
    {
      id: "anna",
      name: "Anna Ozola",
      role: "Bērnu fizioterapeite · hendlinga speciāliste",
      experience: "7 gadu pieredze mazuļu aprūpē",
      specialty: "Zīdaiņu motorā attīstība, muskuļu tonusa harmonizācija un bērnu stāja",
      education: "RSU fizioterapija · Bobath un Emmi Pikleres metodes sertifikācija",
      image: "/concept-physio/practitioner-3.jpg",
      badge: "Darba dienās pēc pieraksta",
      personalNote: "“Mierīga, silta un mīloša vide nodarbībā ļauj mazulim atvērties kustībai dabiskā, priecīgā veidā — bez stresa un bez asarām.”",
    },
  ];

  const bookingDays = [
    {
      date: "2026-09-07",
      dayName: "Pirmd.",
      fullDay: "Pirmdiena, 7. septembris",
      slots: ["09:00", "11:30", "15:00"],
    },
    {
      date: "2026-09-08",
      dayName: "Otrd.",
      fullDay: "Otrdiena, 8. septembris",
      slots: ["10:30", "13:00", "16:30"],
    },
    {
      date: "2026-09-09",
      dayName: "Trešd.",
      fullDay: "Trešdiena, 9. septembris",
      slots: ["09:30", "14:00", "17:30"],
    },
    {
      date: "2026-09-10",
      dayName: "Ceturtd.",
      fullDay: "Ceturtdiena, 10. septembris",
      slots: ["11:00", "15:30", "18:00"],
    },
    {
      date: "2026-09-11",
      dayName: "Piektd.",
      fullDay: "Piektdiena, 11. septembris",
      slots: ["08:30", "12:00", "14:30"],
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

  const activeRec = recognitionItems[hoveredSituation] || recognitionItems[0];
  const activeStory = demoStories[activeStoryIdx] || demoStories[0];
  const currentSpecialistObj = specialists.find((s) => s.id === selectedSpecialist) || specialists[0];
  const currentServiceObj = servicesList.find((s) => s.id === selectedService) || servicesList[0];
  const currentDayObj = bookingDays[selectedDayIndex] || bookingDays[1];

  // Motion Variants
  const revealLineVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.8,
        delay: shouldReduceMotion ? 0 : i * 0.12,
        ease: easeOrganic,
      },
    }),
  };

  const chapterImageVariants: Variants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 1.04 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 1.0,
        ease: easeOrganic,
      },
    },
  };

  const stepDirection = bookingStep >= prevStep ? 1 : -1;

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

      {/* ============================================================ */}
      {/* HUMAN-CENTERED HEADER (LIGHT/TRANSPARENT -> WARM ON SCROLL) */}
      {/* ============================================================ */}
      <header
        style={{
          backgroundColor: isScrolled ? "rgba(255, 249, 244, 0.94)" : "transparent",
          borderColor: isScrolled ? "rgba(36, 48, 45, 0.08)" : "transparent",
        }}
        className={`sticky top-0 z-40 transition-all duration-300 border-b ${
          isScrolled ? "backdrop-blur-xs py-3.5 shadow-2xs" : "py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-12">
          
          {/* Left: Brand & Small Subtitle */}
          <Link href="#top" className="flex flex-col group">
            <span className="font-sans text-2xl lg:text-[1.75rem] font-medium tracking-tight text-[#24302D]">
              KUSTĪBA
            </span>
            <span className="text-[11px] font-normal text-[#5A6D67] block -mt-0.5">
              fizioterapijas prakse
            </span>
          </Link>

          {/* Center/Right Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-9 text-sm font-medium text-[#5A6D67]">
            <a href="#atpazisana" className="transition-colors hover:text-[#24302D]">
              Kā varam palīdzēt
            </a>
            <a href="#elina" className="transition-colors hover:text-[#24302D]">
              Elīna
            </a>
            <a href="#nodalas" className="transition-colors hover:text-[#24302D]">
              Pakalpojumi
            </a>
            <a href="#vizite" className="transition-colors hover:text-[#24302D]">
              Pirmā vizīte
            </a>
          </nav>

          {/* Right Desktop CTA & Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            <a
              href="#pieraksts"
              style={{ backgroundColor: "#D87967", color: "#FFFFFF" }}
              className="hidden sm:inline-block rounded-full px-6 py-2.5 text-xs font-semibold shadow-xs transition-all hover:bg-[#C26553] hover:-translate-y-0.5"
            >
              Pieteikt vizīti
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-[#24302D]"
              aria-label="Izvēlne"
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Menu Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: easeOrganic }}
              className="lg:hidden overflow-hidden border-t border-black/[0.08] bg-[#FFF9F4] px-6 py-6 space-y-4"
            >
              <a
                href="#atpazisana"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-medium text-[#24302D]"
              >
                Kā varam palīdzēt
              </a>
              <a
                href="#elina"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-medium text-[#24302D]"
              >
                Elīna
              </a>
              <a
                href="#nodalas"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-medium text-[#24302D]"
              >
                Pakalpojumi
              </a>
              <a
                href="#vizite"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-medium text-[#24302D]"
              >
                Pirmā vizīte
              </a>
              <div className="pt-3 border-t border-black/[0.06]">
                <a
                  href="#pieraksts"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ backgroundColor: "#D87967", color: "#FFFFFF" }}
                  className="block text-center rounded-full py-3 text-sm font-semibold"
                >
                  Pieteikt vizīti →
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ============================================================ */}
      {/* 1. FULL-WIDTH HUMAN-FIRST HERO (90–100svh DESKTOP) */}
      {/* Real Patient Question: "Can you help someone like me?" */}
      {/* ============================================================ */}
      <section
        id="top"
        style={{
          minHeight: "calc(100svh - 85px)",
          backgroundImage: `
            radial-gradient(circle at 10% 15%, rgba(216, 121, 103, 0.14), transparent 45%),
            radial-gradient(circle at 90% 12%, rgba(159, 184, 166, 0.20), transparent 45%),
            radial-gradient(circle at 50% 70%, rgba(244, 215, 208, 0.15), transparent 55%)
          `,
        }}
        className="relative flex items-center overflow-hidden py-16 lg:py-0 border-b border-[#24302D]/08"
      >
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
            
            {/* LEFT: Main Message & Emotional Flow */}
            <motion.div
              style={{ opacity: heroOpacity }}
              className="z-10 flex flex-col justify-center"
            >
              {/* Context Line */}
              <motion.div
                custom={0}
                initial="hidden"
                animate="visible"
                variants={revealLineVariants}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium tracking-wide text-[#5A6D67]"
              >
                <span>Fizioterapija</span>
                <span className="text-[#D87967]">•</span>
                <span>sievietēm</span>
                <span className="text-[#D87967]">•</span>
                <span>bērniem</span>
                <span className="text-[#D87967]">•</span>
                <span>rehabilitācijai</span>
              </motion.div>

              {/* Main Headline (Human & Grounded) */}
              <motion.h1
                custom={1}
                initial="hidden"
                animate="visible"
                variants={revealLineVariants}
                className="mt-5 font-sans text-4xl sm:text-5xl lg:text-[4.2rem] font-medium leading-[1.12] tracking-tight text-[#24302D]"
              >
                <span>Jūsu ķermenim nav jāpielāgojas terapijai.</span>
                <span className="mt-2 block font-normal text-[#D87967]">
                  Terapijai jāpielāgojas Jums.
                </span>
              </motion.h1>

              {/* Supporting Copy */}
              <motion.p
                custom={2}
                initial="hidden"
                animate="visible"
                variants={revealLineVariants}
                className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-[#5A6D67]"
              >
                Individuāla fizioterapija cilvēkiem dažādos dzīves posmos — no sāpēm un atveseļošanās līdz grūtniecībai, pēcdzemdību atjaunošanai un mazuļa pirmajiem soļiem.
              </motion.p>

              {/* Primary & Secondary Action Group */}
              <motion.div
                custom={3}
                initial="hidden"
                animate="visible"
                variants={revealLineVariants}
                className="mt-8 flex flex-wrap items-center gap-5"
              >
                <a
                  href="#pieraksts"
                  style={{ backgroundColor: "#D87967", color: "#FFFFFF" }}
                  className="rounded-full px-8 py-4 text-sm font-semibold shadow-sm transition-all hover:bg-[#C26553] hover:shadow-md hover:-translate-y-0.5"
                >
                  Pieteikt pirmo vizīti
                </a>
                <a
                  href="#jautajums"
                  className="text-xs sm:text-sm font-medium text-[#24302D] underline decoration-[#24302D]/30 underline-offset-4 transition-colors hover:text-[#D87967] hover:decoration-[#D87967]"
                >
                  Neesmu pārliecināta, ko izvēlēties →
                </a>
              </motion.div>

              {/* Reassuring Microcopy */}
              <motion.p
                custom={4}
                initial="hidden"
                animate="visible"
                variants={revealLineVariants}
                className="mt-5 text-xs text-[#5A6D67]"
              >
                Nav nepieciešams ārsta nosūtījums · palīdzēsim izvēlēties piemērotāko vizīti
              </motion.p>
            </motion.div>

            {/* RIGHT: Photography Composition with Breathing Motion & Floating Booking Card */}
            <motion.div
              style={{ y: heroImageY }}
              initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 1.0, ease: easeOrganic, delay: 0.15 }}
              className="relative lg:translate-x-4"
            >
              {/* Main Portrait Photography with Asymmetric Organic Radius */}
              <div
                style={{
                  borderRadius: "80px 20px 80px 20px",
                  boxShadow: "0 25px 50px -18px rgba(216, 121, 103, 0.20)",
                }}
                className="relative h-[460px] sm:h-[540px] w-full overflow-hidden bg-[#F8E9E3] border border-white/90"
              >
                <Image
                  src="/concept-physio/hero-treatment.jpg"
                  alt="Fizioterapeite Elīna Vītola saudzīgi vada pacienta kustību KUSTĪBA telpā"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 540px"
                  className="object-cover object-center"
                />
              </div>

              {/* Secondary Detail Inset (Hands / Gentle Touch) */}
              <div
                style={{
                  borderRadius: "2rem",
                  boxShadow: "0 16px 32px -10px rgba(36, 48, 45, 0.12)",
                }}
                className="absolute -top-4 -left-6 hidden sm:block h-28 w-28 overflow-hidden border-2 border-white bg-white"
              >
                <Image
                  src="/concept-physio/detail-hands.jpg"
                  alt="Saudzīgais pieskāriens un terapeitiskā aprūpe"
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </div>

              {/* FLOATING MINI BOOKING CARD (Real Healthcare Preview Overlapping Photography) */}
              <motion.div
                style={{ y: heroCardY }}
                initial={{ opacity: 0, scale: 0.97, y: 20 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: shouldReduceMotion ? 0 : [0, -6, 0],
                }}
                transition={{
                  opacity: { duration: 0.7, delay: 0.4, ease: easeOrganic },
                  scale: { duration: 0.7, delay: 0.4, ease: easeOrganic },
                  y: shouldReduceMotion ? { duration: 0 } : { repeat: Infinity, duration: 6, ease: "easeInOut" },
                }}
                className="static sm:absolute -bottom-8 -right-2 sm:-right-4 mt-6 sm:mt-0 w-full sm:w-[310px] rounded-3xl bg-[#FFFFFF] p-5 border border-[#24302D]/08 shadow-xl"
              >
                <div className="flex items-center justify-between border-b border-black/[0.06] pb-3">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#D87967]">
                    Tuvākā vizīte
                  </span>
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#9FB8A6] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#9FB8A6]"></span>
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-3">
                  <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border border-black/10 bg-[#F8E9E3]">
                    <Image
                      src="/concept-physio/practitioner-primary.jpg"
                      alt="Elīna Vītola"
                      fill
                      sizes="40px"
                      className="object-cover object-top"
                    />
                  </div>
                  <div>
                    <p className="font-sans text-xs font-semibold text-[#24302D]">Elīna Vītola</p>
                    <p className="text-[10px] text-[#5A6D67]">Fizioterapeite · Vadošā speciāliste</p>
                  </div>
                </div>

                <p className="mt-3 text-xs font-medium text-[#24302D]">
                  Otrdiena, 8. septembris
                </p>

                {/* 3 Available Time Chips */}
                <div className="mt-2.5 flex items-center gap-1.5">
                  {["10:30", "13:00", "16:30"].map((slot) => (
                    <a
                      key={slot}
                      href="#pieraksts"
                      onClick={() => {
                        setSelectedDayIndex(1);
                        setSelectedTimeSlot(slot);
                        setSelectedSpecialist("elina");
                      }}
                      className="rounded-xl border border-black/10 bg-[#FFF9F4] px-2.5 py-1.5 font-mono text-xs font-medium text-[#24302D] transition-colors hover:border-[#D87967] hover:bg-[#D87967] hover:text-white"
                    >
                      {slot}
                    </a>
                  ))}
                </div>

                <div className="mt-3.5 flex items-center justify-between border-t border-black/[0.06] pt-3">
                  <a
                    href="#pieraksts"
                    className="text-xs font-semibold text-[#D87967] hover:underline"
                  >
                    Skatīt visus laikus →
                  </a>
                </div>

                <p className="mt-1.5 text-[10px] text-[#5A6D67]">
                  Nezināt, ko rezervēt? Mēs palīdzēsim.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. PATIENT RECOGNITION SECTION — NOT A SERVICES GRID */}
      {/* Real Patient Question: "Do you understand what I'm experiencing?" */}
      {/* ============================================================ */}
      <section
        id="atpazisana"
        style={{
          backgroundColor: "#FFF9F4",
          backgroundImage: `
            radial-gradient(circle at 80% 20%, rgba(244, 215, 208, 0.20), transparent 50%),
            radial-gradient(circle at 20% 80%, rgba(229, 236, 229, 0.30), transparent 50%)
          `,
        }}
        className="py-24 lg:py-32 border-b border-[#24302D]/08"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          
          {/* Header Narrative */}
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#D87967]">
              Jūsu pašsajūta & pieredze
            </span>
            <h2 className="mt-2 font-sans text-3xl sm:text-5xl font-medium text-[#24302D] leading-tight">
              Varbūt Jūs atpazīstat sevi šeit.
            </h2>
            <div className="mt-4 text-base sm:text-lg leading-relaxed text-[#5A6D67] space-y-1">
              <p>Cilvēki pie mums nenāk ar “pakalpojuma nosaukumu”.</p>
              <p>Viņi nāk ar sāpēm, jautājumiem, pārmaiņām un vēlmi atkal justies labi savā ķermenī.</p>
            </div>
          </div>

          {/* Flowing Editorial Grid (Varied Sizes & Interactive Image Anchor) */}
          <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            
            {/* LEFT: 6 Flowing Patient Statements with Staggered Motion */}
            <div className="space-y-4">
              {recognitionItems.map((item, idx) => {
                const isHovered = hoveredSituation === idx;
                return (
                  <motion.div
                    key={item.id}
                    onMouseEnter={() => setHoveredSituation(idx)}
                    onClick={() => setHoveredSituation(idx)}
                    initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: shouldReduceMotion ? 0.01 : 0.5, delay: shouldReduceMotion ? 0 : idx * 0.08, ease: easeOrganic }}
                    style={{
                      backgroundColor: isHovered ? "#FFFFFF" : "rgba(255, 255, 255, 0.6)",
                      borderColor: isHovered ? "#D87967" : "rgba(36, 48, 45, 0.08)",
                      boxShadow: isHovered
                        ? "0 12px 28px -10px rgba(216, 121, 103, 0.18)"
                        : "0 2px 8px rgba(36, 48, 45, 0.02)",
                    }}
                    className="group relative cursor-pointer rounded-2xl border p-5 sm:p-6 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-[10px] sm:text-xs font-semibold uppercase tracking-wider transition-colors ${
                          isHovered ? "text-[#D87967]" : "text-[#5A6D67]"
                        }`}
                      >
                        {item.badge}
                      </span>
                      {isHovered && (
                        <span className="hidden sm:inline-block text-[11px] font-medium text-[#D87967]">
                          Izvēlēts stāvoklis →
                        </span>
                      )}
                    </div>

                    <h3
                      className={`mt-2 font-sans text-lg sm:text-xl font-medium transition-colors ${
                        isHovered ? "text-[#24302D]" : "text-[#24302D]/90"
                      }`}
                    >
                      {item.statement}
                    </h3>

                    {/* Revealed Solution Line */}
                    <div className="mt-3 flex items-start gap-2.5 border-t border-black/[0.04] pt-3 text-xs sm:text-sm leading-relaxed text-[#5A6D67]">
                      <span className="text-[#D87967] font-semibold text-base leading-none mt-0.5">→</span>
                      <p>{item.solution}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* RIGHT: Connected Anchor Photography Composition */}
            <div className="sticky top-28 hidden lg:block">
              <div
                style={{
                  borderRadius: "2.5rem 1.5rem 2.5rem 1.5rem",
                  boxShadow: "0 20px 40px -15px rgba(36, 48, 45, 0.10)",
                }}
                className="relative h-[480px] w-full overflow-hidden bg-[#F8E9E3] border border-white"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeRec.id}
                    initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: shouldReduceMotion ? 0.01 : 0.45, ease: easeOrganic }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={activeRec.image}
                      alt={activeRec.statement}
                      fill
                      sizes="500px"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Floating Context Pill over Photo */}
                <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/95 backdrop-blur-md p-4 border border-black/[0.06] shadow-md">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#D87967]">
                    Speciāliste šajā virzienā
                  </span>
                  <p className="font-sans text-xs font-semibold text-[#24302D] mt-0.5">
                    {activeRec.specialist}
                  </p>
                  <p className="text-[11px] text-[#5A6D67] mt-1">
                    Individuāla pieeja Miera ielas praksē
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section Conclusion CTA */}
          <div className="mt-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-[#24302D]/08 pt-8">
            <div className="text-sm font-medium text-[#24302D]">
              <span>Neredzat savu situāciju sarakstā? </span>
              <span className="text-[#5A6D67]">Mūsu speciālistes uzklausa un palīdz atrast pareizo virzienu.</span>
            </div>
            <a
              href="#jautajums"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#D87967] hover:underline"
            >
              <span>Pastāstiet mums, kas notiek</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. THERAPIST STORY SECTION — EMOTIONAL CENTER OF PAGE */}
      {/* Real Patient Question: "Can I trust you?" */}
      {/* ============================================================ */}
      <section
        id="elina"
        style={{
          backgroundColor: "#E5ECE5",
          backgroundImage: `
            radial-gradient(circle at 15% 20%, rgba(216, 121, 103, 0.08), transparent 40%),
            radial-gradient(circle at 85% 80%, rgba(159, 184, 166, 0.25), transparent 45%)
          `,
        }}
        className="py-24 lg:py-32 border-b border-[#24302D]/08 overflow-hidden"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid gap-14 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
            
            {/* LEFT: Candid Photography with Subtle Parallax */}
            <motion.div
              style={{ y: storyImageY }}
              initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.8, ease: easeOrganic }}
              className="relative"
            >
              {/* Main Candid Portrait (45% Width Scale, Relaxed In Treatment Room) */}
              <div
                style={{
                  borderRadius: "80px 20px 80px 20px",
                  boxShadow: "0 20px 45px -15px rgba(36, 48, 45, 0.15)",
                }}
                className="relative h-[480px] sm:h-[540px] w-full overflow-hidden bg-[#FFF9F4] border-2 border-white"
              >
                <Image
                  src="/concept-physio/practitioner-primary.jpg"
                  alt="Elīna Vītola, fizioterapeite un kustību terapeite"
                  fill
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover object-top"
                />
              </div>

              {/* Second Small Image: Gentle Treatment / Hands Detail with Differential Movement */}
              <motion.div
                style={{ y: storyDetailY }}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: shouldReduceMotion ? 0.01 : 0.7, delay: 0.2, ease: easeOrganic }}
                className="absolute -bottom-6 -right-4 hidden sm:block h-36 w-36 overflow-hidden rounded-3xl border-4 border-white bg-white shadow-lg"
              >
                <Image
                  src="/concept-physio/detail-hands.jpg"
                  alt="Fizioterapijas pieskāriena un kustības vadības detaļa"
                  fill
                  sizes="144px"
                  className="object-cover"
                />
              </motion.div>
            </motion.div>

            {/* RIGHT: Stable Intimate Monologue & Philosophy */}
            <div>
              {/* Small Label */}
              <div className="text-xs font-semibold uppercase tracking-widest text-[#D87967]">
                IEPAZĪSTIET ELĪNU
              </div>

              {/* Headline */}
              <h2 className="mt-3 font-sans text-3xl sm:text-4xl lg:text-[2.9rem] font-medium leading-[1.18] tracking-tight text-[#24302D]">
                “Vispirms es gribu saprast Jūsu stāstu.”
              </h2>

              {/* Intimate Body Copy */}
              <div className="mt-6 space-y-4 text-base sm:text-lg leading-relaxed text-[#4A5D57]">
                <p>
                  Katrs cilvēks kustas citādi — un katrs atnāk ar savu pieredzi, ikdienu un iemeslu, kāpēc ķermenis šobrīd prasa vairāk uzmanības.
                </p>
                <p>
                  Tāpēc pirmajā vizītē es nesteidzos pie “vingrojumu saraksta”. Vispirms mēs izrunājam, kas ir mainījies, ko Jūs vēlaties atgūt un kā ķermenis kustas kopumā.
                </p>
                <p className="font-medium text-[#24302D]">
                  Tikai tad veidojam plānu, kas iederas Jūsu dzīvē.
                </p>
              </div>

              {/* Subtle Human Details Line */}
              <div className="mt-8 border-t border-[#24302D]/12 pt-5 text-xs text-[#5A6D67] italic">
                Kustība · darbs ar sievietēm · bērnu attīstība · rehabilitācija · laba kafija pēc garas pastaigas
              </div>

              {/* Quiet Horizontal Credentials Strip */}
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold uppercase tracking-wider text-[#24302D]">
                <span>Fizioterapija</span>
                <span className="text-[#D87967]">•</span>
                <span>Kustību terapija</span>
                <span className="text-[#D87967]">•</span>
                <span>Sieviešu veselība</span>
                <span className="text-[#D87967]">•</span>
                <span>Darbs ar bērniem</span>
                <span className="text-[#D87967]">•</span>
                <span>Rehabilitācija</span>
              </div>

              {/* Quiet CTA */}
              <div className="mt-9">
                <a
                  href="#nodalas"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#D87967] hover:underline"
                >
                  <span>Iepazīt prakses virzienus</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. FOUR SPECIALISM STORYTELLING CHAPTERS (NO SERVICES GRID) */}
      {/* Real Patient Question: "Do you work with this specific problem?" */}
      {/* ============================================================ */}
      <section id="nodalas" className="relative">
        
        {/* Subtle Sticky Category Navigator */}
        <div className="sticky top-[73px] z-30 bg-[#FFF9F4]/90 backdrop-blur-md border-y border-[#24302D]/08 py-3.5 px-6">
          <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
            <span className="hidden sm:inline-block text-xs font-semibold uppercase tracking-wider text-[#5A6D67]">
              Prakses virzieni:
            </span>
            <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar w-full sm:w-auto">
              {[
                { id: "sapes", label: "Sāpes & Atveseļošanās" },
                { id: "grutnieciba", label: "Grūtniecība" },
                { id: "pecdzemdibam", label: "Pēc dzemdībām" },
                { id: "berniem", label: "Mazuļi & Bērni" },
              ].map((cat) => (
                <a
                  key={cat.id}
                  href={`#${cat.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(cat.id)?.scrollIntoView({ behavior: "smooth" });
                    setActiveChapter(cat.id);
                  }}
                  className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                    activeChapter === cat.id
                      ? "bg-[#24302D] text-[#FFF9F4] shadow-xs"
                      : "text-[#5A6D67] hover:text-[#24302D] hover:bg-black/[0.04]"
                  }`}
                >
                  {cat.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* CHAPTER 1: SĀPES & ATVESEĻOŠANĀS (Image Left / Text Right) */}
        <div id="sapes" className="py-24 lg:py-32 border-b border-[#24302D]/08 bg-[#FFF9F4]">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              
              {/* Oversized Photo with Organic Scale Reveal */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={chapterImageVariants}
                style={{
                  borderRadius: "80px 20px 80px 20px",
                  boxShadow: "0 20px 40px -15px rgba(36, 48, 45, 0.10)",
                }}
                className="relative h-[440px] sm:h-[500px] w-full overflow-hidden bg-[#F8E9E3] border border-white"
              >
                <Image
                  src="/concept-physio/service-rehab.jpg"
                  alt="Mugurkaula un locītavu atveseļošana KUSTĪBA praksē"
                  fill
                  sizes="(max-width: 1024px) 100vw, 520px"
                  className="object-cover"
                />
              </motion.div>

              {/* Narrative Content */}
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#D87967]">
                  01 · SĀPES & ATVESEĻOŠANĀS
                </span>
                <h2 className="mt-2 font-sans text-3xl sm:text-4xl lg:text-[2.75rem] font-medium text-[#24302D] leading-[1.2]">
                  Atgriezties pie kustības, kurai atkal var uzticēties.
                </h2>

                <div className="mt-6 space-y-4 text-base sm:text-lg leading-relaxed text-[#5A6D67]">
                  <p>
                    Sāpes bieži maina to, kā mēs kustamies, strādājam, guļam un pat domājam par savu ķermeni.
                  </p>
                  <p>
                    Mēs sākam ar to, kas traucē tieši Jums, izvērtējam kustību kopumā un soli pa solim veidojam ceļu atpakaļ uz drošu kustību.
                  </p>
                </div>

                {/* Supporting Links Strip */}
                <div className="mt-8 flex flex-wrap gap-2 text-xs font-medium text-[#24302D]">
                  {["Muguras sāpes", "Kakls un pleci", "Pēc traumām", "Pēc operācijām", "Kustību ierobežojumi"].map((item) => (
                    <span
                      key={item}
                      className="rounded-xl border border-black/10 bg-white px-3 py-1.5 shadow-2xs"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex items-center gap-6">
                  <a
                    href="#pieraksts"
                    onClick={() => { setSelectedService("rehab"); changeBookingStep(3); }}
                    style={{ backgroundColor: "#D87967", color: "#FFFFFF" }}
                    className="rounded-full px-7 py-3 text-xs font-semibold hover:bg-[#C26553]"
                  >
                    Pieteikt rehabilitācijas vizīti →
                  </a>
                  <a href="#cenas" className="text-xs font-medium text-[#5A6D67] hover:text-[#24302D] underline">
                    Skatīt cenrādi
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CHAPTER 2: GRŪTNIECĪBA (Text Left / Image Right · Soft Coral Blush) */}
        <div
          id="grutnieciba"
          style={{
            backgroundColor: "#F8E9E3",
            backgroundImage: "radial-gradient(circle at 80% 20%, rgba(216, 121, 103, 0.12), transparent 45%)",
          }}
          className="py-24 lg:py-32 border-b border-[#24302D]/08"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              
              {/* Narrative Content */}
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#D87967]">
                  02 · GRŪTNIECĪBA
                </span>
                <h2 className="mt-2 font-sans text-3xl sm:text-4xl lg:text-[2.75rem] font-medium text-[#24302D] leading-[1.2]">
                  Ķermenis mainās. Jums nav tas jāizdzīvo vienai.
                </h2>

                <div className="mt-6 space-y-4 text-base sm:text-lg leading-relaxed text-[#5A6D67]">
                  <p>
                    Gaidību laikā mainās smaguma centrs, locītavu saites kļūst elastīgākas, un muguras jostas daļa un iegurnis saņem nepierastu slodzi. Tas ir dabisks process, taču tas nenozīmē, ka sāpes ir jāpacieš.
                  </p>
                  <p>
                    Mēs palīdzam saudzīgi atslogot sasprindzinātās zonas, iemācām elpošanas un atslābināšanās tehnikas un sagatavojam ķermeni vieglām, harmoniskām dzemdībām.
                  </p>
                </div>

                {/* Supporting Links Strip */}
                <div className="mt-8 flex flex-wrap gap-2 text-xs font-medium text-[#24302D]">
                  {["Iegurņa un muguras atslogošana", "Elpošana dzemdībām", "Kustības 2. un 3. trimestrī", "Teipošana vēderam"].map((item) => (
                    <span
                      key={item}
                      className="rounded-xl border border-black/10 bg-white px-3 py-1.5 shadow-2xs"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex items-center gap-6">
                  <a
                    href="#pieraksts"
                    onClick={() => { setSelectedService("women"); setSelectedSpecialist("elina"); changeBookingStep(3); }}
                    style={{ backgroundColor: "#24302D", color: "#FFF9F4" }}
                    className="rounded-full px-7 py-3 text-xs font-semibold hover:bg-[#D87967]"
                  >
                    Pieteikt grūtniecības vizīti →
                  </a>
                  <span className="text-xs text-[#5A6D67]">Pieņem Elīna Vītola</span>
                </div>
              </div>

              {/* Oversized Photo with Organic Scale Reveal */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={chapterImageVariants}
                style={{
                  borderRadius: "20px 80px 20px 80px",
                  boxShadow: "0 20px 40px -15px rgba(216, 121, 103, 0.18)",
                }}
                className="relative h-[440px] sm:h-[500px] w-full overflow-hidden bg-[#FFF9F4] border border-white"
              >
                <Image
                  src="/concept-physio/service-women.jpg"
                  alt="Grūtnieču saudzīgā fizioterapija un aprūpe"
                  fill
                  sizes="(max-width: 1024px) 100vw, 520px"
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* CHAPTER 3: PĒC DZEMDĪBĀM (Image Left / Text Right · Warm Cream) */}
        <div id="pecdzemdibam" className="py-24 lg:py-32 border-b border-[#24302D]/08 bg-[#FFF7EF]">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              
              {/* Oversized Photo with Organic Scale Reveal */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={chapterImageVariants}
                style={{
                  borderRadius: "80px 20px 80px 20px",
                  boxShadow: "0 20px 40px -15px rgba(36, 48, 45, 0.10)",
                }}
                className="relative h-[440px] sm:h-[500px] w-full overflow-hidden bg-[#F8E9E3] border border-white"
              >
                <Image
                  src="/concept-physio/hero-treatment.jpg"
                  alt="Pēcdzemdību atjaunošanās un diastāzes pārbaude"
                  fill
                  sizes="(max-width: 1024px) 100vw, 520px"
                  className="object-cover"
                />
              </motion.div>

              {/* Narrative Content */}
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#D87967]">
                  03 · PĒC DZEMDĪBĀM
                </span>
                <h2 className="mt-2 font-sans text-3xl sm:text-4xl lg:text-[2.75rem] font-medium text-[#24302D] leading-[1.2]">
                  Atgriešanās pie sevis nav sacensība.
                </h2>

                <div className="mt-6 space-y-4 text-base sm:text-lg leading-relaxed text-[#5A6D67]">
                  <p>
                    Pēcdzemdību periods prasa pacietību un patiesu saudzību. Ķermenim ir nepieciešams laiks, lai audi atjaunotos, vēdera dziļie muskuļi atkal atrastu savienojumu un iegurņa pamatne kļūtu stabila.
                  </p>
                  <p>
                    Mēs pārbaudām taisnā vēdera muskuļa diastāzi, izvērtējam rētu sadzīšanu pēc ķeizargrieziena un veidojam pakāpenisku, drošu plānu atgriešanās brīdim pie ikdienas aktivitātēm un sporta.
                  </p>
                </div>

                {/* Supporting Links Strip */}
                <div className="mt-8 flex flex-wrap gap-2 text-xs font-medium text-[#24302D]">
                  {["Diastāzes diagnostika", "Iegurņa pamatnes muskuļi", "Ķeizargrieziena rētas aprūpe", "Droša atgriešanās pie sporta"].map((item) => (
                    <span
                      key={item}
                      className="rounded-xl border border-black/10 bg-white px-3 py-1.5 shadow-2xs"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex items-center gap-6">
                  <a
                    href="#pieraksts"
                    onClick={() => { setSelectedService("women"); setSelectedSpecialist("elina"); changeBookingStep(3); }}
                    style={{ backgroundColor: "#D87967", color: "#FFFFFF" }}
                    className="rounded-full px-7 py-3 text-xs font-semibold hover:bg-[#C26553]"
                  >
                    Pieteikt pēcdzemdību pārbaudi →
                  </a>
                  <span className="text-xs text-[#5A6D67]">Ieteicams no 6. nedēļas pēc dzemdībām</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CHAPTER 4: MAZUĻI & BĒRNI (Text Left / Image Right · Soft Botanical Sage) */}
        <div
          id="berniem"
          style={{
            backgroundColor: "#E5ECE5",
            backgroundImage: "radial-gradient(circle at 20% 80%, rgba(159, 184, 166, 0.20), transparent 45%)",
          }}
          className="py-24 lg:py-32 border-b border-[#24302D]/08"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              
              {/* Narrative Content */}
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#24302D]">
                  04 · MAZUĻI & BĒRNI
                </span>
                <h2 className="mt-2 font-sans text-3xl sm:text-4xl lg:text-[2.75rem] font-medium text-[#24302D] leading-[1.2]">
                  Mazs ķermenis. Milzīgs attīstības ceļš.
                </h2>

                <div className="mt-6 space-y-4 text-base sm:text-lg leading-relaxed text-[#5A6D67]">
                  <p>
                    Pirmajā dzīves gadā mazulis apgūst svarīgākās dzīves kustības — velšanos, rāpošanu, sēdēšanu un pirmos soļus. Vecāku pareizs hendlings (ikdienas celšana, turēšana un ģērbšana) ir labākais atbalsts simetriskai attīstībai.
                  </p>
                  <p>
                    Nodarbībā Anna Ozola mierīgā un rotaļīgā veidā novērtē mazuļa motoriku, muskuļu tonusu un iemāca vecākiem praktiskus paņēmienus, kā ikdienā palīdzēt mazulim justies brīvi un droši.
                  </p>
                </div>

                {/* Supporting Links Strip */}
                <div className="mt-8 flex flex-wrap gap-2 text-xs font-medium text-[#24302D]">
                  {["Zīdaiņu hendlings vecākiem", "Muskuļu tonusa līdzsvarošana", "Velšanās un rāpošanas veicināšana", "Bērnu stājas korekcija"].map((item) => (
                    <span
                      key={item}
                      className="rounded-xl border border-black/10 bg-white px-3 py-1.5 shadow-2xs"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex items-center gap-6">
                  <a
                    href="#pieraksts"
                    onClick={() => { setSelectedService("infant"); setSelectedSpecialist("anna"); changeBookingStep(3); }}
                    style={{ backgroundColor: "#24302D", color: "#FFF9F4" }}
                    className="rounded-full px-7 py-3 text-xs font-semibold hover:bg-[#D87967]"
                  >
                    Pieteikt hendlinga nodarbību →
                  </a>
                  <span className="text-xs text-[#5A6D67]">Pieņem Anna Ozola (40 € / 45 min)</span>
                </div>
              </div>

              {/* Oversized Photo with Organic Scale Reveal */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={chapterImageVariants}
                style={{
                  borderRadius: "20px 80px 20px 80px",
                  boxShadow: "0 20px 40px -15px rgba(36, 48, 45, 0.12)",
                }}
                className="relative h-[440px] sm:h-[500px] w-full overflow-hidden bg-[#FFF9F4] border border-white"
              >
                <Image
                  src="/concept-physio/service-children.jpg"
                  alt="Zīdaiņu attīstība un mīlošs hendlings"
                  fill
                  sizes="(max-width: 1024px) 100vw, 520px"
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. FIRST-VISIT STORY SECTION — NO UNCERTAINTY */}
      {/* Real Patient Question: "What will happen to me?" */}
      {/* ============================================================ */}
      <section
        id="vizite"
        style={{
          background: "linear-gradient(180deg, #FFF9F4 0%, #EBF2EB 50%, #FFF9F4 100%)",
        }}
        className="relative py-28 lg:py-36 border-b border-[#24302D]/08 overflow-hidden"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          
          {/* Header Narrative */}
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#D87967]">
              BEZ SATRAUKUMA & PĀRPRATUMIEM
            </span>
            <h2 className="mt-3 font-sans text-3xl sm:text-5xl font-medium text-[#24302D] leading-[1.15]">
              Pirmā vizīte bez nezināmā.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#5A6D67]">
              Jums nav jāzina, kāds pakalpojums Jums vajadzīgs. Tas ir mūsu darbs.
            </p>
          </div>

          {/* Horizontal Visual Journey with Animated SVG Connecting Path */}
          <div className="relative mt-20">
            
            {/* Desktop Animated SVG Movement Path */}
            <div className="absolute top-1/2 left-0 right-0 -translate-y-12 hidden lg:block pointer-events-none">
              <svg className="w-full h-24" viewBox="0 0 1100 100" fill="none" preserveAspectRatio="none">
                <motion.path
                  d="M 20,50 Q 280,10 550,50 T 1080,50"
                  stroke="#D87967"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.5 }}
                  viewport={{ once: true }}
                  transition={{ duration: shouldReduceMotion ? 0.01 : 1.5, ease: easeOrganic }}
                />
              </svg>
            </div>

            {/* 4 Steps Flow */}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 relative z-10">
              {firstVisitSteps.map((step, idx) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: shouldReduceMotion ? 0.01 : 0.6, delay: shouldReduceMotion ? 0 : idx * 0.12, ease: easeOrganic }}
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "2rem",
                    boxShadow: "0 12px 30px -10px rgba(36, 48, 45, 0.06)",
                  }}
                  className="flex flex-col justify-between border border-black/[0.06] p-7 sm:p-8 relative group hover:border-[#D87967]/40 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-sans text-4xl sm:text-5xl font-light text-[#D87967]">
                        {step.number}
                      </span>
                      <span className="rounded-full bg-[#FFF9F4] px-3 py-1 text-[10px] font-semibold text-[#5A6D67] border border-black/[0.04]">
                        {step.tag}
                      </span>
                    </div>

                    <h3 className="mt-6 font-sans text-xl font-medium text-[#24302D]">
                      {step.title}
                    </h3>

                    <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#5A6D67]">
                      {step.copy}
                    </p>
                  </div>

                  <div className="mt-8 border-t border-black/[0.04] pt-4 flex items-center justify-between text-xs text-[#24302D]">
                    <span className="font-medium text-[#D87967]">Solis {idx + 1} no 4</span>
                    <span className="text-[#5A6D67] text-[11px]">KUSTĪBA telpā</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Practical Reassurance Card */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "1.75rem",
              boxShadow: "0 8px 24px -8px rgba(36, 48, 45, 0.05)",
            }}
            className="mt-12 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-black/[0.06]"
          >
            <div className="space-y-1 text-xs sm:text-sm text-[#5A6D67]">
              <p>
                👕 <strong>Ko vilkt mugurā?</strong> Ērtu sporta vai brīvā laika apģērbu (t-kreklu un legingus/šortus), kas neierobežo kustības.
              </p>
              <p>
                📍 <strong>Ieeja & transports:</strong> Miera iela 24, 2. stāvs (ērts lifts ratiņiem un bezmaksas autostāvvieta pagalmā).
              </p>
            </div>
            <a
              href="#pieraksts"
              style={{ backgroundColor: "#D87967", color: "#FFFFFF" }}
              className="rounded-full px-8 py-3.5 text-xs font-semibold whitespace-nowrap hover:bg-[#C26553] shadow-xs"
            >
              Pieteikt 60 min vizīti →
            </a>
          </div>
        </div>
      </section>

      {/* 6. REASSURANCE: Specialist Team */}
      <section id="specialistes" className="py-20 lg:py-28 border-b border-[#24302D]/08">
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
                  onClick={() => { setSelectedSpecialist(person.id); changeBookingStep(3); }}
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

      {/* 7. TRANSPARENCY: Pricing & Insurance Reimbursement */}
      <section id="cenas" className="py-20 lg:py-28 border-b border-[#24302D]/08">
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

      {/* ============================================================ */}
      {/* 8. HUMAN TRUST / STORY SECTION (NO TRUSTPILOT) */}
      {/* Real Patient Question: "Can I trust that others felt understood here?" */}
      {/* ============================================================ */}
      <section
        id="stasti"
        style={{
          backgroundColor: "#FFF7EF",
          backgroundImage: `
            radial-gradient(circle at 10% 20%, rgba(216, 121, 103, 0.08), transparent 45%),
            radial-gradient(circle at 90% 80%, rgba(159, 184, 166, 0.15), transparent 45%)
          `,
        }}
        className="py-24 lg:py-32 border-b border-[#24302D]/08"
      >
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          
          {/* Header Narrative */}
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#D87967]">
              PACIENTU PIEREDZE
            </span>
            <h2 className="mt-3 font-sans text-3xl sm:text-5xl font-medium text-[#24302D] leading-[1.18]">
              <span>Dažreiz visvairāk palīdz dzirdēt:</span>
              <span className="block font-normal italic font-serif text-[#D87967] mt-1">
                “Es arī tā jutos.”
              </span>
            </h2>
          </div>

          {/* Large Active Story Showcase (1 Active at a Time) */}
          <div className="mt-14">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStory.id}
                initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: shouldReduceMotion ? 0 : -20 }}
                transition={{ duration: shouldReduceMotion ? 0.01 : 0.5, ease: easeOrganic }}
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "2.5rem 1.5rem 2.5rem 1.5rem",
                  boxShadow: "0 20px 45px -15px rgba(36, 48, 45, 0.08)",
                }}
                className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center p-8 sm:p-14 border border-black/[0.06]"
              >
                {/* Story Quote & Details */}
                <div>
                  <span className="inline-block rounded-full bg-[#FFF9F4] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#D87967] border border-black/[0.06]">
                    {activeStory.label}
                  </span>

                  <blockquote className="mt-6 font-serif italic text-2xl sm:text-3xl lg:text-4xl leading-[1.3] text-[#24302D]">
                    {activeStory.quote}
                  </blockquote>

                  <p className="mt-6 text-xs sm:text-sm text-[#5A6D67] border-t border-black/[0.06] pt-4">
                    Konteksts: <strong>{activeStory.situation}</strong>
                  </p>
                </div>

                {/* Abstract Natural / Clinic Atmosphere Visual */}
                <div
                  style={{
                    borderRadius: "2rem",
                    overflow: "hidden",
                    backgroundColor: "#F8E9E3",
                  }}
                  className="relative h-[320px] sm:h-[380px] w-full border border-black/[0.04]"
                >
                  <Image
                    src={activeStory.image}
                    alt={activeStory.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 450px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 rounded-xl bg-white/90 backdrop-blur-xs px-3 py-1 text-[11px] text-[#24302D] font-medium">
                    {activeStory.imageAlt}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Tactile Story Switcher Controls (No Auto-Play) */}
            <div className="mt-8 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {demoStories.map((story, i) => (
                  <button
                    key={story.id}
                    type="button"
                    onClick={() => setActiveStoryIdx(i)}
                    className={`h-2.5 rounded-full transition-all ${
                      activeStoryIdx === i ? "w-8 bg-[#D87967]" : "w-2.5 bg-black/20 hover:bg-black/40"
                    }`}
                    aria-label={`Skatīt stāstu ${i + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setActiveStoryIdx((prev) => (prev === 0 ? demoStories.length - 1 : prev - 1))
                  }
                  style={{ backgroundColor: "#FFFFFF", borderColor: "rgba(36, 48, 45, 0.15)" }}
                  className="flex h-11 w-11 items-center justify-center rounded-full border text-base text-[#24302D] transition-colors hover:bg-[#24302D] hover:text-white"
                  aria-label="Iepriekšējais stāsts"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveStoryIdx((prev) => (prev === demoStories.length - 1 ? 0 : prev + 1))
                  }
                  style={{ backgroundColor: "#FFFFFF", borderColor: "rgba(36, 48, 45, 0.15)" }}
                  className="flex h-11 w-11 items-center justify-center rounded-full border text-base text-[#24302D] transition-colors hover:bg-[#24302D] hover:text-white"
                  aria-label="Nākamais stāsts"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 9. PREMIUM BOOKING SECTION (DEEP WARM GREEN #243A36 MOMENT) */}
      {/* Real Patient Question: "What do I do next?" */}
      {/* ============================================================ */}
      <section
        id="pieraksts"
        style={{
          backgroundColor: "#243A36",
          backgroundImage: `
            radial-gradient(circle at 80% 20%, rgba(159, 184, 166, 0.18), transparent 45%),
            radial-gradient(circle at 15% 85%, rgba(216, 121, 103, 0.12), transparent 50%)
          `,
        }}
        className="py-28 lg:py-36 text-[#FFF9F4] relative overflow-hidden"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            
            {/* LEFT: Reassuring Human Guidance & Direct Channels */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#9FB8A6]">
                PIETEIKT VIZĪTI
              </span>
              <h2 className="mt-3 font-sans text-3xl sm:text-5xl font-medium text-[#FFF9F4] leading-[1.15]">
                Sāksim ar pirmo soli.
              </h2>

              <div className="mt-6 space-y-4 text-base sm:text-lg leading-relaxed text-[#FFF9F4]/80">
                <p>
                  Ja zināt, ko vēlaties rezervēt — izvēlieties vizītes laiku blakus esošajā kalendārā.
                </p>
                <p>
                  Ja neesat pārliecināta, ar ko sākt — īsi pastāstiet par savu situāciju, un mēs palīdzēsim izvēlēties piemērotāko speciālisti un pirmo soli.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#booking-card"
                  style={{ backgroundColor: "#D87967", color: "#FFFFFF" }}
                  className="rounded-full px-8 py-3.5 text-xs font-semibold shadow-md transition-all hover:bg-[#C26553] hover:-translate-y-0.5"
                >
                  Izvēlēties vizītes laiku
                </a>
                <a
                  href="#jautajums"
                  className="text-xs sm:text-sm font-medium text-[#FFF9F4] underline decoration-white/30 underline-offset-4 hover:text-[#9FB8A6]"
                >
                  Man vajag palīdzību izvēlēties →
                </a>
              </div>

              {/* Direct Quick Contact Options */}
              <div className="mt-12 border-t border-white/10 pt-8 space-y-3 text-xs text-[#FFF9F4]/70">
                <p className="font-semibold uppercase tracking-wider text-[#9FB8A6]">
                  Tiešā saziņa ar speciālisti:
                </p>
                <div className="flex flex-wrap gap-4 pt-1">
                  <a
                    href="https://wa.me/37120000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-white hover:bg-white/20 transition-colors"
                  >
                    <span>💬 WhatsApp</span>
                  </a>
                  <a
                    href="tel:+37167000000"
                    className="flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-white hover:bg-white/20 transition-colors"
                  >
                    <span>📞 Zvanīt</span>
                  </a>
                  <a
                    href="mailto:sveiki@kustiba-demo.lv"
                    className="flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-white hover:bg-white/20 transition-colors"
                  >
                    <span>✉️ E-pasts</span>
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT: LARGE INTERACTIVE BOOKING CARD (3D Depth Transition) */}
            <motion.div
              id="booking-card"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30, scale: shouldReduceMotion ? 1 : 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.8, ease: easeOrganic }}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "2.5rem 1.5rem 2.5rem 1.5rem",
                boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.35)",
              }}
              className="p-7 sm:p-10 text-[#24302D] border border-white/80"
            >
              {/* Header & Step Navigation */}
              <div className="flex items-center justify-between border-b border-black/[0.06] pb-5">
                <div>
                  <h3 className="font-sans text-2xl font-medium text-[#24302D]">Pieteikt vizīti</h3>
                  <span className="text-xs text-[#5A6D67]">KUSTĪBA telpā · Miera iela 24</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold">
                  {[
                    { num: 1, label: "Pakalpojums" },
                    { num: 2, label: "Speciālists" },
                    { num: 3, label: "Laiks" },
                  ].map((s) => (
                    <button
                      key={s.num}
                      type="button"
                      onClick={() => changeBookingStep(s.num as 1 | 2 | 3)}
                      className={`flex items-center gap-1 rounded-full px-2.5 py-1 transition-colors ${
                        bookingStep === s.num
                          ? "bg-[#24302D] text-white"
                          : "text-[#5A6D67] hover:bg-black/[0.04]"
                      }`}
                    >
                      <span className="text-[10px] opacity-75">{s.num}</span>
                      <span className="hidden sm:inline">{s.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {bookingCompleted ? (
                /* Completed Screen */
                <div className="py-10 text-center">
                  <span
                    style={{ backgroundColor: "#F8E9E3", color: "#D87967" }}
                    className="inline-flex h-16 w-16 items-center justify-center rounded-full text-3xl font-serif"
                  >
                    ✓
                  </span>
                  <h4 className="mt-4 font-sans text-2xl sm:text-3xl font-medium text-[#24302D]">
                    Vizītes pieteikums reģistrēts!
                  </h4>
                  <p className="mt-2 text-sm text-[#5A6D67]">
                    <strong>{currentDayObj.fullDay} plkst. {selectedTimeSlot}</strong> pie speciālistes <strong>{currentSpecialistObj.name}</strong>.
                  </p>

                  <div
                    style={{ backgroundColor: "#FFF9F4" }}
                    className="mt-6 rounded-2xl p-4 text-xs text-left border border-black/[0.06] text-[#24302D]"
                  >
                    <p>📍 Miera iela 24, 2. stāvs (ērts lifts ratiņiem)</p>
                    <p className="mt-1">🔔 SMS atgādinājums tiks nosūtīts 24h pirms vizītes.</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => { setBookingCompleted(false); setShowIntakeForm(false); }}
                    style={{ backgroundColor: "#24302D", color: "#FFF9F4" }}
                    className="mt-6 rounded-full px-7 py-2.5 text-xs font-semibold hover:bg-[#D87967]"
                  >
                    Pieteikt citu laiku
                  </button>
                </div>
              ) : showIntakeForm ? (
                /* Intake Form Step */
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setBookingCompleted(true);
                  }}
                  className="mt-6 space-y-4"
                >
                  <div className="rounded-xl bg-[#FFF9F4] p-3 text-xs text-[#24302D] border border-black/[0.06]">
                    <strong>Izvēlēts:</strong> {currentDayObj.fullDay} plkst. {selectedTimeSlot} · {currentSpecialistObj.name} ({currentServiceObj.title})
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#24302D]">Jūsu vārds, uzvārds *</label>
                    <input
                      type="text"
                      required
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder="Anna Bērziņa"
                      className="mt-1 w-full rounded-xl border border-black/15 bg-[#FFF9F4] px-4 py-2.5 text-sm text-[#24302D] focus:border-[#D87967] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#24302D]">Tālruņa numurs (SMS atgādinājumam) *</label>
                    <input
                      type="tel"
                      required
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      placeholder="+371 20 000 000"
                      className="mt-1 w-full rounded-xl border border-black/15 bg-[#FFF9F4] px-4 py-2.5 text-sm text-[#24302D] focus:border-[#D87967] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#24302D]">Piezīmes ārstei (pēc izvēles)</label>
                    <input
                      type="text"
                      value={patientNote}
                      onChange={(e) => setPatientNote(e.target.value)}
                      placeholder="Kas šobrīd sagādā vislielāko diskomfortu?"
                      className="mt-1 w-full rounded-xl border border-black/15 bg-[#FFF9F4] px-4 py-2.5 text-sm text-[#24302D] focus:border-[#D87967] focus:outline-hidden"
                    />
                  </div>

                  <div className="flex items-center justify-between border-t border-black/[0.06] pt-4">
                    <button
                      type="button"
                      onClick={() => setShowIntakeForm(false)}
                      className="text-xs text-[#5A6D67] hover:underline"
                    >
                      ← Mainīt laiku
                    </button>
                    <button
                      type="submit"
                      style={{ backgroundColor: "#D87967", color: "#FFFFFF" }}
                      className="rounded-full px-8 py-3 text-xs font-semibold shadow-xs hover:bg-[#C26553]"
                    >
                      Apstiprināt pieteikumu →
                    </button>
                  </div>
                </form>
              ) : (
                /* Step by Step Booking Engine with Directional Horizontal Transitions */
                <div className="mt-6 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={bookingStep}
                      initial={{ opacity: 0, x: shouldReduceMotion ? 0 : stepDirection * 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: shouldReduceMotion ? 0 : -stepDirection * 15 }}
                      transition={{ duration: shouldReduceMotion ? 0.01 : 0.35, ease: easeOrganic }}
                      className="space-y-6"
                    >
                      {/* Step 1: Service Selector */}
                      {bookingStep === 1 && (
                        <div className="space-y-3">
                          <p className="text-xs font-semibold uppercase tracking-wider text-[#D87967]">
                            Izvēlieties vizītes veidu:
                          </p>
                          <div className="grid gap-2.5">
                            {servicesList.map((srv) => (
                              <button
                                key={srv.id}
                                type="button"
                                onClick={() => { setSelectedService(srv.id); changeBookingStep(2); }}
                                className={`flex items-center justify-between rounded-2xl border p-4 text-left transition-all ${
                                  selectedService === srv.id
                                    ? "border-[#D87967] bg-[#F8E9E3]/50"
                                    : "border-black/[0.08] hover:bg-[#FFF9F4]"
                                }`}
                              >
                                <div>
                                  <p className="text-xs sm:text-sm font-semibold text-[#24302D]">{srv.title}</p>
                                  <span className="text-[11px] text-[#5A6D67]">{srv.duration}</span>
                                </div>
                                <span className="font-sans font-medium text-sm text-[#24302D]">{srv.price}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Step 2: Specialist Selector */}
                      {bookingStep === 2 && (
                        <div className="space-y-3">
                          <p className="text-xs font-semibold uppercase tracking-wider text-[#D87967]">
                            Izvēlieties speciālisti:
                          </p>
                          <div className="grid gap-2.5">
                            {specialists.map((spec) => (
                              <button
                                key={spec.id}
                                type="button"
                                onClick={() => { setSelectedSpecialist(spec.id); changeBookingStep(3); }}
                                className={`flex items-center gap-3.5 rounded-2xl border p-4 text-left transition-all ${
                                  selectedSpecialist === spec.id
                                    ? "border-[#D87967] bg-[#F8E9E3]/50"
                                    : "border-black/[0.08] hover:bg-[#FFF9F4]"
                                }`}
                              >
                                <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-black/10 bg-[#F8E9E3]">
                                  <Image src={spec.image} alt={spec.name} fill sizes="48px" className="object-cover" />
                                </div>
                                <div>
                                  <p className="text-xs sm:text-sm font-semibold text-[#24302D]">{spec.name}</p>
                                  <p className="text-[11px] text-[#5A6D67]">{spec.role}</p>
                                  <span className="text-[10px] text-[#D87967] font-medium">{spec.badge}</span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Step 3: Date & Live Time Slots (Default & Main View) */}
                      {bookingStep === 3 && (
                        <div>
                          {/* Active Selection Summary Strip */}
                          <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-[#FFF9F4] p-3.5 border border-black/[0.06] text-xs text-[#24302D]">
                            <div>
                              <p className="font-semibold">{currentServiceObj.title}</p>
                              <span className="text-[11px] text-[#5A6D67]">
                                {currentServiceObj.duration} · {currentSpecialistObj.name}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => changeBookingStep(1)}
                              className="text-[11px] font-medium text-[#D87967] hover:underline"
                            >
                              Mainīt →
                            </button>
                          </div>

                          {/* Week Selector Header */}
                          <div className="mt-5 flex items-center justify-between">
                            <span className="text-xs font-semibold uppercase tracking-wider text-[#24302D]">
                              Nedēļa: 7.–11. septembris 2026
                            </span>
                            <span className="text-xs text-[#5A6D67]">
                              {currentDayObj.fullDay}
                            </span>
                          </div>

                          {/* Days Strip */}
                          <div className="mt-3 grid grid-cols-5 gap-2">
                            {bookingDays.map((d, i) => (
                              <button
                                key={d.date}
                                type="button"
                                onClick={() => { setSelectedDayIndex(i); setSelectedTimeSlot(d.slots[0]); }}
                                className={`rounded-2xl border p-2.5 sm:p-3 text-center transition-all ${
                                  selectedDayIndex === i
                                    ? "border-[#24302D] bg-[#24302D] text-white shadow-xs"
                                    : "border-black/[0.08] bg-[#FFF9F4] text-[#24302D] hover:bg-white"
                                }`}
                              >
                                <p className="text-[10px] sm:text-[11px] opacity-75">{d.dayName}</p>
                                <p className="font-sans font-medium text-sm sm:text-base mt-0.5">
                                  {d.fullDay.split(" ")[1]}
                                </p>
                              </button>
                            ))}
                          </div>

                          {/* Available Time Slots Chips */}
                          <div className="mt-5">
                            <p className="text-xs font-medium text-[#5A6D67] mb-2.5">
                              Pieejamie laiki šajā dienā:
                            </p>
                            <div className="grid grid-cols-3 gap-2.5">
                              {currentDayObj.slots.map((slot) => (
                                <button
                                  key={slot}
                                  type="button"
                                  onClick={() => setSelectedTimeSlot(slot)}
                                  className={`rounded-xl border py-3 text-center font-mono text-xs sm:text-sm font-medium transition-all ${
                                    selectedTimeSlot === slot
                                      ? "border-[#D87967] bg-[#D87967] text-white shadow-xs"
                                      : "border-black/[0.08] bg-[#FFF9F4] text-[#24302D] hover:border-black/20"
                                  }`}
                                >
                                  {slot}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Active Confirmation Preview Panel */}
                          <div className="mt-6 border-t border-black/[0.06] pt-5">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                              <div>
                                <span className="text-xs font-semibold text-[#24302D]">
                                  {currentDayObj.fullDay} · plkst. {selectedTimeSlot}
                                </span>
                                <p className="text-xs text-[#5A6D67]">
                                  {currentSpecialistObj.name} · {currentServiceObj.title} ({currentServiceObj.price})
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => setShowIntakeForm(true)}
                                style={{ backgroundColor: "#D87967", color: "#FFFFFF" }}
                                className="rounded-full px-8 py-3 text-xs font-semibold shadow-xs hover:bg-[#C26553] whitespace-nowrap"
                              >
                                Turpināt →
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Microcopy */}
                  <div className="border-t border-black/[0.06] mt-6 pt-3 flex items-center justify-between text-[11px] text-[#5A6D67]">
                    <span>Nezināt, ko izvēlēties? Uzrakstiet mums — palīdzēsim.</span>
                    <a href="#jautajums" className="text-[#D87967] font-medium hover:underline">
                      Uzdot jautājumu →
                    </a>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 10. DIRECT HUMAN QUESTION: For Undecided Patients */}
      <section
        id="jautajums"
        style={{
          backgroundColor: "#F4D7D0",
          borderColor: "rgba(36, 48, 45, 0.08)",
        }}
        className="py-20 lg:py-28 border-b"
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
                    Nosūtīt jautājumu speciālistei
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 11. FAQ ACCORDIONS */}
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
            <p>© {new Date().getFullYear()} KUSTĪBA. Fizioterapijas telpa Rīgā.</p>
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

      {/* ============================================================ */}
      {/* MOBILE PERSISTENT BOTTOM BOOKING BAR (AFTER HERO SCROLL) */}
      {/* ============================================================ */}
      <AnimatePresence>
        {showMobileBottomBar && (
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : 50 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.35, ease: easeOrganic }}
            className="sm:hidden fixed bottom-0 left-0 right-0 z-50 p-4 bg-[#FFF9F4]/95 backdrop-blur-md border-t border-black/10 shadow-2xl"
          >
            <a
              href="#pieraksts"
              style={{ backgroundColor: "#D87967", color: "#FFFFFF" }}
              className="flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold shadow-md active:scale-98"
            >
              <span>Pieteikt vizīti</span>
              <span>→</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
