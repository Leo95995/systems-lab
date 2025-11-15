<?php

namespace App\Service;

use App\DTO\TaskEditDto;
use App\DTO\TaskInput;
use App\Entity\Task;
use App\Repository\TaskRepository;
use Doctrine\ORM\EntityManagerInterface;
use App\Enum\TaskStatus;
use Symfony\Component\Validator\Validator\ValidatorInterface;


class TaskService
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private TaskRepository $repository,
        private ValidatorInterface $validator
    ) {
    }
    public function getAll(): array
    {
        return $this->repository->findAll();
    }

    public function getActives(): array
    {
        return $this->repository->findBy(["archiviato" => false]);
    }

    public function getArchived(): array
    {
        return $this->repository->findBy(["archiviato" => true]);
    }


    public function getOne(int $id): Task
    {
        return $this->repository->find($id);
    }


    public function create(TaskInput $dto)
    {
        $task = new Task();
        $task->setTitolo($dto->titolo);
        $task->setData($dto->data);

        if ($dto->stato !== null) {
            $task->setStato(TaskStatus::from($dto->stato));
        }
        if ($dto->descrizione !== null) {
            $task->setDescrizione($dto->descrizione);
        }

        // aggiungo i dati nel db
        $this->entityManager->persist($task);
        $this->entityManager->flush();
        return $task;

    }

    public function patch(TaskEditDto $dto, int $id)
    {

        $task = $this->entityManager->getRepository(Task::class)->find($id);
        if (!$task) {
            return null;
        }

        if ($dto->data !== null) {
            $task->setData($dto->data);
        }
        if ($dto->titolo !== null) {
            $task->setTitolo($dto->titolo);
        }
        if ($dto->descrizione !== null) {
            $task->setDescrizione($dto->descrizione);
        }
        if ($dto->stato !== null) {
            $task->setStato(TaskStatus::from($dto->stato));
        }

        $this->entityManager->flush();
        return $task;
    }


    public function archive(bool $value, int $id)
    {

        $task = $this->entityManager->getRepository(Task::class)->find($id);
        if (!$task) {
            return null;
        }

        if ($value !== null) {
            $task->setArchiviato($value);
        }

        $this->entityManager->flush();
        return $task;
    }


    public function delete(int $id)
    {

        $task = $this->entityManager->getRepository(Task::class)->find($id);
        if (!$task) {
            return null;
        }

        try {
            $this->entityManager->remove($task);
            $this->entityManager->flush();

        } catch (\Exception $ex) {
            throw $ex;
        }


        return $task;
    }

    public function export(string $status)
    {
        try {

            switch (strtolower(trim($status))) {
                case 'all':
                    $archives = $this->getAll();
                    break;
                case 'archived':
                    $archives = $this->getArchived();
                    break;
                case 'actives':
                    $archives = $this->getActives();
                    break;
                default:
                    $archives = [];
            }
        } catch (\Exception $ex) {
            throw $ex;
        }

        return $archives;
    }

    /**
     * @param Task[] $json_data
     */
    public function import(array $json_data)
    {
        if (count($json_data) <= 0) {
            return [];
        }

        $importedTasks = [];
        $errorsList = [];
        // Itero su ogni elemento che mi arriva
        foreach ($json_data as $i=>$data) {
            // creo il dto per validare i singoli elementi
            $dto = new TaskInput();
            $dto->titolo = $data['titolo'] ?? null;
            $dto->descrizione = $data['descrizione'] ?? null;
            $dto->data = $data['data'] ?? null;
            $dto->stato = $data['stato'] ?? null;

            $violations = $this->validator->validate($dto);
        // Se trovo anche solo un errore skippo all'elemento successivo
        if (count($violations) > 0) {
            $errorsList[$i] = (string) $violations;
            continue; 
        }

        // se passa tutti i check allora creo l'entity vera e p-ropria
        $task = new Task();
        $task->setTitolo($dto->titolo);
        $task->setDescrizione($dto->descrizione);
        $task->setData($dto->data);
        $task->setStato($dto->stato !== null ? TaskStatus::from($dto->stato) : null);
        $task->setArchiviato($data['archiviato'] ?? false);

        $this->entityManager->persist($task);
        $importedTasks[] = $task;
        }

        // Salvo i dati tutti insieme sul db
        $this->entityManager->flush();
     

        // MI ritorno per passarli a frontend quanti sono stati importaticon successo e quanti sono falliti.
        return [
        'importati' => count($importedTasks),
        'errori' => $errorsList
    ];
    }


}
