import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import studyRoomImg from "@/assets/study-room.jpg";
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
  const scene2Ref = useRef<HTMLDivElement>(null);
  const scene2TextRef = useRef<HTMLDivElement>(null);
  const scene2ImageWrapRef = useRef<HTMLDivElement>(null);
  const scene2ImageRef = useRef<HTMLImageElement>(null);
  const scene5Ref = useRef<HTMLElement>(null);
  const scene5ContentRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const media = gsap.matchMedia();
    const ctx = gsap.context(() => {
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

      if (scene5Ref.current) {
        gsap.fromTo(
          scene5Ref.current,
          { backgroundColor: "hsl(60, 14%, 97%)" },
          {
            backgroundColor: "hsl(155, 32%, 8%)",
            scrollTrigger: {
              trigger: scene5Ref.current,
              start: "top 80%",
              end: "top 20%",
              scrub: true,
            },
          },
        );
      }

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

    media.add("(min-width: 1024px)", () => {
      if (!scene2Ref.current || !scene2ImageWrapRef.current || !scene2ImageRef.current) {
        return undefined;
      }

      const pinTrigger = ScrollTrigger.create({
        trigger: scene2Ref.current,
        start: "top top",
        end: "bottom bottom",
        pin: scene2ImageWrapRef.current,
        pinSpacing: false,
      });

      const imageTween = gsap.to(scene2ImageRef.current, {
        scale: 1.15,
        ease: "none",
        scrollTrigger: {
          trigger: scene2Ref.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
        },
      });

      return () => {
        pinTrigger.kill();
        imageTween.scrollTrigger?.kill();
        imageTween.kill();
      };
    });

    media.add("(max-width: 1023px)", () => {
      if (!scene2Ref.current || !scene2ImageRef.current) {
        return undefined;
      }

      const imageTween = gsap.fromTo(
        scene2ImageRef.current,
        { scale: 1.05 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: scene2Ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        },
      );

      return () => {
        imageTween.scrollTrigger?.kill();
        imageTween.kill();
      };
    });

    return () => {
      media.revert();
      ctx.revert();
    };
  }, []);

  const scrollToMentors = () => {
    document.getElementById("mentors")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="about" ref={containerRef} className="relative overflow-x-hidden bg-background">
      <div className="scroll-progress-track hidden lg:block">
        <div ref={progressFillRef} className="scroll-progress-fill" style={{ height: 0 }} />
      </div>

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

      <div ref={scene2Ref} className="relative min-h-[200vh] bg-background">
        <div className="flex min-h-screen flex-col lg:flex-row">
          <div className="flex flex-1 items-center px-8 py-20 sm:px-16 lg:px-24 lg:py-32">
            <div ref={scene2TextRef} className="max-w-lg">
              <p className="mb-6 font-sans text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Where It All Began
              </p>
              <h3 className="mb-8 font-serif text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
                A small room.
                <br />
                A big belief.
              </h3>
              <p className="font-sans text-lg leading-relaxed text-foreground/80">
                In 2021, biology coaching felt like a factory assembly line. We started Brology in a
                small room in Agartala with just a handful of students, driven by a single belief:
                Science should not be intimidating; it should be unforgettable.
              </p>
            </div>
          </div>
          <div
            ref={scene2ImageWrapRef}
            className="flex-1 overflow-hidden lg:sticky lg:top-0 lg:h-screen"
          >
            <img
              ref={scene2ImageRef}
              src={studyRoomImg}
              alt="Cozy sunlit study room where Brology began"
              className="h-[60vh] w-full object-cover lg:h-full"
            />
          </div>
        </div>
      </div>

      <VerticalTimeline />
      <MeetFounder />
      <TestimonialStack />

      <section
        ref={scene5Ref}
        className="relative flex min-h-screen flex-col items-center justify-center px-8 py-24"
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
  );
}
