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
        Schema::create('pemeriksaan', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pendaftaran_id')->constrained('pendaftaran')->cascadeOnDelete();
            $table->foreignId('bidan_id')->constrained('users')->cascadeOnDelete();
            $table->string('tekanan_darah', 20)->nullable();
            $table->decimal('berat_badan', 5, 2)->nullable()->comment('kg');
            $table->decimal('tinggi_badan', 5, 2)->nullable()->comment('cm');
            $table->decimal('suhu_tubuh', 4, 1)->nullable()->comment('celsius');
            $table->unsignedSmallInteger('nadi')->nullable()->comment('per menit');
            $table->text('catatan')->nullable();
            $table->text('diagnosa')->nullable();
            $table->text('resep')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pemeriksaan');
    }
};
