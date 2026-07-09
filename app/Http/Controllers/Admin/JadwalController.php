<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\JadwalPraktik;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class JadwalController extends Controller
{
    /**
     * List all jadwal praktik.
     */
    public function index(): Response
    {
        $jadwal = JadwalPraktik::with('bidan')
            ->orderByRaw("FIELD(hari, 'Senin','Selasa','Rabu','Kamis','Jumat','Sabtu','Minggu')")
            ->get();

        $bidanList = User::where('role', 'bidan')->get(['id', 'name']);

        return Inertia::render('admin/jadwal/index', [
            'jadwal' => $jadwal,
            'bidanList' => $bidanList,
        ]);
    }

    /**
     * Store a new jadwal.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'bidan_id' => ['required', 'exists:users,id'],
            'hari' => ['required', 'in:Senin,Selasa,Rabu,Kamis,Jumat,Sabtu,Minggu'],
            'jam_mulai' => ['required', 'date_format:H:i'],
            'jam_selesai' => ['required', 'date_format:H:i', 'after:jam_mulai'],
            'kuota' => ['required', 'integer', 'min:1', 'max:100'],
        ]);

        JadwalPraktik::create($validated);

        return back()->with('success', 'Jadwal praktik berhasil ditambahkan.');
    }

    /**
     * Update a jadwal.
     */
    public function update(Request $request, JadwalPraktik $jadwal): RedirectResponse
    {
        $validated = $request->validate([
            'bidan_id' => ['required', 'exists:users,id'],
            'hari' => ['required', 'in:Senin,Selasa,Rabu,Kamis,Jumat,Sabtu,Minggu'],
            'jam_mulai' => ['required', 'date_format:H:i'],
            'jam_selesai' => ['required', 'date_format:H:i', 'after:jam_mulai'],
            'kuota' => ['required', 'integer', 'min:1', 'max:100'],
            'is_active' => ['boolean'],
        ]);

        $jadwal->update($validated);

        return back()->with('success', 'Jadwal praktik berhasil diperbarui.');
    }

    /**
     * Delete a jadwal.
     */
    public function destroy(JadwalPraktik $jadwal): RedirectResponse
    {
        $jadwal->delete();

        return back()->with('success', 'Jadwal praktik berhasil dihapus.');
    }
}
