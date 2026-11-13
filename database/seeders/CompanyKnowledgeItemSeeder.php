<?php

namespace Database\Seeders;

use App\Models\Company;
use Illuminate\Database\Seeder;

/**
 * Everything the AI Consultant may state as fact: the FTS profile, consultation
 * policy, contact details, and one entry per live demo so it can point a
 * visitor to the demo closest to their business.
 */
class CompanyKnowledgeItemSeeder extends Seeder
{
    /**
     * Live demos shown on the landing page (resources/js/landing/content/demos.ts).
     *
     * @var list<array{slug: string, url: string, tags: list<string>, id: array{0: string, 1: string}, en: array{0: string, 1: string}, ja: array{0: string, 1: string}}>
     */
    private const DEMOS = [
        ['slug' => 'cafe-ai', 'url' => 'https://cafe-ai.fts-tech.co.id/cafe-ai', 'tags' => ['cafe', 'kafe', 'coffee', 'kopi', 'barista', 'カフェ'],
            'id' => ['Demo Cafe AI', 'Barista AI untuk kafe: menu, tempat duduk, dan reservasi meja.'],
            'en' => ['Cafe AI demo', 'An AI Barista for a cafe: menu, seating and table reservations.'],
            'ja' => ['Cafe AIデモ', 'カフェ向けAIバリスタ。メニュー、座席、テーブル予約に対応。']],
        ['slug' => 'restaurant-ai', 'url' => 'https://restaurant-ai.fts-tech.co.id/', 'tags' => ['restaurant', 'restoran', 'rumah makan', 'food', 'makanan', 'レストラン', '飲食'],
            'id' => ['Demo FTS Restaurant AI', 'Host AI untuk restoran: menu, pemesanan meja, dan pesanan.'],
            'en' => ['FTS Restaurant AI demo', 'An AI Host for a restaurant: menu, table booking and orders.'],
            'ja' => ['FTS Restaurant AIデモ', 'レストラン向けAIホスト。メニュー、テーブル予約、注文に対応。']],
        ['slug' => 'hotel-ai', 'url' => 'https://hotel-ai.fts-tech.co.id/fts-hotel-ai', 'tags' => ['hotel', 'penginapan', 'resort', 'villa', 'ホテル', '宿泊'],
            'id' => ['Demo FTS Hotel AI', 'Concierge AI untuk hotel: kamar, fasilitas, dan reservasi.'],
            'en' => ['FTS Hotel AI demo', 'An AI Concierge for a hotel: rooms, facilities and reservations.'],
            'ja' => ['FTS Hotel AIデモ', 'ホテル向けAIコンシェルジュ。客室、施設、予約に対応。']],
        ['slug' => 'apartment-ai', 'url' => 'https://apartment-ai.fts-tech.co.id/fts-apartment-ai', 'tags' => ['apartment', 'apartemen', 'kos', 'properti', 'property', 'sewa', 'アパート', '不動産'],
            'id' => ['Demo FTS Apartment AI', 'Concierge AI untuk apartemen: unit, fasilitas, dan pengajuan sewa.'],
            'en' => ['FTS Apartment AI demo', 'An AI Concierge for apartments: units, facilities and rental applications.'],
            'ja' => ['FTS Apartment AIデモ', 'アパートメント向けAIコンシェルジュ。物件、施設、入居申込に対応。']],
        ['slug' => 'car-rental-ai', 'url' => 'https://car-rental-ai.fts-tech.co.id/fts-car-rental-ai', 'tags' => ['car rental', 'rental mobil', 'sewa mobil', 'mobil', 'transport', 'レンタカー'],
            'id' => ['Demo FTS Car Rental AI', 'Agen rental AI: armada mobil, layanan rental, dan reservasi.'],
            'en' => ['FTS Car Rental AI demo', 'An AI Rental Agent: car fleet, rental services and reservations.'],
            'ja' => ['FTS Car Rental AIデモ', 'AIレンタルエージェント。車両、レンタルサービス、予約に対応。']],
        ['slug' => 'spa-ai', 'url' => 'https://spa-ai.fts-tech.co.id/spa-ai', 'tags' => ['spa', 'massage', 'pijat', 'wellness', 'スパ'],
            'id' => ['Demo Spa AI', 'Concierge spa AI: perawatan, ruangan, dan reservasi.'],
            'en' => ['Spa AI demo', 'An AI Spa Concierge: treatments, rooms and reservations.'],
            'ja' => ['Spa AIデモ', 'AIスパコンシェルジュ。トリートメント、個室、予約に対応。']],
        ['slug' => 'beauty-salon-ai', 'url' => 'https://beauty-salon-ai.fts-tech.co.id/beauty-salon-ai', 'tags' => ['salon', 'beauty', 'kecantikan', 'hair', 'rambut', 'nail', '美容'],
            'id' => ['Demo Beauty Salon AI', 'Beautician AI untuk salon: layanan, stylist, dan janji temu.'],
            'en' => ['Beauty Salon AI demo', 'An AI Beautician for a salon: services, stylists and appointments.'],
            'ja' => ['Beauty Salon AIデモ', '美容サロン向けAIビューティシャン。メニュー、スタイリスト、予約に対応。']],
        ['slug' => 'fitness-gym-ai', 'url' => 'https://fitness-gym-ai.fts-tech.co.id/fitness-gym-ai', 'tags' => ['gym', 'fitness', 'kebugaran', 'olahraga', 'sport', 'ジム', 'フィットネス'],
            'id' => ['Demo Fitness Gym AI', 'Concierge kebugaran AI: program, latihan, dan reservasi.'],
            'en' => ['Fitness Gym AI demo', 'An AI Fitness Concierge: programs, training and reservations.'],
            'ja' => ['Fitness Gym AIデモ', 'AIフィットネスコンシェルジュ。プログラム、トレーニング、予約に対応。']],
        ['slug' => 'event-venue-ai', 'url' => 'https://event-venue-ai.fts-tech.co.id/aurelia-event-hall', 'tags' => ['event', 'acara', 'venue', 'gedung', 'hall', 'イベント', '会場'],
            'id' => ['Demo Aurelia Event Hall', 'Perencana acara AI untuk gedung acara: ruang, fasilitas, dan reservasi.'],
            'en' => ['Aurelia Event Hall demo', 'An AI Event Planner for an event hall: spaces, facilities and reservations.'],
            'ja' => ['Aurelia Event Hallデモ', 'イベントホール向けAIイベントプランナー。スペース、施設、予約に対応。']],
        ['slug' => 'wedding-venue-ai', 'url' => 'https://wedding-venue-ai.fts-tech.co.id/fts-wedding-venue-ai', 'tags' => ['wedding', 'pernikahan', 'nikah', 'venue', '結婚式'],
            'id' => ['Demo FTS Wedding Venue AI', 'Concierge pernikahan AI: hall, paket layanan, dan reservasi.'],
            'en' => ['FTS Wedding Venue AI demo', 'An AI Wedding Concierge: halls, service packages and reservations.'],
            'ja' => ['FTS Wedding Venue AIデモ', 'AIウェディングコンシェルジュ。会場、サービス、予約に対応。']],
        ['slug' => 'training-venue-ai', 'url' => 'https://training-venue-ai.fts-tech.co.id/fts-training-venue-ai', 'tags' => ['training', 'pelatihan', 'seminar', 'workshop', 'kursus', '研修'],
            'id' => ['Demo FTS Training Venue AI', 'Koordinator AI untuk tempat pelatihan: ruangan, fasilitas, dan reservasi.'],
            'en' => ['FTS Training Venue AI demo', 'An AI Coordinator for a training venue: rooms, facilities and reservations.'],
            'ja' => ['FTS Training Venue AIデモ', '研修会場向けAIコーディネーター。研修室、施設、予約に対応。']],
        ['slug' => 'recruitment-venue-ai', 'url' => 'https://recruitment-venue-ai.fts-tech.co.id/fts-recruitment-venue', 'tags' => ['recruitment', 'rekrutmen', 'job fair', 'hr', 'hiring', '採用'],
            'id' => ['Demo FTS Recruitment Venue', 'Koordinator venue AI untuk acara rekrutmen: ruang, fasilitas, dan pemesanan acara.'],
            'en' => ['FTS Recruitment Venue demo', 'An AI Venue Coordinator for recruitment events: spaces, facilities and event booking.'],
            'ja' => ['FTS Recruitment Venueデモ', '採用イベント会場向けAI会場コーディネーター。スペース、施設、イベント予約に対応。']],
        ['slug' => 'digital-agency-ai', 'url' => 'https://digital-agency-ai.fts-tech.co.id/digital-agency-ai', 'tags' => ['agency', 'agensi', 'marketing', 'digital', 'creative', 'エージェンシー'],
            'id' => ['Demo Digital Agency AI', 'Strategis digital AI untuk agensi: katalog layanan, tim, dan konsultasi.'],
            'en' => ['Digital Agency AI demo', 'An AI Digital Strategist for an agency: service catalog, team and consultations.'],
            'ja' => ['Digital Agency AIデモ', 'デジタルエージェンシー向けAIデジタルストラテジスト。カタログ、チーム、相談に対応。']],
        ['slug' => 'it-company-ai', 'url' => 'https://it-company-ai.fts-tech.co.id/it-company-ai', 'tags' => ['it company', 'perusahaan it', 'software house', 'it consulting', 'IT企業'],
            'id' => ['Demo IT Company AI', 'Konsultan solusi AI untuk perusahaan IT: layanan, konsultan, dan konsultasi.'],
            'en' => ['IT Company AI demo', 'An AI Solution Consultant for an IT company: services, consultants and consultations.'],
            'ja' => ['IT Company AIデモ', 'IT企業向けAIソリューションコンサルタント。サービス、コンサルタント、相談に対応。']],
        ['slug' => 'software-saas-ai', 'url' => 'https://software-saas-ai.fts-tech.co.id/software-saas-ai', 'tags' => ['saas', 'software', 'aplikasi', 'startup', 'product', 'ソフトウェア'],
            'id' => ['Demo Software SaaS AI', 'Konsultan SaaS AI: produk & paket, konsultan, dan permintaan demo produk.'],
            'en' => ['Software SaaS AI demo', 'An AI SaaS Consultant: products and plans, consultants and product demo requests.'],
            'ja' => ['Software SaaS AIデモ', 'AI SaaSコンサルタント。製品・プラン、コンサルタント、デモ申込に対応。']],
        ['slug' => 'sme-business-ai', 'url' => 'https://sme-business-ai.fts-tech.co.id/maju-jaya-studio', 'tags' => ['umkm', 'sme', 'small business', 'usaha kecil', 'toko', 'percetakan', 'print', '中小企業'],
            'id' => ['Demo Maju Jaya Studio (UMKM)', 'Asisten bisnis AI untuk usaha kecil: katalog, area layanan, dan pemesanan jadwal.'],
            'en' => ['Maju Jaya Studio demo (small business)', 'An AI Business Assistant for a small business: catalog, service areas and slot booking.'],
            'ja' => ['Maju Jaya Studioデモ（中小企業）', '中小企業向けAIビジネスアシスタント。カタログ、対応エリア、予約に対応。']],
    ];

