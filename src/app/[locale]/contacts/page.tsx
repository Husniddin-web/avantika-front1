import {ExternalLink, Mail, MapPin, Phone, Send} from "lucide-react";
import {hasLocale} from "next-intl";
import {setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";

import {PageHero} from "@/components/shared/page-hero";
import {routing} from "@/i18n/routing";

const contacts = [
  {icon: Phone, title: "Phone", value: "+998 90 123 45 67", href: "tel:+998901234567"},
  {icon: Mail, title: "Email", value: "info@avantika.uz", href: "mailto:info@avantika.uz"},
  {icon: MapPin, title: "Location", value: "Tashkent, Republic of Uzbekistan", href: "https://maps.google.com"},
];
const mapsUrl = "https://www.google.com/maps?q=Tashkent,+Uzbekistan&output=embed";
const mapsLink = "https://www.google.com/maps/search/?api=1&query=Tashkent%2C%20Uzbekistan";

export default async function ContactsPage({params}: PageProps<"/[locale]/contacts">) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <main className="bg-white">
      <PageHero title="Contact us" eyebrow="We are here to help" image="/contact-page.jpg" />
      <section className="section-space bg-[#f7faff]">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-blue-700">Contact details</p>
            <h2 className="mt-4 text-4xl font-extrabold tracking-[-0.04em] text-slate-950 sm:text-5xl">Let’s connect with the right team</h2>
            <p className="mt-5 text-base leading-8 text-slate-600">For partnerships, product information or pharmacovigilance questions, contact Avantika through the channels below.</p>
            <div className="mt-8 grid gap-4">
              {contacts.map(({icon: Icon, title, value, href}) => (
                <a key={title} href={href} className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-200">
                  <span className="grid size-13 place-items-center rounded-2xl bg-blue-50 text-blue-800"><Icon className="size-6" /></span>
                  <span>
                    <span className="block text-xs font-extrabold uppercase tracking-[0.16em] text-slate-400">{title}</span>
                    <span className="mt-1 block font-bold text-slate-950">{value}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-blue-950/5">
            <div className="min-h-[320px] bg-[linear-gradient(135deg,rgba(8,10,75,0.92),rgba(41,72,200,0.76)),url('/hero-slide-4.webp')] bg-cover bg-center p-8 text-white">
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-blue-100">Avantika office</p>
              <h3 className="mt-4 max-w-sm text-3xl font-extrabold">Tashkent, Uzbekistan</h3>
              <p className="mt-4 max-w-md text-sm leading-7 text-blue-100/75">Our team will route your request to the appropriate department and respond as soon as possible.</p>
            </div>
            <div className="p-6">
              <a href="mailto:info@avantika.uz" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-blue-700 px-6 text-sm font-bold text-white hover:bg-blue-800">
                Send email <Send className="size-4" />
              </a>
            </div>
          </div>
        </div>
        <div className="container-shell mt-10">
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-blue-950/5">
            <div className="flex flex-col gap-4 border-b border-slate-100 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-blue-700">Location</p>
                <h2 className="mt-2 text-2xl font-extrabold text-slate-950">Find us on Google Maps</h2>
                <p className="mt-2 text-sm text-slate-500">Tashkent, Republic of Uzbekistan</p>
              </div>
              <a href={mapsLink} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-slate-200 px-5 text-sm font-bold text-slate-700 hover:border-blue-300 hover:text-blue-700">
                Open in Google Maps <ExternalLink className="size-4" />
              </a>
            </div>
            <iframe
              title="Avantika location map"
              src={mapsUrl}
              className="h-[360px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
