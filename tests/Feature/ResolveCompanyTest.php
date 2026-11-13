<?php

namespace Tests\Feature;

use App\Models\Company;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Tests\TestCase;

class ResolveCompanyTest extends TestCase
{
    use RefreshDatabase;

    public function test_an_unknown_company_is_not_found_on_json_endpoints(): void
    {
        $this->postJson('/nowhere/solution_consultant/start')->assertNotFound();
        $this->postJson('/nowhere/consultation/quote')->assertNotFound();
        $this->getJson('/nowhere/consultation/options')->assertNotFound();
    }

    public function test_a_draft_company_is_not_public(): void
    {
        $company = Company::factory()->draft()->create(['slug' => 'soon']);

        $this->postJson('/'.$company->slug.'/solution_consultant/start')->assertNotFound();
        $this->getJson('/'.$company->slug.'/consultation/options')->assertNotFound();
    }

    public function test_a_chat_starts_in_the_requested_supported_language(): void
    {
        Company::factory()->create(['slug' => 'demo', 'default_locale' => 'id']);

        $this->postJson('/demo/solution_consultant/start', ['locale' => 'ja'])->assertOk()->assertJsonPath('locale', 'ja');
        $this->postJson('/demo/solution_consultant/start', ['locale' => 'xx'])->assertOk()->assertJsonPath('locale', 'id');
    }

    public function test_every_response_carries_a_request_id_and_a_valid_incoming_one_is_reused(): void
    {
        Company::factory()->create(['slug' => 'demo']);

        $generated = $this->getJson('/demo/consultation/options')->headers->get('X-Request-Id');
        $this->assertTrue(Str::isUuid($generated));

        $incoming = (string) Str::uuid();
        $this->getJson('/demo/consultation/options', ['X-Request-Id' => $incoming])->assertHeader('X-Request-Id', $incoming);

        $this->assertNotSame('not-a-uuid', $this->getJson('/demo/consultation/options', ['X-Request-Id' => 'not-a-uuid'])->headers->get('X-Request-Id'));
    }
}
