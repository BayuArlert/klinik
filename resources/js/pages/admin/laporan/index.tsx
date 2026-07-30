import { Head, router, usePage } from '@inertiajs/react';
import React, { useState } from 'react';
import { index as laporanIndex, exportMethod } from '@/routes/admin/laporan';
import AppLayout from '../../../layouts/AppLayout';

interface Pemeriksaan {
    diagnosa?: string;
    tekanan_darah?: string;
    berat_badan?: number;
    tinggi_badan?: number;
    resep?: string;
}

interface Bidan {
    name: string;
}

interface Jadwal {
    bidan?: Bidan;
}

interface Pasien {
    name: string;
}

interface LaporanItem {
    id: number;
    nomor_antrian: string;
    tanggal_daftar: string;
    keluhan: string;
    status: string;
    pasien?: Pasien;
    jadwal?: Jadwal;
    pemeriksaan?: Pemeriksaan;
}

interface Ringkasan {
    total: number;
    selesai: number;
    menunggu: number;
    dibatalkan: number;
}

interface Filters {
    tanggal_mulai?: string;
    tanggal_selesai?: string;
    status?: string;
}

interface PageProps {
    laporan: {
        data: LaporanItem[];
        links: any[];
        meta: any;
    };
    ringkasan: Ringkasan;
    filters: Filters;
}

const STATUS_COLOR: Record<string, string> = {
    selesai:    'bg-rose-100 text-rose-800',
    menunggu:   'bg-yellow-100 text-yellow-800',
    dibatalkan: 'bg-red-100 text-red-800',
    diproses:   'bg-blue-100 text-blue-800',
};

export default function LaporanIndex() {
    const { laporan, ringkasan, filters } = usePage<PageProps>().props;

    const [tanggalMulai, setTanggalMulai] = useState(filters.tanggal_mulai ?? '');
    const [tanggalSelesai, setTanggalSelesai] = useState(filters.tanggal_selesai ?? '');
    const [status, setStatus] = useState(filters.status ?? '');

    function handleFilter(e: React.FormEvent) {
        e.preventDefault();
        router.get(laporanIndex.url(), {
            tanggal_mulai: tanggalMulai || undefined,
            tanggal_selesai: tanggalSelesai || undefined,
            status: status || undefined,
        } as any, { preserveState: true });
    }

    function exportUrl() {
        const params = new URLSearchParams();

        if (tanggalMulai)   {
 params.set('tanggal_mulai', tanggalMulai); 
}

        if (tanggalSelesai) {
 params.set('tanggal_selesai', tanggalSelesai); 
}

        if (status)         {
 params.set('status', status); 
}

        const qs = params.toString();

        return exportMethod.url() + (qs ? '?' + qs : '');
    }

    return (
        <AppLayout title="Laporan Kunjungan Pasien">
            <Head title="Laporan" />

            {/* ── Header ── */}
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Laporan Kunjungan Pasien</h2>
                    <p className="text-sm text-gray-500 mt-1">Rekap data pendaftaran dan kunjungan pasien.</p>
                </div>
            </div>

            {/* ── Ringkasan statistik ── */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <StatCard label="Total Kunjungan" value={ringkasan.total} color="rose" />
                <StatCard label="Selesai" value={ringkasan.selesai} color="green" />
                <StatCard label="Menunggu" value={ringkasan.menunggu} color="yellow" />
                <StatCard label="Dibatalkan" value={ringkasan.dibatalkan} color="red" />
            </div>

            {/* ── Filter ── */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
                <div className="p-5">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">Filter Laporan</h3>
                    <form onSubmit={handleFilter} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Mulai Tanggal</label>
                            <input
                                id="filter-tanggal-mulai"
                                type="date"
                                value={tanggalMulai}
                                onChange={e => setTanggalMulai(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Sampai Tanggal</label>
                            <input
                                id="filter-tanggal-selesai"
                                type="date"
                                value={tanggalSelesai}
                                onChange={e => setTanggalSelesai(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                            <select
                                id="filter-status"
                                value={status}
                                onChange={e => setStatus(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                            >
                                <option value="">Semua Status</option>
                                <option value="selesai">Selesai</option>
                                <option value="menunggu">Menunggu</option>
                                <option value="dibatalkan">Dibatalkan</option>
                            </select>
                        </div>
                        <div className="flex gap-2">
                            <button
                                id="btn-terapkan-filter"
                                type="submit"
                                className="flex-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-3 text-sm transition-colors"
                            >
                                Terapkan
                            </button>
                            <a
                                id="btn-export-csv"
                                href={exportUrl()}
                                className="flex-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-medium py-2 px-3 text-sm transition-colors text-center"
                            >
                                Export CSV
                            </a>
                        </div>
                    </form>
                </div>
            </div>

            {/* ── Tabel ── */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No. Antrian</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Pasien</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bidan</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diagnosa</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {laporan.data.length > 0 ? laporan.data.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {new Date(item.tanggal_daftar).toLocaleDateString('id-ID', {
                                            day: '2-digit', month: 'short', year: 'numeric',
                                        })}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-rose-600">
                                        {item.nomor_antrian}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {item.pasien?.name ?? '-'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {item.jadwal?.bidan?.name ?? '-'}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                                        {item.pemeriksaan?.diagnosa ?? '-'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_COLOR[item.status] ?? 'bg-gray-100 text-gray-700'}`}>
                                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                                        </span>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-10 text-center text-sm text-gray-500">
                                        Tidak ada data yang sesuai dengan filter laporan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* ── Pagination ── */}
                {laporan.meta && laporan.meta.last_page > 1 && (
                    <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-between text-sm text-gray-500">
                        <span>
                            Menampilkan {laporan.meta.from}–{laporan.meta.to} dari {laporan.meta.total} data
                        </span>
                        <div className="flex gap-1">
                            {laporan.links.map((link: any, i: number) => (
                                <button
                                    key={i}
                                    disabled={!link.url || link.active}
                                    onClick={() => link.url && router.get(link.url, {}, { preserveState: true })}
                                    className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                                        link.active
                                            ? 'bg-rose-600 text-white'
                                            : link.url
                                                ? 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                                                : 'bg-white border border-gray-200 text-gray-300 cursor-default'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

// ── StatCard ──────────────────────────────────────────────────────────────────

type Color = 'rose' | 'green' | 'yellow' | 'red';

const colorMap: Record<Color, { bg: string; text: string; num: string }> = {
    rose:   { bg: 'bg-rose-50',   text: 'text-rose-700',   num: 'text-rose-600' },
    green:  { bg: 'bg-green-50',  text: 'text-green-700',  num: 'text-green-600' },
    yellow: { bg: 'bg-yellow-50', text: 'text-yellow-700', num: 'text-yellow-600' },
    red:    { bg: 'bg-red-50',    text: 'text-red-700',    num: 'text-red-600' },
};

function StatCard({ label, value, color }: { label: string; value: number; color: Color }) {
    const c = colorMap[color];

    return (
        <div className={`rounded-xl border border-gray-200 ${c.bg} p-4`}>
            <p className={`text-xs font-medium ${c.text} mb-1`}>{label}</p>
            <p className={`text-3xl font-bold ${c.num}`}>{value}</p>
        </div>
    );
}
