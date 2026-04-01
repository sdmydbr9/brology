import { useEffect, useRef, type ReactNode } from "react";

type Annotation = {
  accentClass: string;
  title: string;
  copy: ReactNode;
  delay: number;
};

type Fact = {
  value: string;
  label: string;
  delay: number;
};

const annotations: Annotation[] = [
  {
    accentClass: "blue",
    title: "5'->3' Strand",
    copy:
      "The backbone runs sugar-phosphate, with the phosphate linking the 3' carbon of one deoxyribose to the 5' carbon of the next.",
    delay: 0,
  },
  {
    accentClass: "red",
    title: "3'->5' Strand",
    copy:
      "The complementary strand runs antiparallel - its 5' end aligns with the 3' end of the first strand. Replication proceeds on both simultaneously.",
    delay: 100,
  },
  {
    accentClass: "amber",
    title: "A-T Base Pair",
    copy: (
      <>
        Adenine pairs with Thymine via <strong>two</strong> hydrogen bonds. This
        weaker pairing gives AT-rich regions lower melting temperatures.
      </>
    ),
    delay: 200,
  },
  {
    accentClass: "green",
    title: "G-C Base Pair",
    copy: (
      <>
        Guanine pairs with Cytosine via <strong>three</strong> hydrogen bonds -
        more stable, higher Tm, and critical for thermophilic organisms.
      </>
    ),
    delay: 300,
  },
];

const facts: Fact[] = [
  {
    value: "3.4 A",
    label: "rise per base pair along the helical axis",
    delay: 0,
  },
  {
    value: "10.5",
    label: "base pairs per complete helical turn",
    delay: 150,
  },
  {
    value: "2 nm",
    label: "diameter of the B-form double helix",
    delay: 300,
  },
];

