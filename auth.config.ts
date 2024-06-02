import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login'
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      console.log('nextUrl: ', nextUrl);
      const isLoggedIn = !!auth?.user;
      console.log('622 isLoggedIn: ', isLoggedIn);
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      console.log('622 isOnDashboard: ', isOnDashboard);
      if (isLoggedIn) {
        return true;
      } else {
        return false;
      }
    }
  },
  trustHost: true,
  providers: [] // Add providers with an empty array for now
} satisfies NextAuthConfig;
