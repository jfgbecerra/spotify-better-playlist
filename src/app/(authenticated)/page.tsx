'use client';

import { getSession, signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default async function Home() {
  const { data: session } = useSession();

  return (
    <div className='flex h-screen w-screen flex-col items-center justify-center gap-20'>
      <button
        className='bg-primary flex rounded-full px-12 py-2 text-lg uppercase tracking-widest hover:bg-opacity-80 focus:outline-none'
        onClick={() => signOut({ callbackUrl: 'http://localhost:3000/login' })}
      >
        Log Out
      </button>
    </div>
  );
}
