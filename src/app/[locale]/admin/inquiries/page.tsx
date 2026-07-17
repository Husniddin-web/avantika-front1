"use client";

import { useEffect, useState } from "react";
import { Mail, Phone, Calendar, Trash2, Eye, CheckCircle2, MessageSquare, AlertTriangle, Inbox } from "lucide-react";

import { AdminShell } from "@/components/admin/admin-shell";
import { DeleteAlertDialog } from "@/components/admin/delete-alert-dialog";
import { AdminModal } from "@/components/admin/admin-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { deleteAdmin, listAdminPage, updateAdmin, type Inquiry } from "@/lib/admin/api";

const typeLabels: Record<Inquiry["type"], string> = {
  general: "General Inquiry",
  partnership: "Partnership Proposal",
  distribution: "Distribution Partnership",
  product: "Product Inquiry",
  pharmacovigilance: "🚨 Pharmacovigilance (Side Effect)",
};

const typeColors: Record<Inquiry["type"], string> = {
  general: "bg-slate-100 text-slate-800 border-slate-200",
  partnership: "bg-purple-100 text-purple-800 border-purple-200",
  distribution: "bg-indigo-100 text-indigo-800 border-indigo-200",
  product: "bg-teal-100 text-teal-800 border-teal-200",
  pharmacovigilance: "bg-red-100 text-red-800 border-red-200 animate-pulse font-bold",
};

const statusColors: Record<Inquiry["status"], string> = {
  new: "bg-rose-50 text-rose-700 border-rose-100",
  read: "bg-blue-50 text-blue-700 border-blue-100",
  resolved: "bg-green-50 text-green-700 border-green-100",
};

