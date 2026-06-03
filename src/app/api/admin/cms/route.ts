import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { readCmsStore, updateCmsStore } from "@/lib/cms/store";
import type { CmsStore } from "@/types/cms";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const store = await readCmsStore();
  return NextResponse.json(store);
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as Partial<CmsStore>;
  const store = await updateCmsStore((current) => ({
    ...current,
    ...body,
    version: current.version,
    boardPosts: body.boardPosts ?? current.boardPosts,
    gnb: body.gnb ?? current.gnb,
    hero: body.hero ? { ...current.hero, ...body.hero } : current.hero,
    members: body.members ?? current.members,
    quotes: body.quotes ?? current.quotes,
    demos: body.demos ?? current.demos,
    inquiries: body.inquiries ?? current.inquiries,
    notificationTemplates: body.notificationTemplates ?? current.notificationTemplates,
    notificationLogs: body.notificationLogs ?? current.notificationLogs,
    productCatalog: body.productCatalog ?? current.productCatalog,
  }));

  return NextResponse.json(store);
}
