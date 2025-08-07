<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class PatientAuthController extends Controller
{
    // REGISTER
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name'   => 'required|string|min:2|max:50',
            'last_name'    => 'required|string|min:2|max:50',
            'email'        => 'required|email|unique:patients',
            'phone_number' => 'required|string|unique:patients',
            'password'     => 'required|string|min:6',
            'dob'          => 'nullable|date',
            'gender'       => 'nullable|in:male,female,other',
            'address'      => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $patient = Patient::create([
            'first_name'   => $request->first_name,
            'last_name'    => $request->last_name,
            'email'        => $request->email,
            'phone_number' => $request->phone_number,
            'password'     => Hash::make($request->password),
            'dob'          => $request->dob,
            'gender'       => $request->gender,
            'address'      => $request->address,
        ]);

        return response()->json(['message' => 'Patient registered successfully'], 201);
    }

    // LOGIN
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!$token = auth('patient')->attempt($credentials)) {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }

        return response()->json([
            'access_token' => $token,
            'token_type'   => 'bearer',
            'expires_in' => JWTAuth::factory()->getTTL() * 60

        ]);
    }

    // GET LOGGED-IN PATIENT
    public function me()
    {
        return response()->json(auth('patient')->user());
    }

    // LOGOUT
    public function logout()
    {
        auth('patient')->logout();
        return response()->json(['message' => 'Successfully logged out']);
    }
}
