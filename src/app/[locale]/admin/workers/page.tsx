"use client";

import Image from "next/image";
import {FormEvent, useEffect, useState} from "react";

import {AdminModal} from "@/components/admin/admin-modal";
import {AdminShell} from "@/components/admin/admin-shell";
import {DeleteAlertDialog} from "@/components/admin/delete-alert-dialog";
import {ImageUploader} from "@/components/admin/image-uploader";
import {LanguageTabs, type AdminLanguage} from "@/components/admin/language-tabs";
import {LocalizedField} from "@/components/admin/localized-field";
import {PaginationControls} from "@/components/admin/pagination-controls";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {createAdmin, deleteAdmin, listAdminPage, updateAdmin, type ImageAsset, type LocalizedText, type PaginationMeta, type Worker} from "@/lib/admin/api";
import {imageSrc} from "@/lib/image-src";
import {emptyLocalizedText, localize, toLocalizedText} from "@/lib/localized";

type WorkerForm = {
  id?: string;
  fullName: LocalizedText;
  role: LocalizedText;
  bio: LocalizedText;
  sortOrder: number;
  image: ImageAsset[];
};

const emptyForm: WorkerForm = {fullName: emptyLocalizedText, role: emptyLocalizedText, bio: emptyLocalizedText, sortOrder: 0, image: []};
const pageSize = 12;

export default function WorkersPage() {
  const [items, setItems] = useState<Worker[]>([]);
  const [form, setForm] = useState<WorkerForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState<AdminLanguage>("uz");
  const [deleteTarget, setDeleteTarget] = useState<Worker | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);

  async function load() {
    const response = await listAdminPage<Worker>("workers", page, pageSize);
    setItems(response.items);
    setMeta(response.meta);
  }

  useEffect(() => {
    void Promise.resolve()
      .then(async () => {
        const response = await listAdminPage<Worker>("workers", page, pageSize);
        setItems(response.items);
        setMeta(response.meta);
      })
      .catch((error: Error) => setError(error.message));
  }, [page]);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");
    const {id, ...rest} = form;
    const payload = {...rest, image: form.image[0]};
    try {
      if (id) {
        await updateAdmin<Worker, typeof payload>("workers", id, payload);
      } else {
        await createAdmin<Worker, typeof payload>("workers", payload);
      }
      setForm(createEmptyForm());
      setModalOpen(false);
      setPage(1);
      await load();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to save worker");
    } finally {
      setSaving(false);
    }
  }

  function openCreateModal() {
    setError("");
    setForm(createEmptyForm());
    setActiveLanguage("uz");
    setModalOpen(true);
  }

  function openEditModal(item: Worker) {
    setError("");
    setForm({id: item.id, fullName: toLocalizedText(item.fullName), role: toLocalizedText(item.role), bio: toLocalizedText(item.bio), sortOrder: item.sortOrder, image: item.image ? [item.image] : []});
    setActiveLanguage("uz");
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setForm(createEmptyForm());
    setError("");
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    setError("");
    try {
      await deleteAdmin("workers", deleteTarget.id);
      setDeleteTarget(null);
      await load();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to delete worker");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <AdminShell>
      <div className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-950">Workers</h1>
            <p className="mt-1 text-sm text-slate-500">Team members shown on the website.</p>
          </div>
          <Button type="button" onClick={openCreateModal}>New worker</Button>
        </div>

        <AdminModal open={modalOpen} title={form.id ? "Edit worker" : "New worker"} onClose={closeModal} width="md">
            <LanguageTabs value={activeLanguage} onChange={setActiveLanguage} />
            {error ? <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{error}</p> : null}
            <form className="space-y-4" onSubmit={onSubmit}>
              <LocalizedField label="Full name" value={form.fullName} language={activeLanguage} onChange={(fullName) => setForm({...form, fullName})} required />
              <LocalizedField label="Role" value={form.role} language={activeLanguage} onChange={(role) => setForm({...form, role})} required />
              <div className="space-y-2"><Label>Sort order</Label><Input type="number" value={form.sortOrder} onChange={(event) => setForm({...form, sortOrder: Number(event.target.value)})} /></div>
              <LocalizedField label="Bio" value={form.bio} language={activeLanguage} onChange={(bio) => setForm({...form, bio})} textarea />
              <div className="space-y-2"><p className="text-sm font-semibold text-slate-700">Photo</p><ImageUploader value={form.image} multiple={false} onChange={(image) => setForm({...form, image})} /></div>
              <div className="flex gap-2">
                <Button disabled={saving}>{saving ? "Saving..." : "Save worker"}</Button>
                <Button type="button" variant="secondary" onClick={closeModal}>Cancel</Button>
              </div>
            </form>
        </AdminModal>

        <Card className="overflow-hidden">
          <CardHeader><CardTitle>Workers</CardTitle></CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {items.map((item) => (
              <article key={item.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="relative aspect-[16/10] bg-slate-100">
                  {item.image ? <Image src={imageSrc(item.image.url)} alt="" fill sizes="320px" className="object-cover object-top" unoptimized /> : <div className="grid size-full place-items-center text-xs font-bold uppercase tracking-[0.16em] text-slate-300">No photo</div>}
                  <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-slate-950/45 to-transparent" />
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-extrabold text-blue-800 shadow-sm">#{item.sortOrder}</span>
                </div>
                <div className="p-4">
                  <h3 className="line-clamp-1 text-base font-extrabold text-slate-950">{localize(item.fullName, "uz")}</h3>
                  <p className="mt-1 line-clamp-1 text-xs font-semibold text-blue-700">{localize(item.role, "uz")}</p>
                  <p className="mt-2 line-clamp-1 min-h-5 text-xs leading-5 text-slate-500">{localize(item.bio, "uz")}</p>
                </div>
                <div className="flex justify-end gap-2 border-t border-slate-100 bg-slate-50/60 px-4 py-3">
                  <Button type="button" variant="outline" size="sm" onClick={() => openEditModal(item)}>Edit</Button>
                  <Button type="button" variant="danger" size="sm" onClick={() => setDeleteTarget(item)}>Delete</Button>
                </div>
              </article>
            ))}
          </CardContent>
          {meta ? <PaginationControls meta={meta} onPageChange={setPage} /> : null}
        </Card>
        <DeleteAlertDialog
          open={Boolean(deleteTarget)}
          title="Delete worker?"
          description={`Worker "${localize(deleteTarget?.fullName, "uz")}" will be permanently deleted.`}
          loading={deleting}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={confirmDelete}
        />
      </div>
    </AdminShell>
  );
}

function createEmptyForm(): WorkerForm {
  return {
    ...emptyForm,
    fullName: {...emptyLocalizedText},
    role: {...emptyLocalizedText},
    bio: {...emptyLocalizedText},
  };
}
