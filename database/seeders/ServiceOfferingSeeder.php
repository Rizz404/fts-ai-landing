<?php

namespace Database\Seeders;

use App\Models\Company;
use Illuminate\Database\Seeder;

/**
 * FTS services. Prices are 0 on purpose: FTS does not publish project prices, so
 * the assistant can only say the team prepares a quote after discovery.
 */
class ServiceOfferingSeeder extends Seeder
{
    public function run(): void
    {
        $company = Company::where('slug', CompanySeeder::SLUG)->firstOrFail();

        $records = [
            [
                'slug' => 'ai-staff',
                'category' => 'ai_staff',
                'name' => 'Staf AI untuk bisnis Anda',
                'description' => 'Asisten AI yang melayani pelanggan di website Anda: menjawab pertanyaan, menampilkan menu atau layanan, menerima permintaan reservasi, dan meneruskan ke staf. Seperti demo di halaman ini, disesuaikan dengan bisnis Anda.',
                'translations' => [
                    'en' => [
                        'name' => 'AI staff for your business',
                        'description' => 'An AI assistant that serves customers on your website: answers questions, shows your menu or services, takes booking requests and hands over to staff. Like the demos on this page, adapted to your business.',
                    ],
                    'ja' => [
                        'name' => '御社専用のAIスタッフ',
                        'description' => 'ウェブサイト上でお客様に対応するAIアシスタント。質問への回答、メニューやサービスの紹介、予約リクエストの受付、スタッフへの引き継ぎを行います。このページのデモと同様に、御社に合わせて構築します。',
                    ],
                ],
                'tags' => ['multilingual', 'booking', 'whatsapp'],
                'prerequisites' => ['business_brief', 'service_list'],
                'is_featured' => true,
            ],
            [
                'slug' => 'ai-automation',
                'category' => 'ai_automation',
                'name' => 'Otomasi AI & AI agent',
                'description' => 'Otomasi pekerjaan berulang di penjualan, layanan pelanggan, dan operasional: kualifikasi lead, dukungan WhatsApp, asisten pengetahuan internal, dan laporan otomatis.',
                'translations' => [
                    'en' => [
                        'name' => 'AI automation & AI agents',
                        'description' => 'Automate repetitive work in sales, support and operations: lead qualification, WhatsApp support, internal knowledge assistants and automated reporting.',
                    ],
                    'ja' => [
                        'name' => 'AI自動化・AIエージェント',
                        'description' => '営業・サポート・業務の繰り返し作業を自動化します。リード選別、WhatsAppサポート、社内ナレッジアシスタント、レポートの自動作成など。',
                    ],
                ],
                'tags' => ['automation', 'whatsapp'],
                'prerequisites' => ['business_brief', 'process_overview'],
                'is_featured' => true,
            ],
            [
                'slug' => 'website-development',
                'category' => 'web',
                'name' => 'Pembuatan website & aplikasi web',
                'description' => 'Website perusahaan, website restoran, dan aplikasi web yang siap SEO dengan integrasi WhatsApp.',
                'translations' => [
                    'en' => [
                        'name' => 'Website & web app development',
                        'description' => 'Company websites, restaurant websites and web applications, SEO-ready with WhatsApp integration.',
                    ],
                    'ja' => [
                        'name' => 'ウェブサイト・Webアプリ開発',
                        'description' => 'SEO対策とWhatsApp連携に対応した企業サイト、飲食店サイト、Webアプリケーション。',
                    ],
                ],
                'tags' => ['multilingual', 'whatsapp'],
                'prerequisites' => ['business_brief', 'brand_assets'],
                'is_featured' => false,
            ],
            [
                'slug' => 'system-integration',
                'category' => 'integration',
                'name' => 'Integrasi sistem',
                'description' => 'Menghubungkan AI dengan WhatsApp Business, email, CRM, Google Workspace, ERP, POS, dan API internal.',
                'translations' => [
                    'en' => [
                        'name' => 'System integration',
                        'description' => 'Connect AI with WhatsApp Business, email, CRM, Google Workspace, ERP, POS and internal APIs.',
                    ],
                    'ja' => [
                        'name' => 'システム連携',
                        'description' => 'AIをWhatsApp Business、メール、CRM、Google Workspace、ERP、POS、社内APIと連携します。',
                    ],
                ],
                'tags' => ['automation', 'whatsapp'],
                'prerequisites' => ['api_access', 'process_overview'],
                'is_featured' => false,
            ],
            [
                'slug' => 'offshore-development',
                'category' => 'support',
                'name' => 'Pengembangan offshore untuk perusahaan Jepang',
                'description' => 'Tim pengembangan di Indonesia dengan komunikasi dwibahasa Jepang–Indonesia untuk proyek perusahaan Jepang.',
                'translations' => [
                    'en' => [
                        'name' => 'Offshore development for Japanese companies',
                        'description' => 'A development team in Indonesia with bilingual Japanese–Indonesian communication for Japanese company projects.',
                    ],
                    'ja' => [
                        'name' => '日本企業向けオフショア開発',
                        'description' => '日本語・インドネシア語のバイリンガル体制で、日本企業のプロジェクトをインドネシアの開発チームが担当します。',
                    ],
                ],
                'tags' => ['managed', 'multilingual'],
                'prerequisites' => ['business_brief'],
                'is_featured' => false,
            ],
        ];

        foreach ($records as $index => $record) {
            $company->serviceOfferings()->updateOrCreate(['slug' => $record['slug']], [
                ...$record,
                'price' => 0,
                'delivery_model' => 'remote',
                'delivery_days' => null,
                'image_url' => null,
                'is_unavailable' => false,
                'sort_order' => $index,
                'is_active' => true,
            ]);
        }
    }
}
