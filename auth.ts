import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

// In-memory brute-force guard (resets on cold-start; fine for single-instance)
const attempts = new Map<string, { count: number; lockedUntil: number }>();

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        userId:   { label: "User ID",  type: "text"     },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const userId   = (credentials?.userId   as string | undefined) ?? "";
        const password = (credentials?.password as string | undefined) ?? "";

        const ip = "global"; // single admin — no per-IP complexity needed
        const rec = attempts.get(ip) ?? { count: 0, lockedUntil: 0 };

        if (Date.now() < rec.lockedUntil) {
          throw new Error("TOO_MANY_ATTEMPTS");
        }

        const validUser = process.env.ADMIN_USER;
        const validPass = process.env.ADMIN_PASSWORD;

        if (!validUser || !validPass) {
          throw new Error("ADMIN_CREDENTIALS_NOT_SET");
        }

        const ok =
          userId   === validUser &&
          password === validPass;

        if (!ok) {
          rec.count += 1;
          if (rec.count >= 5) {
            rec.lockedUntil = Date.now() + 15 * 60 * 1000; // 15 min
            rec.count = 0;
          }
          attempts.set(ip, rec);
          throw new Error("INVALID_CREDENTIALS");
        }

        // Reset on success
        attempts.delete(ip);

        return { id: "admin", name: validUser, email: `${validUser}@portfolio.local` };
      },
    }),
  ],

  pages: {
    signIn: "/admin/login",
    error:  "/admin/login",
  },

  session: {
    strategy: "jwt",
    maxAge:   8 * 60 * 60, // 8 hours
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.isAdmin = true;
      return token;
    },
    async session({ session, token }) {
      if (token.isAdmin) session.user.isAdmin = true;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});
