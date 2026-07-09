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
        Schema::table('users', function (Blueprint $table) {
            $table->enum('role', ['pasien', 'bidan', 'admin'])->default('pasien')->after('name');
            $table->string('nomor_telepon', 20)->nullable()->after('role');
            $table->date('tanggal_lahir')->nullable()->after('nomor_telepon');
            $table->enum('jenis_kelamin', ['L', 'P'])->nullable()->after('tanggal_lahir');
            $table->text('alamat')->nullable()->after('jenis_kelamin');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['role', 'nomor_telepon', 'tanggal_lahir', 'jenis_kelamin', 'alamat']);
        });
    }
};
