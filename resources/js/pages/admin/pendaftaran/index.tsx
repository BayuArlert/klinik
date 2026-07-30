import { Head } from '@inertiajs/react';
import React from 'react';
import AppLayout from '../../../layouts/AppLayout';

export default function PendaftaranIndex({ pendaftaran }: any) {
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'menunggu': return <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">Menunggu</span>;
            case 'dipanggil': return <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">Dipanggil</span>;
            case 'selesai': return <span className="inline-flex items-center rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-medium text-rose-800">Selesai</span>;
            case 'dibatalkan': return <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">Dibatalkan</span>;
            default: return null;
        }
    };

    return (
        <AppLayout title="Kelola Pendaftaran">
            <Head title="Pendaftaran" />

            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Kelola Pendaftaran</h2>
                    <p className="text-sm text-gray-500 mt-1">Daftar semua pendaftaran dari seluruh pasien.</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                    <input 
                        type="date" 
                        className="w-full sm:w-auto rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                    />
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-white">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tgl & Antrian</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pasien</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bidan Pemeriksa</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {pendaftaran.data.length > 0 ? pendaftaran.data.map((item: any) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{new Date(item.tanggal_daftar).toLocaleDateString('id-ID')}</div>
                                        <div className="text-sm text-gray-500">Antrian: <span className="font-bold text-rose-600">{item.nomor_antrian}</span></div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{item.pasien?.name}</div>
                                        <div className="text-xs text-gray-500">{item.pasien?.nomor_telepon || '-'}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{item.jadwal?.bidan?.name || '-'}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {getStatusBadge(item.status)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-rose-600 hover:text-rose-900">Detail</button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-500">
                                        Belum ada data pendaftaran.
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
