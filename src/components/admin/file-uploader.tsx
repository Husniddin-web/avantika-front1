"use client";

import {FileDown, FilePlus, X} from "lucide-react";
import {useState} from "react";

import {Button} from "@/components/ui/button";
import type {ImageAsset} from "@/lib/admin/api";
import {uploadImages} from "@/lib/admin/api";

export function FileUploader({
  value,
  onChange,
}: {
  value: ImageAsset | null;
  onChange: (value: ImageAsset | null) => void;
}) {
  const [uploading, setUploading] = useState(false);

  return (
    <div className="space-y-3">
      {!value ? (
        <label className="flex min-h-24 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-4 text-center transition hover:border-blue-300 hover:bg-blue-50/40">
          <FilePlus className="size-6 text-blue-700" />
          <span className="mt-2 text-sm font-bold text-slate-700">{uploading ? "Uploading..." : "Upload instruction PDF"}</span>
          <span className="mt-1 text-xs text-slate-500">PDF file only. Max 8MB.</span>
          <input
            type="file"
            accept="application/pdf"
            className="sr-only"
            disabled={uploading}
            onChange={async (event) => {
              const files = event.target.files;
              if (!files?.length) return;
              setUploading(true);
              try {
                // The backend media upload endpoint handles PDF files as well now
                const result = await uploadImages(files);
                if (result.files?.[0]) {
                  onChange(result.files[0]);
                }
              } catch (error) {
                console.error("Upload failed", error);
              } finally {
                setUploading(false);
                event.target.value = "";
              }
            }}
          />
        </label>
      ) : (
        <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-3.5 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-lg bg-red-50 text-red-600">
              <FileDown className="size-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-slate-700">{value.filename}</p>
              <p className="text-xs text-slate-400">{(value.size / 1024 / 1024).toFixed(2)} MB • PDF Document</p>
            </div>
          </div>
          <Button
            type="button"
            variant="danger"
            size="icon"
            className="size-8 opacity-90"
            onClick={() => onChange(null)}
          >
            <X className="size-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
