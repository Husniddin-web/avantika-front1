"use client";

import {Eye, EyeOff, LockKeyhole} from "lucide-react";
import {FormEvent, useState} from "react";
import {useParams, useRouter} from "next/navigation";

import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {login} from "@/lib/admin/api";

export default function AdminLoginPage() {
  const router = useRouter();
  const params = useParams<{locale: string}>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setError("");
    setLoading(true);
    try {
      await login(String(formData.get("username") ?? ""), String(formData.get("password") ?? ""));
      router.replace(`/${params.locale}/admin/dashboard`);
    } catch {
      setError("Login yoki parol noto‘g‘ri.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="mx-auto mb-4 grid size-12 place-items-center rounded-md bg-blue-50 text-blue-800">
            <LockKeyhole className="size-6" />
          </div>
          <CardTitle className="text-center text-2xl">Admin panel</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" name="username" autoComplete="username" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  className="pr-11"
                  required
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute inset-y-0 right-0 grid w-11 place-items-center rounded-r-md text-slate-500 transition hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>
            {error ? <p className="rounded-md bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{error}</p> : null}
            <Button className="w-full" disabled={loading}>{loading ? "Tekshirilmoqda..." : "Login"}</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