export function DnaHelixSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const heroBgValue = getComputedStyle(document.documentElement)
      .getPropertyValue("--hero-bg")
      .trim();
    const heroPaper = heroBgValue ? `hsl(${heroBgValue})` : "#fcf7f2";

    const revealNodes = Array.from(
      section.querySelectorAll<HTMLElement>("[data-dna-reveal]"),
    );
    const timeoutIds: number[] = [];

    let revealFraction = 0;
    let targetFraction = 0;
    let rafId: number | null = null;

    canvas.width = 700;
    canvas.height = 2800;

    const W = canvas.width;
    const H = canvas.height;
    const CX = W / 2;
    const RADIUS = 90;
    const RISE = 32;
    const BP_PER_TURN = 10.5;
    const TOTAL_BP = 72;
    const topPad = 60;

    const colors = {
      backbone5: "#2d5a8e",
      backbone3: "#8e2d2d",
      at: "#c17d3c",
      gc: "#3c8e5a",
      ink: "#1a1208",
      sugar: "#5a4020",
      phosphate: "#20405a",
      faint: "rgba(26,18,8,0.06)",
    } as const;

    const seedSequence =
      "ATCGGCTAGCATGCATCGATCGGCATCGATCGATCGGCATCGGCTAGCATGCATCGATCGGCATCGATCGA";
    const baseSequence = Array.from({ length: TOTAL_BP }, (_, index) =>
      seedSequence[index % seedSequence.length],
    );

    const noise = (seed: number) => {
      const value = Math.sin(seed * 127.1 + 78.233) * 43758.5453123;
      return value - Math.floor(value);
    };

    const jitter = (seed: number, scale = 1) => (noise(seed) - 0.5) * scale;

    const roughLine = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      stroke: string,
      lineWidth: number,
      seedBase: number,
      segments = 6,
    ) => {
      ctx.beginPath();
      ctx.strokeStyle = stroke;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      const dx = x2 - x1;
      const dy = y2 - y1;
      ctx.moveTo(
        x1 + jitter(seedBase + 1, lineWidth),
        y1 + jitter(seedBase + 2, lineWidth),
      );

      for (let segment = 1; segment <= segments; segment += 1) {
        const t = segment / segments;
        const px = x1 + dx * t + jitter(seedBase + 10 + segment, lineWidth * 0.8);
        const py = y1 + dy * t + jitter(seedBase + 20 + segment, lineWidth * 0.8);
        ctx.lineTo(px, py);
      }

      ctx.stroke();
    };

    const drawDNA = (reveal: number) => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = heroPaper;
      ctx.fillRect(0, 0, W, H);

      ctx.strokeStyle = colors.faint;
      ctx.lineWidth = 0.8;
      for (let y = 30; y < H; y += 28) {
        ctx.beginPath();
        ctx.moveTo(20, y);
        ctx.lineTo(W - 20, y);
        ctx.stroke();
      }

      ctx.strokeStyle = "rgba(200,120,120,0.13)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(55, 0);
      ctx.lineTo(55, H);
      ctx.stroke();

      const visibleBP = Math.floor(reveal * TOTAL_BP);
      const bps = Array.from({ length: TOTAL_BP }, (_, index) => {
        const angle = (index / BP_PER_TURN) * 2 * Math.PI - Math.PI / 2;
        const y = topPad + index * RISE;
        const x5 = CX + Math.cos(angle) * RADIUS;
        const x3 = CX - Math.cos(angle) * RADIUS;
        const depth = Math.sin(angle);
        const base = baseSequence[index];
        const complement =
          base === "A"
            ? "T"
            : base === "T"
              ? "A"
              : base === "G"
                ? "C"
                : "G";

        return { angle, y, x5, x3, depth, base, complement };
      });

      const drawBackbone = (
        strand: "5" | "3",
        stroke: string,
        alpha: number,
      ) => {
        if (visibleBP < 2) return;

        for (let index = 0; index < visibleBP - 1; index += 1) {
          const bp = bps[index];
          const nextBp = bps[index + 1];
          const x = strand === "5" ? bp.x5 : bp.x3;
          const xNext = strand === "5" ? nextBp.x5 : nextBp.x3;
          const isBehind =
            strand === "5" ? bp.depth < -0.1 : bp.depth > 0.1;
          const seedBase = (strand === "5" ? 1000 : 2000) + index * 37;

          ctx.globalAlpha = isBehind ? alpha * 0.38 : alpha;
          ctx.setLineDash(isBehind ? [4, 5] : []);
          roughLine(
            x + jitter(seedBase + 3, 0.6),
            bp.y + jitter(seedBase + 4, 0.4),
            xNext + jitter(seedBase + 5, 0.6),
            nextBp.y + jitter(seedBase + 6, 0.4),
            stroke,
            isBehind ? 2.2 : 3.5,
            seedBase,
            4,
          );
        }

        ctx.setLineDash([]);
        ctx.globalAlpha = 1;
      };

      drawBackbone("5", colors.backbone5, 0.85);
      drawBackbone("3", colors.backbone3, 0.85);

      for (let index = 0; index < visibleBP; index += 1) {
        const bp = bps[index];
        const isAT = bp.base === "A" || bp.base === "T";
        const pairColor = isAT ? colors.at : colors.gc;
        const absDepth = Math.abs(bp.depth);
        const seedBase = 3000 + index * 67;

        ctx.globalAlpha = 0.55 + absDepth * 0.3;
        ctx.setLineDash(bp.depth < 0 ? [3, 4] : []);

        const hydrogenBonds = isAT ? 2 : 3;
        const rungLength = Math.abs(bp.x5 - bp.x3);
        for (let bond = 0; bond < hydrogenBonds; bond += 1) {
          const t = (bond + 1) / (hydrogenBonds + 1);
          const hx = bp.x5 + (bp.x3 - bp.x5) * t;
          const segmentWidth = (rungLength / (hydrogenBonds + 1)) * 0.55;

          roughLine(
            hx - segmentWidth / 2 + jitter(seedBase + 10 + bond, 1),
            bp.y + jitter(seedBase + 20 + bond, 0.8),
            hx + segmentWidth / 2 + jitter(seedBase + 30 + bond, 1),
            bp.y + jitter(seedBase + 40 + bond, 0.8),
            pairColor,
            1.8,
            seedBase + 50 + bond,
            3,
          );
        }

        roughLine(
          bp.x5 + jitter(seedBase + 60, 1),
          bp.y + jitter(seedBase + 61, 0.8),
          bp.x3 + jitter(seedBase + 62, 1),
          bp.y + jitter(seedBase + 63, 0.8),
          pairColor,
          0.8,
          seedBase + 64,
          4,
        );

        ctx.setLineDash([]);

        ctx.globalAlpha = 0.72 + absDepth * 0.2;
        ctx.font = "italic 600 12px 'Caveat', cursive";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = pairColor;

        const labelOffset = 14;
        ctx.fillText(
          bp.base,
          bp.x5 + (bp.x5 > CX ? labelOffset : -labelOffset) + jitter(seedBase + 70, 1),
          bp.y + jitter(seedBase + 71, 1),
        );
        ctx.fillText(
          bp.complement,
          bp.x3 + (bp.x3 > CX ? labelOffset : -labelOffset) + jitter(seedBase + 72, 1),
          bp.y + jitter(seedBase + 73, 1),
        );

        ctx.globalAlpha = 0.7 + absDepth * 0.2;
        const nodeRadius = 4.5 + jitter(seedBase + 80, 0.6);
        ctx.fillStyle = colors.sugar;

        ctx.beginPath();
        ctx.ellipse(
          bp.x5 + jitter(seedBase + 81, 0.8),
          bp.y + jitter(seedBase + 82, 0.8),
          nodeRadius,
          nodeRadius * 0.85,
          jitter(seedBase + 83, 0.1),
          0,
          Math.PI * 2,
        );
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(
          bp.x3 + jitter(seedBase + 84, 0.8),
          bp.y + jitter(seedBase + 85, 0.8),
          nodeRadius,
          nodeRadius * 0.85,
          jitter(seedBase + 86, 0.1),
          0,
          Math.PI * 2,
        );
        ctx.fill();

        if (index > 0) {
          const previous = bps[index - 1];
          const phosphateSeed = seedBase + 90;

          const px5 = (bp.x5 + previous.x5) / 2 + jitter(phosphateSeed + 1, 2);
          const py5 = (bp.y + previous.y) / 2 + jitter(phosphateSeed + 2, 1.5);
          ctx.fillStyle = colors.phosphate;
          ctx.globalAlpha = 0.55;
          ctx.beginPath();
          ctx.ellipse(
            px5,
            py5,
            5 + jitter(phosphateSeed + 3, 0.8),
            3.5 + jitter(phosphateSeed + 4, 0.5),
            Math.PI / 4 + jitter(phosphateSeed + 5, 0.2),
            0,
            Math.PI * 2,
          );
          ctx.fill();

          const px3 = (bp.x3 + previous.x3) / 2 + jitter(phosphateSeed + 6, 2);
          const py3 = (bp.y + previous.y) / 2 + jitter(phosphateSeed + 7, 1.5);
          ctx.beginPath();
          ctx.ellipse(
            px3,
            py3,
            5 + jitter(phosphateSeed + 8, 0.8),
            3.5 + jitter(phosphateSeed + 9, 0.5),
            Math.PI / 4 + jitter(phosphateSeed + 10, 0.2),
            0,
            Math.PI * 2,
          );
          ctx.fill();
        }

        ctx.globalAlpha = 1;

        if (index > 0 && index % Math.round(BP_PER_TURN / 2) === 3) {
          const grooveY = bp.y - RISE * 2;
          const isMinor = Math.floor((index / BP_PER_TURN) * 2) % 2 === 1;
          ctx.globalAlpha = 0.28;
          ctx.fillStyle = colors.ink;
          ctx.font = "italic 10px 'EB Garamond', serif";
          ctx.textAlign = "right";
          ctx.fillText(
            isMinor ? "minor groove" : "major groove",
            52,
            grooveY,
          );
          ctx.globalAlpha = 1;
        }
      }

      for (let turn = 1; turn <= 6; turn += 1) {
        const bpIndex = Math.round(turn * BP_PER_TURN);
        if (bpIndex >= visibleBP) break;

        const markerY = topPad + bpIndex * RISE;
        const seedBase = 5000 + turn * 19;
        ctx.globalAlpha = 0.22;
        ctx.strokeStyle = colors.ink;
        ctx.lineWidth = 0.8;
        ctx.setLineDash([2, 3]);
        ctx.beginPath();
        ctx.moveTo(CX - RADIUS - 30, markerY);
        ctx.lineTo(CX + RADIUS + 30, markerY);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.globalAlpha = 0.38;
        ctx.font = "italic 10px 'EB Garamond', serif";
        ctx.textAlign = "left";
        ctx.fillStyle = colors.ink;
        ctx.fillText(
          `turn ${turn}`,
          CX + RADIUS + 32 + jitter(seedBase + 1, 1),
          markerY + 4 + jitter(seedBase + 2, 1),
        );
        ctx.globalAlpha = 1;
      }

      if (visibleBP > 0) {
        const top = bps[0];
        ctx.globalAlpha = 0.9;
        ctx.font = "bold 14px 'Caveat', cursive";
        ctx.textAlign = "center";
        ctx.fillStyle = colors.backbone5;
        ctx.fillText("5'", top.x5, topPad - 22);
        ctx.fillStyle = colors.backbone3;
        ctx.fillText("3'", top.x3, topPad - 22);

        if (visibleBP === TOTAL_BP) {
          const bottom = bps[TOTAL_BP - 1];
          ctx.fillStyle = colors.backbone5;
          ctx.fillText("3'", bottom.x5, bottom.y + 24);
          ctx.fillStyle = colors.backbone3;
          ctx.fillText("5'", bottom.x3, bottom.y + 24);
        }
        ctx.globalAlpha = 1;
      }

      if (reveal > 0.1) {
        const scaleBarX = W - 80;
        const scaleBarY = topPad + 24;
        const pxPerAngstrom = RISE / 3.4;
        const barPx = 34 * pxPerAngstrom;

        ctx.globalAlpha = 0.5 * Math.min(reveal * 5, 1);
        ctx.strokeStyle = colors.ink;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(scaleBarX, scaleBarY);
        ctx.lineTo(scaleBarX + barPx, scaleBarY);
        ctx.moveTo(scaleBarX, scaleBarY - 4);
        ctx.lineTo(scaleBarX, scaleBarY + 4);
        ctx.moveTo(scaleBarX + barPx, scaleBarY - 4);
        ctx.lineTo(scaleBarX + barPx, scaleBarY + 4);
        ctx.stroke();

        ctx.font = "10px 'EB Garamond', serif";
        ctx.textAlign = "center";
        ctx.fillStyle = colors.ink;
        ctx.fillText("34 A", scaleBarX + barPx / 2, scaleBarY - 7);
        ctx.globalAlpha = 1;
      }
    };

    const getScrollReveal = () => {
      const rect = canvas.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const start = rect.top - viewportHeight * 0.9;
      const end = rect.bottom - viewportHeight * 0.1;
      const total = end - start || 1;
      const progress = -start / total;
      return Math.max(0, Math.min(1, progress));
    };

    const animateCanvas = () => {
      const diff = targetFraction - revealFraction;
      if (Math.abs(diff) > 0.001) {
        revealFraction += diff * 0.06;
        drawDNA(revealFraction);
        rafId = window.requestAnimationFrame(animateCanvas);
        return;
      }

      revealFraction = targetFraction;
      drawDNA(revealFraction);
      rafId = null;
    };

    const revealTextBlocks = () => {
      revealNodes.forEach((node) => {
        if (node.classList.contains("is-visible")) return;
        if (node.dataset.revealScheduled === "true") return;

        const rect = node.getBoundingClientRect();
        if (rect.top >= window.innerHeight * 0.88) return;

        node.dataset.revealScheduled = "true";
        const timeoutId = window.setTimeout(() => {
          node.classList.add("is-visible");
        }, Number(node.dataset.delay ?? "0"));
        timeoutIds.push(timeoutId);
      });
    };

    const handleScroll = () => {
      targetFraction = getScrollReveal();
      if (rafId === null) {
        rafId = window.requestAnimationFrame(animateCanvas);
      }
      revealTextBlocks();
    };

    drawDNA(0);
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <>
      <style>{`
        .dna-helix {
          --dna-ink: #1a1208;
          --dna-paper: hsl(var(--hero-bg));
          --dna-paper-alt: hsl(var(--hero-bg));
          --dna-strand-a: #2d5a8e;
          --dna-strand-b: #8e2d2d;
          --dna-base-at: #c17d3c;
          --dna-base-gc: #3c8e5a;
          --dna-accent: #5a3e8e;
          --dna-faint: rgba(26, 18, 8, 0.12);
          position: relative;
          overflow: hidden;
          background: var(--dna-paper);
          color: var(--dna-ink);
          font-family: "EB Garamond", serif;
        }

        .dna-helix::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          opacity: 0.6;
          pointer-events: none;
          z-index: 0;
        }

        .dna-helix__hero,
        .dna-helix__canvas-section,
        .dna-helix__annotations,
        .dna-helix__facts,
        .dna-helix__footer {
          position: relative;
          z-index: 1;
        }

        .dna-helix__hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem 1.5rem 5rem;
          text-align: center;
        }

        .dna-helix__label {
          margin-bottom: 1rem;
          color: var(--dna-strand-a);
          font-family: "Caveat", cursive;
          font-size: 1.1rem;
          letter-spacing: 0.3em;
          opacity: 0.7;
          text-transform: uppercase;
        }

        .dna-helix__heading {
          margin: 0;
          font-family: "EB Garamond", serif;
          font-size: clamp(3.5rem, 10vw, 7rem);
          font-style: italic;
          font-weight: 400;
          letter-spacing: -0.02em;
          line-height: 1;
        }

        .dna-helix__heading-meta {
          display: block;
          margin-top: 0.5rem;
          color: var(--dna-strand-b);
          font-family: "Caveat", cursive;
          font-size: 0.45em;
          font-style: normal;
          font-weight: 600;
          letter-spacing: 0.1em;
        }

        .dna-helix__desc {
          max-width: 30rem;
          margin-top: 2rem;
          font-size: 1.1rem;
          font-style: italic;
          line-height: 1.7;
          opacity: 0.7;
        }

        .dna-helix__hint {
          position: absolute;
          bottom: 2.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          font-family: "Caveat", cursive;
          font-size: 1rem;
          opacity: 0.5;
          animation: dna-helix-bounce 2s ease-in-out infinite;
        }

        .dna-helix__hint svg {
          opacity: 0.6;
        }

        .dna-helix__canvas-section {
          padding: 4rem 1.5rem 8rem;
        }

        .dna-helix__section-title {
          margin-bottom: 0.5rem;
          text-align: center;
          color: var(--dna-accent);
          font-family: "Caveat", cursive;
          font-size: 1.4rem;
          letter-spacing: 0.15em;
          opacity: 0.7;
        }

        .dna-helix__section-subtitle {
          margin-bottom: 3rem;
          text-align: center;
          font-size: 1.05rem;
          font-style: italic;
          opacity: 0.55;
        }

        .dna-helix__canvas {
          display: block;
          width: min(100%, 700px);
          height: auto;
          margin: 0 auto;
          border-radius: 1.5rem;
          box-shadow: 0 30px 80px rgba(26, 18, 8, 0.08);
        }

        .dna-helix__annotations {
          max-width: 680px;
          margin: 4rem auto 0;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 2rem 3rem;
          padding: 0 1rem;
        }

        .dna-helix__annotation,
        .dna-helix__fact {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }

        .dna-helix__annotation.is-visible,
        .dna-helix__fact.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .dna-helix__annotation-title {
          margin-bottom: 0.4rem;
          font-family: "Caveat", cursive;
          font-size: 1.15rem;
          font-weight: 600;
        }

        .dna-helix__annotation-title.blue { color: var(--dna-strand-a); }
        .dna-helix__annotation-title.red { color: var(--dna-strand-b); }
        .dna-helix__annotation-title.amber { color: var(--dna-base-at); }
        .dna-helix__annotation-title.green { color: var(--dna-base-gc); }

        .dna-helix__annotation-copy {
          font-size: 0.95rem;
          font-style: italic;
          line-height: 1.65;
          opacity: 0.72;
        }

        .dna-helix__facts {
          margin-top: 2rem;
          padding: 3rem 1.5rem;
          background: var(--dna-paper-alt);
          border-top: 1px solid var(--dna-faint);
          border-bottom: 1px solid var(--dna-faint);
        }

        .dna-helix__facts-inner {
          max-width: 760px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 2rem;
          text-align: center;
        }

        .dna-helix__fact-number {
          color: var(--dna-accent);
          font-family: "Caveat", cursive;
          font-size: 2.8rem;
          font-weight: 700;
          line-height: 1;
        }

        .dna-helix__fact-label {
          margin-top: 0.3rem;
          font-size: 0.88rem;
          font-style: italic;
          line-height: 1.5;
          opacity: 0.62;
        }

        .dna-helix__footer {
          padding: 3rem 1.5rem;
          text-align: center;
          font-family: "Caveat", cursive;
          font-size: 1rem;
          letter-spacing: 0.1em;
          opacity: 0.4;
        }

        @keyframes dna-helix-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }

        @media (max-width: 600px) {
          .dna-helix__annotations,
          .dna-helix__facts-inner {
            grid-template-columns: 1fr;
          }

          .dna-helix__hero {
            padding-top: 5rem;
          }
        }
      `}</style>

      <section
        id="dna-helix"
        ref={sectionRef}
        className="dna-helix"
        aria-labelledby="dna-helix-heading"
      >
        <section className="dna-helix__hero">
          <div className="dna-helix__label">Deoxyribonucleic Acid</div>
          <h2 id="dna-helix-heading" className="dna-helix__heading">
            The Double
            <br />
            Helix
            <span className="dna-helix__heading-meta">Watson &amp; Crick, 1953</span>
          </h2>
          <p className="dna-helix__desc">
            A hand-drawn journey through the molecule of life - two antiparallel
            strands wound in a right-handed helix, held together by hydrogen bonds
            between complementary bases.
          </p>
          <div className="dna-helix__hint" aria-hidden="true">
            <span>scroll to reveal</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <polyline points="4 8 10 14 16 8" />
            </svg>
          </div>
        </section>

        <section className="dna-helix__canvas-section" aria-labelledby="dna-illustration-title">
          <div id="dna-illustration-title" className="dna-helix__section-title">
            - Scientific Illustration -
          </div>
          <div className="dna-helix__section-subtitle">
            B-form DNA . 10.5 base pairs per turn . 3.4 A rise per base pair
          </div>
          <canvas
            ref={canvasRef}
            className="dna-helix__canvas"
            width={700}
            height={2800}
          />
        </section>

        <div className="dna-helix__annotations">
          {annotations.map((annotation) => (
            <div
              key={annotation.title}
              className="dna-helix__annotation"
              data-delay={annotation.delay}
              data-dna-reveal="annotation"
            >
              <div className={`dna-helix__annotation-title ${annotation.accentClass}`}>
                {annotation.title}
              </div>
              <p className="dna-helix__annotation-copy">{annotation.copy}</p>
            </div>
          ))}
        </div>

        <div className="dna-helix__facts">
          <div className="dna-helix__facts-inner">
            {facts.map((fact) => (
              <div
                key={fact.value}
                className="dna-helix__fact"
                data-delay={fact.delay}
                data-dna-reveal="fact"
              >
                <div className="dna-helix__fact-number">{fact.value}</div>
                <div className="dna-helix__fact-label">{fact.label}</div>
              </div>
            ))}
          </div>
        </div>

        <footer className="dna-helix__footer">drawn with geometry / not a shortcut</footer>
      </section>
    </>
  );
}
