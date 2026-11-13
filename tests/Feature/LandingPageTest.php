<?php

namespace Tests\Feature;

use App\Models\Company;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LandingPageTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->withoutVite();
    }

    public function test_the_landing_page_hands_the_chat_and_booking_endpoints_of_the_fts_tenant_to_the_app(): void
    {
        Company::factory()->create(['slug' => 'fts']);

        $this->get('/')
            ->assertOk()
            ->assertSee('<div id="root"></div>', false)
            ->assertSee('csrf-token', false)
            ->assertSee('"companySlug":"fts"', false)
            ->assertSee(str_replace('/', '\/', route('solution_consultant.message', 'fts')), false)
            ->assertSee(str_replace('/', '\/', route('consultation.store', 'fts')), false);
    }

    public function test_the_consultation_page_is_its_own_page_with_the_same_endpoints(): void
    {
        Company::factory()->create(['slug' => 'fts']);

        $this->get('/consultation')
            ->assertOk()
            ->assertSee('window.FTS_PAGE = "consultation"', false)
            ->assertSee(str_replace('/', '\/', route('consultation.options', 'fts')), false);

        $this->get('/')->assertSee('window.FTS_PAGE = "home"', false);
    }

    public function test_the_landing_page_still_renders_without_a_published_tenant(): void
    {
        Company::factory()->draft()->create(['slug' => 'fts']);

        $this->get('/')->assertOk()->assertSee('window.FTS_LANDING = null', false);
    }
}
