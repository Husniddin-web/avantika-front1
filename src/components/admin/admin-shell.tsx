"use client";

import {BarChart3, FolderTree, Inbox, LogOut, Newspaper, Package, Users} from "lucide-react";
import {useEffect, useState, type ReactNode} from "react";
import {useParams, useRouter} from "next/navigation";

import {Button} from "@/components/ui/button";
import {checkSession, clearToken, getToken} from "@/lib/admin/api";
import {Link, usePathname} from "@/i18n/navigation";
import {cn} from "@/lib/utils";

const items = [
  {href: "/admin/dashboard", label: "Dashboard", icon: BarChart3},
  {href: "/admin/products", label: "Products", icon: Package},
  {href: "/admin/news", label: "News", icon: Newspaper},
  {href: "/admin/categories", label: "Categories", icon: FolderTree},
  {href: "/admin/workers", label: "Workers", icon: Users},
  {href: "/admin/inquiries", label: "Inquiries", icon: Inbox},
] as const;

export function AdminShell({children}: {children: ReactNode}) {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams<{locale: string}>();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!getToken()) {
      router.replace(`/${params.locale}/admin/login`);
      return;
    }

    let cancelled = false;

    checkSession()
      .then(() => {
        if (!cancelled) setReady(true);
      })
      .catch(() => {
        clearToken();
        if (!cancelled) router.replace(`/${params.locale}/admin/login`);
      });

    return () => {
      cancelled = true;
    };
  }, [params.locale, router]);

  if (!ready) {
    return <div className="fixed inset-0 z-50 grid place-items-center bg-slate-50 text-sm font-semibold text-slate-500">Loading admin...</div>;
  }

  return (
    <div className="fixed inset-0 z-50 grid bg-slate-50 text-slate-950 lg:grid-cols-[260px_1fr]">
      <aside className="hidden border-r border-slate-200 bg-white lg:block">
        <div className="border-b border-slate-100 p-6">
          <p className="text-lg font-extrabold text-blue-800">Avantika Admin</p>
          <p className="mt-1 text-xs font-medium text-slate-500">Content management</p>
        </div>
        <nav className="space-y-1 p-3">
          {items.map(({href, label, icon: Icon}) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold transition",
                  active ? "bg-blue-50 text-blue-800" : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
                )}
              >
                <Icon className="size-4" />
                {label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <div className="flex min-h-0 flex-col">
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 lg:px-8">
          <div>
            <p className="text-sm font-bold text-slate-950 lg:hidden">Avantika Admin</p>
            <p className="hidden text-sm font-semibold text-slate-500 lg:block">Admin panel</p>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto lg:hidden">
            {items.map(({href, icon: Icon}) => (
              <Link key={href} href={href} className={cn("grid size-10 shrink-0 place-items-center rounded-md", pathname === href ? "bg-blue-50 text-blue-800" : "text-slate-500")}>
                <Icon className="size-4" />
              </Link>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              clearToken();
              router.replace(`/${params.locale}/admin/login`);
            }}
          >
            <LogOut className="size-4" />
            Logout
          </Button>
        </header>
        <main className="min-h-0 overflow-y-auto p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
