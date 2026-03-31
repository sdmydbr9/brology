import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import heroAcademyImg from "@/assets/hero-academy.jpg";
import { TornEdgeDivider } from "@/components/TornEdgeDivider";
import MeetFounder from "@/components/sections/about/MeetFounder";
import TestimonialStack from "@/components/sections/about/TestimonialStack";
import VerticalTimeline from "@/components/sections/about/VerticalTimeline";

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const containerRef = useRef<HTMLElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const heroLineRef = useRef<HTMLDivElement>(null);
  const heroCueRef = useRef<HTMLParagraphElement>(null);
  const scene2TextRef = useRef<HTMLDivElement>(null);
  const scene5Ref = useRef<HTMLElement>(null);
  const scene5ContentRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Scroll Progress Indicator
      if (progressFillRef.current) {
        gsap.to(progressFillRef.current, {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.3,
          },
        });
      }

      // Hero Entrance Animation
      const heroTimeline = gsap.timeline();

      if (heroTitleRef.current) {
        heroTimeline.fromTo(
          heroTitleRef.current,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
        );
      }

      if (heroSubRef.current) {
        heroTimeline.fromTo(
          heroSubRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.5",
        );
      }

      if (heroLineRef.current) {
        heroTimeline.fromTo(
          heroLineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.6, ease: "power2.out" },
          "-=0.3",
        );
      }

      if (heroCueRef.current) {
        heroTimeline.fromTo(
          heroCueRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.2",
        );
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

  return (
    <section id="about" ref={containerRef} className="relative overflow-x-hidden bg-background">
      
      {/* Scroll Progress Bar */}
      <div className="scroll-progress-track hidden lg:block absolute right-0 top-0 bottom-0 w-1 bg-muted z-50">
        <div ref={progressFillRef} className="scroll-progress-fill w-full bg-primary" style={{ height: 0 }} />
      </div>

      {/* Hero Section */}
      <div className="relative flex min-h-screen flex-col items-center justify-center bg-hero-bg px-6 py-24 sm:px-10">
        <h2
          ref={heroTitleRef}
          className="font-serif text-center text-5xl font-bold leading-none tracking-tight text-hero-text sm:text-7xl md:text-8xl lg:text-9xl"
        >
          The Brology Story
        </h2>
        <p
          ref={heroSubRef}
          className="mt-8 max-w-xl text-center font-sans text-lg leading-relaxed text-hero-subtext sm:text-xl"
        >
          Based on a true story of curiosity, clarity, and small batches.
        </p>
        <div ref={heroLineRef} className="mt-10 h-px w-24 origin-left bg-hero-line" />
        <p
          ref={heroCueRef}
          className="mt-16 font-sans text-xs uppercase tracking-[0.3em] text-hero-accent"
        >
          Scroll Down
        </p>
      </div>

      {/* =========================================================
          THE CURTAIN REVEAL WRAPPER
          This div holds both the sticky background and the scrolling content.
          ========================================================= */}
      <div className="relative w-full">
        
        {/* Layer 1: The Sticky Background Image (-z-10 ensures it stays in back) */}
        <div className="sticky top-0 -z-10 h-screen w-full overflow-hidden">
          <img
            src={heroAcademyImg}
            alt="Academy students walking through grand collegiate grounds"
            width={1920}
            height={1080}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Layer 2: The Scrolling Content (The Curtain) */}
        <section className="relative z-10 bg-[#f0e8d8] pt-32 pb-12">
          
          {/* The Torn Edge Divider 
              Positioned absolutely to stick out exactly 99% of its height 
              ABOVE this section, covering the bottom of the sticky image. 
          */}
          <div className="absolute left-0 top-0 w-full -translate-y-[99%]">
            <TornEdgeDivider className="w-full text-[#f0e8d8] fill-current" />
          </div>

          {/* Scene 1 Intro */}
          <div
            ref={scene2TextRef}
            className="flex flex-col items-center justify-center px-6 pb-24"
          >
            <p className="mb-6 font-sans text-sm uppercase tracking-[0.3em] text-foreground/50 md:text-base">
              Scene 1
            </p>
            <h3 className="max-w-4xl text-center font-serif text-4xl italic leading-tight text-foreground md:text-6xl lg:text-7xl">
              Where it all began
            </h3>
          </div>

          {/* Core Content Components */}
          <VerticalTimeline />
          <MeetFounder />
          <TestimonialStack />

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