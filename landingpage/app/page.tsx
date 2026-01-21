
import Navbar from "./components/navbar";
import Hero from "./components/herosection";
import TrustSection from "./components/trustSec";
import Bt from "./components/bt";
import SocialProof from "./components/socialProof";




export default function Home() {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Bt/>
      <TrustSection/>
      <SocialProof/>
    </div>
  );
}
