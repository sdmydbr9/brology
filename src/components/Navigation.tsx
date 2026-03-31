import { useState, useEffect } from "react";
import { Home, Users, GraduationCap, BookOpen, CreditCard, Phone, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "../../logo/white_logo.png";

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
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-[220px] bg-[#050505] border-r border-white/5 flex-col z-50 shadow-[8px_0_30px_rgba(0,0,0,0.32)]">
      {/* Logo */}
      <div className="p-5 pt-8 flex justify-center">
        <img src={logo} alt="Brology Classes" className="h-40 w-auto object-contain" />
      </div>

      {/* Divider */}
      <div className="mx-6 border-t border-white/10 mb-4" />

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-0.5 px-3">
        {navItems.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-[1.35rem] text-sm font-sans transition-all duration-300 text-left",
                isActive
                  ? "bg-[#f8f4ef] text-[#171311] font-medium shadow-[0_18px_35px_rgba(0,0,0,0.28)]"
                  : "text-white/70 hover:text-white hover:bg-white/[0.06]"
              )}
            >
              <item.icon className={cn("w-4 h-4 flex-shrink-0", isActive ? "text-[#ff4d4f]" : "text-white/30")} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom CTA */}
      <div className="p-4">
        <button
          onClick={() => scrollTo("contact")}
          className="w-full py-3 bg-white text-[#111111] rounded-xl text-sm font-sans font-medium hover:bg-white/90 transition-colors"
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
      <div className="lg:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-[#050505]/95 rounded-full px-2 py-2 shadow-[0_18px_35px_rgba(0,0,0,0.35)] min-w-[300px] justify-between border border-white/10 backdrop-blur-md">
        {/* Menu button */}
        <button
          onClick={() => setMenuOpen(true)}
          className="flex items-center gap-1.5 bg-[#f8f4ef] text-[#171311] rounded-full px-4 py-2.5 text-xs font-sans font-medium"
        >
          <Menu className="w-3.5 h-3.5" />
          Menu
        </button>

        {/* Center Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-5 bg-[#050505] rounded-full p-1.5 border border-white/10 shadow-[0_12px_25px_rgba(0,0,0,0.28)]">
          <img src={logo} alt="Brology Classes" className="h-8 w-auto object-contain" />
        </div>

        {/* Enroll CTA */}
        <button
          onClick={() => scrollTo("contact")}
          className="bg-[#f8f4ef] text-[#171311] rounded-full px-4 py-2.5 text-xs font-sans font-medium hover:bg-white transition-colors"
        >
          Enroll Now
        </button>
      </div>

      {/* Full-screen overlay menu */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 z-[60] bg-[#050505] flex flex-col items-center justify-center transition-all duration-500",
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-6 right-6 text-white/45 hover:text-white/85 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <img src={logo} alt="Brology Classes" className="h-16 w-auto object-contain mb-12" />

        <nav className="flex flex-col gap-4 items-center">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="flex items-center gap-3 text-white/65 hover:text-white text-lg font-sans transition-colors"
            >
              <item.icon className="w-5 h-5 text-white/35" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <button
          onClick={() => scrollTo("contact")}
          className="mt-12 bg-[#f8f4ef] text-[#171311] rounded-full px-8 py-3 text-sm font-sans font-medium hover:bg-white transition-colors"
        >
          Enroll Now
        </button>
      </div>
    </>
  );
}
