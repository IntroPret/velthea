export const ROUTES = {
  HOME: "/",
  BASE: "/base",
  PERSONALIZE: (id: string = "classic") => `/personalize/${id}`,
  CHECKOUT: "/checkout",
  CONFIRMATION: "/confirmation",
  LOGIN: "/login"
} as const;

export type AppRoute = typeof ROUTES[keyof typeof ROUTES];