    public function run(): void
    {
        $company = Company::where('slug', CompanySeeder::SLUG)->firstOrFail();

        $records = [
            [
                'category' => 'general',
                'title' => 'Tentang Fujiyama Technology Solutions (FTS)',
                'body' => 'FTS adalah perusahaan IT berakar Jepang di Indonesia. FTS membangun staf AI, otomasi AI, website dan aplikasi web, integrasi sistem, serta pengembangan offshore untuk perusahaan Jepang, dengan standar kualitas Jepang dan tim di Indonesia.',
                'translations' => [
                    'en' => ['title' => 'About Fujiyama Technology Solutions (FTS)', 'body' => 'FTS is a Japanese-rooted IT company in Indonesia. FTS builds AI staff, AI automation, websites and web applications, system integration, and offshore development for Japanese companies, with Japanese quality standards and a team in Indonesia.'],
                    'ja' => ['title' => 'Fujiyama Technology Solutions（FTS）について', 'body' => 'FTSはインドネシアの日系IT企業です。日本品質の基準とインドネシアのチームで、AIスタッフ、AI自動化、ウェブサイト・Webアプリ、システム連携、日本企業向けオフショア開発を提供しています。'],
                ],
                'tags' => ['about', 'tentang', 'profil', 'company', 'fts', 'fujiyama', '会社'],
            ],
            [
                'category' => 'demos',
                'title' => 'Tentang demo AI di halaman ini',
                'body' => 'Halaman ini menampilkan 16 demo staf AI yang live untuk berbagai industri. Setiap demo adalah contoh usaha dengan data, harga, dan nama contoh, bukan toko sungguhan. Pengunjung bisa mengobrol dengan AI-nya, melihat layanan, dan mencoba alur reservasi. FTS membangun versi yang disesuaikan untuk bisnis klien.',
                'translations' => [
                    'en' => ['title' => 'About the AI demos on this page', 'body' => 'This page shows 16 live AI staff demos for different industries. Each demo is a sample business with sample data, prices and names, not a real shop. Visitors can chat with its AI, browse services and try the booking flow. FTS builds a version adapted to each client business.'],
                    'ja' => ['title' => 'このページのAIデモについて', 'body' => 'このページでは、さまざまな業種向けの16のAIスタッフのライブデモを紹介しています。各デモはサンプルのデータ・料金・名称を使った架空の店舗です。AIとの会話、サービスの閲覧、予約の流れをお試しいただけます。FTSは御社に合わせたバージョンを構築します。'],
                ],
                'tags' => ['demo', 'contoh', 'sample', 'industri', 'industry', 'デモ'],
            ],
            [
                'category' => 'policies',
                'title' => 'Konsultasi gratis 60 menit',
                'body' => 'Konsultasi dengan tim FTS gratis, online, berlangsung 60 menit untuk 1–6 peserta, Senin–Jumat. Permintaan berstatus pending sampai tim FTS mengonfirmasi lewat kontak yang Anda berikan. Tidak ada pembayaran di situs ini.',
                'translations' => [
                    'en' => ['title' => 'Free 60-minute consultation', 'body' => 'Consultations with the FTS team are free, online, 60 minutes long for 1–6 participants, Monday to Friday. Requests stay pending until the FTS team confirms them through the contact you provide. No payment is taken on this site.'],
                    'ja' => ['title' => '60分の無料相談', 'body' => 'FTSチームとのご相談は無料・オンラインで、1〜6名で60分、月曜〜金曜に承ります。FTSチームがご連絡先を通じて確定するまでは申請中となります。このサイトでのお支払いはありません。'],
                ],
                'tags' => ['consultation', 'konsultasi', 'gratis', 'free', 'booking', 'reservasi', 'jadwal', '相談', '予約'],
            ],
            [
                'category' => 'policies',
                'title' => 'Harga dan penawaran',
                'body' => 'FTS tidak mencantumkan harga proyek tetap di situs ini. Biaya pembuatan staf AI atau otomasi tergantung ruang lingkup, integrasi, dan bahasa. Tim FTS menyiapkan penawaran setelah sesi konsultasi.',
                'translations' => [
                    'en' => ['title' => 'Pricing and quotes', 'body' => 'FTS does not list fixed project prices on this site. The cost of AI staff or automation depends on scope, integrations and languages. The FTS team prepares a quote after the consultation session.'],
                    'ja' => ['title' => '料金とお見積り', 'body' => 'このサイトでは固定のプロジェクト料金は掲載していません。AIスタッフや自動化の費用は、範囲・連携・対応言語によって異なります。ご相談後にFTSチームがお見積りをご用意します。'],
                ],
                'tags' => ['price', 'harga', 'biaya', 'cost', 'quote', 'penawaran', '料金', '見積'],
            ],
            [
                'category' => 'location',
                'title' => 'Kantor dan kontak FTS',
                'body' => 'Kantor: Neo Soho Mall, Jl. Let. Jend. S. Parman Kav. 28 Unit 2011, Jakarta Barat 11470. Jam kerja: Senin–Jumat 09:00–18:00 WIB. Email: info@fts-tech.co.id. Telepon/WhatsApp: +62 811 8999 7757. Website: fts-tech.co.id.',
                'translations' => [
                    'en' => ['title' => 'FTS office and contact', 'body' => 'Office: Neo Soho Mall, Jl. Let. Jend. S. Parman Kav. 28 Unit 2011, West Jakarta 11470. Business hours: Monday–Friday 09:00–18:00 (WIB). Email: info@fts-tech.co.id. Phone/WhatsApp: +62 811 8999 7757. Website: fts-tech.co.id.'],
                    'ja' => ['title' => 'FTSのオフィスと連絡先', 'body' => 'オフィス：Neo Soho Mall, Jl. Let. Jend. S. Parman Kav. 28 Unit 2011, 西ジャカルタ 11470。営業時間：月曜〜金曜 9:00〜18:00（ジャカルタ時間）。メール：info@fts-tech.co.id。電話/WhatsApp：+62 811 8999 7757。ウェブサイト：fts-tech.co.id。'],
                ],
                'tags' => ['office', 'kantor', 'alamat', 'address', 'contact', 'kontak', 'email', 'whatsapp', 'jam', 'hours', '住所', '連絡'],
            ],
            [
                'category' => 'faq',
                'title' => 'Bagaimana memulai proyek dengan FTS',
                'body' => 'Coba demo yang paling mirip dengan bisnis Anda, lalu pesan konsultasi gratis. Di konsultasi, tim FTS memetakan alur kerja dan pertanyaan pelanggan Anda, lalu mengusulkan langkah pertama, biasanya satu alur kerja kecil sebelum diperluas.',
                'translations' => [
                    'en' => ['title' => 'How to start a project with FTS', 'body' => 'Try the demo closest to your business, then book a free consultation. In the consultation the FTS team maps your workflow and customer questions and proposes a first step, usually one small workflow before expanding.'],
                    'ja' => ['title' => 'FTSとのプロジェクトの始め方', 'body' => '御社に近いデモをお試しのうえ、無料相談をご予約ください。ご相談では業務フローやお客様からの質問を整理し、最初の一歩をご提案します。通常は小さな業務から始めて段階的に広げます。'],
                ],
                'tags' => ['start', 'mulai', 'proses', 'process', 'langkah', 'how', '始め方'],
            ],
            [
                'category' => 'faq',
                'title' => 'Bahasa yang didukung staf AI',
                'body' => 'Demo FTS mendukung bahasa Indonesia, Inggris, dan Jepang. Bahasa lain bisa dibahas saat konsultasi.',
                'translations' => [
                    'en' => ['title' => 'Languages supported by the AI staff', 'body' => 'FTS demos support Indonesian, English and Japanese. Other languages can be discussed in the consultation.'],
                    'ja' => ['title' => 'AIスタッフの対応言語', 'body' => 'FTSのデモはインドネシア語・英語・日本語に対応しています。その他の言語はご相談ください。'],
                ],
                'tags' => ['language', 'bahasa', 'multilingual', 'japanese', 'jepang', 'english', '言語'],
            ],
        ];

        foreach (self::DEMOS as $demo) {
            $records[] = [
                'category' => 'demos',
                'title' => $demo['id'][0],
                'body' => $demo['id'][1].' Coba langsung: '.$demo['url'],
                'translations' => [
                    'en' => ['title' => $demo['en'][0], 'body' => $demo['en'][1].' Try it: '.$demo['url']],
                    'ja' => ['title' => $demo['ja'][0], 'body' => $demo['ja'][1].' デモ：'.$demo['url']],
                ],
                'tags' => ['demo', $demo['slug'], ...$demo['tags']],
            ];
        }

        foreach ($records as $index => $record) {
            $company->knowledgeItems()->updateOrCreate(
                ['title' => $record['title']],
                [...$record, 'image_url' => null, 'is_active' => true, 'sort_order' => $index],
            );
        }
    }
}
