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
export type PathwayId = "physio" | "women" | "baby";

const easeOrganic = [0.22, 1, 0.36, 1] as const;

export function PhysiotherapyClient({ locale }: { locale: Locale }) {
  const isEn = locale === "en";
  const isRu = locale === "ru";
  const shouldReduceMotion = useReducedMotion();

  // Scroll Tracking
  const { scrollY } = useScroll();
  const storyImageY = useTransform(scrollY, [700, 1600], shouldReduceMotion ? [0, 0] : [-15, 25]);

  // Header scroll state & mobile bottom bar visibility
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [showMobileBottomBar, setShowMobileBottomBar] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Recognition / Situations State
  const [hoveredSituation, setHoveredSituation] = useState<number>(0);

  // Toast Notification for Demo Channels
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Booking State: Clean 4-Pathway Architecture
  const [selectedPathway, setSelectedPathway] = useState<PathwayId>("physio");
  const [selectedServiceId, setSelectedServiceId] = useState<string>("physio_first");
  const [selectedSpecialist, setSelectedSpecialist] = useState<string>("marta");
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(1); // Tuesday (8 Sep)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("10:30");
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

  // FAQ State (Auto-open first question by default for progressive disclosure clarity)
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const showDemoToast = () => {
    const msg = isEn
      ? "This is an interactive design concept. No message has been sent."
      : isRu
      ? "Это интерактивный концепт дизайна. Сообщение не было отправлено."
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

  // Text content dictionary (Multilingual: LV, EN, RU)
  const recognitionItems = isEn
    ? [
        {
          num: "01",
          thought: "My back or neck hurts, and it's starting to disrupt daily life.",
          response: "We look beyond the painful spot to how posture, load and everyday movement work together.",
          image: "/concept-physio/warm-guidance.jpg",
          imageAlt: "Unhurried, attentive functional movement evaluation",
        },
        {
          num: "02",
          thought: "After an injury, my body no longer feels as dependable as before.",
          response: "We rebuild movement gradually so confidence returns alongside strength and mobility.",
          image: "/concept-physio/service-movement.jpg",
          imageAlt: "Safe and progressive physical rehabilitation",
        },
        {
          num: "03",
          thought: "I'm expecting and want to stay active without lower-back strain.",
          response: "We support changing movement, breathing and comfort throughout pregnancy.",
          image: "/concept-physio/service-women.jpg",
          imageAlt: "Gentle prenatal physiotherapy and pelvic relief",
        },
        {
          num: "04",
          thought: "Postpartum, my body doesn't feel like my own yet.",
          response: "We help you understand recovery, reconnect with movement and return at a pace that feels right.",
          image: "/concept-physio/hands-care.jpg",
          imageAlt: "Postnatal recovery and individual care",
        },
        {
          num: "05",
          thought: "I'm unsure whether my baby's movement development is progressing naturally.",
          response: "We observe movement gently and give parents practical guidance for everyday handling and play.",
          image: "/concept-physio/service-children.jpg",
          imageAlt: "Infant motor development and gentle handling guidance",
        },
      ]
    : isRu
    ? [
        {
          num: "01",
          thought: "Болит спина или шея, и это начинает мешать повседневной жизни.",
          response: "Мы смотрим шире болевой точки — как осанка, нагрузка и привычные движения взаимодействуют вместе.",
          image: "/concept-physio/warm-guidance.jpg",
          imageAlt: "Внимательная функциональная оценка движений",
        },
        {
          num: "02",
          thought: "После травмы тело больше не кажется таким надежным, как раньше.",
          response: "Мы восстанавливаем движения постепенно, чтобы уверенность возвращалась вместе с силой и гибкостью.",
          image: "/concept-physio/service-movement.jpg",
          imageAlt: "Безопасное и постепенное восстановление",
        },
        {
          num: "03",
          thought: "Жду ребенка и хочу оставаться активной без перегрузки поясницы.",
          response: "Бережно поддерживаем меняющиеся движения, дыхание и комфорт на протяжении всей беременности.",
          image: "/concept-physio/service-women.jpg",
          imageAlt: "Забота о теле во время беременности",
        },
        {
          num: "04",
          thought: "После родов мое тело еще не ощущается полностью моим.",
          response: "Помогаем понять восстановление, возобновить связь с телом и вернуться к активности в комфортном ритме.",
          image: "/concept-physio/hands-care.jpg",
          imageAlt: "Послеродовое восстановление и индивидуальная забота",
        },
        {
          num: "05",
          thought: "Не уверена, естественно ли развивается моторика моего малыша.",
          response: "Бережно наблюдаем за движениями и даем родителям практические советы по хендлингу и играм.",
          image: "/concept-physio/service-children.jpg",
          imageAlt: "Моторное развитие малыша и бережный хендлинг",
        },
      ]
    : [
        {
          num: "01",
          thought: "Man sāp mugura vai kakls, un tas sāk traucēt ikdienai.",
          response: "Mēs skatāmies tālāk par sāpīgo vietu — kā stāja, slodze un ikdienas kustības darbojas kopā.",
          image: "/concept-physio/warm-guidance.jpg",
          imageAlt: "Nesteidzīga un saudzīga kustību izvērtēšana",
        },
        {
          num: "02",
          thought: "Pēc traumas mans ķermenis vairs nejūtas tik uzticams kā iepriekš.",
          response: "Mēs atjaunojam kustības pakāpeniski, lai pārliecība atgrieztos līdztekus spēkam un kustīgumam.",
          image: "/concept-physio/service-movement.jpg",
          imageAlt: "Droša un pakāpeniska kustību atjaunošana",
        },
        {
          num: "03",
          thought: "Gaidu bērniņu un vēlos palikt aktīva bez muguras lejasdaļas pārslodzes.",
          response: "Mēs atbalstām mainīgās kustības, elpošanu un komfortu visā grūtniecības laikā.",
          image: "/concept-physio/service-women.jpg",
          imageAlt: "Gaidību laika aprūpe un muguras atslogošana",
        },
        {
          num: "04",
          thought: "Pēc dzemdībām mans ķermenis vēl nejūtas kā mans.",
          response: "Mēs palīdzam izprast atjaunošanos, atjaunot saikni ar kustību un atgriezties ritmā, kas šķiet pareizs.",
          image: "/concept-physio/hands-care.jpg",
          imageAlt: "Pēcdzemdību atjaunošanās un individuāla aprūpe",
        },
        {
          num: "05",
          thought: "Neesmu pārliecināta, vai mana mazuļa kustību attīstība norit dabiski.",
          response: "Mēs saudzīgi vērojam kustības un sniedzam vecākiem praktiskus padomus ikdienas hendlingam un rotaļām.",
          image: "/concept-physio/service-children.jpg",
          imageAlt: "Mazuļa dabiskā motorā attīstība un zīdaiņu hendlings",
        },
      ];

  // 4 Primary Care Pathways on Left
  const pathways = isEn
    ? [
        {
          id: "physio" as PathwayId,
          title: "PHYSIOTHERAPY & RECOVERY",
          subtitle: "Pain · injury · mobility · assessment",
          fromPrice: "From €45",
          defaultService: "physio_first",
          defaultSpecialist: "marta",
        },
        {
          id: "women" as PathwayId,
          title: "WOMEN'S HEALTH",
          subtitle: "Pregnancy · postpartum · pelvic recovery",
          fromPrice: "From €50",
          defaultService: "women_eval",
          defaultSpecialist: "elina",
        },
        {
          id: "baby" as PathwayId,
          title: "BABY & CHILD DEVELOPMENT",
          subtitle: "Infant motor milestones · handling · posture",
          fromPrice: "From €40",
          defaultService: "baby_infant",
          defaultSpecialist: "anna",
        },
      ]
    : isRu
    ? [
        {
          id: "physio" as PathwayId,
          title: "ФИЗИОТЕРАПИЯ И ВОССТАНОВЛЕНИЕ",
          subtitle: "Боль · травмы · подвижность · первая оценка",
          fromPrice: "От 45 €",
          defaultService: "physio_first",
          defaultSpecialist: "marta",
        },
        {
          id: "women" as PathwayId,
          title: "ЖЕНСКОЕ ЗДОРОВЬЕ",
          subtitle: "Беременность · восстановление после родов · тазовое дно",
          fromPrice: "От 50 €",
          defaultService: "women_eval",
          defaultSpecialist: "elina",
        },
        {
          id: "baby" as PathwayId,
          title: "РАЗВИТИЕ МЛАДЕНЦЕВ И ДЕТЕЙ",
          subtitle: "Моторные навыки · хендлинг · осанка",
          fromPrice: "От 40 €",
          defaultService: "baby_infant",
          defaultSpecialist: "anna",
        },
      ]
    : [
        {
          id: "physio" as PathwayId,
          title: "FIZIOTERAPIJA UN ATVESELOŠANĀS",
          subtitle: "Muguras & locītavu sāpes · traumu rehabilitācija · stāja",
          fromPrice: "No 45 €",
          defaultService: "physio_first",
          defaultSpecialist: "marta",
        },
        {
          id: "women" as PathwayId,
          title: "SIEVIETES VESELĪBA",
          subtitle: "Gaidību laiks · pēcdzemdību atjaunošanās · diastāze",
          fromPrice: "No 50 €",
          defaultService: "women_eval",
          defaultSpecialist: "elina",
        },
        {
          id: "baby" as PathwayId,
          title: "ZĪDAIŅU UN BĒRNU ATTĪSTĪBA",
          subtitle: "Motorā attīstība · zīdaiņu hendlings · stājas pārbaude",
          fromPrice: "No 40 €",
          defaultService: "baby_infant",
          defaultSpecialist: "anna",
        },
      ];

  // Specific appointment types filtered strictly per category
  const appointmentsByPathway = isEn
    ? {
        physio: [
          {
            id: "physio_first",
            title: "Initial physiotherapy visit",
            duration: "60 min",
            price: "50 €",
            desc: "Comprehensive functional evaluation, posture & movement assessment, and individual treatment plan.",
          },
          {
            id: "physio_followup",
            title: "Follow-up physiotherapy visit",
            duration: "45–50 min",
            price: "45 €",
            desc: "Targeted therapeutic movement, manual techniques, and progressive muscular stabilization.",
          },
        ],
        women: [
          {
            id: "women_eval",
            title: "Women's health assessment",
            duration: "60 min",
            price: "50 €",
            desc: "Diastasis check, breathing mechanics, and prenatal or postnatal pelvic relief.",
          },
          {
            id: "women_postpartum",
            title: "Postpartum recovery visit",
            duration: "60 min",
            price: "50 €",
            desc: "Safe pelvic floor reconnect, posture realignment, and individual recovery guidance.",
          },
        ],
        baby: [
          {
            id: "baby_infant",
            title: "Infant development consultation",
            duration: "45 min",
            price: "40 €",
            desc: "Gentle motor milestone observation and supportive everyday handling guidance for parents.",
          },
          {
            id: "baby_posture",
            title: "Child posture & movement consultation",
            duration: "45 min",
            price: "40 €",
            desc: "Postural symmetry, gait assessment, and playful functional movement exercises.",
          },
        ],
      }
    : isRu
    ? {
        physio: [
          {
            id: "physio_first",
            title: "Первичный визит к физиотерапевту",
            duration: "60 мин",
            price: "50 €",
            desc: "Углубленная функциональная оценка, проверка осанки и движений, составление плана.",
          },
          {
            id: "physio_followup",
            title: "Повторный визит",
            duration: "45–50 мин",
            price: "45 €",
            desc: "Целенаправленная лечебная гимнастика, мануальные техники и стабилизация мышц.",
          },
        ],
        women: [
          {
            id: "women_eval",
            title: "Консультация по женскому здоровью",
            duration: "60 мин",
            price: "50 €",
            desc: "Проверка диастаза, биомеханика дыхания и забота о мышцах тазового дна.",
          },
          {
            id: "women_postpartum",
            title: "Восстановление после родов",
            duration: "60 мин",
            price: "50 €",
            desc: "Безопасное восстановление тела после родов и индивидуально подобранный ритм движений.",
          },
        ],
        baby: [
          {
            id: "baby_infant",
            title: "Консультация по развитию младенца",
            duration: "45 мин",
            price: "40 €",
            desc: "Оценка естественной моторики малыша и обучение родителей бережному хендлингу.",
          },
          {
            id: "baby_posture",
            title: "Консультация по осанке и движениям ребенка",
            duration: "45 мин",
            price: "40 €",
            desc: "Симметрия осанки, оценка походки и игровые функциональные упражнения.",
          },
        ],
      }
    : {
        physio: [
          {
            id: "physio_first",
            title: "Pirmā fizioterapijas vizīte",
            duration: "60 min",
            price: "50 €",
            desc: "Padziļināts funkcionālais novērtējums, stājas un kustību pārbaude un pirmais ārstniecības plāns.",
          },
          {
            id: "physio_followup",
            title: "Atkārtota vizīte",
            duration: "45–50 min",
            price: "45 €",
            desc: "Mērķtiecīga ārstnieciskā vingrošana, manuālās tehnikas un muskuļu stabilizācija.",
          },
        ],
        women: [
          {
            id: "women_eval",
            title: "Sieviešu veselības vizīte",
            duration: "60 min",
            price: "50 €",
            desc: "Diastāzes izvērtēšana, elpošanas biomehānika un iegurņa pamatnes muskuļu aprūpe.",
          },
          {
            id: "women_postpartum",
            title: "Pēcdzemdību atjaunošanās vizīte",
            duration: "60 min",
            price: "50 €",
            desc: "Droša ķermeņa atjaunošana pēc dzemdībām un individuāli pielāgots kustību ritms.",
          },
        ],
        baby: [
          {
            id: "baby_infant",
            title: "Zīdaiņa attīstības konsultācija",
            duration: "45 min",
            price: "40 €",
            desc: "Mazuļa dabiskās motorikas novērtējums un maiga ikdienas hendlinga apmācība vecākiem.",
          },
          {
            id: "baby_posture",
            title: "Bērna stājas un kustību konsultācija",
            duration: "45 min",
            price: "40 €",
            desc: "Stājas simetrija, gaitas izvērtēšana un rotaļīgi funkcionālās vingrošanas vingrinājumi.",
          },
        ],
      };

  // Pricing section list
  const pricingList = isEn
    ? [
        { id: "physio_first", pathway: "physio" as PathwayId, title: "Initial physiotherapy visit", duration: "60 min", price: "50 €", desc: "Comprehensive functional evaluation, posture & movement assessment, and individual treatment plan." },
        { id: "physio_followup", pathway: "physio" as PathwayId, title: "Follow-up physiotherapy visit", duration: "45–50 min", price: "45 €", desc: "Targeted therapeutic movement, manual techniques, and progressive muscular stabilization." },
        { id: "women_eval", pathway: "women" as PathwayId, title: "Women's health assessment", duration: "60 min", price: "50 €", desc: "Diastasis check, breathing mechanics, and prenatal or postnatal pelvic relief." },
        { id: "baby_infant", pathway: "baby" as PathwayId, title: "Infant development consultation", duration: "45 min", price: "40 €", desc: "Gentle motor milestone observation and supportive everyday handling guidance for parents." },
      ]
    : isRu
    ? [
        { id: "physio_first", pathway: "physio" as PathwayId, title: "Первичный визит к физиотерапевту", duration: "60 мин", price: "50 €", desc: "Углубленная функциональная оценка, проверка осанки и движений, составление плана." },
        { id: "physio_followup", pathway: "physio" as PathwayId, title: "Повторный визит", duration: "45–50 мин", price: "45 €", desc: "Лечебная гимнастика, мануальные техники и стабилизация мышц." },
        { id: "women_eval", pathway: "women" as PathwayId, title: "Консультация по женскому здоровью", duration: "60 мин", price: "50 €", desc: "Проверка диастаза, дыхание и забота о мышцах тазового дна." },
        { id: "baby_infant", pathway: "baby" as PathwayId, title: "Консультация по развитию младенца", duration: "45 мин", price: "40 €", desc: "Оценка моторики малыша и обучение бережному хендлингу." },
      ]
    : [
        { id: "physio_first", pathway: "physio" as PathwayId, title: "Pirmā fizioterapijas vizīte", duration: "60 min", price: "50 €", desc: "Padziļināts funkcionālais novērtējums, stājas un kustību pārbaude un pirmais ārstniecības plāns." },
        { id: "physio_followup", pathway: "physio" as PathwayId, title: "Atkārtota vizīte", duration: "45–50 min", price: "45 €", desc: "Mērķtiecīga ārstnieciskā vingrošana, manuālās tehnikas un pakāpeniska ķermeņa stabilitātes atjaunošana." },
        { id: "women_eval", pathway: "women" as PathwayId, title: "Sieviešu veselības vizīte", duration: "60 min", price: "50 €", desc: "Diastāzes izvērtēšana, elpošanas biomehānika un iegurņa pamatnes muskuļu aprūpe." },
        { id: "baby_infant", pathway: "baby" as PathwayId, title: "Zīdaiņa attīstības konsultācija", duration: "45 min", price: "40 €", desc: "Mazuļa dabiskās motorikas novērtējums un maiga ikdienas hendlinga apmācība vecākiem." },
      ];

  const specialists = isEn
    ? [
        {
          id: "elina",
          name: "Elīna Vītola",
          role: "Lead Physiotherapist",
          cropHeight: "h-[460px]",
          specialty: "Spinal biomechanics, women's health and postpartum recovery",
          nextSlot: "Next: Tue 10:30",
          pathways: ["physio", "women"],
          image: "/concept-physio/practitioner-primary.jpg",
        },
        {
          id: "marta",
          name: "Marta Liepa",
          role: "Physiotherapist",
          cropHeight: "h-[420px]",
          specialty: "Spinal and joint rehabilitation, active movement therapy",
          nextSlot: "Next: Wed 09:30",
          pathways: ["physio"],
          image: "/concept-physio/practitioner-2.jpg",
        },
        {
          id: "anna",
          name: "Anna Ozola",
          role: "Pediatric Physiotherapist",
          cropHeight: "h-[440px]",
          specialty: "Infant motor development, gentle handling and postural guidance",
          nextSlot: "Next: Thu 11:00",
          pathways: ["baby"],
          image: "/concept-physio/practitioner-3.jpg",
        },
      ]
    : isRu
    ? [
        {
          id: "elina",
          name: "Элина Витола",
          role: "Ведущий физиотерапевт",
          cropHeight: "h-[460px]",
          specialty: "Биомеханика позвоночника, женское здоровье и восстановление после родов",
          nextSlot: "Ближайшее: Вт 10:30",
          pathways: ["physio", "women"],
          image: "/concept-physio/practitioner-primary.jpg",
        },
        {
          id: "marta",
          name: "Марта Лиепа",
          role: "Физиотерапевт",
          cropHeight: "h-[420px]",
          specialty: "Реабилитация позвоночника и суставов, активная двигательная терапия",
          nextSlot: "Ближайшее: Ср 09:30",
          pathways: ["physio"],
          image: "/concept-physio/practitioner-2.jpg",
        },
        {
          id: "anna",
          name: "Анна Озола",
          role: "Детский физиотерапевт",
          cropHeight: "h-[440px]",
          specialty: "Моторное развитие младенцев, бережный хендлинг и осанка",
          nextSlot: "Ближайшее: Чт 11:00",
          pathways: ["baby"],
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
          nextSlot: "Tuvākais: Otrd. 10:30",
          pathways: ["physio", "women"],
          image: "/concept-physio/practitioner-primary.jpg",
        },
        {
          id: "marta",
          name: "Marta Liepa",
          role: "Fizioterapeite",
          cropHeight: "h-[420px]",
          specialty: "Muguras un locītavu atjaunošanās, aktīvā kustību terapija",
          nextSlot: "Tuvākais: Trešd. 09:30",
          pathways: ["physio"],
          image: "/concept-physio/practitioner-2.jpg",
        },
        {
          id: "anna",
          name: "Anna Ozola",
          role: "Bērnu fizioterapeite",
          cropHeight: "h-[440px]",
          specialty: "Zīdaiņu motorā attīstība, saudzīgs hendlings un bērnu stāja",
          nextSlot: "Tuvākais: Ceturtd. 11:00",
          pathways: ["baby"],
          image: "/concept-physio/practitioner-3.jpg",
        },
      ];

  // Calendar dates with explicit day numbers to avoid month-string date rendering bugs
  const bookingDays = isEn
    ? [
        { date: "2026-09-07", dayName: "Mon", dayNum: "7", fullDay: "Monday, 7 September", slots: ["09:00", "11:30", "15:00"] },
        { date: "2026-09-08", dayName: "Tue", dayNum: "8", fullDay: "Tuesday, 8 September", slots: ["10:30", "13:00", "16:30"] },
        { date: "2026-09-09", dayName: "Wed", dayNum: "9", fullDay: "Wednesday, 9 September", slots: ["09:30", "14:00", "17:30"] },
        { date: "2026-09-10", dayName: "Thu", dayNum: "10", fullDay: "Thursday, 10 September", slots: ["11:00", "15:30", "18:00"] },
        { date: "2026-09-11", dayName: "Fri", dayNum: "11", fullDay: "Friday, 11 September", slots: ["08:30", "12:00", "14:30"] },
      ]
    : isRu
    ? [
        { date: "2026-09-07", dayName: "Пн", dayNum: "7", fullDay: "Понедельник, 7 сентября", slots: ["09:00", "11:30", "15:00"] },
        { date: "2026-09-08", dayName: "Вт", dayNum: "8", fullDay: "Вторник, 8 сентября", slots: ["10:30", "13:00", "16:30"] },
        { date: "2026-09-09", dayName: "Ср", dayNum: "9", fullDay: "Среда, 9 сентября", slots: ["09:30", "14:00", "17:30"] },
        { date: "2026-09-10", dayName: "Чт", dayNum: "10", fullDay: "Четверг, 10 сентября", slots: ["11:00", "15:30", "18:00"] },
        { date: "2026-09-11", dayName: "Пт", dayNum: "11", fullDay: "Пятница, 11 сентября", slots: ["08:30", "12:00", "14:30"] },
      ]
    : [
        { date: "2026-09-07", dayName: "Pirmd.", dayNum: "7", fullDay: "Pirmdiena, 7. septembris", slots: ["09:00", "11:30", "15:00"] },
        { date: "2026-09-08", dayName: "Otrd.", dayNum: "8", fullDay: "Otrdiena, 8. septembris", slots: ["10:30", "13:00", "16:30"] },
        { date: "2026-09-09", dayName: "Trešd.", dayNum: "9", fullDay: "Trešdiena, 9. septembris", slots: ["09:30", "14:00", "17:30"] },
        { date: "2026-09-10", dayName: "Ceturtd.", dayNum: "10", fullDay: "Ceturtdiena, 10. septembris", slots: ["11:00", "15:30", "18:00"] },
        { date: "2026-09-11", dayName: "Piektd.", dayNum: "11", fullDay: "Piektdiena, 11. septembris", slots: ["08:30", "12:00", "14:30"] },
      ];

  const faqs = isEn
    ? [
        {
          q: "What should I bring to the initial consultation?",
          a: "Comfortable, flexible clothes (t-shirt, leggings or soft pants). If you have previous medical imaging reports (MRI, X-ray, ultrasound), you can bring them along or send them before the appointment.",
        },
        {
          q: "Is a physician's referral mandatory?",
          a: "No, a doctor's referral is not mandatory for private physiotherapy consultations. Practitioners perform an in-depth functional assessment.",
        },
        {
          q: "How does health insurance reimbursement work?",
          a: "Clear instructions for submitting receipts and statements or direct billing would appear here on a live clinic website.",
        },
        {
          q: "How do I access the practice?",
          a: "Demonstration concept located in Riga. In a live clinic scenario, convenient access, entrance instructions, and parking information would be detailed here.",
        },
      ]
    : isRu
    ? [
        {
          q: "Что нужно взять с собой на первый визит?",
          a: "Удобную, эластичную одежду (футболка, леггинсы или мягкие брюки). Если есть заключения предыдущих обследований (МРТ, рентген, УЗИ), возьмите их с собой.",
        },
        {
          q: "Нужно ли направление врача?",
          a: "Нет, для частной консультации физиотерапевта направление врача не требуется. Специалисты проводят собственную функциональную оценку.",
        },
        {
          q: "Как работает возмещение по страховке?",
          a: "На реальном сайте практики здесь размещается подробная инструкция по чекам, выпискам и страховым компаниям.",
        },
        {
          q: "Как добраться до практики?",
          a: "Демонстрационный концепт в Риге. На реальном сайте клиники здесь указываются точные ориентиры, парковка и доступная среда.",
        },
      ]
    : [
        {
          q: "Kas man jāņem līdzi uz pirmo vizīti?",
          a: "Ērts, elastīgs apģērbs (t-krekls, legingi vai mīkstas bikses). Ja Jums ir iepriekš veiktie izmeklējumu slēdzieni (rentgens, magnētiskā rezonanse, USG), ņemiet tos līdzi vai nosūtiet pirms vizītes.",
        },
        {
          q: "Vai nepieciešams ārsta nosūtījums?",
          a: "Nē, privātai fizioterapeita konsultācijai ārsta nosūtījums nav obligāts. Speciālistes pašas veic padziļinātu funkcionālo novērtējumu.",
        },
        {
          q: "Kā notiek norēķināšanās ar veselības apdrošināšanu?",
          a: "Reālā prakses vietnē šeit tiek sniegta skaidra instrukcija par čeku un izrakstu iesniegšanu apdrošinātājam vai tiešajiem norēķiniem.",
        },
        {
          q: "Kā nokļūt praksē?",
          a: "Demonstrācijas koncepts Rīgā. Reālā prakses scenārijā šeit tiktu norādīta precīza piekļuves un stāvvietas informācija.",
        },
      ];

  const activeRec = recognitionItems[hoveredSituation] || recognitionItems[0];
  const currentPathwayObj = pathways.find((p) => p.id === selectedPathway) || pathways[0];
  const currentPathwayServices = appointmentsByPathway[selectedPathway] || appointmentsByPathway.physio;
  const currentServiceObj = currentPathwayServices.find((s) => s.id === selectedServiceId) || currentPathwayServices[0];
  const currentSpecialistObj = specialists.find((s) => s.id === selectedSpecialist) || specialists[0];
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

  // Safe CreativeWork Structured Data
  const schemaJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `https://saiteo.com/${locale}/concept/physiotherapy#concept`,
        name: isEn
          ? "KUSTĪBA — Human-Centred Physiotherapy Website Concept"
          : isRu
          ? "KUSTĪBA — Концепт сайта физиотерапевтической практики"
          : "KUSTĪBA — Fizioterapijas konceptprakse",
        headline: isEn
          ? "KUSTĪBA — Human-Centred Physiotherapy Website Concept"
          : isRu
          ? "KUSTĪBA — Концепт сайта физиотерапевтической практики"
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
      {/* SAITEO CONCEPT FRAME — ELEGANT DEEP MUTED PETROL STRIP        */}
      {/* ============================================================ */}
      <div
        style={{ backgroundColor: "#182421", color: "#FFF9F4" }}
        className="h-10 px-5 sm:px-8 lg:px-12 flex items-center justify-between text-xs sm:text-sm border-b border-white/10 select-none z-50 relative"
      >
        {/* DESKTOP LEFT */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href={`/${locale}`}
            className="font-semibold tracking-tight text-white hover:text-[#D87967] transition-colors"
          >
            saiteo
          </Link>
          <span className="h-3.5 w-[1px] bg-white/20" />
          <span className="text-[#FFF9F4]/80">
            {isEn ? "Independent concept · Physiotherapy" : isRu ? "Независимый концепт · Физиотерапия" : "Neatkarīgs koncepts · Fizioterapija"}
          </span>
        </div>

        {/* MOBILE LEFT */}
        <div className="sm:hidden flex items-center gap-2 text-xs">
          <Link
            href={`/${locale}`}
            className="font-semibold tracking-tight text-white"
          >
            saiteo
          </Link>
          <span className="text-white/40">·</span>
          <span className="text-[#FFF9F4]/75">
            {isEn ? "concept" : isRu ? "концепт" : "koncepts"}
          </span>
        </div>

        {/* RIGHT LINK */}
        <div>
          <Link
            href={`/${locale}/case-studies/physiotherapy`}
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-normal text-[#FFF9F4]/90 hover:text-white transition-colors"
          >
            <span className="group-hover:underline underline-offset-4 decoration-white/40">
              Behind the design
            </span>
            <span className="text-xs transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
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
              {isEn ? "physiotherapy practice" : isRu ? "практика физиотерапии" : "fizioterapijas prakse"}
            </span>
          </Link>

          {/* Center Navigation */}
          <nav className="hidden lg:flex items-center gap-10 text-base font-medium text-[#4A5D57]">
            <a href="#atpazisana" className="transition-colors hover:text-[#24302D]">
              {isEn ? "How we help" : isRu ? "Как мы помогаем" : "Kā varam palīdzēt"}
            </a>
            <a href="#elina" className="transition-colors hover:text-[#24302D]">
              {isEn ? "Therapist" : isRu ? "Элина" : "Elīna"}
            </a>
            <a href="#nodalas" className="transition-colors hover:text-[#24302D]">
              {isEn ? "Services" : isRu ? "Услуги" : "Pakalpojumi"}
            </a>
            <a href="#vizite" className="transition-colors hover:text-[#24302D]">
              {isEn ? "First visit" : isRu ? "Первый визит" : "Pirmā vizīte"}
            </a>
          </nav>

          {/* Right Desktop CTA & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="#pieraksts"
              style={{ backgroundColor: "#D87967", color: "#FFFFFF" }}
              className="hidden sm:inline-block rounded-full px-7 py-3 text-sm font-semibold shadow-xs transition-all hover:bg-[#C26553] hover:-translate-y-0.5"
            >
              {isEn ? "Book visit" : isRu ? "Записаться на прием" : "Pieteikt vizīti"}
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
                {isEn ? "How we help" : isRu ? "Как мы помогаем" : "Kā varam palīdzēt"}
              </a>
              <a
                href="#elina"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-lg font-medium text-[#24302D] py-1.5"
              >
                {isEn ? "Therapist" : isRu ? "Элина" : "Elīna"}
              </a>
              <a
                href="#nodalas"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-lg font-medium text-[#24302D] py-1.5"
              >
                {isEn ? "Services" : isRu ? "Услуги" : "Pakalpojumi"}
              </a>
              <a
                href="#vizite"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-lg font-medium text-[#24302D] py-1.5"
              >
                {isEn ? "First visit" : isRu ? "Первый визит" : "Pirmā vizīte"}
              </a>
              <div className="pt-3 border-t border-black/[0.06]">
                <a
                  href="#pieraksts"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ backgroundColor: "#D87967", color: "#FFFFFF" }}
                  className="block text-center rounded-full py-4 text-base font-semibold min-h-[48px] flex items-center justify-center"
                >
                  {isEn ? "Book visit →" : isRu ? "Записаться на прием →" : "Pieteikt vizīti →"}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ============================================================ */}
      {/* 1. FULL WIDTH HERO IMAGE WITH OVERLAID EDITORIAL TEXT        */}
      {/* ============================================================ */}
      <section
        id="top"
        className="relative min-h-[92svh] lg:min-h-[96svh] w-full flex items-center overflow-hidden"
      >
        {/* Full-bleed Background Photography */}
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src="/concept-physio/hero-warm-care.jpg"
            alt={isEn ? "Gentle physiotherapy assessment and posture care at KUSTĪBA" : "Mierīga un saudzīga fizioterapijas un stājas aprūpe KUSTĪBA telpā"}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[60%_center] sm:object-[70%_center] lg:object-[82%_center]"
          />

          {/* Atmospheric Layered Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#FFF9F4] via-[#FFF9F4]/70 to-transparent/20 lg:hidden" />
          <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-[#FFF9F4] via-[#FFF9F4]/90 to-transparent/10 w-[70%]" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FFF9F4] to-transparent pointer-events-none" />
        </div>

        {/* Overlaid Editorial Content Container */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-12 py-16 sm:py-24 lg:py-28 flex flex-col justify-between min-h-[85svh]">
          
          <div className="max-w-[680px] my-auto">
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
                : isRu
                ? "Физиотерапия для людей, а не просто симптомов."
                : "Fizioterapija cilvēkiem, nevis tikai simptomiem."}
            </motion.p>

            {/* Headline Over Full-Width Image */}
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
                  : isRu
                  ? "Вашему телу не нужно подстраиваться под терапию."
                  : "Jūsu ķermenim nav jāpielāgojas terapijai."}
              </span>
              <span className="mt-2.5 block font-normal text-[#D87967]">
                {isEn
                  ? "Therapy should adapt to you."
                  : isRu
                  ? "Терапия должна адаптироваться к вам."
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
                : isRu
                ? "Индивидуальная физиотерапия на разных этапах жизни — от боли в спине и восстановления до беременности, послеродового периода и первых шагов малыша."
                : "Individuāla fizioterapija cilvēkiem dažādos dzīves posmos — no muguras sāpēm un atveseļošanās līdz grūtniecībai, pēcdzemdību mieram un mazuļa pirmajiem soļiem."}
            </motion.p>

            {/* Action Row */}
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
                {isEn ? "Book first visit →" : isRu ? "Записаться на прием →" : "Pieteikt pirmo vizīti →"}
              </a>
              <a
                href="#jautajums"
                className="text-center text-base font-medium text-[#24302D] underline decoration-[#24302D]/40 underline-offset-4 transition-colors hover:text-[#D87967] hover:decoration-[#D87967] py-2"
              >
                {isEn ? "Not sure what to choose? →" : isRu ? "Не уверены, что выбрать? →" : "Neesmu pārliecināta, ko izvēlēties →"}
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
                : isRu
                ? "Независимый дизайн-концепт · Демонстрационный проект"
                : "Neatkarīgs dizaina pētījums · Demonstrācijas koncepts"}
            </motion.p>
          </div>

          {/* Floating Next Available Booking Pill on Lower Right of Hero Image */}
          <div className="mt-8 lg:mt-0 lg:self-end">
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.7, delay: shouldReduceMotion ? 0 : 0.3, ease: easeOrganic }}
              className="w-full sm:w-[380px] rounded-2xl bg-white/95 backdrop-blur-md p-5 border border-white shadow-[0_16px_36px_-12px_rgba(36,48,45,0.14)]"
            >
              <div className="flex items-center justify-between border-b border-black/[0.06] pb-3">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#4A5D57] block">
                    {isEn ? "Next available session" : isRu ? "Ближайшая свободная запись" : "Tuvākā brīvā vizīte"}
                  </span>
                  <span className="text-base font-bold text-[#24302D] mt-0.5 block">
                    {isEn ? "Tuesday · 10:30" : isRu ? "Вторник · 10:30" : "Otrdien · 10:30"}
                  </span>
                </div>
                <div className="relative h-11 w-11 flex-shrink-0 overflow-hidden rounded-full border border-black/10 bg-[#F8E9E3]">
                  <Image
                    src="/concept-physio/practitioner-primary.jpg"
                    alt="Elīna Vītola"
                    fill
                    sizes="44px"
                    className="object-cover object-top"
                  />
                </div>
              </div>

              {/* Quick Time Slots */}
              <div className="mt-3 grid grid-cols-3 gap-2">
                {["10:30", "13:00", "16:30"].map((slot) => (
                  <a
                    key={slot}
                    href="#pieraksts"
                    onClick={() => {
                      setSelectedPathway("women");
                      setSelectedServiceId("women_eval");
                      setSelectedDayIndex(1);
                      setSelectedTimeSlot(slot);
                      setSelectedSpecialist("elina");
                    }}
                    className="rounded-[12px] border border-black/15 bg-[#FFF9F4] py-2 text-center text-sm font-semibold text-[#24302D] transition-colors hover:border-[#D87967] hover:bg-[#D87967] hover:text-white min-h-[40px] flex items-center justify-center"
                  >
                    {slot}
                  </a>
                ))}
              </div>

              <div className="mt-3.5 space-y-1.5 border-t border-black/[0.06] pt-2.5">
                <p className="text-[11px] sm:text-xs text-[#4A5D57] font-medium">
                  {isEn
                    ? "Physiotherapy · Women's health · Baby & child care"
                    : isRu
                    ? "Физиотерапия · Женское здоровье · Дети и младенцы"
                    : "Fizioterapija · Sieviešu veselība · Zīdaiņu un bērnu aprūpe"}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#4A5D57]">
                    {isEn ? "Elīna Vītola · Lead Physiotherapist" : isRu ? "Элина Витола · Ведущий физиотерапевт" : "Elīna Vītola · Vadošā fizioterapeite"}
                  </span>
                  <a
                    href="#pieraksts"
                    className="text-xs font-semibold text-[#D87967] hover:underline"
                  >
                    {isEn ? "View all services & times →" : isRu ? "Все услуги и время →" : "Skatīt visus laikus →"}
                  </a>
                </div>
              </div>
            </motion.div>
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
              {isEn ? "Perhaps you recognise yourself here." : isRu ? "Возможно, вы узнаете себя здесь." : "Varbūt Jūs atpazīstat sevi šeit."}
            </h2>
            <p className="mt-4 text-lg sm:text-xl leading-relaxed text-[#4A5D57]">
              {isEn
                ? "People don't arrive with medical labels. They arrive with feelings, uncertainty, and a desire to feel comfortable in their body again."
                : isRu
                ? "Люди не приходят с названиями медицинских процедур. Они приходят с ощущениями, вопросами и желанием снова чувствовать себя уверенно в своем теле."
                : "Cilvēki pie mums nenāk ar pakalpojuma nosaukumu. Viņi nāk ar sajūtām, jautājumiem un vēlmi atkal justies labi savā ķermenī."}
            </p>
          </div>

          {/* DESKTOP (lg:grid): Left Sticky Changing Photo & Right 5 Editorial Rows */}
          <div className="hidden lg:grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            
            {/* LEFT 55%: Sticky Crossfading Photographic Atmosphere */}
            <div className="sticky top-28">
              <div
                style={{
                  borderRadius: "2.5rem 1.25rem 2.5rem 1.25rem",
                }}
                className="relative h-[520px] w-full overflow-hidden bg-[#F8E9E3] shadow-xs"
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
                      sizes="55vw"
                      className="object-cover object-center"
                    />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute bottom-5 left-5 right-5 rounded-xl bg-white/92 backdrop-blur-md px-5 py-3 text-sm font-medium text-[#24302D] border border-white/60">
                  {activeRec.imageAlt}
                </div>
              </div>
            </div>

            {/* RIGHT 45%: Typographic Editorial Rows — All 5 Situations Always Visible */}
            <div className="space-y-1">
              {recognitionItems.map((item, idx) => {
                const isActive = hoveredSituation === idx;
                return (
                  <motion.div
                    key={item.num}
                    onMouseEnter={() => setHoveredSituation(idx)}
                    onClick={() => setHoveredSituation(idx)}
                    onViewportEnter={() => setHoveredSituation(idx)}
                    viewport={{ margin: "-22% 0px -22% 0px" }}
                    className="cursor-pointer border-b border-black/[0.08] py-6 transition-all group"
                  >
                    <div className="flex items-baseline gap-5">
                      <span
                        className={`font-mono text-lg transition-colors ${
                          isActive ? "text-[#D87967] font-bold" : "text-[#24302D]/35 group-hover:text-[#24302D]/60"
                        }`}
                      >
                        {item.num}
                      </span>
                      <div className="flex-1">
                        <h3
                          className={`text-xl sm:text-[22px] leading-snug transition-colors ${
                            isActive ? "font-semibold text-[#24302D]" : "font-normal text-[#4A5D57] group-hover:text-[#24302D]"
                          }`}
                        >
                          {item.thought}
                        </h3>

                        {/* Supporting Explanation Always Visible */}
                        <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#4A5D57]">
                          {item.response}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>

          {/* MOBILE (lg:hidden): Natural Scrolling Story with Zero Concealment */}
          <div className="lg:hidden space-y-8">
            {recognitionItems.map((item, idx) => (
              <div key={item.num} className="border-b border-black/[0.08] pb-6 space-y-3">
                <div className="flex items-baseline gap-3.5">
                  <span className="font-mono text-base font-bold text-[#D87967]">
                    {item.num}
                  </span>
                  <h3 className="text-xl font-medium leading-snug text-[#24302D]">
                    {item.thought}
                  </h3>
                </div>

                <p className="text-base leading-relaxed text-[#4A5D57] pl-8">
                  {item.response}
                </p>

                {/* Alternating image vignettes for mobile */}
                {idx % 2 === 0 && (
                  <div className="relative h-48 w-full overflow-hidden rounded-2xl bg-[#F8E9E3] mt-3">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes="100vw"
                      className="object-cover object-center"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Editorial Transition */}
          <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-black/[0.06]">
            <p className="text-base text-[#4A5D57]">
              {isEn
                ? "Unsure about your situation? We listen and help guide your first step."
                : isRu
                ? "Не уверены насчет своей ситуации? Мы выслушаем и поможем определиться с первым шагом."
                : "Neesat pārliecināti par savu situāciju? Mēs uzklausām un palīdzam saprast pirmo soli."}
            </p>
            <a
              href="#jautajums"
              className="inline-flex items-center gap-2 text-base font-semibold text-[#D87967] hover:underline whitespace-nowrap"
            >
              <span>{isEn ? "Tell us what you're experiencing" : isRu ? "Расскажите нам о вашей ситуации" : "Pastāstiet mums, kas notiek"}</span>
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
                  alt={isEn ? "Elīna Vītola, Lead Physiotherapist" : isRu ? "Элина Витола, ведущий физиотерапевт" : "Elīna Vītola, fizioterapeite"}
                  fill
                  sizes="(max-width: 1024px) 100vw, 38vw"
                  className="object-cover object-top"
                />
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-[#4A5D57]">
                <span>Elīna Vītola</span>
                <span>{isEn ? "Lead physiotherapist" : isRu ? "Ведущий физиотерапевт" : "Vadošā fizioterapeite"}</span>
              </div>
            </motion.div>

            {/* RIGHT (~62%): Story, Intimate Strip, Experience Focus */}
            <div className="relative">
              
              {/* Personal Identity Tag */}
              <div className="border-b border-black/[0.08] pb-4">
                <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#D87967]">
                  Elīna Vītola
                </p>
                <p className="text-base sm:text-lg font-medium text-[#4A5D57] mt-0.5">
                  {isEn ? "Lead physiotherapist · movement therapist" : isRu ? "Ведущий физиотерапевт · двигательный терапевт" : "Vadošā fizioterapeite · kustību terapeite"}
                </p>
              </div>

              {/* Core Quote */}
              <h2 className="mt-6 text-3xl sm:text-4xl lg:text-[3rem] font-medium leading-[1.12] tracking-tight text-[#24302D]">
                {isEn
                  ? "“First, I want to understand your story.”"
                  : isRu
                  ? "«Сначала я хочу понять вашу историю.»"
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
                ) : isRu ? (
                  <>
                    <p>
                      Каждый человек двигается по-своему — и каждый приходит со своим опытом, повседневным ритмом и причиной, почему телу сейчас требуется особое внимание.
                    </p>
                    <p>
                      Поэтому на первом визите я не спешу выдавать список упражнений. Сначала мы обсуждаем, что изменилось, что вы хотите вернуть и как тело движется в целом.
                    </p>
                    <p className="font-semibold text-[#24302D]">
                      Только после этого мы составляем план, который реально вписывается в вашу жизнь.
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
                  {isEn ? "Why physiotherapy?" : isRu ? "Почему физиотерапия?" : "Kāpēc fizioterapija?"}
                </p>
                <p className="mt-2 text-base sm:text-lg italic leading-relaxed text-[#3D4F4A]">
                  {isEn
                    ? "“I have always been fascinated by the moment when someone begins trusting their body again. Not only when pain subsides, but when the confidence to move returns.”"
                    : isRu
                    ? "«Меня всегда вдохновлял момент, когда человек снова начинает доверять своему телу. Не просто когда утихает боль, а когда возвращается уверенность в каждом движении.»"
                    : "“Man vienmēr interesējis brīdis, kad cilvēks atkal sāk uzticēties savam ķermenim. Ne tikai tas, ka sāpes mazinās, bet ka atgriežas drošība kustēties.”"}
                </p>
              </div>

              {/* Experience Focus Areas */}
              <div className="mt-8 grid gap-6 sm:grid-cols-2 border-t border-black/[0.08] pt-6">
                <div>
                  <p className="text-sm font-semibold text-[#24302D] mb-2.5">
                    {isEn ? "Focus areas:" : isRu ? "Основные направления:" : "Galvenie virzieni:"}
                  </p>
                  <ul className="space-y-1.5 text-base text-[#4A5D57]">
                    <li>{isEn ? "• Women's health" : isRu ? "• Женское здоровье" : "• Sieviešu veselība"}</li>
                    <li>{isEn ? "• Spinal & joint rehabilitation" : isRu ? "• Реабилитация позвоночника и суставов" : "• Muguras un locītavu rehabilitācija"}</li>
                    <li>{isEn ? "• Movement therapy" : isRu ? "• Двигательная терапия" : "• Kustību terapija"}</li>
                    <li>{isEn ? "• Postpartum recovery" : isRu ? "• Восстановление после родов" : "• Pēcdzemdību atjaunošanās"}</li>
                  </ul>
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#24302D] mb-2.5">
                    {isEn ? "Outside practice:" : isRu ? "Вне практики:" : "Ārpus prakses:"}
                  </p>
                  <p className="text-base text-[#4A5D57] leading-relaxed">
                    {isEn
                      ? "Long walks · open-water swimming · good coffee"
                      : isRu
                      ? "Долгие прогулки · плавание · хороший кофе"
                      : "Garas pastaigas · peldēšana · laba kafija"}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-black/[0.08] pt-6">
                <div className="flex flex-wrap items-center gap-5">
                  <a
                    href="#pieraksts"
                    onClick={() => {
                      setSelectedPathway("women");
                      setSelectedServiceId("women_eval");
                      setSelectedSpecialist("elina");
                      setSelectedDayIndex(1);
                      setSelectedTimeSlot("10:30");
                    }}
                    style={{ backgroundColor: "#24302D", color: "#FFF9F4" }}
                    className="rounded-full px-8 py-4 text-sm font-semibold hover:bg-[#D87967] transition-colors min-h-[48px] flex items-center justify-center shadow-xs"
                  >
                    {isEn ? "Book with Elīna →" : isRu ? "Записаться к Элине →" : "Pieteikt vizīti pie Elīnas →"}
                  </a>
                  <a
                    href="#nodalas"
                    className="text-base font-medium text-[#4A5D57] hover:text-[#24302D] underline py-2"
                  >
                    {isEn ? "Explore focus areas" : isRu ? "Направления практики" : "Iepazīt prakses virzienus"}
                  </a>
                </div>

                {/* Secondary In-Practice Photo */}
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

              <div className="mt-6 pt-3 border-t border-black/[0.06]">
                <p className="text-xs text-[#4A5D57] opacity-60">
                  {isEn ? "Demonstration profile created for this concept." : isRu ? "Демонстрационный профиль, созданный для концепта." : "Demonstrācijas profils, kas izveidots šim konceptam."}
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. FOUR BESPOKE SPECIALISM STORYTELLING CHAPTERS            */}
      {/* ============================================================ */}
      <section id="nodalas" className="relative">
        
        {/* CHAPTER 1: SĀPES & ATVESEĻOŠANĀS */}
        <div
          id="sapes"
          style={{
            background: "linear-gradient(180deg, #FFF9F4 0%, #FAF1EC 100%)",
          }}
          className="py-20 sm:py-28 lg:py-36 overflow-hidden"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
            <div className="grid lg:grid-cols-[1.15fr_0.85fr] items-center">
              
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={chapterImageVariants}
                className="relative h-[360px] sm:h-[480px] lg:h-[540px] w-full overflow-hidden rounded-3xl lg:rounded-l-3xl lg:rounded-r-none bg-[#F8E9E3]"
              >
                <Image
                  src="/concept-physio/gentle-movement.jpg"
                  alt={isEn ? "Physical recovery & gentle rehabilitation" : "Mugurkaula un locītavu atveseļošana"}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-center"
                />
              </motion.div>

              <div className="mt-8 lg:mt-0 lg:-ml-16 relative z-10 lg:bg-[#FFF9F4]/95 lg:backdrop-blur-md lg:p-10 lg:rounded-3xl">
                <svg className="w-36 h-8 mb-3 text-[#D87967]" viewBox="0 0 160 32" fill="none">
                  <motion.path
                    d="M 5,20 C 45,5 115,28 155,14"
                    stroke="#D87967"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: easeOrganic }}
                  />
                </svg>

                <h2 className="text-2xl sm:text-4xl lg:text-[2.6rem] font-medium text-[#24302D] leading-[1.16]">
                  {isEn ? "Return to movement you can trust again." : isRu ? "Вернитесь к движениям, которым снова можно доверять." : "Atgriezties pie kustības, kurai atkal var uzticēties."}
                </h2>

                <div className="mt-5 space-y-4 text-lg sm:text-[19px] leading-relaxed text-[#3D4F4A]">
                  <p>
                    {isEn
                      ? "Pain changes how we sit, walk, sleep, and think about our bodies. It creates hesitation and strain."
                      : isRu
                      ? "Боль меняет то, как мы сидим, ходим, спим и относимся к своему телу, создавая постоянное напряжение."
                      : "Sāpes bieži maina to, kā mēs kustamies, strādājam, guļam un pat domājam par savu ķermeni."}
                  </p>
                  <p>
                    {isEn
                      ? "We start with what troubles you most, evaluate full movement patterns, and build a safe roadmap back without strain."
                      : isRu
                      ? "Мы начинаем с того, что беспокоит именно вас, оцениваем движения в целом и шаг за шагом возвращаем уверенность."
                      : "Mēs sākam ar to, kas traucē tieši Jums, izvērtējam kustību kopumā un soli pa solim veidojam ceļu atpakaļ uz drošu kustību — bez lieka stresa un pārslodzes."}
                  </p>
                </div>

                <p className="mt-6 text-base font-medium text-[#4A5D57]">
                  {isEn
                    ? "Back & neck relief · Post-injury rehab · Mobility restore"
                    : isRu
                    ? "Боль в спине и шее · Реабилитация после травм · Восстановление подвижности"
                    : "Muguras un kakla sāpes · Pēctraumu atjaunošanās · Kustību ierobežojumi"}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-6">
                  <a
                    href="#pieraksts"
                    onClick={() => {
                      setSelectedPathway("physio");
                      setSelectedServiceId("physio_first");
                      setSelectedSpecialist("marta");
                      setSelectedDayIndex(2);
                      setSelectedTimeSlot("09:30");
                    }}
                    style={{ backgroundColor: "#D87967", color: "#FFFFFF" }}
                    className="rounded-full px-8 py-4 text-center text-sm font-semibold hover:bg-[#C26553] min-h-[48px] flex items-center justify-center shadow-xs"
                  >
                    {isEn ? "Book rehabilitation session →" : isRu ? "Записаться на реабилитацию →" : "Pieteikt rehabilitācijas vizīti →"}
                  </a>
                  <a href="#cenas" className="text-base font-medium text-[#4A5D57] hover:text-[#24302D] underline py-2">
                    {isEn ? "View pricing" : isRu ? "Цены" : "Skatīt cenrādi"}
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
            background: "linear-gradient(180deg, #FAF1EC 0%, #F8E9E3 50%, #FAF0EB 100%)",
          }}
          className="py-20 sm:py-28 lg:py-36 overflow-hidden"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              
              <div>
                <p className="font-serif italic text-lg text-[#D87967] mb-2.5">
                  {isEn ? "more room to breathe" : isRu ? "больше легкости и дыхания" : "vairāk vietas elpai"}
                </p>

                <h2 className="text-2xl sm:text-4xl lg:text-[2.6rem] font-medium text-[#24302D] leading-[1.16]">
                  {isEn ? "Your body is changing. You don't have to navigate it alone." : isRu ? "Тело меняется. Вам не нужно проходить через это в одиночку." : "Ķermenis mainās. Jums nav tas jāizdzīvo vienai."}
                </h2>

                <div className="mt-5 space-y-4 text-lg sm:text-[19px] leading-relaxed text-[#3D4F4A]">
                  <p>
                    {isEn
                      ? "During pregnancy, joint ligaments loosen and the pelvic girdle takes on unfamiliar load. It's natural, but persistent discomfort doesn't have to be endured."
                      : isRu
                      ? "Во время беременности связки становятся эластичнее, а поясница и таз получают непривычную нагрузку. Это естественно, но боль не нужно терпеть."
                      : "Gaidību laikā mainās smaguma centrs, locītavu saites kļūst elastīgākas, un muguras jostas daļa un iegurnis saņem nepierastu slodzi. Tas ir dabisks process, taču tas nenozīmē, ka sāpes ir jāpacieš."}
                  </p>
                  <p>
                    {isEn
                      ? "We help you discover more comfortable movement, breathing, and relaxation techniques throughout pregnancy and birth preparation."
                      : isRu
                      ? "Мы помогаем найти удобные движения, техники дыхания и расслабления во время беременности и подготовки к родам."
                      : "Mēs palīdzam atrast ērtākas kustības, elpošanas un atslābināšanās paņēmienus grūtniecības un dzemdību sagatavošanās laikā."}
                  </p>
                </div>

                <p className="mt-6 text-base font-medium text-[#4A5D57]">
                  {isEn
                    ? "Pelvic & lumbar relief · Birth prep breathing · Gentle taping"
                    : isRu
                    ? "Разгрузка таза и поясницы · Дыхание для родов · Мягкое тейпирование"
                    : "Iegurņa un muguras atslogošana · Elpošana dzemdību sagatavošanai · Saudzīga teipošana"}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-6">
                  <a
                    href="#pieraksts"
                    onClick={() => {
                      setSelectedPathway("women");
                      setSelectedServiceId("women_eval");
                      setSelectedSpecialist("elina");
                      setSelectedDayIndex(1);
                      setSelectedTimeSlot("10:30");
                    }}
                    style={{ backgroundColor: "#24302D", color: "#FFF9F4" }}
                    className="rounded-full px-8 py-4 text-center text-sm font-semibold hover:bg-[#D87967] min-h-[48px] flex items-center justify-center"
                  >
                    {isEn ? "Book prenatal care session →" : isRu ? "Записаться на консультацию →" : "Pieteikt grūtniecības vizīti →"}
                  </a>
                  <span className="text-base text-[#4A5D57]">{isEn ? "Led by Elīna Vītola" : isRu ? "Принимает Элина Витола" : "Pieņem Elīna Vītola"}</span>
                </div>
              </div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={chapterImageVariants}
                className="relative h-[380px] sm:h-[500px] lg:h-[580px] w-full overflow-hidden rounded-3xl lg:rounded-l-[80px] lg:rounded-r-none bg-[#FFF9F4]"
              >
                <Image
                  src="/concept-physio/service-women.jpg"
                  alt={isEn ? "Prenatal gentle physiotherapy" : "Grūtnieču saudzīgā fizioterapija un aprūpe"}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-[center_25%]"
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* CHAPTER 3: PĒC DZEMDĪBĀM */}
        <div
          id="pecdzemdibam"
          style={{
            background: "linear-gradient(180deg, #FAF0EB 0%, #FFF7EF 50%, #F5EDE6 100%)",
          }}
          className="py-20 sm:py-28 lg:py-36 overflow-hidden"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-1 lg:gap-6">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={chapterImageVariants}
                  className="relative h-[240px] sm:h-[320px] lg:h-[340px] w-full overflow-hidden rounded-3xl bg-[#F8E9E3]"
                >
                  <Image
                    src="/concept-physio/hands-care.jpg"
                    alt={isEn ? "Tactile assessment and postpartum care" : "Diastāzes izvērtēšana un saudzīgs pieskāriens"}
                    fill
                    sizes="(max-width: 1024px) 50vw, 35vw"
                    className="object-cover object-center"
                  />
                </motion.div>

                <div className="relative h-[180px] sm:h-[220px] w-full overflow-hidden rounded-2xl bg-[#FFF9F4] hidden sm:block">
                  <Image
                    src="/concept-physio/service-movement.jpg"
                    alt={isEn ? "Quiet postural reconnection" : "Mierīga kustību atjaunošana"}
                    fill
                    sizes="(max-width: 1024px) 50vw, 35vw"
                    className="object-cover object-center"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <p className="font-serif italic text-lg text-[#D87967]">
                  {isEn ? "patience and care" : isRu ? "терпение и бережность" : "pacietība un saudzība"}
                </p>

                <h2 className="text-2xl sm:text-4xl lg:text-[2.6rem] font-medium text-[#24302D] leading-[1.16]">
                  {isEn ? "Giving your body time to restore without pressure." : isRu ? "Дать телу время восстановиться без давления." : "Dot ķermenim laiku atjaunoties bez steigas."}
                </h2>

                <div className="space-y-4 text-lg sm:text-[19px] leading-relaxed text-[#3D4F4A]">
                  <p>
                    {isEn
                      ? "The postpartum period requires patient listening. Abdominal separation (diastasis), pelvic floor changes, and daily carrying strains deserve thoughtful evaluation."
                      : isRu
                      ? "Послеродовой период требует бережного внимания. Диастаз, изменения тазового дна и ежедневное ношение малыша заслуживают внимательной оценки."
                      : "Pēcdzemdību periods prasa pacietīgu ieklausīšanos. Diastāze, iegurņa pamatnes muskuļu tonuss un ikdienas slodze ar mazuli uz rokām prasa saudzīgu pieeju."}
                  </p>
                  <p>
                    {isEn
                      ? "We safely evaluate tissue healing, posture alignment, and guide progressive return to everyday movement."
                      : isRu
                      ? "Мы безопасно оцениваем состояние тканей, осанку и направляем постепенное возвращение к привычной активности."
                      : "Mēs droši pārbaudām audu stāvokli, stāju un palīdzam atgriezties pie kustībām ar pārliecību."}
                  </p>
                </div>

                <div className="pt-2">
                  <a
                    href="#pieraksts"
                    onClick={() => {
                      setSelectedPathway("women");
                      setSelectedServiceId("women_postpartum");
                      setSelectedSpecialist("elina");
                      setSelectedDayIndex(1);
                      setSelectedTimeSlot("13:00");
                    }}
                    style={{ backgroundColor: "#D87967", color: "#FFFFFF" }}
                    className="inline-block rounded-full px-8 py-4 text-sm font-semibold hover:bg-[#C26553] shadow-xs min-h-[48px]"
                  >
                    {isEn ? "Book postpartum recovery visit →" : isRu ? "Записаться на послеродовой визит →" : "Pieteikt pēcdzemdību vizīti →"}
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* CHAPTER 4: BĒRNI & ZĪDAIŅI */}
        <div
          id="berni"
          style={{
            background: "linear-gradient(180deg, #F5EDE6 0%, #FFF9F4 100%)",
          }}
          className="py-20 sm:py-28 lg:py-36 overflow-hidden"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              
              <div>
                <p className="font-serif italic text-lg text-[#D87967] mb-2.5">
                  {isEn ? "gentle first steps" : isRu ? "первые уверенные движения" : "pirmie drošie soļi"}
                </p>

                <h2 className="text-2xl sm:text-4xl lg:text-[2.6rem] font-medium text-[#24302D] leading-[1.16]">
                  {isEn ? "Supporting natural movement and milestones from the start." : isRu ? "Поддержка естественного движения и развития с первых месяцев." : "Dabiska kustību attīstība no pirmajiem mēnešiem."}
                </h2>

                <div className="mt-5 space-y-4 text-lg sm:text-[19px] leading-relaxed text-[#3D4F4A]">
                  <p>
                    {isEn
                      ? "Every baby develops along their own timeline. In a calm and unhurried setting, our pediatric therapist observes movement symmetry, rolling, crawling, and posture."
                      : isRu
                      ? "Каждый ребенок развивается в своем темпе. В спокойной обстановке детский физиотерапевт оценивает симметрию движений, перевороты, ползание и осанку."
                      : "Katrs mazulis attīstās savā ritmā. Mierīgā gaisotnē bērnu fizioterapeite izvērtē motoros posmus, simetriju, velšanos, rāpošanu un stāju."}
                  </p>
                  <p>
                    {isEn
                      ? "We empower parents with gentle handling techniques that easily integrate into feeding, dressing, holding, and daily play."
                      : isRu
                      ? "Мы обучаем родителей бережным приемам хендлинга, которые легко встроить в кормление, одевание и совместные игры."
                      : "Mēs iemācām vecākiem saudzīgu hendlingu, ko viegli iekļaut ikdienas aprūpē, ģērbšanā un rotaļās."}
                  </p>
                </div>

                <p className="mt-6 text-base font-medium text-[#4A5D57]">
                  {isEn
                    ? "Infant handling · Motor development · Child posture check"
                    : isRu
                    ? "Хендлинг младенцев · Моторное развитие · Проверка осанки ребенка"
                    : "Zīdaiņu hendlings · Motoro posmu novērtējums · Bērnu stāja"}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-6">
                  <a
                    href="#pieraksts"
                    onClick={() => {
                      setSelectedPathway("baby");
                      setSelectedServiceId("baby_infant");
                      setSelectedSpecialist("anna");
                      setSelectedDayIndex(3);
                      setSelectedTimeSlot("11:00");
                    }}
                    style={{ backgroundColor: "#24302D", color: "#FFF9F4" }}
                    className="rounded-full px-8 py-4 text-center text-sm font-semibold hover:bg-[#D87967] min-h-[48px] flex items-center justify-center"
                  >
                    {isEn ? "Book infant consultation →" : isRu ? "Консультация по развитию малыша →" : "Pieteikt mazuļa konsultāciju →"}
                  </a>
                  <span className="text-base text-[#4A5D57]">{isEn ? "Led by Anna Ozola" : isRu ? "Принимает Анна Озола" : "Pieņem Anna Ozola"}</span>
                </div>
              </div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={chapterImageVariants}
                className="relative h-[380px] sm:h-[480px] lg:h-[540px] w-full overflow-hidden rounded-3xl bg-[#FFF9F4] shadow-xs"
              >
                <Image
                  src="/concept-physio/service-children.jpg"
                  alt={isEn ? "Infant development and gentle handling" : "Zīdaiņu attīstība un saudzīgs hendlings"}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-center"
                />
              </motion.div>
            </div>
          </div>
        </div>

      </section>

      {/* ============================================================ */}
      {/* 5. FIRST VISIT JOURNEY (1200px CANVAS WITH CONTINUOUS LINE)  */}
      {/* ============================================================ */}
      <section id="vizite" className="py-20 sm:py-28 lg:py-36 bg-[#FFF9F4] border-t border-black/[0.06]">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
          
          <div className="max-w-3xl">
            <h2 className="text-3xl sm:text-5xl font-medium text-[#24302D] leading-[1.15]">
              {isEn ? "A first visit with zero unknowns." : isRu ? "Первый визит без неизвестности." : "Pirmā vizīte bez nezināmā."}
            </h2>
            <p className="mt-4 text-lg sm:text-xl text-[#4A5D57]">
              {isEn
                ? "You don't need to know which medical service to request. That's our job."
                : isRu
                ? "Вам не нужно заранее разбираться в медицинских терминах. Это наша задача."
                : "Jums nav jāzina, kāds pakalpojums Jums vajadzīgs. Tas ir mūsu darbs."}
            </p>
          </div>

          {/* DESKTOP: 1200px-wide Horizontal Storytelling Canvas */}
          <div className="hidden lg:block relative mt-20 max-w-[1200px]">
            
            {/* Continuous Organic Curved SVG Movement Line */}
            <div className="absolute top-12 left-0 right-0 pointer-events-none z-0">
              <svg className="w-full h-24" viewBox="0 0 1200 96" fill="none" preserveAspectRatio="none">
                <motion.path
                  d="M 30,50 C 220,10 400,90 600,45 C 800,5 980,85 1170,40"
                  stroke="#D87967"
                  strokeWidth="2"
                  strokeDasharray="4 8"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.45 }}
                  viewport={{ once: true }}
                  transition={{ duration: shouldReduceMotion ? 0.01 : 1.8, ease: easeOrganic }}
                />
              </svg>
            </div>

            {/* 4 Story Moments Interspersed with Tactile Detail Images */}
            <div className="grid grid-cols-4 gap-8 relative z-10">
              
              {/* Step 01 */}
              <div className="flex flex-col justify-between pr-4">
                <div>
                  <span className="font-mono text-4xl sm:text-5xl font-light text-[#D87967] block">
                    01
                  </span>
                  <h3 className="mt-4 text-xl font-medium text-[#24302D]">
                    {isEn ? "Let's talk first." : isRu ? "Сначала поговорим." : "Parunāsim."}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-[#4A5D57]">
                    {isEn
                      ? "You share your history, daily routine, and what feels uncomfortable or restricted."
                      : isRu
                      ? "Вы рассказываете свою историю, привычные нагрузки и то, что сейчас доставляет дискомфорт."
                      : "Jūs izstāstāt savu pieredzi, ikdienas slodzi un to, kas šobrīd rada diskomfortu."}
                  </p>
                </div>
                <div className="mt-8 relative h-32 w-full rounded-2xl overflow-hidden bg-[#F8E9E3] shadow-xs">
                  <Image
                    src="/concept-physio/warm-guidance.jpg"
                    alt="Attentive listening and consultation"
                    fill
                    sizes="260px"
                    className="object-cover object-center"
                  />
                </div>
              </div>

              {/* Step 02 */}
              <div className="flex flex-col justify-between px-2 pt-6">
                <div>
                  <span className="font-mono text-4xl sm:text-5xl font-light text-[#D87967] block">
                    02
                  </span>
                  <h3 className="mt-4 text-xl font-medium text-[#24302D]">
                    {isEn ? "Let's see how your body moves." : isRu ? "Посмотрим, как движется тело." : "Paskatīsimies, kā ķermenis kustas."}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-[#4A5D57]">
                    {isEn
                      ? "A gentle evaluation of movement patterns, posture, and muscular balance without provoking pain."
                      : isRu
                      ? "Бережная оценка паттернов движения, осанки и мышечного баланса без провокации боли."
                      : "Saudzīgs kustību, stājas un muskuļu balansa novērtējums bez sāpju provocēšanas."}
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-black/[0.06] text-xs text-[#D87967] font-medium">
                  {isEn ? "Gentle movement observation" : isRu ? "Бережное наблюдение движений" : "Saudzīga kustību vērošana"}
                </div>
              </div>

              {/* Step 03 */}
              <div className="flex flex-col justify-between px-2">
                <div>
                  <span className="font-mono text-4xl sm:text-5xl font-light text-[#D87967] block">
                    03
                  </span>
                  <h3 className="mt-4 text-xl font-medium text-[#24302D]">
                    {isEn ? "We explain what is happening." : isRu ? "Объясним происходящее." : "Izskaidrosim."}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-[#4A5D57]">
                    {isEn
                      ? "In simple, clear human language, we explain why your body is reacting this way."
                      : isRu
                      ? "Простым и понятным языком объясняем, почему тело реагирует именно так."
                      : "Vienkāršā, cilvēcīgā valodā izskaidrojam, kāpēc ķermenis reaģē tieši šādi."}
                  </p>
                </div>
                <div className="mt-8 relative h-32 w-full rounded-2xl overflow-hidden bg-[#F8E9E3] shadow-xs">
                  <Image
                    src="/concept-physio/hands-care.jpg"
                    alt="Tactile explanation and gentle therapy"
                    fill
                    sizes="260px"
                    className="object-cover object-center"
                  />
                </div>
              </div>

              {/* Step 04 */}
              <div className="flex flex-col justify-between pl-4 pt-6">
                <div>
                  <span className="font-mono text-4xl sm:text-5xl font-light text-[#D87967] block">
                    04
                  </span>
                  <h3 className="mt-4 text-xl font-medium text-[#24302D]">
                    {isEn ? "We agree on the next step." : isRu ? "Договоримся о следующем шаге." : "Vienosimies par nākamo soli."}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-[#4A5D57]">
                    {isEn
                      ? "A plan that realistically fits your daily life. 2–3 simple home habits without overwhelming routines."
                      : isRu
                      ? "План, который реально выполним в вашей жизни. 2–3 простых домашних навыка без перегрузки."
                      : "Plāns, kas ir reāli izpildāms Jūsu ikdienā. 2–3 vienkārši paradumi vai vingrojumi mājas videi bez pārslodzes."}
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-black/[0.06] text-xs text-[#D87967] font-medium">
                  {isEn ? "Realistic daily routine" : isRu ? "Реальный ежедневный план" : "Reāls ikdienas plāns"}
                </div>
              </div>

            </div>
          </div>

          {/* MOBILE / TABLET: Vertical Flow */}
          <div className="lg:hidden relative mt-14 pl-8 sm:pl-10">
            <div className="absolute top-2 bottom-6 left-3 sm:left-4 w-[2px] bg-gradient-to-b from-[#D87967]/60 via-[#D87967]/30 to-transparent pointer-events-none" />

            <div className="space-y-12">
              {/* Step 01 */}
              <div className="relative">
                <span className="absolute -left-8 sm:-left-10 top-0 font-mono text-2xl font-semibold text-[#D87967] bg-[#FFF9F4] pr-2">
                  01
                </span>
                <h3 className="text-xl font-medium text-[#24302D]">
                  {isEn ? "Let's talk first." : isRu ? "Сначала поговорим." : "Parunāsim."}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-[#4A5D57]">
                  {isEn
                    ? "You share your history, daily routine, and what feels uncomfortable or restricted."
                    : isRu
                    ? "Вы рассказываете свою историю, привычные нагрузки и то, что сейчас доставляет дискомфорт."
                    : "Jūs izstāstāt savu pieredzi, ikdienas slodzi un to, kas šobrīd rada diskomfortu."}
                </p>
                <div className="mt-4 relative h-40 w-full rounded-2xl overflow-hidden bg-[#F8E9E3]">
                  <Image
                    src="/concept-physio/warm-guidance.jpg"
                    alt="Attentive listening and consultation"
                    fill
                    sizes="100vw"
                    className="object-cover object-center"
                  />
                </div>
              </div>

              {/* Step 02 */}
              <div className="relative">
                <span className="absolute -left-8 sm:-left-10 top-0 font-mono text-2xl font-semibold text-[#D87967] bg-[#FFF9F4] pr-2">
                  02
                </span>
                <h3 className="text-xl font-medium text-[#24302D]">
                  {isEn ? "Let's see how your body moves." : isRu ? "Посмотрим, как движется тело." : "Paskatīsimies, kā ķermenis kustas."}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-[#4A5D57]">
                  {isEn
                    ? "A gentle evaluation of movement patterns, posture, and muscular balance without provoking pain."
                    : isRu
                    ? "Бережная оценка паттернов движения, осанки и мышечного баланса без провокации боли."
                    : "Saudzīgs kustību, stājas un muskuļu balansa novērtējums bez sāpju provocēšanas."}
                </p>
              </div>

              {/* Step 03 */}
              <div className="relative">
                <span className="absolute -left-8 sm:-left-10 top-0 font-mono text-2xl font-semibold text-[#D87967] bg-[#FFF9F4] pr-2">
                  03
                </span>
                <h3 className="text-xl font-medium text-[#24302D]">
                  {isEn ? "We explain what is happening." : isRu ? "Объясним происходящее." : "Izskaidrosim."}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-[#4A5D57]">
                  {isEn
                    ? "In simple, clear human language, we explain why your body is reacting this way."
                    : isRu
                    ? "Простым и понятным языком объясняем, почему тело реагирует именно так."
                    : "Vienkāršā, cilvēcīgā valodā izskaidrojam, kāpēc ķermenis reaģē tieši šādi."}
                </p>
                <div className="mt-4 relative h-40 w-full rounded-2xl overflow-hidden bg-[#F8E9E3]">
                  <Image
                    src="/concept-physio/hands-care.jpg"
                    alt="Tactile explanation and gentle therapy"
                    fill
                    sizes="100vw"
                    className="object-cover object-center"
                  />
                </div>
              </div>

              {/* Step 04 */}
              <div className="relative">
                <span className="absolute -left-8 sm:-left-10 top-0 font-mono text-2xl font-semibold text-[#D87967] bg-[#FFF9F4] pr-2">
                  04
                </span>
                <h3 className="text-xl font-medium text-[#24302D]">
                  {isEn ? "We agree on the next step." : isRu ? "Договоримся о следующем шаге." : "Vienosimies par nākamo soli."}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-[#4A5D57]">
                  {isEn
                    ? "A plan that realistically fits your daily life. 2–3 simple home habits without overwhelming routines."
                    : isRu
                    ? "План, который реально выполним в вашей жизни. 2–3 простых домашних навыка без перегрузки."
                    : "Plāns, kas ir reāli izpildāms Jūsu ikdienā. 2–3 vienkārši paradumi vai vingrojumi mājas videi bez pārslodzes."}
                </p>
              </div>
            </div>
          </div>

          {/* Information Below: Elegant Single Text Bar */}
          <div className="mt-16 sm:mt-20 border-t border-black/[0.08] pt-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm sm:text-base text-[#3D4F4A]">
              <span className="font-semibold uppercase tracking-wider text-[#D87967] text-xs sm:text-sm">
                {isEn ? "Before your visit" : isRu ? "Перед визитом" : "Pirms vizītes"}
              </span>
              <span className="hidden sm:inline text-black/30">|</span>
              <p className="leading-relaxed">
                <span>{isEn ? "Comfortable clothing" : isRu ? "Удобная одежда" : "Ērts apģērbs"}</span>
                <span className="mx-2 text-[#D87967]">·</span>
                <span>{isEn ? "Bring previous medical imaging if available" : isRu ? "Возьмите результаты обследований, если есть" : "Ja ir izmeklējumi, paņemiet tos līdzi"}</span>
                <span className="mx-2 text-[#D87967]">·</span>
                <span>{isEn ? "Arrive 5 minutes before your time" : isRu ? "Приходите за 5 минут до начала" : "Ierodieties 5 minūtes agrāk"}</span>
              </p>
            </div>

            <a
              href="#pieraksts"
              style={{ backgroundColor: "#D87967", color: "#FFFFFF" }}
              className="rounded-full px-8 py-3.5 text-center text-sm font-semibold whitespace-nowrap hover:bg-[#C26553] shadow-xs min-h-[46px] flex items-center justify-center self-start md:self-auto"
            >
              {isEn ? "Book first visit →" : isRu ? "Записаться на прием →" : "Pieteikt pirmo vizīti →"}
            </a>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. PRACTITIONER TRIPTYCH                                     */}
      {/* ============================================================ */}
      <section id="specialistes" className="py-20 sm:py-28 lg:py-36 bg-[#FFF9F4] border-t border-black/[0.06]">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
          
          <div className="max-w-3xl mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-5xl font-medium text-[#24302D] leading-tight">
              {isEn ? "Physiotherapy Roles & Focus Areas" : isRu ? "Направления практики и специалисты" : "Fizioterapijas lomas un virzieni"}
            </h2>
            <p className="mt-4 text-lg sm:text-xl text-[#4A5D57]">
              {isEn
                ? "Demonstration practitioner profiles."
                : isRu
                ? "Демонстрационные профили специалистов практики."
                : "Prakses speciālistu profili (paraugs)."}
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
                      onClick={() => {
                        setSelectedSpecialist(person.id);
                        if (person.id === "elina") {
                          setSelectedPathway("women");
                          setSelectedServiceId("women_eval");
                          setSelectedDayIndex(1);
                          setSelectedTimeSlot("10:30");
                        } else if (person.id === "marta") {
                          setSelectedPathway("physio");
                          setSelectedServiceId("physio_first");
                          setSelectedDayIndex(2);
                          setSelectedTimeSlot("09:30");
                        } else {
                          setSelectedPathway("baby");
                          setSelectedServiceId("baby_infant");
                          setSelectedDayIndex(3);
                          setSelectedTimeSlot("11:00");
                        }
                      }}
                      className="inline-flex items-center gap-2 text-base font-semibold text-[#D87967] hover:underline transition-colors py-1"
                    >
                      <span>
                        {isEn
                          ? `See ${person.name.split(" ")[0]}'s available sessions`
                          : isRu
                          ? `Смотреть свободные часы (${person.name.split(" ")[0]})`
                          : person.id === "elina"
                          ? "Skatīt Elīnas pieejamos laikus"
                          : person.id === "marta"
                          ? "Skatīt Martas pieejamos laikus"
                          : "Skatīt Annas pieejamos laikus"}
                      </span>
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
      {/* 7. TRANSPARENCY: SERVICE RATES & DIRECT SHORTCUTS            */}
      {/* ============================================================ */}
      <section id="cenas" className="py-20 sm:py-28 lg:py-36 bg-[#FFF7EF] border-t border-black/[0.06]">
        <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-12">
          <div>
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#D87967] block">
              {isEn ? "Transparent Rates" : isRu ? "Прозрачные цены" : "Cenrādis"}
            </span>
            <h2 className="mt-2 text-3xl sm:text-5xl font-medium text-[#24302D]">
              {isEn ? "Example service rates" : isRu ? "Примеры стоимости услуг" : "Piemēra pakalpojumu cenas"}
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#4A5D57]">
              {isEn
                ? "Demonstration pricing shown for reference. All essential session materials are included."
                : isRu
                ? "Демонстрационный прейскурант. Все необходимые для занятия материалы включены в стоимость."
                : "Demonstrācijas cenrādis paraugam. Visi nodarbībai nepieciešamie materiāli ir iekļauti vizītes cenā."}
            </p>
          </div>

          {/* Flat Typographic Price Rows */}
          <div className="mt-12 space-y-2">
            {pricingList.map((srv) => (
              <div key={srv.id} className="border-b border-black/[0.08] py-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-baseline justify-between sm:justify-start gap-4">
                    <span className="text-xl sm:text-2xl font-medium text-[#24302D]">
                      {srv.title}
                    </span>
                    <span className="text-2xl sm:text-3xl font-bold text-[#24302D] sm:hidden">
                      {srv.price}
                    </span>
                  </div>
                  <p className="mt-2 text-base text-[#4A5D57]">
                    {srv.desc} · <span className="font-medium text-[#24302D]">{srv.duration}</span>
                  </p>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-6 shrink-0">
                  <span className="hidden sm:inline text-2xl sm:text-3xl font-bold text-[#24302D]">
                    {srv.price}
                  </span>
                  <a
                    href="#pieraksts"
                    onClick={() => {
                      setSelectedPathway(srv.pathway);
                      setSelectedServiceId(srv.id);
                    }}
                    className="inline-flex items-center gap-1.5 text-sm sm:text-base font-semibold text-[#D87967] hover:underline"
                  >
                    <span>{isEn ? "Book this →" : isRu ? "Записаться →" : "Pieteikt šo vizīti →"}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs text-[#4A5D57]">
            {isEn ? "Demonstration pricing shown for reference." : isRu ? "Демонстрационный прейскурант для ознакомления." : "Cenas norādītas kā demonstrācijas paraugs."}
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. PATIENT EXPERIENCE — 3 VISIBLE STORY MOMENTS              */}
      {/* ============================================================ */}
      <section
        id="stasti"
        style={{
          backgroundColor: "#FFF9F4",
        }}
        className="py-20 sm:py-28 lg:py-36 border-t border-black/[0.06]"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-12">
          
          {/* Section Heading */}
          <div className="max-w-3xl mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-5xl font-medium text-[#24302D] leading-[1.18]">
              {isEn
                ? "What is essential for someone to feel after their first session?"
                : isRu
                ? "Что человеку важно почувствовать после первого визита?"
                : "Kas cilvēkam ir svarīgi sajust pēc pirmās vizītes?"}
            </h2>
          </div>

          {/* Three Visible Story Moments */}
          <div className="space-y-20 sm:space-y-28">
            
            {/* MOMENT 01: UNDERSTANDING (Text Left / Image Right) */}
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.7, ease: easeOrganic }}
              className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center"
            >
              <div>
                <span className="font-mono text-sm font-bold text-[#D87967] uppercase tracking-wider block">
                  01 · {isEn ? "UNDERSTANDING" : isRu ? "ПОНИМАНИЕ" : "IZPRATNE"}
                </span>
                <h3 className="mt-3 text-3xl sm:text-4xl lg:text-[2.6rem] font-medium leading-[1.12] text-[#24302D]">
                  {isEn ? "Understand what's happening." : isRu ? "Понять, что происходит." : "Saprast, kas notiek."}
                </h3>
                <p className="mt-5 text-lg sm:text-xl leading-relaxed text-[#3D4F4A]">
                  {isEn
                    ? "Not merely receive an exercise checklist, but understand why your body responds this way and what the next steps are."
                    : isRu
                    ? "Не просто получить список упражнений, а понять, почему тело реагирует именно так и что мы будем делать дальше."
                    : "Ne tikai saņemt vingrojumu sarakstu, bet saprast, kāpēc ķermenis reaģē tieši šādi un ko mēs darīsim tālāk."}
                </p>
              </div>

              <div
                style={{
                  borderRadius: "2.5rem 1.25rem 2.5rem 1.25rem",
                }}
                className="relative h-[300px] sm:h-[380px] w-full overflow-hidden bg-[#F8E9E3] shadow-xs"
              >
                <Image
                  src="/concept-physio/service-movement.jpg"
                  alt={isEn ? "Therapist explaining movement mechanics" : "Kustību skaidrojums un izvērtēšana"}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-center"
                />
              </div>
            </motion.div>

            {/* MOMENT 02: SAFETY (Photographic Editorial Moment Without Big Card Panel) */}
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.7, ease: easeOrganic }}
              className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center py-4"
            >
              <div className="order-2 lg:order-1">
                <span className="font-mono text-sm font-bold text-[#D87967] uppercase tracking-wider block">
                  02 · {isEn ? "SAFETY" : isRu ? "БЕЗОПАСНОСТЬ" : "DROŠĪBA"}
                </span>
                <h3 className="mt-3 text-3xl sm:text-4xl lg:text-[2.6rem] font-medium leading-[1.12] text-[#24302D]">
                  {isEn ? "Feel safe moving again." : isRu ? "Чувствовать безопасность в движениях." : "Justies droši kustēties."}
                </h3>
                <p className="mt-5 text-lg sm:text-xl leading-relaxed text-[#3D4F4A]">
                  {isEn
                    ? "After pain, injury, pregnancy or childbirth, confidence in movement can matter just as much as strength."
                    : isRu
                    ? "Особенно после травмы, боли или родов чувство безопасности часто так же важно, как само упражнение."
                    : "Īpaši pēc traumas, sāpēm vai dzemdībām drošības sajūta bieži ir tikpat svarīga kā pats vingrojums."}
                </p>
              </div>

              <div
                style={{
                  borderRadius: "1.25rem 2.5rem 1.25rem 2.5rem",
                }}
                className="relative h-[300px] sm:h-[380px] w-full overflow-hidden bg-[#F8E9E3] shadow-xs order-1 lg:order-2"
              >
                <Image
                  src="/concept-physio/hands-care.jpg"
                  alt={isEn ? "Supportive tactile physical therapy guidance" : "Saudzīga manuālā vadība"}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-center"
                />
              </div>
            </motion.div>

            {/* MOMENT 03: PRACTICALITY (Image Left / Text Right) */}
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.7, ease: easeOrganic }}
              className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center"
            >
              <div
                style={{
                  borderRadius: "1.25rem 2.5rem 1.25rem 2.5rem",
                }}
                className="relative h-[300px] sm:h-[380px] w-full overflow-hidden bg-[#F8E9E3] shadow-xs order-2 lg:order-1"
              >
                <Image
                  src="/concept-physio/warm-guidance.jpg"
                  alt={isEn ? "Practical movements tailored for home routine" : "Praktiski paradumi ikdienai"}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-center"
                />
              </div>

              <div className="order-1 lg:order-2">
                <span className="font-mono text-sm font-bold text-[#D87967] uppercase tracking-wider block">
                  03 · {isEn ? "PRACTICALITY" : isRu ? "ПРАКТИЧНОСТЬ" : "PRAKTISKUMS"}
                </span>
                <h3 className="mt-3 text-3xl sm:text-4xl lg:text-[2.6rem] font-medium leading-[1.12] text-[#24302D]">
                  {isEn ? "Know what to do at home." : isRu ? "Знать, что делать дома." : "Zināt, ko darīt mājās."}
                </h3>
                <p className="mt-5 text-lg sm:text-xl leading-relaxed text-[#3D4F4A]">
                  {isEn
                    ? "A few clear, realistic steps that fit daily life are more useful than a complicated plan that stays unused."
                    : isRu
                    ? "Несколько понятных, выполнимых шагов ценнее сложного плана, который останется нереализованным."
                    : "Daži konkrēti, izpildāmi soļi ir vērtīgāki par sarežģītu plānu, kas paliek neizmantots."}
                </p>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 9. CONTINUOUS BOOKING ARCHITECTURE (CALMED & REFINED)        */}
      {/* ============================================================ */}
      <section
        id="pieraksts"
        style={{
          backgroundColor: "#243A36",
        }}
        className="py-20 sm:py-28 lg:py-36 text-[#FFF9F4] relative overflow-hidden"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
            
            {/* LEFT: 4 Editorial Pathway Choices (Clean, Non-Card Style) */}
            <div>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#9FB8A6] block">
                {isEn ? "Appointments" : isRu ? "Запись на прием" : "Vizītes pieteikšana"}
              </span>
              <h2 className="mt-2 text-3xl sm:text-5xl font-medium text-[#FFF9F4] leading-[1.15]">
                {isEn ? "What would you like help with?" : isRu ? "С чем мы можем вам помочь?" : "Ar ko mēs varam Jums palīdzēt?"}
              </h2>

              <p className="mt-4 text-base sm:text-lg text-[#FFF9F4]/80">
                {isEn
                  ? "Select a care pathway below to view relevant appointment options and available specialist times."
                  : isRu
                  ? "Выберите направление, чтобы сразу увидеть подходящие виды консультаций и свободные часы специалистов."
                  : "Izvēlieties savu virzienu. Tas automātiski atlasīs atbilstošos vizīšu veidus un speciālistu pieejamos laikus."}
              </p>

              {/* Editorial Category List (Separated by Thin Hairlines, No Bulky Boxes) */}
              <div className="mt-8 divide-y divide-white/15 border-y border-white/15">
                {pathways.map((pathway) => {
                  const isActive = selectedPathway === pathway.id;
                  return (
                    <button
                      key={pathway.id}
                      type="button"
                      onClick={() => {
                        setSelectedPathway(pathway.id);
                        setSelectedServiceId(pathway.defaultService);
                        setSelectedSpecialist(pathway.defaultSpecialist);
                        setShowIntakeForm(false);
                      }}
                      className="w-full py-5 text-left transition-all flex items-center justify-between group cursor-pointer"
                    >
                      <div className="pr-4">
                        <div className="flex items-center gap-3">
                          {isActive && <span className="h-2 w-2 rounded-full bg-[#D87967] shrink-0" />}
                          <span className={`text-base sm:text-lg font-semibold tracking-wide transition-colors ${
                            isActive ? "text-[#D87967]" : "text-white group-hover:text-[#D87967]"
                          }`}>
                            {pathway.title}
                          </span>
                        </div>
                        <p className="mt-1 text-xs sm:text-sm text-[#FFF9F4]/75 pl-5">
                          {pathway.subtitle}
                        </p>
                      </div>

                      <div className="text-right shrink-0 flex items-center gap-3">
                        <span className="text-sm font-bold text-[#9FB8A6]">
                          {pathway.fromPrice}
                        </span>
                        <span className={`text-sm transition-transform group-hover:translate-x-1 ${
                          isActive ? "text-[#D87967] font-bold" : "text-white/40"
                        }`}>
                          →
                        </span>
                      </div>
                    </button>
                  );
                })}

                {/* 4th Route: Not sure what to choose */}
                <a
                  href="#jautajums"
                  className="w-full py-5 text-left transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="pr-4">
                    <span className="text-base sm:text-lg font-semibold text-[#D87967] group-hover:underline">
                      {isEn ? "NOT SURE WHAT TO CHOOSE?" : isRu ? "НЕ УВЕРЕНЫ, ЧТО ВЫБРАТЬ?" : "NEESAT PĀRLIECINĀTI, KO IZVĒLĒTIES?"}
                    </span>
                    <p className="mt-1 text-xs sm:text-sm text-[#FFF9F4]/75">
                      {isEn
                        ? "Tell us briefly what's happening — we'll help guide you"
                        : isRu
                        ? "Расскажите коротко о ситуации — мы поможем выбрать"
                        : "Pastāstiet mums, kas notiek — mēs palīdzēsim izvēlēties pirmo soli"}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-sm font-semibold text-[#D87967] group-hover:translate-x-1 inline-block transition-transform">→</span>
                  </div>
                </a>
              </div>

              {/* Demonstration Channels */}
              <div className="mt-8 pt-4 space-y-3 text-sm text-[#FFF9F4]/80">
                <p className="font-semibold text-[#9FB8A6]">
                  {isEn ? "Direct contact channels:" : isRu ? "Прямая связь:" : "Tiešā saziņa:"}
                </p>
                <div className="flex flex-wrap gap-2.5 pt-1">
                  <button
                    type="button"
                    onClick={showDemoToast}
                    className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs sm:text-sm text-white hover:bg-white/20 transition-colors min-h-[40px]"
                  >
                    <span>💬 WhatsApp</span>
                  </button>
                  <button
                    type="button"
                    onClick={showDemoToast}
                    className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs sm:text-sm text-white hover:bg-white/20 transition-colors min-h-[40px]"
                  >
                    <span>📞 Phone</span>
                  </button>
                  <button
                    type="button"
                    onClick={showDemoToast}
                    className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs sm:text-sm text-white hover:bg-white/20 transition-colors min-h-[40px]"
                  >
                    <span>✉️ Email</span>
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT: REFINED BOOKING SURFACE (CALM HIERARCHY: APPOINTMENT -> SPECIALIST -> TIME -> SUMMARY) */}
            <motion.div
              id="booking-card"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.7, ease: easeOrganic }}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "1.75rem",
                boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.4)",
              }}
              className="p-6 sm:p-9 text-[#24302D] border border-white"
            >
              {/* Header with Quiet Reassurance */}
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-black/[0.08] pb-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#D87967] block">
                    {isEn ? "Your visit" : isRu ? "Ваш визит" : "Jūsu vizīte"}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-semibold text-[#24302D] mt-0.5">
                    {currentPathwayObj.title}
                  </h3>
                </div>
                
                <span className="text-xs text-[#4A5D57]">
                  {isEn ? "Takes less than a minute" : isRu ? "Занимает меньше минуты" : "Aizņem mazāk par minūti"}
                </span>
              </div>

              {bookingCompleted ? (
                /* Confirmation State */
                <div className="py-8 text-center space-y-5">
                  <span
                    style={{ backgroundColor: "#F8E9E3", color: "#D87967" }}
                    className="inline-flex h-16 w-16 items-center justify-center rounded-full text-3xl font-bold"
                  >
                    ✓
                  </span>
                  
                  <div>
                    <h4 className="text-3xl sm:text-4xl font-medium text-[#24302D]">
                      {isEn ? "“See how simple that was.”" : isRu ? "«Вот как это просто.»" : "“Lūk, cik vienkārši.”"}
                    </h4>
                    <p className="mt-3 text-base sm:text-lg text-[#4A5D57] max-w-lg mx-auto">
                      {isEn
                        ? "No actual appointment was created — this is an interactive concept showcasing calm healthcare UX."
                        : isRu
                        ? "Запись не была создана — это интерактивный концепт, демонстрирующий спокойный UX для медицины."
                        : "Vizīte netika izveidota — šis ir interaktīvs dizaina koncepts."}
                    </p>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link
                      href={`/${locale}/case-studies/physiotherapy`}
                      style={{ backgroundColor: "#24302D", color: "#FFF9F4" }}
                      className="rounded-full px-8 py-3.5 text-sm font-semibold hover:bg-[#D87967] transition-colors min-h-[48px] flex items-center justify-center gap-2 shadow-xs"
                    >
                      <span>{isEn ? "See why Saiteo designed it this way →" : isRu ? "Узнать, почему Saiteo создал это так →" : "Uzzināt, kāpēc Saiteo to veidoja šādi →"}</span>
                    </Link>
                    
                    <button
                      type="button"
                      onClick={() => { setBookingCompleted(false); setShowIntakeForm(false); }}
                      className="rounded-full border border-black/15 bg-[#FFF9F4] px-6 py-3.5 text-sm font-semibold text-[#4A5D57] hover:border-black/30 min-h-[48px]"
                    >
                      {isEn ? "Try another booking" : isRu ? "Попробовать другое время" : "Izmēģināt citu vizītes laiku"}
                    </button>
                  </div>
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
                  <div className="rounded-[12px] bg-[#FFF9F4] p-4 text-sm sm:text-base text-[#24302D] border border-black/[0.08] flex items-center gap-3">
                    <div className="relative h-10 w-10 rounded-full overflow-hidden bg-[#F8E9E3] border border-[#D87967]/30 shrink-0">
                      <Image
                        src={currentSpecialistObj.image}
                        alt={currentSpecialistObj.name}
                        fill
                        sizes="40px"
                        className="object-cover object-top"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">{currentDayObj.fullDay} @ {selectedTimeSlot}</p>
                      <p className="text-xs text-[#4A5D57]">
                        {currentServiceObj.title} {isEn ? `with ${currentSpecialistObj.name}` : isRu ? `у специалиста ${currentSpecialistObj.name}` : `pie ${currentSpecialistObj.name}`} · <span className="font-bold text-[#D87967]">{currentServiceObj.price}</span>
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm sm:text-base font-medium text-[#24302D]">
                      {isEn ? "Full Name *" : isRu ? "Имя и фамилия *" : "Jūsu vārds, uzvārds *"}
                    </label>
                    <input
                      type="text"
                      required
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder={isEn ? "Anna Smith" : isRu ? "Анна Берзиня" : "Anna Bērziņa"}
                      className="mt-1.5 w-full rounded-[12px] border border-black/20 bg-[#FFF9F4] px-4 py-3 text-base text-[#24302D] focus:border-[#D87967] focus:outline-hidden min-h-[48px]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm sm:text-base font-medium text-[#24302D]">
                      {isEn ? "Phone number (for confirmation SMS) *" : isRu ? "Номер телефона (для SMS-подтверждения) *" : "Tālruņa numurs (SMS atgādinājumam) *"}
                    </label>
                    <input
                      type="tel"
                      required
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      placeholder="+371 20 000 000"
                      className="mt-1.5 w-full rounded-[12px] border border-black/20 bg-[#FFF9F4] px-4 py-3 text-base text-[#24302D] focus:border-[#D87967] focus:outline-hidden min-h-[48px]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm sm:text-base font-medium text-[#24302D]">
                      {isEn ? "Notes for therapist (optional)" : isRu ? "Примечания для специалиста (необязательно)" : "Piezīmes ārstei (pēc izvēles)"}
                    </label>
                    <input
                      type="text"
                      value={patientNote}
                      onChange={(e) => setPatientNote(e.target.value)}
                      placeholder={isEn ? "What discomfort are you currently experiencing?" : isRu ? "Что вас беспокоит в данный момент?" : "Kas šobrīd sagādā vislielāko diskomfortu?"}
                      className="mt-1.5 w-full rounded-[12px] border border-black/20 bg-[#FFF9F4] px-4 py-3 text-base text-[#24302D] focus:border-[#D87967] focus:outline-hidden min-h-[48px]"
                    />
                  </div>

                  <div className="flex items-center justify-between border-t border-black/[0.08] pt-4">
                    <button
                      type="button"
                      onClick={() => setShowIntakeForm(false)}
                      className="text-sm sm:text-base text-[#4A5D57] hover:underline py-2"
                    >
                      {isEn ? "← Change time" : isRu ? "← Изменить время" : "← Mainīt laiku"}
                    </button>
                    <button
                      type="submit"
                      style={{ backgroundColor: "#D87967", color: "#FFFFFF" }}
                      className="rounded-full px-8 py-3.5 text-sm font-semibold shadow-xs hover:bg-[#C26553] min-h-[48px] flex items-center justify-center"
                    >
                      {isEn ? "Confirm booking →" : isRu ? "Подтвердить запись →" : "Apstiprināt pieteikumu →"}
                    </button>
                  </div>
                </form>
              ) : (
                /* Continuous 4-Stage Hierarchy */
                <div className="mt-5 space-y-6">
                  
                  {/* A. APPOINTMENT (Only relevant services for selected category) */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#D87967]">
                        A. {isEn ? "Appointment Type" : isRu ? "Вид визита" : "Vizītes veids"}
                      </span>
                      <span className="text-xs text-[#4A5D57]">
                        {currentServiceObj.title} ({currentServiceObj.price})
                      </span>
                    </div>

                    <div className="space-y-2">
                      {currentPathwayServices.map((srv) => {
                        const isSelected = selectedServiceId === srv.id;
                        return (
                          <button
                            key={srv.id}
                            type="button"
                            onClick={() => setSelectedServiceId(srv.id)}
                            className={`w-full rounded-[12px] border p-3 sm:p-3.5 text-left transition-all flex items-center justify-between min-h-[58px] ${
                              isSelected
                                ? "border-[#D87967] bg-[#F8E9E3] font-medium shadow-xs ring-1 ring-[#D87967]"
                                : "border-black/15 bg-white hover:bg-[#FFF9F4]"
                            }`}
                          >
                            <div className="pr-3">
                              <p className="text-sm font-semibold text-[#24302D]">{srv.title}</p>
                              <p className="text-xs text-[#4A5D57] mt-0.5">{srv.duration} · {srv.desc}</p>
                            </div>
                            <span className="font-bold text-sm text-[#24302D] shrink-0">{srv.price}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* B. SPECIALIST (Horizontal Human Rows) */}
                  <div className="space-y-2.5 border-t border-black/[0.08] pt-5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#D87967]">
                        B. {isEn ? "Specialist" : isRu ? "Специалист" : "Speciāliste"}
                      </span>
                      <span className="text-xs font-semibold text-[#24302D]">
                        {currentSpecialistObj.name} · {currentSpecialistObj.role}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {specialists
                        .filter((spec) => spec.pathways.includes(selectedPathway) || selectedPathway === "physio")
                        .map((spec) => {
                          const isSelected = selectedSpecialist === spec.id;
                          return (
                            <button
                              key={spec.id}
                              type="button"
                              onClick={() => {
                                setSelectedSpecialist(spec.id);
                                if (spec.id === "elina") {
                                  setSelectedDayIndex(1);
                                  setSelectedTimeSlot("10:30");
                                } else if (spec.id === "marta") {
                                  setSelectedDayIndex(2);
                                  setSelectedTimeSlot("09:30");
                                } else {
                                  setSelectedDayIndex(3);
                                  setSelectedTimeSlot("11:00");
                                }
                              }}
                              className={`w-full rounded-[12px] border p-3 text-left transition-all flex items-center justify-between gap-3 min-h-[64px] ${
                                isSelected
                                  ? "border-[#D87967] bg-[#F8E9E3] font-medium shadow-xs ring-1 ring-[#D87967]"
                                  : "border-black/15 bg-white hover:bg-[#FFF9F4]"
                              }`}
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="relative h-11 w-11 rounded-full overflow-hidden border border-black/10 bg-[#FFF9F4] shrink-0">
                                  <Image src={spec.image} alt={spec.name} fill sizes="44px" className="object-cover object-top" />
                                </div>
                                <div className="min-w-0">
                                  <p className="text-sm font-semibold text-[#24302D] truncate">{spec.name}</p>
                                  <p className="text-xs text-[#4A5D57] truncate">{spec.role} · {spec.specialty}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3 shrink-0">
                                <span className="text-xs font-medium text-[#D87967] hidden sm:inline">
                                  {spec.nextSlot}
                                </span>
                                <span className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all ${
                                  isSelected ? "bg-[#D87967] text-white" : "bg-black/[0.06] text-[#24302D] hover:bg-black/10"
                                }`}>
                                  {isSelected ? (isEn ? "Selected ✓" : isRu ? "Выбрано ✓" : "Izvēlēta ✓") : (isEn ? "Select" : isRu ? "Выбрать" : "Izvēlēties")}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                    </div>
                  </div>

                  {/* C. TIME (Locale-Aware Date Strip with Correct Numbers & Time Chips) */}
                  <div className="space-y-2.5 border-t border-black/[0.08] pt-5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#D87967]">
                        C. {isEn ? "Time" : isRu ? "Время" : "Vizītes laiks"}
                      </span>
                      <span className="text-xs text-[#4A5D57]">
                        {isEn ? "7–11 September" : isRu ? "7–11 сентября" : "7.–11. septembris"}
                      </span>
                    </div>

                    {/* Weekday Strip with Explicit Day Numbers */}
                    <div className="grid grid-cols-5 gap-1.5">
                      {bookingDays.map((d, i) => (
                        <button
                          key={d.date}
                          type="button"
                          onClick={() => { setSelectedDayIndex(i); setSelectedTimeSlot(d.slots[0]); }}
                          className={`rounded-[12px] border p-2 text-center transition-all min-h-[52px] flex flex-col justify-center items-center ${
                            selectedDayIndex === i
                              ? "border-[#D87967] bg-[#F8E9E3] text-[#24302D] font-semibold ring-1 ring-[#D87967]"
                              : "border-black/15 bg-white text-[#4A5D57] hover:border-black/30"
                          }`}
                        >
                          <p className="text-[11px] opacity-75">{d.dayName}</p>
                          <p className="font-semibold text-sm mt-0.5 text-[#24302D]">
                            {d.dayNum}
                          </p>
                        </button>
                      ))}
                    </div>

                    {/* Time Chips */}
                    <div className="grid grid-cols-3 gap-2 pt-1">
                      {currentDayObj.slots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTimeSlot(slot)}
                          className={`rounded-[12px] border py-2 text-center text-sm font-semibold transition-all min-h-[40px] flex items-center justify-center ${
                            selectedTimeSlot === slot
                              ? "border-[#D87967] bg-[#D87967] text-white shadow-xs"
                              : "border-black/15 bg-white text-[#24302D] hover:border-black/30"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* D. SUMMARY & CONTINUE ACTION PANEL */}
                  <div className="rounded-[14px] bg-[#FFF9F4] p-4 border border-black/[0.08] mt-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-11 w-11 rounded-full overflow-hidden bg-[#F8E9E3] border border-[#D87967]/30 shrink-0">
                          <Image
                            src={currentSpecialistObj.image}
                            alt={currentSpecialistObj.name}
                            fill
                            sizes="44px"
                            className="object-cover object-top"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#24302D]">
                            {currentDayObj.fullDay} · {selectedTimeSlot}
                          </p>
                          <p className="text-xs text-[#4A5D57]">
                            {currentServiceObj.title} {isEn ? `with ${currentSpecialistObj.name.split(" ")[0]}` : isRu ? `у ${currentSpecialistObj.name.split(" ")[0]}` : `pie ${currentSpecialistObj.name.split(" ")[0]}s`} · <span className="font-semibold text-[#D87967]">{currentServiceObj.price}</span>
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setShowIntakeForm(true)}
                        style={{ backgroundColor: "#D87967", color: "#FFFFFF" }}
                        className="rounded-full px-7 py-3 text-center text-sm font-semibold shadow-xs hover:bg-[#C26553] whitespace-nowrap min-h-[44px] flex items-center justify-center self-start sm:self-auto"
                      >
                        {isEn ? "Continue to booking →" : isRu ? "Продолжить запись →" : "Turpināt pieteikumu →"}
                      </button>
                    </div>
                  </div>

                  {/* Microcopy */}
                  <div className="border-t border-black/[0.08] pt-3 flex items-center justify-between text-xs text-[#4A5D57]">
                    <span>{isEn ? "Not sure where to begin?" : isRu ? "Не уверены, с чего начать?" : "Nezināt, ko izvēlēties?"}</span>
                    <a href="#jautajums" className="text-[#D87967] font-semibold hover:underline p-1">
                      {isEn ? "Ask a question →" : isRu ? "Задать вопрос →" : "Uzdot jautājumu →"}
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
                {isEn ? "Not sure where to begin?" : isRu ? "Не уверены, с чего начать?" : "Neesat pārliecināti, ar ko sākt?"}
              </h2>
              <p className="mt-4 text-lg sm:text-xl leading-relaxed text-[#4A5D57]">
                {isEn
                  ? "Patients can ask a quick question or message on WhatsApp. The therapist reviews the situation and suggests the best specialist and first step."
                  : isRu
                  ? "Задайте вопрос здесь или напишите нам в WhatsApp. Наш специалист ознакомится с вашей ситуацией и порекомендует подходящий первый шаг."
                  : "Uzdodiet savu jautājumu šeit vai uzrakstiet mums WhatsApp. Mūsu fizioterapeite iepazīsies ar Jūsu situāciju un ieteiks piemērotāko speciālisti un pirmo soli."}
              </p>

              <div className="mt-8 space-y-3 border-t border-black/[0.08] pt-6 text-sm sm:text-base text-[#3D4F4A]">
                <p>
                  📍 <strong>{isEn ? "Location:" : isRu ? "Локация:" : "Atrašanās vieta:"}</strong> {isEn ? "Riga · demonstration location" : isRu ? "Рига · демонстрационная локация" : "Rīga · demonstrācijas lokācija"}
                </p>
                <p>
                  🕒 <strong>{isEn ? "Hours:" : isRu ? "Время работы:" : "Piemēra darba laiks:"}</strong> {isEn ? "Mon–Fri 08:30–19:30" : isRu ? "Пн–Пт 08:30–19:30" : "P.–Pk. 08:30–19:30"}
                </p>

                {/* Stylized Location Info */}
                <div className="mt-4 rounded-2xl border border-black/[0.08] bg-[#FFF9F4] p-4 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-[#F8E9E3] flex items-center justify-center text-[#D87967] shrink-0">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#D87967]">
                      {isEn ? "Central Practice in Riga" : isRu ? "Центральная практика в Риге" : "Prakses telpas Rīgā"}
                    </p>
                    <p className="text-xs text-[#4A5D57] mt-0.5">
                      {isEn ? "Quiet, accessible clinic space" : isRu ? "Спокойная, доступная среда" : "Mierīga, ērti pieejama vide"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contained Form */}
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
                    {isEn ? "Thank you for your message!" : isRu ? "Спасибо за сообщение!" : "Paldies par ziņu!"}
                  </h3>
                  <p className="mt-2 text-base text-[#4A5D57]">
                    {isEn
                      ? "Demo interaction — in a real project this connects securely to the practice's intake workflow."
                      : isRu
                      ? "Демонстрационное действие — на реальном сайте это направляется в систему клиники."
                      : "Demonstrācijas mijiedarbība — reālā projektā šis droši savienotos ar prakses pacientu pieņemšanas sistēmu."}
                  </p>
                  <button
                    type="button"
                    onClick={() => setInquirySent(false)}
                    style={{ backgroundColor: "#24302D", color: "#FFF9F4" }}
                    className="mt-5 rounded-full px-7 py-3 text-sm font-semibold min-h-[46px]"
                  >
                    {isEn ? "Send another note" : isRu ? "Отправить еще сообщение" : "Nosūtīt vēl vienu ziņu"}
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
                      {isEn ? "Name *" : isRu ? "Ваше имя *" : "Jūsu vārds *"}
                    </label>
                    <input
                      type="text"
                      required
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      placeholder={isEn ? "Anna" : isRu ? "Анна" : "Anna"}
                      className="mt-1.5 w-full rounded-xl border border-black/20 bg-[#FFF9F4] px-4 py-3 text-base text-[#24302D] focus:border-[#D87967] focus:outline-hidden min-h-[48px]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm sm:text-base font-medium text-[#24302D]">
                      {isEn ? "Phone or WhatsApp *" : isRu ? "Телефон или WhatsApp *" : "Tālrunis vai WhatsApp *"}
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
                      {isEn ? "Brief description of what you're feeling" : isRu ? "Кратко опишите, что вас беспокоит" : "Jautājums vai situācijas apraksts"}
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={inquiryText}
                      onChange={(e) => setInquiryText(e.target.value)}
                      placeholder={isEn ? "What discomfort are you experiencing?" : isRu ? "Что доставляет дискомфорт, как давно?" : "Kas Jums rada diskomfortu, cik ilgi, vai ir bijusi trauma vai izmeklējumi?"}
                      className="mt-1.5 w-full rounded-xl border border-black/20 bg-[#FFF9F4] px-4 py-3 text-base text-[#24302D] focus:border-[#D87967] focus:outline-hidden"
                    />
                  </div>

                  <button
                    type="submit"
                    style={{ backgroundColor: "#D87967", color: "#FFFFFF" }}
                    className="w-full rounded-full py-3.5 text-sm font-semibold shadow-xs hover:bg-[#C26553] min-h-[48px] flex items-center justify-center"
                  >
                    {isEn ? "Send inquiry" : isRu ? "Отправить вопрос" : "Nosūtīt jautājumu speciālistei"}
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
              {isEn ? "Frequently asked questions" : isRu ? "Часто задаваемые вопросы" : "Viss, kas jāzina pirms apmeklējuma"}
            </h2>
          </div>

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
                {isEn ? "Physiotherapy website concept by Saiteo" : isRu ? "Концепт сайта физиотерапии от Saiteo" : "Fizioterapijas tīmekļa vietnes koncepts"}
              </p>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#4A5D57]">
                {isEn
                  ? "Independent speculative design concept demonstrating human-centred healthcare UX. Not a real clinic."
                  : isRu
                  ? "Независимый дизайн-концепт, демонстрирующий человечный медицинский UX. Не является действующей клиникой."
                  : "Neatkarīgs dizaina koncepts, kas demonstrē cilvēcīgu un uzticamu veselības aprūpes lietotāja pieredzi. Tā nav reāla ārstniecības iestāde."}
              </p>
            </div>

            <div>
              <p className="text-base font-semibold text-[#24302D]">
                {isEn ? "Design Scope" : isRu ? "Объем концепта" : "Koncepta tvērums"}
              </p>
              <ul className="mt-3 space-y-2 text-sm sm:text-base text-[#4A5D57]">
                <li>{isEn ? "• Human-centred patient recognition" : isRu ? "• Узнавание ситуаций пациентов" : "• Pacientu situāciju atpazīšana"}</li>
                <li>{isEn ? "• Frictionless interactive appointment booking" : isRu ? "• Понятная и быстрая запись на прием" : "• Intuitīva vizīšu pieteikšana"}</li>
                <li>{isEn ? "• Demystified first visit journey" : isRu ? "• Понятный путь первого визита" : "• Pirmās vizītes gaitas skaidrojums"}</li>
              </ul>
            </div>

            <div>
              <p className="text-base font-semibold text-[#24302D]">
                {isEn ? "Studio Case Study" : isRu ? "Кейс студии" : "Stratēģiskais pētījums"}
              </p>
              <p className="mt-3 text-sm sm:text-base">
                <Link
                  href={`/${locale}/case-studies/physiotherapy`}
                  className="text-[#D87967] font-semibold underline"
                >
                  {isEn ? "Read the Saiteo Case Study →" : isRu ? "Читать кейс Saiteo →" : "Lasīt Saiteo stratēģijas analīzi →"}
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
                : isRu
                ? `© ${new Date().getFullYear()} Saiteo · KUSTĪBA — независимый исследовательский концепт.`
                : `© ${new Date().getFullYear()} Saiteo · KUSTĪBA ir neatkarīgs dizaina koncepts.`}
            </p>
            <div className="flex items-center gap-4">
              <Link href={`/${locale}/case-studies/physiotherapy`} className="text-[#24302D] hover:underline font-semibold py-1">
                {isEn ? "Case Study Breakdown →" : isRu ? "Анализ кейса →" : "Pētījuma analīze →"}
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
              <span>{isEn ? "Book visit" : isRu ? "Записаться на прием" : "Pieteikt vizīti"}</span>
              <span>→</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
