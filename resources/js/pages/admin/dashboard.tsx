import { Head, Link } from '@inertiajs/react';
import React from 'react';
import admin from '@/routes/admin';
import AppLayout from '../../layouts/AppLayout';

export default function Dashboard({ stats, pendaftaranTerbaru }: any) {
    return (
        <AppLayout title="Dashboard Admin">
            <Head title="Dashboard" />

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                    <p className="text-sm font-medium text-gray-500 mb-1">Pendaftaran Hari Ini</p>
                    <div className="flex items-end justify-between">
                        <p className="text-3xl font-bold text-gray-900">{stats.pendaftaranHariIni}</p>
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                    <p className="text-sm font-medium text-gray-500 mb-1">Antrian Menunggu</p>
                    <div className="flex items-end justify-between">
                        <p className="text-3xl font-bold text-amber-600">{stats.antrianMenunggu}</p>
                        <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                    <p className="text-sm font-medium text-gray-500 mb-1">Pemeriksaan Selesai</p>
                    <div className="flex items-end justify-between">
                        <p className="text-3xl font-bold text-rose-600">{stats.pemeriksaanSelesai}</p>
                        <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                    <p className="text-sm font-medium text-gray-500 mb-1">Total Pasien</p>
                    <div className="flex items-end justify-between">
                        <p className="text-3xl font-bold text-gray-900">{stats.totalPasien}</p>
                        <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Antrian Terbaru */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                            <h2 className="text-lg font-bold text-gray-900">Pendaftaran Terbaru Hari Ini</h2>
                            <Link href={admin.pendaftaran.index.url()} className="text-sm font-medium text-rose-600 hover:text-rose-700">Lihat Semua</Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Antrian</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pasien</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bidan</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {pendaftaranTerbaru.length > 0 ? pendaftaranTerbaru.map((item: any) => (
                                        <tr key={item.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-rose-600">
                                                {item.nomor_antrian}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {item.pasien?.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {item.jadwal?.bidan?.name || '-'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {item.status === 'menunggu' && <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">Menunggu</span>}
                                                {item.status === 'dipanggil' && <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">Dipanggil</span>}
                                                {item.status === 'selesai' && <span className="inline-flex items-center rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-medium text-rose-800">Selesai</span>}
                                                {item.status === 'dibatalkan' && <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">Dibatalkan</span>}
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-8 text-center text-sm text-gray-500">
                                                Belum ada pendaftaran terbaru.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-lg font-bold text-gray-900">Aksi Cepat</h2>
                        </div>
                        <div className="p-4 space-y-3">
                            <Link href={admin.pasien.create.url()} className="flex items-center p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-colors group">
                                <div className="p-2 bg-rose-50 rounded-lg text-rose-600 group-hover:bg-rose-100 mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Daftarkan Pasien Baru</p>
                                    <p className="text-xs text-gray-500">Buat akun untuk pasien baru</p>
                                </div>
                            </Link>
                            
                            <Link href={admin.laporan.index.url()} className="flex items-center p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-colors group">
                                <div className="p-2 bg-blue-50 rounded-lg text-blue-600 group-hover:bg-blue-100 mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Lihat Laporan</p>
                                    <p className="text-xs text-gray-500">Cetak rekap pendaftaran</p>
                                </div>
                            </Link>

                            <Link href={admin.jadwal.index.url()} className="flex items-center p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-colors group">
                                <div className="p-2 bg-purple-50 rounded-lg text-purple-600 group-hover:bg-purple-100 mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Kelola Jadwal Praktik</p>
                                    <p className="text-xs text-gray-500">Atur jadwal dan kuota bidan</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}


