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
  { year: "2021", img: happyStudentsImg, side: "right" as const, mobileOffsetY: "0", desktopTop: "2%" },
  { year: "2022", img: studyRoomImg, side: "left" as const, mobileOffsetY: "2rem", desktopTop: "20%" },
  { year: "2023", img: microscopeImg, side: "right" as const, mobileOffsetY: "1rem", desktopTop: "44%" },
  { year: "2025", img: sleekClassroomImg, side: "left" as const, mobileOffsetY: "3rem", desktopTop: "64%" },
];

const timelineStory = {
  range: "2021-2025",
  title: "From one small room to a growing student movement.",
  body:
    "What started with a handful of learners in Agartala became a clearer, warmer way to learn biology. Each year marked a bigger leap in confidence, community, and how students experienced the subject.",
};

const ImageCard = ({ img, year, className = "" }: { img: string; year: string; className?: string }) => (
  <div className={`tl-image-frame w-full max-w-[17rem] sm:max-w-[18.5rem] ${className}`.trim()}>
    <div className="tl-image-reveal rounded-3xl overflow-hidden shadow-[0_12px_50px_-15px_rgba(0,0,0,0.1)]">
      <img
        src={img}
        alt={`Brology ${year}`}
        loading="lazy"
        className="tl-image-media w-full h-44 sm:h-48 lg:h-52 object-cover"
      />
    </div>
  </div>
);

const YearLabel = ({ year, className = "" }: { year: string; className?: string }) => (
  <span className={`tl-year font-sans text-2xl sm:text-3xl lg:text-4xl font-light text-foreground/40 tracking-wide ${className}`.trim()}>
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
        if (mobileLineRef.current) {
          gsap.fromTo(
            mobileLineRef.current,
            { opacity: 0, scaleY: 0 },
            {
              opacity: 1,
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: mobileLineRef.current.parentElement,
                start: "top 78%",
                end: "bottom 28%",
                scrub: true,
                invalidateOnRefresh: true,
              },
            },
          );
        }

        const items = gsap.utils.toArray<HTMLElement>(".tl-mobile-item");

        items.forEach((item) => {
          const dot = item.querySelector<HTMLElement>(".tl-dot");
          const year = item.querySelector<HTMLElement>(".tl-year");
          const imageReveal = item.querySelector<HTMLElement>(".tl-image-reveal");
          const imageMedia = item.querySelector<HTMLElement>(".tl-image-media");

          if (dot) {
            gsap.fromTo(
              dot,
              { opacity: 0, scale: 0.72 },
              {
                opacity: 1,
                scale: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: item,
                  start: "top 82%",
                  end: "top 58%",
                  scrub: true,
                  invalidateOnRefresh: true,
                },
              },
            );
          }

          if (year) {
            gsap.fromTo(
              year,
              { opacity: 0, y: 24 },
              {
                opacity: 1,
                y: 0,
                ease: "none",
                scrollTrigger: {
                  trigger: item,
                  start: "top 84%",
                  end: "top 56%",
                  scrub: true,
                  invalidateOnRefresh: true,
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

        gsap.set(desktopLineRef.current, { opacity: 0, scaleY: 0 });

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
            gsap.set(dot, { opacity: 0, scale: 0.72 });
          }

          if (year) {
            gsap.set(year, { opacity: 0, y: 24 });
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

        sequence.to(desktopLineRef.current, { opacity: 1, scaleY: 1, duration: timelineItems.length }, 0);

        items.forEach((item, index) => {
          const reveal = item.querySelector<HTMLElement>(".tl-image-reveal");
          const mediaNode = item.querySelector<HTMLElement>(".tl-image-media");
          const dot = item.querySelector<HTMLElement>(".tl-dot");
          const year = item.querySelector<HTMLElement>(".tl-year");

          if (year) {
            sequence.to(year, { opacity: 1, y: 0, duration: 0.32 }, index + 0.02);
          }

          if (dot) {
            sequence.to(
              dot,
              {
                opacity: 1,
                scale: 1,
                duration: 0.3,
              },
              index + 0.08,
            );
          }

          if (reveal) {
            sequence.to(reveal, { clipPath: IMAGE_REVEAL_VISIBLE, duration: 0.82 }, index + 0.18);
          }

          if (mediaNode) {
            sequence.to(mediaNode, { scale: 1, yPercent: 0, duration: 0.82 }, index + 0.18);
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
      <div className="mx-auto mb-20 max-w-xl text-left sm:hidden">
        <p className="mb-5 font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {timelineStory.range}
        </p>
        <h2 className="font-serif text-4xl font-bold leading-tight text-foreground">
          {timelineStory.title}
        </h2>
        <p className="mt-6 font-sans text-base leading-relaxed text-foreground/72">
          {timelineStory.body}
        </p>
      </div>

      <div className="relative mx-auto max-w-4xl sm:hidden">
        <div
          ref={mobileLineRef}
          className="absolute left-[7px] top-0 bottom-0 w-0 border-l-2 border-dashed border-muted origin-top"
          style={{ transform: "scaleY(0)", opacity: 0 }}
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
                    <div className="tl-dot h-3.5 w-3.5 rounded-full bg-muted border-2 border-muted" />
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

      <div
        ref={desktopStageRef}
        className="relative mx-auto hidden h-screen max-w-6xl overflow-hidden sm:grid sm:grid-cols-[minmax(0,0.75fr)_minmax(0,1fr)] sm:gap-12 lg:gap-20"
      >
        <div className="flex items-end pb-20">
          <div className="max-w-md">
            <p className="mb-5 font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {timelineStory.range}
            </p>
            <h2 className="font-serif text-4xl font-bold leading-tight text-foreground lg:text-5xl">
              {timelineStory.title}
            </h2>
            <p className="mt-6 font-sans text-lg leading-relaxed text-foreground/72">
              {timelineStory.body}
            </p>
          </div>
        </div>

        <div className="relative h-full">
          <div
            ref={desktopLineRef}
            className="absolute left-1/2 top-0 bottom-0 w-0 border-l-2 border-dashed border-muted origin-top -translate-x-px"
            style={{ transform: "scaleY(0)", opacity: 0 }}
          />

          {timelineItems.map((item, i) => {
            const isRight = item.side === "right";

            return (
              <div
                key={`${item.year}-desktop-${i}`}
                className="tl-desktop-item absolute inset-x-0"
                style={{ top: item.desktopTop }}
              >
                <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-start gap-4 lg:gap-6">
                  {isRight ? (
                    <div />
                  ) : (
                    <div className="tl-content flex flex-col items-end gap-3 pr-4 lg:pr-6">
                      <YearLabel year={item.year} className="text-right" />
                      <ImageCard img={item.img} year={item.year} className="max-w-[18rem] lg:max-w-[21rem]" />
                    </div>
                  )}

                  <div className="relative z-10 flex flex-col items-center pt-3">
                    <div className="tl-dot h-4 w-4 rounded-full bg-muted border-2 border-muted" />
                  </div>

                  {isRight ? (
                    <div className="tl-content flex flex-col items-start gap-3 pl-4 lg:pl-6">
                      <YearLabel year={item.year} />
                      <ImageCard img={item.img} year={item.year} className="max-w-[18rem] lg:max-w-[21rem]" />
                    </div>
                  ) : (
                    <div />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default VerticalTimeline;
