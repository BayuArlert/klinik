import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEventHandler } from 'react';
import React from 'react';
import bidan from '@/routes/bidan';
import AppLayout from '../../../layouts/AppLayout';

export default function PemeriksaanCreate({ pendaftaran }: any) {
    const { data, setData, post, processing, errors } = useForm({
        tekanan_darah: '',
        berat_badan: '',
        tinggi_badan: '',
        suhu_tubuh: '',
        nadi: '',
        catatan: '',
        diagnosa: '',
        resep: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(bidan.pemeriksaan.store.url(pendaftaran.id));
    };

    return (
        <AppLayout title="Pemeriksaan Pasien">
            <Head title="Form Pemeriksaan" />

            <div className="mb-6 flex items-center gap-4">
                <Link href={bidan.antrian.index.url()} className="p-2 rounded-full hover:bg-gray-200 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                </Link>
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Form Hasil Pemeriksaan</h2>
                    <p className="text-sm text-gray-500 mt-1">Isi hasil pemeriksaan untuk pasien Antrian #{pendaftaran.nomor_antrian}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Informasi Pasien */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Informasi Pasien</h3>
                        
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Nama Lengkap</p>
                                <p className="text-base font-semibold text-gray-900">{pendaftaran.pasien?.name}</p>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Jenis Kelamin</p>
                                    <p className="text-sm text-gray-900">{pendaftaran.pasien?.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Umur</p>
                                    <p className="text-sm text-gray-900">
                                        {pendaftaran.pasien?.tanggal_lahir ? `${new Date().getFullYear() - new Date(pendaftaran.pasien.tanggal_lahir).getFullYear()} thn` : '-'}
                                    </p>
                                </div>
                            </div>
                            
                            <div>
                                <p className="text-sm font-medium text-gray-500">Keluhan Saat Ini</p>
                                <div className="mt-1 p-3 bg-red-50 text-red-900 text-sm rounded-lg border border-red-100">
                                    {pendaftaran.keluhan}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Pemeriksaan */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <form onSubmit={submit} className="p-6 sm:p-8 space-y-8">
                            
                            {/* Tanda-tanda Vital */}
                            <div>
                                <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-600"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                                    Tanda-tanda Vital
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1" htmlFor="tekanan_darah">Tekanan Darah (mmHg)</label>
                                        <input
                                            id="tekanan_darah"
                                            type="text"
                                            placeholder="120/80"
                                            value={data.tekanan_darah}
                                            className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                                            onChange={(e) => setData('tekanan_darah', e.target.value)}
                                        />
                                        {errors.tekanan_darah && <p className="mt-1 text-xs text-red-600">{errors.tekanan_darah}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1" htmlFor="suhu_tubuh">Suhu Tubuh (°C)</label>
                                        <input
                                            id="suhu_tubuh"
                                            type="number"
                                            step="0.1"
                                            placeholder="36.5"
                                            value={data.suhu_tubuh}
                                            className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                                            onChange={(e) => setData('suhu_tubuh', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1" htmlFor="berat_badan">Berat Badan (kg)</label>
                                        <input
                                            id="berat_badan"
                                            type="number"
                                            step="0.1"
                                            value={data.berat_badan}
                                            className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                                            onChange={(e) => setData('berat_badan', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1" htmlFor="tinggi_badan">Tinggi Badan (cm)</label>
                                        <input
                                            id="tinggi_badan"
                                            type="number"
                                            step="0.1"
                                            value={data.tinggi_badan}
                                            className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                                            onChange={(e) => setData('tinggi_badan', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Hasil & Diagnosa */}
                            <div>
                                <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-600"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
                                    Hasil Pemeriksaan & Diagnosa
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="catatan">Catatan Pemeriksaan</label>
                                        <textarea
                                            id="catatan"
                                            rows={3}
                                            value={data.catatan}
                                            className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                                            onChange={(e) => setData('catatan', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="diagnosa">Diagnosa <span className="text-red-500">*</span></label>
                                        <textarea
                                            id="diagnosa"
                                            rows={2}
                                            value={data.diagnosa}
                                            className={`block w-full rounded-md border ${errors.diagnosa ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:border-teal-500 focus:ring-teal-500 sm:text-sm bg-teal-50`}
                                            onChange={(e) => setData('diagnosa', e.target.value)}
                                            required
                                        />
                                        {errors.diagnosa && <p className="mt-1 text-xs text-red-600">{errors.diagnosa}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Resep */}
                            <div>
                                <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-600"><path d="M10.5 20.5A2.5 2.5 0 0 1 8 18v-3h7v3a2.5 2.5 0 0 1-2.5 2.5z"/><path d="M5.5 15h13a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-13a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2z"/></svg>
                                    Resep / Tindakan
                                </h3>
                                <div>
                                    <textarea
                                        id="resep"
                                        rows={4}
                                        value={data.resep}
                                        placeholder="Tuliskan resep obat atau tindakan medis..."
                                        className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                                        onChange={(e) => setData('resep', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-100 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex justify-center rounded-lg bg-teal-600 px-8 py-3 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan Hasil Pemeriksaan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}


