import { createInitializeMint2Instruction, getMinimumBalanceForRentExemptAccount, MINT_SIZE, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import { motion } from "framer-motion";
import { useState } from "react";


interface TokenLaunchpadProps {
    onTokenCreate: (mintAddress: string) => void;
}

export function TokenLaunchpad({onTokenCreate}: TokenLaunchpadProps){
    const{connection} = useConnection();
    const wallet  = useWallet();
    const [isLoading, setIsLoading] = useState(false);
    const [tokenName, setTokenName] = useState("");
    const [tokenSymbol, setTokenSymbol] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [initialSupply, setInitialSupply] = useState("");

    async function  createToken(){
        if (!wallet.publicKey || !wallet.signTransaction) return;
        
        setIsLoading(true);
        try {
            const mintKeypair = Keypair.generate();
            const lamports = await getMinimumBalanceForRentExemptAccount(connection);

            const transaction = new Transaction().add(
                SystemProgram.createAccount({
                    fromPubkey : wallet.publicKey,
                    newAccountPubkey : mintKeypair.publicKey,
                    space : MINT_SIZE,
                    lamports,
                    programId :  TOKEN_PROGRAM_ID
                }),
                createInitializeMint2Instruction(mintKeypair.publicKey, 9 , wallet.publicKey, wallet.publicKey , TOKEN_PROGRAM_ID)
            );

            transaction.feePayer = wallet.publicKey;
            transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
            transaction.partialSign(mintKeypair);

            const signedTransaction = await wallet.signTransaction(transaction);
            const signature = await connection.sendRawTransaction(signedTransaction.serialize());
            await connection.confirmTransaction(signature);

            onTokenCreate(mintKeypair.publicKey.toBase58());
            alert("Token created successfully!");
            setTokenName("");
            setTokenSymbol("");
            setImageUrl("");
            setInitialSupply("");
        } catch (error) {
            console.error("Error creating token:", error);
            alert(`Error: ${error instanceof Error ? error.message : "Failed to create token. Make sure you have SOL in your wallet on Devnet."}`);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-white flex justify-center items-center p-4"
        >
            <div className="w-full max-w-md">
                <motion.div 
                    className="bg-white shadow-lg p-8 border-4 border-black"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <motion.h1 
                        className="text-4xl font-bold text-center mb-2 text-black"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Token Launchpad
                    </motion.h1>
                    <p className="text-gray-600 text-center mb-8">Create your Solana token in seconds</p>
                    
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <label className="block text-sm font-medium text-black mb-2">Token Name</label>
                            <input 
                                type='text' 
                                placeholder='e.g., MyToken'
                                value={tokenName}
                                onChange={(e) => setTokenName(e.target.value)}
                                className='w-full px-4 py-3 bg-gray-100 border-2 border-black text-black placeholder-gray-400 focus:outline-none focus:bg-gray-50 transition'
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <label className="block text-sm font-medium text-black mb-2">Token Symbol</label>
                            <input 
                                type='text' 
                                placeholder='e.g., MT'
                                value={tokenSymbol}
                                onChange={(e) => setTokenSymbol(e.target.value)}
                                className='w-full px-4 py-3 bg-gray-100 border-2 border-black text-black placeholder-gray-400 focus:outline-none focus:bg-gray-50 transition'
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <label className="block text-sm font-medium text-black mb-2">Image URL</label>
                            <input 
                                type='text' 
                                placeholder='https://example.com/image.png'
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                className='w-full px-4 py-3 bg-gray-100 border-2 border-black text-black placeholder-gray-400 focus:outline-none focus:bg-gray-50 transition'
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <label className="block text-sm font-medium text-black mb-2">Initial Supply</label>
                            <input 
                                type='text' 
                                placeholder='1000000'
                                value={initialSupply}
                                onChange={(e) => setInitialSupply(e.target.value)}
                                className='w-full px-4 py-3 bg-gray-100 border-2 border-black text-black placeholder-gray-400 focus:outline-none focus:bg-gray-50 transition'
                            />
                        </motion.div>
                    </div>

                    <motion.button 
                        onClick={createToken}
                        disabled={isLoading || !wallet.publicKey}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className='w-full mt-8 bg-black hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 transition duration-200 flex items-center justify-center gap-2'
                    >
                        {isLoading ? (
                            <>
                                <motion.div 
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 1 }}
                                    className="w-5 h-5 border-2 border-white border-t-transparent"
                                />
                                Creating...
                            </>
                        ) : (
                            '✨ Create Token'
                        )}
                    </motion.button>

                    {!wallet.publicKey && (
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center text-red-600 text-sm mt-4"
                        >
                            Please connect your wallet first
                        </motion.p>
                    )}
                </motion.div>
            </div>
        </motion.div>
    )
}