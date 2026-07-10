<?php

namespace App\Http\Controllers\Pasien;

use App\Http\Controllers\Controller;
use App\Models\Pendaftaran;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Show the pasien dashboard.
     */
    public function index(Request $request): Response
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $antrianAktif = Pendaftaran::with(['jadwal.bidan'])
            ->where('pasien_id', $user->id)
            ->where('tanggal_daftar', today())
            ->whereIn('status', ['menunggu', 'dipanggil'])
            ->latest()
            ->first();

        $riwayatPemeriksaan = Pendaftaran::with(['jadwal.bidan', 'pemeriksaan'])
            ->where('pasien_id', $user->id)
            ->where('status', 'selesai')
            ->latest()
            ->take(5)
            ->get();

        $totalPendaftaran = Pendaftaran::where('pasien_id', $user->id)->count();

        return Inertia::render('pasien/dashboard', [
            'antrianAktif' => $antrianAktif,
            'riwayatPemeriksaan' => $riwayatPemeriksaan,
            'totalPendaftaran' => $totalPendaftaran,
        ]);
    }
}
