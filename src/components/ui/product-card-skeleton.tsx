"use client";

export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-[1.25rem] border border-slate-200/80 bg-white p-0 shadow-sm sm:rounded-3xl animate-pulse">
      <div className="aspect-[4/3] w-full bg-slate-100/80" />
      <div className="p-3 sm:p-6 space-y-3">
        <div className="h-2.5 w-24 rounded-full bg-slate-200" />
        <div className="h-5 w-3/4 rounded-lg bg-slate-200" />
        <div className="h-3.5 w-1/2 rounded-md bg-slate-100" />
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
          <div className="h-4 w-20 rounded-md bg-slate-200" />
          <div className="size-4 rounded-full bg-slate-200" />
        </div>
      </div>
    </div>
  );
}
