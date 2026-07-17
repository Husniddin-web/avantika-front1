import type {Category, NewsArticle, Product, Worker} from "@/lib/admin/api";

export type PublicHomeData = {
  categories: Category[];
  products: Product[];
  news: NewsArticle[];
  workers: Worker[];
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";
const now = new Date().toISOString();

function image(url: string) {
  return {url, filename: url.split("/").pop() ?? "image.jpg", mimetype: "image/jpeg", size: 0};
}

const mockCategories: Category[] = [
  {id: "cat-antiviral", title: {uz: "Virusologiya", ru: "Вирусология", en: "Virology"}, slug: "virology", image: image("/pharm/velkluza-poster.jpg"), createdAt: now, updatedAt: now},
  {id: "cat-gastro", title: {uz: "Gastroenterologiya", ru: "Гастроэнтерология", en: "Gastroenterology"}, slug: "gastroenterology", image: image("/pharm/aylayk-packshot.jpg"), createdAt: now, updatedAt: now},
  {id: "cat-cardio", title: {uz: "Kardiologiya", ru: "Кардиология", en: "Cardiology"}, slug: "cardiology", image: image("/pharm/amlodil-ab-poster.jpg"), createdAt: now, updatedAt: now},
  {id: "cat-pain", title: {uz: "Og‘riq va yallig‘lanish", ru: "Боль и воспаление", en: "Pain & inflammation"}, slug: "pain-inflammation", image: image("/pharm/butafen-poster.jpg"), createdAt: now, updatedAt: now},
  {id: "cat-antibiotic", title: {uz: "Antibiotiklar", ru: "Антибиотики", en: "Antibiotics"}, slug: "antibiotics", image: image("/pharm/meropenem-poster.jpg"), createdAt: now, updatedAt: now},
  {id: "cat-wellness", title: {uz: "Umumiy salomatlik", ru: "Общее здоровье", en: "General health"}, slug: "general-health", image: image("/pharm/avifer-forte-poster.jpg"), createdAt: now, updatedAt: now},
];

const categoryById = Object.fromEntries(mockCategories.map((category) => [category.id, category]));

const mockProductSeeds = [
  ["velkluza", "Velkluza", "Велклуза", "Velkluza", "cat-antiviral", "28 tablets", "/pharm/velkluza-poster.jpg"],
  ["avantovir", "Avantovir", "Авантовир", "Avantovir", "cat-antiviral", "30 tablets", "/pharm/avantovir-packshot.jpg"],
  ["aviklud", "Aviklud", "Авиклуд", "Aviklud", "cat-antiviral", "30 tablets", "/pharm/butafen-packshot.jpg"],
  ["ursodox", "Ursodox", "Урсодокс", "Ursodox", "cat-gastro", "50 capsules", "/pharm/ursodox-packshot.jpg"],
  ["ailayk", "Aylayk", "Айлайк", "Aylayk", "cat-gastro", "30 sachets", "/pharm/aylayk-packshot.jpg"],
  ["panten", "Panten", "Пантен", "Panten", "cat-gastro", "20 capsules", "/pharm/morecin-packshot.jpg"],
  ["amlodil-ab", "Amlodil-AB", "Амлодил-АБ", "Amlodil-AB", "cat-cardio", "30 tablets", "/pharm/amlodil-ab-packshot.jpg"],
  ["nevikor-5", "Nevikor-5", "Невикор-5", "Nevikor-5", "cat-cardio", "30 tablets", "/pharm/nevikor-5-packshot.jpg"],
  ["butafen", "Butafen", "Бутафен", "Butafen", "cat-pain", "Tablets and powder", "/pharm/butafen-poster.jpg"],
  ["aviten-20", "Aviten 20", "Авитен 20", "Aviten 20", "cat-pain", "Injection powder", "/pharm/aviten-20-packshot.jpg"],
  ["meropenem", "Meropenem Avantika", "Меропенем Авантика", "Meropenem Avantika", "cat-antibiotic", "1000 mg vial", "/pharm/meropenem-packshot.jpg"],
  ["avifer-forte", "Avifer Forte", "Avifer Forte", "Avifer Forte", "cat-wellness", "30 tablets", "/pharm/avifer-forte-poster.jpg"],
] as const;

export const mockProducts: Product[] = mockProductSeeds.map(([slug, uz, ru, en, categoryId, dosage, imageUrl]) => ({
  id: slug,
  title: {uz, ru, en},
  slug,
  categoryId,
  category: categoryById[categoryId] ?? null,
  categoryIds: [categoryId],
  categories: categoryById[categoryId] ? [categoryById[categoryId]] : [],
  dosageForm: {uz: dosage, ru: dosage, en: dosage},
  therapeuticIndication: {
    uz: "Avantika portfelidagi namuna preparat. Mahsulot ma’lumotlari tasdiqlangan yo‘riqnoma bilan yangilanadi.",
    ru: "Демонстрационный препарат из портфеля Avantika. Информация будет обновлена согласно утвержденной инструкции.",
    en: "A sample medicine from the Avantika portfolio. Product information will be updated with approved instructions.",
  },
  prescriptionType: slug === "meropenem" || slug === "velkluza" || slug === "ursodox" ? "rx" : "otc",
  activeIngredient: {uz: "Faol modda", ru: "Активное вещество", en: "Active ingredient"},
  composition: {uz: "1 tabletka tarkibida faol modda va yordamchi moddalar mavjud.", ru: "1 таблетка содержит активное вещество и вспомогательные вещества.", en: "1 tablet contains active ingredient and excipients."},
  dosage: {uz: "Shifokor tavsiyasiga ko'ra qo'llaniladi.", ru: "Применять по рекомендации врача.", en: "Use as recommended by a physician."},
  indications: {uz: "Preparat terapevtik maqsadlarda ko'rsatilgan holatlarda qo'llaniladi.", ru: "Препарат применяется при терапевтических показаниях.", en: "The drug is used for indicated therapeutic purposes."},
  contraindications: {uz: "Dori vositasi komponentlariga yuqori sezuvchanlik.", ru: "Повышенная чувствительность к компонентам препарата.", en: "Hypersensitivity to drug components."},
  usageInstructions: {uz: "Tavsiya etilgan dozada ichish orqali qabul qilinadi.", ru: "Принимать внутрь в рекомендуемой дозировке.", en: "Take orally in the recommended dosage."},
  storageConditions: {uz: "Xona haroratida, quruq va bolalar qo'li etmaydigan joyda saqlang.", ru: "Хранить при комнатной температуре, в сухом и недоступном для детей месте.", en: "Store at room temperature, in a dry and out of reach of children place."},
  packageDescription: {uz: "Karton qutida qo'llash bo'yicha yo'riqnoma bilan birga.", ru: "В картонной коробке вместе с инструкцией по применению.", en: "In a cardboard box along with instructions for use."},
  instructionPdf: null,
  status: "published",
  images: [image(imageUrl)],
  createdAt: now,
  updatedAt: now,
}));

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

    return {
      categories: categories.length ? categories : mockCategories,
      products: products.length ? products : mockProducts,
      news,
      workers,
    };
  } catch {
    return {
      categories: mockCategories,
      products: mockProducts,
      news: [],
      workers: [],
    };
  }
}

