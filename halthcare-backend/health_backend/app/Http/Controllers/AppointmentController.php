<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AppointmentController extends Controller
{
    // Patient books appointment
    public function store(Request $request)
    {
        $validated = $request->validate([
            'provider_id'       => 'required|exists:providers,id',
            'appointment_date'  => 'required|date|after_or_equal:today',
            'appointment_time'  => 'required|date_format:H:i'
        ]);

        $validated['patient_id'] = Auth::id();
        $validated['status'] = 'pending';

        $appointment = Appointment::create($validated);

        return response()->json(['message' => 'Appointment booked', 'data' => $appointment], 201);
    }

    // Patient or provider view their appointments
    public function index()
    {
        if (Auth::guard('api')->check()) {
            $user = Auth::user();

            if ($user->tokenCan('patient')) {
                return response()->json($user->appointments()->with('provider')->get());
            } elseif ($user->tokenCan('provider')) {
                return response()->json($user->appointments()->with('patient')->get());
            }
        }

        return response()->json(['message' => 'Unauthorized'], 401);
    }

    // Provider updates status
    public function update(Request $request, $id)
    {
        $appointment = Appointment::findOrFail($id);

        if ($appointment->provider_id != Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate(['status' => 'required|in:pending,confirmed,cancelled']);
        $appointment->status = $request->status;
        $appointment->save();

        return response()->json(['message' => 'Status updated', 'data' => $appointment]);
    }
}
