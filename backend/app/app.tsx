'use client';

import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {WalletModalProvider, WalletDisconnectButton, WalletMultiButton} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl, PublicKey } from '@solana/web3.js';
import { motion } from 'framer-motion';

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

    return (

        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={[]} autoConnect>
                <WalletModalProvider>
                    <motion.div 
                        className="min-h-screen bg-white"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="absolute top-4 right-4 flex gap-2 z-10">
                            <WalletMultiButton />
                            <WalletDisconnectButton />
                        </div>
                        
                        <div className="relative z-0">
                            {!token ? (
                                <TokenLaunchpad onTokenCreate={(tokenMint) => {
                                    setToken(new PublicKey(tokenMint));
                                }} />
                            ) : !mintDone ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="min-h-screen flex flex-col items-center justify-center gap-4"
                                >
                                    <MintToken onDone={() => setMintDone(true)} mintAddress={token} />
                                    <motion.div 
                                        className="text-center"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <p className="text-slate-300 text-sm">Token Created:</p>
                                        <p className="text-solana-green font-mono text-xs break-all px-4">{token.toBase58()}</p>
                                    </motion.div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="min-h-screen flex items-center justify-center"
                                >
                                    <CreateCPPool />
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}
