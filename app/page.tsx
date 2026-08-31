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
        "Saudzīga manuālā terapija un audu atbrīvošana",
        "Mērķtiecīgi vingrojumi, ko viegli integrēt mājas vai darba dienas ritmā",
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
        "Grūtniecības laikā palīdzam atslogot jostas daļu un sagatavot iegurni. Pēcdzemdību vizītē pārbaudām vēdera muskuļu diastāzi, iegurņa pamatni un atgriežam ķermenim spēku.",
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
        "Praktiska apmācība pareizā hendlingā — kā mazuli celt, turēt un ģērbt, lai dabiski veicinātu velšanos, rāpošanu un simetrisku kustību kvalitāti bez asarām.",
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
      role: "Fizioterapeite",
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
      a: "Jā, mēs izsniedzam oficiālu čeku un ārstniecības personas atskaiti ar visiem kodiem, ko apmaksā Balta, BTA, Compensa, Ergo, Gjensidige u.c.",
    },
    {
      q: "Kā nokļūt praksē un vai pieejams lifts?",
      a: "Atrodamies Miera ielā 24, klusā pagalma ēkas 2. stāvā. Ēkā ir ērts lifts — pie mums var ērti ierasties gan ar bērnu ratiņiem, gan personām ar kustību ierobežojumiem.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1E2B27] font-sans antialiased selection:bg-[#C86D51]/20">
      {/* Top Persistent Saiteo Context Strip */}
      <aside className="sticky top-0 z-50 flex items-center justify-between border-b border-[#1E2B27]/10 bg-[#1E2B27] px-4 py-2 text-xs text-[#FAF8F5] shadow-sm">
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
            className="hidden rounded bg-[#00C9A7] px-3 py-1 font-bold text-[#1E2B27] transition-transform hover:scale-105 min-[540px]:inline-block"
          >
            Pieteikt savu mājaslapu
          </Link>
        </div>
      </aside>

      {/* Warm Boutique Clinic Header */}
      <header className="border-b border-[#1E2B27]/08 bg-[#FAF8F5]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 lg:px-8">
          <Link href="#top" className="group">
            <span className="font-heading text-2xl font-bold tracking-tight text-[#1E2B27]">
              KUSTĪBA
            </span>
            <span className="block text-xs tracking-wider text-[#7A968C] uppercase font-semibold">
              Fizioterapijas & Kustību Prakse
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium text-[#1E2B27]/75 md:flex">
            <a href="#stasts" className="transition-colors hover:text-[#1E2B27]">Par praksi</a>
            <a href="#virzieni" className="transition-colors hover:text-[#1E2B27]">Pakalpojumi</a>
            <a href="#specialisti" className="transition-colors hover:text-[#1E2B27]">Speciālisti</a>
            <a href="#vizite" className="transition-colors hover:text-[#1E2B27]">Pirmā vizīte</a>
            <a href="#cenas" className="transition-colors hover:text-[#1E2B27]">Cenas</a>
            <a href="#kontakti" className="transition-colors hover:text-[#1E2B27]">Kontakti</a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="tel:+37167000000"
              className="hidden font-mono text-xs font-semibold text-[#1E2B27]/70 hover:text-[#C86D51] sm:inline-block"
            >
              +371 67 000 000
            </a>
            <a
              href="#pieteikt"
              className="rounded-full bg-[#1E2B27] px-5 py-2.5 text-xs font-bold text-[#FAF8F5] shadow-xs transition-all hover:bg-[#2B3B36]"
            >
              Pieteikt vizīti
            </a>
          </div>
        </div>
      </header>

      {/* Sunlit Warm Organic Hero */}
      <section id="top" className="relative overflow-hidden py-16 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#E3EAE6] px-3.5 py-1 text-xs font-semibold text-[#2B3B36]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C86D51]" />
                <span>Miera iela 24, Rīga · Pieņemšana 2–3 dienu laikā</span>
              </div>

              <h1 className="mt-6 font-heading text-4xl font-extrabold leading-[1.12] tracking-tight text-[#1E2B27] sm:text-5xl lg:text-[3.5rem]">
                Droša, mierīga vieta,<br />
                kur atgūt kustību brīvību.
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-[#1E2B27]/75 sm:text-lg">
                Fizioterapija un rehabilitācija pieaugušajiem, sievietēm gaidību un pēcdzemdību periodā, kā arī zīdaiņu attīstība. Rūpīga iedziļināšanās cēloņos — bez steigas un bez virspusējiem šabloniem.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#pieteikt"
                  className="rounded-full bg-[#C86D51] px-7 py-3.5 text-sm font-bold text-white shadow-md transition-transform hover:-translate-y-0.5 hover:bg-[#B85C42]"
                >
                  Pieteikt pirmo vizīti (60 min) →
                </a>
                <a
                  href="https://wa.me/37120000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[#1E2B27]/20 bg-white px-6 py-3.5 text-sm font-semibold text-[#1E2B27] transition-colors hover:bg-[#FAF8F5]"
                >
                  <span>💬</span>
                  <span>Jautāt WhatsApp</span>
                </a>
              </div>

              {/* Ambient Reassurance Strip */}
              <div className="mt-12 grid grid-cols-2 gap-4 border-t border-[#1E2B27]/10 pt-6 sm:grid-cols-4 text-xs font-medium text-[#1E2B27]/70">
                <div className="flex items-center gap-2">
                  <span className="text-[#C86D51] font-bold">🌿</span>
                  <span>1-pret-1 darbs kabinetā</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#C86D51] font-bold">🩺</span>
                  <span>Sertificētas speciālistes</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#C86D51] font-bold">☕</span>
                  <span>Klusa, mājīga vide</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#C86D51] font-bold">🛡️</span>
                  <span>Visas apdrošināšanas</span>
                </div>
              </div>
            </div>

            {/* Warm Studio Photography Composition */}
            <div className="relative">
              <div className="relative aspect-[4/3.8] overflow-hidden rounded-3xl bg-[#E3EAE6] shadow-[0_20px_48px_-16px_rgba(30,43,39,0.15)]">
                <Image
                  src="/concept-physio/hero-treatment.jpg"
                  alt="Fizioterapijas un kustību nodarbība KUSTĪBA mājīgajā praksē"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 hidden sm:block rounded-2xl border border-[#1E2B27]/10 bg-white p-5 shadow-lg max-w-[260px]">
                <p className="font-heading text-xs font-bold text-[#1E2B27]">
                  “Sāpes nav jāpacieš.”
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-[#1E2B27]/60">
                  Pareizi izvēlētas kustības palīdz ķermenim atgūt dabisko balansu jau pēc pirmajām nodarbībām.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Human Philosophy Section ("Kāpēc KUSTĪBA?") */}
      <section id="stasts" className="border-t border-[#1E2B27]/08 bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="relative aspect-[4/4.5] overflow-hidden rounded-3xl bg-[#FAF8F5]">
              <Image
                src="/concept-physio/practitioner-primary.jpg"
                alt="Elīna Vītola, vadošā fizioterapeite"
                fill
                className="object-cover object-top"
              />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#C86D51]">
                Prakses filozofija
              </span>
              <h2 className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-[#1E2B27] sm:text-4xl">
                Mēs nesteidzinām.<br />
                Mēs uzklausām un meklējam cēloni.
              </h2>

              <p className="mt-5 text-sm leading-relaxed text-[#1E2B27]/75 sm:text-base">
                Lielākā daļa cilvēku pie mums vēršas brīdī, kad muguras sāpes, spranda stīvums vai nogurums jau kļuvis par ikdienas fonu. Bieži vien cilvēks ir izmēģinājis pretsāpju medikamentus vai vispārīgus vingrojumu video internetā, taču sāpes atgriežas.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[#1E2B27]/75 sm:text-base">
                Mūsu pieejas pamatā ir izpratne par ķermeni kā vienotu biomehānisku un emocionālu sistēmu. Mēs analizējam, kā Jūs elpojat, kā sēžat pie sava darba galda un kādas ikdienas kustības rada pārslodzi.
              </p>

              <div className="mt-8 border-l-2 border-[#C86D51] pl-5">
                <p className="font-heading text-sm font-semibold italic text-[#1E2B27]">
                  “Fizioterapija nav tikai vingrošana — tā ir atbrīvošanās no bailēm par savu ķermeni un atgriešanās pie dzīvesprieka.”
                </p>
                <span className="mt-2 block text-xs font-bold text-[#7A968C]">
                  — Elīna Vītola, prakses vadītāja
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Core Care Pathways (Editorial Stories) */}
      <section id="virzieni" className="border-t border-[#1E2B27]/08 py-16 sm:py-24 bg-[#F4EFEA]/60">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#C86D51]">
              Aprūpes virzieni
            </span>
            <h2 className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-[#1E2B27] sm:text-4xl">
              Kam mēs varam palīdzēt?
            </h2>
            <p className="mt-3 text-sm text-[#1E2B27]/70 sm:text-base">
              Trīs specializētas programmas, kas pielāgotas konkrētām dzīves situācijām un vecuma posmiem:
            </p>
          </div>

          <div className="mt-12 space-y-12">
            {carePaths.map((path, idx) => (
              <article
                key={path.id}
                id={path.id}
                className={`grid gap-8 overflow-hidden rounded-3xl border border-[#1E2B27]/08 bg-white p-7 sm:p-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center shadow-sm ${
                  idx % 2 === 1 ? "lg:grid-cols-[0.85fr_1.15fr]" : ""
                }`}
              >
                <div className={idx % 2 === 1 ? "order-1 lg:order-2" : ""}>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C86D51]">
                    {path.subtitle}
                  </span>
                  <h3 className="mt-2 font-heading text-2xl font-bold text-[#1E2B27] sm:text-3xl">
                    {path.title}
                  </h3>
                  <p className="mt-3 font-heading text-sm font-semibold italic text-[#7A968C]">
                    “{path.quote}”
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-[#1E2B27]/75">
                    {path.description}
                  </p>

                  <ul className="mt-6 space-y-2 border-t border-[#1E2B27]/08 pt-5">
                    {path.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-3 text-xs sm:text-sm font-medium text-[#1E2B27]/85">
                        <span className="text-[#C86D51] font-bold">✓</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#1E2B27]/08 pt-6">
                    <span className="font-mono text-sm font-bold text-[#1E2B27]">
                      {path.price}
                    </span>
                    <a
                      href="#pieteikt"
                      onClick={() => setSelectedService(path.id)}
                      className="rounded-full bg-[#1E2B27] px-6 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#C86D51]"
                    >
                      Pieteikt šo vizīti →
                    </a>
                  </div>
                </div>

                <div className={`relative aspect-[4/3.2] overflow-hidden rounded-2xl bg-[#E3EAE6] ${idx % 2 === 1 ? "order-2 lg:order-1" : ""}`}>
                  <Image
                    src={path.image}
                    alt={path.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Specialist Team (Warm Dignified Portraits) */}
      <section id="specialisti" className="border-t border-[#1E2B27]/08 bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#C86D51]">
              Speciālisti
            </span>
            <h2 className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-[#1E2B27] sm:text-4xl">
              Cilvēki, kuru rokās Jūs varat justies droši
            </h2>
            <p className="mt-3 text-sm text-[#1E2B27]/70 sm:text-base">
              Mūsu komandā ir sertificētas ārstniecības personas ar regulāru starptautisku tālākizglītību un patiesu mīlestību pret savu darbu.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {team.map((person, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between overflow-hidden rounded-3xl border border-[#1E2B27]/08 bg-[#FAF8F5] p-6 shadow-xs"
              >
                <div>
                  <div className="relative aspect-[4/4.2] overflow-hidden rounded-2xl bg-[#E3EAE6]">
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-top"
                    />
                  </div>

                  <h3 className="mt-5 font-heading text-xl font-bold text-[#1E2B27]">
                    {person.name}
                  </h3>
                  <p className="text-xs font-bold text-[#C86D51]">{person.role}</p>
                  <p className="mt-1 font-mono text-[11px] text-[#7A968C]">
                    {person.experience}
                  </p>

                  <p className="mt-3 text-xs leading-relaxed text-[#1E2B27]/70 italic">
                    {person.quote}
                  </p>

                  <div className="mt-4 rounded-xl bg-white p-3.5 text-[11px] font-medium text-[#1E2B27]/80 border border-[#1E2B27]/06">
                    ✦ {person.focus}
                  </div>
                </div>

                <a
                  href="#pieteikt"
                  className="mt-6 block text-center rounded-full border border-[#1E2B27]/20 bg-white py-2.5 text-xs font-bold text-[#1E2B27] transition-colors hover:bg-[#1E2B27] hover:text-white"
                >
                  Pieteikt vizīti pie speciālistes →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* First Visit Anxiety Removal ("Kā norit pirmā vizīte?") */}
      <section id="vizite" className="border-t border-[#1E2B27]/08 py-16 sm:py-24 bg-[#E3EAE6]/50">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#C86D51]">
              Pirmā vizīte
            </span>
            <h2 className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-[#1E2B27] sm:text-4xl">
              Ko sagaidīt pirmajā tikšanās reizē?
            </h2>
            <p className="mt-3 text-sm text-[#1E2B27]/70 sm:text-base">
              Ja nekad iepriekš neesat bijis pie fizioterapeita, lūk, kā norit pirmā 60 minūšu vizīte:
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-[#1E2B27]/08 bg-white p-7 shadow-xs">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FAF8F5] font-heading text-sm font-bold text-[#C86D51] border border-[#1E2B27]/08">
                01
              </span>
              <h3 className="mt-5 font-heading text-lg font-bold text-[#1E2B27]">
                Mierīga saruna & kustību testi (20 min)
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#1E2B27]/70">
                Mēs uzklausām Jūsu sūdzības, izvērtējam stāju, locītavu kustīgumu, muskuļu tonusu un elpošanas paradumus.
              </p>
            </div>

            <div className="rounded-3xl border border-[#1E2B27]/08 bg-white p-7 shadow-xs">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FAF8F5] font-heading text-sm font-bold text-[#C86D51] border border-[#1E2B27]/08">
                02
              </span>
              <h3 className="mt-5 font-heading text-lg font-bold text-[#1E2B27]">
                Terapija & pareizās kustības sajūta (30 min)
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#1E2B27]/70">
                Saudzīgs manuālais darbs ar sasprindzinātajiem audiem un precīzi vingrojumi fizioterapeites vadībā.
              </p>
            </div>

            <div className="rounded-3xl border border-[#1E2B27]/08 bg-white p-7 shadow-xs">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FAF8F5] font-heading text-sm font-bold text-[#C86D51] border border-[#1E2B27]/08">
                03
              </span>
              <h3 className="mt-5 font-heading text-lg font-bold text-[#1E2B27]">
                Skaidrs mājas plāns 5 minūtēm dienā (10 min)
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#1E2B27]/70">
                Jūs saņemat 2–3 vienkāršus vingrojumus mājas videi, lai nostiprinātu sasniegto rezultātu ilgtermiņā.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Transparent Pricing Table & Insurance */}
      <section id="cenas" className="border-t border-[#1E2B27]/08 bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#C86D51]">
              Cenrādis
            </span>
            <h2 className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-[#1E2B27] sm:text-4xl">
              Caurspīdīgas pakalpojumu cenas
            </h2>
            <p className="mt-2 text-xs text-[#1E2B27]/70">
              Visi nodarbībai nepieciešamie materiāli (teipošana, palīglīdzekļi) ir iekļauti vizītes cenā.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-3xl border border-[#1E2B27]/10 bg-[#FAF8F5] shadow-xs">
            <div className="divide-y divide-[#1E2B27]/08 text-sm">
              <div className="flex items-center justify-between p-5 sm:p-6">
                <div>
                  <p className="font-heading font-bold text-[#1E2B27]">Pirmreizēja fizioterapeita konsultācija & diagnostika</p>
                  <p className="text-xs text-[#1E2B27]/60">Pilna kustību pārbaude, manuālie testi, pirmā terapija un mājas plāns (60 min)</p>
                </div>
                <span className="font-mono text-base font-bold text-[#1E2B27]">50 €</span>
              </div>

              <div className="flex items-center justify-between p-5 sm:p-6">
                <div>
                  <p className="font-heading font-bold text-[#1E2B27]">Atkārtota individuālā fizioterapijas nodarbība</p>
                  <p className="text-xs text-[#1E2B27]/60">Manuāla terapija un koriģējošie vingrojumi ar speciālisti (60 min)</p>
                </div>
                <span className="font-mono text-base font-bold text-[#1E2B27]">45 €</span>
              </div>

              <div className="flex items-center justify-between p-5 sm:p-6">
                <div>
                  <p className="font-heading font-bold text-[#1E2B27]">Sieviešu veselības un pēcdzemdību vizīte</p>
                  <p className="text-xs text-[#1E2B27]/60">Diastāzes pārbaude, iegurņa pamatnes muskuļu atjaunošana (60 min)</p>
                </div>
                <span className="font-mono text-base font-bold text-[#1E2B27]">50 €</span>
              </div>

              <div className="flex items-center justify-between p-5 sm:p-6">
                <div>
                  <p className="font-heading font-bold text-[#1E2B27]">Zīdaiņu motorā attīstība & hendlinga apmācība</p>
                  <p className="text-xs text-[#1E2B27]/60">Praktiska vecāku apmācība un mazuļa kustību harmonizācija (45 min)</p>
                </div>
                <span className="font-mono text-base font-bold text-[#1E2B27]">40 €</span>
              </div>

              <div className="flex items-center justify-between p-5 sm:p-6 bg-white">
                <div>
                  <p className="font-heading font-bold text-[#C86D51]">5 nodarbību kurss (abonements)</p>
                  <p className="text-xs text-[#1E2B27]/60">Derīgs 3 mēnešus no iegādes brīža (ietaupījums 25 €)</p>
                </div>
                <span className="font-mono text-base font-bold text-[#C86D51]">200 €</span>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-[#1E2B27]/08 bg-[#FAF8F5] p-5 text-center text-xs text-[#1E2B27]/75">
            🛡️ <strong>Veselības apdrošināšana:</strong> Pēc vizītes izsniedzam čeku un ārstniecības personas izrakstu, ko pieņem <strong>Balta</strong>, <strong>BTA</strong>, <strong>Compensa</strong>, <strong>Ergo</strong>, <strong>Gjensidige</strong> un citas apdrošināšanas kompānijas.
          </div>
        </div>
      </section>

      {/* Warm Interactive Booking & WhatsApp Intake */}
      <section id="pieteikt" className="border-t border-[#1E2B27]/08 bg-[#1E2B27] py-16 sm:py-24 text-[#FAF8F5]">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#A9D8D5]">
              Pieteikties vizītei
            </span>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Izvēlieties sev ērtāko laiku
            </h2>
            <p className="mt-3 text-sm text-[#FAF8F5]/75">
              Aizpildiet pieteikumu vai rakstiet mums tieši WhatsApp — mēs atbildēsim 2 stundu laikā.
            </p>
          </div>

          <div className="mt-10 rounded-3xl border border-white/15 bg-white/5 p-7 backdrop-blur-md sm:p-10">
            {submitted ? (
              <div className="rounded-2xl border border-[#00C9A7]/30 bg-[#00C9A7]/10 p-8 text-center">
                <span className="text-4xl">✓</span>
                <h3 className="mt-3 font-heading text-xl font-bold text-white">
                  Paldies! Jūsu pieteikums ir saņemts.
                </h3>
                <p className="mt-2 text-sm text-[#FAF8F5]/80">
                  Mēs sazināsimies pa norādīto tālruni, lai apstiprinātu vizītes laiku: <strong>{selectedDay} plkst. {selectedTime}</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 rounded-full bg-white/20 px-5 py-2 text-xs font-bold text-white hover:bg-white/30"
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
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#A9D8D5]">
                    1. Izvēlieties vēlamo dienu
                  </label>
                  <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
                    {days.map((day) => (
                      <button
                        key={day.full}
                        type="button"
                        onClick={() => setSelectedDay(day.full)}
                        className={`rounded-2xl p-3 text-center border transition-all ${
                          selectedDay === day.full
                            ? "border-[#C86D51] bg-[#C86D51] text-white shadow-md"
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
                    2. Izvēlieties sākuma laiku
                  </label>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {times.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setSelectedTime(t)}
                        className={`rounded-xl px-4 py-2 font-mono text-xs font-bold transition-all ${
                          selectedTime === t
                            ? "bg-[#00C9A7] text-[#1E2B27] shadow-sm scale-105"
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
                        className="mt-1.5 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/35 focus:border-[#00C9A7] focus:outline-hidden"
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
                        className="mt-1.5 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/35 focus:border-[#00C9A7] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-white/80">
                        Pakalpojuma virziens
                      </label>
                      <select
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className="mt-1.5 w-full rounded-xl border border-white/20 bg-[#1E2B27] px-4 py-2.5 text-sm text-white focus:border-[#00C9A7] focus:outline-hidden"
                      >
                        <option value="rehab">Muguras, kakla vai locītavu sāpes</option>
                        <option value="women">Sieviešu veselība & pēcdzemdības</option>
                        <option value="children">Zīdaiņu motorā attīstība & hendlings</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/80">
                        Vēlamā speciāliste (pēc izvēles)
                      </label>
                      <select className="mt-1.5 w-full rounded-xl border border-white/20 bg-[#1E2B27] px-4 py-2.5 text-sm text-white focus:border-[#00C9A7] focus:outline-hidden">
                        <option value="">Jebkura pieejamā speciāliste</option>
                        <option value="elina">Elīna Vītola (vadošā fizioterapeite)</option>
                        <option value="marta">Marta Liepa (muguras sāpes, sports)</option>
                        <option value="anna">Anna Ozola (bērni, hendlings)</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-xs font-semibold text-white/80">
                      Īss situācijas apraksts (kas sāp, cik ilgi?)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Kas Jums rada diskomfortu, vai ir bijusi trauma vai izmeklējumi?"
                      className="mt-1.5 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/35 focus:border-[#00C9A7] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button
                    type="submit"
                    className="rounded-full bg-[#C86D51] px-8 py-3.5 text-sm font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-[#B85C42]"
                  >
                    Pieteikt vizīti ({selectedDay.split(",")[0]}, {selectedTime})
                  </button>
                  <a
                    href="https://wa.me/37120000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    <span>💬</span>
                    <span>Rakstīt WhatsApp</span>
                  </a>
                </div>

                <p className="mt-4 text-[11px] text-white/45">
                  Demo koncepts: forma simulē pierakstu. Dati netiek saglabāti vai nodoti trešajām personām.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Accordions */}
      <section className="border-t border-[#1E2B27]/08 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#C86D51]">
              Jautājumi
            </span>
            <h2 className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-[#1E2B27]">
              Biežāk uzdotie jautājumi
            </h2>
          </div>

          <div className="mt-10 space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-2xl border border-[#1E2B27]/08 bg-[#FAF8F5]"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="flex w-full items-center justify-between p-5 text-left font-heading text-sm font-bold text-[#1E2B27]"
                >
                  <span>{faq.q}</span>
                  <span className="ml-2 font-mono text-base text-[#C86D51]">
                    {activeFaq === idx ? "−" : "+"}
                  </span>
                </button>
                {activeFaq === idx && (
                  <div className="border-t border-[#1E2B27]/08 px-5 py-4 text-xs sm:text-sm leading-relaxed text-[#1E2B27]/75">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Contacts */}
      <footer id="kontakti" className="border-t border-[#1E2B27]/10 bg-[#FAF8F5] py-16 text-[#1E2B27]">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <strong className="font-heading text-xl font-bold text-[#1E2B27]">KUSTĪBA</strong>
              <p className="mt-1 text-xs text-[#7A968C]">Fizioterapijas un kustību prakse</p>
              <p className="mt-4 text-xs leading-relaxed text-[#1E2B27]/70">
                Miera iela 24, Rīga, LV-1001.<br />
                Ieeja no Miera ielas pagalma, 2. stāvs, pieejams ērts lifts bērnu ratiņiem.
              </p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#7A968C]">Darba laiks</p>
              <ul className="mt-3 space-y-1.5 text-xs text-[#1E2B27]/80 font-mono">
                <li>Pirmdiena – Piektdiena: 08:00 – 20:00</li>
                <li>Sestdiena: 09:00 – 15:00 (pēc pieraksta)</li>
                <li>Svētdiena: Slēgts</li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#7A968C]">Saziņa</p>
              <p className="mt-3 text-xs text-[#1E2B27]/80">
                Tālrunis: <a href="tel:+37167000000" className="text-[#C86D51] font-mono hover:underline">+371 67 000 000</a>
              </p>
              <p className="mt-1 text-xs text-[#1E2B27]/80">
                E-pasts: <a href="mailto:sveiki@kustiba-demo.lv" className="text-[#C86D51] hover:underline">sveiki@kustiba-demo.lv</a>
              </p>
              <p className="mt-1 text-xs text-[#1E2B27]/80">
                WhatsApp: <a href="https://wa.me/37120000000" className="text-[#C86D51] hover:underline">+371 20 000 000</a>
              </p>
            </div>
          </div>

          <div className="mt-12 border-t border-[#1E2B27]/08 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#1E2B27]/50">
            <p>© {new Date().getFullYear()} KUSTĪBA. Demonstrācijas koncepts.</p>
            <div className="flex items-center gap-4">
              <Link href="/case-studies/physiotherapy" className="text-[#C86D51] hover:underline font-medium">
                Lasīt Saiteo stratēģijas analīzi →
              </Link>
              <Link href="/" className="text-[#1E2B27]/70 hover:underline">
                Saiteo.com
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
