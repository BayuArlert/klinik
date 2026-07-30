import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEventHandler } from 'react';
import React from 'react';
import pasien from '@/routes/pasien';
import AppLayout from '../../../layouts/AppLayout';

export default function PendaftaranCreate({ jadwalTersedia }: any) {
    const { data, setData, post, processing, errors } = useForm({
        jadwal_id: '',
        tanggal_daftar: new Date().toISOString().split('T')[0],
        keluhan: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(pasien.pendaftaran.store.url());
    };

    return (
        <AppLayout title="Daftar Antrian Baru">
            <Head title="Daftar Antrian" />

            <div className="max-w-3xl mx-auto">
                <div className="mb-6 flex items-center gap-4">
                    <Link href={pasien.pendaftaran.index.url()} className="p-2 rounded-full hover:bg-gray-200 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                    </Link>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Form Pendaftaran</h2>
                        <p className="text-sm text-gray-500 mt-1">Silakan isi keluhan dan pilih jadwal praktik bidan.</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <form onSubmit={submit} className="p-6 sm:p-8 space-y-6">
                        
                        {/* Tanggal Daftar */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="tanggal_daftar">Tanggal Kunjungan</label>
                            <input
                                id="tanggal_daftar"
                                type="date"
                                min={new Date().toISOString().split('T')[0]}
                                value={data.tanggal_daftar}
                                className={`block w-full sm:w-1/2 rounded-lg border ${errors.tanggal_daftar ? 'border-red-500' : 'border-gray-300'} px-4 py-3 focus:border-rose-500 focus:ring-rose-500 bg-gray-50`}
                                onChange={(e) => setData('tanggal_daftar', e.target.value)}
                                required
                            />
                            {errors.tanggal_daftar && <p className="mt-2 text-sm text-red-600">{errors.tanggal_daftar}</p>}
                        </div>

                        {/* Jadwal Praktik */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Pilih Jadwal Bidan</label>
                            {errors.jadwal_id && <p className="mb-3 text-sm text-red-600">{errors.jadwal_id}</p>}
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {jadwalTersedia.map((jadwal: any) => {
                                    const isSelected = data.jadwal_id === jadwal.id.toString();

                                    return (
                                        <label 
                                            key={jadwal.id} 
                                            className={`relative flex cursor-pointer rounded-lg border p-4 shadow-sm focus:outline-none ${
                                                isSelected ? 'border-rose-500 bg-rose-50 ring-1 ring-rose-500' : 'border-gray-300 bg-white hover:bg-gray-50'
                                            }`}
                                        >
                                            <input
                                                type="radio"
                                                name="jadwal_id"
                                                value={jadwal.id}
                                                checked={isSelected}
                                                onChange={(e) => setData('jadwal_id', e.target.value)}
                                                className="sr-only"
                                            />
                                            <span className="flex flex-1">
                                                <span className="flex flex-col">
                                                    <span className="block text-sm font-medium text-gray-900">{jadwal.bidan.name}</span>
                                                    <span className="mt-1 flex items-center text-sm text-gray-500">
                                                        Hari {jadwal.hari}, {jadwal.jam_mulai.substring(0,5)} - {jadwal.jam_selesai.substring(0,5)}
                                                    </span>
                                                </span>
                                            </span>
                                            <svg className={`h-5 w-5 ${isSelected ? 'text-rose-600' : 'hidden'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                                            </svg>
                                        </label>
                                    );
                                })}
                                {jadwalTersedia.length === 0 && (
                                    <div className="col-span-full p-4 text-center text-sm text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                                        Tidak ada jadwal praktik yang tersedia saat ini.
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Keluhan */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="keluhan">Keluhan Medis</label>
                            <textarea
                                id="keluhan"
                                rows={4}
                                value={data.keluhan}
                                placeholder="Jelaskan keluhan yang Anda rasakan secara singkat..."
                                className={`block w-full rounded-lg border ${errors.keluhan ? 'border-red-500' : 'border-gray-300'} px-4 py-3 focus:border-rose-500 focus:ring-rose-500`}
                                onChange={(e) => setData('keluhan', e.target.value)}
                                required
                            />
                            {errors.keluhan && <p className="mt-2 text-sm text-red-600">{errors.keluhan}</p>}
                        </div>

                        <div className="pt-4 border-t border-gray-100 flex justify-end">
                            <button
                                type="submit"
                                disabled={processing || !data.jadwal_id}
                                className="inline-flex justify-center rounded-lg bg-rose-600 px-8 py-3 text-sm font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 disabled:opacity-50"
                            >
                                {processing ? 'Memproses...' : 'Daftar Sekarang'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}


