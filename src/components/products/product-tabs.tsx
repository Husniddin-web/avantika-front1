"use client";

import {FileDown, FileText} from "lucide-react";
import {useState} from "react";

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
  const [activeTab, setActiveTab] = useState(0);

  const tUz = {
    desc: "Tavsif va Ko'rsatmalar",
    composition: "Tarkib va Doza",
    usage: "Qo'llash va Saqlash",
    docs: "Hujjatlar",
    activeIngredient: "Faol modda:",
    indications: "Qo'llanilishi:",
    dosage: "Dozalash:",
    contra: "Qarshi ko'rsatmalar:",
    storage: "Saqlash sharoiti:",
    package: "Qadoq tavsifi:",
    noDoc: "Yo'riqnoma yuklanmagan.",
    download: "Tibbiy yo'riqnomani yuklab olish (PDF)",
  };

  const tRu = {
    desc: "Описание и Показания",
    composition: "Состав и Дозировка",
    usage: "Применение и Хранение",
    docs: "Документы",
    activeIngredient: "Активное вещество:",
    indications: "Показания к применению:",
    dosage: "Дозировка:",
    contra: "Противопоказания:",
    storage: "Условия хранения:",
    package: "Описание упаковки:",
    noDoc: "Инструкция не загружена.",
    download: "Скачать медицинскую инструкцию (PDF)",
  };

  const tEn = {
    desc: "Description & Indications",
    composition: "Composition & Dosage",
    usage: "Usage & Storage",
    docs: "Documents",
    activeIngredient: "Active Ingredient:",
    indications: "Indications for Use:",
    dosage: "Dosage:",
    contra: "Contraindications:",
    storage: "Storage Conditions:",
    package: "Package Description:",
    noDoc: "No instruction PDF uploaded.",
    download: "Download medical instruction (PDF)",
  };

  const t = locale === "uz" ? tUz : locale === "ru" ? tRu : tEn;

  const tabs = [
    {id: 0, label: t.desc},
    {id: 1, label: t.composition},
    {id: 2, label: t.usage},
    {id: 3, label: t.docs},
  ];

  // Helper to construct PDF URL
  const pdfUrl = instructionPdf?.url
    ? (instructionPdf.url.startsWith("http")
      ? instructionPdf.url
      : `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") ?? "http://localhost:3001"}/uploads/${instructionPdf.url}`)
    : "";

  return (
    <div className="mt-8 space-y-6">
      {/* Tab Selectors */}
      <div className="flex border-b border-slate-200 overflow-x-auto scrollbar-none">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`whitespace-nowrap pb-4 px-6 text-sm font-bold border-b-2 transition-all duration-200 ${
              activeTab === tab.id
                ? "border-blue-700 text-blue-700"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="min-h-[220px]">
        {/* Tab 1: Description & Indications */}
        {activeTab === 0 && (
          <div className="space-y-5 animate-fadeIn">
            {therapeuticIndication && (
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Therapeutic Indication</p>
                <div className="mt-2 text-sm leading-7 text-slate-600 prose prose-blue max-w-none" dangerouslySetInnerHTML={{__html: therapeuticIndication}} />
              </div>
            )}
            {indications && (
              <div className="border-t border-slate-100 pt-4">
                <h4 className="text-sm font-extrabold text-slate-800">{t.indications}</h4>
                <p className="mt-2 text-sm leading-7 text-slate-600">{indications}</p>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Composition & Dosage */}
        {activeTab === 1 && (
          <div className="space-y-5 animate-fadeIn">
            {activeIngredient && (
              <div>
                <h4 className="text-sm font-extrabold text-slate-800">{t.activeIngredient}</h4>
                <p className="mt-2 text-sm leading-7 text-slate-600">{activeIngredient}</p>
              </div>
            )}
            {composition && (
              <div className="border-t border-slate-100 pt-4">
                <h4 className="text-sm font-extrabold text-slate-800">Composition</h4>
                <p className="mt-2 text-sm leading-7 text-slate-600">{composition}</p>
              </div>
            )}
            {dosage && (
              <div className="border-t border-slate-100 pt-4">
                <h4 className="text-sm font-extrabold text-slate-800">{t.dosage}</h4>
                <p className="mt-2 text-sm leading-7 text-slate-600">{dosage}</p>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Usage & Storage */}
        {activeTab === 2 && (
          <div className="space-y-5 animate-fadeIn">
            {usageInstructions && (
              <div>
                <h4 className="text-sm font-extrabold text-slate-800">Usage Instructions</h4>
                <p className="mt-2 text-sm leading-7 text-slate-600">{usageInstructions}</p>
              </div>
            )}
            {contraindications && (
              <div className="border-t border-slate-100 pt-4">
                <h4 className="text-sm font-extrabold text-red-600">{t.contra}</h4>
                <p className="mt-2 text-sm leading-7 text-slate-600">{contraindications}</p>
              </div>
            )}
            {storageConditions && (
              <div className="border-t border-slate-100 pt-4">
                <h4 className="text-sm font-extrabold text-slate-800">{t.storage}</h4>
                <p className="mt-2 text-sm leading-7 text-slate-600">{storageConditions}</p>
              </div>
            )}
            {packageDescription && (
              <div className="border-t border-slate-100 pt-4">
                <h4 className="text-sm font-extrabold text-slate-800">{t.package}</h4>
                <p className="mt-2 text-sm leading-7 text-slate-600">{packageDescription}</p>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Documents (Instruction PDF) */}
        {activeTab === 3 && (
          <div className="animate-fadeIn">
            {pdfUrl ? (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-slate-200 p-5 bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <span className="grid size-12 place-items-center rounded-xl bg-red-50 text-red-600 shadow-sm">
                    <FileText className="size-6" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{instructionPdf?.filename || "Instruction.pdf"}</p>
                    <p className="text-xs text-slate-400">PDF Document • Instruction for use</p>
                  </div>
                </div>
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-blue-700 px-6 text-sm font-bold text-white shadow-md shadow-blue-800/10 transition hover:-translate-y-0.5 hover:bg-blue-800 focus-visible:outline-blue-700"
                >
                  <FileDown className="size-4" />
                  {t.download}
                </a>
              </div>
            ) : (
              <p className="text-sm text-slate-400 italic">{t.noDoc}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
