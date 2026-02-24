<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureIsAdmin
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = auth()->guard('api')->user();

        if (!$user || !$user->isAdmin()) {
            return response()->json(['error' => 'Unauthorized. Admin access required.'], 403);
        }

        return $next($request);
    }
}
