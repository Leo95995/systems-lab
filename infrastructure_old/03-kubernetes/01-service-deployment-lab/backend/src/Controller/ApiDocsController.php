<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

final class ApiDocsController extends AbstractController
{
    #[Route('/docs', name: 'app_api_docs')]
    public function swaggerJson(): JsonResponse
    {
        $path = $this->getParameter('kernel.project_dir') . '/public/swagger.json';
        $content = file_get_contents($path);

       return new JsonResponse($content, 200, [], true);

    }
}
