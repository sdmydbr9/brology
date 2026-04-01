import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import heroAcademyImg from "@/assets/hero-academy.jpg";
import MeetFounder from "@/components/sections/about/MeetFounder";
import TestimonialSection from "@/components/sections/about/TestimonialSection";
import VerticalTimeline from "@/components/sections/about/VerticalTimeline";

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const containerRef = useRef<HTMLElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const academyImageStageRef = useRef<HTMLDivElement>(null);
  const academyImageRef = useRef<HTMLImageElement>(null);
  const academyImageOverlayRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const heroLineRef = useRef<HTMLDivElement>(null);
  const heroCueRef = useRef<HTMLParagraphElement>(null);
  const scene2TextRef = useRef<HTMLDivElement>(null);
  const scene5Ref = useRef<HTMLElement>(null);
  const scene5ContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Hero Entrance Animation
      const heroTimeline = gsap.timeline();

      if (heroTitleRef.current) {
        heroTimeline.fromTo(
          heroTitleRef.current,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
        );
      }

      if (heroSectionRef.current && heroContentRef.current) {
        if (heroSubRef.current) {
          gsap.set(heroSubRef.current, { opacity: 0, y: 56 });
        }

        if (heroLineRef.current) {
          gsap.set(heroLineRef.current, {
            opacity: 0,
            y: 24,
            scaleX: 0,
            transformOrigin: "center center",
          });
        }

        if (heroCueRef.current) {
          gsap.set(heroCueRef.current, { opacity: 0, y: 52 });
        }

        gsap.to(heroContentRef.current, {
          y: () => {
            if (window.innerWidth < 640) return -88;
            if (window.innerWidth < 1024) return -132;
            return -176;
          },
          ease: "none",
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: "top bottom",
            end: "top 42%",
            scrub: 0.9,
            invalidateOnRefresh: true,
          },
        });

        const heroDetailsTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: "top 28%",
            end: "top 14%",
            scrub: 0.9,
            invalidateOnRefresh: true,
          },
        });

        if (heroSubRef.current) {
          heroDetailsTimeline.to(
            heroSubRef.current,
            {
              opacity: 1,
              y: 0,
              ease: "power2.out",
            },
            0,
          );
        }

        if (heroLineRef.current) {
          heroDetailsTimeline.to(
            heroLineRef.current,
            {
              opacity: 1,
              y: 0,
              scaleX: 1,
              ease: "power2.out",
            },
            0.16,
          );
        }

        if (heroCueRef.current) {
          gsap.to(heroCueRef.current, {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: heroSectionRef.current,
              start: "top 4%",
              end: "top -12%",
              scrub: 0.9,
              invalidateOnRefresh: true,
            },
          });
        }

        const heroScrollTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: "top -18%",
            end: "bottom top",
            scrub: 0.9,
            invalidateOnRefresh: true,
          },
        });

        heroScrollTimeline
          .to(
            heroContentRef.current,
            {
              opacity: 0,
              scale: 0.96,
              filter: "blur(8px)",
              ease: "none",
            },
            0.5,
          );
      }

      if (academyImageStageRef.current && academyImageRef.current) {
        gsap.set(academyImageRef.current, {
          opacity: 0,
          yPercent: 16,
          scale: 1.06,
          filter: "blur(10px)",
        });

        if (academyImageOverlayRef.current) {
          gsap.set(academyImageOverlayRef.current, { opacity: 0 });
        }

        const academyImageTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: academyImageStageRef.current,
            start: "top bottom",
            end: "top 22%",
            scrub: 1.1,
            invalidateOnRefresh: true,
          },
        });

        academyImageTimeline.to(academyImageRef.current, {
          opacity: 1,
          yPercent: 0,
          scale: 1,
          filter: "blur(0px)",
          ease: "none",
        });

        if (academyImageOverlayRef.current) {
          academyImageTimeline.to(
            academyImageOverlayRef.current,
            {
              opacity: 1,
              ease: "none",
            },
            0,
          );
        }
      }

      // Scene 1 Text Reveal
      if (scene2TextRef.current) {
        gsap.fromTo(
          scene2TextRef.current,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: scene2TextRef.current,
              start: "top 80%",
              end: "top 40%",
              scrub: true,
            },
          },
        );
      }

      // Scene 5 (Final CTA) Background Transition
      if (scene5Ref.current) {
        gsap.fromTo(
          scene5Ref.current,
          { backgroundColor: "hsl(60, 14%, 97%)" }, // Adjust to match your ivory theme
          {
            backgroundColor: "hsl(155, 32%, 8%)", // Adjust to match your midnight/dark theme
            scrollTrigger: {
              trigger: scene5Ref.current,
              start: "top 80%",
              end: "top 20%",
              scrub: true,
            },
          },
        );
      }

      // Scene 5 (Final CTA) Content Reveal
      if (scene5ContentRef.current) {
        gsap.fromTo(
          scene5ContentRef.current,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: scene5ContentRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    }, container);

    return () => {
      ctx.revert();
    };
  }, []);

  const scrollToMentors = () => {
    document.getElementById("mentors")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const academyHeroOverlayStyle = {
    background:
      "linear-gradient(180deg, rgba(15, 10, 5, 0.12) 0%, rgba(15, 10, 5, 0.12) 48%, rgba(15, 10, 5, 0.48) 100%), radial-gradient(circle at top left, rgba(255, 221, 166, 0.18), transparent 32%)",
  };

  const paperRevealStyle = {
    backgroundColor: "hsl(var(--hero-bg))",
  };

  const introRuleStyle = {
    background: "linear-gradient(90deg, transparent 0%, rgba(33, 23, 15, 0.42) 50%, transparent 100%)",
  };

  return (
    <section id="about" ref={containerRef} className="relative overflow-x-hidden bg-hero-bg">
      {/* Hero Section */}
      <div
        ref={heroSectionRef}
        className="relative z-20 h-[170svh]"
      >
        <div className="sticky top-0 h-screen min-h-[100svh] overflow-hidden bg-hero-bg isolate">
          <div className="relative z-30 flex h-full items-start justify-center overflow-hidden px-6 pb-24 pt-[clamp(9rem,22vh,15rem)] sm:px-10">
            <div
              ref={heroContentRef}
              className="flex w-full flex-col items-center will-change-transform"
            >
              <h2
                ref={heroTitleRef}
                className="font-serif text-center text-5xl font-bold leading-none tracking-tight text-hero-text sm:text-7xl md:text-8xl lg:text-9xl"
              >
                The Brology Story
              </h2>
              <p
              ref={heroSubRef}
              className="mt-8 max-w-xl text-center font-sans text-lg leading-relaxed text-hero-subtext will-change-transform sm:text-xl"
            >
              Based on a true story of curiosity, clarity, and small batches.
            </p>
              <div
                ref={heroLineRef}
                className="mt-10 h-px w-24 bg-hero-line will-change-transform"
              />
              <p
                ref={heroCueRef}
                className="mt-16 font-sans text-xs uppercase tracking-[0.3em] text-hero-accent will-change-transform"
              >
                Scroll Down
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          THE CURTAIN REVEAL WRAPPER
          This div holds both the sticky background and the scrolling content.
          ========================================================= */}
      <div className="relative w-full">
        
        {/* Layer 1: The Sticky Background Image */}
        <div
          ref={academyImageStageRef}
          className="relative sticky top-0 z-0 h-screen min-h-[100svh] w-full overflow-hidden bg-hero-bg"
        >
          <img
            ref={academyImageRef}
            src={heroAcademyImg}
            alt="Academy students walking through grand collegiate grounds"
            width={1920}
            height={1080}
            className="h-full w-full object-cover will-change-transform"
          />
          <div
            ref={academyImageOverlayRef}
            className="pointer-events-none absolute inset-0"
            style={academyHeroOverlayStyle}
          />
        </div>

        {/* Layer 2: The Scrolling Content (The Curtain) */}
        <section className="-mt-px relative z-10 overflow-visible pb-12" style={paperRevealStyle}>

          {/* Scene 1 Intro */}
          <div
            ref={scene2TextRef}
            className="relative z-[2] flex min-h-screen min-h-[100svh] flex-col items-center justify-center px-6 pb-24 pt-[clamp(5.5rem,10vw,9rem)] text-center"
          >
            <p className="mb-6 font-sans text-xs uppercase tracking-[0.3em] text-foreground/55 sm:text-[0.95rem]">
              Scene 1
            </p>
            <h3
              className="max-w-[10ch] font-serif text-5xl italic font-medium leading-[0.96] text-[#21170f] sm:text-7xl lg:text-[6rem]"
              style={{ textWrap: "balance" }}
            >
              Where it all began
            </h3>
            <div className="mt-7 h-px w-[min(6rem,30vw)]" style={introRuleStyle} aria-hidden="true" />
          </div>

          {/* Core Content Components */}
          <VerticalTimeline />
          <MeetFounder />
          <TestimonialSection />

          {/* Final Scene (CTA) */}
          <section
            ref={scene5Ref}
            className="relative flex min-h-[80vh] flex-col items-center justify-center px-8 py-24"
          >
            <div ref={scene5ContentRef} className="flex max-w-3xl flex-col items-center text-center">
              <h3 className="mb-10 font-serif text-3xl font-bold leading-tight text-primary-foreground sm:text-5xl lg:text-6xl">
                It takes relentless passion to make biology this simple. This is the crew you want
                guiding your journey.
              </h3>
              <button
                type="button"
                className="cta-pulse rounded-full bg-primary px-12 py-5 font-sans text-lg font-semibold text-primary-foreground transition-colors duration-300 hover:bg-accent"
                onClick={scrollToMentors}
              >
                Meet Our Mentors
              </button>
            </div>
          </section>

        </section>
      </div>
    </section>
  );
}
