<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::updateOrCreate(
            ['email' => 'admin@avaa.com'],
            [
                'name'              => 'Admin',
                'email'             => 'admin@avaa.com',
                'password'          => Hash::make('admin123'),
                'role'              => 'admin',
                'email_verified_at' => now(),
            ]
        );

        $this->command->info('');
        $this->command->info('========================================');
        $this->command->info('  Default Admin Account Created');
        $this->command->info('  Email:    admin@avaa.com');
        $this->command->info('  Password: admin123');
        $this->command->info('========================================');
        $this->command->info('');
    }
}
