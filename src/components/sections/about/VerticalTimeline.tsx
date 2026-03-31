import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import happyStudentsImg from "@/assets/happy-students.jpg";
import microscopeImg from "@/assets/microscope-student.jpg";
import sleekClassroomImg from "@/assets/sleek-classroom.jpg";
import studyRoomImg from "@/assets/study-room.jpg";

gsap.registerPlugin(ScrollTrigger);

const IMAGE_REVEAL_RADIUS = "1.5rem";
const IMAGE_REVEAL_HIDDEN = `inset(0% 0% 100% 0% round ${IMAGE_REVEAL_RADIUS})`;
const IMAGE_REVEAL_VISIBLE = `inset(0% 0% 0% 0% round ${IMAGE_REVEAL_RADIUS})`;

const timelineItems = [
  { year: "2021", img: happyStudentsImg, side: "right" as const, mobileOffsetY: "0", desktopTop: "3%" },
  { year: "2022", img: studyRoomImg, side: "left" as const, mobileOffsetY: "2rem", desktopTop: "29%" },
  { year: "2023", img: microscopeImg, side: "right" as const, mobileOffsetY: "1rem", desktopTop: "55%" },
  { year: "2025", img: sleekClassroomImg, side: "left" as const, mobileOffsetY: "3rem", desktopTop: "81%" },
];

const ImageCard = ({ img, year, className = "" }: { img: string; year: string; className?: string }) => (
  <div className={`tl-image-frame w-full max-w-sm ${className}`.trim()}>
    <div className="tl-image-reveal rounded-3xl overflow-hidden shadow-[0_12px_50px_-15px_rgba(0,0,0,0.1)]">
      <img
        src={img}
        alt={`Brology ${year}`}
        loading="lazy"
        className="tl-image-media w-full h-52 sm:h-60 lg:h-64 object-cover"
      />
    </div>
  </div>
);

const YearLabel = ({ year }: { year: string }) => (
  <span className="tl-year font-sans text-2xl sm:text-3xl lg:text-4xl font-light text-foreground/40 tracking-wide">
    {year}
  </span>
);

