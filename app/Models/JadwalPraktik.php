<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property int $bidan_id
 * @property string $hari
 * @property string $jam_mulai
 * @property string $jam_selesai
 * @property int $kuota
 * @property bool $is_active
 */
#[Fillable(['bidan_id', 'hari', 'jam_mulai', 'jam_selesai', 'kuota', 'is_active'])]
class JadwalPraktik extends Model
{
    use HasFactory;

    protected $table = 'jadwal_praktik';

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function bidan(): BelongsTo
    {
        return $this->belongsTo(User::class, 'bidan_id');
    }

    /**
     * @return HasMany<Pendaftaran, $this>
     */
    public function pendaftaran(): HasMany
    {
        return $this->hasMany(Pendaftaran::class, 'jadwal_id');
    }
}
