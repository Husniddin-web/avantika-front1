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
  prescriptionType: "rx" | "otc";
  activeIngredient?: LocalizedText;
  composition?: LocalizedText;
  dosage?: LocalizedText;
  indications?: LocalizedText;
  contraindications?: LocalizedText;
  usageInstructions?: LocalizedText;
  storageConditions?: LocalizedText;
  packageDescription?: LocalizedText;
  instructionPdf?: ImageAsset | null;
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
  const fileArray = Array.from(files);

  const processedFiles = await Promise.all(
    fileArray.map(async (file) => {
      // PDF yoki boshqa fayllarni siqmasdan to'g'ridan-to'g'ri yuklaymiz
      if (file.type.startsWith("image/")) {
        try {
          return await compressImage(file);
        } catch (error) {
          console.warn("Client-side image compression failed, using original file:", error);
          return file;
        }
      }
      return file;
    })
  );

  processedFiles.forEach((file) => formData.append("files", file));
  return apiFetch<{files: ImageAsset[]}>("/admin/media/upload", {
    method: "POST",
    body: formData,
  });
}

function compressImage(file: File, maxWidth = 900, maxHeight = 900, quality = 0.85): Promise<File> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new window.Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        // Proporsiyani saqlagan holda o'lchamni o'zgartirish
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(file);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              // Asl nomni olamiz va kengaytmasini .webp ga o'zgartiramiz
              const cleanName = file.name.substring(0, file.name.lastIndexOf(".")) || file.name;
              const compressedFile = new File([blob], `${cleanName}.webp`, {
                type: "image/webp",
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              resolve(file);
            }
          },
          "image/webp",
          quality
        );
      };
      img.onerror = () => resolve(file);
    };
    reader.onerror = () => resolve(file);
  });
}
