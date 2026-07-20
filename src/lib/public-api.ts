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
  ["amlodil-ab", "Amlodil-AB", "Амлодил-АБ", "Amlodil-AB", ["cat-cardio", "cat-pain"], "Таблетки 4/5 мг ,8/10 мг № 30 (3х10) (блистеры)", "rx", "amlodil-ab.png"],
  ["avimedrol", "Avimedrol", "Авимедрол", "Avimedrol", ["cat-pain", "cat-antibiotic"], "Таблетки 4 мг,16 мг № 30 (3х10) (блистеры)", "rx", "avimedrol.png"],
  ["avicarnitine", "Avicarnitine", "Авикарнитин", "Avicarnitine", ["cat-cardio", "cat-pain", "cat-antibiotic", "cat-wellness"], "Раствор для иньекций 200 мг/мл, 5 мл №5 (ампулы)", "rx", "avicarnitine.png"],
  ["avisil", "Avisil", "Ависил", "Avisil", ["cat-pain", "cat-wellness"], "Гранулы для приготовления суспензии для приема внутрь 100 мг №30 (пакетики)", "rx", "avisil.png"],
  ["avizol-100", "Avizol 100", "Авизол 100", "Avizol 100", ["cat-pain", "cat-antibiotic", "cat-wellness"], "Капсулы 100 мг №1", "rx", "avizol-100.png"],
  ["avizol-150", "Avizol 150", "Авизол 150", "Avizol 150", ["cat-pain", "cat-antibiotic", "cat-wellness"], "Капсулы 150 мг №1", "rx", "avizol-150.png"],
  ["avizol-50", "Avizol 50", "Авизол 50", "Avizol 50", ["cat-pain", "cat-antibiotic", "cat-wellness"], "Капсулы 50 мг №6", "rx", "avizol-50.png"],
  ["avantovir", "Avantovir", "Авантовир", "Avantovir", ["cat-gastro", "cat-antiviral"], "Таблетки, покрытые пленочной оболочкой 25 мг № 30 (флаконы)", "rx", "avantovir.png"],
  ["avicet", "Avicet", "Авицет", "Avicet", ["cat-pain", "cat-antibiotic"], "Таблетки, покрытые пленочной оболочкой 5 мг № 30 (3х10) (блистеры)", "rx", "avicet.png"],
  ["avicet-baby-drops", "AVICET BABY DROPS", "АВИЦЕТ БЭЙБИ ДРОПС", "AVICET BABY DROPS", ["cat-wellness"], "Капли для приёма внутрь, раствор 1,25 мг/5 мл 15мл флаконы", "rx", "avicet-baby-drops.png"],
  ["alsera", "Alsera", "Алсера", "Alsera", ["cat-pain", "cat-antibiotic", "cat-wellness"], "Таблетки, покрытые кишечнорастворимой оболочкой   № 10(1х10), №30 (3х10) (блистеры)", "rx", "alsera.png"],
  ["avicyclo", "Avicyclo", "Авицикло", "Avicyclo", ["cat-antiviral", "cat-antibiotic", "cat-wellness"], "Таблетки, покрытые пленочной  оболочкой 1000 мг   №10 (1х10) (блистеры)", "rx", "avicyclo.png"],
  ["aviclud", "Aviclud", "Авиклуд", "Aviclud", ["cat-antiviral"], "Таблетки, покрытые пленочной  оболочкой 0,5 мг; 1,0 мг   №30 (3х10) (блистеры)", "rx", "aviclud.png"],
  ["aviflox-infusion", "Aviflox (infusion)", "Авифлокс (раствор для инфузий)", "Aviflox (infusion)", ["cat-pain", "cat-antibiotic", "cat-wellness"], "Раствор для инфузий 500 мг/100 мл 100мл флаконы", "rx", "aviflox-infusion.png"],
  ["aviflox-tablets", "Aviflox (tablets)", "Авифлокс (таблетки)", "Aviflox (tablets)", ["cat-pain", "cat-antibiotic", "cat-wellness"], "Таблетки, покрытые пленочной  оболочкой 500 мг   № 5 (1х5) (блистеры)", "rx", "aviflox-tablets.png"],
  ["aviroz-10", "Aviroz-10", "Авиroz-10", "Aviroz-10", ["cat-cardio", "cat-pain"], "Таблетки покрытые пленочной оболочкой 10 мг №30", "rx", "aviroz-10.png"],
  ["aviroz-20", "Aviroz-20", "Авиroz-20", "Aviroz-20", ["cat-cardio", "cat-pain"], "Таблетки покрытые пленочной оболочкой 20 мг №30", "rx", "aviroz-20.png"],
  ["avifer", "Avifer", "Авифер", "Avifer", ["cat-cardio", "cat-pain", "cat-wellness"], "Раствор для инъекций 20 мг/мл 5мл ампулы  №1, №5(Розувастати)", "rx", "avifer.png"],
  ["ailike", "Ailike", "Айлайк", "Ailike", ["cat-gastro", "cat-pain", "cat-wellness"], "Порошок шипучий для приготовления раствора для приема внутрь со вкусом апельсина №30 (1х30) (саше пакетики);   Порошок шипучий для приготовления раствора для приема внутрь со вкусом лимона №30 (1х30) (саше пакетики); (натрия бикарбонат – 2,29 г, лимонная кислота -2,16 г натрия карбонат -0,413 г;  )", "otc", "ailike.png"],
  ["bactazon", "BACTAZON", "БАКТАЗОН", "BACTAZON", ["cat-pain", "cat-antibiotic", "cat-wellness"], "Порошок для приготовления раствора для инъекций 1.0 г + 0.5 г флаконы", "rx", "bactazon.png"],
  ["butafen-250", "Butafen 250", "Бутафен 250", "Butafen 250", ["cat-pain"], "Таблетки 250 мг   № 20 (2х10) (блистеры)", "rx", "butafen-250.png"],
  ["butafen-100", "Butafen 100", "Бутафен 100", "Butafen 100", ["cat-pain", "cat-wellness"], "Порошок для приготовления раствора для приема внутрь 100 мг №15 (пакетики)", "rx", "butafen-100.png"],
  ["jaraflu", "Jaraflu", "Жарафлю", "Jaraflu", ["cat-pain", "cat-wellness"], "Порошок для приготовления раствора для приема внутрь дозированный со вкусами апельсина и лимона 22 мг №10 (пакетики)", "otc", "jaraflu.png"],
  ["zhenagra", "Zhenagra", "Женагра", "Zhenagra", ["cat-wellness"], "Таблетки, покрытые пленочной  оболочкой 50 мг, 100 мг   №4 (1х4) (блистеры)", "rx", "zhenagra.png"],
  ["gepa-l", "Gepa-L", "Гепа-Л", "Gepa-L", ["cat-gastro", "cat-antiviral"], "Гранулы для приготовления раствора для приема внутрь 5г №30 (пакетики)", "rx", "gepa-l.png"],
  ["kandivag-fresh", "KANDIVAG FRESH", "КАНДИВАГ ФРЕШ", "KANDIVAG FRESH", ["cat-wellness"], "Срей вагинальный 50 мл( флаконы с распылительным дозатором)", "otc", "kandivag-fresh.png"],
  ["candivag", "Candivag", "Кандиваг", "Candivag", ["cat-wellness"], "Таблетки вагинальные № 8 (1х8) (блистеры)Орнидазол (500 мг): Миконазола нитрат (100 мг):.Неомицина сульфат (100 мг): Преднизолон (3 мг)", "rx", "candivag.png"],
  ["cardifors", "CARDIFORS", "КАРДИФОРС", "CARDIFORS", ["cat-cardio", "cat-pain"], "Порошок для приготовления раствора для инфузий 1 г флаконы", "rx", "cardifors.png"],
  ["candizol", "Candizol", "Кандизол", "Candizol", ["cat-wellness"], "Крем для наружного применения 1%,  15 г (тубы)", "otc", "candizol.png"],
  ["klomekh", "Klomekh", "Кломех", "Klomekh", ["cat-wellness"], "Суппозитории вагинальные №7 (1х7) (блистеры)", "rx", "klomekh.png"],
  ["lorsils", "LORSILS", "ЛОРСИЛС", "LORSILS", ["cat-wellness"], "Пастилки для рассасывания стрипы №20(5x4)", "otc", "lorsils.png"],
  ["m-gil-iv-solution", "M-GIL (IV solution)", "М-Гил (раствор для инфузий)", "M-GIL (IV solution)", ["cat-pain", "cat-antibiotic", "cat-wellness"], "Раствор для внутривенного введения 5 мг/мл 100мл флаконы", "rx", "m-gil-iv-solution.png"],
  ["m-gil", "M-GIL", "М-ГИЛ9", "M-GIL", ["cat-pain", "cat-antibiotic", "cat-wellness"], "Таблетки, покрытые пленочной оболочкой 250 мг № 20 (2х10) (блистеры)", "rx", "m-gil.png"],
  ["migrafen-kiddo", "Migrafen Kiddo", "Миграфен Киддо", "Migrafen Kiddo", ["cat-wellness"], "Суспензия для приема внутрь 100 мг/5 мл 100мл флаконы со вкусом банана, в комплекте с мерной ложкой 1", "rx", "migrafen-kiddo.png"],
  ["maxicol-drops", "MAXICOL Drops", "МАКСИКОЛ Капли", "MAXICOL Drops", ["cat-antibiotic", "cat-wellness"], "для приема внутрь 15мл Флакон темного стекла В комплекте с пробка-капельница", "rx", "maxicol-drops.png"],
  ["meropenem-avantika", "MEROPENEM AVANTIKA", "МЕРОПЕНЕМ АВАНТИКА", "MEROPENEM AVANTIKA", ["cat-pain", "cat-antibiotic", "cat-wellness"], "Порошок для приготовления раствора для инъекций 1000мг флаконы", "rx", "meropenem-avantika.png"],
  ["migrafen-400", "Migrafen-400", "Миграфен- 400", "Migrafen-400", ["cat-wellness"], "Таблетки, покрытые пленочной оболочкой № 100 (10х10) (блистеры)", "rx", "migrafen-400.png"],
  ["m-gil-denta", "M-GIL Denta", "М-ГИЛ Дента", "M-GIL Denta", ["cat-wellness"], "Гель для десен 15 мг 20г ( тубы)", "otc", "m-gil-denta.png"],
  ["macro-g", "Macro-G", "Макро-Джи", "Macro-G", ["cat-gastro", "cat-pain", "cat-wellness"], "Порошок для приготовления раствора для приема внутрь со вкусом апельсина 10 г по 10,741 г №10 (пакетики)", "otc", "macro-g.png"],
  ["morecin", "Morecin", "Морецин", "Morecin", ["cat-pain", "cat-wellness"], "Гранулы для приготовления раствора для приема внутрь 3г №1 (пакетики)", "rx", "morecin.png"],
  ["neuro-g", "Neuro-G", "Нейро-Джи", "Neuro-G", ["cat-pain", "cat-antibiotic"], "Таблетки, покрытые пленочной оболочкой 300 мг/500 мкг № 20 (2х10) (блистеры)", "rx", "neuro-g.png"],
  ["nevikor-5", "Nevikor-5", "Невикор-5", "Nevikor-5", ["cat-cardio", "cat-pain"], "Таблетки 5 мг  № 30 (3х10) (блистеры)", "rx", "nevikor-5.png"],
  ["nevikor-10", "Nevikor-10", "Невикор-10", "Nevikor-10", ["cat-cardio"], "Таблетки 10 мг  № 30 (3х10) (блистеры)", "rx", "nevikor-10.png"],
  ["omeprazole", "Omeprazole", "Омепразол", "Omeprazole", ["cat-gastro", "cat-pain"], "Капсулы 20 мг  № 30 (3х10), №100 (10х10) (стрипы)", "rx", "omeprazole.png"],
  ["orlox", "Orlox", "Орлокс", "Orlox", ["cat-gastro", "cat-pain", "cat-antibiotic", "cat-wellness"], "Таблетки, покрытые пленочной  оболочкой 200 мг+ 500 мг  №10 (1х10) (блистеры)", "rx", "orlox.png"],
  ["p-zero-gel", "P-Zero (gel)", "П-Зеро (гель)", "P-Zero (gel)", ["cat-pain", "cat-wellness"], "Гель  для наружного применения  30 г (тубы)", "otc", "p-zero-gel.png"],
  ["p-zero-injection", "P-Zero (injection)", "П-Зеро (инъекции)", "P-Zero (injection)", ["cat-pain"], "Раствор для инъекций 30 мг/мл 1мл ампулы №10", "rx", "p-zero-injection.png"],
  ["paradik-tablets", "Paradik (tablets)", "Парадик (таблетки)", "Paradik (tablets)", ["cat-pain", "cat-wellness"], "Таблетки 500 мг/50 мг  № 100 (10х10) (блистеры)", "otc", "paradik-tablets.png"],
  ["p-zero-tablets", "P-Zero (tablets)", "П-Зеро (таблетки)", "P-Zero (tablets)", ["cat-pain"], "Таблетки, покрытые пленочной оболочкой 10 мг № 10 (1х10),№20 (2х10),№30 (3х10) (блистеры)", "rx", "p-zero-tablets.png"],
  ["paradik-gel", "Paradik (gel)", "Парадик (гель)", "Paradik (gel)", ["cat-pain", "cat-wellness"], "Гель  для наружного применения  30 г (тубы)", "otc", "paradik-gel.png"],
  ["panten", "Panten", "Пантен", "Panten", ["cat-gastro", "cat-pain", "cat-wellness"], "Капсулы кишечнорастворимые 300мг №20 (2х10) (блистеры)", "rx", "panten.png"],
  ["pentaza-40", "Pentaza-40", "Пентаза- 40", "Pentaza-40", ["cat-gastro", "cat-pain", "cat-wellness"], "Таблетки, покрытые кишечнорастворимой оболочкой 40 мг №30 (3х10) (блистеры)", "otc", "pentaza-40.png"],
  ["ranit", "Ranit", "Ранит", "Ranit", ["cat-gastro", "cat-pain", "cat-wellness"], "Таблетки, покрытые пленочной оболочкой 150 мг №100 (10х10) (блистеры)", "otc", "ranit.png"],
  ["si-zol", "SI-ZOL", "СИ-ЗОЛ", "SI-ZOL", ["cat-wellness"], "Крем для наружного применения 0,05%,  15 г №1 (тубы)", "otc", "si-zol.png"],
  ["stressi", "STRESSI", "СТРЕССИ", "STRESSI", ["cat-pain", "cat-wellness"], "Капсулы блистеры №20(2x10)Экстракт валерианы (Valeriana walliach) 200 мг Экстракт ашваганды (Withania somnifera) 150 мг | Экстракт вьюнка смолоносного (Convolvulus pluricaulis) 50 мг | Экстракт бакопы (Весора moniery) 50 мг | Экстракт центеллы азиатской (Centella asiatica) 50 мг", "otc", "stressi.png"],
  ["semilopa", "SEMILOPA", "СЕМИЛОПА", "SEMILOPA", ["cat-pain", "cat-antibiotic", "cat-wellness"], "Таблетки, покрытые пленочной оболочкой 2мг/125 мг  №6 (1х6) (блистеры)", "otc", "semilopa.png"],
  ["super-day-and-night", "SUPER DAY AND NIGHT", "СУПЕР ДЕНЬ И НОЧЬ", "SUPER DAY AND NIGHT", ["cat-pain", "cat-wellness"], "5 таблеток с пролонгированным высвобождением, 5 таблеток покрытых пленочной оболочкой   №10 (5+5) (блистеры)", "otc", "super-day-and-night.png"],
  ["trinazol", "Trinazol", "Триназол", "Trinazol", ["cat-wellness"], "Крем для наружного применения   15 г (тубы)", "otc", "trinazol.png"],
  ["telkor", "Telkor", "Телкор", "Telkor", ["cat-cardio", "cat-pain"], "Таблетки 40 мг №30 (3х10) (блистеры)", "rx", "telkor.png"],
  ["tadal", "Tadal", "Тадал", "Tadal", ["cat-wellness"], "Таблетки, покрытые пленочной оболочкой 20 мг +60 мг  №4 (1х4) (блистеры)", "otc", "tadal.png"],
  ["ursodoks", "Ursodoks", "Урсодокс", "Ursodoks", ["cat-gastro", "cat-pain"], "Урсодезоксихолевая кислота) | Капсулы  250мг №20 (2х10), №50 (5х10) (блистеры)", "rx", "ursodoks.png"],
  ["favipiravir-avantika", "Favipiravir Avantika", "Фавипиравир Авантика", "Favipiravir Avantika", ["cat-antibiotic"], "Таблетки, покрытые пленочной оболочкой 200 мг  №42 (7х6) (блистеры)", "rx", "favipiravir-avantika.png"],
  ["cefoperazone-and-sulbactam", "CEFOPERAZONE AND SULBACTAM", "ЦЕФОПЕРАЗОН И СУЛЬБАКТАМ", "CEFOPERAZONE AND SULBACTAM", ["cat-antibiotic"], "Порошок для приготовления раствора для инъекций 1 г + 0.5 г флаконы", "rx", "cefoperazone-and-sulbactam.png"],
  ["cyclogan-500", "Cyclogan-500", "Циклоган-500", "Cyclogan-500", ["cat-antiviral", "cat-antibiotic", "cat-wellness"], "Капсулы  500мг №30 (3х10) (блистеры)", "rx", "cyclogan-500.png"],
  ["escolin", "Escolin", "Эсколин", "Escolin", ["cat-pain"], "Гранулы для приготовления суспензии для приема внутрь 500 мг №30 (пакетики)", "rx", "escolin.png"],
  ["eskolin", "ESKOLIN", "ЭCКОЛИН", "ESKOLIN", ["cat-pain"], "Раствор для иньекций 500 мг/4 мл, 1000мг/4 мл 4мл   №5 (1х5)  (ампулы)", "rx", "eskolin.png"],
  ["enoxa--40", "ENOXA -40", "ЭНОКСА -40 /60/80", "ENOXA -40", ["cat-cardio", "cat-pain"], "Раствор для инъекций 4000 анти-Ха МЕ/0,4 мл предварительно заполненный шприц", "rx", "enoxa--40.png"],
  ["emcin-100", "Emcin 100", "Эмцин 100", "Emcin 100", ["cat-pain", "cat-antibiotic", "cat-wellness"], "Раствор для инъекций 100 мг/2 мл 2 мл (флаконы)", "rx", "emcin-100.png"],
  ["emcin-500", "Emcin 500", "Эмцин 500", "Emcin 500", ["cat-pain", "cat-antibiotic", "cat-wellness"], "Раствор для инъекций 500 мг/2 мл 2 ml (флаконы)", "rx", "emcin-500.png"],
  ["aviten-20-lyophilized-powder-for-preparation-of-injection-solution-20-mg-complete-with-solvent---water-for-injection-2-ml-2-ml", "Aviten 20", "Авитен 20", "Aviten 20", ["cat-pain", "cat-wellness"], "лиофилизированный порошок для приготовления раствора для инъекций 20 мг в комплекте с растворителем - вода для инъекций 2мл 2 мл", "rx", ""],
  ["welclusa-film-coated-tablets-400-mg-100-mg-polyethylene-bottles-no-28", "Welclusa", "Велклуза", "Welclusa", ["cat-gastro", "cat-antiviral", "cat-pain"], "Film-coated tablets 400 mg + 100 mg polyethylene bottles No. 28", "rx", ""],
] as const;

