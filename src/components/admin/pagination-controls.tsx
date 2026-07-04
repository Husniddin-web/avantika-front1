"use client";

import {ChevronLeft, ChevronRight} from "lucide-react";

import {Button} from "@/components/ui/button";
import type {PaginationMeta} from "@/lib/admin/api";

export function PaginationControls({meta, onPageChange}: {meta: PaginationMeta; onPageChange: (page: number) => void}) {
  if (meta.totalPages <= 1) return null;

  return (
    <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm font-medium text-slate-500">
        Page <span className="font-bold text-slate-900">{meta.page}</span> of <span className="font-bold text-slate-900">{meta.totalPages}</span> · {meta.total} items
      </p>
      <div className="flex items-center gap-2">
        <Button type="button" variant="outline" size="sm" disabled={!meta.hasPreviousPage} onClick={() => onPageChange(meta.page - 1)}>
          <ChevronLeft className="size-4" />
          Previous
        </Button>
        <Button type="button" variant="outline" size="sm" disabled={!meta.hasNextPage} onClick={() => onPageChange(meta.page + 1)}>
          Next
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
