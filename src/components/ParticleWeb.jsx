import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticleWeb = () => {
  const [init, setInit] = useState(false);
  const [particleCount, setParticleCount] = useState(85);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => setParticleCount(mq.matches ? 42 : 85);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  if (!init) return null;

  return (
    <div className="fixed inset-0 z-[1] mix-blend-screen opacity-[0.55] pointer-events-none max-md:opacity-[0.45]">
      <Particles
        key={particleCount}
        id="tsparticles"
        options={{
          fullScreen: { enable: false },
          background: { color: { value: "transparent" } },
          fpsLimit: 75,
          interactivity: {
            detectsOn: "window",
            events: {
              onHover: { enable: true, mode: "grab" },
              resize: true,
            },
            modes: {
              grab: { distance: 200, links: { opacity: 0.65, color: "#a5b4fc" } }
            },
          },
          particles: {
            color: { value: "#ffffff" },
            links: {
              color: "#c7d2fe",
              distance: 150,
              enable: true,
              opacity: 0.22,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: { default: "bounce" },
              random: false,
              speed: 0.4,
              straight: false,
            },
            number: {
              density: { enable: true, area: 800 },
              value: particleCount,
            },
            opacity: { value: { min: 0.35, max: 0.65 } },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 2.5 } },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
};

export default ParticleWeb;
