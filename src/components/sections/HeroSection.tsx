import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";

const metricCountDuration = 1.5;

const heroPalette = {
  background: "#fcf7f2",
  ink: "#2f2623",
  muted: "#6d605a",
  accent: "#a46b57",
  line: "#e6d7ca",
  primary: "#2f2623",
  primaryText: "#fff9f4",
  secondarySurface: "rgba(255, 255, 255, 0.78)",
} as const;

const heroStats = [
  { value: 500, suffix: "+", label: "Students Taught" },
  { value: 95, suffix: "%", label: "Success Rate" },
  { value: 8, suffix: "+", label: "Years Experience" },
];

const heroLottieModules = import.meta.glob("../../../lottie/lite/*.lottie", {
  eager: true,
  import: "default",
  query: "?url",
}) as Record<string, string>;

const heroBackgroundFile = "Teacher in Classroom.lottie" as const;
const heroBackgroundSrc =
  heroLottieModules[`../../../lottie/lite/${heroBackgroundFile}`];

function usePrefersReducedMotion() {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setShouldReduceMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return shouldReduceMotion;
}

function MetricCounter({
  delay,
  shouldReduceMotion,
  value,
}: {
  delay: number;
  shouldReduceMotion: boolean;
  value: number;
}) {
  const [displayValue, setDisplayValue] = useState(() =>
    shouldReduceMotion ? value : 0,
  );

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayValue(value);
      return;
    }

    const counter = { value: 0 };

    const tween = gsap.to(counter, {
      value,
      delay,
      duration: metricCountDuration,
      ease: "power3.out",
      onUpdate: () => {
        setDisplayValue(Math.round(counter.value));
      },
    });

    return () => tween.kill();
  }, [delay, shouldReduceMotion, value]);

  return (
    <span className="inline-block min-w-[3ch] text-right tabular-nums">
      {displayValue.toLocaleString()}
    </span>
  );
}

