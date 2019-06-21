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
        $this->exportFiles();

        $this->info('Docker setup generated successfully.');
    }

    /**
     * Export the files
     *
     * @return void
     */
    protected function exportFiles()
    {
        $this->recursivelyCopy(
            __DIR__.'/stubs/MakeDockerStubs',
            base_path()
        );
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
