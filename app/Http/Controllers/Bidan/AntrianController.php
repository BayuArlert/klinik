<?php

namespace App\Http\Controllers\Bidan;

use App\Http\Controllers\Controller;
use App\Models\Pendaftaran;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class AntrianController extends Controller
{
    /**
     * Show today's antrian for this bidan.
     */
    public function index(): Response
    {
        $bidanId = Auth::id();

        $antrian = Pendaftaran::with(['pasien', 'jadwal', 'pemeriksaan'])
            ->whereHas('jadwal', fn ($q) => $q->where('bidan_id', $bidanId))
            ->where('tanggal_daftar', today())
            ->orderBy('nomor_antrian')
            ->get();

        return Inertia::render('bidan/antrian/index', [
            'antrian' => $antrian,
        ]);
    }

    /**
     * Call a patient (update status to dipanggil).
     */
    public function panggil(Pendaftaran $pendaftaran): RedirectResponse
    {
        $pendaftaran->update(['status' => 'dipanggil']);

        return back()->with('success', "Pasien #{$pendaftaran->nomor_antrian} telah dipanggil.");
    }
}
