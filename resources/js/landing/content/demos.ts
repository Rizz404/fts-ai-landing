import type { Lang, Localized } from "../i18n/lang";

export type CategoryId = "food" | "stay" | "wellness" | "venues" | "business";

export const categories: CategoryId[] = ["food", "stay", "wellness", "venues", "business"];

export type Demo = {
  id: string;
  name: string;
  url: string;
  category: CategoryId;
  industry: Localized<string>;
  role: Localized<string>;
  tasks: Localized<[string, string, string]>;
  // Languages the live demo currently fails to render; links fall back to Indonesian.
  brokenLangs?: Lang[];
};

// Screenshots in public/images/demos/<id>.webp are real captures of each live demo (1280 × 800).
export const demoImage = (demo: Demo) => `/images/demos/${demo.id}.webp`;

export const demoHref = (demo: Demo, lang: Lang) =>
  `${demo.url}?lang=${demo.brokenLangs?.includes(lang) ? "id" : lang}`;

// The first three are the featured demos (shown first on both the showcase and the LP).
export const demos: Demo[] = [
  {
    id: "wedding-venue-ai",
    name: "Wedding AI",
    url: "https://wedding-venue-ai.fts-tech.co.id/fts-wedding-venue-ai",
    category: "venues",
    industry: { en: "Wedding venue", id: "Gedung pernikahan", ja: "結婚式場" },
    role: { en: "AI Wedding Concierge", id: "Concierge pernikahan AI", ja: "AIウェディングコンシェルジュ" },
    tasks: {
      en: ["Halls", "Wedding services", "Hold your date"],
      id: ["Hall", "Layanan pernikahan", "Kunci tanggal"],
      ja: ["会場", "ウェディングサービス", "日程の仮予約"],
    },
  },
  {
    id: "hotel-ai",
    name: "Hotel AI",
    url: "https://hotel-ai.fts-tech.co.id/fts-hotel-ai",
    category: "stay",
    industry: { en: "Hotel", id: "Hotel", ja: "ホテル" },
    role: { en: "AI Concierge", id: "Concierge AI", ja: "AIコンシェルジュ" },
    tasks: {
      en: ["Rooms & suites", "Facilities", "Reservations"],
      id: ["Kamar & suite", "Fasilitas", "Reservasi"],
      ja: ["客室", "施設", "予約"],
    },
  },
  {
    id: "restaurant-ai",
    name: "Restaurant AI",
    url: "https://restaurant-ai.fts-tech.co.id/",
    category: "food",
    industry: { en: "Restaurant", id: "Restoran", ja: "レストラン" },
    role: { en: "AI Host", id: "Host AI", ja: "AIホスト" },
    tasks: {
      en: ["Menu", "Book a table", "Order"],
      id: ["Menu", "Pesan meja", "Pesanan"],
      ja: ["メニュー", "テーブル予約", "注文"],
    },
  },
  {
    id: "cafe-ai",
    name: "Cafe AI",
    url: "https://cafe-ai.fts-tech.co.id/cafe-ai",
    category: "food",
    industry: { en: "Cafe", id: "Kafe", ja: "カフェ" },
    role: { en: "AI Barista", id: "Barista AI", ja: "AIバリスタ" },
    tasks: {
      en: ["Menu", "Seating", "Reserve a table"],
      id: ["Menu", "Tempat duduk", "Reservasi meja"],
      ja: ["メニュー", "座席", "テーブル予約"],
    },
  },
  {
    id: "apartment-ai",
    name: "FTS Apartment AI",
    url: "https://apartment-ai.fts-tech.co.id/fts-apartment-ai",
    category: "stay",
    industry: { en: "Apartment", id: "Apartemen", ja: "アパートメント" },
    role: { en: "AI Concierge", id: "Concierge AI", ja: "AIコンシェルジュ" },
    tasks: {
      en: ["Units", "Facilities", "Apply"],
      id: ["Unit", "Fasilitas", "Pengajuan"],
      ja: ["物件", "施設", "入居申込"],
    },
  },
  {
    id: "car-rental-ai",
    name: "FTS Car Rental AI",
    url: "https://car-rental-ai.fts-tech.co.id/fts-car-rental-ai",
    category: "stay",
    industry: { en: "Car rental", id: "Rental mobil", ja: "レンタカー" },
    role: { en: "AI Rental Agent", id: "Agen rental AI", ja: "AIレンタルエージェント" },
    tasks: {
      en: ["Fleet", "Rental services", "Reservation"],
      id: ["Armada", "Layanan rental", "Reservasi"],
      ja: ["車両", "レンタルサービス", "予約"],
    },
  },
  {
    id: "spa-ai",
    name: "Spa AI",
    url: "https://spa-ai.fts-tech.co.id/spa-ai",
    category: "wellness",
    industry: { en: "Spa", id: "Spa", ja: "スパ" },
    role: { en: "AI Spa Concierge", id: "Concierge spa AI", ja: "AIスパコンシェルジュ" },
    tasks: {
      en: ["Treatments", "Rooms", "Reservation"],
      id: ["Perawatan", "Ruangan", "Reservasi"],
      ja: ["トリートメント", "個室", "予約"],
    },
  },
  {
    id: "beauty-salon-ai",
    name: "Beauty Salon AI",
    url: "https://beauty-salon-ai.fts-tech.co.id/beauty-salon-ai",
    category: "wellness",
    industry: { en: "Beauty salon", id: "Salon kecantikan", ja: "美容サロン" },
    role: { en: "AI Beautician", id: "Beautician AI", ja: "AIビューティシャン" },
    tasks: {
      en: ["Services", "Stylists", "Appointment"],
      id: ["Layanan", "Stylist", "Janji temu"],
      ja: ["メニュー", "スタイリスト", "予約"],
    },
  },
  {
    id: "fitness-gym-ai",
    name: "Fitness Gym AI",
    url: "https://fitness-gym-ai.fts-tech.co.id/fitness-gym-ai",
    category: "wellness",
    industry: { en: "Fitness gym", id: "Pusat kebugaran", ja: "フィットネスジム" },
    role: { en: "AI Fitness Concierge", id: "Concierge kebugaran AI", ja: "AIフィットネスコンシェルジュ" },
    tasks: {
      en: ["Programs", "Training", "Reservation"],
      id: ["Program", "Latihan", "Reservasi"],
      ja: ["プログラム", "トレーニング", "予約"],
    },
  },
  {
    id: "event-venue-ai",
    name: "Aurelia Event Hall",
    url: "https://event-venue-ai.fts-tech.co.id/aurelia-event-hall",
    category: "venues",
    industry: { en: "Event hall", id: "Gedung acara", ja: "イベントホール" },
    role: { en: "AI Event Planner", id: "Perencana acara AI", ja: "AIイベントプランナー" },
    tasks: {
      en: ["Spaces", "Facilities", "Reservation"],
      id: ["Ruang", "Fasilitas", "Reservasi"],
      ja: ["スペース", "施設", "予約"],
    },
  },
  {
    id: "training-venue-ai",
    name: "FTS Training Venue AI",
    url: "https://training-venue-ai.fts-tech.co.id/fts-training-venue-ai",
    category: "venues",
    industry: { en: "Training venue", id: "Tempat pelatihan", ja: "研修会場" },
    role: { en: "AI Coordinator", id: "Koordinator AI", ja: "AIコーディネーター" },
    tasks: {
      en: ["Rooms", "Facilities", "Reservation"],
      id: ["Ruangan", "Fasilitas", "Reservasi"],
      ja: ["研修室", "施設", "予約"],
    },
  },
  {
    id: "recruitment-venue-ai",
    name: "FTS Recruitment Venue",
    url: "https://recruitment-venue-ai.fts-tech.co.id/fts-recruitment-venue",
    category: "venues",
    industry: { en: "Recruitment venue", id: "Venue rekrutmen", ja: "採用イベント会場" },
    role: { en: "AI Venue Coordinator", id: "Koordinator venue AI", ja: "AI会場コーディネーター" },
    tasks: {
      en: ["Spaces", "Facilities", "Book your event"],
      id: ["Ruang", "Fasilitas", "Pesan acara"],
      ja: ["スペース", "施設", "イベント予約"],
    },
  },
  {
    id: "digital-agency-ai",
    name: "Digital Agency AI",
    url: "https://digital-agency-ai.fts-tech.co.id/digital-agency-ai",
    category: "business",
    industry: { en: "Digital agency", id: "Agensi digital", ja: "デジタルエージェンシー" },
    role: { en: "AI Digital Strategist", id: "Strategis digital AI", ja: "AIデジタルストラテジスト" },
    tasks: {
      en: ["Catalog", "Team", "Consultation"],
      id: ["Katalog", "Tim", "Konsultasi"],
      ja: ["カタログ", "チーム", "相談"],
    },
  },
  {
    id: "it-company-ai",
    name: "IT Company AI",
    url: "https://it-company-ai.fts-tech.co.id/it-company-ai",
    category: "business",
    industry: { en: "IT company", id: "Perusahaan IT", ja: "IT企業" },
    role: { en: "AI Solution Consultant", id: "Konsultan solusi AI", ja: "AIソリューションコンサルタント" },
    tasks: {
      en: ["Services", "Consultants", "Consultation"],
      id: ["Layanan", "Konsultan", "Konsultasi"],
      ja: ["サービス", "コンサルタント", "相談"],
    },
  },
  {
    id: "software-saas-ai",
    name: "Software SaaS AI",
    url: "https://software-saas-ai.fts-tech.co.id/software-saas-ai",
    category: "business",
    industry: { en: "Software (SaaS)", id: "Software (SaaS)", ja: "SaaSソフトウェア" },
    role: { en: "AI SaaS Consultant", id: "Konsultan SaaS AI", ja: "AI SaaSコンサルタント" },
    tasks: {
      en: ["Products & plans", "Consultants", "Product demo"],
      id: ["Produk & paket", "Konsultan", "Demo produk"],
      ja: ["製品・プラン", "コンサルタント", "デモ申込"],
    },
    // shortcut: ?lang=en returns HTTP 500 on the live demo (checked 13 Nov 2026). Remove once fixed.
    brokenLangs: ["en"],
  },
  {
    id: "sme-business-ai",
    name: "Maju Jaya Studio",
    url: "https://sme-business-ai.fts-tech.co.id/maju-jaya-studio",
    category: "business",
    industry: { en: "Small business", id: "UMKM", ja: "中小企業" },
    role: { en: "AI Business Assistant", id: "Asisten bisnis AI", ja: "AIビジネスアシスタント" },
    tasks: {
      en: ["Catalog", "Service areas", "Book a slot"],
      id: ["Katalog", "Area layanan", "Pesan jadwal"],
      ja: ["カタログ", "対応エリア", "予約"],
    },
  },
];
