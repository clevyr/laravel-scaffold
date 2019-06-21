<?php

namespace Clevyr\LaravelScaffold;

use Illuminate\Support\ServiceProvider as BaseServiceProvider;
use Clevyr\LaravelScaffold\Console\MakeAuthVueCommand;
use Clevyr\LaravelScaffold\Console\MakeDockerCommand;

class ServiceProvider extends BaseServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        if ($this->app->runningInConsole()) {
            $this->commands([
                MakeAuthVueCommand::class,
                MakeDockerCommand::class,
            ]);
        }
    }
}
