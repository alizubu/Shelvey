import { forwardRef, useId } from 'react';
import { classes } from '~/utils/style';
import styles from './monogram.module.css';

export const Monogram = forwardRef(({ highlight, className, ...props }, ref) => {
  const id = useId();
  const clipId = `${id}monogram-clip`;

  return (
    <svg
      aria-hidden
      className={classes(styles.monogram, className)}
      width="50"
      height="50"
      viewBox="0 0 50 50"
      ref={ref}
      {...props}
    >
      <defs>
        <clipPath id={clipId}>
        <path d="M47.55,22.94c-.15-1.71-.5-3.36-1.01-4.93-.19-.6-.41-1.19-.66-1.77-.62-1.47-1.39-2.87-2.29-4.16-.08-.12-.16-.23-.24-.34l-4.11,2.44c.04.06.09.11.13.17.94,1.27,1.72,2.66,2.3,4.16.26.66.48,1.33.65,2.03.37,1.43.56,2.93.56,4.48,0,.24,0,.49-.01.73-.38,9.54-8.24,17.16-17.88,17.16-2.81,0-5.47-.65-7.84-1.8l15.22-9.09,4.58-2.73v-13.64l-4.58,2.45-14.37,7.7v-3.28l19.12-10.66,4.32-2.41c-1.16-1.23-2.47-2.33-3.88-3.28-3.6-2.4-7.92-3.81-12.57-3.81C12.49,2.35,2.35,12.49,2.35,25c0,.27,0,.53.01.79.06,1.73.31,3.42.74,5.03.23.86.5,1.7.83,2.51.59,1.49,1.33,2.9,2.21,4.21.04.05.07.11.11.16l4.16-2.34s-.04-.05-.06-.08c-.91-1.29-1.65-2.71-2.19-4.22-.31-.86-.55-1.74-.73-2.65-.21-1.1-.32-2.24-.32-3.41,0-.64.03-1.28.1-1.91.95-8.99,8.55-15.99,17.79-15.99,2.77,0,5.39.63,7.73,1.75l-14.72,8.21-4.7,2.62v14.01l4.7-2.52,14.37-7.7v2.99l-19.53,11.67-4.22,2.52c1.16,1.21,2.46,2.3,3.86,3.23,3.58,2.38,7.89,3.77,12.51,3.77,12.51,0,22.65-10.14,22.65-22.65,0-.69-.03-1.38-.09-2.06Z"/>
        </clipPath>
      </defs>
      <rect clipPath={`url(#${clipId})`} width="100%" height="100%" />
      {highlight && (
        <g clipPath={`url(#${clipId})`}>
          <rect className={styles.highlight} width="100%" height="100%" />
        </g>
      )}
    </svg>
  );
});
