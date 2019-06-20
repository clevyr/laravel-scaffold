<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @auth <meta name="is-auth"> @endauth
    <title>{{ config('app.name') }}</title>
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    @if (!app()->environment('production'))
        <link rel="stylesheet" href="https://cdn.clevyr.dev/css/devbanner.css">
    @endif
</head>
<body>
    <div id="app" class="d-flex flex-column">
        <navbar></navbar>
        <router-view></router-view>
        <toast></toast>
    </div>
    <script src="{{ asset('js/app.js') }}"></script>
</body>
</html>
