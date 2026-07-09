import { Head, Link } from '@inertiajs/react';
import React from 'react';
import pasien from '@/routes/pasien';
import AppLayout from '../../../layouts/AppLayout';

export default function PendaftaranIndex({ pendaftaran }: any) {
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'menunggu': return <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">Menunggu</span>;
            case 'dipanggil': return <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">Dipanggil</span>;
            case 'selesai': return <span className="inline-flex items-center rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-medium text-teal-800">Selesai</span>;
            case 'dibatalkan': return <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">Dibatalkan</span>;
            default: return null;
        }
    };

    return (
        <AppLayout title="Riwayat Pendaftaran">
            <Head title="Pendaftaran" />

            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Riwayat Pendaftaran</h2>
                    <p className="text-sm text-gray-500 mt-1">Daftar semua pendaftaran dan pemeriksaan Anda.</p>
                </div>
                <Link 
                    href={pasien.pendaftaran.create.url()} 
                    className="inline-flex items-center justify-center rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                    Daftar Baru
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal & Antrian</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bidan Pemeriksa</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Keluhan</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Aksi</span></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {pendaftaran.data.length > 0 ? pendaftaran.data.map((item: any) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{new Date(item.tanggal_daftar).toLocaleDateString('id-ID')}</div>
                                        <div className="text-sm text-gray-500">Antrian: <span className="font-bold text-teal-600">{item.nomor_antrian}</span></div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{item.jadwal?.bidan?.name || '-'}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900 max-w-xs truncate">{item.keluhan}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {getStatusBadge(item.status)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        {item.status === 'menunggu' && (
                                            <Link
                                                href={pasien.pendaftaran.destroy.url(item.id)}
                                                method="delete"
                                                as="button"
                                                className="text-red-600 hover:text-red-900"
                                                onClick={(e) => {
                                                    if (!confirm('Apakah Anda yakin ingin membatalkan pendaftaran ini?')) {
                                                        e.preventDefault();
                                                    }
                                                }}
                                            >
                                                Batalkan
                                            </Link>
                                        )}
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


