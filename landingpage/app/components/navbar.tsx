"use client";

import { motion } from "framer-motion";
import { useState } from "react";
interface NavbarProps {
  backendUrl: string;
}

export default function Navbar({ backendUrl }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="sticky top-0 z-50 border-b border-white/10 bg-black/35 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => scrollToSection("#top")}
          className="flex items-center gap-3 text-left"
        >
          <svg
            width="91"
            height="82"
            viewBox="0 0 91 82"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
          >
            <path d="M21.6641 0.5L34.0859 31.0781L0.5 17.1211V0.5H21.6641Z" fill="#020617" stroke="#DBDBDB" />
            <path d="M90.5 0.5V17.6611L56.9043 31.0996L69.3359 0.5H90.5Z" fill="#020617" stroke="#DBDBDB" />
            <rect x="35.5" y="0.5" width="20" height="17" fill="#020617" stroke="#DBDBDB" />
            <rect x="0.5" y="32.5" width="21" height="17" fill="#020617" stroke="#DBDBDB" />
            <rect x="69.5" y="32.5" width="21" height="17" fill="#020617" stroke="#DBDBDB" />
            <rect x="35.5" y="32.5" width="20" height="17" fill="#020617" stroke="#DBDBDB" />
            <path d="M21.6641 81.5H0.5V64.3379L34.0947 50.8994L21.6641 81.5Z" fill="#020617" stroke="#DBDBDB" />
            <path d="M90.5 64.3379V81.5H69.3359L56.9043 50.8994L90.5 64.3379Z" fill="#020617" stroke="#DBDBDB" />
            <rect x="35.5" y="64.5" width="20" height="17" fill="#020617" stroke="#DBDBDB" />
          </svg>
          <span className="font-mono text-sm tracking-wide text-zinc-100">SOL TOKEN LAUNCH PAD</span>
        </button>

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <motion.button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              whileHover={{ y: -2 }}
              className="font-mono text-sm text-zinc-300 transition-colors hover:text-white"
            >
              {link.name}
            </motion.button>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <motion.a
            href={backendUrl}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-full border border-cyan-200/60 bg-cyan-300/90 px-5 py-2 font-mono text-sm font-semibold text-black"
          >
            Launch dApp
          </motion.a>
        </div>

        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
          <svg className="h-6 w-6 text-zinc-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2 border-t border-white/10 px-4 py-4 md:hidden"
        >
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className="block w-full text-left font-mono text-sm text-zinc-300"
            >
              {link.name}
            </button>
          ))}
          <a
            href={backendUrl}
            className="mt-2 block rounded-full border border-cyan-200/60 bg-cyan-300/90 px-5 py-2 text-center font-mono text-sm font-semibold text-black"
          >
            Launch dApp
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
}
