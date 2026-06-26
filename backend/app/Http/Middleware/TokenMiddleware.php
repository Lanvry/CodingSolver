<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\User;

class TokenMiddleware
{
    public function handle($request, Closure $next)
    {
        $token = $request->bearerToken();

        if (!$token) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $user = User::where('api_token', $token)->first();

        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Attach user to request
        $request->user = $user;

        return $next($request);
    }
}