const VerticalTimeline = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mobileLineRef = useRef<HTMLDivElement>(null);
  const desktopStageRef = useRef<HTMLDivElement>(null);
  const desktopLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const media = gsap.matchMedia();
    const ctx = gsap.context(() => {
      media.add("(max-width: 639px)", () => {
        if (!mobileLineRef.current) return;

        gsap.fromTo(
          mobileLineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: mobileLineRef.current.parentElement,
              start: "top 70%",
              end: "bottom 35%",
              scrub: true,
            },
          },
        );

        const items = gsap.utils.toArray<HTMLElement>(".tl-mobile-item");

        items.forEach((item) => {
          const dot = item.querySelector<HTMLElement>(".tl-dot");
          const year = item.querySelector<HTMLElement>(".tl-year");
          const imageReveal = item.querySelector<HTMLElement>(".tl-image-reveal");
          const imageMedia = item.querySelector<HTMLElement>(".tl-image-media");

          if (dot) {
            gsap.fromTo(
              dot,
              { backgroundColor: "hsl(140, 16%, 92%)", scale: 1 },
              {
                backgroundColor: "hsl(148, 90%, 18%)",
                borderColor: "hsl(148, 90%, 18%)",
                scale: 1.28,
                duration: 0.35,
                ease: "back.out(1.7)",
                scrollTrigger: {
                  trigger: item,
                  start: "top 75%",
                  toggleActions: "play none none reverse",
                },
              },
            );
          }

          if (year) {
            gsap.fromTo(
              year,
              { opacity: 0, y: 20 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: item,
                  start: "top 80%",
                  toggleActions: "play none none reverse",
                },
              },
            );
          }

          if (imageReveal && imageMedia) {
            gsap.set(imageReveal, { clipPath: IMAGE_REVEAL_HIDDEN });
            gsap.set(imageMedia, { scale: 1.08, yPercent: 6 });

            gsap.to(imageReveal, {
              clipPath: IMAGE_REVEAL_VISIBLE,
              ease: "none",
              scrollTrigger: {
                trigger: item,
                start: "top 75%",
                end: "center center",
                scrub: true,
                invalidateOnRefresh: true,
              },
            });

            gsap.to(imageMedia, {
              scale: 1,
              yPercent: 0,
              ease: "none",
              scrollTrigger: {
                trigger: item,
                start: "top 75%",
                end: "center center",
                scrub: true,
                invalidateOnRefresh: true,
              },
            });
          }
        });

        return undefined;
      });

      media.add("(min-width: 640px)", () => {
        if (!desktopStageRef.current || !desktopLineRef.current) return;

        const items = gsap.utils.toArray<HTMLElement>(".tl-desktop-item");

        gsap.set(desktopLineRef.current, { scaleY: 0 });

        items.forEach((item) => {
          const reveal = item.querySelector<HTMLElement>(".tl-image-reveal");
          const mediaNode = item.querySelector<HTMLElement>(".tl-image-media");
          const dot = item.querySelector<HTMLElement>(".tl-dot");
          const year = item.querySelector<HTMLElement>(".tl-year");

          if (reveal) {
            gsap.set(reveal, { clipPath: IMAGE_REVEAL_HIDDEN });
          }

          if (mediaNode) {
            gsap.set(mediaNode, { scale: 1.08, yPercent: 6 });
          }

          if (dot) {
            gsap.set(dot, { backgroundColor: "hsl(140, 16%, 92%)", borderColor: "hsl(140, 16%, 86%)", scale: 1 });
          }

          if (year) {
            gsap.set(year, { opacity: 0.5 });
          }
        });

        const sequence = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: desktopStageRef.current,
            start: "top top",
            end: () => `+=${window.innerHeight * (timelineItems.length * 0.9)}`,
            pin: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        sequence.to(desktopLineRef.current, { scaleY: 1, duration: timelineItems.length }, 0);

        items.forEach((item, index) => {
          const reveal = item.querySelector<HTMLElement>(".tl-image-reveal");
          const mediaNode = item.querySelector<HTMLElement>(".tl-image-media");
          const dot = item.querySelector<HTMLElement>(".tl-dot");
          const year = item.querySelector<HTMLElement>(".tl-year");

          if (reveal) {
            sequence.to(reveal, { clipPath: IMAGE_REVEAL_VISIBLE, duration: 0.95 }, index);
          }

          if (mediaNode) {
            sequence.to(mediaNode, { scale: 1, yPercent: 0, duration: 0.95 }, index);
          }

          if (dot) {
            sequence.to(
              dot,
              {
                backgroundColor: "hsl(148, 90%, 18%)",
                borderColor: "hsl(148, 90%, 18%)",
                scale: 1.28,
                duration: 0.18,
              },
              index + 0.08,
            );
          }

          if (year) {
            sequence.to(year, { opacity: 1, duration: 0.18 }, index + 0.08);
          }
        });

        return () => {
          sequence.scrollTrigger?.kill();
          sequence.kill();
        };
      });
    }, sectionRef);

    return () => {
      media.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-background py-32 sm:py-40 px-6 sm:px-12 lg:px-24 overflow-hidden"
    >
      <div className="max-w-2xl mx-auto text-center mb-28">
        <p className="font-sans text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
          The Journey
        </p>
        <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
          Milestones that shaped us.
        </h2>
      </div>

      <div className="relative mx-auto max-w-4xl sm:hidden">
        <div className="absolute left-[7px] top-0 bottom-0 w-0.5 border-l-2 border-dashed border-muted" />
        <div
          ref={mobileLineRef}
          className="absolute left-[7px] top-0 bottom-0 w-0.5 bg-primary origin-top z-[1]"
          style={{ transform: "scaleY(0)" }}
        />

        <div className="relative flex flex-col gap-20">
          {timelineItems.map((item, i) => {
            return (
              <div
                key={`${item.year}-${i}`}
                className="tl-mobile-item relative"
                style={{ paddingTop: item.mobileOffsetY }}
              >
                <div className="grid grid-cols-[auto_1fr] gap-4">
                  <div className="relative flex flex-col items-center z-10 pt-3">
                    <div className="tl-dot h-3.5 w-3.5 rounded-full bg-card border-2 border-muted" />
                  </div>
                  <div className="tl-content space-y-4">
                    <YearLabel year={item.year} />
                    <ImageCard img={item.img} year={item.year} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div ref={desktopStageRef} className="relative mx-auto hidden h-screen max-w-5xl overflow-hidden sm:block">
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 border-l-2 border-dashed border-muted -translate-x-px" />
        <div
          ref={desktopLineRef}
          className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary origin-top z-[1] -translate-x-px"
          style={{ transform: "scaleY(0)" }}
        />

        {timelineItems.map((item, i) => {
          const isRight = item.side === "right";

          return (
            <div
              key={`${item.year}-desktop-${i}`}
              className="tl-desktop-item absolute inset-x-0"
              style={{ top: item.desktopTop }}
            >
              <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-start gap-6 lg:gap-10">
                {isRight ? (
                  <div className="flex justify-end items-start pt-2 pr-6 lg:pr-10">
                    <YearLabel year={item.year} />
                  </div>
                ) : (
                  <div className="tl-content flex justify-end pr-6 lg:pr-10">
                    <ImageCard img={item.img} year={item.year} className="max-w-md lg:max-w-lg" />
                  </div>
                )}

                <div className="relative z-10 flex flex-col items-center pt-3">
                  <div className="tl-dot h-4 w-4 rounded-full bg-card border-2 border-muted" />
                </div>

                {isRight ? (
                  <div className="tl-content pl-6 lg:pl-10">
                    <ImageCard img={item.img} year={item.year} className="max-w-md lg:max-w-lg" />
                  </div>
                ) : (
                  <div className="flex items-start pt-2 pl-6 lg:pl-10">
                    <YearLabel year={item.year} />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default VerticalTimeline;
