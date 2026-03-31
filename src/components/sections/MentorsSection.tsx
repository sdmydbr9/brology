import { Award } from "lucide-react";

const mentors = [
  { name: "Dr. Priya Sharma", role: "NEET Biology Expert", exp: "12+ years", specialty: "Genetics & Molecular Biology" },
  { name: "Prof. Rajesh Iyer", role: "Senior Faculty", exp: "10+ years", specialty: "Ecology & Environment" },
  { name: "Ms. Ananya Desai", role: "Lab Coordinator", exp: "8+ years", specialty: "Practical Biology & Zoology" },
  { name: "Dr. Vikram Rao", role: "Research Mentor", exp: "15+ years", specialty: "Human Physiology" },
];

export function MentorsSection() {
  return (
    <section id="mentors" className="bg-background py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <span className="text-emerald font-sans text-[10px] tracking-[0.25em] uppercase font-medium">Our Team</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mt-3 mb-4">
            Brology Mentors
          </h2>
          <p className="text-muted-foreground font-sans max-w-lg mx-auto">
            Experienced educators who are as passionate about your growth as they are about biology.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mentors.map((mentor) => (
            <div
              key={mentor.name}
              className="group border border-eucalyptus/70 rounded-2xl p-6 text-center hover:shadow-md transition-all duration-500 bg-background"
            >
              {/* Avatar placeholder */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-sage to-eucalyptus/50 mx-auto mb-5 flex items-center justify-center border border-eucalyptus group-hover:border-emerald/40 transition-colors duration-500">
                <span className="text-2xl font-serif font-bold text-charcoal/60">
                  {mentor.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <h3 className="font-serif font-semibold text-charcoal text-lg">{mentor.name}</h3>
              <p className="text-emerald font-sans text-[10px] font-medium mt-1 uppercase tracking-[0.15em]">{mentor.role}</p>
              <div className="mt-4 pt-4 border-t border-eucalyptus/50">
                <p className="text-muted-foreground font-sans text-xs">{mentor.specialty}</p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <Award className="w-3 h-3 text-emerald" />
                  <span className="text-charcoal/70 font-sans text-xs font-medium">{mentor.exp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
