"use client";

import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import AdminProductNewForm from "@/components/admin/AdminProductNewForm";
import styles from "../../admin.module.css";

export default function AdminProductNewPage() {
  return (
    <AdminShell
      title="제품 추가"
      actions={
        <Link href="/admin/products" className={styles.btnSecondary}>
          목록으로
        </Link>
      }
    >
      <AdminProductNewForm />
    </AdminShell>
  );
}
