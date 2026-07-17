"use client";

import {Send, CheckCircle2} from "lucide-react";
import {useState, type FormEvent} from "react";

type PharmacovigilanceFormProps = {
  locale: string;
};

export function PharmacovigilanceForm({locale}: PharmacovigilanceFormProps) {
  const [patientName, setPatientName] = useState("");
  const [reporterName, setReporterName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [drugName, setDrugName] = useState("");
  const [sideEffect, setSideEffect] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const tUz = {
    title: "Nojo‘ya ta’sir haqida xabar berish",
    formDesc: "Iltimos, dori vositasining nojo‘ya ta’siriga oid ma’lumotlarni kiriting. Ushbu ma’lumotlar bemorlar xavfsizligini ta’minlashga yordam beradi.",
    patientNameLabel: "Bemor F.I.O. (F.I.O. пациента)",
    reporterNameLabel: "Murojaatchi F.I.O. (agar shifokor bo‘lsa)",
    phoneLabel: "Telefon raqami",
    emailLabel: "Email manzili",
    drugLabel: "Preparat nomi va dozasi",
    effectLabel: "Nojo‘ya ta’sir tavsifi",
    submit: "Hisobot yuborish",
    submitting: "Yuborilmoqda...",
    success: "Murojaatingiz qabul qilindi!",
    successDesc: "Xabaringiz farmakonadzor bo‘limiga yuborildi. Bemorlar xavfsizligini ta'minlashga qo'shgan hissangiz uchun rahmat.",
    errorMsg: "Xatolik yuz berdi. Iltimos, keyinroq qayta urinib ko‘ring."
  };

  const tRu = {
    title: "Сообщить о нежелательной реакции",
    formDesc: "Пожалуйста, предоставьте информацию о подозреваемой нежелательной реакции. Эти сведения очень важны для обеспечения безопасности пациентов.",
    patientNameLabel: "Ф.И.О. пациента",
    reporterNameLabel: "Ф.И.О. сообщающего (если врач/провизор)",
    phoneLabel: "Номер телефона",
    emailLabel: "Электронная почта",
    drugLabel: "Препарат и дозировка",
    effectLabel: "Описание нежелательной реакции",
    submit: "Отправить сообщение",
    submitting: "Отправка...",
    success: "Сообщение принято!",
    successDesc: "Ваш отчет успешно передан в отдел фармаконадзора. Благодарим вас за вклад в безопасность пациентов.",
    errorMsg: "Произошла ошибка. Пожалуйста, попробуйте позже."
  };

  const tEn = {
    title: "Report an Adverse Reaction",
    formDesc: "Please provide information about the suspected adverse reaction. This data is critical for ensuring patient safety.",
    patientNameLabel: "Patient Full Name",
    reporterNameLabel: "Reporter Name (if doctor/pharmacist)",
    phoneLabel: "Phone Number",
    emailLabel: "Email Address",
    drugLabel: "Drug Name & Dosage",
    effectLabel: "Adverse Reaction Description",
    submit: "Submit Report",
    submitting: "Submitting...",
    success: "Report Submitted!",
    successDesc: "Your report has been successfully forwarded to the pharmacovigilance department. Thank you for contributing to patient safety.",
    errorMsg: "An error occurred. Please try again later."
  };

  const t = locale === "uz" ? tUz : locale === "ru" ? tRu : tEn;

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

    // Format fields into a structured message for the backend
    const formattedMessage = `
[Bemor / Patient]: ${patientName}
[Shifokor / Reporter]: ${reporterName || "N/A"}
[Dori / Drug]: ${drugName}
[Nojo'ya ta'sir / Side Effect]: ${sideEffect}
    `.trim();

    try {
      const response = await fetch(`${API_URL}/inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: reporterName || patientName,
          company: reporterName ? "Doctor/Pharmacist" : "Patient",
          email,
          phone,
          type: "pharmacovigilance",
          message: formattedMessage,
          locale,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      setSubmitted(true);
    } catch (err) {
      setError(t.errorMsg);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-6 text-center shadow-xl shadow-blue-950/5 sm:rounded-[2.2rem] sm:p-10 flex flex-col items-center justify-center min-h-[400px]">
        <CheckCircle2 className="size-16 text-blue-600 animate-scaleIn" />
        <h3 className="mt-4 text-2xl font-extrabold text-slate-900">{t.success}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600 max-w-sm">{t.successDesc}</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-blue-950/5 sm:rounded-[2.2rem] sm:p-8 animate-fadeIn">
      <h3 className="text-lg font-extrabold text-slate-950 sm:text-2xl">{t.title}</h3>
      <p className="mt-2 text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6">{t.formDesc}</p>
      
      {error && <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}
      
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 sm:text-[11px]">{t.patientNameLabel}</label>
            <input
              type="text"
              required
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 text-xs outline-none transition focus:border-blue-600 focus:bg-white sm:h-12 sm:px-4 sm:text-sm"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 sm:text-[11px]">{t.reporterNameLabel}</label>
            <input
              type="text"
              value={reporterName}
              onChange={(e) => setReporterName(e.target.value)}
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 text-xs outline-none transition focus:border-blue-600 focus:bg-white sm:h-12 sm:px-4 sm:text-sm"
            />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 sm:text-[11px]">{t.phoneLabel}</label>
            <input
              type="tel"
              required
              placeholder="+998"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 text-xs outline-none transition focus:border-blue-600 focus:bg-white sm:h-12 sm:px-4 sm:text-sm"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 sm:text-[11px]">{t.emailLabel}</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 text-xs outline-none transition focus:border-blue-600 focus:bg-white sm:h-12 sm:px-4 sm:text-sm"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-500 sm:text-[11px]">{t.drugLabel}</label>
          <input
            type="text"
            required
            placeholder="Velkluza 400mg/100mg"
            value={drugName}
            onChange={(e) => setDrugName(e.target.value)}
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 text-xs outline-none transition focus:border-blue-600 focus:bg-white sm:h-12 sm:px-4 sm:text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-500 sm:text-[11px]">{t.effectLabel}</label>
          <textarea
            required
            rows={4}
            value={sideEffect}
            onChange={(e) => setSideEffect(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 text-xs outline-none transition focus:border-blue-600 focus:bg-white resize-none sm:p-4 sm:text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-700 text-sm font-bold text-white shadow-lg shadow-blue-800/10 transition hover:bg-blue-800 disabled:opacity-50 sm:min-h-12"
        >
          {submitting ? t.submitting : t.submit}
          <Send className="size-4" />
        </button>
      </form>
    </div>
  );
}
