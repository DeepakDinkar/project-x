import { useBreakPoint } from "../../hooks/useBreakPoint";

export function LeftCurve() {
  const breakPoints = useBreakPoint();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={breakPoints?.md ? 60: 44}
      height={breakPoints?.md ? 56: 38}
      viewBox="0 0 62 58"
      fill="none"
      className="left-curve"
    >
      <path
        d="M61.5 2H42C19.9086 2 2 19.9086 2 42V58"
        stroke="#1E90FF"
        strokeWidth="4"
      />
    </svg>
  );
}
