<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Contracts\View\View;

/**
 * The public pages: the demo showcase, its landing page version (/lp) and the consultation booking page. All are
 * the same React app (resources/js/landing); this hands it the page to show and
 * the endpoints of the AI Consultant chat and the booking form.
 */
class LandingController extends Controller
{
    public function home(): View
    {
        return $this->page('home');
    }

    public function consultation(): View
    {
        return $this->page('consultation');
    }

    /** The landing page version of the showcase: same content, no demo or outbound links. */
    public function lp(): View
    {
        return $this->page('lp');
    }

    private function page(string $page): View
    {
        $company = Company::query()->published()->where('slug', config('company.landing_slug'))->first();

        return view('landing', [
            'page' => $page,
            'config' => $company ? [
                'companySlug' => $company->slug,
                'endpoints' => [
                    'chatStart' => route('solution_consultant.start', $company->slug),
                    'chatMessage' => route('solution_consultant.message', $company->slug),
                    'chatHistory' => route('solution_consultant.history', $company->slug),
                    'consultationOptions' => route('consultation.options', $company->slug),
                    'consultationQuote' => route('consultation.quote', $company->slug),
                    'consultationStore' => route('consultation.store', $company->slug),
                ],
            ] : null,
        ]);
    }
}
