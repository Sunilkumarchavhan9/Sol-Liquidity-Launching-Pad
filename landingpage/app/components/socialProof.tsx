

export default function SocialProof(){

    return(
      <div className="flex items-center justify-center w-full h-screen">
            <div className="relative w-full h-full overflow-hidden bg-black flex items-center justify-center">
                {/* SVG noise overlay */}
                <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" viewBox="0 0 2440 2024" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                  <g filter="url(#filter0_nfn_249_10)">
                    <rect width="1440" height="1024" transform="translate(500 500)" fill="white"/>
                  </g>
                  <defs>
                    <filter id="filter0_nfn_249_10" x="0" y="0" width="2440" height="2024" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                      <feTurbulence type="fractalNoise" baseFrequency="2 2" stitchTiles="stitch" numOctaves="3" result="noise" seed="4034" />
                      <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise" />
                      <feComponentTransfer in="alphaNoise" result="coloredNoise1">
                        <feFuncA type="discrete" tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 "/>
                      </feComponentTransfer>
                      <feComposite operator="in" in2="shape" in="coloredNoise1" result="noise1Clipped" />
                      <feFlood flood-color="rgba(0, 0, 0, 0.25)" result="color1Flood" />
                      <feComposite operator="in" in2="noise1Clipped" in="color1Flood" result="color1" />
                      <feMerge result="effect1_noise_249_10">
                        <feMergeNode in="shape" />
                        <feMergeNode in="color1" />
                      </feMerge>
                      <feGaussianBlur stdDeviation="250" result="effect2_foregroundBlur_249_10"/>
                      <feTurbulence type="fractalNoise" baseFrequency="2 2" stitchTiles="stitch" numOctaves="3" result="noise" seed="1061" />
                      <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise" />
                      <feComponentTransfer in="alphaNoise" result="coloredNoise1">
                        <feFuncA type="discrete" tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 "/>
                      </feComponentTransfer>
                      <feComposite operator="in" in2="effect2_foregroundBlur_249_10" in="coloredNoise1" result="noise1Clipped" />
                      <feFlood flood-color="rgba(0, 0, 0, 0.25)" result="color1Flood" />
                      <feComposite operator="in" in2="noise1Clipped" in="color1Flood" result="color1" />
                      <feMerge result="effect3_noise_249_10">
                        <feMergeNode in="effect2_foregroundBlur_249_10" />
                        <feMergeNode in="color1" />
                      </feMerge>
                    </filter>
                  </defs>
                </svg>
  {/* Purple blob */}
  <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-600 rounded-full blur-[180px] opacity-70" />

  {/* Blue blob */}
  <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600 rounded-full blur-[180px] opacity-70" />

  {/* Green blob */}
  <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-lime-500 rounded-full blur-[200px] opacity-60" />

  {/* Red blob */}
  <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-red-600 rounded-full blur-[180px] opacity-60" />

  {/* Content */}
  <div className="relative z-10 text-white p-10">
  
  </div>
</div>

        </div>
    )
}