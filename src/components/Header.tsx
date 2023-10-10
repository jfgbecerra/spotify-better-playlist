import { getAuthSession } from '@/utils/serverUtils';
import Image from 'next/image';
import logoImage from '@/assets/playlist.png';
import { LoginButton, LogoutButton } from './Buttons';
import { AuthSession } from '@/types/types';

export default async function Header() {
  // Handle checking if the session is valid
  const session = await getAuthSession();

  const getCorrectButton = (session: AuthSession | null) => {
    if (!session) {
      return <LoginButton />;
    } else {
      return <LogoutButton />;
    }
  };

  return (
    <header className='sticky top-0 flex-row justify-center border-b border-gray-500'>
      <div>
        <Image
          className='fixed'
          src={logoImage}
          alt='Generic playlist image'
          width={50}
          height={50}
        />
      </div>
      {getCorrectButton(session)}
    </header>
  );
}
