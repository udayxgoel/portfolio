import { Icons } from "@/components/icons";
import { HomeIcon } from "lucide-react";

export const DATA = {
  name: "Uday Goel",
  initials: "UG",
  url: "https://udaygoel.me",
  location: "Haryana, IN",
  locationLink: "https://www.google.com/maps/place/India",
  description:
    "Full-Stack Developer | Tech Enthusiast | Lifelong Learner and Innovator 🚀",
  summary: `A Full Stack Developer working at the intersection of learning, building, and sharing. While pursuing my graduation and working in the industry, I’ve been crafting projects with my skills and improving daily through consistent problem-solving. My goal is simple: build useful products, grow as an engineer, and document the journey so others can grow with me.
`,
  avatarUrl: "/me.jpg",
  skills: [
    "Next.js",
    "Typescript",
    "React",
    "Node.js",
    "TailwindCSS",
    "Python",
    "Postgres",
    "Java",
    "C++",
    "HTML",
    "CSS",
    "JavaScript",
    "Express.js",
    "MongoDB",
    "MySQL",
    "Git",
    "GitHub",
    "VS Code",
    "Postman",
    "REST APIs",
    "Authentication",
    "AWS",
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
      location: "Haryana, IN",
      title: "Full Stack Developer",
      logoUrl: "/squadifypro.jpg",
      start: "Aug 2025",
      end: "Present",
    },
    {
      company: "Freelancer, Remote",
      badges: [],
      location: "Haryana, IN",
      title: "Frontend Developer",
      logoUrl: "/fiverr.png",
      start: "May 2024",
      end: "July 2025",
    },
  ],
  education: [
    {
      school: "Chandigarh University",
      degree: "MCA",
      logoUrl: "/cu.png",
      start: "2025",
      end: "Present",
    },
    {
      school: "Kurukshetra University",
      degree: "BCA",
      logoUrl: "/ku.png",
      start: "2022",
      end: "2025",
    },
  ],
  projects: [
    {
      title: "ProHire",
      href: "https://prohirejobs.vercel.app",
      dates: "",
      active: true,
      description:
        "ProHire is a full-stack job portal web application where job seekers can search and apply for jobs, and recruiters can post and manage job listings.",
      technologies: [
        "React.js",
        "Node.js",
        "Express.js",
        "Javascript",
        "MongoDB",
        "TailwindCSS",
        "Redux Toolkit",
        "Shadcn UI",
      ],
      links: [
        {
          type: "Website",
          href: "https://prohirejobs.vercel.app",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
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
      dates: "",
      active: true,
      description:
        "Wanderlust is a full-stack travel booking web application inspired by Airbnb. It allows users to explore, list, and book seamlessly.",
      technologies: [
        "Node.js",
        "Express.js",
        "EJS",
        "Passport.js",
        "Bootstrap",
        "Cloudinary",
        "MongoDB",
      ],
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
