import { Head } from '@inertiajs/react';
import React from 'react';
import AppLayout from '../../../layouts/AppLayout';

export default function PasienIndex({ pasien }: any) {
    return (
        <AppLayout title="Data Pasien">
            <Head title="Pasien" />

            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900">Data Pasien Klinik</h2>
                <p className="text-sm text-gray-500 mt-1">Lihat daftar profil pasien yang terdaftar di sistem.</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Pasien</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kontak</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TTL / Umur</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alamat</th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Kunjungan</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {pasien.data.length > 0 ? pasien.data.map((item: any) => {
                                const age = item.tanggal_lahir ? new Date().getFullYear() - new Date(item.tanggal_lahir).getFullYear() : '-';

                                return (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 flex-shrink-0 rounded-full bg-rose-100 flex items-center justify-center text-rose-700 font-bold">
                                                    {item.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                                    <div className="text-xs text-gray-500">{item.jenis_kelamin === 'L' ? 'Laki-laki' : (item.jenis_kelamin === 'P' ? 'Perempuan' : '-')}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{item.nomor_telepon || '-'}</div>
                                            <div className="text-xs text-gray-500">{item.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{item.tanggal_lahir ? new Date(item.tanggal_lahir).toLocaleDateString('id-ID') : '-'}</div>
                                            <div className="text-xs text-gray-500">{age !== '-' ? `${age} tahun` : ''}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900 max-w-xs truncate" title={item.alamat}>{item.alamat || '-'}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900">
                                            <span className="bg-rose-50 text-rose-700 py-1 px-2.5 rounded-full border border-rose-100">{item.pendaftaran_count || 0}</span>
                                        </td>
                                    </tr>
                                );
                            }) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-500">
                                        Belum ada data pasien.
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
