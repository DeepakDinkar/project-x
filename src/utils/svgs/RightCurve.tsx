import { useBreakPoint } from "../../hooks/useBreakPoint";

export function RightCurve() {
  const breakPoints = useBreakPoint();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={breakPoints?.md ? 60: 44}
      height={breakPoints?.md ? 56: 38}
      viewBox="0 0 62 58"
      fill="none"
      className="right-curve"
    >
      <path
        d="M0 56L19.5 56C41.5914 56 59.5 38.0914 59.5 16L59.5 0"
        stroke="#1E90FF"
        strokeWidth="4"
      />
    </svg>
  );
}
