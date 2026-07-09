<?php

namespace Database\Seeders;

use App\Models\JadwalPraktik;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Admin
        User::factory()->create([
            'name' => 'Administrator Klinik',
            'email' => 'admin@kliniksehat.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        // 2. Bidan / Petugas Pemeriksa
        $bidan = User::factory()->create([
            'name' => 'Bidan Sari, S.Keb',
            'email' => 'bidan.sari@kliniksehat.com',
            'password' => Hash::make('password'),
            'role' => 'bidan',
            'nomor_telepon' => '081234567890',
            'jenis_kelamin' => 'P',
        ]);

        User::factory()->create([
            'name' => 'Bidan Rina, Amd.Keb',
            'email' => 'bidan.rina@kliniksehat.com',
            'password' => Hash::make('password'),
            'role' => 'bidan',
            'jenis_kelamin' => 'P',
        ]);

        // 3. Pasien
        User::factory()->create([
            'name' => 'Pasien Demo',
            'email' => 'pasien@kliniksehat.com',
            'password' => Hash::make('password'),
            'role' => 'pasien',
            'nomor_telepon' => '089876543210',
            'jenis_kelamin' => 'P',
            'tanggal_lahir' => '1995-05-15',
            'alamat' => 'Jl. Mawar No. 123, Jakarta',
        ]);

        // 4. Jadwal Praktik Bidan
        $hari_list = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];

        foreach ($hari_list as $hari) {
            JadwalPraktik::create([
                'bidan_id' => $bidan->id,
                'hari' => $hari,
                'jam_mulai' => '08:00:00',
                'jam_selesai' => '14:00:00',
                'kuota' => 20,
                'is_active' => true,
            ]);
        }
    }
}
