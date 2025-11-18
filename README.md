# Velthéa - Personalized Hampers 
Velthéa is a personalized hampers e-commerce website focused on delivering an elegant and seamless gifting experience.  
Users can sign up, log in, and explore a minimal and warm design built with modern web technologies.

## Overview

Velthéa is currently being developed as part of an entrepreneurship project, serving as the digital storefront for selling personalized hampers created by our team.  
The platform is built using Next.js App Router, MongoDB, and Tailwind CSS, featuring a clean, modern interface with optional email-based authentication.  
Beyond its commercial use, it also serves as a technical exploration of full-stack web development and scalable architecture for small online businesses.

## Tech Stack
- Next.js (App Router)
- TypeScript + React 19
- Tailwind CSS
- MongoDB (mongoose)
- NextAuth (credentials + Google OAuth, optional)
- Redis (rate limiting; in-memory fallback for local work)
- Zod (for schema validation)
- Sonner (toast messages)

## Quick Start
1. Install dependencies
```bash
npm install
```
2. Create local env file (do NOT commit) Create a .env.local file in the project root and add server-only secrets (no NEXT_PUBLIC_ prefix):
```bash
MONGO="mongodb+srv://user:pass@cluster.example/dbname"
NEXTAUTH_SECRET="your-super-secret-key-for-nextauth"
GOOGLE_CLIENT_ID="your-google-oauth-client-id"
GOOGLE_SECRET="your-google-oauth-client-secret"
REDIS_URL="redis://default:password@localhost:6379" # optional, recommended
NEXT_PUBLIC_ENABLE_AUTH="true" # set to "false" for a demo/guest experience
```
note: Restart the dev server after editing envs.

3. (Optional) To run without Redis in development, simply skip `REDIS_URL` — the limiter will fall back to an in-memory map. For team/shared testing, configuring Redis is recommended so throttling mirrors production behaviour.
4. Toggle authentication as needed. When `NEXT_PUBLIC_ENABLE_AUTH="false"`, checkout and personalization flows work without sign-in while auth UI is hidden. Flip back to `"true"` to require sign-in/out.

5. Run dev server
```bash
npm run dev
```
6. Open http://localhost:3000

## Key routes
- / — Landing
- /base — Pick base
- /personalize/[id] — Personalize selected base
- /checkout — Review & recipient form (requires auth when auth is enabled)
- /confirmation — Order confirmation
- /sign-up — Sign up
- /login — Sign in
- /profile — Account overview with password management (auth only)

## Folder Structure
Here is a high-level overview of the project's src directory:
```bash
src/
├── app/
│   ├── (auth)/             # Route group for auth pages (login, sign-up)
│   │   ├── login/
│   │   └── sign-up/
│   ├── (main)/             # Route group for main app layout (header/footer)
│   │   ├── base/
│   │   ├── checkout/
│   │   ├── confirmation/
│   │   ├── personalize/[id]/
│   │   └── page.tsx        # Home page
│   ├── api/
│   │   ├── auth/
│   │   │   ├── [...nextauth]/ # NextAuth.js catch-all route + rate limiting
│   │   │   ├── setPassword/   # Allow OAuth users to set local password (auth optional flag respected)
│   │   │   ├── changePassword/ # Authenticated password rotation endpoint
│   │   │   └── signup/        # Custom sign-up API endpoint
│   │   ├── user/
│   │   │   └── profile/       # Returns session user's profile metadata
│   ├── globals.css         # Global styles and CSS variables
│   └── layout.tsx          # Root layout
├── components/
│   ├── ui/                 # UI primitives (e.g., sonner)
│   ├── CheckoutSummary.tsx # Review component for checkout page
│   ├── Header.tsx          # Site header
│   ├── Hero.tsx            # Landing page hero section
│   ├── PersonalizationForm.tsx # Multi-step form for hamper building
│   └── ...                 # Other reusable components
├── lib/
│   ├── mockData.ts         # Mock data for products and options
│   ├── mongodb.ts          # MongoDB connection helper
│   ├── routes.ts           # Centralized app route constants
│   ├── store.tsx           # Global state management (React Context)
│   ├── types.ts            # Core TypeScript types
│   └── utils.ts            # Utility functions (e.g., cn, formatCurrency)
│   └── validation.ts       # Zod schemas for auth
├── model/
│   └── user.ts             # Mongoose User schema
├── types/
│   └── next-auth.d.ts      # Session/JWT module augmentation for NextAuth
└── utils/
    └── rateLimit.ts        # Redis-backed (with fallback) rate limiter helpers
```



## Technical Notes
- Styling: The project uses Tailwind CSS for utility-first styling. Global styles, fonts (Ovo), and custom CSS variables for the color palette, shadows, and radii are defined in src/app/globals.css.
- State Management: Global state for the hamper creation process is managed by a React Context + useReducer hook located in src/lib/store.tsx. This store tracks the selected base, items, packaging, and recipient details across the multi-page flow.
- Authentication: User sign-up (/api/auth/signup) is a custom route that validates all incoming auth data using zod schemas (defined in src/lib/validation.ts) to ensure data integrity and consistent password strength rules for both new signups and existing users, enforces rate limiting, and hashes passwords using bcryptjs. 
- Session management is handled by NextAuth.js (/api/auth/[...nextauth]) via Credentials - Google providers. Redis-backed throttling defends against credential stuffing while falling back to an in-memory bucket when Redis is unavailable. Session typing is extended in src/types/next-auth.d.ts. A `NEXT_PUBLIC_ENABLE_AUTH` toggle allows disabling enforcement while keeping the auth stack in place.
- Password management: OAuth-first accounts can set a local password via `/api/auth/setPassword`, existing local accounts rotate credentials through `/api/auth/changePassword`, and `/api/user/profile` feeds the profile dashboard with linked provider metadata. All endpoints share the same zod schemas for consistent validation.
- Database: The app connects to MongoDB using mongoose. The connection logic in src/lib/mongodb.ts caches the connection promise to optimize for serverless environments. The User schema is defined in src/model/user.ts.
- Mock Data: The product catalog (hampers, itemCatalog, packagingOptions) is currently hardcoded in src/lib/mockData.ts for development purposes and can later be replaced with dynamic data from a product database or CMS.

## Deployment
- Vercel: push to GitHub and import the repo at vercel.com. Add MONGO, NEXTAUTH_SECRET, GOOGLE_CLIENT_ID, GOOGLE_SECRET, and REDIS_URL in the Vercel project settings.
- When using Vercel CLI:
```bash
vercel env add MONGO production
vercel env add NEXTAUTH_SECRET production
vercel env add GOOGLE_CLIENT_ID production
vercel env add GOOGLE_SECRET production
vercel env add REDIS_URL production
```

## License
This project is provided as a prototype for demonstration and personal use only.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
