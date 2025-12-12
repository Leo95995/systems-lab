<?php

namespace App\Controller;

use App\DTO\TaskEditDto;
use App\Service\TaskService;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;
use App\DTO\TaskInput;


final class TaskController extends AbstractController
{
    #[Route('/task', name: 'app_task', methods: ['GET'])]
    public function getAllTasks(TaskService $taskService): JsonResponse
    {
        try {
            $taskList = $taskService->getActives();
            if (count($taskList) <= 0) {
                return $this->json([
                    "errors" => ['Nessun task presente nella tasklist']
                ], 404);
            }



            return $this->json([
                'tasks' => $taskList,
                'total' => count($taskList),
            ], 200);

        } catch (\Exception $e) {
            return $this->json(['errors' => ['Errore nel recupero dei task attivi']], 500);
        }

    }

    #[Route('/task/archive', methods: ['GET'])]
    public function getArchivedTasks(TaskService $taskService): JsonResponse
    {
        try {
            $archivedTasks = $taskService->getArchived();
            if (count($archivedTasks) <= 0) {
                return $this->json([
                    "errors" => ['Nessun task archiviato presente']
                ], 404);
            }
            return $this->json([
                'tasks' => $archivedTasks,
                'total' => count($archivedTasks),
            ], 200);
        } catch (\Exception $e) {
            return $this->json(['errors' => ['Errore nel recupero dei task attivi']], 500);
        }

    }


    #[Route('/task/{id}', methods: ['GET'])]
    public function getSingleTask(int $id, TaskService $taskService): JsonResponse
    {

        $task = $taskService->getOne($id);


        if (!$task) {
            return $this->json(['error' => "Task non trovato per l' id specificato"], 404);
        }

        return $this->json([
            'task' => $task
        ], 200);
    }



    #[Route('/task', methods: ['POST'])]
    public function createTask(
        Request $request,
        SerializerInterface $serializer,
        ValidatorInterface $validator,
        TaskService $taskService
    ): JsonResponse {

        // Deserializzo il json in dto (data transfer object)
        try {
            $dto = $serializer->deserialize($request->getContent(), TaskInput::class, 'json');
        } catch (\Exception $e) {
            return $this->json(['errors' => ['Formato JSON invalido']], 400);
        }

        // uso il metodo validate per verificare se ci sono errori
        $errors = $validator->validate($dto);
        // Se c'è almeno un errore ritorno al frontend/postman il messaggio di errore
        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[] = $error->getPropertyPath() . ': ' . $error->getMessage();
            }
            return $this->json(['errors' => $errorMessages], 400);
        }

        // sulla base del dto adesso popolo l'oggetto task

        $task = $taskService->create($dto);


        // Ritorno la risposta con i dati
        return $this->json([
            'id' => $task->getId(),
            'titolo' => $task->getTitolo(),
            'descrizione' => $task->getDescrizione(),
            'data' => $task->getData(),
            'stato' => $task->getStato()?->value,
        ], 201);
    }

    #[Route('/task/{id}', methods: ['PATCH'])]
    public function updateTask(int $id, Request $request, SerializerInterface $serializer, ValidatorInterface $validator, TaskService $taskService): JsonResponse
    {

        try {
            $dto = $serializer->deserialize($request->getContent(), TaskEditDto::class, 'json');
        } catch (\Exception $e) {
            return $this->json(['errors' => ['Formato JSON invalido']], 400);
        }


        $errors = $validator->validate($dto);

        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[] = $error->getPropertyPath() . ': ' . $error->getMessage();
            }
            return $this->json(['errors' => $errorMessages], 400);
        }

        $task = $taskService->patch($dto, $id);

        if (!$task) {
            return $this->json(["error" => "Task non trovato"], 404);
        }


        return $this->json([
            'task' => [
                'titolo' => $task->getTitolo(),
                'descrizione' => $task->getDescrizione(),
                'stato' => $task->getStato(),
                'data' => $task->getData()
            ]
        ], 200);
    }
    /**
     * Function to archiviate a single task
     */
    #[Route('/task/archive/{id}', methods: ['PATCH'])]
    public function archiveTask(int $id, Request $request, TaskService $taskService): JsonResponse
    {
        $content = json_decode($request->getContent());
        $archived = $taskService->archive($content->archiviato, $id);

        if (!$archived) {
            return $this->json(["message" => "Task non trovato."], 404);
        }

        try {
            return $this->json(["data" => $archived, "status" => "OK"], 200);
        } catch (\Exception $e) {
            return $this->json(['errors' => ['Formato JSON invalido']], 400);
        }
    }



    #[Route('/task/{id}', methods: ['DELETE'])]
    public function deleteTask(int $id, TaskService $taskService): JsonResponse
    {

        $task = $taskService->delete($id);
        if (!$task) {
            return $this->json(['error' => 'Task non trovato'], 404);
        }

        return $this->json([
            'message' => "Task rimosso con successo",
            'task' => $task
        ], 200);
    }

    // Export db

    #[Route('/task/export/json', name: "task_export_json", methods: ['GET'])]
    public function export_json(Request $request, TaskService $taskService): JsonResponse
    {
        $status = $request->query->get('status', 'all');

        $dataToExport = $taskService->export($status);

        if (!$dataToExport) {
            return $this->json(['error' => 'Nessun dato nel database da esportare per lo status'], 404);
        }

        return $this->json([
            'message' => "Dati esportati con successo",
            "data" => $dataToExport
        ], 200);
    }


    #[Route('/task/import-json', name: 'task_import_json', methods: ['POST'])]
    public function import_json(Request $request, TaskService $taskService): JsonResponse
    {

        // Il flag true mi serve per potermi passare i dati come un array associativo
        $json_data = json_decode($request->getContent(), true);

        if ($json_data === null && json_last_error() !== JSON_ERROR_NONE) {
            return $this->json([
                'error' => 'JSON non valido',
                'details' => json_last_error_msg()
            ], 400);
        }

        if (!is_array($json_data) || array_keys($json_data) !== range(0, count($json_data) - 1)) {
            return $this->json([
                'error' => 'Il payload deve essere un array di task'
            ], 400);
        }


        $dataToImport = $taskService->import($json_data);

        if (!$dataToImport) {
            return $this->json(['error' => 'Errore'], 500);
        }


        return $this->json([
            'result' => $dataToImport
        ], 200);
    }



}
