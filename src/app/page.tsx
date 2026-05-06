import { Icons } from "@/components/icons";
import { CurrentTime } from "@/components/current-time";
import { GitHubCalendarCard } from "@/components/github-calendar-card";
import { LiveVisitorCount } from "@/components/live-visitor-count";
import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";
import { getGitHubProjectPreviews } from "@/lib/github";
import {
  CheckCircle2,
  Clock3,
  Download,
  ExternalLink,
  Heart,
  Mail,
  MapPin,
  Target,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Markdown from "react-markdown";

const BLUR_FADE_DELAY = 0.04;

export default async function Page() {
  const xProfileUrl = DATA.contact.social.X.url;
  const xHandle = xProfileUrl.split("/").filter(Boolean).pop() ?? "";
  const emailLink = DATA.contact.social.email.url;
  const resumeLink = DATA.contact.social.Resume.url;
  const githubProfileUrl = DATA.contact.social.GitHub.url;
  const githubUsername =
    githubProfileUrl.split("/").filter(Boolean).pop() ?? "";
  const projectPreviews = await getGitHubProjectPreviews(githubUsername);
  const portfolioProjects = projectPreviews.filter(
    (project) => project.isPortfolioProject,
  );
  const skillsMid = Math.ceil(DATA.skills.length / 2);
  const topSkills = DATA.skills.slice(0, skillsMid);
  const bottomSkills = DATA.skills.slice(skillsMid);

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <BlurFade delay={BLUR_FADE_DELAY * 2.5}>
        <header className="relative left-1/2 w-screen -translate-x-1/2 px-6 py-3 text-sm my-2">
          <div className="mx-auto flex w-full items-center justify-between gap-4">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {DATA.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="h-4 w-4" aria-hidden="true" />
              <CurrentTime />
            </span>
          </div>
        </header>
      </BlurFade>

      <section id="hero" aria-labelledby="hero-heading">
        <div className="mx-auto w-full max-w-2xl">
          <div className="flex items-center gap-6">
            <BlurFade delay={BLUR_FADE_DELAY}>
              <Avatar className="size-28 rounded-xl">
                <AvatarImage
                  alt={DATA.name}
                  src={DATA.avatarUrl}
                  className="h-full w-full object-cover"
                />
                <AvatarFallback className="rounded-xl">
                  {DATA.initials}
                </AvatarFallback>
              </Avatar>
            </BlurFade>

            <div className="flex min-w-0 flex-1 flex-col space-y-2">
              <BlurFade delay={BLUR_FADE_DELAY}>
                <h1
                  id="hero-heading"
                  className="flex min-w-0 items-center gap-2 text-[1.8rem] font-bold leading-none tracking-tight"
                >
                  <span className="truncate">{DATA.name}</span>
                  <span className="inline-flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="h-5 w-5 text-[#009cf5] select-none"
                    >
                      <path
                        fill="currentColor"
                        d="M24 12a4.454 4.454 0 0 0-2.564-3.91 4.437 4.437 0 0 0-.948-4.578 4.436 4.436 0 0 0-4.577-.948A4.44 4.44 0 0 0 12 0a4.423 4.423 0 0 0-3.9 2.564 4.434 4.434 0 0 0-2.43-.178 4.425 4.425 0 0 0-2.158 1.126 4.42 4.42 0 0 0-1.12 2.156 4.42 4.42 0 0 0 .183 2.421A4.456 4.456 0 0 0 0 12a4.465 4.465 0 0 0 2.576 3.91 4.433 4.433 0 0 0 .936 4.577 4.459 4.459 0 0 0 4.577.95A4.454 4.454 0 0 0 12 24a4.439 4.439 0 0 0 3.91-2.563 4.26 4.26 0 0 0 5.526-5.526A4.453 4.453 0 0 0 24 12Zm-13.709 4.917-4.38-4.378 1.652-1.663 2.646 2.646L15.83 7.4l1.72 1.591-7.258 7.926Z"
                      />
                    </svg>
                  </span>
                </h1>
              </BlurFade>

              <BlurFade delay={BLUR_FADE_DELAY * 1.5}>
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href={xProfileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-fit text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    @{xHandle}
                  </Link>
                </div>
              </BlurFade>

              <BlurFade delay={BLUR_FADE_DELAY * 1.5}>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-md border border-[#10233a] bg-[#06111f] px-2 py-1 text-xs font-medium text-[#e6f1ff] shadow-[0_0_0_1px_rgba(6,17,31,0.6)]">
                    <Target
                      className="h-3.5 w-3.5 text-orange-400 animate-pulse"
                      aria-hidden="true"
                    />
                    Focusing
                  </span>
                </div>
              </BlurFade>
            </div>
          </div>
        </div>
      </section>
      <section id="about">
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <Markdown className="prose max-w-full text-pretty font-sans text-base leading-[1.7] text-muted-foreground dark:prose-invert">
            {DATA.summary}
          </Markdown>
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 4.5}>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Link
              href={emailLink}
              className="inline-flex items-center gap-2 rounded-md border border-zinc-700/80 bg-gradient-to-b from-zinc-900 to-zinc-950 px-3 py-1.5 text-sm font-medium text-zinc-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-colors hover:border-zinc-500"
            >
              <Mail className="h-3.5 w-3.5 text-zinc-400" aria-hidden="true" />
              Email Me
            </Link>

            <Link
              href={resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-zinc-700/80 bg-gradient-to-b from-zinc-900 to-zinc-950 px-3 py-1.5 text-sm font-medium text-zinc-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-colors hover:border-zinc-500"
            >
              <Download
                className="h-3.5 w-3.5 text-zinc-400"
                aria-hidden="true"
              />
              Download CV
            </Link>
          </div>
        </BlurFade>
      </section>
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="inline-flex w-fit border border-dashed border-border/80 px-3 py-1 text-xl font-bold">
              My Skills
            </h2>
          </BlurFade>
          <div className="relative overflow-hidden py-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-background to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-background to-transparent" />

            <BlurFade delay={BLUR_FADE_DELAY * 10}>
              <div className="skill-marquee skill-marquee-left mb-3 items-center">
                {[...topSkills, ...topSkills].map((skill, idx) => (
                  <div
                    key={`${skill.name}-top-${idx}`}
                    className="inline-flex shrink-0 items-center gap-2 rounded-md border border-border/70 bg-muted/40 px-2.5 py-1.5 text-sm font-medium"
                  >
                    <Image
                      src={skill.logo}
                      alt={`${skill.name} logo`}
                      className="h-4 w-4 object-contain"
                      loading="lazy"
                      width={16}
                      height={16}
                    />
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </BlurFade>

            <BlurFade delay={BLUR_FADE_DELAY * 10.5}>
              <div className="skill-marquee skill-marquee-right items-center">
                {[...bottomSkills, ...bottomSkills].map((skill, idx) => (
                  <div
                    key={`${skill.name}-bottom-${idx}`}
                    className="inline-flex shrink-0 items-center gap-2 rounded-md border border-border/70 bg-muted/40 px-2.5 py-1.5 text-sm font-medium"
                  >
                    <Image
                      src={skill.logo}
                      alt={`${skill.name} logo`}
                      className="h-4 w-4 object-contain"
                      loading="lazy"
                      width={16}
                      height={16}
                    />
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </BlurFade>
          </div>
        </div>
      </section>

      <section id="work" aria-labelledby="work-heading">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2
              id="work-heading"
              className="inline-flex w-fit border border-dashed border-border/80 px-3 py-1 text-xl font-bold"
            >
              Work Experience
            </h2>
          </BlurFade>
          {DATA.work.map((work, id) => (
            <BlurFade
              key={work.company}
              delay={BLUR_FADE_DELAY * 6 + id * 0.05}
            >
              <article className="rounded-lg border border-dashed border-border/70 bg-card/30 p-3.5 sm:p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex min-w-0 items-start gap-3">
                    <Avatar className="size-12 rounded-md border">
                      <AvatarImage
                        src={work.logoUrl}
                        alt={work.company}
                        className="object-contain"
                      />
                      <AvatarFallback>{work.company[0]}</AvatarFallback>
                    </Avatar>

                    <div className="min-w-0 space-y-1 md:space-y-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-semibold leading-none tracking-tight sm:text-lg">
                          {work.company}
                        </h3>
                        <ExternalLink
                          className="h-3.5 w-3.5 text-muted-foreground"
                          aria-hidden="true"
                        />
                        <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/15 px-2 py-0.5 text-xs font-medium text-emerald-500">
                          <CheckCircle2
                            className="h-3.5 w-3.5"
                            aria-hidden="true"
                          />
                          {work.end === "Present" ? "Ongoing" : "Completed"}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground sm:text-base">
                        {work.title}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center justify-between gap-3 text-left sm:block sm:text-right">
                    <p className="text-sm font-medium text-foreground sm:text-base">
                      {work.start} - {work.end ?? "Present"}
                    </p>
                    <p className="text-sm text-muted-foreground sm:mt-0.5 sm:text-base">
                      {work.location}
                    </p>
                  </div>
                </div>
              </article>
            </BlurFade>
          ))}
        </div>
      </section>

      <section id="github-contributions" aria-labelledby="github-heading">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 9.5}>
            <h2
              id="github-heading"
              className="inline-flex w-fit border border-dashed border-border/80 px-3 py-1 text-xl font-bold"
            >
              GitHub Contributions
            </h2>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 10}>
            <article className="rounded-lg border border-dashed border-border/70 bg-card/30 p-3.5 sm:p-4">
              <Link
                href={githubProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-3 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Icons.github className="h-4 w-4" />@{githubUsername}
              </Link>
              <GitHubCalendarCard username={githubUsername} />
            </article>
          </BlurFade>
        </div>
      </section>

      <section id="projects">
        <div className="w-full space-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="flex flex-col items-start justify-center space-y-4">
              <div className="space-y-2">
                <BlurFade delay={BLUR_FADE_DELAY * 9}>
                  <h2
                    id="projects-heading"
                    className="inline-flex w-fit border border-dashed border-border/80 px-3 py-1 text-xl font-bold"
                  >
                    My Projects
                  </h2>
                </BlurFade>
              </div>
            </div>
          </BlurFade>
          <div className="mx-auto grid w-full grid-cols-1 gap-5">
            {portfolioProjects.map((project, id) => (
              <BlurFade
                key={project.id}
                className="w-full"
                delay={BLUR_FADE_DELAY * 12 + id * 0.05}
              >
                <ProjectCard
                  href={project.websiteLink ?? project.sourceLink}
                  title={project.title}
                  description={project.description}
                  tags={project.technologies}
                  image={project.image ?? undefined}
                  links={[
                    ...(project.websiteLink
                      ? [
                          {
                            type: "Live",
                            href: project.websiteLink,
                            icon: <Icons.globe className="size-3" />,
                          },
                        ]
                      : []),
                    {
                      type: "GitHub",
                      href: project.sourceLink,
                      icon: <Icons.github className="size-3" />,
                    },
                  ]}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section id="closing-quote" aria-labelledby="closing-quote-heading">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <div className="rounded-2xl border border-dashed border-border/70 bg-[#121212] px-5 py-8 text-zinc-200 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] sm:px-8">
            <h2 id="closing-quote-heading" className="sr-only">
              Closing Quote
            </h2>
            <div className="flex gap-4 sm:gap-6">
              <div
                className="select-none text-6xl font-semibold leading-none text-white/8 sm:text-8xl"
                aria-hidden="true"
              >
                “
              </div>
              <div className="flex-1 md:pt-2">
                <p className="text-base italic leading-8 text-zinc-300 sm:text-2xl">
                  You have the right to perform your duty, but not to the fruits
                  of your actions.
                </p>
                <p className="mt-2 text-right text-sm italic text-zinc-400 sm:text-base">
                  - Bhagavad Gita 2.47
                </p>
              </div>
            </div>
          </div>
        </BlurFade>
      </section>

      <footer id="footer" aria-labelledby="footer-heading">
        <BlurFade delay={BLUR_FADE_DELAY * 17}>
          <div className="border-t border-border/50 px-2 py-5">
            <h2 id="footer-heading" className="sr-only">
              Footer
            </h2>
            <div className="flex justify-center">
              <LiveVisitorCount
                namespace="udaygoel.dev"
                keyName="portfolio-visitors"
                displayMode="ordinal"
                className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300 tabular-nums sm:text-sm"
              />
            </div>
            <div className="mt-4 flex flex-col items-center justify-between gap-2 text-center text-sm text-zinc-400 sm:flex-row sm:gap-3 sm:text-left">
              <p className="text-center sm:text-left">
                © {new Date().getFullYear()}. All rights reserved
              </p>

              <p className="text-center text-zinc-200 sm:text-right">
                Designed &amp; Made with
                <Heart className="mb-0.5 ml-1 inline h-4 w-4 fill-rose-500 text-rose-500" />
              </p>
            </div>
          </div>
        </BlurFade>
      </footer>
    </main>
  );
}
