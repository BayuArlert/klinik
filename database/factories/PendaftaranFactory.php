<?php

namespace Database\Factories;

use App\Models\JadwalPraktik;
use App\Models\Pendaftaran;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Pendaftaran>
 */
class PendaftaranFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'pasien_id' => User::factory()->state(['role' => 'pasien']),
            'jadwal_id' => JadwalPraktik::factory(),
            'nomor_antrian' => str_pad((string) fake()->numberBetween(1, 99), 3, '0', STR_PAD_LEFT),
            'tanggal_daftar' => fake()->dateTimeBetween('-1 month', 'now')->format('Y-m-d'),
            'keluhan' => fake()->sentence(),
            'status' => 'menunggu',
        ];
    }
}
