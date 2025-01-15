import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import db from "../libs/db";
import bcrypt from "bcrypt";

export const authOptions = {
  debug: true,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const userFound = await db.user.findUnique({
          where: { email: credentials?.email },
        });

        if (!userFound) throw new Error("No user found");

        const matchPassword = await bcrypt.compare(
          credentials.password,
          userFound.password
        );

        if (!matchPassword) throw new Error("Wrong password");

        return {
          id: userFound.id,
          name: userFound.name,
          email: userFound.email,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      const user = await db.user.findUnique({
        where: { id: token.id },
      });

      if (user) {
        session.user.id = user.id; // No habrá error aquí
        session.user.name = user.name;
        session.user.email = user.email;
      }

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