export function HeroSection() {
  const shouldReduceMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const backgroundStageRef = useRef<HTMLDivElement | null>(null);
  const glowTopRef = useRef<HTMLDivElement | null>(null);
  const glowSideRef = useRef<HTMLDivElement | null>(null);
  const titleLineRef = useRef<HTMLSpanElement | null>(null);
  const accentWordRef = useRef<HTMLSpanElement | null>(null);
  const titleTailRef = useRef<HTMLSpanElement | null>(null);
  const bodyCopyRef = useRef<HTMLParagraphElement | null>(null);
  const primaryCtaShellRef = useRef<HTMLDivElement | null>(null);
  const primaryCtaRef = useRef<HTMLAnchorElement | null>(null);
  const primaryCtaLabelRef = useRef<HTMLSpanElement | null>(null);
  const primaryCtaIconRef = useRef<HTMLSpanElement | null>(null);
  const secondaryCtaRef = useRef<HTMLAnchorElement | null>(null);
  const metricRefs = useRef<Array<HTMLDivElement | null>>([]);

  useLayoutEffect(() => {
    if (shouldReduceMotion || !sectionRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const metricNodes = metricRefs.current.filter(
        (node): node is HTMLDivElement => node !== null,
      );
      const secondaryCtaNodes = [secondaryCtaRef.current].filter(
        (node): node is HTMLAnchorElement => node !== null,
      );
      const primaryCta = primaryCtaRef.current;
      const primaryCtaShell = primaryCtaShellRef.current;
      const primaryCtaLabel = primaryCtaLabelRef.current;
      const primaryCtaIcon = primaryCtaIconRef.current;
      const backgroundStage = backgroundStageRef.current;
      const ambientTweens: gsap.core.Animation[] = [];
      const hoverCleanups: Array<() => void> = [];
      const primaryCtaFinalWidth = primaryCta?.offsetWidth ?? 0;
      const primaryCtaHeight = primaryCta?.offsetHeight ?? 0;
      const primaryCtaIconWidth = primaryCtaIcon?.offsetWidth ?? 0;
      const primaryCtaIconStartLeft = primaryCtaHeight / 2;
      const primaryCtaIconEndLeft =
        primaryCtaFinalWidth > 0 && primaryCtaIconWidth > 0
          ? primaryCtaFinalWidth - 32 - primaryCtaIconWidth / 2
          : 0;

      gsap.set(backgroundStage, {
        opacity: 0,
        scale: 1.06,
      });
      gsap.set([glowTopRef.current, glowSideRef.current], {
        opacity: 0,
        scale: 0.84,
      });
      gsap.set(titleLineRef.current, {
        opacity: 0,
        yPercent: 115,
      });
      gsap.set(accentWordRef.current, {
        opacity: 0,
        yPercent: 26,
        scale: 0.96,
      });
      gsap.set(titleTailRef.current, {
        opacity: 0,
        yPercent: 115,
      });
      gsap.set(bodyCopyRef.current, {
        opacity: 0,
        y: 24,
      });
      gsap.set(primaryCtaShell, {
        width: primaryCtaFinalWidth,
        height: primaryCtaHeight,
      });
      gsap.set(primaryCta, {
        opacity: 0,
        y: 20,
        width: primaryCtaHeight,
      });
      gsap.set(primaryCtaLabel, {
        opacity: 0,
        x: -14,
      });
      gsap.set(primaryCtaIcon, {
        left: primaryCtaIconStartLeft,
        xPercent: -50,
      });
      gsap.set(secondaryCtaNodes, {
        opacity: 0,
        y: 20,
        scale: 0.98,
      });
      gsap.set(metricNodes, {
        opacity: 0,
        y: 28,
      });

      const introTimeline = gsap.timeline({
        defaults: {
          duration: 0.9,
          ease: "power3.out",
        },
      });

      introTimeline
        .to(
          backgroundStage,
          {
            opacity: 1,
            scale: 1,
            duration: 1.6,
            ease: "power2.out",
          },
          0.04,
        )
        .to(
          glowTopRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 1.4,
            ease: "power2.out",
          },
          0,
        )
        .to(
          glowSideRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 1.55,
            ease: "power2.out",
          },
          0.08,
        )
        .to(
          titleLineRef.current,
          {
            opacity: 1,
            yPercent: 0,
            duration: 0.95,
          },
          0.18,
        )
        .to(
          accentWordRef.current,
          {
            opacity: 1,
            yPercent: 0,
            scale: 1,
            duration: 1,
            ease: "power4.out",
          },
          0.38,
        )
        .to(
          titleTailRef.current,
          {
            opacity: 1,
            yPercent: 0,
            duration: 0.85,
          },
          0.46,
        )
        .to(
          bodyCopyRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          0.74,
        )
        .to(
          primaryCta,
          {
            opacity: 1,
            y: 0,
            duration: 0.46,
            ease: "power2.out",
          },
          0.92,
        )
        .to(
          primaryCta,
          {
            width: primaryCtaFinalWidth,
            duration: 0.9,
            ease: "power4.out",
          },
          1.02,
        )
        .to(
          primaryCtaIcon,
          {
            left: primaryCtaIconEndLeft,
            duration: 0.9,
            ease: "power4.out",
          },
          1.02,
        )
        .to(
          primaryCtaLabel,
          {
            opacity: 1,
            x: 0,
            duration: 0.44,
            ease: "power2.out",
          },
          1.24,
        )
        .to(
          secondaryCtaNodes,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.72,
          },
          1.12,
        )
        .to(
          metricNodes,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
          },
          1.06,
        );

      ambientTweens.push(
        gsap.to(backgroundStage, {
          x: -18,
          y: 12,
          scale: 1.03,
          duration: 18,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        }),
        gsap.to(glowTopRef.current, {
          x: 24,
          y: -16,
          duration: 13,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        }),
        gsap.to(glowSideRef.current, {
          x: -28,
          y: 20,
          duration: 15,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        }),
      );

      const addHoverLift = (
        element: HTMLAnchorElement | null,
        enterVars: gsap.TweenVars,
        leaveVars: gsap.TweenVars,
      ) => {
        if (!element) {
          return;
        }

        const handleEnter = () => {
          gsap.to(element, {
            duration: 0.35,
            ease: "power2.out",
            overwrite: "auto",
            ...enterVars,
          });
        };

        const handleLeave = () => {
          gsap.to(element, {
            duration: 0.45,
            ease: "power3.out",
            overwrite: "auto",
            ...leaveVars,
          });
        };

        element.addEventListener("mouseenter", handleEnter);
        element.addEventListener("mouseleave", handleLeave);
        element.addEventListener("focus", handleEnter);
        element.addEventListener("blur", handleLeave);

        hoverCleanups.push(() => {
          element.removeEventListener("mouseenter", handleEnter);
          element.removeEventListener("mouseleave", handleLeave);
          element.removeEventListener("focus", handleEnter);
          element.removeEventListener("blur", handleLeave);
        });
      };

      addHoverLift(
        primaryCtaRef.current,
        {
          y: -3,
          scale: 1.015,
          boxShadow: "0 30px 56px rgba(99, 67, 52, 0.2)",
          filter: "brightness(1.04)",
        },
        {
          y: 0,
          scale: 1,
          boxShadow: "0 22px 40px rgba(127, 94, 77, 0.16)",
          filter: "brightness(1)",
        },
      );
      addHoverLift(
        secondaryCtaRef.current,
        {
          y: -3,
          scale: 1.015,
          boxShadow: "0 24px 44px rgba(167, 133, 109, 0.16)",
          backgroundColor: "#fffdf9",
        },
        {
          y: 0,
          scale: 1,
          boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
          backgroundColor: heroPalette.secondarySurface,
        },
      );

      return () => {
        introTimeline.kill();
        ambientTweens.forEach((tween) => tween.kill());
        hoverCleanups.forEach((cleanup) => cleanup());
      };
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: heroPalette.background }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          ref={backgroundStageRef}
          className="absolute inset-y-[-10%] left-[-8%] right-[-8%] will-change-transform md:left-[18%] md:right-[-6%]"
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 68% 28%, rgba(234, 223, 212, 0.18) 0%, rgba(252, 247, 242, 0) 42%)",
            }}
          />

          {heroBackgroundSrc ? (
            <DotLottieReact
              key={heroBackgroundFile}
              src={heroBackgroundSrc}
              autoplay
              loop
              useFrameInterpolation={false}
              renderConfig={{ autoResize: true }}
              className="h-full w-full scale-[1.18] opacity-[0.38] md:scale-[1.08]"
            />
          ) : null}

          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(252,247,242,0.94) 0%, rgba(252,247,242,0.84) 22%, rgba(252,247,242,0.34) 52%, rgba(252,247,242,0.88) 100%)",
            }}
          />
        </div>

        <div
          ref={glowTopRef}
          className="absolute -top-24 -left-16 h-[420px] w-[420px] rounded-full blur-[120px] will-change-transform"
          style={{ background: "rgba(234, 223, 212, 0.88)" }}
        />

        <div
          ref={glowSideRef}
          className="absolute right-[-80px] top-28 h-[420px] w-[420px] rounded-full blur-[130px] will-change-transform"
          style={{ background: "rgba(204, 175, 157, 0.42)" }}
        />

        <div
          className="absolute inset-0 opacity-[0.62]"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.18) 38%, rgba(252,247,242,0.08) 100%)",
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(164, 107, 87, 0.28) 0.8px, transparent 0.8px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 py-20">
        <h1
          aria-label="Swrwngdi Phwrwngdi Rwngdi"
          className="max-w-4xl text-5xl md:text-7xl lg:text-[5.5rem] font-serif font-bold leading-[1.02]"
          style={{ color: heroPalette.ink }}
        >
          <span className="block overflow-hidden pb-2">
            <span ref={titleLineRef} className="block will-change-transform">
              Swrwngdi
            </span>
          </span>

          <span className="block overflow-visible pb-4 md:pb-6">
            <span className="block overflow-hidden pb-2">
              <span ref={accentWordRef} className="block will-change-transform">
                Phwrwngdi
              </span>
            </span>

            <span className="mt-1 block overflow-visible pb-2 md:mt-2">
              <span
                ref={titleTailRef}
                className="inline-block font-script text-[4.3rem] leading-[0.92] md:text-[5.8rem] lg:text-[6.8rem] will-change-transform"
                style={{ color: heroPalette.accent }}
              >
                Rwngdi
              </span>
            </span>
          </span>
        </h1>

        <p
          ref={bodyCopyRef}
          className="max-w-xl text-lg md:text-xl leading-relaxed mt-6 will-change-transform"
          style={{ color: heroPalette.muted }}
        >
          Where curiosity meets clarity. Small batches, expert mentors, and a warm,
          high-touch learning rhythm that makes biology feel polished, calm, and deeply
          personal.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <div ref={primaryCtaShellRef} className="relative inline-flex self-start">
            <a
              ref={primaryCtaRef}
              href="#contact"
              className="relative inline-flex items-center overflow-hidden whitespace-nowrap rounded-full px-8 py-4 text-sm font-medium transition-[transform,box-shadow,filter] duration-500 shadow-[0_22px_40px_rgba(127,94,77,0.16)] will-change-transform"
              style={{
                backgroundColor: heroPalette.primary,
                color: heroPalette.primaryText,
              }}
            >
              <span aria-hidden="true" className="invisible flex items-center gap-2">
                <span>Book a Free Trial</span>
                <ArrowRight className="h-4 w-4" />
              </span>

              <span
                ref={primaryCtaLabelRef}
                aria-hidden="true"
                className="pointer-events-none absolute left-8 top-1/2 -translate-y-1/2"
              >
                Book a Free Trial
              </span>

              <span
                ref={primaryCtaIconRef}
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 -translate-y-1/2"
              >
                <ArrowRight className="h-4 w-4" />
              </span>

              <span className="sr-only">Book a Free Trial</span>
            </a>
          </div>

          <a
            ref={secondaryCtaRef}
            href="#about"
            className="inline-flex items-center justify-center gap-2 rounded-full border px-8 py-4 text-sm transition-[transform,box-shadow,background-color] duration-500 will-change-transform"
            style={{
              borderColor: heroPalette.line,
              backgroundColor: heroPalette.secondarySurface,
              color: heroPalette.ink,
            }}
          >
            Explore Our Story
          </a>
        </div>

        <div
          className="mt-16 pt-10 border-t grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl"
          style={{ borderColor: heroPalette.line }}
        >
          {heroStats.map((stat, index) => (
            <div
              key={stat.label}
              ref={(node) => {
                metricRefs.current[index] = node;
              }}
              className="will-change-transform"
            >
              <span className="sr-only">{`${stat.value}${stat.suffix} ${stat.label}`}</span>

              <div aria-hidden="true" className="flex items-end gap-1.5">
                <p
                  className="text-3xl md:text-4xl font-serif font-bold leading-none"
                  style={{ color: heroPalette.accent }}
                >
                  <MetricCounter
                    delay={shouldReduceMotion ? 0 : 1.18 + index * 0.14}
                    shouldReduceMotion={shouldReduceMotion}
                    value={stat.value}
                  />
                </p>

                <span
                  aria-hidden="true"
                  className="inline-block text-3xl md:text-4xl font-serif font-bold leading-none"
                  style={{ color: heroPalette.accent }}
                >
                  {stat.suffix}
                </span>
              </div>

              <p
                aria-hidden="true"
                className="mt-2 text-[11px] uppercase tracking-[0.18em]"
                style={{ color: heroPalette.muted }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
