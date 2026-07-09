<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pendaftaran;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PendaftaranController extends Controller
{
    /**
     * List all pendaftaran with filters.
     */
    public function index(Request $request): Response
    {
        $pendaftaran = Pendaftaran::with(['pasien', 'jadwal.bidan'])
            ->when($request->search, fn ($q, $s) => $q->whereHas('pasien', fn ($q) => $q->where('name', 'like', "%{$s}%")))
            ->when($request->status, fn ($q, $status) => $q->where('status', $status))
            ->when($request->tanggal, fn ($q, $tanggal) => $q->where('tanggal_daftar', $tanggal))
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('admin/pendaftaran/index', [
            'pendaftaran' => $pendaftaran,
            'filters' => $request->only(['search', 'status', 'tanggal']),
        ]);
    }

    /**
     * Update status pendaftaran.
     */
    public function update(Request $request, Pendaftaran $pendaftaran): RedirectResponse
    {
        $request->validate([
            'status' => ['required', 'in:menunggu,dipanggil,selesai,dibatalkan'],
        ]);

        $pendaftaran->update(['status' => $request->status]);

        return back()->with('success', 'Status pendaftaran berhasil diperbarui.');
    }
}
