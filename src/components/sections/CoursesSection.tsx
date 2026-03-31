import { ArrowRight, CheckCircle2 } from "lucide-react";

const courses = [
  {
    title: "NEET Preparation",
    subtitle: "Complete Biology for Medical Entrance",
    description: "Comprehensive NEET biology coaching covering both Botany and Zoology with a focus on NCERT mastery and advanced problem solving.",
    topics: ["Cell Biology & Molecular Biology", "Genetics & Evolution", "Human Physiology", "Plant Physiology & Ecology", "Mock Tests & Previous Year Analysis"],
    duration: "12 Months",
    level: "Class 11 & 12",
  },
  {
    title: "Foundational Biology",
    subtitle: "Building Strong Basics for Future Scientists",
    description: "Perfect for students in classes 8-10 who want a head start. Builds deep conceptual understanding through interactive teaching and practicals.",
    topics: ["Introduction to Life Sciences", "The Living World & Diversity", "Body Systems & Functions", "Lab Skills & Scientific Method", "Biology Olympiad Prep"],
    duration: "10 Months",
    level: "Class 8-10",
  },
];

export function CoursesSection() {
  return (
    <section id="courses" className="bg-background py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <span className="text-emerald font-sans text-xs tracking-[0.2em] uppercase font-medium">Programs</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mt-3 mb-4">
            Courses we provide
          </h2>
          <p className="text-muted-foreground font-sans max-w-lg mx-auto">
            Structured programs designed for depth, clarity, and exam excellence.
          </p>
        </div>

        <div className="space-y-8">
          {courses.map((course) => (
            <div
              key={course.title}
              className="border border-eucalyptus rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="grid md:grid-cols-5">
                {/* Illustration placeholder */}
                <div className="md:col-span-2 bg-gradient-to-br from-midnight/5 via-emerald/5 to-sage p-8 flex items-center justify-center min-h-[250px]">
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full bg-emerald/10 mx-auto mb-4 flex items-center justify-center border border-eucalyptus">
                      <svg viewBox="0 0 48 48" className="w-12 h-12 text-emerald" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="24" cy="20" r="8" />
                        <circle cx="24" cy="20" r="3" />
                        <path d="M24 28v8M20 32h8M16 12c-2-4 2-8 8-8s10 4 8 8" />
                      </svg>
                    </div>
                    <p className="font-serif text-charcoal/60 text-sm italic">Biological Illustration</p>
                  </div>
                </div>

                {/* Content */}
                <div className="md:col-span-3 p-8 md:p-10">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-sage text-charcoal/70 rounded-full text-xs font-sans font-medium">{course.duration}</span>
                    <span className="px-3 py-1 bg-emerald/10 text-emerald rounded-full text-xs font-sans font-medium">{course.level}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-charcoal mb-2">{course.title}</h3>
                  <p className="text-emerald font-sans text-sm font-medium mb-4">{course.subtitle}</p>
                  <p className="text-muted-foreground font-sans text-sm leading-relaxed mb-6">{course.description}</p>

                  <div className="space-y-2 mb-8">
                    {course.topics.map((topic) => (
                      <div key={topic} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald flex-shrink-0 mt-0.5" />
                        <span className="font-sans text-sm text-charcoal">{topic}</span>
                      </div>
                    ))}
                  </div>

                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 bg-emerald text-white px-6 py-3 rounded-lg font-sans font-medium text-sm hover:opacity-90 transition-opacity group"
                  >
                    Enroll Now
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
