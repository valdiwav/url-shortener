import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/login", // Redirige a esta página si no hay sesión
  },
});

export const config = { matcher: ["/dashboard", "/dashboard/links", "/dashboard/settings"] };
