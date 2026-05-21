# Assets

Static assets for the portfolio.

## Structure

```
assets/
├── images/    → PNG, JPG, SVG images
└── logos/     → Brand logos (PNG, SVG)
```

## Usage

Reference in code as:
```tsx
<img src="/assets/images/photo.jpg" alt="..." />
<img src="/assets/logos/logo.svg" alt="..." />
```

Or with Next.js Image:
```tsx
import Image from "next/image";
<Image src="/assets/logos/logo.svg" alt="Logo" width={120} height={40} />
```
