<?php

use App\Models\User;
use Illuminate\Support\Facades\Hash;

$user = User::where('email', 'admin@avaa.com')->first();

if (!$user) {
    echo "Admin user NOT FOUND\n";
    exit(1);
}

echo "User: {$user->name} ({$user->email})\n";
echo "Role: {$user->role}\n";
echo "Verified: " . ($user->email_verified_at ? 'YES' : 'NO') . "\n";
echo "Password OK: " . (Hash::check('admin123', $user->password) ? 'YES' : 'NO') . "\n";

// Fix: set email_verified_at
$user->email_verified_at = now();
$user->save();
echo "=> email_verified_at set to now()\n";
