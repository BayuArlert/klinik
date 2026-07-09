<?php

namespace App\Http\Controllers\Bidan;

use App\Http\Controllers\Controller;
use App\Models\Pendaftaran;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Show the bidan dashboard.
     */
    public function index(): Response
    {
        $bidanId = Auth::id();

        $totalPasienHariIni = Pendaftaran::whereHas('jadwal', fn ($q) => $q->where('bidan_id', $bidanId))
            ->where('tanggal_daftar', today())
            ->count();

        $antrianMenunggu = Pendaftaran::whereHas('jadwal', fn ($q) => $q->where('bidan_id', $bidanId))
            ->where('tanggal_daftar', today())
            ->where('status', 'menunggu')
            ->count();

        $pemeriksaanSelesai = Pendaftaran::whereHas('jadwal', fn ($q) => $q->where('bidan_id', $bidanId))
            ->where('tanggal_daftar', today())
            ->where('status', 'selesai')
            ->count();

        $antrianTerbaru = Pendaftaran::with(['pasien', 'jadwal'])
            ->whereHas('jadwal', fn ($q) => $q->where('bidan_id', $bidanId))
            ->where('tanggal_daftar', today())
            ->whereIn('status', ['menunggu', 'dipanggil'])
            ->orderBy('nomor_antrian')
            ->take(5)
            ->get();

        return Inertia::render('bidan/dashboard', [
            'totalPasienHariIni' => $totalPasienHariIni,
            'antrianMenunggu' => $antrianMenunggu,
            'pemeriksaanSelesai' => $pemeriksaanSelesai,
            'antrianTerbaru' => $antrianTerbaru,
        ]);
    }
}
