<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pendaftaran', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pasien_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('jadwal_id')->constrained('jadwal_praktik')->cascadeOnDelete();
            $table->string('nomor_antrian', 10);
            $table->date('tanggal_daftar');
            $table->text('keluhan');
            $table->enum('status', ['menunggu', 'dipanggil', 'selesai', 'dibatalkan'])->default('menunggu');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pendaftaran');
    }
};
