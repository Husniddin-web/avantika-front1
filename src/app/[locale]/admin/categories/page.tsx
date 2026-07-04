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
import {createAdmin, deleteAdmin, listAdminPage, updateAdmin, type Category, type ImageAsset, type LocalizedText, type PaginationMeta} from "@/lib/admin/api";
import {imageSrc} from "@/lib/image-src";
import {emptyLocalizedText, localize, toLocalizedText} from "@/lib/localized";

type CategoryForm = {
  id?: string;
  title: LocalizedText;
  description: LocalizedText;
  image: ImageAsset[];
};

const emptyForm: CategoryForm = {title: emptyLocalizedText, description: emptyLocalizedText, image: []};
const pageSize = 10;

export default function CategoriesPage() {
  const [items, setItems] = useState<Category[]>([]);
  const [form, setForm] = useState<CategoryForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState<AdminLanguage>("uz");
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);

  async function load() {
    const response = await listAdminPage<Category>("categories", page, pageSize);
    setItems(response.items);
    setMeta(response.meta);
  }

  useEffect(() => {
    void Promise.resolve()
      .then(async () => {
        const response = await listAdminPage<Category>("categories", page, pageSize);
        setItems(response.items);
        setMeta(response.meta);
      })
      .catch((error: Error) => setError(error.message));
  }, [page]);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");
    const payload = {
      title: form.title,
      description: form.description,
      image: form.image[0],
    };
    try {
      if (form.id) {
        await updateAdmin<Category, typeof payload>("categories", form.id, payload);
      } else {
        await createAdmin<Category, typeof payload>("categories", payload);
      }
      setForm(emptyForm);
      setModalOpen(false);
      setPage(1);
      await load();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to save category");
    } finally {
      setSaving(false);
    }
  }

  function openCreateModal() {
    setError("");
    setForm({...emptyForm, title: {...emptyLocalizedText}, description: {...emptyLocalizedText}});
    setActiveLanguage("uz");
    setModalOpen(true);
  }

  function openEditModal(item: Category) {
    setError("");
    setForm({id: item.id, title: toLocalizedText(item.title), description: toLocalizedText(item.description), image: item.image ? [item.image] : []});
    setActiveLanguage("uz");
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setForm({...emptyForm, title: {...emptyLocalizedText}, description: {...emptyLocalizedText}});
    setError("");
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    setError("");
    try {
      await deleteAdmin("categories", deleteTarget.id);
      setDeleteTarget(null);
      await load();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to delete category");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <AdminShell>
      <div className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-950">Categories</h1>
            <p className="mt-1 text-sm text-slate-500">Product categories and catalog icons.</p>
          </div>
          <Button type="button" onClick={openCreateModal}>New category</Button>
        </div>

        <AdminModal open={modalOpen} title={form.id ? "Edit category" : "New category"} onClose={closeModal} width="md">
            <LanguageTabs value={activeLanguage} onChange={setActiveLanguage} />
            {error ? <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{error}</p> : null}
            <form className="space-y-4" onSubmit={onSubmit}>
              <LocalizedField label="Title" value={form.title} language={activeLanguage} onChange={(title) => setForm({...form, title})} required />
              <LocalizedField label="Description" value={form.description} language={activeLanguage} onChange={(description) => setForm({...form, description})} textarea />
              <div className="space-y-2">
                <p className="text-sm font-semibold text-slate-700">Category image</p>
                <ImageUploader value={form.image} multiple={false} onChange={(image) => setForm({...form, image})} />
              </div>
              <div className="flex gap-2">
                <Button disabled={saving}>{saving ? "Saving..." : "Save category"}</Button>
                <Button type="button" variant="secondary" onClick={closeModal}>Cancel</Button>
              </div>
            </form>
        </AdminModal>

        <Card className="overflow-hidden">
          <CardHeader><CardTitle>Categories</CardTitle></CardHeader>
          <CardContent className="overflow-x-auto p-0">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-slate-50 text-xs font-extrabold uppercase tracking-[0.12em] text-slate-500">
                <tr>
                  <th className="px-5 py-3">Image</th>
                  <th className="px-5 py-3">Title</th>
                  <th className="px-5 py-3">Description</th>
                  <th className="px-5 py-3">Updated</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.map((item) => (
                  <tr key={item.id} className="bg-white">
                    <td className="px-5 py-4">
                      <div className="relative size-14 overflow-hidden rounded-xl bg-blue-50">
                        {item.image ? <Image src={imageSrc(item.image.url)} alt="" fill sizes="56px" className="object-contain p-1.5" unoptimized /> : <div className="grid size-full place-items-center text-[10px] font-bold text-blue-200">IMG</div>}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-extrabold text-slate-950">{localize(item.title, "uz")}</p>
                      <p className="mt-1 text-xs text-slate-400">/{item.slug}</p>
                    </td>
                    <td className="max-w-xl px-5 py-4">
                      <p className="line-clamp-2 text-slate-600">{localize(item.description, "uz") || "-"}</p>
                    </td>
                    <td className="px-5 py-4 text-slate-500">
                      {new Date(item.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" size="sm" onClick={() => openEditModal(item)}>Edit</Button>
                        <Button type="button" variant="danger" size="sm" onClick={() => setDeleteTarget(item)}>Delete</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
          {meta ? <PaginationControls meta={meta} onPageChange={setPage} /> : null}
        </Card>
        <DeleteAlertDialog
          open={Boolean(deleteTarget)}
          title="Delete category?"
          description={`Category "${localize(deleteTarget?.title, "uz")}" will be permanently deleted.`}
          loading={deleting}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={confirmDelete}
        />
      </div>
    </AdminShell>
  );
}
