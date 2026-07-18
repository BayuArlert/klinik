import { Link, usePage } from '@inertiajs/react';
import type { PropsWithChildren} from 'react';
import React, { useState } from 'react';
import { logout } from '@/routes';
import admin from '@/routes/admin';
import bidan from '@/routes/bidan';
import pasien from '@/routes/pasien';

export default function AppLayout({ children, title }: PropsWithChildren<{ title?: string }>) {
    const { auth } = usePage<any>().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const menuItems = {
        pasien: [
            { name: 'Dashboard', href: pasien.dashboard.url(), icon: 'layout' },
            { name: 'Pendaftaran', href: pasien.pendaftaran.index.url(), icon: 'clipboard' },
        ],
        bidan: [
            { name: 'Dashboard', href: bidan.dashboard.url(), icon: 'layout' },
            { name: 'Pasien', href: bidan.pasien.index.url(), icon: 'users' },
            { name: 'Antrian', href: bidan.antrian.index.url(), icon: 'list' },
        ],
        admin: [
            { name: 'Dashboard', href: admin.dashboard.url(), icon: 'layout' },
            { name: 'Pasien', href: admin.pasien.index.url(), icon: 'users' },
            { name: 'Pendaftaran', href: admin.pendaftaran.index.url(), icon: 'clipboard' },
            { name: 'Jadwal Praktik', href: admin.jadwal.index.url(), icon: 'calendar' },
            { name: 'Kelola Akun', href: admin.akun.index.url(), icon: 'shield' },
            { name: 'Laporan', href: admin.laporan.index.url(), icon: 'file-text' },
        ],
    };

    const currentMenu = menuItems[auth.user.role as keyof typeof menuItems] || [];
    const userInitial = auth.user.name?.charAt(0)?.toUpperCase() ?? '?';
    const roleLabel = auth.user.role.charAt(0).toUpperCase() + auth.user.role.slice(1);

    const getIcon = (name: string) => {
        switch (name) {
            case 'layout': return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>;
            case 'clipboard': return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>;
            case 'users': return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
            case 'list': return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>;
            case 'calendar': return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>;
            case 'shield': return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
            case 'file-text': return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>;
            default: return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-teal-900 text-white transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex h-16 items-center px-6 bg-teal-950">
                    <Link href="/" className="flex items-center gap-2">
                        <img src="/logo.png" alt="Praktek Bidan Ayu Logo" className="h-10 w-10 object-contain rounded-full border-2 border-white shadow-sm" />
                        <span className="text-lg font-bold tracking-wide">PRAKTEK BIDAN AYU</span>
                    </Link>
                </div>
                
                <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                    {currentMenu.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                                window.location.pathname.startsWith(new URL(item.href, window.location.origin).pathname) 
                                    ? 'bg-teal-800 text-white' 
                                    : 'text-teal-100 hover:bg-teal-800/50 hover:text-white'
                            }`}
                        >
                            {getIcon(item.icon)}
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="border-t border-teal-800 p-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-700 text-sm font-bold text-white">
                            {userInitial}
                        </div>
                        <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-white">{auth.user.name}</p>
                            <p className="truncate text-xs text-teal-300">{roleLabel}</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-gray-900/50 md:hidden" 
                    onClick={() => setSidebarOpen(false)} 
                />
            )}

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <header className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 shadow-sm sm:px-6 lg:px-8">
                    <div className="flex items-center">
                        <button 
                            type="button" 
                            className="mr-4 text-gray-500 hover:text-gray-700 md:hidden"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
                        </button>
                        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <div
                                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-teal-700 sm:hidden"
                                title={`${auth.user.name} (${auth.user.role})`}
                            >
                                {userInitial}
                            </div>
                            <div className="text-sm font-medium text-gray-700 hidden sm:block">
                                {auth.user.name} <span className="text-gray-400 font-normal">({auth.user.role})</span>
                            </div>
                        </div>
                        <Link 
                            href={logout.url()} 
                            method="post" 
                            as="button"
                            className="rounded-full bg-gray-100 p-2 text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
                        </Link>
                    </div>
                </header>

                <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}


