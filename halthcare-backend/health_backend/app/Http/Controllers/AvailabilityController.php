<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Availability;
use Illuminate\Support\Facades\Auth;

class AvailabilityController extends Controller
{
    public function index()
    {
        $availabilities = Auth::user()->availabilities()->get();
        return response()->json($availabilities);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'day_of_week' => 'required|string',
            'start_time'  => 'required|date_format:H:i',
            'end_time'    => 'required|date_format:H:i|after:start_time',
        ]);

        $availability = Auth::user()->availabilities()->create($validated);

        return response()->json(['message' => 'Availability created', 'data' => $availability], 201);
    }

    public function update(Request $request, $id)
    {
        $availability = Availability::where('provider_id', Auth::id())->findOrFail($id);

        $validated = $request->validate([
            'day_of_week' => 'string',
            'start_time'  => 'date_format:H:i',
            'end_time'    => 'date_format:H:i|after:start_time',
        ]);

        $availability->update($validated);

        return response()->json(['message' => 'Availability updated', 'data' => $availability]);
    }

    public function destroy($id)
    {
        $availability = Availability::where('provider_id', Auth::id())->findOrFail($id);
        $availability->delete();

        return response()->json(['message' => 'Availability deleted']);
    }
}
