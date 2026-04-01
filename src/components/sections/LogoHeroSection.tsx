export const LogoHeroSection = () => {
  return (
    <>
      <style>{`
        .logo-hero {
          position: sticky;
          top: 0;
          z-index: 0;
          height: 100vh;
          height: 100svh;
          width: 100%;
          overflow: hidden;
          background: #120d08;
        }

        .logo-hero__image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        .logo-hero::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, rgba(15, 10, 5, 0.12) 0%, rgba(15, 10, 5, 0.12) 48%, rgba(15, 10, 5, 0.48) 100%),
            radial-gradient(circle at top left, rgba(255, 221, 166, 0.18), transparent 32%);
          pointer-events: none;
        }

        .logo-hero__hint {
          position: absolute;
          left: 50%;
          bottom: clamp(1.25rem, 2vw, 2rem);
          z-index: 1;
          transform: translateX(-50%);
          padding: 0.8rem 1.1rem;
          border: 1px solid rgba(255, 255, 255, 0.22);
          border-radius: 999px;
          background: rgba(16, 10, 4, 0.3);
          backdrop-filter: blur(10px);
          color: rgba(255, 248, 240, 0.92);
          font-size: 0.72rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          text-shadow: 0 8px 24px rgba(0, 0, 0, 0.42);
        }

        .logo-scene {
          position: relative;
          z-index: 1;
          margin-top: -1px;
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.24), transparent 18%),
            linear-gradient(135deg, #f4edde 0%, #f0e8d8 42%, #e8ddc6 100%);
          box-shadow: 0 -24px 80px rgba(66, 45, 23, 0.12);
        }

        .logo-scene__divider {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          transform: translateY(-85%);
          pointer-events: none;
          z-index: 1;
        }

        .logo-scene__divider img {
          width: 100%;
          height: auto;
        }

        .logo-scene__content {
          position: relative;
          z-index: 2;
          display: flex;
          min-height: 100vh;
          min-height: 100svh;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: clamp(7rem, 10vw, 9rem) 1.5rem 6rem;
          text-align: center;
        }

        .logo-scene__eyebrow {
          margin: 0 0 1.4rem;
          color: rgba(33, 23, 15, 0.56);
          font-size: clamp(0.76rem, 1.2vw, 0.95rem);
          letter-spacing: 0.3em;
          text-transform: uppercase;
        }

        .logo-scene__title {
          margin: 0;
          max-width: 10ch;
          font-family: "Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif;
          font-size: clamp(3rem, 7.5vw, 6rem);
          font-style: italic;
          font-weight: 500;
          line-height: 0.96;
          text-wrap: balance;
        }

        .logo-scene__rule {
          width: min(6rem, 30vw);
          height: 1px;
          margin: 1.8rem 0 0;
          background: linear-gradient(90deg, transparent 0%, rgba(33, 23, 15, 0.42) 50%, transparent 100%);
        }

        @media (max-width: 720px) {
          .logo-hero__hint {
            bottom: 1rem;
            width: calc(100% - 2rem);
            text-align: center;
          }

          .logo-scene__divider {
            transform: translateY(-64%);
          }

          .logo-scene__content {
            padding-top: 5.5rem;
          }
        }
      `}</style>

      <section className="logo-hero" aria-label="Academy students walking through grand collegiate grounds">
        <img
          className="logo-hero__image"
          src="/assets/brology-school.jpg"
          alt="Academy students walking through grand collegiate grounds"
          loading="lazy"
          fetchPriority="high"
        />
        <div className="logo-hero__hint">Scroll to discover more</div>
      </section>

      <section className="logo-scene" aria-labelledby="scene-title">
        <div className="logo-scene__divider" aria-hidden="true">
          {/* Torn edge divider SVG can be added here */}
        </div>

        <div className="logo-scene__content">
          <div className="logo-scene__eyebrow">Where It All Began</div>
          <h2 id="scene-title" className="logo-scene__title">
            The Foundation
          </h2>
          <div className="logo-scene__rule" />
        </div>
      </section>
    </>
  );
};
