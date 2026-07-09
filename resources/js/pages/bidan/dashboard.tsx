import { Head, Link } from '@inertiajs/react';
import React from 'react';
import bidan from '@/routes/bidan';
import AppLayout from '../../layouts/AppLayout';

export default function Dashboard({ totalPasienHariIni, antrianMenunggu, pemeriksaanSelesai, antrianTerbaru }: any) {
    return (
        <AppLayout title="Dashboard Bidan">
            <Head title="Dashboard" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-teal-50 rounded-lg text-teal-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Pasien Hari Ini</p>
                        <p className="text-2xl font-bold text-gray-900">{totalPasienHariIni}</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-amber-50 rounded-lg text-amber-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Antrian Menunggu</p>
                        <p className="text-2xl font-bold text-gray-900">{antrianMenunggu}</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Pemeriksaan Selesai</p>
                        <p className="text-2xl font-bold text-gray-900">{pemeriksaanSelesai}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                    <h2 className="text-lg font-bold text-gray-900">Antrian Terbaru (Menunggu & Dipanggil)</h2>
                    <Link href={bidan.antrian.index.url()} className="text-sm font-medium text-teal-600 hover:text-teal-700">Kelola Antrian</Link>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-white">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No. Antrian</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pasien</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Keluhan</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {antrianTerbaru.length > 0 ? antrianTerbaru.map((item: any) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-teal-600">
                                        {item.nomor_antrian}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{item.pasien?.name}</div>
                                        <div className="text-sm text-gray-500">{item.pasien?.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-xs">
                                        {item.keluhan}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${item.status === 'dipanggil' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'}`}>
                                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                                        </span>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-sm text-gray-500">
                                        Tidak ada antrian menunggu saat ini.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}


