import { NextResponse } from "next/server";
import { getPublicCms } from "@/lib/cms/public";

export async function GET() {
  const data = await getPublicCms();
  return NextResponse.json(data);
}
