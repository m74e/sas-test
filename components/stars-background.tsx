"use client";


const STAR_POSITIONS = [
  [2, 5], [8, 12], [15, 3], [22, 18], [28, 7], [35, 22], [42, 10], [48, 28], [55, 14], [62, 5],
  [68, 25], [75, 8], [82, 19], [88, 4], [92, 15], [5, 35], [12, 42], [18, 38], [25, 48], [32, 35],
  [38, 52], [45, 40], [52, 58], [58, 45], [65, 62], [72, 38], [78, 55], [85, 42], [92, 60], [7, 68],
  [14, 72], [22, 65], [28, 78], [35, 70], [42, 82], [48, 68], [55, 75], [62, 88], [68, 72], [75, 80],
  [82, 65], [88, 92], [3, 88], [12, 95], [25, 88], [38, 92], [52, 85], [65, 90], [78, 82], [90, 78],
  [10, 25], [45, 12], [70, 32], [20, 55], [85, 48], [50, 70], [15, 80], [60, 18], [95, 35], [30, 92],
];

interface StarsBackgroundProps {
  /** When true, stars scroll with the page (absolute). Otherwise fixed. */
  scrollWithPage?: boolean;
}

export function StarsBackground({ scrollWithPage }: StarsBackgroundProps = {}) {
  return (
    <div
      className={`pointer-events-none z-[1] overflow-hidden ${scrollWithPage ? "absolute inset-0" : "fixed inset-0"}`}
      aria-hidden
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="star-glow">
            <feGaussianBlur stdDeviation="0.15" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {STAR_POSITIONS.map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={i % 3 === 0 ? 0.4 : 0.25}
            fill="white"
            opacity={0.5 + (i % 3) * 0.2}
            filter="url(#star-glow)"
            className="animate-twinkle"
            style={{ animationDelay: `${(i % 10) * 0.4}s` }}
          />
        ))}
      </svg>
    </div>
  );
}
