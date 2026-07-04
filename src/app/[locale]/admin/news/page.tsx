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
import {RichTextEditor} from "@/components/admin/rich-text-editor";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {
  createAdmin,
  deleteAdmin,
  listAdminPage,
  updateAdmin,
  type ImageAsset,
  type LocalizedText,
  type NewsArticle,
  type PaginationMeta,
  type PublishStatus,
} from "@/lib/admin/api";
import {imageSrc} from "@/lib/image-src";
import {emptyLocalizedText, localize, toLocalizedText} from "@/lib/localized";

type NewsForm = {
  id?: string;
  title: LocalizedText;
  content: LocalizedText;
  status: PublishStatus;
  images: ImageAsset[];
};

const emptyForm: NewsForm = {
  title: emptyLocalizedText,
  content: emptyLocalizedText,
  status: "draft",
  images: [],
};
const pageSize = 12;

export default function NewsPage() {
  const [items, setItems] = useState<NewsArticle[]>([]);
  const [form, setForm] = useState<NewsForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState<AdminLanguage>("uz");
  const [deleteTarget, setDeleteTarget] = useState<NewsArticle | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);

  async function load() {
    const response = await listAdminPage<NewsArticle>("news", page, pageSize);
    setItems(response.items);
    setMeta(response.meta);
  }

  useEffect(() => {
    void Promise.resolve()
      .then(async () => {
        const response = await listAdminPage<NewsArticle>("news", page, pageSize);
        setItems(response.items);
        setMeta(response.meta);
      })
      .catch((error: Error) => setError(error.message));
  }, [page]);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");
    const {id, ...payload} = form;
    try {
      if (id) {
        await updateAdmin<NewsArticle, typeof payload>("news", id, payload);
      } else {
        await createAdmin<NewsArticle, typeof payload>("news", payload);
      }
      setForm(createEmptyForm());
      setModalOpen(false);
      setPage(1);
      await load();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to save news");
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

  function openEditModal(item: NewsArticle) {
    setError("");
    setForm({id: item.id, title: toLocalizedText(item.title), content: toLocalizedText(item.content), status: item.status, images: item.images});
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
      await deleteAdmin("news", deleteTarget.id);
      setDeleteTarget(null);
      await load();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to delete news");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <AdminShell>
      <div className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-950">News</h1>
            <p className="mt-1 text-sm text-slate-500">Articles, publication status and images.</p>
          </div>
          <Button type="button" onClick={openCreateModal}>New news</Button>
        </div>

        <AdminModal open={modalOpen} title={form.id ? "Edit news" : "New news"} onClose={closeModal} width="xl">
            <LanguageTabs value={activeLanguage} onChange={setActiveLanguage} />
            {error ? <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{error}</p> : null}
            <form className="space-y-4" onSubmit={onSubmit}>
              <LocalizedField label="Title" value={form.title} language={activeLanguage} onChange={(title) => setForm({...form, title})} required />
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Status</Label>
                  <select className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm" value={form.status} onChange={(event) => setForm({...form, status: event.target.value as PublishStatus})}>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Content</Label>
                <RichTextEditor value={form.content[activeLanguage]} onChange={(content) => setForm({...form, content: {...form.content, [activeLanguage]: content}})} />
              </div>
              <div className="space-y-2"><p className="text-sm font-semibold text-slate-700">News images</p><ImageUploader value={form.images} onChange={(images) => setForm({...form, images})} /></div>
              <div className="flex gap-2">
                <Button disabled={saving}>{saving ? "Saving..." : "Save news"}</Button>
                <Button type="button" variant="secondary" onClick={closeModal}>Cancel</Button>
              </div>
            </form>
        </AdminModal>

        <Card className="overflow-hidden">
          <CardHeader><CardTitle>News</CardTitle></CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {items.map((item) => (
              <article key={item.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-slate-100 to-blue-50">
                  {item.images[0] ? (
                    <Image src={imageSrc(item.images[0].url)} alt="" fill sizes="280px" className="object-cover" unoptimized />
                  ) : (
                    <div className="grid size-full place-items-center text-xs font-bold uppercase tracking-[0.16em] text-slate-300">No image</div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-slate-950/40 to-transparent" />
                  <div className="absolute left-3 top-3"><Badge variant={item.status}>{item.status}</Badge></div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="line-clamp-1 text-base font-extrabold text-slate-950">{localize(item.title, "uz")}</h3>
                      <p className="mt-1.5 text-xs font-semibold text-slate-400">{new Date(item.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                  <p className="mt-3 line-clamp-2 min-h-10 text-xs leading-5 text-slate-600">{stripHtml(localize(item.content, "uz"))}</p>
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
          title="Delete news?"
          description={`News "${localize(deleteTarget?.title, "uz")}" will be permanently deleted.`}
          loading={deleting}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={confirmDelete}
        />
      </div>
    </AdminShell>
  );
}

function createEmptyForm(): NewsForm {
  return {
    ...emptyForm,
    title: {...emptyLocalizedText},
    content: {...emptyLocalizedText},
  };
}

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
