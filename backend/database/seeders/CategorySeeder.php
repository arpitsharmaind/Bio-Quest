<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'title' => 'Food Ingredients',
                'slug' => 'food-ingredients',
                'image_url' => 'https://titanbiotechltd.com/wp-content/uploads/2019/02/Food-Ingredients.jpg',
                'description' => 'High-quality food-grade ingredients for the food and beverage industry.',
                'body' => 'Our food ingredients range is manufactured to the highest quality standards, serving food and beverage manufacturers worldwide. From yeast extracts to specialty proteins, each product is produced under strict quality control to ensure consistency, safety and performance.',
            ],
            [
                'title' => 'Collagen and Proteins',
                'slug' => 'collagen-proteins',
                'image_url' => 'https://titanbiotechltd.com/wp-content/uploads/2019/02/AdobeStock_483805868-1568x1045.jpeg',
                'description' => 'Premium collagen peptides and proteins for nutrition and health applications.',
                'body' => 'Titan Biotech offers a comprehensive range of collagen peptides and functional proteins sourced from bovine, fish and plant origins. Widely used in nutraceuticals, sports nutrition, and functional foods, our proteins are highly soluble, easily digestible and produced to pharmaceutical-grade standards.',
            ],
            [
                'title' => 'Pharmaceuticals and Nutraceuticals',
                'slug' => 'pharma-nutra',
                'image_url' => 'https://titanbiotechltd.com/wp-content/uploads/2019/02/Pharmaceuticals-Nutraceuticals.jpg',
                'description' => 'Ingredients and excipients for pharmaceutical and nutraceutical formulations.',
                'body' => 'Supporting the pharmaceutical and nutraceutical industries with high-purity ingredients, peptones and excipients that meet global regulatory requirements for clinical diagnosis, vaccine production and dietary supplements.',
            ],
            [
                'title' => 'Animal Nutrition',
                'slug' => 'animal-nutrition',
                'image_url' => 'https://titanbiotechltd.com/wp-content/uploads/2019/02/Animal-Nutrition.jpg',
                'description' => 'Feed additives and nutrition solutions for animal health and productivity.',
                'body' => 'Our animal nutrition products improve growth, immunity and overall productivity across poultry, aquaculture and livestock. Formulated with proteins, probiotics and functional additives to support healthy and sustainable animal farming.',
            ],
            [
                'title' => 'Probiotics and Fermentation Ingredients',
                'slug' => 'fermentation',
                'image_url' => 'https://titanbiotechltd.com/wp-content/uploads/2019/02/Probioitics-Fermentation-Ingredients.jpg',
                'description' => 'Probiotics and culture media for fermentation and biotechnology.',
                'body' => 'A specialised range of probiotics, peptones and fermentation ingredients that power industrial biotechnology, microbiology and fermentation processes with reliable, high-yield performance.',
            ],
            [
                'title' => 'Agriculture Products',
                'slug' => 'agriculture-products',
                'image_url' => 'https://titanbiotechltd.com/wp-content/uploads/2019/02/Agriculture.jpg',
                'description' => 'Bio-based inputs for modern, sustainable agriculture.',
                'body' => 'Sustainable agriculture solutions including bio-stimulants and organic inputs that enhance soil health, crop yield and plant resilience while reducing dependence on chemical fertilisers.',
            ],
            [
                'title' => 'Culture Media',
                'slug' => 'culture-media',
                'image_url' => 'https://titanbiotechltd.com/wp-content/uploads/2019/02/Culture-Media.jpg',
                'description' => 'Dehydrated culture media for microbiology laboratories.',
                'body' => 'A complete portfolio of dehydrated culture media, agars and supplements for clinical, pharmaceutical and industrial microbiology, manufactured for consistent growth performance and reliability.',
            ],
            [
                'title' => 'All Products',
                'slug' => 'all-products',
                'image_url' => 'https://titanbiotechltd.com/wp-content/uploads/2019/02/Product-List.jpg',
                'description' => 'Browse the complete Titan Biotech product portfolio.',
                'body' => 'Explore our full catalogue of biological products spanning food, pharma, animal nutrition, agriculture and laboratory applications.',
            ],
        ];

        foreach ($categories as $index => $category) {
            Category::updateOrCreate(
                ['slug' => $category['slug']],
                array_merge($category, [
                    'is_active' => true,
                    'sort_order' => $index,
                ]),
            );
        }
    }
}
