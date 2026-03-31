

# Brology Classes — Premium Coaching Website

## Design System
- **Colors**: Off-white/Soft Sage (#E8EFEA) foundations, Midnight Forest (#0A1C12) for dark sections, Emerald Green (#057A2A) for interactive accents only, Green-Tinted Charcoal (#161A17) for text, Faded Eucalyptus (#C3D1C8) for borders
- **Typography**: Playfair Display (serif) for headings, Inter (sans-serif) for body
- **80/20 luxury rule** applied throughout

## Navigation
- **Desktop**: Fixed left sidebar (Midnight Forest bg), logo at top, vertical icon links (Home, About, Mentors, Courses, Fees, Contact) with active "cut-out" white background state. Content flows to the right.
- **Mobile**: Sidebar hidden. Bottom floating pill bar (Midnight Forest bg) with white "Menu" button (left), centered Brology logo overlapping top edge, Emerald Green "Enroll Now" (right). Menu opens full-screen overlay.

## Sections (Single Page, Top to Bottom)

1. **Hero** — Midnight Forest bg, cinematic full-width, "Science with a friendly vibe" in white Playfair Display, Emerald Green "Book a Free Trial" CTA
2. **About Us** — Soft Sage bg, team placeholder image with Eucalyptus border, mission text about small batches & labs
3. **Know Our Mentors** — White bg, responsive grid of rounded profile cards with Eucalyptus borders, placeholder names/photos/qualifications
4. **What We Provide** — Soft Sage bg, icon-based feature cards (Personalized Attention, Small Batch Learning, Practical Labs, Study Materials) with Charcoal icons + Emerald accents
5. **Courses** — White bg, large editorial cards per course (NEET Prep, Foundational Biology), biology illustration placeholders, bullet syllabus, Emerald "Enroll Now" buttons
6. **Fee Structure** — Soft Sage bg, transparent pricing table with Eucalyptus borders, Emerald checkmarks
7. **Achievements** — Midnight Forest bg, Emerald Green stat numbers (NEET Toppers, Board Scores), swipeable student testimonial carousel
8. **Contact Us** — White bg, split layout with map placeholder + minimalist contact form, Emerald "Submit" button, social icons
9. **Footer** — Midnight Forest bg, white/gray text, links, copyright, extra bottom padding for mobile pill

## Implementation Approach
- Single `Index.tsx` page with section components
- Sidebar component with responsive logic (hidden on mobile via Tailwind breakpoints)
- Mobile floating pill component with menu overlay
- Smooth scroll navigation between sections
- Google Fonts loaded for Playfair Display + Inter
- All placeholder images using gradient/SVG placeholders styled to match the luxury theme

