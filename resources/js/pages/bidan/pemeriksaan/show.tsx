import { Head, Link } from '@inertiajs/react';
import React from 'react';
import bidan from '@/routes/bidan';
import AppLayout from '../../../layouts/AppLayout';

export default function PemeriksaanShow({ pendaftaran }: any) {
    return (
        <AppLayout title="Detail Pemeriksaan">
            <Head title="Detail Pemeriksaan" />

            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href={bidan.antrian.index.url()} className="p-2 rounded-full hover:bg-gray-200 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                    </Link>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Hasil Pemeriksaan</h2>
                        <p className="text-sm text-gray-500 mt-1">Selesai pada: {new Date(pendaftaran.pemeriksaan?.updated_at).toLocaleString('id-ID')}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 sm:p-8 space-y-8">
                    
                    {/* Patient & Bidan Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b pb-8">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Informasi Pasien</h3>
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full bg-rose-100 flex items-center justify-center text-rose-700 font-bold text-lg">
                                    {pendaftaran.pasien?.name?.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <p className="text-lg font-bold text-gray-900">{pendaftaran.pasien?.name}</p>
                                    <p className="text-sm text-gray-500">
                                        {pendaftaran.pasien?.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'} • 
                                        {pendaftaran.pasien?.tanggal_lahir ? ` ${new Date().getFullYear() - new Date(pendaftaran.pasien.tanggal_lahir).getFullYear()} tahun` : ''}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Pemeriksa</h3>
                            <p className="font-medium text-gray-900">{pendaftaran.pemeriksaan?.bidan?.name}</p>
                            <p className="text-sm text-gray-500">Bidan / Petugas Medis</p>
                        </div>
                    </div>

                    {/* Keluhan & TTV */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-1">
                            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Keluhan Medis</h3>
                            <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700 whitespace-pre-wrap">
                                {pendaftaran.keluhan}
                            </div>
                        </div>

                        <div className="lg:col-span-2">
                            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Tanda-tanda Vital</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                <div className="border border-gray-100 bg-gray-50 rounded-lg p-3 text-center">
                                    <p className="text-xs text-gray-500 mb-1">Tekanan Darah</p>
                                    <p className="font-bold text-gray-900">{pendaftaran.pemeriksaan?.tekanan_darah || '-'}</p>
                                </div>
                                <div className="border border-gray-100 bg-gray-50 rounded-lg p-3 text-center">
                                    <p className="text-xs text-gray-500 mb-1">Suhu Tubuh</p>
                                    <p className="font-bold text-gray-900">{pendaftaran.pemeriksaan?.suhu_tubuh ? `${pendaftaran.pemeriksaan.suhu_tubuh} °C` : '-'}</p>
                                </div>
                                <div className="border border-gray-100 bg-gray-50 rounded-lg p-3 text-center">
                                    <p className="text-xs text-gray-500 mb-1">Berat Badan</p>
                                    <p className="font-bold text-gray-900">{pendaftaran.pemeriksaan?.berat_badan ? `${pendaftaran.pemeriksaan.berat_badan} kg` : '-'}</p>
                                </div>
                                <div className="border border-gray-100 bg-gray-50 rounded-lg p-3 text-center">
                                    <p className="text-xs text-gray-500 mb-1">Tinggi Badan</p>
                                    <p className="font-bold text-gray-900">{pendaftaran.pemeriksaan?.tinggi_badan ? `${pendaftaran.pemeriksaan.tinggi_badan} cm` : '-'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Diagnosa & Resep */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t pt-8">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Catatan & Diagnosa</h3>
                            <div className="space-y-4">
                                {pendaftaran.pemeriksaan?.catatan && (
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Catatan</p>
                                        <p className="text-sm text-gray-800">{pendaftaran.pemeriksaan.catatan}</p>
                                    </div>
                                )}
                                <div className="bg-rose-50 border border-rose-100 p-4 rounded-lg">
                                    <p className="text-xs text-rose-700 font-medium mb-1">Diagnosa Utama</p>
                                    <p className="text-base font-bold text-rose-900">{pendaftaran.pemeriksaan?.diagnosa}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Resep Obat / Tindakan</h3>
                            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg h-full">
                                <p className="text-sm text-gray-800 whitespace-pre-wrap font-medium">
                                    {pendaftaran.pemeriksaan?.resep || 'Tidak ada resep atau tindakan khusus.'}
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AppLayout>
    );
}


