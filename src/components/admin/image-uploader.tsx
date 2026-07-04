"use client";

import Image from "next/image";
import {ImagePlus, X} from "lucide-react";
import {useState} from "react";

import {Button} from "@/components/ui/button";
import type {ImageAsset} from "@/lib/admin/api";
import {uploadImages} from "@/lib/admin/api";
import {imageSrc} from "@/lib/image-src";

export function ImageUploader({
  value,
  onChange,
  multiple = true,
}: {
  value: ImageAsset[];
  onChange: (value: ImageAsset[]) => void;
  multiple?: boolean;
}) {
  const [uploading, setUploading] = useState(false);

  return (
    <div className="space-y-3">
      <label className="flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center transition hover:border-blue-300 hover:bg-blue-50/40">
        <ImagePlus className="size-7 text-blue-700" />
        <span className="mt-2 text-sm font-bold text-slate-700">{uploading ? "Uploading..." : "Upload images"}</span>
        <span className="mt-1 text-xs text-slate-500">PNG, JPG, WEBP, AVIF. Multiple files supported.</span>
        <input
          type="file"
          accept="image/*"
          multiple={multiple}
          className="sr-only"
          disabled={uploading}
          onChange={async (event) => {
            const files = event.target.files;
            if (!files?.length) return;
            setUploading(true);
            try {
              const result = await uploadImages(files);
              onChange(multiple ? [...value, ...result.files] : result.files.slice(0, 1));
            } finally {
              setUploading(false);
              event.target.value = "";
            }
          }}
        />
      </label>
      {value.length ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {value.map((image) => (
            <div key={image.url} className="group relative overflow-hidden rounded-md border border-slate-200 bg-white">
              <div className="relative aspect-square">
                <Image src={imageSrc(image.url)} alt="" fill sizes="160px" className="object-cover" unoptimized />
              </div>
              <Button
                type="button"
                variant="danger"
                size="icon"
                className="absolute right-2 top-2 size-8 opacity-95"
                onClick={() => onChange(value.filter((item) => item.url !== image.url))}
              >
                <X className="size-4" />
              </Button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
