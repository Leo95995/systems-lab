<?php

namespace App\Enum;

enum TaskStatus: string
{
    case DA_FARE = 'da_fare';
    case IN_CORSO = 'in_corso';
    case COMPLETATO = 'completato';

     public static function getValidValues(): array
    {
        $valori= [];
        
        foreach (self::cases() as $case){
            $valori[] = $case-> value;
        }
        return $valori;
    }
}

