import tornPaper from "@/assets/torn-paper-strip.png";

export const TornEdgeDivider = () => (
  <div className="w-full pointer-events-none">
    <img
      src={tornPaper}
      alt=""
      className="block w-full h-auto"
      loading="lazy"
      width={1920}
      height={512}
    />
  </div>
);
