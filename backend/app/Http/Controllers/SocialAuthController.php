<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;
class SocialAuthController extends Controller
{
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->stateless()->redirect();
    }

    public function handleGoogleCallback()
    {
        try {
            $googleUser = Socialite::driver('google')->stateless()->user();

            $user = User::updateOrCreate([
                'email' => $googleUser->email,
            ], [
                'name' => $googleUser->name,
                'google_id' => $googleUser->id,
                'password' => bcrypt(Str::random(16)),
                'email_verified_at' => now(), // Google users are verified
            ]);

            // Since you are using JWT, generate a token for the user
            $token = auth('api')->login($user);

            // Redirect back to your Next.js frontend with the token
            return redirect("http://localhost:3000/auth-success?token={$token}");

        } catch (\Exception $e) {
            return redirect("http://localhost:3000/user/signin?error=Login Failed");
        }
    }
}
