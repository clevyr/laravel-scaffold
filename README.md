# Laravel Scaffold

## Usage

1. Install the package
```bash
composer require clevyr/laravel-scaffold
```
2. The following commands are now at your disposal
```bash
php artisan make:auth-vue // scaffold out vue SPA frontend
php artisan make:docker // scaffold out common docker setup for laravel
```

## Development

1. Within the root of an existing laravel project, clone this project to `./packages/clevyr/laravel-scaffold`
2. Add the following to your composer.json
```json
"repositories": [
    {
        "type": "path",
        "url": "./packages/clevyr/laravel-scaffold",
        "options": {
            "symlink": true
        }
    }
],
```
3. Add laravel-scaffold to your list of requires in your composer.json like below:
```json
"require": {
    "php": "^7.1.3",
    "fideloper/proxy": "^4.0",
    "laravel/framework": "5.8.*",
    "laravel/tinker": "^1.0",
    "clevyr/laravel-scaffold": "dev-master"
},
```
4. Run `composer require clevyr/laravel-scaffold` to initiate the symlink
