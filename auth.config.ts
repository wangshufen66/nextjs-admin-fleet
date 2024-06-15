import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login'
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isLogin = nextUrl.pathname.startsWith('/login');
      if (isLoggedIn) {
        if (isLogin) {
          return Response.redirect(new URL('/dashboard', nextUrl));
        }
        return true;
      } else {
        return false;
      }
    }
  },
  trustHost: true,
  providers: [] // Add providers with an empty array for now
} satisfies NextAuthConfig;