export async function fetchPublicProducts() {
  try {
    const products = await publicFetch<Product[]>("/products");
    return products.length ? products : mockProducts;
  } catch {
    return mockProducts;
  }
}

export async function fetchPublicProduct(id: string) {
  try {
    return await publicFetch<Product>(`/products/${id}`);
  } catch {
    return mockProducts.find((product) => product.id === id || product.slug === id) ?? null;
  }
}

export async function fetchPublicCategories() {
  try {
    const categories = await publicFetch<Category[]>("/categories");
    return categories.length ? categories : mockCategories;
  } catch {
    return mockCategories;
  }
}

const mockNewsSeeds = [
  ["avantika-ishlab-chiqarish-liniyalari-kengaymoqda", "Avantika ishlab chiqarish liniyalari kengaymoqda", "Производственные линии Avantika расширяются", "Avantika production lines are expanding", "/pharm/velkluza-poster.jpg"],
  ["sifat-nazorati-jarayonlari-kuchaytirildi", "Sifat nazorati jarayonlari kuchaytirildi", "Усилены процессы контроля качества", "Quality control processes strengthened", "/pharm/aylayk-packshot.jpg"],
  ["yangi-terapevtik-portfel-taqdim-etildi", "Yangi terapevtik portfel taqdim etildi", "Представлен новый терапевтический портфель", "New therapeutic portfolio introduced", "/pharm/amlodil-ab-poster.jpg"],
  ["hamkorlar-uchun-mahsulot-treninglari-boshlandi", "Hamkorlar uchun mahsulot treninglari boshlandi", "Начались продуктовые тренинги для партнёров", "Product trainings for partners started", "/pharm/butafen-poster.jpg"],
  ["farmatsevtika-standartlari-bo-yicha-ichki-audit-yakunlandi", "Farmatsevtika standartlari bo‘yicha ichki audit yakunlandi", "Завершён внутренний аудит фармацевтических стандартов", "Internal pharmaceutical standards audit completed", "/pharm/meropenem-poster.jpg"],
  ["laboratoriya-nazorati-bo-yicha-yangi-bosqich", "Laboratoriya nazorati bo‘yicha yangi bosqich", "Новый этап лабораторного контроля", "A new stage in laboratory control", "/pharm/avifer-forte-poster.jpg"],
  ["eksport-geografiyasi-bo-yicha-yangi-imkoniyatlar", "Eksport geografiyasi bo‘yicha yangi imkoniyatlar", "Новые возможности экспортной географии", "New export geography opportunities", "/pharm/velkluza-poster.jpg"],
  ["avantika-jamoasi-sifat-madaniyatini-rivojlantirmoqda", "Avantika jamoasi sifat madaniyatini rivojlantirmoqda", "Команда Avantika развивает культуру качества", "Avantika team develops a quality culture", "/pharm/aylayk-packshot.jpg"],
];

