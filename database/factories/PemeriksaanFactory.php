<?php

namespace Database\Factories;

use App\Models\Pemeriksaan;
use App\Models\Pendaftaran;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Pemeriksaan>
 */
class PemeriksaanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'pendaftaran_id' => Pendaftaran::factory(),
            'bidan_id' => User::factory()->state(['role' => 'bidan']),
            'tekanan_darah' => fake()->numerify('###/##'),
            'berat_badan' => fake()->randomFloat(2, 45, 90),
            'tinggi_badan' => fake()->randomFloat(2, 150, 175),
            'suhu_tubuh' => fake()->randomFloat(1, 36.0, 37.5),
            'nadi' => fake()->numberBetween(60, 100),
            'catatan' => fake()->optional()->paragraph(),
            'diagnosa' => fake()->optional()->sentence(),
            'resep' => fake()->optional()->sentence(),
        ];
    }
}
