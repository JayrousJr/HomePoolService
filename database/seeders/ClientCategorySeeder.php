<?php

namespace Database\Seeders;

use App\Models\ClientCategory;
use Illuminate\Database\Seeder;

class ClientCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'Weekly Service',
            'Bi-WeeklyService',
            'Monthly Service',
            'Un Categorized',
        ];

        foreach ($categories as $category) {
            ClientCategory::create(['category' => $category]);
        }
    }
}