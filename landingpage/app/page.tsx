
import Navbar from "./components/navbar";
import Hero from "./components/herosection";
import Bt from "./components/bt";

export default function Home() {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:3001";

  return (
    <main className="landing-shell">
      <Navbar backendUrl={backendUrl} />
      <Hero backendUrl={backendUrl} />
      <Bt />
    </main>
  );
}
