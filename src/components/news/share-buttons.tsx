"use client";

import {useState} from "react";
import {Check, Link2, Send} from "lucide-react";

type ShareButtonsProps = {
  url: string;
  title: string;
  labels: {
    share: string;
    copied: string;
  };
};

export function ShareButtons({url, title, labels}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy url: ", err);
    }
  };

  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-slate-50/50 p-5">
      <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">{labels.share}</h3>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleCopy}
          className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-700 transition hover:bg-slate-50 active:scale-[0.98]"
        >
          {copied ? (
            <>
              <Check className="size-4 text-emerald-600 animate-scale-in" />
              <span className="text-emerald-700">{labels.copied}</span>
            </>
          ) : (
            <>
              <Link2 className="size-4 text-slate-500" />
              <span>Copy Link</span>
            </>
          )}
        </button>

        <a
          href={telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-10 items-center gap-2 rounded-xl border border-blue-100 bg-[#229ED9]/5 px-4 text-xs font-bold text-[#229ED9] transition hover:bg-[#229ED9]/10 active:scale-[0.98]"
        >
          <Send className="size-4" />
          <span>Telegram</span>
        </a>

        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-10 items-center gap-2 rounded-xl border border-blue-100 bg-[#0077B5]/5 px-4 text-xs font-bold text-[#0077B5] transition hover:bg-[#0077B5]/10 active:scale-[0.98]"
        >
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
          </svg>
          <span>LinkedIn</span>
        </a>
      </div>
    </div>
  );
}
