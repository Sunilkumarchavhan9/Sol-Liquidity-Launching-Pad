import { getAssociatedTokenAddressSync, createAssociatedTokenAccountInstruction, TOKEN_PROGRAM_ID, createMintToInstruction } from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Transaction, PublicKey } from "@solana/web3.js";
import { motion } from 'framer-motion';
import { useState } from 'react';

export function MintToken({ mintAddress, onDone }: { mintAddress: PublicKey; onDone: () => void }) {
    const wallet = useWallet();
    const { connection } = useConnection();
    const [isLoading, setIsLoading] = useState(false);
    const [mintAmount, setMintAmount] = useState("1000000000");

    async function mint() {
        if (!wallet.publicKey || !wallet.signTransaction) {
            console.error("Wallet not connected");
            return;
        }

        setIsLoading(true);
        try {
            // Get recent blockhash
            const { blockhash } = await connection.getLatestBlockhash();

            const associatedToken = getAssociatedTokenAddressSync(
                mintAddress,
                wallet.publicKey,
                false,
                TOKEN_PROGRAM_ID,
            );
            
            console.log(associatedToken.toBase58());
            
            // First transaction: Create associated token account
            const transaction = new Transaction({
                recentBlockhash: blockhash,
                feePayer: wallet.publicKey,
            }).add(
                createAssociatedTokenAccountInstruction(
                    wallet.publicKey,
                    associatedToken,
                    wallet.publicKey,
                    mintAddress,
                    TOKEN_PROGRAM_ID,
                ),
            );
            
            const signedTx = await wallet.signTransaction(transaction);
            const sig1 = await connection.sendRawTransaction(signedTx.serialize());
            await connection.confirmTransaction(sig1);
            
            // Second transaction: Mint tokens
            const { blockhash: blockhash2 } = await connection.getLatestBlockhash();
            const mintTransaction = new Transaction({
                recentBlockhash: blockhash2,
                feePayer: wallet.publicKey,
            }).add(
                createMintToInstruction(mintAddress, associatedToken, wallet.publicKey, parseInt(mintAmount), [], TOKEN_PROGRAM_ID)
            );

            const signedMintTx = await wallet.signTransaction(mintTransaction);
            const sig2 = await connection.sendRawTransaction(signedMintTx.serialize());
            await connection.confirmTransaction(sig2);
            
            console.log("Minting done for token " + mintAddress.toBase58());
            onDone();
        } catch (error) {
            console.error("Error minting:", error);
            alert("Failed to mint tokens");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="app-shell"
        >
            <div className="w-full max-w-xl">
                <motion.div
                    className="app-card"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <motion.h1
                        className="text-center font-mono text-3xl font-bold text-white"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Mint Tokens
                    </motion.h1>
                    <p className="mb-8 mt-2 text-center font-mono text-sm text-zinc-300">Create token supply</p>
                    
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <label className="mb-2 block text-sm font-medium text-zinc-200">Amount</label>
                        <input 
                            type="text"
                            placeholder="1000000000"
                            value={mintAmount}
                            onChange={(e) => setMintAmount(e.target.value)}
                            className="app-input mb-6"
                        />
                    </motion.div>

                    <motion.button 
                        onClick={mint}
                        disabled={isLoading || !wallet.publicKey}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="app-button-primary flex w-full items-center justify-center gap-2 py-3 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isLoading ? (
                            <>
                                <motion.div 
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 1 }}
                                    className="h-5 w-5 rounded-full border-2 border-black border-t-transparent"
                                />
                                Minting...
                            </>
                        ) : (
                            'Mint Tokens'
                        )}
                    </motion.button>
                </motion.div>
            </div>
        </motion.div>
    );
}
