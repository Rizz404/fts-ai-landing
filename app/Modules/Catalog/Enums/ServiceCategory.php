<?php

namespace App\Modules\Catalog\Enums;

enum ServiceCategory: string
{
    case AiStaff = 'ai_staff';
    case AiAutomation = 'ai_automation';
    case Web = 'web';
    case Integration = 'integration';
    case Support = 'support';

    /** @return list<string> */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
