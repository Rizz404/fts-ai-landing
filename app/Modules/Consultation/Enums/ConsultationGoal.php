<?php

namespace App\Modules\Consultation\Enums;

enum ConsultationGoal: string
{
    case AiStaff = 'ai_staff';
    case Automation = 'automation';
    case Website = 'website';
    case Integration = 'integration';
    case Other = 'other';

    /** @return list<string> */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
