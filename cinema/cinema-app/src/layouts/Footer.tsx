import { Github, Instagram, Linkedin } from "lucide-react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Link } from "react-router-dom";

const socials = [
  { icon: <Instagram />, link: "https://www.instagram.com/" },
  { icon: <Linkedin />, link: "https://www.facebook.com/" },
  { icon: <Github />, link: "https://github.com/" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 mt-auto">
      <MaxWidthWrapper className="py-6 text-sm">
        <div className="flex flex-col items-center gap-4">
         
          <div className="flex justify-center gap-6">
            {socials.map((social, index) => (
              <Link
                key={index}
                to={social.link}
                target="_blank"
                rel="noreferrer"
                className="text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-white transition-all duration-300 hover:-translate-y-1"
              >
                {social.icon}
              </Link>
            ))}
          </div>

          {/* Копірайт */}
          <p className="text-center text-muted-foreground dark:text-slate-500">
            © {currentYear} All rights reserved.
          </p>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
}