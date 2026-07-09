import { Link } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';
import React from 'react';

export default function GuestLayout({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 pt-6 sm:justify-center sm:pt-0">
            <div>
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-600 text-white shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                        </svg>
                    </div>
                    <span className="text-3xl font-bold tracking-tight text-teal-700">Klinik Sehat</span>
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-8 shadow-xl sm:max-w-md sm:rounded-2xl border border-gray-100">
                {children}
            </div>
        </div>
    );
}
