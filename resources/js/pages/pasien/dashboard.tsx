import { Head, Link } from '@inertiajs/react';
import React from 'react';
import pasien from '@/routes/pasien';
import AppLayout from '../../layouts/AppLayout';

export default function Dashboard({ antrianAktif, riwayatPemeriksaan, totalPendaftaran }: any) {
    return (
        <AppLayout title="Dashboard Pasien">
            <Head title="Dashboard" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Stats Card */}
                <div className="bg-white rounded-xl border border-teal-100 p-6 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-teal-50 rounded-lg text-teal-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Total Pendaftaran</p>
                        <p className="text-2xl font-bold text-gray-900">{totalPendaftaran}</p>
                    </div>
                </div>

                {/* Quick Action */}
                <div className="md:col-span-2 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl p-6 shadow-sm text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-semibold">Butuh Pemeriksaan?</h3>
                        <p className="text-teal-100 text-sm mt-1">Daftar antrian sekarang untuk mendapatkan pelayanan medis.</p>
                    </div>
                    <Link 
                        href={pasien.pendaftaran.create.url()} 
                        className="bg-white text-teal-600 px-6 py-2 rounded-lg font-medium shadow-sm hover:bg-gray-50 transition-colors whitespace-nowrap"
                    >
                        Daftar Antrian
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Antrian Aktif */}
                <div className="lg:col-span-1">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-600"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        Antrian Hari Ini
                    </h2>
                    
                    {antrianAktif ? (
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden text-center">
                            <div className="bg-teal-50 py-3 border-b border-teal-100">
                                <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${antrianAktif.status === 'dipanggil' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'}`}>
                                    {antrianAktif.status === 'dipanggil' ? 'Sedang Dipanggil' : 'Menunggu'}
                                </span>
                            </div>
                            <div className="p-6">
                                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Nomor Antrian</p>
                                <p className="text-5xl font-black text-teal-600 my-4">{antrianAktif.nomor_antrian}</p>
                                <div className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3 text-left">
                                    <p><span className="font-medium">Bidan:</span> {antrianAktif.jadwal?.bidan?.name}</p>
                                    <p className="mt-1"><span className="font-medium">Keluhan:</span> {antrianAktif.keluhan}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl border border-gray-200 border-dashed p-8 text-center text-gray-500">
                            <p>Tidak ada antrian aktif hari ini.</p>
                        </div>
                    )}
                </div>

                {/* Riwayat Pemeriksaan */}
                <div className="lg:col-span-2">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-600"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                            Riwayat Pemeriksaan Terbaru
                        </h2>
                        <Link href={pasien.pendaftaran.index.url()} className="text-sm font-medium text-teal-600 hover:text-teal-700">Lihat Semua</Link>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        {riwayatPemeriksaan.length > 0 ? (
                            <ul className="divide-y divide-gray-200">
                                {riwayatPemeriksaan.map((item: any) => (
                                    <li key={item.id} className="p-4 sm:px-6">
                                        <div className="flex items-center justify-between">
                                            <div className="truncate">
                                                <div className="flex text-sm">
                                                    <p className="font-medium text-teal-600 truncate">{item.jadwal?.bidan?.name}</p>
                                                    <p className="ml-1 flex-shrink-0 font-normal text-gray-500">
                                                        pada {new Date(item.tanggal_daftar).toLocaleDateString('id-ID')}
                                                    </p>
                                                </div>
                                                <div className="mt-2 flex">
                                                    <div className="flex items-center text-sm text-gray-500">
                                                        <span className="font-medium text-gray-700 mr-2">Diagnosa:</span>
                                                        {item.pemeriksaan?.diagnosa || '-'}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="p-8 text-center text-sm text-gray-500">
                                Belum ada riwayat pemeriksaan.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}


