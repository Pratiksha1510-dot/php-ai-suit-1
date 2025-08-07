<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProviderAuthController;
use App\Http\Controllers\PatientAuthController;
use App\Http\Controllers\AvailabilityController;
use App\Http\Controllers\AppointmentController;

Route::prefix('v1')->group(function () {

    /**
     * Provider Routes
     */
    Route::prefix('provider')->group(function () {
        Route::post('register', [ProviderAuthController::class, 'register']);
        Route::post('login', [ProviderAuthController::class, 'login']);

        Route::middleware('auth:provider')->group(function () {
            Route::post('logout', [ProviderAuthController::class, 'logout']);
            Route::get('me', [ProviderAuthController::class, 'me']);

            // Provider availability management
            Route::get('availability', [AvailabilityController::class, 'index']);
            Route::post('availability', [AvailabilityController::class, 'store']);
            Route::delete('availability/{id}', [AvailabilityController::class, 'destroy']);

            // Appointment updates by provider
            Route::put('appointments/{id}', [AppointmentController::class, 'update']);
            Route::get('appointments', [AppointmentController::class, 'index']);
        });
    });

    /**
     * Patient Routes
     */
    Route::prefix('patient')->group(function () {
        Route::post('register', [PatientAuthController::class, 'register']);
        Route::post('login', [PatientAuthController::class, 'login']);

        Route::middleware('auth:patient')->group(function () {
            Route::post('logout', [PatientAuthController::class, 'logout']);
            Route::get('me', [PatientAuthController::class, 'me']);

            // Patient checking availability
            Route::get('availability', [AvailabilityController::class, 'index']);

            // Patient appointment booking
            Route::get('appointments', [AppointmentController::class, 'index']);
            Route::post('appointments', [AppointmentController::class, 'store']);
        });
    });

});
