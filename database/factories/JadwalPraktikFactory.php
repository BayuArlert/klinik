<?php

namespace Database\Factories;

use App\Models\JadwalPraktik;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<JadwalPraktik>
 */
class JadwalPraktikFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'bidan_id' => User::factory()->state(['role' => 'bidan']),
            'hari' => fake()->randomElement(['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']),
            'jam_mulai' => '08:00:00',
            'jam_selesai' => '14:00:00',
            'kuota' => fake()->numberBetween(10, 30),
            'is_active' => true,
        ];
    }
}
