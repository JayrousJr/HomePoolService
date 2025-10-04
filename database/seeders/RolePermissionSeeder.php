<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create roles
        $administrator = Role::create(['name' => 'Administrator']);
        $manager = Role::create(['name' => 'Manager']);
        $technician = Role::create(['name' => 'Technician']);
        $user = Role::create(['name' => 'User']);

        // Create permissions
        $permissions = [
            // Client permissions
            'view clients',
            'create clients',
            'edit clients',
            'delete clients',

            // Service request permissions
            'view service requests',
            'create service requests',
            'edit service requests',
            'delete service requests',
            'assign service requests',

            // Task permissions
            'view tasks',
            'create tasks',
            'edit tasks',
            'delete tasks',
            'assign tasks',

            // Message permissions
            'view messages',
            'create messages',
            'edit messages',
            'delete messages',

            // Job applicant permissions
            'view job applicants',
            'edit job applicants',
            'delete job applicants',

            // Settings permissions
            'manage categories',
            'manage company info',
            'manage social networks',
            'manage about',
            'manage gallery',
            'manage pop-ups',

            // Visitor permissions
            'view visitors',

            // PDF permissions
            'generate pdfs',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Assign all permissions to Administrator
        $administrator->givePermissionTo(Permission::all());

        // Assign permissions to Manager
        $manager->givePermissionTo([
            'view clients',
            'create clients',
            'edit clients',
            'view service requests',
            'create service requests',
            'edit service requests',
            'assign service requests',
            'view tasks',
            'create tasks',
            'edit tasks',
            'assign tasks',
            'view messages',
            'create messages',
            'view job applicants',
            'view visitors',
            'generate pdfs',
        ]);

        // Assign permissions to Technician
        $technician->givePermissionTo([
            'view tasks',
            'edit tasks',
            'view messages',
            'create messages',
        ]);

        // Assign permissions to User
        $user->givePermissionTo([
            'create service requests',
            'create messages',
        ]);
    }
}
