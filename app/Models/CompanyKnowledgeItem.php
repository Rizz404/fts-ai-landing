<?php

namespace App\Models;

use App\Modules\Knowledge\Enums\KnowledgeCategory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * The approved knowledge base the AI Solution Consultant retrieves from. This is the
 * ONLY place company facts may come from: the model is never allowed to
 * answer a company-knowledge question from its own memory.
 */
#[Fillable([
    'company_id',
    'category',
    'title',
    'body',
    'translations',
    'tags',
    'image_url',
    'is_active',
    'sort_order',
])]
class CompanyKnowledgeItem extends Model
{
    use HasFactory;

    public const CATEGORY_GENERAL = KnowledgeCategory::General->value;

    public const CATEGORY_DEMOS = KnowledgeCategory::Demos->value;

    public const CATEGORY_POLICIES = KnowledgeCategory::Policies->value;

    public const CATEGORY_LOCATION = KnowledgeCategory::Location->value;

    public const CATEGORY_FAQ = KnowledgeCategory::Faq->value;

    protected function casts(): array
    {
        return [
            'translations' => 'array',
            'tags' => 'array',
            'is_active' => 'boolean',
        ];
    }

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    /**
     * The picture to show: a full URL as stored, or a file under public/.
     */
    public function getImageSourceAttribute(): ?string
    {
        if (blank($this->image_url)) {
            return null;
        }

        return str_starts_with($this->image_url, 'http') ? $this->image_url : asset($this->image_url);
    }

    public function translatedTitle(string $locale): string
    {
        $value = $this->translations[$locale]['title'] ?? null;

        return filled($value) ? $value : $this->title;
    }

    public function translatedBody(string $locale): string
    {
        $value = $this->translations[$locale]['body'] ?? null;

        return filled($value) ? $value : $this->body;
    }
}
