# Velthéa - Personalized Hampers 
Velthéa is a personalized hampers e-commerce website focused on delivering an elegant and seamless gifting experience.  
Users can sign up, log in, and explore a minimal and warm design built with modern web technologies.

## Overview

Velthéa is currently being developed as part of an entrepreneurship project, serving as the digital storefront for selling personalized hampers created by our team.  
The platform is built using Next.js App Router, MongoDB, and Tailwind CSS, featuring a clean, modern interface and integrated email-based authentication.  
Beyond its commercial use, it also serves as a technical exploration of full-stack web development and scalable architecture for small online businesses.

## Tech Stack
- Next.js (App Router)
- TypeScript + React
- Tailwind CSS
- MongoDB (mongoose)
- NextAuth (optional, app/api/auth/[...nextauth])
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
```
note: Restart the dev server after editing envs.

3. If authentication errors occur, ensure `bcryptjs` is installed:
```bash
npm install bcryptjs
npm install -D @types/bcryptjs
```

4. Run dev server
```bash
npm run dev
```
5. Open http://localhost:3000

## Key routes
- / — Landing
- /base — Pick base
- /personalize/[id] — Personalize selected base
- /checkout — Review & recipient form
- /confirmation — Order confirmation
- /sign-up — Sign up
- /login — Sign in

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
│   │   │   ├── [...nextauth]/ # NextAuth.js catch-all route
│   │   │   └── signup/        # Custom sign-up API endpoint
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
└── model/
    └── user.ts             # Mongoose User schema
```

## Technical Notes
- Styling: The project uses Tailwind CSS for utility-first styling. Global styles, fonts (Ovo), and custom CSS variables for the color palette, shadows, and radii are defined in src/app/globals.css.
- State Management: Global state for the hamper creation process is managed by a React Context + useReducer hook located in src/lib/store.tsx. This store tracks the selected base, items, packaging, and recipient details across the multi-page flow.
- Authentication: User sign-up (/api/auth/signup) is a custom route that validates input and hashes passwords using bcryptjs. Session management is handled by NextAuth.js (/api/auth/[...nextauth]) using a Credentials provider and a MongoDB adapter.
- Database: The app connects to MongoDB using mongoose. The connection logic in src/lib/mongodb.ts caches the connection promise to optimize for serverless environments. The User schema is defined in src/model/user.ts.
- Mock Data: The product catalog (hampers, itemCatalog, packagingOptions) is currently hardcoded in src/lib/mockData.ts for development purposes and can later be replaced with dynamic data from a product database or CMS.

## Deployment
- Vercel: push to GitHub and import the repo at vercel.com. Add MONGO and NEXTAUTH_SECRET in the Vercel project settings.
- When using Vercel CLI:
```bash
vercel env add MONGO production
vercel env add NEXTAUTH_SECRET production
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
