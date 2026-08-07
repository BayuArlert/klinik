import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEventHandler } from 'react';
import React from 'react';
import GuestLayout from '../../layouts/GuestLayout';

export default function ForgotPassword() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/forgot-password');
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />

            <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-gray-900">Reset Password</h2>
                <p className="mt-1 text-sm text-gray-500">
                    Masukkan email terdaftar dan password baru Anda.
                </p>
            </div>

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                        Email Terdaftar
                    </label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className={`mt-1 block w-full rounded-md border ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                        } px-3 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500`}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="contoh: admin@kliniksehat.com"
                        autoComplete="email"
                        required
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                        Password Baru
                    </label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className={`mt-1 block w-full rounded-md border ${
                            errors.password ? 'border-red-500' : 'border-gray-300'
                        } px-3 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500`}
                        onChange={(e) => setData('password', e.target.value)}
                        placeholder="Minimal 8 karakter"
                        autoComplete="new-password"
                        required
                    />
                    {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="password_confirmation">
                        Konfirmasi Password Baru
                    </label>
                    <input
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        placeholder="Ulangi password baru"
                        autoComplete="new-password"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full flex justify-center rounded-md bg-rose-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 disabled:opacity-50"
                >
                    {processing ? 'Memproses...' : 'Simpan Password Baru'}
                </button>
            </form>

            <div className="mt-6 text-center text-sm">
                <Link href="/login" className="font-medium text-rose-600 hover:text-rose-500">
                    &larr; Kembali ke halaman Login
                </Link>
            </div>
        </GuestLayout>
    );
}
