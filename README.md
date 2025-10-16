Velthéa — Personalized Hampers (Prototype)
================================================

Elegant, minimal, and warm gifting flow built with Next.js App Router and Tailwind.

Tech
- Next.js 15 (App Router)
- TypeScript + React 19
- Tailwind CSS

Run locally

1) Install deps

```
npm install
```

2) Start dev server

```
npm run dev
```

Key routes
- / — Landing (Hero, featured hampers)
- /base — Pick base
- /personalize/[id] — Personalize selected base
- /checkout — Review & recipient form
- /confirmation — Order confirmation

Design tokens
- Colors: text #0a0f14, background #F8EFE5, primary #5D768B, secondary #C8B39B, accent #E3C9A4
- Fonts: Poppins (headings), Inter (body) via next/font

Deploy
- Vercel: Push to GitHub and import the repo at vercel.com (framework auto-detect). One click deploy.
- Netlify: Use “Next.js” build preset. Build command: `next build` Publish directory: `.next`.

Notes
- Images are placeholders in /public/images. Replace with real assets.
- State is kept in-memory with a simple React context and reducer. A small localStorage persistence is included for demo purposes.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
