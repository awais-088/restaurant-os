"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type DeleteGalleryButtonProps = {
  id: string;
};

export default function DeleteGalleryButton({ id }: DeleteGalleryButtonProps) {
  const router = useRouter();

  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this gallery photo?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);

      const response = await fetch(`/api/admin/gallery/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to delete gallery item.");
      }

      router.refresh();
    } catch (error) {
      console.error("Delete gallery error:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to delete gallery item.",
      );
    } finally {
      setDeleting(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={deleting}
      className="rounded-full border border-red-500/30 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-red-400 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {deleting ? "Deleting..." : "Delete"}
    </button>
  );
}
