import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEventHandler } from 'react';
import React from 'react';
import { register } from '@/routes';
import { store as loginStore } from '@/routes/login';
import GuestLayout from '../../layouts/GuestLayout';

export default function Login({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(loginStore.url());
    };

    // Helper for quick login during dev/demo
    const fillDemoAccount = (role: 'admin' | 'bidan' | 'pasien') => {
        let email = '';

        if (role === 'admin') {
            email = 'admin@kliniksehat.com';
        }

        if (role === 'bidan') {
            email = 'bidan.sari@kliniksehat.com';
        }

        if (role === 'pasien') {
            email = 'pasien@kliniksehat.com';
        }

        setData({
            ...data,
            email,
            password: 'password'
        });
    };

    return (
        <GuestLayout>
            <Head title="Masuk" />

            <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-gray-900">Selamat Datang</h2>
                <p className="mt-1 text-sm text-gray-500">Silakan masuk ke akun Anda</p>
            </div>

            {status && (
                <div className="mb-4 rounded-md bg-emerald-50 p-3 text-sm font-medium text-emerald-700 border border-emerald-200 text-center">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className={`mt-1 block w-full rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-300'} px-3 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500`}
                        onChange={(e) => setData('email', e.target.value)}
                        autoComplete="username"
                        required
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                        onChange={(e) => setData('password', e.target.value)}
                        autoComplete="current-password"
                        required
                    />
                </div>

                <div className="flex items-center justify-between">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 text-rose-600 focus:ring-rose-500"
                        />
                        <span className="ml-2 text-sm text-gray-600">Ingat saya</span>
                    </label>

                    <Link
                        href="/forgot-password"
                        className="text-sm font-medium text-rose-600 hover:text-rose-500"
                    >
                        Lupa password?
                    </Link>
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full flex justify-center rounded-md bg-rose-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 disabled:opacity-50"
                >
                    {processing ? 'Memproses...' : 'Masuk'}
                </button>
            </form>

            <div className="mt-6 text-center text-sm">
                <span className="text-gray-600">Belum punya akun? </span>
                <Link href={register.url()} className="font-medium text-rose-600 hover:text-rose-500">
                    Daftar sebagai Pasien
                </Link>
            </div>

            {/* DEMO ACCOUNTS HELPER */}
            <div className="mt-8 border-t border-gray-200 pt-6">
                <p className="text-xs text-center text-gray-500 mb-3">Akun Demo (Klik untuk isi cepat)</p>
                <div className="flex justify-center gap-2">
                    <button type="button" onClick={() => fillDemoAccount('pasien')} className="px-2 py-1 text-xs rounded bg-sky-100 text-sky-700 hover:bg-sky-200">Pasien</button>
                    <button type="button" onClick={() => fillDemoAccount('bidan')} className="px-2 py-1 text-xs rounded bg-purple-100 text-purple-700 hover:bg-purple-200">Bidan</button>
                    <button type="button" onClick={() => fillDemoAccount('admin')} className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-700 hover:bg-gray-200">Admin</button>
                </div>
            </div>
        </GuestLayout>
    );
}

