
"use client";

import { motion } from "framer-motion";

interface HeroProps {
  backendUrl: string;
}

export default function Hero({ backendUrl }: HeroProps) {
  return (
    <section id="top" className="relative overflow-hidden px-4 pb-16 pt-14 sm:px-6 lg:px-8">
      <motion.div
        className="pointer-events-none absolute -left-28 top-8 h-72 w-72 rounded-full bg-cyan-500/25 blur-3xl"
        animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -right-24 top-28 h-80 w-80 rounded-full bg-fuchsia-500/25 blur-3xl"
        animate={{ y: [0, -22, 0], x: [0, -16, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="landing-grid pointer-events-none absolute inset-0" />

      <div className="relative mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.5fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="rounded-3xl border border-white/15 bg-black/45 p-8 backdrop-blur-xl sm:p-10"
        >
          <p className="mb-6 inline-flex items-center rounded-full border border-cyan-300/40 bg-cyan-300/10 px-4 py-1 font-mono text-xs tracking-[0.2em] text-cyan-100">
            SOLANA DEVNET TOOLING
          </p>

          <h1 className="font-mono text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
            Launch SPL Tokens, Mint Supply, and Open Liquidity in One Flow.
          </h1>

          <p className="mt-6 max-w-xl font-mono text-sm leading-relaxed text-zinc-300">
            Your landing page is now connected directly to the backend dApp. Click launch, connect wallet,
            create token, mint, and bootstrap your first pool.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <motion.a
              href={backendUrl}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-full border border-cyan-100/80 bg-cyan-300 px-6 py-3 font-mono text-sm font-semibold text-black"
            >
              Launch dApp
            </motion.a>
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => document.querySelector("#how-it-works")?.scrollIntoView({ behavior: "smooth", block: "start" })}
              className="rounded-full border border-white/30 bg-white/5 px-6 py-3 font-mono text-sm text-white"
            >
              View Flow
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid gap-4"
        >
          <div className="rounded-3xl border border-white/15 bg-black/45 p-6 backdrop-blur-xl">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-400">Current Stack</p>
            <p className="mt-3 font-mono text-2xl text-white">Landing + dApp Unified</p>
            <p className="mt-3 font-mono text-sm text-zinc-300">Shared style direction, direct deep-linking, and smoother onboarding.</p>
          </div>
          <div className="rounded-3xl border border-white/15 bg-black/45 p-6 backdrop-blur-xl">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-400">Network</p>
            <p className="mt-3 font-mono text-2xl text-white">Solana Devnet</p>
            <p className="mt-3 font-mono text-sm text-zinc-300">Safe testing before production deploy.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
