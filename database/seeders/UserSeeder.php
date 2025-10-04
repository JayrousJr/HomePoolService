<?php

namespace Database\Seeders;

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
            'name' => 'Administrator',
            'email' => 'admin@homepoolservice.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
            'nationality' => 'United States',
            'city' => 'Los Angeles',
            'state' => 'California',
            'street' => '123 Main St',
            'phone' => '+1234567890',
        ]);
        $admin->assignRole('Administrator');

        // Create Manager
        $manager = User::create([
            'name' => 'Manager',
            'email' => 'manager@homepoolservice.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
            'nationality' => 'United States',
            'city' => 'Los Angeles',
            'state' => 'California',
            'street' => '456 Oak Ave',
            'phone' => '+1234567891',
        ]);
        $manager->assignRole('Manager');

        // Create Technician
        $technician = User::create([
            'name' => 'Technician',
            'email' => 'technician@homepoolservice.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
            'nationality' => 'United States',
            'city' => 'Los Angeles',
            'state' => 'California',
            'street' => '789 Pine Rd',
            'phone' => '+1234567892',
        ]);
        $technician->assignRole('Technician');

        // Create regular User
        $user = User::create([
            'name' => 'John Doe',
            'email' => 'user@example.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
            'nationality' => 'United States',
            'city' => 'Los Angeles',
            'state' => 'California',
            'street' => '321 Elm St',
            'phone' => '+1234567893',
        ]);
        $user->assignRole('User');
    }
}
