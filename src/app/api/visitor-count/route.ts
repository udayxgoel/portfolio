import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const resumeFilePath = path.join(process.cwd(), "src", "data", "resume.tsx");
const visitorCountPattern = /visitorCount:\s*(\d+),/;

async function readVisitorCount() {
  const source = await readFile(resumeFilePath, "utf8");
  const match = source.match(visitorCountPattern);

  if (!match) {
    throw new Error("visitorCount field not found in resume data");
  }

  return {
    source,
    count: Number.parseInt(match[1], 10),
  };
}

export async function GET() {
  try {
    const { count } = await readVisitorCount();
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json(
      { error: "Could not read visitor count" },
      { status: 500 },
    );
  }
}

export async function POST() {
  try {
    const { source, count } = await readVisitorCount();
    const nextCount = count + 1;
    const updatedSource = source.replace(
      visitorCountPattern,
      `visitorCount: ${nextCount},`,
    );

    await writeFile(resumeFilePath, updatedSource, "utf8");

    return NextResponse.json({ count: nextCount });
  } catch {
    return NextResponse.json(
      { error: "Could not increment visitor count" },
      { status: 500 },
    );
  }
}
