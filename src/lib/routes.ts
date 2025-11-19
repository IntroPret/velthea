export const ROUTES = {
  HOME: "/",
  BASE: "/base",
  PERSONALIZE: (id: string = "regular") => `/personalize/${id}`,
  CHECKOUT: "/checkout",
  PROFILE: "/profile",
  CONFIRMATION: "/confirmation",
  LOGIN: "/login",
  SIGNUP: "/sign-up"
} as const;

export type AppRoute = typeof ROUTES[keyof typeof ROUTES];
