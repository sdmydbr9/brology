import { Target, Heart, Microscope } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="bg-sage py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image placeholder */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl border-2 border-eucalyptus overflow-hidden bg-gradient-to-br from-midnight/10 to-emerald/10 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-20 h-20 rounded-full bg-emerald/10 flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-emerald" />
                </div>
                <p className="font-serif text-charcoal text-lg italic">Our Founding Team</p>
                <p className="text-muted-foreground text-sm mt-2 font-sans">Dedicated to transforming biology education</p>
              </div>
            </div>
            {/* Decorative offset */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-eucalyptus rounded-2xl -z-10" />
          </div>

          {/* Content */}
          <div>
            <span className="text-emerald font-sans text-xs tracking-[0.2em] uppercase font-medium">About Us</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mt-3 mb-6 leading-tight">
              Where biology<br />comes alive
            </h2>
            <p className="text-muted-foreground font-sans leading-relaxed mb-8">
              Founded with a belief that science should inspire, not intimidate. Brology Classes brings together passionate educators who transform complex biology into engaging, understandable concepts through small batch learning and practical lab experiences.
            </p>

            <div className="space-y-5">
              {[
                { icon: Target, title: "Mission-Driven", text: "Every lesson designed with your success in mind" },
                { icon: Microscope, title: "Lab-First Approach", text: "Hands-on experiments that bring theory to life" },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-emerald" />
                  </div>
                  <div>
                    <h4 className="font-sans font-semibold text-charcoal text-sm">{item.title}</h4>
                    <p className="text-muted-foreground font-sans text-sm">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
