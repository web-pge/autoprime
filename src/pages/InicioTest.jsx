// src/pages/Inicio.jsx

import { useState, useEffect } from "react";
import C from "../constants/theme";
import { useVehiculos } from "../hooks/useVehiculos";

import Hero                from "../components/home/Hero";
import TrustBar            from "../components/home/TrustBar";
import Buscador            from "../components/home/Buscador";
import WhyAutoPrime        from "../components/home/WhyAutoPrime";
import CarruselDestacados  from "../components/home/CarruselDestacados";
import DondeEstamos        from "../components/home/DondeEstamos";

// Estilos globales compartidos por los componentes home/
// Se inyectan una sola vez acá para no repetirlos en cada componente
const HOME_STYLES = `
  @keyframes heroFadeUp {
    from { opacity: 0; transform: translateY(40px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes heroBadge {
    from { opacity: 0; transform: translateY(-12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(197,151,43,0.4); }
    50%       { box-shadow: 0 0 0 10px rgba(197,151,43,0); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-8px); }
  }
  .btn-gold {
    background: linear-gradient(135deg, ${C.gold} 0%, #E8B84B 100%);
    color: #fff; border: none; padding: 14px 28px;
    border-radius: 8px; font-size: 15px; font-weight: 600;
    cursor: pointer; box-shadow: 0 4px 20px rgba(197,151,43,0.35);
    transition: transform .2s, box-shadow .2s;
    animation: pulse 2.5s infinite;
  }
  .btn-gold:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(197,151,43,0.5); animation: none; }
  .btn-ghost {
    background: rgba(255,255,255,0.12); color: #fff;
    border: 1px solid rgba(255,255,255,0.35); padding: 13px 27px;
    border-radius: 8px; font-size: 15px; font-weight: 600;
    cursor: pointer; backdrop-filter: blur(6px);
    transition: background .2s, transform .2s;
  }
  .btn-ghost:hover { background: rgba(255,255,255,0.22); transform: translateY(-2px); }
  .card-trust {
    transition: transform .3s cubic-bezier(.25,.8,.25,1), box-shadow .3s, border-color .3s !important;
  }
  .card-trust:hover {
    transform: translateY(-8px) !important;
    box-shadow: 0 20px 40px rgba(27,42,74,0.1) !important;
    border-color: ${C.gold} !important;
  }
  .why-card {
    transition: transform .3s ease, box-shadow .3s ease;
    position: relative; overflow: hidden;
  }
  .why-card::before {
    content: ''; position: absolute; top: 0; left: -100%;
    width: 60%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
    transition: left .5s ease;
  }
  .why-card:hover::before { left: 150%; }
  .why-card:hover { transform: translateY(-5px); box-shadow: 0 16px 32px rgba(27,42,74,0.08); }
  .featured-card { animation: float 4s ease-in-out infinite; }
  .stat-pill {
    display: flex; align-items: center; gap: 8px;
    background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2);
    border-radius: 100px; padding: 8px 16px;
    backdrop-filter: blur(6px); transition: background .2s;
  }
  .stat-pill:hover { background: rgba(255,255,255,0.2); }
  .arrow-btn {
    background: rgba(255,255,255,0.9); border: 1px solid ${C.border};
    width: 40px; height: 40px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; font-size: 16px;
    transition: background .2s, transform .2s, box-shadow .2s;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }
  .arrow-btn:hover { background: ${C.gold}; color: #fff; transform: scale(1.08); box-shadow: 0 4px 16px rgba(197,151,43,0.3); }
  .dot-nav {
    width: 10px; height: 10px; border-radius: 50%;
    background: #ddd; border: none; cursor: pointer;
    transition: background .3s, transform .2s, width .3s; padding: 0;
  }
  .dot-nav.active { background: ${C.gold}; transform: scale(1.2); width: 24px; border-radius: 5px; }
  .search-btn {
    background: linear-gradient(135deg, ${C.gold}, #E8B84B);
    color: #fff; border: none; padding: 0 24px;
    border-radius: 8px; font-size: 15px; font-weight: 600;
    cursor: pointer; height: 42px;
    box-shadow: 0 4px 12px rgba(197,151,43,0.25);
    transition: transform .2s, box-shadow .2s;
  }
  .search-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(197,151,43,0.4); }
`;

export default function Inicio() {
  const { autos } = useVehiculos();
  const destacados = autos.filter(a => a.destacado);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ background: C.bg, minHeight: "100vh", overflowX: "hidden" }}>
      <style>{HOME_STYLES}</style>
      <Hero scrollY={scrollY} />
      <TrustBar />
      <Buscador />
      <WhyAutoPrime />
      <CarruselDestacados autos={destacados} />
      <DondeEstamos />
    </div>
  );
}