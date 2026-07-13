"use client";

import {useState, FormEvent} from "react";
import {Send, CheckCircle2} from "lucide-react";

export function InquiryForm({locale}: {locale: string}) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState<"general" | "partnership" | "distribution" | "product">("general");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const tUz = {
    title: "Hamkorlik yoki so'rov yuborish",
    name: "Ismingiz",
    company: "Kompaniya nomi (ixtiyoriy)",
    email: "Email manzilingiz",
    phone: "Telefon raqamingiz",
    type: "Murojaat turi",
    msg: "Xabaringiz",
    submit: "Murojaatni yuborish",
    submitting: "Yuborilmoqda...",
    success: "Rahmat! Murojaatingiz yuborildi.",
    successDesc: "Tez orada jamoamiz siz bilan bog'lanadi va xabaringiz Telegram guruhimizga ham yuborildi.",
    types: {
      general: "Umumiy savollar",
      partnership: "Hamkorlik taklifi",
      distribution: "Distribyutorlik",
      product: "Mahsulot bo'yicha so'rov",
    },
    error: "Xatolik yuz berdi. Iltimos qaytadan urinib ko'ring.",
  };

  const tRu = {
    title: "Отправить запрос или предложение",
    name: "Ваше имя",
    company: "Название компании (опционально)",
    email: "Ваш Email",
    phone: "Номер телефона",
    type: "Тип обращения",
    msg: "Ваше сообщение",
    submit: "Отправить запрос",
    submitting: "Отправка...",
    success: "Спасибо! Ваш запрос отправлен.",
    successDesc: "Наша команда скоро свяжется с вами, а сообщение также отправлено в нашу Telegram группу.",
    types: {
      general: "Общие вопросы",
      partnership: "Предложение о сотрудничестве",
      distribution: "Дистрибьюторство",
      product: "Запрос по продукту",
    },
    error: "Произошла ошибка. Пожалуйста, попробуйте еще раз.",
  };

  const tEn = {
    title: "Send an Inquiry or Proposal",
    name: "Your Name",
    company: "Company Name (optional)",
    email: "Your Email",
    phone: "Phone Number",
    type: "Inquiry Type",
    msg: "Your Message",
    submit: "Submit Inquiry",
    submitting: "Submitting...",
    success: "Thank you! Your inquiry has been sent.",
    successDesc: "Our team will contact you soon. The message has also been delivered to our Telegram group.",
    types: {
      general: "General Inquiries",
      partnership: "Partnership Proposal",
      distribution: "Distribution Partnership",
      product: "Product Inquiry",
    },
    error: "An error occurred. Please try again.",
  };

  const t = locale === "uz" ? tUz : locale === "ru" ? tRu : tEn;

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

    try {
      const response = await fetch(`${API_URL}/inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          company,
          email,
          phone,
          type,
          message,
          locale,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      setSubmitted(true);
    } catch (err) {
      setError(t.error);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 bg-emerald-50/50 border border-emerald-150 rounded-[2rem] animate-fadeIn">
        <CheckCircle2 className="size-16 text-emerald-600 animate-bounce" />
        <h3 className="mt-4 text-2xl font-extrabold text-slate-900">{t.success}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600 max-w-sm">{t.successDesc}</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-blue-950/5 sm:rounded-[2.2rem] sm:p-8 animate-fadeIn">
      <h3 className="text-lg font-extrabold text-slate-950 sm:text-2xl">{t.title}</h3>
      {error && <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}
      <form onSubmit={onSubmit} className="mt-5 space-y-3 sm:mt-6 sm:space-y-4">
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 sm:text-xs">{t.name}</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 text-xs outline-none transition focus:border-blue-600 focus:bg-white sm:h-12 sm:px-4 sm:text-sm"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 sm:text-xs">{t.company}</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 text-xs outline-none transition focus:border-blue-600 focus:bg-white sm:h-12 sm:px-4 sm:text-sm"
            />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 sm:text-xs">{t.email}</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 text-xs outline-none transition focus:border-blue-600 focus:bg-white sm:h-12 sm:px-4 sm:text-sm"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 sm:text-xs">{t.phone}</label>
            <input
              type="tel"
              required
              placeholder="+998"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 text-xs outline-none transition focus:border-blue-600 focus:bg-white sm:h-12 sm:px-4 sm:text-sm"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 sm:text-xs">{t.type}</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as any)}
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 text-xs outline-none transition focus:border-blue-600 focus:bg-white sm:h-12 sm:px-4 sm:text-sm"
          >
            <option value="general">{t.types.general}</option>
            <option value="partnership">{t.types.partnership}</option>
            <option value="distribution">{t.types.distribution}</option>
            <option value="product">{t.types.product}</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 sm:text-xs">{t.msg}</label>
          <textarea
            required
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
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
