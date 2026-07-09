<?php

use App\Http\Controllers\Admin\AkunController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\JadwalController;
use App\Http\Controllers\Admin\LaporanController;
use App\Http\Controllers\Admin\PasienController as AdminPasienController;
use App\Http\Controllers\Admin\PendaftaranController as AdminPendaftaranController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Bidan\AntrianController;
use App\Http\Controllers\Bidan\DashboardController as BidanDashboardController;
use App\Http\Controllers\Bidan\PasienController as BidanPasienController;
use App\Http\Controllers\Bidan\PemeriksaanController;
use App\Http\Controllers\Pasien\DashboardController as PasienDashboardController;
use App\Http\Controllers\Pasien\PendaftaranController as PasienPendaftaranController;
use Illuminate\Support\Facades\Route;

// Root redirect
Route::get('/', function () {
    if (auth()->check()) {
        return match (auth()->user()->role) {
            'admin' => redirect()->route('admin.dashboard'),
            'bidan' => redirect()->route('bidan.dashboard'),
            default => redirect()->route('pasien.dashboard'),
        };
    }

    return redirect()->route('login');
});

// ─── Guest routes ─────────────────────────────────────────────
Route::middleware('guest')->group(function () {
    Route::get('/login', [LoginController::class, 'create'])->name('login');
    Route::post('/login', [LoginController::class, 'store'])->name('login.store');

    Route::get('/register', [RegisterController::class, 'create'])->name('register');
    Route::post('/register', [RegisterController::class, 'store'])->name('register.store');
});

// ─── Logout ───────────────────────────────────────────────────
Route::post('/logout', [LoginController::class, 'destroy'])
    ->middleware('auth')
    ->name('logout');

// ─── Pasien routes ────────────────────────────────────────────
Route::prefix('pasien')
    ->middleware(['auth', 'role:pasien'])
    ->name('pasien.')
    ->group(function () {
        Route::get('/dashboard', [PasienDashboardController::class, 'index'])->name('dashboard');

        Route::get('/pendaftaran', [PasienPendaftaranController::class, 'index'])->name('pendaftaran.index');
        Route::get('/pendaftaran/daftar', [PasienPendaftaranController::class, 'create'])->name('pendaftaran.create');
        Route::post('/pendaftaran', [PasienPendaftaranController::class, 'store'])->name('pendaftaran.store');
        Route::delete('/pendaftaran/{pendaftaran}', [PasienPendaftaranController::class, 'destroy'])->name('pendaftaran.destroy');
    });

// ─── Bidan routes ─────────────────────────────────────────────
Route::prefix('bidan')
    ->middleware(['auth', 'role:bidan'])
    ->name('bidan.')
    ->group(function () {
        Route::get('/dashboard', [BidanDashboardController::class, 'index'])->name('dashboard');

        Route::get('/pasien', [BidanPasienController::class, 'index'])->name('pasien.index');

        Route::get('/antrian', [AntrianController::class, 'index'])->name('antrian.index');
        Route::post('/antrian/{pendaftaran}/panggil', [AntrianController::class, 'panggil'])->name('antrian.panggil');

        Route::get('/pemeriksaan/{pendaftaran}', [PemeriksaanController::class, 'create'])->name('pemeriksaan.create');
        Route::post('/pemeriksaan/{pendaftaran}', [PemeriksaanController::class, 'store'])->name('pemeriksaan.store');
        Route::get('/pemeriksaan/{pendaftaran}/detail', [PemeriksaanController::class, 'show'])->name('pemeriksaan.show');
    });

// ─── Admin routes ─────────────────────────────────────────────
Route::prefix('admin')
    ->middleware(['auth', 'role:admin'])
    ->name('admin.')
    ->group(function () {
        Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');

        Route::get('/pasien', [AdminPasienController::class, 'index'])->name('pasien.index');
        Route::get('/pasien/tambah', [AdminPasienController::class, 'create'])->name('pasien.create');
        Route::post('/pasien', [AdminPasienController::class, 'store'])->name('pasien.store');
        Route::get('/pasien/{pasien}/edit', [AdminPasienController::class, 'edit'])->name('pasien.edit');
        Route::put('/pasien/{pasien}', [AdminPasienController::class, 'update'])->name('pasien.update');
        Route::delete('/pasien/{pasien}', [AdminPasienController::class, 'destroy'])->name('pasien.destroy');

        Route::get('/pendaftaran', [AdminPendaftaranController::class, 'index'])->name('pendaftaran.index');
        Route::patch('/pendaftaran/{pendaftaran}', [AdminPendaftaranController::class, 'update'])->name('pendaftaran.update');

        Route::get('/jadwal', [JadwalController::class, 'index'])->name('jadwal.index');
        Route::post('/jadwal', [JadwalController::class, 'store'])->name('jadwal.store');
        Route::put('/jadwal/{jadwal}', [JadwalController::class, 'update'])->name('jadwal.update');
        Route::delete('/jadwal/{jadwal}', [JadwalController::class, 'destroy'])->name('jadwal.destroy');

        Route::get('/akun', [AkunController::class, 'index'])->name('akun.index');
        Route::post('/akun', [AkunController::class, 'store'])->name('akun.store');
        Route::put('/akun/{user}', [AkunController::class, 'update'])->name('akun.update');
        Route::delete('/akun/{user}', [AkunController::class, 'destroy'])->name('akun.destroy');

        Route::get('/laporan', [LaporanController::class, 'index'])->name('laporan.index');
        Route::get('/laporan/export', [LaporanController::class, 'export'])->name('laporan.export');
    });
