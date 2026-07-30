import { Head, Link, useForm } from '@inertiajs/react';
import React from 'react';
import admin from '@/routes/admin';
import AppLayout from '../../../layouts/AppLayout';

export default function PasienIndex({ pasien }: any) {
    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus data pasien ini?')) {
            destroy(admin.pasien.destroy.url(id));
        }
    };

    return (
        <AppLayout title="Kelola Pasien">
            <Head title="Pasien" />

            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Kelola Data Pasien</h2>
                    <p className="text-sm text-gray-500 mt-1">Daftar semua pasien yang terdaftar di klinik.</p>
                </div>
                <Link 
                    href={admin.pasien.create.url()} 
                    className="inline-flex items-center justify-center rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                    Tambah Pasien
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                    <input 
                        type="text" 
                        placeholder="Cari nama pasien atau NIK..." 
                        className="w-full sm:w-1/3 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                    />
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-white">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Pasien</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kontak</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TTL / Umur</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alamat</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
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
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Link href={admin.pasien.edit.url(item.id)} className="text-blue-600 hover:text-blue-900 mr-4">Edit</Link>
                                            <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">Hapus</button>
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


