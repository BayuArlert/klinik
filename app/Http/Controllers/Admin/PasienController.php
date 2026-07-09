<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class PasienController extends Controller
{
    /**
     * List all pasien.
     */
    public function index(Request $request): Response
    {
        $pasien = User::where('role', 'pasien')
            ->when($request->search, fn ($q, $search) => $q->where('name', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%"))
            ->withCount('pendaftaran')
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('admin/pasien/index', [
            'pasien' => $pasien,
            'filters' => $request->only('search'),
        ]);
    }

    /**
     * Show create form.
     */
    public function create(): Response
    {
        return Inertia::render('admin/pasien/create');
    }

    /**
     * Store a new pasien.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'unique:users'],
            'password' => ['required', 'min:8'],
            'nomor_telepon' => ['nullable', 'string', 'max:20'],
            'tanggal_lahir' => ['nullable', 'date'],
            'jenis_kelamin' => ['nullable', 'in:L,P'],
            'alamat' => ['nullable', 'string'],
        ]);

        User::create(array_merge($validated, [
            'password' => Hash::make($validated['password']),
            'role' => 'pasien',
        ]));

        return redirect()->route('admin.pasien.index')
            ->with('success', 'Data pasien berhasil ditambahkan.');
    }

    /**
     * Show edit form.
     */
    public function edit(User $pasien): Response
    {
        return Inertia::render('admin/pasien/edit', ['pasien' => $pasien]);
    }

    /**
     * Update pasien data.
     */
    public function update(Request $request, User $pasien): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', "unique:users,email,{$pasien->id}"],
            'nomor_telepon' => ['nullable', 'string', 'max:20'],
            'tanggal_lahir' => ['nullable', 'date'],
            'jenis_kelamin' => ['nullable', 'in:L,P'],
            'alamat' => ['nullable', 'string'],
        ]);

        $pasien->update($validated);

        return redirect()->route('admin.pasien.index')
            ->with('success', 'Data pasien berhasil diperbarui.');
    }

    /**
     * Delete a pasien.
     */
    public function destroy(User $pasien): RedirectResponse
    {
        $pasien->delete();

        return back()->with('success', 'Data pasien berhasil dihapus.');
    }
}
