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
                className="min-h-screen bg-white flex justify-center items-center p-4"
            >
                <div className="w-full max-w-md">
                    <motion.div 
                        className="bg-white shadow-lg p-8 border-4 border-black"
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
                            className="text-3xl font-bold text-center mb-2 text-black"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            Liquidity Added!
                        </motion.h1>
                        <p className="text-gray-600 text-center mb-8">Your pool is now active for trading</p>
                        
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="space-y-4 mb-8 bg-gray-100 p-6 border-2 border-black"
                        >
                            <div>
                                <p className="text-sm text-gray-600">{tokenA} Deposited</p>
                                <p className="text-black font-bold text-lg">{amountA} {tokenA}</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-600">{tokenB} Deposited</p>
                                <p className="text-black font-bold text-lg">{amountB} {tokenB}</p>
                            </div>

                            <div className="border-t-2 border-black pt-4">
                                <p className="text-sm text-gray-600">LP Tokens Received</p>
                                <p className="text-black font-bold text-lg">{lpTokens} LP</p>
                            </div>

                            <div className="bg-gray-200 p-3 border-2 border-black">
                                <p className="text-xs text-gray-600 mb-2">Fee Earnings</p>
                                <p className="text-black font-bold">0.3% of all swaps</p>
                                <p className="text-xs text-gray-600 mt-1">Proportional to your share</p>
                            </div>
                        </motion.div>

                        <motion.button 
                            onClick={onDone}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 transition duration-200"
                        >
                            ✨ Done
                        </motion.button>

                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-center text-gray-600 text-xs mt-6"
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
                        Add Liquidity
                    </motion.h1>
                    <p className="text-gray-600 text-center mb-8">Become a liquidity provider and earn 0.3% fees on all swaps</p>
                    
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-4"
                    >
                        <div>
                            <label className="block text-sm font-medium text-black mb-2">{tokenA} Amount</label>
                            <input 
                                type="number" 
                                placeholder="0.00"
                                value={amountA}
                                onChange={(e) => setAmountA(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-100 border-2 border-black text-black placeholder-gray-400 focus:outline-none focus:bg-gray-50 transition"
                            />
                        </div>

                        <div className="text-center py-2">
                            <span className="text-2xl text-black font-bold">+</span>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black mb-2">{tokenB} Amount</label>
                            <input 
                                type="number" 
                                placeholder="0.00"
                                value={amountB}
                                onChange={(e) => setAmountB(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-100 border-2 border-black text-black placeholder-gray-400 focus:outline-none focus:bg-gray-50 transition"
                            />
                        </div>

                        {amountA && amountB && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-gray-100 p-4 border-2 border-black mt-4"
                            >
                                <p className="text-sm text-gray-600">LP Tokens You'll Receive</p>
                                <p className="text-2xl font-bold text-black">{calculateLPTokens(amountA, amountB)} LP</p>
                                <p className="text-xs text-gray-600 mt-2">You can withdraw this anytime + earned fees</p>
                            </motion.div>
                        )}
                    </motion.div>

                    <motion.button 
                        onClick={addLiquidity}
                        disabled={isLoading || !amountA || !amountB}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full mt-8 bg-pink-500 hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 transition duration-200 flex items-center justify-center gap-2 rounded-2xl border border-pink-400"
                    >
                        {isLoading ? (
                            <>
                                <motion.div 
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 1 }}
                                    className="w-5 h-5 border-2 border-white border-t-transparent"
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
                        className="text-center text-gray-500 text-xs mt-6"
                    >
                        Equal value of both tokens is required. You'll receive LP tokens representing your share of the pool.
                    </motion.p>
                </motion.div>
            </div>
        </motion.div>
    );
}
