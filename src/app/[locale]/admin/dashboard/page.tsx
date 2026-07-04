"use client";

import {Newspaper, Package, Users, FolderTree} from "lucide-react";
import {useEffect, useState} from "react";

import {AdminShell} from "@/components/admin/admin-shell";
import {Card, CardContent} from "@/components/ui/card";
import {apiFetch, type DashboardStats} from "@/lib/admin/api";

const cards = [
  {key: "products", label: "Products", icon: Package},
  {key: "news", label: "News", icon: Newspaper},
  {key: "categories", label: "Categories", icon: FolderTree},
  {key: "workers", label: "Workers", icon: Users},
] as const;

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    void apiFetch<DashboardStats>("/admin/stats")
      .then(setStats)
      .catch((error: Error) => setError(error.message));
  }, []);

  return (
    <AdminShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-950">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">Content holati va umumiy statistika.</p>
        </div>
        {error ? <p className="rounded-md bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{error}</p> : null}

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map(({key, label, icon: Icon}) => (
            <Card key={key}>
              <CardContent className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-500">{label}</p>
                  <p className="mt-2 text-3xl font-extrabold text-slate-950">{stats?.totals[key] ?? 0}</p>
                </div>
                <span className="grid size-12 place-items-center rounded-md bg-blue-50 text-blue-800">
                  <Icon className="size-5" />
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
