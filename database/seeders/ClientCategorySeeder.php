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
            'Residential',
            'Commercial',
            'Industrial',
            'Municipal',
            'Hotel/Resort',
            'Apartment Complex',
            'HOA Community',
        ];

        foreach ($categories as $category) {
            ClientCategory::create(['category' => $category]);
        }
    }
}
