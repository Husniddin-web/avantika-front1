"use client";

export type PublishStatus = "draft" | "published";

export type LocalizedText = {
  uz: string;
  ru: string;
  en: string;
};

export type ImageAsset = {
  url: string;
  filename: string;
  mimetype: string;
  size: number;
};

export type Category = {
  id: string;
  title: LocalizedText;
  slug: string;
  description?: LocalizedText;
  image?: ImageAsset;
  createdAt: string;
  updatedAt: string;
};

export type Product = {
  id: string;
  title: LocalizedText;
  slug: string;
  categoryId: string;
  category?: Category | null;
  dosageForm?: LocalizedText;
  therapeuticIndication?: LocalizedText;
  status: PublishStatus;
  images: ImageAsset[];
  createdAt: string;
  updatedAt: string;
};

export type NewsArticle = {
  id: string;
  title: LocalizedText;
  slug: string;
  content: LocalizedText;
  status: PublishStatus;
  images: ImageAsset[];
  createdAt: string;
  updatedAt: string;
};

export type Worker = {
  id: string;
  fullName: LocalizedText;
  role: LocalizedText;
  bio?: LocalizedText;
  image?: ImageAsset;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type DashboardStats = {
  totals: {
    products: number;
    categories: number;
    news: number;
    workers: number;
  };
  publishing: {
    products: {published: number; draft: number};
    news: {published: number; draft: number};
  };
  recent: {
    products: Product[];
    news: NewsArticle[];
  };
};

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type PaginatedResponse<T> = {
  items: T[];
  meta: PaginationMeta;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";
const TOKEN_KEY = "avantika_admin_token";

export function getToken() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  window.localStorage.removeItem(TOKEN_KEY);
}

export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers = new Headers(init.headers);

  if (!(init.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers,
  });

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

async function getErrorMessage(response: Response) {
  const fallback = `Request failed with ${response.status}`;
  const text = await response.text();

  if (!text) return fallback;

  try {
    const body = JSON.parse(text) as {message?: string | string[]; error?: string};
    if (Array.isArray(body.message)) return body.message.join("\n");
    return body.message || body.error || fallback;
  } catch {
    return text;
  }
}

export function listAdmin<T>(resource: string) {
  return apiFetch<T[]>(`/admin/${resource}`);
}

export function listAdminPage<T>(resource: string, page: number, limit: number) {
  const params = new URLSearchParams({page: String(page), limit: String(limit)});
  return apiFetch<PaginatedResponse<T>>(`/admin/${resource}?${params.toString()}`);
}

export function createAdmin<TResponse, TPayload>(resource: string, payload: TPayload) {
  return apiFetch<TResponse>(`/admin/${resource}`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateAdmin<TResponse, TPayload>(resource: string, id: string, payload: TPayload) {
  return apiFetch<TResponse>(`/admin/${resource}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export function deleteAdmin(resource: string, id: string) {
  return apiFetch<{deleted: true}>(`/admin/${resource}/${id}`, {method: "DELETE"});
}

export function checkSession() {
  return apiFetch<{user: {username: string; role: string}}>("/auth/me");
}

export async function login(username: string, password: string) {
  const response = await apiFetch<{accessToken: string; user: {username: string; role: string}}>("/auth/login", {
    method: "POST",
    body: JSON.stringify({username, password}),
  });
  setToken(response.accessToken);
  return response;
}

export async function uploadImages(files: FileList | File[]) {
  const formData = new FormData();
  Array.from(files).forEach((file) => formData.append("files", file));
  return apiFetch<{files: ImageAsset[]}>("/admin/media/upload", {
    method: "POST",
    body: formData,
  });
}
