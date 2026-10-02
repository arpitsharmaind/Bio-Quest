<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'info.delightindustry@gmail.com'],
            [
                'name' => 'BioQuest Admin',
                'password' => Hash::make('Ashking@14'),
            ],
        );
    }
}
