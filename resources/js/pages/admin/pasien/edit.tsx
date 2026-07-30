import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEventHandler } from 'react';
import React from 'react';
import admin from '@/routes/admin';
import AppLayout from '../../../layouts/AppLayout';

export default function PasienEdit({ user }: any) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        password: '',
        password_confirmation: '',
        nomor_telepon: user.nomor_telepon || '',
        tanggal_lahir: user.tanggal_lahir ? user.tanggal_lahir.split('T')[0] : '',
        jenis_kelamin: user.jenis_kelamin || '',
        alamat: user.alamat || '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(admin.pasien.update.url(user.id));
    };

    return (
        <AppLayout title="Edit Pasien">
            <Head title="Edit Pasien" />

            <div className="max-w-3xl mx-auto">
                <div className="mb-6 flex items-center gap-4">
                    <Link href={admin.pasien.index.url()} className="p-2 rounded-full hover:bg-gray-200 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                    </Link>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Edit Data Pasien</h2>
                        <p className="text-sm text-gray-500 mt-1">Ubah informasi profil pasien.</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <form onSubmit={submit} className="p-6 sm:p-8 space-y-6">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700" htmlFor="name">Nama Lengkap <span className="text-red-500">*</span></label>
                                <input
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className={`mt-1 block w-full rounded-md border ${errors.name ? 'border-red-500' : 'border-gray-300'} px-3 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500`}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email <span className="text-red-500">*</span></label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className={`mt-1 block w-full rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-300'} px-3 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500`}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                            </div>
                        </div>

                        <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-800">
                            <strong>Note:</strong> Biarkan field password kosong jika tidak ingin mengubah password pasien.
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password Baru</label>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className={`mt-1 block w-full rounded-md border ${errors.password ? 'border-red-500' : 'border-gray-300'} px-3 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500`}
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700" htmlFor="password_confirmation">Konfirmasi Password Baru</label>
                                <input
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="border-t border-gray-100 pt-6 mt-6">
                            <h3 className="text-sm font-semibold text-gray-900 mb-4">Informasi Tambahan</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700" htmlFor="nomor_telepon">Nomor Telepon/WA</label>
                                    <input
                                        id="nomor_telepon"
                                        name="nomor_telepon"
                                        value={data.nomor_telepon}
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                                        onChange={(e) => setData('nomor_telepon', e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700" htmlFor="tanggal_lahir">Tanggal Lahir</label>
                                    <input
                                        id="tanggal_lahir"
                                        type="date"
                                        name="tanggal_lahir"
                                        value={data.tanggal_lahir}
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                                        onChange={(e) => setData('tanggal_lahir', e.target.value)}
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700" htmlFor="jenis_kelamin">Jenis Kelamin</label>
                                    <select
                                        id="jenis_kelamin"
                                        name="jenis_kelamin"
                                        value={data.jenis_kelamin}
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500 bg-white"
                                        onChange={(e) => setData('jenis_kelamin', e.target.value)}
                                    >
                                        <option value="">-- Pilih --</option>
                                        <option value="L">Laki-laki</option>
                                        <option value="P">Perempuan</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700" htmlFor="alamat">Alamat Lengkap</label>
                                <textarea
                                    id="alamat"
                                    name="alamat"
                                    rows={3}
                                    value={data.alamat}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                                    onChange={(e) => setData('alamat', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="pt-4 flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex justify-center rounded-lg bg-rose-600 px-6 py-2 text-sm font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 disabled:opacity-50"
                            >
                                {processing ? 'Menyimpan...' : 'Perbarui Pasien'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}


