<?php

namespace Database\Seeders;

use App\Models\JadwalPraktik;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'admin@kliniksehat.com'],
            [
                'name' => 'Administrator Klinik',
                'password' => Hash::make('password'),
                'role' => 'admin',
            ],
        );

        $bidan = User::firstOrCreate(
            ['email' => 'bidan.sari@kliniksehat.com'],
            [
                'name' => 'Bidan Sari, S.Keb',
                'password' => Hash::make('password'),
                'role' => 'bidan',
                'nomor_telepon' => '081234567890',
                'jenis_kelamin' => 'P',
            ],
        );

        User::firstOrCreate(
            ['email' => 'bidan.rina@kliniksehat.com'],
            [
                'name' => 'Bidan Rina, Amd.Keb',
                'password' => Hash::make('password'),
                'role' => 'bidan',
                'jenis_kelamin' => 'P',
            ],
        );

        User::firstOrCreate(
            ['email' => 'pasien@kliniksehat.com'],
            [
                'name' => 'Pasien Demo',
                'password' => Hash::make('password'),
                'role' => 'pasien',
                'nomor_telepon' => '089876543210',
                'jenis_kelamin' => 'P',
                'tanggal_lahir' => '1995-05-15',
                'alamat' => 'Jl. Mawar No. 123, Jakarta',
            ],
        );

        $hariList = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];

        foreach ($hariList as $hari) {
            JadwalPraktik::firstOrCreate(
                [
                    'bidan_id' => $bidan->id,
                    'hari' => $hari,
                ],
                [
                    'jam_mulai' => '08:00:00',
                    'jam_selesai' => '14:00:00',
                    'kuota' => 20,
                    'is_active' => true,
                ],
            );
        }
    }
}
