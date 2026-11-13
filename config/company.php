<?php

return [
    'trusted_proxies' => array_values(array_filter(array_map('trim', explode(',', (string) env('TRUSTED_PROXIES', ''))))),
    'locales' => [
        'id',
        'en',
        'ja',
    ],
    'default_locale' => 'id',

    /*
     * The tenant the landing page's chat and booking form talk to.
     */
    'landing_slug' => env('LANDING_COMPANY_SLUG', 'fts'),
];
