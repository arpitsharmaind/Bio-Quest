<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * Products now belong to a category. Seeds a few sample products under the
     * main categories so the category pages have content to show.
     */
    public function run(): void
    {
        // Remove any legacy rows (the pre-restructure category tiles).
        Product::query()->whereNull('category_id')->delete();

        $catalog = [
            'collagen-proteins' => [
                ['title' => 'Bovine Collagen Peptide', 'description' => 'Highly soluble hydrolysed bovine collagen peptides for nutraceutical and functional food applications.'],
                ['title' => 'Fish Collagen Peptide', 'description' => 'Marine-sourced collagen peptides with excellent bioavailability, ideal for beauty-from-within products.'],
                ['title' => 'Whey Protein Concentrate', 'description' => 'High-quality whey protein concentrate for sports nutrition and dietary supplements.'],
                ['title' => 'Soy Protein Isolate', 'description' => 'Plant-based soy protein isolate with a high protein content and clean flavour profile.'],
            ],
            'food-ingredients' => [
                ['title' => 'Yeast Extract Powder', 'description' => 'Natural flavour enhancer rich in amino acids and nucleotides for savoury applications.'],
                ['title' => 'Malt Extract', 'description' => 'Concentrated malt extract used in bakery, beverage and confectionery products.'],
                ['title' => 'Pea Protein', 'description' => 'Allergen-friendly plant protein for fortification of foods and beverages.'],
            ],
            'culture-media' => [
                ['title' => 'Nutrient Agar', 'description' => 'General-purpose medium for the cultivation of a wide range of microorganisms.'],
                ['title' => 'MacConkey Agar', 'description' => 'Selective and differential medium for the isolation of gram-negative enteric bacteria.'],
            ],
        ];

        foreach ($catalog as $categorySlug => $products) {
            $category = Category::where('slug', $categorySlug)->first();

            if (! $category) {
                continue;
            }

            foreach ($products as $index => $product) {
                Product::updateOrCreate(
                    ['slug' => \Illuminate\Support\Str::slug($product['title'])],
                    [
                        'category_id' => $category->id,
                        'title' => $product['title'],
                        'image_url' => $category->image_url,
                        'description' => $product['description'],
                        'is_active' => true,
                        'sort_order' => $index,
                    ],
                );
            }
        }
    }
}
