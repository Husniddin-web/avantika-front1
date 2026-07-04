import {redirect} from "@/i18n/navigation";
import type {Locale} from "@/i18n/routing";

export default async function AdminIndex({params}: PageProps<"/[locale]/admin">) {
  const {locale} = await params;
  redirect({href: "/admin/dashboard", locale: locale as Locale});
}
