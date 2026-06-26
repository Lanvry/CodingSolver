<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $token = Str::random(60);
        $user->api_token = $token;
        $user->save();

        return response()->json([
            'token' => $token,
            'user' => [
                'name' => $user->name,
                'email' => $user->email
            ]
        ]);
    }

    public function me(Request $request)
    {
        return response()->json([
            'user' => [
                'name' => $request->user->name,
                'email' => $request->user->email
            ]
        ]);
    }
}
