<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * The FTS tenant and its content are real company data, so they are seeded
     * in every environment. Every seeder is idempotent (updateOrCreate / upsert).
     * Admin accounts are never seeded in production: use company:create-admin.
     */
    public function run(): void
    {
        $this->call([
            CompanySeeder::class,
            ServiceOfferingSeeder::class,
            ConsultantSeeder::class,
            ConsultationSlotSeeder::class,
            CompanyKnowledgeItemSeeder::class,
        ]);
    }
}
