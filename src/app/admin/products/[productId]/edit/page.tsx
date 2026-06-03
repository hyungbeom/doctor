"use client";

import Link from "next/link";
import { use } from "react";
import AdminShell from "@/components/admin/AdminShell";
import AdminProductEditForm from "@/components/admin/AdminProductEditForm";
import { buildProductDetailUrl } from "@/lib/productListUrl";
import styles from "../../../admin.module.css";

type AdminProductEditPageProps = {
  params: Promise<{ productId: string }>;
};

export default function AdminProductEditPage({ params }: AdminProductEditPageProps) {
  const { productId: rawId } = use(params);
  const productId = decodeURIComponent(rawId);

  return (
    <AdminShell
      title="제품 수정"
      actions={
        <>
          <Link
            href={buildProductDetailUrl(productId)}
            className={styles.btnSecondary}
            target="_blank"
            rel="noopener noreferrer"
          >
            미리보기
          </Link>
          <Link href="/admin/products" className={styles.btnSecondary}>
            목록으로
          </Link>
        </>
      }
    >
      <AdminProductEditForm productId={productId} />
    </AdminShell>
  );
}
