import type { BoardPost, BoardPostType } from "@/data/boardData";
import { boardPostUrl } from "@/data/boardData";
import { readCmsStore } from "@/lib/cms/store";
import type { CmsHero, CmsGnbItem } from "@/types/cms";

export async function getPublicCms() {
  const store = await readCmsStore();
  return {
    hero: store.hero,
    gnb: store.gnb,
    boardPosts: store.boardPosts,
    ...deriveBoardLists(store.boardPosts),
  };
}

export function deriveBoardLists(posts: BoardPost[]) {
  return {
    siteNotices: posts
      .filter((post) => post.type === "notice")
      .map((post) => ({
        id: post.id,
        title: post.title,
        date: post.date,
        href: boardPostUrl(post.id),
      })),
    news: posts
      .filter((post) => post.type === "news")
      .map((post) => ({
        id: post.id,
        title: post.title,
        source: post.source ?? "",
        date: post.date,
        image: post.image ?? "",
        href: boardPostUrl(post.id),
      })),
    boardFaqItems: posts
      .filter((post) => post.type === "faq")
      .map((post) => ({
        id: post.id,
        question: post.title,
        answer: post.content,
        href: boardPostUrl(post.id),
      })),
  };
}

export async function getBoardPostFromCms(id: string): Promise<BoardPost | undefined> {
  const store = await readCmsStore();
  return store.boardPosts.find((post) => post.id === id);
}

export async function getMypageCmsSnapshot(memberId?: string) {
  const store = await readCmsStore();
  const filterMember = (row: { memberId?: string }) =>
    !memberId || !row.memberId || row.memberId === memberId;

  return {
    quotes: store.quotes.filter(filterMember),
    demos: store.demos.filter(filterMember),
    inquiries: store.inquiries.filter(filterMember),
    members: store.members,
  };
}

export type { CmsHero, CmsGnbItem };
