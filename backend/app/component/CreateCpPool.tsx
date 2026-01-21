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
                            ✅
                        </motion.div>

                        <motion.h1 
                            className="text-3xl font-bold text-center mb-2 text-black"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            Pool Created!
                        </motion.h1>
                        <p className="text-gray-600 text-center mb-8">Your constant product pool is ready</p>
                        
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="space-y-4 mb-8 bg-gray-100 p-6 border-2 border-black"
                        >
                            <div>
                                <p className="text-sm text-gray-600">Pool Address</p>
                                <p className="text-black font-mono text-xs break-all font-bold">{poolAddress}</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-600">Token Pair</p>
                                <p className="text-black font-bold">{poolStats.tokenA} ↔ {poolStats.tokenB}</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-600">Pool Fee</p>
                                <p className="text-black font-bold">{poolStats.fee}</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-600">Status</p>
                                <p className="text-black font-bold">Active</p>
                            </div>
                        </motion.div>

                        <motion.button 
                            onClick={() => setAddingLiquidity(true)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 transition duration-200 mb-3"
                        >
                            💧 Add Liquidity
                        </motion.button>

                        <motion.button 
                            onClick={() => {
                                const explorerUrl = `https://solscan.io/address/${poolAddress}?cluster=devnet`;
                                window.open(explorerUrl, '_blank');
                            }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-gray-300 hover:bg-gray-200 text-black font-bold py-3 transition duration-200 border-2 border-black mb-3"
                        >
                            View on Explorer
                        </motion.button>

                        <motion.button 
                            onClick={() => setPoolCreated(false)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-gray-300 hover:bg-gray-200 text-black font-bold py-3 transition duration-200 border-2 border-black"
                        >
                            Create Another Pool
                        </motion.button>

                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-center text-gray-600 text-xs mt-6"
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
                        Create CP Pool
                    </motion.h1>
                    <p className="text-gray-600 text-center mb-8">Set up a constant product pool for your token</p>
                    
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <label className="block text-sm font-medium text-black mb-2">ALT Token Address</label>
                        <input 
                            type="text" 
                            placeholder="Enter alternative token mint address"
                            value={altToken}
                            onChange={(e) => setAltToken(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-100 border-2 border-black text-black placeholder-gray-400 mb-6 focus:outline-none focus:bg-gray-50 transition"
                        />
                    </motion.div>

                    <motion.button 
                        onClick={createPool}
                        disabled={isLoading || !altToken}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-black hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 transition duration-200 flex items-center justify-center gap-2"
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
                            '✨ Create Pool'
                        )}
                    </motion.button>

                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-center text-gray-600 text-xs mt-6"
                    >
                        This will create a constant product pool (like Uniswap) for your token and the ALT token
                    </motion.p>
                </motion.div>
            </div>
        </motion.div>
    )
}