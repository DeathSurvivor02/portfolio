import React from "react";
import { profile } from "../../data/site";

export const Footer = () => {
  return (
    <footer className="border-t border-line">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-subtle">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <ul className="flex items-center gap-6">
          <li>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-fg transition-colors">
              GitHub
            </a>
          </li>
          <li>
            <a href={`mailto:${profile.email}`} className="hover:text-fg transition-colors">
              Email
            </a>
          </li>
          <li>
            <a href="#top" className="hover:text-fg transition-colors">
              Back to top <span aria-hidden="true">↑</span>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
