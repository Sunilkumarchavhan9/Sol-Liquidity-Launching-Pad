'use client';

import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletModalProvider, WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl, PublicKey } from '@solana/web3.js';
import { AnimatePresence, motion } from 'framer-motion';

import '@solana/wallet-adapter-react-ui/styles.css';
import { TokenLaunchpad } from './component/CreateToken';
import { useMemo, useState, useEffect } from 'react';
import { MintToken } from './component/MintToken';
import { CreateCPPool } from './component/CreateCpPool';

export default function App() {
    const [token, setToken] = useState<PublicKey | null>(null);
    const [mintDone, setMintDone] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const network = WalletAdapterNetwork.Devnet;

    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    const currentStep = !token ? 0 : !mintDone ? 1 : 2;
    const steps = ['Create Token', 'Mint Supply', 'Create Pool'];

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={[]} autoConnect>
                <WalletModalProvider>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.45 }}
                        className="relative min-h-screen overflow-hidden"
                    >
                        <motion.div
                            className="pointer-events-none absolute -left-16 top-10 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl"
                            animate={{ y: [0, 26, 0], x: [0, 10, 0] }}
                            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
                        />
                        <motion.div
                            className="pointer-events-none absolute -right-16 top-40 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl"
                            animate={{ y: [0, -20, 0], x: [0, -12, 0] }}
                            transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
                        />

                        <div className="relative z-20 border-b border-white/10 bg-black/35 backdrop-blur-xl">
                            <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-8">
                                <div>
                                    <p className="font-mono text-xs uppercase tracking-[0.24em] text-zinc-400">Solana Devnet</p>
                                    <h1 className="font-mono text-lg text-zinc-100">Token Launch Workflow</h1>
                                    <div className="mt-3 flex gap-2">
                                        {steps.map((step, index) => (
                                            <div
                                                key={step}
                                                className={`rounded-full border px-3 py-1 font-mono text-xs ${
                                                    currentStep >= index
                                                        ? 'border-cyan-300/70 bg-cyan-300/25 text-cyan-100'
                                                        : 'border-white/20 bg-white/5 text-zinc-300'
                                                }`}
                                            >
                                                {index + 1}. {step}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <WalletMultiButton />
                                    <WalletDisconnectButton />
                                </div>
                            </div>
                        </div>

                        <main className="relative z-10">
                            <AnimatePresence mode="wait">
                                {!token ? (
                                    <motion.section
                                        key="create-token"
                                        initial={{ opacity: 0, y: 18 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -16 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <TokenLaunchpad
                                            onTokenCreate={(tokenMint) => {
                                                setToken(new PublicKey(tokenMint));
                                            }}
                                        />
                                    </motion.section>
                                ) : !mintDone ? (
                                    <motion.section
                                        key="mint-supply"
                                        initial={{ opacity: 0, y: 18 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -16 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <MintToken onDone={() => setMintDone(true)} mintAddress={token} />
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="mx-auto mb-12 mt-2 w-full max-w-4xl px-6 text-center"
                                        >
                                            <p className="font-mono text-xs text-zinc-400">Token Created</p>
                                            <p className="mx-auto mt-2 max-w-3xl break-all rounded-2xl border border-cyan-300/35 bg-cyan-300/10 px-4 py-2 font-mono text-xs text-cyan-100">
                                                {token.toBase58()}
                                            </p>
                                        </motion.div>
                                    </motion.section>
                                ) : (
                                    <motion.section
                                        key="create-pool"
                                        initial={{ opacity: 0, y: 18 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -16 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <CreateCPPool />
                                    </motion.section>
                                )}
                            </AnimatePresence>
                        </main>
                    </motion.div>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}
