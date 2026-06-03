import fs from "fs/promises";
import path from "path";
import { buildDefaultCmsStore } from "@/data/cms/defaults";
import type { CmsStore } from "@/types/cms";

const STORE_PATH = path.join(process.cwd(), "data", "cms-store.json");

/** Vercel 등 서버리스에서는 프로젝트 디렉터리에 쓰기 불가(읽기 전용) */
export function canPersistCmsStore(): boolean {
  return process.env.VERCEL !== "1";
}

function mergeStoreWithDefaults(parsed: Partial<CmsStore>): CmsStore {
  const defaults = buildDefaultCmsStore();
  return {
    ...defaults,
    ...parsed,
    hero: {
      ...defaults.hero,
      ...parsed.hero,
      subline2: parsed.hero?.subline2 ?? defaults.hero.subline2,
      englishLine: parsed.hero?.englishLine ?? defaults.hero.englishLine,
    },
    gnb: parsed.gnb ?? defaults.gnb,
    productCatalog: parsed.productCatalog ?? defaults.productCatalog,
    boardPosts: parsed.boardPosts ?? defaults.boardPosts,
    members: parsed.members ?? defaults.members,
    quotes: parsed.quotes ?? defaults.quotes,
    demos: parsed.demos ?? defaults.demos,
    inquiries: parsed.inquiries ?? defaults.inquiries,
    notificationTemplates: parsed.notificationTemplates ?? defaults.notificationTemplates,
    notificationLogs: parsed.notificationLogs ?? defaults.notificationLogs,
  };
}

export async function readCmsStore(): Promise<CmsStore> {
  try {
    const raw = await fs.readFile(STORE_PATH, "utf-8");
    const parsed = JSON.parse(raw) as Partial<CmsStore>;
    return mergeStoreWithDefaults(parsed);
  } catch {
    return buildDefaultCmsStore();
  }
}

export async function writeCmsStore(store: CmsStore): Promise<void> {
  if (!canPersistCmsStore()) {
    throw new Error(
      "CMS 파일 저장은 로컬 개발 환경에서만 가능합니다. Vercel에서는 외부 스토리지(DB·Blob 등) 연동이 필요합니다.",
    );
  }
  await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
  const next: CmsStore = {
    ...store,
    updatedAt: new Date().toISOString(),
  };
  await fs.writeFile(STORE_PATH, JSON.stringify(next, null, 2), "utf-8");
}

export async function updateCmsStore(
  updater: (current: CmsStore) => CmsStore,
): Promise<CmsStore> {
  const current = await readCmsStore();
  const next = updater(current);
  await writeCmsStore(next);
  return next;
}
