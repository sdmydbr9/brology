import { Users, FlaskConical, BookOpenCheck, FileText } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Personalized Attention",
    description: "Individual focus on each student's learning pace and style with regular progress tracking.",
  },
  {
    icon: FlaskConical,
    title: "Small Batch Learning",
    description: "Batches of only 15-20 students ensuring meaningful interaction and doubt clearing.",
  },
  {
    icon: BookOpenCheck,
    title: "Practical Labs",
    description: "Fully equipped laboratory sessions that bring textbook concepts into tangible reality.",
  },
  {
    icon: FileText,
    title: "Study Materials",
    description: "Curated notes, worksheets, and practice papers designed by our expert faculty.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="bg-sage py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <span className="text-emerald font-sans text-xs tracking-[0.2em] uppercase font-medium">Why Brology</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mt-3 mb-4">
            What we provide
          </h2>
          <p className="text-muted-foreground font-sans max-w-lg mx-auto">
            Every element of our program is designed to make biology not just understandable, but truly exciting.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group bg-background border border-eucalyptus rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:border-emerald/30"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald/10 flex items-center justify-center mb-5 group-hover:bg-emerald/20 transition-colors">
                <feature.icon className="w-6 h-6 text-emerald" />
              </div>
              <h3 className="font-serif font-semibold text-charcoal text-xl mb-3">{feature.title}</h3>
              <p className="text-muted-foreground font-sans text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
