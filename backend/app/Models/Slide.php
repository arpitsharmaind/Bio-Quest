<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Slide extends Model
{
    protected $fillable = [
        'image_path',
        'title',
        'subtitle',
        'button_text',
        'button_link',
        'is_active',
        'sort_order',
    ];

    protected $appends = ['image_url'];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    /**
     * Absolute URL for the slide image. Supports both uploaded local files
     * (stored under public/uploads) and external image URLs.
     */
    protected function imageUrl(): Attribute
    {
        return Attribute::get(function () {
            $path = $this->image_path;

            if (! $path) {
                return null;
            }

            if (Str::startsWith($path, ['http://', 'https://'])) {
                return $path;
            }

            return asset($path);
        });
    }
}
