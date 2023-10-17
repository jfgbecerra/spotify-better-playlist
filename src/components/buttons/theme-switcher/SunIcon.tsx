export const SunIcon = ({ className }: { className: string | undefined }) => {
  return (
    <svg
      className={className}
      viewBox='0 0 65 65'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g filter='url(#filter0_ii_102_168)'>
        <circle cx='50%' cy='50%' r='49%' fill='#FED62E' />
      </g>
      <defs>
        <filter
          id='filter0_ii_102_168'
          x='0'
          y='-2.30908'
          width='66.7318'
          height='69.6182'
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
          <feOffset dx='1.73181' dy='2.30908' />
          <feGaussianBlur stdDeviation='1.15454' />
          <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0.995677 0 0 0 0 1 0 0 0 0 0.930833 0 0 0 0.61 0'
          />
          <feBlend
            mode='normal'
            in2='shape'
            result='effect1_innerShadow_102_168'
          />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dy='-2.88634' />
          <feGaussianBlur stdDeviation='1.15454' />
          <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0.704167 0 0 0 0 0.602266 0 0 0 0 0.174281 0 0 0 1 0'
          />
          <feBlend
            mode='normal'
            in2='effect1_innerShadow_102_168'
            result='effect2_innerShadow_102_168'
          />
        </filter>
      </defs>
    </svg>
  );
};
