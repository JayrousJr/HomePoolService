<?php

namespace Database\Seeders;

use App\Models\ToggleJob;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Administrator
        $admin = User::create([
            'name' => 'Joshua Jayrous',
            'email' => 'joshuajayrous@gmail.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
            'nationality' => 'United States',
            'city' => 'Los Angeles',
            'state' => 'California',
            'street' => '123 Main St',
            'role' => "Administrator",
            'phone' => '+1234567890',
        ]);
        $admin->assignRole('Administrator');

        // Create Manager
        $amani = User::create([
            'name' => 'Amani Joel',
            'email' => 'amanijoel@homepool.org',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
            'nationality' => 'United States',
            'city' => 'Memphis',
            'state' => 'Tenessee',
            'street' => '3529 Tall Oaks Circle Apt 5',
            'role' => "Manager",
            'phone' => '+1 (901) 297-7812',
        ]);
        $amani->assignRole('Manager');

        // Create Technician
        $wailes = User::create([
            'name' => 'Wales Niyukuri',
            'email' => 'wailesniyukuri@homepool.org',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
            'nationality' => 'United States',
            'city' => 'Memphis',
            'state' => 'California',
            'street' => 'Tenessee',
            'role' => "Manager",
            'phone' => '+1 (662) 278-8148',
        ]);
        $wailes->assignRole('Manager');

        ToggleJob::create([
            "open" => false
        ]);
    }
}