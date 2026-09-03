"use client";

import {FileDown, FileText, Pill, ShieldAlert} from "lucide-react";

type ProductTabsProps = {
  therapeuticIndication: string;
  indications: string;
  composition: string;
  activeIngredient: string;
  dosage: string;
  usageInstructions: string;
  contraindications: string;
  storageConditions: string;
  packageDescription: string;
  instructionPdf: {url: string; filename: string} | null;
  locale: string;
};

export function ProductTabs({
  therapeuticIndication,
  indications,
  composition,
  activeIngredient,
  dosage,
  usageInstructions,
  contraindications,
  storageConditions,
  packageDescription,
  instructionPdf,
  locale,
}: ProductTabsProps) {
  const tUz = {
    indications: "Qo'llanilishi",
    composition: "Tarkibi va Faol modda",
    activeIngredient: "Faol modda:",
    compositionLabel: "Tarkibi:",
    dosageAndUsage: "Dozalash va Qo'llash usuli",
    dosage: "Dozalash:",
    usageInstructions: "Qo'llash usuli:",
    contra: "Qarshi ko'rsatmalar",
    storageAndPkg: "Saqlash va Qadoq",
    storage: "Saqlash sharoiti:",
    package: "Qadoq tavsifi:",
    officialDoc: "Rasmiy tibbiy yo'riqnoma",
    pdfSubtitle: "Tasdiqlangan PDF yo'riqnoma • To'liq ma'lumotlar",
    openPdf: "Yo'riqnomani ochish (PDF)",
    noDoc: "Ushbu preparat uchun PDF yo'riqnoma yuklanmagan.",
  };

  const tRu = {
    indications: "Показания к применению",
    composition: "Состав и Активное вещество",
    activeIngredient: "Активное вещество:",
    compositionLabel: "Состав:",
    dosageAndUsage: "Дозировка и Способ применения",
    dosage: "Дозировка:",
    usageInstructions: "Способ применения:",
    contra: "Противопоказания",
    storageAndPkg: "Хранение и Упаковка",
    storage: "Условия хранения:",
    package: "Форма упаковки:",
    officialDoc: "Официальная медицинская инструкция",
    pdfSubtitle: "Утвержденная PDF инструкция • Полная информация",
    openPdf: "Открыть инструкцию (PDF)",
    noDoc: "Медицинская инструкция в формате PDF не загружена.",
  };

  const tEn = {
    indications: "Indications for Use",
    composition: "Composition & Active Ingredient",
    activeIngredient: "Active Ingredient:",
    compositionLabel: "Composition:",
    dosageAndUsage: "Dosage & Administration",
    dosage: "Dosage:",
    usageInstructions: "Usage Instructions:",
    contra: "Contraindications",
    storageAndPkg: "Storage & Packaging",
    storage: "Storage Conditions:",
    package: "Package Description:",
    officialDoc: "Official Medical Leaflet",
    pdfSubtitle: "Approved PDF Document • Complete Prescribing Info",
    openPdf: "Open Medical Leaflet (PDF)",
    noDoc: "No official instruction PDF uploaded.",
  };

  const t = locale === "uz" ? tUz : locale === "ru" ? tRu : tEn;

  // Helper to construct PDF URL
  const pdfUrl = instructionPdf?.url
    ? (instructionPdf.url.startsWith("http")
      ? instructionPdf.url
      : `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") ?? "http://localhost:3001"}/uploads/${instructionPdf.url}`)
    : "";

  const mainIndication = therapeuticIndication || indications;
  const hasComposition = activeIngredient || composition;
  const hasUsage = dosage || usageInstructions;
  const hasStorage = storageConditions || packageDescription;

  return (
    <div className="mt-5 max-h-[520px] sm:max-h-[600px] overflow-y-auto pr-2 space-y-5 scrollbar-thin scrollbar-thumb-slate-200 hover:scrollbar-thumb-slate-300">
      {/* 1. Qo'llanilishi (Indications) */}
      {mainIndication ? (
        <div className="rounded-2xl bg-slate-50/70 p-4 sm:p-5 border border-slate-200/80">
          <div className="flex items-center gap-2 text-blue-700">
            <span className="grid size-6 place-items-center rounded-md bg-blue-100/70 text-blue-700">
              <Pill className="size-3.5" />
            </span>
            <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider">{t.indications}</h3>
          </div>
          {mainIndication.includes("<") && mainIndication.includes(">") ? (
            <div
              className="mt-3 text-xs sm:text-sm leading-6 text-slate-600 prose prose-blue max-w-none"
              dangerouslySetInnerHTML={{__html: mainIndication}}
            />
          ) : (
            <p className="mt-3 text-xs sm:text-sm leading-6 text-slate-600 whitespace-pre-line">
              {mainIndication}
            </p>
          )}
        </div>
      ) : null}

      {/* 2. Tarkibi va Faol modda (Composition & Active Ingredient) */}
      {hasComposition ? (
        <div className="rounded-2xl bg-white p-4 sm:p-5 border border-slate-200/80 shadow-sm space-y-3">
          <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
            {t.composition}
          </h3>
          {activeIngredient ? (
            <div className="text-xs sm:text-sm">
              <span className="font-bold text-slate-500">{t.activeIngredient} </span>
              <span className="font-semibold text-slate-800">{activeIngredient}</span>
            </div>
          ) : null}
          {composition ? (
            <div className="text-xs sm:text-sm">
              <span className="font-bold text-slate-500">{t.compositionLabel} </span>
              <span className="text-slate-700 leading-relaxed">{composition}</span>
            </div>
          ) : null}
        </div>
      ) : null}

      {/* 3. Dozalash va Qo'llash usuli (Dosage & Usage) */}
      {hasUsage ? (
        <div className="rounded-2xl bg-white p-4 sm:p-5 border border-slate-200/80 shadow-sm space-y-3">
          <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
            {t.dosageAndUsage}
          </h3>
          {dosage ? (
            <div className="text-xs sm:text-sm">
              <span className="font-bold text-slate-500">{t.dosage} </span>
              <span className="text-slate-700 leading-relaxed">{dosage}</span>
            </div>
          ) : null}
          {usageInstructions ? (
            <div className="text-xs sm:text-sm">
              <span className="font-bold text-slate-500">{t.usageInstructions} </span>
              <span className="text-slate-700 leading-relaxed">{usageInstructions}</span>
            </div>
          ) : null}
        </div>
      ) : null}

      {/* 4. Qarshi ko'rsatmalar (Contraindications) */}
      {contraindications ? (
        <div className="rounded-2xl bg-red-50/40 p-4 sm:p-5 border border-red-200/80">
          <div className="flex items-center gap-2 text-red-700">
            <span className="grid size-6 place-items-center rounded-md bg-red-100 text-red-700">
              <ShieldAlert className="size-3.5" />
            </span>
            <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider">{t.contra}</h3>
          </div>
          <p className="mt-2.5 text-xs sm:text-sm leading-6 text-red-950/85">
            {contraindications}
          </p>
        </div>
      ) : null}

      {/* 5. Saqlash va Qadoq (Storage & Packaging) */}
      {hasStorage ? (
        <div className="rounded-2xl bg-white p-4 sm:p-5 border border-slate-200/80 shadow-sm space-y-3">
          <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
            {t.storageAndPkg}
          </h3>
          {storageConditions ? (
            <div className="text-xs sm:text-sm">
              <span className="font-bold text-slate-500">{t.storage} </span>
              <span className="text-slate-700 leading-relaxed">{storageConditions}</span>
            </div>
          ) : null}
          {packageDescription ? (
            <div className="text-xs sm:text-sm">
              <span className="font-bold text-slate-500">{t.package} </span>
              <span className="text-slate-700 leading-relaxed">{packageDescription}</span>
            </div>
          ) : null}
        </div>
      ) : null}

      {/* 6. Rasmiy tibbiy yo'riqnoma PDF Card */}
      {pdfUrl ? (
        <div className="group relative overflow-hidden rounded-2xl border border-red-200/90 bg-gradient-to-r from-red-50/50 via-white to-slate-50/60 p-4 sm:p-5 shadow-sm transition hover:border-red-300 hover:shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="relative flex size-12 shrink-0 flex-col items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-md shadow-red-500/20">
                <FileText className="size-5" />
                <span className="mt-0.5 text-[9px] font-black uppercase tracking-wider leading-none">PDF</span>
              </div>
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1">{t.officialDoc}</h4>
                <p className="mt-0.5 text-[11px] sm:text-xs text-slate-500">{t.pdfSubtitle}</p>
              </div>
            </div>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-10 sm:min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 text-xs sm:text-sm font-bold text-white shadow-md shadow-red-600/20 transition duration-200 hover:-translate-y-0.5 hover:bg-red-700 active:translate-y-0"
            >
              <FileDown className="size-4" />
              {t.openPdf}
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}
