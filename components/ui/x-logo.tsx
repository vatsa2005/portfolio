"use client";
import * as React from "react";

// X (formerly Twitter) brand logo; uses currentColor for fill so Tailwind text-* utilities apply.
export const XLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    fill="currentColor"
    role="img"
    {...props}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.8 21.75H1.49l7.73-8.84L1.089 2.25h5.69l4.713 6.231 6.752-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
  </svg>
);

export default XLogo;
