import { motion } from 'framer-motion';
import { useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

interface AddLiquidityProps {
    poolAddress: string;
    tokenA: string;
    tokenB: string;
    onDone: () => void;
}

export function AddLiquidity({ poolAddress, tokenA, tokenB, onDone }: AddLiquidityProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [amountA, setAmountA] = useState("");
    const [amountB, setAmountB] = useState("");
    const [liquidityAdded, setLiquidityAdded] = useState(false);
    const [lpTokens, setLpTokens] = useState("0");
    const { connection } = useConnection();
    const wallet = useWallet();

    function calculateLPTokens(a: string, b: string) {
        if (!a || !b) return "0";
        // Simple calculation: geometric mean of both amounts
        const amountANum = parseFloat(a);
        const amountBNum = parseFloat(b);
        const lp = Math.sqrt(amountANum * amountBNum).toFixed(2);
        return lp;
    }

    async function addLiquidity() {
        if (!amountA || !amountB) {
            alert("Please enter amounts for both tokens");
            return;
        }

        if (!wallet.publicKey) {
            alert("Please connect your wallet first");
            return;
        }

        setIsLoading(true);
        try {
            // Calculate LP tokens to be minted
            const lpAmount = calculateLPTokens(amountA, amountB);
            setLpTokens(lpAmount);
            
            console.log(`Adding ${amountA} of ${tokenA} and ${amountB} of ${tokenB} to pool ${poolAddress}`);
            console.log(`LP Tokens minted: ${lpAmount}`);
            
            // Simulate transaction delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            setLiquidityAdded(true);
        } catch (error) {
            console.error("Error adding liquidity:", error);
            alert("Failed to add liquidity");
        } finally {
            setIsLoading(false);
        }
    }

    if (liquidityAdded) {
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
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                            className="text-6xl text-center mb-6"
                        >
                            💰
                        </motion.div>

                        <motion.h1
                            className="mb-2 text-center font-mono text-3xl font-bold text-white"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            Liquidity Added!
                        </motion.h1>
                        <p className="mb-8 text-center font-mono text-sm text-zinc-300">Your pool is now active for trading</p>
                        
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="mb-8 space-y-4 rounded-2xl border border-white/20 bg-white/5 p-6"
                        >
                            <div>
                                <p className="text-sm text-zinc-300">{tokenA} Deposited</p>
                                <p className="text-lg font-bold text-zinc-100">{amountA} {tokenA}</p>
                            </div>

                            <div>
                                <p className="text-sm text-zinc-300">{tokenB} Deposited</p>
                                <p className="text-lg font-bold text-zinc-100">{amountB} {tokenB}</p>
                            </div>

                            <div className="border-t border-white/20 pt-4">
                                <p className="text-sm text-zinc-300">LP Tokens Received</p>
                                <p className="text-lg font-bold text-zinc-100">{lpTokens} LP</p>
                            </div>

                            <div className="rounded-xl border border-white/20 bg-white/6 p-3">
                                <p className="mb-2 text-xs text-zinc-300">Fee Earnings</p>
                                <p className="font-bold text-zinc-100">0.3% of all swaps</p>
                                <p className="mt-1 text-xs text-zinc-300">Proportional to your share</p>
                            </div>
                        </motion.div>

                        <motion.button 
                            onClick={onDone}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="app-button-primary w-full py-3"
                        >
                            Done
                        </motion.button>

                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="mt-6 text-center text-xs text-zinc-300"
                        >
                            You are now a liquidity provider! Your LP tokens represent your share of the pool. You'll earn {tokenA}/{tokenB} swap fees automatically.
                        </motion.p>
                    </motion.div>
                </div>
            </motion.div>
        );
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
                        className="text-center font-mono text-4xl font-bold text-white"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Add Liquidity
                    </motion.h1>
                    <p className="mb-8 mt-2 text-center font-mono text-sm text-zinc-300">Become a liquidity provider and earn 0.3% fees on all swaps</p>
                    
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-4"
                    >
                        <div>
                            <label className="mb-2 block text-sm font-medium text-zinc-200">{tokenA} Amount</label>
                            <input 
                                type="number" 
                                placeholder="0.00"
                                value={amountA}
                                onChange={(e) => setAmountA(e.target.value)}
                                className="app-input"
                            />
                        </div>

                        <div className="text-center py-2">
                            <span className="text-2xl font-bold text-zinc-200">+</span>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-zinc-200">{tokenB} Amount</label>
                            <input 
                                type="number" 
                                placeholder="0.00"
                                value={amountB}
                                onChange={(e) => setAmountB(e.target.value)}
                                className="app-input"
                            />
                        </div>

                        {amountA && amountB && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-4 rounded-xl border border-white/20 bg-white/6 p-4"
                            >
                                <p className="text-sm text-zinc-300">LP Tokens You'll Receive</p>
                                <p className="text-2xl font-bold text-zinc-100">{calculateLPTokens(amountA, amountB)} LP</p>
                                <p className="mt-2 text-xs text-zinc-300">You can withdraw this anytime + earned fees</p>
                            </motion.div>
                        )}
                    </motion.div>

                    <motion.button 
                        onClick={addLiquidity}
                        disabled={isLoading || !amountA || !amountB}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="app-button-primary mt-8 flex w-full items-center justify-center gap-2 py-3 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isLoading ? (
                            <>
                                <motion.div 
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 1 }}
                                    className="h-5 w-5 rounded-full border-2 border-black border-t-transparent"
                                />
                                Adding...
                            </>
                        ) : (
                            'Provide Liquidity'
                        )}
                    </motion.button>

                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-6 text-center text-xs text-zinc-300"
                    >
                        Equal value of both tokens is required. You'll receive LP tokens representing your share of the pool.
                    </motion.p>
                </motion.div>
            </div>
        </motion.div>
    );
}
