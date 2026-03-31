import { Leaf } from "lucide-react";

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
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="w-5 h-5 text-emerald" />
              <h3 className="text-xl font-serif font-bold text-white">Brology</h3>
            </div>
            <p className="text-white/50 font-sans text-sm leading-relaxed">
              Premium biology coaching with a friendly vibe. Building future doctors and scientists, one batch at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-sans font-semibold text-sm mb-4 uppercase tracking-wider">Quick Links</h4>
            <nav className="space-y-2">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-white/50 font-sans text-sm hover:text-emerald transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-sans font-semibold text-sm mb-4 uppercase tracking-wider">Reach Us</h4>
            <div className="space-y-2 text-white/50 font-sans text-sm">
              <p>123 Science Avenue, Education District</p>
              <p>Mumbai, Maharashtra 400001</p>
              <p className="text-emerald">+91 98765 43210</p>
              <p className="text-emerald">hello@brologyclasses.com</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-white/30 font-sans text-xs">
            © {new Date().getFullYear()} Brology Classes. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
