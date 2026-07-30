import { Head, Link, useForm } from '@inertiajs/react';
import React from 'react';
import bidan from '@/routes/bidan';
import AppLayout from '../../../layouts/AppLayout';

export default function AntrianIndex({ antrian }: any) {
    const { post } = useForm();

    const handlePanggil = (id: number) => {
        post(bidan.antrian.panggil.url(id), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout title="Kelola Antrian">
            <Head title="Antrian" />

            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Antrian Hari Ini</h2>
                    <p className="text-sm text-gray-500 mt-1">{new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-24">No. Antrian</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pasien</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Keluhan</th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Status</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-40">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {antrian.length > 0 ? antrian.map((item: any) => (
                                <tr key={item.id} className={`transition-colors ${item.status === 'dipanggil' ? 'bg-amber-50/30' : 'hover:bg-gray-50'}`}>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <span className={`text-xl font-black ${item.status === 'dipanggil' ? 'text-amber-600' : 'text-rose-600'}`}>
                                            {item.nomor_antrian}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-gray-900">{item.pasien?.name}</div>
                                        <div className="text-xs text-gray-500">
                                            {item.pasien?.jenis_kelamin === 'L' ? 'L' : (item.pasien?.jenis_kelamin === 'P' ? 'P' : '')}
                                            {item.pasien?.tanggal_lahir ? ` • ${new Date().getFullYear() - new Date(item.pasien.tanggal_lahir).getFullYear()} thn` : ''}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900 max-w-sm">{item.keluhan}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        {item.status === 'menunggu' && <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">Menunggu</span>}
                                        {item.status === 'dipanggil' && <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800 animate-pulse">Dipanggil</span>}
                                        {item.status === 'selesai' && <span className="inline-flex items-center rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-medium text-rose-800">Selesai</span>}
                                        {item.status === 'dibatalkan' && <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">Dibatalkan</span>}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        {item.status === 'menunggu' && (
                                            <button
                                                onClick={() => handlePanggil(item.id)}
                                                className="inline-flex items-center rounded-md bg-amber-100 px-3 py-1.5 text-sm font-medium text-amber-700 hover:bg-amber-200"
                                            >
                                                Panggil
                                            </button>
                                        )}
                                        {item.status === 'dipanggil' && (
                                            <Link
                                                href={bidan.pemeriksaan.create.url(item.id)}
                                                className="inline-flex items-center rounded-md bg-rose-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-rose-700"
                                            >
                                                Periksa
                                            </Link>
                                        )}
                                        {item.status === 'selesai' && (
                                            <Link
                                                href={bidan.pemeriksaan.show.url(item.id)}
                                                className="text-rose-600 hover:text-rose-900"
                                            >
                                                Lihat Hasil
                                            </Link>
                                        )}
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4 text-gray-300"><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>
                                            <p className="text-lg font-medium text-gray-900">Belum ada antrian</p>
                                            <p className="text-sm mt-1">Belum ada pasien yang mendaftar hari ini.</p>
                                        </div>
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


