import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FlaskConical } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Rina Dasgupta",
    course: "NEET Prep '24",
    quote:
      "Brology didn't just teach me biology — it taught me how to think like a scientist. Every concept clicked into place.",
    metric: "Loved by 500+",
    avatar: "RD",
  },
  {
    name: "Arjun Mehta",
    course: "NEET Prep '23",
    quote:
      "The practical labs changed everything. I could finally see what I was studying — anatomy became intuitive.",
    metric: "4.9★ Rated",
    avatar: "AM",
  },
  {
    name: "Priya Sharma",
    course: "NEET Prep '25",
    quote:
      "Small batches meant I could never hide. And that's exactly what I needed to grow into a disciplined aspirant.",
    metric: "Top 1% Batch",
    avatar: "PS",
  },
  {
    name: "Sourav Kar",
    course: "NEET Prep '24",
    quote:
      "My mentors here knew my weaknesses before I did. That's real coaching — personal, precise, and unrelenting.",
    metric: "Loved by 350+",
    avatar: "SK",
  },
  {
    name: "Meera Iyer",
    course: "NEET Prep '25",
    quote:
      "I joined Brology skeptical. I left with a rank I never dreamed of. The faculty here redefine commitment.",
    metric: "98.6 Percentile",
    avatar: "MI",
  },
  {
    name: "Debojit Roy",
    course: "NEET Prep '23",
    quote:
      "The way they break down genetics and ecology — it's almost cinematic. You remember it because you felt it.",
    metric: "Loved by 420+",
    avatar: "DR",
  },
];

/* Floating particles canvas */
const ParticleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      const scale = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));

      canvas.width = width * scale;
      canvas.height = height * scale;
      ctx.scale(scale, scale);

      const time = Date.now() * 0.0004;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < 35; i++) {
        const x = ((Math.sin(time + i * 1.7) + 1) / 2) * width;
        const y = ((Math.cos(time * 0.7 + i * 2.3) + 1) / 2) * height;
        const radius = 1.5 + Math.sin(time + i) * 1;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = "hsla(148, 90%, 18%, 0.15)";
        ctx.fill();
      }

      for (let i = 0; i < 8; i++) {
        const x1 = ((Math.sin(time * 0.5 + i * 3.1) + 1) / 2) * width;
        const y1 = ((Math.cos(time * 0.3 + i * 2.7) + 1) / 2) * height;
        const x2 = x1 + Math.cos(time + i) * 40;
        const y2 = y1 + Math.sin(time + i) * 40;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = "hsla(150, 12%, 80%, 0.08)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
};

