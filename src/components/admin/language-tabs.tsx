"use client";

import type {LocalizedText} from "@/lib/admin/api";
import {cn} from "@/lib/utils";

export type AdminLanguage = keyof LocalizedText;

const languages: Array<{key: AdminLanguage; label: string}> = [
  {key: "uz", label: "UZ"},
  {key: "ru", label: "RU"},
  {key: "en", label: "EN"},
];

export function LanguageTabs({value, onChange}: {value: AdminLanguage; onChange: (value: AdminLanguage) => void}) {
  return (
    <div className="sticky top-0 z-10 -mx-5 mb-5 border-b border-slate-100 bg-white px-5 pb-4">
      <div className="inline-flex rounded-lg bg-slate-100 p-1">
        {languages.map((language) => (
          <button
            key={language.key}
            type="button"
            onClick={() => onChange(language.key)}
            className={cn(
              "rounded-md px-4 py-2 text-sm font-extrabold transition",
              value === language.key ? "bg-white text-blue-800 shadow-sm" : "text-slate-500 hover:text-slate-900",
            )}
          >
            {language.label}
          </button>
        ))}
      </div>
    </div>
  );
}
