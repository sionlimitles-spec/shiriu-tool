import ToolSection from "@/components/ui/ToolSection";

export default function Home() {
  return (
    <div className="wrap">
      <section className="hero">
        <span className="status"><i className="dot"></i>System Online v2.0</span>
        <h1>Semua Tools <span className="grad">dalam Satu Genggaman</span></h1>
        <p>Streaming, download media, dan kecerdasan buatan. Gratis, cepat, tanpa ribet.</p>
        <div className="stats">
          <span className="stat"><b>6</b>Tools</span>
          <span className="stat"><b>24/7</b>Online</span>
          <span className="stat"><b>0</b>Biaya</span>
        </div>
      </section>
      
      <ToolSection />
      
      <p className="foot">© SHIRIUTOOL · Dibuat dengan ♥</p>
    </div>
  );
}
