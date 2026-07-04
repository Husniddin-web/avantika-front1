import type {Category, NewsArticle, Product, Worker} from "@/lib/admin/api";

export type PublicHomeData = {
  categories: Category[];
  products: Product[];
  news: NewsArticle[];
  workers: Worker[];
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

async function publicFetch<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Public API request failed: ${path}`);
  }

  return response.json() as Promise<T>;
}

export async function fetchPublicHomeData(): Promise<PublicHomeData> {
  try {
    const [categories, products, news, workers] = await Promise.all([
      publicFetch<Category[]>("/categories"),
      publicFetch<Product[]>("/products"),
      publicFetch<NewsArticle[]>("/news"),
      publicFetch<Worker[]>("/workers"),
    ]);

    return {categories, products, news, workers};
  } catch {
    return {
      categories: [],
      products: [],
      news: [],
      workers: [],
    };
  }
}

export async function fetchPublicProducts() {
  try {
    return await publicFetch<Product[]>("/products");
  } catch {
    return [];
  }
}

export async function fetchPublicProduct(id: string) {
  try {
    return await publicFetch<Product>(`/products/${id}`);
  } catch {
    return null;
  }
}

export async function fetchPublicCategories() {
  try {
    return await publicFetch<Category[]>("/categories");
  } catch {
    return [];
  }
}

export async function fetchPublicNews() {
  try {
    return await publicFetch<NewsArticle[]>("/news");
  } catch {
    return [];
  }
}
