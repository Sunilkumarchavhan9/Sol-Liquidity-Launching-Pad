import { createAssociatedTokenAccount, createAssociatedTokenAccountInstruction, getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, Transaction, TransactionInstruction } from "@solana/web3.js";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Pool{
    address :PublicKey;
    tokenA : PublicKey;
    tokenB : PublicKey;
    reserveA : number;
    reserveB : number;


}


const  CONFIG  =  {
  AMM_PROGRAM_ID : new PublicKey("7YvBgi2XRxhh1TzqRcCwnggEJ1EXFsDk3tEGrWaVvd6g"),

  POOL_ADDRESS : new PublicKey("PoolXYZ123456789k02gik50m"),

  SOL_MINT : new PublicKey("So11111111111111111111111111111111111111112"),
  TOKEN_MINT : new PublicKey("7YvBgi2XRxhh1TzqRcCwnggEJ1EXFsDk3tEGrWaVvd6g"),

  POOL_VAULT_A : new PublicKey("7YvBgi2XRxhh1TzqRcCwnggEJ1EXFsDk3tEGrWaVvd6g"),
  POOL_VAULT_B : new PublicKey("7YvBgi2XRxhh1TzqRcCwnggEJ1EXFsDk3tEGrWaVvd6g"),

  POOL_LP_MINT : new PublicKey("7YvBgi2XRxhh1TzqRcCwnggEJ1EXFsDk3tEGrWaVvd6g")
}

