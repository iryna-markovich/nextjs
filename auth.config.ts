import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      console.log(nextUrl.pathname)
      console.log('isOnDashboard:', isOnDashboard)

      if (isOnDashboard) {
        console.log('isOnDashboard:', isOnDashboard)
        if (isLoggedIn) {
          console.log('isLoggedIn:', isLoggedIn)

          return true;
        }

        console.log('isLoggedIn Redirect unauthenticated users to login page:', isLoggedIn)
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        console.log('isLoggedIn redirect to dashboard:', isLoggedIn)
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      return false;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;