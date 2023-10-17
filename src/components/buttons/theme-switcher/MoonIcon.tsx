export const MoonIcon = ({ className }: { className: string | undefined }) => {
  return (
    <svg
      className={className}
      viewBox='0 0 73 73'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g filter='url(#filter0_ii_102_154)'>
        <circle cx='50%' cy='50%' r='49%' fill='#C4C9D2' />
      </g>
      <path
        d='M37.9658 16.5001C37.9658 19.3351 35.6676 21.6333 32.8326 21.6333C29.9976 21.6333 27.6993 19.3351 27.6993 16.5001C27.6993 13.6651 29.9976 11.3668 32.8326 11.3668C35.6676 11.3668 37.9658 13.6651 37.9658 16.5001Z'
        fill='#9DA5B5'
      />
      <path
        d='M36.1541 45.1859C36.1541 52.1901 30.4761 57.868 23.472 57.868C16.4678 57.868 10.7898 52.1901 10.7898 45.1859C10.7898 38.1817 16.4678 32.5037 23.472 32.5037C30.4761 32.5037 36.1541 38.1817 36.1541 45.1859Z'
        fill='#9DA5B5'
      />
      <path
        d='M62.7262 42.7702C62.7262 47.1062 59.2113 50.6211 54.8754 50.6211C50.5395 50.6211 47.0245 47.1062 47.0245 42.7702C47.0245 38.4343 50.5395 34.9194 54.8754 34.9194C59.2113 34.9194 62.7262 38.4343 62.7262 42.7702Z'
        fill='#9DA5B5'
      />
      <defs>
        <filter
          id='filter0_ii_102_154'
          x='0.523224'
          y='-1.91925'
          width='74.2812'
          height='77.3007'
          filterUnits='userSpaceOnUse'
          color-interpolation-filters='sRGB'
        >
          <feFlood flood-opacity='0' result='BackgroundImageFix' />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='BackgroundImageFix'
            result='shape'
          />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dx='1.81174' dy='2.41565' />
          <feGaussianBlur stdDeviation='1.20782' />
          <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.61 0'
          />
          <feBlend
            mode='normal'
            in2='shape'
            result='effect1_innerShadow_102_154'
          />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dy='-3.01956' />
          <feGaussianBlur stdDeviation='1.20782' />
          <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0.216667 0 0 0 0 0.216667 0 0 0 0 0.216667 0 0 0 1 0'
          />
          <feBlend
            mode='normal'
            in2='effect1_innerShadow_102_154'
            result='effect2_innerShadow_102_154'
          />
        </filter>
      </defs>
    </svg>
  );
};
