import fs from "fs/promises";
import path from "path";
import { buildDefaultCmsStore } from "@/data/cms/defaults";
import type { CmsStore } from "@/types/cms";

const STORE_PATH = path.join(process.cwd(), "data", "cms-store.json");

function mergeStoreWithDefaults(parsed: Partial<CmsStore>): CmsStore {
  const defaults = buildDefaultCmsStore();
  return {
    ...defaults,
    ...parsed,
    hero: { ...defaults.hero, ...parsed.hero },
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
    if (!parsed.productCatalog) {
      const merged = mergeStoreWithDefaults(parsed);
      await writeCmsStore(merged);
      return merged;
    }
    return mergeStoreWithDefaults(parsed);
  } catch {
    const defaults = buildDefaultCmsStore();
    await writeCmsStore(defaults);
    return defaults;
  }
}

export async function writeCmsStore(store: CmsStore): Promise<void> {
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
