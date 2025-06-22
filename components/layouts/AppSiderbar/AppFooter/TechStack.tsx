import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FaReact, FaJs, FaDatabase, FaCode } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiTailwindcss } from "react-icons/si";

export default function TechStackCard() {
  const techs = [
    {
      name: "React",
      color: "bg-blue-500 hover:bg-blue-600",
      icon: FaReact,
      url: "https://react.dev/",
    },
    {
      name: "Next.js",
      color: "bg-gray-800 hover:bg-gray-900",
      icon: SiNextdotjs,
      url: "https://nextjs.org/",
    },
    {
      name: "TypeScript",
      color: "bg-blue-600 hover:bg-blue-700",
      icon: SiTypescript,
      url: "https://www.typescriptlang.org/",
    },
    {
      name: "Tailwind CSS",
      color: "bg-cyan-500 hover:bg-cyan-600",
      icon: SiTailwindcss,
      url: "https://tailwindcss.com/",
    },
    {
      name: "shadcn/ui",
      color: "bg-slate-700 hover:bg-slate-800",
      icon: FaCode,
      url: "https://ui.shadcn.com/",
    },
    {
      name: "Zustand",
      color: "bg-orange-500 hover:bg-orange-600",
      icon: FaJs,
      url: "https://zustand-demo.pmnd.rs/",
    },
    {
      name: "Prisma",
      color: "bg-indigo-600 hover:bg-indigo-700",
      icon: FaDatabase,
      url: "https://www.prisma.io/",
    },
    {
      name: "SQLite",
      color: "bg-green-600 hover:bg-green-700",
      icon: FaDatabase,
      url: "https://www.sqlite.org/",
    },
  ];

  return (
    <Card className="w-full bg-#3f5a7d backdrop-blur-sm shadow-lg overflow-hidden p-2">
      <div className="flex items-center gap-4">
        <CardHeader className="p-2 w-20 flex-shrink-0">
          <CardTitle className="text-white text-sm font-bold whitespace-nowrap">
            Tech Stack
          </CardTitle>
        </CardHeader>
        <CardContent className="p-1 flex-1">
          <div className="grid grid-cols-4 gap-x-6 gap-y-2">
            {techs.map((tech) => {
              const IconComponent = tech.icon;
              return (
                <div
                  key={tech.name}
                  className="transform transition-all duration-300 hover:scale-105"
                >
                  <a
                    href={tech.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Badge
                      className={`
                        ${tech.color} 
                        text-white text-xs font-medium px-1 py-1 w-full justify-center
                        rounded-md shadow-sm transition-all duration-300 
                        hover:shadow-md hover:transform hover:scale-105
                        flex items-center gap-1 cursor-pointer
                      `}
                    >
                      <IconComponent className="w-3 h-3" />
                      {tech.name}
                    </Badge>
                  </a>
                </div>
              );
            })}
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