export const mockProducts: Product[] = mockProductSeeds.map(([slug, uz, ru, en, categoryIds, dosage, prescriptionType, imageUrl]) => {
  const ids = Array.isArray(categoryIds) ? (categoryIds as unknown as string[]) : [categoryIds as unknown as string];
  const validCategories = ids.map(id => categoryById[id]).filter((c): c is Category => !!c);
  return {
    id: slug,
    title: {uz, ru, en},
    slug,
    categoryId: ids[0] || "",
    category: validCategories[0] ?? null,
    categoryIds: ids,
    categories: validCategories,
  dosageForm: {uz: dosage, ru: dosage, en: dosage},
  therapeuticIndication: {
    uz: "Avantika portfelidagi namuna preparat. Mahsulot ma’lumotlari tasdiqlangan yo‘riqnoma bilan yangilanadi.",
    ru: "Демонстрационный препарат из портфеля Avantika. Информация будет обновлена согласно утвержденной инструкции.",
    en: "A sample medicine from the Avantika portfolio. Product information will be updated with approved instructions.",
  },
  prescriptionType,
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
};
});

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
  ["research", "Dori shakllari tadqiqotida yangi bosqich", "Новый этап исследований лекарственных форм", "New phase in dosage form research", "/pharm/velkluza-poster.jpg"],
  ["laboratory", "Laboratoriya infratuzilmasi kengaytirildi", "Расширена инфраструктура лаборатории", "Laboratory infrastructure expanded", "/pharm/aylayk-packshot.jpg"],
  ["quality", "Sifat boshqaruvi auditi yakunlandi", "Завершен аудит управления качеством", "Quality management audit completed", "/pharm/amlodil-ab-poster.jpg"],
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
    // Try fetching directly by slug/ID
    return await publicFetch<NewsArticle>(`/news/${slugOrId}`);
  } catch (error) {
    // If backend doesn't support slug lookup (returning 404), fetch all news and match the slug
    try {
      const allNews = await fetchPublicNews();
      const matched = allNews.find((n) => n.slug === slugOrId || n.id === slugOrId);
      if (matched) {
        // Fetch full article by MongoDB ID (which is always supported by the backend)
        return await publicFetch<NewsArticle>(`/news/${matched.id}`);
      }
    } catch (innerError) {
      console.error("Failed slug fallback lookup:", innerError);
    }
    
    // Fallback to mock news
    return mockNews.find((n) => n.id === slugOrId || n.slug === slugOrId) ?? null;
  }
}
