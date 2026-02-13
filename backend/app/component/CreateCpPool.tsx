import { motion } from 'framer-motion';
import { useState } from 'react';
import { AddLiquidity } from './AddLiquidity';

export function CreateCPPool(){
    const [isLoading, setIsLoading] = useState(false);
    const [altToken, setAltToken] = useState("");
    const [poolCreated, setPoolCreated] = useState(false);
    const [addingLiquidity, setAddingLiquidity] = useState(false);
    const [poolAddress, setPoolAddress] = useState("");
    const [poolStats, setPoolStats] = useState({
        tokenA: "",
        tokenB: "",
        liquidity: "0",
        fee: "0.3%"
    });
    
    async function createPool(){
        if (!altToken) {
            alert("Please enter an ALT token address");
            return;
        }
        
        setIsLoading(true);
        try {
            // Simulated pool creation - replace with actual logic
            const mockPoolAddress = "PoolXYZ123456789" + Math.random().toString(36).substr(2, 9);
            
            console.log("Creating pool with ALT token:", altToken);
            
            // Simulate pool creation delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            setPoolAddress(mockPoolAddress);
            setPoolStats({
                tokenA: "Your Token",
                tokenB: "ALT Token",
                liquidity: "Initial liquidity pending",
                fee: "0.3%"
            });
            setPoolCreated(true);
        } catch (error) {
            console.error("Error creating pool:", error);
            alert("Failed to create pool");
        } finally {
            setIsLoading(false);
        }
    }

    if (addingLiquidity) {
        return (
            <AddLiquidity 
                poolAddress={poolAddress}
                tokenA={poolStats.tokenA}
                tokenB={poolStats.tokenB}
                onDone={() => {
                    alert("Liquidity added! Your pool is now active for trading.");
                    setPoolCreated(false);
                    setAddingLiquidity(false);
                    setAltToken("");
                }}
            />
        );
    }

    if (poolCreated) {
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
                            ✅
                        </motion.div>

                        <motion.h1
                            className="mb-2 text-center font-mono text-3xl font-bold text-white"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            Pool Created!
                        </motion.h1>
                        <p className="mb-8 text-center font-mono text-sm text-zinc-300">Your constant product pool is ready</p>
                        
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="mb-8 space-y-4 rounded-2xl border border-white/20 bg-white/5 p-6"
                        >
                            <div>
                                <p className="text-sm text-zinc-300">Pool Address</p>
                                <p className="break-all font-mono text-xs font-bold text-cyan-100">{poolAddress}</p>
                            </div>

                            <div>
                                <p className="text-sm text-zinc-300">Token Pair</p>
                                <p className="font-bold text-zinc-100">{poolStats.tokenA} ↔ {poolStats.tokenB}</p>
                            </div>

                            <div>
                                <p className="text-sm text-zinc-300">Pool Fee</p>
                                <p className="font-bold text-zinc-100">{poolStats.fee}</p>
                            </div>

                            <div>
                                <p className="text-sm text-zinc-300">Status</p>
                                <p className="font-bold text-zinc-100">Active</p>
                            </div>
                        </motion.div>

                        <motion.button 
                            onClick={() => setAddingLiquidity(true)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="app-button-primary mb-3 w-full py-3"
                        >
                            Add Liquidity
                        </motion.button>

                        <motion.button 
                            onClick={() => {
                                const explorerUrl = `https://solscan.io/address/${poolAddress}?cluster=devnet`;
                                window.open(explorerUrl, '_blank');
                            }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="app-button-secondary mb-3 w-full py-3 font-semibold"
                        >
                            View on Explorer
                        </motion.button>

                        <motion.button 
                            onClick={() => setPoolCreated(false)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="app-button-secondary w-full py-3 font-semibold"
                        >
                            Create Another Pool
                        </motion.button>

                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="mt-6 text-center text-xs text-zinc-300"
                        >
                            Add liquidity to enable token swaps and start earning fees
                        </motion.p>
                    </motion.div>
                </div>
            </motion.div>
        );
    }

    return(
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
                        Create CP Pool
                    </motion.h1>
                    <p className="mb-8 mt-2 text-center font-mono text-sm text-zinc-300">Set up a constant product pool for your token</p>
                    
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <label className="mb-2 block text-sm font-medium text-zinc-200">ALT Token Address</label>
                        <input 
                            type="text" 
                            placeholder="Enter alternative token mint address"
                            value={altToken}
                            onChange={(e) => setAltToken(e.target.value)}
                            className="app-input mb-6"
                        />
                    </motion.div>

                    <motion.button 
                        onClick={createPool}
                        disabled={isLoading || !altToken}
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
                                Creating...
                            </>
                        ) : (
                            'Create Pool'
                        )}
                    </motion.button>

                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-6 text-center text-xs text-zinc-300"
                    >
                        This will create a constant product pool (like Uniswap) for your token and the ALT token
                    </motion.p>
                </motion.div>
            </div>
        </motion.div>
    )
}
