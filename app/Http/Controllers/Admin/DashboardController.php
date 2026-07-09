<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pendaftaran;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Show the admin dashboard.
     */
    public function index(): Response
    {
        $totalPasien = User::where('role', 'pasien')->count();
        $totalBidan = User::where('role', 'bidan')->count();
        $pendaftaranHariIni = Pendaftaran::where('tanggal_daftar', today())->count();
        $antrianMenunggu = Pendaftaran::where('tanggal_daftar', today())->where('status', 'menunggu')->count();
        $pemeriksaanSelesai = Pendaftaran::where('tanggal_daftar', today())->where('status', 'selesai')->count();
        $totalPendaftaranBulanIni = Pendaftaran::whereMonth('tanggal_daftar', now()->month)
            ->whereYear('tanggal_daftar', now()->year)
            ->count();

        // Pendaftaran per hari (7 hari terakhir)
        $pendaftaranPerHari = Pendaftaran::selectRaw('DATE(tanggal_daftar) as tanggal, COUNT(*) as total')
            ->where('tanggal_daftar', '>=', now()->subDays(6)->toDateString())
            ->groupBy('tanggal')
            ->orderBy('tanggal')
            ->get();

        $pendaftaranTerbaru = Pendaftaran::with(['pasien', 'jadwal.bidan'])
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('admin/dashboard', [
            'stats' => [
                'totalPasien' => $totalPasien,
                'totalBidan' => $totalBidan,
                'pendaftaranHariIni' => $pendaftaranHariIni,
                'antrianMenunggu' => $antrianMenunggu,
                'pemeriksaanSelesai' => $pemeriksaanSelesai,
                'totalPendaftaranBulanIni' => $totalPendaftaranBulanIni,
            ],
            'pendaftaranPerHari' => $pendaftaranPerHari,
            'pendaftaranTerbaru' => $pendaftaranTerbaru,
        ]);
    }
}
