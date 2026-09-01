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

  // Header scroll state & mobile bottom bar visibility
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [showMobileBottomBar, setShowMobileBottomBar] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Recognition / Situations State
  const [hoveredSituation, setHoveredSituation] = useState<number>(0);

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

  // Track header scroll & smart mobile sticky bar hiding when booking section is visible
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setIsScrolled(currentScroll > 60);

      const bookingEl = document.getElementById("pieraksts");
      let isBookingInView = false;
      if (bookingEl) {
        const rect = bookingEl.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.8 && rect.bottom >= 100) {
          isBookingInView = true;
        }
      }

      setShowMobileBottomBar(currentScroll > 520 && !isBookingInView);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Clean, human, conversational patient thoughts
  const recognitionItems = [
    {
      id: 0,
      thought: "“Man sāp mugura vai kakls, un tas sāk traucēt ikdienai.”",
      response: "Sāpes bieži ir signāls, ka slodze ķermenī sadalās nevienmērīgi. Mēs nesākam ar straujiem vingrojumiem, bet vispirms mierīgi izvērtējam, kā Jūs sēžat, elpojat un kustaties ikdienā.",
      image: "/concept-physio/warm-guidance.jpg",
      imageAlt: "Nesteidzīga un saudzīga kustību izvērtēšana",
    },
    {
      id: 1,
      thought: "“Pēc traumas ķermenis vairs nejūtas tik drošs kā agrāk.”",
      response: "Bailes no atkārtotām sāpēm ir pilnīgi dabiskas. Mēs soli pa solim palīdzam atgūt kustību brīvību, muskuļu spēku un pārliecību par katru soli.",
      image: "/concept-physio/service-movement.jpg",
      imageAlt: "Droša un pakāpeniska kustību atjaunošana",
    },
    {
      id: 2,
      thought: "“Gaidu bērniņu un gribu kustēties bez muguras sāpēm.”",
      response: "Gaidību laikā mainās smaguma centrs un locītavu saites. Mēs palīdzam saudzīgi atslogot jostas daļu un sagatavoties vieglākām, harmoniskām dzemdībām.",
      image: "/concept-physio/service-women.jpg",
      imageAlt: "Gaidību laika aprūpe un muguras atslogošana",
    },
    {
      id: 3,
      thought: "“Pēc dzemdībām nejūtos savā ķermenī kā iepriekš.”",
      response: "Pārbaudām vēdera muskuļu diastāzi, saudzīgi atjaunojam iegurņa stabilitāti un dodam ķermenim laiku atveseļoties bez liekas steigas un pārslodzes.",
      image: "/concept-physio/hands-care.jpg",
      imageAlt: "Pēcdzemdību atjaunošanās un individuāla aprūpe",
    },
    {
      id: 4,
      thought: "“Nezinu, vai mana mazuļa kustību attīstība norit pareizi.”",
      response: "Mierīgā, rotaļīgā nodarbībā novērtējam mazuļa motoriku un iemācām vecākiem pareizu, maigu hendlingu ikdienas aprūpei mājās.",
      image: "/concept-physio/service-children.jpg",
      imageAlt: "Mazuļa dabiskā motorā attīstība un zīdaiņu hendlings",
    },
  ];

  const firstVisitSteps = [
    {
      title: "Parunāsim.",
      copy: "Pastāstiet, kas Jūs atveda un ko gribētu mainīt. Mēs vispirms mierīgi uzklausām Jūsu situāciju, nevis steidzamies pie vingrojumiem.",
    },
    {
      title: "Paskatīsimies, kā ķermenis kustas.",
      copy: "Nesteidzīga kustību pārbaude: kā Jūs elpojat, stāvat, apsēžaties un kā slodze sadalās visā ķermenī.",
    },
    {
      title: "Izskaidrosim.",
      copy: "Jums būs skaidrs, ko redzam un kā tas saistīts ar Jūsu pašsajūtu. Saudzīga manuāla atbrīvošana un pirmās terapeitiskās kustības.",
    },
    {
      title: "Vienosimies par nākamo soli.",
      copy: "Plāns, kas ir reāli izpildāms Jūsu ikdienā. 2–3 vienkārši paradumi vai vingrojumi mājas videi bez pārslodzes.",
    },
  ];

  const demoStories = [
    {
      id: 0,
      quote: "“Pirmo reizi nejutos tā, it kā man būtu tikai jāizpilda vingrojumi. Es sapratu, kas notiek ar manu ķermeni un kāpēc mēs darām tieši to, ko darām.”",
      situation: "Muguras sāpju atvieglošana pēc sēdoša darba",
      image: "/concept-physio/service-movement.jpg",
      imageAlt: "Dabiska kustība un terapeita vadība telpā",
    },
    {
      id: 1,
      quote: "“Pēc dzemdībām man bija grūti saprast, kas ir normāli un vai drīkstu atkal sportot. Saruna pati par sevi jau deva milzīgu mieru un skaidru ceļu uz priekšu.”",
      situation: "Diastāzes pārbaude un iegurņa stabilitātes atjaunošana",
      image: "/concept-physio/service-women.jpg",
      imageAlt: "Saudzīgs pieskāriens un sievietes veselības aprūpe",
    },
    {
      id: 2,
      quote: "“Mēs atnācām ar satraukumu par mazuļa motoriku, bet nodarbība noritēja tik mierīgā un mīlošā atmosfērā, ka viss satraukums izzuda. Mēs ieguvām drošību ikdienā.”",
      situation: "Mazuļa muskuļu tonuss un hendlinga apmācība vecākiem",
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
      personalNote: "“Lielākā daļa cilvēku pie mums ienāk brīdī, kad sāpes vai nogurums jau mēnešiem ir kļuvis par ikdienas fonu. Mūsu pieeja nav ātra procedūra. Mēs vispirms uzklausām, saprotam, kā Jūs elpojat un kustaties, un tikai tad saudzīgi palīdzam ķermenim atgūt dabisko balansu.”",
    },
    {
      id: "marta",
      name: "Marta Liepa",
      role: "Sertificēta fizioterapeite",
      experience: "8 gadu klīniskā pieredze",
      specialty: "Akūtas muguras sāpes, sporta un pēctraumu rehabilitācija",
      education: "RSU bakalaurs · K-Active funkcionālās teipošanas sertifikāts",
      image: "/concept-physio/practitioner-2.jpg",
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
        className="px-4 sm:px-6 py-2 text-xs flex flex-wrap items-center justify-between gap-2 border-b border-white/10"
      >
        <div className="flex items-center gap-2">
          <Link href="/" className="font-bold text-[#00C9A7] tracking-tight">
            saiteo
          </Link>
          <span className="opacity-40">|</span>
          <span className="opacity-80 truncate max-w-[210px] sm:max-w-none">
            Prakses etalons: <strong>KUSTĪBA</strong> · Rīga
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <Link
            href="/case-studies/physiotherapy"
            className="opacity-75 hover:opacity-100 underline decoration-white/30 whitespace-nowrap"
          >
            Kāpēc šī lapa konvertē? →
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
          isScrolled ? "backdrop-blur-xs py-3 shadow-2xs" : "py-4 sm:py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-12">
          
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
          <div className="flex items-center gap-3">
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
              className="lg:hidden flex h-11 w-11 items-center justify-center rounded-full border border-black/10 text-[#24302D] active:bg-black/5"
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
              className="lg:hidden overflow-hidden border-t border-black/[0.08] bg-[#FFF9F4] px-6 py-6 space-y-4 shadow-lg"
            >
              <a
                href="#atpazisana"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-medium text-[#24302D] py-1"
              >
                Kā varam palīdzēt
              </a>
              <a
                href="#elina"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-medium text-[#24302D] py-1"
              >
                Elīna
              </a>
              <a
                href="#nodalas"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-medium text-[#24302D] py-1"
              >
                Pakalpojumi
              </a>
              <a
                href="#vizite"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-medium text-[#24302D] py-1"
              >
                Pirmā vizīte
              </a>
              <div className="pt-3 border-t border-black/[0.06]">
                <a
                  href="#pieraksts"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ backgroundColor: "#D87967", color: "#FFFFFF" }}
                  className="block text-center rounded-full py-3.5 text-sm font-semibold min-h-[44px] flex items-center justify-center"
                >
                  Pieteikt vizīti →
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ============================================================ */}
      {/* 1. FULL-WIDTH LARGE EMOTIONAL HERO (EXPANSIVE & CINEMATIC)   */}
      {/* ============================================================ */}
      <section
        id="top"
        style={{
          minHeight: "calc(100svh - 75px)",
          backgroundImage: `
            radial-gradient(circle at 10% 15%, rgba(216, 121, 103, 0.12), transparent 45%),
            radial-gradient(circle at 90% 12%, rgba(159, 184, 166, 0.18), transparent 45%),
            radial-gradient(circle at 50% 70%, rgba(244, 215, 208, 0.12), transparent 55%)
          `,
        }}
        className="relative flex items-center overflow-hidden py-10 lg:py-0 border-b border-[#24302D]/08"
      >
        {/* Desktop Expansive Right Image */}
        <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[52vw] xl:w-[54vw] overflow-hidden">
          <motion.div
            style={{ y: heroImageY }}
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 1.2, ease: easeOrganic }}
            className="relative h-full w-full"
          >
            <div
              style={{
                borderRadius: "80px 0 0 80px",
              }}
              className="absolute inset-0 overflow-hidden shadow-2xl border-l-4 border-y-4 border-white bg-[#F8E9E3]"
            >
              <Image
                src="/concept-physio/hero-treatment.jpg"
                alt="Fizioterapijas un uzklausīšanas telpa KUSTĪBA praksē Rīgā"
                fill
                priority
                sizes="55vw"
                className="object-cover object-[center_35%]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#FFF9F4]/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </div>

        {/* Content Container */}
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] items-center">
            
            {/* LEFT: Text Monologue & Immediate CTA */}
            <motion.div
              style={{ opacity: heroOpacity }}
              className="max-w-xl lg:max-w-none lg:pr-12 flex flex-col justify-center py-6 sm:py-12"
            >
              <motion.div
                custom={0}
                initial="hidden"
                animate="visible"
                variants={revealLineVariants}
                className="text-xs sm:text-sm font-medium tracking-wide text-[#5A6D67]"
              >
                Fizioterapija sievietēm, bērniem un rehabilitācijai
              </motion.div>

              <motion.h1
                custom={1}
                initial="hidden"
                animate="visible"
                variants={revealLineVariants}
                className="mt-4 font-sans text-[42px] sm:text-5xl lg:text-[3.9rem] xl:text-[4.3rem] font-medium leading-[1.12] tracking-tight text-[#24302D]"
              >
                <span>Jūsu ķermenim nav jāpielāgojas terapijai.</span>
                <span className="mt-2 block font-normal text-[#D87967]">
                  Terapijai jāpielāgojas Jums.
                </span>
              </motion.h1>

              <motion.p
                custom={2}
                initial="hidden"
                animate="visible"
                variants={revealLineVariants}
                className="mt-5 max-w-lg text-[17px] sm:text-lg leading-[1.65] text-[#5A6D67]"
              >
                Individuāla fizioterapija cilvēkiem dažādos dzīves posmos — no sāpēm un atveseļošanās līdz grūtniecībai, pēcdzemdību atjaunošanai un mazuļa pirmajiem soļiem.
              </motion.p>

              <motion.div
                custom={3}
                initial="hidden"
                animate="visible"
                variants={revealLineVariants}
                className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5"
              >
                <a
                  href="#pieraksts"
                  style={{ backgroundColor: "#D87967", color: "#FFFFFF" }}
                  className="rounded-full px-8 py-4 text-center text-sm font-semibold shadow-sm transition-all hover:bg-[#C26553] hover:shadow-md hover:-translate-y-0.5 min-h-[48px] flex items-center justify-center"
                >
                  Pieteikt pirmo vizīti
                </a>
                <a
                  href="#jautajums"
                  className="text-center text-xs sm:text-sm font-medium text-[#24302D] underline decoration-[#24302D]/30 underline-offset-4 transition-colors hover:text-[#D87967] hover:decoration-[#D87967] py-2"
                >
                  Neesmu pārliecināta, ko izvēlēties →
                </a>
              </motion.div>

              <motion.p
                custom={4}
                initial="hidden"
                animate="visible"
                variants={revealLineVariants}
                className="mt-4 text-xs text-[#5A6D67]"
              >
                Nav nepieciešams ārsta nosūtījums · palīdzēsim izvēlēties piemērotāko vizīti
              </motion.p>
            </motion.div>

            {/* RIGHT on Mobile */}
            <div className="lg:hidden mt-4">
              <div
                style={{
                  borderRadius: "36px 16px 36px 16px",
                  boxShadow: "0 20px 45px -15px rgba(216, 121, 103, 0.20)",
                }}
                className="relative h-[380px] sm:h-[480px] w-full overflow-hidden bg-[#F8E9E3] border border-white"
              >
                <Image
                  src="/concept-physio/hero-treatment.jpg"
                  alt="Fizioterapijas telpa KUSTĪBA"
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover object-[center_35%]"
                />
              </div>
            </div>

            {/* FLOATING BOOKING PREVIEW CARD */}
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
              className="relative -mt-10 sm:mt-0 lg:absolute lg:right-12 lg:bottom-8 w-full sm:w-[320px] rounded-3xl bg-[#FFFFFF] p-5 border border-[#24302D]/08 shadow-2xl z-30"
            >
              <div className="flex items-center justify-between border-b border-black/[0.06] pb-3">
                <span className="text-xs font-semibold text-[#24302D]">
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
                  <p className="text-[11px] text-[#5A6D67]">Fizioterapeite · Vadošā speciāliste</p>
                </div>
              </div>

              <p className="mt-3 text-xs font-medium text-[#24302D]">
                Otrdiena, 8. septembris
              </p>

              {/* 3 Available Time Chips */}
              <div className="mt-2.5 grid grid-cols-3 gap-2">
                {["10:30", "13:00", "16:30"].map((slot) => (
                  <a
                    key={slot}
                    href="#pieraksts"
                    onClick={() => {
                      setSelectedDayIndex(1);
                      setSelectedTimeSlot(slot);
                      setSelectedSpecialist("elina");
                    }}
                    className="rounded-xl border border-black/10 bg-[#FFF9F4] py-2.5 text-center font-mono text-xs font-medium text-[#24302D] transition-colors hover:border-[#D87967] hover:bg-[#D87967] hover:text-white min-h-[44px] flex items-center justify-center"
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. HUMAN CONVERSATIONAL PATIENT RECOGNITION (CLEAN & WARM)   */}
      {/* ============================================================ */}
      <section
        id="atpazisana"
        style={{
          backgroundColor: "#FFF9F4",
          backgroundImage: `
            radial-gradient(circle at 80% 20%, rgba(244, 215, 208, 0.18), transparent 50%),
            radial-gradient(circle at 20% 80%, rgba(229, 236, 229, 0.25), transparent 50%)
          `,
        }}
        className="py-16 sm:py-24 lg:py-32 border-b border-[#24302D]/08"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
          
          {/* Header Narrative */}
          <div className="max-w-3xl">
            <h2 className="font-sans text-3xl sm:text-5xl font-medium text-[#24302D] leading-tight">
              Varbūt Jūs atpazīstat sevi šeit.
            </h2>
            <p className="mt-4 text-[17px] leading-[1.65] text-[#5A6D67]">
              Cilvēki pie mums nenāk ar pakalpojuma nosaukumu. Viņi nāk ar sajūtām, jautājumiem un vēlmi atkal justies labi savā ķermenī.
            </p>
          </div>

          {/* Editorial Two-Column Conversational Layout */}
          <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            
            {/* LEFT: Human Patient Thoughts */}
            <div className="space-y-4">
              {recognitionItems.map((item, idx) => {
                const isActive = hoveredSituation === idx;
                return (
                  <div
                    key={item.id}
                    onMouseEnter={() => setHoveredSituation(idx)}
                    onClick={() => setHoveredSituation(idx)}
                    style={{
                      backgroundColor: isActive ? "#FFFFFF" : "transparent",
                      borderColor: isActive ? "rgba(216, 121, 103, 0.4)" : "rgba(36, 48, 45, 0.08)",
                      boxShadow: isActive ? "0 14px 32px -12px rgba(36, 48, 45, 0.08)" : "none",
                    }}
                    className={`cursor-pointer rounded-2xl border p-6 transition-all duration-300 ${
                      isActive ? "pl-7 border-l-4 border-l-[#D87967]" : "hover:bg-white/50"
                    }`}
                  >
                    <h3 className="font-sans text-lg sm:text-xl font-medium text-[#24302D]">
                      {item.thought}
                    </h3>

                    {/* Warm Therapist Response */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: easeOrganic }}
                          className="mt-3 text-[15px] sm:text-base leading-relaxed text-[#5A6D67] pt-2 border-t border-black/[0.04]"
                        >
                          {item.response}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* RIGHT: Warm Photographic Atmosphere */}
            <div className="sticky top-28 hidden lg:block">
              <div
                style={{
                  borderRadius: "2.5rem",
                  boxShadow: "0 20px 45px -15px rgba(36, 48, 45, 0.12)",
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
                      alt={activeRec.imageAlt}
                      fill
                      sizes="500px"
                      className="object-cover object-center"
                    />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-white/90 backdrop-blur-xs px-4 py-2.5 text-xs text-[#24302D] shadow-xs">
                  {activeRec.imageAlt}
                </div>
              </div>
            </div>
          </div>

          {/* Section Direct Human Transition */}
          <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-[#24302D]/08 pt-6">
            <p className="text-sm text-[#5A6D67]">
              Neesat pārliecināti par savu situāciju? Mēs uzklausām un palīdzam saprast pirmo soli.
            </p>
            <a
              href="#jautajums"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#D87967] hover:underline whitespace-nowrap"
            >
              <span>Pastāstiet mums, kas notiek</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. THERAPIST STORY SECTION (NO INSET PIP, CLEAN & HUMAN)     */}
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
        className="py-16 sm:py-24 lg:py-32 border-b border-[#24302D]/08 overflow-hidden"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
            
            {/* LEFT: Clean Candid Portrait */}
            <motion.div
              style={{ y: storyImageY }}
              initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.8, ease: easeOrganic }}
              className="relative"
            >
              <div
                style={{
                  borderRadius: "40px",
                  boxShadow: "0 20px 45px -15px rgba(36, 48, 45, 0.15)",
                }}
                className="relative h-[400px] sm:h-[500px] lg:h-[560px] w-full overflow-hidden bg-[#FFF9F4] border-2 border-white"
              >
                <Image
                  src="/concept-physio/practitioner-primary.jpg"
                  alt="Elīna Vītola, fizioterapeite un KUSTĪBA dibinātāja"
                  fill
                  sizes="(max-width: 768px) 100vw, 480px"
                  className="object-cover object-top"
                />
              </div>
            </motion.div>

            {/* RIGHT: Intimate Monologue & Human Grounding */}
            <div>
              <h2 className="font-sans text-3xl sm:text-4xl lg:text-[2.9rem] font-medium leading-[1.18] tracking-tight text-[#24302D]">
                “Vispirms es gribu saprast Jūsu stāstu.”
              </h2>

              <div className="mt-6 space-y-4 text-[17px] sm:text-lg leading-[1.65] text-[#4A5D57]">
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

              <p className="mt-6 text-sm sm:text-base leading-relaxed text-[#24302D] font-medium border-t border-[#24302D]/10 pt-4">
                Elīna Vītola ir KUSTĪBA dibinātāja un sertificēta fizioterapeite ar 12 gadu klīnisko pieredzi mugurkaula biomehānikā, sieviešu veselībā un pēcdzemdību aprūpē.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-5">
                <a
                  href="#pieraksts"
                  onClick={() => { setSelectedSpecialist("elina"); changeBookingStep(3); }}
                  style={{ backgroundColor: "#24302D", color: "#FFF9F4" }}
                  className="rounded-full px-7 py-3.5 text-xs font-semibold hover:bg-[#D87967] transition-colors min-h-[44px] flex items-center justify-center"
                >
                  Pieteikt vizīti pie Elīnas →
                </a>
                <a
                  href="#nodalas"
                  className="text-xs font-medium text-[#5A6D67] hover:text-[#24302D] underline py-2"
                >
                  Iepazīt prakses virzienus
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. FOUR SPECIALISM STORYTELLING CHAPTERS (CLEAN & PURE)      */}
      {/* ============================================================ */}
      <section id="nodalas" className="relative">
        
        {/* CHAPTER 1: SĀPES & ATVESEĻOŠANĀS */}
        <div id="sapes" className="py-16 sm:py-24 lg:py-32 border-b border-[#24302D]/08 bg-[#FFF9F4]">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
            <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              
              {/* Photo with Organic Reveal */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={chapterImageVariants}
                style={{
                  borderRadius: "40px",
                  boxShadow: "0 20px 40px -15px rgba(36, 48, 45, 0.10)",
                }}
                className="relative h-[340px] sm:h-[460px] lg:h-[520px] w-full overflow-hidden bg-[#F8E9E3] border border-white"
              >
                <Image
                  src="/concept-physio/gentle-movement.jpg"
                  alt="Mugurkaula un locītavu atveseļošana KUSTĪBA praksē"
                  fill
                  sizes="(max-width: 768px) 100vw, 520px"
                  className="object-cover object-center"
                />
              </motion.div>

              {/* Narrative Content */}
              <div>
                <h2 className="font-sans text-2xl sm:text-4xl lg:text-[2.75rem] font-medium text-[#24302D] leading-[1.2]">
                  Atgriezties pie kustības, kurai atkal var uzticēties.
                </h2>

                <div className="mt-5 space-y-4 text-[17px] sm:text-lg leading-[1.65] text-[#5A6D67]">
                  <p>
                    Sāpes bieži maina to, kā mēs kustamies, strādājam, guļam un pat domājam par savu ķermeni.
                  </p>
                  <p>
                    Mēs sākam ar to, kas traucē tieši Jums, izvērtējam kustību kopumā un soli pa solim veidojam ceļu atpakaļ uz drošu kustību — bez lieka stresa un pārslodzes.
                  </p>
                </div>

                <p className="mt-6 text-sm text-[#5A6D67]">
                  Muguras un kakla sāpes · Pēctraumu atjaunošanās · Kustību ierobežojumi
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-5">
                  <a
                    href="#pieraksts"
                    onClick={() => { setSelectedService("rehab"); changeBookingStep(3); }}
                    style={{ backgroundColor: "#D87967", color: "#FFFFFF" }}
                    className="rounded-full px-7 py-3.5 text-center text-xs font-semibold hover:bg-[#C26553] min-h-[44px] flex items-center justify-center"
                  >
                    Pieteikt rehabilitācijas vizīti →
                  </a>
                  <a href="#cenas" className="text-xs font-medium text-[#5A6D67] hover:text-[#24302D] underline py-2">
                    Skatīt cenrādi
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CHAPTER 2: GRŪTNIECĪBA */}
        <div
          id="grutnieciba"
          style={{
            backgroundColor: "#F8E9E3",
            backgroundImage: "radial-gradient(circle at 80% 20%, rgba(216, 121, 103, 0.12), transparent 45%)",
          }}
          className="py-16 sm:py-24 lg:py-32 border-b border-[#24302D]/08"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
            <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              
              {/* Narrative Content */}
              <div>
                <h2 className="font-sans text-2xl sm:text-4xl lg:text-[2.75rem] font-medium text-[#24302D] leading-[1.2]">
                  Ķermenis mainās. Jums nav tas jāizdzīvo vienai.
                </h2>

                <div className="mt-5 space-y-4 text-[17px] sm:text-lg leading-[1.65] text-[#5A6D67]">
                  <p>
                    Gaidību laikā mainās smaguma centrs, locītavu saites kļūst elastīgākas, un muguras jostas daļa un iegurnis saņem nepierastu slodzi. Tas ir dabisks process, taču tas nenozīmē, ka sāpes ir jāpacieš.
                  </p>
                  <p>
                    Mēs palīdzam saudzīgi atslogot sasprindzinātās zonas, iemācām elpošanas un atslābināšanās tehnikas un sagatavojam ķermeni vieglām, harmoniskām dzemdībām.
                  </p>
                </div>

                <p className="mt-6 text-sm text-[#5A6D67]">
                  Iegurņa un muguras atslogošana · Elpošana dzemdībām · Teipošana
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-5">
                  <a
                    href="#pieraksts"
                    onClick={() => { setSelectedService("women"); setSelectedSpecialist("elina"); changeBookingStep(3); }}
                    style={{ backgroundColor: "#24302D", color: "#FFF9F4" }}
                    className="rounded-full px-7 py-3.5 text-center text-xs font-semibold hover:bg-[#D87967] min-h-[44px] flex items-center justify-center"
                  >
                    Pieteikt grūtniecības vizīti →
                  </a>
                  <span className="text-xs text-[#5A6D67]">Pieņem Elīna Vītola</span>
                </div>
              </div>

              {/* Photo with Organic Reveal */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={chapterImageVariants}
                style={{
                  borderRadius: "40px",
                  boxShadow: "0 20px 40px -15px rgba(216, 121, 103, 0.18)",
                }}
                className="relative h-[340px] sm:h-[460px] lg:h-[520px] w-full overflow-hidden bg-[#FFF9F4] border border-white"
              >
                <Image
                  src="/concept-physio/service-women.jpg"
                  alt="Grūtnieču saudzīgā fizioterapija un aprūpe"
                  fill
                  sizes="(max-width: 768px) 100vw, 520px"
                  className="object-cover object-[center_25%]"
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* CHAPTER 3: PĒC DZEMDĪBĀM */}
        <div id="pecdzemdibam" className="py-16 sm:py-24 lg:py-32 border-b border-[#24302D]/08 bg-[#FFF7EF]">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
            <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              
              {/* Photo with Organic Reveal */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={chapterImageVariants}
                style={{
                  borderRadius: "40px",
                  boxShadow: "0 20px 40px -15px rgba(36, 48, 45, 0.10)",
                }}
                className="relative h-[340px] sm:h-[460px] lg:h-[520px] w-full overflow-hidden bg-[#F8E9E3] border border-white"
              >
                <Image
                  src="/concept-physio/hands-care.jpg"
                  alt="Pēcdzemdību atjaunošanās un diastāzes pārbaude"
                  fill
                  sizes="(max-width: 768px) 100vw, 520px"
                  className="object-cover object-center"
                />
              </motion.div>

              {/* Narrative Content */}
              <div>
                <h2 className="font-sans text-2xl sm:text-4xl lg:text-[2.75rem] font-medium text-[#24302D] leading-[1.2]">
                  Atgriešanās pie sevis nav sacensība.
                </h2>

                <div className="mt-5 space-y-4 text-[17px] sm:text-lg leading-[1.65] text-[#5A6D67]">
                  <p>
                    Pēcdzemdību periods prasa pacietību un patiesu saudzību. Ķermenim ir nepieciešams laiks, lai audi atjaunotos, vēdera dziļie muskuļi atkal atrastu savienojumu un iegurņa pamatne kļūtu stabila.
                  </p>
                  <p>
                    Mēs pārbaudām taisnā vēdera muskuļa diastāzi, izvērtējam rētu sadzīšanu pēc ķeizargrieziena un veidojam pakāpenisku, drošu plānu atgriešanās brīdim pie ikdienas aktivitātēm un sporta.
                  </p>
                </div>

                <p className="mt-6 text-sm text-[#5A6D67]">
                  Diastāzes diagnostika · Iegurņa pamatne · Ķeizargrieziena rētas aprūpe
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-5">
                  <a
                    href="#pieraksts"
                    onClick={() => { setSelectedService("women"); setSelectedSpecialist("elina"); changeBookingStep(3); }}
                    style={{ backgroundColor: "#D87967", color: "#FFFFFF" }}
                    className="rounded-full px-7 py-3.5 text-center text-xs font-semibold hover:bg-[#C26553] min-h-[44px] flex items-center justify-center"
                  >
                    Pieteikt pēcdzemdību pārbaudi →
                  </a>
                  <span className="text-xs text-[#5A6D67]">Ieteicams no 6. nedēļas pēc dzemdībām</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CHAPTER 4: MAZUĻI & BĒRNI */}
        <div
          id="berniem"
          style={{
            backgroundColor: "#E5ECE5",
            backgroundImage: "radial-gradient(circle at 20% 80%, rgba(159, 184, 166, 0.20), transparent 45%)",
          }}
          className="py-16 sm:py-24 lg:py-32 border-b border-[#24302D]/08"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
            <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              
              {/* Narrative Content */}
              <div>
                <h2 className="font-sans text-2xl sm:text-4xl lg:text-[2.75rem] font-medium text-[#24302D] leading-[1.2]">
                  Mazs ķermenis. Milzīgs attīstības ceļš.
                </h2>

                <div className="mt-5 space-y-4 text-[17px] sm:text-lg leading-[1.65] text-[#5A6D67]">
                  <p>
                    Pirmajā dzīves gadā mazulis apgūst svarīgākās dzīves kustības — velšanos, rāpošanu, sēdēšanu un pirmos soļus. Vecāku pareizs hendlings (ikdienas celšana, turēšana un ģērbšana) ir labākais atbalsts simetriskai attīstībai.
                  </p>
                  <p>
                    Nodarbībā Anna Ozola mierīgā un rotaļīgā veidā novērtē mazuļa motoriku, muskuļu tonusu un iemāca vecākiem praktiskus paņēmienus, kā ikdienā palīdzēt mazulim justies brīvi un droši.
                  </p>
                </div>

                <p className="mt-6 text-sm text-[#5A6D67]">
                  Zīdaiņu hendlings · Muskuļu tonuss · Motorā attīstība · Bērnu stāja
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-5">
                  <a
                    href="#pieraksts"
                    onClick={() => { setSelectedService("infant"); setSelectedSpecialist("anna"); changeBookingStep(3); }}
                    style={{ backgroundColor: "#24302D", color: "#FFF9F4" }}
                    className="rounded-full px-7 py-3.5 text-center text-xs font-semibold hover:bg-[#D87967] min-h-[44px] flex items-center justify-center"
                  >
                    Pieteikt hendlinga nodarbību →
                  </a>
                  <span className="text-xs text-[#5A6D67]">Pieņem Anna Ozola (40 € / 45 min)</span>
                </div>
              </div>

              {/* Photo with Organic Reveal */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={chapterImageVariants}
                style={{
                  borderRadius: "40px",
                  boxShadow: "0 20px 40px -15px rgba(36, 48, 45, 0.12)",
                }}
                className="relative h-[340px] sm:h-[460px] lg:h-[520px] w-full overflow-hidden bg-[#FFF9F4] border border-white"
              >
                <Image
                  src="/concept-physio/service-children.jpg"
                  alt="Zīdaiņu attīstība un mīlošs hendlings"
                  fill
                  sizes="(max-width: 768px) 100vw, 520px"
                  className="object-cover object-center"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. FIRST-VISIT STORY SECTION (CLEAN & DEMYSTIFIED)           */}
      {/* ============================================================ */}
      <section
        id="vizite"
        style={{
          background: "linear-gradient(180deg, #FFF9F4 0%, #EBF2EB 50%, #FFF9F4 100%)",
        }}
        className="relative py-20 sm:py-28 lg:py-36 border-b border-[#24302D]/08 overflow-hidden"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
          
          {/* Header Narrative */}
          <div className="max-w-3xl">
            <h2 className="font-sans text-3xl sm:text-5xl font-medium text-[#24302D] leading-[1.15]">
              Pirmā vizīte bez nezināmā.
            </h2>
            <p className="mt-3 text-[17px] text-[#5A6D67]">
              Jums nav jāzina, kāds pakalpojums Jums vajadzīgs. Tas ir mūsu darbs.
            </p>
          </div>

          {/* Horizontal Visual Journey */}
          <div className="relative mt-12 sm:mt-16">
            
            {/* Desktop Animated SVG Movement Path */}
            <div className="absolute top-1/2 left-0 right-0 -translate-y-6 hidden lg:block pointer-events-none">
              <svg className="w-full h-16" viewBox="0 0 1100 60" fill="none" preserveAspectRatio="none">
                <motion.path
                  d="M 20,30 Q 280,5 550,30 T 1080,30"
                  stroke="#D87967"
                  strokeWidth="1.5"
                  strokeDasharray="4 6"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.35 }}
                  viewport={{ once: true }}
                  transition={{ duration: shouldReduceMotion ? 0.01 : 1.5, ease: easeOrganic }}
                />
              </svg>
            </div>

            {/* 4 Steps Flow */}
            <div className="grid gap-6 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4 relative z-10">
              {firstVisitSteps.map((step, idx) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: shouldReduceMotion ? 0.01 : 0.6, delay: shouldReduceMotion ? 0 : idx * 0.12, ease: easeOrganic }}
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "1.75rem",
                    boxShadow: "0 12px 30px -10px rgba(36, 48, 45, 0.06)",
                  }}
                  className="flex flex-col justify-between border border-black/[0.06] p-6 sm:p-7 relative group hover:border-[#D87967]/40 transition-colors"
                >
                  <div>
                    <h3 className="font-sans text-lg sm:text-xl font-medium text-[#24302D]">
                      {step.title}
                    </h3>

                    <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#5A6D67]">
                      {step.copy}
                    </p>
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
            className="mt-10 p-6 sm:p-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6 border border-black/[0.06]"
          >
            <div className="space-y-1.5 text-xs sm:text-sm text-[#5A6D67]">
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
              className="rounded-full px-8 py-3.5 text-center text-xs font-semibold whitespace-nowrap hover:bg-[#C26553] shadow-xs min-h-[44px] flex items-center justify-center"
            >
              Pieteikt 60 min vizīti →
            </a>
          </div>
        </div>
      </section>

      {/* 6. REASSURANCE: Specialist Team */}
      <section id="specialistes" className="py-16 sm:py-24 lg:py-28 border-b border-[#24302D]/08">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
          <div className="max-w-3xl">
            <h2 className="font-sans text-3xl sm:text-5xl font-medium text-[#24302D] leading-tight">
              Sertificētas ārstniecības personas, kurām var uzticēties
            </h2>
            <p className="mt-3 text-[17px] text-[#5A6D67]">
              Katrai mūsu speciālistei ir sava padziļinātā specializācija un patiesa mīlestība pret savu darbu.
            </p>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {specialists.map((person) => (
              <div
                key={person.id}
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "rgba(36, 48, 45, 0.08)",
                  boxShadow: "0 10px 25px -8px rgba(36, 48, 45, 0.05)",
                  borderRadius: "1.75rem",
                }}
                className="flex flex-col justify-between border p-6 sm:p-7 transition-shadow hover:shadow-md"
              >
                <div>
                  <div
                    style={{
                      borderRadius: "1.25rem",
                      overflow: "hidden",
                      backgroundColor: "#F8E9E3",
                    }}
                    className="relative h-[280px] sm:h-[340px] w-full border border-black/[0.04]"
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
                  className="mt-6 block text-center rounded-full border py-3 text-xs font-semibold transition-colors hover:bg-[#24302D] hover:text-[#FFF9F4] min-h-[44px] flex items-center justify-center"
                >
                  Izvēlēties laiku pie {person.name.split(" ")[0]}s →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. TRANSPARENCY: Pricing & Insurance Reimbursement */}
      <section id="cenas" className="py-16 sm:py-24 lg:py-28 border-b border-[#24302D]/08">
        <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-12">
          <div className="text-center">
            <h2 className="font-sans text-3xl sm:text-4xl font-medium text-[#24302D]">
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
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 sm:p-7 gap-2">
                <div>
                  <p className="font-semibold text-[#24302D]">Pirmreizēja fizioterapeita konsultācija & diagnostika</p>
                  <p className="text-xs text-[#5A6D67] mt-0.5">Pilna kustību pārbaude, manuālie testi, pirmā terapija un mājas plāns (60 min)</p>
                </div>
                <span className="font-sans text-xl font-medium text-[#24302D]">50 €</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 sm:p-7 gap-2">
                <div>
                  <p className="font-semibold text-[#24302D]">Atkārtota individuālā fizioterapijas nodarbība</p>
                  <p className="text-xs text-[#5A6D67] mt-0.5">Manuāla terapija un koriģējošie vingrojumi ar speciālisti (60 min)</p>
                </div>
                <span className="font-sans text-xl font-medium text-[#24302D]">45 €</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 sm:p-7 gap-2">
                <div>
                  <p className="font-semibold text-[#24302D]">Sieviešu veselības un pēcdzemdību vizīte</p>
                  <p className="text-xs text-[#5A6D67] mt-0.5">Diastāzes pārbaude, iegurņa pamatnes muskuļu atjaunošana (60 min)</p>
                </div>
                <span className="font-sans text-xl font-medium text-[#24302D]">50 €</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 sm:p-7 gap-2">
                <div>
                  <p className="font-semibold text-[#24302D]">Zīdaiņu motorā attīstība & hendlinga apmācība</p>
                  <p className="text-xs text-[#5A6D67] mt-0.5">Praktiska vecāku apmācība un mazuļa kustību harmonizācija (45 min)</p>
                </div>
                <span className="font-sans text-xl font-medium text-[#24302D]">40 €</span>
              </div>

              <div
                style={{ backgroundColor: "#F8E9E3" }}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-5 sm:p-7 gap-2"
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
            <p className="text-xs font-semibold text-[#24302D]">
              Apdrošināšanas atlīdzības saņemšana:
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {Object.keys(insuranceCompanies).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedInsurance(key)}
                  className={`rounded-full px-4 py-2 text-xs font-medium transition-all min-h-[44px] flex items-center ${
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
      {/* 8. HUMAN TRUST / STORY SECTION */}
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
        className="py-16 sm:py-24 lg:py-32 border-b border-[#24302D]/08"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-12">
          
          {/* Header Narrative */}
          <div className="max-w-3xl">
            <h2 className="font-sans text-3xl sm:text-5xl font-medium text-[#24302D] leading-[1.18]">
              <span>Dažreiz visvairāk palīdz dzirdēt:</span>
              <span className="block font-normal italic font-serif text-[#D87967] mt-1">
                “Es arī tā jutos.”
              </span>
            </h2>
          </div>

          {/* Large Active Story Showcase */}
          <div className="mt-10 sm:mt-14">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStory.id}
                initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: shouldReduceMotion ? 0 : -20 }}
                transition={{ duration: shouldReduceMotion ? 0.01 : 0.5, ease: easeOrganic }}
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "2rem 1.25rem 2rem 1.25rem",
                  boxShadow: "0 20px 45px -15px rgba(36, 48, 45, 0.08)",
                }}
                className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center p-6 sm:p-14 border border-black/[0.06]"
              >
                <div>
                  <blockquote className="font-serif italic text-xl sm:text-3xl lg:text-4xl leading-[1.3] text-[#24302D]">
                    {activeStory.quote}
                  </blockquote>

                  <p className="mt-5 text-xs sm:text-sm text-[#5A6D67] border-t border-black/[0.06] pt-4">
                    {activeStory.situation}
                  </p>
                </div>

                <div
                  style={{
                    borderRadius: "1.5rem",
                    overflow: "hidden",
                    backgroundColor: "#F8E9E3",
                  }}
                  className="relative h-[240px] sm:h-[380px] w-full border border-black/[0.04]"
                >
                  <Image
                    src={activeStory.image}
                    alt={activeStory.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 450px"
                    className="object-cover object-center"
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Tactile Story Switcher Controls */}
            <div className="mt-6 sm:mt-8 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {demoStories.map((story, i) => (
                  <button
                    key={story.id}
                    type="button"
                    onClick={() => setActiveStoryIdx(i)}
                    className={`h-3 rounded-full transition-all min-w-[12px] ${
                      activeStoryIdx === i ? "w-8 bg-[#D87967]" : "w-3 bg-black/20 hover:bg-black/40"
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
                  className="flex h-12 w-12 items-center justify-center rounded-full border text-lg text-[#24302D] transition-colors hover:bg-[#24302D] hover:text-white active:scale-95"
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
                  className="flex h-12 w-12 items-center justify-center rounded-full border text-lg text-[#24302D] transition-colors hover:bg-[#24302D] hover:text-white active:scale-95"
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
      {/* 9. PREMIUM BOOKING SECTION */}
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
        className="py-20 sm:py-28 lg:py-36 text-[#FFF9F4] relative overflow-hidden"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            
            {/* LEFT: Reassuring Human Guidance & Direct Channels */}
            <div>
              <h2 className="font-sans text-3xl sm:text-5xl font-medium text-[#FFF9F4] leading-[1.15]">
                Sāksim ar pirmo soli.
              </h2>

              <div className="mt-5 space-y-3 sm:space-y-4 text-[17px] sm:text-lg leading-[1.65] text-[#FFF9F4]/80">
                <p>
                  Ja zināt, ko vēlaties rezervēt — izvēlieties vizītes laiku blakus esošajā kalendārā.
                </p>
                <p>
                  Ja neesat pārliecināta, ar ko sākt — īsi pastāstiet par savu situāciju, un mēs palīdzēsim izvēlēties piemērotāko speciālisti un pirmo soli.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="#booking-card"
                  style={{ backgroundColor: "#D87967", color: "#FFFFFF" }}
                  className="rounded-full px-8 py-4 text-center text-xs font-semibold shadow-md transition-all hover:bg-[#C26553] hover:-translate-y-0.5 min-h-[48px] flex items-center justify-center"
                >
                  Izvēlēties vizītes laiku
                </a>
                <a
                  href="#jautajums"
                  className="text-center text-xs sm:text-sm font-medium text-[#FFF9F4] underline decoration-white/30 underline-offset-4 hover:text-[#9FB8A6] py-2"
                >
                  Man vajag palīdzību izvēlēties →
                </a>
              </div>

              {/* Direct Quick Contact Options */}
              <div className="mt-10 border-t border-white/10 pt-6 space-y-3 text-xs text-[#FFF9F4]/70">
                <p className="font-semibold text-[#9FB8A6]">
                  Tiešā saziņa ar speciālisti:
                </p>
                <div className="flex flex-wrap gap-3 pt-1">
                  <a
                    href="https://wa.me/37120000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2.5 text-white hover:bg-white/20 transition-colors min-h-[44px]"
                  >
                    <span>💬 WhatsApp</span>
                  </a>
                  <a
                    href="tel:+37167000000"
                    className="flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2.5 text-white hover:bg-white/20 transition-colors min-h-[44px]"
                  >
                    <span>📞 Zvanīt</span>
                  </a>
                  <a
                    href="mailto:sveiki@kustiba-demo.lv"
                    className="flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2.5 text-white hover:bg-white/20 transition-colors min-h-[44px]"
                  >
                    <span>✉️ E-pasts</span>
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT: LARGE INTERACTIVE BOOKING CARD */}
            <motion.div
              id="booking-card"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30, scale: shouldReduceMotion ? 1 : 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.8, ease: easeOrganic }}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "2rem 1.25rem 2rem 1.25rem",
                boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.35)",
              }}
              className="p-6 sm:p-10 text-[#24302D] border border-white/80"
            >
              {/* Header & Step Navigation */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/[0.06] pb-4">
                <div>
                  <h3 className="font-sans text-xl sm:text-2xl font-medium text-[#24302D]">Pieteikt vizīti</h3>
                  <span className="text-xs text-[#5A6D67]">KUSTĪBA telpā · Miera iela 24</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold">
                  {[
                    { num: 1, label: "Pakalpojums" },
                    { num: 2, label: "Speciālists" },
                    { num: 3, label: "Laiks" },
                  ].map((s) => (
                    <button
                      key={s.num}
                      type="button"
                      onClick={() => changeBookingStep(s.num as 1 | 2 | 3)}
                      className={`flex items-center rounded-full px-3.5 py-2 transition-colors min-h-[40px] ${
                        bookingStep === s.num
                          ? "bg-[#24302D] text-white"
                          : "text-[#5A6D67] hover:bg-black/[0.04]"
                      }`}
                    >
                      <span>{s.label}</span>
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
                    className="mt-6 rounded-full px-7 py-3 text-xs font-semibold hover:bg-[#D87967] min-h-[44px]"
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
                      className="mt-1 w-full rounded-xl border border-black/15 bg-[#FFF9F4] px-4 py-3 text-base text-[#24302D] focus:border-[#D87967] focus:outline-hidden min-h-[48px]"
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
                      className="mt-1 w-full rounded-xl border border-black/15 bg-[#FFF9F4] px-4 py-3 text-base text-[#24302D] focus:border-[#D87967] focus:outline-hidden min-h-[48px]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#24302D]">Piezīmes ārstei (pēc izvēles)</label>
                    <input
                      type="text"
                      value={patientNote}
                      onChange={(e) => setPatientNote(e.target.value)}
                      placeholder="Kas šobrīd sagādā vislielāko diskomfortu?"
                      className="mt-1 w-full rounded-xl border border-black/15 bg-[#FFF9F4] px-4 py-3 text-base text-[#24302D] focus:border-[#D87967] focus:outline-hidden min-h-[48px]"
                    />
                  </div>

                  <div className="flex items-center justify-between border-t border-black/[0.06] pt-4">
                    <button
                      type="button"
                      onClick={() => setShowIntakeForm(false)}
                      className="text-xs text-[#5A6D67] hover:underline py-2"
                    >
                      ← Mainīt laiku
                    </button>
                    <button
                      type="submit"
                      style={{ backgroundColor: "#D87967", color: "#FFFFFF" }}
                      className="rounded-full px-8 py-3.5 text-xs font-semibold shadow-xs hover:bg-[#C26553] min-h-[48px] flex items-center justify-center"
                    >
                      Apstiprināt pieteikumu →
                    </button>
                  </div>
                </form>
              ) : (
                /* Step by Step Booking Engine */
                <div className="mt-6 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={bookingStep}
                      initial={{ opacity: 0, x: shouldReduceMotion ? 0 : stepDirection * 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: shouldReduceMotion ? 0 : -stepDirection * 15 }}
                      transition={{ duration: shouldReduceMotion ? 0.01 : 0.35, ease: easeOrganic }}
                      className="space-y-5"
                    >
                      {/* Step 1: Service Selector */}
                      {bookingStep === 1 && (
                        <div className="space-y-3">
                          <p className="text-xs font-semibold text-[#24302D]">
                            Izvēlieties vizītes veidu:
                          </p>
                          <div className="grid gap-2.5">
                            {servicesList.map((srv) => (
                              <button
                                key={srv.id}
                                type="button"
                                onClick={() => { setSelectedService(srv.id); changeBookingStep(2); }}
                                className={`flex items-center justify-between rounded-2xl border p-4 text-left transition-all min-h-[56px] ${
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
                          <p className="text-xs font-semibold text-[#24302D]">
                            Izvēlieties speciālisti:
                          </p>
                          <div className="grid gap-2.5">
                            {specialists.map((spec) => (
                              <button
                                key={spec.id}
                                type="button"
                                onClick={() => { setSelectedSpecialist(spec.id); changeBookingStep(3); }}
                                className={`flex items-center gap-3.5 rounded-2xl border p-4 text-left transition-all min-h-[56px] ${
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
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Step 3: Date & Live Time Slots */}
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
                              className="text-[11px] font-medium text-[#D87967] hover:underline p-1"
                            >
                              Mainīt →
                            </button>
                          </div>

                          {/* Week Selector Header */}
                          <div className="mt-4 flex items-center justify-between">
                            <span className="text-xs font-semibold text-[#24302D]">
                              7.–11. septembris
                            </span>
                            <span className="text-xs text-[#5A6D67]">
                              {currentDayObj.fullDay}
                            </span>
                          </div>

                          {/* Days Strip */}
                          <div className="mt-2.5 grid grid-cols-5 gap-1.5 sm:gap-2">
                            {bookingDays.map((d, i) => (
                              <button
                                key={d.date}
                                type="button"
                                onClick={() => { setSelectedDayIndex(i); setSelectedTimeSlot(d.slots[0]); }}
                                className={`rounded-2xl border p-2.5 sm:p-3 text-center transition-all min-h-[54px] flex flex-col justify-center items-center ${
                                  selectedDayIndex === i
                                    ? "border-[#24302D] bg-[#24302D] text-white shadow-xs"
                                    : "border-black/[0.08] bg-[#FFF9F4] text-[#24302D] hover:bg-white"
                                }`}
                              >
                                <p className="text-[10px] sm:text-[11px] opacity-75">{d.dayName}</p>
                                <p className="font-sans font-medium text-xs sm:text-base mt-0.5">
                                  {d.fullDay.split(" ")[1]}
                                </p>
                              </button>
                            ))}
                          </div>

                          {/* Available Time Slots Chips */}
                          <div className="mt-4">
                            <p className="text-xs font-medium text-[#5A6D67] mb-2">
                              Pieejamie laiki:
                            </p>
                            <div className="grid grid-cols-3 gap-2">
                              {currentDayObj.slots.map((slot) => (
                                <button
                                  key={slot}
                                  type="button"
                                  onClick={() => setSelectedTimeSlot(slot)}
                                  className={`rounded-xl border py-3 text-center font-mono text-xs sm:text-sm font-medium transition-all min-h-[48px] flex items-center justify-center ${
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
                          <div className="mt-5 border-t border-black/[0.06] pt-4">
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
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
                                className="rounded-full px-8 py-3.5 text-center text-xs font-semibold shadow-xs hover:bg-[#C26553] whitespace-nowrap min-h-[48px] flex items-center justify-center"
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
                  <div className="border-t border-black/[0.06] mt-5 pt-3 flex items-center justify-between text-[11px] text-[#5A6D67]">
                    <span>Nezināt, ko izvēlēties? Uzrakstiet mums.</span>
                    <a href="#jautajums" className="text-[#D87967] font-medium hover:underline p-1">
                      Uzdot jautājumu →
                    </a>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 10. DIRECT HUMAN QUESTION */}
      <section
        id="jautajums"
        style={{
          backgroundColor: "#F4D7D0",
          borderColor: "rgba(36, 48, 45, 0.08)",
        }}
        className="py-16 sm:py-24 lg:py-28 border-b"
      >
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <h2 className="font-sans text-3xl sm:text-4xl font-medium text-[#24302D]">
                Neesat pārliecināti, ar ko sākt?
              </h2>
              <p className="mt-3 text-[17px] leading-[1.65] text-[#5A6D67]">
                Uzdodiet savu jautājumu šeit vai uzrakstiet mums WhatsApp. Mūsu fizioterapeite iepazīsies ar Jūsu situāciju un ieteiks piemērotāko speciālisti un pirmo soli.
              </p>

              <div className="mt-6 space-y-2.5 border-t border-black/[0.06] pt-5 text-xs text-[#5A6D67]">
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
              className="p-6 sm:p-8 border border-black/[0.06]"
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
                    className="mt-5 rounded-full px-6 py-2.5 text-xs font-semibold min-h-[44px]"
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
                      className="mt-1 w-full rounded-xl border border-black/15 bg-[#FFF9F4] px-4 py-3 text-base text-[#24302D] focus:border-[#D87967] focus:outline-hidden min-h-[48px]"
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
                      className="mt-1 w-full rounded-xl border border-black/15 bg-[#FFF9F4] px-4 py-3 text-base text-[#24302D] focus:border-[#D87967] focus:outline-hidden min-h-[48px]"
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
                      className="mt-1 w-full rounded-xl border border-black/15 bg-[#FFF9F4] px-4 py-3 text-base text-[#24302D] focus:border-[#D87967] focus:outline-hidden"
                    />
                  </div>

                  <button
                    type="submit"
                    style={{ backgroundColor: "#D87967", color: "#FFFFFF" }}
                    className="w-full rounded-full py-4 text-xs font-semibold shadow-xs hover:bg-[#C26553] min-h-[48px] flex items-center justify-center"
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
      <section className="py-16 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-12">
          <div className="text-center">
            <h2 className="font-sans text-3xl sm:text-4xl font-medium text-[#24302D]">
              Viss, kas jāzina pirms apmeklējuma
            </h2>
          </div>

          <div className="mt-8 space-y-3">
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
                  className="flex w-full items-center justify-between p-5 text-left font-sans text-base font-medium text-[#24302D] min-h-[56px]"
                >
                  <span>{faq.q}</span>
                  <span className="text-[#D87967] text-xl font-mono ml-4">{openFaq === idx ? "−" : "+"}</span>
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
        className="border-t py-14 text-[#5A6D67]"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <span className="font-sans text-2xl font-medium text-[#24302D]">Kustība</span>
              <p className="mt-1 text-xs text-[#5A6D67]">Fizioterapijas, sieviešu veselības un bērnu attīstības telpa</p>
              <p className="mt-4 text-xs leading-relaxed text-[#5A6D67]">
                Miera iela 24, Rīga, LV-1001.<br />
                Ieeja no Miera ielas pagalma, 2. stāvs, pieejams ērts lifts bērnu ratiņiem un bezmaksas stāvvieta klientiem.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-[#24302D]">Darba laiks</p>
              <ul className="mt-3 space-y-1.5 text-xs font-mono text-[#5A6D67]">
                <li>Pirmdiena – Piektdiena: 08:00 – 20:00</li>
                <li>Sestdiena: 09:00 – 15:00 (pēc pieraksta)</li>
                <li>Svētdiena: Slēgts</li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold text-[#24302D]">Saziņa</p>
              <p className="mt-3 text-xs">
                Tālrunis: <a href="tel:+37167000000" className="text-[#24302D] font-semibold underline py-1 inline-block">+371 67 000 000</a>
              </p>
              <p className="mt-1 text-xs">
                E-pasts: <a href="mailto:sveiki@kustiba-demo.lv" className="text-[#24302D] font-semibold underline py-1 inline-block">sveiki@kustiba-demo.lv</a>
              </p>
              <p className="mt-1 text-xs">
                WhatsApp: <a href="https://wa.me/37120000000" target="_blank" rel="noopener noreferrer" className="text-[#D87967] font-semibold underline py-1 inline-block">+371 20 000 000</a>
              </p>
            </div>
          </div>

          <div className="mt-10 border-t border-black/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5A6D67]/70">
            <p>© {new Date().getFullYear()} KUSTĪBA. Fizioterapijas telpa Rīgā.</p>
            <div className="flex items-center gap-4">
              <Link href="/case-studies/physiotherapy" className="text-[#24302D] hover:underline font-semibold py-1">
                Lasīt Saiteo stratēģijas analīzi →
              </Link>
              <Link href="/" className="hover:underline py-1">
                Saiteo.com
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* ============================================================ */}
      {/* MOBILE PERSISTENT BOTTOM BOOKING BAR                         */}
      {/* ============================================================ */}
      <AnimatePresence>
        {showMobileBottomBar && (
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : 50 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.3, ease: easeOrganic }}
            className="sm:hidden fixed bottom-0 left-0 right-0 z-50 p-3.5 bg-[#FFF9F4]/95 backdrop-blur-md border-t border-black/10 shadow-2xl"
          >
            <a
              href="#pieraksts"
              style={{ backgroundColor: "#D87967", color: "#FFFFFF" }}
              className="flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold shadow-md active:scale-98 min-h-[48px]"
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
