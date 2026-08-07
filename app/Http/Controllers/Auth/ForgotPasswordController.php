<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ForgotPasswordController extends Controller
{
    /**
     * Tampilkan halaman lupa password.
     */
    public function create(): Response
    {
        return Inertia::render('auth/forgot-password');
    }

    /**
     * Proses reset password langsung tanpa konfirmasi email.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => ['required', 'email', 'exists:users,email'],
            'password' => ['required', 'min:8', 'confirmed'],
        ], [
            'email.required' => 'Email wajib diisi.',
            'email.email' => 'Format email tidak valid.',
            'email.exists' => 'Email ini tidak terdaftar dalam sistem.',
            'password.required' => 'Password baru wajib diisi.',
            'password.min' => 'Password minimal terdiri dari 8 karakter.',
            'password.confirmed' => 'Konfirmasi password baru tidak cocok.',
        ]);

        /** @var User $user */
        $user = User::where('email', $request->email)->firstOrFail();
        $user->update([
            'password' => $request->password,
        ]);

        return redirect()->route('login')->with('status', 'Password berhasil diperbarui! Silakan masuk dengan password baru.');
    }
}
