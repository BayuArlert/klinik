<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class AkunController extends Controller
{
    /**
     * List all users (non-pasien).
     */
    public function index(Request $request): Response
    {
        $users = User::when($request->role, fn ($q, $role) => $q->where('role', $role))
            ->when($request->search, fn ($q, $s) => $q->where('name', 'like', "%{$s}%")->orWhere('email', 'like', "%{$s}%"))
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('admin/akun/index', [
            'users' => $users,
            'filters' => $request->only(['role', 'search']),
        ]);
    }

    /**
     * Store a new user (bidan or admin).
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'unique:users'],
            'password' => ['required', 'min:8'],
            'role' => ['required', 'in:bidan,admin'],
            'nomor_telepon' => ['nullable', 'string', 'max:20'],
        ]);

        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
            'nomor_telepon' => $validated['nomor_telepon'] ?? null,
        ]);

        return back()->with('success', 'Akun berhasil dibuat.');
    }

    /**
     * Update user data.
     */
    public function update(Request $request, User $user): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', "unique:users,email,{$user->id}"],
            'role' => ['required', 'in:pasien,bidan,admin'],
            'nomor_telepon' => ['nullable', 'string', 'max:20'],
            'password' => ['nullable', 'min:8'],
        ]);

        $updateData = [
            'name' => $validated['name'],
            'email' => $validated['email'],
            'role' => $validated['role'],
            'nomor_telepon' => $validated['nomor_telepon'] ?? null,
        ];

        if (! empty($validated['password'])) {
            $updateData['password'] = Hash::make($validated['password']);
        }

        $user->update($updateData);

        return back()->with('success', 'Akun berhasil diperbarui.');
    }

    /**
     * Delete a user.
     */
    public function destroy(User $user): RedirectResponse
    {
        if ($user->id === auth()->id()) {
            return back()->withErrors(['error' => 'Anda tidak dapat menghapus akun sendiri.']);
        }

        $user->delete();

        return back()->with('success', 'Akun berhasil dihapus.');
    }
}
