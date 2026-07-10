<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pendaftaran;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class LaporanController extends Controller
{
    /**
     * Show the laporan page.
     */
    public function index(Request $request): Response
    {
        $tanggalMulai = $request->tanggal_mulai ?? now()->startOfMonth()->toDateString();
        $tanggalSelesai = $request->tanggal_selesai ?? now()->toDateString();

        $laporan = Pendaftaran::with(['pasien', 'jadwal.bidan', 'pemeriksaan'])
            ->whereBetween('tanggal_daftar', [$tanggalMulai, $tanggalSelesai])
            ->when($request->status, fn ($q, $s) => $q->where('status', $s))
            ->orderBy('tanggal_daftar', 'desc')
            ->paginate(20)
            ->withQueryString();

        $ringkasan = [
            'total' => Pendaftaran::whereBetween('tanggal_daftar', [$tanggalMulai, $tanggalSelesai])->count(),
            'selesai' => Pendaftaran::whereBetween('tanggal_daftar', [$tanggalMulai, $tanggalSelesai])->where('status', 'selesai')->count(),
            'menunggu' => Pendaftaran::whereBetween('tanggal_daftar', [$tanggalMulai, $tanggalSelesai])->where('status', 'menunggu')->count(),
            'dibatalkan' => Pendaftaran::whereBetween('tanggal_daftar', [$tanggalMulai, $tanggalSelesai])->where('status', 'dibatalkan')->count(),
        ];

        return Inertia::render('admin/laporan/index', [
            'laporan' => $laporan,
            'ringkasan' => $ringkasan,
            'filters' => $request->only(['tanggal_mulai', 'tanggal_selesai', 'status']),
        ]);
    }

    /**
     * Export laporan as CSV.
     */
    public function export(Request $request): StreamedResponse
    {
        $tanggalMulai = $request->tanggal_mulai ?? now()->startOfMonth()->toDateString();
        $tanggalSelesai = $request->tanggal_selesai ?? now()->toDateString();

        $laporan = Pendaftaran::with(['pasien', 'jadwal.bidan', 'pemeriksaan'])
            ->whereBetween('tanggal_daftar', [$tanggalMulai, $tanggalSelesai])
            ->when($request->status, fn ($q, $s) => $q->where('status', $s))
            ->orderBy('tanggal_daftar', 'desc')
            ->get();

        $filename = "laporan_pendaftaran_{$tanggalMulai}_{$tanggalSelesai}.csv";

        $headers = [
            'Content-Type' => 'text/csv; charset=UTF-8',
            'Content-Disposition' => "attachment; filename=\"{$filename}\"",
        ];

        $callback = function () use ($laporan) {
            $handle = fopen('php://output', 'w');

            if ($handle === false) {
                return;
            }

            // BOM for Excel UTF-8
            fprintf($handle, chr(0xEF).chr(0xBB).chr(0xBF));

            fputcsv($handle, [
                'No. Antrian', 'Tanggal', 'Nama Pasien', 'Bidan', 'Keluhan',
                'Status', 'Tekanan Darah', 'Berat Badan', 'Tinggi Badan', 'Diagnosa', 'Resep',
            ]);

            foreach ($laporan as $row) {
                fputcsv($handle, [
                    $row->nomor_antrian,
                    $row->tanggal_daftar->format('d/m/Y'),
                    $row->pasien->name ?? '-',
                    $row->jadwal->bidan->name ?? '-',
                    $row->keluhan,
                    $row->status_label,
                    $row->pemeriksaan->tekanan_darah ?? '-',
                    $row->pemeriksaan->berat_badan ? $row->pemeriksaan->berat_badan.' kg' : '-',
                    $row->pemeriksaan->tinggi_badan ? $row->pemeriksaan->tinggi_badan.' cm' : '-',
                    $row->pemeriksaan->diagnosa ?? '-',
                    $row->pemeriksaan->resep ?? '-',
                ]);
            }

            fclose($handle);
        };

        return response()->stream($callback, 200, $headers);
    }
}
