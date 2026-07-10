<?php

namespace App\Http\Controllers\Bidan;

use App\Http\Controllers\Controller;
use App\Models\Pemeriksaan;
use App\Models\Pendaftaran;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class PemeriksaanController extends Controller
{
    /**
     * Show the pemeriksaan form for a specific pendaftaran.
     */
    public function create(Pendaftaran $pendaftaran): Response
    {
        $pendaftaran->load(['pasien', 'jadwal', 'pemeriksaan']);

        return Inertia::render('bidan/pemeriksaan/create', [
            'pendaftaran' => $pendaftaran,
        ]);
    }

    /**
     * Store the pemeriksaan result.
     */
    public function store(Request $request, Pendaftaran $pendaftaran): RedirectResponse
    {
        $validated = $request->validate([
            'tekanan_darah' => ['nullable', 'string', 'max:20'],
            'berat_badan' => ['nullable', 'numeric', 'min:1', 'max:300'],
            'tinggi_badan' => ['nullable', 'numeric', 'min:1', 'max:300'],
            'suhu_tubuh' => ['nullable', 'numeric', 'min:30', 'max:45'],
            'nadi' => ['nullable', 'integer', 'min:1', 'max:300'],
            'catatan' => ['nullable', 'string'],
            'diagnosa' => ['nullable', 'string'],
            'resep' => ['nullable', 'string'],
        ]);

        /** @var int $bidanId */
        $bidanId = Auth::id();

        Pemeriksaan::updateOrCreate(
            ['pendaftaran_id' => $pendaftaran->id],
            array_merge($validated, ['bidan_id' => $bidanId])
        );

        $pendaftaran->update(['status' => 'selesai']);

        return redirect()->route('bidan.antrian.index')
            ->with('success', 'Hasil pemeriksaan berhasil disimpan.');
    }

    /**
     * Show pemeriksaan detail.
     */
    public function show(Pendaftaran $pendaftaran): Response
    {
        $pendaftaran->load(['pasien', 'jadwal.bidan', 'pemeriksaan.bidan']);

        return Inertia::render('bidan/pemeriksaan/show', [
            'pendaftaran' => $pendaftaran,
        ]);
    }
}
