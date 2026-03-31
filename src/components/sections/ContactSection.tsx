import { useState } from "react";
import { MapPin, Phone as PhoneIcon, Mail, Send, Instagram, Youtube, Facebook } from "lucide-react";

export function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission placeholder
    alert("Thank you for your interest! We'll get back to you soon.");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section id="contact" className="bg-background py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <span className="text-emerald font-sans text-xs tracking-[0.2em] uppercase font-medium">Get in Touch</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mt-3 mb-4">
            Contact us
          </h2>
          <p className="text-muted-foreground font-sans max-w-lg mx-auto">
            Ready to start your journey? Reach out and we'll help you find the perfect program.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Map / Info */}
          <div>
            <div className="aspect-[4/3] rounded-2xl bg-sage border border-eucalyptus overflow-hidden mb-6 flex items-center justify-center">
              <div className="text-center p-6">
                <MapPin className="w-8 h-8 text-emerald mx-auto mb-3" />
                <p className="font-serif text-charcoal font-semibold">Brology Classes</p>
                <p className="text-muted-foreground font-sans text-sm mt-1">123 Science Avenue, Education District</p>
                <p className="text-muted-foreground font-sans text-sm">Mumbai, Maharashtra 400001</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <PhoneIcon className="w-4 h-4 text-emerald" />
                <span className="font-sans text-sm text-charcoal">+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-emerald" />
                <span className="font-sans text-sm text-charcoal">hello@brologyclasses.com</span>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              {[Instagram, Youtube, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full border border-eucalyptus flex items-center justify-center text-charcoal/60 hover:text-emerald hover:border-emerald transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { key: "name", label: "Full Name", type: "text", placeholder: "Your full name" },
              { key: "email", label: "Email", type: "email", placeholder: "your@email.com" },
              { key: "phone", label: "Phone", type: "tel", placeholder: "+91 XXXXX XXXXX" },
            ].map((field) => (
              <div key={field.key}>
                <label className="block font-sans text-sm font-medium text-charcoal mb-1.5">{field.label}</label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={form[field.key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-eucalyptus bg-background font-sans text-sm text-charcoal placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald/30 focus:border-emerald transition-colors"
                  required
                />
              </div>
            ))}
            <div>
              <label className="block font-sans text-sm font-medium text-charcoal mb-1.5">Message</label>
              <textarea
                rows={4}
                placeholder="Tell us what you're looking for..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-eucalyptus bg-background font-sans text-sm text-charcoal placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald/30 focus:border-emerald transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 bg-emerald text-white py-3.5 rounded-lg font-sans font-medium text-sm hover:opacity-90 transition-opacity"
            >
              <Send className="w-4 h-4" />
              Submit Enquiry
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
