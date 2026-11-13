<?php

namespace Database\Seeders;

use App\Models\Company;
use Illuminate\Database\Seeder;

/**
 * The one tenant this site serves: FTS itself. Contact details and hours match
 * the public company profile at fts-tech.co.id.
 */
class CompanySeeder extends Seeder
{
    public const SLUG = 'fts';

    public const NAME = 'Fujiyama Technology Solutions';

    public function run(): void
    {
        Company::updateOrCreate(['slug' => self::SLUG], [
            'name' => self::NAME,
            'description' => 'Perusahaan IT berakar Jepang di Indonesia yang membangun staf AI, otomasi AI, dan website untuk bisnis.',
            'translations' => [
                'en' => [
                    'description' => 'A Japanese-rooted IT company in Indonesia building AI staff, AI automation and websites for businesses.',
                ],
                'ja' => [
                    'description' => 'インドネシアの日系IT企業。企業向けにAIスタッフ、AI自動化、ウェブサイトを開発しています。',
                ],
            ],
            'address' => 'Neo Soho Mall, Jl. Let. Jend. S. Parman Kav. 28 Unit 2011, Tanjung Duren Selatan, Grogol Petamburan, Jakarta Barat 11470',
            'city' => 'Jakarta',
            'country' => 'Indonesia',
            'phone' => '+6281189997757',
            'whatsapp' => '6281189997757',
            'email' => 'info@fts-tech.co.id',
            'instagram' => null,
            'timezone' => 'Asia/Jakarta',
            'currency' => 'IDR',
            'default_locale' => 'id',
            'opening_time' => '09:00',
            'closing_time' => '18:00',
            'public_status' => 'published',
        ]);
    }
}
