<?php

namespace App\Http\Controllers\Bidan;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class PasienController extends Controller
{
    /**
     * List pasien data for bidan view (read-only).
     */
    public function index(): Response
    {
        $pasien = User::where('role', 'pasien')
            ->withCount('pendaftaran')
            ->latest()
            ->paginate(15);

        return Inertia::render('bidan/pasien/index', [
            'pasien' => $pasien,
        ]);
    }
}
