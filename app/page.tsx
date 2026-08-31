"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function PhysiotherapyConceptPage() {
  const [selectedDay, setSelectedDay] = useState("Otrdiena, 2. septembris");
  const [selectedTime, setSelectedTime] = useState("11:30");
  const [selectedService, setSelectedService] = useState("rehab");
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const days = [
    { label: "Pirmdiena", date: "1. sept.", full: "Pirmdiena, 1. septembris" },
    { label: "Otrdiena", date: "2. sept.", full: "Otrdiena, 2. septembris" },
    { label: "Trešdiena", date: "3. sept.", full: "Trešdiena, 3. septembris" },
    { label: "Ceturtdiena", date: "4. sept.", full: "Ceturtdiena, 4. septembris" },
    { label: "Piektdiena", date: "5. sept.", full: "Piektdiena, 5. septembris" },
  ];

  const times = ["09:00", "10:30", "11:30", "14:00", "16:00", "17:30", "18:30"];

  const carePaths = [
    {
      id: "rehab",
      title: "Muguras, kakla un locītavu sāpes",
      subtitle: "Pieaugušajiem · Sēdošs darbs · Pēctraumu atjaunošanās",
      image: "/concept-physio/service-rehab.jpg",
      quote: "Kad ilgstošs sēdošs darbs, spranda stīvums vai akūtas muguras sāpes traucē ikdienas dzīvei.",
      description:
        "Mēs neaprobežojamies ar īslaicīgu masāžu. Nodarbībā rūpīgi pārbaudām mugurkaula mobilitāti, iegurņa stabilitāti un elpošanas modeli, lai novērstu sāpju patieso cēloni.",
      points: [
        "Padziļināta primārā kustību un stājas diagnostika (60 min)",
        "Saudzīga manuālā terapija un sasprindzināto audu atbrīvošana",
        "Mērķtiecīgi vingrojumi, ko viegli integrēt mājas vai darba ritmā",
      ],
      price: "50 € / 60 min",
    },
    {
      id: "women",
      title: "Sieviešu veselība & pēcdzemdību periods",
      subtitle: "Gaidību laiks · Diastāze · Iegurņa pamatnes muskulatūra",
      image: "/concept-physio/service-women.jpg",
      quote: "Mierīgs, zinātniski pamatots atbalsts sievietes ķermenim pirms un pēc bērniņa piedzimšanas.",
      description:
        "Grūtniecības laikā palīdzam atslogot jostas daļu un sagatavot iegurni. Pēcdzemdību vizītē pārbaudām vēdera taisnā muskuļa diastāzi, iegurņa pamatni un atgriežam ķermenim spēku.",
      points: [
        "Pēcdzemdību funkcionālā pārbaude no 6. nedēļas pēc dzemdībām",
        "Diastāzes (vēdera taisnā muskuļa šķirtnes) saudzīga korekcija",
        "Iegurņa pamatnes muskuļu apzināšanās un nostiprināšana",
      ],
      price: "50 € / 60 min",
    },
    {
      id: "children",
      title: "Zīdaiņu motorā attīstība & hendlings",
      subtitle: "No 1 mēneša vecuma · Bērnu stāja · Vecāku apmācība",
      image: "/concept-physio/service-children.jpg",
      quote: "Mierīga vide, kur mazulis jūtas droši un vecāki gūst skaidru pārliecību par bērna attīstību.",
      description:
        "Praktiska apmācība pareizā hendlingā — kā mazuli celt, turēt un ģērbt, lai dabiski veicinātu velšanos, rāpošanu un simetrisku kustību kvalitāti bez asarām un lieka stresa.",
      points: [
        "Zīdaiņa motorās attīstības un muskuļu tonusa novērtēšana",
        "Praktiska hendlinga apmācība vecākiem ikdienas aprūpei",
        "Stājas un pēdu asimetriju profilakse pirmsskolas vecuma bērniem",
      ],
      price: "40 € – 45 € / 45 min",
    },
  ];

  const team = [
    {
      name: "Elīna Vītola",
      role: "Vadošā fizioterapeite · Prakses dibinātāja",
      experience: "12 gadu klīniskā pieredze · Sertificēta fizioterapeite",
      focus: "Sieviešu iegurņa veselība · Pēcdzemdību atjaunošanās · Holistiska kustību terapija",
      image: "/concept-physio/practitioner-primary.jpg",
      quote: "“Mans mērķis ir palīdzēt cilvēkam sajust savu ķermeni kā veselumu — bez bailēm no kustības un bez pastāvīgām sāpēm.”",
    },
    {
      name: "Marta Liepa",
      role: "Sertificēta fizioterapeite",
      experience: "8 gadu pieredze · Pēctraumu un sporta rehabilitācija",
      focus: "Akūtas muguras un kakla sāpes · Saišu un locītavu atjaunošanās · Kustību testi",
      image: "/concept-physio/practitioner-2.jpg",
      quote: "“Pareiza slodzes dozēšana un skaidra vingrojumu tehnika ļauj ātrāk atgriezties pie aktīvas ikdienas.”",
    },
    {
      name: "Anna Ozola",
      role: "Bērnu fizioterapeite · Hendlings",
      experience: "7 gadu pieredze · Zīdaiņu un mazuļu motorā attīstība",
      focus: "Zīdaiņu motorā diagnostika · Vecāku hendlinga apmācība · Mazuļu stāja",
      image: "/concept-physio/practitioner-3.jpg",
      quote: "“Mierīga, rotaļīga gaisotne nodarbībā ļauj bērnam atvērties kustībai dabiskā, drošā veidā.”",
    },
  ];

  const faqs = [
    {
      q: "Kas man jāņem līdzi uz pirmo vizīti?",
      a: "Ērts apģērbs, kas neierobežo kustības (t-krekls, mīkstas bikses vai legingi). Ja ir iepriekš veiktie izmeklējumi (rentgens, MRT, USG), ņemiet tos līdzi.",
    },
    {
      q: "Vai vizītei nepieciešams ārsta nosūtījums?",
      a: "Nē, privātai fizioterapeita konsultācijai ārsta nosūtījums nav obligāts. Mūsu speciālistes pašas veic pilnu funkcionālo novērtējumu un sastāda plānu.",
    },
    {
      q: "Vai pieņemat veselības apdrošināšanas polises?",
      a: "Jā, mēs izsniedzam oficiālu čeku un ārstniecības personas izrakstu ar visiem kodiem, ko apmaksā Balta, BTA, Compensa, Ergo, Gjensidige u.c.",
    },
    {
      q: "Kā nokļūt praksē un vai pieejams lifts?",
      a: "Atrodamies Miera ielā 24, klusā pagalma ēkas 2. stāvā. Ēkā ir ērts lifts — pie mums var ērti ierasties gan ar bērnu ratiņiem, gan personām ar kustību ierobežojumiem.",
    },
  ];

  return (
    <div style={{ backgroundColor: "#FAF7F2", color: "#232D29" }} className="min-h-screen w-full font-sans antialiased">
      {/* Top Persistent Saiteo Context Strip */}
      <aside style={{ backgroundColor: "#2D3732", color: "#FAF7F2" }} className="sticky top-0 z-50 flex items-center justify-between border-b border-white/10 px-4 py-2 text-xs shadow-sm">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-heading font-bold text-[#00C9A7]">
            saiteo
          </Link>
          <span className="text-white/30">/</span>
          <span className="rounded bg-[#00C9A7]/20 px-2 py-0.5 font-mono text-[10px] font-bold text-[#00C9A7]">
            NEATKARĪGS KONCEPTS
          </span>
          <span className="hidden text-white/70 sm:inline">
            Fizioterapijas prakses mājaslapas etalons
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/case-studies/physiotherapy"
            className="rounded bg-white/10 px-3 py-1 font-medium text-white transition-colors hover:bg-white/20"
          >
            Lasīt stratēģijas analīzi →
          </Link>
          <Link
            href="/#contact"
            className="hidden rounded bg-[#00C9A7] px-3 py-1 font-bold text-[#081020] transition-transform hover:scale-105 min-[540px]:inline-block"
          >
            Pieteikt savu mājaslapu
          </Link>
        </div>
      </aside>

      {/* Warm Sunlit Clinic Header */}
      <header style={{ backgroundColor: "rgba(250, 247, 242, 0.95)", borderColor: "rgba(35, 45, 41, 0.08)" }} className="sticky top-[37px] z-40 border-b backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
          <Link href="#top" className="group">
            <span style={{ color: "#232D29" }} className="font-heading text-2xl font-bold tracking-tight">
              KUSTĪBA
            </span>
            <span style={{ color: "#6E8B82" }} className="block text-[11px] font-semibold tracking-wider uppercase">
              Fizioterapijas & Kustību Prakse
            </span>
          </Link>

          <nav style={{ color: "rgba(35, 45, 41, 0.75)" }} className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a href="#stasts" className="transition-colors hover:text-[#232D29]">Par praksi</a>
            <a href="#virzieni" className="transition-colors hover:text-[#232D29]">Pakalpojumi</a>
            <a href="#specialisti" className="transition-colors hover:text-[#232D29]">Speciālisti</a>
            <a href="#vizite" className="transition-colors hover:text-[#232D29]">Pirmā vizīte</a>
            <a href="#cenas" className="transition-colors hover:text-[#232D29]">Cenrādis</a>
            <a href="#kontakti" className="transition-colors hover:text-[#232D29]">Kontakti</a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="tel:+37167000000"
              style={{ color: "rgba(35, 45, 41, 0.75)" }}
              className="hidden font-mono text-xs font-semibold sm:inline-block"
            >
              +371 67 000 000
            </a>
            <a
              href="#pieteikt"
              style={{ backgroundColor: "#232D29", color: "#FAF7F2" }}
              className="rounded-full px-5 py-2.5 text-xs font-bold shadow-xs transition-all hover:bg-[#384842]"
            >
              Pieteikt vizīti
            </a>
          </div>
        </div>
      </header>

      {/* Sunlit Warm Organic Hero (Zero Black, 100% Light & Warmth) */}
      <section id="top" style={{ backgroundColor: "#FAF7F2" }} className="relative overflow-hidden py-14 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div style={{ backgroundColor: "#EAE3D9", color: "#3B4D46" }} className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-semibold">
                <span style={{ backgroundColor: "#C86D51" }} className="h-2 w-2 rounded-full" />
                <span>Miera iela 24, Rīga · Pieņemšana 2–3 dienu laikā</span>
              </div>

              <h1 style={{ color: "#232D29" }} className="mt-6 font-heading text-4xl font-extrabold leading-[1.12] tracking-tight sm:text-5xl lg:text-[3.4rem]">
                Droša, mierīga vieta,<br />
                kur atgūt kustību brīvību.
              </h1>

              <p style={{ color: "rgba(35, 45, 41, 0.78)" }} className="mt-6 max-w-xl text-base leading-relaxed sm:text-lg">
                Fizioterapija un rehabilitācija pieaugušajiem, sievietēm gaidību un pēcdzemdību periodā, kā arī zīdaiņu attīstība. Rūpīga iedziļināšanās cēloņos — mājīgā vidē, bez steigas un bez virspusējiem šabloniem.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#pieteikt"
                  style={{ backgroundColor: "#C86D51", color: "#FFFFFF" }}
                  className="rounded-full px-7 py-3.5 text-sm font-bold shadow-md transition-transform hover:-translate-y-0.5 hover:bg-[#B85C42]"
                >
                  Pieteikt pirmo vizīti (60 min) →
                </a>
                <a
                  href="https://wa.me/37120000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ borderColor: "rgba(35, 45, 41, 0.2)", backgroundColor: "#FFFFFF", color: "#232D29" }}
                  className="inline-flex items-center gap-2 rounded-full border px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-[#F4EFEB]"
                >
                  <span>💬</span>
                  <span>Jautāt WhatsApp</span>
                </a>
              </div>

              {/* Ambient Reassurance Strip */}
              <div style={{ borderColor: "rgba(35, 45, 41, 0.1)", color: "rgba(35, 45, 41, 0.75)" }} className="mt-12 grid grid-cols-2 gap-4 border-t pt-6 sm:grid-cols-4 text-xs font-medium">
                <div className="flex items-center gap-2">
                  <span style={{ color: "#C86D51" }} className="font-bold">🌿</span>
                  <span>1-pret-1 darbs kabinetā</span>
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ color: "#C86D51" }} className="font-bold">🩺</span>
                  <span>Sertificētas speciālistes</span>
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ color: "#C86D51" }} className="font-bold">☕</span>
                  <span>Klusa, mājīga vide</span>
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ color: "#C86D51" }} className="font-bold">🛡️</span>
                  <span>Visas apdrošināšanas</span>
                </div>
              </div>
            </div>

            {/* Warm Studio Photography */}
            <div className="relative">
              <div style={{ backgroundColor: "#EAE3D9" }} className="relative h-[340px] sm:h-[420px] w-full overflow-hidden rounded-3xl shadow-[0_16px_40px_-12px_rgba(35,45,41,0.12)]">
                <Image
                  src="/concept-physio/hero-treatment.jpg"
                  alt="Fizioterapijas nodarbība KUSTĪBA mājīgajā praksē"
                  fill
                  priority
                  className="object-cover object-center"
                />
              </div>
              <div style={{ backgroundColor: "#FFFFFF", borderColor: "rgba(35, 45, 41, 0.08)" }} className="absolute -bottom-6 -left-6 hidden sm:block rounded-2xl border p-5 shadow-lg max-w-[260px]">
                <p style={{ color: "#232D29" }} className="font-heading text-xs font-bold">
                  “Sāpes nav jāpacieš.”
                </p>
                <p style={{ color: "rgba(35, 45, 41, 0.65)" }} className="mt-1 text-[11px] leading-relaxed">
                  Pareizi izvēlētas saudzīgas kustības palīdz ķermenim atgūt dabisko balansu.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Human Story & Philosophy ("Mūsu Filozofija") */}
      <section id="stasts" style={{ backgroundColor: "#FFFFFF", borderColor: "rgba(35, 45, 41, 0.08)" }} className="border-t py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div style={{ backgroundColor: "#F4EFEB" }} className="relative h-[340px] sm:h-[440px] w-full overflow-hidden rounded-3xl shadow-sm">
              <Image
                src="/concept-physio/practitioner-primary.jpg"
                alt="Elīna Vītola, vadošā fizioterapeite"
                fill
                className="object-cover object-top"
              />
            </div>

            <div>
              <span style={{ color: "#C86D51" }} className="text-xs font-bold uppercase tracking-[0.18em]">
                Prakses filozofija
              </span>
              <h2 style={{ color: "#232D29" }} className="mt-2 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
                Mēs nesteidzinām.<br />
                Mēs uzklausām un meklējam cēloni.
              </h2>

              <p style={{ color: "rgba(35, 45, 41, 0.78)" }} className="mt-5 text-sm leading-relaxed sm:text-base">
                Lielākā daļa cilvēku pie mums vēršas brīdī, kad muguras sāpes, spranda stīvums vai nogurums jau kļuvis par ikdienas fonu. Bieži vien cilvēks ir izmēģinājis pretsāpju zāles vai vispārīgus vingrojumus no interneta, taču sāpes atgriežas.
              </p>
              <p style={{ color: "rgba(35, 45, 41, 0.78)" }} className="mt-3 text-sm leading-relaxed sm:text-base">
                Mūsu pieejas pamatā ir izpratne par ķermeni kā vienotu biomehānisku sistēmu. Mēs analizējam, kā Jūs elpojat, kā sēžat pie datora un kādas ikdienas kustības rada slodzi.
              </p>

              <div style={{ borderLeftColor: "#C86D51" }} className="mt-8 border-l-3 pl-5">
                <p style={{ color: "#232D29" }} className="font-heading text-sm font-semibold italic">
                  “Fizioterapija nav tikai vingrošana — tā ir atbrīvošanās no bailēm par savu ķermeni un atgriešanās pie dzīvesprieka.”
                </p>
                <span style={{ color: "#6E8B82" }} className="mt-2 block text-xs font-bold">
                  — Elīna Vītola, prakses vadītāja
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Core Care Pathways (Warm Editorial Cards with Clear Daylight Images) */}
      <section id="virzieni" style={{ backgroundColor: "#F4EFEB", borderColor: "rgba(35, 45, 41, 0.08)" }} className="border-t py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="max-w-xl">
            <span style={{ color: "#C86D51" }} className="text-xs font-bold uppercase tracking-[0.18em]">
              Aprūpes virzieni
            </span>
            <h2 style={{ color: "#232D29" }} className="mt-2 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
              Kam mēs varam palīdzēt?
            </h2>
            <p style={{ color: "rgba(35, 45, 41, 0.75)" }} className="mt-3 text-sm sm:text-base">
              Trīs specializētas programmas, kas pielāgotas konkrētām dzīves situācijām:
            </p>
          </div>

          <div className="mt-12 space-y-10">
            {carePaths.map((path, idx) => (
              <article
                key={path.id}
                id={path.id}
                style={{ backgroundColor: "#FFFFFF", borderColor: "rgba(35, 45, 41, 0.08)" }}
                className={`grid gap-8 overflow-hidden rounded-3xl border p-6 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center shadow-xs ${
                  idx % 2 === 1 ? "lg:grid-cols-[0.9fr_1.1fr]" : ""
                }`}
              >
                <div className={idx % 2 === 1 ? "order-1 lg:order-2" : ""}>
                  <span style={{ color: "#C86D51" }} className="text-xs font-bold uppercase tracking-wider">
                    {path.subtitle}
                  </span>
                  <h3 style={{ color: "#232D29" }} className="mt-2 font-heading text-2xl font-bold sm:text-3xl">
                    {path.title}
                  </h3>
                  <p style={{ color: "#6E8B82" }} className="mt-3 font-heading text-sm font-semibold italic">
                    “{path.quote}”
                  </p>
                  <p style={{ color: "rgba(35, 45, 41, 0.78)" }} className="mt-4 text-sm leading-relaxed">
                    {path.description}
                  </p>

                  <ul style={{ borderColor: "rgba(35, 45, 41, 0.08)" }} className="mt-6 space-y-2 border-t pt-5">
                    {path.points.map((pt, pIdx) => (
                      <li key={pIdx} style={{ color: "#232D29" }} className="flex items-start gap-3 text-xs sm:text-sm font-medium">
                        <span style={{ color: "#C86D51" }} className="font-bold">✓</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  <div style={{ borderColor: "rgba(35, 45, 41, 0.08)" }} className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t pt-6">
                    <span style={{ color: "#232D29" }} className="font-mono text-sm font-bold">
                      {path.price}
                    </span>
                    <a
                      href="#pieteikt"
                      onClick={() => setSelectedService(path.id)}
                      style={{ backgroundColor: "#232D29", color: "#FAF7F2" }}
                      className="rounded-full px-6 py-2.5 text-xs font-bold transition-colors hover:bg-[#C86D51]"
                    >
                      Pieteikt šo vizīti →
                    </a>
                  </div>
                </div>

                <div className={`relative h-[260px] sm:h-[320px] lg:h-[360px] w-full overflow-hidden rounded-2xl ${idx % 2 === 1 ? "order-2 lg:order-1" : ""}`}>
                  <Image
                    src={path.image}
                    alt={path.title}
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

      {/* Specialist Team (Warm Dignified Portraits) */}
      <section id="specialisti" style={{ backgroundColor: "#FFFFFF", borderColor: "rgba(35, 45, 41, 0.08)" }} className="border-t py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="max-w-xl">
            <span style={{ color: "#C86D51" }} className="text-xs font-bold uppercase tracking-[0.18em]">
              Speciālisti
            </span>
            <h2 style={{ color: "#232D29" }} className="mt-2 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
              Cilvēki, kuru rokās Jūs varat justies droši
            </h2>
            <p style={{ color: "rgba(35, 45, 41, 0.75)" }} className="mt-3 text-sm sm:text-base">
              Mūsu komandā ir sertificētas ārstniecības personas ar regulāru starptautisku tālākizglītību un patiesu mīlestību pret savu darbu.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {team.map((person, idx) => (
              <div
                key={idx}
                style={{ backgroundColor: "#FAF7F2", borderColor: "rgba(35, 45, 41, 0.08)" }}
                className="flex flex-col justify-between overflow-hidden rounded-3xl border p-6 shadow-xs"
              >
                <div>
                  <div className="relative h-[280px] sm:h-[320px] w-full overflow-hidden rounded-2xl bg-[#EAE3D9]">
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-top"
                    />
                  </div>

                  <h3 style={{ color: "#232D29" }} className="mt-5 font-heading text-xl font-bold">
                    {person.name}
                  </h3>
                  <p style={{ color: "#C86D51" }} className="text-xs font-bold">{person.role}</p>
                  <p style={{ color: "#6E8B82" }} className="mt-1 font-mono text-[11px]">
                    {person.experience}
                  </p>

                  <p style={{ color: "rgba(35, 45, 41, 0.75)" }} className="mt-3 text-xs leading-relaxed italic">
                    {person.quote}
                  </p>

                  <div style={{ backgroundColor: "#FFFFFF", borderColor: "rgba(35, 45, 41, 0.06)", color: "#232D29" }} className="mt-4 rounded-xl border p-3.5 text-[11px] font-medium">
                    ✦ {person.focus}
                  </div>
                </div>

                <a
                  href="#pieteikt"
                  style={{ borderColor: "rgba(35, 45, 41, 0.2)", backgroundColor: "#FFFFFF", color: "#232D29" }}
                  className="mt-6 block text-center rounded-full border py-2.5 text-xs font-bold transition-colors hover:bg-[#232D29] hover:text-white"
                >
                  Pieteikt vizīti pie speciālistes →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* First Visit Guide ("Ko sagaidīt pirmajā reizē?") */}
      <section id="vizite" style={{ backgroundColor: "#EAE3D9", borderColor: "rgba(35, 45, 41, 0.08)" }} className="border-t py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="max-w-xl">
            <span style={{ color: "#C86D51" }} className="text-xs font-bold uppercase tracking-[0.18em]">
              Pirmā vizīte
            </span>
            <h2 style={{ color: "#232D29" }} className="mt-2 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
              Ko sagaidīt pirmajā tikšanās reizē?
            </h2>
            <p style={{ color: "rgba(35, 45, 41, 0.75)" }} className="mt-3 text-sm sm:text-base">
              Ja nekad iepriekš neesat bijis pie fizioterapeita, lūk, kā norit pirmā 60 minūšu vizīte:
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div style={{ backgroundColor: "#FFFFFF", borderColor: "rgba(35, 45, 41, 0.08)" }} className="rounded-3xl border p-7 shadow-xs">
              <span style={{ backgroundColor: "#FAF7F2", color: "#C86D51", borderColor: "rgba(35, 45, 41, 0.08)" }} className="flex h-10 w-10 items-center justify-center rounded-full font-heading text-sm font-bold border">
                01
              </span>
              <h3 style={{ color: "#232D29" }} className="mt-5 font-heading text-lg font-bold">
                Mierīga saruna & kustību testi (20 min)
              </h3>
              <p style={{ color: "rgba(35, 45, 41, 0.75)" }} className="mt-2 text-xs leading-relaxed">
                Mēs uzklausām Jūsu sūdzības, izvērtējam stāju, locītavu kustīgumu, muskuļu tonusu un elpošanas paradumus.
              </p>
            </div>

            <div style={{ backgroundColor: "#FFFFFF", borderColor: "rgba(35, 45, 41, 0.08)" }} className="rounded-3xl border p-7 shadow-xs">
              <span style={{ backgroundColor: "#FAF7F2", color: "#C86D51", borderColor: "rgba(35, 45, 41, 0.08)" }} className="flex h-10 w-10 items-center justify-center rounded-full font-heading text-sm font-bold border">
                02
              </span>
              <h3 style={{ color: "#232D29" }} className="mt-5 font-heading text-lg font-bold">
                Terapija & pareizās kustības sajūta (30 min)
              </h3>
              <p style={{ color: "rgba(35, 45, 41, 0.75)" }} className="mt-2 text-xs leading-relaxed">
                Saudzīgs manuālais darbs ar sasprindzinātajiem audiem un precīzi vingrojumi fizioterapeites vadībā.
              </p>
            </div>

            <div style={{ backgroundColor: "#FFFFFF", borderColor: "rgba(35, 45, 41, 0.08)" }} className="rounded-3xl border p-7 shadow-xs">
              <span style={{ backgroundColor: "#FAF7F2", color: "#C86D51", borderColor: "rgba(35, 45, 41, 0.08)" }} className="flex h-10 w-10 items-center justify-center rounded-full font-heading text-sm font-bold border">
                03
              </span>
              <h3 style={{ color: "#232D29" }} className="mt-5 font-heading text-lg font-bold">
                Skaidrs mājas plāns 5 minūtēm dienā (10 min)
              </h3>
              <p style={{ color: "rgba(35, 45, 41, 0.75)" }} className="mt-2 text-xs leading-relaxed">
                Jūs saņemat 2–3 vienkāršus vingrojumus mājas videi, lai nostiprinātu sasniegto rezultātu ilgtermiņā.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Transparent Pricing Table & Insurance */}
      <section id="cenas" style={{ backgroundColor: "#FFFFFF", borderColor: "rgba(35, 45, 41, 0.08)" }} className="border-t py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center">
            <span style={{ color: "#C86D51" }} className="text-xs font-bold uppercase tracking-[0.18em]">
              Cenrādis
            </span>
            <h2 style={{ color: "#232D29" }} className="mt-2 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
              Caurspīdīgas pakalpojumu cenas
            </h2>
            <p style={{ color: "rgba(35, 45, 41, 0.75)" }} className="mt-2 text-xs">
              Visi nodarbībai nepieciešamie materiāli (teipošana, palīglīdzekļi) ir iekļauti vizītes cenā.
            </p>
          </div>

          <div style={{ backgroundColor: "#FAF7F2", borderColor: "rgba(35, 45, 41, 0.1)" }} className="mt-10 overflow-hidden rounded-3xl border shadow-xs">
            <div style={{ borderColor: "rgba(35, 45, 41, 0.08)" }} className="divide-y text-sm">
              <div className="flex items-center justify-between p-5 sm:p-6">
                <div>
                  <p style={{ color: "#232D29" }} className="font-heading font-bold">Pirmreizēja fizioterapeita konsultācija & diagnostika</p>
                  <p style={{ color: "rgba(35, 45, 41, 0.65)" }} className="text-xs">Pilna kustību pārbaude, manuālie testi, pirmā terapija un mājas plāns (60 min)</p>
                </div>
                <span style={{ color: "#232D29" }} className="font-mono text-base font-bold">50 €</span>
              </div>

              <div className="flex items-center justify-between p-5 sm:p-6">
                <div>
                  <p style={{ color: "#232D29" }} className="font-heading font-bold">Atkārtota individuālā fizioterapijas nodarbība</p>
                  <p style={{ color: "rgba(35, 45, 41, 0.65)" }} className="text-xs">Manuāla terapija un koriģējošie vingrojumi ar speciālisti (60 min)</p>
                </div>
                <span style={{ color: "#232D29" }} className="font-mono text-base font-bold">45 €</span>
              </div>

              <div className="flex items-center justify-between p-5 sm:p-6">
                <div>
                  <p style={{ color: "#232D29" }} className="font-heading font-bold">Sieviešu veselības un pēcdzemdību vizīte</p>
                  <p style={{ color: "rgba(35, 45, 41, 0.65)" }} className="text-xs">Diastāzes pārbaude, iegurņa pamatnes muskuļu atjaunošana (60 min)</p>
                </div>
                <span style={{ color: "#232D29" }} className="font-mono text-base font-bold">50 €</span>
              </div>

              <div className="flex items-center justify-between p-5 sm:p-6">
                <div>
                  <p style={{ color: "#232D29" }} className="font-heading font-bold">Zīdaiņu motorā attīstība & hendlinga apmācība</p>
                  <p style={{ color: "rgba(35, 45, 41, 0.65)" }} className="text-xs">Praktiska vecāku apmācība un mazuļa kustību harmonizācija (45 min)</p>
                </div>
                <span style={{ color: "#232D29" }} className="font-mono text-base font-bold">40 €</span>
              </div>

              <div style={{ backgroundColor: "#FFFFFF" }} className="flex items-center justify-between p-5 sm:p-6">
                <div>
                  <p style={{ color: "#C86D51" }} className="font-heading font-bold">5 nodarbību kurss (abonements)</p>
                  <p style={{ color: "rgba(35, 45, 41, 0.65)" }} className="text-xs">Derīgs 3 mēnešus no iegādes brīža (ietaupījums 25 €)</p>
                </div>
                <span style={{ color: "#C86D51" }} className="font-mono text-base font-bold">200 €</span>
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: "#FAF7F2", borderColor: "rgba(35, 45, 41, 0.08)", color: "rgba(35, 45, 41, 0.8)" }} className="mt-8 rounded-2xl border p-5 text-center text-xs">
            🛡️ <strong>Veselības apdrošināšana:</strong> Pēc vizītes izsniedzam čeku un ārstniecības personas izrakstu, ko pieņem <strong>Balta</strong>, <strong>BTA</strong>, <strong>Compensa</strong>, <strong>Ergo</strong>, <strong>Gjensidige</strong> un citas apdrošināšanas kompānijas.
          </div>
        </div>
      </section>

      {/* Warm Interactive Booking Card (Warm Linen & Sage, Zero Dark Pitch Black) */}
      <section id="pieteikt" style={{ backgroundColor: "#F4EFEB", borderColor: "rgba(35, 45, 41, 0.08)" }} className="border-t py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center">
            <span style={{ color: "#C86D51" }} className="text-xs font-bold uppercase tracking-[0.2em]">
              Pieteikties vizītei
            </span>
            <h2 style={{ color: "#232D29" }} className="mt-3 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
              Izvēlieties sev ērtāko laiku
            </h2>
            <p style={{ color: "rgba(35, 45, 41, 0.75)" }} className="mt-3 text-sm">
              Aizpildiet pieteikumu vai rakstiet mums tieši WhatsApp — mēs atbildēsim 2 stundu laikā.
            </p>
          </div>

          <div style={{ backgroundColor: "#FFFFFF", borderColor: "rgba(35, 45, 41, 0.08)" }} className="mt-10 rounded-3xl border p-7 sm:p-10 shadow-sm">
            {submitted ? (
              <div style={{ backgroundColor: "#EAE3D9", borderColor: "rgba(35, 45, 41, 0.1)" }} className="rounded-2xl border p-8 text-center">
                <span style={{ color: "#C86D51" }} className="text-4xl">✓</span>
                <h3 style={{ color: "#232D29" }} className="mt-3 font-heading text-xl font-bold">
                  Paldies! Jūsu pieteikums ir saņemts.
                </h3>
                <p style={{ color: "rgba(35, 45, 41, 0.8)" }} className="mt-2 text-sm">
                  Mēs sazināsimies pa norādīto tālruni, lai apstiprinātu vizītes laiku: <strong>{selectedDay} plkst. {selectedTime}</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  style={{ backgroundColor: "#232D29", color: "#FAF7F2" }}
                  className="mt-6 rounded-full px-5 py-2 text-xs font-bold"
                >
                  Pieteikt citu laiku
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
                  <label style={{ color: "#232D29" }} className="block text-xs font-bold uppercase tracking-wider">
                    1. Izvēlieties vēlamo dienu
                  </label>
                  <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
                    {days.map((day) => (
                      <button
                        key={day.full}
                        type="button"
                        onClick={() => setSelectedDay(day.full)}
                        style={
                          selectedDay === day.full
                            ? { backgroundColor: "#C86D51", color: "#FFFFFF", borderColor: "#C86D51" }
                            : { backgroundColor: "#FAF7F2", color: "#232D29", borderColor: "rgba(35, 45, 41, 0.1)" }
                        }
                        className="rounded-2xl p-3 text-center border transition-all"
                      >
                        <p className="text-[11px] font-semibold">{day.label}</p>
                        <p className="mt-0.5 font-heading text-xs font-bold">{day.date}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Time Selector */}
                <div className="mt-6">
                  <label style={{ color: "#232D29" }} className="block text-xs font-bold uppercase tracking-wider">
                    2. Izvēlieties sākuma laiku
                  </label>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {times.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setSelectedTime(t)}
                        style={
                          selectedTime === t
                            ? { backgroundColor: "#232D29", color: "#FAF7F2", borderColor: "#232D29" }
                            : { backgroundColor: "#FAF7F2", color: "#232D29", borderColor: "rgba(35, 45, 41, 0.1)" }
                        }
                        className="rounded-xl px-4 py-2 font-mono text-xs font-bold transition-all border"
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Patient Details Form */}
                <div style={{ borderColor: "rgba(35, 45, 41, 0.08)" }} className="mt-8 border-t pt-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label style={{ color: "#232D29" }} className="block text-xs font-semibold">
                        Vārds, Uzvārds *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Anna Bērziņa"
                        style={{ borderColor: "rgba(35, 45, 41, 0.15)", backgroundColor: "#FAF7F2", color: "#232D29" }}
                        className="mt-1.5 w-full rounded-xl border px-4 py-2.5 text-sm placeholder:text-[#232D29]/40 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label style={{ color: "#232D29" }} className="block text-xs font-semibold">
                        Tālruņa numurs *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+371 20 000 000"
                        style={{ borderColor: "rgba(35, 45, 41, 0.15)", backgroundColor: "#FAF7F2", color: "#232D29" }}
                        className="mt-1.5 w-full rounded-xl border px-4 py-2.5 text-sm placeholder:text-[#232D29]/40 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <label style={{ color: "#232D29" }} className="block text-xs font-semibold">
                        Pakalpojuma virziens
                      </label>
                      <select
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        style={{ borderColor: "rgba(35, 45, 41, 0.15)", backgroundColor: "#FAF7F2", color: "#232D29" }}
                        className="mt-1.5 w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-hidden"
                      >
                        <option value="rehab">Muguras, kakla vai locītavu sāpes</option>
                        <option value="women">Sieviešu veselība & pēcdzemdības</option>
                        <option value="children">Zīdaiņu motorā attīstība & hendlings</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ color: "#232D29" }} className="block text-xs font-semibold">
                        Vēlamā speciāliste (pēc izvēles)
                      </label>
                      <select
                        style={{ borderColor: "rgba(35, 45, 41, 0.15)", backgroundColor: "#FAF7F2", color: "#232D29" }}
                        className="mt-1.5 w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-hidden"
                      >
                        <option value="">Jebkura pieejamā speciāliste</option>
                        <option value="elina">Elīna Vītola (vadošā fizioterapeite)</option>
                        <option value="marta">Marta Liepa (muguras sāpes, sports)</option>
                        <option value="anna">Anna Ozola (bērni, hendlings)</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label style={{ color: "#232D29" }} className="block text-xs font-semibold">
                      Īss situācijas apraksts (kas sāp, cik ilgi?)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Kas Jums rada diskomfortu, vai ir bijusi trauma vai izmeklējumi?"
                      style={{ borderColor: "rgba(35, 45, 41, 0.15)", backgroundColor: "#FAF7F2", color: "#232D29" }}
                      className="mt-1.5 w-full rounded-xl border px-4 py-2.5 text-sm placeholder:text-[#232D29]/40 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button
                    type="submit"
                    style={{ backgroundColor: "#C86D51", color: "#FFFFFF" }}
                    className="rounded-full px-8 py-3.5 text-sm font-bold shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-[#B85C42]"
                  >
                    Pieteikt vizīti ({selectedDay.split(",")[0]}, {selectedTime})
                  </button>
                  <a
                    href="https://wa.me/37120000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ borderColor: "rgba(35, 45, 41, 0.2)", backgroundColor: "#FFFFFF", color: "#232D29" }}
                    className="inline-flex items-center gap-2 rounded-full border px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-[#FAF7F2]"
                  >
                    <span>💬</span>
                    <span>Rakstīt WhatsApp</span>
                  </a>
                </div>

                <p style={{ color: "rgba(35, 45, 41, 0.5)" }} className="mt-4 text-[11px]">
                  Demo koncepts: forma simulē pierakstu. Dati netiek saglabāti vai nodoti trešajām personām.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Accordions */}
      <section style={{ backgroundColor: "#FFFFFF", borderColor: "rgba(35, 45, 41, 0.08)" }} className="border-t py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="text-center">
            <span style={{ color: "#C86D51" }} className="text-xs font-bold uppercase tracking-[0.18em]">
              Jautājumi
            </span>
            <h2 style={{ color: "#232D29" }} className="mt-2 font-heading text-3xl font-extrabold tracking-tight">
              Biežāk uzdotie jautājumi
            </h2>
          </div>

          <div className="mt-10 space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                style={{ backgroundColor: "#FAF7F2", borderColor: "rgba(35, 45, 41, 0.08)" }}
                className="overflow-hidden rounded-2xl border"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  style={{ color: "#232D29" }}
                  className="flex w-full items-center justify-between p-5 text-left font-heading text-sm font-bold"
                >
                  <span>{faq.q}</span>
                  <span style={{ color: "#C86D51" }} className="ml-2 font-mono text-base">
                    {activeFaq === idx ? "−" : "+"}
                  </span>
                </button>
                {activeFaq === idx && (
                  <div style={{ borderColor: "rgba(35, 45, 41, 0.08)", color: "rgba(35, 45, 41, 0.78)" }} className="border-t px-5 py-4 text-xs sm:text-sm leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Contacts */}
      <footer id="kontakti" style={{ backgroundColor: "#FAF7F2", borderColor: "rgba(35, 45, 41, 0.1)", color: "#232D29" }} className="border-t py-16">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <strong style={{ color: "#232D29" }} className="font-heading text-xl font-bold">KUSTĪBA</strong>
              <p style={{ color: "#6E8B82" }} className="mt-1 text-xs">Fizioterapijas un kustību prakse</p>
              <p style={{ color: "rgba(35, 45, 41, 0.75)" }} className="mt-4 text-xs leading-relaxed">
                Miera iela 24, Rīga, LV-1001.<br />
                Ieeja no Miera ielas pagalma, 2. stāvs, pieejams ērts lifts bērnu ratiņiem un personām ar kustību ierobežojumiem.
              </p>
            </div>

            <div>
              <p style={{ color: "#6E8B82" }} className="text-xs font-bold uppercase tracking-wider">Darba laiks</p>
              <ul style={{ color: "rgba(35, 45, 41, 0.85)" }} className="mt-3 space-y-1.5 text-xs font-mono">
                <li>Pirmdiena – Piektdiena: 08:00 – 20:00</li>
                <li>Sestdiena: 09:00 – 15:00 (pēc pieraksta)</li>
                <li>Svētdiena: Slēgts</li>
              </ul>
            </div>

            <div>
              <p style={{ color: "#6E8B82" }} className="text-xs font-bold uppercase tracking-wider">Saziņa</p>
              <p className="mt-3 text-xs">
                Tālrunis: <a href="tel:+37167000000" style={{ color: "#C86D51" }} className="font-mono hover:underline font-bold">+371 67 000 000</a>
              </p>
              <p className="mt-1 text-xs">
                E-pasts: <a href="mailto:sveiki@kustiba-demo.lv" style={{ color: "#C86D51" }} className="hover:underline font-bold">sveiki@kustiba-demo.lv</a>
              </p>
              <p className="mt-1 text-xs">
                WhatsApp: <a href="https://wa.me/37120000000" style={{ color: "#C86D51" }} className="hover:underline font-bold">+371 20 000 000</a>
              </p>
            </div>
          </div>

          <div style={{ borderColor: "rgba(35, 45, 41, 0.08)", color: "rgba(35, 45, 41, 0.5)" }} className="mt-12 border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <p>© {new Date().getFullYear()} KUSTĪBA. Demonstrācijas koncepts.</p>
            <div className="flex items-center gap-4">
              <Link href="/case-studies/physiotherapy" style={{ color: "#C86D51" }} className="hover:underline font-bold">
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
