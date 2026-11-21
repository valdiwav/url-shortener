import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import db from "../libs/db";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Correo electrónico", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;
        const user = await db.user.findUnique({ where: { email: credentials.email } });
        if (!user || !await bcrypt.compare(credentials.password, user.password)) return null;
        return { id: user.id, name: user.name, email: user.email };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (!token.id) return null;
      const user = await db.user.findUnique({
        where: { id: token.id },
        select: { id: true, name: true, email: true },
      });
      if (!user) return null;
      session.user = user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
  },
  pages: { signIn: "/auth/login" },
  secret: process.env.NEXTAUTH_SECRET,
};
