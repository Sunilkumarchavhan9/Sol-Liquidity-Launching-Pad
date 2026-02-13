
"use client";

import { motion } from "framer-motion";

const featureCards = [
  {
    title: "Token Creation",
    description: "Create a mint account and initialize your SPL token from the UI.",
  },
  {
    title: "Mint Supply",
    description: "Issue supply directly to your associated token account in one step.",
  },
  {
    title: "Pool Bootstrap",
    description: "Spin up a constant-product pool and start adding liquidity.",
  },
];

const flow = [
  "Connect wallet in the backend dApp.",
  "Create your token mint and save address.",
  "Mint initial supply to your wallet.",
  "Create a pool and add first liquidity.",
];

const faqs = [
  {
    q: "Is this for mainnet?",
    a: "The current setup is aimed at Solana Devnet for safe iteration and testing.",
  },
  {
    q: "Do I need coding knowledge?",
    a: "No. The UI handles transaction construction and signing flow.",
  },
  {
    q: "How do I open the backend app?",
    a: "Use the Launch dApp button in the navbar or hero section.",
  },
];

export default function Bt() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-4 pb-20 sm:px-6 lg:px-8">
      <section id="features" className="rounded-3xl border border-white/15 bg-black/45 p-6 backdrop-blur-xl sm:p-8">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          className="mb-5 font-mono text-xs uppercase tracking-[0.25em] text-zinc-400"
        >
          Features
        </motion.p>
        <div className="grid gap-4 md:grid-cols-3">
          {featureCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-2xl border border-white/15 bg-white/5 p-5"
            >
              <h3 className="font-mono text-lg text-white">{card.title}</h3>
              <p className="mt-3 font-mono text-sm leading-relaxed text-zinc-300">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="rounded-3xl border border-white/15 bg-black/45 p-6 backdrop-blur-xl sm:p-8">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          className="mb-5 font-mono text-xs uppercase tracking-[0.25em] text-zinc-400"
        >
          How It Works
        </motion.p>
        <div className="space-y-3">
          {flow.map((step, index) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: index * 0.09 }}
              className="flex items-start gap-4 rounded-2xl border border-white/15 bg-white/5 p-4"
            >
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-300 font-mono text-xs font-semibold text-black">
                {index + 1}
              </div>
              <p className="font-mono text-sm text-zinc-200">{step}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="faq" className="rounded-3xl border border-white/15 bg-black/45 p-6 backdrop-blur-xl sm:p-8">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          className="mb-5 font-mono text-xs uppercase tracking-[0.25em] text-zinc-400"
        >
          FAQ
        </motion.p>
        <div className="space-y-3">
          {faqs.map((item) => (
            <motion.div
              key={item.q}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              className="rounded-2xl border border-white/15 bg-white/5 p-4"
            >
              <h4 className="font-mono text-sm font-semibold text-white">{item.q}</h4>
              <p className="mt-2 font-mono text-sm text-zinc-300">{item.a}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="contact" className="rounded-3xl border border-white/15 bg-black/45 p-6 backdrop-blur-xl sm:p-8">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-400"
        >
          Contact
        </motion.p>
        <p className="mt-4 font-mono text-sm text-zinc-200">
          Need custom integrations, branding, or production hardening? Use this repo as a base and extend
          with your own Solana program interactions.
        </p>
      </section>
    </div>
  );
}
