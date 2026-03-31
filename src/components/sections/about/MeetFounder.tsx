import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

import founderTeaching from "@/assets/founder-teaching.jpg";
import founderPortrait from "@/assets/founder-portrait.jpg";
import founderLab from "@/assets/founder-lab.jpg";
import founderWhiteboard from "@/assets/founder-whiteboard.jpg";
import founderCelebration from "@/assets/founder-celebration.jpg";
import founderBooks from "@/assets/founder-books.jpg";
import founderMentoring from "@/assets/founder-mentoring.jpg";
import founderClassroom from "@/assets/founder-classroom.jpg";

const photos = [
  [founderPortrait, founderTeaching, founderLab],
  [founderWhiteboard, founderCelebration, founderBooks],
  [founderMentoring, founderClassroom],
];

/* string lengths for each column (px) — staggered effect */
const stringLengths = [40, 24, 56];

const Polaroid = ({
  src,
  alt,
  delay,
}: {
  src: string;
  alt: string;
  delay: string;
}) => (
  <div
    className="polaroid-sway group cursor-default"
    style={{ animationDelay: delay, transformOrigin: "top center" }}
  >
    <div className="bg-white p-2 pb-6 shadow-xl rounded-sm transition-transform duration-300 group-hover:scale-105">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        width={640}
        height={640}
        className="w-full aspect-square object-cover"
      />
    </div>
  </div>
);

/* Minimalist SVG rod anchor */
const RodAnchor = () => (
  <svg viewBox="0 0 600 28" className="w-full h-6 md:h-7" preserveAspectRatio="xMidYMid meet">
    {/* Main rod */}
    <path
      d="M20 14 Q60 8, 120 14 Q200 20, 300 13 Q400 6, 480 14 Q540 20, 580 14"
      fill="none"
      stroke="hsl(150, 12%, 80%)"
      strokeWidth="5"
      strokeLinecap="round"
    />
    {/* Subtle wood grain hints */}
    <path
      d="M80 12 Q140 16, 200 13"
      fill="none"
      stroke="hsl(150, 12%, 72%)"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.4"
    />
    <path
      d="M350 12 Q420 16, 500 13"
      fill="none"
      stroke="hsl(150, 12%, 72%)"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.4"
    />
    {/* Small ring hooks */}
    {[150, 300, 450].map((x) => (
      <g key={x}>
        <circle cx={x} cy={14} r="4" fill="none" stroke="hsl(150, 12%, 70%)" strokeWidth="1.5" />
        <circle cx={x} cy={20} r="2" fill="none" stroke="hsl(150, 12%, 70%)" strokeWidth="1" />
      </g>
    ))}
  </svg>
);

const SocialPill = ({
  icon,
  label,
}: {
  icon: ReactNode;
  label: string;
}) => (
  <div className="flex items-center justify-between w-full max-w-xs gap-3 rounded-full bg-secondary px-5 py-3.5 font-sans text-sm font-medium text-foreground transition-colors duration-300 hover:bg-muted group">
    <span className="flex items-center gap-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-background text-foreground shadow-sm text-xs font-bold">
        {icon}
      </span>
      <span>{label}</span>
    </span>
    <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" />
  </div>
);

const MeetFounder = () => {
  return (
    <section className="bg-background py-24 sm:py-32 lg:py-40 px-6 sm:px-12 lg:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row gap-16 lg:gap-24">
        {/* ——— Left: Hanging Photo Mobile ——— */}
        <div className="flex-1 hidden md:block">
          <div className="relative">
            {/* Anchor rod */}
            <RodAnchor />

            {/* Strings + Polaroids grid */}
            <div className="grid grid-cols-3 gap-6 lg:gap-8 mt-0">
              {photos.map((column, colIdx) => (
                <div key={colIdx} className="flex flex-col items-center">
                  {/* String from rod */}
                  <div
                    className="w-px bg-muted"
                    style={{ height: `${stringLengths[colIdx]}px` }}
                  />
                  {/* Polaroids with connecting strings */}
                  {column.map((src, imgIdx) => (
                    <div key={imgIdx} className="flex flex-col items-center">
                      <Polaroid
                        src={src}
                        alt={`Brology moment ${colIdx * 3 + imgIdx + 1}`}
                        delay={`${(colIdx * 3 + imgIdx) * -0.8}s`}
                      />
                      {/* Connecting string between polaroids */}
                      {imgIdx < column.length - 1 && (
                        <div className="w-px h-6 lg:h-8 bg-muted" />
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ——— Right: Editorial Bio ——— */}
        <div className="flex-1 flex flex-col justify-center">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
            Meet the Founder
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground uppercase tracking-tight leading-none mb-6">
            Dr. A. Sharma
          </h2>
          <p className="font-sans text-base sm:text-lg text-muted-foreground leading-relaxed mb-10 max-w-md">
            A biology enthusiast discovers the power of small-batch teaching.
          </p>

          {/* Bio details */}
          <div className="space-y-4 mb-12">
            {[
              { label: "Place of Birth", value: "Agartala, Tripura" },
              { label: "Focus", value: "Making Biology Unforgettable" },
              { label: "Currently", value: "Mentoring the next generation of doctors" },
            ].map((item) => (
              <p key={item.label} className="font-sans text-sm text-foreground">
                {item.label} :{" "}
                <span className="text-primary font-medium">{item.value}</span>
              </p>
            ))}
          </div>

          {/* Social pills */}
          <div className="space-y-3">
            <SocialPill icon={<span className="text-xs font-bold">in</span>} label="LinkedIn" />
            <SocialPill
              icon={
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              }
              label="Instagram"
            />
            <SocialPill
              icon={
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              }
              label="Twitter / X"
            />
          </div>
        </div>

        {/* ——— Mobile: Simplified photo grid (shown on mobile only) ——— */}
        <div className="md:hidden grid grid-cols-3 gap-3">
          {[founderPortrait, founderTeaching, founderLab, founderCelebration, founderMentoring, founderClassroom].map(
            (src, i) => (
              <div key={i} className="bg-white p-1.5 pb-4 shadow-lg rounded-sm">
                <img
                  src={src}
                  alt={`Brology moment ${i + 1}`}
                  loading="lazy"
                  width={640}
                  height={640}
                  className="w-full aspect-square object-cover"
                />
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default MeetFounder;
