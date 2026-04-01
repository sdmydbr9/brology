import { useEffect, useRef, type CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import student1 from "@/assets/student-1.jpg";
import student2 from "@/assets/student-2.jpg";
import student3 from "@/assets/student-3.jpg";
import student4 from "@/assets/student-4.jpg";
import student5 from "@/assets/student-5.jpg";
import student6 from "@/assets/student-6.jpg";

gsap.registerPlugin(ScrollTrigger);

const testimonialTheme = {
  "--background": "48 14% 97%",
  "--foreground": "150 10% 12%",
  "--card": "48 14% 97%",
  "--card-foreground": "150 10% 12%",
  "--primary": "152 85% 18%",
  "--primary-foreground": "48 14% 97%",
  "--secondary": "150 16% 90%",
  "--secondary-foreground": "150 10% 12%",
  "--muted": "150 16% 90%",
  "--muted-foreground": "150 8% 46%",
  "--accent": "148 100% 26%",
  "--accent-foreground": "48 14% 97%",
  "--border": "150 14% 82%",
  "--input": "150 14% 82%",
  "--ring": "152 85% 18%",
  "--radius": "0.75rem",
  "--eucalyptus": "150 14% 80%",
  "--emerald-brand": "152 92% 18%",
} as CSSProperties;

const testimonials = [
  {
    name: "Arjun Mehta",
    course: "NEET Prep '24",
    quote:
      "Brology completely transformed how I approach Biology. The structured methodology and passionate teaching helped me score 680+ in NEET. Forever grateful!",
    image: student1,
    score: "AIR 342",
  },
  {
    name: "Priya Sharma",
    course: "NEET Prep '24",
    quote:
      "The way complex topics like Genetics and Ecology were simplified was remarkable. I went from struggling to topping my batch in just 4 months.",
    image: student2,
    score: "AIR 1,204",
  },
  {
    name: "Rohan Gupta",
    course: "Foundation '23",
    quote:
      "Starting early at Brology gave me an incredible edge. The conceptual clarity I built here made my 11th and 12th grade biology feel effortless.",
    image: student3,
    score: "98.6%",
  },
  {
    name: "Ananya Krishnan",
    course: "NEET Prep '24",
    quote:
      "What sets Brology apart is the personal attention. Every doubt was addressed, every weakness turned into strength. This is coaching done right.",
    image: student4,
    score: "AIR 89",
  },
  {
    name: "Vikram Singh",
    course: "Crash Course '24",
    quote:
      "I joined the crash course with just 3 months to go. The focused curriculum and test series pushed my Biology score from 280 to 340. Incredible results!",
    image: student5,
    score: "AIR 2,100",
  },
  {
    name: "Sneha Patel",
    course: "NEET Prep '23",
    quote:
      "Beyond academics, Brology taught me discipline and a love for the subject. The mentors here don't just teach — they inspire you to be your best.",
    image: student6,
    score: "AIR 567",
  },
];

const TestTubeIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-emerald-brand"
  >
    <path
      d="M15 4h10M17 4v12l-7 14a4 4 0 003.5 6h13a4 4 0 003.5-6l-7-14V4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 28c3-2 7-2 10 0s7 2 10 0"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="18" cy="24" r="1.5" fill="currentColor" opacity="0.5" />
    <circle cx="24" cy="22" r="1" fill="currentColor" opacity="0.4" />
    <path
      d="M18 4c0-1 1-3 0-4M22 4c0-1.5 1.5-2.5 0-4M20 3c0-1 .5-2 0-3"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      opacity="0.3"
    />
  </svg>
);

const FloatingParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      opacity: number;
    }[] = [];
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 3 + 1,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.15 + 0.05,
      });
    }

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(150, 14%, 80%, ${p.opacity})`;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `hsla(150, 14%, 80%, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
};

const TestimonialSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const coverCardRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const envelope = envelopeRef.current;
    const coverCard = coverCardRef.current;
    const metrics = metricsRef.current;
    const cta = ctaRef.current;
    const header = headerRef.current;
    if (!section || !envelope || !coverCard || !metrics || !cta || !header) return;

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    const ctx = gsap.context(() => {
      const fanPositions = [
        { x: -420, y: -220, r: -8 },
        { x: 0, y: -280, r: 3 },
        { x: 420, y: -220, r: 7 },
        { x: -380, y: 80, r: -5 },
        { x: 0, y: 40, r: 2 },
        { x: 380, y: 80, r: 6 },
      ];

      const gridPositions = [
        { x: -380, y: -200, r: 0 },
        { x: 0, y: -200, r: 0 },
        { x: 380, y: -200, r: 0 },
        { x: -380, y: 120, r: 0 },
        { x: 0, y: 120, r: 0 },
        { x: 380, y: 120, r: 0 },
      ];

      gsap.set(cards, {
        x: 0,
        y: 0,
        rotation: () => (Math.random() - 0.5) * 4,
        opacity: 0,
        scale: 0.9,
      });
      gsap.set(coverCard, { opacity: 1, y: 60, scale: 1 });
      gsap.set(metrics, { opacity: 0, y: 30 });
      gsap.set(cta, { opacity: 0, y: 40 });

      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=3000",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      masterTl
        .to(
          header,
          {
            y: -120,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          0
        )
        .to(
          envelope,
          {
            y: 300,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          0
        )
        .to(
          coverCard,
          {
            y: -350,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
          },
          0
        )
        .to(
          coverCard,
          {
            opacity: 0,
            scale: 0.85,
            duration: 0.4,
            ease: "power2.out",
          },
          0.6
        );

      cards.forEach((card, i) => {
        const fan = fanPositions[i];
        masterTl.to(
          card,
          {
            x: fan.x,
            y: fan.y,
            rotation: fan.r,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "elastic.out(1, 0.7)",
          },
          0.3 + i * 0.08
        );
      });

      masterTl.to(
        metrics,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        0.8
      );

      cards.forEach((card, i) => {
        const grid = gridPositions[i];
        masterTl.to(
          card,
          {
            x: grid.x,
            y: grid.y,
            rotation: grid.r,
            duration: 1,
            ease: "power3.inOut",
          },
          1.8 + i * 0.05
        );
      });

      masterTl.to(
        cta,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        2.4
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-background"
      style={testimonialTheme}
    >
      <FloatingParticles />

      <div
        ref={headerRef}
        className="absolute left-0 right-0 top-8 z-10 text-center pointer-events-none"
      >
        <p className="mb-2 text-sm font-sans uppercase tracking-[0.3em] text-muted-foreground">
          Testimonials
        </p>
        <h2 className="font-serif text-5xl font-semibold text-foreground md:text-6xl">
          Hear it from them
        </h2>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div ref={envelopeRef} className="absolute z-10">
          <div className="relative h-[300px] w-[400px] md:h-[380px] md:w-[520px]">
            <div
              className="absolute -top-[70px] left-0 right-0 z-0 h-[90px] md:-top-[90px] md:h-[110px]"
              style={{
                clipPath: "polygon(0 100%, 50% 0, 100% 100%)",
                background:
                  "linear-gradient(180deg, hsl(152, 92%, 22%) 0%, hsl(152, 92%, 18%) 100%)",
                transformOrigin: "bottom center",
                transform: "rotateX(180deg)",
              }}
            />

            <div
              ref={coverCardRef}
              className="absolute left-1/2 top-[-40px] z-10 flex w-[300px] -translate-x-1/2 flex-col items-center gap-4 rounded-xl border border-eucalyptus bg-card p-8 shadow-xl md:top-[-50px] md:w-[380px]"
            >
              <TestTubeIcon />
              <h3 className="font-serif text-center text-2xl leading-tight text-foreground md:text-3xl">
                Voices of
                <br />
                Brology
              </h3>
              <p className="font-sans text-sm text-muted-foreground">Scroll to reveal</p>
            </div>

            <div
              className="absolute inset-0 z-20 rounded-lg shadow-2xl"
              style={{
                background:
                  "linear-gradient(135deg, hsl(152, 92%, 18%) 0%, hsl(152, 85%, 14%) 100%)",
              }}
            >
              <div
                className="absolute left-0 right-0 top-0 z-10 h-[80px] md:h-[100px]"
                style={{
                  clipPath: "polygon(0 0, 50% 100%, 100% 0)",
                  background:
                    "linear-gradient(180deg, hsl(152, 92%, 20%) 0%, hsl(152, 92%, 16%) 100%)",
                  opacity: 0.6,
                }}
              />
              <div
                className="absolute -top-px left-0 right-0 h-[2px]"
                style={{ background: "hsl(48, 14%, 97%)" }}
              />
              <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                <span
                  className="font-serif text-lg uppercase tracking-[0.25em]"
                  style={{ color: "hsl(48, 14%, 97%)" }}
                >
                  Brology
                </span>
              </div>
            </div>
          </div>
        </div>

        {testimonials.map((t, i) => (
          <div
            key={t.name}
            ref={(el) => {
              cardsRef.current[i] = el;
            }}
            className="absolute z-10 flex w-[300px] flex-col gap-3 rounded-xl border border-eucalyptus bg-card p-6 shadow-xl md:w-[340px]"
          >
            <div className="flex items-center gap-3">
              <img
                src={t.image}
                alt={t.name}
                className="h-12 w-12 rounded-full border-2 border-secondary object-cover"
              />
              <div>
                <p className="font-sans text-sm font-semibold text-foreground">{t.name}</p>
                <p className="font-sans text-xs text-muted-foreground">{t.course}</p>
              </div>
              <span className="ml-auto font-sans text-xs font-semibold text-accent">
                {t.score}
              </span>
            </div>
            <blockquote className="font-sans text-sm leading-relaxed text-foreground">
              "{t.quote}"
            </blockquote>
          </div>
        ))}

        <div
          ref={metricsRef}
          className="absolute bottom-24 left-0 right-0 z-30 flex justify-center gap-12"
        >
          {[
            { label: "Students Mentored", value: "500+" },
            { label: "Average NEET Score", value: "650+" },
            { label: "Selections in Top 1K", value: "42" },
          ].map((m) => (
            <div key={m.label} className="text-center">
              <p className="font-serif text-3xl font-bold text-accent">{m.value}</p>
              <p className="mt-1 font-sans text-xs uppercase tracking-wider text-muted-foreground">
                {m.label}
              </p>
            </div>
          ))}
        </div>

        <div ref={ctaRef} className="absolute bottom-8 z-30">
          <button className="rounded-lg bg-primary px-8 py-3 font-sans text-sm font-semibold tracking-wide text-primary-foreground shadow-lg transition-shadow duration-300 hover:shadow-xl">
            Explore Our Full Story
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
