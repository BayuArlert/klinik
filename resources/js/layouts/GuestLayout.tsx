import { Link } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';
import React from 'react';

export default function GuestLayout({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 pt-6 sm:justify-center sm:pt-0">
            <div>
                <Link href="/" className="flex items-center gap-3">
                    <img src="/logo.png" alt="Praktek Bidan Ayu Logo" className="h-16 w-16 object-contain rounded-full shadow-md border-2 border-white" />
                    <span className="text-3xl font-bold tracking-tight text-teal-700">PRAKTEK BIDAN AYU</span>
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-8 shadow-xl sm:max-w-md sm:rounded-2xl border border-gray-100">
                {children}
            </div>
        </div>
    );
}