export function Swap() {
    const{connection} = useConnection();
    const wallet = useWallet();

    const [sellAmount, setSellAmount] = useState("");
    const [buyAmount, setBuyAmount] = useState("");
    const [sellToken, setSellToken] = useState("SOL");
    const [buyToken, setBuyToken] = useState("TOKEN");
    const [isSwapping, setIsSwapping] = useState(false);
    const [slippage, setSlippage] = useState(0.5);

    const [pool , SetPool]  = useState<Pool | null>(null);
    const [loading , setLoading] = useState<boolean>(false);
    const[walletBalance , setWalletBalance] = useState(0);
    const [error, setError] = useState("");
    const[txsignature , setTxSignature] = useState(""); 


    useEffect(() =>{
        const fetchPoolData = async () =>{
            if(!wallet.publicKey) return;

            try{

                setLoading(true);

                const mockPool : Pool = {
                    address: CONFIG.POOL_ADDRESS,
                    tokenA: CONFIG.SOL_MINT,
                    tokenB: CONFIG.TOKEN_MINT,
                    reserveA: 1000,
                    reserveB: 500,
                };
                SetPool(mockPool);

                const balance = await connection.getBalance(wallet.publicKey);
                setWalletBalance(balance / LAMPORTS_PER_SOL);
            }catch(err){
                setError("failed to fetch pool data");
                console.error(err);
            } finally {
                setLoading(false);
            }
            
        };

        fetchPoolData();
    }, [wallet.publicKey , connection]);


//   const [reserveA] = useState(1000);
//   const [reserveB] = useState(500);

 
  function getAmountOut(
    amountIn: number,
    reserveIn: number,
    reserveOut: number
  ):number {
    if(amountIn <= 0 || reserveIn <= 0 || reserveOut <= 0) return 0;

    const amountInWithFee = amountIn * 0.997; 
    const numerator = amountInWithFee * reserveOut;
    const denominator = reserveIn + amountInWithFee;

    return numerator / denominator;
  }

  function getminimumAmountOut(amountOut : number) : number{
    return amountOut * (1 - slippage/100);
  }

  function getPriceImpact(
    amountIn : number,
    amountOut : number,
    reserveIn : number, 
    reserveOut : number,

  ): number{
    const spotPrice  = reserveOut / reserveIn; // its an current  pool price 
    const execuitionPrice = amountOut / amountIn; // real trade price 
    const getPriceImpact = ((spotPrice  -  execuitionPrice))*100; // calculates whre how nuch worse  my price  compared to the actual price
    return Math.max(0, getPriceImpact)

  }

  function encodeSwapInstruction(amountIn: number, minAmountOut: number): Buffer {
    const data = Buffer.alloc(16);
    data.writeBigUInt64LE(BigInt(amountIn), 0);
    data.writeBigUInt64LE(BigInt(minAmountOut), 8);
    return data;
  }
  const handleSellAmountChange = (value : string) =>{
    setSellAmount(value); // this stores where user what  ever types in the sell i/p
    setError("");// if any errors occured previously it clears everything

    if(!value || !pool){ // hre  if input is empty  or pool  not loaded than its invalid and  cant be calculated the out put
        setBuyAmount(""); // clearing the buy amount  bcz there is an calculation errors
        return;
    }

    const  amountIn = parseFloat(value); // converts string into number 
    if(isNaN(amountIn) || amountIn <= 0){  // if the conversation is zero  or negative then calculation should not proceed
        setBuyAmount("")//clears  the anmount to avoid showing wrong data 
        return;
    }

    if(amountIn > walletBalance){ 
        setError(`Insufficient balance. You have ${walletBalance.toFixed(4)} SOL`);
        setBuyAmount("");
        return;
    }

    const amountOut  = getAmountOut( // usinf AMM f ormula
        amountIn,  // user i/p  amount
        pool.reserveA, // toekn being sold reserve
        pool.reserveB) // toekn being bought reserve

        setBuyAmount(
            amountOut.toFixed(6)
        )
    

  }

  const handleSwap = async  () => {
    if (!sellAmount || !wallet.publicKey || !pool) {
      setError(" yo enter  amount and connect wallet u goofhball");
      return;

    }
    const amountIn = parseFloat(sellAmount);
    if(amountIn <=  0 ){
        setError("Amount must greater than zero u idiot")
    }
    

    setIsSwapping(true);
    setError("");
    setTxSignature("");

   try{
    if(!wallet.signTransaction){
       throw new Error("Wallet does not support transaction signing")
    }
     
    const amountOut = parseFloat(buyAmount);
    const  minAmountout = Math.floor(getminimumAmountOut(amountOut));
    const  amountInLamports = Math.floor(amountIn * LAMPORTS_PER_SOL);

    console.log("Swap Details:", {
      amountIn,
      amountInLamports,
      amountOut,
      minAmountout,
      slippage : slippage + "%",
    })

    let userTokenAccountA : PublicKey;
    let userTokenAccountB : PublicKey;

    if(sellToken  === "SOL"){
      userTokenAccountA = wallet.publicKey;

    }else{
      userTokenAccountA = await getAssociatedTokenAddress(CONFIG.SOL_MINT, wallet.publicKey);
    }
    if(buyToken === "TOEKN"){
      userTokenAccountB = await getAssociatedTokenAddress(CONFIG.TOKEN_MINT , wallet.publicKey);
    }else{
      userTokenAccountB = wallet.publicKey;
    }

   
    const transaction  = new Transaction();
    const{blockhash} = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = wallet.publicKey;

    if(buyToken === "TOKEN"){
       const atainfo = await connection.getAccountInfo(userTokenAccountB);
       if(!atainfo){
        console.log("Creating ATA for tokenm B...");
        transaction.add(
          createAssociatedTokenAccountInstruction(
            wallet.publicKey,
            userTokenAccountB,
            wallet.publicKey,
            CONFIG.TOKEN_MINT
          )
        );
       }
      }
      const swapInstruction = new TransactionInstruction({
                keys: [
                    {
                        pubkey: CONFIG.POOL_ADDRESS,
                        isSigner: false,
                        isWritable: true,
                    },
                    {
                        pubkey: CONFIG.POOL_VAULT_A,
                        isSigner: false,
                        isWritable: true,
                    },
                    {
                        pubkey: CONFIG.POOL_VAULT_B,
                        isSigner: false,
                        isWritable: true,
                    },
                    {
                        pubkey: userTokenAccountA,
                        isSigner: false,
                        isWritable: true,
                    },
                    {
                        pubkey: userTokenAccountB,
                        isSigner: false,
                        isWritable: true,
                    },
                    {
                        pubkey: wallet.publicKey,
                        isSigner: true,
                        isWritable: false,
                    },
                    {
                        pubkey: TOKEN_PROGRAM_ID,
                        isSigner: false,
                        isWritable: false,
                    },
                ],
                programId: CONFIG.AMM_PROGRAM_ID,
                data: encodeSwapInstruction(amountInLamports, minAmountout),
      });
      transaction.add(swapInstruction);

      console.log("Signing transaction ");
      const signedTx = await wallet.signTransaction(transaction);

      console.log("waiting for confirmation");
      const signature = await connection.sendRawTransaction(signedTx.serialize(),{
        skipPreflight : false,
        preflightCommitment : "processed",
      });
      console.log("waiting for conformation...");
      const confirmation =  connection.confirmTransaction(signature , "confirmed");
      if(confirmation.value.err){
         throw new Error(`Transaction failed :  ${(await confirmation).value.err}`)
      }

      setTxSignature(signature);
      alert(
        `Swap Successful!\n\nSwapped ${sellAmount} ${sellToken} for ${buyAmount} ${buyToken}\n\nTx: ${signature.substring(0,20)}...`
      );
      setSellAmount("");
      setBuyAmount("");

    } catch (err) {
            const errorMsg = err instanceof Error ? err.message : "Swap failed. Try again.";
            setError(errorMsg);
            console.error("Swap error:", err);
        } finally {
            setIsSwapping(false);
        }
    };
   

  const handleSwitchTokens = () => {
    setSellToken(buyToken);
    setBuyToken(sellToken);
    setSellAmount("");
    setBuyAmount("");
  };
  if(!wallet.connected){

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-white flex justify-center items-center p-4"
    >
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-black text-center mb-2">Swap</h1>
        <p className="text-center text-gray-600 text-sm mb-6">Swap anytime, anywhere</p>

        <div className="bg-white border-2 border-black p-6">
          {/* WALLET INFO */}
          <div className="mb-6 p-4 bg-gray-100 border border-black">
            <p className="text-xs text-gray-600">Wallet Balance</p>
            <p className="text-lg font-bold text-black">
              {loading ? "Loading..." : `${walletBalance.toFixed(4)} SOL`}
            </p>
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border-2 border-red-500 text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* SELL */}
          <div className="mb-4">
            <label className="text-black text-sm font-semibold block mb-2">Sell</label>
            <div className="flex items-center gap-3 bg-gray-100 border-2 border-black p-4">
              <input
                type="number"
                placeholder="0"
                value={sellAmount}
                onChange={(e) => handleSellAmountChange(e.target.value)}
                className="flex-1 bg-transparent text-black text-2xl outline-none font-bold"
              />
              <span className="text-black font-bold text-lg">{sellToken}</span>
            </div>
          </div>

          {/* SWITCH */}
          <div className="flex justify-center my-4">
            <button
              onClick={handleSwitchTokens}
              className="bg-gray-300 hover:bg-gray-400 border-2 border-black p-3 text-black font-bold"
            >
              ⇅
            </button>
          </div>

          {/* BUY */}
          <div className="mb-6">
            <label className="text-black text-sm font-semibold block mb-2">Buy</label>
            <div className="flex items-center gap-3 bg-gray-100 border-2 border-black p-4">
              <input
                type="number"
                placeholder="0"
                value={buyAmount}
                disabled
                className="flex-1 bg-transparent text-black text-2xl outline-none font-bold"
              />
              <span className="text-black font-bold text-lg">{buyToken}</span>
            </div>
          </div>

          {/* PRICE DETAILS */}
          {sellAmount && pool && (
            <div className="mb-4 p-3 bg-gray-100 border border-black text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-700">Price Impact</span>
                <span
                  className={`font-bold ${
                    getPriceImpact(parseFloat(sellAmount), parseFloat(buyAmount), pool.reserveA, pool.reserveB) > 5 ? "text-red-600" : "text-black"
                  }`}
                >
                  {getPriceImpact(parseFloat(sellAmount), parseFloat(buyAmount), pool.reserveA, pool.reserveB).toFixed(2)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Min. Received</span>
                <span className="font-bold text-black">
                  {getminimumAmountOut(parseFloat(buyAmount)).toFixed(6)} {buyToken}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Slippage</span>
                <span className="font-bold text-black">{slippage}%</span>
              </div>
            </div>
          )}

          {/* ACTION */}
          <button
            onClick={handleSwap}
            disabled={isSwapping || !sellAmount || !!error}
            className="w-full bg-black hover:bg-gray-800 disabled:opacity-50 text-white font-bold py-4 border-2 border-black transition"
          >
            {isSwapping ? "Swapping..." : "Swap"}
          </button>
        </div>

        <p className="text-center text-gray-600 text-xs mt-4">
          Constant Product AMM · Solana Devnet
        </p>
      </div>
    </motion.div>
  );
  }

  return <div>Please connect your wallet</div>;
}
