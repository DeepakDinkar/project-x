type Props = {
  onClick?: React.MouseEventHandler;
  className?: string;
};

export function Cart({ onClick, className }: Readonly<Props>) {
  return (
    <svg
      onClick={onClick}
      className={className}
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="22.000000pt"
      height="22.000000pt"
      viewBox="0 0 32.000000 32.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,32.000000) scale(0.100000,-0.100000)"
        fill="#000000"
        stroke="none"
      >
        <path
          d="M120 300 c-11 -11 -20 -27 -20 -35 0 -9 -9 -15 -24 -15 -29 0 -32 -9
   -41 -105 -3 -38 -8 -87 -11 -107 l-6 -38 142 0 142 0 -6 38 c-3 20 -8 69 -11
   107 -9 96 -12 105 -41 105 -15 0 -24 6 -24 15 0 22 -37 55 -60 55 -11 0 -29
   -9 -40 -20z m68 -12 c24 -24 13 -38 -28 -38 -26 0 -40 5 -40 13 0 18 21 37 40
   37 9 0 21 -5 28 -12z m-88 -73 c0 -8 5 -15 10 -15 6 0 10 7 10 15 0 11 11 15
   40 15 29 0 40 -4 40 -15 0 -8 5 -15 10 -15 6 0 10 7 10 15 0 8 8 15 19 15 16
   0 20 -11 25 -77 4 -43 9 -90 12 -105 l6 -28 -122 0 -122 0 6 27 c3 16 8 63 12
   106 5 66 9 77 25 77 11 0 19 -7 19 -15z"
        />
      </g>
    </svg>
  );
}
