<?php

namespace Clevyr\LaravelScaffold\Console;

use Illuminate\Console\Command;
use Illuminate\Console\DetectsApplicationNamespace;

class MakeAuthVueCommand extends Command
{
    use DetectsApplicationNamespace;

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:auth-vue
                    {--force : Overwrite existing views by default}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Scaffold basic login and registration with Vue';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        $this->exportControllers();
        $this->exportRoutes();
        $this->exportResources();
        $this->installDeps();

        $this->info('Vue Auth scaffolding generated successfully.');
    }

    /**
     * Export the controllers
     *
     * @return void
     */
    protected function exportControllers()
    {
        $this->recursivelyCopy(
            __DIR__.'/stubs/MakeAuthVueStubs/app',
            app_path(),
            function ($contents) {
                return str_replace('{{namespace}}', $this->getAppNamespace(), $contents);
            }
        );
    }

    /**
     * Export the controllers
     *
     * @return void
     */
    protected function exportRoutes()
    {
        $this->recursivelyCopy(
            __DIR__.'/stubs/MakeAuthVueStubs/routes',
            base_path('routes')
        );
    }

    /**
     * Export the authentication views.
     *
     * @return void
     */
    protected function exportResources()
    {
        $this->recursivelyCopy(
            __DIR__.'/stubs/MakeAuthVueStubs/resources',
            base_path('resources')
        );
    }

    /**
     * Install npm dependencies
     *
     * @return void
     */
    protected function installDeps()
    {
        exec('npm install --save-dev vuex bootstrap-vue vue-router');
    }

    private function recursivelyCopy($src, $dest, $compiler = null)
    {
        if (!$compiler) {
            $compiler = function ($contents) {
                return $contents;
            };
        }

        foreach (new \RecursiveIteratorIterator(new \RecursiveDirectoryIterator($src)) as $file) {
            $destPath = str_replace($src, $dest, $file->getPathname());
            if ($file->isDir()) {
                if (! is_dir($destPath)) {
                    mkdir($destPath, 0755, true);
                }
            } else {
                if (file_exists($destPath) && ! $this->option('force')) {
                    if (! $this->confirm("The file [{$destPath}] already exists. Do you want to replace it?")) {
                        continue;
                    }
                }
                file_put_contents(
                    $dest.str_replace($src, '', $file),
                    $compiler(file_get_contents($file))
                );
            }
        }
    }
}
