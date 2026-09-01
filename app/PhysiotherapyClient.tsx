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

export type Locale = "lv" | "en" | "ru";

const easeOrganic = [0.22, 1, 0.36, 1] as const;

export function PhysiotherapyClient({ locale }: { locale: Locale }) {
  const isEn = locale === "en";
  const shouldReduceMotion = useReducedMotion();

  // Scroll Tracking
  const { scrollY } = useScroll();
  const heroPhotoY = useTransform(scrollY, [0, 800], shouldReduceMotion ? [0, 0] : [0, 32]);
  const heroDetailY = useTransform(scrollY, [0, 800], shouldReduceMotion ? [0, 0] : [0, 52]);
  const heroBookingY = useTransform(scrollY, [0, 800], shouldReduceMotion ? [0, 0] : [0, 18]);
  const heroTextOpacity = useTransform(scrollY, [0, 500], [1, 0.4]);
  const storyImageY = useTransform(scrollY, [700, 1600], shouldReduceMotion ? [0, 0] : [-15, 25]);

  // Header scroll state & mobile bottom bar visibility
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [showMobileBottomBar, setShowMobileBottomBar] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Recognition / Situations State
  const [hoveredSituation, setHoveredSituation] = useState<number>(0);

  // Testimonial Stories State (User Controlled)
  const [activeStoryIdx, setActiveStoryIdx] = useState<number>(0);

  // Toast Notification for Demo Channels
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Booking State
  const [bookingStep, setBookingStep] = useState<1 | 2 | 3>(3);
  const [prevStep, setPrevStep] = useState<number>(3);
  const [selectedService, setSelectedService] = useState<string>("first");
  const [selectedSpecialist, setSelectedSpecialist] = useState<string>("elina");
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(1); // Otrdiena / Tuesday
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

  const showDemoToast = () => {
    const msg = isEn
      ? "This is an interactive design concept. No message has been sent."
      : "Šis ir interaktīvs dizaina koncepts. Ziņojums netika nosūtīts.";
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
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

  // Text content dictionary (Bilingual: LV & EN)
  const recognitionItems = isEn
    ? [
        {
          num: "01",
          thought: "My back or neck hurts, and it's starting to disrupt daily life.",
          response: "Pain is often a signal that load isn't distributed evenly across the body. We don't rush into intense exercise; first, we calmly evaluate your posture, breathing, and daily movement patterns.",
          image: "/concept-physio/warm-guidance.jpg",
          imageAlt: "Unhurried, attentive functional movement evaluation",
        },
        {
          num: "02",
          thought: "After an injury, my body no longer feels as dependable as before.",
          response: "Fear of aggravating pain is completely natural. Step by step, we help you rebuild movement freedom, muscular stability, and confidence in every step.",
          image: "/concept-physio/service-movement.jpg",
          imageAlt: "Safe and progressive physical rehabilitation",
        },
        {
          num: "03",
          thought: "I'm expecting and want to stay active without lower back strain.",
          response: "During pregnancy, your center of gravity shifts and ligaments soften. We gently relieve lumbar load and prepare your body for a smooth, confident birth.",
          image: "/concept-physio/service-women.jpg",
          imageAlt: "Gentle prenatal physiotherapy and pelvic relief",
        },
        {
          num: "04",
          thought: "Postpartum, my body doesn't feel like my own yet.",
          response: "We check for abdominal diastasis, safely rebuild pelvic core support, and give your tissues time to restore without pressure or rush.",
          image: "/concept-physio/hands-care.jpg",
          imageAlt: "Postnatal recovery and individual care",
        },
        {
          num: "05",
          thought: "I'm unsure if my baby's movement development is progressing naturally.",
          response: "In a calm, playful session, we observe motor milestones and teach parents gentle, practical handling techniques for home care.",
          image: "/concept-physio/service-children.jpg",
          imageAlt: "Infant motor development and gentle handling guidance",
        },
      ]
    : [
        {
          num: "01",
          thought: "Man sāp mugura vai kakls, un tas sāk traucēt ikdienai.",
          response: "Sāpes bieži ir signāls, ka slodze ķermenī sadalās nevienmērīgi. Mēs nesākam ar straujiem vingrojumiem, bet vispirms mierīgi izvērtējam, kā Jūs sēžat, elpojat un kustaties ikdienā.",
          image: "/concept-physio/warm-guidance.jpg",
          imageAlt: "Nesteidzīga un saudzīga kustību izvērtēšana",
        },
        {
          num: "02",
          thought: "Pēc traumas ķermenis vairs nejūtas tik drošs kā agrāk.",
          response: "Bailes no atkārtotām sāpēm ir pilnīgi dabiskas. Mēs soli pa solim palīdzam atgūt kustību brīvību, muskuļu spēku un pārliecību par katru soli.",
          image: "/concept-physio/service-movement.jpg",
          imageAlt: "Droša un pakāpeniska kustību atjaunošana",
        },
        {
          num: "03",
          thought: "Gaidu bērniņu un gribu kustēties bez muguras sāpēm.",
          response: "Gaidību laikā mainās smaguma centrs un locītavu saites. Mēs palīdzam saudzīgi atslogot jostas daļu un sagatavoties vieglākām, harmoniskām dzemdībām.",
          image: "/concept-physio/service-women.jpg",
          imageAlt: "Gaidību laika aprūpe un muguras atslogošana",
        },
        {
          num: "04",
          thought: "Pēc dzemdībām nejūtos savā ķermenī kā iepriekš.",
          response: "Pārbaudām vēdera muskuļu diastāzi, saudzīgi atjaunojam iegurņa stabilitāti un dodam ķermenim laiku atveseļoties bez liekas steigas un pārslodzes.",
          image: "/concept-physio/hands-care.jpg",
          imageAlt: "Pēcdzemdību atjaunošanās un individuāla aprūpe",
        },
        {
          num: "05",
          thought: "Nezinu, vai mana mazuļa kustību attīstība norit pareizi.",
          response: "Mierīgā, rotaļīgā nodarbībā novērtējam mazuļa motoriku un iemācām vecākiem pareizu, maigu hendlingu ikdienas aprūpei mājās.",
          image: "/concept-physio/service-children.jpg",
          imageAlt: "Mazuļa dabiskā motorā attīstība un zīdaiņu hendlings",
        },
      ];

  const firstVisitSteps = isEn
    ? [
        {
          num: "01",
          title: "Let's talk.",
          copy: "Tell us what brought you in and what you hope to regain. We listen to your story first without rushing into exercises.",
        },
        {
          num: "02",
          title: "Let's observe movement.",
          copy: "An unhurried functional check: how you breathe, stand, sit, and how load distributes across your whole body.",
        },
        {
          num: "03",
          title: "We explain everything.",
          copy: "You'll understand what we see and how it connects to your symptoms, accompanied by gentle manual relief.",
        },
        {
          num: "04",
          title: "We agree on next steps.",
          copy: "A plan that realistically fits into your life. 2–3 simple home habits without overwhelm.",
        },
      ]
    : [
        {
          num: "01",
          title: "Parunāsim.",
          copy: "Pastāstiet, kas Jūs atveda un ko gribētu mainīt. Mēs vispirms mierīgi uzklausām Jūsu situāciju, nevis steidzamies pie vingrojumiem.",
        },
        {
          num: "02",
          title: "Paskatīsimies, kā ķermenis kustas.",
          copy: "Nesteidzīga kustību pārbaude: kā Jūs elpojat, stāvat, apsēžaties un kā slodze sadalās visā ķermenī.",
        },
        {
          num: "03",
          title: "Izskaidrosim.",
          copy: "Jums būs skaidrs, ko redzam un kā tas saistīts ar Jūsu pašsajūtu. Saudzīga manuāla atbrīvošana un pirmās terapeitiskās kustības.",
        },
        {
          num: "04",
          title: "Vienosimies par nākamo soli.",
          copy: "Plāns, kas ir reāli izpildāms Jūsu ikdienā. 2–3 vienkārši paradumi vai vingrojumi mājas videi bez pārslodzes.",
        },
      ];

  const demoStories = isEn
    ? [
        {
          id: 0,
          quote: "“For the first time, I didn't feel like I was just following an exercise list. I understood what was happening in my body and why we did each specific movement.”",
          situation: "Back pain relief following sedentary office work",
          image: "/concept-physio/service-movement.jpg",
          imageAlt: "Natural movement guidance in open studio light",
        },
        {
          id: 1,
          quote: "“After childbirth, it was hard to know what was normal and whether I could exercise again. The conversation alone brought enormous peace and a clear path forward.”",
          situation: "Diastasis assessment and pelvic core stabilization",
          image: "/concept-physio/service-women.jpg",
          imageAlt: "Gentle physical therapy and women's health care",
        },
        {
          id: 2,
          quote: "“We arrived anxious about our baby's motor progress, but the session was so calm and loving that all tension vanished. We gained everyday confidence.”",
          situation: "Infant muscle tone balance & handling guidance for parents",
          image: "/concept-physio/service-children.jpg",
          imageAlt: "Supportive pediatric handling and development",
        },
      ]
    : [
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

  const servicesList = isEn
    ? [
        { id: "first", title: "Initial physiotherapist consultation & diagnosis", duration: "60 min", price: "50 €", desc: "Comprehensive functional evaluation, posture & breathing assessment, and first individual treatment plan." },
        { id: "rehab", title: "Individual follow-up rehabilitation session", duration: "60 min", price: "45 €", desc: "Focused therapeutic movement, manual techniques, and progressive muscular stabilization." },
        { id: "women", title: "Women's health & postpartum consultation", duration: "60 min", price: "50 €", desc: "Diastasis check, gentle pelvic floor rehabilitation, and scar recovery care." },
        { id: "infant", title: "Infant motor development & handling instruction", duration: "45 min", price: "40 €", desc: "Gentle motor milestone assessment and supportive everyday handling guidance for parents." },
      ]
    : [
        { id: "first", title: "Pirmreizēja fizioterapeita konsultācija & diagnostika", duration: "60 min", price: "50 €", desc: "Padziļināts funkcionālais novērtējums, stājas un elpošanas pārbaude un pirmais ārstniecības plāns." },
        { id: "rehab", title: "Atkārtota individuālā fizioterapijas nodarbība", duration: "60 min", price: "45 €", desc: "Mērķtiecīga ārstnieciskā vingrošana, manuālās tehnikas un pakāpeniska ķermeņa stabilitātes atjaunošana." },
        { id: "women", title: "Sieviešu veselības un pēcdzemdību vizīte", duration: "60 min", price: "50 €", desc: "Diastāzes diagnostika, iegurņa pamatnes muskuļu atjaunošana un ķeizargrieziena rētas aprūpe." },
        { id: "infant", title: "Zīdaiņu motorā attīstība & hendlinga apmācība", duration: "45 min", price: "40 €", desc: "Mazuļa dabiskās motorikas novērtējums un maiga ikdienas hendlinga apmācība vecākiem." },
      ];

  const specialists = isEn
    ? [
        {
          id: "elina",
          name: "Elīna Vītola",
          role: "Lead Physiotherapist",
          cropHeight: "h-[460px]",
          specialty: "Spinal biomechanics, women's health and postpartum recovery",
          image: "/concept-physio/practitioner-primary.jpg",
        },
        {
          id: "marta",
          name: "Marta Liepa",
          role: "Certified Physiotherapist",
          cropHeight: "h-[420px]",
          specialty: "Acute spinal discomfort, sports recovery & joint rehab",
          image: "/concept-physio/practitioner-2.jpg",
        },
        {
          id: "anna",
          name: "Anna Ozola",
          role: "Pediatric Physiotherapist",
          cropHeight: "h-[440px]",
          specialty: "Infant motor milestones, muscle tone harmony & postural support",
          image: "/concept-physio/practitioner-3.jpg",
        },
      ]
    : [
        {
          id: "elina",
          name: "Elīna Vītola",
          role: "Vadošā fizioterapeite",
          cropHeight: "h-[460px]",
          specialty: "Mugurkaula biomehānika, sieviešu veselība un pēcdzemdību aprūpe",
          image: "/concept-physio/practitioner-primary.jpg",
        },
        {
          id: "marta",
          name: "Marta Liepa",
          role: "Sertificēta fizioterapeite",
          cropHeight: "h-[420px]",
          specialty: "Akūtas muguras sāpes, sporta un pēctraumu rehabilitācija",
          image: "/concept-physio/practitioner-2.jpg",
        },
        {
          id: "anna",
          name: "Anna Ozola",
          role: "Bērnu fizioterapeite",
          cropHeight: "h-[440px]",
          specialty: "Zīdaiņu motorā attīstība, muskuļu tonusa harmonizācija un bērnu stāja",
          image: "/concept-physio/practitioner-3.jpg",
        },
      ];

  const bookingDays = isEn
    ? [
        { date: "2026-09-07", dayName: "Mon", fullDay: "Monday, September 7", slots: ["09:00", "11:30", "15:00"] },
        { date: "2026-09-08", dayName: "Tue", fullDay: "Tuesday, September 8", slots: ["10:30", "13:00", "16:30"] },
        { date: "2026-09-09", dayName: "Wed", fullDay: "Wednesday, September 9", slots: ["09:30", "14:00", "17:30"] },
        { date: "2026-09-10", dayName: "Thu", fullDay: "Thursday, September 10", slots: ["11:00", "15:30", "18:00"] },
        { date: "2026-09-11", dayName: "Fri", fullDay: "Friday, September 11", slots: ["08:30", "12:00", "14:30"] },
      ]
    : [
        { date: "2026-09-07", dayName: "Pirmd.", fullDay: "Pirmdiena, 7. septembris", slots: ["09:00", "11:30", "15:00"] },
        { date: "2026-09-08", dayName: "Otrd.", fullDay: "Otrdiena, 8. septembris", slots: ["10:30", "13:00", "16:30"] },
        { date: "2026-09-09", dayName: "Trešd.", fullDay: "Trešdiena, 9. septembris", slots: ["09:30", "14:00", "17:30"] },
        { date: "2026-09-10", dayName: "Ceturtd.", fullDay: "Ceturtdiena, 10. septembris", slots: ["11:00", "15:30", "18:00"] },
        { date: "2026-09-11", dayName: "Piektd.", fullDay: "Piektdiena, 11. septembris", slots: ["08:30", "12:00", "14:30"] },
      ];

  const insuranceCompanies: Record<string, { name: string; coverage: string; details: string }> = isEn
    ? {
        balta: {
          name: "Balta",
          coverage: "Up to 100% reimbursement",
          details: "Standard private health insurance reimbursement example for physical therapy and rehabilitation.",
        },
        bta: {
          name: "BTA",
          coverage: "Up to 100% reimbursement",
          details: "Covers certified physiotherapist consultation and individual exercises according to your policy limits.",
        },
        compensa: {
          name: "Compensa Life",
          coverage: "Up to 100% reimbursement",
          details: "Full or partial reimbursement under outpatient physical therapy coverage programs.",
        },
        ergo: {
          name: "ERGO",
          coverage: "Up to 100% reimbursement",
          details: "Reimburses certified physiotherapy sessions with receipt and statement submission.",
        },
        gjensidige: {
          name: "Gjensidige",
          coverage: "Up to 100% reimbursement",
          details: "Covers rehabilitation sessions and functional diagnostics.",
        },
      }
    : {
        balta: {
          name: "Balta",
          coverage: "Līdz 100% no vizītes cenas",
          details: "Apmaksā fizikālās un rehabilitācijas medicīnas pakalpojumus, fizioterapiju un teipošanu atbilstoši Jūsu polises limitam.",
        },
        bta: {
          name: "BTA",
          coverage: "Līdz 100% no vizītes cenas",
          details: "Apmaksā sertificēta fizioterapeita konsultācijas un individuālās nodarbības pēc izsniegtā čeka un ārstniecības izraksta.",
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

  const faqs = isEn
    ? [
        {
          q: "What should I bring to the initial consultation?",
          a: "Comfortable, flexible clothes (t-shirt, leggings or soft pants). If you have previous medical imaging reports (MRI, X-ray, ultrasound), you can bring them along or send them before the appointment.",
        },
        {
          q: "Is a physician's referral mandatory?",
          a: "No, a doctor's referral is not mandatory for private physiotherapy consultations. Certified practitioners perform their own in-depth functional assessment.",
        },
        {
          q: "How does health insurance reimbursement work?",
          a: "Following each session, an official receipt and medical statement code are provided, which you can easily submit to your insurance provider online.",
        },
        {
          q: "How do I access the practice and is there lift access?",
          a: "Demonstration concept located in Riga. In a live clinic scenario, spacious lift access is provided for prams and persons with reduced mobility, alongside courtyard parking.",
        },
      ]
    : [
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
          a: "Demonstrācijas koncepts Rīgā. Reālā prakses scenārijā tiek nodrošināts ērts un plašs lifts bērnu ratiņiem un personām ar kustību ierobežojumiem, kā arī bezmaksas autostāvvieta.",
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
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 1.03 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.9,
        ease: easeOrganic,
      },
    },
  };

  const stepDirection = bookingStep >= prevStep ? 1 : -1;

  // Safe CreativeWork Structured Data
  const schemaJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `https://saiteo.com/${locale}/concept/physiotherapy#concept`,
        name: isEn
          ? "KUSTĪBA — Human-Centred Physiotherapy Website Concept"
          : "KUSTĪBA — Fizioterapijas konceptprakse",
        headline: isEn
          ? "KUSTĪBA — Human-Centred Physiotherapy Website Concept"
          : "KUSTĪBA — Cilvēcīgas fizioterapijas tīmekļa vietnes koncepts",
        creator: {
          "@type": "Organization",
          name: "Saiteo",
          url: "https://saiteo.com",
        },
        url: `https://saiteo.com/${locale}/concept/physiotherapy`,
        description: isEn
          ? "Independent speculative website concept created by Saiteo to demonstrate human-centred UX and conversion design for a physiotherapy practice. Independent concept. Not a client project or operating clinic."
          : "Neatkarīgs Saiteo izstrādāts dizaina un konversiju koncepts fizioterapijas praksei. Demonstrācijas koncepts, nevis reāla ārstniecības iestāde.",
        image: "https://saiteo.com/concept-physio/hero-warm-care.jpg",
        inLanguage: [locale],
        isAccessibleForFree: true,
        keywords: [
          "Speculative Design",
          "Website Concept",
          "Healthcare UX",
          "Saiteo Case Study",
          "Conversion Design",
        ],
      },
      {
        "@type": "WebPage",
        "@id": `https://saiteo.com/${locale}/concept/physiotherapy#webpage`,
        url: `https://saiteo.com/${locale}/concept/physiotherapy`,
        name: isEn
          ? "KUSTĪBA — Human-Centred Physiotherapy Website Concept | Saiteo"
          : "KUSTĪBA — Cilvēcīgas fizioterapijas koncepts | Saiteo",
        isPartOf: {
          "@type": "WebSite",
          name: "Saiteo",
          url: "https://saiteo.com",
        },
      },
    ],
  };

  return (
    <div
      style={{
        backgroundColor: "#FFF9F4",
        color: "#24302D",
      }}
      className="min-h-screen w-full font-sans antialiased selection:bg-[#D87967]/20 selection:text-[#24302D]"
    >
      {/* Speculative CreativeWork Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />

      {/* Interactive Demo Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-6 py-3.5 rounded-full bg-[#24302D] text-white text-sm font-medium shadow-2xl border border-white/20 flex items-center gap-3"
          >
            <span>ℹ️</span>
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* EXPLICIT SAITEO SPECULATIVE CONCEPT RIBBON                  */}
      {/* ============================================================ */}
      <div
        style={{ backgroundColor: "#24302D", color: "#FFF9F4" }}
        className="px-5 sm:px-8 py-2.5 text-sm flex flex-wrap items-center justify-between gap-3 border-b border-white/10"
      >
        <div className="flex items-center gap-2.5">
          <Link href={`/${locale}`} className="font-bold text-[#00C9A7] tracking-tight">
            saiteo
          </Link>
          <span className="opacity-40">|</span>
          <span className="rounded-md bg-white/15 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-white">
            {isEn ? "SAITEO CONCEPT STUDY" : "SAITEO KONCEPTA PĒTĪJUMS"}
          </span>
          <span className="opacity-85 text-xs sm:text-sm">
            {isEn
              ? "KUSTĪBA · fictional physiotherapy practice"
              : "KUSTĪBA · demonstrācijas fizioterapijas prakse"}
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <Link
            href={`/${locale}/case-studies/physiotherapy`}
            className="opacity-90 hover:opacity-100 underline decoration-[#00C9A7] text-[#00C9A7] font-medium whitespace-nowrap"
          >
            {isEn ? "Why we designed it this way →" : "Kāpēc mēs to tā izstrādājām →"}
          </Link>
        </div>
      </div>

      {/* ============================================================ */}
      {/* HUMAN-CENTERED HEADER */}
      {/* ============================================================ */}
      <header
        style={{
          backgroundColor: isScrolled ? "rgba(255, 249, 244, 0.96)" : "rgba(255, 249, 244, 0.85)",
          borderColor: isScrolled ? "rgba(36, 48, 45, 0.08)" : "transparent",
        }}
        className={`sticky top-0 z-40 transition-all duration-300 border-b ${
          isScrolled ? "backdrop-blur-sm py-3.5 shadow-xs" : "py-5 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-12">
          
          {/* Left: Brand */}
          <Link href="#top" className="flex flex-col group">
            <span className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#24302D]">
              KUSTĪBA
            </span>
            <span className="text-xs sm:text-sm font-normal text-[#4A5D57] block">
              {isEn ? "physiotherapy concept" : "fizioterapijas koncepts"}
            </span>
          </Link>

          {/* Center Navigation */}
          <nav className="hidden lg:flex items-center gap-10 text-base font-medium text-[#4A5D57]">
            <a href="#atpazisana" className="transition-colors hover:text-[#24302D]">
              {isEn ? "How we help" : "Kā varam palīdzēt"}
            </a>
            <a href="#elina" className="transition-colors hover:text-[#24302D]">
              {isEn ? "Therapist" : "Elīna"}
            </a>
            <a href="#nodalas" className="transition-colors hover:text-[#24302D]">
              {isEn ? "Services" : "Pakalpojumi"}
            </a>
            <a href="#vizite" className="transition-colors hover:text-[#24302D]">
              {isEn ? "First visit" : "Pirmā vizīte"}
            </a>
          </nav>

          {/* Right Desktop CTA & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="#pieraksts"
              style={{ backgroundColor: "#D87967", color: "#FFFFFF" }}
              className="hidden sm:inline-block rounded-full px-7 py-3 text-sm font-semibold shadow-xs transition-all hover:bg-[#C26553] hover:-translate-y-0.5"
            >
              {isEn ? "Book visit" : "Pieteikt vizīti"}
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex h-12 w-12 items-center justify-center rounded-full border border-black/15 text-[#24302D] active:bg-black/5 text-lg"
              aria-label={isEn ? "Menu" : "Izvēlne"}
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
                className="block text-lg font-medium text-[#24302D] py-1.5"
              >
                {isEn ? "How we help" : "Kā varam palīdzēt"}
              </a>
              <a
                href="#elina"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-lg font-medium text-[#24302D] py-1.5"
              >
                {isEn ? "Therapist" : "Elīna"}
              </a>
              <a
                href="#nodalas"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-lg font-medium text-[#24302D] py-1.5"
              >
                {isEn ? "Services" : "Pakalpojumi"}
              </a>
              <a
                href="#vizite"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-lg font-medium text-[#24302D] py-1.5"
              >
                {isEn ? "First visit" : "Pirmā vizīte"}
              </a>
              <div className="pt-3 border-t border-black/[0.06]">
                <a
                  href="#pieraksts"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ backgroundColor: "#D87967", color: "#FFFFFF" }}
                  className="block text-center rounded-full py-4 text-base font-semibold min-h-[48px] flex items-center justify-center"
                >
                  {isEn ? "Book visit →" : "Pieteikt vizīti →"}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ============================================================ */}
      {/* 1. LAYERED ART-DIRECTED HERO COMPOSITION                     */}
      {/* ============================================================ */}
      <section
        id="top"
        style={{
          background: "radial-gradient(ellipse at 75% 30%, rgba(248, 233, 227, 0.75) 0%, rgba(255, 249, 244, 1) 75%)",
        }}
        className="relative min-h-[92svh] flex flex-col justify-between overflow-hidden pt-6 sm:pt-10 pb-16 lg:pb-20"
      >
        {/* Subtle Ambient Radial Glows Behind Photograph */}
        <div
          className="pointer-events-none absolute right-[10%] top-[15%] h-[450px] w-[450px] rounded-full bg-[#D87967]/[0.09] blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute right-[35%] bottom-[18%] h-[380px] w-[380px] rounded-full bg-[#9FB8A6]/[0.14] blur-3xl"
          aria-hidden="true"
        />

        {/* Main Grid Container */}
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-12 my-auto">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] items-center gap-10 lg:gap-12">
            
            {/* LEFT: Headline & Proof */}
            <motion.div
              style={{ opacity: heroTextOpacity }}
              className="max-w-[680px] z-10"
            >
              {/* Human Proof Line */}
              <motion.p
                custom={0}
                initial="hidden"
                animate="visible"
                variants={revealLineVariants}
                className="text-sm sm:text-base font-semibold tracking-wide text-[#D87967]"
              >
                {isEn
                  ? "Physiotherapy for people, not just symptoms."
                  : "Fizioterapija cilvēkiem, nevis tikai simptomiem."}
              </motion.p>

              {/* Headline */}
              <motion.h1
                custom={1}
                initial="hidden"
                animate="visible"
                variants={revealLineVariants}
                className="mt-4 text-[clamp(2.8rem,4.8vw,5.2rem)] font-medium leading-[0.98] sm:leading-[1.02] tracking-tight text-[#24302D]"
              >
                <span>
                  {isEn
                    ? "Your body shouldn't have to adapt to therapy."
                    : "Jūsu ķermenim nav jāpielāgojas terapijai."}
                </span>
                <span className="mt-2.5 block font-normal text-[#D87967]">
                  {isEn
                    ? "Therapy should adapt to you."
                    : "Terapijai jāpielāgojas Jums."}
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                custom={2}
                initial="hidden"
                animate="visible"
                variants={revealLineVariants}
                className="mt-6 max-w-xl text-lg sm:text-xl leading-relaxed text-[#3D4F4A]"
              >
                {isEn
                  ? "Individual physical therapy tailored to life's transitions — from chronic pain and recovery to pregnancy, postpartum care, and baby's first milestones."
                  : "Individuāla fizioterapija cilvēkiem dažādos dzīves posmos — no muguras sāpēm un atveseļošanās līdz grūtniecībai, pēcdzemdību mieram un mazuļa pirmajiem soļiem."}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                custom={3}
                initial="hidden"
                animate="visible"
                variants={revealLineVariants}
                className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6"
              >
                <a
                  href="#pieraksts"
                  style={{ backgroundColor: "#D87967", color: "#FFFFFF" }}
                  className="rounded-full px-8 py-4 text-center text-base font-semibold shadow-md transition-all hover:bg-[#C26553] hover:shadow-lg hover:-translate-y-0.5 min-h-[52px] flex items-center justify-center"
                >
                  {isEn ? "Book first visit" : "Pieteikt pirmo vizīti"}
                </a>
                <a
                  href="#jautajums"
                  className="text-center text-base font-medium text-[#24302D] underline decoration-[#24302D]/40 underline-offset-4 transition-colors hover:text-[#D87967] hover:decoration-[#D87967] py-2"
                >
                  {isEn ? "Not sure what to choose? →" : "Neesmu pārliecināta, ko izvēlēties →"}
                </a>
              </motion.div>

              <motion.p
                custom={4}
                initial="hidden"
                animate="visible"
                variants={revealLineVariants}
                className="mt-5 text-sm sm:text-base text-[#4A5D57]"
              >
                {isEn
                  ? "Independent design study · Demonstration concept"
                  : "Neatkarīgs dizaina pētījums · Demonstrācijas koncepts"}
              </motion.p>
            </motion.div>

            {/* RIGHT: Layered Spatial Photography + Secondary Detail + Bridging Booking Preview */}
            <div className="relative w-full lg:w-[108%] lg:-mr-[8%] flex flex-col items-end">
              
              {/* Main Portrait Treatment Photo with Organic Curve on Inner Edge */}
              <motion.div
                style={{ y: heroPhotoY }}
                initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: shouldReduceMotion ? 0.01 : 0.9, ease: easeOrganic }}
                className="relative w-full h-[380px] sm:h-[480px] lg:h-[580px] xl:h-[620px] overflow-hidden rounded-3xl lg:rounded-l-[80px] xl:rounded-l-[110px] lg:rounded-r-none bg-[#F8E9E3]"
              >
                <Image
                  src="/concept-physio/hero-warm-care.jpg"
                  alt={isEn ? "Calm, supportive physiotherapy care" : "Mierīga un saudzīga fizioterapijas vide KUSTĪBA telpā"}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover object-[center_28%]"
                />
              </motion.div>

              {/* Secondary Detail Image (Hands Guiding Movement / Tactile Vignette) */}
              <motion.div
                style={{ y: heroDetailY }}
                initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, rotate: -2 }}
                transition={{ duration: shouldReduceMotion ? 0.01 : 0.7, delay: shouldReduceMotion ? 0 : 0.15, ease: easeOrganic }}
                className="hidden sm:block absolute -left-6 bottom-16 lg:-left-12 lg:bottom-20 z-20 w-[180px] h-[210px] lg:w-[210px] lg:h-[240px] rounded-2xl overflow-hidden border-2 border-white shadow-md bg-[#FFF9F4]"
              >
                <Image
                  src="/concept-physio/hands-care.jpg"
                  alt="Tactile therapeutic movement guidance"
                  fill
                  sizes="210px"
                  className="object-cover object-center"
                />
              </motion.div>

              {/* Booking Preview Bridging Card (Overlapping Lower Boundary) */}
              <motion.div
                style={{ y: heroBookingY }}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: shouldReduceMotion ? 0.01 : 0.7, delay: shouldReduceMotion ? 0 : 0.25, ease: easeOrganic }}
                className="relative z-30 w-full sm:w-[360px] -mt-16 sm:-mt-20 lg:-mt-24 self-center sm:self-end sm:mr-6 lg:mr-10 rounded-2xl bg-[#FFFFFF]/98 backdrop-blur-md p-6 border border-white shadow-[0_16px_36px_-12px_rgba(36,48,45,0.12)]"
              >
                <div className="flex items-center justify-between border-b border-black/[0.06] pb-3">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#4A5D57] block">
                      {isEn ? "Next available session" : "Tuvākā brīvā vizīte"}
                    </span>
                    <span className="text-base font-bold text-[#24302D] mt-0.5 block">
                      {isEn ? "Tuesday · 10:30" : "Otrdien · 10:30"}
                    </span>
                  </div>
                  <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border border-black/10 bg-[#F8E9E3]">
                    <Image
                      src="/concept-physio/practitioner-primary.jpg"
                      alt="Elīna Vītola"
                      fill
                      sizes="40px"
                      className="object-cover object-top"
                    />
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-[#4A5D57]">
                  <span>{isEn ? "Elīna Vītola · Lead Physiotherapist" : "Elīna Vītola · Vadošā fizioterapeite"}</span>
                </div>

                {/* Available Time Chips */}
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {["10:30", "13:00", "16:30"].map((slot) => (
                    <a
                      key={slot}
                      href="#pieraksts"
                      onClick={() => {
                        setSelectedDayIndex(1);
                        setSelectedTimeSlot(slot);
                        setSelectedSpecialist("elina");
                      }}
                      className="rounded-xl border border-black/15 bg-[#FFF9F4] py-2.5 text-center text-sm font-semibold text-[#24302D] transition-colors hover:border-[#D87967] hover:bg-[#D87967] hover:text-white min-h-[42px] flex items-center justify-center"
                    >
                      {slot}
                    </a>
                  ))}
                </div>

                <div className="mt-3.5 flex items-center justify-between border-t border-black/[0.06] pt-2.5">
                  <a
                    href="#pieraksts"
                    className="text-xs sm:text-sm font-semibold text-[#D87967] hover:underline"
                  >
                    {isEn ? "View calendar & all times →" : "Skatīt kalendāru un visus laikus →"}
                  </a>
                </div>
              </motion.div>

            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. FULL-WIDTH EDITORIAL RECOGNITION (NO CARD STACKS)         */}
      {/* ============================================================ */}
      <section
        id="atpazisana"
        style={{
          backgroundColor: "#FFF9F4",
        }}
        className="py-20 sm:py-28 lg:py-36"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
          
          {/* Header Narrative */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-5xl font-medium text-[#24302D] leading-tight">
              {isEn ? "Perhaps you recognise yourself here." : "Varbūt Jūs atpazīstat sevi šeit."}
            </h2>
            <p className="mt-4 text-lg sm:text-xl leading-relaxed text-[#4A5D57]">
              {isEn
                ? "People don't arrive with medical labels. They arrive with feelings, uncertainty, and a desire to feel comfortable in their body again."
                : "Cilvēki pie mums nenāk ar pakalpojuma nosaukumu. Viņi nāk ar sajūtām, jautājumiem un vēlmi atkal justies labi savā ķermenī."}
            </p>
          </div>

          {/* Editorial 2-Column Layout: Left 55% Photo / Right 45% Typographic Rows */}
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            
            {/* LEFT 55%: Large Crossfading Photographic Atmosphere */}
            <div className="relative">
              <div
                style={{
                  borderRadius: "2rem",
                }}
                className="relative h-[360px] sm:h-[480px] lg:h-[560px] w-full overflow-hidden bg-[#F8E9E3]"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeRec.num}
                    initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: shouldReduceMotion ? 0.01 : 0.4, ease: easeOrganic }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={activeRec.image}
                      alt={activeRec.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="object-cover object-center"
                    />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute bottom-5 left-5 right-5 rounded-xl bg-white/90 backdrop-blur-md px-5 py-3 text-sm font-medium text-[#24302D]">
                  {activeRec.imageAlt}
                </div>
              </div>
            </div>

            {/* RIGHT 45%: Typographic Editorial Rows (No Cards, No Shadows) */}
            <div className="space-y-2">
              {recognitionItems.map((item, idx) => {
                const isActive = hoveredSituation === idx;
                return (
                  <div
                    key={item.num}
                    onMouseEnter={() => setHoveredSituation(idx)}
                    onClick={() => setHoveredSituation(idx)}
                    className="cursor-pointer border-b border-black/[0.08] py-5 sm:py-6 transition-colors group"
                  >
                    <div className="flex items-baseline gap-4 sm:gap-6">
                      <span
                        className={`font-mono text-base sm:text-lg transition-colors ${
                          isActive ? "text-[#D87967] font-bold" : "text-[#24302D]/35 group-hover:text-[#24302D]/60"
                        }`}
                      >
                        {item.num}
                      </span>
                      <div className="flex-1">
                        <h3
                          className={`text-xl sm:text-2xl leading-snug transition-colors ${
                            isActive ? "font-semibold text-[#24302D]" : "font-normal text-[#4A5D57] group-hover:text-[#24302D]"
                          }`}
                        >
                          {item.thought}
                        </h3>

                        <AnimatePresence>
                          {isActive && (
                            <motion.p
                              initial={{ opacity: 0, height: 0, marginTop: 0 }}
                              animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                              exit={{ opacity: 0, height: 0, marginTop: 0 }}
                              transition={{ duration: 0.3, ease: easeOrganic }}
                              className="text-base sm:text-[17px] leading-relaxed text-[#4A5D57]"
                            >
                              {item.response}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Editorial Transition */}
          <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-black/[0.06]">
            <p className="text-base text-[#4A5D57]">
              {isEn
                ? "Unsure about your situation? We listen and help guide your first step."
                : "Neesat pārliecināti par savu situāciju? Mēs uzklausām un palīdzam saprast pirmo soli."}
            </p>
            <a
              href="#jautajums"
              className="inline-flex items-center gap-2 text-base font-semibold text-[#D87967] hover:underline whitespace-nowrap"
            >
              <span>{isEn ? "Tell us what you're experiencing" : "Pastāstiet mums, kas notiek"}</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. ELĪNA STORY — THE EMOTIONAL CENTER                        */}
      {/* ============================================================ */}
      <section
        id="elina"
        style={{
          backgroundColor: "#E5ECE5",
        }}
        className="py-20 sm:py-28 lg:py-36 overflow-hidden relative"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[0.38fr_0.62fr] lg:items-start">
            
            {/* LEFT (~38%): Portrait with Vertical Reveal */}
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.8, ease: easeOrganic }}
              className="relative lg:sticky lg:top-28"
            >
              <div
                style={{
                  borderRadius: "2.5rem 1.25rem 2.5rem 1.25rem",
                }}
                className="relative h-[420px] sm:h-[500px] lg:h-[580px] w-full overflow-hidden bg-[#FFF9F4] shadow-sm"
              >
                <Image
                  src="/concept-physio/practitioner-primary.jpg"
                  alt={isEn ? "Elīna Vītola, Physiotherapist" : "Elīna Vītola, fizioterapeite"}
                  fill
                  sizes="(max-width: 1024px) 100vw, 38vw"
                  className="object-cover object-top"
                />
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-[#4A5D57]">
                <span>{isEn ? "Elīna Vītola · Concept Persona" : "Elīna Vītola · koncepta persona"}</span>
                <span>{isEn ? "Riga Practice" : "Rīgas prakse"}</span>
              </div>
            </motion.div>

            {/* RIGHT (~62%): Story, Intimate Strip, Experience Focus, & Secondary Action Photo */}
            <div className="relative">
              
              {/* Personal Identity Tag */}
              <div className="border-b border-black/[0.08] pb-4">
                <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#D87967]">
                  Elīna Vītola
                </p>
                <p className="text-base sm:text-lg font-medium text-[#4A5D57] mt-0.5">
                  {isEn ? "physiotherapist · movement therapist (concept persona)" : "fizioterapeite · kustību terapeite (koncepta persona)"}
                </p>
              </div>

              {/* Core Quote */}
              <h2 className="mt-6 text-3xl sm:text-4xl lg:text-[3rem] font-medium leading-[1.12] tracking-tight text-[#24302D]">
                {isEn
                  ? "“First, I want to understand your story.”"
                  : "“Vispirms es gribu saprast Jūsu stāstu.”"}
              </h2>

              {/* Main Narrative */}
              <div className="mt-6 space-y-4 text-lg sm:text-xl leading-relaxed text-[#3D4F4A]">
                {isEn ? (
                  <>
                    <p>
                      Every body moves differently — and everyone arrives with their own history, daily routine, and reason why their body needs attentive care right now.
                    </p>
                    <p>
                      That&apos;s why during the first session, I don&apos;t rush to hand out an exercise checklist. First, we discuss what changed, what you want to regain, and how your whole body moves.
                    </p>
                    <p className="font-semibold text-[#24302D]">
                      Only then do we build a plan that truly fits into your life.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      Katrs cilvēks kustas citādi — un katrs atnāk ar savu pieredzi, ikdienu un iemeslu, kāpēc ķermenis šobrīd prasa vairāk uzmanības.
                    </p>
                    <p>
                      Tāpēc pirmajā vizītē es nesteidzos pie “vingrojumu saraksta”. Vispirms mēs izrunājam, kas ir mainījies, ko Jūs vēlaties atgūt un kā ķermenis kustas kopumā.
                    </p>
                    <p className="font-semibold text-[#24302D]">
                      Tikai tad veidojam plānu, kas iederas Jūsu dzīvē.
                    </p>
                  </>
                )}
              </div>

              {/* Intimate Reflection Strip: "Kāpēc fizioterapija?" */}
              <div
                style={{
                  backgroundColor: "rgba(255, 249, 244, 0.7)",
                }}
                className="mt-8 rounded-2xl p-6 sm:p-7 border border-black/[0.06]"
              >
                <p className="text-base font-semibold text-[#24302D]">
                  {isEn ? "Why physiotherapy?" : "Kāpēc fizioterapija?"}
                </p>
                <p className="mt-2 text-base sm:text-lg italic leading-relaxed text-[#3D4F4A]">
                  {isEn
                    ? "“I have always been fascinated by the moment when someone begins trusting their body again. Not only when pain subsides, but when the confidence to move returns.”"
                    : "“Man vienmēr interesējis brīdis, kad cilvēks atkal sāk uzticēties savam ķermenim. Ne tikai tas, ka sāpes mazinās, bet ka atgriežas drošība kustēties.”"}
                </p>
                <span className="mt-3 block text-xs text-[#4A5D57] opacity-80">
                  {isEn ? "— Fictional concept reflection" : "— Fiktīvs demonstrācijas pārdomu fragments"}
                </span>
              </div>

              {/* Experience Focus Areas (No Fake Numeric Credentials) & Human Detail */}
              <div className="mt-8 grid gap-6 sm:grid-cols-2 border-t border-black/[0.08] pt-6">
                <div>
                  <p className="text-sm font-semibold text-[#24302D] mb-2.5">
                    {isEn ? "Focus areas (fictional concept):" : "Pieredzes virzieni (demonstrācijas koncepts):"}
                  </p>
                  <ul className="space-y-1.5 text-base text-[#4A5D57]">
                    <li>{isEn ? "• Women's health" : "• Sieviešu veselība"}</li>
                    <li>{isEn ? "• Spinal & joint rehabilitation" : "• Muguras un locītavu rehabilitācija"}</li>
                    <li>{isEn ? "• Movement therapy" : "• Kustību terapija"}</li>
                    <li>{isEn ? "• Postpartum recovery" : "• Pēcdzemdību atjaunošanās"}</li>
                  </ul>
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#24302D] mb-2.5">
                    {isEn ? "Outside practice:" : "Ārpus prakses:"}
                  </p>
                  <p className="text-base text-[#4A5D57] leading-relaxed">
                    {isEn
                      ? "Long walks · open-water swimming · good coffee"
                      : "Garas pastaigas · peldēšana · laba kafija"}
                  </p>
                  <span className="mt-2 block text-xs text-[#4A5D57] opacity-75">
                    {isEn ? "Fictional persona personality profile" : "Fiktīvs personāža profils"}
                  </span>
                </div>
              </div>

              {/* Secondary Photograph of Elīna Working With Patient + CTAs */}
              <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-black/[0.08] pt-6">
                <div className="flex flex-wrap items-center gap-5">
                  <a
                    href="#pieraksts"
                    onClick={() => { setSelectedSpecialist("elina"); changeBookingStep(3); }}
                    style={{ backgroundColor: "#24302D", color: "#FFF9F4" }}
                    className="rounded-full px-8 py-4 text-sm font-semibold hover:bg-[#D87967] transition-colors min-h-[48px] flex items-center justify-center shadow-xs"
                  >
                    {isEn ? "Book with Elīna →" : "Pieteikt vizīti pie Elīnas →"}
                  </a>
                  <a
                    href="#nodalas"
                    className="text-base font-medium text-[#4A5D57] hover:text-[#24302D] underline py-2"
                  >
                    {isEn ? "Explore focus areas" : "Iepazīt prakses virzienus"}
                  </a>
                </div>

                {/* Secondary In-Practice Photo (Parallax 6%) */}
                <motion.div
                  style={{ y: storyImageY }}
                  className="hidden sm:block relative w-[200px] h-[140px] lg:w-[220px] lg:h-[155px] rounded-2xl overflow-hidden border-2 border-white shadow-md bg-[#FFF9F4] shrink-0"
                >
                  <Image
                    src="/concept-physio/warm-guidance.jpg"
                    alt={isEn ? "Therapist at work with patient" : "Fizioterapeite darbā ar pacientu"}
                    fill
                    sizes="220px"
                    className="object-cover object-center"
                  />
                </motion.div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. FOUR SPECIALISM STORYTELLING CHAPTERS                     */}
      {/* ============================================================ */}
      <section id="nodalas" className="relative">
        
        {/* CHAPTER 1: SĀPES & ATVESEĻOŠANĀS */}
        <div id="sapes" className="py-16 sm:py-24 lg:py-32 bg-[#FFF9F4]">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
            <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              
              {/* Photo */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={chapterImageVariants}
                style={{
                  borderRadius: "2.5rem",
                }}
                className="relative h-[340px] sm:h-[460px] lg:h-[520px] w-full overflow-hidden bg-[#F8E9E3]"
              >
                <Image
                  src="/concept-physio/gentle-movement.jpg"
                  alt={isEn ? "Physical recovery & gentle rehabilitation" : "Mugurkaula un locītavu atveseļošana"}
                  fill
                  sizes="(max-width: 768px) 100vw, 520px"
                  className="object-cover object-center"
                />
              </motion.div>

              {/* Narrative Content */}
              <div>
                <h2 className="text-2xl sm:text-4xl lg:text-[2.75rem] font-medium text-[#24302D] leading-[1.2]">
                  {isEn ? "Return to movement you can trust again." : "Atgriezties pie kustības, kurai atkal var uzticēties."}
                </h2>

                <div className="mt-5 space-y-4 text-lg sm:text-[19px] leading-relaxed text-[#3D4F4A]">
                  <p>
                    {isEn
                      ? "Pain changes how we sit, walk, sleep, and think about our bodies. It creates hesitation and strain."
                      : "Sāpes bieži maina to, kā mēs kustamies, strādājam, guļam un pat domājam par savu ķermeni."}
                  </p>
                  <p>
                    {isEn
                      ? "We start with what troubles you most, evaluate full movement patterns, and build a safe roadmap back without strain."
                      : "Mēs sākam ar to, kas traucē tieši Jums, izvērtējam kustību kopumā un soli pa solim veidojam ceļu atpakaļ uz drošu kustību — bez lieka stresa un pārslodzes."}
                  </p>
                </div>

                <p className="mt-6 text-base font-medium text-[#4A5D57]">
                  {isEn
                    ? "Back & neck relief · Post-injury rehab · Mobility restore"
                    : "Muguras un kakla sāpes · Pēctraumu atjaunošanās · Kustību ierobežojumi"}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-6">
                  <a
                    href="#pieraksts"
                    onClick={() => { setSelectedService("rehab"); changeBookingStep(3); }}
                    style={{ backgroundColor: "#D87967", color: "#FFFFFF" }}
                    className="rounded-full px-8 py-4 text-center text-sm font-semibold hover:bg-[#C26553] min-h-[48px] flex items-center justify-center"
                  >
                    {isEn ? "Book rehabilitation session →" : "Pieteikt rehabilitācijas vizīti →"}
                  </a>
                  <a href="#cenas" className="text-base font-medium text-[#4A5D57] hover:text-[#24302D] underline py-2">
                    {isEn ? "View pricing" : "Skatīt cenrādi"}
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
          }}
          className="py-16 sm:py-24 lg:py-32"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
            <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              
              {/* Narrative Content */}
              <div>
                <h2 className="text-2xl sm:text-4xl lg:text-[2.75rem] font-medium text-[#24302D] leading-[1.2]">
                  {isEn ? "Your body is changing. You don't have to navigate it alone." : "Ķermenis mainās. Jums nav tas jāizdzīvo vienai."}
                </h2>

                <div className="mt-5 space-y-4 text-lg sm:text-[19px] leading-relaxed text-[#3D4F4A]">
                  <p>
                    {isEn
                      ? "During pregnancy, joint ligaments loosen and the pelvic girdle takes on unfamiliar load. It's natural, but persistent discomfort doesn't have to be endured."
                      : "Gaidību laikā mainās smaguma centrs, locītavu saites kļūst elastīgākas, un muguras jostas daļa un iegurnis saņem nepierastu slodzi. Tas ir dabisks process, taču tas nenozīmē, ka sāpes ir jāpacieš."}
                  </p>
                  <p>
                    {isEn
                      ? "We gently unload tension, teach breathing and relaxation techniques, and prepare your body for a smooth, confident birth."
                      : "Mēs palīdzam saudzīgi atslogot sasprindzinātās zonas, iemācām elpošanas un atslābināšanās tehnikas un sagatavojam ķermeni vieglām, harmoniskām dzemdībām."}
                  </p>
                </div>

                <p className="mt-6 text-base font-medium text-[#4A5D57]">
                  {isEn
                    ? "Pelvic & lumbar relief · Birth prep breathing · Kinesio taping"
                    : "Iegurņa un muguras atslogošana · Elpošana dzemdībām · Teipošana"}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-6">
                  <a
                    href="#pieraksts"
                    onClick={() => { setSelectedService("women"); setSelectedSpecialist("elina"); changeBookingStep(3); }}
                    style={{ backgroundColor: "#24302D", color: "#FFF9F4" }}
                    className="rounded-full px-8 py-4 text-center text-sm font-semibold hover:bg-[#D87967] min-h-[48px] flex items-center justify-center"
                  >
                    {isEn ? "Book prenatal care session →" : "Pieteikt grūtniecības vizīti →"}
                  </a>
                  <span className="text-base text-[#4A5D57]">{isEn ? "Led by Elīna Vītola" : "Pieņem Elīna Vītola"}</span>
                </div>
              </div>

              {/* Photo */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={chapterImageVariants}
                style={{
                  borderRadius: "2.5rem",
                }}
                className="relative h-[340px] sm:h-[460px] lg:h-[520px] w-full overflow-hidden bg-[#FFF9F4]"
              >
                <Image
                  src="/concept-physio/service-women.jpg"
                  alt={isEn ? "Prenatal gentle physiotherapy" : "Grūtnieču saudzīgā fizioterapija un aprūpe"}
                  fill
                  sizes="(max-width: 768px) 100vw, 520px"
                  className="object-cover object-[center_25%]"
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* CHAPTER 3: PĒC DZEMDĪBĀM */}
        <div id="pecdzemdibam" className="py-16 sm:py-24 lg:py-32 bg-[#FFF7EF]">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
            <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              
              {/* Photo */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={chapterImageVariants}
                style={{
                  borderRadius: "2.5rem",
                }}
                className="relative h-[340px] sm:h-[460px] lg:h-[520px] w-full overflow-hidden bg-[#F8E9E3]"
              >
                <Image
                  src="/concept-physio/hands-care.jpg"
                  alt={isEn ? "Postnatal recovery and core assessment" : "Pēcdzemdību atjaunošanās un diastāzes pārbaude"}
                  fill
                  sizes="(max-width: 768px) 100vw, 520px"
                  className="object-cover object-center"
                />
              </motion.div>

              {/* Narrative Content */}
              <div>
                <h2 className="text-2xl sm:text-4xl lg:text-[2.75rem] font-medium text-[#24302D] leading-[1.2]">
                  {isEn ? "Returning to yourself is not a race." : "Atgriešanās pie sevis nav sacensība."}
                </h2>

                <div className="mt-5 space-y-4 text-lg sm:text-[19px] leading-relaxed text-[#3D4F4A]">
                  <p>
                    {isEn
                      ? "The postpartum period demands patience and genuine gentleness. Your body needs time for tissues to regenerate, core layers to reconnect, and pelvic base to stabilize."
                      : "Pēcdzemdību periods prasa pacietību un patiesu saudzību. Ķermenim ir nepieciešams laiks, lai audi atjaunotos, vēdera dziļie muskuļi atkal atrastu savienojumu un iegurņa pamatne kļūtu stabila."}
                  </p>
                  <p>
                    {isEn
                      ? "We evaluate rectus diastasis, support C-section scar healing, and establish a gradual return to active life."
                      : "Mēs pārbaudām taisnā vēdera muskuļa diastāzi, izvērtējam rētu sadzīšanu pēc ķeizargrieziena un veidojam pakāpenisku, drošu plānu atgriešanās brīdim pie ikdienas aktivitātēm un sporta."}
                  </p>
                </div>

                <p className="mt-6 text-base font-medium text-[#4A5D57]">
                  {isEn
                    ? "Diastasis assessment · Pelvic floor core · Scar care"
                    : "Diastāzes diagnostika · Iegurņa pamatne · Ķeizargrieziena rētas aprūpe"}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-6">
                  <a
                    href="#pieraksts"
                    onClick={() => { setSelectedService("women"); setSelectedSpecialist("elina"); changeBookingStep(3); }}
                    style={{ backgroundColor: "#D87967", color: "#FFFFFF" }}
                    className="rounded-full px-8 py-4 text-center text-sm font-semibold hover:bg-[#C26553] min-h-[48px] flex items-center justify-center"
                  >
                    {isEn ? "Book postpartum checkup →" : "Pieteikt pēcdzemdību pārbaudi →"}
                  </a>
                  <span className="text-base text-[#4A5D57]">{isEn ? "Recommended from week 6 postpartum" : "Ieteicams no 6. nedēļas pēc dzemdībām"}</span>
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
          }}
          className="py-16 sm:py-24 lg:py-32"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
            <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              
              {/* Narrative Content */}
              <div>
                <h2 className="text-2xl sm:text-4xl lg:text-[2.75rem] font-medium text-[#24302D] leading-[1.2]">
                  {isEn ? "A small body. A monumental developmental journey." : "Mazs ķermenis. Milzīgs attīstības ceļš."}
                </h2>

                <div className="mt-5 space-y-4 text-lg sm:text-[19px] leading-relaxed text-[#3D4F4A]">
                  <p>
                    {isEn
                      ? "In their first year, babies master life's cornerstone movements — rolling, crawling, sitting, and taking first steps. Parent handling is the finest foundation for balanced growth."
                      : "Pirmajā dzīves gadā mazulis apgūst svarīgākās dzīves kustības — velšanos, rāpošanu, sēdēšanu un pirmos soļus. Vecāku pareizs hendlings (ikdienas celšana, turēšana un ģērbšana) ir labākais atbalsts simetriskai attīstībai."}
                  </p>
                  <p>
                    {isEn
                      ? "In playful, calm sessions, Anna Ozola evaluates infant motor tone and provides practical techniques for everyday comfort at home."
                      : "Nodarbībā Anna Ozola mierīgā un rotaļīgā veidā novērtē mazuļa motoriku, muskuļu tonusu un iemāca vecākiem praktiskus paņēmienus, kā ikdienā palīdzēt mazulim justies brīvi un droši."}
                  </p>
                </div>

                <p className="mt-6 text-base font-medium text-[#4A5D57]">
                  {isEn
                    ? "Infant handling · Muscle tone harmony · Motor milestones"
                    : "Zīdaiņu hendlings · Muskuļu tonuss · Motorā attīstība · Bērnu stāja"}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-6">
                  <a
                    href="#pieraksts"
                    onClick={() => { setSelectedService("infant"); setSelectedSpecialist("anna"); changeBookingStep(3); }}
                    style={{ backgroundColor: "#24302D", color: "#FFF9F4" }}
                    className="rounded-full px-8 py-4 text-center text-sm font-semibold hover:bg-[#D87967] min-h-[48px] flex items-center justify-center"
                  >
                    {isEn ? "Book infant handling session →" : "Pieteikt hendlinga nodarbību →"}
                  </a>
                  <span className="text-base text-[#4A5D57]">{isEn ? "Led by Anna Ozola (40 € / 45 min)" : "Pieņem Anna Ozola (40 € / 45 min)"}</span>
                </div>
              </div>

              {/* Photo */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={chapterImageVariants}
                style={{
                  borderRadius: "2.5rem",
                }}
                className="relative h-[340px] sm:h-[460px] lg:h-[520px] w-full overflow-hidden bg-[#FFF9F4]"
              >
                <Image
                  src="/concept-physio/service-children.jpg"
                  alt={isEn ? "Infant development & parent handling" : "Zīdaiņu attīstība un mīlošs hendlings"}
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
      {/* 5. FIRST-VISIT CONTINUOUS JOURNEY (NO CARD BOXES)            */}
      {/* ============================================================ */}
      <section
        id="vizite"
        style={{
          backgroundColor: "#FFF9F4",
        }}
        className="relative py-20 sm:py-28 lg:py-36 overflow-hidden border-t border-black/[0.06]"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
          
          {/* Header Narrative */}
          <div className="max-w-3xl">
            <h2 className="text-3xl sm:text-5xl font-medium text-[#24302D] leading-[1.15]">
              {isEn ? "A first visit with zero unknowns." : "Pirmā vizīte bez nezināmā."}
            </h2>
            <p className="mt-4 text-lg sm:text-xl text-[#4A5D57]">
              {isEn
                ? "You don't need to know which medical service to request. That's our job."
                : "Jums nav jāzina, kāds pakalpojums Jums vajadzīgs. Tas ir mūsu darbs."}
            </p>
          </div>

          {/* Horizontal Visual Journey with Photographic Detail Vignettes */}
          <div className="relative mt-16 sm:mt-20">
            
            {/* Desktop Curved Movement Line */}
            <div className="absolute top-10 left-0 right-0 hidden lg:block pointer-events-none z-0">
              <svg className="w-full h-12" viewBox="0 0 1100 48" fill="none" preserveAspectRatio="none">
                <motion.path
                  d="M 20,24 C 280,4 550,44 1080,24"
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

            {/* 4 Steps + 2 In-Between Photographic Details */}
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 relative z-10">
              {firstVisitSteps.map((step, idx) => (
                <div key={step.num} className="flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-3xl sm:text-4xl font-light text-[#D87967]/80 block">
                      {step.num}
                    </span>

                    <h3 className="mt-3 text-xl sm:text-2xl font-medium text-[#24302D]">
                      {step.title}
                    </h3>

                    <p className="mt-3 text-base sm:text-[17px] leading-relaxed text-[#4A5D57]">
                      {step.copy}
                    </p>
                  </div>

                  {/* Photo Vignette 1 (Under Step 1) */}
                  {idx === 0 && (
                    <div className="mt-6 relative h-28 w-full sm:h-32 rounded-2xl overflow-hidden bg-[#F8E9E3] hidden sm:block">
                      <Image
                        src="/concept-physio/warm-guidance.jpg"
                        alt="Attentive listening & consultation"
                        fill
                        sizes="250px"
                        className="object-cover object-center"
                      />
                    </div>
                  )}

                  {/* Photo Vignette 2 (Under Step 3) */}
                  {idx === 2 && (
                    <div className="mt-6 relative h-28 w-full sm:h-32 rounded-2xl overflow-hidden bg-[#F8E9E3] hidden sm:block">
                      <Image
                        src="/concept-physio/hands-care.jpg"
                        alt="Gentle assessment & manual therapy"
                        fill
                        sizes="250px"
                        className="object-cover object-center"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Practical Reassurance Editorial Strip (No Floating White Card) */}
          <div className="mt-16 border-t border-black/[0.08] pt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6">
            <div className="space-y-2 text-base sm:text-[17px] text-[#3D4F4A]">
              <p>
                👕 <strong>{isEn ? "What to wear?" : "Ko vilkt mugurā?"}</strong>{" "}
                {isEn
                  ? "Comfortable sportswear (t-shirt and leggings/shorts) that allows free movement."
                  : "Ērtu sporta vai brīvā laika apģērbu (t-kreklu un legingus/šortus), kas neierobežo kustības."}
              </p>
              <p>
                📍 <strong>{isEn ? "Location & access:" : "Ieeja & transports:"}</strong>{" "}
                {isEn
                  ? "Demonstration practice in Riga · Convenient lift access and free parking."
                  : "Rīga · demonstrācijas prakse (ērts lifts ratiņiem un bezmaksas stāvvieta)."}
              </p>
            </div>
            <a
              href="#pieraksts"
              style={{ backgroundColor: "#D87967", color: "#FFFFFF" }}
              className="rounded-full px-8 py-4 text-center text-sm font-semibold whitespace-nowrap hover:bg-[#C26553] min-h-[48px] flex items-center justify-center"
            >
              {isEn ? "Book 60 min session →" : "Pieteikt 60 min vizīti →"}
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. PRACTITIONER TRIPTYCH (NO CARDS / NO SHADOWS)             */}
      {/* ============================================================ */}
      <section id="specialistes" className="py-20 sm:py-28 lg:py-36 bg-[#FFF9F4] border-t border-black/[0.06]">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
          
          <div className="max-w-3xl mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-5xl font-medium text-[#24302D] leading-tight">
              {isEn ? "Certified practitioners you can place your trust in" : "Sertificētas ārstniecības personas, kurām var uzticēties"}
            </h2>
            <p className="mt-4 text-lg sm:text-xl text-[#4A5D57]">
              {isEn
                ? "Each specialist has dedicated clinical expertise and genuine care for patients (concept personas)."
                : "Katrai mūsu speciālistei ir sava padziļinātā specializācija un patiesa mīlestība pret savu darbu (koncepta personas)."}
            </p>
          </div>

          {/* Large Portrait Triptych with Intentional Varied Heights */}
          <div className="grid gap-10 md:grid-cols-3 items-end">
            {specialists.map((person) => (
              <div key={person.id} className="flex flex-col">
                <div
                  style={{
                    borderRadius: "2.5rem 1.25rem 2.5rem 1.25rem",
                  }}
                  className={`relative ${person.cropHeight} w-full overflow-hidden bg-[#F8E9E3]`}
                >
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-top"
                  />
                </div>

                <div className="mt-6">
                  <h3 className="text-2xl sm:text-3xl font-medium text-[#24302D]">
                    {person.name}
                  </h3>
                  
                  <p className="mt-1 text-base font-semibold text-[#D87967]">
                    {person.role}
                  </p>

                  <p className="mt-3 text-base sm:text-[17px] leading-relaxed text-[#4A5D57]">
                    {person.specialty}
                  </p>

                  <div className="mt-4 pt-3 border-t border-black/[0.08]">
                    <a
                      href="#pieraksts"
                      onClick={() => { setSelectedSpecialist(person.id); changeBookingStep(3); }}
                      className="inline-flex items-center gap-2 text-base font-semibold text-[#24302D] hover:text-[#D87967] transition-colors py-1"
                    >
                      <span>{isEn ? `Book with ${person.name.split(" ")[0]}` : `Pieteikt vizīti pie ${person.name.split(" ")[0]}s`}</span>
                      <span>→</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. TRANSPARENCY: FLATTENED TYPOGRAPHIC PRICING               */}
      {/* ============================================================ */}
      <section id="cenas" className="py-20 sm:py-28 lg:py-36 bg-[#FFF7EF] border-t border-black/[0.06]">
        <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-12">
          <div>
            <h2 className="text-3xl sm:text-5xl font-medium text-[#24302D]">
              {isEn ? "Transparent service rates" : "Caurspīdīgas pakalpojumu cenas"}
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#4A5D57]">
              {isEn
                ? "All session materials (kinesiology taping, equipment) are included in the visit fee."
                : "Visi nodarbībai nepieciešamie materiāli (kinezioloģiskā teipošana, inventārs) ir iekļauti vizītes cenā."}
            </p>
          </div>

          {/* Flat Typographic Price Rows (No Outer Card Box, No Giant Shadow) */}
          <div className="mt-12 space-y-2">
            {servicesList.map((srv) => (
              <div key={srv.id} className="border-b border-black/[0.08] py-6">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-xl sm:text-2xl font-medium text-[#24302D]">
                    {srv.title}
                  </span>
                  <span className="text-2xl sm:text-3xl font-bold text-[#24302D] whitespace-nowrap">
                    {srv.price}
                  </span>
                </div>
                <p className="mt-2 text-base text-[#4A5D57]">
                  {srv.desc} · <span className="font-medium text-[#24302D]">{srv.duration}</span>
                </p>
              </div>
            ))}

            {/* Course Pass Row */}
            <div className="border-b border-black/[0.08] py-6">
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-xl sm:text-2xl font-medium text-[#D87967]">
                  {isEn ? "5-session course pass (save 25 €)" : "5 nodarbību kurss (abonements)"}
                </span>
                <span className="text-2xl sm:text-3xl font-bold text-[#D87967] whitespace-nowrap">
                  200 €
                </span>
              </div>
              <p className="mt-2 text-base text-[#4A5D57]">
                {isEn ? "Valid for 3 months from purchase across all individual physiotherapy sessions." : "Derīgs 3 mēnešus no iegādes brīža visām individuālajām nodarbībām (ietaupījums 25 €)."}
              </p>
            </div>
          </div>

          {/* Insurance Information Flat Strip */}
          <div className="mt-12 pt-6">
            <p className="text-base sm:text-lg font-semibold text-[#24302D]">
              {isEn ? "Health insurance reimbursement (Demo example):" : "Apdrošināšanas atlīdzības saņemšana:"}
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {Object.keys(insuranceCompanies).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedInsurance(key)}
                  className={`rounded-full px-5 py-2.5 text-sm sm:text-base font-medium transition-all min-h-[44px] flex items-center ${
                    selectedInsurance === key
                      ? "bg-[#24302D] text-white"
                      : "bg-[#FFF9F4] text-[#4A5D57] border border-black/15 hover:border-black/30"
                  }`}
                >
                  {insuranceCompanies[key].name}
                </button>
              ))}
            </div>

            <div className="mt-5 text-base sm:text-[17px] text-[#24302D] leading-relaxed">
              <p>
                <strong>{insuranceCompanies[selectedInsurance].name}:</strong> {insuranceCompanies[selectedInsurance].coverage}. {insuranceCompanies[selectedInsurance].details}
              </p>
              <p className="mt-2 text-sm sm:text-base text-[#4A5D57]">
                {isEn
                  ? "Official receipts and medical statements are issued after each session for easy insurance claims."
                  : "Pēc katras vizītes izsniedzam oficiālu čeku un ārstniecības personas izrakstu (forma 027/u)."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. OPEN EDITORIAL PATIENT STORIES                            */}
      {/* ============================================================ */}
      <section
        id="stasti"
        style={{
          backgroundColor: "#FFF9F4",
        }}
        className="py-20 sm:py-28 lg:py-36 border-t border-black/[0.06]"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-12">
          
          {/* Header Narrative */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-5xl font-medium text-[#24302D] leading-[1.18]">
              <span>{isEn ? "Sometimes what helps most is hearing:" : "Dažreiz visvairāk palīdz dzirdēt:"}</span>
              <span className="block font-normal text-[#D87967] mt-1">
                {isEn ? "“I felt that way too.”" : "“Es arī tā jutos.”"}
              </span>
            </h2>
          </div>

          {/* Open Editorial Showcase (No Nested Cards) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStory.id}
              initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: shouldReduceMotion ? 0 : -20 }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.45, ease: easeOrganic }}
              className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center"
            >
              <div>
                <blockquote className="text-2xl sm:text-3xl lg:text-4xl leading-snug text-[#24302D] font-normal">
                  {activeStory.quote}
                </blockquote>

                <p className="mt-6 text-base sm:text-[17px] font-medium text-[#D87967]">
                  {activeStory.situation}
                </p>
              </div>

              <div
                style={{
                  borderRadius: "2.5rem",
                }}
                className="relative h-[260px] sm:h-[360px] w-full overflow-hidden bg-[#F8E9E3]"
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

          {/* Controls */}
          <div className="mt-10 flex items-center justify-between border-t border-black/[0.08] pt-6">
            <div className="flex items-center gap-2.5">
              {demoStories.map((story, i) => (
                <button
                  key={story.id}
                  type="button"
                  onClick={() => setActiveStoryIdx(i)}
                  className={`h-3 rounded-full transition-all min-w-[12px] ${
                    activeStoryIdx === i ? "w-8 bg-[#D87967]" : "w-3 bg-black/20 hover:bg-black/40"
                  }`}
                  aria-label={`Story ${i + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  setActiveStoryIdx((prev) => (prev === 0 ? demoStories.length - 1 : prev - 1))
                }
                className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 text-lg text-[#24302D] transition-colors hover:bg-[#24302D] hover:text-white"
                aria-label="Previous story"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() =>
                  setActiveStoryIdx((prev) => (prev === demoStories.length - 1 ? 0 : prev + 1))
                }
                className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 text-lg text-[#24302D] transition-colors hover:bg-[#24302D] hover:text-white"
                aria-label="Next story"
              >
                →
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 9. PRIMARY INTERFACE OBJECT: THE BOOKING UI CARD             */}
      {/* ============================================================ */}
      <section
        id="pieraksts"
        style={{
          backgroundColor: "#243A36",
        }}
        className="py-20 sm:py-28 lg:py-36 text-[#FFF9F4] relative overflow-hidden"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            
            {/* LEFT: Reassuring Guidance & Safe Demo Contacts */}
            <div>
              <h2 className="text-3xl sm:text-5xl font-medium text-[#FFF9F4] leading-[1.15]">
                {isEn ? "Let's begin with the first step." : "Sāksim ar pirmo soli."}
              </h2>

              <div className="mt-5 space-y-4 text-lg sm:text-xl leading-relaxed text-[#FFF9F4]/85">
                <p>
                  {isEn
                    ? "If you know what you'd like to book, choose a session in the live calendar alongside."
                    : "Ja zināt, ko vēlaties rezervēt — izvēlieties vizītes laiku blakus esošajā kalendārā."}
                </p>
                <p>
                  {isEn
                    ? "If you're unsure where to start, briefly describe what you're feeling and we'll help guide you."
                    : "Ja neesat pārliecināta, ar ko sākt — īsi pastāstiet par savu situāciju, un mēs palīdzēsim izvēlēties piemērotāko speciālisti un pirmo soli."}
                </p>
              </div>

              {/* Safe Demo Channels */}
              <div className="mt-10 border-t border-white/15 pt-6 space-y-3.5 text-sm sm:text-base text-[#FFF9F4]/80">
                <p className="font-semibold text-[#9FB8A6]">
                  {isEn ? "Demonstration channels:" : "Demonstrācijas saziņa:"}
                </p>
                <div className="flex flex-wrap gap-3 pt-1">
                  <button
                    type="button"
                    onClick={showDemoToast}
                    className="flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-white hover:bg-white/20 transition-colors min-h-[44px]"
                  >
                    <span>💬 Demo WhatsApp</span>
                  </button>
                  <button
                    type="button"
                    onClick={showDemoToast}
                    className="flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-white hover:bg-white/20 transition-colors min-h-[44px]"
                  >
                    <span>📞 Demo Phone</span>
                  </button>
                  <button
                    type="button"
                    onClick={showDemoToast}
                    className="flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-white hover:bg-white/20 transition-colors min-h-[44px]"
                  >
                    <span>✉️ Demo Email</span>
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT: THE ONE SPECIAL INTERFACE CARD (INTENTIONAL HERO INTERACTION) */}
            <motion.div
              id="booking-card"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.7, ease: easeOrganic }}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "2rem",
                boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.4)",
              }}
              className="p-6 sm:p-10 text-[#24302D] border border-white"
            >
              {/* Header & Step Navigation */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/[0.08] pb-4">
                <div>
                  <h3 className="text-2xl font-semibold text-[#24302D]">{isEn ? "Book visit (Demo)" : "Pieteikt vizīti"}</h3>
                  <span className="text-sm text-[#4A5D57]">
                    {isEn ? "KUSTĪBA concept · Riga" : "KUSTĪBA telpā · Rīga (koncepts)"}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-sm font-semibold">
                  {[
                    { num: 1, label: isEn ? "Service" : "Pakalpojums" },
                    { num: 2, label: isEn ? "Specialist" : "Speciālists" },
                    { num: 3, label: isEn ? "Time" : "Laiks" },
                  ].map((s) => (
                    <button
                      key={s.num}
                      type="button"
                      onClick={() => changeBookingStep(s.num as 1 | 2 | 3)}
                      className={`flex items-center rounded-full px-4 py-2 transition-colors min-h-[40px] ${
                        bookingStep === s.num
                          ? "bg-[#24302D] text-white"
                          : "text-[#4A5D57] hover:bg-black/[0.04]"
                      }`}
                    >
                      <span>{s.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {bookingCompleted ? (
                /* Demo Completed Screen */
                <div className="py-10 text-center">
                  <span
                    style={{ backgroundColor: "#F8E9E3", color: "#D87967" }}
                    className="inline-flex h-16 w-16 items-center justify-center rounded-full text-3xl font-bold"
                  >
                    ✓
                  </span>
                  <h4 className="mt-4 text-2xl sm:text-3xl font-semibold text-[#24302D]">
                    {isEn ? "Demo booking complete" : "Demonstrācijas pieraksts pabeigts"}
                  </h4>
                  <p className="mt-2 text-base text-[#4A5D57]">
                    <strong>{currentDayObj.fullDay} @ {selectedTimeSlot}</strong> {isEn ? "with" : "pie speciālistes"} <strong>{currentSpecialistObj.name}</strong>.
                  </p>

                  <div
                    style={{ backgroundColor: "#FFF9F4" }}
                    className="mt-6 rounded-2xl p-5 text-sm sm:text-base text-left border border-black/[0.08] text-[#24302D]"
                  >
                    <p className="font-semibold text-[#D87967]">
                      {isEn ? "⚠️ Speculative Concept Notice:" : "⚠️ Koncepta paziņojums:"}
                    </p>
                    <p className="mt-1">
                      {isEn
                        ? "No actual appointment has been created. This interaction demonstrates the booking experience for a modern physiotherapy practice."
                        : "Vizīte nav reģistrēta. Šī mijiedarbība demonstrē mūsdienīgas fizioterapijas prakses pieraksta pieredzi."}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => { setBookingCompleted(false); setShowIntakeForm(false); }}
                    style={{ backgroundColor: "#24302D", color: "#FFF9F4" }}
                    className="mt-6 rounded-full px-8 py-3.5 text-sm font-semibold hover:bg-[#D87967] min-h-[48px]"
                  >
                    {isEn ? "Try another time slot" : "Pieteikt citu laiku"}
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
                  <div className="rounded-xl bg-[#FFF9F4] p-4 text-sm sm:text-base text-[#24302D] border border-black/[0.08]">
                    <strong>{isEn ? "Selected:" : "Izvēlēts:"}</strong> {currentDayObj.fullDay} @ {selectedTimeSlot} · {currentSpecialistObj.name} ({currentServiceObj.title})
                  </div>

                  <div>
                    <label className="block text-sm sm:text-base font-medium text-[#24302D]">
                      {isEn ? "Full Name (Demo) *" : "Jūsu vārds, uzvārds *"}
                    </label>
                    <input
                      type="text"
                      required
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder={isEn ? "Anna Smith" : "Anna Bērziņa"}
                      className="mt-1.5 w-full rounded-xl border border-black/20 bg-[#FFF9F4] px-4 py-3 text-base text-[#24302D] focus:border-[#D87967] focus:outline-hidden min-h-[48px]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm sm:text-base font-medium text-[#24302D]">
                      {isEn ? "Phone number (Demo) *" : "Tālruņa numurs (SMS atgādinājumam) *"}
                    </label>
                    <input
                      type="tel"
                      required
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      placeholder="+371 20 000 000"
                      className="mt-1.5 w-full rounded-xl border border-black/20 bg-[#FFF9F4] px-4 py-3 text-base text-[#24302D] focus:border-[#D87967] focus:outline-hidden min-h-[48px]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm sm:text-base font-medium text-[#24302D]">
                      {isEn ? "Notes for therapist (optional)" : "Piezīmes ārstei (pēc izvēles)"}
                    </label>
                    <input
                      type="text"
                      value={patientNote}
                      onChange={(e) => setPatientNote(e.target.value)}
                      placeholder={isEn ? "What discomfort are you currently experiencing?" : "Kas šobrīd sagādā vislielāko diskomfortu?"}
                      className="mt-1.5 w-full rounded-xl border border-black/20 bg-[#FFF9F4] px-4 py-3 text-base text-[#24302D] focus:border-[#D87967] focus:outline-hidden min-h-[48px]"
                    />
                  </div>

                  <div className="flex items-center justify-between border-t border-black/[0.08] pt-4">
                    <button
                      type="button"
                      onClick={() => setShowIntakeForm(false)}
                      className="text-sm sm:text-base text-[#4A5D57] hover:underline py-2"
                    >
                      {isEn ? "← Change time" : "← Mainīt laiku"}
                    </button>
                    <button
                      type="submit"
                      style={{ backgroundColor: "#D87967", color: "#FFFFFF" }}
                      className="rounded-full px-8 py-3.5 text-sm font-semibold shadow-xs hover:bg-[#C26553] min-h-[48px] flex items-center justify-center"
                    >
                      {isEn ? "Confirm demo booking →" : "Apstiprināt pieteikumu →"}
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
                          <p className="text-sm font-semibold text-[#24302D]">
                            {isEn ? "Select session type:" : "Izvēlieties vizītes veidu:"}
                          </p>
                          <div className="grid gap-3">
                            {servicesList.map((srv) => (
                              <button
                                key={srv.id}
                                type="button"
                                onClick={() => { setSelectedService(srv.id); changeBookingStep(2); }}
                                className={`flex items-center justify-between rounded-xl border p-4 text-left transition-all min-h-[58px] ${
                                  selectedService === srv.id
                                    ? "border-[#D87967] bg-[#F8E9E3]/50"
                                    : "border-black/15 hover:bg-[#FFF9F4]"
                                }`}
                              >
                                <div>
                                  <p className="text-base font-semibold text-[#24302D]">{srv.title}</p>
                                  <span className="text-sm text-[#4A5D57]">{srv.duration}</span>
                                </div>
                                <span className="font-semibold text-lg text-[#24302D] ml-3">{srv.price}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Step 2: Specialist Selector */}
                      {bookingStep === 2 && (
                        <div className="space-y-3">
                          <p className="text-sm font-semibold text-[#24302D]">
                            {isEn ? "Select specialist:" : "Izvēlieties speciālisti:"}
                          </p>
                          <div className="grid gap-3">
                            {specialists.map((spec) => (
                              <button
                                key={spec.id}
                                type="button"
                                onClick={() => { setSelectedSpecialist(spec.id); changeBookingStep(3); }}
                                className={`flex items-center gap-4 rounded-xl border p-4 text-left transition-all min-h-[58px] ${
                                  selectedSpecialist === spec.id
                                    ? "border-[#D87967] bg-[#F8E9E3]/50"
                                    : "border-black/15 hover:bg-[#FFF9F4]"
                                }`}
                              >
                                <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-black/10 bg-[#F8E9E3]">
                                  <Image src={spec.image} alt={spec.name} fill sizes="48px" className="object-cover" />
                                </div>
                                <div>
                                  <p className="text-base font-semibold text-[#24302D]">{spec.name}</p>
                                  <p className="text-sm text-[#4A5D57]">{spec.role}</p>
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
                          <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-[#FFF9F4] p-3.5 border border-black/[0.08] text-sm text-[#24302D]">
                            <div>
                              <p className="font-semibold">{currentServiceObj.title}</p>
                              <span className="text-xs text-[#4A5D57]">
                                {currentServiceObj.duration} · {currentSpecialistObj.name}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => changeBookingStep(1)}
                              className="text-xs font-semibold text-[#D87967] hover:underline p-1"
                            >
                              {isEn ? "Change →" : "Mainīt →"}
                            </button>
                          </div>

                          {/* Week Selector Header */}
                          <div className="mt-4 flex items-center justify-between">
                            <span className="text-sm font-semibold text-[#24302D]">
                              {isEn ? "Sept 7–11 (Demo)" : "7.–11. septembris (demo)"}
                            </span>
                            <span className="text-sm text-[#4A5D57]">
                              {currentDayObj.fullDay}
                            </span>
                          </div>

                          {/* Days Strip */}
                          <div className="mt-2.5 grid grid-cols-5 gap-2">
                            {bookingDays.map((d, i) => (
                              <button
                                key={d.date}
                                type="button"
                                onClick={() => { setSelectedDayIndex(i); setSelectedTimeSlot(d.slots[0]); }}
                                className={`rounded-xl border p-2.5 text-center transition-all min-h-[54px] flex flex-col justify-center items-center ${
                                  selectedDayIndex === i
                                    ? "border-[#24302D] bg-[#24302D] text-white shadow-xs"
                                    : "border-black/15 bg-[#FFF9F4] text-[#24302D] hover:bg-white"
                                }`}
                              >
                                <p className="text-xs opacity-75">{d.dayName}</p>
                                <p className="font-semibold text-base mt-0.5">
                                  {d.fullDay.split(" ")[1]}
                                </p>
                              </button>
                            ))}
                          </div>

                          {/* Available Time Slots Chips */}
                          <div className="mt-4">
                            <p className="text-xs font-medium text-[#4A5D57] mb-2">
                              {isEn ? "Available times:" : "Pieejamie laiki:"}
                            </p>
                            <div className="grid grid-cols-3 gap-2">
                              {currentDayObj.slots.map((slot) => (
                                <button
                                  key={slot}
                                  type="button"
                                  onClick={() => setSelectedTimeSlot(slot)}
                                  className={`rounded-xl border py-2.5 text-center text-sm font-semibold transition-all min-h-[44px] flex items-center justify-center ${
                                    selectedTimeSlot === slot
                                      ? "border-[#D87967] bg-[#D87967] text-white shadow-xs"
                                      : "border-black/15 bg-[#FFF9F4] text-[#24302D] hover:border-black/30"
                                  }`}
                                >
                                  {slot}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Active Confirmation Preview Panel */}
                          <div className="mt-5 border-t border-black/[0.08] pt-3.5">
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                              <div>
                                <span className="text-sm font-semibold text-[#24302D]">
                                  {currentDayObj.fullDay} @ {selectedTimeSlot}
                                </span>
                                <p className="text-xs text-[#4A5D57]">
                                  {currentSpecialistObj.name} · {currentServiceObj.title} ({currentServiceObj.price})
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => setShowIntakeForm(true)}
                                style={{ backgroundColor: "#D87967", color: "#FFFFFF" }}
                                className="rounded-full px-7 py-3 text-center text-sm font-semibold shadow-xs hover:bg-[#C26553] whitespace-nowrap min-h-[46px] flex items-center justify-center"
                              >
                                {isEn ? "Continue →" : "Turpināt →"}
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Microcopy */}
                  <div className="border-t border-black/[0.08] mt-5 pt-3 flex items-center justify-between text-xs text-[#4A5D57]">
                    <span>{isEn ? "Not sure where to begin?" : "Nezināt, ko izvēlēties?"}</span>
                    <a href="#jautajums" className="text-[#D87967] font-semibold hover:underline p-1">
                      {isEn ? "Ask a question →" : "Uzdot jautājumu →"}
                    </a>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 10. DIRECT QUESTION (REDUCED SAAS RADIUS, SUBTLE BORDER)     */}
      {/* ============================================================ */}
      <section
        id="jautajums"
        style={{
          backgroundColor: "#FFF7EF",
        }}
        className="py-20 sm:py-28 lg:py-36 border-t border-black/[0.06]"
      >
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-medium text-[#24302D]">
                {isEn ? "Not sure where to begin?" : "Neesat pārliecināti, ar ko sākt?"}
              </h2>
              <p className="mt-4 text-lg sm:text-xl leading-relaxed text-[#4A5D57]">
                {isEn
                  ? "In a real practice, patients can ask a quick question or message on WhatsApp. The therapist reviews the situation and suggests the best specialist and first step."
                  : "Uzdodiet savu jautājumu šeit vai uzrakstiet mums WhatsApp. Mūsu fizioterapeite iepazīsies ar Jūsu situāciju un ieteiks piemērotāko speciālisti un pirmo soli."}
              </p>

              <div className="mt-8 space-y-2.5 border-t border-black/[0.08] pt-6 text-sm sm:text-base text-[#3D4F4A]">
                <p>
                  📍 <strong>{isEn ? "Location:" : "Atrašanās vieta:"}</strong> {isEn ? "Riga · Speculative Design Concept" : "Rīga · Demonstrācijas koncepts"}
                </p>
                <p>
                  💡 <strong>{isEn ? "Design note:" : "Piezīme:"}</strong> {isEn ? "This form demonstrates patient intake UX without persisting sensitive data." : "Šī forma demonstrē pacientu pieteikšanās pieredzi bez sensitīvu datu saglabāšanas."}
                </p>
              </div>
            </div>

            {/* Contained Form: Reduced 16-20px radius, clean border, no heavy drop-shadow */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "1.25rem",
              }}
              className="p-7 sm:p-9 border border-black/[0.08]"
            >
              {inquirySent ? (
                <div className="p-6 text-center">
                  <span
                    style={{ backgroundColor: "#F8E9E3", color: "#D87967" }}
                    className="inline-flex h-14 w-14 items-center justify-center rounded-full text-2xl font-bold"
                  >
                    ✓
                  </span>
                  <h3 className="mt-3 text-2xl font-semibold text-[#24302D]">
                    {isEn ? "Demo inquiry complete!" : "Paldies par ziņu!"}
                  </h3>
                  <p className="mt-2 text-base text-[#4A5D57]">
                    {isEn
                      ? "Demo interaction — in a real project this would connect securely to the practice's intake workflow."
                      : "Demonstrācijas mijiedarbība — reālā projektā šis droši savienotos ar prakses pacientu pieņemšanas sistēmu."}
                  </p>
                  <button
                    type="button"
                    onClick={() => setInquirySent(false)}
                    style={{ backgroundColor: "#24302D", color: "#FFF9F4" }}
                    className="mt-5 rounded-full px-7 py-3 text-sm font-semibold min-h-[46px]"
                  >
                    {isEn ? "Send another demo note" : "Nosūtīt vēl vienu ziņu"}
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
                    <label className="block text-sm sm:text-base font-medium text-[#24302D]">
                      {isEn ? "Name (Demo) *" : "Jūsu vārds *"}
                    </label>
                    <input
                      type="text"
                      required
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      placeholder={isEn ? "Anna" : "Anna"}
                      className="mt-1.5 w-full rounded-xl border border-black/20 bg-[#FFF9F4] px-4 py-3 text-base text-[#24302D] focus:border-[#D87967] focus:outline-hidden min-h-[48px]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm sm:text-base font-medium text-[#24302D]">
                      {isEn ? "Phone or WhatsApp (Demo) *" : "Tālrunis vai WhatsApp *"}
                    </label>
                    <input
                      type="tel"
                      required
                      value={inquiryPhone}
                      onChange={(e) => setInquiryPhone(e.target.value)}
                      placeholder="+371 20 000 000"
                      className="mt-1.5 w-full rounded-xl border border-black/20 bg-[#FFF9F4] px-4 py-3 text-base text-[#24302D] focus:border-[#D87967] focus:outline-hidden min-h-[48px]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm sm:text-base font-medium text-[#24302D]">
                      {isEn ? "Brief description of what you're feeling" : "Jautājums vai situācijas apraksts"}
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={inquiryText}
                      onChange={(e) => setInquiryText(e.target.value)}
                      placeholder={isEn ? "What discomfort are you experiencing?" : "Kas Jums rada diskomfortu, cik ilgi, vai ir bijusi trauma vai izmeklējumi?"}
                      className="mt-1.5 w-full rounded-xl border border-black/20 bg-[#FFF9F4] px-4 py-3 text-base text-[#24302D] focus:border-[#D87967] focus:outline-hidden"
                    />
                  </div>

                  <button
                    type="submit"
                    style={{ backgroundColor: "#D87967", color: "#FFFFFF" }}
                    className="w-full rounded-full py-3.5 text-sm font-semibold shadow-xs hover:bg-[#C26553] min-h-[48px] flex items-center justify-center"
                  >
                    {isEn ? "Send demo inquiry" : "Nosūtīt jautājumu speciālistei"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 11. FAQ: CLEAN FLAT ROWS WITH HAIRLINE SEPARATORS (NO CARDS) */}
      {/* ============================================================ */}
      <section className="py-20 sm:py-28 lg:py-36 bg-[#FFF9F4] border-t border-black/[0.06]">
        <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-medium text-[#24302D]">
              {isEn ? "Frequently asked questions" : "Viss, kas jāzina pirms apmeklējuma"}
            </h2>
          </div>

          {/* Clean Flat Question Rows */}
          <div className="mt-10 divide-y divide-black/[0.10]">
            {faqs.map((faq, idx) => (
              <div key={idx} className="py-6">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="flex w-full items-center justify-between text-left text-xl sm:text-2xl font-medium text-[#24302D] transition-colors hover:text-[#D87967]"
                >
                  <span>{faq.q}</span>
                  <span className="text-[#D87967] text-2xl ml-4 font-light">{openFaq === idx ? "−" : "+"}</span>
                </button>
                {openFaq === idx && (
                  <div className="mt-3.5 text-base sm:text-[17px] leading-relaxed text-[#4A5D57]">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* CONCEPT FOOTER                                               */}
      {/* ============================================================ */}
      <footer
        id="kontakti"
        style={{
          backgroundColor: "#FFF7EF",
        }}
        className="border-t border-black/[0.08] py-16 text-[#4A5D57]"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <span className="text-2xl sm:text-3xl font-semibold text-[#24302D]">KUSTĪBA</span>
              <p className="mt-1 text-sm font-medium text-[#4A5D57]">
                {isEn ? "Physiotherapy website concept by Saiteo" : "Fizioterapijas tīmekļa vietnes koncepts"}
              </p>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#4A5D57]">
                {isEn
                  ? "Independent speculative design concept demonstrating human-centred healthcare UX. Not a real clinic."
                  : "Neatkarīgs dizaina koncepts, kas demonstrē cilvēcīgu un uzticamu veselības aprūpes lietotāja pieredzi. Tā nav reāla ārstniecības iestāde."}
              </p>
            </div>

            <div>
              <p className="text-base font-semibold text-[#24302D]">
                {isEn ? "Design Scope" : "Koncepta tvērums"}
              </p>
              <ul className="mt-3 space-y-2 text-sm sm:text-base text-[#4A5D57]">
                <li>{isEn ? "• Human-centred patient recognition" : "• Pacientu situāciju atpazīšana"}</li>
                <li>{isEn ? "• Frictionless interactive appointment booking" : "• Intuitīva vizīšu pieteikšana"}</li>
                <li>{isEn ? "• Demystified first visit journey" : "• Pirmās vizītes gaitas skaidrojums"}</li>
              </ul>
            </div>

            <div>
              <p className="text-base font-semibold text-[#24302D]">
                {isEn ? "Studio Case Study" : "Stratēģiskais pētījums"}
              </p>
              <p className="mt-3 text-sm sm:text-base">
                <Link
                  href={`/${locale}/case-studies/physiotherapy`}
                  className="text-[#D87967] font-semibold underline"
                >
                  {isEn ? "Read the Saiteo Case Study →" : "Lasīt Saiteo stratēģijas analīzi →"}
                </Link>
              </p>
              <p className="mt-2 text-sm sm:text-base">
                <Link href={`/${locale}`} className="text-[#24302D] hover:underline">
                  Saiteo.com
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-12 border-t border-black/[0.08] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#4A5D57]">
            <p>
              {isEn
                ? `© ${new Date().getFullYear()} Saiteo · KUSTĪBA is an independent speculative design study.`
                : `© ${new Date().getFullYear()} Saiteo · KUSTĪBA ir neatkarīgs dizaina koncepts.`}
            </p>
            <div className="flex items-center gap-4">
              <Link href={`/${locale}/case-studies/physiotherapy`} className="text-[#24302D] hover:underline font-semibold py-1">
                {isEn ? "Case Study Breakdown →" : "Pētījuma analīze →"}
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
            className="sm:hidden fixed bottom-0 left-0 right-0 z-50 p-4 bg-[#FFF9F4]/95 backdrop-blur-md border-t border-black/15 shadow-2xl"
          >
            <a
              href="#pieraksts"
              style={{ backgroundColor: "#D87967", color: "#FFFFFF" }}
              className="flex w-full items-center justify-center gap-2 rounded-full py-4 text-base font-semibold shadow-md active:scale-98 min-h-[50px]"
            >
              <span>{isEn ? "Book visit" : "Pieteikt vizīti"}</span>
              <span>→</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
