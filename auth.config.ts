import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login'
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      // console.log('nextUrl: ', nextUrl);
      const isLoggedIn = !!auth?.user;

      // if (isOnDashboard) {
      //   if (isLoggedIn) return true;
      //   return false; // Redirect unauthenticated users to login page
      // } else if (isLoggedIn) {
      //   return Response.redirect(new URL('/dashboard', nextUrl));
      // }
      // return true;
      // console.log('isLoggedIn: ', auth);
      if (isLoggedIn && nextUrl.pathname == '/') {
        return Response.redirect(new URL('/dashboard', nextUrl));
      } else if (isLoggedIn) return true;
      return false; // Redirect unauthenticated users to login page
    }
  },
  providers: [] // Add providers with an empty array for now
} satisfies NextAuthConfig;
