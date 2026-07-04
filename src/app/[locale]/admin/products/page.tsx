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
  type Category,
  type ImageAsset,
  type LocalizedText,
  type PaginationMeta,
  type Product,
  type PublishStatus,
} from "@/lib/admin/api";
import {imageSrc} from "@/lib/image-src";
import {emptyLocalizedText, localize, toLocalizedText} from "@/lib/localized";
const pageSize = 12;

type ProductForm = {
  id?: string;
  title: LocalizedText;
  categoryId: string;
  dosageForm: LocalizedText;
  therapeuticIndication: LocalizedText;
  status: PublishStatus;
  images: ImageAsset[];
};

const emptyForm: ProductForm = {
  title: emptyLocalizedText,
  categoryId: "",
  dosageForm: emptyLocalizedText,
  therapeuticIndication: emptyLocalizedText,
  status: "draft",
  images: [],
};

export default function ProductsPage() {
  const [items, setItems] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState<AdminLanguage>("uz");
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);

  async function load() {
    const [productPage, categoryList] = await Promise.all([
      listAdminPage<Product>("products", page, pageSize),
      listAdminPage<Category>("categories", 1, 100),
    ]);
    setItems(productPage.items);
    setMeta(productPage.meta);
    setCategories(categoryList.items);
    if (!form.categoryId && categoryList.items[0]) {
      setForm((current) => ({...current, categoryId: categoryList.items[0].id}));
    }
  }

  useEffect(() => {
    void Promise.all([
      listAdminPage<Product>("products", page, pageSize),
      listAdminPage<Category>("categories", 1, 100),
    ]).then(([productPage, categoryList]) => {
      setItems(productPage.items);
      setMeta(productPage.meta);
      setCategories(categoryList.items);
      if (categoryList.items[0]) {
        setForm((current) => ({...current, categoryId: current.categoryId || categoryList.items[0].id}));
      }
    }).catch((error: Error) => setError(error.message));
  }, [page]);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");
    const payload = {
      title: form.title,
      categoryId: form.categoryId,
      dosageForm: form.dosageForm,
      therapeuticIndication: form.therapeuticIndication,
      status: form.status,
      images: form.images,
    };
    try {
      if (form.id) {
        await updateAdmin<Product, typeof payload>("products", form.id, payload);
      } else {
        await createAdmin<Product, typeof payload>("products", payload);
      }
      setForm(createEmptyForm(categories[0]?.id));
      setModalOpen(false);
      setPage(1);
      await load();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to save product");
    } finally {
      setSaving(false);
    }
  }

  function openCreateModal() {
    setError("");
    setForm(createEmptyForm(categories[0]?.id));
    setActiveLanguage("uz");
    setModalOpen(true);
  }

  function openEditModal(item: Product) {
    setError("");
    setForm({
      id: item.id,
      title: toLocalizedText(item.title),
      categoryId: item.categoryId,
      dosageForm: toLocalizedText(item.dosageForm),
      therapeuticIndication: toLocalizedText(item.therapeuticIndication),
      status: item.status,
      images: item.images,
    });
    setActiveLanguage("uz");
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setForm(createEmptyForm(categories[0]?.id));
    setError("");
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    setError("");
    try {
      await deleteAdmin("products", deleteTarget.id);
      setDeleteTarget(null);
      await load();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to delete product");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <AdminShell>
      <div className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-950">Products</h1>
            <p className="mt-1 text-sm text-slate-500">Catalog products, category, status and images.</p>
          </div>
          <Button type="button" disabled={!categories.length} onClick={openCreateModal}>New product</Button>
        </div>

        <AdminModal open={modalOpen} title={form.id ? "Edit product" : "New product"} onClose={closeModal} width="lg">
            <LanguageTabs value={activeLanguage} onChange={setActiveLanguage} />
            {error ? <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{error}</p> : null}
            <form className="space-y-4" onSubmit={onSubmit}>
              <LocalizedField label="Product name" value={form.title} language={activeLanguage} onChange={(title) => setForm({...form, title})} required />
              <LocalizedField label="Dosage form" value={form.dosageForm} language={activeLanguage} onChange={(dosageForm) => setForm({...form, dosageForm})} />
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <select className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm" value={form.categoryId} onChange={(event) => setForm({...form, categoryId: event.target.value})} required>
                    {categories.map((category) => <option key={category.id} value={category.id}>{localize(category.title, "uz")}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <select className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm" value={form.status} onChange={(event) => setForm({...form, status: event.target.value as PublishStatus})}>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Therapeutic Indication</Label>
                <RichTextEditor
                  value={form.therapeuticIndication[activeLanguage]}
                  onChange={(therapeuticIndication) => setForm({...form, therapeuticIndication: {...form.therapeuticIndication, [activeLanguage]: therapeuticIndication}})}
                />
              </div>
              <div className="space-y-2"><p className="text-sm font-semibold text-slate-700">Product images</p><ImageUploader value={form.images} onChange={(images) => setForm({...form, images})} /></div>
              <div className="flex gap-2">
                <Button disabled={saving || !categories.length}>{saving ? "Saving..." : "Save product"}</Button>
                <Button type="button" variant="secondary" onClick={closeModal}>Cancel</Button>
              </div>
            </form>
        </AdminModal>

        <Card className="overflow-hidden">
          <CardHeader><CardTitle>Products</CardTitle></CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {items.map((item) => (
              <article key={item.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="relative aspect-[4/3] bg-[#f6f8fc]">
                  {item.images[0] ? <Image src={imageSrc(item.images[0].url)} alt="" fill sizes="260px" className="object-contain p-3" unoptimized /> : <div className="grid size-full place-items-center text-xs font-bold uppercase tracking-[0.16em] text-slate-300">No image</div>}
                  <div className="absolute left-3 top-3"><Badge variant={item.status}>{item.status}</Badge></div>
                </div>
                <div className="p-4">
                  <h3 className="line-clamp-1 text-base font-extrabold text-slate-950">{localize(item.title, "uz")}</h3>
                  <p className="mt-1.5 line-clamp-1 text-[11px] font-bold uppercase tracking-[0.1em] text-blue-700">{localize(item.category?.title, "uz") || "No category"}</p>
                  <p className="mt-1.5 line-clamp-1 text-xs text-slate-500">{localize(item.dosageForm, "uz") || item.slug}</p>
                  <p className="mt-3 line-clamp-2 min-h-10 text-xs leading-5 text-slate-600">{stripHtml(localize(item.therapeuticIndication, "uz"))}</p>
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
          title="Delete product?"
          description={`Product "${localize(deleteTarget?.title, "uz")}" will be permanently deleted.`}
          loading={deleting}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={confirmDelete}
        />
      </div>
    </AdminShell>
  );
}

function createEmptyForm(categoryId = ""): ProductForm {
  return {
    ...emptyForm,
    title: {...emptyLocalizedText},
    dosageForm: {...emptyLocalizedText},
    therapeuticIndication: {...emptyLocalizedText},
    categoryId,
  };
}

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
