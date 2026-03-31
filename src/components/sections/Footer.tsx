import logo from "@/assets/logo.png";

const links = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Mentors", href: "#mentors" },
  { label: "Courses", href: "#courses" },
  { label: "Fees", href: "#fees" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="bg-midnight py-16 pb-32 lg:pb-16">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <img src={logo} alt="Brology Classes" className="h-10 w-auto object-contain mb-4 opacity-80" />
            <p className="text-white/30 font-sans text-sm leading-relaxed">
              Premium biology coaching with a friendly vibe. Building future doctors and scientists, one batch at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white/60 font-sans font-semibold text-[10px] mb-4 uppercase tracking-[0.2em]">Quick Links</h4>
            <nav className="space-y-2">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-white/30 font-sans text-sm hover:text-emerald transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white/60 font-sans font-semibold text-[10px] mb-4 uppercase tracking-[0.2em]">Reach Us</h4>
            <div className="space-y-2 text-white/30 font-sans text-sm">
              <p>123 Science Avenue, Education District</p>
              <p>Mumbai, Maharashtra 400001</p>
              <p className="text-emerald/70">+91 98765 43210</p>
              <p className="text-emerald/70">hello@brologyclasses.com</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.06] pt-8 text-center">
          <p className="text-white/20 font-sans text-xs">
            © {new Date().getFullYear()} Brology Classes. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
