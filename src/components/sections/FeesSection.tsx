import { CheckCircle2 } from "lucide-react";

const plans = [
  {
    name: "NEET Preparation",
    price: "₹45,000",
    period: "per year",
    features: [
      { text: "Complete NEET Biology syllabus", included: true },
      { text: "Small batch (max 20 students)", included: true },
      { text: "Weekly mock tests", included: true },
      { text: "Lab practicals access", included: true },
      { text: "Study material & notes", included: true },
      { text: "1-on-1 doubt sessions", included: true },
      { text: "Parent progress reports", included: true },
    ],
  },
  {
    name: "Foundational Biology",
    price: "₹30,000",
    period: "per year",
    features: [
      { text: "Class 8-10 Biology curriculum", included: true },
      { text: "Small batch (max 20 students)", included: true },
      { text: "Monthly assessments", included: true },
      { text: "Lab practicals access", included: true },
      { text: "Study material & notes", included: true },
      { text: "1-on-1 doubt sessions", included: false },
      { text: "Olympiad preparation", included: true },
    ],
  },
  {
    name: "Crash Course",
    price: "₹15,000",
    period: "3 months",
    features: [
      { text: "Intensive NEET revision", included: true },
      { text: "Small batch (max 15 students)", included: true },
      { text: "Daily mock tests", included: true },
      { text: "Lab practicals access", included: false },
      { text: "Revision notes", included: true },
      { text: "1-on-1 doubt sessions", included: true },
      { text: "Previous year paper solving", included: true },
    ],
  },
];

export function FeesSection() {
  return (
    <section id="fees" className="bg-sage py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <span className="text-emerald font-sans text-xs tracking-[0.2em] uppercase font-medium">Pricing</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mt-3 mb-4">
            Fee structure
          </h2>
          <p className="text-muted-foreground font-sans max-w-lg mx-auto">
            Transparent pricing with no hidden charges. Quality education that's accessible.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, idx) => (
            <div
              key={plan.name}
              className={`bg-background border rounded-2xl p-8 transition-all duration-300 hover:shadow-lg ${
                idx === 0 ? "border-emerald ring-1 ring-emerald/20" : "border-eucalyptus"
              }`}
            >
              {idx === 0 && (
                <span className="inline-block px-3 py-1 bg-emerald text-white text-xs font-sans font-medium rounded-full mb-4">
                  Most Popular
                </span>
              )}
              <h3 className="font-serif font-semibold text-charcoal text-xl">{plan.name}</h3>
              <div className="mt-4 mb-6">
                <span className="text-4xl font-serif font-bold text-charcoal">{plan.price}</span>
                <span className="text-muted-foreground font-sans text-sm ml-2">/{plan.period}</span>
              </div>

              <div className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <div key={feature.text} className="flex items-start gap-2.5">
                    <CheckCircle2
                      className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                        feature.included ? "text-emerald" : "text-eucalyptus"
                      }`}
                    />
                    <span
                      className={`font-sans text-sm ${
                        feature.included ? "text-charcoal" : "text-muted-foreground line-through"
                      }`}
                    >
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              <a
                href="#contact"
                className={`block text-center py-3 rounded-lg font-sans font-medium text-sm transition-all ${
                  idx === 0
                    ? "bg-emerald text-white hover:opacity-90"
                    : "border border-eucalyptus text-charcoal hover:border-emerald hover:text-emerald"
                }`}
              >
                Enroll Now
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
