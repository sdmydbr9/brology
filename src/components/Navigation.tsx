import { useState, useEffect } from "react";
import { Home, Users, GraduationCap, BookOpen, CreditCard, Phone, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { id: "hero", label: "Home", icon: Home },
  { id: "about", label: "About", icon: Users },
  { id: "mentors", label: "Mentors", icon: GraduationCap },
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "fees", label: "Fees", icon: CreditCard },
  { id: "contact", label: "Contact", icon: Phone },
];

export function DesktopSidebar() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPos = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActive(navItems[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-[220px] bg-midnight flex-col z-50">
      {/* Logo */}
      <div className="p-6 pt-8">
        <h2 className="text-2xl font-serif font-bold text-white tracking-wide">
          Brology
        </h2>
        <p className="text-xs text-emerald font-sans tracking-[0.2em] uppercase mt-1">Classes</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-1 px-3 mt-6">
        {navItems.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-sans transition-all duration-300 text-left",
                isActive
                  ? "bg-white text-charcoal font-medium shadow-sm"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom CTA */}
      <div className="p-4">
        <button
          onClick={() => scrollTo("contact")}
          className="w-full py-3 bg-emerald text-white rounded-lg text-sm font-sans font-medium hover:opacity-90 transition-opacity"
        >
          Enroll Now
        </button>
      </div>
    </aside>
  );
}

export function MobileNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <>
      {/* Floating pill */}
      <div className="lg:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-midnight rounded-full px-2 py-2 shadow-2xl min-w-[300px] justify-between">
        {/* Menu button */}
        <button
          onClick={() => setMenuOpen(true)}
          className="flex items-center gap-1.5 bg-white text-charcoal rounded-full px-4 py-2.5 text-xs font-sans font-medium"
        >
          <Menu className="w-3.5 h-3.5" />
          Menu
        </button>

        {/* Center Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-4 bg-midnight rounded-full px-4 py-2 border-2 border-emerald">
          <span className="text-white font-serif font-bold text-sm">B</span>
        </div>

        {/* Enroll CTA */}
        <button
          onClick={() => scrollTo("contact")}
          className="bg-emerald text-white rounded-full px-4 py-2.5 text-xs font-sans font-medium hover:opacity-90 transition-opacity"
        >
          Enroll Now
        </button>
      </div>

      {/* Full-screen overlay menu */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 z-[60] bg-midnight flex flex-col items-center justify-center transition-all duration-500",
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-6 right-6 text-white/70 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-3xl font-serif font-bold text-white mb-2">Brology</h2>
        <p className="text-xs text-emerald font-sans tracking-[0.2em] uppercase mb-12">Classes</p>

        <nav className="flex flex-col gap-4 items-center">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="flex items-center gap-3 text-white/80 hover:text-white text-lg font-sans transition-colors"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <button
          onClick={() => scrollTo("contact")}
          className="mt-12 bg-emerald text-white rounded-full px-8 py-3 text-sm font-sans font-medium hover:opacity-90 transition-opacity"
        >
          Enroll Now
        </button>
      </div>
    </>
  );
}
