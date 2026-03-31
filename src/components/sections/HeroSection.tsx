import { ArrowRight, Leaf } from "lucide-react";

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen bg-midnight flex items-center overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-emerald/5 blur-3xl" />
        <div className="absolute bottom-20 left-10 w-64 h-64 rounded-full bg-emerald/3 blur-2xl" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle, hsl(145 95% 16%) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 py-20">
        <div className="flex items-center gap-2 mb-8">
          <Leaf className="w-5 h-5 text-emerald" />
          <span className="text-emerald font-sans text-sm tracking-[0.15em] uppercase font-medium">
            Premium Biology Coaching
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white leading-[1.05] mb-8 max-w-4xl">
          Science with a<br />
          <span className="italic text-emerald">friendly</span> vibe
        </h1>

        <p className="text-white/60 font-sans text-lg md:text-xl max-w-xl mb-12 leading-relaxed">
          Where curiosity meets clarity. Small batches, expert mentors, and a passion for making biology unforgettable.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-emerald text-white px-8 py-4 rounded-lg font-sans font-medium text-sm hover:opacity-90 transition-opacity group"
          >
            Book a Free Trial
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#about"
            className="inline-flex items-center gap-2 border border-white/20 text-white/80 px-8 py-4 rounded-lg font-sans text-sm hover:bg-white/5 transition-colors"
          >
            Explore Our Story
          </a>
        </div>

        {/* Stats bar */}
        <div className="mt-20 pt-10 border-t border-white/10 grid grid-cols-3 gap-8 max-w-lg">
          {[
            { value: "500+", label: "Students Taught" },
            { value: "95%", label: "Success Rate" },
            { value: "8+", label: "Years Experience" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl md:text-4xl font-serif font-bold text-emerald">{stat.value}</p>
              <p className="text-white/50 text-xs font-sans mt-1 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
