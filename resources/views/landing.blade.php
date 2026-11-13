{{-- The public pages (demo showcase, consultation booking): a React app (resources/js/landing). Copy and language switching live in the app. --}}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>FTS AI Demos — Our Solutions to Your Problems</title>
    <meta name="description" content="Try 16 AI staff demos from Fujiyama Technology Solutions for cafes, hotels, restaurants, venues and more.">
    <meta property="og:title" content="FTS AI Demos — Our Solutions to Your Problems">
    <meta property="og:description" content="Try 16 AI staff demos from Fujiyama Technology Solutions for cafes, hotels, restaurants, venues and more.">
    <meta property="og:type" content="website">
    <meta property="og:image" content="{{ asset('images/demos/hotel-ai.webp') }}">
    <meta name="theme-color" content="#102342">
    <link rel="icon" type="image/webp" href="{{ asset('images/ai-landing/global/fts-logo.webp') }}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+JP:wght@400;700&display=swap" rel="stylesheet">
    @viteReactRefresh
    @vite('resources/js/landing/main.tsx')
</head>
<body>
    <div id="root"></div>
    <script>window.FTS_PAGE = @json($page); window.FTS_LANDING = @json($config);</script>
</body>
</html>
