<?php

namespace Clevyr\LaravelScaffold\Console;

use Illuminate\Console\Command;
use Illuminate\Console\DetectsApplicationNamespace;

class MakeDockerCommand extends Command
{
    use DetectsApplicationNamespace;

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:docker
                    {--force : Overwrite existing views by default}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Scaffold basic docker setup';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        $this->recursivelyCopy(
            __DIR__.'/stubs/MakeDockerStubs',
            base_path(),
            function ($srcPath, $destPath) {
                file_put_contents(
                    $destPath,
                    str_replace('{{APP_NAME}}', strtolower(env('APP_NAME', 'app')), file_get_contents($srcPath))
                );
            }
        );

        $this->info('Docker setup generated successfully.');
    }

    private function recursivelyCopy($src, $dest, $copyMethod = null)
    {
        if (!$copyMethod) {
            $copyMethod = function ($srcPath, $destPath) {
                file_put_contents(
                    $destPath,
                    file_get_contents($srcPath)
                );
            };
        }

        foreach (new \RecursiveIteratorIterator(new \RecursiveDirectoryIterator($src)) as $file) {
            $srcPath = $file->getPathname();
            $destPath = str_replace($src, $dest, $srcPath);
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
                $copyMethod($srcPath, $destPath);
            }
        }
    }
}
