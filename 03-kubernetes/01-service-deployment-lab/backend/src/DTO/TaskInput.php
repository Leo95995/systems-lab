<?php

//  creo un dto per la validazione del task
namespace App\DTO;

use Symfony\Component\Validator\Constraints as Assert;
class TaskInput
{
    #[Assert\NotBlank(message: "Il titolo è obbligatorio")]
    public ?string $titolo = null;

    #[Assert\Type("string")]
    public ?string $descrizione = null;

    #[Assert\Type(type: 'int', message: "La data deve essere un timestamp valido")]
    public ?int $data = null;

    #[Assert\Choice(callback: 'App\Enum\TaskStatus::getValidValues', message: "Devi passare uno stato valido!!")]
    public ?string $stato = null;
}