export const mockNews: NewsArticle[] = mockNewsSeeds.map(([slug, uz, ru, en, imageUrl], index) => ({
  id: `news-${index + 1}`,
  slug,
  title: { uz, ru, en },
  content: {
    uz: `${uz} haqida batafsil ma’lumot. Bu Avantika kompaniyasining rasmiy yangiliklari portfelidan olingan maqoladir. Kompaniya sifat standartlari va zamonaviy texnologiyalarni joriy etishda davom etmoqda. Bizning maqsadimiz iste'molchilarga eng sifatli va xavfsiz dori vositalarini yetkazib berishdir.`,
    ru: `Подробная информация о ${ru}. Это статья из официального портфеля новостей компании Avantika. Компания продолжает внедрять стандарты качества и современные технологии. Наша цель — обеспечение потребителей высококачественными и безопасными препаратами.`,
    en: `Detailed information about ${en}. This is an article from the official news portfolio of Avantika. The company continues to implement quality standards and modern technologies. Our mission is to provide consumers with premium and safe pharmaceutical products.`,
  },
  status: "published",
  images: [image(imageUrl)],
  createdAt: now,
  updatedAt: now,
}));

export async function fetchPublicNews() {
  try {
    const news = await publicFetch<NewsArticle[]>("/news");
    return news.length ? news : mockNews;
  } catch {
    return mockNews;
  }
}

export async function fetchPublicNewsArticle(slugOrId: string) {
  try {
    return await publicFetch<NewsArticle>(`/news/${slugOrId}`);
  } catch {
    return mockNews.find((n) => n.id === slugOrId || n.slug === slugOrId) ?? null;
  }
}
