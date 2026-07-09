<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $pendaftaran_id
 * @property int $bidan_id
 * @property string|null $tekanan_darah
 * @property float|null $berat_badan
 * @property float|null $tinggi_badan
 * @property float|null $suhu_tubuh
 * @property int|null $nadi
 * @property string|null $catatan
 * @property string|null $diagnosa
 * @property string|null $resep
 */
#[Fillable(['pendaftaran_id', 'bidan_id', 'tekanan_darah', 'berat_badan', 'tinggi_badan', 'suhu_tubuh', 'nadi', 'catatan', 'diagnosa', 'resep'])]
class Pemeriksaan extends Model
{
    use HasFactory;

    protected $table = 'pemeriksaan';

    protected function casts(): array
    {
        return [
            'berat_badan' => 'decimal:2',
            'tinggi_badan' => 'decimal:2',
            'suhu_tubuh' => 'decimal:1',
        ];
    }

    /**
     * @return BelongsTo<Pendaftaran, $this>
     */
    public function pendaftaran(): BelongsTo
    {
        return $this->belongsTo(Pendaftaran::class, 'pendaftaran_id');
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function bidan(): BelongsTo
    {
        return $this->belongsTo(User::class, 'bidan_id');
    }
}
