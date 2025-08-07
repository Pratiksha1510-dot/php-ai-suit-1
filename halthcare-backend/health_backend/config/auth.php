<?php

return [

    'defaults' => [
        'guard' => env('AUTH_GUARD', 'provider'),
        'passwords' => 'providers',
    ],

    'guards' => [
        'provider' => [
            'driver' => 'jwt',
            'provider' => 'providers',
        ],
        'patient' => [
            'driver' => 'jwt',
            'provider' => 'patients',
        ],
    ],

    'providers' => [
        'providers' => [
            'driver' => 'eloquent',
            'model' => App\Models\Provider::class,
        ],
        'patients' => [
            'driver' => 'eloquent',
            'model' => App\Models\Patient::class,
        ],
    ],

    'passwords' => [
        'providers' => [
            'provider' => 'providers',
            'table' => env('AUTH_PASSWORD_RESET_TOKEN_TABLE', 'password_reset_tokens'),
            'expire' => 60,
            'throttle' => 60,
        ],
        'patients' => [
            'provider' => 'patients',
            'table' => env('AUTH_PASSWORD_RESET_TOKEN_TABLE', 'password_reset_tokens'),
            'expire' => 60,
            'throttle' => 60,
        ],
    ],

    'password_timeout' => env('AUTH_PASSWORD_TIMEOUT', 10800),

];
