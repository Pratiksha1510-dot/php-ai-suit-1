<?php

namespace App\Http\Controllers;

use App\Models\Provider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class ProviderAuthController extends Controller
{
    // Register a new provider
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name'   => 'required|string|min:2|max:50',
            'last_name'    => 'required|string|min:2|max:50',
            'email'        => 'required|email|unique:providers',
            'phone_number' => 'required|string|unique:providers',
            'password'     => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $provider = Provider::create([
            'first_name'   => $request->first_name,
            'last_name'    => $request->last_name,
            'email'        => $request->email,
            'phone_number' => $request->phone_number,
            'password'     => Hash::make($request->password),
        ]);

        return response()->json([
            'message' => 'Provider registered successfully',
            'provider' => $provider,
        ], 201);
    }

    // Login and return JWT token
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'Invalid credentials'], 401);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'Could not create token'], 500);
        }

        return response()->json([
            'access_token' => $token,
            'token_type'   => 'bearer',
       'expires_in' => JWTAuth::factory()->getTTL() * 60

        ]);
    }

    // Get current logged-in provider profile
    public function me()
    {
        try {
            $user = auth()->user();
            return response()->json($user);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Token is invalid or expired'], 401);
        }
    }

    // Logout and invalidate the token
    public function logout()
    {
        try {
            auth()->logout();
            return response()->json(['message' => 'Successfully logged out']);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Failed to logout'], 500);
        }
    }
}
