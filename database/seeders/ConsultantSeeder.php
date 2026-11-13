<?php

namespace Database\Seeders;

use App\Models\Company;
use Illuminate\Database\Seeder;

/**
 * Consultation "desks" rather than named people: the FTS team assigns who joins
 * once a request is confirmed.
 */
class ConsultantSeeder extends Seeder
{
    public function run(): void
    {
        $company = Company::where('slug', CompanySeeder::SLUG)->firstOrFail();

        $records = [
            [
                'slug' => 'ai-solutions-team',
                'name' => 'Tim Solusi AI FTS',
                'specialty' => 'ai_solutions',
                'description' => 'Membahas staf AI, otomasi AI, dan demo yang paling cocok dengan bisnis Anda.',
                'translations' => [
                    'en' => [
                        'name' => 'FTS AI Solutions Team',
                        'description' => 'Discuss AI staff, AI automation and the demo that best fits your business.',
                    ],
                    'ja' => [
                        'name' => 'FTS AIソリューションチーム',
                        'description' => 'AIスタッフ、AI自動化、御社に合うデモについてご相談いただけます。',
                    ],
                ],
            ],
            [
                'slug' => 'web-team',
                'name' => 'Tim Web FTS',
                'specialty' => 'web',
                'description' => 'Membahas website, aplikasi web, dan integrasi sistem.',
                'translations' => [
                    'en' => [
                        'name' => 'FTS Web Team',
                        'description' => 'Discuss websites, web applications and system integration.',
                    ],
                    'ja' => [
                        'name' => 'FTS Webチーム',
                        'description' => 'ウェブサイト、Webアプリ、システム連携についてご相談いただけます。',
                    ],
                ],
            ],
            [
                'slug' => 'japan-desk',
                'name' => 'Japan Desk FTS',
                'specialty' => 'japan',
                'description' => 'Konsultasi dalam bahasa Jepang untuk perusahaan Jepang, termasuk pengembangan offshore.',
                'translations' => [
                    'en' => [
                        'name' => 'FTS Japan Desk',
                        'description' => 'Japanese-language consultations for Japanese companies, including offshore development.',
                    ],
                    'ja' => [
                        'name' => 'FTS ジャパンデスク',
                        'description' => '日本企業向けに日本語でご相談を承ります。オフショア開発のご相談も可能です。',
                    ],
                ],
            ],
        ];

        foreach ($records as $index => $record) {
            $company->consultants()->updateOrCreate(['slug' => $record['slug']], [
                ...$record,
                'min_participants' => 1,
                'max_participants' => 6,
                'features' => ['video_call', 'free'],
                'consultation_fee' => 0,
                'project_budget_from' => null,
                'sort_order' => $index,
                'is_active' => true,
            ]);
        }
    }
}
