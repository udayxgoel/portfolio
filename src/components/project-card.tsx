"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Github, Globe, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type KeyboardEvent, type MouseEvent } from "react";
import { createPortal } from "react-dom";
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
    type: string;
    href: string;
  }[];
  className?: string;
}

type ModalType = "details" | "skills" | null;

function ProjectLinkIcon({ type }: { type: string }) {
  if (type.toLowerCase() === "github") {
    return <Github className="size-3.5" aria-hidden="true" />;
  }

  return <Globe className="size-3.5" aria-hidden="true" />;
}

export function ProjectCard({
  title,
  description,
  tags,
  link,
  image,
  video,
  links,
  className,
}: Props) {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [hasImageError, setHasImageError] = useState(false);
  const visibleTags = tags.slice(0, 6);
  const extraTagCount = tags.length - visibleTags.length;
  const modalTitleId = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-project-modal-title`;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!activeModal) {
      return;
    }

    function handleEscape(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        closeModal();
      }
    }

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [activeModal]);

  function openModal(modal: Exclude<ModalType, null>) {
    setActiveModal(modal);
  }

  function closeModal() {
    setActiveModal(null);
  }

  function stopCardClick(event: MouseEvent<HTMLElement>) {
    event.stopPropagation();
  }

  function handleCardKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    openModal("details");
  }

  return (
    <>
      <Card
        role="button"
        tabIndex={0}
        onClick={() => openModal("details")}
        onKeyDown={handleCardKeyDown}
        className={cn(
          "group cursor-pointer overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-xs transition-all duration-200 ease-out hover:border-border/80 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          className,
        )}
      >
        <div className="flex flex-col gap-0 sm:flex-row sm:items-stretch">
          <div className="block px-4 pt-4 sm:w-1/2 sm:py-4 sm:pl-4 sm:pr-0">
            <div className="relative aspect-video overflow-hidden rounded-xl border border-border/60 bg-muted/40">
              {video ? (
                <video
                  src={video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="pointer-events-none h-full w-full object-cover object-center"
                />
              ) : image && !hasImageError ? (
                <Image
                  src={image}
                  alt={title}
                  width={800}
                  height={450}
                  onError={() => setHasImageError(true)}
                  className="pointer-events-none h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
                />
              ) : null}
            </div>
          </div>

          <div className="flex min-w-0 flex-1 flex-col sm:w-1/2">
            <CardHeader className="space-y-2 p-4 sm:p-4">
              <div className="flex flex-wrap justify-between gap-3">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg font-semibold tracking-tight text-card-foreground sm:text-xl transition-colors group-hover:text-primary">
                      {title}
                    </CardTitle>
                  </div>
                </div>

                {links && links.length > 0 ? (
                  <div className="flex flex-wrap items-center gap-2">
                    {links.map((item, idx) => (
                      <Link
                        href={item.href}
                        key={`${item.type}-${idx}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex"
                        onClick={stopCardClick}
                      >
                        <Badge className="flex items-center gap-1.5 rounded-lg border border-border bg-secondary/80 px-2.5 py-1 text-xs font-medium text-secondary-foreground shadow-2xs transition-colors hover:bg-secondary">
                          <ProjectLinkIcon type={item.type} />
                          {item.type}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>

              <Markdown className="line-clamp-2 max-w-full text-pretty text-sm leading-relaxed text-muted-foreground">
                {description}
              </Markdown>
            </CardHeader>

            <CardContent className="p-4 pt-0 text-muted-foreground">
              {visibleTags.length > 0 ? (
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">
                    Technologies Used:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {visibleTags.map((tag) => (
                      <Badge
                        className="rounded-md border border-border/80 bg-muted/60 px-2.5 py-0.75 text-[11px] font-medium text-foreground shadow-2xs"
                        variant="outline"
                        key={tag}
                      >
                        {tag}
                      </Badge>
                    ))}
                    {extraTagCount > 0 ? (
                      <button
                        type="button"
                        onClick={(event) => {
                          stopCardClick(event);
                          openModal("skills");
                        }}
                        className="inline-flex items-center rounded-md border border-border/80 bg-muted/60 px-2.5 py-0.75 text-[11px] font-medium text-foreground shadow-2xs transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        +{extraTagCount} more
                      </button>
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

      {activeModal && isMounted
        ? createPortal(
            (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs px-4 py-6"
          onClick={closeModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={modalTitleId}
            className="scrollbar-hide max-h-[86vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-border bg-card p-5 text-card-foreground shadow-2xl"
            onClick={stopCardClick}
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h3
                  id={modalTitleId}
                  className="text-xl font-semibold tracking-tight text-card-foreground"
                >
                  {activeModal === "skills" ? `${title} Skills` : title}
                </h3>
                {activeModal === "details" ? (
                  <p className="mt-1 text-sm text-muted-foreground">
                    Full project details
                  </p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/50 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Close modal"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>

            {activeModal === "details" ? (
              <div className="space-y-4">
                {(video || (image && !hasImageError)) && (
                  <div className="relative aspect-video overflow-hidden rounded-xl border border-border/60 bg-muted/40">
                    {video ? (
                      <video
                        src={video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="h-full w-full object-cover object-center"
                      />
                    ) : image && !hasImageError ? (
                      <Image
                        src={image}
                        alt={title}
                        width={900}
                        height={506}
                        onError={() => setHasImageError(true)}
                        className="h-full w-full object-cover object-center"
                      />
                    ) : null}
                  </div>
                )}

                <Markdown className="max-w-full text-pretty text-sm leading-relaxed text-muted-foreground">
                  {description}
                </Markdown>

                {links && links.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {links.map((item, idx) => (
                      <Link
                        href={item.href}
                        key={`${item.type}-modal-${idx}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex"
                      >
                        <Badge className="flex items-center gap-1.5 rounded-lg border border-border bg-secondary/80 px-2.5 py-1 text-xs font-medium text-secondary-foreground transition-colors hover:bg-secondary">
                          <ProjectLinkIcon type={item.type} />
                          {item.type}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}

            <div
              className={cn(
                "flex flex-wrap gap-1.5",
                activeModal === "details" && "mt-4",
              )}
            >
              {tags.map((tag) => (
                <Badge
                  className="rounded-md border border-border/80 bg-muted/60 px-2.5 py-1 text-xs font-medium text-foreground shadow-2xs"
                  variant="outline"
                  key={`${title}-${tag}`}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
            ),
            document.body,
          )
        : null}
    </>
  );
}
