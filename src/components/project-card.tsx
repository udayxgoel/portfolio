import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";

interface Props {
  title: string;
  href?: string;
  description: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  tags,
  link,
  image,
  video,
  links,
  className,
}: Props) {
  const visibleTags = tags.slice(0, 6);

  return (
    <Card
      className={cn(
        "group overflow-hidden rounded-2xl border border-dashed border-border/60 bg-[#0a0a0b] text-zinc-50 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition-all duration-300 ease-out hover:border-zinc-600 hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)] dark:bg-[#0a0a0b]",
        className,
      )}
    >
      <div className="flex flex-col gap-0 sm:flex-row sm:items-stretch">
        <Link
          href={href || "#"}
          className="block px-4 pt-4 sm:w-1/2 sm:py-4 sm:pl-4 sm:pr-0"
        >
          <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-[#0c0c0f]">
            {video ? (
              <video
                src={video}
                autoPlay
                loop
                muted
                playsInline
                className="pointer-events-none h-full w-full object-contain object-center"
              />
            ) : image ? (
              <Image
                src={image}
                alt={title}
                width={800}
                height={450}
                className="pointer-events-none h-full w-full object-contain object-center"
              />
            ) : null}
          </div>
        </Link>

        <div className="flex min-w-0 flex-1 flex-col sm:w-1/2">
          <CardHeader className="space-y-2 p-4 sm:p-4">
            <div className="flex flex-wrap justify-between gap-3">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                    {title}
                  </CardTitle>
                </div>
              </div>

              {/* Link badges (Live, GitHub, etc.) */}
              {links && links.length > 0 ? (
                <div className="flex flex-wrap items-center gap-2">
                  {links.map((item, idx) => (
                    <Link
                      href={item.href}
                      key={`${item.type}-${idx}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex"
                    >
                      <Badge className="flex items-center gap-1.5 rounded-md border border-white/15 bg-white/6 px-2.5 py-1.25 text-xs font-medium text-zinc-100 shadow-none backdrop-blur-sm transition-colors hover:bg-white/12">
                        {item.icon}
                        {item.type}
                      </Badge>
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>

            {/* Description */}
            <Markdown className="line-clamp-2 max-w-full text-pretty text-sm leading-6 text-zinc-300">
              {description}
            </Markdown>
          </CardHeader>

          {/* Tech tags */}
          <CardContent className="p-4 pt-0 text-zinc-300">
            {visibleTags.length > 0 ? (
              <div className="space-y-2.5">
                <p className="text-sm font-semibold text-white">
                  Technologies Used:
                </p>
                <div className="flex flex-wrap gap-1">
                  {visibleTags.map((tag) => (
                    <Badge
                      className="rounded-md border px-2.5 py-0.75 text-[11px] font-medium text-white shadow-none"
                      variant="outline"
                      key={tag}
                    >
                      {tag}
                    </Badge>
                  ))}
                  {tags.length > visibleTags.length ? (
                    <Badge
                      className="rounded-md border px-2.5 py-0.75 text-[11px] font-medium text-white shadow-none"
                      variant="outline"
                    >
                      +{tags.length - visibleTags.length} more
                    </Badge>
                  ) : null}
                </div>
              </div>
            ) : null}
            <div className="hidden font-sans text-xs underline print:visible">
              {link
                ?.replace("https://", "")
                .replace("www.", "")
                .replace("/", "")}
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
