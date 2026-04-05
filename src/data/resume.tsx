import { Icons } from "@/components/icons";
import { HomeIcon } from "lucide-react";

export const DATA = {
  name: "Uday Goel",
  initials: "UG",
  url: "https://udaygoel.me",
  location: "India",
  summary: `I’m a **Full Stack Developer** who enjoys building products that solve real problems, not just projects that look good in screenshots. I work with **Next.js**, **TypeScript**, **TailwindCSS**, **Express**, **Node.js**, **MongoDB**, and **PostgreSQL** to ship fast, clean, and scalable experiences.
`,
  visitorCount: 70,
  avatarUrl: "/me.jpg",
  skills: [
    {
      name: "Next.js",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    },
    {
      name: "TypeScript",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    },
    {
      name: "React",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      name: "Node.js",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    },
    {
      name: "TailwindCSS",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    },
    {
      name: "Python",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    },
    {
      name: "Postgres",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    },
    {
      name: "Java",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    },
    {
      name: "C++",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
    },
    {
      name: "HTML",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    },
    {
      name: "CSS",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    },
    {
      name: "JavaScript",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    },
    {
      name: "Express.js",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    },
    {
      name: "MongoDB",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    },
    {
      name: "MySQL",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    },
    {
      name: "Git",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    },
    {
      name: "GitHub",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    },
    {
      name: "VS Code",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    },
    {
      name: "Postman",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
    },
    {
      name: "REST APIs",
      logo: "https://img.icons8.com/fluency/48/api-settings.png",
    },
    {
      name: "Authentication",
      logo: "https://img.icons8.com/fluency/48/key-security.png",
    },
    {
      name: "AWS",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    },
  ],
  navbar: [{ href: "/", icon: HomeIcon, label: "Home" }],
  contact: {
    email: "dev.udaygoel@gmail.com",
    tel: "+91 96717-41062",
    social: {
      Resume: {
        name: "Resume",
        url: "https://drive.google.com/file/d/1npdkxb0_vJycBX__XF4Dw2tL6N96fcN7/view?usp=drive_link",
        icon: Icons.resume,
        navbar: true,
      },
      GitHub: {
        name: "GitHub",
        url: "https://github.com/udayxgoel",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/udayxgoel",
        icon: Icons.linkedin,
        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/udayxgoel",
        icon: Icons.x,
        navbar: true,
      },
      Youtube: {
        name: "Youtube",
        url: "https://www.youtube.com/@udayxgoel",
        icon: Icons.youtube,
        navbar: false,
      },
      email: {
        name: "Send Email",
        url: "mailto:dev.udaygoel@gmail.com",
        icon: Icons.email,
        navbar: true,
      },
    },
  },

  work: [
    {
      company: "SquadifyPro",
      location: "India",
      title: "Full Stack Developer",
      logoUrl: "/squadifypro.jpg",
      start: "Aug 2025",
      end: "Present",
    },
  ],
  projects: [
    {
      title: "ProHire",
      href: "https://prohirejobs.vercel.app",
      active: true,
      description:
        "ProHire is a full-stack job portal web application where job seekers can search and apply for jobs, and recruiters can post and manage job listings.",
      technologies: ["React.js", "Node.js", "Express.js", "Javascript"],
      links: [
        {
          type: "Live",
          href: "https://prohirejobs.vercel.app",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "GitHub",
          href: "https://github.com/udayxgoel/ProHire",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/prohire.png",
      video: "",
    },
    {
      title: "WanderLust",
      href: "https://wanderlust-ejs.vercel.app",
      active: true,
      description:
        "Wanderlust is a full-stack travel booking web application inspired by Airbnb. It allows users to explore, list, and book seamlessly.",
      technologies: ["Node.js", "Express.js", "EJS", "Passport.js"],
      links: [
        {
          type: "Website",
          href: "https://wanderlust-ejs.vercel.app",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/udayxgoel/WanderLust",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/wanderlust.png",
      video: "",
    },
  ],
} as const;
