import { ArrowRight } from "lucide-react";
import logo from "@/assets/logo.png";
import heroIllustration from "@/assets/hero-illustration.svg";

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen bg-midnight flex items-center overflow-hidden">
      {/* Decorative background — subtle, muted orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-[500px] h-[500px] rounded-full bg-emerald/[0.03] blur-[100px]" />
        <div className="absolute bottom-32 left-10 w-72 h-72 rounded-full bg-emerald/[0.02] blur-[80px]" />
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'radial-gradient(circle, hsl(152 80% 18%) 0.5px, transparent 0.5px)',
          backgroundSize: '48px 48px'
        }} />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 py-20">
        {/* Logo badge */}
        <div className="mb-10">
          <img src={logo} alt="Brology Classes" className="h-12 w-auto object-contain opacity-90" />
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: Text content */}
          <div className="flex-1">
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-serif font-bold text-white/95 leading-[1.05] mb-8 max-w-4xl">
              Science with a<br />
              <span className="italic text-emerald">friendly</span> vibe
            </h1>

            <p className="text-white/40 font-sans text-lg md:text-xl max-w-xl mb-14 leading-relaxed">
              Where curiosity meets clarity. Small batches, expert mentors, and a passion for making biology unforgettable.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-emerald-bright text-white px-8 py-4 rounded-lg font-sans font-medium text-sm hover:opacity-90 transition-opacity group"
              >
                Book a Free Trial
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#about"
                className="inline-flex items-center gap-2 border border-white/10 text-white/50 px-8 py-4 rounded-lg font-sans text-sm hover:text-white/70 hover:border-white/20 transition-colors"
              >
                Explore Our Story
              </a>
            </div>
          </div>

          {/* Right: Illustration */}
          <div className="flex-shrink-0 w-64 h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px]">
            <img
              src={heroIllustration}
              alt="Students collaborating"
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-24 pt-10 border-t border-white/[0.06] grid grid-cols-3 gap-8 max-w-lg">
          {[
            { value: "500+", label: "Students Taught" },
            { value: "95%", label: "Success Rate" },
            { value: "8+", label: "Years Experience" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl md:text-4xl font-serif font-bold text-emerald">{stat.value}</p>
              <p className="text-white/30 text-[10px] font-sans mt-1.5 uppercase tracking-[0.15em]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
