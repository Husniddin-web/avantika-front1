"use client";

import { useState } from "react";
import { Globe, MapPin, Building2, CheckCircle2, ChevronRight, Award } from "lucide-react";

type CountryData = {
  id: string;
  name: { uz: string; ru: string; en: string };
  flag: string;
  type: { uz: string; ru: string; en: string };
  productsCount: number;
  description: { uz: string; ru: string; en: string };
  coords: { x: number; y: number }; // percentage on map
  status: "hq" | "active" | "partner";
};

const COUNTRIES: CountryData[] = [
  {
    id: "uz",
    name: { uz: "O'zbekiston", ru: "Узбекистан", en: "Uzbekistan" },
    flag: "🇺🇿",
    type: { uz: "Bosh qarorgoh & Ishlab chiqarish", ru: "Штаб-квартира и Производство", en: "Headquarters & Manufacturing" },
    productsCount: 71,
    description: {
      uz: "Bosh boshqaruv idorasi, zamonaviy omborxona va GMP sertifikatlangan ishlab chiqarish majmuasi.",
      ru: "Главный офис управления, современный складской комплекс и сертифицированное GMP производство.",
      en: "Headquarters, modern logistics hub, and GMP-certified manufacturing complex."
    },
    coords: { x: 62, y: 38 },
    status: "hq"
  },
  {
    id: "kz",
    name: { uz: "Qozog'iston", ru: "Казахстан", en: "Kazakhstan" },
    flag: "🇰🇿",
    type: { uz: "Rasmiy vakillik", ru: "Официальное представительство", en: "Official Representative" },
    productsCount: 32,
    description: {
      uz: "32 dan ortiq dori vositalari davlat ro'yxatidan o'tgan va dorixona tarmoqlarida mavjud.",
      ru: "Более 32 наименований препаратов зарегистрированы и доступны в аптечных сетях.",
      en: "Over 32 products registered and actively distributed across pharmacy networks."
    },
    coords: { x: 64, y: 32 },
    status: "active"
  },
  {
    id: "kg",
    name: { uz: "Qirg'iziston", ru: "Кыргызстан", en: "Kyrgyzstan" },
    flag: "🇰🇬",
    type: { uz: "Distribyutorlik tarmog'i", ru: "Дистрибьюторская сеть", en: "Distribution Network" },
    productsCount: 24,
    description: {
      uz: "Keng qamrovli distribyutorlik va gospital sektori bo'yicha yetkazib berish.",
      ru: "Широкая дистрибьюторская сеть и поставки в госпитальный сектор.",
      en: "Comprehensive distribution and supplies to hospital sectors."
    },
    coords: { x: 67, y: 39 },
    status: "active"
  },
  {
    id: "tj",
    name: { uz: "Tojikiston", ru: "Таджикистан", en: "Tajikistan" },
    flag: "🇹🇯",
    type: { uz: "Distribyutorlik tarmog'i", ru: "Дистрибьюторская сеть", en: "Distribution Network" },
    productsCount: 20,
    description: {
      uz: "Sifatli kardiologik va nevrologik preparatlar eksporti.",
      ru: "Экспорт качественных кардиологических и неврологических препаратов.",
      en: "Export of premium cardiology and neurology pharmaceuticals."
    },
    coords: { x: 65, y: 43 },
    status: "active"
  },
  {
    id: "az",
    name: { uz: "Ozarbayjon", ru: "Азербайджан", en: "Azerbaijan" },
    flag: "🇦🇿",
    type: { uz: "Eksport hamkorligi", ru: "Экспортный партнер", en: "Export Partner" },
    productsCount: 18,
    description: {
      uz: "Kavkaz mintaqasidagi strategik farmatsevtik hamkorlik.",
      ru: "Стратегическое фармацевтическое партнерство в Кавказском регионе.",
      en: "Strategic pharmaceutical partnership in the Caucasus region."
    },
    coords: { x: 55, y: 40 },
    status: "active"
  },
  {
    id: "af",
    name: { uz: "Afg'oniston", ru: "Афганистан", en: "Afghanistan" },
    flag: "🇦🇫",
    type: { uz: "Gumanitar va eksport yetkazib berish", ru: "Гуманитарные и экспортные поставки", en: "Humanitarian & Export Supplies" },
    productsCount: 15,
    description: {
      uz: "Hayotiy muhim va shoshilinch yordam preparatlarini muntazam yetkazib berish.",
      ru: "Регулярные поставки жизненно важных и экстренных препаратов.",
      en: "Regular supply of essential and emergency medical preparations."
    },
    coords: { x: 62, y: 47 },
    status: "active"
  },
  {
    id: "ge",
    name: { uz: "Gruziya", ru: "Грузия", en: "Georgia" },
    flag: "🇬🇪",
    type: { uz: "Yevropa darajasidagi sertifikatsiya", ru: "Европейская сертификация", en: "European Standard Certification" },
    productsCount: 14,
    description: {
      uz: "Xalqaro sifat standartlariga muvofiq preparatlar eksporti.",
      ru: "Экспорт препаратов в соответствии с международными стандартами качества.",
      en: "Pharmaceutical export compliant with international quality standards."
    },
    coords: { x: 52, y: 38 },
    status: "active"
  },
  {
    id: "uae",
    name: { uz: "BAA (Dubay)", ru: "ОАЭ (Дубай)", en: "UAE (Dubai)" },
    flag: "🇦🇪",
    type: { uz: "Xalqaro savdo va logistika xabi", ru: "Международный торговый хаб", en: "International Trading Hub" },
    productsCount: 10,
    description: {
      uz: "Yaqin Sharq bo'yicha savdo va strategik logistika markazi.",
      ru: "Торговый и стратегический логистический центр на Ближнем Востоке.",
      en: "Strategic trade and logistics hub for the Middle East."
    },
    coords: { x: 57, y: 52 },
    status: "partner"
  },
  {
    id: "in",
    name: { uz: "Hindiston", ru: "Индия", en: "India" },
    flag: "🇮🇳",
    type: { uz: "R&D va Xom-ashyo hamkorligi", ru: "R&D и Сырьевой партнер", en: "R&D & Substrate Partner" },
    productsCount: 71,
    description: {
      uz: "Farmatsevtik subtansiyalar va ilmiy-tadqiqot R&D hamkorligi.",
      ru: "Партнерство по фармацевтическим субстанциям и научно-исследовательским R&D.",
      en: "Pharmaceutical active substance synthesis and R&D partnership."
    },
    coords: { x: 71, y: 53 },
    status: "partner"
  }
];

