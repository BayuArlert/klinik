import { Head, useForm, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import AkunController from '../../../actions/App/Http/Controllers/Admin/AkunController';
import AppLayout from '../../../layouts/AppLayout';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    nomor_telepon: string | null;
}

interface PageProps {
    users: {
        data: User[];
        links: any[];
        meta: any;
    };
    filters: {
        role?: string;
        search?: string;
    };
    flash?: {
        success?: string;
        error?: string;
    };
}

type ModalMode = 'tambah' | 'edit' | null;

export default function AkunIndex() {
    const { users, flash } = usePage<PageProps>().props;

    const [modalMode, setModalMode] = useState<ModalMode>(null);
    const [editTarget, setEditTarget] = useState<User | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<User | null>(null);
    const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    // ── Tambah form ──────────────────────────────────────────────────────────
    const tambahForm = useForm({
        name: '',
        email: '',
        password: '',
        role: 'bidan' as string,
        nomor_telepon: '',
    });

    // ── Edit form ─────────────────────────────────────────────────────────────
    const editForm = useForm({
        name: '',
        email: '',
        password: '',
        role: '' as string,
        nomor_telepon: '',
    });

    // ── Delete form ───────────────────────────────────────────────────────────
    const deleteForm = useForm({});

    // ── Flash notification ────────────────────────────────────────────────────
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

    // ── Handlers ──────────────────────────────────────────────────────────────
    function openTambah() {
        tambahForm.reset();
        tambahForm.clearErrors();
        setModalMode('tambah');
    }

    function openEdit(user: User) {
        editForm.setData({
            name: user.name,
            email: user.email,
            password: '',
            role: user.role,
            nomor_telepon: user.nomor_telepon ?? '',
        });
        editForm.clearErrors();
        setEditTarget(user);
        setModalMode('edit');
    }

    function submitTambah(e: React.FormEvent) {
        e.preventDefault();
        tambahForm.post(AkunController.store().url, {
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

        editForm.put(AkunController.update(editTarget.id).url, {
            onSuccess: () => {
                setModalMode(null);
                setEditTarget(null);
            },
        });
    }

    function openDeleteConfirm(user: User) {
        setDeleteTarget(user);
    }

    function submitDelete() {
        if (!deleteTarget) {
 return; 
}

        deleteForm.delete(AkunController.destroy(deleteTarget.id).url, {
            onSuccess: () => setDeleteTarget(null),
            onError: () => setDeleteTarget(null),
        });
    }

    const roleColor: Record<string, string> = {
        admin:  'bg-purple-100 text-purple-800',
        bidan:  'bg-blue-100 text-blue-800',
        pasien: 'bg-gray-100 text-gray-700',
    };

    return (
        <AppLayout title="Kelola Akun Pegawai">
            <Head title="Akun Pegawai" />

            {/* ── Notification ── */}
            {notification && (
                <div
                    className={`mb-4 flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium shadow-sm border ${
                        notification.type === 'success'
                            ? 'bg-green-50 text-green-800 border-green-200'
                            : 'bg-red-50 text-red-800 border-red-200'
                    }`}
                >
                    {notification.type === 'success' ? (
                        <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                        </svg>
                    ) : (
                        <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                        </svg>
                    )}
                    {notification.message}
                </div>
            )}

            {/* ── Header ── */}
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Kelola Akun Pegawai</h2>
                    <p className="text-sm text-gray-500 mt-1">Daftar akun Admin dan Bidan/Petugas Medis.</p>
                </div>
                <button
                    id="btn-tambah-akun"
                    onClick={openTambah}
                    className="inline-flex items-center justify-center rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/>
                    </svg>
                    Tambah Akun
                </button>
            </div>

            {/* ── Table ── */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Pegawai</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kontak</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.data.length > 0 ? users.data.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 flex-shrink-0 rounded-full bg-rose-100 flex items-center justify-center text-rose-700 font-bold text-sm">
                                                {item.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{item.email}</div>
                                        <div className="text-xs text-gray-500">{item.nomor_telepon || '-'}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${roleColor[item.role] ?? 'bg-gray-100 text-gray-700'}`}>
                                            {item.role.charAt(0).toUpperCase() + item.role.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                                        <button
                                            id={`btn-edit-${item.id}`}
                                            onClick={() => openEdit(item)}
                                            className="text-blue-600 hover:text-blue-900 font-medium transition-colors"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            id={`btn-hapus-${item.id}`}
                                            onClick={() => openDeleteConfirm(item)}
                                            className="text-red-600 hover:text-red-900 font-medium transition-colors"
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-sm text-gray-500">
                                        Belum ada data akun pegawai.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ── Modal Tambah ── */}
            {modalMode === 'tambah' && (
                <ModalOverlay onClose={() => setModalMode(null)}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-5">Tambah Akun Pegawai</h3>
                    <form id="form-tambah-akun" onSubmit={submitTambah} className="space-y-4">
                        <FormField label="Nama Lengkap" error={tambahForm.errors.name}>
                            <input
                                id="tambah-name"
                                type="text"
                                value={tambahForm.data.name}
                                onChange={e => tambahForm.setData('name', e.target.value)}
                                className={inputClass(!!tambahForm.errors.name)}
                                placeholder="Contoh: Bidan Sari"
                            />
                        </FormField>

                        <FormField label="Email" error={tambahForm.errors.email}>
                            <input
                                id="tambah-email"
                                type="email"
                                value={tambahForm.data.email}
                                onChange={e => tambahForm.setData('email', e.target.value)}
                                className={inputClass(!!tambahForm.errors.email)}
                                placeholder="email@klinik.com"
                            />
                        </FormField>

                        <FormField label="Password" error={tambahForm.errors.password}>
                            <input
                                id="tambah-password"
                                type="password"
                                value={tambahForm.data.password}
                                onChange={e => tambahForm.setData('password', e.target.value)}
                                className={inputClass(!!tambahForm.errors.password)}
                                placeholder="Min. 8 karakter"
                            />
                        </FormField>

                        <FormField label="Role" error={tambahForm.errors.role}>
                            <select
                                id="tambah-role"
                                value={tambahForm.data.role}
                                onChange={e => tambahForm.setData('role', e.target.value)}
                                className={inputClass(!!tambahForm.errors.role)}
                            >
                                <option value="bidan">Bidan / Petugas Medis</option>
                                <option value="admin">Administrator</option>
                            </select>
                        </FormField>

                        <FormField label="Nomor Telepon (Opsional)" error={tambahForm.errors.nomor_telepon}>
                            <input
                                id="tambah-nomor-telepon"
                                type="text"
                                value={tambahForm.data.nomor_telepon}
                                onChange={e => tambahForm.setData('nomor_telepon', e.target.value)}
                                className={inputClass(!!tambahForm.errors.nomor_telepon)}
                                placeholder="08xxxxxxxxxx"
                            />
                        </FormField>

                        <div className="flex justify-end gap-3 pt-2">
                            <BtnSecondary type="button" onClick={() => setModalMode(null)}>Batal</BtnSecondary>
                            <BtnPrimary id="btn-submit-tambah" type="submit" disabled={tambahForm.processing}>
                                {tambahForm.processing ? 'Menyimpan...' : 'Simpan'}
                            </BtnPrimary>
                        </div>
                    </form>
                </ModalOverlay>
            )}

            {/* ── Modal Edit ── */}
            {modalMode === 'edit' && editTarget && (
                <ModalOverlay onClose={() => {
 setModalMode(null); setEditTarget(null); 
}}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-5">Edit Akun: {editTarget.name}</h3>
                    <form id="form-edit-akun" onSubmit={submitEdit} className="space-y-4">
                        <FormField label="Nama Lengkap" error={editForm.errors.name}>
                            <input
                                id="edit-name"
                                type="text"
                                value={editForm.data.name}
                                onChange={e => editForm.setData('name', e.target.value)}
                                className={inputClass(!!editForm.errors.name)}
                            />
                        </FormField>

                        <FormField label="Email" error={editForm.errors.email}>
                            <input
                                id="edit-email"
                                type="email"
                                value={editForm.data.email}
                                onChange={e => editForm.setData('email', e.target.value)}
                                className={inputClass(!!editForm.errors.email)}
                            />
                        </FormField>

                        <FormField label="Password Baru (kosongkan jika tidak diubah)" error={editForm.errors.password}>
                            <input
                                id="edit-password"
                                type="password"
                                value={editForm.data.password}
                                onChange={e => editForm.setData('password', e.target.value)}
                                className={inputClass(!!editForm.errors.password)}
                                placeholder="Min. 8 karakter"
                            />
                        </FormField>

                        <FormField label="Role" error={editForm.errors.role}>
                            <select
                                id="edit-role"
                                value={editForm.data.role}
                                onChange={e => editForm.setData('role', e.target.value)}
                                className={inputClass(!!editForm.errors.role)}
                            >
                                <option value="bidan">Bidan / Petugas Medis</option>
                                <option value="admin">Administrator</option>
                                <option value="pasien">Pasien</option>
                            </select>
                        </FormField>

                        <FormField label="Nomor Telepon (Opsional)" error={editForm.errors.nomor_telepon}>
                            <input
                                id="edit-nomor-telepon"
                                type="text"
                                value={editForm.data.nomor_telepon}
                                onChange={e => editForm.setData('nomor_telepon', e.target.value)}
                                className={inputClass(!!editForm.errors.nomor_telepon)}
                            />
                        </FormField>

                        <div className="flex justify-end gap-3 pt-2">
                            <BtnSecondary type="button" onClick={() => {
 setModalMode(null); setEditTarget(null); 
}}>Batal</BtnSecondary>
                            <BtnPrimary id="btn-submit-edit" type="submit" disabled={editForm.processing}>
                                {editForm.processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </BtnPrimary>
                        </div>
                    </form>
                </ModalOverlay>
            )}

            {/* ── Modal Konfirmasi Hapus ── */}
            {deleteTarget && modalMode === null && (
                <ModalOverlay onClose={() => setDeleteTarget(null)} maxWidth="max-w-sm">
                    <div className="text-center">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                            </svg>
                        </div>
                        <h3 className="text-base font-semibold text-gray-900">Hapus Akun</h3>
                        <p className="mt-2 text-sm text-gray-500">
                            Apakah Anda yakin ingin menghapus akun <span className="font-medium text-gray-800">{deleteTarget.name}</span>? Tindakan ini tidak dapat dibatalkan.
                        </p>
                        <div className="mt-5 flex justify-center gap-3">
                            <BtnSecondary id="btn-batal-hapus" type="button" onClick={() => setDeleteTarget(null)}>Batal</BtnSecondary>
                            <button
                                id="btn-konfirmasi-hapus"
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

// ── Helpers ───────────────────────────────────────────────────────────────────

function inputClass(hasError: boolean) {
    return `block w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 ${
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
            className={`inline-flex items-center rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 disabled:opacity-50 transition-colors ${props.className ?? ''}`}
        >
            {children}
        </button>
    );
}

function BtnSecondary({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={`inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 transition-colors ${props.className ?? ''}`}
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
            {/* backdrop */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
            {/* panel */}
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
