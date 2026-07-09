import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEventHandler } from 'react';
import React from 'react';
import { login } from '@/routes';
import { store as registerStore } from '@/routes/register';
import GuestLayout from '../../layouts/GuestLayout';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        nomor_telepon: '',
        tanggal_lahir: '',
        jenis_kelamin: '',
        alamat: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(registerStore.url());
    };

    return (
        <GuestLayout>
            <Head title="Daftar Pasien" />

            <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-gray-900">Pendaftaran Pasien</h2>
                <p className="mt-1 text-sm text-gray-500">Buat akun untuk melakukan pendaftaran online</p>
            </div>

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="name">Nama Lengkap</label>
                    <input
                        id="name"
                        name="name"
                        value={data.name}
                        className={`mt-1 block w-full rounded-md border ${errors.name ? 'border-red-500' : 'border-gray-300'} px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500`}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className={`mt-1 block w-full rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-300'} px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500`}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className={`mt-1 block w-full rounded-md border ${errors.password ? 'border-red-500' : 'border-gray-300'} px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500`}
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="password_confirmation">Konfirmasi Password</label>
                        <input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="nomor_telepon">Nomor Telepon/WA</label>
                        <input
                            id="nomor_telepon"
                            name="nomor_telepon"
                            value={data.nomor_telepon}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
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
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                            onChange={(e) => setData('tanggal_lahir', e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="jenis_kelamin">Jenis Kelamin</label>
                    <select
                        id="jenis_kelamin"
                        name="jenis_kelamin"
                        value={data.jenis_kelamin}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 bg-white"
                        onChange={(e) => setData('jenis_kelamin', e.target.value)}
                    >
                        <option value="">-- Pilih --</option>
                        <option value="L">Laki-laki</option>
                        <option value="P">Perempuan</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="alamat">Alamat</label>
                    <textarea
                        id="alamat"
                        name="alamat"
                        rows={2}
                        value={data.alamat}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                        onChange={(e) => setData('alamat', e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full flex justify-center rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 mt-4"
                >
                    {processing ? 'Memproses...' : 'Daftar Sekarang'}
                </button>
            </form>

            <div className="mt-6 text-center text-sm">
                <span className="text-gray-600">Sudah punya akun? </span>
                <Link href={login.url()} className="font-medium text-teal-600 hover:text-teal-500">
                    Masuk di sini
                </Link>
            </div>
        </GuestLayout>
    );
}


