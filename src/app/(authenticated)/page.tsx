import { LogoutButton } from '@/components/Buttons';
import Sidebar from '@/components/Sidebar';
import { getSession, signOut, useSession } from 'next-auth/react';

export default function Home() {
  return (
    <div className='flex h-screen w-screen flex-col items-center justify-center gap-20'>
      <LogoutButton />
      <Sidebar />
    </div>
  );
}