export default function InquiriesPage() {
  const [items, setItems] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | Inquiry["type"]>("all");
  
  // Modals & Actions
  const [viewItem, setViewItem] = useState<Inquiry | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Inquiry | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  // Pagination
  const [page, setPage] = useState(1);
  const pageSize = 10;

  async function loadInquiries() {
    try {
      setLoading(true);
      // Fetch up to the maximum limit of 100 items to allow clean client-side instant filter and search
      const response = await listAdminPage<Inquiry>("inquiries", 1, 100);
      setItems(response.items || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load inquiries");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadInquiries();
  }, []);

  async function handleView(item: Inquiry) {
    setViewItem(item);
    // If the inquiry is "new", automatically mark it as "read"
    if (item.status === "new") {
      try {
        const updated = await updateAdmin<Inquiry, { status: "read" }>("inquiries", item.id, { status: "read" });
        // Update local items array
        setItems((prev) => prev.map((x) => (x.id === item.id ? updated : x)));
      } catch (err) {
        console.error("Failed to update status to read:", err);
      }
    }
  }

  async function handleResolve(id: string) {
    setUpdatingStatus(id);
    try {
      const updated = await updateAdmin<Inquiry, { status: "resolved" }>("inquiries", id, { status: "resolved" });
      setItems((prev) => prev.map((x) => (x.id === id ? updated : x)));
      if (viewItem && viewItem.id === id) {
        setViewItem(updated);
      }
    } catch (err) {
      alert("Failed to mark as resolved");
    } finally {
      setUpdatingStatus(null);
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteAdmin("inquiries", deleteTarget.id);
      setItems((prev) => prev.filter((x) => x.id !== deleteTarget.id));
      setDeleteTarget(null);
      if (viewItem && viewItem.id === deleteTarget.id) {
        setViewItem(null);
      }
    } catch (err) {
      alert("Failed to delete inquiry");
    } finally {
      setDeleting(false);
    }
  }

  // Filter and Search Inquiries
  const filtered = items.filter((item) => {
    const matchesTab = activeTab === "all" || item.type === activeTab;
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase()) ||
      item.phone.includes(search) ||
      (item.company && item.company.toLowerCase().includes(search.toLowerCase())) ||
      item.message.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Client Side Pagination calculations
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const paginatedItems = filtered.slice((page - 1) * pageSize, page * pageSize);

  const tabs: { value: "all" | Inquiry["type"]; label: string; count: number }[] = [
    { value: "all", label: "All Inquiries", count: items.length },
    { value: "general", label: "General", count: items.filter((x) => x.type === "general").length },
    { value: "partnership", label: "Partnerships", count: items.filter((x) => x.type === "partnership").length },
    { value: "distribution", label: "Distribution", count: items.filter((x) => x.type === "distribution").length },
    { value: "product", label: "Products", count: items.filter((x) => x.type === "product").length },
    { value: "pharmacovigilance", label: "🚨 Farmakonadzor", count: items.filter((x) => x.type === "pharmacovigilance").length },
  ];

  return (
    <AdminShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-950">Inquiries & Feedback</h1>
          <p className="mt-1 text-sm text-slate-500">Manage partnership proposals, general questions, and pharmacovigilance reports.</p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Scrollable Tabs */}
          <div className="flex gap-1 overflow-x-auto rounded-lg bg-slate-100 p-1">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => {
                  setActiveTab(tab.value);
                  setPage(1);
                }}
                className={`flex shrink-0 items-center gap-2 rounded-md px-3 py-1.5 text-xs font-bold transition ${
                  activeTab === tab.value
                    ? "bg-white text-blue-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {tab.label}
                <span className={`rounded-full px-1.5 py-0.5 text-[10px] ${activeTab === tab.value ? "bg-blue-50 text-blue-800" : "bg-slate-200 text-slate-700"}`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          <div className="w-full lg:max-w-xs">
            <Input
              type="search"
              placeholder="Search inquiries..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="h-9.5 text-xs"
            />
          </div>
        </div>

        {error && <p className="rounded-lg bg-red-50 p-3.5 text-sm font-semibold text-red-700">{error}</p>}

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-bold">List of Submissions ({filtered.length})</CardTitle>
            {loading && <span className="text-xs font-semibold text-slate-400">Loading...</span>}
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="grid h-64 place-items-center text-sm font-semibold text-slate-500">Loading inquiries...</div>
            ) : paginatedItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center text-slate-400">
                <Inbox className="size-12 text-slate-300" />
                <p className="mt-2 text-sm font-bold">No inquiries found</p>
                <p className="mt-1 text-xs max-w-xs">Try selecting a different tab or checking your search query.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/50 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                      <th className="px-6 py-4.5">Sender</th>
                      <th className="px-6 py-4.5">Inquiry Type</th>
                      <th className="px-6 py-4.5">Date</th>
                      <th className="px-6 py-4.5">Status</th>
                      <th className="px-6 py-4.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {paginatedItems.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/30">
                        <td className="px-6 py-4">
                          <div className="font-bold text-slate-950">{item.name}</div>
                          {item.company && <div className="text-[10px] text-slate-400 font-medium">{item.company}</div>}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-bold ${typeColors[item.type]}`}>
                            {typeLabels[item.type]}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="size-3 text-slate-400" />
                            {new Date(item.createdAt).toLocaleDateString(undefined, {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-bold capitalize ${statusColors[item.status]}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="size-8 p-0"
                              onClick={() => handleView(item)}
                              title="View details"
                            >
                              <Eye className="size-3.5" />
                            </Button>
                            {item.status !== "resolved" && (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="size-8 p-0 border-green-200 text-green-700 hover:bg-green-50"
                                onClick={() => handleResolve(item.id)}
                                disabled={updatingStatus === item.id}
                                title="Mark as Resolved"
                              >
                                <CheckCircle2 className="size-3.5" />
                              </Button>
                            )}
                            <Button
                              type="button"
                              variant="danger"
                              size="sm"
                              className="size-8 p-0"
                              onClick={() => setDeleteTarget(item)}
                              title="Delete"
                            >
                              <Trash2 className="size-3.5" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Custom Simple Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
                <span className="text-xs font-semibold text-slate-500">
                  Page {page} of {totalPages}
                </span>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={page === 1}
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  >
                    Previous
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* View Details Modal */}
        <AdminModal
          open={Boolean(viewItem)}
          title={`Inquiry Details`}
          onClose={() => setViewItem(null)}
          width="md"
        >
          {viewItem && (
            <div className="space-y-5 text-sm">
              <div className="flex flex-col gap-2 border-b border-slate-100 pb-4">
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-bold ${typeColors[viewItem.type]}`}>
                    {typeLabels[viewItem.type]}
                  </span>
                  <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-bold capitalize ${statusColors[viewItem.status]}`}>
                    {viewItem.status}
                  </span>
                </div>
                <h3 className="text-lg font-extrabold text-slate-900">{viewItem.name}</h3>
                {viewItem.company && <p className="text-xs font-semibold text-slate-400">{viewItem.company}</p>}
              </div>

              <div className="grid gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-4 text-xs font-medium text-slate-700">
                <div className="flex items-center gap-2">
                  <Mail className="size-4 text-slate-400" />
                  <a href={`mailto:${viewItem.email}`} className="text-blue-700 hover:underline font-bold">
                    {viewItem.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="size-4 text-slate-400" />
                  <a href={`tel:${viewItem.phone}`} className="text-blue-700 hover:underline font-bold">
                    {viewItem.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="size-4 text-slate-400" />
                  <span>
                    {new Date(viewItem.createdAt).toLocaleString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Message Content</h4>
                <div className="whitespace-pre-wrap rounded-xl border border-slate-200 bg-white p-4 text-slate-800 leading-relaxed max-h-60 overflow-y-auto">
                  {viewItem.message}
                </div>
              </div>

              <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
                {viewItem.status !== "resolved" && (
                  <Button
                    type="button"
                    onClick={() => handleResolve(viewItem.id)}
                    disabled={updatingStatus === viewItem.id}
                  >
                    Mark as Resolved
                  </Button>
                )}
                <Button
                  type="button"
                  variant="danger"
                  onClick={() => {
                    setDeleteTarget(viewItem);
                  }}
                >
                  Delete Inquiry
                </Button>
                <Button type="button" variant="secondary" onClick={() => setViewItem(null)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </AdminModal>

        {/* Delete Confirmation Alert */}
        <DeleteAlertDialog
          open={Boolean(deleteTarget)}
          title="Delete Inquiry?"
          description={`Are you sure you want to permanently delete the inquiry from "${deleteTarget?.name}"? This action cannot be undone.`}
          loading={deleting}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={confirmDelete}
        />
      </div>
    </AdminShell>
  );
}
