<?php

namespace App\Http\Controllers\Pasien;

use App\Http\Controllers\Controller;
use App\Models\JadwalPraktik;
use App\Models\Pendaftaran;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class PendaftaranController extends Controller
{
    /**
     * List all pendaftaran for the logged-in pasien.
     */
    public function index(): Response
    {
        $pendaftaran = Pendaftaran::with(['jadwal.bidan'])
            ->where('pasien_id', Auth::id())
            ->latest()
            ->paginate(10);

        return Inertia::render('pasien/pendaftaran/index', [
            'pendaftaran' => $pendaftaran,
        ]);
    }

    /**
     * Show the registration form.
     */
    public function create(): Response
    {
        $jadwalTersedia = JadwalPraktik::with('bidan')
            ->where('is_active', true)
            ->orderBy('hari')
            ->get();

        return Inertia::render('pasien/pendaftaran/create', [
            'jadwalTersedia' => $jadwalTersedia,
        ]);
    }

    /**
     * Store a new pendaftaran.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'jadwal_id' => ['required', 'exists:jadwal_praktik,id'],
            'tanggal_daftar' => ['required', 'date', 'after_or_equal:today'],
            'keluhan' => ['required', 'string', 'max:1000'],
        ]);

        $jadwal = JadwalPraktik::findOrFail($validated['jadwal_id']);

        // Check kuota
        $totalTerdaftar = Pendaftaran::where('jadwal_id', $jadwal->id)
            ->where('tanggal_daftar', $validated['tanggal_daftar'])
            ->whereIn('status', ['menunggu', 'dipanggil'])
            ->count();

        if ($totalTerdaftar >= $jadwal->kuota) {
            return back()->withErrors(['jadwal_id' => 'Kuota jadwal ini sudah penuh untuk tanggal yang dipilih.']);
        }

        // Check duplicate
        $alreadyRegistered = Pendaftaran::where('pasien_id', Auth::id())
            ->where('jadwal_id', $jadwal->id)
            ->where('tanggal_daftar', $validated['tanggal_daftar'])
            ->whereIn('status', ['menunggu', 'dipanggil'])
            ->exists();

        if ($alreadyRegistered) {
            return back()->withErrors(['jadwal_id' => 'Anda sudah terdaftar pada jadwal ini.']);
        }

        // Generate nomor antrian
        $nomorUrut = $totalTerdaftar + 1;
        $nomorAntrian = str_pad((string) $nomorUrut, 3, '0', STR_PAD_LEFT);

        Pendaftaran::create([
            'pasien_id' => Auth::id(),
            'jadwal_id' => $validated['jadwal_id'],
            'tanggal_daftar' => $validated['tanggal_daftar'],
            'keluhan' => $validated['keluhan'],
            'nomor_antrian' => $nomorAntrian,
            'status' => 'menunggu',
        ]);

        return redirect()->route('pasien.pendaftaran.index')
            ->with('success', "Pendaftaran berhasil! Nomor antrian Anda: {$nomorAntrian}");
    }

    /**
     * Cancel a pendaftaran.
     */
    public function destroy(Pendaftaran $pendaftaran): RedirectResponse
    {
        if ($pendaftaran->pasien_id !== Auth::id()) {
            abort(403);
        }

        if ($pendaftaran->status !== 'menunggu') {
            return back()->withErrors(['status' => 'Hanya pendaftaran dengan status menunggu yang dapat dibatalkan.']);
        }

        $pendaftaran->update(['status' => 'dibatalkan']);

        return back()->with('success', 'Pendaftaran berhasil dibatalkan.');
    }
}