const TestimonialStack = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = gsap.matchMedia();

    media.add("(min-width: 1024px)", () => {
      if (!sectionRef.current || !pinWrapRef.current) {
        return undefined;
      }

      const ctx = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>(pinWrapRef.current?.querySelectorAll(".testi-card"));
        const centerStack = pinWrapRef.current?.querySelector<HTMLElement>(".center-stack");
        const finalGrid = pinWrapRef.current?.querySelector<HTMLElement>(".final-grid");
        const metrics = gsap.utils.toArray<HTMLElement>(pinWrapRef.current?.querySelectorAll(".testi-metric"));

        if (!centerStack || !finalGrid || cards.length === 0) return;

        gsap.set(cards, {
          position: "absolute",
          top: "50%",
          left: "50%",
          xPercent: -50,
          yPercent: -50,
          opacity: 0,
          scale: 0.7,
          rotation: () => gsap.utils.random(-8, 8),
        });

        gsap.set(metrics, { opacity: 0, y: 20 });
        gsap.set(finalGrid, { opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=300%",
            pin: pinWrapRef.current,
            scrub: 1,
            anticipatePin: 1,
          },
        });

        tl.fromTo(
          centerStack,
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.1, ease: "power3.out" },
          0,
        );

        const fanPositions = [
          { x: -28, y: -30, rot: -6 },
          { x: 0, y: -34, rot: 2 },
          { x: 28, y: -30, rot: 5 },
          { x: -28, y: 20, rot: -4 },
          { x: 0, y: 24, rot: -1 },
          { x: 28, y: 20, rot: 3 },
        ];

        cards.forEach((card, i) => {
          const pos = fanPositions[i % fanPositions.length];
          tl.to(
            card,
            {
              opacity: 1,
              scale: 0.85,
              x: `${pos.x}vw`,
              y: `${pos.y}vh`,
              xPercent: -50,
              yPercent: -50,
              rotation: pos.rot,
              duration: 0.35,
              ease: "power3.out",
            },
            0.1 + i * 0.04,
          );
        });

        tl.to(
          centerStack,
          { scale: 0.6, opacity: 0, duration: 0.25, ease: "power2.in" },
          0.2,
        );

        metrics.forEach((metric, i) => {
          tl.to(
            metric,
            { opacity: 1, y: 0, duration: 0.15, ease: "power2.out" },
            0.25 + i * 0.03,
          );
        });

        cards.forEach((card, i) => {
          tl.to(
            card,
            {
              position: "relative",
              x: 0,
              y: 0,
              xPercent: 0,
              yPercent: 0,
              scale: 1,
              rotation: 0,
              opacity: 0,
              duration: 0.2,
              ease: "power3.inOut",
            },
            0.55 + i * 0.02,
          );
        });

        tl.to(finalGrid, { opacity: 1, duration: 0.2, ease: "power2.out" }, 0.62);
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => media.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative">
      <div className="bg-midnight px-6 py-24 lg:hidden">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <p className="mb-4 font-sans text-xs uppercase tracking-[0.25em] text-muted">
              Student Voices
            </p>
            <h3 className="font-serif text-4xl font-bold leading-tight text-primary-foreground sm:text-5xl">
              Stories from the Brology bench.
            </h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <div
                key={`mobile-${index}`}
                className="rounded-2xl border p-5"
                style={{
                  backgroundColor: "hsla(140, 16%, 92%, 0.07)",
                  borderColor: "hsla(150, 12%, 80%, 0.12)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full font-serif text-sm font-bold"
                    style={{
                      backgroundColor: "hsla(148, 90%, 18%, 0.2)",
                      color: "hsl(148, 90%, 18%)",
                    }}
                  >
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-serif text-sm font-semibold text-primary-foreground">
                      {testimonial.name}
                    </p>
                    <p className="font-sans text-xs text-muted">{testimonial.course}</p>
                  </div>
                </div>
                <p className="mb-3 font-sans text-sm leading-relaxed text-primary-foreground/90">
                  "{testimonial.quote}"
                </p>
                <p className="font-sans text-xs font-semibold uppercase tracking-wide text-emerald">
                  {testimonial.metric}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        ref={pinWrapRef}
        className="relative hidden h-screen w-full overflow-hidden lg:block"
        style={{ backgroundColor: "hsl(155, 32%, 8%)" }}
      >
        <ParticleCanvas />

        {/* ——— Center Stack (State 1) ——— */}
        <div className="center-stack absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="relative w-[340px] sm:w-[400px] rounded-2xl border border-muted/20 p-8 sm:p-10 text-center"
            style={{ backgroundColor: "hsla(155, 20%, 14%, 0.9)", backdropFilter: "blur(12px)" }}
          >
            {/* Stacked card shadow layers */}
            <div className="absolute inset-0 rounded-2xl border border-muted/10 -translate-y-2 translate-x-1 -z-10"
              style={{ backgroundColor: "hsla(155, 20%, 14%, 0.5)" }}
            />
            <div className="absolute inset-0 rounded-2xl border border-muted/5 -translate-y-4 translate-x-2 -z-20"
              style={{ backgroundColor: "hsla(155, 20%, 14%, 0.3)" }}
            />

            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "hsla(148, 90%, 18%, 0.2)" }}
              >
                <FlaskConical className="h-8 w-8" style={{ color: "hsl(148, 90%, 18%)" }} />
              </div>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-4"
              style={{ color: "hsl(60, 14%, 97%)" }}
            >
              Voices of Brology
            </h3>
            <p className="font-sans text-sm leading-relaxed"
              style={{ color: "hsl(150, 12%, 80%)" }}
            >
              "Small batches. Big transformations. Hear what our students have to say."
            </p>
            <div className="mt-6 flex justify-center gap-1">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "hsl(148, 90%, 18%)" }} />
              ))}
            </div>
          </div>
        </div>

        {/* ——— Fan-out Cards (State 2) ——— */}
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="testi-card w-[280px] sm:w-[320px] rounded-2xl border p-6 sm:p-7 z-10"
            style={{
              backgroundColor: "hsla(140, 16%, 92%, 0.08)",
              borderColor: "hsla(150, 12%, 80%, 0.15)",
              backdropFilter: "blur(8px)",
            }}
          >
            {/* Avatar */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className="h-11 w-11 rounded-full flex items-center justify-center font-serif text-sm font-bold"
                style={{
                  backgroundColor: "hsla(148, 90%, 18%, 0.2)",
                  color: "hsl(148, 90%, 18%)",
                }}
              >
                {t.avatar}
              </div>
              <div>
                <p className="font-serif text-base font-semibold" style={{ color: "hsl(60, 14%, 97%)" }}>
                  {t.name}
                </p>
                <p className="font-sans text-xs" style={{ color: "hsl(150, 12%, 80%)" }}>
                  {t.course}
                </p>
              </div>
            </div>
            <p className="font-sans text-sm leading-relaxed mb-4" style={{ color: "hsl(60, 14%, 97%)" }}>
              "{t.quote}"
            </p>
            <p className="testi-metric font-sans text-xs font-semibold tracking-wide uppercase"
              style={{ color: "hsl(148, 90%, 18%)" }}
            >
              {t.metric}
            </p>
          </div>
        ))}

        {/* ——— Final Grid (State 3) ——— */}
        <div className="final-grid absolute inset-0 z-30 flex flex-col items-center justify-center px-6 sm:px-10 lg:px-16">
          <div className="grid w-full max-w-6xl grid-cols-2 gap-5 xl:grid-cols-3">
            {testimonials.map((t, i) => (
              <div
                key={`grid-${i}`}
                className="rounded-2xl border p-6 lg:p-7"
                style={{
                  backgroundColor: "hsla(140, 16%, 92%, 0.07)",
                  borderColor: "hsla(150, 12%, 80%, 0.12)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="h-10 w-10 rounded-full flex items-center justify-center font-serif text-sm font-bold"
                    style={{
                      backgroundColor: "hsla(148, 90%, 18%, 0.2)",
                      color: "hsl(148, 90%, 18%)",
                    }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-serif text-sm font-semibold" style={{ color: "hsl(60, 14%, 97%)" }}>
                      {t.name}
                    </p>
                    <p className="font-sans text-xs" style={{ color: "hsl(150, 12%, 80%)" }}>
                      {t.course}
                    </p>
                  </div>
                </div>
                <p className="font-sans text-sm leading-relaxed mb-3" style={{ color: "hsla(60, 14%, 97%, 0.9)" }}>
                  "{t.quote}"
                </p>
                <p className="font-sans text-xs font-semibold tracking-wide uppercase"
                  style={{ color: "hsl(148, 90%, 18%)" }}
                >
                  {t.metric}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialStack;
