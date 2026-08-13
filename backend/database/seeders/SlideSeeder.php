<?php

namespace Database\Seeders;

use App\Models\Slide;
use Illuminate\Database\Seeder;

class SlideSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $slides = [
            [
                'image_path' => 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1600&h=600&fit=crop',
                'title' => 'Laboratory Equipments',
                'subtitle' => 'High-quality instruments for precision research and testing',
                'button_text' => 'Explore Products',
                'button_link' => '#products',
            ],
            [
                'image_path' => 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=1600&h=600&fit=crop',
                'title' => 'Laboratory Chemicals',
                'subtitle' => 'Premium grade chemicals for accurate and reliable results',
                'button_text' => 'Explore Products',
                'button_link' => '#products',
            ],
            [
                'image_path' => 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1600&h=600&fit=crop',
                'title' => 'Laboratory Glassware',
                'subtitle' => 'Durable and precise glassware for every laboratory need',
                'button_text' => 'Explore Products',
                'button_link' => '#products',
            ],
            [
                'image_path' => 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1600&h=600&fit=crop',
                'title' => 'Laboratory General Items',
                'subtitle' => 'Essential supplies to keep your lab running efficiently',
                'button_text' => 'Explore Products',
                'button_link' => '#products',
            ],
        ];

        foreach ($slides as $index => $slide) {
            Slide::updateOrCreate(
                ['title' => $slide['title']],
                array_merge($slide, [
                    'is_active' => true,
                    'sort_order' => $index,
                ]),
            );
        }
    }
}
