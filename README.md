# Velthéa — Personalized Hampers (Prototype)

Elegant, minimal, and warm gifting flow built with Next.js App Router, TypeScript and Tailwind.

Tech
- Next.js (App Router)
- TypeScript + React
- Tailwind CSS
- MongoDB (mongoose)
- NextAuth (optional, app/api/auth/[...nextauth])

Quick start

1. Install dependencies
```bash
npm install
```

2. Create local env file (do NOT commit)
Create d:\alpret\Projects\velthea\.env.local and add server-only secrets (no NEXT_PUBLIC_ prefix):
```
MONGO="mongodb+srv://user:pass@cluster.example/dbname"
API_SECRET="your-server-secret"
```
Restart the dev server after editing envs.

3. Run dev server
```bash
npm run dev
```
Open http://localhost:3000

Key routes
- / — Landing
- /base — Pick base
- /personalize/[id] — Personalize selected base
- /checkout — Review & recipient form
- /confirmation — Order confirmation
- /(auth)/sign-up — Sign up
- /(auth)/login — Sign in

Notes on auth & database
- The project includes a sign-up UI and an API route at /api/auth/signup that validates input and creates users.
- DB connection helper (src/lib/mongodb.ts) caches the mongoose connect promise to reuse a single connection across hot reloads/serverless invocations.
- User model lives at src/model/user.ts (mongoose schema).
- For production, set environment variables in your hosting platform (Vercel: Project → Settings → Environment Variables). Do NOT expose secrets with NEXT_PUBLIC_.

Deploy
- Vercel: push to GitHub and import the repo at vercel.com. Add MONGO and other secrets in the Vercel project settings.
- When using Vercel CLI:
```bash
vercel env add MONGO production
```

Development tips
- Use .env.local for local-only secrets; .gitignore already excludes env files.
- Install runtime and types if needed:
```bash
npm i bcryptjs
npm i -D @types/bcryptjs
```
- Inspect API responses in browser DevTools → Network when debugging signup/login errors.

License
- Prototype for demo/personal use.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
