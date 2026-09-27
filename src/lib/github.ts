import path from "node:path";

export type GitHubRepository = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  homepage: string | null;
  topics: string[];
  fork: boolean;
  archived: boolean;
  private: boolean;
  pushed_at: string;
  default_branch: string;
  owner: {
    login: string;
  };
};

export type GitHubProjectPreview = {
  id: number;
  title: string;
  description: string;
  image: string | null;
  technologies: string[];
  websiteLink: string | null;
  sourceLink: string;
  isPortfolioProject: boolean;
  updatedAt: string;
};

function getGitHubHeaders() {
  const token = process.env.GITHUB_TOKEN;

  return {
    Accept: "application/vnd.github+json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function fetchGitHubRawFile(
  owner: string,
  repo: string,
  filePath: string,
  ref?: string,
) {
  const cleanPath = filePath.replace(/^\/+/, "");
  const searchParams = new URLSearchParams();
  if (ref) {
    searchParams.set("ref", ref);
  }
  const queryString = searchParams.toString();
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${cleanPath}${queryString ? `?${queryString}` : ""}`;

  const token = process.env.GITHUB_TOKEN;
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.raw+json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  return fetch(url, {
    headers,
    next: { revalidate: 3600 },
  });
}

type GitHubReadmeResponse = {
  content: string;
  encoding: string;
  path: string;
};

function decodeBase64Content(content: string) {
  return Buffer.from(content, "base64").toString("utf8");
}

function extractFirstMarkdownImage(markdown: string) {
  const markdownImageMatch = markdown.match(/!\[[^\]]*\]\(([^)\s]+)[^)]*\)/);
  return markdownImageMatch?.[1] ?? null;
}

function extractMarkdownSection(markdown: string, heading: string) {
  const lines = markdown.split("\n");
  const normalizedHeading = heading.trim().toLowerCase();
  let sectionStartIndex = -1;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index].trim();

    if (!line.startsWith("## ")) {
      continue;
    }

    const headingText = line
      .replace(/^##\s+/, "")
      .trim()
      .toLowerCase();

    if (headingText.includes(normalizedHeading)) {
      sectionStartIndex = index + 1;
      break;
    }
  }

  if (sectionStartIndex === -1) {
    return null;
  }

  const sectionLines: string[] = [];

  for (let index = sectionStartIndex; index < lines.length; index += 1) {
    const line = lines[index];

    if (line.trim().startsWith("## ")) {
      break;
    }

    sectionLines.push(line);
  }

  return sectionLines.join("\n").trim() || null;
}

function cleanTechnologyLabel(value: string) {
  const withoutDescription = value.split(":")[0]?.trim() ?? value.trim();
  return withoutDescription.replace(/\*\*/g, "").trim();
}

function extractTechnologiesFromMarkdown(markdown: string) {
  const techStackSection = extractMarkdownSection(markdown, "Tech Stack");

  if (!techStackSection) {
    return [];
  }

  return techStackSection
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => /^[-*]\s+/.test(line))
    .map((line) => line.replace(/^[-*]\s+/, "").trim())
    .map(cleanTechnologyLabel)
    .filter(Boolean);
}

function resolveReadmeImageUrl(
  repository: GitHubRepository,
  readmePath: string,
  rawImagePath: string,
) {
  const imagePath = rawImagePath.split("?")[0].split("#")[0];

  const githubBlobMatch = imagePath.match(
    /^(?:https?:)?\/\/(?:www\.)?github\.com\/([^/]+)\/([^/]+)\/blob\/([^/]+)\/(.+)$/i,
  );
  if (githubBlobMatch) {
    const [, owner, repo, ref, pathStr] = githubBlobMatch;
    return `/api/github/image?owner=${encodeURIComponent(owner)}&repo=${encodeURIComponent(repo)}&path=${encodeURIComponent(pathStr)}&ref=${encodeURIComponent(ref)}`;
  }

  const githubRawMatch = imagePath.match(
    /^(?:https?:)?\/\/raw\.githubusercontent\.com\/([^/]+)\/([^/]+)\/([^/]+)\/(.+)$/i,
  );
  if (githubRawMatch) {
    const [, owner, repo, ref, pathStr] = githubRawMatch;
    return `/api/github/image?owner=${encodeURIComponent(owner)}&repo=${encodeURIComponent(repo)}&path=${encodeURIComponent(pathStr)}&ref=${encodeURIComponent(ref)}`;
  }

  if (/^(?:https?:)?\/\//i.test(imagePath)) {
    return imagePath;
  }

  const readmeDirectory = path.posix.dirname(readmePath);
  const normalizedImagePath = imagePath.startsWith("/")
    ? imagePath.slice(1)
    : path.posix.normalize(path.posix.join(readmeDirectory, imagePath));

  const cleanPath = normalizedImagePath.replace(/^\/+/, "");

  return `/api/github/image?owner=${encodeURIComponent(repository.owner.login)}&repo=${encodeURIComponent(repository.name)}&path=${encodeURIComponent(cleanPath)}&ref=${encodeURIComponent(repository.default_branch)}`;
}

async function getRepositoryReadme(repository: GitHubRepository) {
  const response = await fetch(
    `https://api.github.com/repos/${repository.owner.login}/${repository.name}/readme`,
    {
      headers: getGitHubHeaders(),
      next: { revalidate: 300 },
    },
  );

  if (!response.ok) {
    return null;
  }

  const readme = (await response.json()) as GitHubReadmeResponse;

  if (readme.encoding !== "base64") {
    return null;
  }

  return {
    path: readme.path,
    markdown: decodeBase64Content(readme.content),
  };
}

export async function getGitHubRepositories(username: string) {
  const response = await fetch(
    `https://api.github.com/user/repos?per_page=100&sort=updated&visibility=all`,
    {
      headers: getGitHubHeaders(),
      next: { revalidate: 300 },
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch GitHub repos for ${username}`);
  }

  const repositories = (await response.json()) as GitHubRepository[];

  return repositories.sort(
    // no more filtering out private
    (first, second) =>
      new Date(second.pushed_at).getTime() -
      new Date(first.pushed_at).getTime(),
  );
}

export async function mapRepositoryToProjectPreview(
  repository: GitHubRepository,
): Promise<GitHubProjectPreview> {
  const readme = await getRepositoryReadme(repository);
  const image =
    readme &&
    (() => {
      const firstImage = extractFirstMarkdownImage(readme.markdown);
      return firstImage
        ? resolveReadmeImageUrl(repository, readme.path, firstImage)
        : null;
    })();
  const technologies = readme
    ? extractTechnologiesFromMarkdown(readme.markdown)
    : [];

  return {
    id: repository.id,
    title: repository.name,
    description: repository.description ?? "No description added yet.",
    image,
    technologies,
    websiteLink: repository.homepage || null,
    sourceLink: repository.html_url,
    isPortfolioProject: repository.topics.includes("portfolio"),
    updatedAt: repository.pushed_at,
  };
}

export async function getGitHubProjectPreviews(username: string) {
  const repositories = await getGitHubRepositories(username);
  return Promise.all(repositories.map(mapRepositoryToProjectPreview));
}
