import NextAuth, { NextAuthOptions } from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

// TODO: Remove all unused scopes
// TODO: Need to add token refresh rotation
// See nextauth: https://authjs.dev/guides/basics/refresh-token-rotation
// https://next-auth.js.org/v3/tutorials/refresh-token-rotation#server-side
const scope =
  'user-read-recently-played user-read-playback-state user-top-read user-modify-playback-state user-read-currently-playing user-follow-read playlist-read-private user-read-email user-read-private user-library-read playlist-read-collaborative playlist-modify-public playlist-modify-private';

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_APP_SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.NEXT_APP_SPOTIFY_SECRET as string,
      authorization: {
        params: { scope },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.id = account.id;
        token.expires_at = account.expires_at;
        token.accessToken = account.access_token;
        // token.refresh_token = account.refresh_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
