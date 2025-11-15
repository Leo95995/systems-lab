<?php

use Symfony\Component\Dotenv\Dotenv;

require dirname(__DIR__).'/vendor/autoload.php';

$dotenvFile = dirname(__DIR__).'/.env';

if (file_exists($dotenvFile)) {
    (new Dotenv())->bootEnv($dotenvFile);
}
