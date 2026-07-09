<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $pasien_id
 * @property int $jadwal_id
 * @property string $nomor_antrian
 * @property Carbon $tanggal_daftar
 * @property string $keluhan
 * @property string $status
 */
#[Fillable(['pasien_id', 'jadwal_id', 'nomor_antrian', 'tanggal_daftar', 'keluhan', 'status'])]
class Pendaftaran extends Model
{
    use HasFactory;

    protected $table = 'pendaftaran';

    protected function casts(): array
    {
        return [
            'tanggal_daftar' => 'date',
        ];
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function pasien(): BelongsTo
    {
        return $this->belongsTo(User::class, 'pasien_id');
    }

    /**
     * @return BelongsTo<JadwalPraktik, $this>
     */
    public function jadwal(): BelongsTo
    {
        return $this->belongsTo(JadwalPraktik::class, 'jadwal_id');
    }

    /**
     * @return HasOne<Pemeriksaan, $this>
     */
    public function pemeriksaan(): HasOne
    {
        return $this->hasOne(Pemeriksaan::class, 'pendaftaran_id');
    }

    public function getStatusLabelAttribute(): string
    {
        return match ($this->status) {
            'menunggu' => 'Menunggu',
            'dipanggil' => 'Dipanggil',
            'selesai' => 'Selesai',
            'dibatalkan' => 'Dibatalkan',
            default => $this->status,
        };
    }
}
