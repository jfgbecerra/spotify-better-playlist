'use client';
import { signOut, signIn } from 'next-auth/react';

export const LoginButton = () => {
  const handleLogin = () => {
    signIn('spotify', { callbackUrl: 'http://localhost:3000' });
  };

  return (
    <button
      className='bg-primary flex rounded-full px-12 py-2 text-lg uppercase tracking-widest hover:bg-opacity-80 focus:outline-none'
      onClick={handleLogin}
    >
      Login
    </button>
  );
};

export const LogoutButton = () => {
  return (
    <button
      className='bg-primary flex rounded-full px-12 py-2 text-lg uppercase tracking-widest hover:bg-opacity-80 focus:outline-none'
      onClick={() => {
        signOut();
      }}
    >
      Sign Out
    </button>
  );
};
