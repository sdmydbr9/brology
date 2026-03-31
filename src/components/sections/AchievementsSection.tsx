import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const stats = [
  { value: "150+", label: "NEET Qualifiers" },
  { value: "98%", label: "Board Pass Rate" },
  { value: "Top 50", label: "All-India Ranks" },
  { value: "12", label: "State Toppers" },
];

const testimonials = [
  { name: "Anisha Patel", score: "NEET 680/720", text: "Brology Classes transformed my understanding of biology. The small batch model made all the difference." },
  { name: "Rohit Kumar", score: "NEET 665/720", text: "The practical lab sessions gave me confidence I couldn't get anywhere else. Every concept just clicked." },
  { name: "Meera Joshi", score: "Board 98%", text: "The mentors genuinely care about your progress. They go above and beyond to clear every doubt." },
  { name: "Arjun Singh", score: "NEET 650/720", text: "I joined the crash course and it was the best decision. Focused, intense, and incredibly effective." },
];

export function AchievementsSection() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="achievements" className="bg-midnight py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <span className="text-emerald font-sans text-[10px] tracking-[0.25em] uppercase font-medium">Results</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white/90 mt-3 mb-4">
            Our achievements
          </h2>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl md:text-5xl font-serif font-bold text-emerald">{stat.value}</p>
              <p className="text-white/30 font-sans text-[10px] mt-2 uppercase tracking-[0.15em]">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-2xl mx-auto">
          <Quote className="w-10 h-10 text-emerald/20 mx-auto mb-6" />
          
          <div className="text-center min-h-[180px] flex flex-col items-center justify-center">
            <p className="text-white/50 font-sans text-lg md:text-xl leading-relaxed mb-6 italic">
              "{testimonials[current].text}"
            </p>
            <p className="text-white/80 font-serif font-semibold">{testimonials[current].name}</p>
            <p className="text-emerald font-sans text-sm mt-1">{testimonials[current].score}</p>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button onClick={prev} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-white/60 hover:border-white/20 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === current ? "bg-emerald w-6" : "bg-white/10 w-1.5"
                  }`}
                />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-white/60 hover:border-white/20 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
