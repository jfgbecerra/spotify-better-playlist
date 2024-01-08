import React from 'react';

export const HeartIcon = ({
  size = 24,
  width,
  height,
  strokeWidth = 1.5,
  fill = 'none',
  ...props
}: {
  size?: number;
  width?: number | undefined;
  height?: number;
  [key: string]: any;
}) => (
  <svg
    aria-hidden='true'
    fill={fill}
    focusable='false'
    height={size || height}
    role='presentation'
    viewBox='0 0 24 24'
    width={size || width}
    {...props}
  >
    <path
      d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={strokeWidth}
    />
  </svg>
);
