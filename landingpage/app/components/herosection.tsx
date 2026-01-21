



  export default function Hero() {
    return (
      <section className="relative w-full flex flex-col items-center justify-center px-4 m-0 p-0 z-0 overflow-hidden min-h-[60vh]">
       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl w-full relative z-10">
          <div className="relative flex-col justify-center text-white font-mono">
            <h1 className="text-3xl md:text-4xl lg:text-5xl leading-tight">
              Launch Your Solana Token
              in Seconds
              <svg width="100%" height="auto" viewBox="0 0 91 82" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 cursor-pointer">
                    <path d="M21.6641 0.5L34.0859 31.0781L0.5 17.1211V0.5H21.6641Z" fill="#010101" stroke="#DBDBDB"/>
                    <path d="M90.5 0.5V17.6611L56.9043 31.0996L69.3359 0.5H90.5Z" fill="#010101"  stroke="#DBDBDB"/>
                    <rect x="35.5" y="0.5" width="20" height="17" fill="#010101" stroke="#DBDBDB"/>
                    <rect x="0.5" y="32.5" width="21" height="17" fill="#010101" stroke="#DBDBDB"/>
                    <rect x="69.5" y="32.5" width="21" height="17" fill="#010101" stroke="#DBDBDB"/>
                    <rect x="35.5" y="32.5" width="20" height="17" fill="#010101" stroke="#DBDBDB"/>
                    <path d="M21.6641 81.5H0.5V64.3379L34.0947 50.8994L21.6641 81.5Z" fill="#010101" stroke="#DBDBDB"/>
                    <path d="M90.5 64.3379V81.5H69.3359L56.9043 50.8994L90.5 64.3379Z" fill="#010101" stroke="#DBDBDB"/>
                    <rect x="35.5" y="64.5" width="20" height="17" fill="#010101" stroke="#DBDBDB"/>
                    </svg>
            </h1>
            <div className="mt-8">
              <button className="bg-white text-black px-6 py-2 hover:underline underline-offset-4 transition">
                Create Token
              </button>
            </div>
          </div>
          <div className="relative flex-col justify-end text-white font-mono top-5">
            <p className="text-xl md:text-2xl leading-relaxed">
              <span className="bg-red-700 px-2 py-1 mr-1 inline-block">
                Create SPL tokens
              </span>
              mint supply, and launch liquidity — all on-chain, no code.
            </p>
            <div className="mt-8">
              <button className="bg-white text-black px-6 py-2 hover:underline underline-offset-4 transition">
                How it works
              </button>
            </div>
          </div>
        </div>
      </section>
    );
}