export function GlobalPresenceMap({ locale = "uz" }: { locale?: "uz" | "ru" | "en" }) {
  const [selectedCountry, setSelectedCountry] = useState<CountryData>(COUNTRIES[0]);

  const lang = (locale === "ru" || locale === "en" || locale === "uz") ? locale : "uz";

  const labels = {
    uz: {
      eyebrow: "XALQARO QAMROV VA GEOGRAFIYA",
      title: "Dunyo bo'ylab salomatlik posbonimiz",
      description: "Avantika Medex mahsulotlari Markaziy Osiyo va Yaqin Sharqning 9 dan ortiq mamlakatlarida rasmiy ro'yxatdan o'tgan va tarqatilmoqda.",
      products: "Ro'yxatdan o'tgan preparatlar:",
      statusHq: "Bosh qarorgoh",
      statusActive: "Eksport va Vakillik",
      statusPartner: "R&D va Logistika",
      totalCountries: "9+ Mamlakat",
      totalProducts: "70+ Preparat",
      qualityCert: "GMP va ISO sertifikatlangan"
    },
    ru: {
      eyebrow: "МЕЖДУНАРОДНЫЙ ОХВАТ И ГЕОГРАФИЯ",
      title: "Стратегическое присутствие на мировом рынке",
      description: "Продукция Avantika Medex официально зарегистрирована и поставляется более чем в 9 стран Центральной Азии и Ближнего Востока.",
      products: "Зарегистрированные препараты:",
      statusHq: "Главный офис",
      statusActive: "Экспорт и Представительство",
      statusPartner: "R&D и Логистика",
      totalCountries: "9+ Странах",
      totalProducts: "70+ Препаратов",
      qualityCert: "GMP и ISO Сертифицировано"
    },
    en: {
      eyebrow: "GLOBAL REACH & GEOGRAPHY",
      title: "Delivering Health Across Borders",
      description: "Avantika Medex pharmaceuticals are officially registered and distributed across more than 9 countries in Central Asia and the Middle East.",
      products: "Registered Pharmaceuticals:",
      statusHq: "Headquarters",
      statusActive: "Export & Representation",
      statusPartner: "R&D & Logistics Hub",
      totalCountries: "9+ Countries",
      totalProducts: "70+ Products",
      qualityCert: "GMP & ISO Certified"
    }
  }[lang];

  return (
    <section className="relative isolate overflow-hidden bg-[#07092b] py-16 text-white sm:py-24">
      {/* Background glow graphics */}
      <div className="absolute -left-40 top-1/4 size-96 rounded-full bg-blue-600/20 blur-[120px] pointer-events-none" />
      <div className="absolute -right-40 bottom-1/4 size-96 rounded-full bg-indigo-600/20 blur-[120px] pointer-events-none" />

      <div className="container-shell relative z-10">
        {/* Section Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-widest text-blue-300 backdrop-blur-md">
              <Globe className="size-4 text-blue-400" />
              {labels.eyebrow}
            </div>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl leading-tight">
              {labels.title}
            </h2>
            <p className="mt-4 text-sm text-blue-100/75 sm:text-base leading-relaxed">
              {labels.description}
            </p>
          </div>

          {/* Key Stat Cards Header */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5 text-center backdrop-blur-md">
              <p className="text-xl sm:text-2xl font-black text-blue-400">{labels.totalCountries}</p>
              <p className="mt-0.5 text-[10px] sm:text-xs font-semibold text-slate-300">Geografiya</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5 text-center backdrop-blur-md">
              <p className="text-xl sm:text-2xl font-black text-emerald-400">{labels.totalProducts}</p>
              <p className="mt-0.5 text-[10px] sm:text-xs font-semibold text-slate-300">Portfolio</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5 text-center backdrop-blur-md">
              <p className="text-xl sm:text-2xl font-black text-amber-400">GMP</p>
              <p className="mt-0.5 text-[10px] sm:text-xs font-semibold text-slate-300">Sifat</p>
            </div>
          </div>
        </div>

        {/* Mobile Country Selector Pill Switcher */}
        <div className="mt-8 flex gap-2 overflow-x-auto scrollbar-none pb-2 lg:hidden">
          {COUNTRIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCountry(c)}
              className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition ${
                selectedCountry.id === c.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                  : "bg-white/10 text-slate-300 hover:bg-white/15"
              }`}
            >
              <span>{c.flag}</span>
              <span>{c.name[lang]}</span>
            </button>
          ))}
        </div>

        {/* Map & Card Workspace */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
          {/* Vector Map Container */}
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#0b1040] to-[#060824] p-4 shadow-2xl shadow-blue-950/50">
            {/* Grid graphic overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px]" />
            
            {/* World Map SVG Outline graphic */}
            <svg className="size-full opacity-35" viewBox="0 0 1000 600" fill="none">
              {/* Eurasia / Central Asia Region Stylized Path */}
              <path
                d="M450,150 Q520,130 600,160 T750,200 T850,280 T700,380 T550,420 T420,350 T450,150 Z"
                fill="#1e293b"
                stroke="#334155"
                strokeWidth="1.5"
              />
              <path
                d="M500,220 Q560,200 640,230 T720,290 T610,380 T520,320 Z"
                fill="#2563eb"
                fillOpacity="0.15"
                stroke="#3b82f6"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            </svg>

            {/* Interactive Country Pins */}
            {COUNTRIES.map((c) => {
              const isSelected = selectedCountry.id === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedCountry(c)}
                  style={{ left: `${c.coords.x}%`, top: `${c.coords.y}%` }}
                  className="group absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none"
                >
                  {/* Radar pulse animation ring */}
                  <span className={`absolute -inset-2.5 rounded-full transition duration-300 ${
                    isSelected ? "animate-ping bg-blue-500/40" : "group-hover:bg-blue-400/20"
                  }`} />

                  {/* Pin Circle */}
                  <div className={`relative flex size-8 sm:size-10 items-center justify-center rounded-full border-2 text-sm transition duration-300 ${
                    isSelected
                      ? "scale-125 border-white bg-blue-600 text-white shadow-xl shadow-blue-500/50"
                      : c.status === "hq"
                      ? "border-amber-400 bg-amber-500/90 text-white"
                      : "border-blue-400/50 bg-[#0a1145] text-slate-200 hover:scale-110 hover:border-white"
                  }`}>
                    {c.flag}
                  </div>

                  {/* Hover Tag */}
                  <span className={`absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900/90 px-2 py-0.5 text-[10px] font-extrabold text-white transition duration-200 ${
                    isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}>
                    {c.name[lang]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected Country Active Card */}
          <div className="rounded-3xl border border-white/15 bg-gradient-to-b from-white/10 to-white/5 p-6 sm:p-8 backdrop-blur-xl shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl sm:text-4xl">{selectedCountry.flag}</span>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">{selectedCountry.name[lang]}</h3>
                  <span className={`inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider ${
                    selectedCountry.status === "hq" ? "text-amber-400" : "text-blue-400"
                  }`}>
                    {selectedCountry.status === "hq" ? <Award className="size-3" /> : <CheckCircle2 className="size-3" />}
                    {selectedCountry.type[lang]}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{labels.products}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-emerald-400">{selectedCountry.productsCount}+</span>
                <span className="text-xs font-bold text-slate-300">preparat turlari</span>
              </div>
            </div>

            <p className="mt-6 text-sm leading-6 text-slate-300">
              {selectedCountry.description[lang]}
            </p>

            <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-blue-300">
                <MapPin className="size-4 text-blue-400" />
                {selectedCountry.status === "hq" ? labels.statusHq : labels.statusActive}
              </span>
              <span className="text-xs text-slate-400 font-medium">GMP Verified</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
