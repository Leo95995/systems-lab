<?php

namespace App\Entity;

use App\Enum\TaskStatus;
use App\Repository\TaskRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use phpDocumentor\Reflection\Types\Boolean;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

#[UniqueEntity('titolo', message: "Il titolo deve essere univoco")]
#[ORM\Entity(repositoryClass: TaskRepository::class)]
class Task
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $titolo = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $descrizione = null;

    #[ORM\Column(nullable: true)]
    private ?int $data = null;

    #[ORM\Column(enumType: TaskStatus::class)]
    private ?TaskStatus $stato = null;

    #[ORM\Column(type: Types::BOOLEAN)]
    private bool $archiviato = false;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitolo(): ?string
    {
        return $this->titolo;
    }

    public function setTitolo(string $titolo): static
    {
        $this->titolo = $titolo;

        return $this;
    }

    public function getDescrizione(): ?string
    {
        return $this->descrizione;
    }

    public function setDescrizione(?string $descrizione): static
    {
        $this->descrizione = $descrizione;

        return $this;
    }

    public function getData(): ?int
    {
        return $this->data;
    }

    public function setData(?int $data): static
    {
        $this->data = $data;

        return $this;
    }

    public function getStato(): ?TaskStatus
    {
        return $this->stato;
    }

    public function setStato(TaskStatus $stato): static
    {
        $this->stato = $stato;

        return $this;
    }


    public function getArchiviato(): ?bool
    {
        return $this->archiviato;
    }

    public function setArchiviato(?bool $archiviato): static
    {
        $this->archiviato = $archiviato;

        return $this;
    }
}
