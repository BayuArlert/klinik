import { Head, useForm, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import JadwalController from '../../../actions/App/Http/Controllers/Admin/JadwalController';
import AppLayout from '../../../layouts/AppLayout';

interface Bidan {
    id: number;
    name: string;
}

interface Jadwal {
    id: number;
    bidan_id: number;
    hari: string;
    jam_mulai: string;
    jam_selesai: string;
    kuota: number;
    is_active: boolean;
    bidan?: Bidan;
}

interface PageProps {
    jadwal: Jadwal[];
    bidanList: Bidan[];
    flash?: {
        success?: string;
        error?: string;
    };
}

type ModalMode = 'tambah' | 'edit' | null;

const HARI_LIST = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

function formatTime(value: string): string {
    return value.substring(0, 5);
}

export default function JadwalIndex() {
    const { jadwal, bidanList, flash } = usePage<PageProps>().props;

    const [modalMode, setModalMode] = useState<ModalMode>(null);
    const [editTarget, setEditTarget] = useState<Jadwal | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<Jadwal | null>(null);
    const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    const tambahForm = useForm({
        bidan_id: '',
        hari: 'Senin',
        jam_mulai: '08:00',
        jam_selesai: '14:00',
        kuota: 20,
    });

    const editForm = useForm({
        bidan_id: '',
        hari: 'Senin',
        jam_mulai: '08:00',
        jam_selesai: '14:00',
        kuota: 20,
        is_active: true,
    });

    const deleteForm = useForm({});

    useEffect(() => {
        if (flash?.success) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setNotification({ type: 'success', message: flash.success });
            const t = setTimeout(() => setNotification(null), 4000);

            return () => clearTimeout(t);
        }

        if (flash?.error) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setNotification({ type: 'error', message: flash.error });
            const t = setTimeout(() => setNotification(null), 4000);

            return () => clearTimeout(t);
        }
    }, [flash]);

    function openTambah() {
        tambahForm.reset();
        tambahForm.clearErrors();
        setModalMode('tambah');
    }

    function openEdit(item: Jadwal) {
        editForm.setData({
            bidan_id: item.bidan_id.toString(),
            hari: item.hari,
            jam_mulai: formatTime(item.jam_mulai),
            jam_selesai: formatTime(item.jam_selesai),
            kuota: item.kuota,
            is_active: item.is_active,
        });
        editForm.clearErrors();
        setEditTarget(item);
        setModalMode('edit');
    }

    function submitTambah(e: React.FormEvent) {
        e.preventDefault();
        tambahForm.post(JadwalController.store().url, {
            onSuccess: () => {
                setModalMode(null);
                tambahForm.reset();
            },
        });
    }

    function submitEdit(e: React.FormEvent) {
        e.preventDefault();

        if (!editTarget) {
            return;
        }

        editForm.put(JadwalController.update(editTarget.id).url, {
            onSuccess: () => {
                setModalMode(null);
                setEditTarget(null);
            },
        });
    }

    function openDeleteConfirm(item: Jadwal) {
        setDeleteTarget(item);
    }

    function submitDelete() {
        if (!deleteTarget) {
            return;
        }

        deleteForm.delete(JadwalController.destroy(deleteTarget.id).url, {
            onSuccess: () => setDeleteTarget(null),
            onError: () => setDeleteTarget(null),
        });
    }

    return (
        <AppLayout title="Kelola Jadwal Praktik">
            <Head title="Jadwal Praktik" />

            {notification && (
                <div
                    className={`mb-4 flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium shadow-sm border ${
                        notification.type === 'success'
                            ? 'bg-green-50 text-green-800 border-green-200'
                            : 'bg-red-50 text-red-800 border-red-200'
                    }`}
                >
                    {notification.message}
                </div>
            )}

            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Kelola Jadwal Praktik</h2>
                    <p className="text-sm text-gray-500 mt-1">Atur jadwal praktik bidan dan kuota harian.</p>
                </div>
                <button
                    type="button"
                    onClick={openTambah}
                    className="inline-flex items-center justify-center rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                    Tambah Jadwal
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bidan</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hari</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jam Praktik</th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Kuota</th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {jadwal.length > 0 ? jadwal.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{item.bidan?.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-bold text-gray-900">{item.hari}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {formatTime(item.jam_mulai)} - {formatTime(item.jam_selesai)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <span className="text-sm font-medium text-gray-900">{item.kuota} Pasien</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${item.is_active ? 'bg-teal-100 text-teal-800' : 'bg-red-100 text-red-800'}`}>
                                            {item.is_active ? 'Aktif' : 'Nonaktif'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                                        <button
                                            type="button"
                                            onClick={() => openEdit(item)}
                                            className="text-blue-600 hover:text-blue-900 font-medium transition-colors"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => openDeleteConfirm(item)}
                                            className="text-red-600 hover:text-red-900 font-medium transition-colors"
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-sm text-gray-500">
                                        Belum ada jadwal praktik.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {modalMode === 'tambah' && (
                <ModalOverlay onClose={() => setModalMode(null)}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-5">Tambah Jadwal Praktik</h3>
                    <form onSubmit={submitTambah} className="space-y-4">
                        <FormField label="Bidan" error={tambahForm.errors.bidan_id}>
                            <select
                                value={tambahForm.data.bidan_id}
                                onChange={(e) => tambahForm.setData('bidan_id', e.target.value)}
                                className={inputClass(!!tambahForm.errors.bidan_id)}
                            >
                                <option value="">-- Pilih Bidan --</option>
                                {bidanList.map((bidan) => (
                                    <option key={bidan.id} value={bidan.id}>{bidan.name}</option>
                                ))}
                            </select>
                        </FormField>

                        <FormField label="Hari" error={tambahForm.errors.hari}>
                            <select
                                value={tambahForm.data.hari}
                                onChange={(e) => tambahForm.setData('hari', e.target.value)}
                                className={inputClass(!!tambahForm.errors.hari)}
                            >
                                {HARI_LIST.map((hari) => (
                                    <option key={hari} value={hari}>{hari}</option>
                                ))}
                            </select>
                        </FormField>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField label="Jam Mulai" error={tambahForm.errors.jam_mulai}>
                                <input
                                    type="time"
                                    value={tambahForm.data.jam_mulai}
                                    onChange={(e) => tambahForm.setData('jam_mulai', e.target.value)}
                                    className={inputClass(!!tambahForm.errors.jam_mulai)}
                                />
                            </FormField>

                            <FormField label="Jam Selesai" error={tambahForm.errors.jam_selesai}>
                                <input
                                    type="time"
                                    value={tambahForm.data.jam_selesai}
                                    onChange={(e) => tambahForm.setData('jam_selesai', e.target.value)}
                                    className={inputClass(!!tambahForm.errors.jam_selesai)}
                                />
                            </FormField>
                        </div>

                        <FormField label="Kuota Pasien" error={tambahForm.errors.kuota}>
                            <input
                                type="number"
                                min={1}
                                max={100}
                                value={tambahForm.data.kuota}
                                onChange={(e) => tambahForm.setData('kuota', Number(e.target.value))}
                                className={inputClass(!!tambahForm.errors.kuota)}
                            />
                        </FormField>

                        <div className="flex justify-end gap-3 pt-2">
                            <BtnSecondary type="button" onClick={() => setModalMode(null)}>Batal</BtnSecondary>
                            <BtnPrimary type="submit" disabled={tambahForm.processing}>
                                {tambahForm.processing ? 'Menyimpan...' : 'Simpan'}
                            </BtnPrimary>
                        </div>
                    </form>
                </ModalOverlay>
            )}

            {modalMode === 'edit' && editTarget && (
                <ModalOverlay onClose={() => {
                    setModalMode(null);
                    setEditTarget(null);
                }}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-5">Edit Jadwal: {editTarget.hari}</h3>
                    <form onSubmit={submitEdit} className="space-y-4">
                        <FormField label="Bidan" error={editForm.errors.bidan_id}>
                            <select
                                value={editForm.data.bidan_id}
                                onChange={(e) => editForm.setData('bidan_id', e.target.value)}
                                className={inputClass(!!editForm.errors.bidan_id)}
                            >
                                <option value="">-- Pilih Bidan --</option>
                                {bidanList.map((bidan) => (
                                    <option key={bidan.id} value={bidan.id}>{bidan.name}</option>
                                ))}
                            </select>
                        </FormField>

                        <FormField label="Hari" error={editForm.errors.hari}>
                            <select
                                value={editForm.data.hari}
                                onChange={(e) => editForm.setData('hari', e.target.value)}
                                className={inputClass(!!editForm.errors.hari)}
                            >
                                {HARI_LIST.map((hari) => (
                                    <option key={hari} value={hari}>{hari}</option>
                                ))}
                            </select>
                        </FormField>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField label="Jam Mulai" error={editForm.errors.jam_mulai}>
                                <input
                                    type="time"
                                    value={editForm.data.jam_mulai}
                                    onChange={(e) => editForm.setData('jam_mulai', e.target.value)}
                                    className={inputClass(!!editForm.errors.jam_mulai)}
                                />
                            </FormField>

                            <FormField label="Jam Selesai" error={editForm.errors.jam_selesai}>
                                <input
                                    type="time"
                                    value={editForm.data.jam_selesai}
                                    onChange={(e) => editForm.setData('jam_selesai', e.target.value)}
                                    className={inputClass(!!editForm.errors.jam_selesai)}
                                />
                            </FormField>
                        </div>

                        <FormField label="Kuota Pasien" error={editForm.errors.kuota}>
                            <input
                                type="number"
                                min={1}
                                max={100}
                                value={editForm.data.kuota}
                                onChange={(e) => editForm.setData('kuota', Number(e.target.value))}
                                className={inputClass(!!editForm.errors.kuota)}
                            />
                        </FormField>

                        <div className="flex items-center gap-2">
                            <input
                                id="is_active"
                                type="checkbox"
                                checked={editForm.data.is_active}
                                onChange={(e) => editForm.setData('is_active', e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                            />
                            <label htmlFor="is_active" className="text-sm font-medium text-gray-700">Jadwal aktif</label>
                        </div>

                        <div className="flex justify-end gap-3 pt-2">
                            <BtnSecondary type="button" onClick={() => {
                                setModalMode(null);
                                setEditTarget(null);
                            }}>Batal</BtnSecondary>
                            <BtnPrimary type="submit" disabled={editForm.processing}>
                                {editForm.processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </BtnPrimary>
                        </div>
                    </form>
                </ModalOverlay>
            )}

            {deleteTarget && modalMode === null && (
                <ModalOverlay onClose={() => setDeleteTarget(null)} maxWidth="max-w-sm">
                    <div className="text-center">
                        <h3 className="text-base font-semibold text-gray-900">Hapus Jadwal</h3>
                        <p className="mt-2 text-sm text-gray-500">
                            Apakah Anda yakin ingin menghapus jadwal <span className="font-medium text-gray-800">{deleteTarget.hari}</span> ({deleteTarget.bidan?.name})?
                        </p>
                        <div className="mt-5 flex justify-center gap-3">
                            <BtnSecondary type="button" onClick={() => setDeleteTarget(null)}>Batal</BtnSecondary>
                            <button
                                type="button"
                                disabled={deleteForm.processing}
                                onClick={submitDelete}
                                className="inline-flex items-center rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
                            >
                                {deleteForm.processing ? 'Menghapus...' : 'Ya, Hapus'}
                            </button>
                        </div>
                    </div>
                </ModalOverlay>
            )}
        </AppLayout>
    );
}

function inputClass(hasError: boolean) {
    return `block w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 ${
        hasError ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
    }`;
}

function FormField({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            {children}
            {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </div>
    );
}

function BtnPrimary({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={`inline-flex items-center rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 transition-colors ${props.className ?? ''}`}
        >
            {children}
        </button>
    );
}

function BtnSecondary({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={`inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors ${props.className ?? ''}`}
        >
            {children}
        </button>
    );
}

function ModalOverlay({
    children,
    onClose,
    maxWidth = 'max-w-lg',
}: {
    children: React.ReactNode;
    onClose: () => void;
    maxWidth?: string;
}) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
            <div className={`relative w-full ${maxWidth} rounded-xl bg-white p-6 shadow-2xl`}>
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Tutup"
                >
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                    </svg>
                </button>
                {children}
            </div>
        </div>
    );
}
