import { NextAuthOptions } from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

const playback =
  'streaming user-modify-playback-state user-read-playback-state';
const user = 'user-read-email user-read-private';
const playlist =
  'playlist-modify-public playlist-modify-private playlist-read-private playlist-read-collaborative';

const scope = `${playback} ${user} ${playlist}`;

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
