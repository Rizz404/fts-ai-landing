<?php

namespace App\Modules\Consultants\Enums;

enum ConsultantSpecialty: string
{
    case AiSolutions = 'ai_solutions';
    case Web = 'web';
    case Japan = 'japan';

    /** @return list<string> */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
