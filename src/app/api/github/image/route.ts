import { fetchGitHubRawFile } from "@/lib/github";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MIME_TYPES: Record<string, string> = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  svg: "image/svg+xml",
  webp: "image/webp",
  ico: "image/x-icon",
  avif: "image/avif",
  bmp: "image/bmp",
};

function getMimeType(filePath: string): string {
  const extension = filePath.split(".").pop()?.toLowerCase();
  if (extension && extension in MIME_TYPES) {
    return MIME_TYPES[extension];
  }
  return "application/octet-stream";
}

const PARAM_REGEX = /^[a-zA-Z0-9_.-]+$/;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const owner = searchParams.get("owner");
    const repo = searchParams.get("repo");
    const rawPath = searchParams.get("path");
    const ref = searchParams.get("ref") ?? undefined;

    if (!owner || !repo || !rawPath) {
      return NextResponse.json(
        { error: "Missing required parameters: owner, repo, and path are required" },
        { status: 400 },
      );
    }

    if (!PARAM_REGEX.test(owner) || !PARAM_REGEX.test(repo)) {
      return NextResponse.json(
        { error: "Invalid owner or repo parameter" },
        { status: 400 },
      );
    }

    // Clean path and prevent directory traversal or arbitrary URL proxying
    const cleanPath = rawPath.replace(/^\/+/, "");
    if (
      cleanPath.includes("..") ||
      cleanPath.startsWith("http://") ||
      cleanPath.startsWith("https://") ||
      cleanPath.includes("\0")
    ) {
      return NextResponse.json(
        { error: "Invalid path parameter" },
        { status: 400 },
      );
    }

    if (ref && !PARAM_REGEX.test(ref) && !/^[a-f0-9]{40}$/i.test(ref)) {
      return NextResponse.json(
        { error: "Invalid ref parameter" },
        { status: 400 },
      );
    }

    const githubResponse = await fetchGitHubRawFile(
      owner,
      repo,
      cleanPath,
      ref,
    );

    if (!githubResponse.ok) {
      if (githubResponse.status === 404) {
        return NextResponse.json(
          { error: "Repository image not found" },
          { status: 404 },
        );
      }

      if (githubResponse.status === 401 || githubResponse.status === 403) {
        return NextResponse.json(
          { error: "GitHub authentication or permission error" },
          { status: githubResponse.status },
        );
      }

      return NextResponse.json(
        { error: "Failed to fetch image from GitHub" },
        { status: githubResponse.status },
      );
    }

    const arrayBuffer = await githubResponse.arrayBuffer();
    const githubContentType = githubResponse.headers.get("content-type");
    const inferredMime = getMimeType(cleanPath);

    const contentType =
      inferredMime !== "application/octet-stream"
        ? inferredMime
        : githubContentType?.startsWith("image/")
          ? githubContentType
          : "application/octet-stream";

    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control":
          "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error serving GitHub image:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
